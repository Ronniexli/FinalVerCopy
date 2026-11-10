import React, { useState } from "react"

interface WeChatCapsuleProps {
  onMoreClick?: () => void
  onCloseClick?: () => void
  dark?: boolean
}

export const WeChatCapsule: React.FC<WeChatCapsuleProps> = ({
  onMoreClick,
  onCloseClick,
  dark = false,
}) => {
  const [activeSide, setActiveSide] = useState<"more" | "close" | null>(null)

  return (
    <div
      className={`relative inline-flex items-center justify-between rounded-full h-[32px] w-[87px] px-[8px] transition-all duration-200 select-none ${
        dark
          ? "bg-black/35 backdrop-blur-xl border border-white/20 text-white"
          : "bg-[#FFFBF0]/85 backdrop-blur-xl border border-[#6C6C6A]/25 text-[#6C6C6A] shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
      }`}
      role="group"
      aria-label="WeChat mini-program capsule controls"
    >
      {/* More Options Button (Three dots) */}
      <button
        type="button"
        onClick={onMoreClick}
        onMouseDown={() => setActiveSide("more")}
        onMouseUp={() => setActiveSide(null)}
        onMouseLeave={() => setActiveSide(null)}
        className={`flex-1 flex items-center justify-center h-full rounded-l-full cursor-pointer transition-opacity active:opacity-40 ${
          activeSide === "more" ? "opacity-40" : ""
        }`}
        title="小程序设置与分享"
        aria-label="More options"
      >
        <span className="flex items-center gap-[3px]">
          <span className="w-[3.5px] h-[3.5px] rounded-full bg-current" />
          <span className="w-[4.5px] h-[4.5px] rounded-full bg-current" />
          <span className="w-[3.5px] h-[3.5px] rounded-full bg-current" />
        </span>
      </button>

      {/* Hairline Divider */}
      <div
        className={`w-[0.5px] h-[14px] mx-[2px] ${
          dark ? "bg-white/25" : "bg-[#6C6C6A]/30"
        }`}
        aria-hidden="true"
      />

      {/* Mini-program Close / Home Button (Concentric circle inside circle) */}
      <button
        type="button"
        onClick={onCloseClick}
        onMouseDown={() => setActiveSide("close")}
        onMouseUp={() => setActiveSide(null)}
        onMouseLeave={() => setActiveSide(null)}
        className={`flex-1 flex items-center justify-center h-full rounded-r-full cursor-pointer transition-opacity active:opacity-40 ${
          activeSide === "close" ? "opacity-40" : ""
        }`}
        title="关闭小程序"
        aria-label="Close mini-program"
      >
        <div className="relative flex items-center justify-center w-[16px] h-[16px]">
          {/* Outer circle */}
          <div
            className={`w-[14px] h-[14px] rounded-full border-[1.5px] border-current flex items-center justify-center`}
          >
            {/* Inner solid dot */}
            <div className="w-[4.5px] h-[4.5px] rounded-full bg-current" />
          </div>
        </div>
      </button>
    </div>
  )
}
