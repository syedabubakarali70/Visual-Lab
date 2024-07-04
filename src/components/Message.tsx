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
  return (
    <div
      className={`flex ${
        uid === msg.uid ? "justify-end" : "justify-start"
      } mb-4`}
    >
      <div
        className={`max-w-[70%] w-auto  rounded-lg ${
          uid === msg.uid
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-800 "
        }`}
      >
        <div
          className={`text-sm  border-b-2 pb-1  p-2 pr-4 ${
            uid === msg.uid ? " border-white/50" : " border-gray-800/50"
          }`}
        >
          <strong>{userName}</strong>
        </div>
        <div className="text-sm  p-2 pr-4">{msg.text}</div>
        <div
          className={`text-xs mb-2 pr-4  text-right ${
            uid === msg.uid ? " text-white/60" : " text-gray-500"
          }`}
        >
          {msg?.createdAt?.toDate()?.getHours() < 10
            ? "0" + msg?.createdAt?.toDate()?.getHours()
            : msg?.createdAt?.toDate()?.getHours()}
          :
          {msg?.createdAt?.toDate()?.getMinutes() < 10
            ? "0" + msg?.createdAt?.toDate()?.getMinutes()
            : msg?.createdAt?.toDate()?.getMinutes()}
        </div>
      </div>
    </div>
  );
};

export default Message;
