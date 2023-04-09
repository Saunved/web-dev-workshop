import Tweet from "@/components/Tweet/SingleTweet";
import { Bars } from "react-loader-spinner";

export default function TweetFeed({ tweets, loading }) {
  if (/* Task 4: Write a JavaScript expression here to check if tweets are empty */) {
    return <div className="text-center my-8">No tweets to show right now!</div>;
  }

  if (loading) {
    return (
      <div className="flex justify-center w-full p-8">
        <Bars
          height="100"
          width="120"
          color="#0074d9"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <>
      {tweets.map((tweet) => {
        return (
          // Task 5:
          // We want to "map" each tweet to the Tweet UI component here.
          // The mapping function is already written (see "tweets.map"). You have to write a one-liner
          // to map the Tweet UI component to it
        );
      })}
    </>
  );
}
