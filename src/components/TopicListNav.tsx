"use client";
import React, { useState } from "react";
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
import { ArrowRightIcon } from "@radix-ui/react-icons";
import TopicList from "./TopicList";

const TopicListNav = () => {
  const [isListOpen, setisListOpen] = useState(false);
  const handleIsListOpen = () => setisListOpen(!isListOpen);
  return (
    <nav>
      <Drawer direction="left" open={isListOpen} onRelease={handleIsListOpen}>
        <DrawerTrigger className="w-full text-md py-2">
          <ArrowRightIcon width="24" height="24" onClick={handleIsListOpen} />
        </DrawerTrigger>
        <DrawerContent className="-top-[13%] left-0 h-min-screen w-[350px] px-2">
          <DrawerHeader>
            <DrawerTitle>Visual Lab</DrawerTitle>
          </DrawerHeader>
          <TopicList onSelection={handleIsListOpen}/>
        </DrawerContent>
      </Drawer>
    </nav>
  );
};

export default TopicListNav;
