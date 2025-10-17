import { useState } from "react";
import { ArrowRight } from "lucide-react";
import VehicleDocumentCard from "@/Components/VehicleDocumentCard";
import ExpeditionCard from "@/Components/ExpeditionCard";
import { motion, AnimatePresence } from "framer-motion";
import RippleButton from "@/Components/ui/rippleButton";

const categories = ["Motorcycle", "Expedition", "Commodity", "Vehicle Document"];

const products = [
  { id: 1, slug: "yamaha-aerox-alpha", name: "Yamaha Aerox Alpha", category: "Motorcycle", image: "/assets/products/motorcycles/aerox1.png" },
  { id: 2, slug: "yamaha-aerox-alpha-turbo", name: "Yamaha Aerox Alpha Turbo", category: "Motorcycle", image: "/assets/products/motorcycles/aerox2.png" },
  { id: 3, slug: "honda-adv", name: "Honda ADV 160", category: "Motorcycle", image: "/assets/products/motorcycles/adv.png" },
  { id: 4, slug: "htm-gajah", name: "HTM GAJAH", category: "Motorcycle", image: "/assets/products/motorcycles/htm.png" },
  { id: 5, slug: "yamaha-mio", name: "Yamaha Mio", category: "Motorcycle", image: "/assets/products/motorcycles/mio.png" },
  { id: 6, slug: "yamaha-aerox-cybercity", name: "Yamaha Aerox Cybercity", category: "Motorcycle", image: "/assets/products/motorcycles/aerox3.png" },
  { id: 7, slug: "batik", name: "Batik", category: "Commodity", image: "/assets/products/commodities/batik.png" },
  { id: 7, slug: "briquette", name: "Briquette", category: "Commodity", image: "/assets/products/commodities/briquette.png" },
  { id: 7, slug: "tobacco", name: "Tobacco", category: "Commodity", image: "/assets/products/commodities/tobacco.png" },
  { id: 7, slug: "duppalo", name: "Duppalo", category: "Commodity", image: "/assets/products/commodities/duppalo.png" },
  { id: 7, slug: "handcraft", name: "Handcraft", category: "Commodity", image: "/assets/products/commodities/handcraft.png" },
  { id: 7, slug: "woodcraft", name: "Woodcraft", category: "Commodity", image: "/assets/products/commodities/woodcraft.png" }
];

export default function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState("Motorcycle");

  const filteredProducts = products.filter(
    (p) => p.category === selectedCategory
  );

  return (
    <div className="w-full">
      <div className="flex justify-center px-2">
        <div className="bg-[#1E3A5F] p-2 sm:p-3 rounded-md mb-10 w-full sm:w-auto overflow-x-auto">
          <div className="flex flex-wrap sm:inline-flex justify-center gap-2 sm:gap-0 min-w-max">
            {categories
              .filter((cat) => cat !== "All")
              .map((cat) => (
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

      {/* Conditional View */}
      {selectedCategory === "Vehicle Document" ? (
        <VehicleDocumentCard key="vehicle-document" />
      ) : selectedCategory === "Expedition" ? (
        <ExpeditionCard key="expedition" />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="bg-white overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-contain"
                />
                <div className="p-4">
                  <h3 className="text-gray-800 text-[22px] font-medium mb-3">
                    {product.name}
                  </h3>
                  <a href={`/products/motorcycles/${product.slug}`} className="flex items-center gap-2 text-white bg-blue-900 w-full py-2 hover:bg-blue-800 transition align-middle justify-center">
                    Details <ArrowRight />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      <div className="w-full justify-center align-middle items-center flex flex-row p-[16px] my-[32px]">
        <RippleButton className="flex px-[16px] py-[15px] w-[134px] gap-[8px] text-white bg-[#B0160D] font-light text-[14px] cursor-pointer">
          View More <ArrowRight />
        </RippleButton>
      </div>
    </div>
  );

}
