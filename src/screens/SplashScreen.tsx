import React from "react"
import { InteractiveBowUnwrap } from "../components/InteractiveBowUnwrap"

interface SplashScreenProps {
  onReveal: () => void
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onReveal }) => {
  return <InteractiveBowUnwrap onComplete={onReveal} />
}
