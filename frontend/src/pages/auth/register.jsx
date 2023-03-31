import strings from "@/constants/ui/strings";
import { Dog } from "phosphor-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Input from "@/components/Form/Input";
import PasswordLabel from "@/components/Form/PasswordLabel";
import { registerRoute } from "@/constants/routes";
import { useRouter } from "next/router";

export default function RegisterFlow() {
  const [uiText, setUiText] = useState(strings.EN.REGISTER_FLOW);
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [handle, setHandle] = useState("");

  // @TODO: Show validation errors for these fields
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [handleError, setHandleError] = useState("");

  useEffect(() => {
    // Detect and set the correct language here
  }, []);

  const onSubmitForm = (e) => {
    e.preventDefault();

    fetch(registerRoute, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        handle,
        email,
        password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Registration successful
          router.push("/auth/login");
        } else {
          // Registration failed
          response.json().then((data) => {
            console.error(data.message);
          });
        }
      })
      .catch((error) => {
        console.error("Error registering in", error);
      });
  };

  return (
    <div className="max-w-3xl py-8 bg-white rounded-md w-full my-12 mx-auto border shadow">
      <div className="flex justify-center mb-4">
        <Dog
          weight="fill"
          className="text-purple-700 hover:rotate-180 hover:transform duration-100"
          size={80}
        ></Dog>
      </div>
      <h1 className="text-center text-3xl font-semibold">
        {uiText.registerCta}
      </h1>
      <div className="mt-8 flex justify-center">
        <div className="w-64">
          <form onSubmit={onSubmitForm}>
            <div>
              <label htmlFor="name">{uiText.name}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email">{uiText.email}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">{uiText.password}</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="handle">{uiText.handle}</label>
              <input
                type="text"
                id="handle"
                name="handle"
                value={handle}
                onChange={(event) => setHandle(event.target.value)}
                required
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={!email || !name || !password || !handle}
                className="px-4 w-full border rounded-full py-2 bg-blue-600 text-white disabled:opacity-60"
              >
                {uiText.register}
              </button>
            </div>
          </form>
          <div className="mt-4">
            {uiText.existingUser}{" "}
            <Link href="/auth/login" className="text-blue-700">
              {uiText.signIn}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
