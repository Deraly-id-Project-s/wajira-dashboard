import { ArrowRight } from "lucide-react";
import Header from "@/Components/layout/Header";
import Footer from "@/Components/layout/Footer";
import BreadCrumbs from "@/Components/BreadCrumbs";
import HelperButton from "@/Components/HelperButton";
import RecomendationProductList from "@/Components/RecomendationProductList";
import MotorcycleDescriptionContainer from "@/Components/MotorcycleDescriptionContainer";

const MotocyclesDetail = () => {
    const breadcrumbItems = [
        { name: 'Home', href: '/' },
        { name: 'Products', href: '/products' },
        { name: 'Motorcycles', href: '/products/motorcycles' },
        { name: 'Detail', href: null },
    ];

    return (
        <section id="motocycle-detail" className="min-h-screen bg-white max-sm:overflow-x-hidden">
            <Header />

            <section className="max-w-7xl mx-auto px-4 pt-16 pb-8 mt-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <BreadCrumbs items={breadcrumbItems} />
                </div>
            </section>

            <section id="page_title" className="max-w-7xl mx-auto p-4 md:p-8 mt-32 flex justify-center align-middle items-center">
                <h3 className="text-[32px]">Vehicle Spesification</h3>
            </section>

            <MotorcycleDescriptionContainer />

            <HelperButton />

            <div className="flex max-w-7xl mx-auto flex-col justify-center align-middle items-center">
                <h2 className="text-[32px] p-[100px] mb-2 text-center">
                    Our Recommendation
                </h2>
                <RecomendationProductList />
            </div>        

            <div className="md:max-w-7xl max-w-full mx-auto px-0 py-16 justify-center align-middle items-center flex">
                <a href="/products/motorcycles" className="flex flex-row justify-center align-middle items-center w-[143px] h-[48px] gap-2 p-5 bg-[#B0160D] text-white text-[14px]">
                    View More
                    <ArrowRight />
                </a>
            </div>

            <Footer />
        </section>
    );
}

export default MotocyclesDetail;