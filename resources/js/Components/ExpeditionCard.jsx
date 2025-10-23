import { Check } from "lucide-react";

const VehicleDocumentCard = () => {
  return (
    <section className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 md:gap-16 py-12 md:px-0 px-[10px]">
      {/* Left - Image */}
      <div className="relative w-full md:w-1/2 h-[300px] md:h-[400px] overflow-hidden rounded-2xl shadow-lg">
        <img
          src="/assets/products/expeditions/truck.png"
          alt="Truck Expedition"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-6 left-6">
          <p className="text-white text-sm">Operated by</p>
          <h2 className="text-xl md:text-2xl font-semibold text-white">
            PT. WAJIRA JAGRATARA TRANSINDO
          </h2>
        </div>
      </div>

      {/* Right - Description */}
      <div className="md:w-1/2 text-gray-800 space-y-4">
        <h2 className="text-[28px] md:text-[28px] font-bold text-[#1E3A5F]">
          Expedition Service
        </h2>
        <p className="text-[16px] md:text-base opacity-80">
          Shipping documents and vehicles becomes more efficient. We ensure your important documents and vehicles arrive safely and on time.
        </p>

        <ul className="space-y-3 mt-6">
          {[
            "Safe and reliable service",
            "Professional handling",
            "On-time delivery to destination",
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