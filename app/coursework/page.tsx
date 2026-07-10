import { createReader } from "@keystatic/core/reader";
import config from "../../keystatic.config";

const reader = createReader(process.cwd(), config);

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
    <main className="mx-auto max-w-5xl px-6 py-10 text-[17px]">
      <a href="/" className="text-sm text-neutral-500 hover:text-neutral-100">{backLabel}</a>

      <h1 className="mt-6 text-5xl font-bold tracking-tight">{heading}<span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(to right, #2563EB, #3B82F6, #0EA5E9)" }}>.</span></h1>
      <p className="mt-4 max-w-2xl text-neutral-600 leading-8">
        {description}
      </p>

      <div className="mt-12 space-y-16">
        {courses.map((course) => (
          <article key={course.code} className="border-t border-neutral-700 pt-10">
            <p className="text-sm text-neutral-500">{course.code}</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-white">{course.title}</h2>
            <p className="mt-4 max-w-3xl text-neutral-600 leading-8">{course.description}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
