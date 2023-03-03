import ProfilePicture from "./Tweet/ProfilePicture";
import strings from "@/constants/ui/strings";

export default function UserInfo({ user }) {
  const uiText = strings.EN.FOLLOW;

  return (
    <div className="flex w-full gap-4 px-4">
      <div className="w-12">
        <ProfilePicture handle={user.handle} />
      </div>
      <div className="grow">
        <div className="w-full flex justify-between items-center">
          <div>
            <div className="font-semibold">{user.name}</div>
            <div className="text-sm text-gray-700">@{user.handle}</div>
          </div>
          <button className="border border-gray-600 rounded-full px-8 py-0.5 text-sm">
            {uiText.follow}
          </button>
        </div>
        <p>{user.bio}</p>
      </div>
    </div>
  );
}
