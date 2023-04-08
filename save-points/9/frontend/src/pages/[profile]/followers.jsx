import UserList from "@/components/UserList";
import strings from "@/constants/ui/strings";
import { BASE_URL } from "@/constants/routes";
import { attachAuthCookie } from "@/utils/xhr";

export default function FollowersPage({ users = [] }) {
  const uiText = strings.EN.FOLLOW;
  return (
    <div className="min-h-screen">
      <div>
        <h1 className="text-2xl font-bold px-4 mt-2">{uiText.followers}</h1>
      </div>
      {!users.length ? (
        <section className="text-center my-8">
          Hmm, looks like no one is following this user yet
        </section>
      ) : (
        <section className="mt-6">
          {/* Task 4: Use the UserList component here to render a list of "users" on the UI. Don't forget to pass the correct props! */}
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
        // Task 1: Call the correct URL. We are calling this path: /followers/:handle
        // The user's handle will be available from the URL in "params.profile"
        /* Create the URL here */,
        attachAuthCookie(req)
      );
      const followingResBody = await followingRes.json();

      return {
        props: {
          users: /* Task 2: We will get the followers data in "data.followers". Let's assign it to "users" */,
        },
      };
    }
  } catch (error) {
    console.log(error);
    return {
      props: {
        users: /* Task 3: We didn't get the users data. What should we return here? */,
      },
    };
  }
}
