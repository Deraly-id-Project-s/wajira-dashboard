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
  );
}
