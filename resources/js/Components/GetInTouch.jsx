import { PhoneCall } from "lucide-react";
import RippleButton from "@/Components/ui/rippleButton";

const GetInTouch = () => {
    return (
        <section id="get-it-touch-section" className="max-w-7xl mx-auto p-[56px] mb-[10px]">
            <div className="w-full flex flex-row gap-3 justify-center align-middle items-center">
                <h3 className="text-[22px]">Ready to get started?</h3>
                <RippleButton className="text-[14px] py-[15px] px-[16px] text-white bg-[#B0160D] flex flex-row gap-2 justify-center align-middle items-center">
                    Get In Touch <PhoneCall /> 
                </RippleButton>
            </div>
        </section>
    )
}

export default GetInTouch;