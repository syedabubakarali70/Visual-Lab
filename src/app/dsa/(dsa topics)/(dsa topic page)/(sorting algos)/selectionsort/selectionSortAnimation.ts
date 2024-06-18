import { Inumbers } from "@/components/useCreateArray";
const width = 49.6;
function selectionSort(timeline: any, array: Inumbers[], numbersRef: any) {
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    timeline.to(numbersRef.current[array[minIndex].index].span, {
      borderWidth: 2,
      borderColor: "red",
      duration: 0.2,
    });

    for (let j = i + 1; j < n; j++) {
      if (array[j].value < array[minIndex].value) {
        timeline.to(numbersRef.current[array[minIndex].index].span, {
          borderWidth: 0,
          duration: 0.1,
        });
        minIndex = j;
        timeline.to(numbersRef.current[array[minIndex].index].span, {
          borderWidth: 2,
          borderColor: "red",
          duration: 0.2,
        });
      }
    }

    if (minIndex !== i) {
      timeline.to(
        [
          numbersRef.current[array[i].index].span,
          numbersRef.current[array[minIndex].index].span,
        ],
        {
          y: "+=50",
          duration: 0.2,
        }
      );
      const xValue = (minIndex - i) * width;
      timeline.to(numbersRef.current[array[i].index].span, {
        x: "+=" + xValue,
        duration: 0.5, ease: "power2.inOut"
      });
      timeline.to(
        numbersRef.current[array[minIndex].index].span,
        {
          x: "-=" + xValue,
          borderWidth: 0,
          duration: 0.5, ease: "power2.inOut"
        },
        "<"
      );
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      timeline.to(
        [
          numbersRef.current[array[i].index].span,
          numbersRef.current[array[minIndex].index].span,
        ],
        {
          y: "0",
          duration: 0.2,
        }
      );
    }
    timeline.set(
        numbersRef.current[array[minIndex].index].span,
        {
          borderWidth: 0,
        },
      );
  }
}

export default selectionSort;
