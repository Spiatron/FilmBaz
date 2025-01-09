"use client";
import React from "react";
import { Menubar } from "@/components/ui/menubar";
import { ModeToggle } from "@/components/ModeToggle";
import { motion } from "framer-motion"; // Import framer-motion for animation

function Navbar() {
  const reloadPage = () => {
    window.location.reload(); // Reloads the current page
  };

  return (
    <Menubar className="sticky top-0 z-50 py-8 shadow-lg">
      <div className="flex items-center justify-between w-full px-4">
        {/* Brand Name */}
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          onClick={reloadPage} // Calls reloadPage function on click
          whileTap={{ scale: 0.95 }} // Slight shrink on tap
          transition={{ duration: 0.3 }}
        >
          <motion.h1
            className="text-5xl font-bold dark:text-gray-300 tracking-wide" style={{fontFamily:"khadash_eng"}}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            Film<span style={{fontFamily:"khadash"}}>باز</span>
          </motion.h1>
        </motion.div>

        {/* Mode Toggle */}
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <ModeToggle />
        </motion.div>
      </div>
    </Menubar>
  );
}

export default Navbar;
