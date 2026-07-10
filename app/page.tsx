import { createReader } from "@keystatic/core/reader";
import config from "../keystatic.config";

const reader = createReader(process.cwd(), config);

function sectionIcon(href: string) {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    width: 24,
    height: 24,
  };
  switch (href) {
    case "/coursework":
      return (
        <svg {...props}>
          <path d="M2 8 12 3 22 8 12 13Z" />
          <path d="M6 10.5V16c0 1.2 2.7 3 6 3s6-1.8 6-3v-5.5" />
          <path d="M22 8v6" />
        </svg>
      );
    case "/projects":
      return (
        <svg {...props}>
          <path d="M12 2 2 7l10 5 10-5Z" />
          <path d="M2 12l10 5 10-5" />
          <path d="M2 17l10 5 10-5" />
        </svg>
      );
    case "/experience":
      return (
        <svg {...props}>
          <rect x="3" y="7" width="18" height="13" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M3 12.5h18" />
        </svg>
      );
    case "/music":
      return (
        <svg {...props}>
          <path d="M2 12h3l2.5-7 4 16 3-11 1.8 5 1.7-3H22" />
        </svg>
      );
    case "/videography":
      return (
        <svg {...props}>
          <rect x="2" y="6" width="13" height="12" rx="1" />
          <path d="M15 10l6-3.5v11L15 14Z" />
        </svg>
      );
    case "/files":
      return (
        <svg {...props}>
          <path d="M12 3v11" />
          <path d="M7.5 10 12 14.5 16.5 10" />
          <path d="M4 20h16" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}

function socialLogo(label: string) {
  const p = { viewBox: "0 0 24 24", fill: "currentColor", width: 22, height: 22, "aria-hidden": true as const };
  switch (label.toLowerCase()) {
    case "github":
      return (
        <svg {...p}>
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23A11.509 11.509 0 0 1 12 6.293a11.51 11.51 0 0 1 3.006.404c2.29-1.552 3.297-1.23 3.297-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...p}>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...p}>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg {...p}>
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      );
    default:
      return null;
  }
}

export default async function Home() {
  const [home, site] = await Promise.all([
    reader.singletons.home.read(),
    reader.singletons.site.read(),
  ]);

  const firstName = home?.firstName || "Joshua";
  const lastName = home?.lastName || "Hall";
  const subtitleLine1 = home?.subtitleLine1 || "Electrical & Computer Engineer";
  const subtitleLine2 = home?.subtitleLine2 || "University of Washington";
  const heroButton = home?.heroButton || "Contact Me";
  const scrollLabel = home?.scrollLabel || "Scroll";
  const exploreHeading = home?.exploreHeading || "Explore.";
  const exploreIntro = home?.exploreIntro || "See what I've been up to:";
  const cards = (home?.cards ?? []).filter((c) => c.title) as {
    title: string;
    desc: string;
    href: string;
  }[];
  const socialHeading = home?.socialHeading || "Social media.";
  const socials = (site?.socials ?? []).filter((s) => s.label && s.url) as {
    label: string;
    url: string;
  }[];
  const footerText = (site?.footerText || "© {year} Joshua Hall").replace(
    "{year}",
    new Date().getFullYear().toString()
  );

  return (
    <>
      {/* Full-screen white hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center bg-white">
        <div className="w-full px-[3vw] text-center">
          <h1
            className="whitespace-nowrap font-bold leading-none tracking-tight text-black"
            style={{ fontSize: "clamp(3.5rem, 15vw, 18rem)" }}
          >
            <span style={{ display: "inline-block", opacity: 0, animation: "word-from-left 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.05s forwards" }}>
              {firstName}
            </span>
            {" "}
            <span style={{ display: "inline-block", opacity: 0, animation: "word-from-right 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards" }}>
              {lastName}
            </span>
            <span
              style={{
                display: "inline-block",
                marginLeft: "-0.03em",
                backgroundImage: "linear-gradient(to right, #2563EB, #3B82F6, #0EA5E9)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                opacity: 0,
                animation: "word-from-right 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.28s forwards",
              }}
            >
              .
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="mt-6 uppercase tracking-[0.3em] text-neutral-500 leading-relaxed"
            style={{ fontSize: "clamp(0.65rem, 1.3vw, 1rem)", opacity: 0, animation: "fade-in-sub 0.9s ease 1.1s forwards" }}
          >
            <span className="whitespace-nowrap">{subtitleLine1}</span>
            <span className="hidden sm:inline"> &nbsp;·&nbsp; </span>
            <br className="sm:hidden" />
            <span className="whitespace-nowrap">{subtitleLine2}</span>
          </p>
        </div>

        {/* Contact button */}
        <div
          className="absolute bottom-24 text-center"
          style={{ opacity: 0, animation: "fade-in-sub 0.9s ease 1.55s forwards" }}
        >
          <a
            href="/contact"
            className="hero-contact inline-block px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
          >
            {heroButton}
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-neutral-400"
          style={{ opacity: 0, animation: "fade-in-sub 0.9s ease 1.55s forwards" }}
        >
          <span>{scrollLabel}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-4 w-4 animate-bounce"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </section>

      {/* Explore — full-width grid */}
      <section style={{ paddingTop: "clamp(24px, 4vh, 48px)" }}>
        <div style={{ padding: "0 clamp(24px, 5vw, 80px)", marginBottom: "clamp(32px, 5vh, 56px)" }}>
          <h2
            className="font-semibold tracking-[-0.02em] leading-[1.05] text-[#ededed] m-0"
            style={{ fontSize: "clamp(34px, 5vw, 60px)" }}
          >
            {exploreHeading}
          </h2>
          <p className="mt-4 text-lg text-[#737373]">{exploreIntro}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#262626] border-t border-b border-[#262626]">
          {cards.map((card, i) => (
            <a
              key={card.title}
              href={card.href}
              className="shimmer-box group relative overflow-hidden bg-black flex flex-col justify-between gap-9 transition-colors duration-300 hover:bg-[#171717]"
              style={{ minHeight: "clamp(280px, 32vh, 380px)", padding: "clamp(28px, 3vw, 48px)" }}
            >
              {/* Accent bar */}
              <div className="tile-bar" />

              {/* Icon + number */}
              <div className="relative z-[1] flex items-start justify-between">
                <div className="flex items-center justify-center w-[52px] h-[52px] border border-[#262626] text-[#a3a3a3] transition-colors duration-300 group-hover:border-[#525252] group-hover:text-[#ededed]">
                  {sectionIcon(card.href)}
                </div>
                <span className="font-mono text-xs tracking-[0.1em] text-[#404040] transition-colors duration-300 group-hover:text-[#a3a3a3]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Title + arrow + description */}
              <div className="relative z-[1]">
                <div className="flex items-center justify-between gap-4">
                  <h3
                    className="font-semibold tracking-[-0.02em] m-0 text-[#ededed] leading-tight"
                    style={{ fontSize: "clamp(26px, 2.4vw, 40px)" }}
                  >
                    {card.title}
                  </h3>
                  <span className="text-[22px] text-[#525252] shrink-0 transition-all duration-300 group-hover:translate-x-[7px] group-hover:text-[#ededed]">
                    →
                  </span>
                </div>
                <p className="max-w-[32ch] mt-[14px] text-[16px] leading-[1.6] text-[#525252] mb-0">
                  {card.desc}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Socials */}
      <section id="social" style={{ paddingTop: "clamp(48px, 8vh, 96px)", paddingBottom: "clamp(48px, 8vh, 96px)" }}>
        <div style={{ paddingLeft: "clamp(24px, 5vw, 80px)", paddingRight: "clamp(24px, 5vw, 80px)" }}>
          <h2
            className="font-semibold tracking-[-0.02em] leading-[1.05] text-[#ededed] m-0"
            style={{ fontSize: "clamp(22px, 3vw, 30px)" }}
          >
            {socialHeading}
          </h2>
        </div>

        {/* Social logo buttons */}
        <div
          className="flex items-center gap-3 mt-6"
          style={{ paddingLeft: "clamp(24px, 5vw, 80px)" }}
        >
          {socials.map((s) => (
            <a
              key={s.url}
              className="shrink-0 flex items-center justify-center rounded-none border border-neutral-800 bg-black px-5 py-3 text-white transition-colors hover:bg-neutral-900"
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
            >
              {socialLogo(s.label)}
            </a>
          ))}
        </div>

        {/* Centered copyright */}
        <p className="mt-8 text-center font-mono text-xs text-[#404040]">{footerText}</p>
      </section>
    </>
  );
}
