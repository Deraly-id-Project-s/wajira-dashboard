import { ArrowRight } from "lucide-react";
import RippleButton from "@/Components/ui/rippleButton";

const HelperButton = ({ data, lang }) => {
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
        <div className="p-[12px] bg-[#1C3A58] flex flex-row justify-between align-middle items-center text-white">
            <h3 className="text-[22px] md:text-[32px] font-semibold">
                {lang?.title ?? 'Need Help?'}
            </h3>
            <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
            >
                <RippleButton className="flex gap-2 p-5 bg-[#198038]">
                    {lang?.btn ?? 'Get In Touch'}
                    <ArrowRight />
                </RippleButton>
            </a>
        </div>
    )
}

export default HelperButton;
