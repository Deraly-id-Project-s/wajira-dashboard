import { ArrowRight } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function ProductAndService({ lang }) {
  console.log();
  const items = [
    {
      title: lang[0]?.title ?? "Motorcycle",
      description: lang[0]?.desc ?? "Authorized dealership and distribution for motorcycles",
      color: "bg-[#A6160A]",
      font_color: "text-white",
      image: "/assets/product_and_service/motor.png",
      route: "/products/motorcycles",
    },
    {
      title: lang[1]?.title ?? "Expedition",
      description:
        lang[1]?.desc ?? "Comprehensive freight forwarding, fleet leasing, and passenger transport services across Indonesia.",
      color: "bg-[#E3A73F]",
      font_color: "text-black",
      image: "/assets/product_and_service/expedition.png",
      route: "/products/expeditions",
    },
    {
      title: lang[2]?.title ?? "Commodity",
      description: lang[2]?.desc ?? "Trade and distribution of various goods",
      color: "bg-[#E3A73F]",
      font_color: "text-black",
      image: "/assets/product_and_service/comodity.png",
      route: "/commodity",
    },
    {
      title: lang[3]?.title ?? "Vehicle Documentation",
      description:
        lang[3]?.desc ?? "Services for vehicle registration certificates (STNK), titles (BPKB)",
      color: "bg-[#A6160A]",
      font_color: "text-white",
      image: "/assets/product_and_service/document.png",
      route: "/products/vehicle-documents",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6">
      {/* 
      grid-cols-2 untuk mobile (2 kolom)
      md:grid-cols-2 biar tetap 2 di desktop
    */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className={`${item.color} w-full h-auto flex flex-col md:flex-row justify-between items-center overflow-hidden shadow-lg`}
          >
            {/* Text Section */}
            <div className={`p-4 sm:p-10 space-y-3 flex-1 ${item.font_color}`}>
              <h2 className="text-lg sm:text-[32px] font-semibold sm:font-light text-center md:text-left">
                {item.title}
              </h2>
              <p className="text-xs sm:text-base leading-relaxed text-center md:text-left">
                {item.description}
              </p>
              <div className="flex justify-center md:justify-start">
                <Link
                  href={item.route}
                  className="mt-3 inline-flex items-center bg-white text-gray-800 px-3 py-1.5 text-xs sm:text-sm rounded hover:bg-gray-100 transition-all"
                >
                  {lang[4]?.desc ?? 'Learn More'} <ArrowRight size={14} className="ml-2" />
                </Link>
              </div>
            </div>

            {/* Image Section */}
            <div className="md:w-1/3 flex justify-center items-center p-4">
              <div className="bg-white/10 rounded-full overflow-hidden w-[100px] sm:w-[195px] aspect-square flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-cover w-[90px] sm:w-[183px] aspect-square rounded-full"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
