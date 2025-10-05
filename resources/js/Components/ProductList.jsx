import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "Motorcycle", "Expedition", "Commodity", "Vehicle Document"];

const products = [
  { id: 1, name: "Yamaha Aerox Alpha", category: "Motorcycle", image: "/assets/products/aerox1.png" },
  { id: 2, name: "Yamaha Aerox Alpha Turbo", category: "Motorcycle", image: "/assets/products/aerox2.png" },
  { id: 3, name: "Honda ADV 160", category: "Motorcycle", image: "/assets/products/adv.png" },
  { id: 4, name: "HTM GAJAH", category: "Expedition", image: "/assets/products/htm.png" },
  { id: 5, name: "Yamaha Mio", category: "Motorcycle", image: "/assets/products/mio.png" },
  { id: 6, name: "Yamaha Aerox Cybercity", category: "Motorcycle", image: "/assets/products/aerox3.png" },
];

export default function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <section className="w-full">
      {/* Category Selector */}
      <div className="flex overflow-x-auto gap-3 mb-8 scrollbar-hide w-full justify-center align-middle items-center flex-row">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`flex-shrink-0 px-4 py-2 rounded-full border transition 
              ${selectedCategory === cat ? "bg-blue-700 text-white" : "bg-white border-gray-300 hover:bg-blue-50"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
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
                <button className="flex items-center gap-2 text-white bg-blue-900 w-full py-2 hover:bg-blue-800 transition align-middle justify-center">
                  Details <ArrowRight />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <div className="w-full justify-center align-middle items-center flex flex-row p-[16px] my-[32px]">
        <div className="flex px-[16px] py-[15px] w-[134px] flew-row gap-[8px] text-white bg-[#B0160D] font-light text-[14px]">
          View More <ArrowRight />
        </div>
      </div>
    </section>
  );
}
