import { useState } from "react";
import strings from "@/constants/ui/strings";

export default function PasswordLabel({ onShowPasswordToggle, name }) {
  const [showPassword, setShowPassword] = useState(false);
  const passwordToggleText = showPassword ? "Hide" : "Show";
  const uiText = strings.EN.REGISTER_FLOW;

  return (
    <div className="flex justify-between">
      <p className="font-semibold">{uiText.password}</p>
      <div
        className="font-normal text-sm cursor-pointer"
        onClick={() => {
          setShowPassword(!showPassword);
          onShowPasswordToggle(!showPassword, name);
        }}
      >
        {passwordToggleText}
      </div>
    </div>
  );
}
