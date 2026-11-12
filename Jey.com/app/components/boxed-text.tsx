type BoxedTextProps = {
  text: string
  className?: string
}

const BoxedText = ({ text, className = '' }: BoxedTextProps) => {
  return (
    <span
      className={`inline-flex items-center justify-center font-sans not-italic text-[11px] border border-border/80 bg-secondary/50 text-neutral-300 rounded px-1.5 py-0.5 tracking-tight ${className}`}
    >
      {text}
    </span>
  )
}

export default BoxedText
