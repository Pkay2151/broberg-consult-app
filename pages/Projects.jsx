import React, { useState, useEffect } from "react";
import Navbar from "../src/components/Nav";
import Footer from "../src/components/Footer";
import { projectsAPI } from "../util/api";
import { toast } from "react-toastify";
import { getImageUrlWithFallback } from "../src/utils/imageUtils";
import AndoClinic from "../src/assets/Project Pictures/Ando Clinic.jpg";

// Sample project data
const sampleProjects = [
  {
    id: 1,
    title: "Ando Clinic",
    location: "Accra, Ghana",
    field: "Civil Engineering",
    description: "Modern healthcare facility design and construction with state-of-the-art medical equipment infrastructure.",
    image: AndoClinic,
    // Add gallery images for each project
    gallery: [
      AndoClinic,
    ],
    status: "Completed",
    year: "2024",
    details: {
      client: "Ando Healthcare Group",
      features: [
        "Emergency care unit with advanced life support systems",
        "Outpatient consultation rooms with modern diagnostic equipment",
        "Surgical suite with laminar air flow systems",
        "Pharmacy and laboratory facilities",
        "Parking facility for 50 vehicles"
      ],
    }
  },
  {
    id: 2,
    title: "Day Care Centre",
    location: "Kumasi, Ghana",
    field: "Structural Engineering",
    description: "Child-friendly facility with safe play areas, educational spaces, and modern security systems.",
    image: "/src/assets/Project Pictures/Day care centre.jpg",
    gallery: [
      "/src/assets/Project Pictures/Day care centre.jpg",
      "/src/assets/Project Pictures/dcc 2.jpg", 
      "/src/assets/Project Pictures/dcc 4.jpg",
      "/src/assets/Project Pictures/DCC 5.jpg",
      "/src/assets/Project Pictures/dcc 6.jpg",
      "/src/assets/Project Pictures/dcc.jpg",
    ],
    status: "Completed",
    year: "2023",
    details: {
      client: "Ministry of Education",
      duration: "12 months",
      budget: "GHS 1.8 million",
      features: [
        "Age-appropriate classrooms for 150 children",
        "Indoor and outdoor play areas with safety equipment",
        "Kitchen and dining facilities",
        "Administrative offices and staff rooms",
        "Emergency evacuation systems"
      ],
      challenges: "Designing earthquake-resistant structures in seismic zone",
      solutions: "Used advanced seismic isolation systems and flexible joint connections with reinforced concrete",
      outcome: "Facility accommodates 150 children with enhanced safety standards"
    }
  },
  {
    id: 3,
    title: "NZEB Project",
    location: "Cape Coast, Ghana",
    field: "Project Management",
    description: "Net Zero Energy Building project focusing on sustainable construction and renewable energy integration.",
    image: "/src/assets/Project Pictures/Nzeb Project.jpg",
    gallery: [
      "/src/assets/Project Pictures/Nzeb Project.jpg",
    ],
    status: "Completed",
    year: "2024",
    details: {
      client: "Ghana Green Building Council",
      duration: "24 months",
      budget: "GHS 4.2 million",
      features: [
        "Solar panel array with 100kW capacity",
        "Rainwater harvesting system",
        "Green roof with indigenous plant species",
        "Smart building management system",
        "Electric vehicle charging stations"
      ],
      challenges: "Achieving net-zero energy consumption in tropical climate",
      solutions: "Implemented advanced solar tracking systems and energy-efficient building materials with smart climate control",
      outcome: "Expected to save 80% on energy costs and reduce carbon footprint by 90%"
    }
  },
  {
    id: 4,
    title: "Urology Center Korle-Bu",
    location: "Accra, Ghana",
    field: "Civil Engineering",
    description: "Specialized medical facility with advanced urology equipment and patient care infrastructure.",
    image: "/src/assets/Project Pictures/6.webp",
    gallery: [
      "/src/assets/Project Pictures/2.jpg",
      "/src/assets/Project Pictures/7.webp",
    ],
    status: "Completed",
    year: "2023",
    details: {
      client: "Korle-Bu Teaching Hospital",
      duration: "15 months",
      budget: "GHS 3.1 million",
      features: [
        "Specialized operating theaters with robotic surgery capabilities",
        "Dialysis unit with 20 stations",
        "Imaging center with MRI and CT scan facilities",
        "Patient recovery wards with private rooms",
        "Research laboratory for urological studies"
      ],
      challenges: "Integrating specialized medical equipment with existing hospital infrastructure",
      solutions: "Designed modular infrastructure with flexible utility systems and seismic isolation for sensitive equipment",
      outcome: "Increased patient capacity by 300% and reduced waiting times by 60%"
    }
  },
    // ...existing code until project #5...
  
  {
    id: 5,
    title: "Refurbishment of LMI Holdings Head Office",
    location: "Accra, Ghana",
    field: "Project Management",
    description: "Refurbishment of existing office spaces to improve functionality and aesthetics.",
    image: "/src/assets/Project Pictures/7.webp",
    gallery: [
      "/src/assets/Project Pictures/7.webp",
      "/src/assets/Project Pictures/2.jpg",
    ],
    status: "Completed",
    year: "2022",
    details: {
      client: "LMI Holdings",
      duration: "6 months",
      budget: "GHS 1.2 million",
      features: [
        "Modern open-plan office layouts with flexible workstations",
        "Upgraded HVAC systems for improved air quality",
        "LED lighting systems for energy efficiency",
        "Modern conference rooms with AV equipment",
        "Reception area and executive offices renovation"
      ],
      challenges: "Maintaining business operations during renovation phases",
      solutions: "Implemented phased renovation approach with temporary workspace arrangements and after-hours construction",
      outcome: "Improved workplace productivity by 25% and reduced energy costs by 30%"
    }
  },
  
  // ...rest of existing code...
  {
    id: 6,
    title: "NG Commercial Complex",
    location: "Tema, Ghana",
    field: "Project Management",
    description: "Multi-purpose commercial building with retail spaces and office complexes.",
    image: "/src/assets/Project Pictures/NG 1.jpg",
    gallery: [
      "/src/assets/Project Pictures/NG 1.jpg",
      "/src/assets/Project Pictures/NG 2.jpg",
      "/src/assets/Project Pictures/7.webp",
    ],
    status: "Ongoing",
    year: "2024",
    details: {
      client: "NG Development Corporation",
      duration: "30 months",
      budget: "GHS 8.5 million",
      features: [
        "Shopping mall with 50 retail outlets",
        "Office towers with Grade A office spaces",
        "Multi-level parking for 500 vehicles",
        "Food court and entertainment area",
        "Conference and event facilities"
      ],
      challenges: "Coordinating multiple contractors and managing complex logistics",
      solutions: "Implemented advanced project management software and phased construction approach with dedicated logistics coordination",
      outcome: "Expected to create 800 jobs and boost local economy by 15%"
    }
  }
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [uploadedProjects, setUploadedProjects] = useState([]);
  const [uploadedLoading, setUploadedLoading] = useState(false);

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setShowImageGallery(false);
    setCurrentImageIndex(0);
  };

  const openImageGallery = () => {
    if (selectedProject?.gallery?.length > 0) {
      setShowImageGallery(true);
      setCurrentImageIndex(0);
    }
  };

  const closeImageGallery = () => {
    setShowImageGallery(false);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject?.gallery?.length) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.gallery.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject?.gallery?.length) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.gallery.length - 1 : prev - 1
      );
    }
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  // Fetch uploaded projects from API and keep only approved ones
  useEffect(() => {
    let mounted = true;
    const fetchUploaded = async () => {
      setUploadedLoading(true);
      try {
        const data = await projectsAPI.getAllproject();

        // normalize response shapes
        let projectsArray = [];
        if (Array.isArray(data)) projectsArray = data;
        else if (data && Array.isArray(data.projects)) projectsArray = data.projects;

        const approved = projectsArray.filter((p) => p && p.isApproved === true);
        if (mounted) setUploadedProjects(approved);
      } catch (err) {
        console.error("Failed to fetch uploaded projects:", err);
        toast.error("Unable to load uploaded projects");
      } finally {
        if (mounted) setUploadedLoading(false);
      }
    };

    fetchUploaded();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      {/* Page Header Section */}
      <div className="text-[#3A619C] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#3A619C] mb-4 drop-shadow-lg">
              Our Projects
            </h1>
            <p className="text-xl md:text-2xl text-[#3A619C] max-w-3xl mx-auto leading-relaxed">
              Browse through our projects which cut across Project Management, Civil and Structural Engineering.<br />
              For any project is the location and the particular field of engineering and the description.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Projects Grid */}
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Project Image */}
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = '/src/assets/react.svg';
                      e.target.className = 'w-full h-full object-contain p-8 bg-gray-100';
                    }}
                  />
                </div>
                
                {/* Project Content */}
                <div className="p-6">
                  {/* Status Badge */}
                  <div className="flex justify-between items-start mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {project.status}
                    </span>
                    <span className="text-sm text-gray-500">{project.year}</span>
                  </div>
                  
                  {/* Project Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  
                  {/* Location and Field */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 space-y-1 sm:space-y-0">
                    <p className="text-sm text-gray-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {project.location}
                    </p>
                    <span className="px-2 py-1 bg-[#3A619C] text-white text-xs rounded-md">
                      {project.field}
                    </span>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* View Details Button */}
                  <button 
                    onClick={() => openModal(project)}
                    className="mt-4 w-full bg-white hover:bg-[#3A619C] text-[#3A619C] hover:text-white border-2 border-[#3A619C] py-2 px-4 rounded-lg transition-colors duration-200 font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Uploaded Projects (from admin uploads) */}
        <div className="mt-12">

          {uploadedLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-gray-500 mt-2">Loading uploaded projects...</p>
            </div>
          ) : uploadedProjects && uploadedProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {uploadedProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    <img
                      src={getImageUrlWithFallback(project.imageUrl || project.image, 'project')}
                      alt={project.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/src/assets/react.svg';
                        e.currentTarget.className = 'w-full h-full object-contain p-8 bg-gray-100';
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${project.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                        {project.status || 'N/A'}
                      </span>
                      <span className="text-sm text-gray-500">{project.year || ''}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 space-y-1 sm:space-y-0">
                      <p className="text-sm text-gray-600">{project.location || '-'}</p>
                      <span className="px-2 py-1 bg-[#3A619C] text-white text-xs rounded-md">{project.field || ''}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{project.description}</p>
                    <button onClick={() => openModal(project)} className="mt-4 w-full bg-white hover:bg-[#3A619C] text-[#3A619C] hover:text-white border-2 border-[#3A619C] py-2 px-4 rounded-lg transition-colors duration-200 font-medium">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No uploaded projects approved yet.</p>
          )}
        </div>
      </main>

      {/* Project Details Modal */}
      {selectedProject && !showImageGallery && (
        <div 
          className="fixed inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Hero Header with Clickable Image */}
            <div className={`relative h-80 overflow-hidden group ${selectedProject.gallery && selectedProject.gallery.length > 1 ? 'cursor-pointer' : ''}`} 
                 onClick={selectedProject.gallery && selectedProject.gallery.length > 1 ? openImageGallery : undefined}>
              {/* Close Button - Top Right */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeModal();
                }}
                className="absolute top-4 right-4 z-10 text-white/90 hover:text-white text-2xl font-light transition-all duration-200 bg-black/40 hover:bg-black/60 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg hover:scale-110"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <span className="leading-none text-center block" style={{ transform: 'translateY(-2px)' }}>×</span>
              </button>
            
              {/* Gallery Icon */}
              <div className="absolute top-4 left-4 z-10 bg-black/40 hover:bg-black/60 px-3 py-2 rounded-lg backdrop-blur-md transition-all duration-200">
                <div className="flex items-center space-x-2 text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">{selectedProject.gallery?.length || 1} Photo{selectedProject.gallery?.length !== 1 ? 's' : ''}</span>
                </div>
              </div>
              
              {/* Image and overlay container that scales together */}
              <div className="w-full h-full transition-transform duration-300 group-hover:scale-105">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/src/assets/react.svg';
                    e.target.className = 'w-full h-full object-contain p-8 bg-gradient-to-br from-gray-100 to-gray-200';
                  }}
                />
                {/* Overlay Gradient - now scales with the image */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              </div>
              
              {/* Click to view gallery hint - Only show if multiple images */}
              {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                <div className="absolute bottom-4 left-4 bg-black/40 px-4 py-2 rounded-lg backdrop-blur-md z-10">
                  <p className="text-white text-sm font-medium">Click to view gallery</p>
                </div>
              )}
              
              {/* Header Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
                <div className="flex justify-between items-end">
                  <div className="w-full">
                    <div className="flex items-center space-x-4 mb-3">
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-md ${
                        selectedProject.status === 'Completed' 
                          ? 'bg-green-500/80 text-white' 
                          : 'bg-blue-500/80 text-white'
                      }`}>
                        {selectedProject.status}
                      </span>
                      <span className="text-white/90 font-medium">{selectedProject.year}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-2 leading-tight">
                      {selectedProject.title}
                    </h1>
                    <p className="text-xl text-white/90 font-light">
                      {selectedProject.location} • {selectedProject.field}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[calc(95vh-20rem)]">
              {/* Project Overview Section */}
              <div className="p-8 bg-gradient-to-r from-gray-50 to-white">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Overview</h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-8">
                    {selectedProject.description}
                  </p>
                  
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                      <div className="text-2xl font-bold text-[#3A619C] mb-1">
                        {selectedProject.details.duration}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">Duration</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                      <div className="text-2xl font-bold text-[#3A619C] mb-1">
                        {selectedProject.details.budget}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">Budget</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                      <div className="text-xl font-bold text-[#3A619C] mb-1 truncate">
                        {selectedProject.details.client.split(' ')[0]}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">Client</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                      <div className="text-xl font-bold text-[#3A619C] mb-1">
                        {selectedProject.field.split(' ')[0]}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">Field</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Features Section */}
              <div className="p-8 bg-white">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features & Capabilities</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedProject.details.features.map((feature, index) => (
                      <div key={index} className="flex items-start p-4 bg-gradient-to-r from-[#3A619C]/5 to-blue-50 rounded-xl border border-[#3A619C]/10">
                        <div className="flex-shrink-0 w-6 h-6 bg-[#3A619C] rounded-full flex items-center justify-center mr-4 mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Challenges, Solutions & Outcome Section */}
{/*              <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Project Journey</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">  */}
                    
{/*                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-100">
                      <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Challenges</h3>
                      <p className="text-gray-600 leading-relaxed">{selectedProject.details.challenges}</p>
                    </div>  */}

                    {/* Solutions */}
{/*                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Solutions</h3>
                      <p className="text-gray-600 leading-relaxed">{selectedProject.details.solutions || "Custom engineering solutions implemented based on project requirements"}</p>
                    </div>  */}

                    {/* Outcome */}
{/*                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Outcome</h3>
                      <p className="text-gray-600 leading-relaxed">{selectedProject.details.outcome}</p>
                    </div> */}
{/*                   </div> 
                 </div>
              </div> */}

              {/* Footer */}
              <div className="p-8 bg-gradient-to-r from-[#3A619C] to-blue-700">
                <div className="max-w-4xl mx-auto text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Your Project?</h3>
                  <p className="text-blue-100 mb-6">Let us bring your vision to life with our expert engineering solutions.</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={closeModal}
                      className="px-8 py-3 bg-white text-[#3A619C] hover:bg-gray-100 rounded-xl font-semibold transition-colors duration-200"
                    >
                      Close Project Details
                    </button>
                    <button className="px-8 py-3 bg-white/10 text-white hover:bg-white/20 rounded-xl font-semibold transition-colors duration-200 backdrop-blur-sm">
                      Contact Us About This Project
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Gallery Modal */}
      {selectedProject && showImageGallery && (
        <div 
          className="fixed inset-0 bg-black/95 flex items-center justify-center p-4 z-[60]"
          onClick={closeImageGallery}
        >
          <div className="relative max-w-7xl w-full h-full flex flex-col">
            {/* Gallery Header */}
            <div className="flex justify-between items-center p-4 text-white">
              <div>
                <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
                <p className="text-gray-300">
                  {currentImageIndex + 1} of {selectedProject.gallery?.length || 1}
                </p>
              </div>
              <button
                onClick={closeImageGallery}
                className="text-white/90 hover:text-white text-3xl font-light transition-all duration-200 bg-black/40 hover:bg-black/60 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md"
              >
                <span className="leading-none text-center block" style={{ transform: 'translateY(-2px)' }}>×</span>
              </button>
            </div>

            {/* Main Image Display */}
            <div className="flex-1 flex items-center justify-center relative" onClick={(e) => e.stopPropagation()}>
              {/* Previous Button - Only show if multiple images */}
              {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                <button
                  onClick={prevImage}
                  className="absolute left-4 z-10 text-white/90 hover:text-white text-2xl bg-black/40 hover:bg-black/60 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {/* Current Image */}
              <img
                src={selectedProject.gallery?.[currentImageIndex] || selectedProject.image}
                alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onError={(e) => {
                  e.target.src = '/src/assets/react.svg';
                  e.target.className = 'max-w-full max-h-full object-contain p-8 bg-gray-800 rounded-lg';
                }}
              />

              {/* Next Button - Only show if multiple images */}
              {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                <button
                  onClick={nextImage}
                  className="absolute right-4 z-10 text-white/90 hover:text-white text-2xl bg-black/40 hover:bg-black/60 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>

            {/* Thumbnail Strip */}
            {selectedProject.gallery && selectedProject.gallery.length > 1 && (
              <div className="p-4">
                <div className="flex justify-center space-x-2 overflow-x-auto">
                  {selectedProject.gallery.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        index === currentImageIndex 
                          ? 'border-white shadow-lg' 
                          : 'border-gray-500 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/src/assets/react.svg';
                          e.target.className = 'w-full h-full object-contain bg-gray-600';
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery Controls */}
            <div className="flex justify-center space-x-4 p-4">
              <button
                onClick={closeImageGallery}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-md transition-all duration-200"
              >
                Back to Project Details
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Projects;
