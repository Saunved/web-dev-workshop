import UserList from "@/components/UserList";
import users from "@/mock/users";
import strings from "@/constants/ui/strings";

export default function FollowingPage() {
  const uiText = strings.EN.FOLLOW;

  return (
    <div className="min-h-screen">
      <div>
        <h1 className="text-2xl font-bold px-4 mt-2">{uiText.following}</h1>
      </div>
      <section className="mt-6">
        <UserList users={users} />
      </section>
    </div>
  );
}
