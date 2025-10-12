import { useState } from "react";

const MotorcycleDescriptionContainer = () => {
  const [activeTab, setActiveTab] = useState("Engine");

  const specs = {
    Engine: [
      { label: "Engine Type", value: "4-Stroke, SOHC, eSP" },
      { label: "Bore x Stroke", value: "47.0 x 63.1 mm" },
      { label: "Displacement", value: "109.5 cc" },
      { label: "Compression Ratio", value: "10.0 : 1" },
      { label: "Maximum Power", value: "6.6 kW (9.0 PS) / 7,500 rpm" },
      { label: "Maximum Torque", value: "9.2 N.m (0.94 kgf.m) / 6,000 rpm" },
      { label: "Clutch", value: "Automatic, Centrifugal, Dry Type" },
      { label: "Starter", value: "Electric and Kick Starter (CBS Type)" },
      { label: "Spark Plug", value: "NGK MR9C-9N" },
      { label: "Fuel System", value: "Injection (PGM-FI)" },
      { label: "Transmission", value: "Automatic, V-Matic" },
      { label: "Ignition System", value: "Full Transistorized" },
    ],
    Frame: [
      { label: "Frame Type", value: "Underbone" },
      { label: "Front Suspension", value: "Telescopic with 30mm Inner Tubes" },
      { label: "Rear Suspension", value: "Unit Swing" },
      { label: "Tire Type", value: "Tubeless" },
      { label: "Front Tire", value: "110/80-14/C 53P" },
      { label: "Rear Tire", value: "140/70-14/C 62P" },
      { label: "Front Brake", value: "Disc Brake" },
      { label: "Lubrication System", value: "Disc Brake" },
    ],
    "Dimension & Weight": [
      { label: "Overall Length", value: "1,920 mm" },
      { label: "Overall Width", value: "685 mm" },
      { label: "Overall Height", value: "1,115 mm" },
      { label: "Wheelbase", value: "1,275 mm" },
      { label: "Ground Clearance", value: "132 mm" },
      { label: "Seat Height", value: "769 mm" },
      { label: "Curb Weight", value: "96 kg" },
      { label: "Fuel Tank Capacity", value: "4.2 L" },
    ],
    Electricity: [
      { label: "Battery", value: "12V - 3.5 Ah" },
      { label: "Headlight", value: "LED" },
      { label: "Taillight", value: "LED" },
      { label: "Turn Signal", value: "LED" },
      { label: "Charging Port", value: "Yes" },
    ],
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 bg-gray-50 shadow-md">
      {/* Tabs */}
      <div className="flex justify-start border-b border-gray-300 mb-8 flex-wrap">
        {Object.keys(specs).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm sm:text-base font-medium transition-all border-b-2 ${activeTab === tab
              ? "border-[#0F62FE] text-[#1E3A5F]"
              : "border-transparent text-gray-500 hover:text-[#1E3A5F]"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex flex-col gap-4 text-gray-700">
        {specs[activeTab].map((item, index) => (
          <div
            key={index}
            className="flex flex-row border-b border-gray-200 pb-2"
          >
            <span className="font-medium text-gray-800 w-[257px] min-w-[257px]">
              {item.label}
            </span>
            <span className="text-gray-600 flex-1 text-left">
              {item.value}
            </span>
          </div>
        ))}
      </div>

    </section>
  );
}

export default MotorcycleDescriptionContainer;