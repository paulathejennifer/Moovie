import React from 'react';
import Image from 'next/image';
import Button from '../Button';
import { FaApple, FaGooglePlay, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa6';

const Footer = () => {
  return (
    <div className="bg-gray-950 text-white w-full">
      <footer className="flex flex-wrap justify-between px-6 sm:px-12 lg:px-16 py-12 gap-8">
        <div className="min-w-[200px]">
          <h1 className="text-2xl font-bold mb-4">Download Our App</h1>
          <div className="flex items-center mb-6">
            <Image 
              src={'/popcorn.jpg'}
              width={0}
              height={0}
              sizes='100vw'
              alt="Popcorn" 
              className="w-8 h-8 mr-3 rounded-full"
            />
            <span className="text-xl font-semibold">Moovie</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              text=""
              onClick={() => {}}
              variant="outlined"
              classname="flex items-center gap-3 bg-gray-800 text-white px-4 py-3 rounded-full text-sm hover:text-yellow-400"
            >
              <FaApple className="text-2xl" />
              <div>
                Download on the <span className="font-semibold">App Store</span>
              </div>
            </Button>
            <Button
              text=""
              onClick={() => {}}
              variant="outlined"
              classname="flex items-center gap-3 bg-gray-800 text-white px-4 py-3 rounded-full text-sm hover:text-yellow-400"
            >
              <FaGooglePlay className="text-2xl" />
              <div>
                Get it on <span className="font-semibold">Google Play</span>
              </div>
            </Button>
          </div>
        </div>

        <div className="min-w-[150px]">
          <h1 className="text-2xl font-bold mb-4">Navigation</h1>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-yellow-400 transition-colors cursor-pointer">Home</li>
            <li className="hover:text-yellow-400 transition-colors cursor-pointer">My List</li>
            <li className="hover:text-yellow-400 transition-colors cursor-pointer">About Us</li>
          </ul>
        </div>

        <div className="min-w-[150px]">
          <h1 className="text-2xl font-bold mb-4">Legal</h1>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-yellow-400 transition-colors cursor-pointer">General Info</li>
            <li className="hover:text-yellow-400 transition-colors cursor-pointer">Privacy Policy</li>
            <li className="hover:text-yellow-400 transition-colors cursor-pointer">Terms of Service</li>
          </ul>
        </div>

        <div className="min-w-[200px]">
          <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
          <ul className="space-y-2 text-gray-300">
            <li>support@egymovies.com</li>
            <li>Tel: +251-919232345</li>
          </ul>
          <div className="flex gap-4 mt-4">
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-yellow-400 transition-colors">
              <FaFacebookF className="text-xl" />
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-yellow-400 transition-colors">
              <FaTwitter className="text-xl" />
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-yellow-400 transition-colors">
              <FaInstagram className="text-xl" />
            </a>
          </div>
        </div>

        <div className="min-w-[200px]">
          <h1 className="text-2xl font-bold mb-4">Share Website</h1>
          <div className="flex flex-col gap-3 text-gray-300">
            <div className="flex items-center gap-3 transition-colors cursor-pointer">
              <FaFacebookF className="text-xl p-1 bg-gray-800 rounded-full" />
              Facebook
            </div>
            <div className="flex items-center gap-3 transition-colors cursor-pointer">
              <FaTwitter className="text-xl p-1 bg-gray-800 rounded-full" />
              Twitter
            </div>
            <div className="flex items-center gap-3 transition-colors cursor-pointer">
              <FaInstagram className="text-xl p-1 bg-gray-800 rounded-full" />
              Instagram
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
