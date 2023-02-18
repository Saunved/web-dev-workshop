import ProfilePicture from "@/components/Tweet/ProfilePicture";
import TweetHeader from "@/components/Tweet/TweetHeader";
import TweetContent from "@/components/Tweet/TweetContent";
import TweetActions from "@/components/Tweet/TweetActions";
import PropTypes from "prop-types";
import Link from "next/link";

export default function Tweet({ tweet }) {
  return (
    <article className="flex p-4 justify-center gap-3">
      <div className="w-14">
        <Link href={"/" + tweet.handle}>
          <ProfilePicture handle={tweet.handle} />
        </Link>
      </div>
      <div className="w-full">
        <Link href={"/" + tweet.handle} className="hover:no-underline">
          <TweetHeader
            name={tweet.name}
            handle={tweet.handle}
            time={tweet.created_at}
          />
        </Link>
        <TweetContent body={tweet.body} />
        {/* <LinkPreview /> -- try at home! */}
        <TweetActions />
      </div>
    </article>
  );
}

Tweet.propTypes = {
  tweet: PropTypes.shape({
    name: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    handle: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }),
};
