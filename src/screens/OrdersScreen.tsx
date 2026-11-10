import React, { useState } from "react"
import { Order, OrderStatus } from "../types"
import {
  ChevronRight,
  Clock,
  Package,
  Truck,
  CheckCircle2,
  XCircle,
  ShoppingBag,
} from "lucide-react"

interface OrdersScreenProps {
  orders: Order[]
  onSelectOrder: (order: Order) => void
  onContinuePayment: (order: Order) => void
  onCancelOrder: (order: Order) => void
  onConfirmReceipt: (order: Order) => void
  onViewLogistics: (order: Order) => void
  onRebuy: (order: Order) => void
  onGoToShop: () => void
}

export const OrdersScreen: React.FC<OrdersScreenProps> = ({
  orders,
  onSelectOrder,
  onContinuePayment,
  onCancelOrder,
  onConfirmReceipt,
  onViewLogistics,
  onRebuy,
  onGoToShop,
}) => {
  const [statusFilter, setStatusFilter] = useState<"all" | OrderStatus>("all")

  const statusTabs: { id: "all" | OrderStatus label: string }[] = [
    { id: "all", label: "全部" },
    { id: "unpaid", label: "待付款" },
    { id: "unshipped", label: "待发货" },
    { id: "unreceived", label: "待收货" },
    { id: "completed", label: "已完成" },
  ]

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((o) => o.status === statusFilter)

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "unpaid":
        return (
          <span className="px-2 py-0.5 rounded-[4px] bg-[#E8CCD7] text-[#46414E] text-[11px] font-sans font-medium flex items-center gap-1">
            <Clock className="w-3 h-3" />
            待付款
          </span>
        )
      case "unshipped":
        return (
          <span className="px-2 py-0.5 rounded-[4px] bg-[#DEE5ED] text-[#46414E] text-[11px] font-sans font-medium flex items-center gap-1">
            <Package className="w-3 h-3 text-[#6E89A8]" />
            待发货
          </span>
        )
      case "unreceived":
        return (
          <span className="px-2 py-0.5 rounded-[4px] bg-[#DEE5ED] text-[#46414E] text-[11px] font-sans font-medium flex items-center gap-1">
            <Truck className="w-3 h-3 text-[#6E89A8]" />
            待收货
          </span>
        )
      case "completed":
        return (
          <span className="px-2 py-0.5 rounded-[4px] bg-white text-[#6C6C6A] border border-[#46414E]/10 text-[11px] font-sans flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-[#6C6C6A]" />
            已完成
          </span>
        )
      case "cancelled":
        return (
          <span className="px-2 py-0.5 rounded-[4px] bg-black/5 text-[#6C6C6A] text-[11px] font-sans flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            已取消
          </span>
        )
    }
  }

  return (
    <div className="flex-1 w-full min-h-0 overflow-y-auto overscroll-contain flex flex-col pb-[112px] bg-[#FFFBF0] text-[#46414E]">
      {/* 1. Header Bar */}
      <div className="w-full pt-[50px] px-5 pb-2.5 border-b border-[#46414E]/8 bg-[#FFFBF0]/95 backdrop-blur-md sticky top-0 z-20">
        <h2 className="text-[20px] font-sans font-medium text-[#46414E]">
          我的订单
        </h2>
      </div>

      {/* 2. Status Tabs */}
      <div className="w-full px-5 py-2 flex items-center justify-between border-b border-[#46414E]/6 bg-[#FFFBF0] overflow-x-auto no-scrollbar">
        {statusTabs.map((tab) => {
          const isActive = statusFilter === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`py-2 px-1 text-[13px] font-sans transition-all relative shrink-0 cursor-pointer ${
                isActive
                  ? "font-medium text-[#46414E]"
                  : "text-[#6C6C6A] hover:text-[#46414E]"
              }`}
            >
              <span>{tab.label}</span>
              {isActive && (
                <span className="absolute bottom-0 left-1 right-1 h-[2px] rounded-[2px] bg-[#46414E]" />
              )}
            </button>
          )
        })}
      </div>

      {/* 3. Orders List */}
      <div className="w-full px-5 pt-4 space-y-3.5">
        {filteredOrders.length === 0 ? (
          <div className="w-full py-16 px-6 rounded-[8px] bg-[#DEE5ED]/40 border border-[#46414E]/8 flex flex-col items-center justify-center text-center">
            <ShoppingBag className="w-8 h-8 text-[#6C6C6A]/40 mb-2 stroke-[1.5]" />
            <h4 className="text-[14px] font-sans font-medium text-[#46414E] mb-1">
              暂无相应订单
            </h4>
            <p className="text-[12px] font-sans text-[#6C6C6A] mb-4">
              探索当季手工真丝发饰系列，即刻甄选心仪之物。
            </p>
            <button
              type="button"
              onClick={onGoToShop}
              className="px-4 py-2 rounded-[8px] bg-[#46414E] text-[#FFFBF0] text-[12px] font-sans font-medium cursor-pointer"
            >
              前往选购
            </button>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              onClick={() => onSelectOrder(order)}
              className="p-4 rounded-[8px] bg-white border border-[#46414E]/12 space-y-3 cursor-pointer hover:border-[#46414E]/30 transition-all shadow-xs"
            >
              {/* Order Header */}
              <div className="flex items-center justify-between text-[12px] font-sans pb-2 border-b border-[#46414E]/6">
                <span className="font-mono text-[#6C6C6A]">
                  单号：{order.orderNo}
                </span>
                {getStatusBadge(order.status)}
              </div>

              {/* Items Preview */}
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-center">
                    <div className="w-[50px] h-[62px] rounded-[6px] overflow-hidden bg-[#DEE5ED] border border-[#46414E]/8 shrink-0">
                      <img
                        src={item.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[13px] font-sans font-medium text-[#46414E] truncate">
                        {item.productNameCn}
                      </h4>
                      <p className="text-[11px] font-serif-en italic text-[#6C6C6A] truncate">
                        {item.productNameFr}
                      </p>
                      <div className="flex items-center justify-between mt-1 text-[11px] font-sans text-[#6C6C6A]">
                        <span>
                          {item.colorName} · {item.specName}
                        </span>
                        <span className="text-[#46414E]">
                          × {item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Amount & Actions */}
              <div className="pt-2 border-t border-[#46414E]/6 flex items-center justify-between">
                <div className="text-[12px] font-sans text-[#6C6C6A]">
                  实付：
                  <span className="text-[16px] font-serif-en font-bold text-[#46414E]">
                    ¥{order.totalAmount.toFixed(2)}
                  </span>
                </div>

                {/* Contextual Action Buttons */}
                <div
                  className="flex items-center gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  {order.status === "unpaid" && (
                    <>
                      <button
                        type="button"
                        onClick={() => onCancelOrder(order)}
                        className="h-[34px] px-3 rounded-[6px] border border-[#46414E]/20 text-[12px] font-sans text-[#6C6C6A] hover:bg-[#DEE5ED]/50 cursor-pointer"
                      >
                        取消订单
                      </button>
                      <button
                        type="button"
                        onClick={() => onContinuePayment(order)}
                        className="h-[34px] px-3.5 rounded-[6px] bg-[#46414E] text-[#FFFBF0] text-[12px] font-sans font-medium hover:bg-[#38343f] cursor-pointer shadow-xs"
                      >
                        继续支付
                      </button>
                    </>
                  )}

                  {order.status === "unshipped" && (
                    <button
                      type="button"
                      onClick={() => onSelectOrder(order)}
                      className="h-[34px] px-3 rounded-[6px] border border-[#46414E]/20 text-[12px] font-sans text-[#46414E] hover:bg-[#DEE5ED]/50 cursor-pointer"
                    >
                      联系管家
                    </button>
                  )}

                  {order.status === "unreceived" && (
                    <>
                      <button
                        type="button"
                        onClick={() => onViewLogistics(order)}
                        className="h-[34px] px-3 rounded-[6px] border border-[#46414E]/20 text-[12px] font-sans text-[#6C6C6A] hover:bg-[#DEE5ED]/50 cursor-pointer"
                      >
                        查看物流
                      </button>
                      <button
                        type="button"
                        onClick={() => onConfirmReceipt(order)}
                        className="h-[34px] px-3.5 rounded-[6px] bg-[#46414E] text-[#FFFBF0] text-[12px] font-sans font-medium hover:bg-[#38343f] cursor-pointer shadow-xs"
                      >
                        确认收货
                      </button>
                    </>
                  )}

                  {order.status === "completed" && (
                    <button
                      type="button"
                      onClick={() => onRebuy(order)}
                      className="h-[34px] px-3.5 rounded-[6px] bg-[#DEE5ED] border border-[#46414E]/20 text-[12px] font-sans font-medium text-[#46414E] hover:bg-[#d0dbe6] cursor-pointer"
                    >
                      再次购买
                    </button>
                  )}

                  {order.status === "cancelled" && (
                    <button
                      type="button"
                      onClick={() => onRebuy(order)}
                      className="h-[34px] px-3.5 rounded-[6px] border border-[#46414E]/20 text-[12px] font-sans text-[#46414E] hover:bg-[#DEE5ED]/50 cursor-pointer"
                    >
                      重新选购
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
