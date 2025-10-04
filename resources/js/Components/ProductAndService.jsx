import { ArrowRight } from "lucide-react";

export default function ProductAndService() {
  const items = [
    {
      title: "Motorcycle",
      description: "Authorized dealership and distribution for motorcycles",
      color: "bg-[#A6160A]", // merah
      font_color: "text-white",
      image: "/assets/product_and_service/motor.png",
    },
    {
      title: "Expedition",
      description:
        "Comprehensive freight forwarding, fleet leasing, and passenger transport services across Indonesia.",
      color: "bg-[#E3A73F]", // kuning
      font_color: "text-black",
      image: "/assets/product_and_service/expedition.png",
    },
    {
      title: "Commodity",
      description: "Trade and distribution of various goods",
      color: "bg-[#E3A73F]", // kuning
      font_color: "text-black",
      image: "/assets/product_and_service/comodity.png",
    },
    {
      title: "Vehicle Documentation",
      description:
        "Services for vehicle registration certificates (STNK), titles (BPKB)",
      color: "bg-[#A6160A]", // merah
      font_color: "text-white",
      image: "/assets/product_and_service/document.png",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto py-16">
      <div className="grid grid-cols-1 w-full md:grid-cols-2 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className={`${item.color} h-[260px] w-[540px] text-white md:text-left rounded-sm flex flex-col md:flex-row justify-between items-center overflow-hidden`}
          >
            {/* Text Section */}
            <div className={`p-10 space-y-3 flex-1 ${item.font_color}`}>
              <h2 className="text-[32px] font-light">{item.title}</h2>
              <p className="text-[14px] md:text-base leading-relaxed">
                {item.description}
              </p>
              <button className="mt-3 flex items-center bg-white text-gray-800 px-4 py-2 text-sm rounded hover:bg-gray-100 transition-all">
                Learn More <ArrowRight size={16} className="ml-2" />
              </button>
            </div>

            {/* Image Section */}
            <div className="md:w-1/3 flex justify-center items-center p-4">
              <div className="bg-white/10 rounded-full overflow-hidden w-195 aspect-square flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-cover w-[183px] aspect-square rounded-full"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
