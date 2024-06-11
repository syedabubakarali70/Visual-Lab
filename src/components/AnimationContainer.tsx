"use client";
import React, { useEffect } from "react";
import NumbersInputField from "./NumbersInputField";
import AnimationControls from "./AnimationControls";
import useCreateArray from "@/components/useCreateArray";
import { gsap } from "gsap";
import { Inumbers } from "@/components/useCreateArray";
import bubbleSort from "@/app/dsa/(dsa topics)/(dsa topic page)/(sorting algos)/bubblesort/BubbleSortAnimation";
import mergeSort from "@/app/dsa/(dsa topics)/(dsa topic page)/(sorting algos)/mergesort/mergeSortAnimation";

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
  };

  const swapsandComparisons = {
    comparisons: 0,
    swaps: 0,
  };

  return (
    <div className="w-[100%] bg-primary-foreground px-4 py-3 rounded-md">
      <div className="text-lg py-2 border-b-4">{Animation}</div>
      <div
        id="animationContainer"
        className=" flex justify-center h-56 items-center"
      ></div>
      <div>
        <div>
          Comparisons:
          <span id="comparisons">{swapsandComparisons.comparisons}</span>
        </div>
        <div>
          Swaps:<span id="swaps">{swapsandComparisons.swaps}</span>
        </div>
      </div>
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
