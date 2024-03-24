import React from "react";
import { TypographyH1 } from "@/components/TypographyH1";
import { TypographyP } from "@/components/TypographyP";
import CodeBlock from "@/components/CodeBlock"

const BubbleSort = () => {
  return (
    <>
      <div className="flex flex-col space-y-5 my-6">
        <TypographyH1>Bubble Sort</TypographyH1>
        <div className="w-full">
          <TypographyP>
            Bubble sort is a sorting algorithm that compares two adjacent
            elements and swaps them until they are in the intended order.
          </TypographyP>

          <TypographyP>
            Just like the movement of air bubbles in the water that rise up to
            the surface, each element of the array move to the end in each
            iteration. Therefore, it is called a bubble sort.
          </TypographyP>
        </div>
        <CodeBlock>
{`
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
`}
        </CodeBlock>
      </div>
      
    </>
  );
};

export default BubbleSort;
