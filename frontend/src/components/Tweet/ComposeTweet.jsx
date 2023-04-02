import { useRef, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import ProfilePicture from "@/components/Tweet/ProfilePicture";
import { tweetRoute } from "@/constants/routes";
import { useEffect } from "react";
import { useRouter } from "next/router";
import session from "@/utils/session";

export default function ComposeTweet({ handle }) {
  const TEXT_CHAR_LIMIT = 280;
  const [textArea, setTextArea] = useState("");
  const [user, setUser] = useState({});
  const tweetRef = useRef();
  const router = useRouter();

  const onTextAreaChange = (e) => {
    const input = e.target.value;

    if (input.length > TEXT_CHAR_LIMIT) {
      return;
    }

    setTextArea(input);
  };

  useEffect(() => {
    setUser(session.getUser());
  }, []);

  const getCharLimitIndicatorColor = () => {
    if (textArea.length > 200 && textArea.length < TEXT_CHAR_LIMIT) {
      return "text-yellow-600";
    }

    if (textArea.length >= TEXT_CHAR_LIMIT) {
      return "text-red-600";
    }
  };

  const onTweetSubmit = (e) => {
    e.preventDefault();

    fetch(tweetRoute, {
      method: "POST",
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
            // @TODO: Redirect the user to the single tweet view
            router.push(`/${user.handle}/status/${body.data.tweet.id}`);
          });
        } else {
          // If create tweet fails
          response.json().then((data) => {
            console.error(data.message);
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
          <ReactTextareaAutosize
            minRows={1}
            maxRows={10}
            value={textArea}
            onChange={onTextAreaChange}
            placeholder="What's happening?"
            className="w-full rounded text-xl px-4 py-2 border-gray-600 resize-none outline-none"
          />
          <div className="flex justify-end mt-4 items-center gap-4">
            <div className={textArea.length ? "block" : "hidden"}>
              <span className={getCharLimitIndicatorColor()}>
                {textArea.length}
              </span>{" "}
              / {TEXT_CHAR_LIMIT}
            </div>
            <button
              type="submit"
              disabled={!textArea}
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
