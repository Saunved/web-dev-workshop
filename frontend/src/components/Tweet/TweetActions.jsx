import { BASE_URL } from "@/constants/routes";
import {
  Heart,
  ChatCircle,
  Export,
  ArrowsCounterClockwise,
  ChartLine,
} from "phosphor-react";
import { useState, useEffect } from "react";

export default function TweetActions({ tweet }) {
  const [isLiked, setIsLiked] = useState(tweet.isLikedByUser);
  const [isRetweeted, setIsRetweeted] = useState(tweet.isRetweetedByUser);
  const [likeCount, setLikeCount] = useState(tweet.likeCount);
  const [retweetCount, setRetweetCount] = useState(tweet.retweetCount);
  const [disableLikeButton, setDisableLikeButton] = useState(false);
  const [disableRetweetButton, setDisableRetweetButton] = useState(false);

  const retweet = async () => {
    disableRetweetButton(true);
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
          setLikeCount(retweetCount + 1);
        } else {
          response.json().then((data) => {
            console.error(data.message);
          });
        }
        setDisableRetweetButton(false);
      })
      .catch((error) => {
        console.error("Error liking tweet", error);
      });
  };

  const unRetweet = async () => {
    disableRetweetButton(true);
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
          setLikeCount(retweetCount - 1);
        } else {
          response.json().then((data) => {
            console.error(data.message);
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
          response.json().then((data) => {
            console.error(data.message);
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
          response.json().then((data) => {
            console.error(data.message);
          });
        }
        setDisableLikeButton(false);
      })
      .catch((error) => {
        console.error("Error liking tweet", error);
      });
  };

  return (
    <div className="grid grid-flow-col gap-16 justify-start mt-4">
      <ChatCircle size={20} className="text-gray-700 hover:cursor-pointer" />
      <div
        onClick={isRetweeted ? unRetweet : retweet}
        className="flex gap-2 items-center"
      >
        <ArrowsCounterClockwise
          size={20}
          className={`text-gray-700 hover:cursor-pointer ${
            isRetweeted ? "text-green-600" : ""
          }`}
        />
        <span className="text-sm">{tweet.retweetCount || 0}</span>
      </div>
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
      <ChartLine size={20} className="text-gray-700 hover:cursor-pointer" />
      <Export size={20} className="text-gray-700 hover:cursor-pointer" />
    </div>
  );
}
