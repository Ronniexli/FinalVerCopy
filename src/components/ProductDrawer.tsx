import React, { useState } from "react"
import { Product } from "../types"
import { EtoileMark, EtoileWordmark } from "./EtoileLogo"
import { X, Check } from "lucide-react"

interface ProductDrawerProps {
  product: Product | null
  onClose: () => void
  onAddToCart: (product: Product, quantity: number, color: string) => void
}

export const ProductDrawer: React.FC<ProductDrawerProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null

  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.name || "",
  )
  const [quantity, setQuantity] = useState(1)

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col justify-end bg-black/40 backdrop-blur-xs select-none"
      onClick={onClose}
    >
      <div
        className="w-full max-h-[84%] bg-[#FFFBF0] rounded-t-[20px] p-5 pb-9 border-t border-[#6C6C6A]/20 shadow-2xl overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Handle */}
        <div className="w-10 h-1 rounded-full bg-[#6C6C6A]/30 mx-auto mb-3" />

        {/* Brand Micro-header */}
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#6C6C6A]/10">
          <div className="flex items-center gap-1.5">
            <EtoileMark size="sm" showStar={false} />
            <EtoileWordmark size="sm" />
            <span className="text-[10px] font-serif-cn text-[#6C6C6A]/60">
              · 选品详情
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-[#6C6C6A]/60 hover:text-[#6C6C6A] cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Header with image preview and details */}
        <div className="flex gap-4 pb-4 border-b border-[#6C6C6A]/12">
          <div className="relative w-[90px] h-[90px] rounded-[8px] overflow-hidden bg-[#DEE5ED] border border-[#6C6C6A]/20 shrink-0">
            <img
              src={product.image}
              alt={product.nameCn}
              className="w-full h-full object-cover"
            />
            {product.isNew && (
              <span className="absolute top-1 left-1 px-[5px] py-[1px] rounded-[2px] bg-[#E8CCD7] text-[#6C6C6A] text-[9px] font-bold font-serif-en">
                NEW
              </span>
            )}
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="mp-text-16 font-serif-cn font-medium text-[#6C6C6A]">
                {product.nameCn}
              </h3>
              <p className="mp-text-12 font-serif-en italic text-[#6C6C6A]/75">
                {product.nameEn}
              </p>
            </div>

            <div className="flex items-baseline gap-1 mt-1">
              <span className="mp-text-14 font-serif-cn font-medium text-[#6C6C6A]">
                ¥
              </span>
              <span className="mp-text-24 font-serif-en font-bold text-[#6C6C6A]">
                {product.price}
              </span>
              {product.originalPrice && (
                <span className="mp-text-12 font-serif-en line-through text-[#6C6C6A]/40 ml-1">
                  ¥{product.originalPrice}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Details & Specs */}
        <div className="py-3 border-b border-[#6C6C6A]/12 space-y-2">
          <div className="text-[12px] font-sans-app text-[#6C6C6A]/85 leading-relaxed">
            {product.description}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[#6C6C6A]/70 font-sans-app bg-[#DEE5ED]/50 px-3 py-1.5 rounded-[6px]">
            <span className="font-medium text-[#6C6C6A]">材质规格：</span>
            <span>{product.material}</span>
          </div>
        </div>

        {/* Color Palette Selector */}
        <div className="py-3 border-b border-[#6C6C6A]/12">
          <div className="mp-text-12 font-serif-cn font-medium text-[#6C6C6A] mb-2 flex items-center justify-between">
            <span>色系选择 PALETTE</span>
            <span className="text-[11px] text-[#6C6C6A]/70">
              {selectedColor}
            </span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {product.colors.map((color) => {
              const isSelected = selectedColor === color.name
              return (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color.name)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-[6px] border text-[12px] font-sans-app transition-all cursor-pointer ${
                    isSelected
                      ? "border-[#6C6C6A] bg-[#DEE5ED] text-[#6C6C6A] font-medium shadow-xs"
                      : "border-[#6C6C6A]/20 bg-white/60 text-[#6C6C6A]/80 hover:bg-[#DEE5ED]/40"
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-inner"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span>{color.name}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                </button>
              )
            })}
          </div>
        </div>

        {/* Quantity */}
        <div className="flex items-center justify-between py-3 mb-4">
          <span className="mp-text-12 font-serif-cn font-medium text-[#6C6C6A]">
            购买数量 QUANTITY
          </span>
          <div className="flex items-center border border-[#6C6C6A]/20 rounded-[6px] overflow-hidden bg-white/50">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-2.5 py-1 text-[#6C6C6A] hover:bg-[#DEE5ED] text-[14px] cursor-pointer"
            >
              -
            </button>
            <span className="px-3 py-1 mp-text-14 font-serif-en font-medium text-[#6C6C6A]">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="px-2.5 py-1 text-[#6C6C6A] hover:bg-[#DEE5ED] text-[14px] cursor-pointer"
            >
              +
            </button>
          </div>
        </div>

        {/* Action Button: Add to Cart in Dim Gray */}
        <button
          type="button"
          onClick={() => {
            onAddToCart(product, quantity, selectedColor)
            onClose()
          }}
          className="w-full py-3 rounded-[8px] bg-[#6C6C6A] text-[#FFFBF0] mp-text-14 font-serif-cn font-medium tracking-wider hover:bg-[#585856] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
        >
          <span>加入选品夹</span>
          <span className="font-serif-en tracking-widest text-[12px] opacity-80 uppercase">
            ADD TO BAG · ¥{product.price * quantity}
          </span>
        </button>
      </div>
    </div>
  )
}
