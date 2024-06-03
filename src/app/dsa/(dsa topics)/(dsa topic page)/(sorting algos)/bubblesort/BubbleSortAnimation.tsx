import { Inumbers } from "@/components/useCreateArray";

const bubbleSort = (timeline: any, numbers: Inumbers[], numbersRef: any) => {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length - i - 1; j++) {
      const currentRef = numbersRef.current[Number(numbers[j].index)].box;
      const nextRef = numbersRef.current[Number(numbers[j + 1].index)].box;

      timeline.to([currentRef, nextRef], { y: -20, duration: 0.2 });

      if (numbers[j].value > numbers[j + 1].value) {
        [numbers[j], numbers[j + 1]] = [numbers[j + 1], numbers[j]];

        timeline.to(currentRef, {
          x: "+=40",
          duration: 0.5,
          ease: "power2.inOut",
        });
        timeline.to(
          nextRef,
          { x: "-=40", duration: 0.5, ease: "power2.inOut" },
          "<"
        );
      }

      timeline.to([currentRef, nextRef], {
        y: 0,
        duration: 0.2,
        onComplete: () => {
          console.log(numbers);
        },
      });
    }
  }
};

export default bubbleSort;
