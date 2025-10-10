import { ArrowRight } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function ProductAndService() {
  const items = [
    {
      title: "Motorcycle",
      description: "Authorized dealership and distribution for motorcycles",
      color: "bg-[#A6160A]",
      font_color: "text-white",
      image: "/assets/product_and_service/motor.png",
      route: "/products/motorcycles",
    },
    {
      title: "Expedition",
      description:
        "Comprehensive freight forwarding, fleet leasing, and passenger transport services across Indonesia.",
      color: "bg-[#E3A73F]",
      font_color: "text-black",
      image: "/assets/product_and_service/expedition.png",
      route: "/products/expeditions",
    },
    {
      title: "Commodity",
      description: "Trade and distribution of various goods",
      color: "bg-[#E3A73F]",
      font_color: "text-black",
      image: "/assets/product_and_service/comodity.png",
      route: "/products/commodities",
    },
    {
      title: "Vehicle Documentation",
      description:
        "Services for vehicle registration certificates (STNK), titles (BPKB)",
      color: "bg-[#A6160A]",
      font_color: "text-white",
      image: "/assets/product_and_service/document.png",
      route: "/products/vehicle-documents",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className={`${item.color} w-full h-auto flex flex-col md:flex-row justify-between items-center overflow-hidden shadow-lg`}
          >
            {/* Text Section */}
            <div className={`p-6 sm:p-10 space-y-3 flex-1 ${item.font_color}`}>
              <h2 className="text-2xl sm:text-[32px] font-semibold sm:font-light text-center md:text-left">
                {item.title}
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-center md:text-left">
                {item.description}
              </p>
              <div className="flex justify-center md:justify-start">
                <Link
                  href={item.route}
                  className="mt-3 inline-flex items-center bg-white text-gray-800 px-4 py-2 text-sm rounded hover:bg-gray-100 transition-all"
                >
                  Learn More <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>

            {/* Image Section */}
            <div className="md:w-1/3 flex justify-center items-center p-4">
              <div className="bg-white/10 rounded-full overflow-hidden w-[150px] sm:w-[195px] aspect-square flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-cover w-[130px] sm:w-[183px] aspect-square rounded-full"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
