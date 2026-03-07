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
      title: "Videography/Photography",
      desc: "A glimpse into how I see the world. ",
      href: "/videography",
    },
    {
      title: "Relevant Files",
      desc: "Resume, transcripts, and useful documents for reference.",
      href: "/files",
    },
  ];

  return (
    <main className="mx-auto max-w-5xl px-6 text-[17px]">
      {/* Hero */}
      <section className="relative left-1/2 right-1/2 w-screen -mx-[50vw] bg-neutral-100/70 py-14 dark:bg-neutral-900/30">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-10 sm:grid-cols-[1fr_auto] sm:items-center">
  <div className="space-y-6">
        <p className="text-base text-neutral-500">A Personal Portfolio</p>

        <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
          Joshua Hall
        </h1>
        <div className="flex items-center gap-2 text-base text-neutral-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-4.556 0-8.25 3.694-8.25 8.25 0 5.022 4.405 10.233 7.013 12.922a1.75 1.75 0 0 0 2.474 0c2.608-2.689 7.013-7.9 7.013-12.922 0-4.556-3.694-8.25-8.25-8.25Zm0 11.25a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
              clipRule="evenodd"
            />
          </svg>
          <span>Seattle, WA</span>
        </div>

        <p className="max-w-2xl text-xl leading-8 text-neutral-600">
          Electrical &amp; Computer Engineering student at the University of
          Washington pursuing interests in audio hardware and aircraft technology.
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href="/contact"
            className="rounded-xl border border-neutral-200 px-5 py-2.5 text-base font-medium text-neutral-900 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-900"
          >
            Contact Me
          </a>
        </div>
          </div>

          <div className="shrink-0 self-center">
            <img
              src="/me.jpg"
              alt="Photo of Joshua Hall"
              className="h-40 w-40 rounded-full object-cover ring-1 ring-neutral-200 dark:ring-neutral-800 sm:h-44 sm:w-44"
            />
          </div>
        </div>
      </div>
    </section>

      {/* About */}
      <section className="mt-16">
        <h2 className="text-3xl font-semibold tracking-tight">Welcome.</h2>
        <div className="mt-5 max-w-3xl space-y-4 text-neutral-600 leading-8">
          <p>
            Welcome to my offical landing page. This is space for me to share my work on and off campus. Below, you can explore my passion in creativity and harnessing it within my engineering career. Whether it's garnering twenty thousand combined followers, tracking your en-route flight to SeaTac out of my bedroom, designing an electronic speed control, producing music, or building a website, I am eager to share my interests with you. 
          </p>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="mt-16">
        <h2 className="text-3xl font-semibold tracking-tight">Explore.</h2>
        <p className="mt-4 max-w-2xl text-neutral-600">
          See what I’ve been up to:
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => (
            <a
              key={s.title}
              href={s.href}
              className="shimmer-box group rounded-none border border-neutral-200 p-6 transition-colors hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:border-neutral-700 dark:hover:bg-neutral-900"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">{s.title}</h3>
                <span className="text-neutral-400 transition-colors group-hover:text-neutral-600 dark:group-hover:text-neutral-300">
                  →
                </span>
              </div>
              <p className="mt-2 text-base leading-7 text-neutral-600 dark:text-neutral-400">{s.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Socials */}
      <section id="social" className="mt-16">
        <h2 className="text-3xl font-semibold tracking-tight">Social media.</h2>


        <div className="mt-6 flex flex-wrap gap-3">
          <a
            className="rounded-none border border-neutral-200 px-5 py-2.5 text-base font-medium text-neutral-900 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-900"
            href="#"
          >
            GitHub
          </a>
          <a
            className="rounded-none border border-neutral-200 px-5 py-2.5 text-base font-medium text-neutral-900 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-900"
            href="#"
          >
            LinkedIn
          </a>
          <a
            className="rounded-none border border-neutral-200 px-5 py-2.5 text-base font-medium text-neutral-900 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-900"
            href="https://www.instagram.com/jjoshuahall.vid/"
          >
            Instagram
          </a>
          <a
            className="rounded-none border border-neutral-200 px-5 py-2.5 text-base font-medium text-neutral-900 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-900"
            href="https://www.tiktok.com/@joshuahall.vid?is_from_webapp=1&sender_device=pc"
          >
            TikTok
          </a>
        </div>

      </section>
    </main>
  );
}