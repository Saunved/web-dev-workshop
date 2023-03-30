import strings from "@/constants/ui/strings";
import Input from "@/components/Form/Input";
import { BASE_URL } from "@/constants/routes";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function AccountDetailsPage() {
  const uiText = strings.EN.SETTINGS;
  const [userFromServer, setUserFromServer] = useState({});

  const onInputChange = (e) => {
    const name = e.target.name;
    const _accountDetailsForm = { ...accountDetailsForm };
    _accountDetailsForm[name].value = e.target.value;
    setAccountDetailsForm(_accountDetailsForm);
  };

  useEffect(() => {
    const getUserFromServer = async () => {
      try {
        const userRes = await fetch(`${BASE_URL}/user`, {
          credentials: "include",
        });
        const userResBody = await userRes.json();
        const user = userResBody.data.user;
        setUserFromServer(user);

        _accountDetailsForm = { ...accountDetailsForm };
        _accountDetailsForm.bio.value = user.bio;
        _accountDetailsForm.website.value = user.website;
      } catch (error) {
        console.log(error);
      }
    };

    getUserFromServer();
  }, []);

  const [accountDetailsForm, setAccountDetailsForm] = useState({
    bio: {
      label: uiText.yourBio,
      htmlFor: "bio",
      type: "textarea",
      required: true,
      errorText: "",
      value: "",
      onChange: onInputChange,
      validate: () => {},
    },
    website: {
      label: uiText.website,
      htmlFor: "website",
      type: "url",
      required: false,
      errorText: "",
      value: "",
      onChange: onInputChange,
      validate: () => {},
    },
  });

  const onSubmitUpdateDetails = async (e) => {
    e.preventDefault();

    fetch(`${BASE_URL}/user`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bio: accountDetailsForm.website.value,
        website: accountDetailsForm.bio.value,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Redirect the user to their profile page
          response.json().then((body) => {
            toast.success("Profile updated successfully");
          });
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
    <div>
      <h2 className="font-bold text-2xl">{uiText.accountDetails}</h2>
      <div className="mt-4">
        <form>
          <Input {...accountDetailsForm.bio} />
          <Input {...accountDetailsForm.website} />
        </form>

        <button
          onClick={onSubmitUpdateDetails}
          className="px-4 w-full border rounded-full py-2 bg-blue-600 text-white mt-4"
        >
          {uiText.update}
        </button>
      </div>
    </div>
  );
}
