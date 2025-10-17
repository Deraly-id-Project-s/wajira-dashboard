import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import Image from "@/Components/ui/image";
import RippleButton from "@/Components/ui/rippleButton";
import WhatsAppIcon from "@/Components/ui/WhatsAppIcon";
import Modal from "react-modal";

const HeroSection = ({ onScrollDown, data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);

  const heroBanners = Array.isArray(data)
    ? data
        .filter((item) => item.is_show === 1)
        .sort((a, b) => a.order - b.order)
        .map((item) => {
          return `/storage/${item.image}`;
        })
    : [];

  // ✅ fallback kalau data kosong
  const displayedBanners =
    heroBanners.length > 0
      ? heroBanners
      : ["/assets/banners/1.jpg", "/assets/banners/2.png"];

  // ✅ auto ganti banner tiap 10 detik
  useEffect(() => {
    if (displayedBanners.length === 0) return;
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % displayedBanners.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [displayedBanners.length]);

  // ✅ form modal state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    formMessage: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, phone, formMessage } = formData;
    const fullName = `${firstName} ${lastName}`;
    const waNumber = "6287883531313";
    const message = `Halo, saya ${fullName}%0AEmail: ${email}%0APhone: ${phone}%0A${formMessage}`;
    const waUrl = `https://api.whatsapp.com/send?phone=${waNumber}&text=${message}`;
    window.open(waUrl, "_blank");
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

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "500px",
      width: "90%",
      borderRadius: "12px",
      padding: "0",
      border: "none",
      overflow: "hidden",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
      backdropFilter: "blur(5px)",
    },
  };

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden">
      {/* 🖼️ Hero Background */}
      <motion.div
        key={currentBanner}
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <Image
          src={displayedBanners[currentBanner]}
          alt={`Banner ${currentBanner + 1}`}
          className="w-full h-full object-cover"
          fill
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
      </motion.div>

      {/* 🧱 Hero Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 md:px-16">
        <div className="flex flex-row gap-10 items-center w-full max-w-7xl">
          <div className="flex flex-col justify-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[45px] md:text-5xl max-w-[678px] font-light text-white mt-2"
            >
              SMART TRADE, SHIPPING & EXPORT SERVICES
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mt-4 text-white max-w-[700px] text-[22px] max-sm:text-lg"
            >
              Wajira Jagrata Corps delivers smart solutions in exports,
              logistics, and vehicle services.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-white max-w-[700px] text-[22px] max-sm:text-lg"
            >
              From motorcycles to key commodities, we connect Indonesia to
              global markets with trusted shipping and end-to-end support.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="mt-8 flex gap-4"
            >
              <RippleButton
                onClick={() => setIsModalOpen(true)}
                className="bg-[#198038] text-white font-light px-6 py-3 rounded-lg shadow-md hover:brightness-95 transition flex items-center gap-2"
              >
                <span className="flex flex-row gap-3 justify-center items-center">
                  WhatsApp <WhatsAppIcon className="w-4 h-4 text-white" />
                </span>
              </RippleButton>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
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

      {/* Modal Contact Form */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
        contentLabel="Contact Form Modal"
      >
        <div className="bg-white">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">Contact Us</h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="formMessage"
                  value={formData.formMessage}
                  onChange={handleInputChange}
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
    </div>
  );
};

export default HeroSection;
