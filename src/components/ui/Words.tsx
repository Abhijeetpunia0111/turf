/**
 * Splits a string into words, each inside a mask, so a section can slide them up with GSAP
 * (`[data-w]` is the moving part). At rest the words are simply in place.
 */
export function Words({ children, className = '' }: { children: string; className?: string }) {
  const words = children.split(' ')
  return (
    <>
      {words.map((w, i) => (
        <span key={i}>
          <span className={`inline-block overflow-hidden pb-[0.14em] pr-[0.08em] align-bottom -mb-[0.14em] -mr-[0.08em] ${className}`}>
            <span data-w className="inline-block will-change-transform">
              {w}
            </span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </>
  )
}
