import { Projects } from "./projects"

const Builds = () => {
  return (
    <section id="engineering-projects">
      <div className="flex flex-col gap-figma-inside-gap">
        <h2 className="font-semibold italic text-base">
          Selected Engineering Projects
        </h2>
        <Projects limit={4} />
      </div>
    </section>
  )
}

export default Builds
