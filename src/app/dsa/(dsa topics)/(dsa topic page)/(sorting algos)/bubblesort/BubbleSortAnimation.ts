import { Inumbers } from "@/components/useCreateArray";

const width = 49.6;
const blue = "hsla(221, 83%, 53%, 0.57)";
const green = "hsla(142.1, 76.2% ,36.3%, 0.6)";
const red = "hsla(0, 72.2%, 50.6%, 0.6)";
const bubbleSort = (
  timeline: any,
  numbers: Inumbers[],
  numbersRef: any
  // swapsandComparisons: any
) => {
  const line1 = document.getElementById("line1");
  const line2 = document.getElementById("line2");
  timeline.set(line1, {
    backgroundColor: blue,
  });
  timeline.set(line1, {
    delay: 0.5,
    backgroundColor: "transparent",
  });
  timeline.set(line2, {
    backgroundColor: blue,
  });
  timeline.set(line2, {
    delay: 0.5,
    backgroundColor: "transparent",
  });
  const comparisons = document.getElementById("comparisons");
  const swaps = document.getElementById("swaps");

  let i = 0;
  while (1) {
    timeline.set("#line3", {
      backgroundColor: blue,
    });
    if (i < numbers.length) {
      timeline.set("#line3", {
        delay: 0.5,
        backgroundColor: green,
      });
      timeline.set("#line3", {
        delay: 0.5,
        backgroundColor: "transparent",
      });
      for (let j = 0; j < numbers.length - i - 1; j++) {
        timeline.set("#line4", {
          backgroundColor: blue,
        });
        timeline.set("#line4", {
          delay: 0.5,
          backgroundColor: green,
        });
        timeline.set("#line4", {
          delay: 0.5,
          backgroundColor: "transparent",
        });
        const currentRef = numbersRef.current[Number(numbers[j].index)].span;
        const nextRef = numbersRef.current[Number(numbers[j + 1].index)].span;

        timeline.to([currentRef, nextRef], { y: -40, duration: 0.2 });
        // timeline.set(swapsandComparisons, {
        //   comparisons: swapsandComparisons.comparisons + 1,
        //   onUpdate: () => {console.log(swapsandComparisons)},
        // });
        timeline.set("#line5", {
          backgroundColor: blue,
        });
        if (numbers[j].value > numbers[j + 1].value) {
          timeline.set("#line5", {
            delay: 0.5,
            backgroundColor: green,
          });
          timeline.set("#line5", {
            delay: 0.5,
            backgroundColor: "transparent",
          });
          timeline.to("#line6", {
            backgroundColor: blue,
          });
          [numbers[j], numbers[j + 1]] = [numbers[j + 1], numbers[j]];
          // timeline.set(swaps, {innerText: swaps && Number(swaps.innerText) + 1,
          //   onUpdate: () => {console.log(swaps?.innerText)}
          // });

          swaps &&
            (swaps.innerText = (Number(swaps?.innerText) + 1).toString());

          timeline.to(currentRef, {
            x: "+=" + width,
            duration: 0.5,
            ease: "power2.inOut",
          });
          timeline.to(
            nextRef,
            { x: "-=" + width, duration: 0.5, ease: "power2.inOut" },
            "<"
          );
        } else {
          timeline.set("#line5", {
            delay: 0.5,
            backgroundColor: red,
          });
          timeline.set("#line5", {
            delay: 0.3,
            backgroundColor: "transparent",
          });
        }
        timeline.to([currentRef, nextRef], {
          y: 0,
          duration: 0.2,
        });

        timeline.set("#line6", {
          delay: 0.5,
          backgroundColor: "transparent",
        });
      }
      timeline.set("#line4", {
        delay: 0.5,
        backgroundColor: red,
      });
      timeline.set("#line4", {
        delay: 0.5,
        backgroundColor: "transparent",
      });
      i++;
    } else break;
  }
  timeline.set("#line3", {
    delay: 0.5,
    backgroundColor: red,
  });
  timeline.set("#line3", {
    delay: 0.5,
    backgroundColor: "transparent",
  });
};

export default bubbleSort;
