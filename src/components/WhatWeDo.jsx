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
          className="mb-16"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-4xl font-bold text-center text-blue-800 mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Who are we?
          </motion.h2>
          <motion.div
            className="text-gray-700 leading-relaxed space-y-4 lg:text-lg"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p>
              Broberg Consult Limited is an Engineering Consulting Firm
              Incorporated in June 2008 and certified to commence business on
              the 3rd of June 2008. We are located in Accra, Adabraka, House No.
              7 Dr. Menton Loop, behind the Adabraka police station.
            </p>
            <p>
              Broberg Consult Limited provides professional consultancy services
              in Project Management, Civil, and Structural Engineering from the
              very beginning of a project to its handing over. Broberg Consult
              Limited sets high standards of management that helps clients meet
              their goals by delivering high end services.
            </p>
            <p>
              The company is headed by five professional engineers who have had
              over twenty years' experience in the engineering and project
              management Internationally. Broberg Consult Limited is staffed
              with a team of highly qualified engineering professionals who have
              expertise and orientation in structural, civil engineering and
              project management. The professionalism exhibited by these experts
              has enabled Broberg Consult Limited to increase its clientele base
              and expand its operations.
            </p>
            <p>
              We are engaged in both the private and public sector. Our public
              sector projects include constructions of schools/universities,
              hospitals, housing projects, roads/renovation/rehabilitation of
              public properties, and water management.
            </p>
            <p>
              Private sector projects comprise private housing and
              industrial/commercial properties. Our team has set the
              possibilities and prospects for expanding our clientele base and
              offering engineering consultancy services that compare to
              international standards.
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

        {/* Services we offer */}
        <motion.section
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            className="text-4xl font-bold text-center text-[#3A619C] mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Services we offer
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Project Management */}
            <motion.div
              className="bg-white rounded-lg border-2 border-gray-200 p-8 text-center shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                <ClipboardList className="w-10 h-10 text-[#3A619C]" />
              </div>
              <h3 className="text-xl font-bold text-[#3A619C] mb-4">
                Project Management
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We ensure high service delivery by maintaining the highest
                professional standards in project management. This project is
                ideal to be executed in Ghana.
              </p>
            </motion.div>

            {/* Civil Engineering */}
            <motion.div
              className="bg-white rounded-lg border-2 border-gray-200 p-8 text-center shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                <Building className="w-10 h-10 text-[#3A619C]" />
              </div>
              <h3 className="text-xl font-bold text-[#3A619C] mb-4">
                Civil Engineering
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We professional consultancy expertise contributing to the firm's
                success in meeting various contracts.
              </p>
            </motion.div>

            {/* Structural Engineering */}
            <motion.div
              className="bg-white rounded-lg border-2 border-gray-200 p-8 text-center shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                <Hammer className="w-10 h-10 text-[#3A619C]" />
              </div>
              <h3 className="text-xl font-bold text-[#3A619C] mb-4">
                Structural Engineering
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our structural engineering services focus on those elements of a
                work site and are capable of withstanding various forces.
              </p>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default WhatWeDo;
