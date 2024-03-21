import React from 'react'
import TopicListNav from '@/components/TopicListNav';

const DSATopicPageLayout = ({children}: Readonly<{
    children: React.ReactNode;
  }>) => {

  return (
    <section className='px-4'>
        <TopicListNav/>
        {children}
    </section>
  )
}

export default DSATopicPageLayout