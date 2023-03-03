import { SmileySad } from "phosphor-react";
import strings from "@/constants/ui/strings";

export default function UserNotFound() {
  const uiText = strings.EN.ERROR.userNotFound;

  return (
    <main className="grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="flex justify-center text-base font-semibold text-indigo-600">
          <SmileySad size={64} />
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {uiText}
        </h1>
      </div>
    </main>
  );
}
