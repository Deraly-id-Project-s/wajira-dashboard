export default function SponsorList({ data }) {
  const appUrl = import.meta.env.VITE_APP_URL;

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400">
        No brand data available.
      </div>
    );
  }

  return (
    <div className="flex flex-row flex-wrap justify-center md:gap-[24px] gap-[10px] place-items-center">
      {data.map((brand, index) => (
        <div
          key={index}
          className="bg-[#F1F4F9] md:w-[170px] w-[100px] aspect-square rounded-full flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-sm"
        >
          <img
            src={`/storage/${brand.logo}`}
            alt={brand.name}
            className="object-contain w-24 h-24 md:w-28 md:h-28"
          />
        </div>
      ))}
    </div>
  );
}
