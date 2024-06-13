import { Inumbers } from "@/components/useCreateArray";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

const width = 49.6;

gsap.registerPlugin(Flip);
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
    const currentRef = numbersRef.current[Number(left[i].index)].span;
    timeline.to(currentRef, { y: "+=40", duration: 0.2 }, "beforLeft");
  }
  const leftArr = mergeSort(timeline, left, numbersRef);

  timeline.add("beforRight", "+=0.2");

  for (let i = 0; i < right.length; i++) {
    const currentRef = numbersRef.current[Number(right[i].index)].span;
    timeline.to(currentRef, { y: "+=40", duration: 0.2 }, "beforRight");
  }
  const rightArr = mergeSort(timeline, right, numbersRef);

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
      let element = numbersRef.current[left[leftIndex].index].span;
      const xValue = () => {
        let temp = rightIndex * width;
        return "+=" + temp.toString();
      };
      timeline.to(element, {
        x: xValue(),

        y: "-=40",
        duration: 0.5,
        ease: "power2.inOut",
      });
      resultArray.push(left[leftIndex]);
      leftIndex++;
    } else {
      let element = numbersRef.current[right[rightIndex].index].span;
      const xValue = () => {
        let temp = (left.length - leftIndex) * width;
        return "-=" + temp.toString();
      };
      timeline.to(element, {
        x: xValue(),
        y: "-=40",
        duration: 0.5,
        ease: "power2.inOut",
      });
      resultArray.push(right[rightIndex]);
      rightIndex++;
    }
  }
  for (let i = leftIndex; i < left.length; i++) {
    let element = numbersRef.current[left[i].index].span;
    const xValue = () => {
      let temp = rightIndex * width;
      return "+=" + temp.toString();
    };
    timeline.to(element, {
      x: xValue(),
      y: "-=40",
      duration: 0.5,
      ease: "power2.inOut",
    });
    resultArray.push(left[i]);
    leftIndex++;
  }
  for (let i = rightIndex; i < right.length; i++) {
    let element = numbersRef.current[right[i].index].span;
    const xValue = () => {
      let temp = (left.length - leftIndex) * width;
      return "-=" + temp.toString();
    };
    timeline.to(element, {
      x: xValue(),
      y: "-=40",
      duration: 0.5,
      ease: "power2.inOut",
    });
    resultArray.push(right[i]);
  }

  return resultArray;
}

export default mergeSort;
