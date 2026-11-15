---
# ── Copy this whole folder to src/content/projects/<slug>/ ──
# <slug> is lowercase-with-dashes and becomes the URL: /projects/<slug>/
# Put the cover screenshot next to this file as cover.png (or .jpg).
# Optional: diagram.svg in the same folder is shown as "Fig. 1".

title: "Short name"                    # 1–4 words. The summary carries the detail.
summary: "One plain sentence: what it is and what it does."
date: 2026-01-31                       # when you started or shipped it (YYYY-MM-DD)
side: software                         # software | hardware | both  (see AGENTS.md)
featured: false                        # true = shown on the home page for its side
order: 100                             # lower = earlier, across the whole site
status: shipped                        # shipped | in progress | archived
tags: ["Language", "Framework", "Board"]
repo: "https://github.com/JeyaVardhan-L/<repo>"
# demo: "https://..."                  # the project's live site, if it has one
cover: ./cover.png                     # remove this line if there is no picture
# gallery:
#   - { src: ./photo-1.jpg, caption: "What the photo shows." }
specs:                                 # 3–5 facts that are true and checkable
  - { label: "Label", value: "Value" }
---

What the project is, in two or three sentences. Why it exists.

## How it works

The interesting part.

## What went wrong

The bug or limit that taught you something.
