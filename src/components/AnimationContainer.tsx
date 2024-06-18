"use client";
import React, { useEffect } from "react";
import NumbersInputField from "./NumbersInputField";
import AnimationControls from "./AnimationControls";
import useCreateArray from "@/components/useCreateArray";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { Inumbers } from "@/components/useCreateArray";
import bubbleSort from "@/app/dsa/(dsa topics)/(dsa topic page)/(sorting algos)/bubblesort/BubbleSortAnimation";
import mergeSort from "@/app/dsa/(dsa topics)/(dsa topic page)/(sorting algos)/mergesort/mergeSortAnimation";
import quickSort from "@/app/dsa/(dsa topics)/(dsa topic page)/(sorting algos)/quicksort/quickSortAnimation";
import insertionSort from "@/app/dsa/(dsa topics)/(dsa topic page)/(sorting algos)/insertionsort/insertionSortAnimation";
import selectionSort from "@/app/dsa/(dsa topics)/(dsa topic page)/(sorting algos)/selectionsort/selectionSortAnimation";

gsap.registerPlugin(Flip);
type AnimationProps = {
  timeline: any;
  numbers: Inumbers[];
  numbersRef: any;
};

export type { AnimationProps };

const AnimationContainer = ({ Animation }: { Animation: string }) => {
  const tl = gsap.timeline();
  const [numList, setNumList, numRefs] = useCreateArray([5,4,3,2,1]);

  const getAnimation = (Animation: string) => {
    if (Animation === "Bubble Sort") {
      return bubbleSort;
    }
    else if (Animation === "Merge Sort") {   
      return mergeSort;
    }
    else if (Animation === "Quick Sort") {
      return quickSort;
    }
    else if(Animation === "Insertion Sort"){
      return insertionSort;
    }
    else if(Animation === "Selection Sort"){
      return selectionSort;
    }
  };

  const swapsandComparisons = {
    comparisons: 0,
    swaps: 0,
  };

  return (
    <div className="w-[100%] bg-primary-foreground px-4 py-3 rounded-md h-[100vh] flex flex-col justify-between" id="animation">
      <div className="text-lg py-2 border-b-4">{Animation}</div>
      <div
        id="animationContainer"
        className=" flex justify-center items-center grow"
      >
        <div id="mainArray" className="flex"></div>
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
      <NumbersInputField setNumList={setNumList} />
      <AnimationControls
        tl={tl}
        numbers={numList}
        numRefs={numRefs}
        AnimatingFunction={getAnimation(Animation)}
        swapsandComparisons={swapsandComparisons}
      />
    </div>
  );
};

export default AnimationContainer;
