import React from "react";

const Message = ({ msg, uid }: { msg: any; uid: string }) => {
  if (uid === msg.uid) {
    //sent
    return (
      <div className="flex flex-row-reverse">
        <div className="bg-secondary max-w-[70%] px-3 py-2 rounded-lg my-2  right-0">
          {msg.text}
        </div>
      </div>
    );
  } else {
    //received
    return <div className="flex">
    <div className="bg-blue-700 max-w-[70%] px-3 py-2 rounded-lg my-2  right-0">
      {msg.text}
    </div>
  </div>;
  }
};

export default Message;
