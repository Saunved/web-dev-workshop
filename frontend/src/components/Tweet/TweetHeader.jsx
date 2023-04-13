export default function TweetHeader({ name, handle, time }) {
  return (
    <div className="grid grid-flow-col gap-1 justify-start text-sm md:text-base">
      <p className="font-bold max-w-xs overflow-hidden whitespace-nowrap text-ellipsis">
        {name}
      </p>
      <p className="text-gray-700 max-w-xs overflow-hidden whitespace-nowrap text-ellipsis">
        @{handle}
      </p>
      <p className="">&bull;</p>
      <p className="max-w-xs overflow-hidden whitespace-nowrap text-ellipsis">
        {time}
      </p>
    </div>
  );
}
