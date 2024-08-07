"use client";
import React, { useEffect } from "react";
import NumbersInputField from "./NumbersInputField";
import AnimationControls from "./AnimationControls";
import useCreateArray from "@/components/useCreateArray";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { Inumbers } from "@/components/useCreateArray";
import bubbleSort from "@/app/dsa/(dsa topics)/(dsa topic page)/(sorting algos)/bubblesort/BubbleSortAnimation";
import BubbleSortPseudoCode from "@/app/dsa/(dsa topics)/(dsa topic page)/(sorting algos)/bubblesort/BubbleSortPseudoCode";
import mergeSort from "@/app/dsa/(dsa topics)/(dsa topic page)/(sorting algos)/mergesort/mergeSortAnimation";
import quickSort from "@/app/dsa/(dsa topics)/(dsa topic page)/(sorting algos)/quicksort/quickSortAnimation";
import insertionSort from "@/app/dsa/(dsa topics)/(dsa topic page)/(sorting algos)/insertionsort/insertionSortAnimation";
import selectionSort from "@/app/dsa/(dsa topics)/(dsa topic page)/(sorting algos)/selectionsort/selectionSortAnimation";
import MergeSort from "@/app/dsa/(dsa topics)/(dsa topic page)/(sorting algos)/mergesort/page";
import MergeSortPseudoCode from "@/app/dsa/(dsa topics)/(dsa topic page)/(sorting algos)/mergesort/MergeSortPseudoCode";
import QuickSortPseudoCode from "@/app/dsa/(dsa topics)/(dsa topic page)/(sorting algos)/quicksort/QuickSortPseudoCode";
import InsertionSortPseudoCode from "@/app/dsa/(dsa topics)/(dsa topic page)/(sorting algos)/insertionsort/InsertionSortPseudoCode";
import SelectionSortPseudoCode from "@/app/dsa/(dsa topics)/(dsa topic page)/(sorting algos)/selectionsort/SelectionSortPseudoCode";

gsap.registerPlugin(Flip);
type AnimationProps = {
  timeline: any;
  numbers: Inumbers[];
  numbersRef: any;
};

export type { AnimationProps };

const AnimationContainer = ({ Animation }: { Animation: string }) => {
  const tl = gsap.timeline();
  const [numList, setNumList, numRefs] = useCreateArray([5, 4, 3, 2, 1],Animation);

  const getAnimation = (Animation: string) => {
    if (Animation === "Bubble Sort") {
      return bubbleSort;
    } else if (Animation === "Merge Sort") {
      return mergeSort;
    } else if (Animation === "Quick Sort") {
      return quickSort;
    } else if (Animation === "Insertion Sort") {
      return insertionSort;
    } else if (Animation === "Selection Sort") {
      return selectionSort;
    }
  };
  const getPseudoCode = (Animation: string) => {
    if (Animation === "Bubble Sort") {
      return <BubbleSortPseudoCode />;
    } else if (Animation === "Merge Sort") {
      return <MergeSortPseudoCode />;
    } else if (Animation === "Quick Sort") {
      return <QuickSortPseudoCode />;
    } else if (Animation === "Insertion Sort") {
      return <InsertionSortPseudoCode />;
    } else if (Animation === "Selection Sort") {
      return <SelectionSortPseudoCode />;
    }
  };

  const swapsandComparisons = {
    comparisons: 0,
    swaps: 0,
  };

  return (
    <>
    <div
      className="w-[100%] flex bg-primary-foreground px-4 py-3 rounded-md h-[100vh]  flex-col justify-between"
      id="animation"
    >
      <div className="text-lg py-2 border-b-4">{Animation}</div>
      <div
        id="animationContainer"
        className=" flex flex-col justify-center items-center grow w-auto"
      >
        <div id="variables" className="flex justify-start"></div>
        <div id="mainArray" className="flex"></div>
        <div id="otherVariables" className="flex justify-start"></div>
      </div>

      {/* <div>
        <div>
        Comparisons:
        <span id="comparisons">{swapsandComparisons.comparisons}</span>
        </div>
        <div>
        Swaps:<span id="swaps">{swapsandComparisons.swaps}</span>
        </div>
        </div> */}
      <div className="flex justify-between items-end flex-col md:flex-row">
        <NumbersInputField setNumList={setNumList} />
        <div className="flex justify-between border-2 border-primary/70 rounded-md  py-2">
          {getPseudoCode(Animation)}
        </div>
      </div>
      <AnimationControls
        tl={tl}
        numbers={numList}
        numRefs={numRefs}
        AnimatingFunction={getAnimation(Animation)}
        swapsandComparisons={swapsandComparisons}
      />
    </div>
   
    </>
  );
};

export default AnimationContainer;
