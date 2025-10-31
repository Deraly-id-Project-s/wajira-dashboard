import React, { useState } from "react";
import Header from "@/Components/layout/Header";
import Footer from "@/Components/layout/Footer";
import BreadCrumbs from "@/Components/BreadCrumbs";
import Commodities from "@/Components/Commodities";
import HelperButton from "@/Components/HelperButton";
import { usePage } from '@inertiajs/react';

import SeoHead from "@/Components/SeoHead";

import useFetchData from "@/Hooks/useFetchData";

const CommodityPage = () => {
    const [activeCategory, setActiveCategory] = useState("/commodity");
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
        { name: langData?.[16]?.lang?.[currentLang]?.commodity ?? 'Commodity', href: '/commodity' },
    ];

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
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

            <section id="breadcrumbs" className="max-w-7xl md:mx-auto pt-16 pb-8 mt-12 mx-[16px]">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <BreadCrumbs items={breadcrumbItems} />
                </div>
            </section>

            <section id="header-title" className="max-w-7xl mx-auto justify-start py-10 px-[16px] md:px-0">
                <span className="text-[14px]">{langData?.[14]?.lang?.[currentLang]?.span ?? "Operated by"}</span>
                <h3 className="text-[32px]">PT Wajira Jagratara Inter Nasional</h3>
                <p className="text-[16px]">{langData?.[14]?.lang?.[currentLang]?.desc ?? "Expansion of international business network including overseas cooperation and global market development"}</p>
            </section>

            <Commodities links={data?.data?.links} lang={langData?.[14]?.lang?.[currentLang]} />

            <section id="word" className="max-w-7xl mx-auto flex flex-col items-center justify-center px-[168px] py-[96px] space-y-16">
                <span className="font-times" style={{ fontFamily: "Times New Roman" }}>
                    Enhance your life with these authentic and beautifully made products—where tradition meets quality and style.
                </span>
            </section>
            
            <section id="helper-button" className="md:max-w-7xl max-w-full mx-auto px-0 py-16">
                <HelperButton data={data?.data?.links} lang={langData?.[6]?.lang?.[currentLang] || []} />
            </section>

            <Footer data={data?.data?.links} lang={langData?.[7]?.lang?.[currentLang] || []} />
        </div>
    );
}

export default CommodityPage;