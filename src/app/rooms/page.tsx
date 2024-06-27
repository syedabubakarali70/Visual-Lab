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
const Page = () => {
  const { user, signInWithGoogle } = UserAuth();
  const q = query(collection(db, "rooms"),orderBy("createdAt","desc"));
  const [rooms, loading, error] = useCollection(q);
  
  if(!user){
      return <Button onClick={signInWithGoogle}>Sign In</Button>
  }
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  return (
    <section className="container flex justify-center items-center flex-col">
      <h1 className="text-4xl font-bold pb-3">Study Rooms</h1>
      <div className="flex w-full items-center space-x-2">
        <Input type="email" placeholder="Search Room" />
        <CreateRoomModal />
      </div>
      {rooms?.docs.map((room) => {
        return (
          <Link
            href={`/rooms/${room.id}`}
            key={room.id}
            className="block bg-secondary/50 rounded-lg p-4 my-2 w-full"
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center space-x-2">
                  <div className="bg-secondary rounded-full w-10 h-10 flex items-center justify-center border-2">
                    <span>{room.data().hostName[0]}</span>
                  </div>
                  <div>{room.data().hostName}</div>
                </div>
                <div className="text-xl font-semibold mt-2">
                  {room.data().roomName}
                </div>
              </div>
              {room.data().createdAt &&
              <div>
                <div className="text-sm text-secondary-foreground">Created At:</div>

                <div className="text-sm text-secondary-foreground flex justify-end">
                  {room.data().createdAt?.toDate().getDate()<10 ? "0"+room.data().createdAt?.toDate().getDate():room.data().createdAt?.toDate().getDate()}&nbsp;
                  {months[room.data().createdAt.toDate().getMonth()]}, 
                  {room.data().createdAt.toDate().getFullYear()}
                </div>
                <div className="text-sm text-secondary-foreground flex justify-end">
                  {room.data().createdAt.toDate().getHours()<10 ? "0"+room.data().createdAt.toDate().getHours():room.data().createdAt.toDate().getHours()}:
                  {room.data().createdAt.toDate().getMinutes()<10 ? "0"+room.data().createdAt.toDate().getMinutes():room.data().createdAt.toDate().getMinutes()}
                </div>
              </div>
      }
            </div>
            <div className="flex items-center mt-4">
              <div className="flex items-center gap-2 text-warning">
                {/* <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" fill="bg-primary" height="24" viewBox="0 0 32 32">
          <path d="M30.539 20.766c-2.69-1.547-5.75-2.427-8.92-2.662 0.649 0.291 1.303 0.575 1.918 0.928 0.715 0.412 1.288 1.005 1.71 1.694 1.507 0.419 2.956 1.003 4.298 1.774 0.281 0.162 0.456 0.487 0.456 0.85v4.65h-4v2h5c0.553 0 1-0.447 1-1v-5.65c0-1.077-0.56-2.067-1.461-2.584z" fill="bg-primary"></path>
          <path d="M22.539 20.766c-6.295-3.619-14.783-3.619-21.078 0-0.901 0.519-1.461 1.508-1.461 2.584v5.65c0 0.553 0.447 1 1 1h22c0.553 0 1-0.447 1-1v-5.651c0-1.075-0.56-2.064-1.461-2.583zM22 28h-20v-4.65c0-0.362 0.175-0.688 0.457-0.85 5.691-3.271 13.394-3.271 19.086 0 0.282 0.162 0.457 0.487 0.457 0.849v4.651z" fill="bg-primary"></path>
          <path d="M19.502 4.047c0.166-0.017 0.33-0.047 0.498-0.047 2.757 0 5 2.243 5 5s-2.243 5-5 5c-0.168 0-0.332-0.030-0.498-0.047-0.424 0.641-0.944 1.204-1.513 1.716 0.651 0.201 1.323 0.331 2.011 0.331 3.859 0 7-3.141 7-7s-3.141-7-7-7c-0.688 0-1.36 0.131-2.011 0.331 0.57 0.512 1.089 1.075 1.513 1.716z"></path>
          <path d="M12 16c3.859 0 7-3.141 7-7s-3.141-7-7-7c-3.859 0-7 3.141-7 7s3.141 7 7 7zM12 4c2.757 0 5 2.243 5 5s-2.243 5-5 5-5-2.243-5-5c0-2.757 2.243-5 5-5z"></path>
        </svg> */}
                0 Joined
              </div>
              <button className="ml-auto bg-secondary rounded-full px-4 py-2">
                {room.data().public === true ? "Public" : "Private"}
              </button>
            </div>
          </Link>
        );
      })}
    </section>
  );
};

export default Page;
