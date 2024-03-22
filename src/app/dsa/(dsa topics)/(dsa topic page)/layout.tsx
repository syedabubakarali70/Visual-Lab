import React from 'react'
import TopicListNav from '@/components/TopicListNav';

const DSATopicPageLayout = ({children}: Readonly<{
    children: React.ReactNode;
  }>) => {

  return (
    <section className='px-4 flex flex-col'>
        <TopicListNav/>
        <div className='w-full'>

        {children}
        </div>
    </section>
  )
}

export default DSATopicPageLayout