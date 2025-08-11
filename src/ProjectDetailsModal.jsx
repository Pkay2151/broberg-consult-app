import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Calendar,
  User,
  Building2,
  Clock,
  CheckCircle,
} from "lucide-react";

const ProjectDetailsModal = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // Sample additional project details (replace with API data later)
  const projectDetails = {
    // Core project attributes matching your structure
    nameOfProject: project.title,
    date: "2020/21",
    location: project.location,
    client: "Government of Italy",
    projectFeatures: [
      "300m2 storey building",
      "External works and landscaping",
      "Modern amenities and infrastructure",
      "Sustainable design features",
    ],
    positionHeld: "Project Management",
    activities: [
      "Design and construction supervision of residential facility",
      "Project planning and coordination",
      "Quality control and assurance",
      "Stakeholder communication and reporting",
      "Budget management and cost control",
      "Timeline management and scheduling",
    ],

    // Timeline information
    startDate: "January 2020",
    endDate: "June 2021",

    // Additional project information
    budget: "GH₵ 2,500,000",
    status: "Completed",
    contractor: "Broberg Consult Limited",
    projectManager: "Eng. Kwame Asante",
    category: "Residential Infrastructure",
    duration: "18 months",

    specifications: [
      "Total Floor Area: 300 sq.m",
      "Two-storey residential building",
      "External landscaping and works",
      "Modern plumbing and electrical systems",
      "Fire safety and emergency systems",
      "Sustainable building materials",
      "Energy efficient design",
      "Accessibility compliance",
    ],

    keyFeatures: [
      "Sustainable Design",
      "Energy Efficient",
      "Modern Architecture",
      "Quality Construction",
      "International Standards",
      "Cost Effective",
    ],

    projectChallenges: [
      "International client coordination",
      "Local building code compliance",
      "Weather conditions during construction",
      "Material procurement and logistics",
    ],

    gallery: [
      project.image,
      "/src/assets/project-detail-1.jpg",
      "/src/assets/project-detail-2.jpg",
      "/src/assets/project-detail-3.jpg",
    ],
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[90vh]">
              {/* Header Image */}
              <div className="relative h-64 bg-gray-200">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundColor: "#e5e7eb",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-full">
                        FEATURED PROJECT
                      </span>
                    </div>
                  )}

                  {/* Project Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-16">
                    <h1 className="text-white text-3xl font-bold mb-2">
                      {project.title}
                    </h1>
                    <div className="flex items-center text-white/90">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span className="text-lg">{project.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Quick Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="font-semibold text-gray-700">
                        Timeline
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {projectDetails.startDate} - {projectDetails.endDate}
                    </p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <span className="font-semibold text-gray-700">
                        Status
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {projectDetails.status}
                    </p>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Building2 className="w-5 h-5 text-purple-600 mr-2" />
                      <span className="font-semibold text-gray-700">
                        Category
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {projectDetails.category}
                    </p>
                  </div>
                </div>

                {/* Project Description */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Project Overview
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg mb-4">
                    {project.description}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    This project represents our commitment to delivering
                    high-quality engineering solutions that meet international
                    standards while addressing local needs. Our comprehensive
                    approach ensures sustainable development and long-term value
                    for our clients and communities.
                  </p>
                </div>

                {/* Project Details Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* Project Information */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Project Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-600">
                          Name of project:
                        </span>
                        <span className="text-gray-900">
                          {projectDetails.nameOfProject}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-600">Date:</span>
                        <span className="text-gray-900">
                          {projectDetails.date}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-600">
                          Location:
                        </span>
                        <span className="text-gray-900">
                          {projectDetails.location}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-600">
                          Client:
                        </span>
                        <span className="text-gray-900">
                          {projectDetails.client}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-600">
                          Position held:
                        </span>
                        <span className="text-gray-900">
                          {projectDetails.positionHeld}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Project Features & Activities */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Project Features & Activities
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <span className="font-medium text-gray-600 block mb-2">
                          Project features:
                        </span>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <ul className="space-y-1">
                            {projectDetails.projectFeatures.map(
                              (feature, index) => (
                                <li key={index} className="text-gray-900">
                                  • {feature}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600 block mb-2">
                          Activities:
                        </span>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <ul className="space-y-1">
                            {projectDetails.activities
                              .slice(0, 3)
                              .map((activity, index) => (
                                <li key={index} className="text-gray-900">
                                  • {activity}
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activities */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Activities
                  </h3>
                  <ul className="space-y-2">
                    {projectDetails.activities.map((activity, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Features */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Project Features
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {projectDetails.projectFeatures.map((feature, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 px-4 py-2 rounded-lg"
                      >
                        <span className="text-gray-700 text-sm font-medium">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project Challenges */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Challenges & Solutions
                  </h3>
                  <div className="space-y-3">
                    {projectDetails.projectChallenges.map(
                      (challenge, index) => (
                        <div
                          key={index}
                          className="flex items-start bg-yellow-50 p-4 rounded-lg"
                        >
                          <Clock className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{challenge}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                  <motion.button
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Contact Us About This Project
                  </motion.button>
                  <motion.button
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Download Project Brief
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailsModal;
