"use client";

import useCreateArray from "../../../useCreateArray";
import AnimationControls from "../../../AnimationControls";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import NumbersInputField from "../../../NumbersInputField";
import { useEffect } from "react";

const BubbleSortAnimation = () => {
  const tl = gsap.timeline();
  const [numList, setNumList, numRefs] = useCreateArray([]);
  useEffect(() => {
    console.log(numList
    )
  },[numList])

  const { contextSafe } = useGSAP();

  const bubbleSort = contextSafe(() => {
    for (let i = 0; i < numList.length; i++) {
      for (let j = 0; j < numList.length - i - 1; j++) {
        const currentRef = numRefs.current[Number(numList[j].index)].box;
        const nextRef = numRefs.current[Number(numList[j + 1].index)].box;

        tl.to([currentRef, nextRef], { y: -20, duration: 0.2 });

        if (numList[j].value > numList[j + 1].value) {
          [numList[j], numList[j + 1]] = [numList[j + 1], numList[j]];

          tl.to(currentRef, {
            x: "+=40",
            duration: 0.5,
            ease: "power2.inOut",
          });
          tl.to(
            nextRef,
            { x: "-=40", duration: 0.5, ease: "power2.inOut" },
            "<"
          );
        }

        tl.to([currentRef, nextRef], {
          y: 0,
          duration: 0.2,
          onComplete: () => {
            console.log(numList);
          },
        });
      }
    }
    tl.play();
  });

  return (
    <div>
      <div id="container" className=" flex justify-center"></div>
      <button onClick={bubbleSort}>Sort</button>
      <NumbersInputField setNumList={setNumList} />
      <AnimationControls tl={tl} />
    </div>
  );
};

export default BubbleSortAnimation;
