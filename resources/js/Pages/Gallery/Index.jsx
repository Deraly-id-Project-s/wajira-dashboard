import React, { useState } from "react";
import Header from "@/Components/layout/Header";
import Footer from "@/Components/layout/Footer";
import WajiraGallery from "@/Components/WajiraGallery";
import GetInTouch from "@/Components/GetInTouch";
import MainLoading from "@/Components/ui/MainLoading";
import { usePage } from '@inertiajs/react';

import SeoHead from "@/Components/SeoHead";

import useFetchData from "@/Hooks/useFetchData";

const GalleryPage = () => {
    const [activeCategory, setActiveCategory] = useState("/");
    const { data, loading, error } = useFetchData("/api/public");
    const { props } = usePage();
    const currentLang = props.lang;
    const {
        data: langData,
        loading: langLoading,
        error: langError
    } = useFetchData("/assets/lang/language.json");

    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center py-12">
                <MainLoading text="Load Gallery Data..." />
            </div>
        )
    }

    // Function to handle category change
    const handleCategoryChange = (category) => {
        setActiveCategory(category);
    };

    return (
        <div className="min-h-screen bg-white max-sm:overflow-x-hidden">
            {/* SEO Fig */}
            <SeoHead />
            
            {/* Navigation Bar */}
            <Header activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />

            <section id="gallery_post_title" className="max-w-7xl mx-auto p-4 md:p-8 mt-32 flex justify-center align-middle items-center">
                <h3 className="text-[32px]">{langData?.[9]?.lang[currentLang] ?? "Our Latest Post"}</h3>
            </section>

            <section id="wajira-gallery" className="max-w-7xl mx-auto p-4 md:p-8">
                <WajiraGallery data={data?.data?.galleries} />
            </section>

            <GetInTouch data={data?.data?.links} lang={langData?.[6]?.lang?.[currentLang] || []} />

            <Footer data={data?.data?.links} lang={langData?.[7]?.lang?.[currentLang] || []} />
        </div>
    );
};

export default GalleryPage;