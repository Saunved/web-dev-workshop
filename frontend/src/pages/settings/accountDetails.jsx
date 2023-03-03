import strings from "@/constants/ui/strings";
import { useState } from "react";
import Input from "@/components/Form/Input";

export default function AccountDetailsPage() {
  const uiText = strings.EN.SETTINGS;

  const onInputChange = (e) => {
    const name = e.target.name;
    const _accountDetailsForm = { ...accountDetailsForm };
    _accountDetailsForm[name].value = e.target.value;
    setAccountDetailsForm(_accountDetailsForm);
  };

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

  return (
    <div>
      <h2 className="font-bold text-2xl">{uiText.accountDetails}</h2>
      <div className="mt-4">
        <form>
          <Input {...accountDetailsForm.bio} />
          <Input {...accountDetailsForm.website} />
        </form>

        <button className="px-4 w-full border rounded-full py-2 bg-blue-600 text-white mt-4">
          {uiText.update}
        </button>
      </div>
    </div>
  );
}
