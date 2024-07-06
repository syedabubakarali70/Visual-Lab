const MergeSortPseudoCode = () => {
  return (
    <div id="codeLines">
      <div id="line1" className="line pl-4">
        {"function mergeSort(array):"}
      </div>
      <div className="pl-8 line" id="line2">
        {"if length of array > 1:"}
      </div>
      <div className="pl-12 line" id="line3">
        {"mid = length of array // 2"}
      </div>
      <div className="pl-12 line" id="line4">
        {"left = array[0:mid]"}
      </div>
      <div className="pl-12 line" id="line5">
        {"right = array[mid:length of array]"}
      </div>
      <div className="pl-12 line" id="line6">
        {"mergeSort(left)"}
      </div>
      <div className="pl-12 line" id="line7">
        {"mergeSort(right)"}
      </div>
      <div className="pl-12 line" id="line8">
        {"merge(left, right, array)"}
      </div>

      <div id="line9" className="line pl-4">
        {"function merge(left, right, array):"}
      </div>
      <div className="pl-8 line" id="line10">
        {"i = j = k = 0"}
      </div>
      <div className="pl-8 line" id="line11">
        {"while i < length(left) and j < length(right):"}
      </div>
      <div className="pl-12 line" id="line12">
        {"if left[i] < right[j]: array[k++] = left[i++]"}
      </div>
      <div className="pl-12 line" id="line13">
        {"else: array[k++] = right[j++]"}
      </div>
      <div className="pl-8 line" id="line14">
        {"while i < length(left): array[k++] = left[i++]"}
      </div>
      <div className="pl-8 line" id="line15">
        {"while j < length(right): array[k++] = right[j++]"}
      </div>
    </div>
  );
};

export default MergeSortPseudoCode;
