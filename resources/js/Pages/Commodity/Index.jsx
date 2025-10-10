import React, { useState } from "react";
import Header from "@/Components/layout/Header";
import Footer from "@/Components/layout/Footer";
import BreadCrumbs from "@/Components/BreadCrumbs";
import Commodities from "@/Components/Commodities";
import HelperButton from "@/Components/HelperButton";

const CommodityPage = () => {
    const [activeCategory, setActiveCategory] = useState("/commodity");
    const breadcrumbItems = [
        { name: 'Home', href: '/' },
        { name: 'Commodity', href: '/commodity' },
        // { name: 'Motorcycles', href: '/products/motorcycles' },
        // { name: 'Detail', href: null },
    ];

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

            <section id="breadcrumbs" className="max-w-7xl mx-auto pt-16 pb-8 mt-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <BreadCrumbs items={breadcrumbItems} />
                </div>
            </section>

            <section id="header-title" className="max-w-7xl mx-auto justify-start py-10">
                <span className="text-[14px]">Operated by</span>
                <h3 className="text-[32px]">PT Wajira Jagratara Inter Nasional</h3>
                <p className="text-[16px]">Expansion of international business network including overseas cooperation and global market development</p>
            </section>

            <Commodities />

            <section id="word" className="max-w-7xl mx-auto flex flex-col items-center justify-center px-[168px] py-[96px] space-y-16">
                <span className="font-times" style={{ fontFamily: "Times New Roman" }}>
                    Enhance your life with these authentic and beautifully made products—where tradition meets quality and style.
                </span>
            </section>
    
            <HelperButton />
            
            <Footer />
        </div>
    );
}

export default CommodityPage;