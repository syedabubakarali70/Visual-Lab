import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const loading = () => {
  return (
    <>
      <div className="flex flex-col space-y-5 my-6">
        <Skeleton className="w-3/5 h-7 " />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
      <div className="flex flex-col space-y-5 my-6">
        <Skeleton className="w-3/5 h-7" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
      <div className="flex flex-col space-y-5 my-6">
        <Skeleton className="w-3/5 h-7" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    </>
  )
}

export default loading