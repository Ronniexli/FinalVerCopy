import React from "react"

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  showStar?: boolean
  colorScheme?: "original" | "monochrome" | "dimGray"
}

// Exact colors sampled from brand identity attachment:
export const BRAND_COLORS = {
  denimBlue: "#6E89A8", // 丹宁蓝描边
  lotusPurple: "#B5A2C4", // 藕紫圆点
  dustyPink: "#E4C5C9", // 灰粉顶星
  charcoal: "#46414E", // ÉTOILE 标准字颜色
  dimGray: "#6C6C6A",
}

/**
 * Bow-Star Mark (图形标标准版)
 * 丹宁蓝描边 + 藕紫圆点 + 灰粉顶星
 */
export const EtoileMark: React.FC<LogoProps> = ({
  size = "md",
  className = "",
  showStar = true,
  colorScheme = "original",
}) => {
  // Dimensions scaling
  const dimensions = {
    sm: { w: 32, h: 42, starSize: 6 },
    md: { w: 48, h: 62, starSize: 9 },
    lg: { w: 64, h: 84, starSize: 12 },
    xl: { w: 88, h: 114, starSize: 16 },
  }[size]

  const strokeColor =
    colorScheme === "monochrome"
      ? "currentColor"
      : colorScheme === "dimGray"
        ? BRAND_COLORS.dimGray
        : BRAND_COLORS.denimBlue

  const dotColor =
    colorScheme === "monochrome"
      ? "currentColor"
      : colorScheme === "dimGray"
        ? BRAND_COLORS.dimGray
        : BRAND_COLORS.lotusPurple

  const starColor =
    colorScheme === "monochrome"
      ? "currentColor"
      : colorScheme === "dimGray"
        ? BRAND_COLORS.dimGray
        : BRAND_COLORS.dustyPink

  return (
    <div
      className={`inline-flex flex-col items-center justify-center select-none ${className}`}
      aria-label="ÉTOILE Bow-Star Mark"
    >
      <svg
        width={dimensions.w}
        height={dimensions.h}
        viewBox="0 0 100 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* 灰粉顶星 (Dusty Pink Top Star) */}
        {showStar && (
          <path
            d="M50 3L53.1 12.5H63.1L55 18.4L58.1 27.9L50 22L41.9 27.9L45 18.4L36.9 12.5H46.9L50 3Z"
            fill={starColor}
          />
        )}

        {/* 丹宁蓝描边 蝴蝶结双环 (Denim Blue Bow Loops) */}
        {/* Left Loop: sweeps from center up-left and loops back */}
        <path
          d="M48 62 C34 38 12 38 12 55 C12 70 34 70 48 64"
          stroke={strokeColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Right Loop: sweeps from center up-right and loops back */}
        <path
          d="M52 62 C66 38 88 38 88 55 C88 70 66 70 52 64"
          stroke={strokeColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 丹宁蓝描边 垂坠飘带 (Downward Ribbon Tails) */}
        {/* Left Tail: slants down-left */}
        <path
          d="M44 68 L24 116"
          stroke={strokeColor}
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Right Tail: slants down-right */}
        <path
          d="M56 68 L76 116"
          stroke={strokeColor}
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* 藕紫圆点 (Lotus Purple Center Circle Dot) */}
        <circle cx="50" cy="63" r="8" fill={dotColor} />
      </svg>
    </div>
  )
}

/**
 * ÉTOILE Wordmark (标准字)
 * Cormorant Garamond · SemiBold · 字距 +25%
 */
export const EtoileWordmark: React.FC<{
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  colorScheme?: "original" | "monochrome" | "dimGray"
}> = ({ size = "md", className = "", colorScheme = "original" }) => {
  const sizeClasses = {
    sm: "text-[14px]",
    md: "text-[18px]",
    lg: "text-[24px]",
    xl: "text-[32px]",
  }[size]

  const colorStyle =
    colorScheme === "original"
      ? { color: BRAND_COLORS.charcoal }
      : colorScheme === "dimGray"
        ? { color: BRAND_COLORS.dimGray }
        : {}

  return (
    <span
      className={`font-serif-en font-semibold tracking-[0.25em] select-none inline-block ${sizeClasses} ${className}`}
      style={{
        ...colorStyle,
        letterSpacing: "0.25em", // SemiBold · 字距 +25%
      }}
    >
      ÉTOILE
    </span>
  )
}

/**
 * Full Brand Lockup (Bow-Star Mark + ÉTOILE Wordmark)
 */
export const EtoileFullLogo: React.FC<{
  size?: "sm" | "md" | "lg"
  layout?: "vertical" | "horizontal"
  className?: string
  showChineseSubtitle?: boolean
}> = ({
  size = "md",
  layout = "vertical",
  className = "",
  showChineseSubtitle = false,
}) => {
  if (layout === "horizontal") {
    return (
      <div className={`inline-flex items-center gap-2.5 ${className}`}>
        <EtoileMark size={size === "lg" ? "md" : "sm"} />
        <div className="flex flex-col">
          <EtoileWordmark size={size} />
          {showChineseSubtitle && (
            <span className="text-[10px] font-serif-cn tracking-[0.2em] text-[#6C6C6A]/75 -mt-[2px]">
              丝叙 · 晨光发饰
            </span>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      className={`inline-flex flex-col items-center text-center ${className}`}
    >
      <EtoileMark size={size} />
      <div className="mt-2 flex flex-col items-center">
        <EtoileWordmark
          size={size === "lg" ? "xl" : size === "md" ? "lg" : "md"}
        />
        {showChineseSubtitle && (
          <span className="mp-text-12 font-serif-cn tracking-[0.22em] text-[#6C6C6A]/80 mt-1 font-light">
            芭蕾风发饰
          </span>
        )}
      </div>
    </div>
  )
}
