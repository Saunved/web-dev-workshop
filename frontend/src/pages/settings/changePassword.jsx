import strings from "@/constants/ui/strings";
import { useState } from "react";
import Input from "@/components/Form/Input";
import PasswordLabel from "@/components/Form/PasswordLabel";
import { BASE_URL } from "@/constants/routes";
import toast from "react-hot-toast";

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

  const INITIAL_FORM_STATE = {
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
  };

  const onSubmitChangePassword = (e) => {
    e.preventDefault();

    fetch(`${BASE_URL}/user/change-password`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oldPassword: changePasswordForm.currentPassword.value,
        newPassword: changePasswordForm.newPassword.value,
        confirmPassword: changePasswordForm.newPasswordAgain.value,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Redirect the user to their profile page
          response.json().then((body) => {
            toast.success("Password changed successfully");
            // @TODO: Fix this, it doesn't work
            setChangePasswordForm(INITIAL_FORM_STATE);
          });
        } else {
          // Login failed
          response.json().then((body) => {
            toast.error(
              "There was an error changing your password. Check if your data is correct"
            );
          });
        }
      })
      .catch((error) => {
        console.error("Error logging in", error);
      });
  };

  const [changePasswordForm, setChangePasswordForm] =
    useState(INITIAL_FORM_STATE);

  return (
    <div>
      <h2 className="font-bold text-2xl">{uiText.changePassword}</h2>
      <form>
        <Input {...changePasswordForm.currentPassword} />
        <Input {...changePasswordForm.newPassword} />
        <Input {...changePasswordForm.newPasswordAgain} />

        <div className="mt-8">
          <button
            type="submit"
            onClick={onSubmitChangePassword}
            disabled={
              !changePasswordForm.currentPassword.value ||
              !changePasswordForm.newPassword.value ||
              !changePasswordForm.newPasswordAgain.value
            }
            className="px-4 w-full border rounded-full py-2 bg-blue-600 text-white mt-4 disabled:opacity-60"
          >
            {uiText.changePassword}
          </button>
        </div>
      </form>
    </div>
  );
}
