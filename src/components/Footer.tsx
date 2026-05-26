import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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

          {/* Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Pricing Calculator", href: "/calculator" },
                { label: "Get a Quote", href: "/quote" },
                { label: "Services", href: "/#services" },
                { label: "Industries", href: "/#industries" },
                { label: "FAQ", href: "/#faq" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
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
            <ul className="space-y-2 text-sm text-gray-300">
              <li>info@mtprintinggroup.com</li>
              <li>Mon–Fri, 8am–5pm</li>
              <li className="pt-4">
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
