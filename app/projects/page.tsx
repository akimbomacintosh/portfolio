export default function Projects() {
  const projects = [
    {
      title: "Project Title",
      date: "2024",
      description: "Placeholder",
      stack: ["Tech 1", "Tech 2"],
      image: null, // e.g. "/projects/project-name.jpg"
      pdf: null,   // e.g. "/projects/project-report.pdf"
      github: null,
      link: null,
    },
  ];

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 text-[17px]">
      <a href="/" className="text-sm text-neutral-500 hover:text-neutral-900">← Back</a>

      <h1 className="mt-6 text-4xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-4 max-w-2xl text-neutral-600 leading-8">
        Selected builds with context, results, and links.
      </p>

      <div className="mt-12 space-y-16">
        {projects.map((project) => (
          <article key={project.title} className="border-t border-neutral-200 pt-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">{project.title}</h2>
                <p className="mt-1 text-sm text-neutral-500">{project.date}</p>
              </div>
              <div className="flex gap-3">
                {project.github && (
                  <a href={project.github} className="text-sm text-neutral-500 hover:text-neutral-900 underline">
                    GitHub
                  </a>
                )}
                {project.link && (
                  <a href={project.link} className="text-sm text-neutral-500 hover:text-neutral-900 underline">
                    Live
                  </a>
                )}
              </div>
            </div>

            {project.stack.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="border border-neutral-200 px-2 py-0.5 text-xs text-neutral-600">
                    {tech}
                  </span>
                ))}
              </div>
            )}

            <p className="mt-4 max-w-3xl text-neutral-600 leading-8">{project.description}</p>

            {/* Image embed — drop image file in /public and update the src */}
            {project.image && (
              <div className="mt-8">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full max-w-2xl border border-neutral-200 object-cover"
                />
              </div>
            )}

            {/* PDF embed — drop PDF in /public and update the src */}
            {project.pdf && (
              <div className="mt-8">
                <iframe
                  src={project.pdf}
                  className="h-[800px] w-full border border-neutral-200"
                  title={`${project.title} PDF`}
                />
              </div>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}
