# Working on this site

This is Jeya Vardhan's portfolio: an Astro site, deployed to GitHub Pages by
`.github/workflows/deploy.yml` on every push to `main`. Most requests will be
"add this project", "add this writing" or "move X up". Those are content
changes: edit Markdown, images and `src/site.ts` only.

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Once, after cloning |
| `npm run dev` | Local preview at http://localhost:4321/My-Portfolio/ |
| `npm run check` | Type-check and build. **Must pass before every commit.** |

## Where things live

| What | Where |
| --- | --- |
| A project | `src/content/projects/<slug>/` — one folder per project |
| Its text | `src/content/projects/<slug>/index.md` |
| Its screenshot | `src/content/projects/<slug>/cover.png` (from the project's live site if it has one) |
| Its diagram | `src/content/projects/<slug>/diagram.svg` (optional, animated, shown as "Fig. 1") |
| Its extra images | same folder, listed under `gallery:` |
| Writing | `src/content/writing/<slug>.md` |
| About page text | `src/content/about.md` |
| About photo | `src/assets/portrait.jpg` (replace the file, keep the name) |
| Inspiration wall | `src/assets/inspiration/` (any .jpg/.png/.webp; sorted by file name, Z to A) |
| Name, home statements, links, "Now" line, bench list | `src/site.ts` |
| Colours and fonts | `src/styles/global.css` |
| Templates to copy | `templates/project/`, `templates/writing.md` |

## Adding a project

1. Copy `templates/project/` to `src/content/projects/<slug>/`. The slug is
   lowercase-with-dashes and becomes `/projects/<slug>/`.
2. Fill the frontmatter in `index.md` (fields below). Delete the comments.
3. Cover image: if the project has a live site, take a 1440×900 screenshot of
   it and save it as `cover.png` in the folder. Otherwise use a real screenshot
   or photo from the repository. If there is no real picture, remove the
   `cover:` line; if the folder has a `diagram.svg`, that is shown instead.
   Never use made-up or generated mock-ups.
4. Write the body from Jeya's notes (see Voice). Keep the template's sections
   only where there is something real to say.
5. `npm run check`, then commit as `Add project: <title>` and push to `main`.

### Project fields

| Field | Required | Meaning |
| --- | --- | --- |
| `title` | yes | Short name, 1–4 words |
| `summary` | yes | One sentence. Shown under the title everywhere |
| `date` | yes | `YYYY-MM-DD`. Start or ship date |
| `side` | yes | `software`, `hardware` or `both` |
| `featured` | no | `true` shows it on the home page of its side (first 4 by `order`) |
| `order` | no | Position, lower first, across the whole site. Default 100 |
| `status` | no | `shipped` (default), `in progress`, `archived` |
| `tags` | no | Languages, boards, frameworks |
| `repo`, `demo` | no | Full URLs. `demo` is the project's live site |
| `cover` | no | `./cover.png` |
| `gallery` | no | `- { src: ./file.png, caption: "..." }` entries |
| `specs` | no | 3–5 `{ label, value }` facts. Only numbers Jeya gave you or the repo shows |
| `draft` | no | `true` hides it |

### Which side

- `software`: no physical build (shells, ML models, apps, XR, servers).
- `hardware`: mainly a physical build (robots, wearables, vehicles).
- `both`: real firmware or software **and** a real physical build, where both
  matter (e.g. STM32 telemetry).

The software side lists `software` + `both`. The hardware side lists
`hardware` + `both`. Neither side is the "main" one; never describe one as
smaller or secondary. When unsure, ask.

### Diagrams

`diagram.svg` files are hand-written animated SVG (SMIL). Use the classes
`dg-ln`, `dg-thin`, `dg-dash`, `dg-fc`, `dg-box`, `dg-t`, `dg-s`, `dg-m`,
`dg-e` and include the `<style>` block from an existing diagram so it also
renders as a plain image. Prefix every `id` with `u-` (e.g. `u-arr`); the site
makes them unique when the same diagram appears twice.

### Reordering

- "Move X to the top": give X an `order` lower than the current lowest on its
  side. Renumber others only if needed to keep the rest in the same order.
- "Feature X" / "take X off the home page": set `featured`.
- Only 4 featured projects show per side; if a fifth is featured, tell Jeya
  which one dropped off.

## Adding writing

1. Copy `templates/writing.md` to `src/content/writing/<slug>.md`.
2. Fill `title`, `summary`, `date`, `tags`.
3. Body from Jeya's text. Fix spelling and grammar; do not change the meaning
   or add claims. Use `##` headings, fenced code blocks with a language,
   tables where they help.
4. `npm run check`, commit as `Add writing: <title>`, push.

Writing opens in a window on the list pages and also has its own page, so it
must make sense on its own.

## Inspiration photos

Drop images into `src/assets/inspiration/`. Name them `YYYY-MM-DD-something.jpg`
so the newest appear first. Delete the `placeholder-*.jpg` files once there are
real ones. Commit as `Add inspiration`.

## Voice

- Write as Jeya, first person, plain words, short sentences, real numbers.
- Don't mention a university, degree or year of study anywhere.
- Never use: verified, inspectable, first principles, production-grade,
  cutting-edge, seamless, robust, leverage, zero-latency, passionate,
  "engineered" as a boast.
- No invented facts. Numbers, dates, test counts and claims come from Jeya's
  notes or the repository. If something is missing, ask.
- Summaries are one sentence.

## Design rules (for anyone changing the look)

- Bone `#e8e6e0` paper, black `#0b0b0b` ink, one indigo `#1925aa`. The
  hardware side inverts paper and ink. No other colours.
- Inter Tight for text and big headings, IBM Plex Mono for small uppercase
  labels, Instrument Serif only for the name on the home page.
- Square corners, hairline rules, no shadows on page elements.
- Buttons are the white label cell with the indigo `/` square (`Btn.astro`).

## Don't

- Don't change components, layouts or styles when the request is content only.
- Don't add dependencies for content changes.
- Don't rewrite git history or force-push.
