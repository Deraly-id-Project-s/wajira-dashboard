import { ArrowUp } from "lucide-react";

export default function UserAnalytics() {
  const stats = [
    { value: "1k+", label: "Happy Customers" },
    { value: "1k+", label: "Happy Customers" },
    { value: "1k+", label: "Happy Customers" },
    { value: "1k+", label: "Happy Customers" },
  ];

  return (
    <section className="flex flex-wrap justify-center items-center gap-[62px] py-10 bg-transparent">
      {stats.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-4 bg-[#1D3B56] text-white px-6 py-4 rounded-md shadow-md hover:scale-105 transition-transform duration-300"
        >
          <div className="bg-[#B31212] p-3 rounded-full flex items-center justify-center">
            <ArrowUp className="text-white w-5 h-5" />
          </div>
          <div>
            <h3 className="text-[32px] font-semibold">{item.value}</h3>
            <p className="text-[14px] text-gray-200">{item.label}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
