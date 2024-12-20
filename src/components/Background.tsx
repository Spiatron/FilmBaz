"use client";
import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion for animation

const Background = () => {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        backgroundColor: "#1a202c", // You can customize this color
      }}
    />
  );
};

export default Background;
