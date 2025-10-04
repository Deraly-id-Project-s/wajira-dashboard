import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, MoveDownRight, Phone, X } from "lucide-react";
import Image from "@/Components/ui/image";
import RippleButton from "./ui/rippleButton";
import Modal from 'react-modal';

interface HeroSectionProps {
  activeCategory?: string;
  onScrollDown?: () => void;
}

const HeroSection = ({
  activeCategory,
  onScrollDown,
}: HeroSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    formMessage: ''
  });

  const heroBanners = [
    {
      prefix: '/',
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1400&q=80',
    }, 
    {
      prefix: '/product/otomotif',
      image: 'https://images.unsplash.com/photo-1496165493909-5494251d69f7?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      prefix: '/corporate',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const { firstName, lastName, email, phone, formMessage } = formData;
    const fullName = `${firstName} ${lastName}`;
    const waNumber = "6287883531313"; 
    const message = `Halo, saya ${fullName}%0AEmail: ${email}%0APhone: ${phone}%0A${formMessage}`;

    const waUrl = `https://api.whatsapp.com/send?phone=${waNumber}&text=${message}`;
    
    window.open(waUrl, '_blank');
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleScrollClick = () => {
    if (onScrollDown) {
      onScrollDown();
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  // Modal styles
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '500px',
      width: '90%',
      borderRadius: '12px',
      padding: '0',
      border: 'none',
      overflow: 'hidden',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
      backdropFilter: 'blur(5px)'
    }
  };

  const bannerImage = heroBanners.find(banner => banner.prefix === activeCategory)?.image || heroBanners[0].image;

  return (
    <section id="hero_section" className="relative w-full h-screen bg-white overflow-hidden">
      {/* Hero Image */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src={bannerImage}
          alt={`${activeCategory?.toUpperCase()} Motorcycle`}
          className="w-full h-full object-cover"
          fill
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 min-h-screen w-full flex items-center justify-center px-6 md:px-16">
        <div className="flex flex-row gap-10 items-center w-full max-w-7xl">
          {/* Konten Teks */}
          <div className="flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white text-sm md:text-base"
            >
              Connecting Indonesia's Mobility to Global Markets.
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-5xl font-extrabold text-white mt-2"
            >
              SMART TRADE, SHIPPING & EXPORT SERVICES
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mt-4 text-white max-w-xl text-xl max-sm:text-lg"
            >
              Wajira Jagrata Corps delivers smart solutions in exports, logistics, and vehicle services. From motorcycles to key commodities, we connect Indonesia to global markets with trusted shipping and end-to-end support.
            </motion.p>

            {/* Tombol */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="mt-8 flex gap-4"
            >
              <RippleButton className="bg-white text-black font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition flex items-center gap-2">
                <MoveDownRight size={18} /> Explore Active
              </RippleButton>
              <RippleButton 
                onClick={openModal}
                className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-500 transition flex items-center gap-2"
              >
                <Phone size={18} /> Contact Now
              </RippleButton>
            </motion.div>
          </div>

          {/* Kolase Gambar */}
          <div className="w-full max-w-xl ml-auto max-sm:hidden">
            <div className="grid grid-cols-4 gap-4 h-[28rem]">
              {/* Gambar Trade (kiri atas) */}
              <motion.div
                whileHover={{
                  rotateY: 10,
                  rotateX: -10,
                  scale: 1.02
                }}
                transition={{ type: "spring" }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative h-full rounded-lg col-span-2"
              >
                <Image
                  src="https://images.unsplash.com/photo-1489450278009-822e9be04dff?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Trade"
                  fill
                  className="object-cover rounded-lg"
                />
              </motion.div>

              {/* Gambar Document (kanan atas) */}
              <motion.div
                whileHover={{
                  rotateY: 10,
                  rotateX: -10,
                  scale: 1.02
                }}
                transition={{ type: "spring" }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative row-span-3 col-span-2"
              >
                <Image
                  src="https://plus.unsplash.com/premium_photo-1744395627469-f4e5ef92f627?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D"
                  alt="Document"
                  fill
                  className="object-cover rounded-lg"
                />
              </motion.div>

              {/* Gambar Logistics (kiri bawah) */}
              <motion.div
                whileHover={{
                  rotateY: 10,
                  rotateX: -10,
                  scale: 1.02
                }}
                transition={{ type: "spring" }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative col-span-2"
              >
                <Image
                  src="/assets/business_affiliated/logistic.png"
                  alt="Logistics"
                  fill
                  className="object-cover rounded-lg"
                />
              </motion.div>

              {/* Gambar Motorcycle (kanan bawah) */}
              <motion.div
                whileHover={{
                  rotateY: 10,
                  rotateX: -10,
                  scale: 1.02
                }}
                transition={{ type: "spring" }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative col-span-2"
              >
                <Image
                  src="https://plus.unsplash.com/premium_photo-1683134585562-092298961f35?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Motorcycle"
                  fill
                  className="object-cover rounded-lg"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform translate-x-1/3 max-sm:-translate-x-10 max-sm:mr-2 cursor-pointer"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1,
          duration: 0.6,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        onClick={handleScrollClick}
      >
        <ChevronDown className="w-10 h-10 text-white" />
      </motion.div>

      {/* Contact Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Contact Form Modal"
      >
        <div className="bg-white">
          {/* Modal Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">Contact Us</h2>
            <button 
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Modal Body */}
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="formMessage" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="formMessage"
                  name="formMessage"
                  value={formData.formMessage}
                  onChange={(e) => setFormData({ ...formData, formMessage: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-4 rounded-lg transition duration-200"
              >
                Send via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default HeroSection;