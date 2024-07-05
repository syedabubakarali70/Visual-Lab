export const code: Record<string, string> = {
    "javascript":`
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];

  for (const el of arr.slice(0, arr.length - 1)) {
    if (el < pivot) {
      left.push(el);
    } else {
      right.push(el);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

const arr = [243, 45, 23, 356, 3, 5346, 35, 5];
console.log(quickSort(arr));
    `,

    "python":`
def quick_sort(arr):
    if len(arr) <= 1:
        return arr

    pivot = arr[len(arr) - 1]
    left = [x for x in arr[:-1] if x < pivot]
    right = [x for x in arr[:-1] if x >= pivot]

    return quick_sort(left) + [pivot] + quick_sort(right)

arr = [243, 45, 23, 356, 3, 5346, 35, 5]
print(quick_sort(arr))
`,
    "cpp":`
#include <iostream>
#include <vector>

int partition(std::vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;

    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            std::swap(arr[i], arr[j]);
        }
    }
    std::swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(std::vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int main() {
    std::vector<int> arr = {243, 45, 23, 356, 3, 5346, 35, 5};
    quickSort(arr, 0, arr.size() - 1);
    for (int i : arr)
        std::cout << i << " ";
    std::cout << std::endl;
    return 0;
}

    `

}