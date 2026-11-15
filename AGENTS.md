# Working on this site

This is Jeya Vardhan's portfolio: an Astro site, deployed to GitHub Pages by
`.github/workflows/deploy.yml` on every push to `main`. Most requests will be
"add this project", "add this writing" or "move X up". Those are content
changes: edit Markdown and `src/site.ts` only.

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Once, after cloning |
| `npm run dev` | Local preview at http://localhost:4321/My-Portfolio/ |
| `npm run check` | Type-check and build. **Must pass before every commit.** |

## Where things live

| What | Where |
| --- | --- |
| Projects | `src/content/projects/<slug>.md` |
| Writing | `src/content/writing/<slug>.md` |
| Project screenshots and photos | `src/assets/projects/` |
| About page text | `src/content/about.md` |
| About photo | `src/assets/portrait.jpg` (replace the file, keep the name) |
| Inspiration wall | `src/assets/inspiration/` (any .jpg/.png/.webp; sorted by file name, Z to A) |
| Name, home intros, links, "Now" line, bench list | `src/site.ts` |
| Colours and fonts | `src/styles/global.css` |
| Templates to copy | `templates/project.md`, `templates/writing.md` |

## Adding a project

1. Copy `templates/project.md` to `src/content/projects/<slug>.md`. The slug is
   lowercase-with-dashes and becomes `/projects/<slug>/`.
2. Fill the frontmatter (fields below). Delete the template's comments.
3. If there is an image, put it in `src/assets/projects/` and set
   `cover: ../../assets/projects/<file>`.
4. Write the body from Jeya's notes (see Voice). Keep the template's sections
   only where there is something real to say.
5. `npm run check`, then commit as `Add project: <title>` and push to `main`.

### Project fields

| Field | Required | Meaning |
| --- | --- | --- |
| `title` | yes | Short name, 1–4 words |
| `summary` | yes | One sentence. Shown in lists and previews |
| `date` | yes | `YYYY-MM-DD`. Start or ship date |
| `side` | yes | `software`, `hardware` or `both` |
| `featured` | no | `true` shows it on the home page of its side (first 4 by `order`) |
| `order` | no | Position, lower first, across the whole site. Default 100 |
| `status` | no | `shipped` (default), `in progress`, `archived` |
| `tags` | no | Languages, boards, frameworks |
| `repo`, `demo` | no | Full URLs |
| `cover` | no | Relative path to an image in `src/assets/projects/` |
| `specs` | no | 3–5 `{ label, value }` facts. Only numbers Jeya gave you or the repo shows |
| `draft` | no | `true` hides it |

### Which side

- `software`: no physical build (shells, ML models, apps, XR, servers).
- `hardware`: mainly a physical build (robots, wearables, vehicles).
- `both`: real firmware or software **and** a real physical build, where both
  matter (e.g. STM32 telemetry).

The software side lists `software` + `both`. The hardware side lists
`hardware` + `both`. When unsure, ask.

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
- Never use: verified, inspectable, first principles, production-grade,
  cutting-edge, seamless, robust, leverage, zero-latency, passionate,
  "engineered" as a boast.
- No invented facts. Numbers, dates, test counts and claims come from Jeya's
  notes or the repository. If something is missing, ask.
- Summaries are one sentence.

## Don't

- Don't change components, layouts or styles when the request is content only.
- Don't add dependencies for content changes.
- Don't rewrite git history or force-push.
