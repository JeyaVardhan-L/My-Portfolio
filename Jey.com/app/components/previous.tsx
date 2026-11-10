import { TIMELINE } from "app/data/experience"

const Previous = () => {
  return (
    <section id="engineering-disciplines">
      <div className="flex flex-col gap-figma-inside-gap">
        <h2 className="font-semibold italic text-base">
          Core Engineering Disciplines
        </h2>

        {TIMELINE.map((item, index) => (
          <div key={index} className="flex flex-col gap-1 border-l border-border pl-3 py-1">
            <div className="flex justify-between items-baseline">
              <h3 className="font-medium text-foreground tracking-tight">
                {item.title.toLowerCase()}
              </h3>
              <span className="text-xs text-muted-foreground tabular-nums">
                {item.period}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {item.organization} — {item.location}
            </p>
            <p className="text-sm text-neutral-300 mt-1">
              {item.description}
            </p>
            {item.highlights && (
              <ul className="list-disc pl-4 text-xs text-muted-foreground space-y-0.5 mt-1">
                {item.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Previous
