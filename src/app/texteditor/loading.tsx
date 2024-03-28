import { Skeleton } from '@radix-ui/themes'
import React from 'react'

const textEditorLoading = () => {
  return (
    <div className="w-full px-4 h-[90vh] flex flex-col md:flex-row  justify-between items-stretch box-border gap-2">
        <Skeleton className="w-full md:w-[70%] h-[70%] md:h-auto rounded-xl">
        </Skeleton>
        <Skeleton className="w-full md:w-[30%] h-[30%] md:h-auto rounded-xl">
          Hello World
        </Skeleton>
      </div>
  )
}

export default textEditorLoading