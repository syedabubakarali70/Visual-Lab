import { rdb, db } from "@/lib/firebase/clientApp";
import { ref } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { Button } from "@/components/ui/button";
import { PersonIcon } from "@radix-ui/react-icons";
import Member from "@/components/Member";

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
import { UserAuth } from "@/app/context/AuthContext";
const RoomMembers = ({ roomId }: { roomId: string }) => {
  const { user } = UserAuth();
  const [roomInfo, roomLoading, roomError] = useDocument(
    doc(db, "rooms", roomId)
  );
  const [isUserAdmin, isUserAdminLoading, isUserAdminError] = useObjectVal(
    ref(rdb, "rooms/" + roomInfo?.data()?.codeRef +"/members/"+user.uid+ "/isAdmin")
  ) as [boolean, boolean, Error];
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
                <Member key={key} value={value} isUserAdmin={isUserAdmin} roomId={roomInfo?.data()?.codeRef}/>
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
