import React from "react";
import { TypographyH1 } from "@/components/TypographyH1";
import { TypographyP } from "@/components/TypographyP";
import { TypographyH3 } from "@/components/TypographyH3";
import CodeBlock from "@/components/CodeBlock";
import { code } from "./code";
import AnimationContainer from "@/components/AnimationContainer";
import MarkComplete from "@/components/MarkComplete";
const MergeSort = () => {
  return (
    <>
      <div className="flex flex-col space-y-5 my-6">
        <TypographyH1>Merge Sort</TypographyH1>
        <div className="w-full">
          <TypographyP>
            Merge sort is an efficient, stable, and comparison-based sorting
            algorithm. It follows the divide and conquer paradigm, making it
            suitable for large datasets.
          </TypographyP>

          <TypographyH3>How Merge Sort Works</TypographyH3>

          <TypographyP>
            Merge sort works by recursively dividing the list into halves until
            each sublist contains a single element. Then, it merges these
            sublists in a sorted manner to produce the final sorted list.
          </TypographyP>

          <TypographyH3>Step-by-Step Process</TypographyH3>

          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>Divide: Split the array into two halves.</li>
            <li>Conquer: Recursively sort each half.</li>
            <li>Merge: Merge the two halves in a sorted manner.</li>
            <li>
              Repeat: Continue dividing and merging until the entire array is
              sorted.
            </li>
          </ul>

          <TypographyH3>Algorithm Efficiency</TypographyH3>
          <TypographyP>
            Time Complexity: O(n log n) for the worst, average, and best cases.
            Space Complexity: O(n) due to the additional space required for
            merging.
          </TypographyP>

          <CodeBlock code={code} />
          <TypographyH3>Applications and Limitations</TypographyH3>
          <TypographyP>
            Merge sort is suitable for sorting linked lists and large datasets
            due to its predictable O(n log n) time complexity. However, it is
            not in-place, requiring additional memory space.
          </TypographyP>
          <TypographyH3>Conclusion</TypographyH3>
          <TypographyP>
            Merge sort is a fundamental algorithm that provides a good
            introduction to the divide and conquer approach. It is efficient and
            stable, making it a preferred choice for large and complex datasets.
          </TypographyP>
        </div>

        <AnimationContainer Animation="Merge Sort" />
        <MarkComplete topic="mergesort" />
      </div>
    </>
  );
};
export default MergeSort;
