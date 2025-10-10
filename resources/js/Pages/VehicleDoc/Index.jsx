import React, { useState } from "react";
import Header from "@/Components/layout/Header";
import Footer from "@/Components/layout/Footer";
import HeroSection from "@/Components/HeroSection";
import ProductAndService from '@/Components/ProductAndService';

const VehicleDoc = () => {
    const [activeCategory, setActiveCategory] = useState("/");

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
    };

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

            <Footer />
      </div>
    );
}

export default VehicleDoc;