import ComposeTweet from "@/components/Tweet/ComposeTweet";
import HomeFeedSwitcher from "@/components/HomeFeedSwitcher";
import TweetFeed from "@/components/TweetFeed";
import Head from "next/head";
import strings from "@/constants/ui/strings";
import { useState, useEffect } from "react";
import { BASE_URL } from "@/constants/routes";
import session from "@/utils/session";

export default function HomeFeed({ tweets }) {
  const uiText = strings.EN.SITE;
  const title = `${uiText.home} / ${uiText.woofer}`;
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setUser(session.getUser());
    setIsLoggedIn(session.isLoggedIn());
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
          <HomeFeedSwitcher />
        </div>

        <div className="mt-4 px-4">
          <ComposeTweet handle={user.handle} />
        </div>
        <hr className="mt-4" />

        <TweetFeed tweets={tweets} />
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const res = await fetch(`${BASE_URL}/tweets`);
    const body = await res.json();

    if (res.ok) {
      return {
        props: {
          tweets: body.data.tweets,
        },
      };
    } else {
      return {
        props: {
          tweets: [],
        },
      };
    }
  } catch (error) {
    return {
      props: {
        tweets: [],
      },
    };
  }
}
