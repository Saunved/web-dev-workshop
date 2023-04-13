import { useEffect } from "react";
import strings from "@/constants/ui/strings";
import { BASE_URL } from "@/constants/routes";
import { useRouter } from "next/router";
import session from "@/utils/session";
import toast from "react-hot-toast";

export default function LogoutPage() {
  const uiText = strings.EN.LOGOUT;
  const uiTextError = strings.EN.ERROR;
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      session.clearUser();
      fetch(`${BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            router.push("/");
          } else {
            response.json().then((data) => {
              if (data?.message) {
                toast.error(data.message);
              } else {
                toast.error(uiTextError.somethingWentWrong);
              }
            });
          }
        })
        .catch((error) => {
          console.error("Error liking woof", error);
        });
    }, 500);
  }, []);

  return <div className="text-center mt-12">{uiText.loggingYouOut}</div>;
}
