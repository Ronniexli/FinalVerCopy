import React, { useEffect, useRef, useState, useCallback } from "react"
import { Product } from "../types"
import { EtoileMark, EtoileWordmark } from "../components/EtoileLogo"
import { ChevronLeft, Sparkles, ArrowRight, RotateCcw } from "lucide-react"
import bowCutout from "../assets/bows/bow_cutout.png"

interface MiniGameScreenProps {
  onBack: () => void
  products?: Product[]
  onSelectProduct?: (product: Product) => void
}

type GamePhase = "START" | "PLAYING" | "ENDED" | "COLLECTION"

interface FallingBow {
  id: number
  x: number // percentage 12..88
  y: number // px from top of playfield
  speed: number // px per second
  swayAmp: number
  swayFreq: number
  phase: number
  rotation: number
  isGolden: boolean
  size: number
}

interface ScorePopup {
  id: number
  x: number
  y: number
  points: number
  isGolden: boolean
}

export interface RewardTier {
  badge: string
  title: string
  subtitle: string
  code: string
  detail: string
  unlocked: boolean
}

interface CollectionPlaceholderItem {
  id: string
  title: string
  subtitle: string
  price: string
  tag: string
  image: string
}

const COLLECTION_ITEMS: CollectionPlaceholderItem[] = [
  {
    id: "col-1",
    title: "玫瑰粉雾缎面蝴蝶结发夹",
    subtitle: "双层柔光素缎 · 芭蕾半扎发造型",
    price: "¥32",
    tag: "经典主推",
    image: "/images/product-scrunchie-pink-satin.png",
  },
  {
    id: "col-2",
    title: "奶白波点微光芭蕾抓夹",
    subtitle: "柔韧醋酸板材 · 附星徽织带标",
    price: "¥28",
    tag: "人气单品",
    image: "/images/product-claw-ivory-dot.png",
  },
  {
    id: "col-3",
    title: "星徽蝴蝶结珠光醋酸边夹",
    subtitle: "藕紫/雾蓝/月白三色 · 碎发刘海点缀",
    price: "¥24",
    tag: "当季新款",
    image: "/images/product-sideclip-lilac.png",
  },
  {
    id: "col-4",
    title: "细格纹蕾丝星徽蝴蝶结发箍",
    subtitle: "雾蓝/藕粉/月白细格 · 修饰高颅顶",
    price: "¥32",
    tag: "人气新品",
    image: "/images/product-headband-blue.png",
  },
]

const GAME_DURATION = 15 // 15-second timer
const CATCHER_WIDTH = 96
const CATCHER_Y_OFFSET = 76

export function getRewardForScore(score: number): RewardTier {
  if (score >= 13) {
    return {
      badge: "三阶礼遇 · 专属赠礼",
      title: "专属赠礼",
      subtitle: "随单获赠 ÉTOILE 限定迷你缎面蝴蝶结发夹一件",
      code: "ETOILE-GIFT",
      detail: "接住 13 只及以上蝴蝶结解锁 · 全店缎面系列通用",
      unlocked: true,
    }
  }
  if (score >= 9) {
    return {
      badge: "二阶礼遇 · 沙龙折扣",
      title: "9 折优惠券",
      subtitle: "尊享当季芭蕾缎面发饰系列 9 折专属优惠",
      code: "ETOILE-10",
      detail: "接住 9–12 只蝴蝶结解锁 · 结算时自动抵扣",
      unlocked: true,
    }
  }
  if (score >= 5) {
    return {
      badge: "一阶礼遇 · 免邮心意",
      title: "免邮优惠券",
      subtitle: "尊享全店发饰礼盒顺丰包邮服务",
      code: "ETOILE-SHIP",
      detail: "接住 5–8 只蝴蝶结解锁 · 无门槛直享",
      unlocked: true,
    }
  }
  return {
    badge: "沙龙互动体验",
    title: "差一点点",
    subtitle: "接住 5 只及以上飘落的蝴蝶结，即可解锁专属礼遇。",
    code: "ETOILE-TRY",
    detail: "本局接住 0–4 只 · 再玩一次即可轻松解锁",
    unlocked: false,
  }
}

export const GameResults: React.FC<{
  score: number
  reward: RewardTier
  onUseNow: () => void
  onPlayAgain: () => void
  onBackHome: () => void
}> = ({ score, reward, onUseNow, onPlayAgain, onBackHome }) => (
  <div className="absolute inset-0 z-30 bg-[#2A252C]/45 backdrop-blur-xs flex items-center justify-center px-6 animate-fade-in">
    <div className="w-full rounded-[8px] bg-[#F8F6F2] border border-[#C88F98]/45 p-6 shadow-2xl text-center relative overflow-hidden">
      <div className="pointer-events-none absolute inset-2.5 border border-[#C88F98]/25 rounded-[6px]" />

      <div className="relative z-10 flex flex-col items-center">
        <span className="text-[11px] font-sans tracking-[0.18em] text-[#C88F98] font-medium">
          {reward.badge}
        </span>

        <p className="mt-2 text-[13px] font-sans text-[#6C6C6A]">
          最终得分 ·{" "}
          <strong className="font-serif-en text-[18px] text-[#46414E]">
            {score}
          </strong>{" "}
          只缎面蝴蝶结
        </p>

        {/* Luxury Coupon Card */}
        <div className="w-full my-4 py-4 px-4 rounded-[8px] bg-gradient-to-b from-white to-[#F6EFEA] border border-[#C88F98]/40 shadow-xs">
          <div className="flex items-center justify-center gap-1.5 text-[#C88F98] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-[10px] font-serif-en tracking-[0.22em] uppercase">
              ÉTOILE 专属礼遇券
            </span>
          </div>

          <h2 className="font-sans text-[22px] font-semibold tracking-wide text-[#46414E]">
            {reward.title}
          </h2>

          <p className="mt-1.5 text-[12px] font-sans text-[#6C6C6A] leading-relaxed">
            {reward.subtitle}
          </p>

          <div className="mt-3 pt-2.5 border-t border-dashed border-[#C88F98]/35 flex items-center justify-between text-[10px] font-sans tracking-wider text-[#8C7C80]">
            <span>礼遇码：{reward.code}</span>
            <span>{reward.unlocked ? "已解锁" : "待解锁"}</span>
          </div>
        </div>

        <p className="text-[11px] font-sans text-[#8C7C80] mb-4">
          {reward.detail}
        </p>

        {/* Two Primary Buttons: 立即使用 (Use Now) & 再玩一次 (Play Again) */}
        <div className="w-full flex flex-col gap-2.5">
          <button
            type="button"
            onClick={onUseNow}
            className="w-full h-[46px] rounded-[8px] bg-[#46414E] text-[#F8F6F2] border border-[#46414E] text-[14px] font-sans font-medium tracking-widest flex items-center justify-center gap-2 hover:bg-[#38343f] active:scale-[0.99] transition-all cursor-pointer shadow-xs"
          >
            <span>立即使用</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onPlayAgain}
            className="w-full h-[46px] rounded-[8px] bg-white/85 text-[#46414E] border border-[#46414E]/15 text-[14px] font-sans font-medium tracking-widest flex items-center justify-center gap-1.5 hover:bg-white active:scale-[0.99] transition-all cursor-pointer shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>再玩一次</span>
          </button>

          <button
            type="button"
            onClick={onBackHome}
            className="mt-0.5 text-[12px] font-sans text-[#8C7C80] hover:text-[#46414E] underline cursor-pointer py-1"
          >
            返回 ÉTOILE 首页
          </button>
        </div>
      </div>
    </div>
  </div>
)

export const CatchTheBowGame: React.FC<MiniGameScreenProps> = ({
  onBack,
  products = [],
  onSelectProduct,
}) => {
  const [phase, setPhase] = useState<GamePhase>("START")
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
  const [catcherX, setCatcherX] = useState(50)
  const [bows, setBows] = useState<FallingBow[]>([])
  const [popups, setPopups] = useState<ScorePopup[]>([])

  const playfieldRef = useRef<HTMLDivElement | null>(null)
  const catcherXRef = useRef(50)
  const scoreRef = useRef(0)
  const bowsRef = useRef<FallingBow[]>([])
  const nextBowIdRef = useRef(1)
  const nextPopupIdRef = useRef(1)
  const rafRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)
  const lastFrameTimeRef = useRef<number>(0)
  const lastSpawnTimeRef = useRef<number>(0)
  const isDraggingRef = useRef(false)

  const stopGameLoop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [])

  const addScorePopup = useCallback((x: number, y: number, points: number, isGolden: boolean) => {
    const id = nextPopupIdRef.current++
    setPopups((prev) => [...prev, { id, x, y, points, isGolden }])
    window.setTimeout(() => {
      setPopups((prev) => prev.filter((p) => p.id !== id))
    }, 650)
  }, [])

  const startGame = useCallback(() => {
    stopGameLoop()
    scoreRef.current = 0
    bowsRef.current = []
    catcherXRef.current = 50
    setScore(0)
    setTimeLeft(GAME_DURATION)
    setCatcherX(50)
    setBows([])
    setPopups([])
    setPhase("PLAYING")
  }, [stopGameLoop])

  useEffect(() => {
    if (phase !== "PLAYING") {
      stopGameLoop()
      return
    }

    const now = performance.now()
    startTimeRef.current = now
    lastFrameTimeRef.current = now
    lastSpawnTimeRef.current = now - 380

    const tick = (timestamp: number) => {
      const elapsedSec = (timestamp - startTimeRef.current) / 1000
      const remaining = Math.max(0, GAME_DURATION - elapsedSec)
      setTimeLeft(Math.ceil(remaining))

      if (remaining <= 0) {
        stopGameLoop()
        setPhase("ENDED")
        return
      }

      const dt = Math.min(0.05, (timestamp - lastFrameTimeRef.current) / 1000)
      lastFrameTimeRef.current = timestamp

      const fieldHeight = playfieldRef.current?.clientHeight || 680
      const fieldWidth = playfieldRef.current?.clientWidth || 393

      // Tuned for a 15-second round so players can comfortably reach 5-15+ points
      const difficulty = Math.min(1, elapsedSec / GAME_DURATION)
      const spawnInterval = 520 - difficulty * 170

      if (timestamp - lastSpawnTimeRef.current >= spawnInterval) {
        lastSpawnTimeRef.current = timestamp
        const isGolden = Math.random() < 0.22
        const baseSpeed = 165 + difficulty * 90 + Math.random() * 35
        bowsRef.current.push({
          id: nextBowIdRef.current++,
          x: 13 + Math.random() * 74,
          y: -56,
          speed: isGolden ? baseSpeed * 1.12 : baseSpeed,
          swayAmp: 5 + Math.random() * 7,
          swayFreq: 1.5 + Math.random() * 1.1,
          phase: Math.random() * Math.PI * 2,
          rotation: (Math.random() - 0.5) * 12,
          isGolden,
          size: isGolden ? 56 : 52,
        })
      }

      const catcherCenterX = (catcherXRef.current / 100) * fieldWidth
      const catcherTopY = fieldHeight - CATCHER_Y_OFFSET - 54
      const catcherBottomY = fieldHeight - CATCHER_Y_OFFSET + 12
      const hitHalfWidth = CATCHER_WIDTH * 0.56

      const surviving: FallingBow[] = []

      for (const bow of bowsRef.current) {
        const nextY = bow.y + bow.speed * dt
        const swayPx = Math.sin(elapsedSec * bow.swayFreq + bow.phase) * bow.swayAmp
        const bowCenterX = (bow.x / 100) * fieldWidth + swayPx
        const bowBottomY = nextY + bow.size * 0.72

        const caughtVertically = bowBottomY >= catcherTopY && nextY <= catcherBottomY
        const caughtHorizontally = Math.abs(bowCenterX - catcherCenterX) <= hitHalfWidth

        if (caughtVertically && caughtHorizontally) {
          const pts = bow.isGolden ? 3 : 1
          scoreRef.current += pts
          setScore(scoreRef.current)
          addScorePopup(catcherXRef.current, catcherTopY - 10, pts, bow.isGolden)
          continue
        }

        if (nextY < fieldHeight + 64) {
          surviving.push({
            ...bow,
            y: nextY,
          })
        }
      }

      bowsRef.current = surviving
      setBows([...surviving])

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => stopGameLoop()
  }, [phase, stopGameLoop, addScorePopup])

  const updateCatcherFromClientX = (clientX: number) => {
    const rect = playfieldRef.current?.getBoundingClientRect()
    if (!rect || rect.width <= 0) return
    const relX = ((clientX - rect.left) / rect.width) * 100
    const clamped = Math.max(14, Math.min(86, relX))
    catcherXRef.current = clamped
    setCatcherX(clamped)
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (phase !== "PLAYING") return
    isDraggingRef.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    updateCatcherFromClientX(e.clientX)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (phase !== "PLAYING") return
    if (isDraggingRef.current || e.pointerType === "mouse") {
      updateCatcherFromClientX(e.clientX)
    }
  }

  const handlePointerUp = () => {
    isDraggingRef.current = false
  }

  const reward = getRewardForScore(score)

  return (
    <div className="relative w-full h-full min-h-0 flex flex-col bg-[#F8F6F2] text-[#46414E] overflow-hidden select-none">
      {/* Top Minimal Navigation Bar */}
      <header className="relative z-30 pt-[48px] px-5 pb-2.5 flex items-center justify-between border-b border-[#46414E]/8 bg-[#F8F6F2]/90 backdrop-blur-md">
        <button
          type="button"
          onClick={onBack}
          className="h-[38px] px-2 -ml-2 rounded-[8px] flex items-center gap-0.5 text-[#46414E] hover:bg-[#C88F98]/15 active:scale-95 transition-all cursor-pointer"
          aria-label="返回首页"
        >
          <ChevronLeft className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[13px] font-sans">返回</span>
        </button>

        <div className="flex flex-col items-center pr-[76px]">
          <span className="font-sans text-[15px] font-medium tracking-wider text-[#46414E]">
            接住蝴蝶结
          </span>
        </div>

        <div className="w-[32px]" />
      </header>

      {/* ============================================================
          1. START SCREEN (开始界面)
         ============================================================ */}
      {phase === "START" && (
        <div className="flex-1 min-h-0 flex flex-col items-center justify-between px-7 pt-7 pb-11 text-center relative overflow-hidden">
          <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full bg-[#C88F98]/15 blur-3xl" />

          {/* ÉTOILE Logo at the top */}
          <div className="relative z-10 flex flex-col items-center mt-1">
            <EtoileMark size="md" showStar />
            <div className="mt-2">
              <EtoileWordmark size="md" />
            </div>
            <span className="mt-1 text-[11px] font-sans tracking-[0.2em] text-[#6C6C6A]">
              芭蕾风发饰
            </span>
          </div>

          {/* Centerpiece Satin Bow & Heading */}
          <div className="relative z-10 flex flex-col items-center my-auto">
            {/* Catch the Bow Luxury Campaign Poster */}
            <div className="relative w-[280px] aspect-[16/10] rounded-[14px] overflow-hidden shadow-[0_10px_28px_rgba(138,88,98,0.22)] border border-[#C88F98]/35 mb-4">
              <img
                src="/images/poster-catch-the-bow.png"
                alt="接住蝴蝶结宣传海报"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>

            <span className="text-[11px] font-serif-en tracking-[0.28em] uppercase text-[#C88F98] font-semibold mb-1">
              限时互动礼遇
            </span>
            <h1 className="font-sans text-[24px] font-medium tracking-wider text-[#46414E] leading-tight">
              接住飘落的蝴蝶结
            </h1>
            <p className="mt-2 text-[13px] font-sans text-[#6C6C6A] leading-relaxed max-w-[260px]">
              左右移动礼袋，接住飘落的缎带蝴蝶结，解锁你的专属心意礼遇。
            </p>

            {/* Point guide */}
            <div className="mt-5 inline-flex items-center gap-4 px-4 py-2 rounded-[8px] bg-white/75 border border-[#C88F98]/25 text-[11px] font-sans text-[#6C6C6A] shadow-2xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C88F98]" />
                粉缎蝴蝶结 +1
              </span>
              <span className="text-[#46414E]/20">|</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C9A86E]" />
                流金蝴蝶结 +3
              </span>
            </div>
          </div>

          {/* Primary Button: 开始游戏 (Start) */}
          <div className="relative z-10 w-full">
            <button
              type="button"
              onClick={startGame}
              className="w-full h-[50px] rounded-[8px] bg-[#46414E] text-[#F8F6F2] font-sans text-[15px] font-medium tracking-[0.18em] shadow-sm hover:bg-[#38343f] active:scale-[0.99] transition-all cursor-pointer"
            >
              立即开始
            </button>
          </div>
        </div>
      )}

      {/* ============================================================
          2. GAME SCREEN (15s Active Catching)
         ============================================================ */}
      {(phase === "PLAYING" || phase === "ENDED") && (
        <div
          ref={playfieldRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative flex-1 min-h-0 w-full overflow-hidden touch-none cursor-ew-resize"
        >
          {/* Top Area: Score & Remaining Time */}
          <div className="relative z-20 mx-5 mt-3 px-4 py-2.5 rounded-[8px] bg-white/85 backdrop-blur-md border border-[#C88F98]/25 flex items-center justify-between shadow-2xs pointer-events-none">
            <div className="flex flex-col">
              <span className="text-[11px] font-sans tracking-wider text-[#6C6C6A]">
                当前得分
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-serif-en text-[24px] font-semibold text-[#46414E] leading-none">
                  {score}
                </span>
                <span className="text-[11px] font-sans text-[#C88F98]">
                  只蝴蝶结
                </span>
              </div>
            </div>

            <div className="h-6 w-[1px] bg-[#46414E]/10" />

            <div className="flex flex-col items-end">
              <span className="text-[11px] font-sans tracking-wider text-[#6C6C6A]">
                剩余时间
              </span>
              <span className="font-serif-en text-[24px] font-semibold text-[#46414E] leading-none">
                00:{String(timeLeft).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Falling Satin Bows */}
          {bows.map((bow) => (
            <div
              key={bow.id}
              className="pointer-events-none absolute top-0 left-0 will-change-transform"
              style={{
                width: `${bow.size}px`,
                height: `${bow.size}px`,
                left: `${bow.x}%`,
                transform: `translate3d(-50%, ${bow.y}px, 0) rotate(${bow.rotation}deg)`,
              }}
            >
              {bow.isGolden && (
                <div className="absolute -inset-1.5 rounded-full bg-[#E5C98B]/35 blur-md" />
              )}
              <img
                src={bowCutout}
                alt=""
                draggable={false}
                className="w-full h-full object-contain"
                style={
                  bow.isGolden
                    ? {
                        filter:
                          "sepia(0.55) saturate(1.45) hue-rotate(8deg) brightness(1.08) drop-shadow(0 6px 10px rgba(182,142,76,0.28))",
                      }
                    : {
                        filter: "drop-shadow(0 6px 10px rgba(138,88,98,0.18))",
                      }
                }
              />
            </div>
          ))}

          {/* Floating Score Popups */}
          {popups.map((p) => (
            <div
              key={p.id}
              className="pointer-events-none absolute z-20 -translate-x-1/2 font-serif-en font-semibold text-[16px] animate-bounce"
              style={{
                left: `${p.x}%`,
                top: `${p.y}px`,
                color: p.isGolden ? "#B58E4C" : "#B06D79",
              }}
            >
              +{p.points}
            </div>
          ))}

          {/* Bottom Area: Refined ÉTOILE Gift Bag Catcher */}
          <div
            className="pointer-events-none absolute left-0 z-20 will-change-transform"
            style={{
              bottom: `${CATCHER_Y_OFFSET - 36}px`,
              left: `${catcherX}%`,
              width: `${CATCHER_WIDTH}px`,
              transform: "translate3d(-50%, 0, 0)",
            }}
          >
            <div className="relative w-full flex flex-col items-center">
              <svg
                className="w-[46px] h-[18px] -mb-[3px] overflow-visible"
                viewBox="0 0 46 18"
                fill="none"
              >
                <path
                  d="M11 17 C11 4, 35 4, 35 17"
                  stroke="#C88F98"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>

              <div className="relative w-full h-[58px] rounded-[6px] bg-gradient-to-b from-[#FFFDF9] to-[#F2EAE1] border border-[#C88F98]/55 shadow-[0_10px_24px_rgba(70,65,78,0.14)] flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-[7px] bg-[#C88F98]/85" />
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[10px] bg-[#C88F98]/15" />

                <span className="relative z-10 font-serif-en text-[12px] font-semibold tracking-[0.26em] text-[#46414E] mt-1">
                  ÉTOILE
                </span>
                <span className="relative z-10 text-[9px] font-sans tracking-widest text-[#8C7C80]">
                  心意礼袋
                </span>
              </div>
            </div>
          </div>

          {/* Drag Hint */}
          <div className="pointer-events-none absolute bottom-7 inset-x-0 text-center">
            <span className="text-[11px] font-sans tracking-widest text-[#8C7C80]">
              ← 左右拖动礼袋接住蝴蝶结 →
            </span>
          </div>

          {/* 3. END STATE: Luxury Coupon Modal */}
          {phase === "ENDED" && (
            <GameResults
              score={score}
              reward={reward}
              onUseNow={() => setPhase("COLLECTION")}
              onPlayAgain={startGame}
              onBackHome={onBack}
            />
          )}
        </div>
      )}

      {/* ============================================================
          4. COLLECTION SCREEN ("立即使用 / Use Now" Destination)
         ============================================================ */}
      {phase === "COLLECTION" && (
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain no-scrollbar px-5 pt-4 pb-12">
          {/* Active Reward Banner */}
          <div className="p-3.5 rounded-[8px] bg-white border border-[#C88F98]/40 flex items-center justify-between mb-5 shadow-2xs">
            <div>
              <span className="text-[10px] font-sans tracking-wider text-[#C88F98] block font-medium">
                已应用礼遇 · {reward.code}
              </span>
              <h3 className="font-sans text-[16px] font-semibold text-[#46414E] mt-0.5">
                {reward.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={startGame}
              className="px-3 py-1.5 rounded-[6px] border border-[#C88F98]/40 text-[11px] font-sans text-[#46414E] hover:bg-[#C88F98]/10 cursor-pointer"
            >
              再玩一次
            </button>
          </div>

          {/* Collection Heading */}
          <div className="mb-4 flex items-end justify-between">
            <div>
              <span className="text-[10px] font-serif-en tracking-[0.22em] uppercase text-[#8C7C80] block">
                ÉTOILE 当季甄选
              </span>
              <h2 className="font-sans text-[20px] font-medium text-[#46414E]">
                ÉTOILE 芭蕾缎面发饰臻选
              </h2>
            </div>
            <button
              type="button"
              onClick={onBack}
              className="text-[12px] font-sans text-[#6C6C6A] hover:text-[#46414E] underline cursor-pointer"
            >
              返回首页
            </button>
          </div>

          {/* Satin Hair Accessory Cards */}
          <div className="grid grid-cols-2 gap-3.5">
            {COLLECTION_ITEMS.map((item, idx) => {
              const linkedProduct = products[idx]
              return (
                <div
                  key={item.id}
                  onClick={() => linkedProduct && onSelectProduct?.(linkedProduct)}
                  className="group rounded-[8px] bg-white border border-[#46414E]/10 p-2.5 shadow-2xs hover:shadow-md transition-all flex flex-col cursor-pointer"
                >
                  <div className="relative w-full aspect-[4/5] rounded-[6px] overflow-hidden bg-[#F2EAE1] mb-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-[4px] bg-[#F8F6F2]/90 text-[#46414E] text-[9px] font-sans font-medium">
                      {item.tag}
                    </span>
                  </div>
                  <h4 className="font-sans text-[13px] font-medium text-[#46414E] truncate">
                    {item.title}
                  </h4>
                  <p className="text-[11px] font-sans text-[#6C6C6A] line-clamp-2 leading-snug mt-0.5">
                    {item.subtitle}
                  </p>
                  <div className="mt-2 pt-1.5 border-t border-[#46414E]/8 flex items-center justify-between">
                    <span className="font-serif-en text-[14px] font-bold text-[#46414E]">
                      {item.price}
                    </span>
                    <span className="text-[10px] font-sans text-[#C88F98] font-medium">
                      可用礼遇
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export const MiniGameScreen = CatchTheBowGame
