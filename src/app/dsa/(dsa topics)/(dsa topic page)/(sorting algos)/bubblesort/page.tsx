import React from "react";
import { TypographyH1 } from "@/components/TypographyH1";
import { TypographyP } from "@/components/TypographyP";
import { TypographyH3 } from "@/components/TypographyH3";
import CodeBlock from "@/components/CodeBlock";
import { code } from "./code";
import AnimationContainer from "@/components/AnimationContainer";
import MarkComplete from "@/components/MarkComplete";
const BubbleSort = () => {
  return (
    <>
      <div className="flex flex-col space-y-5 my-6">
        <TypographyH1>Bubble Sort</TypographyH1>
        <div className="w-full">
          <TypographyP>
            Bubble sort is one of the simplest sorting algorithms in computer
            science. It is an elementary algorithm suitable for teaching basic
            principles of sorting and algorithm efficiency. Despite its
            simplicity, bubble sort is rarely used in practice due to its
            inefficiency compared to other sorting algorithms.
          </TypographyP>

          <TypographyH3>How Bubble Sort Works</TypographyH3>

          <TypographyP>
            Bubble sort works by repeatedly stepping through the list to be
            sorted, comparing each pair of adjacent items, and swapping them if
            they are in the wrong order. The process is repeated until the list
            is sorted. The name "bubble sort" comes from the way smaller
            elements "bubble" to the top of the list while larger elements sink
            to the bottom, similar to bubbles rising in water.
          </TypographyP>

          <TypographyH3>Step-by-Step Process</TypographyH3>

          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>Initialization: Start with the first element of the array.</li>
            <li>
              Comparison: Compare the current element with the next element.
            </li>
            <li>
              Swapping: If the current element is greater than the next element,
              swap them.
            </li>
            <li>
              Iteration: Move to the next element and repeat steps 2 and 3 until
              the end of the array is reached.
            </li>
            <li>
              Repeat: Repeat the entire process for the array. With each pass,
              the largest unsorted element moves to its correct position.
            </li>
            <li>
              Completion: The algorithm stops when a complete pass through the
              array is made without any swaps, indicating that the array is
              sorted.
            </li>
          </ul>

          <TypographyH3>Algorithm Efficiency</TypographyH3>
          <TypographyP>
            Bubble sort has a time complexity of O(n^2) in the worst and average
            cases, where n is the number of items being sorted. This quadratic
            time complexity makes bubble sort inefficient for large datasets.
            However, it has a space complexity of O(1), meaning it requires only
            a constant amount of additional memory space.
          </TypographyP>

          <CodeBlock code={code} />
          <TypographyH3>Applications and Limitations</TypographyH3>
          <TypographyP>
            Bubble sort is mainly used for educational purposes to introduce the
            concept of sorting algorithms and their analysis. It helps in
            understanding the mechanics of more complex sorting algorithms.
            However, due to its inefficiency, bubble sort is not suitable for
            large datasets or performance-critical applications. In real-world
            applications, more efficient algorithms like quicksort, mergesort,
            or heapsort are preferred.
          </TypographyP>
          <TypographyH3>Conclusion</TypographyH3>
          <TypographyP>
            Bubble sort is a fundamental algorithm that is easy to understand
            and implement. Despite its simplicity, it is not practical for
            large-scale sorting tasks due to its poor performance. Understanding
            bubble sort, however, is essential for grasping the basics of
            algorithmic thinking and sorting principles, which are foundational
            concepts in computer science.
          </TypographyP>
        </div>

        <AnimationContainer Animation="Bubble Sort" />
        <MarkComplete topic="bubblesort" />
      </div>
    </>
  );
};

export default BubbleSort;
