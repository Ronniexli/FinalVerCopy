import React from "react"
import { ChevronLeft, ShoppingBag } from "lucide-react"
import { EtoileMark, EtoileWordmark } from "./EtoileLogo"

interface EtoileNavbarProps {
  title?: string
  showBack?: boolean
  onBack?: () => void
  showCart?: boolean
  cartCount?: number
  onCartClick?: () => void
  transparent?: boolean
  showBrandLogo?: boolean
}

export const EtoileNavbar: React.FC<EtoileNavbarProps> = ({
  title,
  showBack = false,
  onBack,
  showCart = false,
  cartCount = 0,
  onCartClick,
  transparent = false,
  showBrandLogo = false,
}) => {
  return (
    <header
      className={`relative w-full z-30 pt-[48px] px-5 pb-2.5 flex items-center justify-between select-none transition-colors duration-200 ${
        transparent
          ? "bg-transparent text-[#46414E]"
          : "bg-[#FFFBF0]/95 backdrop-blur-md border-b border-[#46414E]/8 text-[#46414E]"
      }`}
    >
      {/* Left Area (Back Button or Empty) */}
      <div className="flex items-center gap-1 min-w-[70px]">
        {showBack ? (
          <button
            type="button"
            onClick={onBack}
            className="w-[44px] h-[44px] -ml-2 rounded-[8px] flex items-center justify-center text-[#46414E] hover:bg-[#DEE5ED]/60 active:scale-95 transition-all cursor-pointer"
            aria-label="返回上一页"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2]" />
          </button>
        ) : showBrandLogo ? (
          <div className="flex items-center gap-2">
            <EtoileMark size="sm" showStar={true} />
            <EtoileWordmark size="sm" />
          </div>
        ) : null}
      </div>

      {/* Center Title (Reserved area centered between left and WeChat capsule) */}
      <div className="flex-1 text-center pr-[96px] truncate">
        {title && !showBrandLogo && (
          <h1 className="text-[17px] font-medium font-sans tracking-wide text-[#46414E] truncate">
            {title}
          </h1>
        )}
      </div>

      {/* Right Area: Secondary Cart Action Button if specified */}
      {showCart && (
        <button
          type="button"
          onClick={onCartClick}
          className="absolute right-[102px] top-[48px] w-[36px] h-[36px] rounded-[8px] flex items-center justify-center text-[#46414E] hover:bg-[#DEE5ED]/50 active:scale-95 transition-all cursor-pointer"
          title="查看购物车"
          aria-label="查看购物车"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 min-w-[16px] h-[16px] px-1 rounded-[8px] bg-[#E8CCD7] border border-[#FFFBF0] text-[#46414E] text-[10px] font-bold font-sans flex items-center justify-center shadow-xs">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </div>
        </button>
      )}
    </header>
  )
}
