import React from "react";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="border-t  transition-all duration-300">
      <div className="container mx-auto px-6 py-4 text-center">
        <p className="text-sm ">
        Crafted by Ahsan Hafeez AKA Spiatron – Bringing ideas to life!, 2024
        </p>
        <div className="mt-2 flex justify-center space-x-4">
          {/* Social media icons with links */}
          <Link
            href="https://github.com/Spiatron"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </Link>
          <Link
            href="https://www.linkedin.com/in/ahsan-hafeez-116943278/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
