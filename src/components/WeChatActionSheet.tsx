import React from "react"
import { Share2, Star, RefreshCw, AlertCircle, X } from "lucide-react"
import { EtoileMark, EtoileWordmark } from "./EtoileLogo"

interface WeChatActionSheetProps {
  isOpen: boolean
  onClose: () => void
  onToast: (msg: string) => void
}

export const WeChatActionSheet: React.FC<WeChatActionSheetProps> = ({
  isOpen,
  onClose,
  onToast,
}) => {
  if (!isOpen) return null

  const actions = [
    {
      icon: Share2,
      label: "转发给朋友",
      action: () => {
        onToast("已调起微信好友转发卡片")
        onClose()
      },
    },
    {
      icon: Star,
      label: "添加到我的小程序",
      action: () => {
        onToast("已添加到微信首页「我的小程序」")
        onClose()
      },
    },
    {
      icon: RefreshCw,
      label: "重新加载",
      action: () => {
        onToast("ÉTOILE 小程序已刷新")
        onClose()
      },
    },
    {
      icon: AlertCircle,
      label: "关于 ÉTOILE",
      action: () => {
        onToast("ÉTOILE · 丝叙发饰定制馆 v2.6.0")
        onClose()
      },
    },
  ]

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end bg-black/45 backdrop-blur-xs select-none animate-fade-in">
      <div
        className="w-full bg-[#FFFBF0] rounded-t-[18px] p-5 pb-8 border-t border-[#6C6C6A]/20 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar with ÉTOILE Logo */}
        <div className="flex items-center justify-between pb-4 border-b border-[#6C6C6A]/12">
          <div className="flex items-center gap-2.5">
            <div className="w-[32px] h-[32px] rounded-full bg-[#DEE5ED] border border-[#6E89A8]/30 flex items-center justify-center p-1">
              <EtoileMark size="sm" showStar={false} />
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <EtoileWordmark size="sm" />
                <span className="mp-text-12 font-serif-cn font-medium text-[#6C6C6A]">
                  · 丝叙
                </span>
              </div>
              <div className="text-[10px] font-sans-app text-[#6C6C6A]/60 mt-0.5">
                微信小程序官方认证品牌 · 丹宁蓝与灰粉
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-[#6C6C6A]/60 hover:text-[#6C6C6A] hover:bg-[#DEE5ED]"
            aria-label="Close sheet"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action icons row */}
        <div className="grid grid-cols-4 gap-3 py-5">
          {actions.map((item, index) => {
            const Icon = item.icon
            return (
              <button
                key={index}
                type="button"
                onClick={item.action}
                className="flex flex-col items-center gap-2 group cursor-pointer active:scale-95 transition-transform"
              >
                <div className="w-[46px] h-[46px] rounded-[14px] bg-[#DEE5ED]/80 border border-[#6C6C6A]/15 flex items-center justify-center text-[#6C6C6A] group-hover:bg-[#DEE5ED]">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-sans-app text-[#6C6C6A] text-center leading-tight">
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Cancel button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 rounded-[12px] bg-[#DEE5ED]/50 border border-[#6C6C6A]/15 text-[#6C6C6A] text-[14px] font-sans-app font-medium hover:bg-[#DEE5ED] active:scale-[0.99] cursor-pointer"
        >
          取消
        </button>
      </div>
    </div>
  )
}
