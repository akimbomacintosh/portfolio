"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavLink = { label: string; href: string };

export default function NavBar({
  brandName = "Joshua Hall",
  links = [],
  contactLabel = "Contact",
}: {
  brandName?: string;
  links?: NavLink[];
  contactLabel?: string;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAdmin = pathname.startsWith("/keystatic");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.68);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const visible = !isHome || scrolled;

  if (isAdmin) return null;

  return (
    <header
      className="border-b"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        background: "rgba(0,0,0,0.88)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderColor: "#1f1f1f",
        transition: "transform .4s cubic-bezier(.2,0,0,1), opacity .4s ease",
        transform: visible ? "translateY(0)" : "translateY(-110%)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div className="flex items-center justify-between gap-6" style={{ padding: "0 clamp(24px,5vw,80px)", height: 56 }}>
        <a
          href="/"
          className="flex shrink-0 items-center transition-colors hover:text-white"
          style={{ gap: 10, color: "#ededed", fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}
        >
          <span style={{ display: "inline-block", width: 8, height: 8, background: "linear-gradient(135deg,#1D4ED8,#0e7490)", borderRadius: "50%" }} />
          {brandName}
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center sm:flex" style={{ gap: 4 }}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-[#ededed]"
              style={{ padding: "6px 12px", fontSize: 13.5, color: pathname === link.href ? "#ffffff" : "#8f8f8f" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/contact"
            className="transition-colors hover:border-[#737373] hover:text-white"
            style={{ marginLeft: 10, padding: "7px 16px", fontSize: 13.5, color: "#d4d4d4", border: "1px solid #2f2f2f" }}
          >
            {contactLabel}
          </a>
        </nav>

        {/* Mobile: contact + hamburger */}
        <div className="flex items-center gap-3 sm:hidden">
          <a href="/contact" style={{ padding: "7px 14px", fontSize: 13.5, color: "#d4d4d4", border: "1px solid #2f2f2f" }}>
            {contactLabel}
          </a>
          <button onClick={() => setMenuOpen((o) => !o)} className="p-1 text-neutral-400 hover:text-white" aria-label="Toggle menu">
            {menuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav className="sm:hidden" style={{ borderTop: "1px solid #1f1f1f", background: "rgba(0,0,0,0.96)" }}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block transition-colors hover:text-[#ededed]"
              style={{ borderBottom: "1px solid #141414", padding: "14px 24px", fontSize: 14, color: pathname === link.href ? "#ffffff" : "#8f8f8f" }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
