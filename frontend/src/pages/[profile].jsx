import HeaderImage from "@/components/Profile/HeaderImage";
import HeaderProfilePicture from "@/components/Profile/HeaderProfilePicture";
import { Calendar } from "phosphor-react";
import tweets from "@/mock/tweets";
import Head from "next/head";
import TweetFeed from "@/components/TweetFeed";
import Link from "next/link";
import strings from "@/constants/ui/strings";

export default function ProfilePage() {
  const uiTextFollow = strings.EN.FOLLOW;
  const uiTextProfile = strings.EN.PROFILE;
  const uiTextSite = strings.EN.SITE;
  const title = `${uiTextSite.home} / ${uiTextSite.woofer}`;

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
            <button className="border border-gray-600 rounded-full px-8 py-1">
              {uiTextFollow.follow}
            </button>
          </div>
        </div>
        <div className="px-4 mt-8">
          <p className="font-bold">John Doe</p>
          <p className="text-gray-500">@johndoe</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab numquam
            labore veniam temporibus commodi. Mollitia eum commodi praesentium
            expedita ab.
          </p>
          <div className="flex justify-start items-center gap-2 mt-4 text-gray-500">
            <Calendar size={24} className="text-gray-500" />
            <p className="text-sm">{uiTextProfile.joined} 12 May, 2016</p>
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
