import ProfilePicture from "@/components/Tweet/ProfilePicture";
import TweetHeader from "@/components/Tweet/TweetHeader";
import TweetContent from "@/components/Tweet/TweetContent";
import TweetActions from "@/components/Tweet/TweetActions";
import PropTypes from "prop-types";
import Link from "next/link";
import { getHumanReadableDate } from "@/utils/date";
import { Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import session from "@/utils/session";
import DeleteTweetModal from "@/components/DeleteTweetModal";
import { BASE_URL } from "@/constants/routes";
import strings from "@/constants/ui/strings";
import toast from "react-hot-toast";
export default function Tweet({ tweet }) {
  const uiText = strings.EN.ERROR;
  const [userHandle, setUserHandle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    setUserHandle(session.getUser().handle);
  });

  const onTweetDelete = () => {
    setIsLoading(true);
    fetch(`${BASE_URL}/tweet/${tweet.id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setIsDeleted(true);
        } else {
          response.json().then((body) => {
            if (body?.data?.message) {
              toast.error(body.data.message);
            } else {
              toast.error(uiText.somethingWentWrong);
            }
          });
        }
        setIsLoading(true);
      })
      .catch((error) => {
        console.error("Error deleting tweet", error);
      });
  };

  if (isDeleted) {
    return (
      <p className="text-center py-4 bg-gray-100">This woof was deleted</p>
    );
  }

  return (
    <>
      <article className="pt-4">
        {tweet.retweeter ? (
          <p className="pl-6 ml-14 font-semibold text-sm pb-1">
            Retweeted by{" "}
            <Link href={`/${tweet.retweeter}`} className="text-blue-500">
              {" "}
              @{tweet.retweeter}
            </Link>
          </p>
        ) : null}

        <div className="flex px-4 pb-4 justify-center gap-3">
          <div className="w-14 flex justify-between">
            <Link href={"/" + tweet.handle}>
              <ProfilePicture handle={tweet.handle} />
            </Link>
          </div>
          <div className="w-full">
            <Link href={"/" + tweet.handle} className="hover:no-underline">
              <TweetHeader
                name={tweet.name}
                handle={tweet.handle}
                time={
                  tweet.createdAt ? getHumanReadableDate(tweet.createdAt) : ""
                }
              />
            </Link>
            <Link href={`/${tweet.handle}/status/${tweet.id}`}>
              <TweetContent body={tweet.body} />
            </Link>
            {/* <LinkPreview /> -- try at home! */}
            <TweetActions tweet={tweet} />
          </div>
          {userHandle === tweet.handle ? (
            <button
              disabled={isLoading}
              className="self-start"
              onClick={() => setShowModal(true)}
            >
              <Trash size={20} />
            </button>
          ) : null}
        </div>
      </article>

      <DeleteTweetModal
        showModal={showModal}
        onDelete={onTweetDelete}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}

Tweet.propTypes = {
  tweet: PropTypes.shape({
    name: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    handle: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }),
};
