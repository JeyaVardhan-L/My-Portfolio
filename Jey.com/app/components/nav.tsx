import Link from 'next/link'

const navItems = {
  '/': {
    name: 'home',
  },
  '/projects': {
    name: 'projects',
  },
  '/blog': {
    name: 'blog',
  },
}

export function Navbar() {
  return (
    <aside className="mb-10 tracking-tight">
      <nav
        className="flex flex-row items-center justify-between pb-2 border-b border-border/50 text-xs md:text-sm"
        id="nav"
      >
        <div className="flex flex-row space-x-2">
          {Object.entries(navItems).map(([path, { name }]) => {
            return (
              <Link
                key={path}
                href={path}
                className="transition-all text-muted-foreground hover:text-foreground py-1 px-2 rounded-sm hover:bg-secondary/40"
              >
                {name}
              </Link>
            )
          })}
        </div>
        <a
          href="https://github.com/JeyaVardhan-L"
          target="_blank"
          rel="noopener"
          className="text-muted-foreground hover:text-foreground py-1 px-2 text-xs transition-colors"
        >
          github ↗
        </a>
      </nav>
    </aside>
  )
}

export default Navbar
