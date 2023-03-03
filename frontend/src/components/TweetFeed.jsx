import Tweet from "@/components/Tweet/SingleTweet";

export default function TweetFeed({ tweets }) {
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
