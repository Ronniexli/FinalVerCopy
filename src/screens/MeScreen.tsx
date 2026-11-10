import React from "react"
import { UserState, Order } from "../types"
import { EtoileMark } from "../components/EtoileLogo"
import {
  Clock,
  Package,
  Truck,
  ReceiptText,
  Heart,
  MapPin,
  Sparkles,
  HelpCircle,
  RotateCcw,
  ChevronRight,
  UserCheck,
  LogIn,
  Gift,
} from "lucide-react"

interface MeScreenProps {
  userState: UserState
  orders: Order[]
  onToggleLogin: () => void
  onGoToOrdersWithFilter: (status: string) => void
  onGoToAddressList: () => void
  onGoToStory: () => void
  onGoToCareHelp: () => void
  onGoToWishlist: () => void
  onResetDemoData: () => void
  onOpenGame?: () => void
}

export const MeScreen: React.FC<MeScreenProps> = ({
  userState,
  orders,
  onToggleLogin,
  onGoToOrdersWithFilter,
  onGoToAddressList,
  onGoToStory,
  onGoToCareHelp,
  onGoToWishlist,
  onResetDemoData,
  onOpenGame,
}) => {
  const unpaidCount = orders.filter((o) => o.status === "unpaid").length
  const unshippedCount = orders.filter((o) => o.status === "unshipped").length
  const unreceivedCount = orders.filter((o) => o.status === "unreceived").length

  return (
    <div className="flex-1 w-full min-h-0 overflow-y-auto overscroll-contain no-scrollbar flex flex-col pb-[112px] bg-[#F8F6F2] text-[#403B42]">
      {/* 1. Profile Header Card */}
      
{/* 1. Profile Header Card */}
<div className="w-full pt-[52px] px-5 pb-5 bg-gradient-to-b from-[#EDE3D8]/60 via-[#F8F6F2] to-[#F8F6F2] border-b border-[#403B42]/6 shrink-0">
  <div className="p-4 rounded-[14px] bg-white border border-[#403B42]/8 shadow-[0_4px_14px_rgba(64,59,66,0.04)] flex items-center gap-3">

    {/* Avatar */}
    <div className="w-12 h-14 rounded-[10px] bg-[#F8F6F2] border border-[#C88F98]/35 flex items-center justify-center p-1 shrink-0">
      <EtoileMark size="sm" showStar={true} />
    </div>

    {/* Profile Information */}
    <div className="flex-1 min-w-0">
      {userState.isLoggedIn ? (
        <>
          <p className="text-[16px] font-medium text-[#403B42] truncate">
            {userState.name}
          </p>
          <p className="text-[13px] text-[#403B42]/65 mt-0.5 tabular-nums whitespace-nowrap">
            {userState.phone}
          </p>
          <span className="mt-2 inline-flex h-8 items-center justify-center px-3 rounded-full bg-[#F6ECEE] text-[#A9828C] text-[12px] font-medium whitespace-nowrap">
            ÉTOILE 会员
          </span>
        </>
      ) : (
        <>
          <p className="text-[16px] font-medium text-[#403B42]">
            访客体验中
          </p>
          <p className="text-[12px] text-[#403B42]/65 mt-1">
            开启专属礼遇
          </p>
        </>
      )}
    </div>

    {/* Login Status */}
    <button
      type="button"
      onClick={onToggleLogin}
      className={`shrink-0 inline-flex h-8 items-center justify-center gap-1.5 px-3 rounded-full text-[12px] font-medium whitespace-nowrap cursor-pointer transition-colors ${
        userState.isLoggedIn
          ? "bg-[#EDE3D8]/70 text-[#403B42] hover:bg-[#EDE3D8]"
          : "bg-[#403B42] text-white hover:bg-[#322e34]"
      }`}
    >
      {userState.isLoggedIn ? (
        <>
          <UserCheck className="w-3.5 h-3.5 shrink-0" />
          <span>已登录</span>
        </>
      ) : (
        <>
          <LogIn className="w-3.5 h-3.5 shrink-0" />
          <span>模拟登录</span>
        </>
      )}
    </button>

  </div>
</div>


      {/* 2. Order Shortcuts */}
      <div className="w-full px-5 py-4 shrink-0">
        <div className="p-4 rounded-[14px] bg-white border border-[#403B42]/8 shadow-[0_4px_14px_rgba(64,59,66,0.04)]">
          <div className="flex items-center justify-between pb-3 border-b border-[#403B42]/6">
            <span className="text-[16px] font-medium text-[#403B42]">
              我的订单
            </span>
            <button
              type="button"
              onClick={() => onGoToOrdersWithFilter("all")}
              className="text-[14px] text-[#403B42]/65 hover:text-[#403B42] flex items-center gap-0.5 cursor-pointer"
            >
              <span>全部订单</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2 pt-3.5 text-center">
            <button
              type="button"
              onClick={() => onGoToOrdersWithFilter("unpaid")}
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
            >
              <div className="relative w-11 h-11 rounded-[10px] bg-[#F8F6F2] flex items-center justify-center text-[#403B42] group-hover:bg-[#EDE3D8]/60 transition-colors">
                <Clock className="w-5 h-5" />
                {unpaidCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 rounded-full bg-[#C88F98] text-white text-[11px] font-semibold tabular-nums flex items-center justify-center">
                    {unpaidCount}
                  </span>
                )}
              </div>
              <span className="text-[13px] text-[#403B42]/75">待付款</span>
            </button>

            <button
              type="button"
              onClick={() => onGoToOrdersWithFilter("unshipped")}
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
            >
              <div className="relative w-11 h-11 rounded-[10px] bg-[#F8F6F2] flex items-center justify-center text-[#403B42] group-hover:bg-[#EDE3D8]/60 transition-colors">
                <Package className="w-5 h-5 text-[#A9828C]" />
                {unshippedCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 rounded-full bg-[#A9828C] text-white text-[11px] font-semibold tabular-nums flex items-center justify-center">
                    {unshippedCount}
                  </span>
                )}
              </div>
              <span className="text-[13px] text-[#403B42]/75">待发货</span>
            </button>

            <button
              type="button"
              onClick={() => onGoToOrdersWithFilter("unreceived")}
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
            >
              <div className="relative w-11 h-11 rounded-[10px] bg-[#F8F6F2] flex items-center justify-center text-[#403B42] group-hover:bg-[#EDE3D8]/60 transition-colors">
                <Truck className="w-5 h-5 text-[#A9828C]" />
                {unreceivedCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 rounded-full bg-[#C88F98] text-white text-[11px] font-semibold tabular-nums flex items-center justify-center">
                    {unreceivedCount}
                  </span>
                )}
              </div>
              <span className="text-[13px] text-[#403B42]/75">待收货</span>
            </button>

            <button
              type="button"
              onClick={() => onGoToOrdersWithFilter("all")}
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
            >
              <div className="w-11 h-11 rounded-[10px] bg-[#F8F6F2] flex items-center justify-center text-[#403B42] group-hover:bg-[#EDE3D8]/60 transition-colors">
                <ReceiptText className="w-5 h-5" />
              </div>
              <span className="text-[13px] text-[#403B42]/75">全部订单</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Action Menu Entries */}
      <div className="w-full px-5 space-y-3 shrink-0">
        <div className="rounded-[14px] bg-white border border-[#403B42]/8 overflow-hidden shadow-[0_4px_14px_rgba(64,59,66,0.04)] divide-y divide-[#403B42]/6">
          {/* 赢取优惠券 (Catch the Bow Mini-Game Entry) */}
          {onOpenGame && (
            <div
              onClick={onOpenGame}
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#F6ECEE]/50 transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <Gift className="w-5 h-5 text-[#C88F98]" />
                <div>
                  <span className="text-[15px] font-medium text-[#403B42] block">
                    赢取优惠券
                  </span>
                  <span className="text-[13px] text-[#403B42]/65">
                    接住蝴蝶结 · 解锁专属礼遇券
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[13px] text-[#A9828C] font-medium">
                <span>立即参与</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          )}

          {/* Wishlist */}
          <div
            onClick={onGoToWishlist}
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#F8F6F2] transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <Heart className="w-5 h-5 text-[#C88F98]" />
              <span className="text-[15px] text-[#403B42]">我的心愿收藏</span>
            </div>
            <div className="flex items-center gap-1 text-[14px] text-[#403B42]/65 tabular-nums">
              <span>{userState.wishlistIds.length} 件作品</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Address Management */}
          <div
            onClick={onGoToAddressList}
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#F8F6F2] transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <MapPin className="w-5 h-5 text-[#A9828C]" />
              <span className="text-[15px] text-[#403B42]">收货地址管理</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#403B42]/50" />
          </div>

          {/* Brand Story */}
          <div
            onClick={onGoToStory}
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#F8F6F2] transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <Sparkles className="w-5 h-5 text-[#A9828C]" />
              <div>
                <span className="text-[15px] text-[#403B42] block">
                  关于 ÉTOILE
                </span>
                <span className="text-[13px] text-[#403B42]/65">
                  品牌故事 · 芭蕾风手账
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#403B42]/50" />
          </div>

          {/* Help & Care */}
          <div
            onClick={onGoToCareHelp}
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#F8F6F2] transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <HelpCircle className="w-5 h-5 text-[#403B42]/60" />
              <span className="text-[15px] text-[#403B42]">
                发饰养护指南与佩戴建议
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#403B42]/50" />
          </div>
        </div>

        {/* Demo Data Reset Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onResetDemoData}
            className="w-full h-[46px] rounded-[12px] bg-white border border-[#403B42]/10 text-[#403B42]/70 hover:text-[#403B42] text-[14px] flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
          >
            <RotateCcw className="w-4 h-4" />
            <span>重置为初始演示数据</span>
          </button>
        </div>
      </div>
    </div>
  )
}
