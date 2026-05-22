"use client";

import { useState, useEffect, useRef } from "react";

type MediaItem = { kind: "image"; src: string } | { kind: "video"; src: string };

function VideoThumb({ src, onClick }: { src: string; onClick: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  return (
    <div
      className="relative w-full aspect-video border border-neutral-800 cursor-pointer group overflow-hidden"
      onClick={onClick}
      onMouseEnter={() => ref.current?.play()}
      onMouseLeave={() => { if (ref.current) { ref.current.pause(); ref.current.currentTime = 0; } }}
    >
      <video
        ref={ref}
        src={src}
        muted
        playsInline
        loop
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
        <div className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center group-hover:opacity-0 transition-opacity">
          <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function PhotoCollage({
  images,
  videos = [],
}: {
  images: string[];
  videos?: string[];
}) {
  const [lightbox, setLightbox] = useState<MediaItem | null>(null);

  const media: MediaItem[] = [
    ...images.map((src) => ({ kind: "image" as const, src })),
    ...videos.map((src) => ({ kind: "video" as const, src })),
  ];

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const placeholderCount = media.length === 0 ? 3 : 0;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {media.map((item, i) =>
          item.kind === "image" ? (
            <div
              key={i}
              className="relative border border-neutral-800 cursor-zoom-in transition-transform duration-300 hover:scale-105 hover:z-10"
              onClick={() => setLightbox(item)}
            >
              <img
                src={item.src}
                className="w-full aspect-video object-cover"
              />
            </div>
          ) : (
            <VideoThumb key={i} src={item.src} onClick={() => setLightbox(item)} />
          )
        )}
        {placeholderCount > 0 &&
          Array.from({ length: placeholderCount }).map((_, i) => (
            <div
              key={i}
              className="w-full aspect-video border border-dashed border-neutral-800"
            />
          ))
        }
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] w-full mx-6"
            onClick={(e) => e.stopPropagation()}
          >
            {lightbox.kind === "image" ? (
              <img
                src={lightbox.src}
                className="w-full max-h-[85vh] object-contain border border-neutral-700"
              />
            ) : (
              <video
                src={lightbox.src}
                controls
                autoPlay
                className="w-full max-h-[85vh] border border-neutral-700 bg-black"
              />
            )}
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-4 -right-4 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors text-lg leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}
