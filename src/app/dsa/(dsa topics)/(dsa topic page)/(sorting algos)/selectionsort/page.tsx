import React from "react";
import { TypographyH1 } from "@/components/TypographyH1";
import { TypographyP } from "@/components/TypographyP";
import { TypographyH3 } from "@/components/TypographyH3";
import CodeBlock from "@/components/CodeBlock";
import { code } from "./code";
import AnimationContainer from "@/components/AnimationContainer";
import MarkComplete from "@/components/MarkComplete";
const SelectionSort = () => {
  return (
    <>
      <div className="flex flex-col space-y-5 my-6">
        <TypographyH1>Selection Sort</TypographyH1>
        <div className="w-full">
          <TypographyP>
            Selection sort is an in-place comparison-based sorting algorithm. It
            is simple but not efficient for large datasets.
          </TypographyP>

          <TypographyH3>How Selection sort Works</TypographyH3>

          <TypographyP>
            Selection sort works by repeatedly finding the minimum element from
            the unsorted part of the array and swapping it with the first
            unsorted element.
          </TypographyP>

          <TypographyH3>Step-by-Step Process</TypographyH3>

          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>Initialization: Start with the first element of the array.</li>
            <li>
              Find Minimum: Find the minimum element in the unsorted part of the
              array.
            </li>
            <li>
              Swapping: Swap the found minimum element with the first unsorted
              element.
            </li>
            <li>
              Iteration: Move the boundary between sorted and unsorted parts one
              element to the right and repeat steps 2 and 3 until the array is
              sorted.
            </li>
          </ul>

          <TypographyH3>Algorithm Efficiency</TypographyH3>
          <TypographyP>
            Time Complexity: O(n^2) for the worst, average, and best cases.
            Space Complexity: O(1) as it sorts the array in place.
          </TypographyP>

          <CodeBlock code={code} />
          <TypographyH3>Applications and Limitations</TypographyH3>
          <TypographyP>
            Selection sort is suitable for small datasets and when memory space
            is limited. However, it is not efficient for large datasets due to
            its O(n^2) time complexity.
          </TypographyP>
          <TypographyH3>Conclusion</TypographyH3>
          <TypographyP>
            Selection sort is easy to understand and implement, making it useful
            for educational purposes. Its simplicity comes at the cost of
            efficiency, making it less suitable for large datasets.
          </TypographyP>
        </div>

        <AnimationContainer Animation="Selection Sort" />
        <MarkComplete topic="selectionsort" />
      </div>
    </>
  );
};
export default SelectionSort;
