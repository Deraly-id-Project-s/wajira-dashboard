import EmbedMaps from "@/Components/EmbedMaps";

export default function AboutUs({ lang }) {
  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between p-6 md:p-12">
      <div className="md:w-4/5 text-[#1A1A1A]">
        <h2 className="text-[32px] font-semibold mb-4">{lang?.title ?? "About Us"}</h2>
        <p className="text-[16px] leading-relaxed mb-4 opacity-90">
          {lang?.desc ?? `Wajira Jagratara Corps is a company established on June 8, 2019 by Mr. Zaifudin Yukhri,
          focusing on automotive trading and transportation services. The company establishes
          partnerships with motor vehicle ATPMs across Indonesia, providing new car and motorcycle
          sales services, as well as vehicle document management. In addition, Wajira Jagratara
          Corps also offers freight and passenger transportation services, including the rental of
          various types of vehicles. With a fleet of trucks that support the delivery of goods
          throughout Indonesia, the company is committed to improving mobility and economic growth.
          Wajira Jagratara Corps has several subsidiaries, including:`}
        </p>
        <ul className="list-disc ml-5 space-y-1 text-[16px] opacity-90">
          <li>PT. WAJIRA JAGRATARA YANOTAMA</li>
          <li>PT. WAJIRA JAGRATARA TRANSINDO</li>
          <li>PT. WAJIRA JAGRATARA MORINDO</li>
          <li>PT. WAJIRA INTERNASIONAL</li>
        </ul>
      </div>

      {/* Right Section - Logo */}
      <div className="md:w-1/4 flex justify-center">
        <img
          src="/assets/logo.png"
          alt="Wajira Logo"
          className="w-[294px] aspect-square drop-shadow-lg"
        />
      </div>
    </div>
  );
}
