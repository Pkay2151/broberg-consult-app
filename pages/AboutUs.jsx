
import React from "react";
import Navbar from "../src/components/Nav";
import Footer from "../src/components/Footer";
import { Link } from 'react-router-dom';

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            {/* Hero Section */}
            <section
                className="relative flex flex-col items-center justify-center text-center h-[400px] md:h-[500px] w-full"
                style={{
                    backgroundImage: "url('/image3.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4">
                    <h1 className="text-5xl md:text-5xl font-extrabold mb-6" style={{ color: '#e3e8f0ff' }}>About Us</h1> 
                    <p className="text-lg md:text-xl max-w-2xl mb-6" style={{ color: '#e3e8f0ff' }}>
                        <span className="font-semibold" style={{ color: '#e3e8f0ff' }}>Broberg Consult Limited</span> has over <span className="font-bold" style={{ color: '#e3e8f0ff' }}>15 years of experience</span> in providing consulting to the <span className="font-bold" style={{ color: '#e3e8f0ff' }}>Construction Industry</span>. With its equipped team and expects, we have managed to build over 50 projects all across Ghana. The company specializes in <span className="font-bold" style={{ color: '#e3e8f0ff' }}>Project Management, Civil Engineering &amp; Structural Engineering</span>.
                    </p>
                    <Link to="/contact" className="bg-[#3A619C] hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded shadow transition inline-block">Contact Us</Link>
                </div>
            </section>

            {/* History Section */}
            <section className="container mx-auto px-4 py-16 max-w-6xl">
                <div className="flex flex-col md:flex-row items-start gap-10">
                    <div className="md:w-2/3">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#3A619C' }}><strong>Our History</strong></h2>
                        <p className="text-lg leading-relaxed mb-4" style={{ color: '#071325ff' }}>
                            Established in <span className="font-bold" style={{ color: '#071325ff' }}>June 2008</span> under the 1963 Company’s Code regulations, <span className="font-bold" style={{ color: '#071325ff' }}>Broberg Consult Limited</span> was founded by two professional engineers with extensive <span className="font-bold" style={{ color: '#071325ff' }}>local and international experience</span>. In its early years, the firm focused on delivering consultancy services for both <span className="font-bold" style={{ color: '#071325ff' }}>public and private developments</span>, including schools, hospitals, industrial plants, and housing projects. Over time, the company expanded its expertise, taking on increasingly complex projects and earning the trust of notable clients such as <span className="font-bold" style={{ color: '#071325ff' }}>Nestlé Ghana Ltd., the Ghana Navy/US Government, and Legacy Holdings (South Africa).</span>
                        </p>
                        <p className="text-lg leading-relaxed" style={{ color: '#071325ff' }}>
                            Today, the founders continue to lead a <span className="font-bold" style={{ color: '#071325ff' }}>multidisciplinary team</span>, upholding the company’s original vision of excellence and innovation in engineering.
                        </p>
                    </div>
                    <div className="md:w-1/3 flex justify-center items-center">
                        <img
                            src="/structure1.jpg"
                            alt="History"
                            className="rounded-lg shadow-lg w-full max-w-xl md:max-w-2xl h-auto object-cover aspect-square"
                        />
                    </div>
                </div>
            </section>
            {/* Meet the Team Section */}
            <section className="container mx-auto px-4 py-16 max-w-6xl">
                <div className="text-center mb-8">
                    <h3 className="text-[#3A619C] font-semibold mb-2 text-lg">Meet the team</h3>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#3A619C]">A Company Is As Good As Its <span className="text-[#3A619C]">Team</span></h2>
                    <p className="text-gray-600 text-lg max-w-3xl mx-auto">The team is endowed with wide range of professionals who have enormous experience in project management and
                        engineering. The extended team consists of architects, civil engineers, quantity surveyors among others.</p>
                </div>
                <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
                    {/* Team Member 1 */}
                    <div className="flex flex-col items-center w-full md:w-1/3">
                        <div className="relative">
                            <img src="/cristine.jpeg" alt="Managing Director" className="w-64 h-80 object-cover rounded-xl shadow-lg" />
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-64 bg-white rounded-b-xl shadow-lg flex flex-col items-center py-3" style={{ zIndex: 2 }}>
                                <div className="bg-[#3A619C] text-white font-bold px-4 py-1 rounded-t-lg w-full text-center">Managing Director</div>
                                <div className="text-[#3A619C] font-medium px-4 py-1 w-full text-center">Mrs. Christiane Bergman</div>
                            </div>
                        </div>
                    </div>
                    {/* Team Member 2 */}
                    <div className="flex flex-col items-center w-full md:w-1/3">
                        <div className="relative">
                            <img src="/morde.jpeg" alt="Executive Office Administrator" className="w-64 h-80 object-cover rounded-xl shadow-lg" />
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-64 bg-white rounded-b-xl shadow-lg flex flex-col items-center py-3" style={{ zIndex: 2 }}>
                                <div className="bg-[#3A619C] text-white font-bold px-4 py-1 rounded-t-lg w-full text-center">Executive Office Administrator</div>
                                <div className="text-[#3A619C] font-medium px-4 py-1 w-full text-center">Mr. Mordecai Selorm Kwashie</div>
                            </div>
                        </div>
                    </div>
                    {/* Team Member 3 */}
                    <div className="flex flex-col items-center w-full md:w-1/3">
                        <div className="relative">
                            <img src="/morde.jpeg" alt="Chief Technology Officer" className="w-64 h-80 object-cover rounded-xl shadow-lg" />
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-64 bg-white rounded-b-xl shadow-lg flex flex-col items-center py-3" style={{ zIndex: 2 }}>
                                <div className="bg-[#3A619C] text-white font-bold px-4 py-1 rounded-t-lg w-full text-center">Chief Technology Officer</div>
                                <div className="text-[#3A619C] font-medium px-4 py-1 w-full text-center">Enoch Nyankah Mensah</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Centered Oval Transparent Button */}
            {/* <div className="flex justify-center my-8">
                <button
                    className="px-12 py-4 rounded-full bg-white/40 border border-[#3A619C] text-[#3A619C] font-bold text-lg shadow-lg backdrop-blur-md hover:bg-white/60 transition"
                    style={{ minWidth: '150px' }}
                >
                    See Our Team
                </button>
            </div> */}
            {/* Software Tools Section */}
            <section className="w-full mx-auto px-4 py-16 bg-blue-50 rounded-xl">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#3A619C]">Software Tools We Use</h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">Our team leverages industry-leading software to deliver high-quality solutions and innovative results.</p>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-10">
                    <div className="flex flex-col items-center">
                        <img src="/autocad.jpg" alt="AutoCAD" className="w-24 h-24 object-contain mb-2" />
                        <span className="text-[#071325ff] font-semibold">AutoCAD</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/revit.jpg" alt="Revit" className="w-24 h-24 object-contain mb-2" />
                        <span className="text-[#071325ff] font-semibold">Revit</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/microsoft.png" alt="Microsoft Office" className="w-24 h-24 object-contain mb-2" />
                        <span className="text-[#071325ff] font-semibold">Microsoft Office</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/msproject.jpg" alt="Microsoft Project" className="w-24 h-24 object-contain mb-2" />
                        <span className="text-[#071325ff] font-semibold">Microsoft Project</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/frilo.jpg" alt="FRILO" className="w-24 h-24 object-contain mb-2" />
                        <span className="text-[#071325ff] font-semibold">FRILO</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/tekla.jpg" alt="TEKLA" className="w-24 h-24 object-contain mb-2" />
                        <span className="text-[#071325ff] font-semibold">TEKLA</span>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default AboutUs;
