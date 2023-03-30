import strings from "@/constants/ui/strings";
import { Dog } from "phosphor-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import PasswordLabel from "@/components/Form/PasswordLabel";
import Input from "@/components/Form/Input";
import { loginRoute } from "@/constants/routes";
import { useRouter } from "next/router";

export default function LoginFlow() {
  const [uiText, setUiText] = useState(strings.EN.LOGIN_FLOW);
  const router = useRouter();

  const onInputChange = (e) => {
    const name = e.target.name;
    const _loginForm = { ...loginForm };
    _loginForm[name].value = e.target.value;
    setLoginForm(_loginForm);
  };

  const onShowPasswordToggle = (status) => {
    const _loginForm = { ...loginForm };
    _loginForm.password.type = status ? "text" : "password";
    setLoginForm(_loginForm);
  };

  const [loginForm, setLoginForm] = useState({
    email: {
      label: uiText.email,
      htmlFor: "email",
      type: "email",
      required: true,
      errorText: "",
      value: "",
      onChange: onInputChange,
      validate: () => {},
    },
    password: {
      label: <PasswordLabel onShowPasswordToggle={onShowPasswordToggle} />,
      htmlFor: "password",
      type: "password",
      required: true,
      errorText: "",
      value: "",
      onChange: onInputChange,
      validate: () => {},
    },
  });

  useEffect(() => {
    // Detect and set the correct language here
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
        email: loginForm.email.value,
        password: loginForm.password.value,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Redirect the user to their profile page
          response.json().then((body) => {
            localStorage.setItem("userId", body.data.id);
            localStorage.setItem("userHandle", body.data.handle);
            router.push(`/${body.data.handle}`);
          });
        } else {
          // Login failed
          response.json().then((body) => {
            console.error(body.data.message);
          });
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
          <form>
            <Input {...loginForm.email} />
            <Input {...loginForm.password} />

            <div className="mt-6">
              <button
                type="submit"
                onClick={onSubmitForm}
                className="px-4 w-full border rounded-full py-2 bg-blue-600 text-white"
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
