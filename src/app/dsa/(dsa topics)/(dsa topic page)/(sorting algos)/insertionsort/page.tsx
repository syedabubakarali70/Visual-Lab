import React from "react";
import { TypographyH1 } from "@/components/TypographyH1";
import { TypographyP } from "@/components/TypographyP";
import { TypographyH3 } from "@/components/TypographyH3";
import CodeBlock from "@/components/CodeBlock";
import { code } from "./code";
import AnimationContainer from "@/components/AnimationContainer";
import MarkComplete from "@/components/MarkComplete";
const InsertionSort = () => {
  return (
    <>
      <div className="flex flex-col space-y-5 my-6">
        <TypographyH1>Insertion Sort</TypographyH1>
        <div className="w-full">
          <TypographyP>
            Insertion sort is a simple and intuitive sorting algorithm. It is
            efficient for small datasets and partially sorted arrays.
          </TypographyP>

          <TypographyH3>How Insertion sort Works</TypographyH3>

          <TypographyP>
            Insertion sort works by building the final sorted array one item at
            a time. It repeatedly takes the next unsorted element and inserts it
            into the correct position among the previously sorted elements.
          </TypographyP>

          <TypographyH3>Step-by-Step Process</TypographyH3>

          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>
              Initialization: Start with the second element (first element is
              considered sorted).
            </li>
            <li>
              Comparison: Compare the current element with the elements in the
              sorted part of the array.
            </li>
            <li>
              Insertion: Insert the current element into its correct position.
            </li>
            <li>
              Iteration: Move to the next element and repeat steps 2 and 3 until
              the entire array is sorted.
            </li>
          </ul>

          <TypographyH3>Algorithm Efficiency</TypographyH3>
          <TypographyP>
            Time Complexity: O(n^2) in the worst and average cases, O(n) in the
            best case (when the array is already sorted). Space Complexity: O(1)
            as it sorts the array in place.
          </TypographyP>

          <CodeBlock code={code} />
          <TypographyH3>Applications and Limitations</TypographyH3>
          <TypographyP>
            Insertion sort is suitable for small datasets and nearly sorted
            arrays. It is not efficient for large datasets due to its O(n^2)
            time complexity.
          </TypographyP>
          <TypographyH3>Conclusion</TypographyH3>
          <TypographyP>
            Insertion sort is a straightforward algorithm, making it ideal for
            educational purposes and small datasets. Its simplicity and ease of
            implementation are its key advantages.
          </TypographyP>
        </div>

        <AnimationContainer Animation="Insertion Sort" />
        <MarkComplete topic="insertionsort" />
      </div>
    </>
  );
};
export default InsertionSort;
