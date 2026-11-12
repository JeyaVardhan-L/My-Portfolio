import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import { HoverPreviewLink } from './hover-link-preview'
import { WritingPreviewCard } from './writing-preview-card'
import BoxedText from './boxed-text'

type BlogPostsProps = {
  limit?: number
}

export function BlogPosts({ limit }: BlogPostsProps) {
  let allBlogs = getBlogPosts()

  let sortedBlogs = allBlogs.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1
    }
    return 1
  })

  const showViewAll = limit && allBlogs.length > limit
  let displayedBlogs = limit ? sortedBlogs.slice(0, limit) : sortedBlogs

  if (displayedBlogs.length === 0) {
    return (
      <div className="border border-border rounded-md p-4 bg-primary/30 text-muted-foreground text-xs leading-relaxed">
        no writings published yet. technical deep-dives, hardware build logs, and systems engineering notes will be published here as projects evolve.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {displayedBlogs.map((post) => (
        <article
          key={post.slug}
          className="pb-5 border-b border-border/40 last:border-b-0 flex flex-col gap-2"
        >
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {post.metadata.category && (
              <BoxedText text={post.metadata.category} />
            )}
            <span className="tabular-nums">
              {formatDate(post.metadata.publishedAt, false)}
            </span>
            {post.metadata.readTime && (
              <>
                <span className="text-muted-foreground/60">•</span>
                <span>{post.metadata.readTime}</span>
              </>
            )}
          </div>

          <HoverPreviewLink
            className="group inline-block"
            href={`/blog/${post.slug}`}
            preview={
              <WritingPreviewCard
                title={post.metadata.title}
                date={formatDate(post.metadata.publishedAt, false)}
                slug={post.slug}
              />
            }
          >
            <h2 className="text-foreground tracking-tight text-sm md:text-base font-medium underline hover:decoration-muted-foreground underline-offset-4 leading-snug">
              {post.metadata.title}
            </h2>
          </HoverPreviewLink>

          {post.metadata.summary && (
            <p className="text-muted-foreground text-xs md:text-sm line-clamp-2 leading-relaxed">
              {post.metadata.summary}
            </p>
          )}
        </article>
      ))}

      {showViewAll && (
        <Link
          href="/blog"
          className="inline-flex items-center underline hover:decoration-muted-foreground underline-offset-4 text-xs text-muted-foreground hover:text-foreground pt-1"
        >
          read all {allBlogs.length} engineering writings →
        </Link>
      )}
    </div>
  )
}
