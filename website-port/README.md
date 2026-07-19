# Signal redesign → applied to your Next.js source

These files replace the matching ones in your repo. Paths here mirror your repo
exactly, so you can drag each file to the same location in VS Code and overwrite.

## What to copy

| From this package | Into your repo | Change |
|---|---|---|
| `app/page.tsx` | `app/page.tsx` | **Replace.** Home rebuilt: white animated hero → cinematic "Explore." band → numbered icon grid → Welcome/About with photo + stats → Connect CTA with socials. |
| `app/layout.tsx` | `app/layout.tsx` | **Replace.** Swaps the plain text footer for the new `<Footer/>` component. |
| `app/components/NavBar.tsx` | `app/components/NavBar.tsx` | **Replace.** Gradient "signal" dot brand, 56px bar, hide-until-scrolled on home, refined hover states. |
| `app/components/Footer.tsx` | `app/components/Footer.tsx` | **New file.** Rich footer (brand + blurb + socials + link grid + coords). |
| `app/components/PageWrapper.tsx` | `app/components/PageWrapper.tsx` | **Replace.** Top padding bumped to match the new 56px nav (`pt-14`). |
| `app/videography/page.tsx` | `app/videography/page.tsx` | **Replace.** Editorial hero + archive count, responsive masonry gallery, IG/TikTok cards, films section. |
| `app/globals.css` | `app/globals.css` | **Replace.** Your file + a responsive `.vg-masonry` rule for the gallery. |
| `content/videography.json` | `content/videography.json` | **Optional.** Seeds the gallery with 15 captioned frames so it ships full. Still fully editable in Keystatic. |
| `public/images/clouds.jpg` | `public/images/clouds.jpg` | **New.** Background for the home "Explore." band. |
| `public/images/videography/*.jpg` | `public/images/videography/` | **New.** The 15 seeded gallery frames. |

## Keystatic — nothing to change
All pages still read from Keystatic exactly as before. Fields used:
- **Home:** `firstName`, `lastName`, `subtitleLine1/2`, `scrollLabel`, `exploreHeading`,
  `exploreIntro`, `aboutHeading`, `bioText`, `cards[]`, plus `site.socials`.
- **Videography:** `heading`, `intro`, `featuredVideos[]` (thumbnails = gallery frames),
  `methodsHeading/Text`, `works[]`, plus `site.socials`.
- **Layout/Nav/Footer:** `site.brandName`, `navLinks[]`, `contactLabel`, `socials[]`, `footerText`.

## Two things that are intentionally in-code (not CMS)
1. **Home "Welcome" stats** (Panasonic / 8 yrs / VLSI) live in the `STATS` array at the top
   of `app/page.tsx`. Edit there. Say the word and I'll wire them into Keystatic instead.
2. **The Explore-band background** is the fixed `clouds.jpg`. Swap the file to change it.

## Not touched (already Signal-consistent)
`coursework`, `experience`, `music`, `contact`, `files`, and `projects` already use the
Signal tokens (gradient period, square borders, neutral grays). They aren't part of the DC
redesign set, so I left them as-is. I can give them the same editorial hero treatment next.
