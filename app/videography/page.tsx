import { createReader } from "@keystatic/core/reader";
import config from "../../keystatic.config";
import PhotoGrid from "../components/PhotoGrid";

const reader = createReader(process.cwd(), config);

const MONO = "ui-monospace, 'SF Mono', SFMono-Regular, Menlo, monospace";
const GRAD = "linear-gradient(to right, #2563EB, #3B82F6, #0EA5E9)";

export default async function Videography() {
  const [data, site] = await Promise.all([
    reader.singletons.videography.read(),
    reader.singletons.site.read(),
  ]);

  const heading        = data?.heading        || "Captured Frames";
  const methodsHeading = (data?.methodsHeading || "My Process.").replace(/\.$/, "");
  const methodsText    = data?.methodsText     || "";

  // TikTok thumbnails double as the photo archive. Each becomes a masonry tile.
  const photos = (data?.featuredVideos ?? []).filter((v) => v.thumbnail) as {
    title: string;
    viewCount: string;
    thumbnail: string;
    link: string;
  }[];

const socials      = site?.socials ?? [];
  const tiktokUrl    = socials.find((s) => s.label?.toLowerCase() === "tiktok")?.url    ?? "";
  const instagramUrl = socials.find((s) => s.label?.toLowerCase() === "instagram")?.url ?? "";
  const tiktokHandle = tiktokUrl.match(/@([^?/&]+)/)?.[1]                    ?? "joshuahall.vid";
  const igHandle     = instagramUrl.match(/instagram\.com\/([^?/&]+)/)?.[1] ?? "joshuahall.vid";
  const backLabel    = site?.backLabel || "← Back";

  return (
    <div style={{ background: "#000", color: "#ededed" }}>
      {/* ── Header ───────────────────────────────────────────── */}
      <section style={{ background: "#000", borderBottom: "1px solid #1a1a1a", padding: "clamp(32px,5vh,56px) clamp(24px,5vw,80px)" }}>
        <a href="/" className="uppercase transition-colors hover:text-white" style={{ fontFamily: MONO, color: "rgba(255,255,255,0.5)", fontSize: 12, letterSpacing: "0.28em" }}>{backLabel}</a>
        <h1 className="font-bold" style={{ margin: "clamp(24px,4vh,40px) 0 0", color: "#fff", fontSize: "clamp(2.4rem,6vw,5.5rem)", letterSpacing: "-0.035em", lineHeight: 0.95 }}>
          {heading}<span style={{ backgroundImage: GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>.</span>
        </h1>
        <p style={{ margin: "18px 0 0", color: "rgba(255,255,255,0.5)", fontSize: "clamp(1rem,1.4vw,1.125rem)", lineHeight: 1.6, maxWidth: "52ch" }}>A glimpse into how I see the world.</p>
      </section>

      {/* ── Photo grid ───────────────────────────────────────── */}
      {photos.length > 0 && (
        <section style={{ padding: "clamp(28px,4vh,48px) clamp(24px,5vw,80px) clamp(56px,9vh,100px)" }}>
          <PhotoGrid photos={photos} />
        </section>
      )}

      {/* ── Moving image / socials ───────────────────────────── */}
      <section style={{ borderTop: "1px solid #1a1a1a", padding: "clamp(56px,9vh,104px) clamp(24px,5vw,80px)" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <p className="m-0 uppercase" style={{ fontFamily: MONO, color: "#525252", fontSize: 12, letterSpacing: "0.28em" }}>Moving image</p>
          <h2 className="font-semibold" style={{ margin: "16px 0 0", color: "#ededed", fontSize: "clamp(28px,4vw,48px)", letterSpacing: "-0.025em", lineHeight: 1.05 }}>
            Reels &amp; edits<span style={{ backgroundImage: GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>.</span>
          </h2>
          <p style={{ margin: "14px 0 0", color: "#8a8a8a", fontSize: 16, lineHeight: 1.6, maxWidth: "52ch" }}>
            City views, sunsets, and house music — I post most of my motion work to Instagram and TikTok.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 14, marginTop: 36 }}>
            {instagramUrl && (
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between transition-colors hover:border-[#525252] hover:bg-[#0a0a0a]" style={{ gap: 16, border: "1px solid #262626", background: "#000", padding: "28px 30px" }}>
                <div className="flex items-center" style={{ gap: 18 }}>
                  <span className="flex shrink-0 items-center justify-center" style={{ width: 48, height: 48, borderRadius: 12, background: "linear-gradient(45deg,#f09433,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888)" }}>
                    <svg viewBox="0 0 24 24" fill="#fff" width="22" height="22" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
                  </span>
                  <div>
                    <p className="m-0" style={{ color: "#ededed", fontSize: 16, fontWeight: 600 }}>@{igHandle}</p>
                    <p style={{ margin: "4px 0 0", color: "#585858", fontSize: 14 }}>Photos, reels, and behind the scenes</p>
                  </div>
                </div>
                <span className="transition-colors group-hover:text-[#e5e5e5]" style={{ color: "#404040", fontSize: 20 }}>↗</span>
              </a>
            )}
            {tiktokUrl && (
              <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between transition-colors hover:border-[#525252] hover:bg-[#0a0a0a]" style={{ gap: 16, border: "1px solid #262626", background: "#000", padding: "28px 30px" }}>
                <div className="flex items-center" style={{ gap: 18 }}>
                  <span className="flex shrink-0 items-center justify-center" style={{ width: 48, height: 48, border: "1px solid #262626", background: "#000" }}>
                    <svg viewBox="0 0 24 24" fill="#fff" width="22" height="22" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>
                  </span>
                  <div>
                    <p className="m-0" style={{ color: "#ededed", fontSize: 16, fontWeight: 600 }}>@{tiktokHandle}</p>
                    <p style={{ margin: "4px 0 0", color: "#585858", fontSize: 14 }}>City views, sunsets, and house music</p>
                  </div>
                </div>
                <span className="transition-colors group-hover:text-[#e5e5e5]" style={{ color: "#404040", fontSize: 20 }}>↗</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────── */}
      {methodsText && (
        <section style={{ borderTop: "1px solid #1a1a1a", padding: "clamp(56px,9vh,104px) clamp(24px,5vw,80px)" }}>
          <div style={{ maxWidth: 1440, margin: "0 auto" }}>
            <p className="m-0 uppercase" style={{ fontFamily: MONO, color: "#525252", fontSize: 12, letterSpacing: "0.28em" }}>Process</p>
            <h2 className="font-semibold" style={{ margin: "16px 0 0", color: "#ededed", fontSize: "clamp(28px,4vw,48px)", letterSpacing: "-0.025em", lineHeight: 1.05 }}>
              {methodsHeading}<span style={{ backgroundImage: GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>.</span>
            </h2>
            <p style={{ margin: "20px 0 0", color: "#8a8a8a", fontSize: "clamp(16px,1.3vw,17px)", lineHeight: 1.85, maxWidth: "68ch" }}>{methodsText}</p>
          </div>
        </section>
      )}

    </div>
  );
}
