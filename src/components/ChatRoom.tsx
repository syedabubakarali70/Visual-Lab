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
  useCollectionData,
} from "react-firebase-hooks/firestore";
import Message from "./Message";
import { UserAuth } from "@/app/context/AuthContext";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
const ChatRoom = ({ roomId }: { roomId: string }) => {
  const { user } = UserAuth();
  const dummy = useRef<HTMLDivElement>(null);
  const q = query(
    collection(db, "rooms", roomId, "RoomChat"),
    orderBy("createdAt")
  );
  const [messages, loading, error] = useCollection(q);
  const [sendMessage, setSendMessage] = useState("Enter message");
  console.log(messages);

  const handleSendMessage = async () => {
    await addDoc(collection(db, "rooms", roomId, "RoomChat"), {
      uid: user.uid,
      text: sendMessage,
      createdAt: serverTimestamp(),
    });
    setSendMessage("");
    dummy.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-[40%] fixed bottom-4 right-4 h-96 border-2 rounded-md p-2 flex flex-col justify-between">
      <div className="relative">
        {messages?.docs.map((message) => (
          <Message key={message.id} msg={message.data()} uid={user.uid} />
        ))}
      </div>
      <div ref={dummy}></div>
      <div className="flex w-full items-center space-x-2">
        <Input
          type="text"
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
