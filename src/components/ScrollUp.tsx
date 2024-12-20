"use client";
import React, { useState, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa";

const ScrollUp: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    isVisible && (
      <div
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-black dark:bg-white dark:text-black text-white  p-3 rounded-full cursor-pointer shadow-lg transition-opacity hover:opacity-80"
        title="Scroll to Top"
      >
        <FaChevronUp className="text-xl" />
      </div>
    )
  );
};

export default ScrollUp;
