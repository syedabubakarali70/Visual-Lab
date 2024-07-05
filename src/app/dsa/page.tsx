import TopicCard from "@/components/TopicCard";
import { SortingAlgoList, DataStructureList } from "@/lib/TopicLists";
import { Suspense } from "react";
// import Loading from "./Loading";

const DSA = () => {
  return (
    // <Suspense fallback={<Loading />}>
    <>
      <section className="w-full px-3 my-4">
        <div className="text-center text-2xl my-4">Sorting Algorithms</div>
        <div className="gap-y-2 flex flex-col md:flex-row flex-wrap justify-between w-full">
        {SortingAlgoList.map((algo, index) => (
          <TopicCard info={algo} key={index} />
        ))}
        </div>
      </section>
      <section className="w-full px-3 mb-4">
        <div className="text-center text-2xl mb-4">Data Structures</div>
        <div className="gap-y-2 flex flex-col md:flex-row flex-wrap justify-between w-full">
        {DataStructureList.map((algo, index) => (
          <TopicCard info={algo} key={index} />
        ))}
        </div>
      </section>
      </>
      // </Suspense>
  );
};

export default DSA;
