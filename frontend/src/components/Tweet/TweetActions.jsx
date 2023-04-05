import { BASE_URL } from "@/constants/routes";
import {
  Heart,
  ChatCircle,
  Export,
  ArrowsCounterClockwise,
  ChartLine,
} from "phosphor-react";
import { useState, useEffect } from "react";
import session from "@/utils/session";
import strings from "@/constants/ui/strings";
import toast from "react-hot-toast";

export default function TweetActions({ tweet }) {
  const uiText = strings.EN.ERROR;
  const [isLiked, setIsLiked] = useState(tweet.isLikedByUser);
  const [isRetweeted, setIsRetweeted] = useState(tweet.isRetweetedByUser);
  const [likeCount, setLikeCount] = useState(tweet.likeCount);
  const [retweetCount, setRetweetCount] = useState(tweet.retweetCount);
  const [disableLikeButton, setDisableLikeButton] = useState(false);
  const [disableRetweetButton, setDisableRetweetButton] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = session.getUser();
    if (user.handle === tweet.retweeter) {
      setIsRetweeted(true);
    }
    setUser(user);
  }, []);

  const retweet = async () => {
    setDisableRetweetButton(true);
    fetch(`${BASE_URL}/retweet/${tweet.id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // Reflect the like or toggled like
          setIsRetweeted(true);
          setRetweetCount(retweetCount + 1);
        } else {
          response.json().then((body) => {
            if (body?.message) {
              toast.error(body.message);
            } else {
              toast.error(uiText.somethingWentWrong);
            }
          });
        }
        setDisableRetweetButton(false);
      })
      .catch((error) => {
        console.error("Error liking tweet", error);
      });
  };

  const unRetweet = async () => {
    setDisableRetweetButton(true);
    fetch(`${BASE_URL}/retweet/${tweet.id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // Reflect the like or toggled like
          setIsRetweeted(false);
          setRetweetCount(retweetCount - 1);
        } else {
          response.json().then((body) => {
            if (body?.message) {
              toast.error(body.message);
            } else {
              toast.error(uiText.somethingWentWrong);
            }
          });
        }
        setDisableRetweetButton(false);
      })
      .catch((error) => {
        console.error("Error liking tweet", error);
      });
  };

  /**
   * Likes or unlikes a tweet depending on the state
   */
  const likeTweet = async () => {
    setDisableLikeButton(true);
    fetch(`${BASE_URL}/tweet/like/${tweet.id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // Reflect the like or toggled like
          setIsLiked(true);
          setLikeCount(likeCount + 1);
        } else {
          response.json().then((body) => {
            if (body?.message) {
              toast.error(body.message);
            } else {
              toast.error(uiText.somethingWentWrong);
            }
          });
        }
        setDisableLikeButton(false);
      })
      .catch((error) => {
        console.error("Error liking tweet", error);
      });
  };

  /**
   * Likes or unlikes a tweet depending on the state
   */
  const unlikeTweet = async () => {
    setDisableLikeButton(true);
    fetch(`${BASE_URL}/tweet/unlike/${tweet.id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // Reflect the like or toggled like
          setIsLiked(false);
          setLikeCount(likeCount - 1);
        } else {
          response.json().then((body) => {
            if (body?.message) {
              toast.error(body.message);
            } else {
              toast.error(uiText.somethingWentWrong);
            }
          });
        }
        setDisableLikeButton(false);
      })
      .catch((error) => {
        console.error("Error liking tweet", error);
      });
  };

  return (
    <div className="grid grid-flow-col gap-8 justify-start mt-4">
      <button
        disabled={user.handle === tweet.handle}
        onClick={isRetweeted ? unRetweet : retweet}
        className="flex gap-2 items-center disabled:opacity-60 hover:cursor-pointer disabled:hover:cursor-default"
      >
        <ArrowsCounterClockwise
          size={20}
          className={`text-gray-700 ${isRetweeted ? "text-green-600" : ""}`}
        />
        <span className="text-sm">{retweetCount || 0}</span>
      </button>
      <button
        disabled={disableLikeButton}
        onClick={isLiked ? unlikeTweet : likeTweet}
        className="flex gap-2 items-center"
      >
        <Heart
          weight={isLiked ? "fill" : "regular"}
          size={20}
          className={`text-gray-700 hover:cursor-pointer ${
            isLiked ? "text-red-600" : ""
          }`}
        />
        <span className="text-sm">{likeCount || 0}</span>
      </button>
    </div>
  );
}
