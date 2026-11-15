# Jeya Vardhan

My portfolio: **https://jeyavardhan-l.github.io/My-Portfolio/**

Built with [Astro](https://astro.build). Every push to `main` deploys it to
GitHub Pages.

## Updating the site

Hand an AI agent (Claude Code or similar) your notes and one of these. The
rules it follows are in [`AGENTS.md`](AGENTS.md).

> Add this project to my site, following AGENTS.md. Notes: … Repo: … Live site: …

> Add this writing to my site, following AGENTS.md: …

> Move <project> to the top of my projects. / Feature <project> on the home page.

> Change the "Now" line on my home page to: …

Each project is a folder in `src/content/projects/` holding its text, its
cover image (a placeholder until you add yours) and, if it has one, its
animated diagram.

For inspiration photos, no agent needed: drop images into
`src/assets/inspiration/`, commit and push.

## Running it yourself

```bash
npm install
npm run dev      # http://localhost:4321/My-Portfolio/
npm run check    # what CI runs before deploying
```

## Using a custom domain

1. Buy or claim the domain, then add a `CNAME` DNS record pointing to
   `jeyavardhan-l.github.io`.
2. In `astro.config.mjs`, set `SITE` to `https://<domain>` and `BASE` to `'/'`.
3. Create `public/CNAME` containing just the domain.
4. In the repository settings → Pages, enter the domain and tick
   "Enforce HTTPS" once it is offered.

## Licence

Code: MIT (see `LICENSE`). Writing, photos and project images: © Lekkala
Jeyavardhan, all rights reserved. Inter Tight, IBM Plex Mono and Instrument
Serif are under the SIL Open Font License. The engravings in `src/assets/art/`
are old prints: the home comet is a wood engraving of the Great Comet of 1843 from the
*Illustrated London News*, scanned by
Wellcome Collection (CC BY 4.0, credited on the page); the footer waves are
from *Picturesque America*, 1872 (public domain, via Wikimedia Commons).
