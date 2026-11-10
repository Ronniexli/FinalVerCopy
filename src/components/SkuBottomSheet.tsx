import React, { useState, useEffect } from "react"
import { Product, ProductColor, ProductSpec } from "../types"
import { X, Check, AlertCircle } from "lucide-react"

interface SkuBottomSheetProps {
  isOpen: boolean
  product: Product | null
  mode: "addToCart" | "buyNow"
  initialColorId?: string
  initialSpecId?: string
  initialQuantity?: number
  onClose: () => void
  onConfirm: (color: ProductColor, spec: ProductSpec, quantity: number) => void
}

export const SkuBottomSheet: React.FC<SkuBottomSheetProps> = ({
  isOpen,
  product,
  mode,
  initialColorId,
  initialSpecId,
  initialQuantity = 1,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !product) return null

  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(
    () => {
      if (initialColorId) {
        return (
          product.colors.find((c) => c.id === initialColorId) ||
          product.colors[0]
        )
      }
      return product.colors.find((c) => c.inStock) || product.colors[0]
    },
  )

  const [selectedSpec, setSelectedSpec] = useState<ProductSpec | null>(() => {
    if (initialSpecId) {
      return (
        product.specs.find((s) => s.id === initialSpecId) || product.specs[0]
      )
    }
    return product.specs.find((s) => s.inStock) || product.specs[0]
  })

  const [quantity, setQuantity] = useState<number>(initialQuantity)
  const [validationError, setValidationError] = useState<string | null>(null)

  // Synchronize when product changes
  useEffect(() => {
    if (product) {
      if (
        !selectedColor ||
        !product.colors.some((c) => c.id === selectedColor.id)
      ) {
        setSelectedColor(
          product.colors.find((c) => c.inStock) || product.colors[0],
        )
      }
      if (
        !selectedSpec ||
        !product.specs.some((s) => s.id === selectedSpec.id)
      ) {
        setSelectedSpec(
          product.specs.find((s) => s.inStock) || product.specs[0],
        )
      }
    }
  }, [product])

  const handleConfirm = () => {
    if (!selectedColor) {
      setValidationError("请选择颜色款式")
      return
    }
    if (!selectedColor.inStock) {
      setValidationError("所选颜色当前无库存，请选择其他色系")
      return
    }
    if (!selectedSpec) {
      setValidationError("请选择规格尺寸")
      return
    }
    if (!selectedSpec.inStock) {
      setValidationError("所选规格当前暂无库存")
      return
    }

    setValidationError(null)
    onConfirm(selectedColor, selectedSpec, quantity)
  }

  const buttonText = mode === "addToCart" ? "加入购物车" : "立即购买"

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col justify-end bg-black/45 backdrop-blur-xs select-none animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-h-[85%] bg-[#FFFBF0] rounded-t-[8px] p-5 pb-8 border-t border-[#46414E]/15 shadow-2xl overflow-y-auto no-scrollbar flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Top Bar with Thumbnail, Price, and Close */}
          <div className="flex gap-3.5 pb-4 border-b border-[#46414E]/10">
            {/* Thumbnail */}
            <div className="relative w-[84px] h-[105px] rounded-[8px] overflow-hidden bg-[#DEE5ED] border border-[#46414E]/10 shrink-0">
              <img
                src={product.images[0]}
                alt={product.nameCn}
                className="w-full h-full object-cover"
              />
              {product.isNew && (
                <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-[4px] bg-[#E8CCD7] text-[#46414E] text-[10px] font-bold font-sans">
                  NEW
                </span>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col justify-between pr-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-[16px] font-medium font-sans text-[#46414E] leading-snug line-clamp-1">
                    {product.nameCn}
                  </h3>
                  <p className="text-[12px] font-serif-en italic text-[#6C6C6A] mt-0.5">
                    {product.nameFr}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-[36px] h-[36px] -mr-2 -mt-1 rounded-[8px] flex items-center justify-center text-[#6C6C6A] hover:text-[#46414E] hover:bg-[#DEE5ED]/50 cursor-pointer"
                  aria-label="关闭规格选择"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Price & Selection Summary */}
              <div>
                <div className="flex items-baseline gap-1 text-[#46414E]">
                  <span className="text-[14px] font-sans">¥</span>
                  <span className="text-[24px] font-serif-en font-bold tracking-tight">
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-[12px] font-serif-en line-through text-[#6C6C6A]/50 ml-1.5">
                      ¥{product.originalPrice}
                    </span>
                  )}
                  <span className="text-[11px] font-sans text-[#6C6C6A] ml-2">
                    库存 {product.stock} 件
                  </span>
                </div>
                <div className="text-[12px] font-sans text-[#6C6C6A] mt-1 truncate">
                  已选：
                  {selectedColor ? selectedColor.name : "未选颜色"}
                  {" / "}
                  {selectedSpec ? selectedSpec.name : "未选规格"}
                </div>
              </div>
            </div>
          </div>

          {/* Validation Error Message */}
          {validationError && (
            <div className="mt-3 p-2.5 rounded-[8px] bg-[#E8CCD7]/40 border border-[#E8CCD7] flex items-center gap-2 text-[12px] text-[#46414E] font-sans">
              <AlertCircle className="w-4 h-4 text-[#6C6C6A] shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Color Section */}
          <div className="py-3.5 border-b border-[#46414E]/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] font-sans font-medium text-[#46414E]">
                颜色款式 COLOR
              </span>
              <span className="text-[12px] font-sans text-[#6C6C6A]">
                {selectedColor?.name}
              </span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {product.colors.map((color) => {
                const isSelected = selectedColor?.id === color.id
                const inStock = color.inStock

                return (
                  <button
                    key={color.id}
                    type="button"
                    disabled={!inStock}
                    onClick={() => {
                      setSelectedColor(color)
                      setValidationError(null)
                    }}
                    className={`min-h-[40px] px-3 py-1.5 rounded-[8px] border text-[13px] font-sans flex items-center gap-2 transition-all cursor-pointer ${
                      !inStock
                        ? "opacity-40 border-dashed border-[#6C6C6A]/30 bg-transparent text-[#6C6C6A] cursor-not-allowed"
                        : isSelected
                          ? "border-[#46414E] bg-[#DEE5ED] text-[#46414E] font-medium shadow-xs ring-1 ring-[#46414E]"
                          : "border-[#46414E]/15 bg-white/70 text-[#46414E] hover:border-[#46414E]/40"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-[4px] border border-black/15 shadow-inner shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.name}</span>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Spec Section */}
          <div className="py-3.5 border-b border-[#46414E]/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] font-sans font-medium text-[#46414E]">
                规格尺寸 SPEC
              </span>
              <span className="text-[12px] font-sans text-[#6C6C6A]">
                {selectedSpec?.name}
              </span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {product.specs.map((spec) => {
                const isSelected = selectedSpec?.id === spec.id
                const inStock = spec.inStock

                return (
                  <button
                    key={spec.id}
                    type="button"
                    disabled={!inStock}
                    onClick={() => {
                      setSelectedSpec(spec)
                      setValidationError(null)
                    }}
                    className={`min-h-[40px] px-3.5 py-1.5 rounded-[8px] border text-[13px] font-sans transition-all cursor-pointer ${
                      !inStock
                        ? "opacity-40 border-dashed border-[#6C6C6A]/30 bg-transparent text-[#6C6C6A] cursor-not-allowed"
                        : isSelected
                          ? "border-[#46414E] bg-[#DEE5ED] text-[#46414E] font-medium shadow-xs ring-1 ring-[#46414E]"
                          : "border-[#46414E]/15 bg-white/70 text-[#46414E] hover:border-[#46414E]/40"
                    }`}
                  >
                    {spec.name}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Quantity Section */}
          <div className="flex items-center justify-between py-4 mb-2">
            <div>
              <span className="text-[13px] font-sans font-medium text-[#46414E] block">
                购买数量 QUANTITY
              </span>
              <span className="text-[11px] font-sans text-[#6C6C6A]">
                每人限购 5 件，避免倒卖保证手作品质
              </span>
            </div>
            <div className="flex items-center border border-[#46414E]/20 rounded-[8px] overflow-hidden bg-white/80">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="w-[38px] h-[34px] flex items-center justify-center text-[#46414E] hover:bg-[#DEE5ED] disabled:opacity-30 cursor-pointer"
                aria-label="减少数量"
              >
                -
              </button>
              <span className="w-[44px] text-center text-[14px] font-serif-en font-medium text-[#46414E]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(5, quantity + 1))}
                disabled={quantity >= 5}
                className="w-[38px] h-[34px] flex items-center justify-center text-[#46414E] hover:bg-[#DEE5ED] disabled:opacity-30 cursor-pointer"
                aria-label="增加数量"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Action Button: Height 48, rounded 8px */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleConfirm}
            className={`w-full h-[48px] rounded-[8px] font-sans text-[15px] font-medium tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99] shadow-sm ${
              mode === "addToCart"
                ? "bg-[#DEE5ED] text-[#46414E] border border-[#46414E]/25 hover:bg-[#d0dbe6]"
                : "bg-[#46414E] text-[#FFFBF0] hover:bg-[#39343f]"
            }`}
          >
            <span>{buttonText}</span>
            <span className="font-serif-en text-[13px] opacity-80 uppercase tracking-widest">
              · ¥{product.price * quantity}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
