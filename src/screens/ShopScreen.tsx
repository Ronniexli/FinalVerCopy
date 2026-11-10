import React, { useState, useMemo } from "react"
import { Product, CategoryId, SortOption, FilterState, CartItem } from "../types"
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  X,
  Check,
  Plus,
} from "lucide-react"
import { FloatingMiniCart } from "../components/FloatingMiniCart"

interface ShopScreenProps {
  products: Product[]
  filterState: FilterState
  onFilterChange: (filters: Partial<FilterState>) => void
  cartItems: CartItem[]
  onCartClick: () => void
  onSelectProduct: (product: Product) => void
  onQuickAddToCart: (product: Product) => void
  onUpdateCartQuantity: (itemId: string, delta: number) => void
  onRemoveCartItem: (itemId: string) => void
}

export const ShopScreen: React.FC<ShopScreenProps> = ({
  products,
  filterState,
  onFilterChange,
  cartItems,
  onCartClick,
  onSelectProduct,
  onQuickAddToCart,
  onUpdateCartQuantity,
  onRemoveCartItem,
}) => {
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false)
  const [tempColor, setTempColor] = useState<string | null>(filterState.colorId)

  const categories: { id: CategoryId; label: string }[] = [
    { id: "all", label: "全部" },
    { id: "claw", label: "芭蕾抓夹" },
    { id: "floral", label: "星结边夹" },
    { id: "bands", label: "蕾丝发箍" },
    { id: "scrunchies", label: "柔光发圈" },
    { id: "bows", label: "蝴蝶结夹" },
  ]

  const availableColors = [
    { id: "c-blue", name: "丹宁蓝 Bleu Denim", hex: "#6E89A8" },
    { id: "c-pink", name: "灰粉 Rose Poudré", hex: "#E4C5C9" },
    { id: "c-purple", name: "藕紫 Mauve Doux", hex: "#B5A2C4" },
    { id: "c-cream", name: "花白 Blanc Soie", hex: "#FFFBF0" },
  ]

  // Filtering & Sorting logic
  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (filterState.category !== "all") {
      result = result.filter((p) => p.category === filterState.category)
    }

    if (filterState.colorId) {
      result = result.filter((p) =>
        p.colors.some((c) => c.id === filterState.colorId),
      )
    }

    if (filterState.searchKeyword.trim()) {
      const q = filterState.searchKeyword.trim().toLowerCase()
      result = result.filter(
        (p) =>
          p.nameCn.toLowerCase().includes(q) ||
          p.nameFr.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      )
    }

    if (filterState.sortBy === "priceAsc") {
      result.sort((a, b) => a.price - b.price)
    } else if (filterState.sortBy === "priceDesc") {
      result.sort((a, b) => b.price - a.price)
    }

    return result
  }, [products, filterState])

  const handleSortCycle = () => {
    const nextSort: SortOption =
      filterState.sortBy === "recommended"
        ? "priceAsc"
        : filterState.sortBy === "priceAsc"
          ? "priceDesc"
          : "recommended"
    onFilterChange({ sortBy: nextSort })
  }

  const getSortLabel = () => {
    switch (filterState.sortBy) {
      case "priceAsc":
        return "价格升序 ↑"
      case "priceDesc":
        return "价格降序 ↓"
      default:
        return "综合推荐"
    }
  }

  return (
    <div className="relative flex-1 w-full h-full min-h-0 flex flex-col overflow-hidden bg-[#FFFBF0]">
      {/* 1. Header Bar: Balanced Title & Subtitle (Top Cart Icon Removed) */}
      <div className="w-full pt-[50px] px-5 pb-3 flex items-baseline justify-between border-b border-[#46414E]/8 bg-[#FFFBF0]/95 backdrop-blur-md shrink-0 z-20">
        <div className="flex items-baseline gap-2.5">
          <h2 className="text-[24px] font-semibold text-[#403B42] leading-tight">
            选购
          </h2>
          <span className="text-[12px] text-[#6C6C6A]">
            ÉTOILE 芭蕾风发饰
          </span>
        </div>
        <div className="pr-[96px]" />
      </div>

      {/* Scrollable Main Content */}
      <div className="flex-1 w-full min-h-0 overflow-y-auto overscroll-contain no-scrollbar pb-[132px]">
        {/* 2. Search Input Field */}
        <div className="w-full px-5 pt-3 pb-2 shrink-0">
          <div className="relative w-full h-[40px] rounded-[8px] bg-white/85 border border-[#46414E]/12 flex items-center px-3 shadow-xs">
            <Search className="w-4 h-4 text-[#6C6C6A] mr-2 shrink-0" />
            <input
              type="text"
              value={filterState.searchKeyword}
              onChange={(e) =>
                onFilterChange({ searchKeyword: e.target.value })
              }
              placeholder="搜索芭蕾抓夹、星结边夹、蕾丝发箍、发圈..."
              className="flex-1 bg-transparent text-[14px] text-[#46414E] placeholder-[#6C6C6A]/60 outline-none"
            />
            {filterState.searchKeyword && (
              <button
                type="button"
                onClick={() => onFilterChange({ searchKeyword: "" })}
                className="p-1 text-[#6C6C6A] hover:text-[#46414E] cursor-pointer"
                aria-label="清除搜索词"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* 3. Category Filter Pills (Fixed 36px height, never squished across categories) */}
        <div className="w-full px-5 py-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          {categories.map((cat) => {
            const isActive = filterState.category === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onFilterChange({ category: cat.id })}
                className={`h-[36px] min-w-[74px] px-3.5 inline-flex items-center justify-center whitespace-nowrap rounded-[8px] border text-[13px] leading-none font-medium transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-[#46414E] text-[#FFFBF0] border-[#46414E] shadow-xs"
                    : "bg-[#DEE5ED]/65 text-[#46414E]/80 border-[#46414E]/12 hover:bg-[#DEE5ED]"
                }`}
              >
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* 4. Filter & Sort Bar */}
        <div className="w-full px-5 py-2.5 flex items-center justify-between border-y border-[#46414E]/6 text-[13px] text-[#6C6C6A] shrink-0">
          <span>共 {filteredProducts.length} 款芭蕾风发饰</span>

          <div className="flex items-center gap-3.5">
            <button
              type="button"
              onClick={handleSortCycle}
              className="flex items-center gap-1 hover:text-[#46414E] py-1 cursor-pointer"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>{getSortLabel()}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setTempColor(filterState.colorId)
                setIsFilterSheetOpen(true)
              }}
              className={`flex items-center gap-1 py-1 cursor-pointer ${
                filterState.colorId
                  ? "text-[#46414E] font-medium"
                  : "hover:text-[#46414E]"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>色系筛选{filterState.colorId ? " (1)" : ""}</span>
            </button>
          </div>
        </div>

        {/* 5. Product Grid: 2 Columns */}
        <div className="w-full px-5 pt-4">
          {filteredProducts.length === 0 ? (
            <div className="w-full py-16 flex flex-col items-center justify-center text-center p-6 bg-[#DEE5ED]/40 rounded-[8px] border border-[#46414E]/10">
              <Search className="w-10 h-10 text-[#6C6C6A]/40 mb-3 stroke-[1.5]" />
              <h4 className="text-[16px] font-medium text-[#46414E] mb-1">
                暂未找到匹配发饰
              </h4>
              <p className="text-[13px] text-[#6C6C6A] max-w-[240px] mb-4">
                尝试清除搜索词或重置色系筛选，探索更多芭蕾风发饰。
              </p>
              <button
                type="button"
                onClick={() =>
                  onFilterChange({
                    searchKeyword: "",
                    colorId: null,
                    category: "all",
                  })
                }
                className="px-4 py-2 rounded-[8px] bg-[#46414E] text-[#FFFBF0] text-[13px] font-medium cursor-pointer"
              >
                重置全部筛选
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3.5 items-start">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="group flex flex-col cursor-pointer active:scale-[0.99] transition-transform"
                >
                  {/* 4:5 Image Container */}
                  <div className="relative w-full aspect-[4/5] rounded-[8px] overflow-hidden bg-white border border-[#46414E]/10 mb-2 shadow-xs group-hover:shadow-md transition-shadow">
                    <img
                      src={product.images[0]}
                      alt={product.nameCn}
                      className="w-full h-full object-contain p-1.5 group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />

                    {product.isNew && (
                      <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded-[4px] bg-[#E8CCD7] text-[#46414E] text-[11px] font-semibold leading-none shadow-2xs">
                        NEW
                      </span>
                    )}

                    {/* Quick Add to Cart Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        onQuickAddToCart(product)
                      }}
                      className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-[#FFFBF0]/92 backdrop-blur-md border border-[#C88F98]/45 text-[#46414E] hover:bg-[#46414E] hover:text-[#FFFBF0] active:scale-90 flex items-center justify-center shadow-xs transition-all cursor-pointer"
                      aria-label={`将 ${product.nameCn} 加入购物袋`}
                      title="加入购物袋"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[2.2]" />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="flex flex-col">
                    <span className="text-[13px] text-[#A9828C] truncate">
                      {product.categoryLabel}
                    </span>
                    <h3 className="text-[15px] font-medium text-[#403B42] truncate leading-snug mt-0.5">
                      {product.nameCn}
                    </h3>

                    <div className="flex items-center justify-between mt-1 tabular-nums">
                      <div className="flex items-baseline gap-1">
                        <span className="text-[16px] font-semibold text-[#403B42] tracking-tight">
                          ¥{product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-[13px] line-through text-[#403B42]/40">
                            ¥{product.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Color Swatch Dots */}
                      <div className="flex items-center gap-1">
                        {product.colors.slice(0, 3).map((col) => (
                          <span
                            key={col.id}
                            className="w-2.5 h-2.5 rounded-[3px] border border-black/15 shadow-inner"
                            style={{ backgroundColor: col.hex }}
                            title={col.name}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Mini Cart (Sole Shopping Cart Shortcut on Shop Page) */}
      <FloatingMiniCart
        items={cartItems}
        onUpdateQuantity={onUpdateCartQuantity}
        onRemoveItem={onRemoveCartItem}
        onGoToCartCheckout={onCartClick}
      />

      {/* 6. Filter Sheet Modal */}
      {isFilterSheetOpen && (
        <div
          className="absolute inset-0 z-50 flex flex-col justify-end bg-black/45 backdrop-blur-xs select-none animate-fade-in"
          onClick={() => setIsFilterSheetOpen(false)}
        >
          <div
            className="w-full bg-[#FFFBF0] rounded-t-[16px] p-5 pb-8 border-t border-[#46414E]/15 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#46414E]/10">
              <h3 className="text-[17px] font-medium text-[#46414E]">
                色系与属性筛选
              </h3>
              <button
                type="button"
                onClick={() => setIsFilterSheetOpen(false)}
                className="w-8 h-8 rounded-[8px] flex items-center justify-center text-[#6C6C6A] hover:bg-[#DEE5ED]/50 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4">
              <span className="text-[14px] font-medium text-[#46414E] block mb-2.5">
                发饰色系
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setTempColor(null)}
                  className={`p-2.5 rounded-[8px] border text-[13px] flex items-center justify-between cursor-pointer ${
                    tempColor === null
                      ? "border-[#46414E] bg-[#DEE5ED] text-[#46414E] font-medium"
                      : "border-[#46414E]/15 bg-white/70 text-[#6C6C6A]"
                  }`}
                >
                  <span>全部色系</span>
                  {tempColor === null && (
                    <Check className="w-4 h-4 text-[#46414E]" />
                  )}
                </button>

                {availableColors.map((col) => {
                  const isChosen = tempColor === col.id
                  return (
                    <button
                      key={col.id}
                      type="button"
                      onClick={() => setTempColor(col.id)}
                      className={`p-2.5 rounded-[8px] border text-[13px] flex items-center justify-between cursor-pointer ${
                        isChosen
                          ? "border-[#46414E] bg-[#DEE5ED] text-[#46414E] font-medium"
                          : "border-[#46414E]/15 bg-white/70 text-[#6C6C6A]"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span
                          className="w-3.5 h-3.5 rounded-[4px] border border-black/15 shadow-inner shrink-0"
                          style={{ backgroundColor: col.hex }}
                        />
                        <span className="truncate">{col.name}</span>
                      </div>
                      {isChosen && (
                        <Check className="w-4 h-4 text-[#46414E] shrink-0" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-[#46414E]/10">
              <button
                type="button"
                onClick={() => setTempColor(null)}
                className="flex-1 h-[48px] rounded-[8px] border border-[#46414E]/20 bg-[#DEE5ED]/50 text-[#46414E] text-[14px] font-medium hover:bg-[#DEE5ED] cursor-pointer"
              >
                重置
              </button>
              <button
                type="button"
                onClick={() => {
                  onFilterChange({ colorId: tempColor })
                  setIsFilterSheetOpen(false)
                }}
                className="flex-1 h-[48px] rounded-[8px] bg-[#46414E] text-[#FFFBF0] text-[14px] font-medium hover:bg-[#38343f] cursor-pointer shadow-sm"
              >
                确认筛选
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
