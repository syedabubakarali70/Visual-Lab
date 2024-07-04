"use client";
import { rdb } from "@/lib/firebase/clientApp";
import { ref } from "firebase/database";
import Link from "next/link";
import React, { useEffect } from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";
import { UserAuth } from "@/app/context/AuthContext";
import { DotsHorizontalIcon, TrashIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const RoomListItem = ({ room }: { room: any }) => {
  const { user } = UserAuth();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [members, membersLoading, membersError] = useObjectVal(
    ref(rdb, "rooms/" + room.data().codeRef + "/members")
  ) as [any, boolean, Error];
  const [joined, setJoined] = React.useState(0);
  const [password, setPassword] = React.useState(``);
  const router = useRouter();
  useEffect(() => {
    setJoined(0);
    for (let member in members) {
      console.log(members[member]);
      if (members[member].isOnline) {
        setJoined((prev) => prev + 1);
      }
    }
    console.log(joined);
  }, [members]);
  const checkPassword = () => {
    if (password === room.data().password) {
      router.push(`/rooms/${room.id}`);
    } else {
      console.log("password incorrect");
    }
  };
  if (room.data().public === true) {
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
          {room.data().createdAt && (
            <div>
              <div className="text-sm text-secondary-foreground">
                Created At:
              </div>

              <div className="text-sm text-secondary-foreground flex justify-end">
                {room.data().createdAt?.toDate().getDate() < 10
                  ? "0" + room.data().createdAt?.toDate().getDate()
                  : room.data().createdAt?.toDate().getDate()}
                &nbsp;
                {months[room.data().createdAt.toDate().getMonth()]},
                {room.data().createdAt.toDate().getFullYear()}
              </div>
              <div className="text-sm text-secondary-foreground flex justify-end">
                {room.data().createdAt.toDate().getHours() < 10
                  ? "0" + room.data().createdAt.toDate().getHours()
                  : room.data().createdAt.toDate().getHours()}
                :
                {room.data().createdAt.toDate().getMinutes() < 10
                  ? "0" + room.data().createdAt.toDate().getMinutes()
                  : room.data().createdAt.toDate().getMinutes()}
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center mt-4">
          <div className="flex items-center gap-2 text-warning">
            <span className="text-sm">{joined} Joined</span>
          </div>
          <button className="ml-auto bg-secondary rounded-full px-4 py-2">
            {room.data().public === true ? "Public" : "Private"}
          </button>
        </div>
      </Link>
    );
  } else {
    return (
      <Dialog>
        <DialogTrigger
          className="block bg-secondary/50 rounded-lg p-4 my-2 w-full"
          key={room.id}
        >
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center space-x-2">
                <div className="bg-secondary rounded-full w-10 h-10 flex items-center justify-center border-2 text-left">
                  <span>{room.data().hostName[0]}</span>
                </div>
                <div>{room.data().hostName}</div>
              </div>
              <div className="text-xl font-semibold mt-2">
                {room.data().roomName}
              </div>
            </div>
            {room.data().createdAt && (
              <div className="flex flex-col items-end">
                {user.uid === room.data().hostId && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        className="p-1 h-auto"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <DotsHorizontalIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto ">
                      <Button variant="destructive" className="flex- gap-2">
                      <TrashIcon className=""/> 
                      <span>Delete room</span>
                      </Button>
                    </PopoverContent>
                  </Popover>
                )}
                <div className="text-sm text-secondary-foreground">
                  Created At:
                </div>

                <div className="text-sm text-secondary-foreground flex justify-end">
                  {room.data().createdAt?.toDate().getDate() < 10
                    ? "0" + room.data().createdAt?.toDate().getDate()
                    : room.data().createdAt?.toDate().getDate()}
                  &nbsp;
                  {months[room.data().createdAt.toDate().getMonth()]},
                  {room.data().createdAt.toDate().getFullYear()}
                </div>
                <div className="text-sm text-secondary-foreground flex justify-end">
                  {room.data().createdAt.toDate().getHours() < 10
                    ? "0" + room.data().createdAt.toDate().getHours()
                    : room.data().createdAt.toDate().getHours()}
                  :
                  {room.data().createdAt.toDate().getMinutes() < 10
                    ? "0" + room.data().createdAt.toDate().getMinutes()
                    : room.data().createdAt.toDate().getMinutes()}
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center mt-4">
            <div className="flex items-center gap-2 text-warning">
              <span className="text-sm">{joined} Joined</span>
            </div>
            <button className="ml-auto bg-secondary rounded-full px-4 py-2">
              {room.data().public === true ? "Public" : "Private"}
            </button>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Password</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="link"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </div>
            <Button
              type="submit"
              className="px-3 self-end"
              onClick={checkPassword}
            >
              <span>Enter</span>
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
};

export default RoomListItem;
