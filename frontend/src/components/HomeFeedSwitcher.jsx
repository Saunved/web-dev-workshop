import strings from "@/constants/ui/strings";

export default function HomeFeedSwitcher() {
  const uiText = strings.EN.FEED;

  return (
    <>
      <div className="grid grid-cols-2 justify-center items-center mt-8">
        <h2 className="text-center font-bold text-lg cursor-pointer">
          {uiText.forYou}
        </h2>
        <h2 className="text-center font-bold text-lg text-gray-600 cursor-pointer">
          {uiText.following}
        </h2>
      </div>
      <hr className="mt-4" />
    </>
  );
}
