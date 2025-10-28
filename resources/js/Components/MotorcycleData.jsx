import { useState, useMemo, useEffect } from "react";
import { ArrowRight, Search } from "lucide-react";
import { motion } from "framer-motion";
import RippleButton from "@/Components/ui/rippleButton";
import MainLoading from "@/Components/ui/MainLoading";
import EmptyState from "@/Components/ui/EmptyState";
import useFetchData from "@/Hooks/useFetchData";

const MotorcycleData = ({ lang }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(""); // untuk debounce
  const [sortBy, setSortBy] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const {
    data: motorcycleData,
    loading,
    error,
  } = useFetchData(
    `/api/motorcycles?search=${encodeURIComponent(debouncedSearch)}&sort=${sortBy}&page=${currentPage}`,
    {},
    [debouncedSearch, sortBy, currentPage]
  );

  const motorcycles = motorcycleData?.data ?? [];
  const itemsPerPage = 6;

  const filteredData = useMemo(() => {
    const q = (debouncedSearch || "").trim().toLowerCase();

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
  }, [motorcycles, debouncedSearch, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-0 md:gap-[64px] mb-8 px-7 md:px-4">
        <div className="flex flex-col text-sm text-gray-600 bg-[#F7F7F7] py-[13px] px-3 w-full md:w-[288px] border-b border-[#A7A8AE] mb-4 md:mb-[64px]">
          <span className="text-[12px] px-3">{(lang?.filter?.[0]?.title) ?? "Sort by"}</span>
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1);
            }}
            className="py-2 border-none bg-[#F7F7F7] text-[14px]"
          >
            <option value="popular">{(lang?.filter?.[0]?.items?.[0]) ?? "Most Popular"}</option>
            <option value="latest">{(lang?.filter?.[0]?.items?.[1]) ?? "Latest"}</option>
            <option value="az">{(lang?.filter?.[0]?.items?.[2]) ?? "A - Z"}</option>
          </select>
        </div>

        <div className="flex items-center py-[13px] bg-[#F7F7F7] px-3 w-full md:w-[288px] mb-[64px] border-b border-[#A7A8AE]">
          <Search size={16} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder={(lang?.filter?.[1]?.title) ?? "Search motorcycle" + "..."}
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
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 min-h-[300px]"
      >
        {loading ? (
          <div className="col-span-full flex justify-center py-10">
            <MainLoading text="Loading..." />
          </div>
        ) : filteredData.length === 0 ? (
          <div className="col-span-full">
            <EmptyState
              title="No Motorcycles Found"
              description="Try adjusting your search or filters."
            />
          </div>
        ) : (
          paginatedData.map((product) => (
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
                    {lang?.btn ?? "Details"} <ArrowRight size={18} />
                  </RippleButton>
                </a>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {filteredData.length > 0 && (
        <div className="flex justify-center items-center mt-10 space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1 rounded-md border text-sm bg-white hover:bg-gray-100 text-gray-700"
            disabled={currentPage === 1}
          >
            {(lang?.paginate?.[0]) ?? "Prev"}
          </button>

          <div className="flex items-center space-x-1">
            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
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
            {(lang?.paginate?.[1]) ?? "Next"}
          </button>
        </div>
      )}
    </div>
  );
};

export default MotorcycleData;
