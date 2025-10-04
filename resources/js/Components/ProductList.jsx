import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "Motorcycle", "Expedition", "Commodity", "Vehicle Document"];

const products = [
  { id: 1, name: "Yamaha Aerox Alpha", category: "Motorcycle", image: "/images/aerox-alpha.png" },
  { id: 2, name: "Yamaha Aerox Alpha Turbo", category: "Motorcycle", image: "/images/aerox-turbo.png" },
  { id: 3, name: "Honda ADV 160", category: "Motorcycle", image: "/images/adv-160.png" },
  { id: 4, name: "HTM GAJAH", category: "Expedition", image: "/images/htm-gajah.png" },
  { id: 5, name: "Yamaha Mio", category: "Motorcycle", image: "/images/mio.png" },
  { id: 6, name: "Yamaha Aerox Cybercity", category: "Motorcycle", image: "/images/aerox-cybercity.png" },
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
      <div className="flex overflow-x-auto gap-3 mb-8 scrollbar-hide">
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
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-contain bg-gray-50"
              />
              <div className="p-4">
                <h3 className="text-gray-800 text-lg font-medium mb-3">
                  {product.name}
                </h3>
                <button className="flex items-center gap-2 text-white bg-blue-900 px-4 py-2 rounded-md hover:bg-blue-800 transition">
                  Details →
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
