import ProfilePicture from "./Tweet/ProfilePicture";
import strings from "@/constants/ui/strings";
import Link from "next/link";

export default function UserInfo({ user }) {
  const uiText = strings.EN.FOLLOW;

  return (
    <Link href={`/${user.handle}`} className="flex w-full gap-4 px-4">
      <div className="w-12">
        <ProfilePicture handle={user.handle} />
      </div>
      <div className="grow">
        <div className="">
          <div className="font-semibold">{user.name}</div>
          <div className="text-sm text-gray-700">@{user.handle}</div>
        </div>
        <p>{user.bio}</p>
      </div>
    </Link>
  );
}
