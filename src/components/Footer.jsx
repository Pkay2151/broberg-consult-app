import { FaWhatsapp, FaInstagram, FaLinkedin } from "react-icons/fa";

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-8 pb-4 px-4 md:px-12  w-full ">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-8">
        {/* Left: Logo and Contact */}
        <div className="flex-1 min-w-[220px] mb-6 md:mb-0">
          <div className="mb-2">
            <span className="text-blue-500 font-bold text-xl">BROBERG</span>
            <span className="text-white font-semibold text-lg block">
              CONSULT LTD
            </span>
          </div>
          <div className="text-sm leading-relaxed">
            <div>
              Telephone:{" "}
              <span className="text-gray-300">(+233) 244-141410</span>
            </div>
            <div>
              Email:{" "}
              <span className="text-gray-300">
                ebenezer.n.broberg@gmail.com
              </span>
            </div>
            <div>Location: Accra, Adabraka</div>
            <div>House No. 7 Behind Adabraka Police Station.</div>
          </div>
        </div>
        {/* Center: Navigation */}
        <div className="flex-1 flex flex-col items-center md:items-center">
          <ul className="flex flex-col md:flex-row gap-2 md:gap-8 font-medium">
            <li>
              <a href="/" className="hover:text-blue-400">
                Home
              </a>
            </li>
            <li>
              <a href="/projects" className="hover:text-blue-400">
                Projects
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-blue-400">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-blue-400">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-blue-400">
                Admin
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className=" flex flex-row text-center text-xs text-gray-400 mt-8 justify-around ">
        <span> © 2025 BROBERG CONSULT LTD. All rights reserved</span>
       
      
      <div className="flex justify-center gap-10">
         <a href="https://wa.me/233244141410" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp size={24} className="text-green-500 hover:text-green-400" />
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={24} className="text-blue-500 hover:text-blue-400" />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={24} className="text-pink-500 hover:text-pink-400" />
            </a>
      </div>
      </div>
    </footer>
  );
}
