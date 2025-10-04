import { Facebook, Instagram, Youtube, Mail, Phone, Music2 } from "lucide-react";
import Image from "@/Components/ui/image";

export default function Footer() {
  return (
      <footer className="bg-[#AC0003] text-slate-100 text-sm pt-[102px]">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-5 gap-8">

          {/* Logo & Address */}
          <div className="space-y-2 -translate-y-[75px]">
            <div className="bg-gray-300 h-16 w-16 rounded-md mb-3">
              <Image src="/assets/wajira.png" alt="Logo" width={100} height={100} />
            </div>
            <h4 className="font-bold text-[20px]">WAJIRA JAGRATARA Corps</h4>
            <p className="text-xs">Jl. Raya Tajem, Pucanganom, Wedomartani, Kec. Ngemplak, Kabupaten Sleman, Daerah Istimewa Yogyakarta</p>
            <div className="flex space-x-3 mt-5">
              <Instagram onClick={() => window.open("https://instagram.com/wajirajagratara", "_blank")} className="w-5 h-5 hover:text-pink-500 cursor-pointer" />
              <Facebook className="w-5 h-5 hover:text-blue-600 cursor-pointer" />
              <Music2 className="w-5 h-5 hover:text-black cursor-pointer" /> {/* TikTok */}
              <Youtube className="w-5 h-5 hover:text-red-600 cursor-pointer" />
            </div>
          </div>

          {/* Corporate */}
          <div className="space-y-2">
            <h4 className="font-bold text-[20px]">Corporate</h4>
            <p className="cursor-pointer md:hover:scale-105 max-sm:hover:translate-x-1 duration-150 hover:underline hover:text-white">About Us</p>
            <p className="cursor-pointer md:hover:scale-105 max-sm:hover:translate-x-1 duration-150 hover:underline hover:text-white">Privacy Notice</p>
            <p className="cursor-pointer md:hover:scale-105 max-sm:hover:translate-x-1 duration-150 hover:underline hover:text-white">Term of Use</p>
          </div>

          {/* Product */}
          <div className="space-y-2">
            <h4 className="font-bold text-[20px]">Product</h4>
            <p className="cursor-pointer md:hover:scale-105 max-sm:hover:translate-x-1 duration-150 hover:underline hover:text-white">Motocycle</p>
            <p className="cursor-pointer md:hover:scale-105 max-sm:hover:translate-x-1 duration-150 hover:underline hover:text-white">Ownership Transfer Fee</p>
            <p className="cursor-pointer md:hover:scale-105 max-sm:hover:translate-x-1 duration-150 hover:underline hover:text-white">Expedition</p>
            <p className="cursor-pointer md:hover:scale-105 max-sm:hover:translate-x-1 duration-150 hover:underline hover:text-white">Commodity Export</p>
          </div>

          {/* Highlight */}
          <div className="space-y-2">
            <h4 className="font-bold text-[20px]">Highlight</h4>
            <p className="cursor-pointer md:hover:scale-105 max-sm:hover:translate-x-1 duration-150 hover:underline hover:text-white">Community</p>
            <p className="cursor-pointer md:hover:scale-105 max-sm:hover:translate-x-1 duration-150 hover:underline hover:text-white">Event & Discount</p>
            <p className="cursor-pointer md:hover:scale-105 max-sm:hover:translate-x-1 duration-150 hover:underline hover:text-white">Article</p>
          </div>

          {/* Call Center */}
          <div className="space-y-3">
            <h4 className="font-bold text-[20px]">Call Center</h4>
            <div className="bg-red-400 text-white px-4 py-2 rounded flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+62 0878-8353-1313</span>
            </div>
            <div className="bg-red-400 text-white px-4 py-2 rounded flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>cs@deraly.id</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t text-center text-white text-xs py-4">
          ©Copyright 2025. WAJIRA JAGRATARA Corps - by Deraly.id - All rights reserved
        </div>
      </footer>
  );
}
