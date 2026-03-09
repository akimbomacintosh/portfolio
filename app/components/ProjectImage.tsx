"use client";

import { useState, useEffect } from "react";

type Props = {
  src: string;
  caption: string;
  float: "left" | "right";
  sizeClass: string;
};

export default function ProjectImage({ src, caption, float, sizeClass }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <figure
        className={`mb-4 ${sizeClass} ${float === "right" ? "float-right ml-8" : "float-left mr-8"}`}
      >
        <img
          src={src}
          alt={caption}
          onClick={() => setOpen(true)}
          className="w-full border border-neutral-800 object-cover cursor-zoom-in"
        />
        <figcaption className="mt-2 text-sm text-neutral-500 leading-6">
          {caption}
        </figcaption>
      </figure>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] w-full mx-6"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={src}
              alt={caption}
              className="w-full max-h-[80vh] object-contain border border-neutral-700"
            />
            <p className="mt-3 text-sm text-neutral-400 text-center">{caption}</p>
            <button
              onClick={() => setOpen(false)}
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
