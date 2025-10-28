import WhatsAppIcon from "@/Components/ui/WhatsAppIcon";
import RippleButton from "@/Components/ui/rippleButton";

const GetInTouch = ({ data, lang }) => {
    if (!data || data.length === 0) {
        return (
            <div className="text-center py-10 text-gray-400">
                No social link data available.
            </div>
        );
    }

    const whatsappData = data.find(item => item.platform_name === "WhatsApp");
    const whatsappNumber = whatsappData ? whatsappData.url.replace(/^0/, "62") : "";
    const whatsappLink = `https://wa.me/${whatsappNumber}`;
    return (
        <section id="get-it-touch-section" className="max-w-7xl mx-auto p-[56px] mb-[10px]">
            <div className="w-full flex flex-row gap-3 justify-center align-middle items-center">
                <h3 className="text-[22px]">{lang?.title ?? "Ready to get started?"}</h3>
                {whatsappData && (
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                    >

                        <RippleButton className="text-[14px] py-[15px] px-[16px] text-white bg-[#B0160D] flex flex-row justify-center align-middle items-center">
                            <span className="flex flex-row gap-3 justify-center align-middle items-center">
                                {lang?.btn ?? "Get In Touch"} <WhatsAppIcon className="w-6 h-6 text-white" />
                            </span>
                        </RippleButton>
                    </a>
                )}
            </div>
        </section>
    )
}

export default GetInTouch;