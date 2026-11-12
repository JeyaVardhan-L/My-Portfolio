import BoxedText from "./boxed-text"
import { PROFILE } from "app/data/profile"

const DISCIPLINES = [
  'systems',
  'robotics',
  'embedded',
  'computer vision',
  'xr simulation',
  'software',
]

const MainHeader = () => {
  return (
    <section>
      <div className="flex flex-col gap-figma-inside-gap"> 
        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3 sm:gap-4">
          <div className="flex flex-col gap-figma-inside-gap min-w-0 flex-1">
            <h1 className="font-semibold italic text-lg md:text-xl">
              {PROFILE.name.toLowerCase()} ~ <span className="text-xs inline-flex align-bottom leading-4 font-normal not-italic text-muted-foreground">{PROFILE.nativeScript}</span>
            </h1>
            <div className="flex flex-wrap items-center gap-1.5 self-start">
              {DISCIPLINES.map((discipline) => (
                <BoxedText key={discipline} text={discipline} />
              ))}
            </div>
            <p className="italic text-muted-foreground text-xs sm:text-sm">
              building <span className="text-foreground not-italic font-medium">real systems</span> across <span className="text-foreground underline decoration-muted-foreground underline-offset-4">software & hardware</span>
            </p>
            <p className="sr-only">
              @{PROFILE.handle} — {PROFILE.headline}
            </p>
          </div>
          <div className="text-left sm:text-right shrink-0">
            <p className="font-normal italic text-xs text-muted-foreground">
              {PROFILE.locationNative}
            </p>
            <p className="font-normal italic text-xs sm:text-sm">
              {PROFILE.location}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MainHeader
