import Tweet from "@/components/Tweet/SingleTweet";

export default function TweetFeed({ tweets }) {
  if (!tweets.length) {
    return <div className="text-center my-8">No tweets to show right now!</div>;
  }

  return (
    <>
      {tweets.map((tweet, idx) => {
        return (
          <div key={idx}>
            <Tweet tweet={tweet} /> <hr />{" "}
          </div>
        );
      })}
    </>
  );
}
