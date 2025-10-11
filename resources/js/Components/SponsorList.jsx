export default function SponsorList() {
  const brands = [
    { name: "Honda", image: "/assets/brands/honda.png", size: "42", mobileSize: "32" },
    { name: "Yamaha", image: "/assets/brands/yamaha.png", size: "86", mobileSize: "64" },
    { name: "Suzuki", image: "/assets/brands/suzuki.png", size: "32", mobileSize: "24" },
    { name: "Kawasaki", image: "/assets/brands/kawasaki.png", size: "32", mobileSize: "24" },
    { name: "Yadea", image: "/assets/brands/yadea.png", size: "32", mobileSize: "24" },
    { name: "WMoto", image: "/assets/brands/wmoto.png", size: "36", mobileSize: "24" },
    { name: "SM Sport", image: "/assets/brands/sm_sport.png", size: "42", mobileSize: "32" },
    { name: "HTM", image: "/assets/brands/htm.png", size: "24", mobileSize: "12" },
  ];

  return (
      <div className="flex flex-row flex-wrap justify-center md:gap-[24px] gap-[10px] place-items-center">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="bg-[#F1F4F9] md:w-[170px] w-[100px] aspect-square rounded-full flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-sm"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className={`object-contain w-${brand.mobileSize} h-${brand.mobileSize} md:w-${brand.size} md:h-${brand.size} w-`}
            />
          </div>
        ))}
      </div>
  );
}
