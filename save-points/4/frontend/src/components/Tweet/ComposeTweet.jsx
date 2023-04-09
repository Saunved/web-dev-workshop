import { useRef, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import ProfilePicture from "@/components/Tweet/ProfilePicture";
import { tweetRoute } from "@/constants/routes";
import { useEffect } from "react";
import { useRouter } from "next/router";
import session from "@/utils/session";
import strings from "@/constants/ui/strings";
import toast from "react-hot-toast";

export default function ComposeTweet({ handle }) {
  const uiText = strings.EN.ERROR;
  const TEXT_CHAR_LIMIT = 280;
  const [textArea, setTextArea] = useState("");
  const [user, setUser] = useState({});
  const tweetRef = useRef();
  const router = useRouter();

  const onTextAreaChange = (e) => {
    const input = e.target.value;

    // Task 2D: Restrict the end user from writing any more characters when they reach the maximum number of characters allowed.

    setTextArea(input);
  };

  useEffect(() => {
    setUser(session.getUser());
  }, []);

  const getCharLimitIndicatorColor = () => {
    if (textArea.length > 200 && textArea.length < TEXT_CHAR_LIMIT) {
      return "text-yellow-600";
    }

    // Task 2C : Make the character limit indicator turn red when the user reaches the limit
  };

  const onTweetSubmit = (e) => {
    e.preventDefault();

    fetch(tweetRoute, {
      // Task 3A : What HTTP request method do you think is most appropriate to use here
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: textArea,
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((body) => {
            // Task 3B - Redirect the user to the single tweet view
          });
        } else {
          response.json().then((body) => {
            // Task 3B - Show a toast error message in case the tweet creation fails
            // Hint: You can use the 'react-hot-toast' library to display messages via toast. We have already imported this library for you.
            // Refer: https://react-hot-toast.com/

            if (body?.message) {
            } else {
            }
          });
        }
      })
      .catch((error) => {
        console.error("Error creating tweet", error);
      });
  };

  return (
    <>
      <div className="flex justify-start w-full gap-2">
        <div className="w-14">
          <ProfilePicture handle={handle} />
        </div>
        <form onSubmit={onTweetSubmit} className="w-full">
          {/*
              Task 1A: We need to accept and store the tweet content in the appropriate variables
          */}
          <ReactTextareaAutosize
            minRows={1}
            maxRows={10}
            placeholder="What's happening?"
            className="w-full rounded text-xl px-4 py-2 border-gray-600 resize-none outline-none"
          />
          <div className="flex justify-end mt-4 items-center gap-4">
            {/*
              Task 2B: Show or hide the character limit indicator based on the tweet content.
              Hide the indicator when the tweet is empty; otherwise, show the indicator.
            */}
            <div>
              <span className={getCharLimitIndicatorColor()}>
                {textArea.length}
              </span>{" "}
              / {TEXT_CHAR_LIMIT}
            </div>
            <button
              // Task 1B : What would be type of the button?
              // Task 2A : Disble the button when tweet content is empty
              className="px-8 border rounded-full py-2 bg-blue-600 text-white flex justify-center items-center gap-2 disabled:opacity-60"
            >
              Woof
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
