const SelectionSortPseudoCode = () => {
    return (
      <div>
        <div className="line pl-4" id="line1">
          {"function selectionSort(array):"}
        </div>
        <div className="line pl-8" id="line2">
          {"n = length of array"}
        </div>
        <div className="line pl-8" id="line3">
          {"for i from 0 to n-1:"}
        </div>
        <div className="line pl-12" id="line4">
          {"minIndex = i"}
        </div>
        <div className="line pl-12" id="line5">
          {"for j from i+1 to n:"}
        </div>
        <div className="line pl-16" id="line6">
          {"if array[j] < array[minIndex]:"}
        </div>
        <div className="line pl-20" id="line7">
          {"minIndex = j"}
        </div>
        <div className="line pl-12" id="line8">
          {"swap(array[i], array[minIndex])"}
        </div>
      </div>
    );
  };
  
  export default SelectionSortPseudoCode;
  