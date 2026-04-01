import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, Building, Hammer } from "lucide-react";
import bgSvg from "../assets/bg.svg";

const Services = () => {
    return (
        <div
            className="min-h-screen py-16 relative"
            style={{
                backgroundImage: `url(/image2.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Overlay for better text readability */}

            {/* Services we offer */}
            <motion.section
                className="mx-4 md:mx-16 lg:mx-32 my-8"
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
    );
};

export default Services;
