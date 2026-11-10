import React, { useState } from "react"
import { Order } from "../types"
import { EtoileNavbar } from "../components/EtoileNavbar"
import {
  Clock,
  Package,
  Truck,
  CheckCircle2,
  XCircle,
  MapPin,
  Copy,
  ChevronRight,
  ShieldCheck,
  X,
} from "lucide-react"

interface OrderDetailScreenProps {
  order: Order
  onBack: () => void
  onContinuePayment: () => void
  onCancelOrder: () => void
  onConfirmReceipt: () => void
  onRebuy: () => void
  onGoToHelp: () => void
  onShowToast: (msg: string) => void
}

export const OrderDetailScreen: React.FC<OrderDetailScreenProps> = ({
  order,
  onBack,
  onContinuePayment,
  onCancelOrder,
  onConfirmReceipt,
  onRebuy,
  onGoToHelp,
  onShowToast,
}) => {
  const [isLogisticsOpen, setIsLogisticsOpen] = useState(false)
  const [confirmDialog, setConfirmDialog] =
    useState<"cancel" | "receipt" | null>(null)

  const copyOrderNo = () => {
    navigator.clipboard?.writeText(order.orderNo)
    onShowToast(`已复制订单号：${order.orderNo}`)
  }

  const getStatusHeader = () => {
    switch (order.status) {
      case "unpaid":
        return {
          title: "等待买家付款",
          desc: "请于 29 分钟内完成支付，超时订单将自动关闭",
          icon: Clock,
        }
      case "unshipped":
        return {
          title: "买家已付款，手作配货中",
          desc: "工坊匠人正在进行最终真丝质检与缎带礼盒系带",
          icon: Package,
        }
      case "unreceived":
        return {
          title: "顺丰特快配送中",
          desc: "包裹已出库并发出，预计明日送达",
          icon: Truck,
        }
      case "completed":
        return {
          title: "订单已交易完成",
          desc: "感谢您选择 ÉTOILE，期待陪伴您的每一次发间流光",
          icon: CheckCircle2,
        }
      case "cancelled":
        return {
          title: "订单已取消",
          desc: "该订单已关闭，欢迎重新探索心仪手作",
          icon: XCircle,
        }
    }
  }

  const statusHeader = getStatusHeader()
  const HeaderIcon = statusHeader.icon

  return (
    <div className="relative w-full min-h-full flex flex-col bg-[#FFFBF0] text-[#46414E]">
      <EtoileNavbar showBack={true} onBack={onBack} title="订单详情" />

      {/* Scrollable Content */}
      <div className="flex-1 w-full overflow-y-auto no-scrollbar px-5 pt-3 pb-[110px] space-y-3.5">
        {/* 1. Status Banner */}
        <div className="p-4 rounded-[8px] bg-gradient-to-r from-[#DEE5ED] to-[#FFFBF0] border border-[#46414E]/10 flex items-center gap-3.5 shadow-xs">
          <div className="w-10 h-10 rounded-[8px] bg-[#46414E] text-[#FFFBF0] flex items-center justify-center shrink-0">
            <HeaderIcon className="w-5 h-5 text-[#E4C5C9]" />
          </div>
          <div>
            <h3 className="text-[16px] font-sans font-medium text-[#46414E]">
              {statusHeader.title}
            </h3>
            <p className="text-[12px] font-sans text-[#6C6C6A] mt-0.5 leading-snug">
              {statusHeader.desc}
            </p>
          </div>
        </div>

        {/* 2. Logistics Quick Peek if shipped */}
        {order.status === "unreceived" && order.trackingTimeline && (
          <div
            onClick={() => setIsLogisticsOpen(true)}
            className="p-3.5 rounded-[8px] bg-white border border-[#46414E]/12 flex items-center justify-between cursor-pointer hover:bg-[#DEE5ED]/30 transition-colors shadow-xs"
          >
            <div className="flex items-center gap-3 min-w-0 pr-2">
              <Truck className="w-5 h-5 text-[#6E89A8] shrink-0" />
              <div className="min-w-0">
                <span className="text-[13px] font-sans font-medium text-[#46414E] block truncate">
                  {order.trackingTimeline[0]?.title}：
                  {order.trackingTimeline[0]?.description}
                </span>
                <span className="text-[11px] font-sans text-[#6C6C6A]">
                  {order.trackingTimeline[0]?.time} · 顺丰运单号：
                  {order.trackingNo}
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#6C6C6A] shrink-0" />
          </div>
        )}

        {/* 3. Address Card */}
        <div className="p-4 rounded-[8px] bg-white border border-[#46414E]/12 flex items-start gap-3 shadow-xs">
          <MapPin className="w-4 h-4 text-[#6E89A8] shrink-0 mt-0.5" />
          <div className="text-[13px] font-sans text-[#46414E]">
            <div className="font-medium mb-1">
              <span>{order.address.receiver}</span>
              <span className="text-[#6C6C6A] ml-2">{order.address.phone}</span>
            </div>
            <p className="text-[12px] text-[#6C6C6A] leading-relaxed">
              {order.address.province} {order.address.city}{" "}
              {order.address.district} {order.address.detail}
            </p>
          </div>
        </div>

        {/* 4. Products List */}
        <div className="p-4 rounded-[8px] bg-white border border-[#46414E]/12 space-y-3 shadow-xs">
          <div className="text-[13px] font-sans font-medium text-[#46414E] pb-2 border-b border-[#46414E]/8">
            定制商品清单
          </div>

          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="w-[60px] h-[75px] rounded-[6px] overflow-hidden bg-[#DEE5ED] border border-[#46414E]/8 shrink-0">
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                  <div>
                    <h4 className="text-[13px] font-sans font-medium text-[#46414E] truncate">
                      {item.productNameCn}
                    </h4>
                    <p className="text-[11px] font-serif-en italic text-[#6C6C6A] truncate">
                      {item.productNameFr}
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
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="font-serif-en font-bold text-[#46414E]">
                      ¥{item.price}
                    </span>
                    <span className="text-[#6C6C6A]">× {item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {order.note && (
            <div className="pt-2 border-t border-[#46414E]/8 text-[12px] font-sans text-[#6C6C6A]">
              <span className="text-[#46414E] font-medium">买家留言：</span>
              <span>{order.note}</span>
            </div>
          )}
        </div>

        {/* 5. Order Meta & Breakdown */}
        <div className="p-4 rounded-[8px] bg-white border border-[#46414E]/12 space-y-2.5 shadow-xs text-[12px] font-sans">
          <div className="flex items-center justify-between text-[#6C6C6A]">
            <span>订单编号</span>
            <div className="flex items-center gap-1.5 font-mono text-[#46414E]">
              <span>{order.orderNo}</span>
              <button
                type="button"
                onClick={copyOrderNo}
                className="p-1 hover:bg-[#DEE5ED] rounded cursor-pointer"
                title="复制订单编号"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-[#6C6C6A]">
            <span>下单时间</span>
            <span>{order.createdAt}</span>
          </div>

          <div className="flex items-center justify-between text-[#6C6C6A]">
            <span>支付方式</span>
            <span>微信安全支付</span>
          </div>

          <div className="pt-2 border-t border-[#46414E]/8 flex items-center justify-between text-[14px]">
            <span className="font-medium text-[#46414E]">实付总额</span>
            <span className="font-serif-en font-bold text-[18px] text-[#46414E]">
              ¥{order.totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* 6. Fixed Bottom Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-40 bg-[#FFFBF0]/95 backdrop-blur-xl border-t border-[#46414E]/10 px-5 pt-2.5 pb-[22px] flex items-center justify-end gap-2.5">
        {order.status === "unpaid" && (
          <>
            <button
              type="button"
              onClick={() => setConfirmDialog("cancel")}
              className="h-[46px] px-6 rounded-[8px] border border-[#46414E]/20 text-[14px] font-sans text-[#6C6C6A] hover:bg-[#DEE5ED]/50 cursor-pointer"
            >
              取消订单
            </button>
            <button
              type="button"
              onClick={onContinuePayment}
              className="h-[46px] px-6 rounded-[8px] bg-[#46414E] border border-[#46414E] text-[#FFFBF0] text-[14px] font-sans font-medium hover:bg-[#38343f] active:scale-[0.99] cursor-pointer shadow-sm"
            >
              继续支付
            </button>
          </>
        )}

        {order.status === "unshipped" && (
          <button
            type="button"
            onClick={() => onShowToast("专属丝叙客服管家已收到咨询请求")}
            className="h-[48px] px-7 rounded-[8px] border border-[#46414E]/20 bg-white text-[14px] font-sans font-medium text-[#46414E] hover:bg-[#DEE5ED]/50 cursor-pointer shadow-xs"
          >
            联系工坊客服
          </button>
        )}

        {order.status === "unreceived" && (
          <>
            <button
              type="button"
              onClick={() => setIsLogisticsOpen(true)}
              className="h-[46px] px-6 rounded-[8px] border border-[#46414E]/20 text-[14px] font-sans text-[#6C6C6A] hover:bg-[#DEE5ED]/50 cursor-pointer"
            >
              查看物流
            </button>
            <button
              type="button"
              onClick={() => setConfirmDialog("receipt")}
              className="h-[46px] px-6 rounded-[8px] bg-[#46414E] border border-[#46414E] text-[#FFFBF0] text-[14px] font-sans font-medium hover:bg-[#38343f] active:scale-[0.99] cursor-pointer shadow-sm"
            >
              确认收货
            </button>
          </>
        )}

        {order.status === "completed" && (
          <>
            <button
              type="button"
              onClick={onGoToHelp}
              className="h-[48px] px-5 rounded-[8px] border border-[#46414E]/20 text-[14px] font-sans text-[#6C6C6A] hover:bg-[#DEE5ED]/50 cursor-pointer"
            >
              帮助与售后
            </button>
            <button
              type="button"
              onClick={onRebuy}
              className="h-[48px] px-7 rounded-[8px] bg-[#46414E] text-[#FFFBF0] text-[14px] font-sans font-medium hover:bg-[#38343f] active:scale-[0.99] cursor-pointer shadow-sm"
            >
              再次购买
            </button>
          </>
        )}

        {order.status === "cancelled" && (
          <button
            type="button"
            onClick={onRebuy}
            className="h-[48px] px-7 rounded-[8px] bg-[#46414E] text-[#FFFBF0] text-[14px] font-sans font-medium hover:bg-[#38343f] active:scale-[0.99] cursor-pointer shadow-sm"
          >
            重新选购
          </button>
        )}
      </div>

      {/* 7. Secondary Confirmation Dialog */}
      {confirmDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-xs bg-[#FFFBF0] rounded-[8px] p-5 border border-[#46414E]/20 shadow-2xl text-center space-y-4">
            <h4 className="text-[16px] font-sans font-medium text-[#46414E]">
              {confirmDialog === "cancel"
                ? "确认取消该订单？"
                : "确认已收到全部发饰？"}
            </h4>
            <p className="text-[12px] font-sans text-[#6C6C6A] leading-relaxed">
              {confirmDialog === "cancel"
                ? "取消后若需购买需重新提交。待付款库存将立即释放。"
                : "请确保包裹完好且发饰无破损。确认后将进入售后质保期。"}
            </p>
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setConfirmDialog(null)}
                className="flex-1 h-[44px] rounded-[8px] border border-[#46414E]/20 text-[13px] font-sans text-[#6C6C6A] hover:bg-[#DEE5ED]"
              >
                再想想
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirmDialog === "cancel") onCancelOrder()
                  else onConfirmReceipt()
                  setConfirmDialog(null)
                }}
                className="flex-1 h-[44px] rounded-[8px] bg-[#46414E] text-[#FFFBF0] text-[13px] font-sans font-medium hover:bg-[#38343f]"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. Logistics Timeline Sheet */}
      {isLogisticsOpen && order.trackingTimeline && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-end bg-black/45 backdrop-blur-xs select-none animate-fade-in"
          onClick={() => setIsLogisticsOpen(false)}
        >
          <div
            className="w-full max-h-[75%] bg-[#FFFBF0] rounded-t-[8px] p-5 pb-8 border-t border-[#46414E]/15 shadow-2xl overflow-y-auto no-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#46414E]/10">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#6E89A8]" />
                <h3 className="text-[15px] font-sans font-medium text-[#46414E]">
                  顺丰特快轨迹跟踪
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsLogisticsOpen(false)}
                className="p-1 rounded-[6px] text-[#6C6C6A] hover:bg-[#DEE5ED]/60 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4">
              {order.trackingTimeline.map((step, idx) => (
                <div key={idx} className="flex gap-3 text-[12px] font-sans">
                  <div className="flex flex-col items-center">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        idx === 0
                          ? "bg-[#6E89A8] ring-2 ring-[#6E89A8]/30"
                          : "bg-[#6C6C6A]/40"
                      }`}
                    />
                    {idx < order.trackingTimeline!.length - 1 && (
                      <span className="w-[1px] flex-1 bg-[#46414E]/15 my-1" />
                    )}
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="flex items-baseline justify-between mb-0.5">
                      <span
                        className={`font-medium ${
                          idx === 0 ? "text-[#46414E]" : "text-[#6C6C6A]"
                        }`}
                      >
                        {step.title}
                      </span>
                      <span className="text-[11px] text-[#6C6C6A]">
                        {step.time}
                      </span>
                    </div>
                    <p className="text-[#6C6C6A] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
