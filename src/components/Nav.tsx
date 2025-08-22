// components/Navbar.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <motion.nav
      className="w-full flex items-center justify-between px-6 py-4 bg-black/20 backdrop-blur-md relative z-20 border-b border-white/10"
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
        className={`flex-col md:flex-row md:flex space-y-6 md:space-y-0  md:space-x-6 absolute md:static top-full right-0 left-0 md:left-auto md:bg-transparent md:backdrop-blur-0 px-6 text-center md:px-0 py-6 md:py-0 transition-all duration-300 ease-in-out ${
          menuOpen ? "flex-col  bg-black/70 md:bg-transparent backdrop-blur-md md:backdrop-blur-0" : "hidden md:flex"
        }`}
      >
      <Link to="/home" className="block font-medium text-white transition hover:text-blue-400" onClick={() => setMenuOpen(false)}>Home</Link>
      <Link to="/projects" className="block font-medium text-white transition hover:text-blue-400" onClick={() => setMenuOpen(false)}>Projects</Link>
      <Link to="/about" className="block font-medium text-white transition hover:text-blue-400" onClick={() => setMenuOpen(false)}>About Us</Link>
      <Link to="/contact" className="block font-medium text-white transition hover:text-blue-400" onClick={() => setMenuOpen(false)}>Contact Us</Link>  
      </ul>
    </motion.nav>
  );
}
