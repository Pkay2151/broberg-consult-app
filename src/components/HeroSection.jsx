import React, { useEffect, useState } from "react";
import Navbar from "./Nav";
import P1 from "../src/assets/project1.svg";
import P2 from "../src/assets/project2.svg";
import P3 from "../src/assets/project3.svg";
import P4 from "../src/assets/project4.svg";


const images = [
  P1,
  P2,
  P3,
  P4,
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative min-h-screen flex flex-col bg-cover bg-center transition-all duration-700"
      style={{ backgroundImage: `url('${images[current]}')` }}
    >
      {/* Transparent Navbar at the top */}
      <div className="absolute top-0 left-0 w-full z-30 fixed">
        <Navbar />
      </div>

      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/40 z-0 transition-all duration-700" />
      {/* Hero Content */}
      <div className="relative flex flex-1 flex-col items-center justify-center text-center px-4 z-10 min-h-[70vh] pt-20">
        <h1 className="text-white font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 drop-shadow-lg leading-tight max-w-3xl mx-auto">
          You are asked for the best.
          <br />
          Here we are.
          <br />
          <span className="font-bold">
            We offer Professional consultancy services in
            <br />
            Project Management, Civil
            <br />
            and Structural Engineering
          </span>
        </h1>
        <a
          href="/projects"
          className="inline-block mt-6 px-8 py-3 bg-[#3A619C] hover:bg-blue-800 text-white font-semibold rounded-full text-lg shadow-lg transition"
        >
          See our Projects
        </a>
      </div>
      {/* Optional: Dots for navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-200 ${
              current === idx ? "bg-[#3A619C] blue-500" : "bg-white/50"
            }`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
