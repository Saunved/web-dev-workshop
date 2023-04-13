import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    // If the user is logged in
    // Router.push("/home");
    // Else
    // Show log in or sign up modals
    // Router.push("/auth/login");
  }, []);

  return (
    <div className="px-4">
      <h1 className="text-2xl font-bold py-4">Pages index</h1>
      <div className="flex flex-wrap gap-4">
        <Link href="/auth/login">Login</Link>
        <Link className="mx-0" href="/auth/register">
          Registration
        </Link>
        <Link href="/home">Home</Link>
        <Link href="/@johndoe">Profile</Link>
        <Link href="/settings">Settings</Link>
        <Link href="/settings/changePassword">Change password</Link>
        <Link href="/settings/accountDetails">Account details</Link>
        <Link href="/followers">Followers</Link>
        <Link href="/following">Following</Link>
        <Link href="/@johndoe1/status/123">Single woof view</Link>
      </div>
    </div>
  );
}
