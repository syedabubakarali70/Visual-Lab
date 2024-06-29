"use client";
import { UserAuth } from "@/app/context/AuthContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Switch } from "@/components/ui/switch";
import { Label } from "./ui/label";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ref, set } from "firebase/database";
import { rdb } from "@/lib/firebase/clientApp";

const Member = ({
  value,
  isUserAdmin,
  roomId,
}: {
  value: any;
  isUserAdmin: boolean;
  roomId: string;
}) => {
  const { user } = UserAuth();

  const [isAdmin, setIsAdmin] = useState(value.isAdmin);
  const [canChat, setCanChat] = useState(value.canChat);
  const [canCode, setCanCode] = useState(value.canCode);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const submitChanges = () => {
    if (isAdmin !== value.isAdmin) {

      set(
        ref(rdb, "rooms/" + roomId + "/members/" + value.memberId  + "/isAdmin"),
        isAdmin
      )
    }
    if (canChat !== value.canChat) {
      set(
        ref(rdb, "rooms/" + roomId + "/members/" + value.memberId  + "/canChat"),
        canChat
      );
    }
    if (canCode !== value.canCode) {
      set(
        ref(rdb, "rooms/" + roomId + "/members/" + value.memberId  + "/canCode"),
        canCode
      );
    }
    setButtonDisabled(true);
  };

  if (!value.isOnline) return null;
  return (
    <div className="flex justify-between">
      <div
        className={`border-l-4 pl-2 ${
          user.uid === value.memberId ? "" : "border-transparent"
        }`}
      >
        {value.memberName}
      </div>
      <div className="flex gap-1 justify-start items-center">
        {value.isAdmin && (
          <div className="text-sm text-slate-500 font-semibold">Admin</div>
        )}
        <div className="text-sm text-slate-500">
          <Popover modal={true}>
            <PopoverTrigger className="p-1 rounded-sm hover:bg-accent hover:text-accent-foreground">
              <DotsVerticalIcon />
            </PopoverTrigger>
            <PopoverContent className="flex flex-col justify-between gap-2">
              <div className="flex justify-between">
                <Label htmlFor="chat">Chat</Label>
                <Switch
                  id="chat"
                  defaultChecked={canChat}
                  onCheckedChange={(value) => {
                    setCanChat(value);
                    buttonDisabled && setButtonDisabled(false);
                  }}
                  disabled={!isUserAdmin || user.uid == value.memberId ||isAdmin}
                />
              </div>
              <div className="flex justify-between">
                <Label htmlFor="code">Edit Code</Label>
                <Switch
                  id="code"
                  defaultChecked={canCode}
                  disabled={!isUserAdmin || user.uid == value.memberId|| isAdmin}
                  onCheckedChange={(value) => {
                    setCanCode(value);
                    buttonDisabled && setButtonDisabled(false);
                  }}
                />
              </div>
              {isUserAdmin && (
                <div className="flex justify-between">
                  <Label htmlFor="admin">Admin</Label>
                  <Switch
                    id="admin"
                    defaultChecked={isAdmin}
                    disabled={!isUserAdmin || user.uid == value.memberId}
                    onCheckedChange={(value) => {
                      setIsAdmin(value);
                      buttonDisabled && setButtonDisabled(false);
                    }}
                  />
                </div>
              )}
              <div className="flex justify-end">
                <Button disabled={buttonDisabled} onClick={submitChanges}>
                  Apply
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Member;
