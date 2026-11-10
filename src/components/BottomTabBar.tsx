import React, { useEffect, useRef, useState } from "react"
import { MainTabId } from "../types"
import { Sparkles, Grid, ReceiptText, User } from "lucide-react"

interface BottomTabBarProps {
  activeTab: MainTabId
  onTabChange: (tab: MainTabId) => void
  unpaidOrdersCount?: number
}

const TABS = [
  { id: "home" as MainTabId, name: "首页", icon: Sparkles },
  { id: "shop" as MainTabId, name: "选购", icon: Grid },
  { id: "orders" as MainTabId, name: "订单", icon: ReceiptText },
  { id: "me" as MainTabId, name: "我的", icon: User },
]

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onTabChange,
  unpaidOrdersCount = 0,
}) => {
  const activeIndex = Math.max(0, TABS.findIndex((tab) => tab.id === activeTab))
  const navRef = useRef<HTMLElement | null>(null)
  const positionRef = useRef(activeIndex)
  const velocityRef = useRef(0)
  const targetRef = useRef(activeIndex)
  const animationRef = useRef<number | null>(null)
  const gestureRef = useRef<{
    pointerId: number
    startX: number
    startIndex: number
    dragged: boolean
  } | null>(null)
  const suppressClickRef = useRef(false)
  const [position, setPosition] = useState(activeIndex)
  const [velocity, setVelocity] = useState(0)
  const [pressed, setPressed] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReduceMotion(query.matches)
    sync()
    query.addEventListener?.("change", sync)
    return () => query.removeEventListener?.("change", sync)
  }, [])

  const stopAnimation = () => {
    if (animationRef.current !== null) cancelAnimationFrame(animationRef.current)
    animationRef.current = null
  }

  const animateTo = (nextIndex: number) => {
    targetRef.current = nextIndex
    stopAnimation()
    if (reduceMotion) {
      positionRef.current = nextIndex
      velocityRef.current = 0
      setPosition(nextIndex)
      setVelocity(0)
      return
    }

    let lastTime = performance.now()
    const step = (now: number) => {
      const dt = Math.min(2, (now - lastTime) / 16.667 || 1)
      lastTime = now
      const displacement = targetRef.current - positionRef.current
      // A damped spring: fast enough for navigation, but with soft settling.
      velocityRef.current += displacement * 0.16 * dt
      velocityRef.current *= Math.pow(0.74, dt)
      positionRef.current += velocityRef.current * dt
      setPosition(positionRef.current)
      setVelocity(velocityRef.current)

      if (Math.abs(displacement) < 0.003 && Math.abs(velocityRef.current) < 0.003) {
        positionRef.current = targetRef.current
        velocityRef.current = 0
        setPosition(targetRef.current)
        setVelocity(0)
        animationRef.current = null
      } else {
        animationRef.current = requestAnimationFrame(step)
      }
    }
    animationRef.current = requestAnimationFrame(step)
  }

  useEffect(() => {
    if (!gestureRef.current) animateTo(activeIndex)
    return () => stopAnimation()
    // Sync animation with the parent's real selected tab.
  }, [activeIndex, reduceMotion])

  const getTabWidth = () => {
    const rect = navRef.current?.getBoundingClientRect()
    return rect ? Math.max(1, (rect.width - 12) / TABS.length) : 1
  }

  const onPointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return
    const rect = navRef.current?.getBoundingClientRect()
    if (!rect) return
    stopAnimation()
    const startIndex = clamp(Math.floor((event.clientX - rect.left - 6) / getTabWidth()), 0, 3)
    gestureRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startIndex,
      dragged: false,
    }
    setPressed(true)
    setDragging(false)
  }

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const gesture = gestureRef.current
    if (!gesture || gesture.pointerId !== event.pointerId) return
    const delta = event.clientX - gesture.startX
    if (!gesture.dragged && Math.abs(delta) > 7) {
      gesture.dragged = true
      navRef.current?.setPointerCapture(event.pointerId)
      setDragging(true)
    }
    if (!gesture.dragged) return
    const nextPosition = clamp(gesture.startIndex + delta / getTabWidth(), 0, 3)
    velocityRef.current = nextPosition - positionRef.current
    positionRef.current = nextPosition
    setPosition(nextPosition)
    setVelocity(velocityRef.current)
  }

  const finishGesture = (event: React.PointerEvent<HTMLElement>, cancelled = false) => {
    const gesture = gestureRef.current
    if (!gesture || gesture.pointerId !== event.pointerId) return
    gestureRef.current = null
    setPressed(false)
    setDragging(false)
    if (navRef.current?.hasPointerCapture(event.pointerId)) {
      navRef.current.releasePointerCapture(event.pointerId)
    }
    if (gesture.dragged && !cancelled) {
      suppressClickRef.current = true
      const selected = clamp(Math.round(positionRef.current), 0, 3)
      animateTo(selected)
      if (TABS[selected].id !== activeTab) onTabChange(TABS[selected].id)
      // The click synthesized after the pointer release must not navigate twice.
      window.setTimeout(() => { suppressClickRef.current = false }, 0)
    } else {
      animateTo(activeIndex)
    }
  }

  const stretch = reduceMotion ? 1 : pressed
    ? 1.15 + Math.min(Math.abs(velocity) * 0.12, 0.13)
    : 1 + Math.min(Math.abs(velocity) * 0.38, 0.23)
  const verticalScale = reduceMotion ? 1 : pressed ? 1.08 : 1

  return (
    <div className="pointer-events-none absolute bottom-4 left-4 right-4 z-30 flex justify-center select-none">
      <nav
        ref={navRef}
        className="pointer-events-auto relative w-full h-[68px] p-1.5 rounded-full border border-white/80 bg-[#F8F6F2]/30 backdrop-blur-2xl shadow-[0_14px_36px_rgba(64,59,66,0.14),inset_0_1px_1px_rgba(255,255,255,0.95)] flex items-center overflow-hidden"
        aria-label="底部主导航"
        style={{ touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={(event) => finishGesture(event)}
        onPointerCancel={(event) => finishGesture(event, true)}
      >
        {/* One shared liquid-glass highlight moves across all four tabs. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1.5 bottom-1.5 left-1.5 w-[calc((100%_-_12px)/4)] rounded-full border border-white/90 bg-gradient-to-br from-white/85 via-[#F6E9EE]/70 to-[#DDC9D4]/60 backdrop-blur-xl shadow-[inset_0_2px_2px_rgba(255,255,255,0.95),inset_0_-3px_8px_rgba(171,141,160,0.2),0_4px_14px_rgba(105,84,104,0.15)]"
          style={{
            transform: `translate3d(${position * 100}%, 0, 0) scale(${stretch}, ${verticalScale})`,
            willChange: "transform",
          }}
        >
          <span className="absolute top-[3px] left-[16%] right-[16%] h-[26%] rounded-full bg-white/55 blur-[5px]" />
          <span className="absolute inset-[2px] rounded-full border border-white/40" />
        </div>

        {TABS.map((tab, index) => {
          const isActive = activeTab === tab.id
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                if (suppressClickRef.current) return
                animateTo(index)
                if (tab.id !== activeTab) onTabChange(tab.id)
              }}
              className={`relative z-10 flex-1 h-full rounded-full flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#C88F98] ${isActive ? "text-[#403B42]" : "text-[#403B42]/65 hover:text-[#403B42]"}`}
              aria-current={isActive ? "page" : undefined}
            >
              <div className="relative flex items-center justify-center h-[23px]">
                <Icon className={`w-[19px] h-[19px] transition-transform duration-200 ${isActive ? "scale-105 stroke-[2.1]" : "stroke-[1.65]"}`} />
                {tab.id === "orders" && unpaidOrdersCount > 0 && (
                  <span className="absolute -top-1 -right-2.5 min-w-[16px] h-[16px] px-1 rounded-full bg-[#C88F98] text-white text-[10px] font-semibold tabular-nums flex items-center justify-center">
                    {unpaidOrdersCount > 99 ? "99+" : unpaidOrdersCount}
                  </span>
                )}
              </div>
              <span className={`text-[14px] leading-tight mt-0.5 ${isActive ? "font-medium" : "font-normal"}`}>
                {tab.name}
              </span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}

