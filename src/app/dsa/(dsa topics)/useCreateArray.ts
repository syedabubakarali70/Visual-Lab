import { Oxanium } from "next/font/google";
import { useState, useRef, useEffect } from "react";

interface InumList {
  value:number,
  index:number
}


const useCreateArray = ( numbers:number[] ):[InumList[],any,any] => {
  const [numList, setNumList] = useState<InumList[]>(numbers.map((num, index) => ({ value: num, index: index })));
  console.log(numList)
  const numRefs = useRef<any[]>([]);
  
  useEffect(() => {
    const container = document.getElementById("container");
    if (container) {
      console.log("effect creator")
      numRefs.current = numList.map((num,index) => {
        const box = document.createElement("div");
        const span = document.createElement("span");
        span.innerHTML = num.value.toString();
        box.classList.add("flex","px-2","py-1","rounded-md","shadow-md","items-center","justify-center","space-x-1","b-2","bg-primary","w-10","text-primary-background","font-semibold");
        span.classList.add("text-lg","font-semibold",'text-primary-foreground');
        box.appendChild(span);
        container.appendChild(box);
        return {
          value: num,
          index: index,
          box: box,
          span: span
        }
      });
    }
    return () => {

       container && numRefs.current.forEach((numRef) => {
          numRef.box.removeChild(numRef.span);
          container.removeChild(numRef.box);
        });
      }
  }, [numList])

  
  

  return [numList,setNumList, numRefs];
};

export default useCreateArray;
