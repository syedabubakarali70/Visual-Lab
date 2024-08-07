import { DataStructureList, SortingAlgoList } from "@/lib/TopicLists";
import Link from "next/link";
import React from "react";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { UserAuth } from "@/app/context/AuthContext";
const TopicList = ({ onSelection }: { onSelection: () => void }) => {
  const { progress } = UserAuth();
  return (
    <div>
      <div className="flex w-full  border-2 rounded-md px-3 py-2 text-lg justify-between bg-secondary font-bold" > Sorting Algorithms</div>
      {SortingAlgoList.map((algo, index) => (
        <Link
          href={algo.link}
          key={index}
          onClick={onSelection}
          className={`flex w-full  border-2 rounded-md px-3 py-2 text-md justify-between font-medium`}
        >
          {algo.name}
          <CheckCircledIcon
            className={`w-6 h-6 ${
              progress != null
                ? progress[algo.link]
                  ? "text-green-600"
                  : "text-gray-400"
                : "text-gray-400"
            }`}
          />
        </Link>
      ))}
      <div className="flex w-full  border-2 rounded-md px-3 py-2 text-lg justify-between bg-secondary font-bold" > Data Structures</div>
      {DataStructureList.map((algo, index) => (
        <Link
          href={algo.link}
          key={index}
          onClick={onSelection}
          className="flex w-full  border-2 rounded-md px-3 py-2 text-md justify-between font-medium"
        >
          <span className="inline-block">{algo.name}</span>
          <CheckCircledIcon
            className={`w-6 h-6 ${
              progress != null
                ? progress[algo.link]
                  ? "text-green-600"
                  : "text-gray-400"
                : "text-gray-400"
            }`}
          />
        </Link>
      ))}
    </div>
  );
};

export default TopicList;
