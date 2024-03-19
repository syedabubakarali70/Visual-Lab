// import Link from 'next/link'
// import React from 'react'

// const NavigationDrawer = () => {
//   return (
//     <nav className='min-h-screen w-[350px] top-0 left-0 absolute z-10 bg-slate-600 flex flex-col '>
//         <Link href="/dsa">DSA</Link>
//         <Link href="/texteditor">Text Editor</Link>
//     </nav>
//   )
// }

// export default NavigationDrawer

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
const NavigationDrawer = () => {
  return (
    <Drawer direction="left">
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent className="h-screen top-0 left-0 mt-0 w-[360px] rounded-none">
        <DrawerHeader>
        <DrawerClose asChild>
        {/* <Button variant="outline">
        </Button> */}
        <>
        <Link href="/dsa">DSA</Link>
          
          {/* <Link href="/texteditor">Text Editor</Link> */}
          </>
      </DrawerClose>
        </DrawerHeader>
       
      </DrawerContent>
    </Drawer>
  );
};

export default NavigationDrawer;
