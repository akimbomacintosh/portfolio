import fs from "fs";
import path from "path";
import ProjectImage from "../components/ProjectImage";

export const dynamic = "force-dynamic";

type Project = {
  id: string;        // used for the URL anchor (#id) — change freely
  folder: string;    // must match the folder name in content/projects/ — do not change
  title: string;
  dateStart: string;
  dateEnd: string;
};

type TextBlock = { type: "paragraph"; text: string };
type ImageBlock = { type: "image"; src: string; float: "left" | "right"; caption: string; size: "small" | "medium" | "half" | "full" };
type ContentBlock = TextBlock | ImageBlock;

const projects: Project[] = [
  {
    id: "ads-b-antenna",
    folder: "ads-b-antenna",
    title: "Automatic Dependent Surveillance-Broadcast Antenna",
    dateStart: "Apr 2025",
    dateEnd: "Present",
  },
  {
    id: "esc",
    folder: "project-2",
    title: "STM32 4-in-1 ESC w/ Integrated 5A Buck Converter",
    dateStart: "Oct 2025",
    dateEnd: "Present",
  },
  {
    id: "line-following-robot",
    folder: "project-3",
    title: "Arduino-Powered Autonomus Line Following Robot",
    dateStart: "Sep 2025",
    dateEnd: "Dec 2025",
  },
  {
    id: "networking",
    folder: "project-4",
    title: "Network Management w/ Multiband Optimizations & Pi-Hole",
    dateStart: "Sep 2025",
    dateEnd: "Present",
  },
  {
    id: "website",
    folder: "project-5",
    title: "Portfolio Website using Next.js & Vercel",
    dateStart: "Jan 2025",
    dateEnd: "Present",
  },
];

// Parses a .txt file into paragraphs and inline images.
// Images can appear anywhere — no blank lines needed around them.
// Syntax: [[image:/path/to/image.jpg:right:Caption text]]
//         [[image:/path/to/image.jpg:left:Caption text]]
// Syntax: [[image:/path.jpg:right:Caption]]
//         [[image:/path.jpg:right:Caption:size]]   (small | medium | half | full)
const IMAGE_RE = /\[\[image:([^:]+):(left|right):([^\]:]+)(?::(small|medium|half|full))?\]\]/g;

function readContent(folder: string, file: string): ContentBlock[] {
  const filePath = path.join(process.cwd(), "content", "projects", folder, file);
  const raw = fs.readFileSync(filePath, "utf-8").replace(/\r/g, "").trim();
  const blocks: ContentBlock[] = [];

  let last = 0;
  for (const match of raw.matchAll(IMAGE_RE)) {
    const before = raw.slice(last, match.index).trim();
    if (before) {
      before.split(/\n\n+/).forEach((chunk) => {
        const text = chunk.replace(/\n/g, " ").trim();
        if (text) blocks.push({ type: "paragraph", text });
      });
    }
    blocks.push({ type: "image", src: match[1].trim(), float: match[2] as "left" | "right", caption: match[3].trim(), size: (match[4] ?? "medium") as "small" | "medium" | "half" | "full" });
    last = (match.index ?? 0) + match[0].length;
  }

  const after = raw.slice(last).trim();
  if (after) {
    after.split(/\n\n+/).forEach((chunk) => {
      const text = chunk.replace(/\n/g, " ").trim();
      if (text) blocks.push({ type: "paragraph", text });
    });
  }

  return blocks;
}

function readList(folder: string, file: string): string[] {
  const filePath = path.join(process.cwd(), "content", "projects", folder, file);
  const raw = fs.readFileSync(filePath, "utf-8").trim();
  return raw.split(/\n/).map((l) => l.trim()).filter(Boolean);
}

export default function Projects() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10 text-[17px]">

      {/* Page header */}
      <h1 className="mt-6 text-4xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-4 text-neutral-400 leading-8 max-w-2xl">
        High-Level Overviews and Executive Summaries.
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
        {projects.map((p) => {
          const problem = readContent(p.folder, "problem.txt");
          const built = readContent(p.folder, "built.txt");
          const role = readContent(p.folder, "role.txt");
          const takeaways = readList(p.folder, "takeaways.txt");

          return (
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
                <Section label="Problem / Motivation" body={problem} />
                <Section label="What I Built" body={built} />
                <Section label="My Role & Process" body={role} />

                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-4">
                    Key Technical Takeaways
                  </p>
                  <ul className="space-y-2">
                    {takeaways.map((t, j) => (
                      <li key={j} className="flex gap-3 text-neutral-400 leading-7">
                        <span className="mt-1 text-neutral-700 shrink-0">—</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}

function Section({ label, body }: { label: string; body: ContentBlock[] }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3">
        {label}
      </p>
      <div className="overflow-hidden">
        {body.map((block, i) => {
          if (block.type === "image") {
            const sizeClass =
              block.size === "small"  ? "w-56 sm:w-72" :
              block.size === "medium" ? "w-64 sm:w-[38%]" :
              block.size === "half"   ? "w-[48%]" :
              "w-full";
            return (
              <ProjectImage
                key={i}
                src={block.src}
                caption={block.caption}
                float={block.float}
                sizeClass={sizeClass}
              />
            );
          }
          return (
            <p key={i} className="text-neutral-400 leading-8 mb-4">
              {block.text}
            </p>
          );
        })}
      </div>
    </div>
  );
}
