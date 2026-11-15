---
# ── Copy this file to src/content/projects/<slug>.md ──
# <slug> is lowercase-with-dashes and becomes the URL: /projects/<slug>/

title: "Short name"                    # 1–4 words. The summary carries the detail.
summary: "One plain sentence: what it is and what it does."
date: 2026-01-31                       # when you started or shipped it (YYYY-MM-DD)
side: software                         # software | hardware | both  (see AGENTS.md)
featured: false                        # true = shown on the home page for its side
order: 100                             # lower = earlier, across the whole site
status: shipped                        # shipped | in progress | archived
tags: ["Language", "Framework", "Board"]
repo: "https://github.com/JeyaVardhan-L/<repo>"
# demo: "https://..."                  # optional live link
# cover: ../../assets/projects/<file>.png   # optional screenshot or photo
specs:                                 # 3–5 facts that are true and checkable
  - { label: "Label", value: "Value" }
---

What the project is, in two or three sentences. Why it exists.

## How it works

The interesting part. A diagram in a code block is welcome.

## What went wrong

The bug or limit that taught you something.

## What I'd do next

Optional.
