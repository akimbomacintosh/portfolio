import { createReader } from "@keystatic/core/reader";
import config from "../../keystatic.config";

const reader = createReader(process.cwd(), config);

export default async function Music() {
  const [music, production, liveSound] = await Promise.all([
    reader.singletons.music.read(),
    reader.singletons.musicProduction.read(),
    reader.singletons.musicLiveSound.read(),
  ]);

  const heading = music?.heading || "Music";
  const intro = music?.intro || "Original releases, production, and live audio work.";
  const releasesLabel = music?.releasesLabel || "Releases";
  const releases = (music?.releases ?? []).filter((r) => r.spotifyId || r.title) as {
    title: string;
    spotifyId: string;
    appleMusicAlbumId: string;
    appleMusicTrackId: string;
    appleMusicSlug: string;
  }[];
  const productionLabel = music?.productionLabel || "Production";
  const liveSoundLabel = music?.liveSoundLabel || "Live Sound";
  const emptyState = music?.emptyState || "Add media in the admin panel";

  const prodHeading = production?.heading ?? "How I make music.";
  const prodParagraphs = production?.paragraphs ?? [];
  const prodScreenshots = (production?.screenshots ?? []).filter(Boolean) as string[];

  const liveHeading = liveSound?.heading ?? "Years behind the board.";
  const liveParagraphs = liveSound?.paragraphs ?? [];
  const livePhotos = (liveSound?.photos ?? []).filter(Boolean) as string[];

  return (
    <main className="text-[17px]">

      {/* Header */}
      <div className="mx-auto max-w-5xl px-8 py-10">
        <a href="/" className="text-sm text-neutral-500 hover:text-neutral-100">← Back</a>
        <h1 className="mt-6 text-5xl font-bold tracking-tight">
          {heading}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(to right, #2563EB, #3B82F6, #0EA5E9)" }}
          >.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-neutral-500 leading-8">
          {intro}
        </p>
      </div>

      {/* Releases — full-width grid, no titles */}
      <section className="border-t border-neutral-800 px-8 py-14 sm:px-16 lg:px-24">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-600 mb-12">{releasesLabel}</p>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {releases.map((r) => (
            <div key={r.title} className="flex flex-col gap-4">
              <iframe
                src={`https://open.spotify.com/embed/track/${r.spotifyId}?utm_source=generator&theme=0`}
                width="100%"
                height="380"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title={`${r.title} on Spotify`}
                className="border-0"
              />
              <iframe
                src={`https://embed.music.apple.com/us/album/${r.appleMusicSlug}/${r.appleMusicAlbumId}?i=${r.appleMusicTrackId}`}
                width="100%"
                height="175"
                allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                loading="lazy"
                title={`${r.title} on Apple Music`}
                className="overflow-hidden border-0"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Production */}
      <section className="border-t border-neutral-800">
        <div className="mx-auto max-w-5xl px-8 pt-16 pb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-600 mb-4">{productionLabel}</p>
          <h2 className="text-3xl font-bold tracking-tight text-white">{prodHeading}</h2>
          <div className="mt-6 max-w-3xl space-y-5 text-neutral-500 leading-8">
            {prodParagraphs.map((p, i) => p ? <p key={i}>{p}</p> : null)}
          </div>
        </div>

        {/* Full-bleed screenshots */}
        {prodScreenshots.length > 0 ? (
          <div className="space-y-3 pb-16">
            {prodScreenshots.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Production screenshot ${i + 1}`}
                className="w-full object-cover"
                style={{ aspectRatio: "16/7" }}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3 pb-16">
            <div className="flex w-full items-center justify-center bg-neutral-900/60" style={{ aspectRatio: "16/7" }}>
              <p className="text-xs uppercase tracking-widest text-neutral-700">{emptyState}</p>
            </div>
          </div>
        )}
      </section>

      {/* Live Sound */}
      <section className="border-t border-neutral-800">
        <div className="mx-auto max-w-5xl px-8 pt-16 pb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-600 mb-4">{liveSoundLabel}</p>
          <h2 className="text-3xl font-bold tracking-tight text-white">{liveHeading}</h2>
          <div className="mt-6 max-w-3xl space-y-5 text-neutral-500 leading-8">
            {liveParagraphs.map((p, i) => p ? <p key={i}>{p}</p> : null)}
          </div>
        </div>

        {livePhotos.length > 0 ? (
          <div className="space-y-3 pb-16">
            {livePhotos.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Live sound photo ${i + 1}`}
                className="w-full object-cover"
                style={{ aspectRatio: "16/7" }}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3 pb-16">
            <div className="flex w-full items-center justify-center bg-neutral-900/60" style={{ aspectRatio: "16/7" }}>
              <p className="text-xs uppercase tracking-widest text-neutral-700">{emptyState}</p>
            </div>
          </div>
        )}
      </section>

    </main>
  );
}
