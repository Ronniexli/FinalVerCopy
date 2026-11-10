import React from "react"

interface FilmGrainOverlayProps {
  opacity?: number // default 0.08 (8%)
  className?: string
}

export const FilmGrainOverlay: React.FC<FilmGrainOverlayProps> = ({
  opacity = 0.08,
  className = "",
}) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-30 select-none overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="vhs-film-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.82"
            numOctaves="4"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            type="matrix"
            values="0.33 0.33 0.33 0 0
                    0.33 0.33 0.33 0 0
                    0.33 0.33 0.33 0 0
                    0 0 0 1 0"
            in="noise"
            result="monochrome"
          />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#vhs-film-grain)"
          fill="#808080"
          style={{ mixBlendMode: "overlay" }}
        />
      </svg>
    </div>
  )
}
