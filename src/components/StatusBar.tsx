import React, { useState } from "react"

interface StatusBarProps {
  dark?: boolean
}

export const StatusBar: React.FC<StatusBarProps> = ({ dark = false }) => {
  const [islandExpanded, setIslandExpanded] = useState(false)

  return (
    <div
      className={`relative z-40 w-full pt-[13px] px-[22px] flex items-center justify-between select-none pointer-events-none ${
        dark ? "text-white" : "text-[#6C6C6A]"
      }`}
    >
      {/* Time (Left) */}
      <div className="w-[80px] flex items-center">
        <span className="font-semibold text-[15px] tracking-tight font-sans-app leading-none">
          9:41
        </span>
      </div>

      {/* Dynamic Island (Center) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[10px] z-50 pointer-events-auto">
        <button
          type="button"
          onClick={() => setIslandExpanded(!islandExpanded)}
          className={`group bg-black transition-all duration-300 ease-out flex items-center justify-between cursor-pointer px-[10px] shadow-[0_4px_16px_rgba(0,0,0,0.35)] ${
            islandExpanded
              ? "w-[204px] h-[38px] rounded-[22px]"
              : "w-[122px] h-[33px] rounded-[20px]"
          }`}
          title="iOS 26 Dynamic Island"
          aria-label="Dynamic Island"
        >
          {/* Left sensor / speaker cutout */}
          <div className="flex items-center gap-[6px]">
            <div className="w-[10px] h-[10px] rounded-full bg-[#1c1c1e] ring-1 ring-[#2c2c2e]/60 flex items-center justify-center">
              <div className="w-[4px] h-[4px] rounded-full bg-[#0a0a0c]" />
            </div>
            {islandExpanded && (
              <span className="text-[11px] font-medium text-white/90 font-sans-app animate-fade-in truncate max-w-[85px]">
                微信 · 迷你程序
              </span>
            )}
          </div>

          {/* Right indicator or camera */}
          <div className="flex items-center gap-[6px]">
            {islandExpanded ? (
              <div className="flex items-center gap-[4px]">
                <span className="w-[6px] h-[6px] rounded-full bg-[#E8CCD7] animate-pulse" />
                <span className="text-[11px] font-serif-en text-[#E8CCD7]">
                  LIVE
                </span>
              </div>
            ) : (
              <div className="w-[9px] h-[9px] rounded-full bg-[#17171a] border border-[#2a2a2e]/50 flex items-center justify-center">
                <div className="w-[3px] h-[3px] rounded-full bg-[#0d0d12]" />
              </div>
            )}
          </div>
        </button>
      </div>

      {/* Status Icons (Right) */}
      <div className="w-[80px] flex items-center justify-end gap-[6px]">
        {/* Cellular 4 bars */}
        <svg
          className="w-[17px] h-[11px] fill-current"
          viewBox="0 0 17 11"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Cellular signal 4 bars"
        >
          <rect x="0.5" y="7.5" width="2.5" height="3" rx="0.8" />
          <rect x="4.5" y="5.2" width="2.5" height="5.3" rx="0.8" />
          <rect x="8.5" y="2.8" width="2.5" height="7.7" rx="0.8" />
          <rect x="12.5" y="0.5" width="2.5" height="10" rx="0.8" />
        </svg>

        {/* 5G badge */}
        <span className="text-[10px] font-bold tracking-tighter font-sans-app leading-none">
          5G
        </span>

        {/* Battery Container */}
        <div className="relative flex items-center">
          <div className="w-[23px] h-[11.5px] rounded-[3.8px] border-[1.2px] border-current p-[1.5px] flex items-center">
            <div className="h-full w-[88%] rounded-[2px] bg-current" />
          </div>
          {/* Battery nipple */}
          <div className="w-[1.2px] h-[4px] rounded-r-[0.8px] bg-current ml-[0.8px]" />
        </div>
      </div>
    </div>
  )
}
