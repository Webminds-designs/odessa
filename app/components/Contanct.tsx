import React, { useState } from "react";
import Image from "next/image";
import { GoArrowRight } from "react-icons/go";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { motion } from "framer-motion";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: formData.email,
          to: "navodchathushka@gmail.com",
          subject: `Contact Form Message from ${formData.name}`,
          text: `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="w-full h-fit md:h-screen grid justify-center items-center text-white py-12 px-4 relative bg-black">
      <Image
        src="/images/contact.jpg"
        alt="person1"
        width={100}
        height={100}
        className="absolute top-0 w-full h-full object-cover opacity-5 py-4 md:py-20 rounded-2xl "
      />
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 justify-center items-center z-10 ">
        <div className="space-y-16">
          <h1 className="text-3xl md:text-5xl font-semibold font-vasion ">
            Lost in the selecting diamond ?
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6 font-vasion">
            <div>
              <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-300">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full border-b border-gray-600 bg-transparent p-2 text-white focus:outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full border-b border-gray-600 bg-transparent p-2 text-white focus:outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-1 text-sm font-medium text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="w-full border-b border-gray-600 bg-transparent p-2 text-white focus:outline-none"
                required
              />
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className={`text-lg px-8 py-2 border-2 rounded-full font-aeonikregularitalic border-white cursor-pointer hover:bg-white hover:text-black transform-fill transition-colors duration-800 ${
                  status === "sending" ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {status === "sending" ? "Sending..." : "Send"}
              </button>
              <div className="bg-brown rounded-full w-12 h-12 justify-center items-center flex">
                <GoArrowRight className="text-white text-3xl" />
              </div>
            </div>
            
            {status === "success" && (
              <p className="text-green-500">Message sent successfully!</p>
            )}
            {status === "error" && (
              <p className="text-red-500">Failed to send message. Please try again.</p>
            )}
          </form>
        </div>
        <div className="space-y-8 flex flex-col justify-end font-vasion ">
          <p className="text-white text-sm md:text-base leading-loose tracking-wider">
            <span className="text-brown">We&apos;re here to assist you </span>
            with any questions about our exclusive diamond collections. Whether
            you need guidance on selecting the perfect piece, are curious about
            custom designs, or want more details about our premium offerings,
            our experienced team is ready to help. Please fill out the form
            below, and one of our experts will reach out to you shortly.
          </p>

          <p className="text-gray-300">
            Prepare for a quick response
            <br />
            <a href="mailto:info@odessa.com" className="text-brown">
              info@odessa.com
            </a>
          </p>

          <div className="flex ">
            <div className=" bg-brown rounded-full w-12 h-12 text-white justify-center items-center flex cursor-pointer transition-colors duration-800 hover:bg-white hover:text-brown">
              <FaFacebookF className=" text-3xl" />
            </div>
            <div className="font-aeonikregularitalic flex gap-2 items-center px-4 py-2 border-2 border-white text-white rounded-full cursor-pointer hover:bg-white hover:text-black transform-fill transition-colors duration-800">
              <FaInstagram className=" text-3xl" />
              Instagram
            </div>
            <div className=" bg-transparent border-2 border-white text-white rounded-full w-12 h-12 justify-center items-center flex cursor-pointer hover:bg-white hover:text-black transition-colors duration-800">
              <IoCall className=" text-3xl" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
