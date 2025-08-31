'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '../Button';
import SearchBar from '../SearchBar';
import { FaBars, FaTimes } from 'react-icons/fa';

interface Props {
  onSearch: (query: string) => void;
}

const NavBar: React.FC<Props> = ({ onSearch }) => {
  const pathName = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSignIn = () => {
    router.push('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navLinks = [
    { href: '/home', label: 'Home' },
    { href: '/favorites', label: 'Favorites' },
    { href: '/about', label: 'About Us' },
  ];

  return (
    <div className="bg-gray-950 w-full text-white">
      <nav className="flex items-center justify-between px-6 sm:px-12 lg:px-16 py-5 z-50 relative">
        <div className="flex items-center text-3xl font-extrabold">
          M<span className="text-yellow-400">oo</span>vie
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-lg font-medium text-gray-300 hover:text-yellow-400 transition-colors"
              aria-label="Toggle dropdown menu"
            >
              {/* Optional Dropdown Label/Icon */}
            </button>
            {isDropdownOpen && (
              <div className="absolute top-10 left-0 bg-gray-800 rounded-lg shadow-lg w-40 py-2 z-10">
                <Link
                  href="/genres"
                  className="block px-4 py-2 text-gray-300 hover:bg-yellow-400 hover:text-white transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Genres
                </Link>
                <Link
                  href="/trending"
                  className="block px-4 py-2 text-gray-300 hover:bg-yellow-400 hover:text-white transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Trending
                </Link>
                <Link
                  href="/contact"
                  className="block px-4 py-2 text-gray-300 hover:bg-yellow-400 hover:text-white transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Contact
                </Link>
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-lg font-medium transition-colors ${
                pathName === link.href
                  ? 'text-yellow-400 border-b-2 border-yellow-400'
                  : 'text-gray-300 hover:text-yellow-400'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <SearchBar onSearch={onSearch} />

          <Button
            text="Sign In"
            onClick={handleSignIn}
            variant="filled"
            classname="px-8 py-2 rounded-lg text-sm"
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-2xl text-yellow-400"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-gray-900 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-lg font-medium transition-colors ${
                pathName === link.href
                  ? 'text-yellow-400 border-b-2 border-yellow-400'
                  : 'text-gray-300 hover:text-yellow-400'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-lg font-medium text-gray-300 hover:text-yellow-400"
            >
              More
            </button>
            {isDropdownOpen && (
              <div className="bg-gray-800 rounded-lg shadow-lg w-full py-2 mt-2">
                <Link
                  href="/genres"
                  className="block px-4 py-2 text-gray-300 hover:bg-yellow-400 hover:text-white"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Genres
                </Link>
                <Link
                  href="/trending"
                  className="block px-4 py-2 text-gray-300 hover:bg-yellow-400 hover:text-white"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Trending
                </Link>
                <Link
                  href="/contact"
                  className="block px-4 py-2 text-gray-300 hover:bg-yellow-400 hover:text-white"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Contact
                </Link>
              </div>
            )}
          </div>
          <SearchBar onSearch={onSearch} />
          <Button
            text="Sign In"
            onClick={() => {
              handleSignIn();
              setIsMobileMenuOpen(false);
            }}
            variant="filled"
            classname="px-8 py-2 rounded-lg text-sm w-full"
          />
        </div>
      )}
    </div>
  );
};

export default NavBar;
