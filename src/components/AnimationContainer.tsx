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
      const container = document.getElementById("animationContainer");
      const state = Flip.getState(container);

// now alter the state by toggling a class:
 container && container.classList.toggle(".items-center");
 container && container.classList.toggle(".items-start");

// now do a "Flip" animation from the previous state to the new one:
tl.add(Flip.from(state, {
  duration: 1,
  ease: "power1.inOut",
  absolute: true,
}))
      return mergeSort;
    }
    else if (Animation === "Quick Sort") {
      tl.eventCallback("onComplete", () => {
        console.log("done");
        numRefs.current.map((ref: any) => tl.set(ref.span,{opacity: 1}));
      })
      return quickSort;
    }
    else if(Animation === "Insertion Sort"){
      return insertionSort;
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
      >
        <div id="mainArray" className="flex"></div>
      </div>
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
