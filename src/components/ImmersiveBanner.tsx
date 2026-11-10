import React from "react"
import { FilmGrainOverlay } from "./FilmGrainOverlay"
import { EtoileMark, EtoileWordmark } from "./EtoileLogo"
import { ViewMode } from "../types"

interface ImmersiveBannerProps {
  viewMode: ViewMode
  onExploreClick?: () => void
}

export const ImmersiveBanner: React.FC<ImmersiveBannerProps> = ({
  viewMode,
  onExploreClick,
}) => {
  const isNoText = viewMode === "notext"

  return (
    <div
      className="relative w-full h-[345px] overflow-hidden select-none bg-[#FFFBF0]"
      style={{ backgroundColor: "#FFFBF0" }}
    >
      {/* Background Satin Still-Life Artwork (SVG vector art with silky gradient curves) */}
      <svg
        className="absolute inset-0 w-full h-full object-cover"
        viewBox="0 0 402 345"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Satin Ribbon Pink Gradient */}
          <linearGradient
            id="ribbonPinkGrad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#E8CCD7" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#FFFBF0" stopOpacity="0.75" />
            <stop offset="70%" stopColor="#E4C5C9" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#D9B4C3" stopOpacity="0.95" />
          </linearGradient>

          {/* Satin Ribbon Azureish / Denim Tint Gradient */}
          <linearGradient
            id="ribbonAzureGrad"
            x1="100%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#DEE5ED" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#6E89A8" stopOpacity="0.25" />
            <stop offset="70%" stopColor="#FFFBF0" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#C9D6E3" stopOpacity="0.95" />
          </linearGradient>

          {/* Dim Gray Shadow Gradient */}
          <linearGradient
            id="ribbonGrayGrad"
            x1="0%"
            y1="50%"
            x2="100%"
            y2="50%"
          >
            <stop offset="0%" stopColor="#6C6C6A" stopOpacity="0.18" />
            <stop offset="50%" stopColor="#6C6C6A" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#6C6C6A" stopOpacity="0.14" />
          </linearGradient>

          {/* Soft Glow */}
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="9" result="blur" />
          </filter>
          <filter id="shadowDepth" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow
              dx="0"
              dy="8"
              stdDeviation="10"
              floodColor="#6C6C6A"
              floodOpacity="0.08"
            />
          </filter>
        </defs>

        {/* Ambient Watercolor / Satin Wash on Floral White #FFFBF0 */}
        <rect width="402" height="345" fill="#FFFBF0" />
        <circle
          cx="50"
          cy="80"
          r="140"
          fill="#E8CCD7"
          fillOpacity="0.25"
          filter="url(#softGlow)"
        />
        <circle
          cx="350"
          cy="230"
          r="170"
          fill="#DEE5ED"
          fillOpacity="0.45"
          filter="url(#softGlow)"
        />
        <circle cx="201" cy="175" r="95" fill="#FFFBF0" fillOpacity="0.96" />

        {/* Flowing Satin Ribbon Curve 1: Upper-left to bottom-right sweep */}
        <path
          d="M-40,65 C40,-10 110,40 180,90 C250,140 330,120 440,70 L430,110 C320,160 240,175 170,125 C100,75 30,35 -30,105 Z"
          fill="url(#ribbonPinkGrad)"
          filter="url(#shadowDepth)"
          opacity="0.85"
        />

        {/* Flowing Satin Ribbon Curve 2: Azureish White cascading drapery */}
        <path
          d="M420,190 C340,165 270,225 190,245 C110,265 50,215 -20,275 L-15,315 C60,255 120,300 200,280 C280,260 350,210 430,230 Z"
          fill="url(#ribbonAzureGrad)"
          filter="url(#shadowDepth)"
          opacity="0.9"
        />

        {/* Ballet Hair Claw Clip Still-Life Representation (Top Left accent) */}
        <g transform="translate(36, 76) rotate(-14) scale(0.68)" opacity="0.8">
          <path
            d="M20,10 C45,5 75,5 98,16 C105,20 110,28 108,36 C100,70 88,95 60,100 C30,95 18,70 10,36 C8,28 13,20 20,10 Z"
            fill="#E8CCD7"
            stroke="#6C6C6A"
            strokeWidth="1.2"
            strokeOpacity="0.35"
          />
          <path
            d="M22,35 Q35,42 24,75 M36,33 Q48,42 38,82 M50,32 Q62,40 52,85 M64,33 Q76,42 66,82 M78,35 Q90,42 80,75"
            stroke="#6C6C6A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity="0.4"
          />
          <rect
            x="52"
            y="8"
            width="8"
            height="22"
            rx="3"
            fill="#6C6C6A"
            fillOpacity="0.6"
          />
          <circle cx="56" cy="19" r="2.5" fill="#FFFBF0" />
        </g>

        {/* Ribbon Bow Hair Tie Still-Life Representation (Bottom Right accent) */}
        <g
          transform="translate(285, 185) rotate(12) scale(0.72)"
          opacity="0.88"
        >
          <path
            d="M60,45 C40,15 5,20 15,50 C25,75 50,60 60,45 Z"
            fill="url(#ribbonPinkGrad)"
            stroke="#6C6C6A"
            strokeWidth="1"
            strokeOpacity="0.25"
          />
          <path
            d="M60,45 C80,15 115,20 105,50 C95,75 70,60 60,45 Z"
            fill="url(#ribbonAzureGrad)"
            stroke="#6C6C6A"
            strokeWidth="1"
            strokeOpacity="0.25"
          />
          <ellipse
            cx="60"
            cy="46"
            rx="9"
            ry="7"
            fill="#6C6C6A"
            fillOpacity="0.75"
          />
          <ellipse cx="60" cy="46" rx="7" ry="5.5" fill="#B5A2C4" />
          <path
            d="M56,52 C50,75 42,95 25,120 L35,122 C52,98 60,78 62,52 Z"
            fill="#E4C5C9"
            fillOpacity="0.85"
          />
          <path
            d="M64,52 C70,75 78,100 95,125 L85,127 C68,102 60,78 58,52 Z"
            fill="#DEE5ED"
            fillOpacity="0.9"
          />
        </g>
      </svg>

      {/* Center Reserved Negative Space for Brand Identity & Typography */}
      <div className="relative z-20 h-full w-full flex flex-col items-center justify-center pt-[50px] px-6 text-center pointer-events-auto">
        {!isNoText ? (
          <>
            {/* The Bow-Star Mark (图形标标准版: 丹宁蓝描边 + 藕紫圆点 + 灰粉顶星) */}
            <div className="mb-2 transition-transform duration-300 hover:scale-105 cursor-pointer">
              <EtoileMark size="md" showStar={true} />
            </div>

            {/* ÉTOILE Wordmark (标准字 · Cormorant Garamond · SemiBold · 字距 +25%) */}
            <div className="mb-1">
              <EtoileWordmark size="xl" className="mp-text-32" />
            </div>

            {/* Chinese Title: Source Han Serif SC (16px fixed size) */}
            <p className="mp-text-16 font-serif-cn font-light tracking-[0.25em] text-[#6C6C6A]/90 mb-1.5">
              晨光轻述 · 缎彩发饰辑
            </p>

            {/* Editorial Caption in Cormorant Garamond italic (12px) */}
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/70 backdrop-blur-xs border border-[#6C6C6A]/15 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E4C5C9]" />
              <span className="mp-text-12 font-serif-en italic text-[#6C6C6A]/80 tracking-wider">
                handcrafted ballet claw & silk ties
              </span>
            </div>
          </>
        ) : (
          /* Pure 2D Flat Wireframe / Abstract mode */
          <div
            className="flex flex-col items-center justify-center gap-3 w-full py-4"
            aria-hidden="true"
          >
            {/* Abstract Bow placeholder */}
            <div className="w-[42px] h-[48px] rounded-full border-[2.5px] border-[#6E89A8]/40 bg-[#B5A2C4]/20 flex items-center justify-center">
              <div className="w-[8px] h-[8px] rounded-full bg-[#B5A2C4]/60" />
            </div>
            {/* Abstract Wordmark Bar */}
            <div className="w-[180px] h-[24px] rounded-xs bg-[#46414E]/30" />
            {/* Abstract Subtitle Bar */}
            <div className="w-[140px] h-[13px] rounded-xs bg-[#E4C5C9]/60" />
            <div className="w-[110px] h-[9px] rounded-full bg-[#6C6C6A]/20 mt-1" />
          </div>
        )}
      </div>

      {/* 8% VHS Film Grain Overlay */}
      <FilmGrainOverlay opacity={0.08} />

      {/* Subtle Bottom Vignette on Floral White */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#FFFBF0] to-transparent z-20"
        aria-hidden="true"
      />
    </div>
  )
}
