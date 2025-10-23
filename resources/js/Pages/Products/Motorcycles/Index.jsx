import React, { useState } from "react";
import Header from "@/Components/layout/Header";
import Footer from "@/Components/layout/Footer";
import ExportMethod from "@/Components/ExportMethod";
import MotorcycleData from '@/Components/MotorcycleData';
import HelperButton from "@/Components/HelperButton";
import SponsorList from "@/Components/SponsorList";
import BreadCrumbs from "@/Components/BreadCrumbs";

import useFetchData from "@/Hooks/useFetchData";

const ProductsPage = () => {
    const [activeCategory, setActiveCategory] = useState("/");
    const { data, loading, error } = useFetchData("/api/public");

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

            <section id="breadcrumbs" className="max-w-7xl mx-auto px-4 pt-16 pb-8 mt-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <BreadCrumbs items={breadcrumbItems} />
                </div>
            </section>

            <section id="export-method">
                <ExportMethod />
            </section>

            <section id="sponsor-list" className="max-w-7xl mx-auto px-4 py-16">
                <SponsorList data={data?.data?.brands} />
            </section>

            <section id="product-list" className="flex max-w-7xl mx-auto flex-col justify-center align-middle items-center">
                <MotorcycleData />
            </section>

            <section id="helper-button" className="md:max-w-7xl max-w-full mx-auto px-0 py-16">
                <HelperButton />
            </section>

            <Footer data={data?.data?.links} />
        </div>
    );
};

export default ProductsPage;
