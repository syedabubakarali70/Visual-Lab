const BubbleSortPseudoCode = () => {
  return (
    <div id="codeLines">
      <div id="line1" className="line pl-4">
        {"function bubbleSort(array):"}
      </div>
      <div className="pl-8 line" id="line2">
        {"n = length of array"}
      </div>
      <div className="pl-8 line" id="line3">
        {"for i from 0 to n-1:"}
      </div>
      <div className="pl-12 line" id="line4">
        {"for j from 0 to n-i-2:"}
      </div>
      <div className="pl-16 line" id="line5">
        {"if array[j] > array[j + 1]:"}
      </div>
      <div className="pl-20 line" id="line6">
        {"swap(array[j], array[j + 1])"}
        </div>
        
    </div>
  );
};

export default BubbleSortPseudoCode;
