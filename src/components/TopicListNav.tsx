import React from "react";
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
import { Button } from "./ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const TopicListNav = () => {
  return (
    <nav>
      <Drawer direction="left">
        <DrawerTrigger>
          <div className="w-full text-md py-2">
            <Button variant="outline">
              <ArrowRightIcon />
            </Button>
          </div>
        </DrawerTrigger>
        <DrawerContent className="-top-[13%] left-0 h-min-screen w-[350px]">
          <DrawerHeader>
            <DrawerTitle>Visual Lab</DrawerTitle>
          </DrawerHeader>
          {SortingAlgoList.map((algo, index) => (
            <Link href={algo.link} key={index} > {algo.name}</Link>
          ))}
          {DataStructureList.map((algo, index) => (
            <Link href={algo.link} key={index}  >{algo.name}</Link>
          ))}
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </nav>
  );
};

export default TopicListNav;
