export const code: Record<string, string> = {
    "javascript":`
function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}

const arr = [243, 45, 23, 356, 3, 5346, 35, 5];
console.log(selectionSort(arr));

    `,

    "python":`
def selection_sort(arr):
    for i in range(len(arr)):
        min_index = i
        for j in range(i + 1, len(arr)):
            if arr[j] < arr[min_index]:
                min_index = j
        arr[i], arr[min_index] = arr[min_index], arr[i]
    return arr

arr = [243, 45, 23, 356, 3, 5346, 35, 5]
print(selection_sort(arr))
`,
    "cpp":`

    #include <iostream>
    #include <vector>
    
    void selectionSort(std::vector<int>& arr) {
        for (size_t i = 0; i < arr.size(); i++) {
            size_t minIndex = i;
            for (size_t j = i + 1; j < arr.size(); j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            std::swap(arr[i], arr[minIndex]);
        }
    }
    
    int main() {
        std::vector<int> arr = {243, 45, 23, 356, 3, 5346, 35, 5};
        selectionSort(arr);
        for (int i : arr)
            std::cout << i << " ";
        std::cout << std::endl;
        return 0;
    }
    
    `

}