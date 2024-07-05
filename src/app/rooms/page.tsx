"use client";
import { db } from "@/lib/firebase/clientApp";
import { UserAuth } from "@/app/context/AuthContext";
import CreateRoomModal from "@/components/CreateRoomModal";
import { Input } from "@/components/ui/input";
import { use, useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import RoomListItem from "@/components/RoomListItem";
import Spinner from "@/components/ui/spinner";
const Page = () => {
  const { user, signInWithGoogle } = UserAuth();
  const q = query(collection(db, "rooms"), orderBy("createdAt", "desc"));
  const [rooms, loading, error] = useCollection(q);
  const [roomsArray, setRoomsArray] = useState<any>([]);

  useEffect(() => {
    if (rooms) {
      setRoomsArray(
        rooms.docs.map((room) => (room))
      );
    }
  }, [rooms,user]);

  if (!user) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center h-[60svh]">
        <span className="text-2xl font-bold">Please sign in to view rooms</span>
        <Button onClick={signInWithGoogle}>Sign In</Button>
      </div>
    );
  }

  return (
    <section className="container flex justify-center items-center flex-col">
      <h1 className="text-4xl font-bold pb-3">Study Rooms</h1>
      <div className="flex w-full items-center space-x-2">
        <Input type="email" placeholder="Search Room" />
        <CreateRoomModal />
      </div>
      {/* {rooms?.docs.map((room) => (
        <RoomListItem key={room.data().codeRef} room={room} />
      ))} */}
      {loading && <div className="flex justify-center items-center w-full h-[40vh]"><Spinner /></div>}
      {roomsArray?.map((room:any) => (
        <RoomListItem key={room.data().codeRef} room={room} />
      ))}
    </section>
  );
};

export default Page;
