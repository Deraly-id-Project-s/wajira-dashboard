import { motion } from "framer-motion";
import React from "react";
import Image from "@/Components/ui/image";
import RippleButton from "./ui/rippleButton";
import { ArrowRight } from "lucide-react";

export default function ExpeditionSpanner(): React.JSX.Element {
    return (
        <section id="hero_section" className="relative w-full bg-white overflow-hidden mb-10">
        {/* Hero Content */}
        <div className="relative z-10 w-full flex items-center justify-center">
          <div className="grid grid-cols-3 grid-rows-1 gap-10 max-sm:gap-2 items-center w-full">
            {/* Konten Teks */}
            <div className="col-span-2 flex flex-col justify-center px-10 max-sm:px-5 row-span-2 max-sm:row-span-1">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-2xl max-sm:text-lg text-slate-700 mt-2"
              >
                Ready to Elevate Your <span className="font-extrabold">Transportation and Logistics Operations?</span>
              </motion.h1>
  
              {/* Tombol */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="mt-8 flex gap-4"
              >
                <RippleButton className="bg-yellow-400 max-sm:text-xs text-black font-semibold px-6 py-3 max-sm:px-2 max-sm:py-1 rounded-lg shadow-md transition flex items-center gap-2">
                    Take the next step with us today!
                  <motion.span
                    initial={{ x: -2 }}
                    animate={{ x: [ -2, 2, -2 ] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                    className="flex items-center gap-2"
                  >
                    <ArrowRight size={18} />
                  </motion.span>
                </RippleButton> 
              </motion.div>
            </div>
  
            {/* Kolase Gambar */}
            <div className="col-span-1 w-full justify-end flex row-span-2 max-sm:row-span-1">
              <Image src="/assets/particles/main_transportation_2.png" alt="Transportaion" width={300} height={300} className="max-sm:w-[160px]" />
            </div>
          </div>
        </div>
      </section>
    )
}

