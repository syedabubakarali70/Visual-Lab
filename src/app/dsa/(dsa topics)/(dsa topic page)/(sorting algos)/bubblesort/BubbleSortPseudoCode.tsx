const BubbleSortPseudoCode = () => {
  return (
    <div>
      <div id="line1">
        {"function bubbleSort(array):"}
      </div>
      <div className="pl-4" id="line2">
        {"n = length of array"}
      </div>
      <div className="pl-4" id="line3">
        {"for i from 0 to n-1:"}
      </div>
      <div className="pl-8" id="line4">
        {"for j from 0 to n-i-2:"}
      </div>
      <div className="pl-12" id="line5">
        {"if array[j] > array[j + 1]:"}
      </div>
      <div className="pl-16" id="line6">
        {"swap(array[j], array[j + 1])"}
        </div>
        <div className="pl-4" id="line7">
          {"return array"}
      </div>
    </div>
  );
};

export default BubbleSortPseudoCode;
