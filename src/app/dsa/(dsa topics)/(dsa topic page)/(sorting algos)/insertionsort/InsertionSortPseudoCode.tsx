const InsertionSortPseudoCode = () => {
    return (
      <div>
        <div className="line pl-4" id="line1">
          {"function insertionSort(array):"}
        </div>
        <div className="line pl-8" id="line2">
          {"n = length of array"}
        </div>
        <div className="line pl-8" id="line3">
          {"for i from 1 to n:"}
        </div>
        <div className="line pl-12" id="line4">
          {"key = array[i]"}
        </div>
        <div className="line pl-12" id="line5">
          {"j = i - 1"}
        </div>
        <div className="line pl-12" id="line6">
          {"while j >= 0 and array[j] > key:"}
        </div>
        <div className="line pl-16" id="line7">
          {"array[j + 1] = array[j]"}
        </div>
        <div className="line pl-16" id="line8">
          {"j = j - 1"}
        </div>
        <div className="line pl-12" id="line9">
          {"array[j + 1] = key"}
        </div>
      </div>
    );
  };
  
  export default InsertionSortPseudoCode;
  