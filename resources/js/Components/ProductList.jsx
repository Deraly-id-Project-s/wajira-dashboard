import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import VehicleDocumentCard from "@/Components/VehicleDocumentCard";
import ExpeditionCard from "@/Components/ExpeditionCard";
import { motion, AnimatePresence } from "framer-motion";
import RippleButton from "@/Components/ui/rippleButton";
import MainLoading from "@/Components/ui/MainLoading";
import EmptyState from "@/Components/ui/EmptyState";
import useFetchData from "@/Hooks/useFetchData";

export default function ProductList({ lang, productLang }) {
  const { data: motorcycleData, loading: motorcycleLoading } = useFetchData("/api/motorcycles");
  const { data: commodityData, loading: commodityLoading } = useFetchData("/api/commodities");
  const { data: linkData, loading: linkLoading } = useFetchData("/api/public");

  const categories = lang?.menu ?? [];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.label ?? "motorcycle");

  // reset ketika bahasa berubah (categories berubah)
  useEffect(() => {
    if (categories?.length > 0) {
      setSelectedCategory(categories[0].label);
    }
  }, [categories]);

  const isLoading = motorcycleLoading || commodityLoading;
  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center py-12">
        <MainLoading text="Load Products Data..." />
      </div>
    );
  }

  // filter & konfigurasi berdasarkan label (bukan title)
  let filteredData = [];
  let basePath = "";
  let actionUrl = "";

  switch (selectedCategory) {
    case "motorcycle":
      filteredData = motorcycleData?.data || [];
      basePath = "/products/motorcycles/";
      actionUrl = "/products/motorcycles";
      break;
    case "commodity":
      filteredData = commodityData?.data || [];
      basePath = "/commodity/";
      actionUrl = "/commodity";
      break;
    case "vehicle-documentation":
      filteredData = [];
      basePath = "/vehicle/";
      actionUrl = "https://wa.me/" + linkData?.data?.links?.[0]?.url;
      break;
    case "expedition":
      filteredData = [];
      basePath = "/expedition/";
      actionUrl = "https://wa.me/" + linkData?.data?.links?.[0]?.url;
      break;
    default:
      filteredData = [];
  }

  return (
    <div className="w-full" id="product-lists">
      {/* === Tabs / Menu === */}
      <div className="flex justify-center px-2">
        <div className="bg-[#1E3A5F] p-2 sm:p-3 rounded-md mb-10 w-full sm:w-auto overflow-x-auto">
          <div className="flex flex-wrap sm:inline-flex justify-center gap-2 sm:gap-0 min-w-max">
            {categories.map((cat) => (
              <RippleButton
                key={cat.label}
                onClick={() => setSelectedCategory(cat.label)}
                className={`px-3 sm:px-6 py-2 text-xs sm:text-sm font-medium transition-colors duration-200 whitespace-nowrap
                  ${selectedCategory === cat.label
                    ? "bg-[#F4B75E] text-[#1E3A5F] rounded-md"
                    : "bg-transparent text-gray-300 hover:text-white"
                  }`}
              >
                {cat.title}
              </RippleButton>
            ))}
          </div>
        </div>
      </div>

      {/* === Product List === */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          layout
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.3 }}
        >
          {selectedCategory === "vehicle-documentation" ? (
            <VehicleDocumentCard key="vehicle-document" lang={productLang} />
          ) : selectedCategory === "expedition" ? (
            <ExpeditionCard key="expedition" lang={productLang} />
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
                        {lang?.detailButton ?? "Details"} <ArrowRight />
                      </RippleButton>
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="w-full justify-center items-center flex py-[32px] md:mt-20">
        <a href={actionUrl} className="block">
          <RippleButton
            className={
              `flex flex-row justify-center items-center px-[16px] py-[15px] max-w-[272px] gap-[8px] text-white font-light text-[14px] cursor-pointer ` +
              ((selectedCategory === "expedition" || selectedCategory === "vehicle-documentation")
                ? "bg-[#198038]"
                : "bg-[#B0160D]")
            }
          >
            <span>{lang?.btn ?? "View More"}</span> <ArrowRight />
          </RippleButton>
        </a>
      </div>
    </div>
  );
}
