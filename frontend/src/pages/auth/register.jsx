import strings from "@/constants/ui/strings";
import { Dog } from "phosphor-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Input from "@/components/Form/Input";
import PasswordLabel from "@/components/Form/PasswordLabel";
import { registerRoute } from "@/constants/routes";

export default function RegisterFlow() {
  const [uiText, setUiText] = useState(strings.EN.REGISTER_FLOW);

  const onInputChange = (e) => {
    const name = e.target.name;
    const _registrationForm = { ...registrationForm };
    _registrationForm[name].value = e.target.value;
    setRegistrationForm(_registrationForm);
  };

  const onShowPasswordToggle = (status) => {
    const _registrationForm = { ...registrationForm };
    _registrationForm.password.type = status ? "text" : "password";
    setRegistrationForm(_registrationForm);
  };

  const [registrationForm, setRegistrationForm] = useState({
    name: {
      label: uiText.name,
      htmlFor: "name",
      type: "text",
      required: true,
      errorText: "",
      value: "",
      onChange: onInputChange,
      validate: () => {},
    },
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
    dateOfBirth: {
      label: uiText.birthday,
      htmlFor: "dateOfBirth",
      type: "date",
      required: true,
      errorText: "",
      value: "",
      onChange: onInputChange,
      validate: () => {},
    },
    handle: {
      label: uiText.handle,
      htmlFor: "handle",
      type: "text",
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

    fetch(registerRoute, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: registrationForm.name.value,
        handle: registrationForm.handle.value,
        dateOfBirth: registrationForm.dateOfBirth.value,
        email: registrationForm.email.value,
        password: registrationForm.password.value,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Registration successful
          console.log("User created successfully");
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
          <form>
            <Input {...registrationForm.name} />
            <Input {...registrationForm.email} />
            <Input {...registrationForm.password} />
            <Input {...registrationForm.dateOfBirth} />
            <Input {...registrationForm.handle} />

            <div className="mt-6">
              <button
                type="button"
                onClick={onSubmitForm}
                className="px-4 w-full border rounded-full py-2 bg-blue-600 text-white"
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
