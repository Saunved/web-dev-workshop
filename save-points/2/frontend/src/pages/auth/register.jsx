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

    // Task 2: Implementing the registration endpoint on the frontend
    fetch(registerRoute, {
      method: "", // Which HTTP method should we use here?
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Task 2A: What data should we send to the server? Hint: we should pass key:value pairs
      }),
    })
      .then((response) => {
        if (response.ok) {
         // Task 2B: What to do if the registration is successful? Hint: It would be weird to stay on the same page and do nothing :P
        } else {
          // Registration failed
          // Task 2C: What to do if the registration fails? Hint: It would be weird to not give the user any feedback
          // response.json().then((body) => {
          //   if (_FILL THE CONDITION_) {
          //     toast.error(_IF STATEMENT_);
          //   } else {
          //     toast.error(_ELSE STATEMENT_);
          //   }
          // });
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
        <div className="w-6/12">
          {/* Task 1: This form should call the onSubmitForm function when the "Register" button is clicked */}
          <form>
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
            <div>
              <label htmlFor="password">{uiText.password}</label>
              <input
                className={`${passwordError ? "border-2 border-rose-600" : ""}`}
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            {passwordError ? <ErrorText message={passwordError} /> : null}
            <div>
              <label htmlFor="handle">{uiText.handle}</label>
              <input
                className={`${handleError ? "border-2 border-rose-600" : ""}`}
                type="text"
                id="handle"
                name="handle"
                value={handle}
                onChange={(event) => setHandle(event.target.value)}
                required
              />
            </div>
            {handleError ? <ErrorText message={handleError} /> : null}
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
