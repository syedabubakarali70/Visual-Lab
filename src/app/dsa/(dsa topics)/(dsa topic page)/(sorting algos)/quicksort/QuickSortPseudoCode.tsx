const QuickSortPseudoCode = () => {
    return (
      <div>
        <div className="line pl-4" id="line1">
          {"function quickSort(array, low, high):"}
        </div>
        <div className="line pl-8" id="line2">
          {"if low < high:"}
        </div>
        <div className="line pl-12" id="line3">
          {"pi = partition(array, low, high)"}
        </div>
        <div className="line pl-12" id="line4">
          {"quickSort(array, low, pi - 1)"}
        </div>
        <div className="line pl-12" id="line5">
          {"quickSort(array, pi + 1, high)"}
        </div>
        <div className="line pl-4" id="line6">
          {"function partition(array, low, high):"}
        </div>
        <div className="line pl-8" id="line7">
          {"pivot = array[high]"}
        </div>
        <div className="line pl-8" id="line8">
          {"i = low - 1"}
        </div>
        <div className="line pl-8" id="line9">
          {"for j from low to high - 1:"}
        </div>
        <div className="line pl-12" id="line10">
          {"if array[j] < pivot:"}
        </div>
        <div className="line pl-16" id="line11">
          {"i = i + 1"}
        </div>
        <div className="line pl-16" id="line12">
          {"swap(array[i], array[j])"}
        </div>
        <div className="line pl-8" id="line13">
          {"swap(array[i + 1], array[high])"}
        </div>
        <div className="line pl-8" id="line14">
          {"return i + 1"}
        </div>
      </div>
    );
  };
  
  export default QuickSortPseudoCode;
  