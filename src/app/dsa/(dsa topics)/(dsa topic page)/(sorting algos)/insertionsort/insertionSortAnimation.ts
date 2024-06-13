import { Inumbers } from "@/components/useCreateArray";
import { on } from "events";
const width = 49.6;
function insertionSort(timeline: any, array: Inumbers[], numbersRef: any) {
  for (let i = 1; i < array.length; i++) {
    let key = array[i].value;
    let j = i - 1;
    timeline.to(numbersRef.current[array[i].index].span, {
      y: "+=40",
      borderColor: "red",
      borderWidth: 2,
      duration: 0.5,
    });
    // Move elements of array[0..i-1], that are greater than key,
    // to one position ahead of their current position
    console.log("itr = ",i)
    while (j >= 0 && array[j].value > key) {
      timeline.to(numbersRef.current[array[j].index].span, {
        x: "+=" + width,
        borderColor: "yellow",
      borderWidth: 2,
        duration: 0.5,
        onStart:console.log(j)
      });
      timeline.to(numbersRef.current[array[j].index].span, {
      borderWidth: 0,
      });
      array[j + 1].value = array[j].value;
      j = j - 1;
    }
    array[j + 1].value = key;
    const xValue = () => {
      let temp = (i) * width;
      return "-=" + temp.toString();
    };
    timeline.to(numbersRef.current[array[i].index].span, {
      x: xValue(),
      duration: 0.5,
    });
    timeline.to(numbersRef.current[array[i].index].span, {
      y: 0,
      borderWidth:0,
      duration: 0.2,
    });
  }
}
export default insertionSort;
