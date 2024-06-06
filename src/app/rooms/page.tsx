"use client";
import { db } from "@/lib/firebase/clientApp";
import { UserAuth } from "@/app/context/AuthContext";
import CreateRoomModal from "@/components/CreateRoomModal";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import Link from "next/link";
const Page = () => {
  const { user, signInWithGoogle } = UserAuth();
  const [rooms, loading, error] = useCollection(collection(db, "rooms"));
  console.log(rooms);
  // if(!user){
  //     return <Button onClick={signInWithGoogle}>Sign In</Button>
  // }
  return (
    <section className="mx-auto w-[90%] flex justify-center items-center flex-col">
      <h1>Rooms</h1>
      <div className="flex w-full items-center space-x-2">
        <Input type="email" placeholder="Search Room" />
        <CreateRoomModal />
      </div>
      {rooms?.docs.map((room) => {
        return (
          <Link href={`/rooms/${room.id}`} key={room.id} className="border-2 rounded-md px-2 py-2 my-2 w-full">
            {room.data().roomName}
          </Link>
        );
      })}
    </section>
  );
};

export default Page;
