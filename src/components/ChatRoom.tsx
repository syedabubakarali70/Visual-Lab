"use client";
import { db } from "@/lib/firebase/clientApp";
import {
  addDoc,
  collection,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import { UserAuth } from "@/app/context/AuthContext";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
const ChatRoom = ({ roomId, open,disabled }: { roomId: string; open: boolean,disabled:boolean }) => {
  const { user } = UserAuth();
  const dummy = useRef<HTMLDivElement>(null);
  const inputRef = useRef<any>(null);
  const q = query(
    collection(db, "rooms", roomId, "RoomChat"),
    orderBy("createdAt")
  );
  const [messages, loading, error] = useCollection(q);
  const [sendMessage, setSendMessage] = useState("Enter message");

  const handleSendMessage = async () => {
    inputRef.current && (inputRef.current.value = "");
    dummy.current?.scrollIntoView({ behavior: "smooth" });
    setSendMessage("Message");
    await addDoc(collection(db, "rooms", roomId, "RoomChat"), {
      uid: user.uid,
      text: sendMessage,
      createdAt: serverTimestamp(),
      sender: user.displayName,
    });
  };

  return (
    <div
      className={`w-[95%]  h-96 mx-auto md:w-full bottom-4 md:m-0 md:h-[58%]  flex-col justify-between bg-background chatbox ${open ? "fixed md:static md:flex" : "hidden"}`}
    >
      <div
        className={`w-full h-full border rounded-md p-2 flex flex-col justify-between bg-background chatbox`}
      >
        <div className="overflow-y-scroll chatbox">
          {messages?.docs.map((message) => (
            <Message
              key={message.id}
              msg={message.data()}
              uid={user.uid}
              userName={message.data().sender}
            />
          ))}
        </div>
        <div ref={dummy}></div>
        <div className="flex w-full items-center space-x-2 pt-2">
          <Input
            type="text"
            ref={inputRef}
            placeholder={sendMessage}
            disabled={disabled}
            onChange={(e) => setSendMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <Button type="submit" onClick={handleSendMessage} disabled={disabled}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
