import React from "react"
import { Product } from "../types"
import { EtoileNavbar } from "../components/EtoileNavbar"
import { Heart, Trash2 } from "lucide-react"

interface WishlistScreenProps {
  products: Product[]
  wishlistIds: string[]
  onBack: () => void
  onSelectProduct: (product: Product) => void
  onRemoveFromWishlist: (productId: string) => void
  onGoToShop: () => void
}

export const WishlistScreen: React.FC<WishlistScreenProps> = ({
  products,
  wishlistIds,
  onBack,
  onSelectProduct,
  onRemoveFromWishlist,
  onGoToShop,
}) => {
  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id))

  return (
    <div className="relative w-full min-h-full flex flex-col bg-[#FFFBF0] text-[#46414E]">
      <EtoileNavbar
        showBack={true}
        onBack={onBack}
        title={`心愿收藏 (${wishlistedProducts.length})`}
      />

      <div className="flex-1 w-full overflow-y-auto no-scrollbar px-5 pt-3 pb-12">
        {wishlistedProducts.length === 0 ? (
          <div className="w-full py-20 px-6 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-[8px] bg-[#DEE5ED] flex items-center justify-center mb-3 text-[#6C6C6A]">
              <Heart className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="text-[16px] font-sans font-medium text-[#46414E] mb-1">
              暂无心愿收藏
            </h3>
            <p className="text-[12px] font-sans text-[#6C6C6A] mb-5">
              在浏览发饰时点击爱心图标，即可将心仪之作收藏于此。
            </p>
            <button
              type="button"
              onClick={onGoToShop}
              className="h-[44px] px-6 rounded-[8px] bg-[#46414E] text-[#FFFBF0] text-[13px] font-sans font-medium hover:bg-[#38343f] cursor-pointer"
            >
              探索全线作品
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {wishlistedProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group flex flex-col cursor-pointer active:scale-[0.98] transition-transform relative"
              >
                <div className="relative aspect-[4/5] rounded-[8px] overflow-hidden bg-[#DEE5ED] border border-[#46414E]/10 mb-2 shadow-xs group-hover:shadow-md transition-shadow">
                  <img
                    src={product.images[0]}
                    alt={product.nameCn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      onRemoveFromWishlist(product.id)
                    }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-[6px] bg-white/80 backdrop-blur-xs flex items-center justify-center text-[#6C6C6A] hover:text-[#46414E] shadow-xs cursor-pointer"
                    title="取消收藏"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <h4 className="text-[13px] font-sans font-medium text-[#46414E] truncate">
                  {product.nameCn}
                </h4>
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
        )}
      </div>
    </div>
  )
}
