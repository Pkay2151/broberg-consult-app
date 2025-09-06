import { FaWhatsapp, FaInstagram, FaLinkedin } from "react-icons/fa";
import React from "react";
import { Link } from 'react-router-dom';

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
              <span className="text-gray-300">(+233)24 431 4140</span>
            </div>
            <div>
              Email:{" "}
              <span className="text-gray-300">
                c.bergmann.broberg@gmail.com
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
              <Link to="/" className="hover:text-blue-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/projects" className="hover:text-blue-400">
                Projects
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-400">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-400">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-blue-400">
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className=" flex flex-row text-center text-xs text-gray-400 mt-8 justify-around ">
        <span> © 2025 BROBERG CONSULT LTD. All rights reserved</span>
       
      
      <div className="flex justify-center gap-10">
         <Link to="https://wa.me/233244314140" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp size={24} className="text-green-500 hover:text-green-400" />
            </Link>
            <Link to="https://https://www.linkedin.com/in/christiane-bergmann-32408856/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={24} className="text-blue-500 hover:text-blue-400" />
            </Link>
{/*             <Link to="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={24} className="text-pink-500 hover:text-pink-400" />
            </Link> */}
      </div>
      </div>
    </footer>
  );
}
