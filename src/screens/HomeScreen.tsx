import React, { useRef, useState } from "react"
import { Product } from "../types"
import { EtoileMark, EtoileWordmark } from "../components/EtoileLogo"
import { ChevronRight, Sparkles, ArrowRight } from "lucide-react"
import bowCutout from "../assets/bows/bow_cutout.png"

interface HomeScreenProps {
  products: Product[]
  onSelectProduct: (product: Product) => void
  onExploreCollection: () => void
  onExploreStory: () => void
  onGoToShop: () => void
  onOpenGame?: () => void
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  products,
  onSelectProduct,
  onExploreCollection,
  onExploreStory,
  onGoToShop,
  onOpenGame,
}) => {
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const [activeSlide, setActiveSlide] = useState(0)

  // Curated products for Section 3 (4 signature pieces in a refined 2x2 editorial grid)
  const curatedProducts = products.slice(0, 4)

  const handleCarouselScroll = () => {
    const el = carouselRef.current
    if (!el) return
    const cardWidth = el.clientWidth * 0.86
    if (cardWidth <= 0) return
    const idx = Math.round(el.scrollLeft / cardWidth)
    setActiveSlide(Math.max(0, Math.min(2, idx)))
  }

  const scrollToSlide = (idx: number) => {
    const el = carouselRef.current
    if (!el) return
    const cardWidth = el.clientWidth * 0.86 + 12
    el.scrollTo({ left: idx * cardWidth, behavior: "smooth" })
    setActiveSlide(idx)
  }

  return (
    <div className="flex-1 w-full min-h-0 overflow-y-auto overscroll-contain no-scrollbar flex flex-col bg-[#F8F6F2] text-[#403B42] pb-[112px]">
      {/* ============================================================
          Section 1 — Existing Brand Header
         ============================================================ */}
      <header className="w-full pt-[50px] px-5 pb-3.5 flex items-center justify-between border-b border-[#403B42]/6 bg-[#F8F6F2]/92 backdrop-blur-md sticky top-0 z-20 shrink-0">
        <div className="flex items-center gap-2.5">
          <EtoileMark size="sm" showStar={true} />
          <EtoileWordmark size="sm" />
        </div>
        <span className="text-[13px] text-[#403B42]/70 tracking-wider pr-[96px]">
          芭蕾风发饰
        </span>
      </header>

      {/* ============================================================
          Section 2 — Horizontal Promotional Carousel
         ============================================================ */}
      <section className="w-full pt-4 pb-3 shrink-0">
        <div
          ref={carouselRef}
          onScroll={handleCarouselScroll}
          className="w-full px-5 flex gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
        >
          {/* Card 01 — Catch the Bow (接住蝴蝶结 · 宣传海报底图) */}
          <div
            onClick={() => onOpenGame?.()}
            className="w-[87%] shrink-0 snap-center h-[196px] rounded-[16px] border border-[#C88F98]/35 relative overflow-hidden cursor-pointer shadow-[0_8px_24px_rgba(64,59,66,0.08)] active:scale-[0.99] transition-transform group"
          >
            {/* The Luxury Catch the Bow Campaign Poster as Background */}
            <img
              src="/images/poster-catch-the-bow.png"
              alt="接住蝴蝶结宣传海报"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Soft subtle gradient vignette to ensure top tag & bottom CTA remain crisp */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20 pointer-events-none" />

            <div className="relative z-10 w-full h-full p-4 flex flex-col justify-between">
              {/* Top Row: Pill Badge */}
              <div className="flex items-center justify-between">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/85 backdrop-blur-md border border-white/60 text-[12px] text-[#A9828C] font-medium shadow-2xs">
                  限时互动礼遇
                </span>
              </div>

              {/* Bottom Row: Supporting Copy & Action Button */}
              <div className="flex items-end justify-between gap-2">
                <p className="text-[13px] text-white font-medium leading-snug drop-shadow-md max-w-[170px]">
                  接住一点微光，赢取专属优惠券。
                </p>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onOpenGame?.()
                  }}
                  className="h-[36px] px-3.5 rounded-full bg-white text-[#403B42] text-[13px] font-medium inline-flex items-center gap-1 hover:bg-[#F8F6F2] active:scale-95 transition-all cursor-pointer shadow-md shrink-0"
                >
                  <span>立即参与</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 02 — Brand / Seasonal Collection (晨光微澜系列) */}
          <div
            onClick={onExploreCollection}
            className="w-[87%] shrink-0 snap-center h-[196px] rounded-[16px] bg-[#EDE3D8] border border-[#403B42]/10 relative overflow-hidden cursor-pointer shadow-[0_8px_24px_rgba(64,59,66,0.06)] active:scale-[0.99] transition-transform"
          >
            <img
              src="/images/scrunchie-pink-model.png"
              alt="晨光微澜当季系列"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2B262D]/70 via-[#2B262D]/35 to-transparent p-5 flex flex-col justify-between text-white">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[12px] text-white/95 font-medium mb-2">
                  2026 春季系列
                </span>
                <h2 className="text-[22px] font-semibold text-white leading-snug">
                  晨光微澜 · 芭蕾微风
                </h2>
                <p className="text-[14px] text-white/85 leading-relaxed mt-1 max-w-[210px]">
                  把一点舞台上的轻盈，留在普通的一天。
                </p>
              </div>

              <div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onExploreCollection()
                  }}
                  className="h-[38px] px-4 rounded-full bg-[#F8F6F2] text-[#403B42] text-[14px] font-medium inline-flex items-center gap-1.5 hover:bg-white transition-colors cursor-pointer shadow-2xs"
                >
                  <span>探索系列</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 03 — Brand Story (品牌手账) */}
          <div
            onClick={onExploreStory}
            className="w-[87%] shrink-0 snap-center h-[196px] rounded-[16px] bg-[#EDE3D8] border border-[#403B42]/10 relative overflow-hidden cursor-pointer shadow-[0_8px_24px_rgba(64,59,66,0.06)] active:scale-[0.99] transition-transform"
          >
            <img
              src="/images/story-grass-ribbon.png"
              alt="关于 ÉTOILE"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#232922]/75 via-[#232922]/40 to-transparent p-5 flex flex-col justify-between text-white">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[12px] text-white/95 font-medium mb-2">
                  品牌手账
                </span>
                <h2 className="text-[22px] font-semibold text-white leading-snug">
                  日常里的小小舞台
                </h2>
                <p className="text-[14px] text-white/85 leading-relaxed mt-1 max-w-[215px]">
                  从一次随手的盘发开始，留下属于自己的微光。
                </p>
              </div>

              <div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onExploreStory()
                  }}
                  className="h-[38px] px-4 rounded-full bg-[#F8F6F2] text-[#403B42] text-[14px] font-medium inline-flex items-center gap-1.5 hover:bg-white transition-colors cursor-pointer shadow-2xs"
                >
                  <span>探索系列</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Pagination Indicators */}
        <div className="mt-3 flex items-center justify-center gap-1.5">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToSlide(idx)}
              aria-label={`切换到第 ${idx + 1} 张推广卡`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeSlide === idx
                  ? "w-5 bg-[#C88F98]"
                  : "w-1.5 bg-[#403B42]/20 hover:bg-[#403B42]/40"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ============================================================
          Section 3 — 精选抓夹与发饰
         ============================================================ */}
      <section className="w-full px-5 pt-4 pb-6 shrink-0">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-[22px] font-medium text-[#403B42] leading-tight">
            精选抓夹与发饰
          </h2>
          <button
            type="button"
            onClick={onGoToShop}
            className="text-[14px] text-[#403B42]/70 hover:text-[#403B42] flex items-center gap-0.5 cursor-pointer"
          >
            <span>查看全部</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 2-Column Editorial Product Grid with Improved Proportions & Readability */}
        <div className="grid grid-cols-2 gap-4">
          {curatedProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="group flex flex-col cursor-pointer active:scale-[0.99] transition-transform"
            >
              {/* Image Container (4:5 Ratio, generous studio whitespace) */}
              <div className="relative w-full aspect-[4/5] rounded-[12px] overflow-hidden bg-white border border-[#403B42]/8 mb-2.5 p-2.5 shadow-[0_4px_14px_rgba(64,59,66,0.04)] group-hover:shadow-[0_8px_20px_rgba(64,59,66,0.08)] transition-shadow">
                <img
                  src={product.images[0]}
                  alt={product.nameCn}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
                {product.isNew && (
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-[#F6ECEE] text-[#A9828C] text-[11px] font-medium">
                    新品
                  </span>
                )}
              </div>

              {/* Product Name (15-16px) & Price (16-17px tabular-nums) */}
              <span className="text-[13px] text-[#A9828C] leading-snug">
                {product.categoryLabel}
              </span>
              <h3 className="text-[15px] font-medium text-[#403B42] leading-snug line-clamp-1 mt-0.5">
                {product.nameCn}
              </h3>
              <div className="flex items-baseline gap-1.5 mt-1 tabular-nums">
                <span className="text-[16px] font-semibold text-[#403B42]">
                  ¥{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-[13px] line-through text-[#403B42]/40">
                    ¥{product.originalPrice}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          Section 4 — OUR STORY / 品牌故事
         ============================================================ */}
      <section className="w-full px-5 py-2 shrink-0">
        <div
          onClick={onExploreStory}
          className="relative w-full p-5 rounded-[14px] bg-gradient-to-br from-[#EDE3D8] via-[#F5EFE6] to-[#EDE3D8] border border-[#D8C7B0]/80 flex flex-col justify-between overflow-hidden cursor-pointer hover:shadow-md transition-all shadow-[0_6px_20px_rgba(64,59,66,0.05)] group"
        >
          {/* Subtle paper grain texture */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#403B42_0.65px,transparent_0.65px)] [background-size:10px_10px]" />

          {/* Gentle Twinkling Stars */}
          <div
            className="pointer-events-none absolute top-4 right-6 w-2.5 h-2.5 text-[#A9828C] star-twinkle"
            style={{ "--twinkle-duration": "3.8s", "--twinkle-delay": "0.3s" } as React.CSSProperties}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9Z" />
            </svg>
          </div>

          {/* Subtitle & Header */}
          <div className="relative z-10 flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#F8F6F2] border border-[#D8C7B0] flex items-center justify-center text-[#A9828C]">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
              <span className="text-[13px] tracking-[0.14em] text-[#403B42]/80 font-medium">
                品牌故事 · OUR STORY
              </span>
            </div>
            <span className="text-[13px] text-[#403B42]/75 flex items-center group-hover:translate-x-0.5 transition-transform">
              阅读手账 <ChevronRight className="w-4 h-4 ml-0.5" />
            </span>
          </div>

          {/* Photo & Main Story Copy */}
          <div className="relative z-10 flex gap-4 items-center mb-4">
            <div className="relative w-[88px] h-[104px] shrink-0 p-1.5 bg-[#F8F6F2] rounded-[8px] shadow-xs border border-[#D8C7B0] rotate-[-1.5deg] group-hover:rotate-0 transition-transform duration-300">
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-10 h-3 bg-[#C88F98]/35 border border-white/60 rounded-xs pointer-events-none" />
              <img
                src="/images/story-journal-cover.png"
                alt="ÉTOILE 发饰手账"
                className="w-full h-full object-cover rounded-[4px]"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-[19px] font-medium text-[#403B42] mb-1.5 leading-snug">
                把一点舞台上的轻盈，留在日常。
              </h3>
              <p className="text-[15px] text-[#403B42]/75 leading-relaxed">
                一条缎带，一次盘发，也可以是表达自己的方式。
              </p>
            </div>
          </div>

          {/* Bottom Card Footer */}
          <div className="relative z-10 flex items-center justify-between pt-3 border-t border-[#403B42]/10">
            <div className="flex items-center gap-2 text-[13px] text-[#403B42]/75">
              <span className="px-2.5 py-0.5 rounded-full bg-[#F8F6F2]/90 border border-[#D8C7B0]/70">
                芭蕾风抓夹
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#F8F6F2]/90 border border-[#D8C7B0]/70">
                日常造型表达
              </span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onExploreStory()
              }}
              className="text-[14px] font-medium text-[#403B42] hover:text-black flex items-center gap-1 cursor-pointer"
            >
              走近 ÉTOILE →
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================
          Section 5 — Additional Product & Editorial Content
         ============================================================ */}
      <section className="w-full px-5 pt-4 shrink-0">
        <div
          onClick={onGoToShop}
          className="w-full p-4 rounded-[14px] bg-white border border-[#403B42]/8 flex items-center justify-between cursor-pointer hover:bg-[#EDE3D8]/35 transition-colors shadow-[0_4px_14px_rgba(64,59,66,0.04)]"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-[52px] h-[52px] rounded-[10px] overflow-hidden bg-[#F8F6F2] shrink-0 border border-[#403B42]/8 p-1">
              <img
                src="/images/product-headband-blue.png"
                alt="全部作品"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="text-[16px] font-medium text-[#403B42]">
                浏览全线芭蕾风作品
              </h3>
              <p className="text-[13px] text-[#403B42]/65 mt-0.5">
                芭蕾抓夹 · 星结边夹 · 蕾丝发箍 · 柔光发圈
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#403B42]/50" />
        </div>
      </section>
    </div>
  )
}
