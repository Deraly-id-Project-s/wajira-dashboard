import { useState } from "react";
import { ArrowRight } from "lucide-react";
import VehicleDocumentCard from "@/Components/VehicleDocumentCard";
import ExpeditionCard from "@/Components/ExpeditionCard";
import { motion, AnimatePresence } from "framer-motion";
import RippleButton from "@/Components/ui/rippleButton";
import MainLoading from "@/Components/ui/MainLoading";
import EmptyState from "@/Components/ui/EmptyState";
import useFetchData from "@/Hooks/useFetchData";

const categories = ["Motorcycle", "Expedition", "Commodity", "Vehicle Document"];

export default function ProductList() {
  const { data: motorcycleData, loading: motorcycleLoading } = useFetchData("/api/motorcycles");
  const { data: commodityData, loading: commodityLoading } = useFetchData("/api/commodities");

  const [selectedCategory, setSelectedCategory] = useState("Motorcycle");

  const isLoading = motorcycleLoading || commodityLoading;

  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center py-12">
        <MainLoading text="Load Products Data..." />
      </div>
    );
  }

  let filteredData = [];
  let basePath = "";

  switch (selectedCategory) {
    case "Motorcycle":
      filteredData = motorcycleData?.data || [];
      basePath = "/products/motorcycles/";
      break;
    case "Commodity":
      filteredData = commodityData?.data || [];
      basePath = "/products/commodities/";
      break;
    default:
      filteredData = [];
      break;
  }

  return (
    <div className="w-full">
      {/* 🔘 Category Tabs */}
      <div className="flex justify-center px-2">
        <div className="bg-[#1E3A5F] p-2 sm:p-3 rounded-md mb-10 w-full sm:w-auto overflow-x-auto">
          <div className="flex flex-wrap sm:inline-flex justify-center gap-2 sm:gap-0 min-w-max">
            {categories.map((cat) => (
              <RippleButton
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 sm:px-6 py-2 text-xs sm:text-sm font-medium transition-colors duration-200 whitespace-nowrap
                ${selectedCategory === cat
                    ? "bg-[#F4B75E] text-[#1E3A5F] rounded-md"
                    : "bg-transparent text-gray-300 hover:text-white"
                  }`}
              >
                {cat}
              </RippleButton>
            ))}
          </div>
        </div>
      </div>

      {/* 🧱 Dynamic Content per Kategori */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          layout
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.3 }}
        >
          {selectedCategory === "Vehicle Document" ? (
            <VehicleDocumentCard key="vehicle-document" />
          ) : selectedCategory === "Expedition" ? (
            <ExpeditionCard key="expedition" />
          ) : filteredData.length === 0 ? (
            <div className="flex flex-col items-center py-12">
              <EmptyState message={`No ${selectedCategory} data available.`} />
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredData.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <img
                    src={`/storage/${product.product_image ?? product.image}`}
                    alt={product.name}
                    className="w-full h-48 object-contain"
                  />
                  <div className="p-4">
                    <h3 className="text-gray-800 text-[22px] font-medium mb-3">
                      {product.name}
                    </h3>
                    <a href={`${basePath}${product.slug}`}>
                      <RippleButton className="flex items-center gap-2 text-white bg-blue-900 w-full py-2 hover:bg-blue-800 transition justify-center">
                        Details <ArrowRight />
                      </RippleButton>
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* 🔽 View More Button */}
      <div className="w-full justify-center items-center flex py-[32px]">
        <RippleButton className="flex px-[16px] py-[15px] w-[134px] gap-[8px] text-white bg-[#B0160D] font-light text-[14px] cursor-pointer">
          View More <ArrowRight />
        </RippleButton>
      </div>
    </div>
  );
}
