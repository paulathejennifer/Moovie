'use client';
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

interface Props {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() !== '') {
      onSearch(query);
    }
  };

  return (
    <div>
      <form className="relative" onSubmit={handleSubmit}>
        <FiSearch className="absolute top-2 left-3 text-yellow-400" />
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="relative border border-yellow-400 rounded-2xl w-60 sm:w-80 px-11 py-1.5 focus:outline-yellow-400 text-white bg-gray-800 placeholder-yellow-300"
        />
      </form>
    </div>
  );
};

export default SearchBar;
