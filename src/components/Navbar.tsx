"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Calculator", href: "/calculator" },
  { label: "Industries", href: "#industries" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex gap-0.5">
              <div className="w-2 h-6 bg-[#00AEEF] rounded-sm" />
              <div className="w-2 h-6 bg-[#EC008C] rounded-sm" />
              <div className="w-2 h-6 bg-[#FFD700] rounded-sm" />
              <div className="w-2 h-6 bg-[#0A0A0A] rounded-sm" />
            </div>
            <span className="font-bold text-lg text-brand-black tracking-tight">
              M&T Printing Group
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-brand-black transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 bg-brand-black text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors"
            >
              Build Your Wrap
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-md text-brand-black"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-base font-medium text-gray-700 hover:text-brand-black py-1"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/calculator"
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center bg-brand-black text-white text-sm font-semibold px-5 py-3 rounded-full"
              >
                Build Your Wrap
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
