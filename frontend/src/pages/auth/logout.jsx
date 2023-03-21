import { useEffect } from "react";
import strings from "@/constants/ui/strings";

export default function LogoutPage() {
  const uiText = strings.EN.LOGOUT;

  useEffect(() => {
    // Todo: Log out API call
  }, []);

  return <div className="text-center mt-12">{uiText.loggingYouOut}</div>;
}
