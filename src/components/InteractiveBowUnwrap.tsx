import React, { useEffect, useMemo, useRef, useState } from "react"
import { EtoileMark, EtoileWordmark } from "./EtoileLogo"
import bow01 from "../assets/bows/bow_01.png"
import bow02 from "../assets/bows/bow_02.png"
import bow03 from "../assets/bows/bow_03.png"
import bow04 from "../assets/bows/bow_04.png"
import bow05 from "../assets/bows/bow_05.png"
import bow06 from "../assets/bows/bow_06.png"
import bow07 from "../assets/bows/bow_07.png"
import bow08 from "../assets/bows/bow_08.png"

export type UnwrapState = "IDLE" | "DRAGGING" | "RETURNING" | "COMPLETING" | "REVEALING" | "HOME"

interface InteractiveBowUnwrapProps {
  onComplete: () => void
}

const FRAME_STOPS = [
  { file: "bow_01.png", src: bow01, at: 0.0 },
  { file: "bow_02.png", src: bow02, at: 0.14 },
  { file: "bow_03.png", src: bow03, at: 0.28 },
  { file: "bow_04.png", src: bow04, at: 0.42 },
  { file: "bow_05.png", src: bow05, at: 0.57 },
  { file: "bow_06.png", src: bow06, at: 0.71 },
  { file: "bow_07.png", src: bow07, at: 0.85 },
  { file: "bow_08.png", src: bow08, at: 1.0 },
] as const

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

export const InteractiveBowUnwrap: React.FC<InteractiveBowUnwrapProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<UnwrapState>("IDLE")
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)
  const [missingFiles, setMissingFiles] = useState<string[]>([])

  const startYRef = useRef(0)
  const startProgressRef = useRef(0)
  const targetProgressRef = useRef(0)
  const renderedProgressRef = useRef(0)
  const dragRafRef = useRef<number | null>(null)
  const releaseRafRef = useRef<number | null>(null)
  const holdTimerRef = useRef<number | null>(null)
  const revealTimerRef = useRef<number | null>(null)

  useEffect(() => {
    let cancelled = false
    const promises = FRAME_STOPS.map((frame) => {
      return new Promise<{ file: string; ok: boolean }>((resolve) => {
        const img = new Image()
        img.onload = () => resolve({ file: frame.file, ok: img.naturalWidth > 0 })
        img.onerror = () => {
          const fallback = new Image()
          fallback.onload = () => resolve({ file: frame.file, ok: fallback.naturalWidth > 0 })
          fallback.onerror = () => resolve({ file: frame.file, ok: false })
          fallback.src = `/images/${frame.file}`
        }
        img.src = frame.src
        if (img.complete && img.naturalWidth > 0) {
          resolve({ file: frame.file, ok: true })
        }
      })
    })

    Promise.all(promises).then((results) => {
      if (cancelled) return
      const missing = results.filter((item) => !item.ok).map((item) => item.file)
      setMissingFiles(missing)
      setReady(missing.length === 0)
    })

    return () => {
      cancelled = true
      if (dragRafRef.current) cancelAnimationFrame(dragRafRef.current)
      if (releaseRafRef.current) cancelAnimationFrame(releaseRafRef.current)
      if (holdTimerRef.current) window.clearTimeout(holdTimerRef.current)
      if (revealTimerRef.current) window.clearTimeout(revealTimerRef.current)
    }
  }, [])

  const syncProgressWithRaf = (next: number) => {
    targetProgressRef.current = clamp(next, 0, 1)
    if (dragRafRef.current !== null) return
    dragRafRef.current = requestAnimationFrame(() => {
      dragRafRef.current = null
      renderedProgressRef.current = targetProgressRef.current
      setProgress(renderedProgressRef.current)
    })
  }

  const animateProgressTo = (target: 0 | 1, nextPhase: "RETURNING" | "COMPLETING") => {
    if (releaseRafRef.current) cancelAnimationFrame(releaseRafRef.current)
    setPhase(nextPhase)
    const from = renderedProgressRef.current
    const distance = Math.abs(target - from)
    const duration = target === 1 ? Math.max(220, distance * 420) : Math.max(240, distance * 380)
    const startTime = performance.now()

    const step = (now: number) => {
      const t = clamp((now - startTime) / duration, 0, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      const value = clamp(from + (target - from) * eased, 0, 1)
      renderedProgressRef.current = value
      targetProgressRef.current = value
      setProgress(value)

      if (t < 1) {
        releaseRafRef.current = requestAnimationFrame(step)
        return
      }

      releaseRafRef.current = null
      if (target === 0) {
        setPhase("IDLE")
      } else {
        holdTimerRef.current = window.setTimeout(() => {
          setPhase("REVEALING")
          revealTimerRef.current = window.setTimeout(() => {
            setPhase("HOME")
            onComplete()
          }, 700)
        }, 250)
      }
    }

    releaseRafRef.current = requestAnimationFrame(step)
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!ready || (phase !== "IDLE" && phase !== "RETURNING")) return
    if (releaseRafRef.current) {
      cancelAnimationFrame(releaseRafRef.current)
      releaseRafRef.current = null
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    startYRef.current = event.clientY
    startProgressRef.current = renderedProgressRef.current
    setPhase("DRAGGING")
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (phase !== "DRAGGING") return
    const deltaY = event.clientY - startYRef.current
    const nextProgress = clamp(startProgressRef.current + deltaY / 280, 0, 1)
    syncProgressWithRaf(nextProgress)
  }

  const finishPointerGesture = () => {
    if (phase !== "DRAGGING") return
    if (renderedProgressRef.current >= 0.65) {
      animateProgressTo(1, "COMPLETING")
    } else {
      animateProgressTo(0, "RETURNING")
    }
  }

  const blend = useMemo(() => {
    let lowerIndex = 0
    for (let i = 0; i < FRAME_STOPS.length - 1; i += 1) {
      if (progress >= FRAME_STOPS[i].at) lowerIndex = i
    }
    const upperIndex = Math.min(FRAME_STOPS.length - 1, lowerIndex + 1)
    const lower = FRAME_STOPS[lowerIndex]
    const upper = FRAME_STOPS[upperIndex]
    const span = Math.max(0.0001, upper.at - lower.at)
    const rawT = clamp((progress - lower.at) / span, 0, 1)
    const smoothT = rawT * rawT * (3 - 2 * rawT)
    const sharpenedT = clamp((smoothT - 0.12) / 0.76, 0, 1)
    return { lowerIndex, upperIndex, upperOpacity: lowerIndex === upperIndex ? 0 : sharpenedT }
  }, [progress])

  if (phase === "HOME") return null

  const hitDisabled = !ready || phase === "COMPLETING" || phase === "REVEALING"

  return (<div className={`unwrap-overlay ${phase === "REVEALING" ? "unwrap-overlay-revealing" : ""}`}>
   
{/* Floating crystal decorations — non-interactive */}
<svg
  aria-hidden="true"
  viewBox="0 0 400 850"
  preserveAspectRatio="xMidYMid meet"
  className="absolute inset-0 h-full w-full pointer-events-none"
  style={{ zIndex: 3 }}
>
  <defs>
    <linearGradient id="crystalSilver" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#FFFFFF" />
      <stop offset="35%" stopColor="#DCE2E9" />
      <stop offset="65%" stopColor="#AAB7C8" />
      <stop offset="100%" stopColor="#F9FAFF" />
    </linearGradient>
    <linearGradient id="crystalPink" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#FFF0F5" />
      <stop offset="45%" stopColor="#E7A9BD" />
      <stop offset="100%" stopColor="#BD788E" />
    </linearGradient>
    <filter id="crystalShadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="1" dy="3" stdDeviation="2" floodColor="#8C7580" floodOpacity=".22" />
    </filter>
  </defs>

  {/* Upper-left clear gemstone */}
  <g transform="translate(55 310) rotate(-16)" filter="url(#crystalShadow)">
    <path d="M0 -20 L23 -12 L27 12 L0 23 L-25 10 L-20 -13 Z"
      fill="url(#crystalSilver)" stroke="#FFFFFF" strokeWidth="1.5" />
    <path d="M0 -20 L0 23 M-25 10 L23 -12 M-20 -13 L27 12"
      stroke="#FFFFFF" strokeWidth="1.5" opacity=".8" />
    <path d="M0 -20 L23 -12 L0 4 Z" fill="#FFFFFF" opacity=".7" />
  </g>

  {/* Upper-right pink heart crystal */}
  <g transform="translate(334 340)" filter="url(#crystalShadow)">
    <path d="M0 23 C-40 -3 -24 -29 -8 -23 C0 -20 0 -13 0 -13
      C13 -34 42 -17 25 4 Z"
      fill="url(#crystalPink)" stroke="#FFEAF0" strokeWidth="2" />
    <path d="M0 -13 L-10 1 L0 23 L14 0 Z"
      fill="#FFF5F8" opacity=".65" />
    <path d="M-23 -13 L-10 1 L0 -13 L14 0 L26 -12"
      fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity=".8" />
  </g>

  {/* Lower-left silver crystal star */}
  <g transform="translate(53 607) rotate(13)" filter="url(#crystalShadow)">
    <path d="M0 -31 L9 -10 L31 0 L9 10 L0 31 L-9 10 L-31 0 L-9 -10 Z"
      fill="url(#crystalSilver)" stroke="#FFFFFF" strokeWidth="1.5" />
    <path d="M0 -31 L0 31 M-31 0 L31 0"
      stroke="#FFFFFF" strokeWidth="1.8" />
    <path d="M0 0 L-9 -10 L0 -31 Z" fill="#FFFFFF" opacity=".85" />
    <path d="M0 0 L31 0 L9 10 Z" fill="#8395AE" opacity=".55" />
  </g>

  {/* Lower-right pink gemstone */}
  <g transform="translate(342 660) rotate(20)" filter="url(#crystalShadow)">
    <path d="M0 -19 L17 -11 L22 9 L0 24 L-21 9 L-17 -12 Z"
      fill="url(#crystalPink)" stroke="#FFF4F8" strokeWidth="1.5" />
    <path d="M0 -19 L0 24 M-21 9 L17 -11 M-17 -12 L22 9"
      stroke="#FFFFFF" strokeWidth="1.2" opacity=".75" />
    <path d="M0 -19 L17 -11 L0 5 Z" fill="#FFFFFF" opacity=".6" />
  </g>

  {/* Tiny sparkle accents */}
  {[
    [104, 354], [298, 420], [89, 690], [310, 718]
  ].map(([x, y], i) => (
    <g key={i} transform={`translate(${x} ${y})`}>
      <path d="M0 -9 Q1 0 9 0 Q1 1 0 9 Q-1 1 -9 0 Q-1 -1 0 -9"
        fill={i % 2 ? "#D8A6B6" : "#A8B5C8"} opacity=".8" />
    </g>
  ))}
</svg>

      <div className="relative z-20 pt-[68px] flex flex-col items-center text-center pointer-events-none">
        <EtoileMark size="md" showStar />
        <div className="mt-2">
          <EtoileWordmark size="md" />
        </div>
       <div className="mt-3 flex flex-col items-center gap-1.5">
  <span
    className="text-[13px] tracking-[0.06em] text-[#79707B]"
    style={{ fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif" }}
  >
    Little Accessories, Daily Magic.
  </span>
  <span className="text-[12px] tracking-[0.12em] text-[#9C9295]">
    芭蕾风发饰
  </span>
</div>
      </div>

      <div className={`unwrap-stage ${phase === "REVEALING" ? "unwrap-stage-exit" : ""}`}>
        <div className="unwrap-frame-stack">
          {FRAME_STOPS.map((frame, index) => {
            const isLower = index === blend.lowerIndex
            const isUpper = index === blend.upperIndex && blend.upperIndex !== blend.lowerIndex
            const opacity = isUpper ? blend.upperOpacity : isLower ? 1 : 0
            return (
              <img
                key={frame.file}
                src={frame.src}
                alt={index === 0 ? "ÉTOILE 缎面蝴蝶结" : ""}
                aria-hidden={index !== 0}
                draggable={false}
                className="unwrap-frame-img"
                style={{ opacity, visibility: opacity > 0.001 ? "visible" : "hidden" }}
              />
            )
          })}

          {!hitDisabled && (
            <div
              role="slider"
              aria-label="向下拖动右侧缎带尾端解开蝴蝶结"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress * 100)}
              className="unwrap-tail-hit"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={finishPointerGesture}
              onPointerCancel={finishPointerGesture}
            />
          )}
        </div>
      </div>

      {missingFiles.length > 0 && (
        <div className="unwrap-missing-banner" role="status">
          缺少序列帧素材：{missingFiles.join(", ")}
        </div>
      )}

      {missingFiles.length === 0 && (
        <div className={`splash-instruction ${progress > 0.06 ? "splash-instruction-muted" : ""}`}>
          向下轻拉右侧丝带 · 开启礼盒
          <span>↓</span>
        </div>
      )}
    </div>
  )
}
