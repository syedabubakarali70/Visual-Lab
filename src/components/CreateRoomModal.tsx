import { db, rdb } from "@/lib/firebase/clientApp";
import { UserAuth } from "@/app/context/AuthContext";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { child, push, ref, set, update } from "firebase/database";
import { useRouter } from "next/navigation";
import Spinner from "./ui/spinner";

export default function CreateRoomModal() {
  const { user } = UserAuth();
  const router = useRouter();
  const [isPublic, setIsPublic] = useState(true);
  const [roomName, setRoomName] = useState("Enter Room Name");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const handleCreateRoom = async () => {
    setLoading(true);
    const newRoomKey = push(child(ref(rdb), "rooms")).key;
    const roomData = {
      code: "",
      hostId: user.uid,
      hostName: user.displayName,
      typing:"",
    };

    // First update: Create the room
    const roomUpdates: { [key: string]: any } = {};
    roomUpdates["/rooms/" + newRoomKey] = roomData;
    const firestoreRoomData={
      hostId: user.uid,
      hostName: user.displayName,
      public: isPublic,
      roomName,
      createdAt: serverTimestamp(),
      codeRef: newRoomKey,
      ...(isPublic===false && {password})
    }
    const RoomRef = await addDoc(collection(db, "rooms"),firestoreRoomData );
    return update(ref(rdb), roomUpdates)
      .then(() => {
        // Second update: Add the member
        const memberData = {
          memberId: user.uid,
          memberName: user.displayName,
          isAdmin: true,
          isOnline:true
        };
        const memberUpdates: { [key: string]: any } = {};
        memberUpdates["/rooms/" + newRoomKey + "/members/" + user.uid] =
          memberData;
        update(ref(rdb), memberUpdates)
          .then(() => {
            console.log("Room and member added successfully");

            setLoading(false);
            router.push(`/rooms/${RoomRef.id}`);
          })
          .catch((error) => {
            console.error("Error adding member: ", error);
          });
      })
      .catch((error) => {
        console.error("Error creating room: ", error);
      });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Create Room</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Room</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex  space-x-2 gap-2 flex-col">
          <div className="flex gap-2 flex-col my-2">
            <Label htmlFor="link">Room Name</Label>
            <Input
              id="link"
              defaultValue="Enter Room Name"
              onChange={(e) => setRoomName(e.target.value)}
            />
          </div>
          <RadioGroup
            defaultValue="public"
            onValueChange={(value) =>
              setIsPublic(value === "public" ? true : false)
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="public" id="r1" />
              <Label htmlFor="r1">Public</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="private" id="r2" />
              <Label htmlFor="r2">Private</Label>
            </div>
          </RadioGroup>
          {!isPublic && (
            <div className="flex gap-2 flex-col my-2">
            <Label htmlFor="link">Password</Label>
            <Input
              id="link"
              defaultValue="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          )}
          <Button onClick={handleCreateRoom}>
            {loading ? <Spinner /> : "Create Room"}
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