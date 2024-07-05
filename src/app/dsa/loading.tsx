import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const loading = () => {
  return (
    <div className="gap-y-2 flex flex-col md:flex-row flex-wrap justify-between w-full">
        <Skeleton className='w-full md:w-[30%] h-40'/>
        <Skeleton className='w-full md:w-[30%] h-40'/>
        <Skeleton className='w-full md:w-[30%] h-40'/>
        <Skeleton className='w-full md:w-[30%] h-40'/>
        <Skeleton className='w-full md:w-[30%] h-40'/>
        <Skeleton className='w-full md:w-[30%] h-40'/>
    </div>
  )
}

export default loading