import Tweet from "@/components/Tweet/SingleTweet";
import { Bars } from "react-loader-spinner";

export default function TweetFeed({ tweets, loading }) {
  if (!tweets.length) {
    return <div className="text-center my-8">No woofs to show right now!</div>;
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
    <div className="mb-12">
      {tweets.map((tweet, idx) => {
        return (
          <div key={idx}>
            <Tweet tweet={tweet} /> <hr />{" "}
          </div>
        );
      })}
    </div>
  );
}
