import { ArrowRight } from "lucide-react";

const HelperButton = () => {
    return (
        <div className="p-[12px] bg-[#1C3A58] flex flex-row justify-between align-middle items-center text-white">
            <h3 className="text-[32px] font-semibold">Need Help?</h3>
            <div className="flex gap-2 p-5 bg-[#B0160D]">
                Get In Touch
                <ArrowRight />
            </div>
        </div>
    )
}

export default HelperButton;
