import ComposeTweet from "@/components/Tweet/ComposeTweet";
import tweets from "@/mock/tweets";
import HomeFeedSwitcher from "@/components/HomeFeedSwitcher";
import TweetFeed from "@/components/TweetFeed";
import Head from "next/head";
import strings from "@/constants/ui/strings";

export default function HomeFeed() {
  const uiText = strings.EN.SITE;
  const title = `${uiText.home} / ${uiText.woofer}`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        <div className="sticky pt-4 top-0 bg-white bg-opacity-40 backdrop-blur-lg rounded">
          <h1 className="font-bold text-2xl px-4">{uiText.home}</h1>
          <HomeFeedSwitcher />
        </div>

        <div className="mt-4 px-4">
          <ComposeTweet handle={tweets[0].handle} />
        </div>
        <hr className="mt-4" />

        <TweetFeed tweets={tweets} />
      </div>
    </>
  );
}
