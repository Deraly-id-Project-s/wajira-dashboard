import React, { useState } from "react";
import Header from "@/Components/layout/Header";
import Footer from "@/Components/layout/Footer";
import HeroSection from "@/Components/HeroSection";
import AboutUs from "@/Components/AboutUs";
import VisionMission from '@/Components/VisionMission';
import GetInTouch from "@/Components/GetInTouch";
import { usePage } from '@inertiajs/react';

import SeoHead from "@/Components/SeoHead";

import useFetchData from "@/Hooks/useFetchData";

const AboutUsPage = () => {
  const [activeCategory, setActiveCategory] = useState("/");
  const { data, loading, error } = useFetchData("/api/public");
  const { props } = usePage();
  const currentLang = props.lang;
  const {
    data: langData,
    loading: langLoading,
    error: langError
  } = useFetchData("/assets/lang/language.json");

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
      {/* SEO Fig */}
      <SeoHead />
      
      {/* Navigation Bar */}
      <Header
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Hero Section */}
      <HeroSection activeCategory={activeCategory} onScrollDown={scrollToViewer} lang={langData?.[0]?.lang?.[currentLang] || []} />

      <section id="about-us">
        <AboutUs lang={langData?.[10]?.lang?.[currentLang] || []} />
      </section>

      <section id="visiton-mission">
        <VisionMission lang={langData?.[11]?.lang?.[currentLang] || []} />
      </section>

      <GetInTouch data={data?.data?.links} lang={langData?.[6]?.lang?.[currentLang] || []} />

      <Footer data={data?.data?.links} lang={langData?.[7]?.lang?.[currentLang] || []} />
    </div>
  );
};

export default AboutUsPage;