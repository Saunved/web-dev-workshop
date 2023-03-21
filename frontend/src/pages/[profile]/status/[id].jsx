import Tweet from "@/components/Tweet/SingleTweet";
import tweets from "@/mock/tweets";

export default function SingleUserTweet() {
  return <Tweet tweet={tweets[0]} />;
}
