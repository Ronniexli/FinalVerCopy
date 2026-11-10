import React from "react"
import { CartItem } from "../types"
import { EtoileNavbar } from "../components/EtoileNavbar"
import { Trash2, ShoppingBag, Check, Plus, Minus } from "lucide-react"

interface CartScreenProps {
  items: CartItem[]
  onBack: () => void
  onToggleItem: (itemId: string) => void
  onToggleAll: () => void
  onUpdateQuantity: (itemId: string, delta: number) => void
  onRemoveItem: (itemId: string) => void
  onGoToShop: () => void
  onCheckout: () => void
}

export const CartScreen: React.FC<CartScreenProps> = ({
  items,
  onBack,
  onToggleItem,
  onToggleAll,
  onUpdateQuantity,
  onRemoveItem,
  onGoToShop,
  onCheckout,
}) => {
  const selectedItems = items.filter((item) => item.selected)
  const isAllSelected =
    items.length > 0 && selectedItems.length === items.length
  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  return (
    <div className="relative w-full h-full min-h-0 flex flex-col overflow-hidden bg-[#FFFBF0] text-[#46414E]">
      {/* 1. Header with Back Button */}
      <EtoileNavbar
        showBack={true}
        onBack={onBack}
        title={`选品夹 (${items.length})`}
      />

      {/* 2. Content */}
      <div className="flex-1 w-full min-h-0 overflow-y-auto overscroll-contain no-scrollbar pb-[100px]">
        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="w-full py-20 px-6 flex flex-col items-center justify-center text-center">
            <div className="w-[64px] h-[64px] rounded-[8px] bg-[#DEE5ED] flex items-center justify-center mb-4 text-[#6C6C6A]">
              <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h3 className="text-[17px] font-sans font-medium text-[#46414E] mb-1">
              选品夹暂无发饰
            </h3>
            <p className="text-[13px] font-sans text-[#6C6C6A] max-w-[240px] mb-6">
              探索法国沙龙手工真丝系列，为梳髻增添一抹流光。
            </p>
            <button
              type="button"
              onClick={onGoToShop}
              className="h-[48px] px-8 rounded-[8px] bg-[#46414E] text-[#FFFBF0] text-[14px] font-sans font-medium hover:bg-[#38343f] active:scale-[0.99] transition-all cursor-pointer shadow-sm"
            >
              探索全线作品
            </button>
          </div>
        ) : (
          <div className="px-5 pt-3 space-y-3">
            {/* Free shipping notice banner */}
            <div className="p-2.5 rounded-[8px] bg-[#DEE5ED]/60 border border-[#46414E]/8 text-[12px] font-sans text-[#46414E] flex items-center justify-between">
              <span>全场顺丰特快免邮 · 赠高端防尘礼盒</span>
              <span className="text-[11px] text-[#6C6C6A]">已享特惠</span>
            </div>

            {/* Items List */}
            {items.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-[8px] bg-white/80 border border-[#46414E]/10 flex items-center gap-3 shadow-xs"
              >
                {/* Selection Checkbox (Max 8px rounded) */}
                <button
                  type="button"
                  onClick={() => onToggleItem(item.id)}
                  className={`w-[22px] h-[22px] rounded-[6px] border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                    item.selected
                      ? "bg-[#46414E] border-[#46414E] text-[#FFFBF0]"
                      : "border-[#46414E]/30 bg-white hover:border-[#46414E]"
                  }`}
                  aria-label={item.selected ? "取消勾选" : "勾选商品"}
                >
                  {item.selected && (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  )}
                </button>

                {/* Thumbnail */}
                <div className="relative w-[70px] h-[88px] rounded-[8px] overflow-hidden bg-[#DEE5ED] shrink-0 border border-[#46414E]/8">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.nameCn}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Item Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between h-[88px]">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="text-[13px] font-sans font-medium text-[#46414E] truncate leading-tight">
                      {item.product.nameCn}
                    </h4>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[#6C6C6A] hover:text-[#46414E] p-1 -mr-1 cursor-pointer"
                      title="移出选品夹"
                      aria-label="删除此商品"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Chosen SKU Badge */}
                  <div className="flex items-center gap-1.5 text-[11px] font-sans text-[#6C6C6A] bg-[#DEE5ED]/50 px-2 py-0.5 rounded-[4px] w-fit max-w-full truncate">
                    <span
                      className="w-2.5 h-2.5 rounded-[2px] border border-black/15 shrink-0"
                      style={{ backgroundColor: item.colorHex }}
                    />
                    <span className="truncate">
                      {item.colorName} · {item.specName}
                    </span>
                  </div>

                  {/* Price & Quantity Controls */}
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[15px] font-serif-en font-bold text-[#46414E]">
                      ¥{item.price}
                    </span>

                    {/* Stepper */}
                    <div className="flex items-center border border-[#46414E]/20 rounded-[6px] overflow-hidden bg-white">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-[28px] h-[26px] flex items-center justify-center text-[#46414E] hover:bg-[#DEE5ED] disabled:opacity-30 cursor-pointer"
                        aria-label="减少一件"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-[30px] text-center text-[12px] font-serif-en font-medium text-[#46414E]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        disabled={item.quantity >= 5}
                        className="w-[28px] h-[26px] flex items-center justify-center text-[#46414E] hover:bg-[#DEE5ED] disabled:opacity-30 cursor-pointer"
                        aria-label="增加一件"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Fixed Bottom Bar */}
      {items.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 z-40 bg-[#FFFBF0]/95 backdrop-blur-xl border-t border-[#46414E]/10 px-5 pt-2.5 pb-[22px] flex items-center justify-between">
          {/* Select All */}
          <button
            type="button"
            onClick={onToggleAll}
            className="flex items-center gap-2 cursor-pointer text-[13px] font-sans text-[#46414E]"
          >
            <div
              className={`w-[20px] h-[20px] rounded-[6px] border flex items-center justify-center transition-all ${
                isAllSelected
                  ? "bg-[#46414E] border-[#46414E] text-[#FFFBF0]"
                  : "border-[#46414E]/30 bg-white"
              }`}
            >
              {isAllSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
            <span>全选</span>
          </button>

          {/* Total & Checkout Button (h-48, rounded-8px) */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[11px] font-sans text-[#6C6C6A] block">
                合计 (不含税)
              </span>
              <div className="flex items-baseline gap-0.5 justify-end text-[#46414E]">
                <span className="text-[13px] font-sans">¥</span>
                <span className="text-[20px] font-serif-en font-bold leading-none">
                  {totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="button"
              disabled={selectedItems.length === 0}
              onClick={onCheckout}
              className={`h-[48px] px-6 rounded-[8px] font-sans text-[14px] font-medium tracking-wider flex items-center justify-center transition-all cursor-pointer shadow-sm ${
                selectedItems.length === 0
                  ? "bg-[#46414E]/30 text-white/70 cursor-not-allowed"
                  : "bg-[#46414E] text-[#FFFBF0] hover:bg-[#38343f] active:scale-[0.99]"
              }`}
            >
              去结算 ({selectedItems.length})
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
