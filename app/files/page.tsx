export default function Files() {
  const files = [
    {
      label: "Resume",
      description: "Current resume — updated 2025.",
      src: "/resume.pdf", // drop resume.pdf into the /public folder
    },
    {
      label: "Transcript",
      description: "Unofficial transcript from the University of Washington.",
      src: "/transcript.pdf", // drop transcript.pdf into the /public folder
    },
  ];

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 text-[17px]">
      <a href="/" className="text-sm text-neutral-500 hover:text-neutral-900">← Back</a>

      <h1 className="mt-6 text-4xl font-semibold tracking-tight">Relevant Files</h1>
      <p className="mt-4 max-w-2xl text-neutral-600 leading-8">
        Resume, transcripts, and other downloadable documents.
      </p>

      <div className="mt-12 space-y-16">
        {files.map((file) => (
          <section key={file.label} className="border-t border-neutral-200 pt-10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">{file.label}</h2>
                <p className="mt-1 text-sm text-neutral-500">{file.description}</p>
              </div>
              <a
                href={file.src}
                download
                className="shrink-0 border border-neutral-200 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
              >
                Download
              </a>
            </div>

            {/* Inline PDF viewer */}
            <div className="mt-6">
              <iframe
                src={file.src}
                className="h-[900px] w-full border border-neutral-200"
                title={file.label}
              />
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
