import React from "react";

const Message = ({
  msg,
  uid,
  userName,
}: {
  msg: any;
  uid: string;
  userName: string;
}) => {
  // if (uid === msg.uid) {
  //   //sent
  //   return (
  //     <div className="flex flex-row-reverse items-start">
  //       <div className="rounded-full bg-secondary p-2 w-8 h-8 flex justify-center items-center ml-1 mt-2">
  //         {userName?.[0]}
  //       </div>
  //       <div className="bg-secondary max-w-[70%] px-3 py-2 rounded-lg my-1">
  //         {msg.text}
  //       </div>
  //     </div>
  //   );
  // } else {
  //   //received
  //   return (
  //     <div className="flex">
  //       <div className="rounded-full bg-blue-700 p-2 w-8 h-8 flex justify-center items-center mr-1 mt-2">
  //         {userName?.[0]}
  //       </div>
  //       <div className="bg-blue-700 max-w-[70%] px-3 py-2 rounded-lg my-1">
  //         {msg.text}
  //       </div>
  //     </div>
  //   );
  // }
  return(<div className={`flex ${uid === msg.uid ? 'justify-end' : 'justify-start'} mb-4`}>
    <div className={`max-w-[70%] w-auto  rounded-lg ${uid === msg.uid ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 '}`}>
      <div className={`text-sm  border-b-2 pb-1  p-2 pr-4 ${uid === msg.uid ? ' border-white/50' : ' border-gray-800/50'}`}>
        <strong>{userName}</strong>
      </div>
      <div className="text-sm  p-2 pr-4">
        {msg.text}
      </div>
      <div className={`text-xs mb-2 pr-4  text-right ${uid === msg.uid ? ' text-white/60' : ' text-gray-500'}`}>
        {/* {new Date(timestamp).toLocaleTimeString()} */}Date
      </div>
    </div>
  </div>)
};

export default Message;