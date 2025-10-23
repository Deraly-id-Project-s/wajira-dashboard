import React, { useState } from "react";
import MainLoading from "@/Components/ui/MainLoading";
import { ArrowRight } from "lucide-react";
import Header from "@/Components/layout/Header";
import Footer from "@/Components/layout/Footer";
import { Head, usePage } from "@inertiajs/react";
import BreadCrumbs from "@/Components/BreadCrumbs";
import HelperButton from "@/Components/HelperButton";
import MotorcycleColor from "@/Components/MotorcycleColor";
import MotorcycleViewer from "@/Components/MotorcycleViewer";
import RecomendationProductList from "@/Components/RecomendationProductList";
import MotorcycleDescriptionContainer from "@/Components/MotorcycleDescriptionContainer";

import useFetchData from "@/Hooks/useFetchData";

const MotocyclesDetail = (slug) => {
    const [activeCategory, setActiveCategory] = useState("/");
    const { data, loading, error } = useFetchData("/api/public");
    const { motorcycle } = usePage().props;

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

    const breadcrumbItems = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: "Motorcycles", href: "/products/motorcycles" },
        { name: "Detail", href: null },
    ];

    return (
        <section
            id="motocycle-detail"
            className="min-h-screen bg-white max-sm:overflow-x-hidden"
        >
            <Header activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />

            <section className="max-w-7xl mx-auto px-4 pt-16 pb-8 mt-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <BreadCrumbs items={breadcrumbItems} />
                </div>
            </section>

            {/* === Motorcycle Colors Section === */}
            {motorcycle?.colors && motorcycle.colors.length > 0 && (
                <section id="color-selector" className="max-w-7xl mx-auto flex flex-col">
                    <h2 className="text-[32px] py-[20px] md:px-0 px-4 mb-12">
                        Color Variant Yamaha Aerox Alpha
                    </h2>
                    <MotorcycleColor data={motorcycle.colors} />
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
                className="max-w-7xl mx-auto p-4 md:p-8 mt-32 flex justify-center align-middle items-center"
            >
                <h3 className="text-[32px]">Vehicle Spesification</h3>
            </section>

            <MotorcycleDescriptionContainer motorcycle={motorcycle} />

            <section
                id="helper-button"
                className="md:max-w-7xl max-w-full mx-auto px-0 py-16"
            >
                <HelperButton data={data?.data?.links} />
            </section>

            <div className="flex max-w-7xl mx-auto flex-col justify-center align-middle items-center">
                <h2 className="text-[32px] p-[100px] mb-2 text-center">
                    Our Recommendation
                </h2>
                <RecomendationProductList />
            </div>

            <div className="md:max-w-7xl max-w-full mx-auto px-0 py-16 justify-center align-middle items-center flex">
                <a
                    href="/products/motorcycles"
                    className="flex flex-row justify-center align-middle items-center w-[143px] h-[48px] gap-2 p-5 bg-[#B0160D] text-white text-[14px]"
                >
                    View More
                    <ArrowRight />
                </a>
            </div>

            <Footer data={data?.data?.links} />
        </section>
    );
};

export default MotocyclesDetail;
