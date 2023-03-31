import UserList from "@/components/UserList";
import users from "@/mock/users";
import strings from "@/constants/ui/strings";
import { BASE_URL } from "@/constants/routes";

export default function FollowingPage({ users }) {
  const uiText = strings.EN.FOLLOW;

  return (
    <div className="min-h-screen">
      <div>
        <h1 className="text-2xl font-bold px-4 mt-2">{uiText.following}</h1>
      </div>
      {!users.length ? (
        <section className="text-center my-8">
          Hmm, this user is not following anyone
        </section>
      ) : (
        <section className="mt-6">
          <UserList users={users} />
        </section>
      )}
    </div>
  );
}

export async function getServerSideProps({ res, params }) {
  try {
    if (params.profile) {
      const followersRes = await fetch(
        `${BASE_URL}/following/${params.profile}`
      );
      const followersResBody = await followersRes.json();
      console.log(followersResBody);

      return {
        props: {
          users: followersResBody.data.users,
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
