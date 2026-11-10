import React, { useEffect, useState } from "react"
import { CartItem } from "../types"
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight } from "lucide-react"

interface FloatingMiniCartProps {
  items: CartItem[]
  onUpdateQuantity: (itemId: string, delta: number) => void
  onRemoveItem: (itemId: string) => void
  onGoToCartCheckout: () => void
}

export const FloatingMiniCart: React.FC<FloatingMiniCartProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onGoToCartCheckout,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [bump, setBump] = useState(false)

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  // Gentle pulse animation whenever totalCount increases
  useEffect(() => {
    if (totalCount === 0) return
    setBump(true)
    const timer = window.setTimeout(() => setBump(false), 320)
    return () => window.clearTimeout(timer)
  }, [totalCount])

  return (
    <>
      {/* A. Floating Liquid Glass Capsule Button (Bottom-Right of Shop Page, above BottomTabBar) */}
      <div className="pointer-events-none absolute bottom-[88px] right-4 z-30">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={`pointer-events-auto h-[46px] px-4 rounded-full bg-[#FFFBF0]/88 backdrop-blur-xl border border-[#C88F98]/45 shadow-[0_10px_28px_rgba(70,65,78,0.16),inset_0_1px_0_rgba(255,255,255,0.85)] flex items-center gap-2.5 text-[#46414E] hover:bg-[#FFFBF0] active:scale-95 transition-all duration-200 cursor-pointer ${
            bump ? "scale-105 ring-2 ring-[#C88F98]/40" : "scale-100"
          }`}
          aria-label="打开购物袋"
        >
          {/* Bag Icon with Dusty-Rose Accent */}
          <div className="relative w-7 h-7 rounded-full bg-[#C88F98]/18 flex items-center justify-center text-[#46414E] shrink-0">
            <ShoppingBag className="w-4 h-4 stroke-[1.9] text-[#46414E]" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full bg-[#C88F98] text-white text-[10px] font-semibold leading-none flex items-center justify-center shadow-2xs">
                {totalCount > 99 ? "99+" : totalCount}
              </span>
            )}
          </div>

          {totalCount === 0 ? (
            <span className="text-[14px] font-medium tracking-wide text-[#46414E] pr-0.5">
              购物袋
            </span>
          ) : (
            <div className="flex items-center gap-2 pr-0.5">
              <span className="text-[13px] font-medium text-[#46414E] whitespace-nowrap">
                购物袋 · {totalCount}
              </span>
              <span className="h-3.5 w-[1px] bg-[#46414E]/15" />
              <span className="text-[14px] font-semibold text-[#46414E] whitespace-nowrap">
                ¥{subtotal}
              </span>
            </div>
          )}
        </button>
      </div>

      {/* C. Mini Cart Bottom Sheet Overlay */}
      {isOpen && (
        <div
          className="absolute inset-0 z-40 bg-black/35 backdrop-blur-[2px] flex flex-col justify-end animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-h-[78%] rounded-t-[20px] bg-[#F8F6F2] border-t border-[#C88F98]/35 shadow-[0_-16px_40px_rgba(42,37,44,0.22)] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Subtle Drag Handle */}
            <div className="w-full pt-2.5 pb-1 flex justify-center shrink-0">
              <div className="w-9 h-1 rounded-full bg-[#46414E]/20" />
            </div>

            {/* Sheet Header */}
            <div className="px-5 py-3 border-b border-[#46414E]/8 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#C88F98]" />
                <h3 className="text-[18px] font-medium text-[#46414E]">
                  购物袋
                </h3>
                {totalCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#C88F98]/20 text-[#46414E] text-[12px] font-medium">
                    {totalCount} 件
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-[#46414E]/6 hover:bg-[#46414E]/12 flex items-center justify-center text-[#6C6C6A] hover:text-[#46414E] transition-colors cursor-pointer"
                aria-label="关闭购物袋"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sheet Body */}
            {items.length === 0 ? (
              <div className="px-6 py-14 flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#C88F98]/15 flex items-center justify-center text-[#C88F98] mb-3.5">
                  <ShoppingBag className="w-6 h-6 stroke-[1.6]" />
                </div>
                <p className="text-[16px] font-medium text-[#46414E] mb-1">
                  购物袋还是空的
                </p>
                <p className="text-[13px] text-[#6C6C6A] mb-5">
                  挑一件心仪的芭蕾风发饰，点亮今日造型
                </p>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="h-[42px] px-6 rounded-[8px] bg-[#46414E] text-[#FFFBF0] text-[14px] font-medium hover:bg-[#38343f] active:scale-95 transition-all cursor-pointer"
                >
                  去逛逛
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain no-scrollbar px-5 py-3.5 space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-[10px] bg-white border border-[#46414E]/8 flex items-center gap-3 shadow-2xs"
                    >
                      {/* Thumbnail */}
                      <div className="w-[60px] h-[68px] rounded-[6px] bg-white border border-[#46414E]/8 p-1 shrink-0 overflow-hidden flex items-center justify-center">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.nameCn}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-[14px] font-medium text-[#46414E] truncate">
                            {item.product.nameCn}
                          </h4>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.id)}
                            className="p-1 text-[#6C6C6A]/60 hover:text-[#46414E] transition-colors cursor-pointer shrink-0"
                            aria-label="移除商品"
                            title="移除"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-[12px] text-[#6C6C6A] truncate mt-0.5">
                          {item.colorName}
                        </p>

                        <div className="flex items-center justify-between mt-2">
                          <span className="text-[15px] font-semibold text-[#46414E]">
                            ¥{item.price}
                          </span>

                          {/* Quantity Controls (+ / -) */}
                          <div className="flex items-center border border-[#46414E]/15 rounded-[6px] bg-[#F8F6F2] overflow-hidden">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="w-7 h-6 flex items-center justify-center text-[#46414E] hover:bg-[#C88F98]/15 cursor-pointer"
                              aria-label="减少数量"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center text-[13px] font-medium text-[#46414E]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="w-7 h-6 flex items-center justify-center text-[#46414E] hover:bg-[#C88F98]/15 cursor-pointer"
                              aria-label="增加数量"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sheet Footer: Subtotal & Primary Action */}
                <div className="px-5 pt-3 pb-5 bg-[#FFFBF0] border-t border-[#46414E]/10 shrink-0 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[13px] text-[#6C6C6A]">
                      商品小计（共 {totalCount} 件）
                    </span>
                    <span className="text-[20px] font-semibold text-[#46414E]">
                      ¥{subtotal}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false)
                      onGoToCartCheckout()
                    }}
                    className="w-full h-[46px] rounded-[8px] bg-[#46414E] text-[#FFFBF0] text-[15px] font-medium flex items-center justify-center gap-2 hover:bg-[#38343f] active:scale-[0.99] transition-all cursor-pointer shadow-xs"
                  >
                    <span>去购物车结算</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
