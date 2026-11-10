import React from "react"

export const BgLayer: React.FC<{ variant?: "default" | "paper" }> = ({ variant = "default" }) => (
  <div aria-hidden="true" className={`bg-layer bg-layer-${variant}`}>
    <span className="bg-orb bg-orb-one" />
    <span className="bg-orb bg-orb-two" />
    <span className="bg-orb bg-orb-three" />
    <span className="bg-noise" />
  </div>
)
