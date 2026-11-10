import React from "react"
import { Product, ViewMode } from "../types"
import { Plus } from "lucide-react"

interface WaterfallGridProps {
  products: Product[]
  onSelectProduct: (product: Product) => void
  onAddToCart: (product: Product, e: React.MouseEvent) => void
  viewMode: ViewMode
}

export const WaterfallGrid: React.FC<WaterfallGridProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  viewMode,
}) => {
  const isNoText = viewMode === "notext"

  // Split into 2 columns for genuine waterfall masonry rhythm
  const colLeft = products.filter((_, idx) => idx % 2 === 0)
  const colRight = products.filter((_, idx) => idx % 2 !== 0)

  const renderProductCard = (product: Product) => {
    const isTall = product.heightRatio === "tall"

    return (
      <div
        key={product.id}
        onClick={() => onSelectProduct(product)}
        className="group relative w-full mb-3 cursor-pointer select-none transition-all duration-300 active:scale-[0.98]"
      >
        {/* Card Container: azureish white #DEE5ED, 8px smooth rounded corners */}
        <div className="relative w-full rounded-[8px] overflow-hidden bg-[#DEE5ED] border border-[#6C6C6A]/12 shadow-[0_2px_8px_rgba(108,108,106,0.06)] hover:shadow-[0_6px_16px_rgba(108,108,106,0.12)] transition-shadow">
          {/* Product Photo Area */}
          <div
            className={`relative w-full overflow-hidden bg-[#D3DEE8] ${
              isTall ? "h-[175px]" : "h-[140px]"
            }`}
          >
            <img
              src={product.image}
              alt={isNoText ? "" : product.nameCn}
              className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
              loading="lazy"
            />

            {/* Soft silk sheen overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#6C6C6A]/20 via-transparent to-transparent pointer-events-none" />

            {/* Small "NEW" Corner Tag in queen pink #E8CCD7 */}
            {product.isNew && (
              <div className="absolute top-[8px] left-[8px] z-10">
                <div className="px-[6px] py-[1.5px] rounded-[3px] bg-[#E8CCD7] border border-[#6C6C6A]/20 shadow-sm flex items-center justify-center">
                  {!isNoText ? (
                    <span className="mp-text-12 font-serif-en font-bold tracking-widest text-[#6C6C6A] leading-none uppercase">
                      NEW
                    </span>
                  ) : (
                    <div className="w-[18px] h-[6px] rounded-xs bg-[#6C6C6A]/40" />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Card Info Area */}
          <div className="p-[10px] bg-[#DEE5ED]">
            {!isNoText ? (
              <>
                {/* Product Name (Chinese: Source Han Serif, English: Cormorant Garamond) */}
                <h3 className="mp-text-14 font-serif-cn font-medium text-[#6C6C6A] truncate leading-tight">
                  {product.nameCn}
                </h3>
                <p className="mp-text-12 font-serif-en italic text-[#6C6C6A]/75 truncate mb-2">
                  {product.nameEn}
                </p>

                {/* Price and Small Circular Add Button */}
                <div className="flex items-center justify-between pt-1 border-t border-[#6C6C6A]/10">
                  {/* Price in dim gray #6C6C6A bold */}
                  <div className="flex items-baseline gap-1">
                    <span className="mp-text-12 font-serif-cn font-medium text-[#6C6C6A]">
                      ¥
                    </span>
                    <span className="mp-text-16 font-serif-en font-bold text-[#6C6C6A] tracking-tight">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="mp-text-12 font-serif-en line-through text-[#6C6C6A]/40 ml-1">
                        ¥{product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Small dim gray #6C6C6A circular add-button */}
                  <button
                    type="button"
                    onClick={(e) => onAddToCart(product, e)}
                    className="w-[24px] h-[24px] rounded-full bg-[#6C6C6A] text-[#FFFBF0] flex items-center justify-center cursor-pointer transition-transform duration-150 hover:scale-110 active:scale-90 shadow-sm"
                    title="加入选品夹"
                    aria-label="Add to bag"
                  >
                    <Plus className="w-[13px] h-[13px] stroke-[2.5]" />
                  </button>
                </div>
              </>
            ) : (
              /* No-Text Flat Abstract Mode */
              <div className="flex flex-col gap-2 pt-1" aria-hidden="true">
                <div className="w-[85%] h-[11px] rounded-xs bg-[#6C6C6A]/25" />
                <div className="w-[60%] h-[8px] rounded-xs bg-[#6C6C6A]/15" />
                <div className="flex items-center justify-between pt-2 border-t border-[#6C6C6A]/10">
                  <div className="w-[45px] h-[14px] rounded-xs bg-[#6C6C6A]/35" />
                  {/* Small dim gray circular add-button */}
                  <div className="w-[24px] h-[24px] rounded-full bg-[#6C6C6A] flex items-center justify-center">
                    <Plus className="w-[13px] h-[13px] stroke-[2.5] text-[#FFFBF0]" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full px-4 pt-3 pb-8 select-none bg-[#FFFBF0]">
      {/* 
        Section Header: "今日推荐 TODAY'S PICK"
        with [Accent Place 2 of ≤ 2 places on single screen]:
        Thin dim gray #6C6C6A 1.5px ribbon-curve stroke accent.
      */}
      <div className="relative flex items-center justify-between mb-4 px-1">
        <div className="flex items-baseline gap-2">
          {!isNoText ? (
            <>
              {/* Chinese title: Source Han Serif SC (18px fixed size) */}
              <h2 className="mp-text-18 font-serif-cn font-medium tracking-wide text-[#6C6C6A]">
                今日推荐
              </h2>
              {/* English sub: Cormorant Garamond (14px fixed size) */}
              <span className="mp-text-14 font-serif-en font-normal tracking-[0.2em] text-[#6C6C6A]/75 uppercase">
                TODAY'S PICK
              </span>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-[72px] h-[16px] rounded-xs bg-[#6C6C6A]/35" />
              <div className="w-[85px] h-[11px] rounded-xs bg-[#6C6C6A]/20" />
            </div>
          )}
        </div>

        {/* 
          [Accent Place 2 of ≤ 2 places]:
          Thin dim gray #6C6C6A 1.5px ribbon-curve stroke accent
        */}
        <div className="pointer-events-none w-[70px] h-[24px] flex items-center justify-end">
          <svg
            className="w-[64px] h-[18px]"
            viewBox="0 0 64 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Exact 1.5px stroke ribbon curve */}
            <path
              d="M2,14 C18,2 32,18 48,6 C55,1 60,8 62,12"
              stroke="#6C6C6A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeOpacity="0.55"
            />
            {/* Soft end tick */}
            <circle cx="62" cy="12" r="1.2" fill="#6C6C6A" />
          </svg>
        </div>
      </div>

      {/* Waterfall Masonry Grid (2 Columns) */}
      <div className="grid grid-cols-2 gap-3 items-start">
        {/* Left Column */}
        <div className="flex flex-col">{colLeft.map(renderProductCard)}</div>

        {/* Right Column */}
        <div className="flex flex-col">{colRight.map(renderProductCard)}</div>
      </div>
    </div>
  )
}
