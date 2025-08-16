import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, Building, Hammer } from "lucide-react";
import bgSvg from "../assets/bg.svg";

const WhatWeDo = () => {
  return (
    <div
      className="min-h-screen py-16 relative"
      style={{
        backgroundImage: `url(${bgSvg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-white/20"></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Who are we Section */}
        <motion.section
          className="mb-16 text-left"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h6
            className="text-2xl font-bold text-left text-blue-800 mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Who are we?
          </motion.h6>
          <motion.h2
            className="text-4xl font-bold text-left text-blue-800 mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Turn Visions into Solid Structures
          </motion.h2>
          <motion.div
            className="text-gray-700 leading-relaxed space-y-4 lg:text-lg"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p>
              Broberg Consult Limited is a trusted Ghana-based engineering consultancy, delivering world-class project management, civil, and structural engineering services since 2008. We work with both public and private sectors to bring projects to life, from concept to completion, without compromising on quality or innovation.
            </p>
          </motion.div>
        </motion.section>

        {/* Mission and Objectives */}
        <motion.section
          className="mb-16 text-center "
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className=" text-black py-12 px-8 rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 text-[#3A619C]">MISSION AND OBJECTIVES</h2>
            <p className="text-lg leading-relaxed max-w-4xl mx-auto text-gray-700">
              "Broberg is branching out to clients who wish to access a high
              level of services offered to the competitive and demanding
              Ghanaian market with international standard."
            </p>
          </motion.div>
        </motion.section>


      </div>
    </div>
  );
};

export default WhatWeDo;
