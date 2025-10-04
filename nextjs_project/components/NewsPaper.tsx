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
  description?: string;
}

interface NewsPaperProps {
  products?: Product[];
  title?: string;
  onProductClick?: (product: Product) => void;
}

const NewsPaper = ({
  products = [
    {
      id: "1",
      name: "Wajira Import 150 Yamaha aerox-alpha ke Australia",
      image:
        "/assets/motorcycle/360/aerox-alpha/034.png",
      category: "Otomotif",
      description: "Sudah setengah perjalanan musim World Supersport 2025 ini dilakoni Aldi Satya Mahendra El’ Dablek yang diisi dengan..."
    },
    {
      id: "2",
      name: "Touring ke karanganyar dengan Yamaha R25",
      image:
        "/assets/motorcycle/360/r25/034.png",
      category: "Otomotif",
      description: "Sudah setengah perjalanan musim World Supersport 2025 ini dilakoni Aldi Satya Mahendra El’ Dablek yang diisi dengan..."
    },
    {
      id: "3",
      name: "Wajira Export Nikel mentah ke Malaysia",
      image:
        "https://nikel.co.id/wp-content/uploads/2022/12/Largest-Nickel-Producer-in-Indonesia-Contributes-to-reach-77-1-1024x576-1-640x360.jpg",
      category: "Comodity",
      description: 'Pada beberapa pekan lalu Presiden Indonesia Joko Widodo mengaku kaget saat mengetahui ternyata banyak sekali negara-negara yang ...'
    },
    // {
    //   id: "4",
    //   name: "Dealer Wajira sedia Ducati Paningale",
    //   image:
    //     "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80",
    //   category: "Otomotif",
    //   description: 'Ducati Panigale V4 adalah motor sport dengan mesin 1.103 cc desmodromik 90 ° V4 yang diperkenalkan oleh Ducati ...'
    // },
    // {
    //   id: "5",
    //   name: "Adventure bareng Yamaha Tenere 700",
    //   image:
    //     "https://imgsrv2.voi.id/GIcfqNBLbfTD4ZihVQM2ciPb8XPtVZwcvKH0AaOsntg/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy8zMjEzOTIvMjAyMzEwMTkxNjA3LW1haW4uY3JvcHBlZF8xNjk3NzA2NDU0LmpwZw.jpg",
    //   category: "Adventure",
    //   description: 'Dikutip dari laman Motorcycle News, Kamis, 19 Oktober, kehadiran suspensi yang lebih tinggi membuat kemampuan offroadnya menjadi lebih menyenangkan...'
    // },
    // {
    //   id: "6",
    //   name: "Jasa Transport Wajira Jagratara Group mencetak rekor",
    //   image:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCKpdGIjY2FbZh38TDi1n5p3ezfBCEnNPviCoXB5nbla6SJkFdbKl0JJispXHO6g9To9o&usqp=CAU",
    //   category: "Transportation",
    //   description: 'Sudah saatnya beralih ke Sepeda Motor Listrik POLYTRON! Tersedia tipe Polytron R dengan harga hanya 16jt rupiah...'
    // },
  ],
  onProductClick = () => {},
}: NewsPaperProps) => {
  return (
    <section id="newspaper_section" className="bg-white py-16 md:px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 max-sm:grid-cols-2 lg:grid-cols-3 gap-8 max-sm:gap-2">
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
                <div className="relative h-56 max-sm:h-28 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    fill
                  />
                  <div className="absolute top-3 right-3 bg-white px-2 py-1 md:text-xs max-sm:text-[10px] font-medium text-gray-700 rounded-md">
                    {product.category}
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between flex-col items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 max-sm:text-sm">
                      {product.name}
                    </h3>
                    <span className="text-xs mt-3">{product?.description ?? '-'}</span>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-3 border-gray-300 hover:bg-gray-50 hover:text-gray-900 group max-sm:text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      onProductClick(product);
                    }}
                  >
                    Baca Selengkapnya
                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex justify-end align-middle items-end max-sm:items-center max-sm:justify-center mt-7">
        <button className="text-slate-800 border-slate-300 hover:bg-slate-100 duration-150 shadow-md border rounded-lg px-5 py-2 text-sm max-sm:w-full">Baca Berita Lainnya...</button>
      </div>
    </section>
  );
};

export default NewsPaper;