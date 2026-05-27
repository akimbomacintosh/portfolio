"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { label: "Coursework", href: "/coursework" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Music", href: "/music" },
  { label: "Videography", href: "/videography" },
  { label: "Downloads", href: "/files" },
];

export default function NavBar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const visible = !isHome || scrolled;

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b border-neutral-800 bg-black/90 backdrop-blur-sm transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3">
        <a href="/" className="shrink-0 font-semibold text-neutral-100 hover:text-white">
          Joshua Hall
        </a>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 text-sm transition-colors ${
                pathname === link.href ? "text-white" : "text-neutral-400 hover:text-neutral-100"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/contact"
            className="ml-2 rounded border border-neutral-700 px-3 py-1.5 text-sm text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white"
          >
            Contact
          </a>
        </nav>

        {/* Mobile: contact + hamburger */}
        <div className="flex items-center gap-3 sm:hidden">
          <a
            href="/contact"
            className="rounded border border-neutral-700 px-3 py-1.5 text-sm text-neutral-300"
          >
            Contact
          </a>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="p-1 text-neutral-400 hover:text-white"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav className="border-t border-neutral-800 bg-black/95 sm:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`block border-b border-neutral-900 px-6 py-3.5 text-sm transition-colors ${
                pathname === link.href ? "text-white" : "text-neutral-400 hover:text-neutral-100"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
