import { config, fields, collection, singleton } from "@keystatic/core";

// Shared cheat-sheet shown in the admin under every long-form text field, so the
// custom syntax is documented right where you type it.
const FORMATTING_HELP =
  "Formatting — blank line = new paragraph · **bold** · *italic* · bare https:// URLs auto-link · " +
  'bullet list: start lines with "- " · quote: indent lines by 2 spaces · ' +
  "inline image: [[image:/images/projects/<folder>/photo.jpg:right:Caption:medium]] " +
  "(side = left|right, size = small|medium|half|full) · " +
  "equation: [[eq: \\frac{c}{f} = 0.275\\text{ m}]]";

export default config({
  storage: { kind: "local" },

  ui: {
    navigation: {
      Site: ["site", "notifications"],
      Pages: ["home", "coursework", "experience", "videography", "files", "contact"],
      Projects: ["projectsPage", "projects", "labProjects"],
      Music: ["music", "musicProduction", "musicLiveSound"],
    },
  },

  collections: {
    projects: collection({
      label: "Projects — Personal",
      path: "content/projects/*/",
      format: { data: "json" },
      slugField: "title",
      columns: ["title", "order"],
      entryLayout: "form",
      schema: {
        title: fields.slug({
          name: { label: "Project Title" },
          slug: {
            label: "URL Anchor / Folder",
            description:
              'Drives the #jump-link and the content folder name. URL-safe, e.g. "ads-b-antenna". Avoid changing it later — it breaks saved links.',
          },
        }),
        draft: fields.checkbox({
          label: "Draft — hide from site",
          description:
            "When on, this project is hidden from the public Projects page so you can build it up across sessions. Turn off to publish.",
          defaultValue: false,
        }),
        order: fields.integer({
          label: "Sort Order",
          description:
            "Lower numbers appear higher on the page. New projects default to 100 (the bottom) — lower the number to move a project up.",
          defaultValue: 100,
        }),
        tagline: fields.text({
          label: "Tagline",
          multiline: true,
          description: "One- or two-sentence summary shown under the title.",
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Skill Tags",
          description: "3–5 tags. Drag to reorder.",
          itemLabel: (props) => props.value ?? "",
        }),
        links: fields.array(
          fields.object({
            label: fields.text({ label: "Label", description: 'e.g. "GitHub", "Live demo", "Writeup"' }),
            url: fields.text({ label: "URL", description: "https://…" }),
          }),
          {
            label: "Links",
            description: "Optional buttons shown in the project header.",
            itemLabel: (props) => props.fields.label.value || props.fields.url.value || "Link",
          }
        ),
        isGroupProject: fields.checkbox({
          label: "Group project?",
          description: 'When on, the "My Role" section is shown on the page.',
        }),
        dateStart: fields.text({ label: "Start Date", description: 'e.g. "Apr 2025"' }),
        dateEnd: fields.text({ label: "End Date", description: 'e.g. "Present"' }),

        overview: fields.text({
          label: "Overview",
          multiline: true,
          description: FORMATTING_HELP,
        }),
        myRole: fields.text({
          label: "My Role",
          multiline: true,
          description: 'Shown only when "Group project?" is on. ' + FORMATTING_HELP,
        }),
        howItWorks: fields.text({
          label: "How It Works",
          multiline: true,
          description: FORMATTING_HELP,
        }),
        result: fields.text({
          label: "Result",
          multiline: true,
          description: FORMATTING_HELP,
        }),

        updates: fields.array(
          fields.object({
            date: fields.text({ label: "Date", description: 'e.g. "May 2026"' }),
            text: fields.text({ label: "Update", multiline: true }),
          }),
          {
            label: "Updates",
            description: "A running log. Newest is shown at the top of the page automatically.",
            itemLabel: (props) =>
              `${props.fields.date.value || "—"} · ${(props.fields.text.value ?? "").slice(0, 48)}`,
          }
        ),

        images: fields.array(
          fields.image({
            label: "Photo",
            directory: "public/images/projects",
            publicPath: "/images/projects/",
          }),
          {
            label: "Photos",
            description: "Drag-and-drop to upload. These fill the gallery at the top of the project.",
            itemLabel: (props) => props.value?.filename ?? "Photo",
          }
        ),

        videos: fields.array(
          fields.file({
            label: "Video",
            directory: "public/images/projects",
            publicPath: "/images/projects/",
          }),
          {
            label: "Videos",
            description: "Optional. Drag-and-drop an .mp4. Appears alongside the photos.",
            itemLabel: (props) => props.value?.filename ?? "Video",
          }
        ),

        notes: fields.text({
          label: "Private Notes",
          multiline: true,
          description: "Scratchpad for ideas / TODOs about this project. Never shown on the site.",
        }),
      },
    }),

    labProjects: collection({
      label: "Projects — Lab Finals",
      path: "content/lab-projects/*/",
      format: { data: "json" },
      slugField: "title",
      columns: ["title", "order"],
      entryLayout: "form",
      schema: {
        title: fields.slug({
          name: { label: "Project Title" },
          slug: { label: "URL Anchor", description: 'URL-safe, e.g. "line-following-robot".' },
        }),
        draft: fields.checkbox({
          label: "Draft — hide from site",
          description: "When on, this lab project is hidden from the public Projects page.",
          defaultValue: false,
        }),
        order: fields.integer({
          label: "Sort Order",
          description: "Lower numbers appear first. New entries default to 100 (the bottom).",
          defaultValue: 100,
        }),
        courseCode: fields.text({ label: "Course Code", description: 'e.g. "EE 201"' }),
        description: fields.text({ label: "Description", multiline: true }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Skill Tags",
          itemLabel: (props) => props.value ?? "",
        }),
        dateEnd: fields.text({ label: "Completion Date", description: 'e.g. "Dec 2025"' }),
        images: fields.array(
          fields.image({
            label: "Photo",
            directory: "public/images/projects",
            publicPath: "/images/projects/",
          }),
          {
            label: "Photos",
            description: "Drag-and-drop to upload.",
            itemLabel: (props) => props.value?.filename ?? "Photo",
          }
        ),

        notes: fields.text({
          label: "Private Notes",
          multiline: true,
          description: "Scratchpad — never shown on the site.",
        }),
      },
    }),
  },

  singletons: {
    home: singleton({
      label: "Home Page",
      path: "content/home",
      format: { data: "json" },
      schema: {
        firstName: fields.text({ label: "Hero — First Name", description: 'Big name, first word. e.g. "Joshua"' }),
        lastName: fields.text({ label: "Hero — Last Name", description: 'Big name, second word. e.g. "Hall"' }),
        subtitleLine1: fields.text({ label: "Hero — Subtitle (left)", description: 'e.g. "Electrical & Computer Engineer"' }),
        subtitleLine2: fields.text({ label: "Hero — Subtitle (right)", description: 'e.g. "University of Washington"' }),
        heroButton: fields.text({ label: "Hero — Button Text", description: 'e.g. "Contact Me"' }),
        scrollLabel: fields.text({ label: "Hero — Scroll Hint", description: 'e.g. "Scroll"' }),

        aboutHeading: fields.text({ label: "About — Heading", description: 'e.g. "Welcome."' }),
        bioText: fields.text({
          label: "About — Bio Paragraph",
          multiline: true,
          description: 'The welcome paragraph. If it ends with the word "connect.", that word auto-links to /contact.',
        }),

        exploreHeading: fields.text({ label: "Explore — Heading", description: 'e.g. "Explore."' }),
        exploreIntro: fields.text({ label: "Explore — Intro line", description: 'e.g. "See what I\'ve been up to:"' }),
        cards: fields.array(
          fields.object({
            title: fields.text({ label: "Card Title" }),
            desc: fields.text({ label: "Card Description", multiline: true }),
            href: fields.text({ label: "Link", description: 'e.g. "/projects"' }),
          }),
          {
            label: "Explore Cards",
            description: "The navigation cards in the Explore grid. Drag to reorder.",
            itemLabel: (props) => props.fields.title.value || "Card",
          }
        ),

        socialHeading: fields.text({ label: "Social — Heading", description: 'e.g. "Social media."' }),
      },
    }),

    coursework: singleton({
      label: "Coursework",
      path: "content/coursework",
      format: { data: "json" },
      schema: {
        heading: fields.text({ label: "Page Heading", description: 'e.g. "Coursework"' }),
        description: fields.text({
          label: "Page Description",
          multiline: true,
        }),
        courses: fields.array(
          fields.object({
            code: fields.text({ label: "Course Code", description: "e.g. EE 233" }),
            title: fields.text({ label: "Course Title" }),
            quarter: fields.text({ label: "Quarter", description: 'e.g. "Winter 2026"' }),
            description: fields.text({ label: "Description", multiline: true }),
          }),
          {
            label: "Courses",
            description: "Drag to reorder. Add new courses as you take them.",
            itemLabel: (props) =>
              `${props.fields.code.value} — ${props.fields.title.value}`,
          }
        ),
      },
    }),

    experience: singleton({
      label: "Experience",
      path: "content/experience",
      format: { data: "json" },
      schema: {
        heading: fields.text({ label: "Page Heading", description: 'e.g. "Experience"' }),
        intro: fields.text({ label: "Intro line", multiline: true, description: 'e.g. "Internships, roles, and the impact I had."' }),
        roles: fields.array(
          fields.object({
            company: fields.text({ label: "Company" }),
            role: fields.text({ label: "Job Title" }),
            dates: fields.text({ label: "Date Range", description: 'e.g. "Jun 2024 — Aug 2024"' }),
            location: fields.text({ label: "Location" }),
            bullets: fields.array(
              fields.text({ label: "Bullet Point", multiline: true }),
              {
                label: "Bullet Points",
                itemLabel: (props) => (props.value ?? "").slice(0, 60),
              }
            ),
          }),
          {
            label: "Roles",
            description: "Most recent first.",
            itemLabel: (props) =>
              `${props.fields.company.value} — ${props.fields.role.value}`,
          }
        ),
      },
    }),

    videography: singleton({
      label: "Videography",
      path: "content/videography",
      format: { data: "json" },
      schema: {
        heading: fields.text({ label: "Page Heading", description: 'e.g. "Videography / Photography"' }),
        intro: fields.text({ label: "Intro line", multiline: true, description: 'e.g. "Edits, shoots, and visual storytelling."' }),
        instagramSubtext: fields.text({ label: "Instagram — Subtext", description: "Short line shown under the Instagram heading." }),
        tiktokSubtext: fields.text({ label: "TikTok — Subtext", description: "Short line shown under the Videos heading." }),
        featuredVideos: fields.array(
          fields.object({
            title: fields.text({ label: "Caption (optional)" }),
            viewCount: fields.text({ label: "View Count (optional)", description: 'e.g. "1.4M"' }),
            thumbnail: fields.image({
              label: "Thumbnail",
              directory: "public/images/videography",
              publicPath: "/images/videography/",
              description: "Upload a screenshot of your TikTok video",
            }),
            link: fields.text({
              label: "Link to Video",
              description: "Full TikTok video URL",
            }),
          }),
          {
            label: "TikTok Thumbnails",
            description: "Upload screenshot thumbnails of your TikTok videos. Each becomes a clickable card.",
            itemLabel: (props) => props.fields.title.value || "Thumbnail",
          }
        ),
        methodsHeading: fields.text({ label: "Process — Heading", description: 'e.g. "My Process."' }),
        methodsText: fields.text({ label: "Process — Body", multiline: true, description: "How you approach your videography work — gear, style, editing." }),
        works: fields.array(
          fields.object({
            title: fields.text({ label: "Project Title" }),
            date: fields.text({ label: "Year", description: 'e.g. "2024"' }),
            description: fields.text({ label: "Description", multiline: true }),
            videoUrl: fields.text({
              label: "Video Embed URL",
              description: "YouTube/Vimeo embed URL — leave blank if none",
            }),
          }),
          {
            label: "Other Work",
            itemLabel: (props) => props.fields.title.value ?? "Untitled",
          }
        ),
      },
    }),

    musicProduction: singleton({
      label: "Music — Production",
      path: "content/music-production",
      format: { data: "json" },
      schema: {
        heading: fields.text({ label: "Section Heading" }),
        paragraphs: fields.array(
          fields.text({ label: "Paragraph", multiline: true }),
          {
            label: "Paragraphs",
            itemLabel: (props) => (props.value ?? "").slice(0, 80),
          }
        ),
        screenshots: fields.array(
          fields.image({
            label: "Screenshot",
            directory: "public/music/production",
            publicPath: "/music/production/",
          }),
          { label: "Screenshots (full-bleed, 16:7 ratio works best)" }
        ),
      },
    }),

    musicLiveSound: singleton({
      label: "Music — Live Sound",
      path: "content/music-live-sound",
      format: { data: "json" },
      schema: {
        heading: fields.text({ label: "Section Heading" }),
        paragraphs: fields.array(
          fields.text({ label: "Paragraph", multiline: true }),
          {
            label: "Paragraphs",
            itemLabel: (props) => (props.value ?? "").slice(0, 80),
          }
        ),
        photos: fields.array(
          fields.image({
            label: "Photo",
            directory: "public/music/live-sound",
            publicPath: "/music/live-sound/",
          }),
          { label: "Photos (full-bleed, 16:7 ratio works best)" }
        ),
      },
    }),

    site: singleton({
      label: "Site — Global (nav, brand, footer)",
      path: "content/site",
      format: { data: "json" },
      schema: {
        brandName: fields.text({ label: "Brand / Name", description: "Shown in the nav bar and footer." }),
        metaTitle: fields.text({ label: "Browser Tab Title", description: "The title in the browser tab and search results." }),
        metaDescription: fields.text({
          label: "Meta Description",
          multiline: true,
          description: "Short description for search engines and link previews.",
        }),
        backLabel: fields.text({ label: "Back-link Text", description: 'Link at the top of inner pages. e.g. "← Back"' }),
        contactLabel: fields.text({ label: "Nav — Contact Button", description: 'e.g. "Contact"' }),
        navLinks: fields.array(
          fields.object({
            label: fields.text({ label: "Label" }),
            href: fields.text({ label: "Link", description: 'e.g. "/projects"' }),
          }),
          {
            label: "Nav Links",
            description: "The top navigation menu. Drag to reorder.",
            itemLabel: (props) => `${props.fields.label.value || "Link"} → ${props.fields.href.value || ""}`,
          }
        ),
        socials: fields.array(
          fields.object({
            label: fields.text({ label: "Label", description: 'e.g. "GitHub"' }),
            url: fields.text({ label: "URL" }),
          }),
          {
            label: "Social Links",
            description: "Shown in the Social section on the home page.",
            itemLabel: (props) => props.fields.label.value || "Social",
          }
        ),
        footerText: fields.text({
          label: "Footer Text",
          description: 'Use {year} for the current year. e.g. "© {year} Joshua Hall"',
        }),
      },
    }),

    notifications: singleton({
      label: "Notifications / Banners",
      path: "content/notifications",
      format: { data: "json" },
      schema: {
        banners: fields.array(
          fields.object({
            message: fields.text({ label: "Message", multiline: true }),
            style: fields.select({
              label: "Style",
              options: [
                { label: "Info (blue)", value: "info" },
                { label: "Success (green)", value: "success" },
                { label: "Warning (amber)", value: "warning" },
                { label: "Announcement (gradient)", value: "announce" },
              ],
              defaultValue: "info",
            }),
            linkLabel: fields.text({ label: "Link Text", description: "Optional button label. Leave blank for no button." }),
            linkUrl: fields.text({ label: "Link URL", description: "Optional. /page or https://…" }),
            active: fields.checkbox({ label: "Show this banner", defaultValue: true }),
            dismissible: fields.checkbox({ label: "Let visitors dismiss it", defaultValue: true }),
          }),
          {
            label: "Banners",
            description:
              "Site-wide banners shown at the top of every page. Newest first. Turn off “Show” to hide one without deleting it.",
            itemLabel: (props) =>
              `${props.fields.active.value ? "● " : "○ "}${(props.fields.message.value ?? "").slice(0, 50) || "Banner"}`,
          }
        ),
      },
    }),

    files: singleton({
      label: "Downloads Page",
      path: "content/files",
      format: { data: "json" },
      schema: {
        heading: fields.text({ label: "Page Heading", description: 'e.g. "Downloads"' }),
        intro: fields.text({ label: "Intro line", multiline: true }),
        documents: fields.array(
          fields.object({
            title: fields.text({ label: "Title", description: 'e.g. "Resume"' }),
            note: fields.text({ label: "Note", description: 'e.g. "Current resume — updated 2026"' }),
            file: fields.file({ label: "File", directory: "public/files", publicPath: "/files/" }),
          }),
          {
            label: "Documents",
            description: "Downloadable files. Drag-and-drop to upload a PDF or other document.",
            itemLabel: (props) => props.fields.title.value || "Document",
          }
        ),
      },
    }),

    contact: singleton({
      label: "Contact Page",
      path: "content/contact",
      format: { data: "json" },
      schema: {
        heading: fields.text({ label: "Page Heading", description: 'e.g. "Contact"' }),
        intro: fields.text({ label: "Intro line", multiline: true }),
        methods: fields.array(
          fields.object({
            label: fields.text({ label: "Label", description: 'e.g. "Personal Email"' }),
            sublabel: fields.text({ label: "Badge", description: 'Small tag, optional. e.g. "Preferred"' }),
            value: fields.text({ label: "Display Value", description: 'Text shown, e.g. "name@gmail.com"' }),
            href: fields.text({ label: "Link", description: "mailto:… or https://…" }),
            buttonLabel: fields.text({ label: "Button Text", description: 'e.g. "Send email" or "Visit". Leave blank to auto-pick.' }),
          }),
          {
            label: "Contact Methods",
            itemLabel: (props) => props.fields.label.value || "Method",
          }
        ),
      },
    }),

    music: singleton({
      label: "Music — Page & Releases",
      path: "content/music",
      format: { data: "json" },
      schema: {
        heading: fields.text({ label: "Page Heading", description: 'e.g. "Music"' }),
        intro: fields.text({ label: "Intro line", multiline: true }),
        releasesLabel: fields.text({ label: "Releases — Section Label" }),
        releases: fields.array(
          fields.object({
            title: fields.text({ label: "Track Title" }),
            spotifyId: fields.text({ label: "Spotify Track ID" }),
            appleMusicAlbumId: fields.text({ label: "Apple Music Album ID" }),
            appleMusicTrackId: fields.text({ label: "Apple Music Track ID" }),
            appleMusicSlug: fields.text({ label: "Apple Music Slug" }),
          }),
          {
            label: "Releases",
            description: "Spotify + Apple Music embeds shown at the top of the Music page.",
            itemLabel: (props) => props.fields.title.value || "Release",
          }
        ),
        productionLabel: fields.text({ label: "Production — Eyebrow Label" }),
        liveSoundLabel: fields.text({ label: "Live Sound — Eyebrow Label" }),
        emptyState: fields.text({
          label: "Empty Media Placeholder",
          description: "Shown where screenshots/photos go when none are added yet.",
        }),
      },
    }),

    projectsPage: singleton({
      label: "Projects — Page Labels",
      path: "content/projects-page",
      format: { data: "json" },
      schema: {
        heading: fields.text({ label: "Page Heading", description: 'e.g. "Projects"' }),
        jumpToLabel: fields.text({ label: '"Jump to" Label' }),
        labToggleLabel: fields.text({ label: "Lab Projects — Toggle Label" }),
        labSectionTitle: fields.text({ label: "Lab Projects — Section Divider" }),
        overviewLabel: fields.text({ label: "Section Label — Overview" }),
        myRoleLabel: fields.text({ label: "Section Label — My Role" }),
        howItWorksLabel: fields.text({ label: "Section Label — How It Works" }),
        resultLabel: fields.text({ label: "Section Label — Result" }),
        updatesLabel: fields.text({ label: "Section Label — Updates" }),
      },
    }),
  },
});
