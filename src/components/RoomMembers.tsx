import { useState, useEffect } from "react";
import { rdb, db } from "@/lib/firebase/clientApp";
import { ref } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { Button } from "@/components/ui/button";
import { PersonIcon } from "@radix-ui/react-icons";
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
const RoomMembers = ({ roomId }: { roomId: string }) => {
  const [roomInfo, roomLoading, roomError] = useDocument(
    doc(db, "rooms", roomId)
  );
  const [members, membersLoading, membersError] = useObjectVal(
    ref(rdb, "rooms/" + roomInfo?.data()?.codeRef + "/members")
  ) as [any, boolean, Error];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <PersonIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Room Members</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            {!membersLoading &&
              Object.entries(members).map(([key, value]: [string, any]) => (
                <div key={key} className="flex justify-between">
                  {value.isOnline && <div>{value.memberName}</div>}
                  {value.isOnline && value.isAdmin && <div key={key} className="text-sm text-slate-700 font-semibold">Admin</div>}
                </div>
              ))}
          </div>
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
};

export default RoomMembers;
