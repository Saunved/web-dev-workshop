import strings from "@/constants/ui/strings";
import { Dog } from "phosphor-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { registerRoute } from "@/constants/routes";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import ErrorText from "@/components/Widget/ErrorText";
import {
  isEmailValid,
  isHandleValid,
  isPasswordValid,
} from "@/utils/validation";

export default function RegisterFlow() {
  const { invalidEmail, invalidPassword, invalidHandle } =
    strings.EN.REGISTER_FLOW;
  const uiTextError = strings.EN.ERROR;
  const [uiText, setUiText] = useState(strings.EN.REGISTER_FLOW);
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // @TODO: Show validation errors for these fields
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [handleError, setHandleError] = useState("");

  useEffect(() => {
    // Detect and set the correct language here
  }, []);

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (!isEmailValid(email)) {
      setEmailError(invalidEmail);
    } else {
      setEmailError("");
    }

    if (!isPasswordValid(password)) {
      setPasswordError(invalidPassword);
    } else {
      setPasswordError("");
    }

    if (!isHandleValid(handle)) {
      setHandleError(invalidHandle);
    } else {
      setHandleError("");
    }

    if (emailError || passwordError || handleError) {
      return;
    }

    fetch(registerRoute, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Registration successful
          localStorage.setItem("registrationSuccess", true);
          router.push("/auth/login");
        } else {
          // Registration failed
          response.json().then((body) => {
            if (body?.message) {
              toast.error(body.message);
            } else {
              toast.error(uiTextError.somethingWentWrong);
            }
          });
        }
      })
      .catch((error) => {
        console.error("Error registering in", error);
      });
  };

  return (
    <div className="max-w-3xl py-8 bg-white rounded-md w-full my-12 mx-auto border shadow">
      {/* Task 3: Use the imported "Dog" icon from Phosphor Icons to ensure that our branding is on-point */}
      <h1 className="text-center text-3xl font-semibold">
        {uiText.registerCta}
      </h1>
      <div className="mt-8 flex justify-center">
        <div className="w-6/12">
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
                className={`${emailError ? "border-2 border-rose-600" : ""}`}
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            {emailError ? <ErrorText message={emailError} /> : null}

            {/* Task 1: We need to accept and store the password and handle fields in the appropriate variables.
            Check how name and email are currently being done.
            Bonus: The registration button should be disabled if password and handle are not present
            */}

            {handleError ? <ErrorText message={handleError} /> : null}
            <div className="mt-6">

              {/* Task 2: This button looks horrible. Let's style it with Tailwind classes! */}

              <button type="submit" disabled={!email || !name} className="">
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
