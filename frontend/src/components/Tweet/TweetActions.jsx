import {
  Heart,
  ChatCircle,
  Export,
  ArrowsCounterClockwise,
  ChartLine,
} from "phosphor-react";

export default function TweetActions() {
  return (
    <div className="grid grid-flow-col gap-16 justify-start mt-4">
      <ChatCircle size={20} className="text-gray-700 hover:cursor-pointer" />
      <div className="flex gap-2 items-center">
        <ArrowsCounterClockwise
          size={20}
          className="text-gray-700 hover:cursor-pointer"
        />
        <span className="text-sm">2</span>
      </div>
      <div className="flex gap-2 items-center">
        <Heart size={20} className="text-gray-700 hover:cursor-pointer" />
        <span className="text-sm">4</span>
      </div>
      <ChartLine size={20} className="text-gray-700 hover:cursor-pointer" />
      <Export size={20} className="text-gray-700 hover:cursor-pointer" />
    </div>
  );
}
