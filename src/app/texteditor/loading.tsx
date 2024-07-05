import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

const loading = () => {
    return (
        <section className="h-[85vh]">
          <Skeleton className="border pl-4 rounded-md flex justify-between items-center my-2 h-[1.75rem]"></Skeleton>
  
          <div className="w-full h-full flex flex-col md:flex-row  justify-between items-stretch box-border gap-2">
            <Skeleton className="w-full md:w-[70%] h-[70%] md:h-auto drop-shadow-md border-background-foreground rounded-xl overflow-y-auto"></Skeleton>
            <Skeleton className="flex flex-col items-stretch border w-full md:w-[30%] h-[30%] md:h-auto py-2 rounded-xl overflow-scroll chatbox"></Skeleton>
          </div>
        </section>
      );
}

export default loading