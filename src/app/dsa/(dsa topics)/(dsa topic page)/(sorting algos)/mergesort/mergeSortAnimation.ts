import { Inumbers } from "@/components/useCreateArray";
import { on } from "events";

const mergeSort = (
  timeline: any,
  numbers: Inumbers[],
  numbersRef: any
  //   swapsandComparisons: any
): Inumbers[] => {
  if (numbers.length <= 1) {
    return numbers;
  }
  const middle = Math.floor(numbers.length / 2);
  const left = numbers.slice(0, middle);
  const right = numbers.slice(middle);

  timeline.add("beforLeft", "+=0.2");
  for (let i = 0; i < left.length; i++) {
    const currentRef = numbersRef.current[Number(left[i].index)].box;
    timeline.to(currentRef, { y: "+=40", duration: 0.2 }, "beforLeft");
  }
  const leftArr = mergeSort(timeline, left, numbersRef);
  timeline.add("afterLeft", "+=0.2");

  //   for (let i = 0; i < left.length; i++) {
  //     const currentRef = numbersRef.current[Number(left[i].index)].box;
  //     timeline.to(currentRef, { y: "-=40", duration: 0.2 }, "afterLeft");
  //   }
  timeline.add("beforRight", "+=0.2");

  for (let i = 0; i < right.length; i++) {
    const currentRef = numbersRef.current[Number(right[i].index)].box;
    timeline.to(currentRef, { y: "+=40", duration: 0.2 }, "beforRight");
  }
  const rightArr = mergeSort(timeline, right, numbersRef);
  timeline.add("afterRight", "+=0.2");

  //   for (let i = 0; i < right.length; i++) {
  //     const currentRef = numbersRef.current[Number(right[i].index)].box;
  //     timeline.to(currentRef, { y: "-=40", duration: 0.2 }, "afterRight");
  //   }
  const mergedArray = merge(leftArr, rightArr, timeline, numbersRef);

  return mergedArray;
};

function merge(
  left: Inumbers[],
  right: Inumbers[],
  timeline: any,
  numbersRef: any
): Inumbers[] {
  const resultArray: Inumbers[] = [];
  let leftIndex = 0,
    rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex].value < right[rightIndex].value) {
      let element = numbersRef.current[left[leftIndex].index].box;
      const xValue = () => {
        let temp = (rightIndex) * 100;
        return "+=" + temp.toString();
      };
      timeline.to(element, {
        xPercent: xValue(),

        y: "-=40",
        duration: 0.5,
        ease: "power2.inOut",
      });
      resultArray.push(left[leftIndex]);
    } else {
      let element = numbersRef.current[right[rightIndex].index].box;
      const xValue = () => {
        let temp = (left.length - leftIndex) * 100;
        console.log("left length : ", left.length);
        console.log(leftIndex);
        return "-=" + temp.toString();
      };
      timeline.to(element, {
        xPercent: xValue(),
        y: "-=40",
        duration: 0.5,
        ease: "power2.inOut",
      });
      resultArray.push(right[rightIndex]);
      rightIndex++;
    }
  }
  for (let i = leftIndex; i < left.length; i++) {
    let element = numbersRef.current[left[i].index].box;
    const xValue = () => {
        let temp = (rightIndex) * 100;
        return "+=" + temp.toString();
      }
    timeline.to(element, {
      xPercent: xValue(),
      y: "-=40",
      duration: 0.5,
      ease: "power2.inOut",
    });
    resultArray.push(left[i]);
    leftIndex++;
  }
  for (let i = rightIndex; i < right.length; i++) {
    let element = numbersRef.current[right[i].index].box;
    const xValue = () => {
        let temp = (left.length - leftIndex) * 100;
        return "-=" + temp.toString();
      }
    timeline.to(element, {
      xPercent: xValue(),
      y: "-=40",
      duration: 0.5,
      ease: "power2.inOut",
    });
    resultArray.push(right[i]);
  }

  return resultArray;
}

export default mergeSort;
