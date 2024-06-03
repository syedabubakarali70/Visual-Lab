// import { useEffect, useRef } from 'react';

// const useInterval = (callback: any, delay: number | null)=> {
//     const savedCallback = useRef();

//     useEffect(() => {
//       savedCallback.current = callback;
//     });

//     useEffect(() => {
//       function tick() {
//         if (savedCallback.current) (savedCallback.current as () => void)();
//       }
//       if (delay !== null) {
//         let id = setInterval(tick, delay);
//         return () => clearInterval(id);
//       }
//     }, [delay]);
   
//   }
//   export default useInterval;

import { useEffect, useRef } from 'react';

const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<() => void>();

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;
