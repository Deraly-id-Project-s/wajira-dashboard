import React from "react";
import Image from "@/Components/ui/image";
import { Card, CardContent } from "@/../components/ui/card";
import { Button } from "@/../components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  price?: string;
}

interface ProductGridProps {
  products?: Product[];
  title?: string;
  onProductClick?: (product: Product) => void;
}

const ProductGrid = ({
  products = [
    {
      id: "1",
      name: "Yamaha aerox-alpha",
      image:
        "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80",
      category: "Sport",
      price: "$15,999",
    },
    {
      id: "2",
      name: "Yamaha R25",
      image:
        "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80",
      category: "Sport",
      price: "$8,999",
    },
    {
      id: "3",
      name: "Yamaha MT-09",
      image:
        "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80",
      category: "Naked",
      price: "$9,299",
    },
    {
      id: "4",
      name: "Yamaha XSR900",
      image:
        "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&q=80",
      category: "Heritage",
      price: "$9,999",
    },
    {
      id: "5",
      name: "Yamaha Tenere 700",
      image:
        "https://images.unsplash.com/photo-1575371015833-a1682c8db0c9?w=800&q=80",
      category: "Adventure",
      price: "$10,299",
    },
    {
      id: "6",
      name: "Yamaha TMAX",
      image:
        "https://images.unsplash.com/photo-1611241443322-78b19f8681a8?w=800&q=80",
      category: "Scooter",
      price: "$12,199",
    },
  ],
  title = "Featured Models",
  onProductClick = () => {},
}: ProductGridProps) => {
  return (
    <section id="product_grid_section" className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
          <div className="w-24 h-1 bg-gray-900 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card
                className="overflow-hidden h-full bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                onClick={() => onProductClick(product)}
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    fill
                  />
                  <div className="absolute top-3 right-3 bg-white px-2 py-1 text-xs font-medium text-gray-700 rounded-md">
                    {product.category}
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {product.name}
                    </h3>
                    {product.price && (
                      <span className="text-sm font-medium text-gray-700">
                        {product.price}
                      </span>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-3 border-gray-300 hover:bg-gray-50 hover:text-gray-900 group"
                    onClick={(e) => {
                      e.stopPropagation();
                      onProductClick(product);
                    }}
                  >
                    View in 3D
                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;