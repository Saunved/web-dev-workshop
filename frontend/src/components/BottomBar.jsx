import { House, User, Gear } from "phosphor-react";

import Link from "next/link";

import { useState, useEffect } from "react";
import session from "@/utils/session";

export default function BottomBar({}) {
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
    <div className="fixed bottom-0 inset-x-0 w-full px-2 py-2 shadow h-12 border-t bg-white md:hidden">
      <div className="grid grid-cols-3 justify-items-center items-center">
        <Link href="/home">
          <House size={28} />
        </Link>
        <Link href={`/${user.handle}`}>
          <User size={28} />
        </Link>
        <Link href="/settings">
          <Gear size={28} />
        </Link>
      </div>
    </div>
  );
}
