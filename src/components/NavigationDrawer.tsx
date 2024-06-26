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
  const handleOpen = ()=> setOpen(!open)
  return (
    <Drawer direction="top" open={open}  onRelease={handleOpen}>
      <DrawerTrigger className="cursor-pointer hover:bg-background h-12 flex justify-center items-center rounded-full">
          <HamburgerMenuIcon width="24" height="24" onClick={handleOpen}/>
      </DrawerTrigger>
      <DrawerContent className="top-0 left-0 right-0 mt-0 w-full rounded-none h-min-screen flex justify-center items-center flex-col gap-4">
            <Link href="/dsa" onClick={handleOpen}>DSA</Link>
            <Link href="/texteditor" onClick={handleOpen}>Text Editor</Link>
            <Link href="/rooms" onClick={handleOpen}>Rooms</Link>
          
      </DrawerContent>
    </Drawer>
  );
};

export default NavigationDrawer;
