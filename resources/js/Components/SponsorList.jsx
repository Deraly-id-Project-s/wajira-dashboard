import { ArrowRight } from "lucide-react";

export default function SponsorList() {
  const brands = [
    { name: "Honda", image: "/assets/brands/honda.png", size: "42" },
    { name: "Yamaha", image: "/assets/brands/yamaha.png", size: "86" },
    { name: "Suzuki", image: "/assets/brands/suzuki.png", size: "32" },
    { name: "Kawasaki", image: "/assets/brands/kawasaki.png", size: "32" },
    { name: "Yadea", image: "/assets/brands/yadea.png", size: "32" },
    { name: "WMoto", image: "/assets/brands/wmoto.png", size: "36" },
    { name: "SM Sport", image: "/assets/brands/sm_sport.png", size: "42" },
    { name: "HTM", image: "/assets/brands/htm.png", size: "32" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-14">
        <div>
          <h2 className="text-[32px] md:text-3xl font-bold text-gray-800">
            Search by Brands
          </h2>
          <p className="text-gray-500 text-[14px] mt-2">
            This is text field, you could write everything you want to talk
          </p>
        </div>

        <button className="mt-4 md:mt-0 flex items-center bg-[#A6160A] text-white px-5 py-4 rounded text-sm hover:bg-[#8f1208] transition-all">
          More Brands <ArrowRight size={16} className="ml-2" />
        </button>
      </div>

      {/* Brand Logos */}
      <div className="flex flex-row flex-wrap justify-center gap-[24px] place-items-center">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="bg-[#F1F4F9] w-[170px] aspect-square rounded-full flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-sm"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className={`object-contain w-${brand.size} h-${brand.size}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
