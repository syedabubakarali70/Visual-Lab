import { Inumbers } from "@/components/useCreateArray";

const width = 49.6;

const blue = "hsla(221, 83%, 53%, 0.57)";
const green = "hsla(142.1, 76.2% ,36.3%, 0.6)";
const red = "hsla(0, 72.2%, 50.6%, 0.6)";

const calculateJ = (j: number) => {
  return j * width;
};

function insertionSort(timeline: any, array: Inumbers[], numbersRef: any) {
  timeline.set("#line1", { backgroundColor: blue });
  timeline.set("#line1", { backgroundColor: "transparent", delay: 0.5 });
  timeline.set("#line2", { backgroundColor: blue });
  timeline.set("#line2", { backgroundColor: "transparent", delay: 0.5 });
  let i = 1; // Initialize the counter
  timeline.set("#i", { x: "+=" + width, opacity: 1});
  // timeline.set("#iArrow", {transformOrigin: "top left" , rotation: 0});
  // timeline.set("#jArrow", { transformOrigin: "top right" , rotation: 0});
  while (1) {
    // Change the for loop to a while loop
    timeline.set("#line3", { backgroundColor: blue });
    if (i < array.length) {
      timeline.set("#line3", { backgroundColor: green, delay: 0.5 });
      timeline.set("#line3", { backgroundColor: "transparent", delay: 0.5 });

      let key = { ...array[i] };
      timeline.set("#line4", {
        backgroundColor: blue,
      });
      timeline.to("#key", { opacity: 1, x: "+=" + width, duration: 0.2 });
      timeline.set("#line4", {
        delay: 0.3,
        backgroundColor: "transparent",
      });
      let j = i - 1;

      if (j !== 0)
        timeline.to("#j", {
          opacity: 1,
          x: "+=" + calculateJ(i),
          duration: 0.5,
        });

      timeline.set("#line5", {
        backgroundColor: blue,
      });
      timeline.set("#j", { opacity: 1 });
      timeline.set("#line5", {
        delay: 0.5,
        backgroundColor: "transparent",
      });

      timeline.to([numbersRef.current[array[i].index].span, "#key"], {
        y: "+=40",
        duration: 0.5,
      });

      timeline.set("#line6", {
        backgroundColor: blue,
      });

      while (j >= 0 && array[j].value > key.value) {
        timeline.set("#line6", {
          delay: 0.5,
          backgroundColor: green,
        });
        timeline.set("#line6", {
          delay: 0.5,
          backgroundColor: "transparent",
        });
        timeline.set("#line7", {
          backgroundColor: blue,
        });
        timeline.to(numbersRef.current[array[j].index].span, {
          x: "+=" + width,
          duration: 0.5,
        });
        timeline.set("#line7", {
          delay: 0.5,
          backgroundColor: "transparent",
        });
        array[j + 1] = { ...array[j] };
        timeline.set("#line8", { backgroundColor: blue });
        timeline.to("#j", { x: "-=" + width, duration: 0.5 });
        j = j - 1;
        timeline.set("#line8", {
          delay: 0.5,
          backgroundColor: "transparent",
        });
      }
      timeline.set("#line6", {
        delay: 0.5,
        backgroundColor: red,
      });
      timeline.set("#line6", {
        delay: 0.5,
        backgroundColor: "transparent",
      });
      timeline.set("#line9", {
        backgroundColor: blue,
      });
      array[j + 1] = { ...key };
      timeline.set("#line9", {
        backgroundColor: "transparent",
        delay: 0.5,
      });

      const xValue = () => {
        let temp = (i - j - 1) * width;
        return "-=" + temp.toString();
      };

      timeline.to(numbersRef.current[key.index].span, {
        x: xValue(),
        duration: 0.5,
      });
      timeline.to([numbersRef.current[key.index].span, "#key"], {
        y: 0,
        duration: 0.2,
      });

      i++; // Increment the counter
      timeline.to("#i", { x: "+=" + width, duration: 0.5 });
    } else break;
  }
  timeline.set("#line3", { backgroundColor: red, delay: 0.5 });
  timeline.set("#line3", { backgroundColor: "transparent", delay: 0.5 });
  timeline.set(['#i', '#j', '#key'], { opacity: 0 });
}

export default insertionSort;
