import { createReader } from "@keystatic/core/reader";
import config from "../../keystatic.config";

const reader = createReader(process.cwd(), config);

const SOUNDCLOUD_URL = "https://soundcloud.com/crowns-746978422/tracks";

export default async function Music() {
  const site = await reader.singletons.site.read();
  const backLabel = site?.backLabel || "← Back";

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="page-hero relative flex flex-col justify-between" style={{ minHeight: "clamp(400px,65vh,680px)", backgroundImage: "url('/images/videography/sunset-city.jpg')", backgroundSize: "cover", backgroundPosition: "center 72%", padding: "clamp(32px,5vh,60px) clamp(24px,5vw,80px)" }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.86) 100%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <a href="/" className="uppercase transition-colors hover:text-white" style={{ fontFamily: "ui-monospace,'SF Mono',SFMono-Regular,Menlo,monospace", color: "rgba(255,255,255,0.5)", fontSize: 12, letterSpacing: "0.28em" }}>
            {backLabel}
          </a>
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 className="font-bold" style={{ margin: 0, color: "#fff", fontSize: "clamp(2.4rem,6vw,5.5rem)", letterSpacing: "-0.035em", lineHeight: 0.95 }}>
            Music<span style={{ backgroundImage: "linear-gradient(to right, #2563EB, #3B82F6, #0EA5E9)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>.</span>
          </h1>
          <p style={{ margin: "18px 0 0", color: "rgba(255,255,255,0.65)", fontSize: "clamp(1rem,1.4vw,1.125rem)", lineHeight: 1.6, maxWidth: "52ch" }}>
            Discover my music production journey.
          </p>
        </div>
      </section>

      {/* ── Bio ───────────────────────────────────────────────── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", background: "#000", borderBottom: "1px solid #1a1a1a", padding: "clamp(64px,10vh,120px) clamp(24px,5vw,80px)" }}>
        <div style={{ maxWidth: 900 }}>
          <p className="m-0 uppercase" style={{ fontFamily: "ui-monospace,'SF Mono',SFMono-Regular,Menlo,monospace", color: "#525252", fontSize: 11, letterSpacing: "0.28em", marginBottom: "clamp(28px,4vh,44px)" }}>
            CROWNS — The story
          </p>
          <p style={{ margin: 0, color: "#ededed", fontSize: "clamp(1.25rem,2.4vw,2rem)", lineHeight: 1.65, fontWeight: 300, letterSpacing: "-0.01em" }}>
            I release all of my music under the name{" "}
            <span style={{ color: "#fff", fontWeight: 600 }}>CROWNS</span>. Music is a huge part of who I am. I started listening to electronic music in elementary school, and I have listened to it ever since. I often experience music physically and emotionally, so I chase making my own sound to build a world in my mind of my own.
          </p>
          <p style={{ margin: "clamp(24px,3.5vh,36px) 0 0", color: "#606060", fontSize: "clamp(1rem,1.6vw,1.25rem)", lineHeight: 1.8, fontWeight: 300 }}>
            I have experimented with alternative, classical, electronic, dubstep, and house music. It doesn&apos;t matter the genre because the right song can be life changing to me. I have produced music for over 7 years, and it has taken me until 2026 to tell myself that my music is good enough for others to hear. While there are a few tracks here on this page, there are hundreds of projects — hundreds of gigabytes worth of music that I have created during all stages of my life. As I refine my productions, I put them here for all to hear. Every track has a powerful meaning to me, so I release in light of that.
          </p>
        </div>
      </section>

      {/* ── Spotify ───────────────────────────────────────────── */}
      <section style={{ padding: "clamp(48px,8vh,80px) clamp(24px,5vw,80px)" }}>
        <div
          className="flex items-end justify-between gap-4"
          style={{ marginBottom: "clamp(24px, 4vh, 36px)" }}
        >
          <div>
            <h2
              className="font-semibold tracking-[-0.02em] leading-tight m-0"
              style={{ fontSize: "clamp(28px, 4vw, 52px)", color: "#ededed" }}
            >
              Spotify.
            </h2>
          </div>
          <a
            href="https://open.spotify.com/artist/0iBCO5yRtZjH4Yk5DPPoEH"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors hover:text-neutral-300 shrink-0 pb-1"
            style={{ color: "#525252" }}
          >
            Spotify ↗
          </a>
        </div>

        <iframe
          src="https://open.spotify.com/embed/artist/0iBCO5yRtZjH4Yk5DPPoEH?utm_source=generator&theme=0"
          width="100%"
          height="450"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          style={{ border: "none", borderRadius: 0 }}
          title="CROWNS on Spotify"
        />
      </section>

      {/* ── Apple Music ───────────────────────────────────────── */}
      <section
        className="border-t border-[#1a1a1a]"
        style={{ padding: "clamp(48px, 8vh, 80px) clamp(24px, 5vw, 80px)" }}
      >
        <div style={{ marginBottom: "clamp(20px, 3vh, 32px)" }}>
          <h2
            className="font-semibold tracking-[-0.02em] leading-tight m-0"
            style={{ fontSize: "clamp(28px, 4vw, 52px)", color: "#ededed" }}
          >
            Apple Music.
          </h2>
        </div>

        <iframe
          src="https://embed.music.apple.com/us/album/silver-single/6789807687?theme=dark"
          allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
          height="450"
          sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
          style={{ width: "100%", border: "none", background: "transparent" }}
          title="Silver – Single by CROWNS on Apple Music"
        />
      </section>

      {/* ── SoundCloud ────────────────────────────────────────── */}
      <section
        className="border-t border-[#1a1a1a]"
        style={{ padding: "clamp(48px, 8vh, 80px) clamp(24px, 5vw, 80px)" }}
      >
        <div
          className="flex items-end justify-between gap-4"
          style={{ marginBottom: "clamp(8px, 1.5vh, 16px)" }}
        >
          <div>
            <h2
              className="font-semibold tracking-[-0.02em] leading-tight m-0"
              style={{ fontSize: "clamp(28px, 4vw, 52px)", color: "#ededed" }}
            >
              SoundCloud.
            </h2>
          </div>
          <a
            href={SOUNDCLOUD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors hover:text-neutral-300 shrink-0 pb-1"
            style={{ color: "#525252" }}
          >
            SoundCloud ↗
          </a>
        </div>

        <p className="text-sm mb-[clamp(20px,3vh,32px)]" style={{ color: "#525252" }}>
          I often put my unreleased ID&apos;s here on SoundCloud
        </p>

        <iframe
          width="100%"
          height="700"
          allow="autoplay; encrypted-media"
          src="https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Fusers%2F1387192569&show_artwork=true&color=%23000000&auto_play=false&buying=false&liking=false&download=false&sharing=false&show_comments=false&show_playcount=true&show_user=false&dark=true"
          style={{ border: "none" }}
          title="CROWNS on SoundCloud"
        />
      </section>
    </>
  );
}
