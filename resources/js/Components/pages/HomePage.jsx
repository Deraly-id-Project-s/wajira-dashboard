

import React, { useState } from "react";
import Header from "@/Components/layout/Header";
import Footer from "@/Components/layout/Footer";
import HeroSection from "@/Components/HeroSection";
// import CategoryCarousel from "@/Components/CategoryCarousel";
import NewsPaper from "@/Components/NewsPaper";
// import BusinessFlow from '@/Components/BusinessFlow';
import ProductAndService from '@/Components/ProductAndService';
import ProductList from '@/Components/ProductList';
// import VisionMission from "@/Components/VisionMission";
import Affiliated from "@/Components/Affiliated";
import HelperButton from "@/Components/HelperButton";
import SponsorList from "@/Components/SponsorList";
import UserAnalytics from "@/Components/UserAnalytics";

const HomePage = () => {
  // State for the currently selected motorcycle model and color
  // State for the currently selected category
  const [activeCategory, setActiveCategory] = useState("/");

  // Function to handle category change
  const handleCategoryChange = (category) => {
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
    <div className="min-h-screen bg-white max-sm:overflow-x-hidden">
      {/* Navigation Bar */}
      <Header
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Hero Section */}
      <HeroSection activeCategory={activeCategory} onScrollDown={scrollToViewer} />

      <div className="flex flex-col justify-center align-middle items-center py-16 px-1 mx-auto">
        <ProductAndService />
      </div>

      <SponsorList />

      <HelperButton />

       <div className="flex max-w-7xl mx-auto flex-col justify-center align-middle items-center">
        <h2 className="text-3xl font-bold mb-2 text-center">
          Featured Listing
        </h2>
        <ProductList />
      </div>

      <UserAnalytics />

      {/* <div className="flex flex-col justify-center align-middle items-center py-16 px-1 mx-auto bg-[#F1C232]/10 bg-opacity-60">
        <h2 className="text-3xl font-bold text-center">
          Industries We Worked On
        </h2>
        <p className="text-center mt-5 text-gray-600 max-w-xl mx-auto">
          Supporting key industries through export, logistics, and strategic trade services.
        </p>
        <Affiliated />
      </div>

      <div className="flex flex-col justify-center align-middle items-center py-16 px-1 mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-center">
          Sponsor
        </h2>
        <SponsorSlider />
      </div> */}


      {/* Product Grid Section */}
      {/* <section className="py-16 md:px-6 max-sm:px-2 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center">
            Our Recent Articles
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Discover our range of products through the news below
          </p>

          <NewsPaper />
        </div>
      </section> */}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;