export const code: Record<string, string> = {
    "javascript":`
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

const arr = [243, 45, 23, 356, 3, 5346, 35, 5];
console.log(insertionSort(arr));
    `,

    "python":`
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

arr = [243, 45, 23, 356, 3, 5346, 35, 5]
print(insertion_sort(arr))
`,
    "cpp":`
    #include <iostream>
    #include <vector>
    
    void insertionSort(std::vector<int>& arr) {
        for (size_t i = 1; i < arr.size(); i++) {
            int key = arr[i];
            int j = i - 1;
    
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }
    
    int main() {
        std::vector<int> arr = {243, 45, 23, 356, 3, 5346, 35, 5};
        insertionSort(arr);
        for (int i : arr)
            std::cout << i << " ";
        std::cout << std::endl;
        return 0;
    }
    
    `

}