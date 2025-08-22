
import React, { useRef } from "react";
import Navbar from "../src/components/Nav";
import Footer from "../src/components/Footer";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import ghanaNavy from "../src/assets/clients/ghana-navy.svg";
import mc from "../src/assets/clients/mc.svg";
import izako from "../src/assets/clients/izako.svg";
import akersolutions from "../src/assets/clients/aker-solutions.svg";
import usstatedept from "../src/assets/clients/us-state-dept.svg";
import nestle from "../src/assets/clients/nestle.svg";
import vvu from "../src/assets/clients/vvu.svg";
import raanan from "../src/assets/clients/raanan.svg";
import lmiholdings from "../src/assets/clients/lmi-holdings.svg";

const ContactUs = () => {
    const form = useRef(null);
    const sendEmail = (e) => {
        e.preventDefault();

        const currentTime = new Date().toLocaleString();
        const formData = new FormData(form.current);
        formData.append("time", currentTime);

        emailjs
            .sendForm(
                "service_8sr8j1i",     
                "template_s7g5luc",    
                form.current,
                "bhOjF3zJHTaNavHHV"      
            )
            .then(
                () => {
                    console.log("SUCCESS!");
                    toast.success("Message sent successfully!");
                    form.current.reset();
                },
                (error) => {
                    console.error("FAILED...", error);
                    toast.error("Failed to send message, please try again.");
                }
            );
    };
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Navbar />
            <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto py-12 px-4 gap-8">
                {/* Left Section: Heading, Subheading, Partners */}
                <div className="flex-1 flex flex-col justify-start">
                    <div className="mb-8">
                        <h1 className="text-5xl md:text-6xl font-bold text-[#3A619C] mb-4">Schedule a Consultation</h1>
                        <p className="text-lg text-gray-700 mb-8">We can tailor services to meet your specific needs.<br />Contact us to learn more.</p>
                    </div>
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Clients</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 items-center">
                            <img src={ghanaNavy} alt="navy" className="h-12 object-contain mx-auto" />
                            <img src={mc} alt="mc" className="h-12 object-contain mx-auto" />
                            <img src={izako} alt="izako" className="h-12 object-contain mx-auto" />
                        <img src={akersolutions} alt="akersolutions" className="h-12 object-contain mx-auto" />
                            <img src={usstatedept} alt="us-state-dept" className="h-12 object-contain mx-auto" />
                            <img src={nestle} alt="nestle" className="h-12 object-contain mx-auto" />
                            <img src={vvu} alt="vvu" className="h-12 object-contain mx-auto" />
                            <img src={raanan} alt="raanan" className="h-12 object-contain mx-auto" />
                            <img src={lmi-holdings} alt="lmi-holdings" className="h-12 object-contain mx-auto" />

                        </div>
                    </div>
                </div>
                {/* Right Section: Contact Form */}
                <div className="flex-1 bg-gray-150 rounded-xl shadow-lg p-8 flex flex-col justify-center">
                    <form ref={form} onSubmit={sendEmail} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Name</label>
                            <input name="user_name" type="text" id="name" className="w-full border-b border-gray-400 bg-transparent py-2 px-1 focus:outline-none" placeholder="" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
                            <input name="user_email" type="email" id="email" className="w-full border-b border-gray-400 bg-transparent py-2 px-1 focus:outline-none" placeholder="" required />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">Phone Number</label>
                            <input name="phone" type="tel" id="phone" className="w-full border-b border-gray-400 bg-transparent py-2 px-1 focus:outline-none" placeholder="" />
                        </div>
                        <div>
                            <label htmlFor="company" className="block text-gray-700 font-medium mb-1">Company</label>
                            <input name="company" type="text" id="company" className="w-full border-b border-gray-400 bg-transparent py-2 px-1 focus:outline-none" placeholder="" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-gray-700 font-medium mb-1">Message</label>
                            <textarea name="message" id="message" rows="2" className="w-full border-b border-gray-400 bg-transparent py-2 px-1 focus:outline-none" placeholder="Write your message here" required></textarea>
                        </div>
                        <div className="pt-4">
                            <button type="submit" className="bg-[#3A619C] text-white font-bold py-3 px-8 rounded-full shadow hover:bg-blue-800 transition">Send Message</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* Get in Touch Section */}
            <section className="w-full py-16 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="text-blue-900 font-medium mb-2">Your feedback matters</div>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#23346C] mb-8">We’re just a message away</h2>

                    <div className="flex flex-col md:flex-row justify-center items-start gap-12 mb-8">
                        {/* Email Card Container */}
                        <div className="relative bg-white rounded-xl shadow-lg flex flex-col items-center px-8 py-6 w-full md:w-96" style={{ borderLeft: '8px solid #3A619C', minHeight: '220px', height: '220px' }}>
                            <div className="bg-gray-300 rounded-full p-4 mb-2 flex items-center justify-center">
                                <img src="/mail.png" alt="Mail Icon" className="h-8 w-8 object-contain" />
                            </div>
                            <div className="font-semibold text-lg mb-1 text-[#3A619C]">Email</div>
                            <div className="text-gray-600 mb-1">Count on us for expert guidance</div>
                            <a href="mailto:c.bergmann.broberg@gmail.com" className="text-[#3A619C] font-medium underline cursor-pointer">c.bergmann.broberg@gmail.com</a>
                        </div>
                        {/* Phone Card Container */}
                        <div className="relative bg-white rounded-xl shadow-lg flex flex-col items-center px-8 py-6 w-full md:w-96" style={{ borderLeft: '8px solid #3A619C', minHeight: '220px', height: '220px' }}>
                            <div className="bg-gray-300 rounded-full p-4 mb-2 flex items-center justify-center">
                                <img src="/phone-call.png" alt="Phone Icon" className="h-8 w-8 object-contain" />
                            </div>
                            <div className="font-semibold text-lg mb-1 text-[#3A619C]">Telephone</div>
                            <div className="text-gray-600 mb-1">Our dedicated company is ready to assist you</div>
                            <a href="tel:+233 24 431 4140" className="text-[#3A619C] font-medium underline cursor-pointer">(+233) 24 431 4140</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Location Section */}
            <section className="w-full py-16" style={{ backgroundImage: 'url(/background1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex flex-col items-center justify-center mb-2">
                        <img src="/map-pin.png" alt="Map Pin" className="h-10 w-10 object-contain mb-2" />
                        <h2 className="text-4xl md:text-5xl font-bold text-[#23346C] mb-8">Our Location</h2>
                    </div>
                    <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg flex justify-center items-center">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.993232833635!2d-0.2172764!3d5.5634683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9a08711b1d09:0x29316059612014d0!2sBroberg+Office!5e0!3m2!1sen!2sgh!4v1660312345678!5m2!1sen!2sgh"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Broberg Office Location"
                        ></iframe>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default ContactUs;
