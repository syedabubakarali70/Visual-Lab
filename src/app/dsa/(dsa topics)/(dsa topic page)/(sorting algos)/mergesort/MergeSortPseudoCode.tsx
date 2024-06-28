const MergeSortPseudoCode = () => {
    return (
      <div>
        <div className="line pl-4" id="line1">
          {"function mergeSort(array):"}
        </div>
        <div className="line pl-8" id="line2">
          {"if length of array > 1:"}
        </div>
        <div className="line pl-12" id="line3">
          {"mid = length of array // 2"}
        </div>
        <div className="line pl-12" id="line4">
          {"leftHalf = array[0:mid]"}
        </div>
        <div className="line pl-12" id="line5">
          {"rightHalf = array[mid:]"}
        </div>
        <div className="line pl-12" id="line6">
          {"mergeSort(leftHalf)"}
        </div>
        <div className="line pl-12" id="line7">
          {"mergeSort(rightHalf)"}
        </div>
        <div className="line pl-12" id="line8">
          {"i = j = k = 0"}
        </div>
        <div className="line pl-12" id="line9">
          {"while i < length of leftHalf and j < length of rightHalf:"}
        </div>
        <div className="line pl-16" id="line10">
          {"if leftHalf[i] < rightHalf[j]:"}
        </div>
        <div className="line pl-20" id="line11">
          {"array[k] = leftHalf[i]"}
        </div>
        <div className="line pl-20" id="line12">
          {"i = i + 1"}
        </div>
        <div className="line pl-16" id="line13">
          {"else:"}
        </div>
        <div className="line pl-20" id="line14">
          {"array[k] = rightHalf[j]"}
        </div>
        <div className="line pl-20" id="line15">
          {"j = j + 1"}
        </div>
        <div className="line pl-16" id="line16">
          {"k = k + 1"}
        </div>
        <div className="line pl-12" id="line17">
          {"while i < length of leftHalf:"}
        </div>
        <div className="line pl-16" id="line18">
          {"array[k] = leftHalf[i]"}
        </div>
        <div className="line pl-16" id="line19">
          {"i = i + 1"}
        </div>
        <div className="line pl-16" id="line20">
          {"k = k + 1"}
        </div>
        <div className="line pl-12" id="line21">
          {"while j < length of rightHalf:"}
        </div>
        <div className="line pl-16" id="line22">
          {"array[k] = rightHalf[j]"}
        </div>
        <div className="line pl-16" id="line23">
          {"j = j + 1"}
        </div>
        <div className="line pl-16" id="line24">
          {"k = k + 1"}
        </div>
      </div>
    );
  };
  
  export default MergeSortPseudoCode;
  