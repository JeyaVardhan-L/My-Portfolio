# CONTENT TODO: ITEMS REQUIRING USER INPUT

**Target Owner:** Jeya Vardhan (`@JeyaVardhan-L`)  
**Status:** Website is 100% production-ready and functional with verified data. The following optional personal channels can be connected at any time.

---

## 1. Custom Domain Configuration
- **Current State:** The portfolio uses a placeholder domain `https://jeyavardhan.dev` across canonical metadata, RSS, sitemap, and Open Graph cards.
- **Action Required:**
  1. Once you purchase or configure your custom domain (e.g. `jeyavardhan.com` or `jeyavardhan.in`), open `Jey.com/.env.local`.
  2. Set:
     ```bash
     NEXT_PUBLIC_SITE_URL=https://your-custom-domain.com
     ```
  3. The sitemap, robots, dynamic OG images, and canonical tags will automatically use your custom domain without touching application code.

---

## 2. Contact & Professional Social Profiles
- **Current State:** Only your verified **GitHub profile** (`https://github.com/JeyaVardhan-L`) and **RSS feed** (`/rss`) are currently published in the footer and contact sections to avoid publishing unverified or broken links.
- **Action Required:**
  1. If you have a professional LinkedIn profile, personal email address, or X (Twitter) account you wish to display publicly, open:
     `Jey.com/app/data/social-links.ts`
  2. Uncomment or add your links and set `verified: true`:
     ```typescript
     {
       name: 'linkedin',
       url: 'https://www.linkedin.com/in/your-profile/',
       label: 'LinkedIn Profile',
       verified: true,
     },
     {
       name: 'email',
       url: 'mailto:your-email@domain.com',
       label: 'Email',
       verified: true,
     }
     ```
  3. They will immediately render in the footer and contact sections.

---

## 3. Resume PDF File
- **Current State:** The original author's resume was completely removed from `public/resume.pdf` during the audit. The contact section currently points directly to your open GitHub profile.
- **Action Required:**
  1. Export your personalized engineering resume as a PDF.
  2. Save it to:
     `Jey.com/public/resume.pdf`
  3. In `Jey.com/app/components/contact.tsx`, you can add a direct link:
     ```tsx
     <a href="/resume.pdf" target="_blank" className="underline hover:decoration-muted-foreground underline-offset-4">
       download my resume
     </a>
     ```

---

## 4. Technical Writings & Blog Articles
- **Current State:** All 26 of the original owner's blog posts were deleted. The blog page `/blog` displays a clean empty state: *"No writings published yet. Technical deep-dives, hardware build logs, and systems engineering notes will be published here as projects evolve."*
- **Action Required:**
  1. Whenever you write an engineering article or build log, create a new Markdown file inside:
     `Jey.com/app/blog/posts/your-article-slug.mdx`
  2. Add frontmatter at the top:
     ```markdown
     ---
     title: 'Building a Resource-Aware Shell in C'
     publishedAt: '2026-11-15'
     summary: 'How I implemented POSIX job control, process group isolation, and /proc memory tracking in ForgeShell.'
     ---

     Your markdown content here...
     ```
  3. Next.js will automatically generate the route `/blog/your-article-slug`, create dynamic social cards, and include it in your RSS feed and XML sitemap.

---

## 5. AI Chat Assistant API Keys (Optional)
- **Current State:** The homepage AI chat assistant operates safely with zero crash risk. If no API key is provided, it displays a helpful message directing visitors to your verified GitHub projects.
- **Action Required:**
  1. If you want the live interactive Gemini AI assistant enabled on your homepage:
     - Generate a free Gemini API key from [Google AI Studio](https://aistudio.google.com/).
     - (Optional) Create a free Redis rate limiter at [Upstash Console](https://console.upstash.com/redis).
  2. Add them to `Jey.com/.env.local`:
     ```bash
     GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
     UPSTASH_REDIS_REST_URL=your_upstash_rest_url_here
     UPSTASH_REDIS_REST_TOKEN=your_upstash_rest_token_here
     ```

