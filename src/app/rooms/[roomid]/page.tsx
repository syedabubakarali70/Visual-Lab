import React from 'react'
import ChatRoom from '@/components/ChatRoom'
const Page = ({ params }: { params: { roomid: string } }) => {
  return (
    <ChatRoom roomId={params.roomid} />

  )
}

export default Page