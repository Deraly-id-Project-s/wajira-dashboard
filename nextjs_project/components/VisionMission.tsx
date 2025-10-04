"use client";
import React from "react";
import { motion } from "framer-motion";

const VisionMission = (): React.JSX.Element => {
  // return (
  //   <section
  //     id="vision_mission_section"
  //     className="flex flex-col md:flex-row py-7 max-w-6xl bg-white max-sm:px-10 gap-5"
  //   >
  //     {/* Visi */}
  //     <motion.div
  //       initial={{ x: -100, opacity: 0 }}
  //       whileInView={{ x: 0, opacity: 1 }}
  //       whileHover={{ scale: 1.02, y: -5 }}
  //       transition={{ duration: 0.2 }}
  //       viewport={{ once: true }}
  //       className="cursor:pointer relative flex-1 bg-slate-100 rounded-lg shadow-md hover:shadow-xl transition-shadow flex items-center justify-center py-10 overflow-hidden"
  //     >
  //       {/* Wave Background */}
  //       <img
  //         src="/assets/particles/wave.svg"
  //         alt="Wave Decoration"
  //         className="absolute bottom-0 left-0 w-full object-cover z-0 opacity-40"
  //       />

  //       {/* Content */}
  //       <div className="max-w-md text-center z-10 p-5 max-sm:p-7">
  //         <h2 className="text-3xl font-bold mb-4">Vision</h2>
  //         <p className="text-gray-700 text-md max-sm:text-xs">
  //           Increase economic growth and welfare of the Indonesian people by
  //           establishing partnerships and expanding networking with
  //           entrepreneurs, MSMEs as well as SMEs and private companies in
  //           Indonesia in the fields of trade, industry, tourism and
  //           transportation.
  //         </p>
  //       </div>
  //     </motion.div>

  //     {/* Misi */}
  //     <motion.div
  //       initial={{ x: -100, opacity: 0 }}
  //       whileInView={{ x: 0, opacity: 1 }}
  //       whileHover={{ scale: 1.02, y: -5 }}
  //       transition={{ duration: 0.2 }}
  //       viewport={{ once: true }}
  //       className="cursor:pointer relative flex-1 bg-slate-100 rounded-lg shadow-md hover:shadow-xl transition-shadow flex items-center justify-center py-10 overflow-hidden"
  //     >
  //       {/* Wave Background */}
  //       <img
  //         src="/assets/particles/wave.svg"
  //         alt="Wave Decoration"
  //         className="absolute bottom-0 left-0 w-full object-cover z-0 opacity-40"
  //       />

  //       {/* Content */}
  //       <div className="max-w-md text-center z-10 p-5 max-sm:p-7">
  //         <h2 className="text-3xl font-bold mb-4">Mission</h2>
  //         <p className="text-gray-700 text-md max-sm:text-xs">
  //           Wajira Jagratara Corps is committed to running entrepreneurial
  //           activities in a professional, modern, accountable, and reliable
  //           manner, as well as providing high-quality services to ensure partner
  //           and consumer satisfaction. The company also focuses on developing
  //           Indonesian entrepreneurs to be ready to compete in the global market
  //           and play an active role in increasing economic growth, especially in
  //           Yogyakarta and Indonesia in general.
  //         </p>
  //       </div>
  //     </motion.div>
  //   </section>
  // );

  return (
    <section
      className="flex flex-col gap-5 max-w-6xl overflow-hidden flex-wrap mx-auto p-24 max-sm:p-10 rounded-3xl"
      style={{
        background: "linear-gradient(135deg, #ffdde1 0%, #fcb69f 50%, #ffb6b9 100%)"
      }}
    >
      <h2 className="text-3xl font-bold mb-2 text-center">
        <span
          className="mr-3 bg-gradient-to-r from-pink-500 via-red-600 to-red-400 bg-clip-text text-transparent"
        >
          Visi Misi
        </span>
        Wajira Jagratara?
      </h2>
      <div className="flex flex-row max-sm:flex-col gap-5 w-full">
        <motion.div
          className="flex-1 flex flex-col gap-2 rounded-xl cursor-pointer p-6 bg-white/30 backdrop-blur-md shadow-lg border border-white/30"
          style={{
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{
            scale: 1.02,
            speed: 0.1,
            boxShadow: "0 12px 36px 0 rgba(31, 38, 135, 0.22)",
            backgroundColor: "rgba(255,255,255,0.45)",
          }}
        >
          <h3 className="font-semibold text-lg mb-1">Visi</h3>
          Wajira Jagratara adalah perusahaan yang bergerak di bidang jasa transportasi, perdagangan, dan industri. Perusahaan ini didirikan pada tahun 2010 dan berlokasi di Yogyakarta, Indonesia.
        </motion.div>
        <motion.div
          className="flex-1 flex flex-col gap-2 rounded-xl cursor-pointer p-6 bg-white/30 backdrop-blur-md shadow-lg border border-white/30"
          style={{
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{
            scale: 1.02,
            speed: 0.1,
            boxShadow: "0 12px 36px 0 rgba(31, 38, 135, 0.22)",
            backgroundColor: "rgba(255,255,255,0.45)",
          }}
        >
          <h3 className="font-semibold text-lg mb-1">Misi</h3>
          <span className="text-gray-800">
            Wajira Jagratara memiliki misi untuk memberikan layanan transportasi yang aman, nyaman, dan efisien bagi pelanggan. Perusahaan ini juga berperan aktif dalam pengembangan industri transportasi di Indonesia.
          </span>
        </motion.div>
      </div>
    </section>
  )
};

export default VisionMission;
