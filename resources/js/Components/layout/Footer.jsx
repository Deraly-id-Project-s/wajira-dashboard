import { Mail } from "lucide-react";
import RippleButton from "@/Components/ui/rippleButton";
import WhatsAppIcon from "@/Components/ui/WhatsAppIcon";
import FacebookIcon from "@/Components/ui/FacebookIcon";
import InstagramIcon from "@/Components/ui/InstagramIcon";
import TiktokIcon from "@/Components/ui/TiktokIcon";

export default function Footer() {
  return (
    <footer className="bg-[#1C3A58] text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Subscribe Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h3>
          <div className="flex w-full max-w-sm">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 px-4 py-2 rounded-l bg-white text-gray-800 focus:outline-none"
            />
            <RippleButton className="bg-red-600 px-4 rounded-r hover:bg-red-700 transition-colors flex items-center justify-center">
              <Mail size={18} />
            </RippleButton>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-semibold mb-4 text-[#EFBF63]">Services</h4>
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer">Motorcycle</li>
            <li className="hover:underline cursor-pointer">Expedition</li>
            <li className="hover:underline cursor-pointer">Commodity</li>
            <li className="hover:underline cursor-pointer">Vehicle Documentation</li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h4 className="font-semibold mb-4 text-[#EFBF63]">About</h4>
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer">Our Story</li>
            <li className="hover:underline cursor-pointer">Gallery</li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="font-semibold mb-4 text-[#EFBF63]">Help</h4>
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer">Contact Us</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-slate-600">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-300 space-y-4 md:space-y-0">
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white">Terms & Conditions</a>
            <a href="#" className="hover:text-white">Privacy Policy</a>
          </div>

          <div className="flex space-x-4 text-white font-semibold">
            <WhatsAppIcon className="w-6 h-6 text-white" />
            <FacebookIcon className="w-6 h-6 text-white" />
            <InstagramIcon className="w-6 h-6 text-white" />
            <TiktokIcon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </footer>
  );
}
