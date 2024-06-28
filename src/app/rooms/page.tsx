"use client";
import { db } from "@/lib/firebase/clientApp";
import { UserAuth } from "@/app/context/AuthContext";
import CreateRoomModal from "@/components/CreateRoomModal";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import RoomListItem from "@/components/RoomListItem";
const Page = () => {
  const { user, signInWithGoogle } = UserAuth();
  const q = query(collection(db, "rooms"),orderBy("createdAt","desc"));
  const [rooms, loading, error] = useCollection(q);
  
  if(!user){
      return <Button onClick={signInWithGoogle}>Sign In</Button>
  }
  
  return (
    <section className="container flex justify-center items-center flex-col">
      <h1 className="text-4xl font-bold pb-3">Study Rooms</h1>
      <div className="flex w-full items-center space-x-2">
        <Input type="email" placeholder="Search Room" />
        <CreateRoomModal />
      </div>
      {rooms?.docs.map((room) => <RoomListItem room={room}/>)}
    </section>
  );
};

export default Page;
