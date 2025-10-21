import { useState, useMemo } from "react";
import { ArrowRight, Search } from "lucide-react";
import { motion } from "framer-motion";
import RippleButton from "@/Components/ui/rippleButton";
import MainLoading from "@/Components/ui/MainLoading";
import EmptyState from "@/Components/ui/EmptyState";
import useFetchData from "@/Hooks/useFetchData";

const MotorcycleData = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: motorcycleData, loading, error } = useFetchData(
    `/api/motorcycles?search=${encodeURIComponent(searchQuery)}&sort=${sortBy}&page=${currentPage}`,
    {},
    [searchQuery, sortBy, currentPage]
  );

  const motorcycles = motorcycleData?.data ?? [];
  const itemsPerPage = 6;

  const filteredData = useMemo(() => {
    const q = (searchQuery || "").trim().toLowerCase();

    let list = motorcycles.filter((item) => {
      if (!item) return false;
      const name = (item.name || "").toString().toLowerCase();
      return name.includes(q);
    });

    if (sortBy === "latest") {
      list = list.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortBy === "az") {
      list = list.slice().sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    } else {
      list = list.slice().sort((a, b) => (b.views || 0) - (a.views || 0));
    }

    return list;
  }, [motorcycles, searchQuery, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center py-12">
        <MainLoading text="Load Motorcycle Data..." />
      </div>
    );
  }

  if (!loading && filteredData.length === 0) {
    return (
      <div className="py-20">
        <EmptyState
          title="No Motorcycles Found"
          description="Try adjusting your search or filters."
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-[64px] mb-8 px-4">
        <div className="flex flex-col text-sm text-gray-600 bg-[#F7F7F7] py-[13px] px-3 w-[288px] border-b border-[#A7A8AE] mb-[64px]">
          <span className="text-[12px] px-3">Sort by</span>
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1);
            }}
            className="py-2 border-none bg-[#F7F7F7] text-[14px]"
          >
            <option value="popular">Most Popular</option>
            <option value="latest">Latest</option>
            <option value="az">A - Z</option>
          </select>
        </div>

        <div className="flex items-center py-[13px] bg-[#F7F7F7] px-3 w-[288px] mb-[64px] border-b border-[#A7A8AE]">
          <Search size={16} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search motorcycle..."
            className="bg-transparent outline-none w-full text-sm border-none"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <motion.div
        layout
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
      >
        {paginatedData.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <img
              src={`/storage/${product.product_image ?? product.image}`}
              alt={product.name}
              className="w-full h-48 object-contain"
            />
            <div className="p-4">
              <h3 className="text-gray-800 text-[20px] font-medium mb-3">
                {product.name}
              </h3>
              <a href={`/products/motorcycles/${product.slug}`}>
                <RippleButton className="flex items-center gap-2 text-white bg-blue-900 w-full py-2 hover:bg-blue-800 transition justify-center">
                  Details <ArrowRight size={18} />
                </RippleButton>
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="flex justify-center items-center mt-10 space-x-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          className="px-3 py-1 rounded-md border text-sm bg-white hover:bg-gray-100 text-gray-700"
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <div className="flex items-center space-x-1">
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;
            // Optionally show only nearby pages for big page counts
            const showAll = totalPages <= 7;
            const inWindow =
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1);

            if (!showAll && !inWindow) {
              return null;
            }

            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-md border text-sm ${
                  currentPage === page
                    ? "bg-[#B0160D] text-white"
                    : "bg-white hover:bg-gray-100 text-gray-700"
                }`}
              >
                {page}
              </button>
            );
          })}
          {totalPages > 7 && <span className="px-2">…</span>}
        </div>

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          className="px-3 py-1 rounded-md border text-sm bg-white hover:bg-gray-100 text-gray-700"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MotorcycleData;
