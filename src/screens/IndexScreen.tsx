import React, { useState } from "react"
import { EtoileMark, EtoileWordmark } from "../components/EtoileLogo"
import { BgLayer } from "../components/BgLayer"

export type IndexDestination = "story" | "products" | "tryon" | "game"

const cards: { id: IndexDestination; title: string; subtitle: string; image: string; tone: string }[] = [
  { id: "story", title: "品牌策划页", subtitle: "BRAND DIARY", image: "/images/story-grass-ribbon.png", tone: "from-[#1f2920]/20" },
  { id: "products", title: "商品总览", subtitle: "SHOP THE PIECES", image: "/images/story-journal-cover.png", tone: "from-[#574654]/35" },
  { id: "tryon", title: "模拟试戴", subtitle: "TRY IT ON", image: "/images/scrunchie-pink-model.png", tone: "from-[#6a5261]/35" },
  { id: "game", title: "小游戏", subtitle: "CATCH THE BOW", image: "/images/story-bicycle-girls.png", tone: "from-[#3b5062]/35" },
]

export const IndexScreen: React.FC<{ onNavigate: (destination: IndexDestination) => void }> = ({ onNavigate }) => {
  const [leaving, setLeaving] = useState<IndexDestination | null>(null)
  const enter = (id: IndexDestination) => {
    setLeaving(id)
    window.setTimeout(() => onNavigate(id), 180)
  }
  return (
    <div className="relative flex-1 min-h-0 overflow-y-auto overscroll-contain bg-[#FFFBF0] px-5 pt-[58px] pb-10">
      <BgLayer />
      <header className="index-logo relative z-10 flex flex-col items-center mb-7">
        <EtoileMark size="md" showStar />
        <div className="mt-2"><EtoileWordmark size="lg" /></div>
        <p className="mt-1 text-[11px] tracking-[0.26em] text-[#6C6C6A]">A LITTLE LIGHT FOR EVERY DAY</p>
      </header>
      <div className="relative z-10 space-y-3.5">
        {cards.map((card, index) => (
          <button key={card.id} type="button" onClick={() => enter(card.id)} className={`index-card index-card-${index} ${index % 2 ? "ml-5" : "mr-5"} ${leaving ? (leaving === card.id ? "index-card-leaving" : "index-card-fading") : ""}`}>
            <img src={card.image} alt="" />
            <span className={`absolute inset-0 bg-gradient-to-r ${card.tone} via-black/10 to-black/45`} />
            <span className="relative z-10 text-left px-5 pb-5 mt-auto block text-white">
              <span className="block text-[11px] tracking-[0.25em] font-serif-en text-white/80 mb-1">{card.subtitle}</span>
              <strong className="block text-[22px] font-medium tracking-wide">{card.title}</strong>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
