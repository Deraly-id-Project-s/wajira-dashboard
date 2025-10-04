import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import Image from "@/Components/ui/image";
import RippleButton from "./ui/rippleButton";

const TransportationSection = () => {
  return (
    <section id="hero_section" className="relative w-full py-24 bg-orange-50 overflow-hidden"
      // style={{
      //   background: "linear-gradient(135deg, #ffdde1 0%, #fcb69f 50%, #ffb6b9 100%)"
      // }}
    >
      {/* Hero Content */}
      <div className="relative z-10 w-full flex items-center justify-center">
        <div className="grid grid-cols-12 grid-rows-2 gap-10 items-center w-full">
          {/* Konten Teks */}
          <div className="col-span-5 max-sm:col-span-11 max-sm:max-w-screen flex flex-col justify-center px-10 row-span-2 max-sm:row-span-1">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-5xl text-slate-700 mt-2"
            >
              <span className="font-extrabold">Transportation</span> and Logistics
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mt-4 text-slate-700 max-w-xl text-sm md:text-base font-semibold"
            >
              Drive Visibility, Empower Productivity, Deliver Flawlessly.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mt-4 text-slate-700 max-w-xl text-sm md:text-base"
            >
              Transportation and Logistics leaders are re-imagining how goods move in a world where every mile matters.
            </motion.p>

            {/* Tombol */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="mt-8 flex gap-4"
            >
              <RippleButton className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg shadow-md transition flex items-center gap-2">
                Request a freight quote now 
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
          <div className="col-span-7 w-full max-sm:col-span-12 mt-5 row-span-2 max-sm:row-span-1">
            <Image src="/assets/particles/main_transportation.png" alt="Transportaion" width={1000} height={1000} />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform translate-x-1/3 max-sm:-translate-x-10 max-sm:mr-2 cursor-pointer"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1,
          duration: 0.6,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <ChevronDown className="w-10 h-10 text-slate-400" />
      </motion.div>
    </section>
  );
};

export default TransportationSection;