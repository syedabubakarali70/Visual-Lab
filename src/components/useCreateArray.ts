import { useState, useRef, useEffect } from "react";
type Inumbers = {
  value: number;
  index: number;
};
export type { Inumbers };

const createDivWithId = (id: string, direction: string): HTMLDivElement => {
  // Create the main div and set its id
  const mainDiv = document.createElement("div");
  mainDiv.id = id.toLowerCase();
  mainDiv.className = `${
    direction === "forward"
      ? "mb-2"
      : direction === "backward"
      ? "mb-2"
      : "flex flex-col-reverse"
  }  opacity-1`;

  // Create the first child div containing the string id
  const firstChildDiv = document.createElement("div");
  firstChildDiv.className =
    `text-primary-foreground text-lg font-semibold  p-1 bg-primary  items-center justify-center flex m-1 ${(id === 'I' || id === 'J') ? "w-6 h-6 rounded-full" : "rounded-lg"}`;
  firstChildDiv.textContent = id;

  // Create the second child div containing the down arrow
  const secondChildDiv = document.createElement("div");

  secondChildDiv.className = `flex flex-col items-center ${
    direction === "forward"
      ? "origin-top-right rotate-[-30deg] -mt-4"
      : direction === "backward"
      ? "origin-top-left rotate-[30deg] -mt-4 z-10"
      : "origin-center rotate-[180deg]"
  } `;
  secondChildDiv.id = `${id.toLowerCase()}Arrow`;

  // Create the rectangle (shaft) div
  const rectangleDiv = document.createElement("div");
  rectangleDiv.className = "w-1 h-6 bg-primary";

  // Create the triangle (arrowhead) div
  const triangleDiv = document.createElement("div");
  triangleDiv.className =
    "w-0 h-0 border-l-4 border-r-4 border-l-transparent border-r-transparent border-t-8 border-t-primary";

  // Append the rectangle and triangle divs to the main div
  secondChildDiv.appendChild(rectangleDiv);
  secondChildDiv.appendChild(triangleDiv);

  // Append child divs to the main div
  mainDiv.appendChild(firstChildDiv);
  mainDiv.appendChild(secondChildDiv);

  return mainDiv;
};

const useCreateArray = (
  numbers: number[],
  Animation: string
): [Inumbers[], any, any] => {
  const [numList, setNumList] = useState<Inumbers[]>(
    numbers.map((num, index) => ({ value: num, index: index }))
  );
  const numRefs = useRef<any[]>([]);

  useEffect(() => {
    const container = document.getElementById("animationContainer");
    const mainArray = document.getElementById("mainArray");
    const variables = document.getElementById("variables");
    const otherVariables = document.getElementById("otherVariables");
    variables && (variables.style.width = `${numList.length * 49.6}px`);
    otherVariables &&
      (otherVariables.style.width = `${numList.length * 49.6}px`);
    variables?.classList.add("-ml-2");
    const j = createDivWithId("J", "backward");
    const i = createDivWithId("I", "forward");
    const key = createDivWithId("key", "straight");
    const min = createDivWithId("min", "straight");
    if (container && mainArray && variables) {
      if (
        Animation === "Bubble Sort" ||
        Animation === "Selection Sort" ||
        Animation === "Insertion Sort"
      ) {
        variables.appendChild(i);
        variables.appendChild(j);
        if (Animation === "Insertion Sort") {
          otherVariables && otherVariables.appendChild(key);
        }
        else if(Animation === "Selection Sort"){
          otherVariables && otherVariables.appendChild(min);
        }
      }
      numRefs.current = numList.map((num, index) => {
        const box = document.createElement("div");
        const span = document.createElement("span");
        const indexes = document.createElement("span");
        span.innerHTML = num.value.toString();
        box.classList.add(
          "flex",
          "flex-col",
          "shadow-md",
          "items-center",
          "justify-center",
          "border-2",
          "border-slate-500",
          "border-l-0",
          "first:border-l-2"
        );
        indexes.classList.add(
          "flex",
          "shadow-md",
          "items-center",
          "justify-center",
          "px-2",
          "border-slate-500",
          "border-b-2",
          "w-full"
        );
        indexes.innerHTML = index.toString();
        span.classList.add(
          "text-lg",
          "font-semibold",
          "text-primary-foreground",
          "rounded-full",
          "p-1",
          "bg-primary",
          "w-8",
          "h-8",
          "items-center",
          "justify-center",
          "flex",
          "mx-2",
          "my-1"
        );

        box.appendChild(indexes);
        box.appendChild(span);
        mainArray.appendChild(box);
        return {
          value: num,
          index: index,
          box: box,
          span: span,
        };
      });
    }
    return () => {
      container &&
        mainArray &&
        numRefs.current.forEach((numRef) => {
          numRef.box.removeChild(numRef.span);
          mainArray.removeChild(numRef.box);
        });

      if (
        Animation === "Bubble Sort" ||
        Animation === "Selection Sort" ||
        Animation === "Insertion Sort"
      ) {
        variables && variables.removeChild(i);
        variables && variables.removeChild(j);
        if (Animation === "Insertion Sort") {
          otherVariables && otherVariables.removeChild(key);
        }
        else if(Animation === "Selection Sort"){
          otherVariables && otherVariables.removeChild(min);
        }
      }
    };
  }, [numList]);

  return [numList, setNumList, numRefs];
};

export default useCreateArray;
