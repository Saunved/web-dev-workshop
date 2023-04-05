import strings from "@/constants/ui/strings";
import { Dog } from "phosphor-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import PasswordLabel from "@/components/Form/PasswordLabel";
import Input from "@/components/Form/Input";
import { loginRoute } from "@/constants/routes";
import { useRouter } from "next/router";
import session from "@/utils/session";
import ErrorCallout from "@/components/Widget/ErrorCallout";
import SuccessCallout from "@/components/Widget/SuccessCallout";

export default function LoginFlow() {
  const { loginFailedTitle, loginFailedMessage } = strings.EN.LOGIN_FLOW;
  const { registrationTitle, registrationMessage } = strings.EN.REGISTER_FLOW;
  const [uiText, setUiText] = useState(strings.EN.LOGIN_FLOW);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginCredentialIsValid, setLoginCredentialIsValid] = useState(true);
  const [registrationIsSuccessful, setRegistrationIsSuccessful] =
    useState(false);

  useEffect(() => {
    // Detect and set the correct language here
    if (localStorage.getItem("registrationSuccess")) {
      setRegistrationIsSuccessful(true);
    } else {
      setRegistrationIsSuccessful(false);
    }
  }, []);

  const onSubmitForm = (e) => {
    e.preventDefault();

    fetch(loginRoute, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Redirect the user to their profile page
          response.json().then((body) => {
            session.setUser(body.data);
            router.push(`/${body.data.handle}`);
          });
          localStorage.removeItem("registrationSuccess");
        } else {
          // Login failed
          response.json().then((body) => {
            setLoginCredentialIsValid(false);
          });
          setRegistrationIsSuccessful(false);
        }
      })
      .catch((error) => {
        console.error("Error logging in", error);
      });
  };

  return (
    <div className="max-w-3xl py-16 bg-white rounded-md w-full mx-auto border mt-20 shadow">
      <div className="flex justify-center mb-4">
        <Dog weight="fill" className="text-purple-700" size={80}></Dog>
      </div>
      <h1 className="text-center text-3xl font-semibold">{uiText.signInCta}</h1>
      <div className="mt-8 flex justify-center">
        <div>
          {registrationIsSuccessful ? (
            <SuccessCallout
              title={registrationTitle}
              message={registrationMessage}
            />
          ) : null}
          <form onSubmit={onSubmitForm}>
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
            {loginCredentialIsValid ? null : (
              <ErrorCallout
                title={loginFailedTitle}
                message={loginFailedMessage}
              />
            )}
            <div className="mt-6">
              <button
                type="submit"
                disabled={!email || !password}
                className="px-4 w-full border rounded-full py-2 bg-blue-600 text-white disabled:opacity-60"
              >
                {uiText.signIn}
              </button>
            </div>
          </form>
          <div className="mt-4">
            {uiText.newUser}{" "}
            <Link href="/auth/register" className="text-blue-700">
              {uiText.register}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
