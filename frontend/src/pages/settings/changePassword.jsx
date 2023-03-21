import strings from "@/constants/ui/strings";
import { useState } from "react";
import Input from "@/components/Form/Input";
import PasswordLabel from "@/components/Form/PasswordLabel";

export default function ChangePassword() {
  const uiText = strings.EN.SETTINGS;

  const onInputChange = (e) => {
    const name = e.target.name;
    const _changePasswordForm = { ...changePasswordForm };
    _changePasswordForm[name].value = e.target.value;
    setChangePasswordForm(_changePasswordForm);
  };

  const onShowPasswordToggle = (status, name) => {
    const _changePasswordForm = { ...changePasswordForm };
    _changePasswordForm[name].type = status ? "text" : "password";
    setChangePasswordForm(_changePasswordForm);
  };

  const [changePasswordForm, setChangePasswordForm] = useState({
    currentPassword: {
      label: (
        <PasswordLabel
          onShowPasswordToggle={onShowPasswordToggle}
          name="currentPassword"
        />
      ),
      htmlFor: "currentPassword",
      type: "password",
      required: true,
      errorText: "",
      value: "",
      onChange: onInputChange,
      validate: () => {},
    },
    newPassword: {
      label: (
        <PasswordLabel
          onShowPasswordToggle={onShowPasswordToggle}
          name="newPassword"
        />
      ),
      htmlFor: "newPassword",
      type: "password",
      required: true,
      errorText: "",
      value: "",
      onChange: onInputChange,
      validate: () => {},
    },
    newPasswordAgain: {
      label: (
        <PasswordLabel
          onShowPasswordToggle={onShowPasswordToggle}
          name="newPasswordAgain"
        />
      ),
      htmlFor: "newPasswordAgain",
      type: "password",
      required: true,
      errorText: "",
      value: "",
      onChange: onInputChange,
      validate: () => {},
    },
  });

  return (
    <div>
      <h2 className="font-bold text-2xl">{uiText.changePassword}</h2>
      <form>
        <Input {...changePasswordForm.currentPassword} />
        <Input {...changePasswordForm.newPassword} />
        <Input {...changePasswordForm.newPasswordAgain} />

        <div className="mt-8">
          <button className="px-4 w-full border rounded-full py-2 bg-blue-600 text-white mt-4">
            {uiText.changePassword}
          </button>
        </div>
      </form>
    </div>
  );
}
