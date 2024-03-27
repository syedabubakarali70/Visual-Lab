export const code: Record<string, string> = {
    "javascript":`
// Optimized bubble sort in JavaScript

function bubbleSort(arr) {

  var i, j;
  var len = arr.length;

  var isSwapped = false;

  for (i = 0; i < len; i++) {

    isSwapped = false;

    for (j = 0; j < (len - i - 1); j++) {
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j]
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        isSwapped = true;
      }
    }

    // IF no two elements were swapped
    // by inner loop, then break 
    if (!isSwapped) {
      break;
    }
  }

  // Print the array
  console.log(arr)
}

var arr = [243, 45, 23, 356, 3, 5346, 35, 5];

// calling the bubbleSort Function
bubbleSort(arr)

    `,

    "python":`
# Optimized Bubble sort in Python

def bubbleSort(array):
    
  # loop through each element of array
  for i in range(len(array)):
        
    # keep track of swapping
    swapped = False
    
    # loop to compare array elements
    for j in range(0, len(array) - i - 1):

      # compare two adjacent elements
      # change > to < to sort in descending order
      if array[j] > array[j + 1]:

        # swapping occurs if elements
        # are not in the intended order
        temp = array[j]
        array[j] = array[j+1]
        array[j+1] = temp

        swapped = True
          
    # no swapping means the array is already sorted
    # so no need for further comparison
    if not swapped:
      break

data = [-2, 45, 0, 11, -9]

bubbleSort(data)

print('Sorted Array in Ascending Order:')
print(data)
`,
    "cpp":`
# Optimized Bubble sort in Cpp
    `

}