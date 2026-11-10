import React from "react"
import { Product } from "../types"
import { EtoileNavbar } from "../components/EtoileNavbar"

interface CollectionScreenProps {
  onBack: () => void
  onSelectProduct: (product: Product) => void
  collectionProducts: Product[]
}

export const CollectionScreen: React.FC<CollectionScreenProps> = ({
  onBack,
  onSelectProduct,
  collectionProducts,
}) => {
  return (
    <div className="relative w-full min-h-full flex flex-col bg-[#FFFBF0] text-[#46414E]">
      <EtoileNavbar showBack={true} onBack={onBack} title="晨光微澜系列专题" />

      <div className="flex-1 w-full overflow-y-auto no-scrollbar px-5 pt-3 pb-12 space-y-5">
        {/* Mood Scene Image */}
        <div className="w-full h-[220px] rounded-[8px] overflow-hidden bg-[#DEE5ED] border border-[#46414E]/10 relative shadow-sm">
          <img
            src="/images/claw-clips-pair.png"
            alt="晨光微澜场景主视觉"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent flex flex-col justify-end p-5 text-white">
            <span className="text-[11px] font-serif-en tracking-[0.25em] uppercase text-white/80">
              Collection No. 01 · 2026
            </span>
            <h3 className="text-[22px] font-serif-en font-semibold tracking-wider">
              L'AUBE DE SOIE
            </h3>
            <p className="text-[12px] font-sans text-white/85 mt-0.5">
              晨曦初照时的柔粉与丹宁蓝微光交织
            </p>
          </div>
        </div>

        {/* Narrative */}
        <div className="space-y-2 text-[13px] font-sans text-[#6C6C6A] leading-relaxed">
          <p>
            「晨光微澜」灵感汲取自破晓时分映照在真丝面料上的第一缕微光。灰粉的柔和、丹宁蓝的清澈与藕紫的静谧在重磅素绉缎上交融，为日常梳发带来不刻意的优雅气度。
          </p>
        </div>

        {/* Products in this Collection */}
        <div className="pt-2 border-t border-[#46414E]/8 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-[15px] font-sans font-medium text-[#46414E]">
              系列臻选作品 ({collectionProducts.length})
            </h4>
            <span className="text-[11px] font-serif-en text-[#6C6C6A]">
              CLICK TO VIEW
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {collectionProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group flex flex-col cursor-pointer active:scale-[0.98] transition-transform"
              >
                <div className="aspect-[4/5] rounded-[8px] overflow-hidden bg-[#DEE5ED] border border-[#46414E]/10 mb-2 shadow-xs group-hover:shadow-md transition-shadow">
                  <img
                    src={product.images[0]}
                    alt={product.nameCn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h5 className="text-[13px] font-sans font-medium text-[#46414E] truncate">
                  {product.nameCn}
                </h5>
                <p className="text-[11px] font-serif-en italic text-[#6C6C6A] truncate">
                  {product.nameFr}
                </p>
                <div className="flex items-baseline gap-1 mt-1 text-[#46414E]">
                  <span className="text-[11px]">¥</span>
                  <span className="text-[15px] font-serif-en font-bold">
                    {product.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
