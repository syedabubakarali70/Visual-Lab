// 'use-client'
// import { useState } from "react";

// const NumbersInputField = ({setNumList}:{setNumList:any}) => {
//   const [input, setInput] = useState("");

//   const handleChange = (e: any) => {
//     setInput(e.target.value);
//   };

//   return (
//     <div>
//       <div>{"error"}</div>
//       <input
//         type="text"
//         placeholder="Enter numbers"
//         className="border-2 border-primary-foreground p-2 rounded-md"
//         onChange={handleChange}
//       />
//       <button
//         onClick={() => {
//           const numbers = input.split(",").map(Number);
//           setNumList(
//             numbers.map((num, index) => ({ value: num, index: index }))
//           );
//         }}
//         className="bg-primary-foreground text-primary-background p-2 rounded-md"
//       >
//         Create Array
//       </button>
//     </div>
//   );
// };

// export default NumbersInputField;

'use-client';
import { useState } from 'react';

const NumbersInputField = ({ setNumList }: { setNumList: any }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    const value = e.target.value;
    setInput(value);

    // Validate the input
    const isValid = /^(\d+,)*\d+$/.test(value);
    if (isValid) {
      setError("");
    } else {
      setError("Please enter a valid list of numbers separated by commas.");
    }
  };

  const handleClick = () => {
    const numbers = input.split(",").map(Number);
    setNumList(numbers.map((num, index) => ({ value: num, index: index })));
  };

  return (
    <div>
      {error && <div className="text-red-500">{error}</div>}
      <input
        type="text"
        placeholder="Enter numbers"
        className="border-2 border-primary-foreground p-2 rounded-md"
        value={input}
        onChange={handleChange}
      />
      <button
        onClick={handleClick}
        className="bg-primary-foreground text-primary-background p-2 rounded-md mt-2"
        disabled={!!error}
      >
        Create Array
      </button>
    </div>
  );
};

export default NumbersInputField;
