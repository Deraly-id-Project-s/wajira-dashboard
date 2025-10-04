"use client"

import React, { useState } from "react";
import Header from "@/../components/layout/Header";
import Footer from "@/../components/layout/Footer";
import TransportationSection from "@/../components/TransportationSection";
import NewsPaper from "@/../components/NewsPaper";
import ExpeditionSpanner from "@/../components/ExpeditionSpanner";
import LogisticBusiness from "@/../components/LogisticBusiness";
import { motion } from "framer-motion";
import Image from "@/Components/ui/image";

const ExpeditionPage = (): React.JSX.Element => {
    // State for the currently selected motorcycle model and color
    // State for the currently selected category
    const [activeCategory, setActiveCategory] = useState("/product/expedition");

    // Function to handle category change
    const handleCategoryChange = (category: string) => {
        setActiveCategory(category);
    };

    // Function to scroll to the viewer section
    const scrollToViewer = () => {
        const viewerSection = document.getElementById("viewer-section");
        if (viewerSection) {
            viewerSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="min-h-screen  overflow-x-hidden">
            {/* Navigation Bar */}
            <Header
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
            />

            {/* Hero Section */}
            <TransportationSection />

            {/* <section id="expedition_description" className="flex flex-col items-center justify-center py-16 px-4 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-4 text-center"
        >
            PT. WAJIRA JAGRATARA TRASINDO
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-700 text-center mb-8 max-w-5xl"
        >
          We provide end-to-end logistics solutions—from local distribution to international freight—ensuring smooth operations at every stage of the journey. With a dedicated fleet of Fuso, PDD, and pickup trucks, we enable fast, secure transport for motorcycles, spare parts, and bulk cargo. Whether you're delivering across cities or exporting overseas, our logistics team offers real-time coordination and tailored support to meet your needs. By streamlining workflows and maintaining delivery precision, we help your business stay on schedule, exceed customer expectations, and scale confidently in today's fast-paced market.
        </motion.p>
      </section> */}

            {/* Animated Info Section */}
            <section id="expedition-info" className="flex flex-col items-center justify-center py-16 px-4 max-w-6xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mb-4 text-center"
                >
                    Why Choose Our Expedition & Logistics Services?
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-gray-700 text-center mb-8 max-w-2xl"
                >
                    We provide reliable, efficient, and secure transportation solutions tailored to your business needs. Our experienced team ensures your goods arrive safely and on time, every time.
                </motion.p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        whileHover={{
                            scale: 1.05,
                            y: -5,
                            rotate: 2,
                            backgroundColor: "#fffbe6",
                            boxShadow: '0px 2px 7px rgba(0, 0, 0, 0.15)',
                        }}
                        viewport={{ once: true }}
                        className="bg-yellow-50 rounded-lg shadow p-6 flex flex-col items-center transition-all duration-300 ease-in-out cursor-pointer"
                    >
                        <span className="text-yellow-400 text-4xl mb-2">🚚</span>
                        <h3 className="font-semibold text-lg mb-2 text-center">
                            Fast & Safe Delivery
                        </h3>
                        <p className="text-gray-600 text-center text-sm">
                            Your cargo is delivered quickly and securely with real-time tracking.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        viewport={{ once: true }}
                        whileHover={{
                            scale: 1.05,
                            y: -5,
                            rotate: 2,
                            backgroundColor: "#fffbe6",
                            boxShadow: '0px 2px 7px rgba(0, 0, 0, 0.15)',
                        }}
                        className="bg-yellow-50 rounded-lg shadow p-6 flex flex-col items-center transition-all duration-300 ease-in-out cursor-pointer"
                    >
                        <span className="text-yellow-400 text-4xl mb-2">📦</span>
                        <h3 className="font-semibold text-lg mb-2 text-center">Flexible Solutions</h3>
                        <p className="text-gray-600 text-center text-sm">
                            We offer a range of logistics options to fit your unique requirements.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.7 }}
                        viewport={{ once: true }}
                        whileHover={{
                            scale: 1.05,
                            y: -5,
                            rotate: 2,
                            backgroundColor: "#fffbe6",
                            boxShadow: '0px 2px 7px rgba(0, 0, 0, 0.15)',
                        }}
                        className="bg-yellow-50 rounded-lg shadow p-6 flex flex-col items-center transition-all duration-300 ease-in-out cursor-pointer"
                    >
                        <span className="text-yellow-400 text-4xl mb-2">🤝</span>
                        <h3 className="font-semibold text-lg mb-2 text-center">Trusted Partner</h3>
                        <p className="text-gray-600 text-center text-sm">
                            Our team is dedicated to supporting your business growth every step of the way.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Logistic Flow Section */}
            <section id="logistic-flow" className="flex flex-col items-center justify-center py-16 px-4 max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-4 text-center">
                    Our Logistic Flow
                </h2>
                <Image src="/assets/particles/logistic_expedition_flow.png" alt="Logistic Flow" width={1000} height={1000} />
            </section>

            <section id="logistic-flow" className="flex flex-col items-center justify-center py-16 px-4 max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-4 text-center">
                    How Can It Empower Your Business?
                </h2>
                <p className="text-center max-w-3xl mx-auto text-gray-600 mb-8">
                    Wajira Transportation, powered by Wajira Jagratara Corps, is an advanced fleet and logistics management system...
                </p>
                <LogisticBusiness />
            </section>


            {/* Transportation Slider Section */}
            <section className="bg-gray-50">
                <ExpeditionSpanner />
            </section>

            {/* Product Grid Section */}
            <section className="py-16 md:px-6 max-sm:px-2 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold mb-2 text-center">
                        Our Recent Articles
                    </h2>
                    <p className="text-gray-600 text-center mb-12">
                        Discover our range of products through the news below
                    </p>

                    <NewsPaper />
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default ExpeditionPage;