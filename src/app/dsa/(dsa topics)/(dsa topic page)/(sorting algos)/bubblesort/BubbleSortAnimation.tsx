import { Inumbers } from "@/components/useCreateArray";

const width = 49.6;

const bubbleSort = (
  timeline: any,
  numbers: Inumbers[],
  numbersRef: any,
  // swapsandComparisons: any
) => {
  const comparisons = document.getElementById("comparisons");
  const swaps = document.getElementById("swaps");
  console.log(swaps);

  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length - i - 1; j++) {
      const currentRef = numbersRef.current[Number(numbers[j].index)].span;
      const nextRef = numbersRef.current[Number(numbers[j + 1].index)].span;

      timeline.to([currentRef, nextRef], { y: -40, duration: 0.2 });
      // timeline.set(swapsandComparisons, {
      //   comparisons: swapsandComparisons.comparisons + 1,
      //   onUpdate: () => {console.log(swapsandComparisons)},
      // });
      if (numbers[j].value > numbers[j + 1].value) {
        [numbers[j], numbers[j + 1]] = [numbers[j + 1], numbers[j]];
        // timeline.set(swaps, {innerText: swaps && Number(swaps.innerText) + 1,
        //   onUpdate: () => {console.log(swaps?.innerText)}
        // });
        
        swaps &&  (swaps.innerText = (Number(swaps?.innerText) + 1).toString())

        timeline.to(currentRef, {
          x: "+=" + width,
          duration: 0.5,
          ease: "power2.inOut",
        });
        timeline.to(
          nextRef,
          { x: "-="+ width, duration: 0.5, ease: "power2.inOut" },
          "<"
        );
      }

      timeline.to([currentRef, nextRef], {
        y: 0,
        duration: 0.2,
      });
    }
  }
};

export default bubbleSort;
