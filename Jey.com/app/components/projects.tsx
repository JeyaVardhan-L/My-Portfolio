import Link from 'next/link'
import Image from 'next/image'
import { formatDate, getProjects } from 'app/projects/utils'
import BoxedText from './boxed-text'
import { HoverPreviewLink } from './hover-link-preview'

type ProjectsProps = {
  limit?: number
}

function TypographicThumbnail({ title, tech }: { title: string; tech?: string }) {
  const primaryTech = tech?.split(',')[0]?.trim() || 'SYSTEM'
  return (
    <div className="w-full h-full flex flex-col justify-between p-3 bg-neutral-950 font-mono select-none">
      <div className="flex items-center justify-between text-[10px] text-muted-foreground border-b border-border/60 pb-1">
        <span>ARCH://BUILD</span>
        <span className="text-accent-foreground font-semibold">{primaryTech}</span>
      </div>
      <div className="text-xs text-neutral-300 font-medium line-clamp-2 leading-snug">
        {title}
      </div>
      <div className="text-[9px] text-neutral-500 tracking-wider">
        VERIFIED_BUILD
      </div>
    </div>
  )
}

export function Projects({ limit }: ProjectsProps) {
  let allProjects = getProjects()

  let sortedProjects = allProjects.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1
    }
    return 1
  })

  let displayedProjects = limit ? sortedProjects.slice(0, limit) : sortedProjects

  return (
    <div className="flex flex-col gap-6">
      {displayedProjects.map((project) => {
        const techStack = project.metadata.tech
          ? project.metadata.tech.split(',').map((t) => t.trim())
          : []

        const rowClassName = "group flex flex-col md:flex-row md:gap-4 items-start pb-4 border-b border-border/40 last:border-b-0"
        
        const rowContent = (
          <>
            <div className="w-full md:w-44 shrink-0 relative aspect-video md:aspect-[4/3] rounded-lg overflow-hidden bg-secondary border border-border">
              {project.metadata.image ? (
                <Image
                  src={project.metadata.image}
                  alt={project.metadata.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 200px"
                />
              ) : (
                <TypographicThumbnail title={project.metadata.title} tech={project.metadata.tech} />
              )}
            </div>

            <div className="flex flex-col flex-1 min-w-0 mt-3 md:mt-0">
              <div className="flex justify-between items-baseline mb-1">
                <h2 className="font-semibold tracking-tight text-foreground underline hover:decoration-muted-foreground underline-offset-4 text-sm md:text-base">
                  {project.metadata.title}
                </h2>
                <p className="text-muted-foreground tabular-nums shrink-0 ml-4 text-xs">
                  {formatDate(project.metadata.publishedAt, false)}
                </p>
              </div>

              <p className="text-muted-foreground text-xs md:text-sm line-clamp-2 mb-2 leading-relaxed">
                {project.metadata.summary}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-auto">
                {techStack.map((tech) => (
                  <BoxedText key={tech} text={tech} />
                ))}
              </div>
            </div>
          </>
        )

        if (!project.metadata.image) {
          return (
            <Link key={project.slug} className={rowClassName} href={`/projects/${project.slug}`}>
              {rowContent}
            </Link>
          )
        }

        return (
          <HoverPreviewLink
            key={project.slug}
            className={rowClassName}
            href={`/projects/${project.slug}`}
            preview={
              <Image
                src={project.metadata.image}
                alt={project.metadata.title}
                width={192}
                height={112}
                draggable={false}
                className="w-48 h-28 object-cover rounded-md"
              />
            }
          >
            {rowContent}
          </HoverPreviewLink>
        )
      })}

      {limit && (
        <Link
          href="/projects"
          className="inline-flex items-center underline hover:decoration-muted-foreground underline-offset-4 text-xs text-muted-foreground hover:text-foreground mt-2"
        >
          view all {allProjects.length} engineering projects →
        </Link>
      )}
    </div>
  )
}
