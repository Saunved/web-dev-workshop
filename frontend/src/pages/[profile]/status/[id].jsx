import Tweet from "@/components/Tweet/SingleTweet";
import { BASE_URL } from "@/constants/routes";
import strings from "@/constants/ui/strings";

export default function SingleUserTweet({ tweet }) {
  const uiText = strings.EN.TWEET;

  if (!tweet) {
    return <p className="min-h-screen h-full">{uiText.tweetNotFound}</p>;
  }

  return <Tweet tweet={tweet} />;
}

export async function getServerSideProps({ params }) {
  if (!params.id) {
    return {
      props: {
        tweet: null,
      },
    };
  }
  if (params.id) {
    try {
      const res = await fetch(`${BASE_URL}/tweet/${params.id}`);
      const body = await res.json();

      if (res.ok) {
        return {
          props: {
            tweet: body.data.tweet,
          },
        };
      } else {
        return {
          props: {
            tweet: null,
          },
        };
      }
    } catch (error) {
      return {
        props: {
          tweet: null,
        },
      };
    }
  }
}
