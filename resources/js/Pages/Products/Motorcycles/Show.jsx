import { ArrowRight } from "lucide-react";
import Header from "@/Components/layout/Header";
import Footer from "@/Components/layout/Footer";
import { Head, usePage } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import BreadCrumbs from "@/Components/BreadCrumbs";
import HelperButton from "@/Components/HelperButton";
import MainLoading from "@/Components/ui/MainLoading";
import RippleButton from "@/Components/ui/rippleButton";
import MotorcycleColor from "@/Components/MotorcycleColor";
import MotorcycleViewer from "@/Components/MotorcycleViewer";
import RecomendationProductList from "@/Components/RecomendationProductList";
import MotorcycleDescriptionContainer from "@/Components/MotorcycleDescriptionContainer";

import SeoHead from "@/Components/SeoHead";

import useFetchData from "@/Hooks/useFetchData";

const MotocyclesDetail = (slug) => {
    const [activeCategory, setActiveCategory] = useState("/");
    const { data, loading, error } = useFetchData("/api/public");
    const { motorcycle } = usePage().props;
    const { props } = usePage();
    const currentLang = props.lang;
    const {
        data: langData,
        loading: langLoading,
        error: langError,
    } = useFetchData("/assets/lang/language.json");

    const [selectedVariant, setSelectedVariant] = useState(null);

    useEffect(() => {
        if (motorcycle?.variants?.length > 0) {
            setSelectedVariant(motorcycle.variants[0]);
        }
    }, [motorcycle]);

    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center py-12">
                <MainLoading text="Load Gallery Data..." />
            </div>
        );
    }

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
    };

    const handleVariantChange = (variant) => {
        setSelectedVariant(variant);
    };

    const breadcrumbItems = [
        { name: langData?.[16]?.lang?.[currentLang]?.home ?? "Home", href: "/" },
        {
            name: langData?.[16]?.lang?.[currentLang]?.product ?? "Products",
            href: "/#product-list",
        },
        {
            name:
                langData?.[16]?.lang?.[currentLang]?.motorcycle ??
                "Motorcycles",
            href: "/products/motorcycles",
        },
        {
            name: langData?.[16]?.lang?.[currentLang]?.detail ?? "Detail",
            href: null,
        },
    ];

    const formatVariantName = (slug) => {
        if (!slug) return "";
        return slug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    return (
        <section
            id="motocycle-detail"
            className="min-h-screen bg-white max-sm:overflow-x-hidden"
        >
            {/* SEO Fig */}
            <SeoHead />


            <Header
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
            />

            <section id="breadcrumb-items" className="max-w-7xl mx-auto px-4 pt-16 pb-8 mt-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <BreadCrumbs items={breadcrumbItems} />
                </div>
            </section>

            <section id="product-name" className="max-w-7xl mx-auto px-4 mt-12 flex justify-center align-middle items-center">
                <h1 className="text-[32px] font-semibold">{motorcycle?.name}</h1>
            </section>

            {/* === Motorcycle Variants Section === */}
            {motorcycle?.variants && motorcycle.variants.length > 1 && (
                <section
                    id="variant-selector"
                    className="max-w-7xl mx-auto mt-12 flex flex-col justify-center align-middle items-center"
                >
                    <div className="flex flex-wrap gap-2 px-4 md:px-0">
                        {motorcycle.variants.map((variant) => {
                            const isActive = selectedVariant?.id === variant.id;
                            return (
                                <button
                                    key={variant.id}
                                    onClick={() => handleVariantChange(variant)}
                                    className={`relative font-semibold text-sm md:text-base px-8 py-2 text-center transition-all duration-300 skew-x-[-20deg] ${isActive
                                            ? "bg-[#173958] text-white"
                                            : "bg-[#E7ECF6] text-[#173958]"
                                        }`}
                                >
                                    <span className="block skew-x-[20deg]">
                                        {variant?.name}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </section>
            )}


            {/* === Motorcycle Colors Section === */}
            {selectedVariant?.colors && selectedVariant.colors.length > 0 && (
                <section
                    id="color-selector"
                    className="max-w-7xl mx-auto flex flex-col mt-12"
                >
                    <h2 className="text-[32px] py-[20px] md:px-0 px-4 mb-12">
                        {(langData?.[15]?.lang?.[currentLang]?.label?.[0]) ??
                            "Color Variant"}{" "}
                        {motorcycle.name}
                    </h2>
                    <MotorcycleColor data={selectedVariant.colors} />
                </section>
            )}

            {/* === 360 Viewer Section === */}
            {motorcycle?.image_360 && motorcycle.image_360.length > 0 && (
                <section id="360-viewer" className="max-w-7xl mx-auto flex flex-col mt-32">
                    <MotorcycleViewer
                        data={motorcycle.image_360}
                        modelId="aerox-alpha"
                        initialColor="black"
                    />
                </section>
            )}

            <section
                id="page_title"
                className="max-w-7xl mx-auto p-4 md:p-8 flex justify-center align-middle items-center"
            >
                <h3 className="text-[32px]">{(langData?.[15]?.lang?.[currentLang]?.label?.[5]) ?? "Vehicle Spesification"}</h3>
            </section>

            <MotorcycleDescriptionContainer motorcycle={motorcycle} lang={langData?.[15]?.lang?.[currentLang]} />

            <section
                id="helper-button"
                className="md:max-w-7xl max-w-full mx-auto px-0 py-16"
            >
                <HelperButton data={data?.data?.links} lang={langData?.[6]?.lang?.[currentLang] || []} />
            </section>

            <div className="flex max-w-7xl mx-auto flex-col justify-center align-middle items-center">
                <h2 className="text-[32px] p-[100px] mb-2 text-center">
                    {(langData?.[15]?.lang?.[currentLang]?.label?.[2]) ?? "Our Recommendation"}
                </h2>
                <RecomendationProductList lang={(langData?.[15]?.lang?.[currentLang])} />
            </div>

            <div className="w-full justify-center items-center flex py-[32px] md:mt-20">
                    <a href="/products/motorcycles" className="block">
                      <RippleButton className="flex flex-row justify-center items-center px-[16px] py-[15px] max-w-[272px] gap-[8px] text-white bg-[#B0160D] font-light text-[14px] cursor-pointer">
                        <span>{langData?.[4]?.lang?.[currentLang]?.btn ?? "View More"}</span> <ArrowRight />
                      </RippleButton>
                    </a>
                  </div>

            <Footer data={data?.data?.links} lang={langData?.[7]?.lang?.[currentLang] || []} />
        </section>
    );
};

export default MotocyclesDetail;
