import { createReader } from "@keystatic/core/reader";
import config from "../../keystatic.config";

const reader = createReader(process.cwd(), config);

export default async function Videography() {
  const [data, site] = await Promise.all([
    reader.singletons.videography.read(),
    reader.singletons.site.read(),
  ]);
  const works = data?.works ?? [];
  const heading = data?.heading || "Videography / Photography";
  const intro = data?.intro || "Edits, shoots, and visual storytelling.";
  const backLabel = site?.backLabel || "← Back";

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 text-[17px]">
      <a href="/" className="text-sm text-neutral-500 hover:text-neutral-100">{backLabel}</a>

      <h1 className="mt-6 text-5xl font-bold tracking-tight">{heading}<span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(to right, #2563EB, #3B82F6, #0EA5E9)" }}>.</span></h1>
      <p className="mt-4 max-w-2xl text-neutral-600 leading-8">
        {intro}
      </p>

      <div className="mt-12 space-y-16">
        {works.map((item) => (
          <article key={item.title} className="border-t border-neutral-700 pt-10">
            <h2 className="text-2xl font-bold tracking-tight text-white">{item.title}</h2>
            <p className="mt-1 text-sm text-neutral-500">{item.date}</p>
            <p className="mt-4 max-w-3xl text-neutral-600 leading-8">{item.description}</p>

            {item.videoUrl && (
              <div className="mt-8 aspect-video w-full max-w-3xl overflow-hidden border border-neutral-800">
                <iframe
                  src={item.videoUrl}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={item.title}
                />
              </div>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}
