import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Button } from "@/Components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { router, usePage } from "@inertiajs/react";

const Header = ({ activeCategory, onCategoryChange }) => {
  const { url } = usePage(); // 🔹 Dapatkan route aktif dari Inertia
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const { scrollY } = useScroll();
  const headerRef = useRef(null);
  const submenuRef = useRef(null);

  const languages = [
    { code: "id", name: "Indonesian", flag: "🇮🇩" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "fr", name: "French", flag: "🇫🇷" },
    { code: "de", name: "German", flag: "🇩🇪" },
    { code: "es", name: "Spanish", flag: "🇪🇸" },
    { code: "ja", name: "Japanese", flag: "🇯🇵" },
    { code: "ko", name: "Korean", flag: "🇰🇷" },
    { code: "zh-CN", name: "Chinese", flag: "🇨🇳" },
    { code: "ar", name: "Arabic", flag: "🇸🇦" },
    { code: "ru", name: "Russian", flag: "🇷🇺" },
  ];

  const [selectedLang, setSelectedLang] = useState("en");
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const handleLanguageChange = (langCode) => {
    const select = document.querySelector(".goog-te-combo");
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event("change"));
    }
    setSelectedLang(langCode);
    setShowLangDropdown(false);
  };

  // Menu data
  const menuItems = [
    { id: "home", label: "Home", href: "/" },
    { id: "product", label: "Product" },
    { id: "gallery", label: "Gallery" },
    { id: "about-us", label: "About Us", href: "/about-us" },
  ];

  // 🔹 Deteksi route — jika bukan "/", set scrolled true secara default
  useEffect(() => {
    if (url !== "/" && url !== "/about-us") {
      setIsScrolled(true);
    } else {
      setIsScrolled(window.scrollY > window.innerHeight * 0.5);
    }
  }, [url]);

  // Handle scroll behavior
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

  // Tutup menu ketika klik di luar area header
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

  const toggleSubmenu = (menuId) => {
    setOpenSubmenu(openSubmenu === menuId ? null : menuId);
  };

  const handleMenuClick = (item) => {
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
      className={`fixed top-0 left-0 right-0 z-50 duration-100 ${
        isScrolled ? "bg-[#B0160D] backdrop-blur-sm" : "border-transparent"
      } py-4 max-sm:py-1 px-6 mx-auto w-full`}
    >
      <div className="relative flex flex-col md:flex-row items-center justify-between max-w-full mx-[64px]">
        <div className="flex justify-between w-full md:w-auto items-center">
          <div>
            <img className="w-[43px]" src="/assets/logo.png" alt="logo" />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X
                className={`h-6 w-6 ${
                  isScrolled
                    ? "text-black"
                    : activeCategory === "/product/expedition"
                    ? "text-black"
                    : "text-white"
                }`}
              />
            ) : (
              <Menu
                className={`h-6 w-6 ${
                  isScrolled
                    ? "text-black"
                    : activeCategory === "/product/expedition"
                    ? "text-black"
                    : "text-white"
                }`}
              />
            )}
          </button>
        </div>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center gap-[89px] absolute left-1/2 -translate-x-1/2">
          {menuItems.map((item) => (
            <div key={item.id} className="relative">
              <button
                  onClick={() => handleMenuClick(item)}
                  className={`flex items-center text-[24px] gap-1 px-3 py-2 rounded-md duration-150 transition-colors
                    ${
                      url === "/" || url === "/about-us"
                        ? isScrolled
                          ? "text-white hover:bg-white/20"  // ⬅️ perbaikan di sini
                          : "text-white hover:bg-white/10"
                        : "text-white" // di luar route "/" tetap tanpa hover effect
                    }`}
                >
                {item.label}
                {item.submenu && (
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      openSubmenu === item.id ? "rotate-180" : ""
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
                        className={`flex items-center gap-3 px-4 py-2 w-full text-left hover:bg-gray-100 transition ${
                          selectedLang === lang.code ? "bg-gray-100" : ""
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

              <div id="google_translate_element" className="hidden"></div>

              <input
                type="text"
                placeholder="Search Here"
                className="bg-white text-slate-500 px-3 py-2 outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
