import { useRef, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import ProfilePicture from "@/components/Tweet/ProfilePicture";

export default function ComposeTweet({ handle }) {
  const TEXT_CHAR_LIMIT = 240;
  const [textArea, setTextArea] = useState("");
  const tweetRef = useRef();

  const onTextAreaChange = (e) => {
    const input = e.target.value;

    if (input.length > TEXT_CHAR_LIMIT) {
      return;
    }

    setTextArea(input);
  };

  const getCharLimitIndicatorColor = () => {
    if (textArea.length > 200 && textArea.length < TEXT_CHAR_LIMIT) {
      return "text-yellow-600";
    }

    if (textArea.length >= TEXT_CHAR_LIMIT) {
      return "text-red-600";
    }
  };

  return (
    <>
      <div className="flex justify-start w-full gap-2">
        <div className="w-14">
          <ProfilePicture handle={handle} />
        </div>
        <div className="w-full">
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
              / 240
            </div>
            <button className="px-8 border rounded-full py-2 bg-blue-600 text-white flex justify-center items-center gap-2">
              Woof
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
