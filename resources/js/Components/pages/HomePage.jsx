

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
import ReasonChoose from "@/Components/ReasonChoose";
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
        <h2 className="text-[57px] p-[10px] font-bold mb-2 text-center">
          Featured Listing
        </h2>
        <ProductList />
      </div>

      <ReasonChoose />

      {/* <UserAnalytics /> */}

      <Footer />
    </div>
  );
};

export default HomePage;