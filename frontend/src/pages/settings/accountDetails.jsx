import strings from "@/constants/ui/strings";
import Input from "@/components/Form/Input";
import { BASE_URL } from "@/constants/routes";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import session from "@/utils/session";
import { useRouter } from "next/router";

export default function AccountDetailsPage() {
  const uiText = strings.EN.SETTINGS;
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getUserFromServer = async () => {
      try {
        const userRes = await fetch(`${BASE_URL}/user`, {
          credentials: "include",
        });
        const userResBody = await userRes.json();
        const user = userResBody.data.user;
        setBio(user.bio);
        setWebsite(user.website);
      } catch (error) {
        console.log(error);
      }
    };

    getUserFromServer();
  }, []);

  const onSubmitUpdateDetails = async (e) => {
    e.preventDefault();

    fetch(`${BASE_URL}/user`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bio,
        website,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Redirect the user to their profile page
          response.json().then((body) => {
            toast.success("Profile updated successfully");
          });
          const { handle } = session.getUser();
          router.push(`/${handle}`);
        } else {
          // Login failed
          response.json().then((body) => {
            toast.error(
              "There was an error changing your details. Please try again"
            );
          });
        }
      })
      .catch((error) => {
        console.error("Error changing password", error);
      });
  };

  return (
    <div className="pt-2">
      <h2 className="font-bold text-2xl">{uiText.accountDetails}</h2>
      <div className="mt-4">
        <form onSubmit={onSubmitUpdateDetails}>
          <div>
            <label htmlFor="bio">{uiText.yourBio}</label>
            <input
              type="text"
              id="bio"
              name="bio"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="website">{uiText.website}</label>
            <input
              type="url"
              id="website"
              name="website"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={!bio || !website}
            className="px-4 w-full border rounded-full py-2 bg-blue-600 text-white mt-4 disabled:opacity-60"
          >
            {uiText.update}
          </button>
        </form>
      </div>
    </div>
  );
}
