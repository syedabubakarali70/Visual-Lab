import { Inumbers } from "@/components/useCreateArray";

const width = 49.6;
const blue = "hsla(221, 83%, 53%, 0.57)";
const green = "hsla(142.1, 76.2% ,36.3%, 0.6)";
const red = "hsla(0, 72.2%, 50.6%, 0.6)";

const calculateMin = (i: number, minIndex: number) => {
  if (minIndex < i) return "+=" + ((i-minIndex) * width).toString();
  else return "-=" + ((minIndex - i) * width).toString();

}

function selectionSort(timeline: any, array: Inumbers[], numbersRef: any) {
  const n = array.length;
  timeline.set("#line1", { backgroundColor: blue });
  timeline.set("#line1", { backgroundColor: "transparent", delay: 0.5 });
  timeline.set("#line2", { backgroundColor: blue });
  timeline.set("#line2", { backgroundColor: "transparent", delay: 0.5 });
  let i = 0;
  let minIndex=0;
  let j =0;
  timeline.set("#i", { opacity: 1 });
  while (true) {
    timeline.set("#line3", { backgroundColor: blue });
    if (i >= n - 1) break;

    timeline.set("#line3", { backgroundColor: green, delay: 0.5 });
    timeline.set("#line3", { backgroundColor: "transparent", delay: 0.5 });

    timeline.set("#line4", { backgroundColor: blue });
    if(i==0) timeline.set("#min", { opacity: 1 });
    else timeline.to("#min", { x: calculateMin(i,minIndex), duration: 0.5 });
    minIndex = i;
    timeline.set("#line4", { backgroundColor: "transparent", delay: 0.3 });

    timeline.set("#line5", { backgroundColor: blue });
    j = i + 1;
    i==0 && timeline.to("#j", { opacity: 1,x: "+=" + (width), duration: 0.5});
    if(i>0){
      
      timeline.to("#j", { x: "-=" + (width*(array.length - i-1)),opacity:1, duration: 0.5 });
    }

    while (true) {
      if (j >= n) break;
      timeline.set("#line5", { backgroundColor: green, delay: 0.5 });
      timeline.set("#line5", { backgroundColor: "transparent", delay: 0.5 });

      timeline.set("#line6", { backgroundColor: blue });
      if (array[j].value < array[minIndex].value) {
        timeline.set("#line6", { backgroundColor: green, delay: 0.5 });
        timeline.set("#line6", { backgroundColor: "transparent", delay: 0.5 });
        timeline.set("#line7", { backgroundColor: blue, delay: 0.5 });
        timeline.to("#min", { x: "+=" + (width * (j - minIndex)), duration: 0.5 });
        minIndex = j;
        timeline.set("#line7", { backgroundColor: "transparent", delay: 0.5 });
      
      }else{
        timeline.set("#line6", { backgroundColor: red, delay: 0.5 });
        timeline.set("#line6", { backgroundColor: "transparent", delay: 0.5 });
      }

      timeline.to("#j", { x: "+=" + width, duration: 0.5 });
      j++;
    }

    timeline.set("#line5", { backgroundColor: red,delay: 0.5 });
    timeline.set("#j", { opacity:0 });
    timeline.set("#line5", { backgroundColor: "transparent",delay: 0.5 });

    timeline.set("#line8", { backgroundColor: blue });
    if (minIndex !== i) {
      timeline.to(
        [
          numbersRef.current[array[i].index].span,
          numbersRef.current[array[minIndex].index].span,
          "#min"
        ],
        {
          y: "+=50",
          duration: 0.2,
        }
      );

      const xValue = (minIndex - i) * width;
      timeline.to(numbersRef.current[array[i].index].span, {
        x: "+=" + xValue,
        duration: 0.5,
        ease: "power2.inOut",
      });
      timeline.to(
        numbersRef.current[array[minIndex].index].span,
        {
          x: "-=" + xValue,
          duration: 0.5,
          ease: "power2.inOut",
        },
        "<"
      );
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      timeline.to(
        [
          numbersRef.current[array[i].index].span,
          numbersRef.current[array[minIndex].index].span,
          "#min"
        ],
        {
          y: "0",
          duration: 0.2,
        }
      );
    }
    timeline.set("#line8", { backgroundColor: "transparent", delay: 0.5 });
    timeline.to("#i", { x: "+=" + width , duration: 0.5 });
    i++;
  }
  timeline.set("#line3", { backgroundColor: red, delay: 0.5 });
  timeline.set("#line3", { backgroundColor: "transparent" , delay: 0.5});
  timeline.set("#i", { opacity: 0 });
  timeline.set("#min", { opacity: 0 });
}

export default selectionSort;
