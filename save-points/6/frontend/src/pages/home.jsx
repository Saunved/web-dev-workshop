import ComposeTweet from "@/components/Tweet/ComposeTweet";
import HomeFeedSwitcher from "@/components/HomeFeedSwitcher";
import TweetFeed from "@/components/TweetFeed";
import Head from "next/head";
import strings from "@/constants/ui/strings";
import { useState, useEffect } from "react";
import { BASE_URL } from "@/constants/routes";
import session from "@/utils/session";
import preferences from "@/utils/preferences";

export default function HomeFeed() {
  const uiText = strings.EN.SITE;
  const title = `${uiText.home} / ${uiText.woofer}`;
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tweetFeed, setTweetFeed] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadFollowingTweets = async () => {
    preferences.setFeed("following");
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/tweets/following`, {
        credentials: "include",
      });
      const body = await res.json();

      if (res.ok) {
        setTweetFeed(body.data.tweets);
      } else {
        setTweetFeed([]);
      }
      setIsLoading(false);
    } catch (error) {
      setTweetFeed([]);
      setIsLoading(false);
    }
  };

  const loadGlobalTweets = async () => {
    try {
      preferences.setFeed("global");
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/tweets`, { credentials: "include" });
      const body = await res.json();

      if (res.ok) {
        setTweetFeed(body.data.tweets);
      } else {
        setTweetFeed([]);
      }
      setIsLoading(false);
    } catch (error) {
      setTweetFeed([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setUser(session.getUser());
    setIsLoggedIn(session.isLoggedIn());

    const preferredFeed = preferences.getFeed();
    if (preferredFeed === "global") {
      loadGlobalTweets();
      return;
    }

    loadFollowingTweets();
  }, []);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        <div className="sticky pt-4 top-0 bg-white bg-opacity-40 backdrop-blur-lg rounded">
          <h1 className="font-bold text-2xl px-4">{uiText.home}</h1>
          <HomeFeedSwitcher
            onClickFollowingTweets={loadFollowingTweets}
            onClickForYouTweets={loadGlobalTweets}
            feed={preferences.getFeed()}
          />
        </div>

        <div className="mt-4 px-4">
          <ComposeTweet handle={user.handle} />
        </div>
        <hr className="mt-4" />

        <TweetFeed tweets={tweetFeed} loading={isLoading} />
      </div>
    </>
  );
}
