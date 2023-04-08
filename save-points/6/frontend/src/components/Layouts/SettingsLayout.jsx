import { CaretRight } from "phosphor-react";
import Link from "next/link";
import strings from "@/constants/ui/strings";
import { useState } from "react";

export default function SettingsLayout({ children }) {
  const [uiText, setUiText] = useState(strings.EN.SETTINGS);

  return (
    <div className="min-h-screen w-full">
      <div className="grid grid-cols-3 h-full min-h-screen divide-x">
        <div className="col-span-1">
          <h1 className="text-2xl font-bold px-4 mt-2 overflow-y-hidden">
            {uiText.settings}
          </h1>

          <div className="mt-12 px-4 col-span-1 flex flex-col gap-6">
            <Link
              href="/settings/accountDetails"
              className="flex justify-between items-center cursor-pointer"
            >
              <p className="text-lg">{uiText.accountDetails}</p>
              <CaretRight size={18} />
            </Link>
            <Link
              href="/settings/changePassword"
              className="flex justify-between items-center cursor-pointer"
            >
              <p className="text-lg">{uiText.changePassword}</p>
              <CaretRight size={18} />
            </Link>

            <Link
              href="/auth/logout"
              className="flex justify-between items-center cursor-pointer"
            >
              <p className="text-lg">{uiText.logout}</p>
              <CaretRight size={18} />
            </Link>
          </div>
        </div>
        <main className="px-4 col-span-2">{children}</main>
      </div>
    </div>
  );
}
