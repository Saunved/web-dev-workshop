import UserInfo from "./UserInfo";

export default function UserList({ users }) {
  return (
    <>
      <div className="grid gap-8">
        {users.map((user, idx) => {
          return <UserInfo user={user} key={idx} />;
        })}
      </div>
    </>
  );
}
