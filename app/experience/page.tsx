export default function Experience() {
  const roles = [
    {
      company: "Placeholder",
      role: "Job Title",
      dates: "dates",
      location: "Seattle, WA",
      bullets: [
        "Placeholder",
      ],
      image: null, // e.g. "/experience/company-logo.jpg"
    },
  ];

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 text-[17px]">
      <a href="/" className="text-sm text-neutral-500 hover:text-neutral-900">← Back</a>

      <h1 className="mt-6 text-4xl font-semibold tracking-tight">Experience</h1>
      <p className="mt-4 max-w-2xl text-neutral-600 leading-8">
        Internships, roles, and the impact I had.
      </p>

      <div className="mt-12 space-y-16">
        {roles.map((role) => (
          <article key={`${role.company}-${role.role}`} className="border-t border-neutral-200 pt-10">
            <div className="sm:flex sm:items-start sm:justify-between sm:gap-6">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">{role.company}</h2>
                <p className="mt-1 text-lg text-neutral-700">{role.role}</p>
                <p className="mt-1 text-sm text-neutral-500">{role.dates} · {role.location}</p>
              </div>

              {/* Company logo — drop image in /public and update the src */}
              {role.image && (
                <img
                  src={role.image}
                  alt={role.company}
                  className="mt-4 h-14 w-auto object-contain sm:mt-0"
                />
              )}
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
