import React from "react";
import { motion } from "framer-motion";
import AkerSolution from "../src/assets/clients/aker-solutions.svg";
import NestleGhana from "../src/assets/clients/nestle.svg";

const TopClient = () => {
  // Client data - replace with actual client logos
  const clients = [
    {
      id: 1,
      name: "AkerSolutions",
      logo: AkerSolution,
      description: "Global engineering company",
    },
    {
      id: 2,
      name: "Nestle Ghana Limited",
      logo: NestleGhana,
      description: "Food and beverage company",
    },
    {
      id: 3,
      name: "IZAKO Limited",
      logo: "/src/assets/clients/izako.svg",
      description: "Construction and engineering",
    },
    {
      id: 4,
      name: "Department of State United States of America",
      logo: "/src/assets/clients/us-state-dept.svg",
      description: "US Government Agency",
    },
    {
      id: 5,
      name: "Ghana Navy",
      logo: "/src/assets/clients/ghana-navy.svg",
      description: "Naval force of Ghana",
    },
    {
      id: 6,
      name: "LMI Holdings Limited",
      logo: "/src/assets/clients/lmi-holdings.svg",
      description: "Investment holding company",
    },
    {
      id: 7,
      name: "Valley View University",
      logo: "/src/assets/clients/vvu.svg",
      description: "Private university in Ghana",
    },
    {
      id: 8,
      name: "MC (Marine Construction)",
      logo: "/src/assets/clients/mc.svg",
      description: "Marine construction company",
    },
    {
      id: 9,
      name: "Raanan Fish Feed",
      logo: "/src/assets/clients/raanan.svg",
      description: "Aquaculture feed company",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const logoVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const ctaVariants = {
    hidden: {
      opacity: 0,
      y: 80,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#3A619C] mb-6">
            Top Clients we have worked with
          </h2>
        </motion.div>

        {/* Clients Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {clients.map((client) => (
            <motion.div
              key={client.id}
              variants={logoVariants}
              className="group flex flex-col items-center text-center"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
            >
              {/* Logo Container */}
              <div className="w-24 h-24 md:w-32 md:h-32 mb-4 bg-gray-50 rounded-lg flex items-center justify-center p-4 shadow-sm group-hover:shadow-md transition-all duration-300 border border-gray-100">
                <div
                  className="w-full h-full bg-contain bg-center bg-no-repeat transition-all duration-300"
                  style={{
                    backgroundImage: `url(${client.logo})`,
                    backgroundColor: "#f9fafb", // Fallback
                  }}
                  title={client.name}
                >
                  {/* Fallback text if image doesn't load */}
                  {/* <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-gray-400">
                    {client.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 3)}
                  </div> */}
                </div>
              </div>

              {/* Client Name */}
              <h3 className="font-semibold text-sm md:text-base text-gray-800 mb-1 line-clamp-2">
                {client.name}
              </h3>

              {/* Client Description */}
              <p className="text-xs text-gray-500 line-clamp-1">
                {client.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          className="bg-gradient-to-r from-[#3A619C] to-blue-300 rounded-2xl p-4 md:p-12 text-center shadow-xl max-h-70"
          variants={ctaVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto">
            {/* CTA Header */}
            <motion.div
              className="mb-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-2">
                LIKE OUR PROJECTS
              </h3>
              <h2 className="text-white text-lg md:text-lg font-bold mb-2">
                Transform your vision into reality with BROBERG CONSULT LIMITED.
              </h2>
              <p className="text-blue-100 text-lg leading-relaxed">
                Connect us with today and to explore how our work will shape
                your vision into reality
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="bg-cyan-400 hover:bg-cyan-300 text-blue-900 px-8 py-2 rounded-full font-bold text-lg shadow-lg transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(34, 211, 238, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <a href="/contact">CONTACT US</a>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TopClient;
