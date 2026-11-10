import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { CustomMDX } from 'app/components/mdx'
import { formatDate } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'
import { getProjects } from '../utils'
import BoxedText from 'app/components/boxed-text'
import { PROFILE } from 'app/data/profile'

export async function generateStaticParams() {
  let posts = getProjects()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let post = getProjects().find((post) => post.slug === slug)
  if (!post) return

  let { title, publishedAt, summary, image } = post.metadata
  let ogImage = image ? image : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title: `${title} | ${PROFILE.name}`,
    description: summary,
    openGraph: {
      title,
      description: summary,
      type: 'article',
      publishedTime: publishedAt,
      url: `${baseUrl}/projects/${post.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: summary,
      images: [ogImage],
    },
  }
}

export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let post = getProjects().find((post) => post.slug === slug)

  if (!post) notFound()

  const techStack = post.metadata.tech 
    ? post.metadata.tech.split(',').map((t) => t.trim()) 
    : []

  return (
    <section className="flex flex-col gap-figma-inside-gap">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareSourceCode',
            name: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            author: {
              '@type': 'Person',
              name: PROFILE.name,
              url: baseUrl,
            },
          }),
        }}
      />

      <Link
        href="/projects"
        className="text-xs text-muted-foreground hover:text-foreground transition-colors mb-2 inline-flex items-center gap-1"
      >
        ← back to projects
      </Link>
      
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      
      <div className="flex justify-between items-center mt-1">
        <p className="text-xs text-muted-foreground tabular-nums">
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div>

      {post.metadata.image && (
        <div className="my-2">
           <Image 
             src={post.metadata.image} 
             alt={post.metadata.title} 
             width={800} 
             height={450} 
             className="rounded-lg border border-border w-full object-cover max-h-[380px]"
           />
        </div>
      )}

      {techStack.length > 0 && (
        <div className="flex flex-wrap gap-1.5 my-2">
          {techStack.map((tech) => (
            <BoxedText key={tech} text={tech} />
          ))}
        </div>
      )}

      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  )
}
