"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";  // Add a search icon

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <div className="relative"  style={{fontFamily:"kufi"}}>
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Enter a movie title"
        className="w-full p-6 pl-16 text-3xl border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-800 placeholder:text-gray-400 transition-all duration-300"
      />
      {/* Search Icon */}
      <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-white" />
    </div>
  );
};

export default SearchInput;
