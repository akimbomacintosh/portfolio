import katex from "katex";
import "katex/dist/katex.min.css";
import ProjectImage from "../components/ProjectImage";
import PhotoCollage from "../components/PhotoCollage";
import { createReader } from "@keystatic/core/reader";
import config from "../../keystatic.config";

export const dynamic = "force-dynamic";

const reader = createReader(process.cwd(), config);

type TextBlock     = { type: "paragraph"; text: string };
type IndentedBlock = { type: "indented"; text: string };
type ListBlock     = { type: "list"; items: string[] };
type ImageBlock    = { type: "image"; src: string; float: "left" | "right"; caption: string; size: "small" | "medium" | "half" | "full" };
type EquationBlock = { type: "equation"; latex: string };
type ContentBlock  = TextBlock | IndentedBlock | ListBlock | ImageBlock | EquationBlock;

// Converts **bold**, *italic*, and bare URLs to HTML. Content comes from local files, not user input.
function formatInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-400 underline hover:text-blue-300 transition-colors">$1</a>');
}

// Parses a .txt file into paragraphs, inline images, and centered equations.
// Syntax: [[image:/path/to/image.jpg:right:Caption text]]
//         [[image:/path/to/image.jpg:left:Caption text:large]]  (small | medium | half | full)
//         [[eq: \frac{c}{f} = 0.275\text{ m}]]
const TOKEN_RE = /\[\[(?:image:([^:]+):(left|right):([^\]:]+)(?::(small|medium|half|full))?|eq:([\s\S]+?))\]\]/g;

function splitTextBlocks(raw: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  raw.split(/\n\n+/).forEach((chunk) => {
    const lines = chunk.split("\n").map((l) => l.trimEnd()).filter((l) => l.trim());
    if (!lines.length) return;
    if (lines.every((l) => /^- /.test(l))) {
      blocks.push({ type: "list", items: lines.map((l) => l.slice(2).trim()) });
    } else if (lines.every((l) => /^( {2}|\t)/.test(l))) {
      const text = lines.map((l) => l.replace(/^( {2}|\t)/, "")).join(" ").trim();
      if (text) blocks.push({ type: "indented", text });
    } else {
      const text = chunk.replace(/\n/g, " ").trim();
      if (text) blocks.push({ type: "paragraph", text });
    }
  });
  return blocks;
}

type Update = { date: string; text: string };

// Parses a project body field (Overview, How It Works, etc.) into renderable blocks.
// The raw string uses the same custom syntax the old .txt files did — see TOKEN_RE above.
function parseContent(input: string | null | undefined): ContentBlock[] {
  const raw = (input ?? "").replace(/\r/g, "").trim();
  if (!raw) return [];
  const blocks: ContentBlock[] = [];

  let last = 0;
  for (const match of raw.matchAll(TOKEN_RE)) {
    const before = raw.slice(last, match.index).trim();
    if (before) blocks.push(...splitTextBlocks(before));

    if (match[1]) {
      // image token
      blocks.push({
        type: "image",
        src: match[1].trim(),
        float: match[2] as "left" | "right",
        caption: match[3].trim(),
        size: (match[4] ?? "medium") as "small" | "medium" | "half" | "full",
      });
    } else {
      // equation token
      blocks.push({ type: "equation", latex: match[5].trim() });
    }

    last = (match.index ?? 0) + match[0].length;
  }

  const after = raw.slice(last).trim();
  if (after) blocks.push(...splitTextBlocks(after));

  return blocks;
}

export default async function Projects() {
  const [projEntries, labEntries, page] = await Promise.all([
    reader.collections.projects.all(),
    reader.collections.labProjects.all(),
    reader.singletons.projectsPage.read(),
  ]);

  const t = {
    heading: page?.heading || "Projects",
    jumpTo: page?.jumpToLabel || "Jump to",
    labToggle: page?.labToggleLabel || "Lab Final Projects",
    labSection: page?.labSectionTitle || "Lab Final Projects — Academic Coursework",
    overview: page?.overviewLabel || "Overview",
    myRole: page?.myRoleLabel || "My Role",
    howItWorks: page?.howItWorksLabel || "How It Works",
    result: page?.resultLabel || "Result",
    updates: page?.updatesLabel || "Updates",
  };

  const projects = projEntries
    .filter(({ entry }) => !entry.draft)
    .map(({ slug, entry }) => ({
      id: slug,
      order: entry.order ?? 100,
      title: entry.title,
      tagline: entry.tagline,
      tags: (entry.tags ?? []).filter(Boolean) as string[],
      links: (entry.links ?? []).filter((l) => l.url) as { label: string; url: string }[],
      isGroupProject: entry.isGroupProject,
      dateStart: entry.dateStart,
      dateEnd: entry.dateEnd,
      overview: entry.overview,
      myRole: entry.myRole,
      howItWorks: entry.howItWorks,
      result: entry.result,
      updates: [...(entry.updates ?? [])].reverse() as Update[], // newest first
      images: (entry.images ?? []).filter(Boolean) as string[],
      videos: (entry.videos ?? []).filter(Boolean) as string[],
    }))
    .sort((a, b) => a.order - b.order);

  const labProjects = labEntries
    .filter(({ entry }) => !entry.draft)
    .map(({ slug, entry }) => ({
      id: slug,
      order: entry.order ?? 100,
      title: entry.title,
      courseCode: entry.courseCode,
      description: entry.description,
      tags: (entry.tags ?? []).filter(Boolean) as string[],
      dateEnd: entry.dateEnd,
      images: (entry.images ?? []).filter(Boolean) as string[],
    }))
    .sort((a, b) => a.order - b.order);

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 text-[17px]">

      <h1 className="mt-6 text-5xl font-bold tracking-tight">{t.heading}<span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(to right, #2563EB, #3B82F6, #0EA5E9)" }}>.</span></h1>

      {/* Jump-to navigation */}
      <nav className="mt-10 border border-neutral-700 bg-neutral-900 p-6">
        <p className="text-xs uppercase tracking-widest text-neutral-500 mb-4">{t.jumpTo}</p>
        <ol className="space-y-2">
          {projects.map((p, i) => (
            <li key={p.id} className="flex items-baseline gap-4">
              <span className="text-xs text-neutral-600 w-4 shrink-0">{i + 1}</span>
              <a
                href={`#${p.id}`}
                className="text-neutral-300 hover:text-white hover:underline transition-colors text-base"
              >
                {p.title}
              </a>
              <span className="text-xs text-neutral-600">
                {p.dateStart} — {p.dateEnd}
              </span>
            </li>
          ))}
        </ol>

        <details className="group mt-5 pt-4 border-t border-neutral-800">
          <summary className="flex items-center gap-2 pl-6 mb-0 cursor-pointer list-none group-open:mb-3">
            <svg className="w-3 h-3 text-neutral-600 transition-transform duration-200 group-open:rotate-90" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
            </svg>
            <span className="text-xs uppercase tracking-widest text-neutral-600">{t.labToggle}</span>
          </summary>
          <div className="space-y-2">
            {labProjects.map((p) => (
              <div key={p.id} className="flex items-baseline gap-4 pl-8">
                <span className="text-xs text-neutral-700 shrink-0 w-14">{p.courseCode}</span>
                <a href={`#${p.id}`} className="text-neutral-500 hover:text-white hover:underline transition-colors text-sm">
                  {p.title}
                </a>
              </div>
            ))}
          </div>
        </details>
      </nav>

      {/* Project sections */}
      <div className="mt-12 space-y-32">
        {projects.map((p) => {
          const overview    = parseContent(p.overview);
          const whatIDid    = parseContent(p.myRole);
          const howItWorks  = parseContent(p.howItWorks);
          const result      = parseContent(p.result);
          const updates     = p.updates;

          return (
            <article key={p.id} id={p.id} className="scroll-mt-20">

              {/* Header block */}
              <div className="border-t-2 border-neutral-700 pt-8">
                <div className="flex items-start justify-between gap-6">
                  <h2 className="text-3xl font-bold tracking-tight text-white">{p.title}</h2>
                  <div className="shrink-0 flex items-center gap-2 text-xs text-neutral-600">
                    <span>{p.dateStart}</span>
                    <span className="text-neutral-700">→</span>
                    <span>{p.dateEnd}</span>
                  </div>
                </div>

                {/* Tagline */}
                <p className="mt-5 text-neutral-300 leading-8 max-w-3xl">{p.tagline}</p>

                {/* Skill tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-neutral-700 bg-neutral-900 px-3 py-1 text-sm text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                {p.links.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {p.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-900 px-4 py-1.5 text-sm text-neutral-200 hover:border-neutral-500 hover:text-white transition-colors"
                      >
                        {link.label || link.url}
                        <svg className="w-3 h-3 text-neutral-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7v9" />
                        </svg>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Photo collage */}
              {(p.images.length > 0 || (p.videos && p.videos.length > 0)) && (
                <div className="mt-8">
                  <PhotoCollage images={p.images} videos={p.videos} />
                </div>
              )}

              {/* Body sections */}
              <div className="mt-10 space-y-10">
                <Section label={t.overview} body={overview} />
                {p.isGroupProject && <Section label={t.myRole} body={whatIDid} />}
                <Section label={t.howItWorks} body={howItWorks} />
                <Section label={t.result} body={result} />
                <UpdatesSection label={t.updates} updates={updates} />
              </div>

            </article>
          );
        })}
      </div>

      {/* Lab Final Projects */}
      <div className="mt-32">
        <div className="flex items-center gap-6 mb-16">
          <div className="h-px flex-1 bg-neutral-800" />
          <p className="text-xs uppercase tracking-widest text-neutral-500 shrink-0">{t.labSection}</p>
          <div className="h-px flex-1 bg-neutral-800" />
        </div>
        <div className="space-y-12">
          {labProjects.map((p, i) => (
            <article key={p.id} id={p.id} className={`scroll-mt-20 pt-8 ${i > 0 ? "border-t border-neutral-800" : ""}`}>
              <div className="flex items-start justify-between gap-6">
                <div>
                  <span className="inline-block text-xs font-mono text-neutral-500 border border-neutral-800 px-2 py-0.5 mb-2">{p.courseCode}</span>
                  <h2 className="text-2xl font-bold tracking-tight text-white">{p.title}</h2>
                </div>
                <span className="text-xs text-neutral-600 shrink-0 pt-1">{p.dateEnd}</span>
              </div>
              <p className="mt-4 text-neutral-400 leading-8 max-w-3xl">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-neutral-700 bg-neutral-900 px-3 py-1 text-sm text-neutral-300">
                    {tag}
                  </span>
                ))}
              </div>
              {p.images.length > 0 && (
                <div className="mt-6">
                  <PhotoCollage images={p.images} />
                </div>
              )}
            </article>
          ))}
        </div>
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
          if (block.type === "equation") {
            const html = katex.renderToString(block.latex, { displayMode: true, throwOnError: false });
            return (
              <div
                key={i}
                className="my-6 text-center overflow-x-auto"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          }
          if (block.type === "list") {
            return (
              <ul key={i} className="list-disc list-outside pl-6 mb-4 space-y-1">
                {block.items.map((item, j) => (
                  <li key={j} className="text-neutral-400 leading-8"
                    dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
                ))}
              </ul>
            );
          }
          if (block.type === "indented") {
            return (
              <p key={i} className="text-neutral-400 leading-8 mb-4 pl-6 border-l border-neutral-700"
                dangerouslySetInnerHTML={{ __html: formatInline(block.text) }} />
            );
          }
          return (
            <p key={i} className="text-neutral-400 leading-8 mb-4"
              dangerouslySetInnerHTML={{ __html: formatInline(block.text) }} />
          );
        })}
      </div>
    </div>
  );
}

function UpdatesSection({ label, updates }: { label: string; updates: Update[] }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3">{label}</p>
      <div className="space-y-5">
        {updates.map((u, i) => (
          <div key={i} className="flex gap-6">
            <span className="text-neutral-600 text-sm shrink-0 pt-0.5">{u.date}</span>
            <p className="text-neutral-400 leading-7 italic">{u.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
