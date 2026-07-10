import { createReader } from "@keystatic/core/reader";
import config from "../../keystatic.config";

const reader = createReader(process.cwd(), config);

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
    <main className="mx-auto max-w-5xl px-6 py-10 text-[17px]">
      <a href="/" className="text-sm text-neutral-500 hover:text-neutral-100">{backLabel}</a>

      <h1 className="mt-6 text-5xl font-bold tracking-tight">{heading}<span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(to right, #2563EB, #3B82F6, #0EA5E9)" }}>.</span></h1>
      <p className="mt-4 max-w-2xl text-neutral-600 leading-8">
        {intro}
      </p>

      <div className="mt-12 divide-y divide-neutral-800">
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
  );
}
