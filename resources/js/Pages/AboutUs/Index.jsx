import React, { useState } from "react";
import Header from "@/Components/layout/Header";
import Footer from "@/Components/layout/Footer";
import HeroSection from "@/Components/HeroSection";
// import CategoryCarousel from "@/Components/CategoryCarousel";
import AboutUs from "@/Components/AboutUs";
// import BusinessFlow from '@/Components/BusinessFlow';
import VisionMission from '@/Components/VisionMission';
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

      <AboutUs />

      <VisionMission />

      <GetInTouch />
      {/* <UserAnalytics /> */}

      <Footer />
    </div>
  );
};

export default HomePage;