export default function Music() {
  const releases = [
    {
      title: "Track / Project Title",
      date: "2024",
      description: "Placeholder",
      image: null,       // e.g. "/music/cover-art.jpg" — drop in /public
      embedUrl: null,    // e.g. Spotify/SoundCloud embed URL
    },
  ];

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 text-[17px]">
      <a href="/" className="text-sm text-neutral-500 hover:text-neutral-900">← Back</a>

      <h1 className="mt-6 text-4xl font-semibold tracking-tight">Music</h1>
      <p className="mt-4 max-w-2xl text-neutral-600 leading-8">
        Production, releases, and audio work.
      </p>

      <div className="mt-12 space-y-16">
        {releases.map((release) => (
          <article key={release.title} className="border-t border-neutral-200 pt-10">
            <h2 className="text-2xl font-semibold tracking-tight">{release.title}</h2>
            <p className="mt-1 text-sm text-neutral-500">{release.date}</p>
            <p className="mt-4 max-w-3xl text-neutral-600 leading-8">{release.description}</p>

            {/* Cover art — drop image in /public and update the src */}
            {release.image && (
              <div className="mt-8">
                <img
                  src={release.image}
                  alt={release.title}
                  className="h-64 w-64 border border-neutral-200 object-cover"
                />
              </div>
            )}

            {/* Streaming embed — paste the embed URL from Spotify, SoundCloud, etc. */}
            {release.embedUrl && (
              <div className="mt-8">
                <iframe
                  src={release.embedUrl}
                  className="h-[152px] w-full max-w-2xl border-0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title={release.title}
                />
              </div>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}
