import { BASE_URL } from "@/constants/routes";
import { Heart, ArrowsCounterClockwise } from "phosphor-react";
import { useState, useEffect } from "react";
import session from "@/utils/session";
import strings from "@/constants/ui/strings";
import toast from "react-hot-toast";

export default function TweetActions({ tweet }) {
  const uiText = strings.EN.ERROR;
  const [isLiked, setIsLiked] = useState(tweet.isLikedByUser);
  const [isRetweeted, setIsRetweeted] = useState(tweet.isRetweetedByUser);
  const [retweetCount, setRetweetCount] = useState(tweet.retweetCount);
  /**
   * Checkpoint 10, Task 1:
   */
  const [/* Use appropriate value and setter from the store for like "count" */] = useState(tweet.likeCount);
  /*
   * Checkpoint 10 Task 1:
   */
  const [/* Use the appropriate value & setter from the store for like state */] = useState(false);  
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
      /**
       * Checkpoint 10 Task 3:
       * @TODO: Use the correct HTTP method
       */
      method: "...",
      credentials: "include",
      headers: {
      /**
       * Checkpoint 10 Task 3:
       * @TODO: Use the correct content type
       */
      "Content-Type": "@TODO: Use the correct content type",
      },
    })
      .then((response) => {
        if (response.ok) {
          // Reflect the like or toggled like
          setIsLiked(true);
          /**
           * Checkpoint 10 Task 3:
           */
          setLikeCount( /* Update the like count in state */);
        } else {
          response.json().then((body) => {
            if (body?.data?.message) {
              toast.error(body.data.message);
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
    /**
     * Checkpoint 10 Task 4:
     * @TODO: Enable or disable the like button correctly before we unlike the tweet
     */

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
            if (body?.data?.message) {
              toast.error(body.data.message);
            } else {
              toast.error(uiText.somethingWentWrong);
            }
          });
        }
        /**
         * Checkpoint 10 Task 4:
         * @TODO: Enable/disable the button correctly
         */
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
        {/*
          * Checkpoint 10 Task 4:
          * @TODO: In the "button", set the disabled prop correctly based on
          * already liked or not
        */}
        {/*
          * Checkpoint 10 Task 3:
          * @TODO: In the "button", handle onClick based on whether the
          * tweet is already liked or not
        */}      
      <button
        className="flex gap-2 items-center"
      >
      {/*
        * Checkpoint 10 Task 2:
        * @TODO: In the Heart's component props, set the "weight" based on value of like to be "fill" or "regular"
      */}
      {/* Checkpoint 10 Task 2:
        @TODO: Also set the classes based on value of "like" ("text-red-600" or "")
      */}
        <Heart
          size={20}
          className={`text-gray-700 hover:cursor-pointer ${
            isLiked ? "text-red-600" : ""
          }`}
        />
        {/*
          * Checkpoint 10 Task 2:
          * @TODO: Show the number of likes text based on value
          * of like in the empty braces: {}
        */}        
        <span className="text-sm">{}</span>
      </button>
    </div>
  );
}
