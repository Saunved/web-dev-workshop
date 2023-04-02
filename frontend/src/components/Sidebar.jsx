import {
  Dog,
  House,
  MagnifyingGlass,
  Bell,
  EnvelopeSimple,
  BookmarkSimple,
  User,
  Gear,
} from "phosphor-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import session from "@/utils/session";

export default function Sidebar() {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setUser(session.getUser());
    setIsLoggedIn(session.isLoggedIn());
  }, []);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="fixed top-0 w-20">
      <div className="grid justify-center items-start mt-4 gap-8 bg-white">
        <Dog size={28} className="text-purple-700" weight="fill"></Dog>
        <Link href="/home">
          <House size={28}></House>
        </Link>
        <MagnifyingGlass size={28} className="text-gray-300"></MagnifyingGlass>
        <Bell size={28} className="text-gray-300"></Bell>
        <EnvelopeSimple size={28} className="text-gray-300"></EnvelopeSimple>
        <BookmarkSimple size={28} className="text-gray-300" />
        <Link href={`/${user.handle}`}>
          <User size={28}></User>
        </Link>
        <Link href="/settings">
          <Gear size={28}></Gear>
        </Link>
      </div>
      <div className="fixed bottom-8 ml-3 w-20 text-center">
        <Link href={`/${user.handle}`}>
          <img
            src={`https://api.dicebear.com/5.x/bottts-neutral/svg?seed=${user.handle}`}
            className="rounded-full w-12 h-12"
            alt=""
          />
        </Link>
      </div>
    </div>
  );
}
