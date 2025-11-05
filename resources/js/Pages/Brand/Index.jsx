import React, { useState } from "react";
import Header from "@/Components/layout/Header";
import Footer from "@/Components/layout/Footer";
import ExportMethod from "@/Components/ExportMethod";
import MotorcycleData from '@/Components/MotorcycleData';
import HelperButton from "@/Components/HelperButton";
import SponsorList from "@/Components/SponsorList";
import BreadCrumbs from "@/Components/BreadCrumbs";
import { usePage } from '@inertiajs/react';

import SeoHead from "@/Components/SeoHead";

import useFetchData from "@/Hooks/useFetchData";

const BrandPage = ({ brand }) => {
    const [activeCategory, setActiveCategory] = useState("/");
    const { data, loading, error } = useFetchData("/api/public");
    const { props } = usePage();
    const currentLang = props.lang;
    const {
        data: langData,
        loading: langLoading,
        error: langError
    } = useFetchData("/assets/lang/language.json");

    const breadcrumbItems = [
        { name: langData?.[16]?.lang?.[currentLang]?.home ?? 'Home', href: '/' },
        { name: langData?.[16]?.lang?.[currentLang]?.brand ?? 'Brand', href: '/#product-list' },
        { name: langData?.[16]?.lang?.[currentLang]?.product ?? 'Products', href: '/#product-list' },
        { name: langData?.[16]?.lang?.[currentLang]?.motorcycle ?? 'Motorcycles', href: '/products/motorcycles' },
    ];

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
            <Header activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />

            <section id="breadcrumbs" className="max-w-7xl mx-auto px-4 pt-16 pb-8 mt-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <BreadCrumbs items={breadcrumbItems} />
                </div>
            </section>

            {brand?.brand_banner && (
                <section className="flex max-w-7xl mx-auto px-4 flex-col mb-8 justify-center align-middle items-center">
                    <img src={'/storage/' + brand?.brand_banner} className="w-full select-none pointer-events-none" alt={"asset-" + brand?.slug + "-banner-image"} draggable="false" onContextMenu={(e) => e.preventDefault()} />
                </section>
            )}

            <section id="product-list" className="flex max-w-7xl mx-auto flex-col justify-center align-middle items-center">
                <MotorcycleData lang={langData?.[13]?.lang?.[currentLang] || []} brand={brand?.slug} />
            </section>

            <section id="helper-button" className="md:max-w-7xl max-w-full mx-auto px-0 py-16">
                <HelperButton data={data?.data?.links} lang={langData?.[6]?.lang?.[currentLang] || []} />
            </section>

            <Footer data={data?.data?.links} lang={langData?.[7]?.lang?.[currentLang] || []} />
        </div>
    );
};

export default BrandPage;
