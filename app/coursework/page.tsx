import { createReader } from "@keystatic/core/reader";
import config from "../../keystatic.config";

const reader = createReader(process.cwd(), config);
const MONO = "ui-monospace, 'SF Mono', SFMono-Regular, Menlo, monospace";
const GRAD = "linear-gradient(to right, #2563EB, #3B82F6, #0EA5E9)";

export default async function Coursework() {
  const [data, site] = await Promise.all([
    reader.singletons.coursework.read(),
    reader.singletons.site.read(),
  ]);
  const courses = data?.courses ?? [];
  const description = data?.description ?? "";
  const heading = data?.heading || "Coursework";
  const backLabel = site?.backLabel || "← Back";

  return (
    <>
      <section className="relative flex flex-col justify-between" style={{ minHeight: "clamp(400px,65vh,680px)", backgroundImage: "url('/images/videography/husky-stadium.jpg')", backgroundSize: "cover", backgroundPosition: "center", padding: "clamp(32px,5vh,60px) clamp(24px,5vw,80px)" }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.82) 100%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <a href="/" className="uppercase transition-colors hover:text-white" style={{ fontFamily: MONO, color: "rgba(255,255,255,0.5)", fontSize: 12, letterSpacing: "0.28em" }}>{backLabel}</a>
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 className="font-bold" style={{ margin: 0, color: "#fff", fontSize: "clamp(2.4rem,6vw,5.5rem)", letterSpacing: "-0.035em", lineHeight: 0.95 }}>
            {heading}<span style={{ backgroundImage: GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>.</span>
          </h1>
          {description && <p style={{ margin: "18px 0 0", color: "rgba(255,255,255,0.62)", fontSize: "clamp(1rem,1.4vw,1.125rem)", lineHeight: 1.6, maxWidth: "52ch" }}>{description}</p>}
        </div>
      </section>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        style={{ gap: 1, background: "#1c1c1c", borderBottom: "1px solid #1c1c1c" }}
      >
        {courses.map((course, i) => (
          <div
            key={course.code}
            className="relative flex flex-col justify-between overflow-hidden"
            style={{ minHeight: "clamp(280px,32vh,360px)", padding: "clamp(28px,3vw,44px)", gap: 34, background: "#000" }}
          >
            <div className="relative z-[1] flex items-start justify-between">
              <span
                className="uppercase"
                style={{ fontFamily: MONO, color: "rgba(255,255,255,0.4)", fontSize: 11, letterSpacing: "0.18em", border: "1px solid rgba(255,255,255,0.12)", padding: "6px 10px" }}
              >
                {course.code}
              </span>
              <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.1em", color: "rgba(255,255,255,0.2)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="relative z-[1]">
              {(course as { quarter?: string }).quarter && (
                <p className="m-0 uppercase" style={{ fontFamily: MONO, color: (course as { quarter?: string }).quarter === "Autumn 2026" ? "#f97316" : "rgba(255,255,255,0.28)", fontSize: 11, letterSpacing: "0.2em", marginBottom: 10 }}>
                  {(course as { quarter?: string }).quarter}
                </p>
              )}
              <h3
                className="m-0 font-semibold"
                style={{ color: "#fff", fontSize: "clamp(22px,2.2vw,34px)", letterSpacing: "-0.02em", lineHeight: 1.08 }}
              >
                {course.title}
              </h3>
              {course.description && (
                <p style={{ margin: "13px 0 0", color: "rgba(255,255,255,0.4)", fontSize: 15, lineHeight: 1.65, maxWidth: "32ch" }}>
                  {course.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
