"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export type Banner = {
  message: string;
  style: "info" | "success" | "warning" | "announce";
  linkLabel?: string;
  linkUrl?: string;
  active: boolean;
  dismissible: boolean;
};

const STYLE_CLASS: Record<Banner["style"], string> = {
  info: "bg-blue-950/90 border-blue-800 text-blue-50",
  success: "bg-emerald-950/90 border-emerald-800 text-emerald-50",
  warning: "bg-amber-950/90 border-amber-800 text-amber-50",
  announce: "border-transparent text-white",
};

export default function Notifications({ banners }: { banners: Banner[] }) {
  const pathname = usePathname();
  const active = banners.filter((b) => b.active && b.message);

  const [dismissed, setDismissed] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setDismissed(JSON.parse(localStorage.getItem("dismissedBanners") || "[]"));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const dismiss = (key: string) => {
    const next = Array.from(new Set([...dismissed, key]));
    setDismissed(next);
    try {
      localStorage.setItem("dismissedBanners", JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  // Before mount, show everything (matches SSR → no hydration mismatch); after
  // mount, hide any the visitor has dismissed.
  const visible = active.filter(
    (b) => !(ready && b.dismissible && dismissed.includes(b.message))
  );
  if (pathname.startsWith("/keystatic") || visible.length === 0) return null;

  return (
    <div>
      {visible.map((b, i) => (
        <div
          key={`${b.message}-${i}`}
          className={`relative border-b px-10 py-2.5 text-sm ${STYLE_CLASS[b.style] ?? STYLE_CLASS.info}`}
          style={
            b.style === "announce"
              ? { backgroundImage: "linear-gradient(to right, #2563EB, #3B82F6, #0EA5E9)" }
              : undefined
          }
        >
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center leading-snug">
            <span>{b.message}</span>
            {b.linkUrl && b.linkLabel && (
              <a
                href={b.linkUrl}
                target={b.linkUrl.startsWith("http") ? "_blank" : undefined}
                rel={b.linkUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                className="shrink-0 font-semibold underline underline-offset-2 hover:opacity-80"
              >
                {b.linkLabel}
              </a>
            )}
          </div>
          {b.dismissible && (
            <button
              onClick={() => dismiss(b.message)}
              aria-label="Dismiss notification"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full text-lg leading-none opacity-70 hover:opacity-100"
            >
              ×
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
