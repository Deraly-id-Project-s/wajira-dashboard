

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

import { usePage } from '@inertiajs/react';

import useFetchData from "@/Hooks/useFetchData";

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState("/");
  const { data, loading, error } = useFetchData("/api/public");
  const { props } = usePage();
  const currentLang = props.lang;
  const {
    data: langData,
    loading: langLoading,
    error: langError
  } = useFetchData("/assets/lang/language.json");

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
    <div id="page-content" className="min-h-screen bg-white max-sm:overflow-x-hidden">
      {/* Navigation Bar */}
      <Header
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Hero Section */}
      <section id="hero_section">
        <HeroSection activeCategory={activeCategory} onScrollDown={scrollToViewer} data={data?.data?.banners} lang={langData?.[0]?.lang?.[currentLang] || []} />
      </section>

      <section id="product-and-service" className="flex flex-col justify-center align-middle items-center py-16 px-1 mx-auto">
        <ProductAndService lang={langData?.[1]?.lang?.[currentLang] || []} />
      </section>

      <section id="sponsor-list" className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-14">
          <div>
            <h2 className="text-[32px] md:text-3xl font-bold text-gray-800">
              {langData?.[2]?.lang?.[currentLang]?.title ?? 'Search by Brands'}
            </h2>
            <p className="text-gray-500 text-[14px] mt-2">
              {langData?.[2]?.lang?.[currentLang]?.desc ?? 'This is text field, you could write everything you want to talk'}
            </p>
          </div>

          <RippleButton className="mt-4 md:mt-0 flex items-center bg-[#A6160A] text-white px-5 py-4 text-sm hover:bg-[#8f1208] transition-all">
            {langData?.[2]?.lang?.[currentLang]?.btn ?? 'More Brands'} <ArrowRight size={16} className="ml-2" />
          </RippleButton>
        </div>
        <SponsorList data={data?.data?.brands} />
      </section>

      <section id="helper-button" className="md:max-w-7xl max-w-full mx-auto px-0 py-16">
        <HelperButton data={data?.data?.links} lang={langData?.[3]?.lang?.[currentLang] || []} />
      </section>

      <section id="product-list" className="flex max-w-7xl mx-auto flex-col justify-center align-middle items-center">
        <h2 className="text-[57px] p-[100px] font-bold mb-2 text-center">
          {langData?.[4]?.lang?.[currentLang]?.title ?? 'Featured Listing'}
        </h2>
        <ProductList lang={langData?.[4]?.lang?.[currentLang] || []} productLang={langData?.[18]?.lang?.[currentLang] || []} />
      </section>

      <section id="reason-choose">
        <ReasonChoose lang={langData?.[5]?.lang?.[currentLang] || []} />
      </section>

      <GetInTouch data={data?.data?.links} lang={langData?.[6]?.lang?.[currentLang] || []} />
      {/* <UserAnalytics /> */}

      <Footer data={data?.data?.links} lang={langData?.[7]?.lang?.[currentLang] || []} />
    </div>
  );
};

export default HomePage;