type Project = {
  id: string;
  title: string;
  dateStart: string;
  dateEnd: string;
  problem: string;
  built: string;
  role: string;
  takeaways: string[];
  images: { src: string; caption: string }[];
};

const projects: Project[] = [
  {
    id: "project-1",
    title: "Project Title One",
    dateStart: "Jan 2024",
    dateEnd: "Mar 2024",
    problem: "Placeholder",
    built: "Placeholder",
    role: "Placeholder",
    takeaways: ["Placeholder", "Placeholder", "Placeholder"],
    images: [],
  },
  {
    id: "project-2",
    title: "Project Title Two",
    dateStart: "Apr 2024",
    dateEnd: "Jun 2024",
    problem: "Placeholder",
    built: "Placeholder",
    role: "Placeholder",
    takeaways: ["Placeholder", "Placeholder", "Placeholder"],
    images: [],
  },
  {
    id: "project-3",
    title: "Project Title Three",
    dateStart: "Jul 2024",
    dateEnd: "Sep 2024",
    problem: "Placeholder",
    built: "Placeholder",
    role: "Placeholder",
    takeaways: ["Placeholder", "Placeholder", "Placeholder"],
    images: [],
  },
  {
    id: "project-4",
    title: "Project Title Four",
    dateStart: "Oct 2024",
    dateEnd: "Dec 2024",
    problem: "Placeholder",
    built: "Placeholder",
    role: "Placeholder",
    takeaways: ["Placeholder", "Placeholder", "Placeholder"],
    images: [],
  },
  {
    id: "project-5",
    title: "Project Title Five",
    dateStart: "Jan 2025",
    dateEnd: "Present",
    problem: "Placeholder",
    built: "Placeholder",
    role: "Placeholder",
    takeaways: ["Placeholder", "Placeholder", "Placeholder"],
    images: [],
  },
];

export default function Projects() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10 text-[17px]">

      {/* Page header */}
      <h1 className="mt-6 text-4xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-4 text-neutral-400 leading-8 max-w-2xl">
        Selected builds with context, results, and process notes.
      </p>

      {/* Jump-to navigation */}
      <nav className="mt-10 border border-neutral-800 p-6">
        <p className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Jump to</p>
        <ol className="space-y-2">
          {projects.map((p, i) => (
            <li key={p.id} className="flex items-baseline gap-4">
              <span className="text-xs text-neutral-600 w-4 shrink-0">{i + 1}</span>
              <a
                href={`#${p.id}`}
                className="text-neutral-300 hover:text-white transition-colors text-base"
              >
                {p.title}
              </a>
              <span className="text-xs text-neutral-600">
                {p.dateStart} — {p.dateEnd}
              </span>
            </li>
          ))}
        </ol>
      </nav>

      {/* Project sections */}
      <div className="mt-20 space-y-32">
        {projects.map((p) => (
          <article key={p.id} id={p.id} className="scroll-mt-20">

            {/* Project header */}
            <div className="flex items-start justify-between gap-6 border-t-2 border-neutral-700 pt-8">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight">{p.title}</h2>
              </div>
              <div className="shrink-0 flex items-center gap-2 text-sm text-neutral-500">
                <span>{p.dateStart}</span>
                <span className="text-neutral-700">→</span>
                <span>{p.dateEnd}</span>
              </div>
            </div>

            {/* Four content sections */}
            <div className="mt-10 space-y-10">

              <Section label="Problem / Motivation" body={p.problem} />
              <Section label="What I Built" body={p.built} />

              {/* Images slot — add objects to the images array to populate */}
              {p.images.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2">
                  {p.images.map((img, j) => (
                    <figure key={j}>
                      <img
                        src={img.src}
                        alt={img.caption}
                        className="w-full border border-neutral-800 object-cover"
                      />
                      <figcaption className="mt-2 text-sm text-neutral-500 leading-6">
                        {img.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}

              {/* Empty image placeholder shown until images are added */}
              {p.images.length === 0 && (
                <div className="grid gap-6 sm:grid-cols-2">
                  {[0, 1].map((j) => (
                    <figure key={j}>
                      <div className="w-full aspect-video border border-dashed border-neutral-800 flex items-center justify-center text-sm text-neutral-700">
                        Image placeholder
                      </div>
                      <figcaption className="mt-2 text-sm text-neutral-600 leading-6 italic">
                        Caption — describe what this image shows.
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}

              <Section label="My Role &amp; Process" body={p.role} />

              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-500 mb-4">
                  Key Technical Takeaways
                </p>
                <ul className="space-y-2">
                  {p.takeaways.map((t, j) => (
                    <li key={j} className="flex gap-3 text-neutral-400 leading-7">
                      <span className="mt-1 text-neutral-700 shrink-0">—</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

function Section({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3">
        {label}
      </p>
      <p className="text-neutral-400 leading-8">{body}</p>
    </div>
  );
}
