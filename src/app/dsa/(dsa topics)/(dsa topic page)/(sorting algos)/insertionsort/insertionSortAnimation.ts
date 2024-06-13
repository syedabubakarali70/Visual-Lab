import { Inumbers } from "@/components/useCreateArray";
const width = 49.6;
function insertionSort(timeline: any, array: Inumbers[], numbersRef: any) {
  for (let i = 1; i < array.length; i++) {
    let key = { ...array[i] };
    let j = i - 1;
    timeline.to(numbersRef.current[array[i].index].span, {
      y: "+=40",
      duration: 0.5,
    });
    while (j >= 0 && array[j].value > key.value) {
      timeline.to(numbersRef.current[array[j].index].span, {
        x: "+=" + width,
        borderColor: "red",
        borderWidth: 2,
        duration: 0.5,
      });
      timeline.set(numbersRef.current[array[j].index].span, {
        borderWidth: 0,
      });
      array[j + 1] = { ...array[j] };
      j = j - 1;
    }
    array[j + 1] = { ...key };
    const xValue = () => {
      let temp = (i - j - 1) * width;
      return "-=" + temp.toString();
    };
    timeline.to(numbersRef.current[key.index].span, {
      x: xValue(),
      duration: 0.5,
    });
    timeline.to(numbersRef.current[key.index].span, {
      y: 0,
      duration: 0.2,
    });
  }
  array.map((num) => {
    console.log(num.value, num.index);
  });
}
export default insertionSort;
