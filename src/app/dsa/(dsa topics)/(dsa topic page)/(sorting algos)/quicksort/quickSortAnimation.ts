import { Inumbers } from "@/components/useCreateArray";
const width = 49.6;

function quickSort(
  timeline: any,
  array: Inumbers[],
  numbersRef: any,
  low: number = 0,
  high: number = array.length - 1
): Inumbers[] {
  if (low < high) {
    timeline.add("partition", "+=0.2");
    for (let i = 0; i < array.length; i++) {
      const currentRef = numbersRef.current[i].span;
      timeline.set(currentRef, { opacity: 0.25 });
    }
    const pivotIndex = partition(array, low, high, timeline, numbersRef);
    quickSort(timeline, array, numbersRef, low, pivotIndex - 1);
    quickSort(timeline, array, numbersRef, pivotIndex + 1, high);
  }
  return array;
}

function partition(
  array: Inumbers[],
  low: number,
  high: number,
  timeline: any,
  numbersRef: any
): number {
  const pivot = array[low].value;
  let left = low + 1;
  let right = high;
  for (let i = low; i <= high; i++) {
    const currentRef = numbersRef.current[array[i].index].span;
    timeline.set(currentRef, { opacity: 1 });
  }
  while (left <= right) {
    while (left<=right && array[left].value <= pivot) {
      left++;
    }
    while (left <= right && array[right].value > pivot) {
      right--;
    }
    if (left < right) {
      const leftRef = numbersRef.current[array[left].index].span;
      const rightRef = numbersRef.current[array[right].index].span;
      timeline.to(leftRef, { x: "+=" + (right - left) * width, duration: 0.5 });
      timeline.to(
        rightRef,
        { x: "-=" + (right - left) * width, duration: 0.5 },
        "<"
      );
      [array[left], array[right]] = [array[right], array[left]];
    }
  }
  const lowRef = numbersRef.current[array[low].index].span;
  const rightRef = numbersRef.current[array[right].index].span;
  timeline.to([lowRef, rightRef], {
    y: -40,
    duration: 0.2,
  });
  timeline.to(lowRef, { x: "+=" + (right - low) * width, duration: 0.5 });
  timeline.to(
    rightRef,
    { x: "-=" + (right - low) * width, duration: 0.5 },
    "<"
  );
  timeline.to([lowRef, rightRef], {
    y: 0,
    duration: 0.2,
  });
  [array[low], array[right]] = [array[right], array[low]];
  return right;
}
export default quickSort;
