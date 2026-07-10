import { createReader } from "@keystatic/core/reader";
import config from "../../keystatic.config";

const reader = createReader(process.cwd(), config);

export default async function Files() {
  const data = await reader.singletons.files.read();
  const heading = data?.heading || "Downloads";
  const intro = data?.intro || "Resume, transcripts, and other downloadable documents.";
  const documents = (data?.documents ?? []).filter((d) => d.title) as {
    title: string;
    note: string;
    file: string | null;
  }[];

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 text-[17px]">
      <h1 className="mt-6 text-5xl font-bold tracking-tight">{heading}<span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(to right, #2563EB, #3B82F6, #0EA5E9)" }}>.</span></h1>
      <p className="mt-4 max-w-2xl text-neutral-400 leading-8">
        {intro}
      </p>

      <div className="mt-12 space-y-12">
        {documents.map((doc, i) => (
          <section key={i} className="border-t border-neutral-800 pt-10">
            <div className="flex items-start justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white">{doc.title}</h2>
                {doc.note && <p className="mt-1 text-sm text-neutral-500">{doc.note}</p>}
              </div>
              {doc.file && (
                <a
                  href={doc.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 border border-neutral-700 px-4 py-2 text-sm text-neutral-200 transition-colors hover:border-neutral-500 hover:bg-neutral-900"
                >
                  Download ↓
                </a>
              )}
            </div>
            {doc.file ? (
              doc.file.toLowerCase().endsWith(".pdf") && (
                <div className="mt-6">
                  <iframe
                    src={doc.file}
                    title={doc.title}
                    className="h-[560px] w-full border border-neutral-800 bg-neutral-900"
                  />
                </div>
              )
            ) : (
              <div className="mt-6 h-48 w-full border border-dashed border-neutral-800" />
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
