// components/Navbar.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <motion.nav
      className="w-full flex items-center justify-between px-6 py-3 bg-gray-900 bg-opacity-60 shadow-md backdrop-blur-sm relative z-20"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.6,
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      {/* Logo */}
      <motion.div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => (window.location.href = "/")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <span className="text-[#3A619C] font-bold text-xl">BROBERG</span>
        <span className="text-white font-semibold text-lg">CONSULT LTD</span>
      </motion.div>
      {/* Hamburger Toggle for Mobile/Tablet */}
      <button
        className="md:hidden flex items-center justify-center text-white text-3xl focus:outline-none"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Toggle navigation menu"
      >
        {menuOpen ? (
          <span>&#10005;</span> // X icon
        ) : (
          <span>&#9776;</span> // Hamburger icon
        )}
      </button>
      {/* Navigation Links */}
      <ul
        className={`flex-col md:flex-row md:flex space-y-6 md:space-y-0 md:space-x-6 absolute md:static top-full right-0 left-0 md:left-auto bg-gray-900 bg-opacity-90 md:bg-opacity-0 backdrop-blur-sm md:backdrop-blur-0 px-6 text-center md:px-0 py-6 md:py-0 transition-all duration-300 ease-in-out ${
          menuOpen ? "flex" : "hidden md:flex"
        }`}
      >
        <li className="">
          <a
            href="/"
            className="text-white hover:text-blue-400 font-medium transition block"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="/projects"
            className="text-white hover:text-blue-400 font-medium transition block"
            onClick={() => setMenuOpen(false)}
          >
            Projects
          </a>
        </li>
        <li>
          <a
            href="/about"
            className="text-white hover:text-blue-400 font-medium transition block"
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </a>
        </li>
        <li>
          <a
            href="/contact"
            className="text-white hover:text-blue-400 font-medium transition block"
            onClick={() => setMenuOpen(false)}
          >
            Contact Us
          </a>
        </li>
      </ul>
    </motion.nav>
  );
}
