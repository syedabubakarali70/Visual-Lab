"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    
    <Button
      variant="theme_button"
      size="icon"
      onClick={() => {
        theme === "light" ? setTheme("dark") : setTheme("light");
      }}
      className="cursor-pointer hover:bg-background w-12 h-12 flex justify-center items-center rounded-full"
    >
      <SunIcon className="w-6 h-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute w-6 h-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
