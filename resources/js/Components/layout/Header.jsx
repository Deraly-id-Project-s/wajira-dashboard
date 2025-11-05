import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Button } from "@/Components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { router, usePage } from "@inertiajs/react";

import useFetchData from "@/Hooks/useFetchData";

const Header = ({ activeCategory, onCategoryChange }) => {
  // Inertia get route params
  const { url } = usePage();

  // Flex navbar state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [triggerSearch, setTriggerSearch] = useState(false);

  // Scroll state
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const headerRef = useRef(null);
  const submenuRef = useRef(null);

  // Language Config
  const languages = [
    { code: "id", name: "Indonesian", flag: "🇮🇩" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "fr", name: "French", flag: "🇫🇷" },
    { code: "vi", name: "Vietnamese", flag: "🇻🇳" },
    { code: "ar", name: "Arabic", flag: "🇸🇦" },
    { code: "zh", name: "Chinese", flag: "🇨🇳" },
    { code: "hi", name: "India", flag: "🇮🇳" },
  ];

  const [showSearch, setShowSearch] = useState(false);

  // Language state
  const { props } = usePage();
  const currentLang = props.lang;
  const [selectedLang, setSelectedLang] = useState(currentLang || "en");
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  // Language Data
  const {
    data: langData,
    loading: langLoading,
    error: langError
  } = useFetchData("/assets/lang/language.json");

  // Language Change Handler
  const handleLanguageChange = (langCode) => {
    fetch('/set-language', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
      },
      body: JSON.stringify({ lang: langCode }),
    })
      .then(() => {
        setSelectedLang(langCode);
        setShowLangDropdown(false);
        window.location.reload();
      })
      .catch(err => console.error('Language change failed:', err));
  };

  // Navbar Menu Items
  const menuItems = [
    { id: "home", label: (langData?.[17]?.lang?.[currentLang]?.[0]?.title) ?? "Home", href: "/" },
    { id: "product", label: (langData?.[17]?.lang?.[currentLang]?.[1]?.title) ?? "Product", href: "/#product-list" },
    { id: "gallery", label: (langData?.[17]?.lang?.[currentLang]?.[2]?.title) ?? "Gallery", href: '/gallery' },
    { id: "about-us", label: (langData?.[17]?.lang?.[currentLang]?.[3]?.title) ?? "About Us", href: "/about-us" },
  ];

  // Navbar special page config
  useEffect(() => {
    if (url !== "/" && url !== "/about-us") {
      setIsScrolled(true);
    } else {
      setIsScrolled(window.scrollY > window.innerHeight * 0.5);
    }
  }, [url]);

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Jika bukan halaman utama, abaikan logika scroll
      if (url !== "/" && url !== "/about-us") return;

      // Tutup menu saat scroll
      if (isMenuOpen) {
        setIsMenuOpen(false);
        setOpenSubmenu(null);
      }

      if (currentScrollY > window.innerHeight * 0.5) {
        setIsScrolled(true);

        // Hide header ketika scroll ke bawah
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setOpenSubmenu(null);
          setVisible(false);
        }
        // Tampilkan header ketika scroll ke atas
        else if (currentScrollY < lastScrollY) {
          setVisible(true);
        }
      } else {
        setIsScrolled(false);
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMenuOpen, url]);

  // modal Menu Close hander
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setOpenSubmenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search Handler
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      setTriggerSearch(true);
      setShowSearchModal(true);
    }
  };

  const searchUrl =
    triggerSearch && searchQuery.trim() !== ""
      ? `/api/search-data?search=${encodeURIComponent(searchQuery)}`
      : null;

  const { data: searchData, loading: isSearching, error: searchError } = useFetchData(
    searchUrl,
    {},
    [searchUrl]
  );

  useEffect(() => {
    if (searchData && searchData.success) {
      setSearchResults(searchData.data);
    }
  }, [searchData]);


  const toggleSubmenu = (menuId) => {
    setOpenSubmenu(openSubmenu === menuId ? null : menuId);
  };

  const handleMenuClick = (item) => {
    if (item.href === "/#product-list") {
      if (url === "/") {
        const target = document.getElementById("product-list");
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        router.visit("/", {
          onSuccess: () => {
            window.location.hash = "product-list";
          },
        });

      }
      setIsMenuOpen(false);
      return;
    }

    // Default behavior untuk menu lain
    if (item.href) {
      onCategoryChange(item.href);
      router.visit(item.href);
      setIsMenuOpen(false);
    } else if (item.submenu) {
      toggleSubmenu(item.id);
    }
  };


  const handleSubmenuClick = (href) => {
    onCategoryChange(href);
    router.visit(href);
    setOpenSubmenu(null);
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      id="header"
      ref={headerRef}
      initial={{
        backgroundColor: "rgba(255, 255, 255, 0)",
        y: 0,
      }}
      animate={{
        background: isScrolled
          ? "#B0160D"
          : activeCategory === "/product/expedition"
            ? "white"
            : "linear-gradient(to bottom, rgba(0, 0, 0, 0.48) 0%, rgba(255, 255, 255, 0) 100%)",
        backdropFilter: isScrolled ? "blur(8px)" : "blur(0px)",
        borderRadius: "0",
        boxShadow: isScrolled
          ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
          : "none",
        y: visible ? 0 : -100,
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 duration-100 ${isScrolled ? "bg-[#B0160D] backdrop-blur-sm" : "border-transparent"
        } py-4 max-sm:py-1 px-6 mx-auto w-full`}
    >
      <div className="relative flex flex-col md:flex-row items-center justify-between max-w-full md:mx-[64px]">
        <div className="flex justify-between w-full md:w-auto items-center">
          <div>
            <img className="w-[43px] hidden md:block" src="/assets/logo.png" alt="logo" />
          </div>
        </div>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center gap-[89px] absolute left-1/2 -translate-x-1/2">
          {menuItems.map((item) => (
            <div key={item.id} className="relative">
              <button
                onClick={() => handleMenuClick(item)}
                className={`flex items-center text-[24px] gap-1 px-3 py-2 rounded-md duration-150 transition-colors
                    ${url === "/" || url === "/about-us"
                    ? isScrolled
                      ? "text-white hover:bg-white/20"
                      : "text-white hover:bg-white/10"
                    : "text-white" // di luar route "/" tetap tanpa hover effect
                  }`}
              >
                {item.label}
                {item.submenu && (
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${openSubmenu === item.id ? "rotate-180" : ""
                      }`}
                  />
                )}
              </button>

              {item.submenu && openSubmenu === item.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  ref={submenuRef}
                  className="absolute top-full left-0 mt-2 w-64 p-2 rounded-lg shadow-lg bg-white"
                >
                  <div className="grid grid-cols-1 gap-2">
                    {item.submenu.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => handleSubmenuClick(subItem.href)}
                        className="flex items-start gap-3 p-3 rounded-md hover:bg-gray-100 text-gray-800"
                      >
                        <div className="p-2 rounded-md bg-gray-100">
                          {subItem.icon}
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{subItem.label}</div>
                          <div className="text-sm text-gray-600">
                            {subItem.description}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop buttons */}
        <div className="hidden md:flex items-center duration-150">
          <div id="language-selector">
            <div className="hidden md:flex items-center gap-4">
              {/* Language Selector */}
              <div className="relative" id="language-selector">
                <button
                  onClick={() => setShowLangDropdown(!showLangDropdown)}
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 border-white px-3 border py-1 text-white transition-all"
                >
                  <span className="text-xl">
                    {languages.find((l) => l.code === selectedLang)?.flag}
                  </span>
                  <span className="uppercase text-sm font-medium">
                    {selectedLang}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {showLangDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg z-50"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`flex items-center gap-3 px-4 py-2 w-full text-left hover:bg-gray-100 transition ${selectedLang === lang.code ? "bg-gray-100" : ""
                          }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span className="text-gray-800 font-medium uppercase">
                          {lang.code}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {lang.name}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Search Bar */}
              <input
                type="text"
                placeholder={(langData?.[17]?.lang?.[currentLang]?.[4]?.title) ?? "Search Here"}
                className="bg-white text-slate-500 px-3 py-2 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />

            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="flex items-center justify-between w-full md:hidden px-3 py-2 relative">
        {/* Kiri: Hamburger + Logo */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-[#1E3A5F] p-2 rounded"
          >
            <Menu className="text-white w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <img src="/assets/logo.png" alt="Logo" className="w-[36px]" />
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="flex items-center gap-1 border border-white bg-black px-2 py-1"
            >
              <span className="text-lg">
                {languages.find((l) => l.code === selectedLang)?.flag}
              </span>
              <ChevronDown className="text-white w-4 h-4" />
            </button>

            {showLangDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-md z-50"
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className="flex items-center gap-2 px-3 py-2 w-full text-left hover:bg-gray-100"
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="uppercase font-medium">{lang.code}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          <button
            onClick={() => setShowSearch(!showSearch)}
            className="bg-gray-100 p-2 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </button>
        </div>

        {showSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black flex items-center justify-between px-3"
          >
            {/* Hamburger tetap tampil */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-[#1E3A5F] p-2 rounded"
            >
              <Menu className="text-white w-5 h-5" />
            </button>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search here"
              autoFocus
              className="flex-1 mx-3 bg-gray-100 px-4 py-2 rounded outline-none text-gray-800 placeholder-gray-500"
            />

            {/* Tombol Tutup Search */}
            <button onClick={() => setShowSearch(false)}>
              <X className="text-white w-5 h-5" />
            </button>
          </motion.div>
        )}
      </div>

      {/* 🔹 MOBILE MENU DROPDOWN */}
      {isMenuOpen && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200 z-40"
        >
          <div className="flex flex-col p-4 space-y-3">
            {/* Tombol close di pojok kiri atas */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="self-end mb-2 p-1 rounded hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-gray-800" />
            </button>

            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item)}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-gray-800 text-base ${url === item.href ? "bg-blue-50" : "hover:bg-gray-100"
                  }`}
              >
                {/* Icon opsional berdasarkan label */}
                {item.label === "Home" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955a.75.75 0 011.06 0L21.219 12M4.5 9.75V20.25a.75.75 0 00.75.75H9.75v-5.25h4.5V21h4.5a.75.75 0 00.75-.75V9.75"
                    />
                  </svg>
                )}
                {item.label === "Product" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 4.5h16.5M3.75 9.75h16.5M3.75 15h16.5M3.75 20.25h16.5"
                    />
                  </svg>
                )}
                {item.label === "Gallery" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25v13.5A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 18.75V5.25z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 11.25l3 3 4.5-4.5"
                    />
                  </svg>
                )}
                {item.label === "About Us" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.964 0A9.718 9.718 0 0112 21a9.718 9.718 0 01-5.982-2.275m11.964 0A9.718 9.718 0 0012 21m0-17.25a3.375 3.375 0 110 6.75 3.375 3.375 0 010-6.75z"
                    />
                  </svg>
                )}
                {item.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Search Modal */}
      {showSearchModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] mt-[10rem]"
        >
          <div className="bg-white w-[90%] md:w-[600px] rounded-xl shadow-lg overflow-hidden">
            <div className="flex justify-between items-center border-b px-4 py-3">
              <h2 className="text-lg font-semibold text-gray-700">
                Search Results for "{searchQuery}"
              </h2>
              <button
                onClick={() => {
                  setShowSearchModal(false);
                  setTriggerSearch(false);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-4">
              {isSearching ? (
                <p className="text-center text-gray-500">Searching...</p>
              ) : searchError ? (
                <p className="text-center text-red-500">Error fetching results.</p>
              ) : searchResults?.length > 0 ? (
                searchResults.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      router.visit(
                        item.type === "motorcycle"
                          ? `/motorcycle/${item.slug}`
                          : `/commodity/${item.slug}`
                      );
                      setShowSearchModal(false);
                      setTriggerSearch(false);
                    }}
                    className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                  >
                    <img
                      src={item.product_image || item.image || "/assets/no-image.jpg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500 capitalize">{item.type}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No results found.</p>
              )}
            </div>
          </div>
        </motion.div>
      )}

    </motion.header>
  );
};

export default Header;
