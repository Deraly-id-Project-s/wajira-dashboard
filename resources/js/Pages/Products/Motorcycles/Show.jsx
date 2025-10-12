import Header from "@/Components/layout/Header";
import BreadCrumbs from "@/Components/BreadCrumbs";
import HelperButton from "@/Components/HelperButton";
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


            <div id="view_more_button" className="max-w-7xl mx-auto p-4 md:p-8 mt-32 flex justify-center align-middle items-center">
                <a href="/products/motorcycles" className="bg-[#B0160D] text-white py-[15px] px-[16px] w-[123px]">View More</a>
            </div>        
        </section>
    );
}

export default MotocyclesDetail;