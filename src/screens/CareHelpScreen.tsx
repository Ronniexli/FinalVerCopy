import React from "react"
import { EtoileNavbar } from "../components/EtoileNavbar"
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Droplets,
  Sun,
  Wind,
} from "lucide-react"

interface CareHelpScreenProps {
  onBack: () => void
}

export const CareHelpScreen: React.FC<CareHelpScreenProps> = ({ onBack }) => {
  return (
    <div className="relative w-full min-h-full flex flex-col bg-[#FFFBF0] text-[#46414E]">
      <EtoileNavbar
        showBack={true}
        onBack={onBack}
        title="真丝养护与售后说明"
      />

      <div className="flex-1 w-full overflow-y-auto no-scrollbar px-5 pt-4 pb-12 space-y-5 text-[13px] font-sans leading-relaxed">
        {/* Care Section */}
        <div className="p-4 rounded-[8px] bg-white border border-[#46414E]/10 space-y-3 shadow-xs">
          <h3 className="text-[16px] font-medium text-[#46414E] flex items-center gap-2">
            <Droplets className="w-4 h-4 text-[#6E89A8]" />
            <span>重磅真丝日常养护手记</span>
          </h3>
          <p className="text-[#6C6C6A]">
            桑蚕丝属于天然蛋白纤维，结构细腻，请悉心呵护其温润柔光：
          </p>
          <div className="space-y-2 text-[#6C6C6A] text-[12px]">
            <div className="flex items-start gap-2">
              <span className="font-medium text-[#46414E] shrink-0">
                1. 防湿防化：
              </span>
              <span>
                喷洒发胶、香水或定型喷雾时，请先取下发饰，避免化学溶剂导致真丝变色。
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium text-[#46414E] shrink-0">
                2. 抚平微褶：
              </span>
              <span>
                如飘带因收纳产生折痕，可隔着软棉布使用低温挂烫机蒸汽轻拂，切勿直接贴烫。
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium text-[#46414E] shrink-0">
                3. 避光收纳：
              </span>
              <span>
                长时间不用时，请放入附赠的避光防尘袋平放，远离阳光暴晒。
              </span>
            </div>
          </div>
        </div>

        {/* After-Sales Section */}
        <div className="p-4 rounded-[8px] bg-white border border-[#46414E]/10 space-y-3 shadow-xs">
          <h3 className="text-[16px] font-medium text-[#46414E] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#6E89A8]" />
            <span>售后服务与退换政策</span>
          </h3>
          <div className="space-y-2 text-[#6C6C6A] text-[12px]">
            <p>
              <strong>7 天无忧退换：</strong>自签收日起 7
              日内，在保证发饰完好未佩戴、防伪防拆扣完整且礼盒齐备的前提下，支持无理由退换。
            </p>
            <p>
              <strong>终身簧扣保修：</strong>
              所有抓夹及蝴蝶结底夹金属簧扣，均享有终身免费检修与弹力恢复服务（往返运费需自理）。
            </p>
          </div>
        </div>

        {/* Shipping Guarantee */}
        <div className="p-4 rounded-[8px] bg-white border border-[#46414E]/10 space-y-2 shadow-xs text-[12px]">
          <h3 className="text-[16px] font-medium text-[#46414E] flex items-center gap-2 mb-2">
            <Truck className="w-4 h-4 text-[#6E89A8]" />
            <span>顺丰特快配送说明</span>
          </h3>
          <p className="text-[#6C6C6A]">
            全店订单默认选用顺丰特快空运发货，全程专人防压护送，全国核心城市次日送达。
          </p>
        </div>
      </div>
    </div>
  )
}
