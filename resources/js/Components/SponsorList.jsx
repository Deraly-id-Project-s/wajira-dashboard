import useFetchData from "@/Hooks/useFetchData";

export default function SponsorList() {
  const { data, loading, error } = useFetchData("/api/brands");

  const appUrl = import.meta.env.VITE_APP_URL;

  if (loading) return <div className="text-center py-10">Loading footer...</div>;
  if (error) return <div className="text-center py-10 text-red-400">Failed to load footer data.</div>;

  return (
    <div className="flex flex-row flex-wrap justify-center md:gap-[24px] gap-[10px] place-items-center">
      {data?.data?.map((brand, index) => (
        <div
          key={index}
          className="bg-[#F1F4F9] md:w-[170px] w-[100px] aspect-square rounded-full flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-sm"
        >
          <img
            src={`${appUrl}/storage/${brand.logo}`}
            alt={brand.name}
            className="object-contain w-36 h-36 md:w-32 md:h-32"
          />
        </div>
      ))}
    </div>
  );
}
