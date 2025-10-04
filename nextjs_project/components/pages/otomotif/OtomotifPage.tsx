"use client"

import React, { useState } from "react";
import { Phone } from "lucide-react";
import Header from "@/../components/layout/Header";
import Footer from "@/../components/layout/Footer";
import HeroSection from "@/../components/HeroSection";
import NewsPaper from "@/../components/NewsPaper";
import MotorcycleCards from "@/../components/MotorcycleCards";
import RippleButton from "@/../components/ui/rippleButton";

const HomePage = () => {
  // State for the currently selected category
  const [activeCategory, setActiveCategory] = useState("/product/otomotif");

  // Function to handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    if (category === "/product/otomotif") {
      window.location.href = "/product/otomotif";
    } else if (category === "") {
      window.location.href = "/";
    }
  };

  // Function to scroll to the viewer section
  const scrollToViewer = () => {
    const viewerSection = document.getElementById("viewer-section");
    if (viewerSection) {
      viewerSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation Bar */}
      <Header 
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Hero Section */}
      <HeroSection activeCategory={activeCategory} onScrollDown={scrollToViewer} />

      {/* Scroll Indicator */}
      {/* <ScrollIndicator onScrollDown={scrollToViewer} /> */}

      {/* 3D Viewer Section */}
      <section id="viewer-section" className="pt-24 pb-16 px-6 max-sm:px-2">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Motorcycles Preview
          </h2>
          <MotorcycleCards/>
        </div>
      </section>

      {/* 3D Viewer Section */}
      {/* <section id="viewer-section" className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {motorcycleModels.find((m) => m.id === currentModel)?.name ||
              "Motorcycle"}{" "}
            Preview
          </h2>

          <MotorcycleViewer
            modelId={currentModel}
            initialColor={currentColor}
            onModelChange={handleModelChange}
          />
        </div>
      </section> */}

      {/* Product Grid Section */}
      <section className="py-16 px-6 bg-orange-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center">
            Motocycle Sparepart
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Need sparepart? Please contact us to check the availability of goods.
          </p>

          <div className="flex flex-col justify-center align-middle items-center">
            <RippleButton className="px-5 py-3 shadow-md hover:bg-yellow-400 duration-150 rounded-lg bg-yellow-300 flex flex-row gap-2">
              <Phone /> Contact Now
            </RippleButton>
          </div>

        </div>
      </section>

      {/* Product Grid Section */}
      <section className="py-16 px-6 bg-white">
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

export default HomePage;