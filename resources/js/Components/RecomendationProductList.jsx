import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MainLoading from "@/Components/ui/MainLoading";
import EmptyState from "@/Components/ui/EmptyState";

import useFetchData from "@/Hooks/useFetchData";

const categories = ["Motorcycle", "Expedition", "Commodity", "Vehicle Document"];

const products = [
  { id: 1, slug: "yamaha-aerox-alpha", name: "Yamaha Aerox Alpha", category: "Motorcycle", image: "/assets/products/motorcycles/aerox1.png" },
  { id: 2, slug: "yamaha-aerox-alpha-turbo", name: "Yamaha Aerox Alpha Turbo", category: "Motorcycle", image: "/assets/products/motorcycles/aerox2.png" },
  { id: 3, slug: "honda-adv", name: "Honda ADV 160", category: "Motorcycle", image: "/assets/products/motorcycles/adv.png" },
];

const RecomendationProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState("Motorcycle");
  const { data, loading, error } = useFetchData("/api/motorcycle-recomendation");

  if (loading) {
      return (
          <div className="flex justify-center items-center py-12">
              <MainLoading text="Load Gallery Data..." />
          </div>
      )
  }

  const filteredProducts = products.filter(
    (p) => p.category === selectedCategory
  );

  return (
    <section className="w-full">
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
            {data?.data.length > 0 ? data?.data.map((product) => (
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
                    src={`/storage/${product.product_image}`}
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
            )) : (
              <EmptyState />
            )}
            </motion.div>
        </AnimatePresence>
    </section>
  );
}

export default RecomendationProductList;