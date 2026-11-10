import { BlogPosts } from 'app/components/posts'
import { PROFILE } from 'app/data/profile'

export const metadata = {
  title: `Engineering Notes & Writings | ${PROFILE.name}`,
  description: `Technical deep dives, systems programming observations, hardware build logs, and robotics notes by ${PROFILE.name}.`,
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold mb-2 text-xl tracking-tight">Writings & Technical Logs</h1>
      <p className="text-muted-foreground text-sm mb-8">
        Reflections, hardware build logs, and engineering breakdowns across software and systems.
      </p>
      <BlogPosts />
    </section>
  )
}
