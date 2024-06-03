"use client";
import React, { useState } from "react";
import { SortingAlgoList, DataStructureList } from "@/lib/TopicLists";
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
import Link from "next/link";

const TopicListNav = () => {
  const [isListOpen, setisListOpen] = useState(false);
  const handleIsListOpen = () => setisListOpen(!isListOpen);
  return (
    <nav>
      <Drawer direction="left" open={isListOpen} onRelease={handleIsListOpen}>
        <DrawerTrigger className="w-full text-md py-2">
          <ArrowRightIcon width="24" height="24" onClick={handleIsListOpen} />
        </DrawerTrigger>
        <DrawerContent className="-top-[13%] left-0 h-min-screen w-[350px] mx-4">
          <DrawerHeader>
            <DrawerTitle>Visual Lab</DrawerTitle>
          </DrawerHeader>
          {SortingAlgoList.map((algo, index) => (
            <Link href={algo.link} key={index} onClick={handleIsListOpen}>
              {" "}
              {algo.name}
            </Link>
          ))}
          {DataStructureList.map((algo, index) => (
            <Link href={algo.link} key={index} onClick={handleIsListOpen}>
              {algo.name}
            </Link>
          ))}
        </DrawerContent>
      </Drawer>
    </nav>
  );
};

export default TopicListNav;
