import React, { useState } from "react";
import Header from "@/Components/layout/Header";
import Footer from "@/Components/layout/Footer";
import ExportMethod from "@/Components/ExportMethod";
import ProductAndService from '@/Components/ProductAndService';
import ProductList from '@/Components/ProductList';
import ReasonChoose from "@/Components/ReasonChoose";
import HelperButton from "@/Components/HelperButton";
import SponsorList from "@/Components/SponsorList";
import BreadCrumbs from "@/Components/BreadCrumbs";

const ProductsPage = () => {
    const [activeCategory, setActiveCategory] = useState("/");
    const breadcrumbItems = [
        { name: 'Home', href: '/' },
        { name: 'Products', href: '/products' },
        { name: 'Motorcycles', href: '/products/motorcycles' },
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

            <section className="max-w-7xl mx-auto px-4 pt-16 pb-8 mt-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <BreadCrumbs items={breadcrumbItems} />
                </div>
            </section>

            <ExportMethod />

            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-14">
                    <SponsorList />
                </div>
            </section>

            <div className="flex max-w-7xl mx-auto flex-col justify-center align-middle items-center">
                <ProductList />
            </div>

            <HelperButton />

            <Footer />
        </div>
    );
};

export default ProductsPage;
