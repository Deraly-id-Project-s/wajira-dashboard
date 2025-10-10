import React, { useState } from "react";
import Header from "@/Components/layout/Header";
import Footer from "@/Components/layout/Footer";
import WajiraGallery from "@/Components/WajiraGallery";
import GetInTouch from "@/Components/GetInTouch";

const GalleryPage = () => {
    const [activeCategory, setActiveCategory] = useState("/");
    const breadcrumbItems = [
        { name: 'Home', href: '/' },
        { name: 'Products', href: '/products' },
        // { name: 'Motorcycles', href: '/products/motorcycles' },
        // { name: 'Detail', href: null },
    ];

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
            <Header activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />

            <section id="page_title" className="max-w-7xl mx-auto p-4 md:p-8 mt-32 flex justify-center align-middle items-center">
                <h3 className="text-[32px]">Our Latest Post</h3>
            </section>

            <WajiraGallery />

            <GetInTouch />

            <Footer />
        </div>
    );
};

export default GalleryPage;