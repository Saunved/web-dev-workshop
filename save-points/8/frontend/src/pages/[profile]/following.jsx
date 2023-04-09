import UserList from "@/components/UserList";
import strings from "@/constants/ui/strings";
import { BASE_URL } from "@/constants/routes";
import { attachAuthCookie } from "@/utils/xhr";

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

export async function getServerSideProps({ req, res, params }) {
  try {
    if (params.profile) {
      const followingRes = await fetch(
        `${BASE_URL}/following/${params.profile}`,
        attachAuthCookie(req)
      );
      const followingResBody = await followingRes.json();

      return {
        props: {
          users: followingResBody.data.following,
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
