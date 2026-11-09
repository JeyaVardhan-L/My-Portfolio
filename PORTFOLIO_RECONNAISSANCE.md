# REPOSITORY RECONNAISSANCE REPORT: PORTFOLIO WEBSITE AUDIT

**Target Repository:** `My-Portfolio` (internal folder: `Jey.com`)  
**Origin Upstream:** Cloned/forked from `https://github.com/SAGAR-TAMANG/sagartamang.com.git` by `JeyaVardhan-L` (`https://github.com/JeyaVardhan-L/My-Portfolio`)  
**Auditor:** Senior Software Architect, Frontend Engineer, UI/UX Designer, & Systems Auditor  
**Date of Audit:** November 9, 2026  
**Status:** Completed (Analysis Only — Zero Code Modification)

---

## 1. Executive Summary

This repository is a high-performance, minimalist personal engineering portfolio and technical publishing engine. Originally authored and published by **Sagar Tamang** (`@sagar_builds`), an AI Engineer based in Bangalore, India, the project was cloned under the name `My-Portfolio` with an inner folder named `Jey.com`. Git commit inspection reveals that the current repository maintainer (`JeyaVardhan-L`) created the repo with the message *"Started with Sagars boiler plate desgine"* and subsequently committed *"Modified just names , yet to learn and do alot"*, which only altered the heading in `README.md`. As a result, **100% of the operational code, architecture, MDX blog posts, project case studies, metadata, and assets belong entirely to Sagar Tamang**.

Technically, the project is architected on **Next.js 16.1.6 (App Router with Turbopack)**, **React 19.2.1**, **Tailwind CSS v4 (alpha.13)**, and **Motion 12.40.0** (formerly Framer Motion). It features a modern, full-stack edge-ready architecture including:
- **Interactive AI Chat Assistant (`/api/chat` and `HomeChatBar`)**: Integrates Google Gemini (`gemini-2.5-flash`) via the Vercel AI SDK (`ai` v6 and `@ai-sdk/google`), backed by Upstash Redis rate limiting and dynamic context injection from local MDX content (`getLLMContext`).
- **Kinetic Physics-Driven Hover Previews (`HoverLinkPreview`)**: Floating, spring-animated link previews that tilt dynamically based on mouse velocity and render either local preview cards or procedurally generated deterministic SVG banners (`WritingPreviewCard`).
- **Hacker/Terminal Text Decryption (`SpecialText`)**: Multi-phase matrix-style glyph scrambler and reveal engine.
- **Editorial Typography & Dark Mode Aesthetic**: Strict single-column layout (`max-w-2xl`), pure black background (`#000000`), custom serif/sans pairing (`Playfair` and `Manrope`), and an all-lowercase design language.
- **Dynamic Image Generation & Structured Data**: Native OG image generation (`@vercel/og` / `next/og`), full Schema.org JSON-LD microdata, RSS 2.0 XML generation, and an automated LLM context feed (`/llms.txt`).

The application builds cleanly and successfully generates **65 static and dynamic routes** with zero compilation errors. However, because it contains extensive deeply coupled personal content across 26 blog posts, 24 project files, system prompts, and hardcoded schema objects, a systematic multi-phase transformation strategy is necessary to convert it into a personalized engineering portfolio.

---

## 2. Repository Structure

### 2.1 Workspace Layout & Path Anomaly
A crucial structural finding is that the Git repository root (`c:\Users\user\Downloads\Porfolio_Website\My-Portfolio`) contains a single root subdirectory: `Jey.com/`. All source code, dependencies, and configuration reside inside `Jey.com/`.

```
My-Portfolio/
├── .git/                               # Git version control metadata
└── Jey.com/                             # Application root directory
    ├── .browserslistrc                 # Browser target config (modern browsers only)
    ├── .env.example                    # Sample environment variables
    ├── .gitignore                      # Git ignore patterns
    ├── .npmrc                          # Node package manager config (legacy-peer-deps=true)
    ├── license.txt                     # MIT License (Copyright 2025 Sagar Tamang)
    ├── package.json                    # Project manifest & dependency declarations
    ├── package-lock.json               # Locked dependency tree
    ├── postcss.config.js               # PostCSS configuration with Tailwind v4 plugin
    ├── README.md                       # Project documentation
    ├── tsconfig.json                   # TypeScript compiler options
    ├── app/                            # Next.js App Router core source
    │   ├── api/
    │   │   └── chat/
    │   │       └── route.ts            # AI streaming route (Gemini 2.5 Flash + Upstash)
    │   ├── blog/
    │   │   ├── page.tsx                # Blog index listing (/blog)
    │   │   ├── utils.ts                # MDX parser & date formatter for blog posts
    │   │   ├── [slug]/
    │   │   │   └── page.tsx            # Dynamic blog post article view (/blog/[slug])
    │   │   └── posts/                  # 26 Markdown/MDX articles
    │   ├── components/                 # Reusable UI & client components
    │   │   ├── ai-chat-input.tsx       # Expandable AI input bar with morphing animations
    │   │   ├── ai-message-list.tsx     # Streamdown markdown message list for AI chat
    │   │   ├── boxed-text.tsx          # Pill/badge component for skill and tech tags
    │   │   ├── builds.tsx              # Homepage preview section for recent projects
    │   │   ├── contact.tsx             # Partnerships & contact links section
    │   │   ├── current.tsx             # Current role & research summary section
    │   │   ├── footer.tsx              # Site footer with social SVG icons and copyright
    │   │   ├── header.tsx              # Minimalist hero header with Devanagari & Kannada
    │   │   ├── home-chat-bar.tsx       # Floating fixed chat controller for homepage
    │   │   ├── hover-link-preview.tsx  # Spring-physics cursor-following link preview
    │   │   ├── mdx.tsx                 # Custom MDX components & Sugar-High highlighter
    │   │   ├── nav.tsx                 # Standalone navbar component (currently UNUSED)
    │   │   ├── posts.tsx               # Blog post feed component
    │   │   ├── previous.tsx            # Work history & internship list section
    │   │   ├── projects.tsx            # Project showcase cards with thumbnail & tags
    │   │   ├── special-text.tsx        # Glyph scrambler / hacker text animation engine
    │   │   ├── writing-preview-card.tsx# Procedural SVG card generator for blog links
    │   │   └── writings.tsx            # Homepage preview section for recent writings
    │   ├── lib/
    │   │   ├── chat-tools.ts           # Tool schema (showLinkButton) for Vercel AI SDK
    │   │   ├── get-llm-context.ts      # Comprehensive biographical context compiler
    │   │   └── profile-links.ts        # Whitelisted profile link dictionary
    │   ├── llms.txt/
    │   │   └── route.ts                # Machine-readable LLM context feed (/llms.txt)
    │   ├── og/
    │   │   └── route.tsx               # Dynamic Open Graph banner generator (/og)
    │   ├── personal-desk/
    │   │   ├── layout.tsx              # Full-screen zero-margin viewport layout
    │   │   └── page.tsx                # 3D Gaussian Splat viewer embed (/personal-desk)
    │   ├── projects/
    │   │   ├── page.tsx                # Projects directory index (/projects)
    │   │   ├── utils.ts                # MDX parser & date formatter for project content
    │   │   ├── [slug]/
    │   │   │   └── page.tsx            # Dynamic project case study (/projects/[slug])
    │   │   └── content/                # 24 Project Markdown/MDX case studies
    │   ├── rss/
    │   │   └── route.ts                # RSS 2.0 XML feed endpoint (/rss)
    │   ├── apple-icon.png              # Apple Touch Icon asset
    │   ├── favicon.ico                 # Standard Favicon asset
    │   ├── global.css                  # Tailwind CSS v4 directives, themes, & prose CSS
    │   ├── icon.png                    # App Icon asset
    │   ├── layout.tsx                  # Root layout (Metadata, Google Fonts, Analytics)
    │   ├── not-found.tsx               # Custom 404 page
    │   ├── page.tsx                    # Homepage composition & JSON-LD schema
    │   ├── robots.ts                   # Search engine crawler instructions (/robots.txt)
    │   └── sitemap.ts                  # Dynamic XML sitemap generator (/sitemap.xml)
    └── public/                         # Static assets served at web root
        ├── previews/                   # Hover card preview images (webp/svg)
        ├── projects/                   # 20 Project mockup images (webp)
        ├── composio-dev-favicon.svg    # Partner company icon
        ├── leapx-ai-favicon.svg        # Partner company icon
        ├── og-image.png                # Static fallback OG banner (765 KB)
        ├── personal-desk.html          # Standalone SuperSplat 3D viewer (7.7 MB)
        ├── resume.pdf                  # Original owner's resume document (62 KB)
        ├── ss.png                      # Screenshot of homepage for README (616 KB)
        ├── successscholar-favicon.svg  # Partner company icon
        └── twospoon-logo-favicon.svg   # Current employer icon
```

### 2.2 Key Configuration Files
- **`Jey.com/.npmrc`**: Contains `legacy-peer-deps=true`. Required because `@types/react` is pinned at `18.2.55` while `react` and `react-dom` are on `19.2.1`. Without this, standard `npm install` fails with peer dependency conflicts.
- **`Jey.com/.browserslistrc`**: Configured to modern engines only (`Chrome >= 111`, `Firefox >= 111`, `Safari >= 16.4`, `Edge >= 111`, `not dead`), avoiding ~14 KiB of legacy polyfills.
- **`Jey.com/tsconfig.json`**: Configured with `strict: false`, `strictNullChecks: true`, and `baseUrl: "."`. The non-strict base configuration permits loose type checking in legacy MDX components.
- **`Jey.com/postcss.config.js`**: Uses `@tailwindcss/postcss` for Tailwind CSS v4 processing.

---

## 3. Technology Stack Audit

| Category | Technology | Version | Location / Usage | Purpose & Evaluation |
| :--- | :--- | :--- | :--- | :--- |
| **Framework** | Next.js | `^16.1.6` | `app/` | Uses Next.js App Router with Turbopack for SSG/SSR hybrid rendering. |
| **Core UI Library** | React & React DOM | `^19.2.1` | `package.json` | Modern React 19 concurrent features, Server Components (RSC), and dynamic actions. |
| **Language** | TypeScript | `^5` | Repository-wide | Type definitions, interfaces, and JSX typing. |
| **Styling** | Tailwind CSS v4 | `4.0.0-alpha.13` | `app/global.css`, `postcss.config.js` | Uses new CSS-first `@theme` configuration without `tailwind.config.js`. |
| **Animation Engine** | Motion | `^12.40.0` | `hover-link-preview.tsx`, `ai-chat-input.tsx`, etc. | Formerly Framer Motion; powers spring physics, layout animations, and in-view triggers. |
| **AI Integration** | Vercel AI SDK | `ai: ^6.0.197`, `@ai-sdk/react: ^3.0.199` | `app/api/chat/route.ts`, `home-chat-bar.tsx` | Client hooks (`useChat`), stream pipelines, and tool rendering. |
| **LLM Provider** | Google Generative AI | `@ai-sdk/google: ^3.0.80` | `app/api/chat/route.ts` | Direct integration with `gemini-2.5-flash` model for intelligent portfolio Q&A. |
| **Database / Limiter** | Upstash Redis & Ratelimit | `@upstash/redis: ^1.38.0`, `@upstash/ratelimit: ^2.0.8` | `app/api/chat/route.ts` | IP-based sliding window rate limiter (10 daily requests prod, 40 dev) over HTTP REST. |
| **Content Engine** | next-mdx-remote | `^6.0.0` | `app/components/mdx.tsx` | Server-rendered MDX parsing without requiring Webpack loader plugins. |
| **Markdown Streaming**| Streamdown | `^2.5.0` | `app/components/ai-message-list.tsx` | Streaming-compatible markdown renderer for real-time AI responses. |
| **Code Highlighting** | Sugar-High | `^0.6.0` | `app/components/mdx.tsx` | Super-lightweight syntax highlighter producing clean token spans. |
| **Markdown Plugins** | remark-gfm | `^4.0.1` | `app/components/mdx.tsx` | GitHub-flavored markdown (tables, strikethrough, autolinks). |
| **Icon Libraries** | Lucide React & React Icons | `lucide-react: ^1.17.0`, `react-icons: ^5.5.0` | `ai-chat-input.tsx`, `footer.tsx` | Vector icons for UI actions and social network brand SVGs. |
| **Typography** | Google Fonts via Next | `next/font/google` | `app/layout.tsx` | Self-hosted zero-layout-shift Google fonts (`Playfair` & `Manrope`). |
| **Analytics & Telemetry**| Vercel Analytics & Speed Insights, Google Analytics | `@vercel/analytics: ^1.1.3`, `@vercel/speed-insights: ^1.0.9`, `@next/third-parties: ^16.1.1` | `app/layout.tsx` | Web vitals, real user monitoring, and page tracking. |
| **Validation** | Zod | `^4.4.3` | `app/lib/chat-tools.ts` | Schema definition for AI tool calling parameter validation. |
| **3D / Spatial Media** | SuperSplat / Gaussian Splatting | WebGL / Iframe | `app/personal-desk/page.tsx`, `public/personal-desk.html` | 3D Gaussian Splat viewer for scanning physical workspaces. |

---

## 4. Complete Website Architecture

### 4.1 End-to-End Application Trace
1. **Entry Point (`Jey.com/app/layout.tsx`)**:
   - Injects Google Fonts (`--font-playfair` and `--font-manrope`) into `<html>`.
   - Injects global metadata (canonical URL, Twitter Cards, Open Graph, keywords, author info).
   - Enforces global body classes: `font-serif antialiased max-w-2xl mx-auto px-4 my-16 lg:my-24 text-sm md:text-base tracking-tight lowercase`.
   - Embeds persistent elements: children, `<Footer />`, `<HomeChatBar />`, `<Analytics />`, `<SpeedInsights />`, and `<GoogleAnalytics />`.
2. **Homepage Pipeline (`Jey.com/app/page.tsx`)**:
   - Generates Schema.org `Person` JSON-LD script for rich Google search snippets.
   - Vertically stacks sections using custom Figma spacing (`gap-figma-outside-gap: 40px`):
     `MainHeader` -> `Current` -> `Previous` -> `Writings` -> `Builds` -> `Contact`.
3. **Dynamic Blog Subsystem (`Jey.com/app/blog/`)**:
   - `utils.ts` reads `/app/blog/posts/*.mdx` synchronously using `fs.readdirSync` and custom regex frontmatter extraction.
   - `/blog` lists all articles using `<BlogPosts />` with tabular date formatting.
   - `/blog/[slug]` statically generates all 26 paths (`generateStaticParams`), injects `BlogPosting` JSON-LD schema, dynamic Open Graph images (`/og?title=...`), and renders body content through `<CustomMDX />`.
4. **Dynamic Projects Subsystem (`Jey.com/app/projects/`)**:
   - `utils.ts` reads `/app/projects/content/*.mdx`.
   - `/projects` renders project cards with thumbnails, descriptions, and technology pills.
   - `/projects/[slug]` statically generates all 24 paths, renders hero preview images, technology tags via `<BoxedText />`, and renders case studies through `<CustomMDX />`.
5. **AI Chat Pipeline (`Jey.com/app/api/chat/route.ts`)**:
   - Client (`home-chat-bar.tsx`) sends prompt via `useChat`.
   - Server reads IP from reverse proxy headers (`cf-connecting-ip`, `x-forwarded-for`, `x-real-ip`).
   - If Upstash Redis credentials exist, checks rate limit (10 reqs/day). Bypassed gracefully if env vars are unset.
   - Validates input length (max 500 characters). Slices conversation history to last 5 messages.
   - Synthesizes dynamic system prompt with `getLLMContext()`, pulling live blog and project lists.
   - Calls `streamText` using `google('gemini-2.5-flash')` with tool definitions (`showLinkButton`).
   - Returns a streaming UI response (`toUIMessageStreamResponse`).

---

## 5. Page and Component Breakdown

### 5.1 Route Tree & Purpose

| Route | File Path | Rendering Mode | Purpose & Behavior |
| :--- | :--- | :--- | :--- |
| `/` | `app/page.tsx` | Static (SSG) | Central hub displaying bio, current role, history, top 3 posts, top 1 project, partnerships, and AI chat. |
| `/blog` | `app/blog/page.tsx` | Static (SSG) | Chronological directory of all 26 technical articles. |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | SSG (Static Export) | Comprehensive technical deep dives with syntax highlighting and anchor links. |
| `/projects` | `app/projects/page.tsx` | Static (SSG) | Grid of 24 software, AI, and hardware projects. |
| `/projects/[slug]` | `app/projects/[slug]/page.tsx`| SSG (Static Export) | Detailed project case study with mockups, architecture, and technology tags. |
| `/personal-desk` | `app/personal-desk/page.tsx` | Static (SSG) | Full-screen interactive 3D Gaussian Splat scan of workspace. |
| `/api/chat` | `app/api/chat/route.ts` | Dynamic (SSR / Edge) | AI streaming API endpoint with Gemini 2.5 Flash and Upstash rate limiting. |
| `/og` | `app/og/route.tsx` | Dynamic (On-Demand) | Generates dynamic 1200x630 PNG social preview cards via `@vercel/og`. |
| `/llms.txt` | `app/llms.txt/route.ts` | Dynamic (On-Demand) | Generates curated plaintext markdown context for web crawlers and LLMs. |
| `/rss` | `app/rss/route.ts` | Dynamic (On-Demand) | Valid RSS 2.0 XML feed of all blog posts. |
| `/sitemap.xml` | `app/sitemap.ts` | Static / Revalidated | Search engine index containing all static pages, blog articles, and project pages. |
| `/robots.txt` | `app/robots.ts` | Static | Search engine crawler permissions. |
| `/_not-found` | `app/not-found.tsx` | Static | Minimalist 404 error page. |

### 5.2 Component Hierarchy & Responsibilities

#### `MainHeader` (`app/components/header.tsx`)
- **Hierarchy:** Stored in homepage layout top.
- **Content:** Sagar's English name, Devanagari script representation (`सागर तामाङ`), skill pills via `BoxedText`, the tagline *"i build fast"*, sr-only social tag `@sagar_builds`, and location *"ಬೆಂಗಳೂರು / Bangalore, India"*.
- **Style:** Flex container with between-alignment; high-contrast italic typography.

#### `Current` (`app/components/current.tsx`)
- **Hierarchy:** First body section on homepage.
- **Content:** Current job role at TwoSpoon.ai with inverted favicon badge and hover card; Google Scholar citations (30+ citations, 4 best paper awards); academic credentials (IIT Patna, IIIT Ranchi, Bachelor's Gold Medalist); personal interests (superbikes, ancient Greek philosophy).
- **Interactions:** Wrapped in `HoverLinkPreview` to preview `twospoon.ai` and `scholar.google.com`.

#### `Previous` (`app/components/previous.tsx`)
- **Hierarchy:** Second body section on homepage.
- **Content:** Past roles: LeapX.ai (AI Engineer Intern) and Composio.dev (Software Engineering Python). Note: SuccessScholar.in role is commented out in code.
- **Interactions:** Uses `HoverLinkPreview` showing `leapx.webp` and `composio.webp`.

#### `Writings` & `BlogPosts` (`app/components/writings.tsx`, `app/components/posts.tsx`)
- **Hierarchy:** Third body section; invokes `BlogPosts` with `limit={3}` on homepage, unlimited on `/blog`.
- **Content:** Date (formatted as relative or tabular month-day-year) and article title.
- **Interactions:** Wrapped in `HoverPreviewLink` which mounts `WritingPreviewCard` — an algorithmic SVG that renders an on-the-fly gradient preview card derived from the post slug hash. Includes "Read all writings" button when limited.

#### `Builds` & `Projects` (`app/components/builds.tsx`, `app/components/projects.tsx`)
- **Hierarchy:** Fourth body section; invokes `Projects` with `limit={1}` on homepage, unlimited on `/projects`.
- **Content:** Project thumbnail (Next.js `<Image />` with hover zoom `group-hover:scale-105`), project title, published date, two-line summary (`line-clamp-2`), and technology pills.
- **Interactions:** Image hover zoom; cursor preview portal rendering larger thumbnail. Includes "View all projects" button.

#### `Contact` (`app/components/contact.tsx`)
- **Hierarchy:** Final content block on homepage.
- **Content:** Email link (`build@sagartamang.com`), TwoSpoon enterprise link, resume link (`/resume.pdf`), and Cal.com meeting booking (`cal.com/sagar-tamang/feynman-pi`).
- **Interactions:** Uses `HoverLinkPreview` for resume SVG preview and Cal.com webp preview.

#### `HomeChatBar`, `AIChatInput`, & `MessageListUI` (`app/components/home-chat-bar.tsx`, `ai-chat-input.tsx`, `ai-message-list.tsx`)
- **Hierarchy:** Mounted in root layout, conditionally rendered only when `pathname === '/'`.
- **Content:** Fixed bottom glassmorphic bar. When expanded, triggers a backdrop blur over the page (`backdrop-blur-sm bg-background/70`). Renders messages parsed through `Streamdown`, custom tool buttons (`LinkButton`), and thinking indicators.
- **Interactions:** 
  - Staggered letter reveal for rotating placeholders.
  - Spring-animated container expanding from 68px to auto height.
  - Hacker decryption thinking animation (`ThinkingText` -> `SpecialText`).
  - Outside click listener to collapse.
  - Chat disclaimer linking to `/llms.txt`.

#### `HoverLinkPreview` & `HoverPreviewLink` (`app/components/hover-link-preview.tsx`)
- **Hierarchy:** Reusable utility component wrapping internal or external links.
- **Interaction Engine:** 
  - Attaches mouse listeners (`onMouseEnter`, `onMouseMove`, `onMouseLeave`).
  - Computes cursor coordinates with `motionTop` and `motionLeft` using `useSpring` (stiffness: 300, damping: 30).
  - Calculates horizontal mouse delta (`deltaX = clientX - prevX`) to tilt the card up to ±15 degrees (`useSpring` stiffness: 300, damping: 20).
  - Renders floating card into `document.body` via `createPortal` to prevent parent clipping.
  - Includes a zero-size hidden preloader on initial render to pre-cache images.

#### `WritingPreviewCard` (`app/components/writing-preview-card.tsx`)
- **Hierarchy:** Used as the preview node inside `HoverPreviewLink` for blog posts.
- **Mechanism:** Implements a string-hashing algorithm (`hashString(slug)`) that deterministically calculates two HSL hues, draws an SVG gradient, positions three decorative circles, wraps the post title to 3 lines, and watermarks `sagartamang.com`. Zero external images required.

#### `SpecialText` (`app/components/special-text.tsx`)
- **Hierarchy:** Used in `ThinkingText` and heading animations.
- **Mechanism:** 3-phase matrix-style hacker text reveal. Phase 1: randomly expands gibberish (`_!X$0-+*#`) from 0 to target width. Phase 2: reveals actual characters from left to right. Phase 3: scrambles and shrinks back to 0.

#### `Navbar` (`app/components/nav.tsx`)
- **Status:** **DEAD / UNUSED CODE**. Defined with links to `/`, `/blog`, and `/projects`, but never imported or rendered in any layout or page.

---

## 6. UI/UX and Design System Audit

### 6.1 Design Philosophy
The site follows an **extreme editorial minimalism / brutalist-lite aesthetic** combined with **modern kinetic micro-interactions**. Key traits include:
1. **Lowercase Typography Constraint**: The `<body>` tag has `lowercase` applied. All prose, headers, labels, and navigation are rendered in lowercase unless explicitly overridden (e.g. inside the chat modal which applies `normal-case`).
2. **Strict Single-Column Container**: Fixed width bounded at `max-w-2xl` (~672px). No sprawling multi-column layouts, sidebars, or bloated hero sections.
3. **High Contrast Dark Mode**: Pure pitch black `#000000` background with crisp `#ffffff` primary text, muted slate borders, and subtle blue interactive accents.
4. **Editorial Serif + Technical Sans Pairing**: Classical high-contrast serif (`Playfair`) for body and headings, paired with technical geometric sans (`Manrope`) for badges, chat, and tabular data.

### 6.2 Color Palette

```
┌────────────────────────────────────────────────────────┐
│                      COLOR PALETTE                     │
├───────────────────────┬──────────────┬─────────────────┤
│ Token                 │ Hex / Value  │ Semantic Role   │
├───────────────────────┼──────────────┼─────────────────┤
│ --background          │ #000000      │ Deep Canvas     │
│ --foreground          │ #ffffff      │ Primary Text    │
│ --primary             │ #171717      │ Chat Bar/Cards  │
│ --primary-foreground  │ #ffffff      │ Card Headers    │
│ --secondary           │ #262626      │ Badges/Borders  │
│ --secondary-foreground│ #d4d4d4      │ Secondary Text  │
│ --muted               │ #262626      │ Inactive States │
│ --muted-foreground    │ #a3a3a3      │ Dates / Meta    │
│ --accent              │ rgba(37,99,235,0.1) │ Subtle Blue Pill │
│ --accent-foreground   │ #dbeafe      │ Soft Sky Blue   │
│ --border              │ #262626      │ Borders/Rules   │
│ ::selection           │ #47a3f3      │ Selection Blue  │
└───────────────────────┴──────────────┴─────────────────┘
```

#### Code Syntax Highlighting Palette (`Sugar-High` Tokens in `global.css`):
- `--sh-class`: `#4c97f8` (Soft Cornflower Blue)
- `--sh-identifier`: `#ffffff` (Pure White)
- `--sh-sign`: `#8996a3` (Slate Gray)
- `--sh-string`: `#0fa295` (Teal Cyan)
- `--sh-keyword`: `#f47067` (Coral Red)
- `--sh-comment`: `#a19595` (Warm Muted Gray)
- `--sh-jsxliterals`: `#6266d1` (Indigo Purple)
- `--sh-property`: `#e25a1c` (Vibrant Tangerine)
- `--sh-entity`: `#e25a1c` (Vibrant Tangerine)

### 6.3 Typography Hierarchy

| Element | Font Family | Size | Weight | Tracking / Style |
| :--- | :--- | :--- | :--- | :--- |
| **Root Body** | `Playfair` (Serif) | `text-sm` (14px) / `text-base` (16px) | Normal | `tracking-tight lowercase` |
| **Hero Name** | `Playfair` (Serif) | `text-base` / `text-lg` | Semibold (`font-semibold`) | `italic` |
| **Devanagari Subhead** | Native System | `text-xs` (12px) | Normal | `leading-4` |
| **Kannada Location** | Native System | `text-sm` / `text-base` | Normal | `italic` |
| **Section Headings** | `Playfair` (Serif) | `text-base` | Semibold (`font-semibold`) | `italic` |
| **Article Titles (H1)**| `Playfair` (Serif) | `text-2xl` (24px) | Semibold (`font-semibold`) | `tracking-tighter` |
| **Prose Headings (H2-H4)**| `Playfair` (Serif)| `text-lg` / `text-base` | Medium (`font-medium`) | `italic tracking-tight` |
| **Dates / Timestamps**| `Manrope` (Sans) | `text-sm` (14px) | Normal | `tabular-nums text-muted-foreground` |
| **Tech Pills / Tags**| `Manrope` (Sans) | `text-xs` (12px) | Extra Light (`font-extralight`) | `not-italic tracking-[-0.06em]` |
| **AI Chat & Inputs** | `Manrope` (Sans) | `text-sm` / `text-base` | Normal / Medium | `normal-case font-sans` |
| **Code Spans** | Monospace | `text-[0.85em]` | Medium | `bg-secondary px-1 py-0.5 rounded` |

### 6.4 Spacing & Layout System
- **Figma Spacing Variables**:
  - `--spacing-figma-inside-gap`: `16px` (used between sub-elements, post rows, and list items).
  - `--spacing-figma-outside-gap`: `40px` (used between major sections on the homepage).
- **Page Container**: `max-w-2xl mx-auto px-4 my-16 lg:my-24`.
- **Responsive Adaptations**:
  - Grid on blog list: `grid-cols-[8rem_1fr]` on mobile shifting to `grid-cols-[9rem_1fr]` on tablet/desktop.
  - Project cards: stacked column (`flex-col`) on mobile, horizontal row (`flex-row`) on desktop with `w-40 shrink-0` aspect-ratio thumbnail.

---

## 7. Animation and Interaction Inventory

| Interaction / Feature | Type | Library / Technology | File Implementation | Trigger & Behavior |
| :--- | :--- | :--- | :--- | :--- |
| **Cursor Physics Card Tilt** | JavaScript / Spring | `motion/react` (`useSpring`, `useMotionValue`) | `app/components/hover-link-preview.tsx` | Moving cursor over links calculates horizontal mouse delta; card springs to cursor coordinates and tilts dynamically up to ±15°. |
| **Portal Card Popover** | DOM Portal / Anim | `motion/react` (`AnimatePresence`) + `createPortal` | `app/components/hover-link-preview.tsx` | On hover, mounts preview directly to `document.body` with scale (`0.8 -> 1.0`) and opacity (`0 -> 1`) animation. |
| **Hacker Glyph Decryption** | JavaScript Timer | Custom React Interval + `motion/react` | `app/components/special-text.tsx` | 3-phase glyph scrambler (`_!X$0-+*#`) revealing characters sequentially. Used in chat "thinking" states. |
| **Chat Bar Expansion** | Layout Animation | `motion/react` (`variants`) | `app/components/ai-chat-input.tsx` | Clicking chat input expands height from 68px to auto with spring curve (`stiffness: 120, damping: 50`). |
| **Backdrop Blur Fade** | CSS / Layout Anim | `motion/react` (`AnimatePresence`) | `app/components/home-chat-bar.tsx` | Active chat fades in full-screen overlay (`backdrop-blur-sm bg-background/70`). |
| **Rotating Text Placeholders** | Staggered Motion | `motion/react` (`staggerChildren`) | `app/components/ai-chat-input.tsx` | Inactive chat cycles 6 prompt suggestions every 3s with individual letter blur/slide animations. |
| **Deep Search Button Expand** | Dimension Tween | `motion/react` (`animate={{ width }}`) | `app/components/ai-chat-input.tsx` | Toggling Deep Search animates button width from 36px (icon only) to 125px (with text label). |
| **Thinking Text Cycle** | State Animation | Custom Hook + `SpecialText` | `app/components/ai-message-list.tsx` | Cycles through `["thinking...", "searching...", "reasoning...", "on it...", "processing..."]` with decryption scrambler. |
| **Thumbnail Scale on Hover** | CSS Transition | Tailwind `group-hover:scale-105` | `app/components/projects.tsx` | Hovering over project card zooms image smoothly over 300ms. |
| **Dynamic Anchor Links** | Client Hover | CSS `@apply visible` on `:hover` | `app/global.css`, `app/components/mdx.tsx` | Hovering over headings in blog posts displays a `#` link icon to the left. |
| **3D Gaussian Splatting** | WebGL / Spatial | SuperSplat Iframe / Canvas | `app/personal-desk/page.tsx` | Full-screen interactive 3D camera pan/tilt/zoom of physical office desk. |

---

## 8. Original Owner's Content Inventory

Every single personal datum in this codebase belongs to Sagar Tamang. A complete audit reveals the following locations requiring personalization:

### 8.1 Personal Identification & Biometrics

| Category | Value / Original Content | Locations / File Paths |
| :--- | :--- | :--- |
| **Full Name** | Sagar Tamang | `app/layout.tsx`, `app/page.tsx`, `app/components/header.tsx`, `app/blog/[slug]/page.tsx`, `app/lib/get-llm-context.ts`, `app/rss/route.ts`, `license.txt`, `README.md` |
| **Devanagari Name** | सागर तामाङ | `app/components/header.tsx` |
| **Handle / Brand** | `@sagar_builds` / `sagar_builds` | `app/layout.tsx`, `app/page.tsx`, `app/components/header.tsx`, `app/lib/get-llm-context.ts`, `app/og/route.tsx`, `app/rss/route.ts` |
| **Tagline** | "i build fast" / "i can build anything." | `app/components/header.tsx`, `app/components/current.tsx`, `app/lib/get-llm-context.ts` |
| **Location** | Bangalore, India / ಬೆಂಗಳೂರು | `app/layout.tsx`, `app/components/header.tsx`, `app/lib/get-llm-context.ts` |
| **Canonical URL** | `https://sagartamang.com` | `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`, `app/rss/route.ts`, `app/og/route.tsx`, `app/lib/get-llm-context.ts`, `app/components/writing-preview-card.tsx` |

### 8.2 Work History, Education, & Credentials

| Category | Original Content | Locations / File Paths |
| :--- | :--- | :--- |
| **Current Role** | AI Engineer @ TwoSpoon.ai (River team) | `app/layout.tsx`, `app/page.tsx`, `app/components/current.tsx`, `app/lib/get-llm-context.ts` |
| **Past Roles** | LeapX.ai (AI Intern, Gurgaon), Composio.dev (Python SE Intern, Bangalore), NIT Silchar (Research Intern), Success Scholar (Product Owner) | `app/components/previous.tsx`, `app/lib/get-llm-context.ts` |
| **Education** | MCA (Joint Degree) @ IIT Patna & IIIT Ranchi (2025–27); BCA @ The Assam Kaziranga University (Gold Medalist, 9.8 CGPA) | `app/layout.tsx`, `app/page.tsx`, `app/components/current.tsx`, `app/lib/get-llm-context.ts` |
| **Research Awards** | 4 Best Paper Awards (ICDDA 2025, AICTE ICESCC 2024, IEEE OTCON 2024), 30+ Google Scholar Citations | `app/components/current.tsx`, `app/lib/get-llm-context.ts` |

### 8.3 Contact & Social Channels

| Platform | Handle / URL | File Paths |
| :--- | :--- | :--- |
| **Email** | `build@sagartamang.com` | `app/components/contact.tsx`, `app/lib/profile-links.ts`, `app/lib/get-llm-context.ts` |
| **X / Twitter** | `https://x.com/sagar_builds` | `app/layout.tsx`, `app/page.tsx`, `app/components/footer.tsx`, `app/lib/profile-links.ts`, `app/lib/get-llm-context.ts` |
| **Instagram** | `https://www.instagram.com/sagar_builds/` | `app/page.tsx`, `app/components/footer.tsx`, `app/lib/profile-links.ts`, `app/lib/get-llm-context.ts` |
| **GitHub** | `https://github.com/SAGAR-TAMANG` | `app/page.tsx`, `app/components/footer.tsx`, `app/lib/profile-links.ts`, `app/lib/get-llm-context.ts` |
| **LinkedIn** | `https://www.linkedin.com/in/sagar-tmg/` | `app/page.tsx`, `app/components/footer.tsx`, `app/lib/profile-links.ts`, `app/lib/get-llm-context.ts` |
| **Google Scholar** | `https://scholar.google.com/citations?hl=en&user=3mS0Y4wAAAAJ` | `app/page.tsx`, `app/components/current.tsx`, `app/components/footer.tsx`, `app/lib/profile-links.ts`, `app/lib/get-llm-context.ts` |
| **YouTube** | `https://www.youtube.com/@sagar_builds` | `app/lib/profile-links.ts`, `app/lib/get-llm-context.ts` |
| **Cal.com** | `https://cal.com/sagar-tamang/feynman-pi?user=sagar-tamang` | `app/components/contact.tsx`, `app/lib/profile-links.ts`, `app/lib/get-llm-context.ts` |
| **Resume PDF** | `/resume.pdf` | `app/components/contact.tsx`, `app/lib/profile-links.ts`, `public/resume.pdf` |

### 8.4 Content Collections
- **26 Blog Articles (`app/blog/posts/*.mdx`)**: All authored by Sagar Tamang covering Termux, Android LLMs, MCP servers, and personal reflections (*"Who is sagar_builds?"*, *"The Minimalism Toolkit: My Typography Essentials"*, etc.).
- **24 Project Case Studies (`app/projects/content/*.mdx`)**: All detailing Sagar's personal projects (F.R.I.D.A.Y., Zod Nepse, FrameSeek, Personal Desk 3D Splat, BharatGPT, etc.).

---

## 9. Asset Inventory

### 9.1 Root & Icon Assets (`app/` and `public/`)

| Asset Path | File Size | Description | Owner-Specific vs Generic |
| :--- | :--- | :--- | :--- |
| `app/icon.png` | 13.9 KB | Circular avatar / favicon | **Owner-Specific** (Sagar's avatar) |
| `app/apple-icon.png` | 13.9 KB | Apple touch icon | **Owner-Specific** (Sagar's avatar) |
| `app/favicon.ico` | 1.1 KB | Browser favicon | **Owner-Specific** |
| `public/og-image.png` | 765.8 KB | Static fallback OG social preview | **Owner-Specific** (Displays sagar_builds) |
| `public/ss.png` | 616.3 KB | Homepage screenshot for README | **Owner-Specific** |
| `public/resume.pdf` | 62.0 KB | Sagar Tamang's personal resume | **Owner-Specific** |
| `public/personal-desk.html` | 7.7 MB | Standalone SuperSplat 3D viewer export | **Owner-Specific** (Scan of Sagar's room) |
| `public/twospoon-logo-favicon.svg` | 1.8 KB | TwoSpoon.ai company logo | **External Brand** (Employer) |
| `public/leapx-ai-favicon.svg` | 12.7 KB | LeapX.ai company logo | **External Brand** (Past Employer) |
| `public/composio-dev-favicon.svg` | 1.0 KB | Composio.dev company logo | **External Brand** (Past Employer) |
| `public/successscholar-favicon.svg` | 60.1 KB | SuccessScholar logo | **External Brand** (Past Employer) |

### 9.2 Link Preview Assets (`public/previews/`)

| Asset Path | File Size | Description | Owner-Specific vs Generic |
| :--- | :--- | :--- | :--- |
| `public/previews/calcom.svg` / `.webp` | 1.5 KB / 19.5 KB | Cal.com meeting booking preview | Generic Brand Asset |
| `public/previews/composio.svg` / `.webp` | 640 B / 73.8 KB | Composio.dev website preview | External Brand Asset |
| `public/previews/google-scholar.svg` | 647 B | Google Scholar icon | Generic Brand Asset |
| `public/previews/leapx.svg` / `.webp` | 629 B / 80.4 KB | LeapX.ai website preview | External Brand Asset |
| `public/previews/resume.svg` | 1.1 KB | Document graphic for resume preview | Generic UI Asset |
| `public/previews/successscholar.svg` / `.webp`| 649 B / 76.8 KB | SuccessScholar website preview | External Brand Asset |
| `public/previews/twospoon.svg` / `.webp` | 641 B / 112.8 KB | TwoSpoon.ai website preview | External Brand Asset |

### 9.3 Project Mockups (`public/projects/`)

| Asset Path | File Size | Description | Owner-Specific vs Generic |
| :--- | :--- | :--- | :--- |
| `public/projects/mockup-aahana.webp` | **6.5 MB** | High-res fashion store mockup | **Owner-Specific** (Extremely heavy) |
| `public/projects/mockup-basab-nath.webp` | 95.4 KB | Client portfolio mockup | **Owner-Specific** |
| `public/projects/mockup-bharatgpt.webp` | 36.8 KB | BharatGPT UI mockup | **Owner-Specific** |
| `public/projects/mockup-frameseek.webp` | 29.5 KB | FrameSeek video search mockup | **Owner-Specific** |
| `public/projects/mockup-friday.webp` | 40.6 KB | F.R.I.D.A.Y. assistant mockup | **Owner-Specific** |
| `public/projects/mockup-glimmirx-media.webp` | 63.7 KB | Media agency mockup | **Owner-Specific** |
| `public/projects/mockup-rebranded.webp` | 145.3 KB | Rebranded design mockup | **Owner-Specific** |
| `public/projects/mockup-rjrojgaar.webp` | 199.9 KB | Employment portal mockup | **Owner-Specific** |
| `public/projects/mockup-selenium-mcp.webp` | 184.4 KB | Selenium MCP server mockup | **Owner-Specific** |
| `public/projects/mockup-ssb.webp` | 144.8 KB | SSB learning app mockup | **Owner-Specific** |
| `public/projects/mockup-supersplat-desk.webp`| 52.1 KB | Gaussian splat desk thumbnail | **Owner-Specific** |
| `public/projects/mockup-thegreathimalayas.webp`| 143.7 KB | Travel agency mockup | **Owner-Specific** |
| `public/projects/mockup-therapist.webp` | 104.6 KB | AI therapist chat UI | **Owner-Specific** |
| `public/projects/mockup-ultron.webp` | 40.1 KB | AI voice bot mockup | **Owner-Specific** |
| `public/projects/mockup-vr.webp` | 207.2 KB | VR showcase app mockup | **Owner-Specific** |
| `public/projects/mockup-wearit.webp` | 100.6 KB | Fashion mobile app mockup | **Owner-Specific** |
| `public/projects/mockup-zod.webp` / `zod-2.webp`| 89.2 KB / 42.1 KB | Stock trading mobile app mockups | **Owner-Specific** |
| `public/projects/pi-logo-mockup.webp` | 68.9 KB | Brand identity mockup | **Owner-Specific** |
| `public/projects/prompt-duel.webp` | 31.7 KB | AI game UI mockup | **Owner-Specific** |

---

## 10. Code Quality and Engineering Audit

### 10.1 Strengths
1. **Clean Architectural Separation**: Pure React Server Components (RSC) for content pages (`app/page.tsx`, `app/blog/[slug]/page.tsx`, `app/projects/[slug]/page.tsx`) with interactive leaf components marked with `"use client"`.
2. **Deterministic Procedural Graphics**: `writing-preview-card.tsx` provides an elegant solution to social preview generation without static file bloat.
3. **Resilient Rate Limiting**: `app/api/chat/route.ts` gracefully handles absent Upstash environment variables without throwing runtime exceptions.
4. **Deferred Bundle Splitting**: `home-chat-bar.tsx` defers loading the heavy markdown parser (`ai-message-list.tsx` + `streamdown`) via `requestIdleCallback` / `setTimeout`, preventing chat libraries from degrading First Contentful Paint (FCP).

### 10.2 Technical Debt & Weaknesses
1. **Type Definition Version Mismatch**: `package.json` installs React 19 (`react: ^19.2.1`) while `@types/react` is pinned at `18.2.55`. This required adding `legacy-peer-deps=true` to `.npmrc`.
2. **Dead / Unlinked Component**: `app/components/nav.tsx` is completely unreferenced. Visitors reading blog articles or project case studies have no visual navbar or "Back to Home" button.
3. **Loose TypeScript Configuration**: `tsconfig.json` specifies `strict: false`. Many helper functions in `app/blog/utils.ts` and `app/projects/utils.ts` use untyped parameters (`dir`, `filePath`).
4. **Hardcoded Domain Strings**: Canonical URL `https://sagartamang.com` is repeated across multiple files instead of referencing a single centralized configuration module.
5. **Heavy Static Files**: `public/projects/mockup-aahana.webp` is 6.5 MB and `public/personal-desk.html` is 7.7 MB, consuming over 14 MB of repository storage.
6. **Cosmetic-Only UI Elements**: In `ai-chat-input.tsx`, the Paperclip and Mic buttons are visual-only buttons (`tabIndex={-1}`). Furthermore, the "Think" and "Deep Search" toggle states are purely local state flags that are not transmitted to the backend streaming route.

---

## 11. Performance and Accessibility Assessment

### 11.1 Performance
- **Build Output**: 65 statically pre-rendered routes (SSG). Zero SSR overhead on content pages.
- **Font Loading**: High performance with `next/font/google` (`display: 'swap'`), zero external CSS roundtrips, and CSS variable injection.
- **Modern Polyfill Elimination**: `.browserslistrc` discards ~14 KiB of legacy ECMAScript polyfills.
- **Asset Weight Risk**: The 6.5 MB `mockup-aahana.webp` will cause significant network transfer delays on the project showcase page if loaded without aggressive next/image sizing.

### 11.2 Accessibility (a11y)
- **High Contrast**: Dark theme satisfies WCAG AAA contrast ratios for body text (`#ffffff` on `#000000`).
- **Screen Reader Support**: `<p className="sr-only">@sagar_builds</p>` in header; proper `aria-label` attributes on social SVG icons and inputs.
- **Area of Concern**:
  - The all-lowercase style (`body { lowercase }`) can impact readability for users with cognitive or visual processing challenges.
  - Heading hierarchy in `MessageListUI` flattens heading font sizes to bubble text size, conveying hierarchy only through font weight.

---

## 12. Local Setup and Execution

### 12.1 Prerequisites
- **Node.js**: v20+ or v22+ (tested and verified on Node `v22.23.2`)
- **Package Manager**: `npm` (v10+), `pnpm`, or `bun`

### 12.2 Installation & Build Commands
All commands MUST be run from inside the inner `Jey.com` directory:

```bash
# Navigate to inner application directory
cd Jey.com

# Install dependencies (respecting .npmrc legacy-peer-deps)
npm install

# Start local development server
npm run dev

# Compile production build
npm run build

# Start production server
npm run start
```

### 12.3 Verification Results
- **Installation**: `npm install` completed with 0 errors (audited 347 packages).
- **Compilation**: `npm run build` completed with **exit code 0** in 12.8s via Next.js Turbopack compiler.
- **Route Generation**: Successfully compiled 65 pages (Static, SSG, and Dynamic endpoints).

---

## 13. Potential Problems and Risks

1. **Path-Resolution Risk with `process.cwd()`**:
   In `app/blog/utils.ts` and `app/projects/utils.ts`:
   ```typescript
   path.join(process.cwd(), 'app', 'blog', 'posts')
   ```
   If a developer runs `npm run dev` from the repository root `My-Portfolio` rather than inside `Jey.com`, `process.cwd()` resolves to `My-Portfolio/app/blog/posts` which does not exist, causing build crashes.
2. **Upstash Module-Level Warning**:
   In `app/api/chat/route.ts`, `Redis.fromEnv()` is called at the top of the module. During build-time static evaluation, if environment variables are missing, it logs warning messages to the console (though non-fatal).
3. **AI Chat API Dependency**:
   The interactive chat bar will fail at runtime unless `GOOGLE_GENERATIVE_AI_API_KEY` is provided in `.env.local`. Without it, chat attempts will trigger the generic fallback error message.
4. **Tailwind v4 Pre-release Channel**:
   The project uses `tailwindcss: 4.0.0-alpha.13` and `@tailwindcss/postcss: 4.0.0-alpha.13`. Alpha builds of Tailwind v4 have breaking differences from stable Tailwind v4 (released early 2025).

---

## 14. Recommended Transformation Strategy

To transform this repository into a personalized portfolio without breaking its elegant architecture:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        TRANSFORMATION ROADMAP                          │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 1: DIRECTORY & WORKSPACE NORMALIZATION                           │
│ • Hoist files from Jey.com/ to root OR establish clear monorepo setup. │
│ • Normalize package.json scripts and TypeScript type definitions.      │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 2: CORE IDENTITY & CONFIG CENTRALIZATION                         │
│ • Create a centralized config: app/config/portfolio.ts                 │
│ • Replace hardcoded strings in layout.tsx, page.tsx, sitemap.ts, etc.  │
│ • Update Schema.org JSON-LD and dynamic OG image banner text.          │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 3: NAVIGATION & ACCESSIBILITY ENHANCEMENT                        │
│ • Integrate or refactor app/components/nav.tsx into layout.tsx.        │
│ • Add subtle breadcrumb or "Back to Home" links on blog/project pages. │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 4: ASSET REPLACEMENT & OPTIMIZATION                              │
│ • Replace avatar (icon.png), OG image, and resume.pdf.                 │
│ • Compress or replace heavy mockups (public/projects/mockup-aahana.webp)│
│ • Clean up obsolete sponsor/past employer SVGs.                        │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 5: CONTENT RE-AUTHORING                                          │
│ • Clear or archive existing 26 MDX blog posts; author initial articles.│
│ • Replace 24 project case studies with personalized projects.          │
│ • Update app/lib/get-llm-context.ts with new bio, skills, and links.  │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 6: AI CHAT PERSONALIZATION & SERVICE ACTIVATION                  │
│ • Set up Gemini API key & Upstash Redis credentials.                   │
│ • Update system prompt and link buttons in app/lib/profile-links.ts.   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 15. Important Files to Modify During Personalization

The following files represent the critical touchpoints for personalizing the portfolio:

1. **`Jey.com/app/layout.tsx`**: Site metadata, SEO keywords, author name, Twitter handle, and Open Graph defaults.
2. **`Jey.com/app/sitemap.ts`**: Base domain URL definition (`baseUrl = 'https://yourdomain.com'`).
3. **`Jey.com/app/page.tsx`**: Schema.org `Person` JSON-LD schema (name, alma mater, social profiles).
4. **`Jey.com/app/components/header.tsx`**: Hero header name, script translations, skill keywords, and city/location.
5. **`Jey.com/app/components/current.tsx`**: Current company, job title, academic status, and bio.
6. **`Jey.com/app/components/previous.tsx`**: Past work experience, internships, and companies.
7. **`Jey.com/app/components/contact.tsx`**: Contact email, booking calendar link, and enterprise services.
8. **`Jey.com/app/components/footer.tsx`**: Social media URLs, GitHub profile, and copyright notice.
9. **`Jey.com/app/lib/profile-links.ts`**: Whitelist of target links callable by the AI assistant.
10. **`Jey.com/app/lib/get-llm-context.ts`**: Core system knowledge base fed to Gemini 2.5 Flash and `/llms.txt`.
11. **`Jey.com/app/og/route.tsx`**: Social card dynamic generator branding (`yourdomain.com`, handle, subtitle).
12. **`Jey.com/app/blog/posts/*.mdx`**: Technical blog articles.
13. **`Jey.com/app/projects/content/*.mdx`**: Project case studies and tech stacks.
14. **`Jey.com/public/resume.pdf`**: PDF resume file.
15. **`Jey.com/app/icon.png` & `app/apple-icon.png`**: Profile avatar icons.

---

## 16. Questions or Unknowns Requiring Further Investigation

1. **Directory Consolidation Preference**:
   *Current state:* The project is nested inside `Jey.com/`.  
   *Question:* Should the inner files in `Jey.com/` be moved up to the root of `My-Portfolio/` so standard commands (`npm run dev`) work immediately from the root directory?
2. **AI Chat Assistant Retention**:
   *Current state:* Powered by Gemini 2.5 Flash via `@ai-sdk/google` and Upstash Redis.  
   *Question:* Does the user have a Google Gemini API key and Upstash Redis instance to power this feature, or should the chat bar be simplified or made optional if credentials are unavailable?
3. **Typography & Casing Preference**:
   *Current state:* The site enforces strict lowercase typography across the entire layout.  
   *Question:* Should the strict all-lowercase design language be preserved, or would standard sentence casing be preferred for engineering clarity?
4. **3D Gaussian Splat Workspace Desk**:
   *Current state:* Embeds an external 3D scan of Sagar's physical desk via SuperSplat.  
   *Question:* Should `/personal-desk` be replaced with a 3D component relevant to the new user, or retired in favor of traditional engineering case studies?
5. **Blog & Project Content Migration**:
   *Current state:* 26 blog posts and 24 projects written by Sagar Tamang.  
   *Question:* Does the user have existing articles/projects to migrate immediately, or should template starter items be prepared first?

