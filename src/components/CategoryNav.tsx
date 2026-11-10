import React from "react"
import { CategoryId, ViewMode } from "../types"

interface CategoryNavProps {
  selectedCategory: CategoryId
  onSelectCategory: (id: CategoryId) => void
  viewMode: ViewMode
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory,
  viewMode,
}) => {
  const isNoText = viewMode === "notext"

  return (
    <div className="relative w-full px-6 pt-5 pb-4 select-none bg-[#FFFBF0]">
      {/* 
        [Accent Place 1 of ≤ 2 places on single screen]:
        Thin dim gray #6C6C6A 1.5px ribbon-curve stroke accent 
        flows gracefully across the category section backdrop.
      */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-[50px] overflow-visible z-0 flex items-center justify-center">
        <svg
          className="w-full max-w-[370px] h-[40px]"
          viewBox="0 0 370 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Exact 1.5px stroke ribbon-curve */}
          <path
            d="M10,28 C50,12 90,34 140,24 C190,14 230,32 280,20 C320,8 350,22 365,16"
            stroke="#6C6C6A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity="0.45"
            strokeDasharray="4 2"
          />
          {/* Subtle loop detail on left flourish */}
          <path
            d="M15,29 C12,24 8,20 5,23 C2,26 6,32 12,30"
            stroke="#6C6C6A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity="0.4"
          />
        </svg>
      </div>

      {/* Three Category Icon Entries in a row: icon above, label below, uniform size, evenly spaced */}
      <div className="relative z-10 flex items-center justify-between gap-3">
        {/* Entry 1: Hair Claw Clip "抓夹 CLIPS" */}
        <button
          type="button"
          onClick={() =>
            onSelectCategory(selectedCategory === "clips" ? "all" : "clips")
          }
          className={`flex-1 flex flex-col items-center group cursor-pointer transition-transform duration-200 active:scale-95`}
          aria-label="抓夹 CLIPS"
        >
          {/* Icon Container: Uniform 58px x 58px with soft azureish white / queen pink highlight */}
          <div
            className={`relative w-[58px] h-[58px] rounded-[18px] flex items-center justify-center transition-all duration-200 border ${
              selectedCategory === "clips"
                ? "bg-[#DEE5ED] border-[#6C6C6A]/50 shadow-[0_3px_12px_rgba(108,108,106,0.12)]"
                : "bg-[#DEE5ED]/65 border-[#6C6C6A]/15 hover:bg-[#DEE5ED]"
            }`}
          >
            {/* Custom Claw Clip Vector Icon */}
            <svg
              className="w-[28px] h-[28px] transition-transform duration-200 group-hover:scale-105"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer shell / arch of claw */}
              <path
                d="M5 9C7 5 21 5 23 9C24 13 22 21 19 22C16 23 12 23 9 22C6 21 4 13 5 9Z"
                fill="#FFFBF0"
                stroke="#6C6C6A"
                strokeWidth="1.3"
              />
              {/* Central spring hinge */}
              <rect x="12" y="4" width="4" height="6" rx="1.5" fill="#6C6C6A" />
              {/* Claw teeth interlocking */}
              <path
                d="M8 12V18M11 11V19M14 11V19M17 11V19M20 12V18"
                stroke="#6C6C6A"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              {/* Satin ribbon loop accent */}
              <circle cx="14" cy="7" r="1.2" fill="#E8CCD7" />
            </svg>

            {/* Active dot indicator */}
            {selectedCategory === "clips" && (
              <span className="absolute -bottom-[3px] w-[5px] h-[5px] rounded-full bg-[#6C6C6A]" />
            )}
          </div>

          {/* Label Below: 12-14px caption */}
          {!isNoText ? (
            <div className="mt-2 text-center flex flex-col items-center">
              <span className="mp-text-14 font-serif-cn font-medium text-[#6C6C6A] tracking-wider">
                抓夹
              </span>
              <span className="mp-text-12 font-serif-en tracking-[0.18em] text-[#6C6C6A]/75 font-normal -mt-[1px]">
                CLIPS
              </span>
            </div>
          ) : (
            <div className="mt-2 flex flex-col items-center gap-1">
              <div className="w-[30px] h-[10px] rounded-sm bg-[#6C6C6A]/30" />
              <div className="w-[38px] h-[7px] rounded-sm bg-[#6C6C6A]/20" />
            </div>
          )}
        </button>

        {/* Entry 2: Ribbon Bow Hair Tie "发圈 TIES" */}
        <button
          type="button"
          onClick={() =>
            onSelectCategory(selectedCategory === "ties" ? "all" : "ties")
          }
          className={`flex-1 flex flex-col items-center group cursor-pointer transition-transform duration-200 active:scale-95`}
          aria-label="发圈 TIES"
        >
          {/* Icon Container: Uniform 58px x 58px */}
          <div
            className={`relative w-[58px] h-[58px] rounded-[18px] flex items-center justify-center transition-all duration-200 border ${
              selectedCategory === "ties"
                ? "bg-[#DEE5ED] border-[#6C6C6A]/50 shadow-[0_3px_12px_rgba(108,108,106,0.12)]"
                : "bg-[#DEE5ED]/65 border-[#6C6C6A]/15 hover:bg-[#DEE5ED]"
            }`}
          >
            {/* Custom Ribbon Bow Hair Tie Vector Icon */}
            <svg
              className="w-[30px] h-[30px] transition-transform duration-200 group-hover:scale-105"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Scrunchie elastic circle base */}
              <circle
                cx="15"
                cy="15"
                r="10"
                stroke="#6C6C6A"
                strokeWidth="1.2"
                strokeDasharray="2 2"
              />
              {/* Left bow wing */}
              <path
                d="M15 13C10 7 3 10 6 16C9 20 14 15 15 13Z"
                fill="#E8CCD7"
                stroke="#6C6C6A"
                strokeWidth="1.2"
              />
              {/* Right bow wing */}
              <path
                d="M15 13C20 7 27 10 24 16C21 20 16 15 15 13Z"
                fill="#E8CCD7"
                stroke="#6C6C6A"
                strokeWidth="1.2"
              />
              {/* Center gathered silk knot */}
              <ellipse
                cx="15"
                cy="13.5"
                rx="3"
                ry="3.5"
                fill="#FFFBF0"
                stroke="#6C6C6A"
                strokeWidth="1.2"
              />
              {/* Cascading ribbon tail 1 */}
              <path
                d="M13.5 16C12 21 8 25 7 26"
                stroke="#6C6C6A"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
              {/* Cascading ribbon tail 2 */}
              <path
                d="M16.5 16C18 21 21 24.5 23 25"
                stroke="#6C6C6A"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>

            {/* Active dot indicator */}
            {selectedCategory === "ties" && (
              <span className="absolute -bottom-[3px] w-[5px] h-[5px] rounded-full bg-[#6C6C6A]" />
            )}
          </div>

          {/* Label Below: 12-14px caption */}
          {!isNoText ? (
            <div className="mt-2 text-center flex flex-col items-center">
              <span className="mp-text-14 font-serif-cn font-medium text-[#6C6C6A] tracking-wider">
                发圈
              </span>
              <span className="mp-text-12 font-serif-en tracking-[0.18em] text-[#6C6C6A]/75 font-normal -mt-[1px]">
                TIES
              </span>
            </div>
          ) : (
            <div className="mt-2 flex flex-col items-center gap-1">
              <div className="w-[30px] h-[10px] rounded-sm bg-[#6C6C6A]/30" />
              <div className="w-[38px] h-[7px] rounded-sm bg-[#6C6C6A]/20" />
            </div>
          )}
        </button>

        {/* Entry 3: Satin Headband "发箍 HEADBANDS" */}
        <button
          type="button"
          onClick={() =>
            onSelectCategory(
              selectedCategory === "headbands" ? "all" : "headbands",
            )
          }
          className={`flex-1 flex flex-col items-center group cursor-pointer transition-transform duration-200 active:scale-95`}
          aria-label="发箍 HEADBANDS"
        >
          {/* Icon Container: Uniform 58px x 58px */}
          <div
            className={`relative w-[58px] h-[58px] rounded-[18px] flex items-center justify-center transition-all duration-200 border ${
              selectedCategory === "headbands"
                ? "bg-[#DEE5ED] border-[#6C6C6A]/50 shadow-[0_3px_12px_rgba(108,108,106,0.12)]"
                : "bg-[#DEE5ED]/65 border-[#6C6C6A]/15 hover:bg-[#DEE5ED]"
            }`}
          >
            {/* Custom Satin Headband Vector Icon */}
            <svg
              className="w-[28px] h-[28px] transition-transform duration-200 group-hover:scale-105"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Crescent padded headband arch */}
              <path
                d="M5 23C4 18 5 9 14 7C23 9 24 18 23 23"
                stroke="#6C6C6A"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              <path
                d="M5 23C4 18 5 9 14 7C23 9 24 18 23 23"
                stroke="#FFFBF0"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              {/* Soft cushion diagonal stitch marks / satin light reflection */}
              <circle cx="14" cy="7.2" r="1.5" fill="#E8CCD7" />
              <line
                x1="9"
                y1="12"
                x2="11"
                y2="10"
                stroke="#6C6C6A"
                strokeWidth="0.8"
              />
              <line
                x1="17"
                y1="10"
                x2="19"
                y2="12"
                stroke="#6C6C6A"
                strokeWidth="0.8"
              />
            </svg>

            {/* Active dot indicator */}
            {selectedCategory === "headbands" && (
              <span className="absolute -bottom-[3px] w-[5px] h-[5px] rounded-full bg-[#6C6C6A]" />
            )}
          </div>

          {/* Label Below: 12-14px caption */}
          {!isNoText ? (
            <div className="mt-2 text-center flex flex-col items-center">
              <span className="mp-text-14 font-serif-cn font-medium text-[#6C6C6A] tracking-wider">
                发箍
              </span>
              <span className="mp-text-12 font-serif-en tracking-[0.14em] text-[#6C6C6A]/75 font-normal -mt-[1px]">
                HEADBANDS
              </span>
            </div>
          ) : (
            <div className="mt-2 flex flex-col items-center gap-1">
              <div className="w-[30px] h-[10px] rounded-sm bg-[#6C6C6A]/30" />
              <div className="w-[38px] h-[7px] rounded-sm bg-[#6C6C6A]/20" />
            </div>
          )}
        </button>
      </div>
    </div>
  )
}
