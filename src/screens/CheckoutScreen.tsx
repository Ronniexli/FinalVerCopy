import React, { useState } from "react"
import { Address, CartItem } from "../types"
import { EtoileNavbar } from "../components/EtoileNavbar"
import { MapPin, ChevronRight, Truck, Gift, ShieldCheck } from "lucide-react"

interface CheckoutScreenProps {
  items: CartItem[]
  source: "cart" | "buyNow"
  selectedAddress: Address | null
  onBack: () => void
  onSelectAddress: () => void
  onSubmitOrder: (note: string) => void
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  items,
  source,
  selectedAddress,
  onBack,
  onSelectAddress,
  onSubmitOrder,
}) => {
  const [orderNote, setOrderNote] = useState("")

  const itemsTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )
  const shippingFee = 0 // SF Express Free
  const finalTotal = itemsTotal + shippingFee

  return (
    <div className="relative w-full h-full min-h-0 flex flex-col overflow-hidden bg-[#FFFBF0] text-[#46414E]">
      {/* 1. Header */}
      <EtoileNavbar showBack={true} onBack={onBack} title="确认订单" />

      {/* 2. Scrollable Content */}
      <div className="flex-1 w-full min-h-0 overflow-y-auto overscroll-contain no-scrollbar px-5 pt-3 pb-[110px] space-y-3.5">
        {/* Shipping Address Card */}
        <div
          onClick={onSelectAddress}
          className="p-4 rounded-[8px] bg-white border border-[#46414E]/12 flex items-center justify-between cursor-pointer hover:bg-[#DEE5ED]/30 transition-colors shadow-xs"
        >
          {selectedAddress ? (
            <div className="flex items-start gap-3 min-w-0 pr-2">
              <div className="w-8 h-8 rounded-[6px] bg-[#DEE5ED] flex items-center justify-center text-[#46414E] shrink-0 mt-0.5">
                <MapPin className="w-4 h-4 text-[#6E89A8]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[15px] font-sans font-medium text-[#46414E]">
                    {selectedAddress.receiver}
                  </span>
                  <span className="text-[13px] font-sans text-[#6C6C6A]">
                    {selectedAddress.phone}
                  </span>
                  {selectedAddress.isDefault && (
                    <span className="px-1.5 py-0.5 rounded-[4px] bg-[#E8CCD7] text-[#46414E] text-[10px] font-medium font-sans">
                      默认
                    </span>
                  )}
                </div>
                <p className="text-[12px] font-sans text-[#6C6C6A] leading-relaxed line-clamp-2">
                  {selectedAddress.province} {selectedAddress.city}{" "}
                  {selectedAddress.district} {selectedAddress.detail}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 py-1">
              <div className="w-8 h-8 rounded-[6px] bg-[#E8CCD7]/60 flex items-center justify-center text-[#46414E]">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[14px] font-sans font-medium text-[#46414E] block">
                  请选择或添加收货地址
                </span>
                <span className="text-[11px] font-sans text-[#6C6C6A]">
                  顺丰特快次日达
                </span>
              </div>
            </div>
          )}
          <ChevronRight className="w-5 h-5 text-[#6C6C6A] shrink-0" />
        </div>

        {/* Order Items Section */}
        <div className="p-4 rounded-[8px] bg-white border border-[#46414E]/12 space-y-3 shadow-xs">
          <div className="flex items-center justify-between pb-2.5 border-b border-[#46414E]/8">
            <span className="text-[13px] font-sans font-medium text-[#46414E]">
              商品清单 ({items.length} 件)
            </span>
            <span className="text-[11px] font-serif-en text-[#6C6C6A] uppercase">
              {source === "buyNow" ? "立即购买专享通道" : "选品夹合并结算"}
            </span>
          </div>

          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="w-[64px] h-[80px] rounded-[6px] overflow-hidden bg-[#DEE5ED] border border-[#46414E]/8 shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.nameCn}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                  <div>
                    <h4 className="text-[13px] font-sans font-medium text-[#46414E] truncate">
                      {item.product.nameCn}
                    </h4>
                    <p className="text-[11px] font-serif-en italic text-[#6C6C6A] truncate">
                      {item.product.nameFr}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1 text-[11px] font-sans text-[#6C6C6A]">
                      <span
                        className="w-2 h-2 rounded-[2px]"
                        style={{ backgroundColor: item.colorHex }}
                      />
                      <span>
                        {item.colorName} · {item.specName}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-serif-en font-bold text-[#46414E]">
                      ¥{item.price}
                    </span>
                    <span className="text-[12px] font-sans text-[#6C6C6A]">
                      × {item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping & Packaging Perks */}
        <div className="p-4 rounded-[8px] bg-white border border-[#46414E]/12 space-y-2.5 shadow-xs text-[12px] font-sans">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#46414E]">
              <Truck className="w-4 h-4 text-[#6E89A8]" />
              <span>配送服务</span>
            </div>
            <div className="text-right">
              <span className="font-medium text-[#46414E]">顺丰特快 包邮</span>
              <span className="text-[11px] text-[#6C6C6A] block">
                预计明日 18:00 前送达
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#46414E]/6">
            <div className="flex items-center gap-2 text-[#46414E]">
              <Gift className="w-4 h-4 text-[#E4C5C9]" />
              <span>礼遇包装</span>
            </div>
            <span className="text-[#6C6C6A]">
              赠 ÉTOILE 经典丝绒礼盒与品牌丝带
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#46414E]/6">
            <div className="flex items-center gap-2 text-[#46414E]">
              <ShieldCheck className="w-4 h-4 text-[#6E89A8]" />
              <span>正品保证</span>
            </div>
            <span className="text-[#6C6C6A]">100% 桑蚕真丝 · 附防伪溯源卡</span>
          </div>
        </div>

        {/* Order Note */}
        <div className="p-3.5 rounded-[8px] bg-white border border-[#46414E]/12 shadow-xs">
          <label className="text-[12px] font-sans font-medium text-[#46414E] block mb-1.5">
            订单留言 (选填)
          </label>
          <input
            type="text"
            value={orderNote}
            onChange={(e) => setOrderNote(e.target.value)}
            placeholder="若需手写礼品贺卡或特殊交付要求，请在此注明"
            className="w-full text-[12px] font-sans text-[#46414E] placeholder-[#6C6C6A]/60 bg-[#FFFBF0]/60 p-2 rounded-[6px] border border-[#46414E]/10 outline-none"
          />
        </div>

        {/* Amount Breakdown */}
        <div className="p-4 rounded-[8px] bg-white border border-[#46414E]/12 space-y-2 shadow-xs text-[12px] font-sans">
          <div className="flex items-center justify-between text-[#6C6C6A]">
            <span>商品总金额</span>
            <span>¥{itemsTotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-[#6C6C6A]">
            <span>顺丰运费</span>
            <span className="text-[#6E89A8]">免运费 (已免 ¥18.00)</span>
          </div>
          <div className="flex items-center justify-between text-[#6C6C6A]">
            <span>礼盒定制</span>
            <span className="text-[#E4C5C9]">免费赠送</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-[#46414E]/8 text-[14px]">
            <span className="font-medium text-[#46414E]">应付总额</span>
            <span className="font-serif-en font-bold text-[18px] text-[#46414E]">
              ¥{finalTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Fixed Bottom Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-40 bg-[#FFFBF0]/95 backdrop-blur-xl border-t border-[#46414E]/10 px-5 pt-2.5 pb-[22px] flex items-center justify-between">
        <div>
          <span className="text-[11px] font-sans text-[#6C6C6A] block">
            实付金额
          </span>
          <div className="flex items-baseline gap-0.5 text-[#46414E]">
            <span className="text-[13px] font-sans">¥</span>
            <span className="text-[22px] font-serif-en font-bold leading-none">
              {finalTotal.toFixed(2)}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onSubmitOrder(orderNote)}
          className="h-[48px] px-8 rounded-[8px] bg-[#46414E] text-[#FFFBF0] text-[15px] font-sans font-medium tracking-wider hover:bg-[#38343f] active:scale-[0.99] transition-all cursor-pointer shadow-sm flex items-center justify-center"
        >
          提交订单
        </button>
      </div>
    </div>
  )
}
