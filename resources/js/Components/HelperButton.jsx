import { ArrowRight } from "lucide-react";

const HelperButton = () => {
    return (
        <section className="md:max-w-7xl max-w-full mx-auto px-0 py-16">
            <div className="p-[12px] bg-[#1C3A58] flex flex-row justify-between align-middle items-center text-white">
                <h3 className="text-[32px] font-semibold">Need Help?</h3>
                <div className="flex gap-2 p-5 bg-[#B0160D]">
                    Get In Touch
                    <ArrowRight />
                </div>
            </div>
        </section>
    )
}

export default HelperButton;
