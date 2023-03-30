import { useEffect } from "react";
import strings from "@/constants/ui/strings";
import { BASE_URL } from "@/constants/routes";
import { useRouter } from "next/router";
import session from "@/utils/session";

export default function LogoutPage() {
  const uiText = strings.EN.LOGOUT;
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
              console.error(data.message);
            });
          }
        })
        .catch((error) => {
          console.error("Error liking tweet", error);
        });
    }, 500);
  }, []);

  return <div className="text-center mt-12">{uiText.loggingYouOut}</div>;
}
