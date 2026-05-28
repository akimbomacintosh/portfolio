import fs from "fs";
import path from "path";
import katex from "katex";
import "katex/dist/katex.min.css";
import ProjectImage from "../components/ProjectImage";
import PhotoCollage from "../components/PhotoCollage";

export const dynamic = "force-dynamic";

type Project = {
  id: string;           // URL anchor — change freely
  folder: string;       // must match folder in content/projects/ — do not change
  title: string;
  tagline: string;
  images: string[];     // paths from /public, e.g. ["/images/projects/ads-b-antenna/hero.jpg"] — leave [] for placeholders
  videos?: string[];    // paths from /public, e.g. ["/videos/projects/audio-reactive-leds/demo.mp4"]
  tags: string[];       // 3–5 skill chips
  isGroupProject: boolean;
  dateStart: string;
  dateEnd: string;
};

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

const projects: Project[] = [
  {
    id: "ads-b-antenna",
    folder: "ads-b-antenna",
    title: "ADS-B Receiver Antenna",
    tagline: "Custom antenna designed to receive 1090 MHz ADS-B signals from aircraft, utilizing Raspberry Pi hardware to decode and display tracking data. ",
    images: [
      "/images/projects/ads-b-antenna/1140A2CF-8E09-4C70-8238-3C5F971EEF45_1_201_a.jpeg",
      "/images/projects/ads-b-antenna/1F11099C-DB8B-4002-A626-85C9FAC4D857.jpeg",
      "/images/projects/ads-b-antenna/4907E361-1668-4765-B768-12AEE2E52D0B.jpeg",
      "/images/projects/ads-b-antenna/D70B59C9-8388-4FF5-9F6B-2A193816F9E0_1_201_a.jpeg",
      "/images/projects/ads-b-antenna/F303E68F-D691-48FE-AC00-2C2ECEFEBECC_1_201_a.jpeg",
    ],
    tags: ["RTL-SDR", "Raspberry Pi", "Linux", "RF Design", "Optimization"],
    isGroupProject: false,
    dateStart: "Apr 2025",
    dateEnd: "Present",
  },
  {
    id: "esc",
    folder: "esc",
    title: "STM32-Powered Electronic Speed Controller",
    tagline: "Reconstructed ESC (Electronic Speed Controller) for brushless motors, designed in KiCad and prototyped on a perfboard with an STM32 Nucleo board",
    images: [
      "/images/projects/esc/3A690A63-A814-402F-B3E0-2A4571E85830_1_105_c.jpeg",
      "/images/projects/esc/IMG_8209 2.JPG",
      "/images/projects/esc/Screenshot 2026-05-14 at 12.15.11.png",
    ],
    tags: ["STM32", "KiCad", "PCB Protoyping", "Soldering"],
    isGroupProject: false,
    dateStart: "Dec 2025",
    dateEnd: "Present",
  },
  {
    id: "yagi-uda-antenna",
    folder: "yagi-uda-antenna",
    title: "Yagi-Uda Directional Wi-Fi Antennas",
    tagline: "Pair of two highly directional WiFi antennas designed and optimized to beam a local 2.4GHz WiFi signal over long distances using ESP32 hardware and 4nec2 simulations",
    images: [
      "/images/projects/yagi-uda-antenna/336BEB23-EB88-499F-98E2-93971164DDB7_1_201_a.jpeg",
      "/images/projects/yagi-uda-antenna/Screenshot 2026-04-09 at 00.03.26.png",
      "/images/projects/yagi-uda-antenna/Screenshot 2026-04-09 at 00.03.58.png",
    ],
    tags: ["RF Design", "Antenna Theory", "4nec2", "ESP32", "Optimization"],
    isGroupProject: true,
    dateStart: "Apr 2026",
    dateEnd: "Present",
  },
  {
    id: "website",
    folder: "website",
    title: "Portfolio Website",
    tagline: "This website! Built using Next.js and launched via Vercel",
    images: [
      "/images/projects/website/Screenshot 2026-05-14 at 12.21.01.png",
      "/images/projects/website/Screenshot 2026-05-14 at 12.24.06.png",
      "/images/projects/website/Screenshot 2026-05-14 at 12.24.32.png",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "VSCode"],
    isGroupProject: false,
    dateStart: "Jan 2025",
    dateEnd: "Present",
  },
  {
    id: "networking",
    folder: "network-management",
    title: "Network Management w/ Multiband Optimizations & Pi-Hole",
    tagline: "Home network management using a Raspberry Pi to run network-wide ad blocking and DNS management",
    images: [],
    tags: ["Raspberry Pi", "Pi-Hole", "DNS", "Networking"],
    isGroupProject: false,
    dateStart: "Sep 2025",
    dateEnd: "Present",
  },
  {
    id: "audio-reactive-leds",
    folder: "audio-reactive-leds",
    title: "Audio-Reactive LED Strips",
    tagline: "A fun project to turn my bedroom into a club - a small voltage step down module and ESP32 reading audio data from an audio interface to control light patterns based on frequency and amplitude data",
    images: ["/images/projects/audio-reactive-leds/block-diagram.jpg"],
    videos: ["/images/projects/audio-reactive-leds/95A771D3-1989-48DC-AD5E-E5D258B3BEE3.MP4"],
    tags: ["Arduino", "FastLED", "Soldering", "Audio Processing", "ESP32"],
    isGroupProject: false,
    dateStart: "Apr 2026",
    dateEnd: "Present",
  },
];

type LabProject = {
  id: string;
  title: string;
  courseCode: string;
  description: string;
  images: string[];
  tags: string[];
  dateEnd: string;
};

const labProjects: LabProject[] = [
  {
    id: "line-following-robot",
    title: "Autonomous Line-Following Robot",
    courseCode: "EE 201",
    description: "An autonomous robot that follows a line using a custom photoresistor PCB sensor array and a PID control loop programmed via Arduino IDE. Built as a group final project.",
    images: [
      "/images/projects/line-following-robot/IMG_4023.JPG",
      "/images/projects/line-following-robot/IMG_4266 2.JPG",
      "/images/projects/line-following-robot/IMG_4267 2.jpg",
    ],
    tags: ["Arduino", "PID Control", "PCB Design", "Soldering", "3D Printing"],
    dateEnd: "Dec 2025",
  },
  {
    id: "tri-band-filter",
    title: "Tri-Band Audio Filter",
    courseCode: "EE 233",
    description: "A multi-band active audio filter designed using op-amps and passive components, applying Laplace transform analysis for low-pass, band-pass, and high-pass filter stages.",
    images: [],
    tags: ["Filter Design", "Op-Amps", "Circuit Theory", "Laplace Transforms"],
    dateEnd: "Mar 2026",
  },
  {
    id: "ac-dc-converter",
    title: "AC/DC Converter & Booster",
    courseCode: "EE 331",
    description: "An AC to DC rectifier circuit with a boost converter stage, designed and tested as a final lab project applying semiconductor device theory.",
    images: [],
    tags: ["Power Electronics", "Rectifier", "Boost Converter", "Semiconductors"],
    dateEnd: "Jun 2026",
  },
];

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

function readUpdates(folder: string): Update[] {
  const filePath = path.join(process.cwd(), "content", "projects", folder, "updates.txt");
  if (!fs.existsSync(filePath)) return [];
  return fs.readFileSync(filePath, "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.includes(" | "))
    .map((line) => {
      const idx = line.indexOf(" | ");
      return { date: line.slice(0, idx).trim(), text: line.slice(idx + 3).trim() };
    })
    .reverse();
}

function readContent(folder: string, file: string): ContentBlock[] {
  const filePath = path.join(process.cwd(), "content", "projects", folder, file);
  const raw = fs.readFileSync(filePath, "utf-8").replace(/\r/g, "").trim();
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

export default function Projects() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10 text-[17px]">

      <h1 className="mt-6 text-5xl font-bold tracking-tight">Projects</h1>

      {/* Jump-to navigation */}
      <nav className="mt-10 border border-neutral-700 bg-neutral-900 p-6">
        <p className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Jump to</p>
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
            <span className="text-xs uppercase tracking-widest text-neutral-600">Lab Final Projects</span>
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
          const overview    = readContent(p.folder, "overview.txt");
          const whatIDid    = readContent(p.folder, "what-i-did.txt");
          const howItWorks  = readContent(p.folder, "how-it-works.txt");
          const result      = readContent(p.folder, "result.txt");
          const updates     = readUpdates(p.folder);

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
              </div>

              {/* Photo collage */}
              {(p.images.length > 0 || (p.videos && p.videos.length > 0)) && (
                <div className="mt-8">
                  <PhotoCollage images={p.images} videos={p.videos} />
                </div>
              )}

              {/* Body sections */}
              <div className="mt-10 space-y-10">
                <Section label="Overview" body={overview} />
                {p.isGroupProject && <Section label="My Role" body={whatIDid} />}
                <Section label="How It Works" body={howItWorks} />
                <Section label="Result" body={result} />
                <UpdatesSection updates={updates} />
              </div>

            </article>
          );
        })}
      </div>

      {/* Lab Final Projects */}
      <div className="mt-32">
        <div className="flex items-center gap-6 mb-16">
          <div className="h-px flex-1 bg-neutral-800" />
          <p className="text-xs uppercase tracking-widest text-neutral-500 shrink-0">Lab Final Projects — Academic Coursework</p>
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

function UpdatesSection({ updates }: { updates: Update[] }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3">Updates</p>
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
