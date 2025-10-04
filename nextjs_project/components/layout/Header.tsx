"use client"

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/../components/ui/button";
import { Menu, X, ChevronDown, Car, Leaf, Truck, Cigarette } from "lucide-react";

import { useRouter } from 'next/navigation';

interface HeaderProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  href?: string;
  submenu?: SubMenuItem[];
}

interface SubMenuItem {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

const Header = ({ activeCategory, onCategoryChange }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const headerRef = useRef<HTMLElement>(null);
  const submenuRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  // Menu data
  const menuItems: MenuItem[] = [
    {
      id: "home",
      label: "Homepage",
      href: "/"
    },
    {
      id: "corporate",
      label: "Corporate",
      href: "/corporate"
    },
    {
      id: "product",
      label: "Product",
      submenu: [
        {
          id: "otomotif",
          label: "Otomotif",
          description: "Solusi transportasi modern untuk kebutuhan Anda",
          icon: <Car className="h-6 w-6" />,
          href: "/product/otomotif"
        },
        {
          id: "comodity",
          label: "Komoditas",
          description: "Produk-produk unggulan dari sumber daya alam terbaik",
          icon: <Leaf className="h-6 w-6" />,
          href: "/product/comodity"
        },
        {
          id: "expedition",
          label: "Expedition",
          description: "Layanan logistik dan ekspedisi terpercaya",
          icon: <Truck className="h-6 w-6" />,
          href: "/product/expedition"
        },
        {
          id: "tobacos",
          label: "Tobacos",
          description: "Produk tembakau berkualitas tinggi",
          icon: <Cigarette className="h-6 w-6" />,
          href: "/product/tobacos"
        }
      ]
    }
  ];

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Close menu when scrolling
      if (isMenuOpen) {
        setIsMenuOpen(false);
        setOpenSubmenu(null);
      }
      
      if (currentScrollY > window.innerHeight * 0.5) {
        setIsScrolled(true);
        
        // Hide header when scrolling down
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setOpenSubmenu(null);
          setVisible(false);
        } 
        // Show header when scrolling up
        else if (currentScrollY < lastScrollY) {
          setVisible(true);
        }
      } else {
        setIsScrolled(false);
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMenuOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setOpenSubmenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle submenu
  const toggleSubmenu = (menuId: string) => {
    setOpenSubmenu(openSubmenu === menuId ? null : menuId);
  };

  // Handle menu click
  const handleMenuClick = (item: MenuItem) => {
    if (item.href) {
      onCategoryChange(item.href);
      router.push(item.href);
      setIsMenuOpen(false);
    } else if (item.submenu) {
      toggleSubmenu(item.id);
    }
  };

  // Handle submenu click
  const handleSubmenuClick = (href: string) => {
    onCategoryChange(href);
    router.push(href);
    setOpenSubmenu(null);
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      ref={headerRef}
      initial={{ 
        backgroundColor: "rgba(255, 255, 255, 0)", 
        y: 0
      }}
      animate={{
        background: isScrolled
          ? "rgba(255, 255, 255, 0.8)"
          // : "linear-gradient(to bottom, rgba(0, 0, 0, 0.48) 0%, rgba(255, 255, 255, 0) 100%)",
          :  activeCategory == '/product/expedition' ? 'white' : "linear-gradient(to bottom, rgba(0, 0, 0, 0.48) 0%, rgba(255, 255, 255, 0) 100%)",
        backdropFilter: isScrolled ? "blur(8px)" : "blur(0px)",
        borderRadius: isScrolled ? "0" : "0",
        boxShadow: isScrolled ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none",
        y: visible ? 0 : -100
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 duration-100 ${
        isScrolled ? "bg-white/80 backdrop-blur-sm border-b border-gray-200" : "border-transparent"
      } py-4 max-sm:py-1 px-6 mx-auto w-full`}
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
        <div className="flex justify-between w-full md:w-auto items-center">
          <div className={`text-2xl max-sm:text-lg md:font-bold ${isScrolled ? 'text-black' : activeCategory === '/product/expedition' ? 'text-black' : 'text-white'}`}>Wajira</div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className={`h-6 w-6 ${isScrolled ? 'text-black' : activeCategory === '/product/expedition' ? 'text-black' : 'text-white'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled ? 'text-black' : activeCategory === '/product/expedition' ? 'text-black' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center gap-6 relative">
          {menuItems.map((item) => (
            <div key={item.id} className="relative">
              <button
                onClick={() => handleMenuClick(item)}
                className={`flex items-center gap-1 px-3 py-2 rounded-md duration-150 ${
                  isScrolled ? 'text-black hover:bg-gray-100' : activeCategory === '/product/expedition' ? 'text-black hover:bg-gray-100' : 'text-white hover:bg-white/10'
                } transition-colors`}
              >
                {item.label}
                {item.submenu && (
                  <ChevronDown className={`h-4 w-4 transition-transform ${
                    openSubmenu === item.id ? 'rotate-180' : ''
                  }`} />
                )}
              </button>
              
              {item.submenu && openSubmenu === item.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  ref={submenuRef}
                  className={`absolute top-full left-0 mt-2 w-64 p-2 rounded-lg shadow-lg duration-150 bg-white`}
                >
                  <div className="grid grid-cols-1 gap-2">
                    {item.submenu.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => handleSubmenuClick(subItem.href)}
                        className={`flex items-start gap-3 p-3 rounded-md transition-colors hover:bg-gray-100 text-gray-800`}
                      >
                        <div className="p-2 rounded-md bg-gray-100">
                          {subItem.icon}
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{subItem.label}</div>
                          <div className="text-sm text-gray-600">{subItem.description}</div>
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
          <Button variant="ghost" size="sm" className={isScrolled ? "text-black" : activeCategory === '/product/expedition' ? 'text-black' : "text-white"}>
            Login
          </Button>
          <Button size="sm" className="ml-2">
            Sign Up
          </Button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`w-full md:hidden overflow-hidden ${isScrolled ? '' : 'bg-white rounded-lg px-2 pb-5'}`}
          >
            <div className="flex flex-col items-center gap-2 pt-4">
              {menuItems.map((item) => (
                <div key={item.id} className="w-full">
                  <button
                    onClick={() => handleMenuClick(item)}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-md text-black hover:bg-gray-100 ${isScrolled ? '' : 'bg-white'}`}
                  >
                    {item.label}
                    {item.submenu && (
                      <ChevronDown className={`h-4 w-4 transition-transform ${
                        openSubmenu === item.id ? 'rotate-180' : ''
                      }`} />
                    )}
                  </button>
                  
                  {item.submenu && openSubmenu === item.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-4 mt-1"
                    >
                      <div className="grid grid-cols-1 gap-2">
                        {item.submenu.map((subItem) => (
                          <button
                            key={subItem.id}
                            onClick={() => handleSubmenuClick(subItem.href)}
                            className={`flex items-start gap-3 p-3 rounded-md w-full hover:bg-gray-100 text-gray-800 ${isScrolled ? '' : 'bg-white'}`}
                          >
                            <div className="p-2 rounded-md bg-gray-100">
                              {subItem.icon}
                            </div>
                            <div className="text-left">
                              <div className="font-medium">{subItem.label}</div>
                              <div className="text-sm max-sm:text-xs text-gray-500">{subItem.description}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
              
              <div className="flex w-full gap-2 mt-4">
                <Button variant="ghost" size="sm" className="w-full">
                  Login
                </Button>
                <Button size="sm" className="w-full">
                  Sign Up
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;