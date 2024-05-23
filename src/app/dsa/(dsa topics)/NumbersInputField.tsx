import { useState } from "react";

const NumbersInputField = ({setNumList}:{setNumList:any}) => {
  const [input, setInput] = useState("");

  const handleChange = (e: any) => {
    setInput(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter numbers"
        className="border-2 border-primary-foreground p-2 rounded-md"
        onChange={handleChange}
      />
      <button
        onClick={() => {
          const numbers = input.split(",").map(Number);
          setNumList(
            numbers.map((num, index) => ({ value: num, index: index }))
          );
        }}
        className="bg-primary-foreground text-primary-background p-2 rounded-md"
      >
        Create Array
      </button>
    </div>
  );
};

export default NumbersInputField;
