export default function Videography() {
  const work = [
    {
      title: "Project Title",
      date: "2024",
      description: "Placeholder",
      images: [], // e.g. ["/videography/shot1.jpg", "/videography/shot2.jpg"] — drop in /public
      videoUrl: null, // e.g. "https://www.youtube.com/embed/VIDEO_ID"
    },
  ];

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 text-[17px]">
      <a href="/" className="text-sm text-neutral-500 hover:text-neutral-900">← Back</a>

      <h1 className="mt-6 text-4xl font-semibold tracking-tight">Videography / Photography</h1>
      <p className="mt-4 max-w-2xl text-neutral-600 leading-8">
        Edits, shoots, and visual storytelling.
      </p>

      <div className="mt-12 space-y-16">
        {work.map((item) => (
          <article key={item.title} className="border-t border-neutral-200 pt-10">
            <h2 className="text-2xl font-semibold tracking-tight">{item.title}</h2>
            <p className="mt-1 text-sm text-neutral-500">{item.date}</p>
            <p className="mt-4 max-w-3xl text-neutral-600 leading-8">{item.description}</p>

            {/* Video embed — paste a YouTube/Vimeo embed URL */}
            {item.videoUrl && (
              <div className="mt-8 aspect-video w-full max-w-3xl overflow-hidden border border-neutral-200">
                <iframe
                  src={item.videoUrl}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={item.title}
                />
              </div>
            )}

            {/* Photo grid — add image paths to the images array above */}
            {item.images.length > 0 && (
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {item.images.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`${item.title} ${i + 1}`}
                    className="w-full border border-neutral-200 object-cover aspect-[4/3]"
                  />
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}
