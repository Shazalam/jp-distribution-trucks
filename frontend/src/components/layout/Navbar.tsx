"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { QuoteModal } from "@/components/ui/quote-modal";

const NAV_LINKS = [
  { name: "HOME", href: "/" },
  { name: "TRUCKS", href: "/trucks" },
  { name: "CUSTOM BUILDS", href: "/custom-builds" },
  { name: "PARTS & SUPPLY", href: "/parts-supply" },
  { name: "SPECIAL PARTS LOCATOR", href: "/special-parts-locator", badge: "NEW" },
  { name: "WHOLESALE & RETAIL", href: "/wholesale-retail" },
  { name: "ABOUT US", href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 h-[90px] flex flex-col justify-center",
        isScrolled
          ? "bg-black border-b border-white/10"
          : "bg-black border-b border-transparent"
      )}
    >
      <div className="max-w-[1800px] mx-auto px-6 lg:px-16 w-full">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl font-extrabold tracking-tighter text-white italic">
              JP
            </span>
            <div className="flex flex-col">
              <span className="text-xl font-bold leading-tight tracking-wide text-white">
                DISTRIBUTION
              </span>
              <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest">
                Import &bull; Export &bull; Logistics
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-bold transition-all duration-300 relative group",
                  isActive ? "text-white drop-shadow-[0_0_20px_rgba(220,38,38,1)] drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]" : "text-gray-300 hover:text-white"
                )}
              >
                {link.name}
                {link.badge && (
                  <span className="ml-2 bg-red-600 text-white text-[9px] px-1.5 py-0.5 rounded-sm">
                    {link.badge}
                  </span>
                )}
                <span className={cn(
                  "absolute -bottom-1 left-0 h-0.5 bg-red-600 transition-all duration-300",
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                )}></span>
              </Link>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-bold text-sm transition-colors shadow-[0_0_15px_rgba(217,4,41,0.3)] hover:shadow-[0_0_25px_rgba(217,4,41,0.5)]"
            >
              GET A QUOTE
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-red-500 transition-colors"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-[90px] left-0 w-full bg-black border-b border-white/10 overflow-hidden shadow-2xl"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-3 py-3 text-base font-bold rounded-md transition-all duration-300",
                    isActive ? "text-white drop-shadow-[0_0_20px_rgba(220,38,38,1)] drop-shadow-[0_0_8px_rgba(220,38,38,0.8)] bg-red-600/20 border-l-4 border-red-600 pl-2" : "text-gray-300 hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.name}
                  {link.badge && (
                    <span className="ml-2 bg-red-600 text-white text-[9px] px-1.5 py-0.5 rounded-sm">
                      {link.badge}
                    </span>
                  )}
                </Link>
                );
              })}
              <div className="pt-4">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsQuoteModalOpen(true);
                  }}
                  className="block w-full text-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-bold text-sm transition-colors"
                >
                  GET A QUOTE
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
    </nav>
  );
}
