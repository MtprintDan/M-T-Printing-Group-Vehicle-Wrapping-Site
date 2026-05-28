"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ExternalLink, ChevronDown, Phone, Mail, FileText } from "lucide-react";

/* ─── Mega-menu data (2 columns — no Resources) ────────────────── */
const megaMenu = [
  {
    heading: "Vehicle Packages",
    accent: "#00AEEF",
    items: [
      { label: "Base Decal",    href: "/packages/base-decal",    dot: "#00AEEF" },
      { label: "Partial Wrap",  href: "/packages/partial-wrap",  dot: "#EC008C" },
      { label: "Full Wrap",     href: "/packages/full-wrap",     dot: "#FFD700" },
      { label: "Fleet Branding",href: "/packages/fleet-programs",dot: "#ffffff" },
    ],
  },
  {
    heading: "Specialty Services",
    accent: "#EC008C",
    items: [
      { label: "Trailer Decals / Wraps",   href: "/specialty" },
      { label: "Murals / Wall Graphics",   href: "/specialty" },
      { label: "Window Graphics & Perf",   href: "/specialty" },
      { label: "Installation Only",        href: "/specialty" },
      { label: "Graphic Design",           href: "/specialty" },
    ],
  },
];

const navLinks = [
  { label: "Pricing",         href: "/#pricing",    hoverClass: "hover:text-[#EC008C]" },
  { label: "Estimator",       href: "/calculator",  hoverClass: "hover:text-[#FFD700]", badge: "Beta" },
  { label: "Gallery",         href: "/gallery",     hoverClass: "hover:text-[#00AEEF]" },
  { label: "About",           href: "/about",       hoverClass: "hover:text-[#EC008C]" },
  { label: "FAQ",             href: "/#faq",        hoverClass: "hover:text-[#FFD700]" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileSvcOpen, setMobileSvcOpen] = useState(false);
  const megaTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMega  = () => { clearTimeout(megaTimeout.current); setMegaOpen(true); };
  const closeMega = () => { megaTimeout.current = setTimeout(() => setMegaOpen(false), 150); };

  const shadowCls = scrolled ? "shadow-xl shadow-black/30" : "";

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#0A0A0A] nav-grid-bg ${shadowCls}`}
    >
      {/* ── Utility bar ─────────────────────────────────────────── */}
      <div className="hidden lg:block border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between">
          <p className="text-[11px] text-gray-500 tracking-wide font-medium">
            Waterloo&nbsp;•&nbsp;London&nbsp;•&nbsp;Guelph&nbsp;•&nbsp;Cambridge
          </p>
          <div className="flex items-center gap-4">
            <a href="tel:5198364441" className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-[#00AEEF] transition-colors font-medium">
              <Phone size={10} /> Call Now
            </a>
            <a href="mailto:guelph@mtprint.com" className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-[#00AEEF] transition-colors font-medium">
              <Mail size={10} /> Email
            </a>
            <Link href="/quote" className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-[#EC008C] transition-colors font-medium">
              <FileText size={10} /> Get Quote
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main nav ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-28">

          {/* Logo + label */}
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <Image
              src="/logo.png"
              alt="M&T Printing Group"
              width={320}
              height={128}
              className="h-24 w-auto object-contain shrink-0"
              priority
            />
            <div className="hidden lg:flex flex-col justify-center border-l border-white/15 pl-3">
              <span className="text-sm font-bold text-white leading-tight tracking-tight">
                Wrapping
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500 leading-tight">
                  Division
                </span>
                <span className="text-[8px] font-bold uppercase tracking-widest bg-[#00AEEF] text-white px-1.5 py-0.5 rounded-full leading-none">
                  v6
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-7">
            <div onMouseEnter={openMega} onMouseLeave={closeMega} className="relative">
              <button className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-[#00AEEF] transition-colors py-2">
                Services
                <ChevronDown size={13} className={`transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`} />
              </button>
            </div>

            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className={`relative text-sm font-medium text-gray-300 ${l.hoverClass} transition-colors`}
              >
                {l.label}
                {l.badge && (
                  <span className="absolute -top-2.5 -right-5 text-[8px] font-bold bg-[#EC008C] text-white px-1.5 py-0.5 rounded-full uppercase tracking-wide leading-none">
                    {l.badge}
                  </span>
                )}
              </Link>
            ))}
            <a
              href="https://mt-printing-group.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-300 transition-colors"
            >
              Main Site <ExternalLink size={11} />
            </a>
          </nav>

          {/* CTA */}
          <div className="hidden md:block shrink-0">
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 bg-[#EC008C] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#D0007A] transition-colors"
            >
              Build Your Wrap
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-md text-gray-300"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── CMYK ribbon ──────────────────────────────────────────── */}
      <div className="cmyk-ribbon h-[3px]" />

      {/* ── Compact Mega Menu ────────────────────────────────────── */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
            className="absolute left-0 right-0 z-40"
          >
            <div className="bg-[#111111] border-b border-white/10 shadow-2xl shadow-black/50">
              <div className="max-w-3xl mx-auto px-6 lg:px-8 py-6">
                <div className="grid grid-cols-2 gap-10">
                  {megaMenu.map((col) => (
                    <div key={col.heading}>
                      <p
                        className="text-[10px] font-bold uppercase tracking-widest mb-3 pb-2 border-b border-white/10"
                        style={{ color: col.accent }}
                      >
                        {col.heading}
                      </p>
                      <ul className="space-y-0.5">
                        {col.items.map((item) => (
                          <li key={item.label}>
                            <Link
                              href={item.href}
                              onClick={() => setMegaOpen(false)}
                              className="flex items-center gap-2 py-1.5 px-2 rounded-md text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                            >
                              {"dot" in item && item.dot ? (
                                <span
                                  className="w-1.5 h-1.5 rounded-full shrink-0 inline-block"
                                  style={{ backgroundColor: item.dot }}
                                />
                              ) : (
                                <span className="w-1.5 h-1.5 rounded-full shrink-0 inline-block bg-gray-600" />
                              )}
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Footer strip */}
                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    Professional fleet branding across Ontario —{" "}
                    <span className="font-medium text-gray-400">11 locations</span>
                  </p>
                  <Link
                    href="/quote"
                    onClick={() => setMegaOpen(false)}
                    className="text-xs font-semibold text-[#EC008C] hover:underline"
                  >
                    Request a quote →
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile menu ──────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#111111] border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 flex flex-col gap-2">
              <div>
                <button
                  onClick={() => setMobileSvcOpen(!mobileSvcOpen)}
                  className="flex items-center justify-between w-full text-base font-medium text-gray-300 py-2"
                >
                  Services
                  <ChevronDown size={15} className={`transition-transform duration-200 ${mobileSvcOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileSvcOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-3 pb-2 flex flex-col gap-1">
                        {megaMenu.flatMap((col) => col.items.slice(0, 3)).map((item) => (
                          <Link
                            key={item.href + item.label}
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            className="py-1.5 text-sm text-gray-500 hover:text-white transition-colors"
                          >
                            {"dot" in item && item.dot
                              ? <span className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle" style={{ backgroundColor: String(item.dot) }} />
                              : null}
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-base font-medium text-gray-300 hover:text-white py-1.5 transition-colors"
                >
                  {l.label}{l.badge ? ` (${l.badge})` : ""}
                </Link>
              ))}
              <a
                href="https://mt-printing-group.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-medium text-gray-500 py-1.5 flex items-center gap-1"
              >
                Main Site <ExternalLink size={13} />
              </a>
              <Link
                href="/calculator"
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center bg-[#EC008C] text-white text-sm font-semibold px-5 py-3 rounded-full"
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
