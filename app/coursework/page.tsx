export default function Coursework() {
  const courses = [
    {
      code: "EE 233",
      title: "Circuit Theory",
      description: "Placeholder",
      image: null, // e.g. "/coursework/ee-xxx-lab.jpg"
      pdf: null,   // e.g. "/coursework/ee-xxx-report.pdf"
    },
    {
      code: "CSE 123",
      title: "Java III",
      description: "Placeholder",
      image: null,
      pdf: null,
    },
    {
      code: "EE 331",
      title: "Devices & Circuits I",
      description: "Currently taking. Check back soon for updates on what I've learned this quarter.",
      image: null,
      pdf: null,
    },
    {
      code: "EE 271",
      title: "Digital Circuits & Systems",
      description: "Currently taking. Check back soon for updates on what I've learned this quarter.",
      image: null,
      pdf: null,
    },
  ];

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 text-[17px]">
      <a href="/" className="text-sm text-neutral-500 hover:text-neutral-900">← Back</a>

      <h1 className="mt-6 text-4xl font-semibold tracking-tight">Coursework</h1>
      <p className="mt-4 max-w-2xl text-neutral-600 leading-8">
        Learn about the courses I've taken that go beyond the fundamentals. The coursework that I have enjoyed the most - and challenged me more than others - is the basics of circuit theory with prof. Hameed. Applying lapace transforms to to 1st and 2nd order circuits has opened the door into 
        audio design as we participate in labs designing multiband filters. 
      </p>

      <div className="mt-12 space-y-16">
        {courses.map((course) => (
          <article key={course.code} className="border-t border-neutral-200 pt-10">
            <p className="text-sm text-neutral-500">{course.code}</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">{course.title}</h2>
            <p className="mt-4 max-w-3xl text-neutral-600 leading-8">{course.description}</p>

            {course.image && (
              <div className="mt-8">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full max-w-2xl border border-neutral-200 object-cover"
                />
              </div>
            )}

            {course.pdf && (
              <div className="mt-8">
                <iframe
                  src={course.pdf}
                  className="h-[800px] w-full border border-neutral-200"
                  title={`${course.title} PDF`}
                />
              </div>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}
