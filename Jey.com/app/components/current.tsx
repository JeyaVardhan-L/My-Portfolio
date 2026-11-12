import { HoverLinkPreview } from "./hover-link-preview"
import { PROFILE } from "app/data/profile"

const Current = () => {
  return (
    <section>
      <div className="flex flex-col gap-figma-inside-gap">
        <h2 className="font-semibold italic text-base">
          About & Engineering Focus
        </h2>
        <p className="leading-relaxed">
          systems and software developer building inspectable tools and autonomous platforms from first principles. my focus sits at the boundary where computation meets physical systems—engineering unix process pipelines in c, bare-metal firmware on stm32, and real-time computer vision models.
        </p>
        <p className="leading-relaxed">
          on{' '}
          <HoverLinkPreview
            href={PROFILE.githubUrl}
            previewImage="/projects/forgeshell-terminal.png"
            imageAlt="Jeya Vardhan Engineering Projects"
            className="underline hover:decoration-muted-foreground underline-offset-4"
          >
            github.com/jeyavardhan-l
          </HoverLinkPreview>
          , i document and release systems code where execution constraints, memory safety, and sensor deadlines matter—from evaluating 3d lidar odometry under 10hz physical cycles to streaming live spatial attitude over serial into the browser.
        </p>
      </div>
    </section>
  )
}

export default Current
