import React from "react"
import { EtoileMark, EtoileWordmark } from "./EtoileLogo"
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  X,
} from "lucide-react"

interface PaymentModalProps {
  isOpen: boolean
  orderNo: string
  amount: number
  onSuccess: () => void
  onCancel: () => void
  onFail: () => void
  onClose: () => void
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  orderNo,
  amount,
  onSuccess,
  onCancel,
  onFail,
  onClose,
}) => {
  if (!isOpen) return null

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs select-none animate-fade-in"
      onClick={onCancel}
    >
      <div
        className="w-full bg-[#FFFBF0] rounded-t-[8px] p-5 pb-9 border-t border-[#46414E]/15 shadow-2xl flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Handle / Close */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-[#46414E]/10">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#6E89A8]" />
            <span className="text-[12px] font-sans text-[#6C6C6A]">
              微信安全支付模拟 · 演示沙盒
            </span>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="w-[36px] h-[36px] -mr-2 rounded-[8px] flex items-center justify-center text-[#6C6C6A] hover:bg-[#DEE5ED]/50 cursor-pointer"
            aria-label="取消支付"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Brand & Amount Header */}
        <div className="py-6 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-2">
            <EtoileMark size="sm" showStar={true} />
            <EtoileWordmark size="sm" />
          </div>
          <p className="text-[12px] font-sans text-[#6C6C6A] mb-1">
            商户名称：ÉTOILE 丝叙奢华发饰定制坊
          </p>
          <div className="text-[12px] font-mono text-[#6C6C6A]/75 mb-3">
            订单编号：{orderNo}
          </div>

          <div className="flex items-baseline gap-1 text-[#46414E] mt-1">
            <span className="text-[18px] font-sans">¥</span>
            <span className="text-[34px] font-serif-en font-bold tracking-tight">
              {amount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Sandbox Notice Banner */}
        <div className="w-full p-3 rounded-[8px] bg-[#DEE5ED]/60 border border-[#6E89A8]/20 mb-5 text-[11px] font-sans text-[#46414E] text-center leading-relaxed">
          <strong>演示环境说明：</strong>
          无需输入真实银行卡或微信密码。请选择以下三种模拟结果以验证完整的订单状态流转：
        </div>

        {/* 3 Action Buttons (Each h-48, rounded-8px, min-target 44x44) */}
        <div className="w-full space-y-2.5">
          {/* 1. Simulate Success */}
          <button
            type="button"
            onClick={onSuccess}
            className="w-full h-[48px] rounded-[8px] bg-[#46414E] text-[#FFFBF0] text-[15px] font-sans font-medium flex items-center justify-center gap-2 shadow-sm hover:bg-[#38343f] active:scale-[0.99] cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-[#E4C5C9]" />
            <span>模拟支付成功 (生成已付款订单)</span>
          </button>

          {/* 2. Simulate Cancel */}
          <button
            type="button"
            onClick={onCancel}
            className="w-full h-[48px] rounded-[8px] bg-[#DEE5ED] text-[#46414E] border border-[#46414E]/20 text-[14px] font-sans font-medium flex items-center justify-center gap-2 hover:bg-[#d4e0ec] active:scale-[0.99] cursor-pointer"
          >
            <XCircle className="w-4 h-4 text-[#6C6C6A]" />
            <span>模拟取消支付 (保留待付款订单)</span>
          </button>

          {/* 3. Simulate Failure */}
          <button
            type="button"
            onClick={onFail}
            className="w-full h-[48px] rounded-[8px] bg-[#FFFBF0] text-[#6C6C6A] border border-[#6C6C6A]/30 text-[14px] font-sans flex items-center justify-center gap-2 hover:bg-black/5 active:scale-[0.99] cursor-pointer"
          >
            <AlertTriangle className="w-4 h-4 text-[#E4C5C9]" />
            <span>模拟支付失败 (超时/余额不足并重试)</span>
          </button>
        </div>
      </div>
    </div>
  )
}
