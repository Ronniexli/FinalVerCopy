import React from "react"
import { ViewMode } from "../types"

interface SloganStripProps {
  viewMode: ViewMode
}

export const SloganStrip: React.FC<SloganStripProps> = ({ viewMode }) => {
  const isNoText = viewMode === "notext"

  return (
    <div className="relative w-full py-[10px] px-6 bg-[#FFFBF0] flex items-center justify-center select-none border-y border-[#6C6C6A]/10">
      {/* Subtle hairline flourish */}
      <div className="flex items-center justify-center w-full max-w-[340px] gap-3">
        <div className="h-[0.5px] flex-1 bg-gradient-to-r from-transparent via-[#6C6C6A]/20 to-[#6C6C6A]/30" />

        {!isNoText ? (
          <span className="mp-text-14 font-serif-en italic tracking-[0.22em] text-[#6C6C6A] uppercase font-light">
            made for every day
          </span>
        ) : (
          <div className="w-[120px] h-[8px] rounded-full bg-[#6C6C6A]/20" />
        )}

        <div className="h-[0.5px] flex-1 bg-gradient-to-l from-transparent via-[#6C6C6A]/20 to-[#6C6C6A]/30" />
      </div>
    </div>
  )
}
