type NavLink = { label: string; href: string };
type Social = { label: string; url: string };

const MONO = "ui-monospace, 'SF Mono', SFMono-Regular, Menlo, monospace";

function socialLogo(label: string) {
  const p = { viewBox: "0 0 24 24", fill: "currentColor", width: 18, height: 18, "aria-hidden": true as const };
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

export default function Footer({
  brandName = "Joshua Hall",
  links = [],
  socials = [],
  footerText = "© 2026 Joshua Hall",
}: {
  brandName?: string;
  links?: NavLink[];
  socials?: Social[];
  footerText?: string;
}) {
  return (
    <footer style={{ background: "#000", borderTop: "1px solid #1f1f1f", padding: "clamp(40px,6vh,72px) clamp(24px,5vw,80px) clamp(28px,4vh,44px)" }}>
      <div className="flex flex-wrap items-start justify-between" style={{ gap: 32 }}>
        <div style={{ maxWidth: 340 }}>
          <div className="flex items-center" style={{ gap: 10 }}>
            <span style={{ display: "inline-block", width: 8, height: 8, background: "linear-gradient(135deg,#1D4ED8,#0e7490)", borderRadius: "50%" }} />
            <span style={{ color: "#ededed", fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em" }}>{brandName}</span>
          </div>
          <p style={{ margin: "14px 0 0", color: "#5a5a5a", fontSize: 14, lineHeight: 1.65 }}>
            Engineering work across frequencies — radio, audio, and visual. Based in Seattle, Washington.
          </p>
          <div className="flex" style={{ gap: 10, marginTop: 20 }}>
            {socials.map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex items-center justify-center transition-colors hover:border-[#525252] hover:text-[#ededed]"
                style={{ width: 40, height: 40, border: "1px solid #262626", color: "#8f8f8f" }}
              >
                {socialLogo(s.label)}
              </a>
            ))}
          </div>
        </div>
        <nav style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 48px" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-[#ededed]" style={{ color: "#8f8f8f", fontSize: 14 }}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="flex flex-wrap items-center justify-between" style={{ gap: 12, marginTop: "clamp(36px,5vh,56px)", paddingTop: 22, borderTop: "1px solid #161616" }}>
        <span style={{ fontFamily: MONO, color: "#404040", fontSize: 12, letterSpacing: "0.04em" }}>{footerText}</span>
        <span className="uppercase" style={{ fontFamily: MONO, color: "#333", fontSize: 12, letterSpacing: "0.16em" }}>47.6062° N · 122.3321° W</span>
      </div>
    </footer>
  );
}
