export default function Files() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10 text-[17px]">
      <h1 className="mt-6 text-4xl font-semibold tracking-tight">Relevant Files</h1>
      <p className="mt-4 max-w-2xl text-neutral-400 leading-8">
        Resume, transcripts, and other downloadable documents.
      </p>

      <div className="mt-12">
        <section className="border-t border-neutral-800 pt-10">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Resume</h2>
            <p className="mt-1 text-sm text-neutral-500">Current resume — updated 2025.</p>
          </div>
          <div className="mt-6">
            <div className="h-48 w-full border border-dashed border-neutral-800" />
          </div>
        </section>
      </div>
    </main>
  );
}
