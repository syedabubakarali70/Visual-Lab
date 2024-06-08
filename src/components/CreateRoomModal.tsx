import { db,rdb } from "@/lib/firebase/clientApp";
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
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { child, push, ref, update } from "firebase/database";

export default function CreateRoomModal() {
  const { user } = UserAuth();
  const [isPublic, setIsPublic] = useState(true);
  const [roomName, setRoomName] = useState("Enter Room Name");
  const handleCreateRoom = async () => {
    const newRoomKey = push(child(ref(rdb), 'chats')).key;
    const updates: { [key: string]: any } = {};
    updates["/codes/"+ newRoomKey] = {
      code: "",
    };
    const RoomRef = await addDoc(collection(db, "rooms"), {
      hostId: user.uid,
      hostName: user.displayName,
      public: isPublic,
      roomName,
      codeRef: newRoomKey,
      });
    return update(ref(rdb), updates)
}
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Room</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Room</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex  space-x-2 flex-col">
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
          <Button onClick={handleCreateRoom}>Create Room</Button>
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