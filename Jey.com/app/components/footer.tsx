import type * as React from 'react';
import { SiGithub } from 'react-icons/si';
import { PROFILE } from 'app/data/profile';

function RssIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" {...props}>
      <path d="M4 11a9 9 0 0 1 9 9" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' }} />
      <path d="M4 4a16 16 0 0 1 16 16" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' }} />
      <circle cx="5" cy="19" r="1" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="mt-16 pt-8 border-t border-border/40">
      <ul className="flex flex-row space-x-4 items-center">
        <li>
          <a
            className="flex items-center gap-1.5 transition-all text-muted-foreground hover:text-foreground text-xs"
            rel="noopener"
            target="_blank"
            href={PROFILE.githubUrl}
            aria-label="GitHub Profile"
          >
            <SiGithub className="w-4 h-4" aria-hidden="true" focusable="false" />
            <span>github</span>
          </a>
        </li>
        <li>
          <a
            className="flex items-center gap-1.5 transition-all text-muted-foreground hover:text-foreground text-xs"
            href="/rss"
            aria-label="RSS Feed"
          >
            <RssIcon aria-hidden="true" focusable="false" />
            <span>rss</span>
          </a>
        </li>
      </ul>
      <p className="mt-6 text-muted-foreground text-xs leading-relaxed">
        © {new Date().getFullYear()} {PROFILE.name}. Built with Next.js, React 19 & Tailwind CSS. Theme adapted from open-source MIT portfolio template by Sagar Tamang; re-architected and personalized by {PROFILE.name}.
      </p>
    </footer>
  )
}
