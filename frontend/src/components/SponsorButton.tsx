"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"; // Import ShadCN Button
import { FcLike } from "react-icons/fc";

const SponsorButton: React.FC = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        asChild
        variant="default"
      >
        <a
          href="https://www.patreon.com/Spiatron"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-pink-500"><FcLike /></span>
          Sponsor
        </a>
      </Button>
    </motion.div>
  );
};

export default SponsorButton;
