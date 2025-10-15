import React, { useState } from "react";
import Header from "@/Components/layout/Header";
import Footer from "@/Components/layout/Footer";
import HeroSection from "@/Components/HeroSection";
import AboutUs from "@/Components/AboutUs";
import VisionMission from '@/Components/VisionMission';
import GetInTouch from "@/Components/GetInTouch";

import useFetchData from "@/Hooks/useFetchData";

const AboutUsPage = () => {
  const [activeCategory, setActiveCategory] = useState("/");
  const { data, loading, error } = useFetchData("/api/public");

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

      <section id="about-us">
        <AboutUs />
      </section>

      <section id="visiton-mission">
        <VisionMission />
      </section>

      <GetInTouch />
      {/* <UserAnalytics /> */}

      <Footer data={data?.data?.links} />
    </div>
  );
};

export default AboutUsPage;