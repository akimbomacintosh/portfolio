import { createReader } from "@keystatic/core/reader";
import config from "../../keystatic.config";

const reader = createReader(process.cwd(), config);
const MONO = "ui-monospace, 'SF Mono', SFMono-Regular, Menlo, monospace";
const GRAD = "linear-gradient(to right, #2563EB, #3B82F6, #0EA5E9)";

export default async function Experience() {
  const [data, site] = await Promise.all([
    reader.singletons.experience.read(),
    reader.singletons.site.read(),
  ]);
  const roles = data?.roles ?? [];
  const heading = data?.heading || "Experience";
  const intro = data?.intro || "Internships, roles, and the impact I had.";
  const backLabel = site?.backLabel || "← Back";

  return (
    <>
      <section className="relative flex flex-col justify-between" style={{ minHeight: "clamp(400px,65vh,680px)", backgroundImage: "url('/images/videography/downtown-night.jpg')", backgroundSize: "cover", backgroundPosition: "center", padding: "clamp(32px,5vh,60px) clamp(24px,5vw,80px)" }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.82) 100%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <a href="/" className="uppercase transition-colors hover:text-white" style={{ fontFamily: MONO, color: "rgba(255,255,255,0.5)", fontSize: 12, letterSpacing: "0.28em" }}>{backLabel}</a>
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 className="font-bold" style={{ margin: 0, color: "#fff", fontSize: "clamp(2.4rem,6vw,5.5rem)", letterSpacing: "-0.035em", lineHeight: 0.95 }}>
            {heading}<span style={{ backgroundImage: GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>.</span>
          </h1>
          {intro && <p style={{ margin: "18px 0 0", color: "rgba(255,255,255,0.62)", fontSize: "clamp(1rem,1.4vw,1.125rem)", lineHeight: 1.6, maxWidth: "52ch" }}>{intro}</p>}
        </div>
      </section>
      <main className="mx-auto max-w-5xl px-6 py-10 text-[17px]">
        <div className="space-y-16">
          {roles.map((role, idx) => (
            <article key={`${role.company}-${idx}`} className="border-t border-neutral-700 pt-10">
              <div className="sm:flex sm:items-start sm:justify-between sm:gap-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white">{role.company}</h2>
                  <p className="mt-1 text-lg text-neutral-400">{role.role}</p>
                  <p className="mt-1 text-sm text-neutral-500">{role.dates} · {role.location}</p>
                </div>
              </div>
              <ul className="mt-6 max-w-3xl space-y-2 text-neutral-600 leading-8">
                {role.bullets.map((b, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1 text-neutral-400">–</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
