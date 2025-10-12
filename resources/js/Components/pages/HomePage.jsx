

import React, { useState } from "react";
import Header from "@/Components/layout/Header";
import Footer from "@/Components/layout/Footer";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/Components/HeroSection";
// import CategoryCarousel from "@/Components/CategoryCarousel";
import RippleButton from "@/Components/ui/rippleButton";
// import BusinessFlow from '@/Components/BusinessFlow';
import ProductAndService from '@/Components/ProductAndService';
import ProductList from '@/Components/ProductList';
// import VisionMission from "@/Components/VisionMission";
import ReasonChoose from "@/Components/ReasonChoose";
import HelperButton from "@/Components/HelperButton";
import SponsorList from "@/Components/SponsorList";
import GetInTouch from "@/Components/GetInTouch";
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

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-14">
          <div>
            <h2 className="text-[32px] md:text-3xl font-bold text-gray-800">
              Search by Brands
            </h2>
            <p className="text-gray-500 text-[14px] mt-2">
              This is text field, you could write everything you want to talk
            </p>
          </div>

          <RippleButton className="mt-4 md:mt-0 flex items-center bg-[#A6160A] text-white px-5 py-4 text-sm hover:bg-[#8f1208] transition-all">
            More Brands <ArrowRight size={16} className="ml-2" />
          </RippleButton>
        </div>
        <SponsorList />
      </section>

      <HelperButton />

      <div className="flex max-w-7xl mx-auto flex-col justify-center align-middle items-center">
        <h2 className="text-[57px] p-[100px] font-bold mb-2 text-center">
          Featured Listing
        </h2>
        <ProductList />
      </div>

      <ReasonChoose />

      <GetInTouch />
      {/* <UserAnalytics /> */}

      <Footer />
    </div>
  );
};

export default HomePage;