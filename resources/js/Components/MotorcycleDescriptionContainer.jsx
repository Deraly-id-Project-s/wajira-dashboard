import { useState } from "react";
import MainLoading from "@/Components/ui/MainLoading";

const MotorcycleDescriptionContainer = ({ motorcycle }) => {
  const [activeTab, setActiveTab] = useState("Engine");

  if (!motorcycle || motorcycle.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <MainLoading text="Load Motorcycle Data..." />
      </div>
    );
  }

  const specs = {
    Engine: [
      { label: "Engine Type", value: motorcycle?.engine_type || "-" },
      { label: "Bore x Stroke", value: motorcycle?.engine_size || "-" },
      { label: "Displacement", value: motorcycle?.displacement || "-" },
      { label: "Compression Ratio", value: motorcycle?.compression_ratio || "-" },
      { label: "Maximum Power", value: motorcycle?.max_power || "-" },
      { label: "Maximum Torque", value: motorcycle?.max_torque || "-" },
      { label: "Clutch", value: motorcycle?.clutch || "-" },
      { label: "Starter", value: motorcycle?.starter || "-" },
      { label: "Spark Plug", value: motorcycle?.spark_plug || "-" },
      { label: "Fuel System", value: motorcycle?.fuel_system || "-" },
      { label: "Ignition System", value: motorcycle?.ignition_system || "-" },
    ],
    Frame: [
      { label: "Frame Type", value: motorcycle?.frame_type || "-" },
      { label: "Front Suspension", value: motorcycle?.front_suspension || "-" },
      { label: "Rear Suspension", value: motorcycle?.rear_suspension || "-" },
      { label: "Tire Type", value: motorcycle?.tire_type || "-" },
      { label: "Front Tire", value: motorcycle?.front_tire || "-" },
      { label: "Rear Tire", value: motorcycle?.rear_tire || "-" },
      { label: "Front Brake", value: motorcycle?.front_brake || "-" },
      { label: "Lubrication System", value: motorcycle?.lubrication_system || "-" },
    ],
    "Dimension & Weight": [
      { label: "Overall Length", value: motorcycle?.overall_length || "-" },
      { label: "Overall Width", value: motorcycle?.overall_width || "-" },
      { label: "Overall Height", value: motorcycle?.overall_height || "-" },
      { label: "Wheelbase", value: motorcycle?.wheelbase || "-" },
      { label: "Ground Clearance", value: motorcycle?.ground_clearance || "-" },
      { label: "Seat Height", value: motorcycle?.seat_height || "-" },
      { label: "Curb Weight", value: motorcycle?.curb_weight || "-" },
      { label: "Fuel Tank Capacity", value: motorcycle?.fuel_tank_capacity || "-" },
    ],
    Electricity: [
      { label: "Battery", value: motorcycle?.battery || "-" },
      { label: "Headlight", value: motorcycle?.headlight || "-" },
      { label: "Taillight", value: motorcycle?.taillight || "-" },
      { label: "Turn Signal", value: motorcycle?.turn_signal || "-" },
      { label: "Charging Port", value: motorcycle?.charging_port ? "Yes" : "No" },
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