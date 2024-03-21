import TopicCard from "@/components/TopicCard";
import { SortingAlgoList, DataStructureList } from "@/lib/TopicLists";

const DSA = () => {
  return (
    <>
      <section className="w-full px-3 my-4">
        <div className="text-center text-2xl my-4">Sorting Algorithms</div>
        <div className="gap-y-2 flex flex-col md:flex-row wrap">
        {SortingAlgoList.map((algo, index) => (
          <TopicCard info={algo} key={index} />
        ))}
        </div>
      </section>
      <section className="w-full px-3 mb-4">
        <div className="text-center text-2xl mb-4">Sorting Algorithms</div>
        <div className="gap-y-2 flex flex-col md:flex-row">
        {DataStructureList.map((algo, index) => (
          <TopicCard info={algo} key={index} />
        ))}
        </div>
      </section>
      </>
  );
};

export default DSA;
