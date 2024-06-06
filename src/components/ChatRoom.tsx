"use client";
import { db } from "@/lib/firebase/clientApp";
import {
  addDoc,
  collection,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import {
  useCollection,
} from "react-firebase-hooks/firestore";
import Message from "./Message";
import { UserAuth } from "@/app/context/AuthContext";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
const ChatRoom = ({ roomId }: { roomId: string }) => {
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
    setSendMessage("");
    await addDoc(collection(db, "rooms", roomId, "RoomChat"), {
        uid: user.uid,
        text: sendMessage,
        createdAt: serverTimestamp(),
        sender: user.displayName,
    });
};

  return (
    <div className="w-full md:w-[40%] fixed bottom-4 right-4 h-96 border-2 rounded-md p-2 flex flex-col justify-between">
      <div className="overflow-y-scroll">
        {messages?.docs.map((message) => (
          <Message key={message.id} msg={message.data()} uid={user.uid} userName={message.data().sender}/>
        ))}
      </div>
      <div ref={dummy}></div>
      <div className="flex w-full items-center space-x-2 pt-2">
        <Input
          type="text"
          ref={inputRef}
          placeholder={sendMessage}
          onChange={(e) => setSendMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <Button type="submit" onClick={handleSendMessage}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatRoom;
