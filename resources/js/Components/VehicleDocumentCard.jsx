import { Check } from "lucide-react";

const VehicleDocumentCard = ({ lang }) => {
  console.log(lang)
  return (
    <section className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 md:gap-16 py-12 md:px-0 px-[10px]">
      {/* Left - Image */}
      <div className="relative w-full md:w-1/2 h-[300px] md:h-[400px] overflow-hidden rounded-2xl shadow-lg">
        <img
          src="/assets/products/vehicle-documents/bpkb.png"
          alt="BPKB & STNK Registration"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-6 left-6">
          <p className="text-white text-sm">{lang?.[0]}</p>
          <h2 className="text-xl md:text-2xl font-semibold text-white">
            PT. WAJIRA JAGRATARA YANOTAMA
          </h2>
        </div>
      </div>

      {/* Right - Description */}
      <div className="md:w-1/2 text-gray-800 space-y-4">
        <h2 className="text-[28px] md:text-[28px] font-bold text-[#1E3A5F]">
          BPKB & STNK Registration
        </h2>
        <p className="text-[16px] md:text-base opacity-80">
          Handling vehicle documents becomes easier. We help with the
          registration process, change of ownership, and extension of both BPKB
          and STNK quickly, safely, and reliably.
        </p>

        <ul className="space-y-3 mt-6">
          {[
            "Practical process without hassle",
            "Official and guaranteed service",
            "Saves time without long queues",
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-gray-700">
              <Check className="text-green-500" size={18} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default VehicleDocumentCard;