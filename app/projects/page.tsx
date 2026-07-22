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

const MONO = "ui-monospace,'SF Mono',SFMono-Regular,Menlo,monospace";
const GRAD = "linear-gradient(to right, #2563EB, #3B82F6, #0EA5E9)";

export default async function Projects() {
  const [projEntries, labEntries, page, site] = await Promise.all([
    reader.collections.projects.all(),
    reader.collections.labProjects.all(),
    reader.singletons.projectsPage.read(),
    reader.singletons.site.read(),
  ]);
  const backLabel = site?.backLabel || "← Back";

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
    <>
      <section className="page-hero relative flex flex-col justify-between" style={{ minHeight: "clamp(400px,65vh,680px)", backgroundImage: "url('/images/videography/skyline-aerial.jpg')", backgroundSize: "cover", backgroundPosition: "center", padding: "clamp(32px,5vh,60px) clamp(24px,5vw,80px)" }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.82) 100%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <a href="/" className="uppercase transition-colors hover:text-white" style={{ fontFamily: MONO, color: "rgba(255,255,255,0.5)", fontSize: 12, letterSpacing: "0.28em" }}>{backLabel}</a>
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 className="font-bold" style={{ margin: 0, color: "#fff", fontSize: "clamp(2.4rem,6vw,5.5rem)", letterSpacing: "-0.035em", lineHeight: 0.95 }}>
            {t.heading}<span style={{ backgroundImage: GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>.</span>
          </h1>
          <p style={{ margin: "18px 0 0", color: "rgba(255,255,255,0.62)", fontSize: "clamp(1rem,1.4vw,1.125rem)", lineHeight: 1.6, maxWidth: "52ch" }}>Completed, in-progress, and future projects. Personal and academic.</p>
        </div>
      </section>

      {/* ── Project tiles ─────────────────────────────────────── */}
      <section style={{ borderBottom: "1px solid #1a1a1a" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 1, background: "#1c1c1c" }}>
          {projects.map((p, i) => {
            const bg = p.images[0] || "";
            return (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="shimmer-box group relative flex flex-col justify-between overflow-hidden"
                style={{ minHeight: "clamp(260px,38vh,460px)", padding: "clamp(24px,3vw,44px)", gap: 34 }}
              >
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]"
                  style={bg
                    ? { backgroundImage: `url('${bg}')`, backgroundSize: "cover", backgroundPosition: "center" }
                    : { background: "#080808" }}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.9) 100%)" }} />
                <div className="tile-bar" style={{ height: 2 }} />

                <div className="relative z-[1] flex items-start justify-between" style={{ gap: 16 }}>
                  <span style={{ fontFamily: MONO, fontSize: 12, color: "rgba(255,255,255,0.28)", letterSpacing: "0.1em" }}>{String(i + 1).padStart(2, "0")}</span>
                  <div className="flex flex-wrap justify-end" style={{ gap: 6 }}>
                    {p.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="uppercase" style={{ fontFamily: MONO, fontSize: 9, color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.12)", padding: "3px 7px", letterSpacing: "0.1em" }}>{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="relative z-[1]">
                  <div className="flex items-end justify-between" style={{ gap: 14 }}>
                    <h2 className="m-0 font-semibold" style={{ color: "#fff", fontSize: "clamp(18px,2.2vw,34px)", letterSpacing: "-0.025em", lineHeight: 1.08 }}>{p.title}</h2>
                    <span className="shrink-0 transition-all duration-300 group-hover:translate-x-[7px] group-hover:text-white" style={{ color: "rgba(255,255,255,0.35)", fontSize: 22 }}>→</span>
                  </div>
                  {p.tagline && (
                    <p style={{ margin: "10px 0 0", color: "rgba(255,255,255,0.48)", fontSize: 14, lineHeight: 1.6, maxWidth: "44ch" }}>{p.tagline}</p>
                  )}
                  <p style={{ margin: "12px 0 0", fontFamily: MONO, color: "rgba(255,255,255,0.22)", fontSize: 11, letterSpacing: "0.08em" }}>
                    {p.dateStart}{p.dateEnd && p.dateEnd !== p.dateStart ? ` — ${p.dateEnd}` : ""}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* ── Project details ───────────────────────────────────── */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 clamp(24px,5vw,64px)" }}>
        <div style={{ paddingTop: "clamp(56px,9vh,96px)", paddingBottom: "clamp(56px,9vh,96px)" }}>
          {projects.map((p) => {
            const overview   = parseContent(p.overview);
            const whatIDid   = parseContent(p.myRole);
            const howItWorks = parseContent(p.howItWorks);
            const result     = parseContent(p.result);
            const updates    = p.updates;

            return (
              <article key={p.id} id={p.id} style={{ marginBottom: "clamp(56px,9vh,96px)", scrollMarginTop: 72 }}>
                <div style={{ borderTop: "1px solid #1f1f1f", paddingTop: "clamp(28px,4vh,44px)" }}>
                  <div className="flex items-start flex-wrap" style={{ gap: 14, justifyContent: "space-between" }}>
                    <h2 className="m-0 font-semibold" style={{ color: "#ededed", fontSize: "clamp(1.4rem,2.6vw,2.2rem)", letterSpacing: "-0.025em", lineHeight: 1.08 }}>{p.title}</h2>
                    <span style={{ fontFamily: MONO, color: "#525252", fontSize: 12, letterSpacing: "0.06em" }}>
                      {p.dateStart}{p.dateEnd && p.dateEnd !== p.dateStart ? ` — ${p.dateEnd}` : ""}
                    </span>
                  </div>
                  {p.tagline && <p style={{ margin: "14px 0 0", color: "#8a8a8a", fontSize: "clamp(0.9rem,1.3vw,1rem)", lineHeight: 1.8, maxWidth: "60ch" }}>{p.tagline}</p>}
                  <div className="flex flex-wrap" style={{ gap: 7, marginTop: 16 }}>
                    {p.tags.map((tag) => (
                      <span key={tag} className="uppercase" style={{ fontFamily: MONO, fontSize: 10, color: "rgba(237,237,237,0.4)", border: "1px solid #2a2a2a", padding: "4px 10px", letterSpacing: "0.1em" }}>{tag}</span>
                    ))}
                  </div>
                  {p.links.length > 0 && (
                    <div className="flex flex-wrap" style={{ gap: 8, marginTop: 14 }}>
                      {p.links.map((link) => (
                        <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white" style={{ fontFamily: MONO, fontSize: 11, color: "#8a8a8a", border: "1px solid #2a2a2a", padding: "6px 14px", letterSpacing: "0.08em" }}>
                          {link.label || "Link"} ↗
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {(p.images.length > 0 || (p.videos && p.videos.length > 0)) && (
                  <div style={{ marginTop: 28 }}>
                    <PhotoCollage images={p.images} videos={p.videos} />
                  </div>
                )}

                <div style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 32 }}>
                  <Section label={t.overview} body={overview} />
                  {p.isGroupProject && <Section label={t.myRole} body={whatIDid} />}
                  <Section label={t.howItWorks} body={howItWorks} />
                  <Section label={t.result} body={result} />
                  <UpdatesSection label={t.updates} updates={updates} />
                </div>
              </article>
            );
          })}

          {/* ── Lab Projects ───────────────────────────────────── */}
          {labProjects.length > 0 && (
            <div style={{ paddingTop: "clamp(32px,5vh,56px)", borderTop: "1px solid #1f1f1f" }}>
              <p className="m-0 uppercase" style={{ fontFamily: MONO, color: "#525252", fontSize: 11, letterSpacing: "0.28em", marginBottom: "clamp(24px,4vh,40px)" }}>{t.labSection}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {labProjects.map((p, i) => (
                  <article key={p.id} id={p.id} style={{ scrollMarginTop: 72, padding: "clamp(20px,3vh,32px) 0", borderTop: i > 0 ? "1px solid #1a1a1a" : "none" }}>
                    <div className="flex items-start justify-between flex-wrap" style={{ gap: 12 }}>
                      <div>
                        <span className="uppercase" style={{ fontFamily: MONO, fontSize: 10, color: "#525252", border: "1px solid #2a2a2a", padding: "3px 8px", letterSpacing: "0.1em", display: "inline-block", marginBottom: 10 }}>{p.courseCode}</span>
                        <h3 className="m-0 font-semibold" style={{ color: "#ededed", fontSize: "clamp(1rem,1.7vw,1.35rem)", letterSpacing: "-0.015em" }}>{p.title}</h3>
                      </div>
                      <span style={{ fontFamily: MONO, color: "#525252", fontSize: 12 }}>{p.dateEnd}</span>
                    </div>
                    {p.description && <p style={{ margin: "10px 0 0", color: "#8a8a8a", fontSize: 15, lineHeight: 1.8, maxWidth: "60ch" }}>{p.description}</p>}
                    <div className="flex flex-wrap" style={{ gap: 7, marginTop: 12 }}>
                      {p.tags.map((tag) => (
                        <span key={tag} className="uppercase" style={{ fontFamily: MONO, fontSize: 9.5, color: "rgba(237,237,237,0.3)", border: "1px solid #222", padding: "3px 8px", letterSpacing: "0.1em" }}>{tag}</span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const SECTION_LABEL = { fontFamily: MONO, fontSize: 10, letterSpacing: "0.26em", color: "#525252", textTransform: "uppercase" as const, marginBottom: 14 };

function Section({ label, body }: { label: string; body: ContentBlock[] }) {
  if (!body.length) return null;
  return (
    <div>
      <p className="m-0" style={SECTION_LABEL}>{label}</p>
      <div className="overflow-hidden">
        {body.map((block, i) => {
          if (block.type === "image") {
            const sizeClass =
              block.size === "small"  ? "w-56 sm:w-72" :
              block.size === "medium" ? "w-64 sm:w-[38%]" :
              block.size === "half"   ? "w-[48%]" : "w-full";
            return <ProjectImage key={i} src={block.src} caption={block.caption} float={block.float} sizeClass={sizeClass} />;
          }
          if (block.type === "equation") {
            const html = katex.renderToString(block.latex, { displayMode: true, throwOnError: false });
            return <div key={i} className="my-6 text-center overflow-x-auto" dangerouslySetInnerHTML={{ __html: html }} />;
          }
          if (block.type === "list") {
            return (
              <ul key={i} style={{ paddingLeft: 22, marginBottom: 16, listStyleType: "disc" }}>
                {block.items.map((item, j) => (
                  <li key={j} style={{ color: "#8a8a8a", lineHeight: 1.85, marginBottom: 4 }} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
                ))}
              </ul>
            );
          }
          if (block.type === "indented") {
            return <p key={i} style={{ color: "#8a8a8a", lineHeight: 1.85, marginBottom: 14, paddingLeft: 18, borderLeft: "2px solid #2a2a2a" }} dangerouslySetInnerHTML={{ __html: formatInline(block.text) }} />;
          }
          return <p key={i} style={{ color: "#8a8a8a", lineHeight: 1.85, marginBottom: 14 }} dangerouslySetInnerHTML={{ __html: formatInline(block.text) }} />;
        })}
      </div>
    </div>
  );
}

function UpdatesSection({ label, updates }: { label: string; updates: Update[] }) {
  if (!updates.length) return null;
  return (
    <div>
      <p className="m-0" style={SECTION_LABEL}>{label}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {updates.map((u, i) => (
          <div key={i} style={{ display: "flex", gap: 24 }}>
            <span style={{ fontFamily: MONO, color: "#525252", fontSize: 12, flexShrink: 0, paddingTop: 2 }}>{u.date}</span>
            <p className="m-0" style={{ color: "#8a8a8a", lineHeight: 1.8, fontStyle: "italic" }}>{u.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
