export default function HeaderProfilePicture({ handle }) {
  return (
    <img
      src={`https://api.dicebear.com/5.x/thumbs/svg?seed=${handle}`}
      className="rounded-full w-32 h-32 border-4 border-white"
      alt=""
    />
  );
}
