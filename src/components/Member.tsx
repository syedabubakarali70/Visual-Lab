import { UserAuth } from "@/app/context/AuthContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Switch } from "@/components/ui/switch"
import { Label } from "./ui/label";


const Member = ({ value }: { value: any }) => {
  const { user } = UserAuth();

  if (!value.isOnline) return null;
  return (
    <div className="flex justify-between">
      <div>{value.memberName}</div>
      <div className="flex gap-1 justify-start items-center">
        {value.isAdmin && (
          <div className="text-sm text-slate-500 font-semibold">Admin</div>
        )}
        {value.memberId !== user.uid && (
          <div className="text-sm text-slate-500">
            <Popover>
              <PopoverTrigger className="p-1 rounded-sm hover:bg-accent hover:text-accent-foreground">
                <DotsVerticalIcon />
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex justify-between">
                <Label htmlFor="chat">Chat</Label>
                    <Switch id="chat"/>
                </div>
                <div>Edit Code <Switch/></div>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
    </div>
  );
};

export default Member;
