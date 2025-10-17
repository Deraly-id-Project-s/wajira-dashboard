import { ArrowRight } from "lucide-react";
import RippleButton from "@/Components/ui/rippleButton";
import MainLoading from "@/Components/ui/MainLoading";

import useFetchData from "@/Hooks/useFetchData";

const Commodities = () => {
    const appUrl = import.meta.env.VITE_APP_URL;
    const { data, loading, error } = useFetchData("/api/commodities");
    const commodities =  data?.data;

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <MainLoading />
            </div>
        )
    }

    return (
        <section className="max-w-7xl mx-auto flex flex-col items-center justify-center py-12 space-y-16 px-[16px] md:px-0">
            {commodities.map((commodity, index) => (
                <div
                    key={index}
                    className="flex flex-col md:flex-row items-start gap-8 w-full"
                >
                    {/* Left: Image */}
                    <div className="relative w-full md:w-1/3 h-[232px] md:h-[320px] overflow-hidden shadow-lg flex-shrink-0">
                        <img
                            src={`${appUrl}/storage/` + commodity.image}
                            alt={commodity.slug}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />

                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                        {/* Title centered */}
                        <div className="absolute inset-0 flex items-end justify-center">
                            <h2 className="text-[32px] md:text-[32px] font-light text-white drop-shadow-md text-center mb-[10px]">
                                {commodity.name}
                            </h2>
                        </div>
                    </div>


                    {/* Right: Description + Button */}
                    <div className="w-full md:w-2/3 text-[#1A1A1A]">
                        <div
                            className="text-[16px] md:text-base leading-relaxed opacity-90 mb-6 text-justify"
                            dangerouslySetInnerHTML={{ __html: commodity.content }}
                        />

                        <RippleButton className="text-[14px] w-[150px] items-center gap-2 bg-[#1D3B56] text-white px-5 py-2.5 hover:bg-[#284c6e] flex justify-between transition-all shadow-md">
                            Contact Us
                            <ArrowRight size={18} />
                        </RippleButton>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default Commodities;
