import React from "react";
import { TypographyH1 } from "@/components/TypographyH1";
import { TypographyP } from "@/components/TypographyP";
import CodeBlock from "@/components/CodeBlock"
import {code} from "./code"
const BubbleSort = () => {
  return (
    <>
      <div className="flex flex-col space-y-5 my-6">
        <TypographyH1>Bubble Sort</TypographyH1>
        <div className="w-full">
          <TypographyP>
            Bubble sort is a sorting algorithm that compares two adjacent
            elements and swaps them until they are in the intended order.
          </TypographyP>

          <TypographyP>
            Just like the movement of air bubbles in the water that rise up to
            the surface, each element of the array move to the end in each
            iteration. Therefore, it is called a bubble sort.
          </TypographyP>
        <CodeBlock code={code}/>
          <TypographyP>
            Just like the movement of air bubbles in the water that rise up to
            the surface, each element of the array move to the end in each
            iteration. Therefore, it is called a bubble sort.
          </TypographyP>
          <TypographyP>
            Just like the movement of air bubbles in the water that rise up to
            the surface, each element of the array move to the end in each
            iteration. Therefore, it is called a bubble sort.
          </TypographyP>
          </div>
      </div>
      
    </>
  );
};

export default BubbleSort;
