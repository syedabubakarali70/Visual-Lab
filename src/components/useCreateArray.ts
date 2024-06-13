import { useState, useRef, useEffect } from "react";

type Inumbers = {
  value:number,
  index:number
}
export type {Inumbers}


const useCreateArray = ( numbers:number[] ):[Inumbers[],any,any] => {
  const [numList, setNumList] = useState<Inumbers[]>(numbers.map((num, index) => ({ value: num, index: index })));
  const numRefs = useRef<any[]>([]);
  
  useEffect(() => {
    const container = document.getElementById("animationContainer");
    const mainArray = document.getElementById("mainArray");
    if (container && mainArray) {
      numRefs.current = numList.map((num,index) => {
        const box = document.createElement("div");
        const span = document.createElement("span");
        const indexes = document.createElement("span");
        span.innerHTML = num.value.toString();
        box.classList.add("flex","flex-col","shadow-md","items-center","justify-center","border-2","border-slate-500","border-l-0","first:border-l-2");
        indexes.classList.add("flex","shadow-md","items-center","justify-center","px-2","border-slate-500","border-b-2","w-full")
        indexes.innerHTML = index.toString();
        span.classList.add("text-lg","font-semibold",'text-primary-foreground',"rounded-full","p-1","bg-primary","w-8","h-8","items-center","justify-center","flex","mx-2","my-1");
        box.appendChild(indexes);
        box.appendChild(span);
        mainArray.appendChild(box);
        return {
          value: num,
          index: index,
          box: box,
          span: span
        }
      });
    }
    return () => {

       container && mainArray && numRefs.current.forEach((numRef) => {
          numRef.box.removeChild(numRef.span);
          mainArray.removeChild(numRef.box);
          
        });
      }
  }, [numList])

  
  

  return [numList,setNumList, numRefs];
};

export default useCreateArray;
