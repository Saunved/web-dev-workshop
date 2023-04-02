import { BASE_URL } from "@/constants/routes";
import {
  Heart,
  ChatCircle,
  Export,
  ArrowsCounterClockwise,
  ChartLine,
} from "phosphor-react";

export default function TweetActions({ tweet }) {
  const retweetTweet = async () => {};

  /**
   * Likes or unlikes a tweet depending on the state
   */
  const heartTweet = async () => {
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
        } else {
          response.json().then((data) => {
            console.error(data.message);
          });
        }
      })
      .catch((error) => {
        console.error("Error liking tweet", error);
      });
  };

  return (
    <div className="grid grid-flow-col gap-16 justify-start mt-4">
      <ChatCircle size={20} className="text-gray-700 hover:cursor-pointer" />
      <div onClick={retweetTweet} className="flex gap-2 items-center">
        <ArrowsCounterClockwise
          size={20}
          className="text-gray-700 hover:cursor-pointer"
        />
        <span className="text-sm">{tweet.retweetCount || 0}</span>
      </div>
      <div onClick={heartTweet} className="flex gap-2 items-center">
        <Heart size={20} className="text-gray-700 hover:cursor-pointer" />
        <span className="text-sm">{tweet.likeCount || 0}</span>
      </div>
      <ChartLine size={20} className="text-gray-700 hover:cursor-pointer" />
      <Export size={20} className="text-gray-700 hover:cursor-pointer" />
    </div>
  );
}
