import { Projects } from 'app/components/projects'
import { PROFILE } from 'app/data/profile'

export const metadata = {
  title: `Engineering Projects | ${PROFILE.name}`,
  description: `Explore engineering systems built by ${PROFILE.name} — low-level C shells, autonomous navigation pipelines, STM32 telemetry, computer vision models, and OpenXR simulations.`,
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold mb-2 text-xl tracking-tight">Engineering Projects</h1>
      <p className="text-muted-foreground text-sm mb-8">
        Inspectable hardware and software systems built from first principles across systems programming, robotics, embedded telemetry, and spatial computing.
      </p>
      <Projects />
    </section>
  )
}
