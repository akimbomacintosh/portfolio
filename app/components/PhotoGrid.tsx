"use client";

import { useState, useEffect, useCallback } from "react";

const MONO = "ui-monospace, 'SF Mono', SFMono-Regular, Menlo, monospace";

type Photo = {
  title: string;
  viewCount: string;
  thumbnail: string;
  link: string;
};

export default function PhotoGrid({ photos }: { photos: Photo[] }) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close]);

  const activePhoto = active !== null ? photos[active] : null;
  const total = photos.length;

  return (
    <>
      <div className="vg-photo-grid" style={{ maxWidth: 1440, margin: "0 auto", display: "flex", gap: 14, alignItems: "flex-start" }}>
        {[0, 1, 2].map((col) => (
          <div key={col} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
            {photos
              .map((p, i) => ({ p, i }))
              .filter(({ i }) => {
                if (total % 3 === 1 && i === total - 1) return col === 2;
                return i % 3 === col;
              })
              .map(({ p, i }) => (
                <div
                  key={i}
                  onClick={() => setActive(i)}
                  className="group relative overflow-hidden cursor-pointer"
                  style={{ border: "1px solid #1c1c1c", display: "block" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.thumbnail}
                    alt={p.title || `Frame ${i + 1}`}
                    loading="lazy"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    className="block w-full transition-transform duration-700 group-hover:scale-[1.045]"
                    style={{ userSelect: "none" }}
                  />
                  <span className="absolute" style={{ top: 12, left: 12, fontFamily: MONO, fontSize: 11, letterSpacing: "0.08em", color: "rgba(255,255,255,0.9)", background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)", padding: "4px 8px" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 38%, rgba(0,0,0,0) 62%)" }} />
                  <figcaption className="vg-tile-caption absolute" style={{ left: 14, right: 14, bottom: 16 }}>
                    {p.title && <p className="m-0" style={{ color: "#fff", fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.2 }}>{p.title}</p>}
                    {p.viewCount && <p className="m-0" style={{ marginTop: 5, fontFamily: MONO, color: "rgba(255,255,255,0.55)", fontSize: 10.5, letterSpacing: "0.06em" }}>{p.viewCount}</p>}
                  </figcaption>
                </div>
              ))}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {activePhoto && (
        <div
          onClick={close}
          style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(0,0,0,0.96)", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(16px,3vw,40px)" }}
        >
          {/* Close */}
          <button
            onClick={close}
            aria-label="Close"
            style={{ position: "absolute", top: 20, right: 24, background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 32, cursor: "pointer", lineHeight: 1, padding: 0 }}
          >
            ×
          </button>

          {/* Prev */}
          {active! > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setActive(active! - 1); }}
              aria-label="Previous"
              style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: 28, cursor: "pointer", padding: "8px 12px" }}
            >
              ‹
            </button>
          )}

          {/* Next */}
          {active! < photos.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setActive(active! + 1); }}
              aria-label="Next"
              style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: 28, cursor: "pointer", padding: "8px 12px" }}
            >
              ›
            </button>
          )}

          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: "relative", maxWidth: "min(90vw, 1000px)", width: "100%" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activePhoto.thumbnail}
              alt={activePhoto.title}
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              style={{ maxHeight: "82vh", width: "100%", objectFit: "contain", display: "block", userSelect: "none" }}
            />
            {/* Overlays sit on top of the image so they appear in any screenshot */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
              {/* Bottom-left: title + coords */}
              <div style={{ position: "absolute", left: 16, right: 16, bottom: 16 }}>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16 }}>
                  <div>
                    {activePhoto.title && (
                      <p className="m-0" style={{ color: "#fff", fontSize: 14, fontWeight: 700, letterSpacing: "-0.02em", textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>{activePhoto.title}</p>
                    )}
                    {activePhoto.viewCount && (
                      <p className="m-0" style={{ marginTop: 3, fontFamily: MONO, color: "rgba(255,255,255,0.7)", fontSize: 10, letterSpacing: "0.06em", textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>{activePhoto.viewCount}</p>
                    )}
                  </div>
                  {/* Copyright bottom-right, on the image */}
                  <p className="m-0" style={{ fontFamily: MONO, color: "rgba(255,255,255,0.45)", fontSize: 10, letterSpacing: "0.12em", whiteSpace: "nowrap", textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>
                    © Joshua Hall
                  </p>
                </div>
              </div>
            </div>
            {/* Gradient so overlaid text is always readable */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 35%)", pointerEvents: "none" }} />
          </div>
        </div>
      )}
    </>
  );
}
