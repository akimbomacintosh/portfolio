export default function Contact() {
  const contacts = [
    {
      label: "Personal Email",
      sublabel: "Preferred",
      value: "jh.accts@comcast.net",
      href: "mailto:jh.accts@comcast.net",
    },
    {
      label: "School Email",
      sublabel: "University of Washington",
      value: "jhall05@uw.edu",
      href: "mailto:jhall05@uw.edu",
    },
    {
      label: "LinkedIn",
      sublabel: null,
      value: "linkedin.com/in/jswhall",
      href: "https://www.linkedin.com/in/jswhall/",
    },
    {
      label: "Instagram",
      sublabel: null,
      value: "@jjoshuahall.vid",
      href: "https://www.instagram.com/jjoshuahall.vid/",
    },
  ];

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 text-[17px]">
      <a href="/" className="text-sm text-neutral-500 hover:text-neutral-900">← Back</a>

      <h1 className="mt-6 text-4xl font-semibold tracking-tight">Contact.</h1>
      <p className="mt-4 max-w-2xl text-neutral-600 leading-8">
        The best ways to reach me.
      </p>

      <div className="mt-12 divide-y divide-neutral-200 dark:divide-neutral-800">
        {contacts.map((c) => (
          <div key={c.label} className="flex items-center justify-between gap-6 py-6">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium text-neutral-900 dark:text-neutral-100">{c.label}</p>
                {c.sublabel && (
                  <span className="text-xs text-neutral-500 border border-neutral-200 dark:border-neutral-700 px-1.5 py-0.5">
                    {c.sublabel}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-neutral-500">{c.value}</p>
            </div>
            <a
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="shrink-0 border border-neutral-200 dark:border-neutral-800 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
            >
              {c.href.startsWith("mailto") ? "Send email" : "Visit"}
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
