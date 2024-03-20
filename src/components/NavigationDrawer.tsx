'use client'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Link from "next/link";
import { Button } from "./ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useState } from "react";
const NavigationDrawer = () => {
  const [open, setOpen] = useState(false);
  return (
    <Drawer direction="top" open={open}>
      <DrawerTrigger className="cursor-pointer hover:bg-background w-12 h-12 flex justify-center items-center rounded-full">
          <HamburgerMenuIcon width="24" height="24" onClick={()=>setOpen(!open)}/>
      </DrawerTrigger>
      <DrawerContent className="top-16 left-0 right-0 mt-0 w-full rounded-none h-min">
            <Link href="/dsa" onClick={()=>setOpen(!open)}>DSA</Link>
            <Link href="/texteditor" onClick={()=>setOpen(!open)}>Text Editor</Link>
          <DrawerClose asChild>
            <Button onClick={()=>setOpen(!open)}>Close</Button>
          </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
};

export default NavigationDrawer;
