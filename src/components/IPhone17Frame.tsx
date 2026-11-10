import React from "react"
import { StatusBar } from "./StatusBar"
import { WeChatCapsule } from "./WeChatCapsule"
import { FrameMode } from "../types"

interface IPhone17FrameProps {
  children: React.ReactNode
  frameMode: FrameMode
  onOpenWeChatMenu: () => void
  scale?: number
}

export const IPhone17Frame: React.FC<IPhone17FrameProps> = ({
  children,
  onOpenWeChatMenu,
}) => {
  // Occupy the actual mobile viewport (reference 402 x 874 pt, responsive across iPhone screen sizes)
  // without rendering a decorative hardware bezel around the application.
  return (
    <div className="relative w-full max-w-[430px] h-[100dvh] max-h-[932px] bg-[#F8F6F2] overflow-hidden flex flex-col select-none text-[#403B42] mx-auto">
      {/* Top iOS Status Bar & Mini-Program Capsule Safe Layer */}
      <div className="absolute top-0 left-0 right-0 z-40 pointer-events-none">
        <StatusBar dark={false} />
        <div className="absolute top-[50px] right-[14px] pointer-events-auto">
          <WeChatCapsule
            onMoreClick={onOpenWeChatMenu}
            onCloseClick={onOpenWeChatMenu}
          />
        </div>
      </div>

      {/* Main Mobile Viewport Content */}
      <div className="flex-1 w-full h-full min-h-0 overflow-hidden flex flex-col">
        {children}
      </div>

      {/* Subtle iOS Bottom Home Indicator Safe Bar */}
      <div className="pointer-events-none absolute bottom-1 left-0 right-0 h-[14px] z-40 flex items-center justify-center">
        <div className="w-[134px] h-[4px] rounded-full bg-[#403B42]/20" />
      </div>
    </div>
  )
}
