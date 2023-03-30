export default function TweetHeader({ name, handle, time }) {
  return (
    <div className="grid grid-flow-col gap-1 justify-start">
      <p className="font-bold">{name}</p>
      <p className="text-gray-700">@{handle}</p>
      <p>&bull;</p>
      <p>{time}</p>
    </div>
  );
}
