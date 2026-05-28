import Link from "next/link";

const quickLinks = [
  { label: "About Us", href: "/#about" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Create", href: "/calculator" },
  { label: "Gallery", href: "/gallery" },
  { label: "Get a Quote", href: "/quote" },
  { label: "FAQ", href: "/#faq" },
];

const packages = [
  { label: "Base Decal Package", href: "/packages/base-decal", color: "#00AEEF" },
  { label: "Partial Wrap Package", href: "/packages/partial-wrap", color: "#EC008C" },
  { label: "Full Wrap Package", href: "/packages/full-wrap", color: "#FFD700" },
  { label: "Fleet Program", href: "/packages/fleet-programs", color: "#ffffff" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                <div className="w-2 h-5 bg-[#00AEEF] rounded-sm" />
                <div className="w-2 h-5 bg-[#EC008C] rounded-sm" />
                <div className="w-2 h-5 bg-[#FFD700] rounded-sm" />
                <div className="w-2 h-5 bg-white rounded-sm" />
              </div>
              <span className="font-bold text-base">M&T Printing Group</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Professional fleet branding and vehicle graphics for commercial operators across the region.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://mt-printing-group.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Main Site ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Packages */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">
              Packages
            </h3>
            <ul className="space-y-2.5">
              {packages.map((pkg) => (
                <li key={pkg.label}>
                  <Link
                    href={pkg.href}
                    className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors group"
                  >
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: pkg.color }}
                    />
                    {pkg.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">
              Contact
            </h3>
            <ul className="space-y-1.5 text-sm text-gray-300">
              <li>Mon – Fri: 8:30am – 5pm</li>
              <li>Sat – Sun: Closed</li>
              <li className="pt-2">
                <a href="tel:5198364441" className="hover:text-white transition-colors">
                  519-836-4441
                </a>
              </li>
              <li>
                <a
                  href="mailto:guelph@mtprint.com"
                  className="hover:text-white transition-colors"
                >
                  guelph@mtprint.com
                </a>
              </li>
              <li>
                <a
                  href="https://mtprint.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  mtprint.com
                </a>
              </li>
              <li className="pt-3">
                <Link
                  href="/quote"
                  className="inline-block bg-[#00AEEF] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-cyan-600 transition-colors"
                >
                  Request a Quote
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} M&T Printing Group. All rights reserved.</p>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-[#00AEEF]" />
            <div className="w-3 h-3 rounded-full bg-[#EC008C]" />
            <div className="w-3 h-3 rounded-full bg-[#FFD700]" />
            <div className="w-3 h-3 rounded-full bg-white" />
          </div>
        </div>
      </div>
    </footer>
  );
}
