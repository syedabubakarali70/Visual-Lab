import React from "react";
import { TypographyH1 } from "@/components/TypographyH1";
import { TypographyP } from "@/components/TypographyP";
import { TypographyH3 } from "@/components/TypographyH3";
import CodeBlock from "@/components/CodeBlock";
import { code } from "./code";
import AnimationContainer from "@/components/AnimationContainer";
import MarkComplete from "@/components/MarkComplete";
const QuickSort = () => {
  return (
    <>
      <div className="flex flex-col space-y-5 my-6">
        <TypographyH1>Quick Sort</TypographyH1>
        <div className="w-full">
          <TypographyP>
            Quick sort is a highly efficient and widely used sorting algorithm.
            It also follows the divide and conquer paradigm.
          </TypographyP>

          <TypographyH3>How Quick Sort Works</TypographyH3>

          <TypographyP>
            Quick sort works by selecting a 'pivot' element from the array and
            partitioning the other elements into two sub-arrays according to
            whether they are less than or greater than the pivot. The process is
            then recursively applied to the sub-arrays.
          </TypographyP>

          <TypographyH3>Step-by-Step Process</TypographyH3>

          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>Choose a Pivot: Select an element as the pivot.</li>
            <li>
              Partition: Rearrange the array so that elements less than the
              pivot are on the left, and elements greater than the pivot are on
              the right.
            </li>
            <li>
              Recursively Sort: Apply the same process to the sub-arrays formed
              by the partition.
            </li>
            <li>
              Completion: Combine the sub-arrays and pivot into a single sorted
              array.
            </li>
          </ul>

          <TypographyH3>Algorithm Efficiency</TypographyH3>
          <TypographyP>
            Time Complexity: O(n^2) in the worst case, O(n log n) on average.
            Space Complexity: O(log n) due to the recursive call stack.
          </TypographyP>

          <CodeBlock code={code} />
          <TypographyH3>Applications and Limitations</TypographyH3>
          <TypographyP>
            Quick sort is efficient for large datasets and is often faster in
            practice compared to other O(n log n) algorithms. However, it can
            degrade to O(n^2) if the pivot selection is poor.
          </TypographyP>
          <TypographyH3>Conclusion</TypographyH3>
          <TypographyP>
            Quick sort is a powerful and versatile sorting algorithm, offering
            excellent performance on average. Understanding quick sort helps in
            grasping more advanced algorithmic concepts.
          </TypographyP>
        </div>

        <AnimationContainer Animation="Quick Sort" />
        <MarkComplete topic="quicksort" />
      </div>
    </>
  );
};
export default QuickSort;
