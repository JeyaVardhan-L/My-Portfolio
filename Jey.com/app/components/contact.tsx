import { PROFILE } from "app/data/profile"
import { HoverLinkPreview } from "./hover-link-preview"

const Contact = () => {
  return (
    <section id="contact">
      <div className="flex flex-col gap-figma-inside-gap">
        <h2 className="font-semibold italic text-base">
          Contact & Collaboration
        </h2>
        <p>
          interested in collaborating on systems programming, robotics, embedded telemetry, or autonomous navigation?
        </p>
        <p>
          connect directly through my verified engineering profile on{' '}
          <HoverLinkPreview
            href={PROFILE.githubUrl}
            previewImage="/app/icon.png"
            imageAlt="Jeya Vardhan GitHub"
            className="underline hover:decoration-muted-foreground underline-offset-4"
          >
            github.com/jeyavardhan-l
          </HoverLinkPreview>
          .
        </p>
        <p className="text-xs text-muted-foreground">
          all source code, issue discussions, and hardware schematics for my projects are hosted openly under permissive licenses on github.
        </p>
      </div>
    </section>
  )
}

export default Contact
