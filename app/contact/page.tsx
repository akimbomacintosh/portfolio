import { createReader } from "@keystatic/core/reader";
import config from "../../keystatic.config";

const reader = createReader(process.cwd(), config);
const MONO = "ui-monospace,'SF Mono',SFMono-Regular,Menlo,monospace";
const GRAD = "linear-gradient(to right, #2563EB, #3B82F6, #0EA5E9)";

export default async function Contact() {
  const [data, site] = await Promise.all([
    reader.singletons.contact.read(),
    reader.singletons.site.read(),
  ]);
  const heading = data?.heading || "Contact";
  const intro = data?.intro || "The best ways to reach me.";
  const backLabel = site?.backLabel || "← Back";
  const contacts = (data?.methods ?? []).filter((c) => c.label) as {
    label: string;
    sublabel: string;
    value: string;
    href: string;
    buttonLabel: string;
  }[];

  return (
    <>
      <section className="relative flex flex-col justify-between" style={{ minHeight: "clamp(400px,65vh,680px)", backgroundImage: "url('/images/videography/bay-bridge.jpg')", backgroundSize: "cover", backgroundPosition: "center 40%", padding: "clamp(32px,5vh,60px) clamp(24px,5vw,80px)" }}>
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
      <div className="divide-y divide-neutral-800">
        {contacts.map((c) => {
          const buttonLabel =
            c.buttonLabel || (c.href.startsWith("mailto") ? "Send email" : "Visit");
          return (
            <div key={c.label} className="flex items-center justify-between gap-6 py-6">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-neutral-900 dark:text-neutral-100">{c.label}</p>
                  {c.sublabel && (
                    <span className={
                      c.sublabel === "Preferred"
                        ? "preferred-badge text-xs px-2 py-0.5"
                        : "text-xs text-neutral-500 border border-neutral-700 px-1.5 py-0.5"
                    }>
                      {c.sublabel === "University of Washington" ? (
                        <>
                          <span className="sm:hidden">UW</span>
                          <span className="hidden sm:inline">University of Washington</span>
                        </>
                      ) : c.sublabel}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-neutral-500">{c.value}</p>
              </div>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="shrink-0 border border-neutral-800 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-900 transition-colors"
              >
                {buttonLabel}
              </a>
            </div>
          );
        })}
      </div>
    </main>
    </>
  );
}
