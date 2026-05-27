export default function Home() {
  const sections = [
    {
      title: "Coursework",
      desc: "Explore what I've accomplished to complete my degree.",
      href: "/coursework",
    },
    {
      title: "Projects",
      desc: "Completed, in-progress, and future projects. Personal and academic.",
      href: "/projects",
    },
    {
      title: "Experience",
      desc: "Learn where I've spent my time to grow my professional skills.",
      href: "/experience",
    },
    {
      title: "Music",
      desc: "Discover my music production journey.",
      href: "/music",
    },
    {
      title: "Videography",
      desc: "A glimpse into how I see the world. ",
      href: "/videography",
    },
    {
      title: "Downloads",
      desc: "Resume, transcripts, and useful documents for reference.",
      href: "/files",
    },
  ];

  return (
    <>
      {/* Full-screen white hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center bg-white">
        <div className="w-full px-[3vw] text-center">
          <h1
            className="whitespace-nowrap font-bold leading-none tracking-tight text-black"
            style={{ fontSize: "clamp(3.5rem, 15vw, 18rem)" }}
          >
            <span style={{ display: "inline-block", opacity: 0, animation: "word-from-left 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.05s forwards" }}>
              Joshua
            </span>
            {" "}
            <span style={{ display: "inline-block", opacity: 0, animation: "word-from-right 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards" }}>
              Hall
            </span>
            <span
              style={{
                display: "inline-block",
                marginLeft: "-0.03em",
                backgroundImage: "linear-gradient(to right, #2563EB, #3B82F6, #0EA5E9)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                opacity: 0,
                animation: "word-from-right 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.28s forwards",
              }}
            >
              .
            </span>
          </h1>

          {/* Subtitle — fades in after name completes */}
          <p
            className="mt-6 uppercase tracking-[0.3em] text-neutral-500 leading-relaxed"
            style={{ fontSize: "clamp(0.65rem, 1.3vw, 1rem)", opacity: 0, animation: "fade-in-sub 0.9s ease 1.1s forwards" }}
          >
            <span className="whitespace-nowrap">Electrical &amp; Computer Engineer</span>
            <span className="hidden sm:inline"> &nbsp;·&nbsp; </span>
            <br className="sm:hidden" />
            <span className="whitespace-nowrap">University of Washington</span>
          </p>
        </div>

        {/* Contact button — lower on screen, fades in last */}
        <div
          className="absolute bottom-24 text-center"
          style={{ opacity: 0, animation: "fade-in-sub 0.9s ease 1.55s forwards" }}
        >
          <a
            href="/contact"
            className="hero-contact inline-block px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
          >
            Contact Me
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-neutral-400"
          style={{ opacity: 0, animation: "fade-in-sub 0.9s ease 1.55s forwards" }}
        >
          <span>Scroll</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-4 w-4 animate-bounce"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </section>

      {/* Dark content */}
      <main className="mx-auto max-w-5xl px-6 text-[17px]">
        {/* About */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Welcome.
          </h2>
          <div className="mt-5 space-y-4 text-neutral-500 leading-8">
            <p>
              Welcome to my official landing page. This is the space for me to share my work on and off campus. Below, you can explore my passion in creativity and harnessing it within my engineering career. Whether it's garnering twenty thousand combined followers, tracking your en-route flight to SeaTac out of my bedroom, designing an electronic speed control, producing music, or building a website, I am eager to share my unique interests with you.
            </p>
          </div>
        </section>

        {/* Navigation Cards */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold tracking-tight text-white">Explore.</h2>
          <p className="mt-4 max-w-2xl text-neutral-500">
            See what I've been up to:
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((s) => (
              <a
                key={s.title}
                href={s.href}
                className="shimmer-box group rounded-none border border-neutral-800 p-6 transition-colors hover:border-neutral-700 hover:bg-neutral-900"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-medium text-neutral-100">{s.title}</h3>
                  <span className="text-neutral-500">→</span>
                </div>
                <p className="mt-2 text-base leading-7 text-neutral-500">{s.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Socials */}
        <section id="social" className="mt-16 pb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white">Social media.</h2>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              className="rounded-none border border-neutral-800 px-5 py-2.5 text-base font-medium text-neutral-100 transition-colors hover:bg-neutral-900"
              href="https://github.com/akimbomacintosh"
            >
              GitHub
            </a>
            <a
              className="rounded-none border border-neutral-800 px-5 py-2.5 text-base font-medium text-neutral-100 transition-colors hover:bg-neutral-900"
              href="https://www.linkedin.com/in/jswhall"
            >
              LinkedIn
            </a>
            <a
              className="rounded-none border border-neutral-800 px-5 py-2.5 text-base font-medium text-neutral-100 transition-colors hover:bg-neutral-900"
              href="https://www.instagram.com/jjoshuahall.vid/"
            >
              Instagram
            </a>
            <a
              className="rounded-none border border-neutral-800 px-5 py-2.5 text-base font-medium text-neutral-100 transition-colors hover:bg-neutral-900"
              href="https://www.tiktok.com/@joshuahall.vid?is_from_webapp=1&sender_device=pc"
            >
              TikTok
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
