"use client";
import * as React from "react";
import { FaSun, FaMoon, FaRegSun } from "react-icons/fa"; // Importing React Icons for sun, moon, and system
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="">
          {/* Display the corresponding icon based on the current theme */}
          {theme === "dark" ? (
            <FaMoon className="h-[1.2rem] w-[1.2rem]" style={{color:"#7209b7"}} />
          ) : theme === "light" ? (
            <FaSun className="h-[1.2rem] w-[1.2rem]  text-yellow-500"  />
          ) : (
            <FaRegSun className="h-[1.2rem] w-[1.2rem] text-gray-500" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")} >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
