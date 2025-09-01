import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, MapPin } from "lucide-react";
import ProjectDetailsModal from "./ProjectDetailsModal";
import DayCare from "../src/assets/project1.svg";
import HospitalComplex from "../src/assets/project2.svg";
import EducationalInsti from "../src/assets/project3.svg";
import SportComplex from "../src/assets/project4.svg";
import OfficeBuilding from "../src/assets/project5.svg";
import ResidentialComplex from "../src/assets/project6.svg";
import IndustrialFaci from "../src/assets/project7.svg";
import CommunityCenter from "../src/assets/project8.svg";


const SomeProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  const openProjectModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };


  const closeProjectModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const projects = [
    {
      id: 1,
      title: "Day Care Centre",
      location: "Korle gono, Ghana",
      image: DayCare,
      description: "Modern daycare facility with state-of-the-art amenities",
    },
    {
      id: 2,
      title: "Hospital Complex",
      location: "Kumasi, Ghana",
      image: HospitalComplex,
      description: "Multi-story medical facility with advanced infrastructure",
    },
    {
      id: 3,
      title: "Educational Institute",
      location: "Tamale, Ghana",
      image: EducationalInsti,
      description: "Modern educational building with sustainable design",
      featured: false,
    },
    {
      id: 4,
      title: "Sports Complex",
      location: "Cape Coast, Ghana",
      image: SportComplex,
      description: "Multi-purpose sports facility with modern architecture",
    },
    {
      id: 5,
      title: "Office Building",
      location: "Tema, Ghana",
      image: OfficeBuilding,
      description: "Commercial office space with contemporary design",
    },
    {
      id: 6,
      title: "Residential Complex",
      location: "Takoradi, Ghana",
      image: ResidentialComplex,
      description: "Affordable housing project with modern amenities",
    },
    {
      id: 7,
      title: "Industrial Facility",
      location: "Sunyani, Ghana",
      image: IndustrialFaci,
      description: "Manufacturing plant with efficient layout design",
    },
    {
      id: 8,
      title: "Community Center",
      location: "Ho, Ghana",
      image: CommunityCenter,
      description: "Multi-purpose community facility serving local needs",
    },
  ];

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

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      scale: 0.9,
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

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#3A619C] mb-4">
            See our Projects
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our portfolio of successful engineering projects across
            Ghana, showcasing our expertise in civil, structural, and project
            management.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            >
              {/* Featured Badge */}
{/*               {project.featured && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    FEATURED
                  </span>
                </div>
              )} */}

              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundColor: "#e5e7eb", 
                  }}
                >
                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Hover overlay with icon */}
{/*                   <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                    onClick={() => openProjectModal(project)}
                  >
                    <motion.div
                      className="bg-white/90 p-3 rounded-full"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink className="w-6 h-6 text-blue-600" />
                    </motion.div>
                  </div> */}
                </div>
              </div>

              {/* Project Info */}
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
                  {project.title}
                </h3>

                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{project.location}</span>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                {/* View Project Button */}
                {/* <motion.button
                  className="mt-4 w-full bg-[#3A619C] hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openProjectModal(project)}
                >
                  View Details
                </motion.button> */}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="bg-[#3A619C] hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg transition-all duration-300"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (window.location = "/projects")}
          >
            View All Projects
          </motion.button>
        </motion.div>

        {/* Project Details Modal */}
        <ProjectDetailsModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeProjectModal}
        />
      </div>
    </section>
  );
};

export default SomeProjects;
