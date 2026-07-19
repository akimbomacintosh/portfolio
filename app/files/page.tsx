import { createReader } from "@keystatic/core/reader";
import config from "../../keystatic.config";

const reader = createReader(process.cwd(), config);

const MONO = "ui-monospace,'SF Mono',SFMono-Regular,Menlo,monospace";
const GRAD = "linear-gradient(to right, #2563EB, #3B82F6, #0EA5E9)";

const DOCS = [
  {
    label: "Resume",
    sublabel: "PDF · Updated May 2026",
    href: "/JH_Resume.pdf",
    buttonLabel: "Download",
  },
];

export default async function Files() {
  const [data, site] = await Promise.all([
    reader.singletons.files.read(),
    reader.singletons.site.read(),
  ]);
  const heading   = data?.heading  || "Downloads";
  const backLabel = site?.backLabel || "← Back";

  return (
    <>
      <section className="relative flex flex-col justify-between" style={{ minHeight: "clamp(400px,65vh,680px)", backgroundImage: "url('/images/videography/library-parade.jpg')", backgroundSize: "cover", backgroundPosition: "center 55%", padding: "clamp(32px,5vh,60px) clamp(24px,5vw,80px)" }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.82) 100%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <a href="/" className="uppercase transition-colors hover:text-white" style={{ fontFamily: MONO, color: "rgba(255,255,255,0.5)", fontSize: 12, letterSpacing: "0.28em" }}>{backLabel}</a>
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 className="font-bold" style={{ margin: 0, color: "#fff", fontSize: "clamp(2.4rem,6vw,5.5rem)", letterSpacing: "-0.035em", lineHeight: 0.95 }}>
            {heading}<span style={{ backgroundImage: GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>.</span>
          </h1>
          <p style={{ margin: "18px 0 0", color: "rgba(255,255,255,0.62)", fontSize: "clamp(1rem,1.4vw,1.125rem)", lineHeight: 1.6, maxWidth: "52ch" }}>Resume &amp; other docs.</p>
        </div>
      </section>
      <main style={{ padding: "clamp(32px,5vh,56px) clamp(24px,5vw,80px)" }}>
        {DOCS.map((doc) => (
          <div key={doc.label} style={{ marginBottom: "clamp(48px,8vh,80px)" }}>
            <div className="flex items-center justify-between flex-wrap" style={{ gap: 16, marginBottom: 20 }}>
              <div>
                <p className="m-0 font-semibold" style={{ color: "#ededed", fontSize: 18 }}>{doc.label}</p>
                {doc.sublabel && (
                  <p className="m-0" style={{ marginTop: 4, fontFamily: MONO, color: "#525252", fontSize: 12, letterSpacing: "0.08em" }}>{doc.sublabel}</p>
                )}
              </div>
              <a
                href={doc.href}
                download
                className="shrink-0 uppercase transition-colors hover:border-[#525252] hover:text-white"
                style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.2em", color: "#8a8a8a", border: "1px solid #262626", padding: "10px 22px" }}
              >
                ↓ Download
              </a>
            </div>
            <iframe
              src={doc.href}
              title={doc.label}
              style={{ width: "100%", height: "clamp(600px, 82vh, 1100px)", border: "1px solid #1f1f1f", display: "block", background: "#0a0a0a" }}
            />
          </div>
        ))}
      </main>
    </>
  );
}
