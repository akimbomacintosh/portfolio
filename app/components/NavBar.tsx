"use client";

import { usePathname } from "next/navigation";

const links = [
  { label: "Coursework", href: "/coursework" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Music", href: "/music" },
  { label: "Videography", href: "/videography" },
  { label: "Files", href: "/files" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-black/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3">
        <a
          href="/"
          className="shrink-0 font-semibold text-neutral-100 hover:text-white"
        >
          Joshua Hall
        </a>

        <nav className="flex flex-wrap items-center gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 text-sm transition-colors ${
                pathname === link.href
                  ? "text-white"
                  : "text-neutral-400 hover:text-neutral-100"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/contact"
            className="ml-2 border border-neutral-700 px-3 py-1.5 text-sm text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
