import { Mail } from "lucide-react";
import RippleButton from "@/Components/ui/rippleButton";
import WhatsAppIcon from "@/Components/ui/WhatsAppIcon";
import FacebookIcon from "@/Components/ui/FacebookIcon";
import InstagramIcon from "@/Components/ui/InstagramIcon";
import TiktokIcon from "@/Components/ui/TiktokIcon";
import YoutubeIcon from "@/Components/ui/YoutubeIcon";
import useFetchData from "@/Hooks/useFetchData";

export default function Footer({ data, lang }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400">
        No social link data available.
      </div>
    );
  }

  const socialLinks = data.filter((item) => item.is_show === 1);

  const getUrl = (name) => {
    const found = socialLinks.find(
      (item) => item.platform_name?.toLowerCase() === name.toLowerCase()
    );
    return found ? found.url : null;
  };

  const formatWhatsapp = (urlOrNumber) => {
    if (!urlOrNumber) return null;
    if (urlOrNumber.includes("wa.me") || urlOrNumber.includes("whatsapp")) {
      return urlOrNumber;
    }
    const cleaned = urlOrNumber.replace(/\D/g, "");
    return `https://wa.me/${cleaned}`;
  };

  return (
    <footer id="footer" className="bg-[#1C3A58] text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Subscribe Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">{(lang?.left_panel?.[0]) ?? "Subscribe to Our Newsletter"}</h3>
          <div className="flex w-full max-w-sm">
            <input
              type="email"
              placeholder={(lang?.left_panel?.[1]) ?? "Email address"}
              className="flex-1 px-4 py-2 rounded-l bg-white text-gray-800 focus:outline-none"
            />
            <RippleButton className="bg-red-600 px-4 rounded-r hover:bg-red-700 transition-colors flex items-center justify-center">
              <Mail size={18} />
            </RippleButton>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-semibold mb-4 text-[#EFBF63]">
            {(lang?.right_panel?.[0]?.label) ?? "Services"}
          </h4>
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer">
              <a href="/products/motorcycles">
                {(lang?.right_panel?.[0]?.content[0]) ?? "Motorcycle"}
              </a>
            </li>
            <li className="hover:underline cursor-pointer">
              {(lang?.right_panel?.[0]?.content[1]) ?? "Expedition"}
            </li>
            <li className="hover:underline cursor-pointer">
              <a href="/commodity">
                {(lang?.right_panel?.[0]?.content[2]) ?? "Commodity"}
              </a>
            </li>
            <li className="hover:underline cursor-pointer">
              {(lang?.right_panel?.[0]?.content[3]) ?? "Vehicle Documentation"}
            </li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h4 className="font-semibold mb-4 text-[#EFBF63]">
            <a href="/about-us">
              {(lang?.right_panel?.[1]?.label) ?? "About"}
            </a>
          </h4>
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer">{(lang?.right_panel?.[1]?.content[0]) ?? "Our Story"}</li>
            <li>
              <a href="/gallery" className="hover:underline cursor-pointer">
                {(lang?.right_panel?.[1]?.content[1]) ?? "Gallery"}
              </a>
            </li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="font-semibold mb-4 text-[#EFBF63]">
            {(lang?.right_panel?.[2]?.label) ?? "Help"}
          </h4>
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer">
              {(lang?.right_panel?.[2]?.content[0]) ?? "Contact Us"}
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-slate-600">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-300 space-y-4 md:space-y-0">
          {/* Terms */}
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white">
              {(lang?.bottom_panel?.[0]) ?? "Terms & Conditions"}
            </a>
            <a href="#" className="hover:text-white">
              {(lang?.bottom_panel?.[1]) ?? "Privacy Policy"}</a>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4 text-white font-semibold">
            {getUrl("whatsapp") && (
              <a
                href={formatWhatsapp(getUrl("whatsapp"))}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="w-6 h-6 text-white" />
              </a>
            )}
            {getUrl("facebook") && (
              <a href={getUrl("facebook")} target="_blank" rel="noopener noreferrer">
                <FacebookIcon className="w-6 h-6 text-white" />
              </a>
            )}
            {getUrl("instagram") && (
              <a href={getUrl("instagram")} target="_blank" rel="noopener noreferrer">
                <InstagramIcon className="w-6 h-6 text-white" />
              </a>
            )}
            {getUrl("tiktok") && (
              <a href={getUrl("tiktok")} target="_blank" rel="noopener noreferrer">
                <TiktokIcon className="w-6 h-6 text-white" />
              </a>
            )}
            {getUrl("youtube") && (
              <a href={getUrl("youtube")} target="_blank" rel="noopener noreferrer">
                <YoutubeIcon className="w-6 h-6 text-white" />
              </a>
            )}
          </div>
        </div>
      </div>  
    </footer>
  );
}
