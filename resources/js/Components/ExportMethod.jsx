export default function ExportMethod() {
  const methods = [
    {
      title: "PT Wajira Jagratara Inter Nasional (Export)",
      label: "For International",
      desc: "Distribution and trading of motorcycles and spare parts for automotive products",
      bg: "bg-[#1D3B56]",
      textColor: "text-white",
      shadow: "shadow-[0_8px_20px_rgba(0,0,0,0.3)]",
    },
    {
      title: "PT Wajira Jagratara Morindo (Local)",
      label: "For Local",
      desc: "Distribution and trading of motorcycles and spare parts for automotive products",
      bg: "bg-[#EAF0FA]",
      textColor: "text-[#1D3B56]",
      shadow: "shadow-[0_8px_20px_rgba(0,0,0,0.15)]",
    },
  ];

  return (
    <div className="flex flex-col items-center gap-6 p-6 max-w-7xl mx-auto">
      {methods.map((item, index) => (
        <div
          key={index}
          className={`flex w-full ${
            index % 2 === 0 ? "justify-start" : "justify-end"
          }`}
        >
          <div
            className={`${item.bg} ${item.textColor} ${item.shadow} rounded-2xl p-6 w-full md:w-[704px] transition-transform duration-300 hover:-translate-y-1`}
          >
            <p className="text-[14px] opacity-80 mb-1">{item.label}</p>
            <h2 className="text-[32px] font-semibold mb-2">{item.title}</h2>
            <p className="text-[16px] opacity-90 leading-relaxed">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
