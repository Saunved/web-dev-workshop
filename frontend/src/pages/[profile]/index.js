import HeaderImage from "@/components/Profile/HeaderImage";
import HeaderProfilePicture from "@/components/Profile/HeaderProfilePicture";
import { Calendar } from "phosphor-react";
import Head from "next/head";
import TweetFeed from "@/components/TweetFeed";
import Link from "next/link";
import strings from "@/constants/ui/strings";
import { useRouter } from "next/router";
import UserNotFound from "@/components/Error/UserNotFound";
import { BASE_URL } from "@/constants/routes";
import { useState, useEffect } from "react";
import { getHumanReadableDate } from "@/utils/date";

export default function ProfilePage({ user, tweets }) {
  const uiTextFollow = strings.EN.FOLLOW;
  const uiTextProfile = strings.EN.PROFILE;
  const uiTextSite = strings.EN.SITE;
  const title = `${uiTextSite.home} / ${uiTextSite.woofer}`;
  const [userIsSelf, setUserIsSelf] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const handle = localStorage.getItem("userHandle");
    if (handle === router.query.profile) {
      setUserIsSelf(true);
    }
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <HeaderImage />
        <div className="grid grid-flow-col space-between">
          <div className="-mt-16 pl-8">
            <HeaderProfilePicture />
          </div>
          <div className="mt-6 text-right mr-6">
            {userIsSelf ? null : (
              <button className="border border-gray-600 rounded-full px-8 py-1">
                {uiTextFollow.follow}
              </button>
            )}
          </div>
        </div>
        <div className="px-4 mt-8">
          <p className="font-bold">{user.name}</p>
          <p className="text-gray-500">@{user.handle}</p>
          <p>{user.bio}</p>
          <div className="flex justify-start items-center gap-2 mt-4 text-gray-500">
            <Calendar size={24} className="text-gray-500" />
            <p className="text-sm">
              {uiTextProfile.joined} {getHumanReadableDate(user.createdAt)}
            </p>
          </div>

          <div className="mt-4 flex justify-start gap-6">
            <Link href="/following">
              <b>0</b> {uiTextFollow.following}
            </Link>

            <Link href="/followers">
              <b>0</b> {uiTextFollow.followers}
            </Link>
          </div>
        </div>
        <hr className="my-6" />
        <div>
          <h2 className="text-xl font-bold px-4">{uiTextProfile.woofs}</h2>
          <TweetFeed tweets={tweets} />
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps({ params }) {
  if (params.profile) {
    const [profileRes, tweetsRes] = await Promise.all([
      fetch(`${BASE_URL}/user/from/${params.profile}`),
      fetch(`${BASE_URL}/tweets/handle/${params.profile}`),
    ]);
    const profileResBody = await profileRes.json();
    const tweetsResBody = await tweetsRes.json();
    console.log(tweetsResBody);
    return {
      props: {
        user: profileResBody.data.user,
        tweets: tweetsResBody.data.tweets,
      },
    };
  }
}
