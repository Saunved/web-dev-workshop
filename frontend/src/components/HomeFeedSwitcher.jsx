import strings from "@/constants/ui/strings";

export default function HomeFeedSwitcher({
  feed,
  onClickFollowingTweets,
  onClickForYouTweets,
}) {
  const uiText = strings.EN.FEED;

  return (
    <>
      <div className="grid grid-cols-2 justify-center items-center mt-8">
        <button
          onClick={onClickForYouTweets}
          className={`text-center text-lg cursor-pointer ${
            feed === "global" ? "font-bold" : "text-gray-600"
          }`}
        >
          {uiText.forYou}
        </button>
        <button
          onClick={onClickFollowingTweets}
          className={`text-center text-lg cursor-pointer ${
            feed === "following" ? "font-bold" : "text-gray-600"
          }`}
        >
          {uiText.following}
        </button>
      </div>
      <hr className="mt-4" />
    </>
  );
}
