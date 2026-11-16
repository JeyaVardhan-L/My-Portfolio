# Jeya Vardhan

My portfolio: **https://jeyavardhan.dev**

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
npm run dev      # http://localhost:4321/
npm run check    # what CI runs before deploying
```

## The domain

`jeyavardhan.dev` is registered at name.com and verified on the GitHub
account (profile Settings → Pages). Its DNS at name.com points to GitHub Pages:

| Type | Host | Answer |
| --- | --- | --- |
| A | (blank) | `185.199.108.153`, `.109.153`, `.110.153`, `.111.153` |
| AAAA | (blank) | `2606:50c0:8000::153`, `8001::153`, `8002::153`, `8003::153` |
| CNAME | `www` | `jeyavardhan-l.github.io` |
| TXT | `_github-pages-challenge-jeyavardhan-l` | GitHub's verification code |

The repo's Settings → Pages has `jeyavardhan.dev` as the custom domain with
HTTPS enforced, and `astro.config.mjs` has `SITE = 'https://jeyavardhan.dev'`,
`BASE = '/'`. Auto-renewal at name.com is off; renew before 15 Nov 2027.

## Licence

Code: MIT (see `LICENSE`). Writing, photos and project images: © Lekkala
Jeyavardhan, all rights reserved. Inter Tight, IBM Plex Mono and Instrument
Serif are under the SIL Open Font License. The engravings in `src/assets/art/`
are old prints, both public domain via Wikimedia Commons: the home hero is
J. W. Edy's *Town of Drøbak* from *Boydell's Picturesque Scenery of Norway*,
1820 (plate 58); the footer waves are from *Picturesque America*, 1872.
