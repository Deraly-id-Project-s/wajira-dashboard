export default function VisionMission() {
  return (
    <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between p-6 md:p-12 gap-8">
      {/* Left - Image */}
      <div className="md:w-1/5 w-full flex justify-center">
        <img
          src="/assets/yanotama.png"
          alt="Vision and Mission"
          className="rounded-lg shadow-lg w-full md:w-[400px] object-cover"
        />
      </div>

      {/* Right - Text */}
      <div className="md:w-4/5 text-[#1A1A1A]">
        <h2 className="text-[32px] font-semibold mb-4 uppercase">Vision & Mission</h2>
        <p className="text-[16px] leading-relaxed opacity-90">
          Increase economic growth and welfare of the Indonesian people by establishing partnerships
          and expanding networking with entrepreneurs, MSMEs as well as SMEs and private companies
          in Indonesia in the fields of trade, industry, tourism, and transportation.
        </p>
        <p className="text-[16px] leading-relaxed mt-4 opacity-90">
          Wajira Jagratara Corps is committed to running entrepreneurial activities in a professional,
          modern, accountable, and reliable manner, as well as providing high-quality services to ensure
          partner and consumer satisfaction. The company also focuses on developing Indonesian entrepreneurs
          to be ready to compete in the global market and play an active role in increasing economic growth,
          especially in Yogyakarta and Indonesia in general.
        </p>
      </div>
    </section>
  );
}
