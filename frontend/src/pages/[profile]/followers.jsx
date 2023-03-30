import UserList from "@/components/UserList";
import strings from "@/constants/ui/strings";
import { BASE_URL } from "@/constants/routes";

export default function FollowersPage({ users = [] }) {
  const uiText = strings.EN.FOLLOW;

  return (
    <div className="min-h-screen">
      <div>
        <h1 className="text-2xl font-bold px-4 mt-2">{uiText.followers}</h1>
      </div>
      <section className="mt-6">
        <UserList users={users} />
      </section>
    </div>
  );
}

export async function getServerSideProps({ res, params }) {
  try {
    if (params.profile) {
      const followingRes = await fetch(
        `${BASE_URL}/followers/${params.profile}`
      );
      const followingResBody = await followingRes.json();
      console.log(followingResBody);

      return {
        props: {
          users: followingResBody.data.users,
        },
      };
    }
  } catch (error) {
    console.log(error);
    return {
      props: {
        users: [],
      },
    };
  }
}
