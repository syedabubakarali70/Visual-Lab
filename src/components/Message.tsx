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
  if (uid === msg.uid) {
    //sent
    return (
      <div className="flex flex-row-reverse items-start">
        <div className="rounded-full bg-secondary p-2 w-8 h-8 flex justify-center items-center ml-1 mt-2">
          {userName[0]}
        </div>
        <div className="bg-secondary max-w-[70%] px-3 py-2 rounded-lg my-1">
          {msg.text}
        </div>
      </div>
    );
  } else {
    //received
    return (
      <div className="flex">
        <div className="rounded-full bg-blue-700 p-2 w-8 h-8 flex justify-center items-center ml-1 mt-2">
          {userName[0]}
        </div>
        <div className="bg-blue-700 max-w-[70%] px-3 py-2 rounded-lg my-1">
          {msg.text}
        </div>
      </div>
    );
  }
};

export default Message;
