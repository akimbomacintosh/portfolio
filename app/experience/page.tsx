import { createReader } from "@keystatic/core/reader";
import config from "../../keystatic.config";

const reader = createReader(process.cwd(), config);

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
    <main className="mx-auto max-w-5xl px-6 py-10 text-[17px]">
      <a href="/" className="text-sm text-neutral-500 hover:text-neutral-100">{backLabel}</a>

      <h1 className="mt-6 text-5xl font-bold tracking-tight">{heading}<span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(to right, #2563EB, #3B82F6, #0EA5E9)" }}>.</span></h1>
      <p className="mt-4 max-w-2xl text-neutral-600 leading-8">
        {intro}
      </p>

      <div className="mt-12 space-y-16">
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
  );
}
