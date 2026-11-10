import React, { useState } from "react"
import { Product } from "../types"
import { EtoileNavbar } from "../components/EtoileNavbar"
import { ArrowRight } from "lucide-react"
import { BgLayer } from "../components/BgLayer"

const star = (key: string, className: string, style: React.CSSProperties) => <span key={key} aria-hidden className={`story-star ${className}`} style={style}>✦</span>
export const StoryScreen: React.FC<{ onBack:()=>void; onGoToShop:()=>void; onSelectProduct:(p:Product)=>void; relatedProducts:Product[] }> = ({ onBack,onGoToShop,onSelectProduct,relatedProducts }) => {
 const [burst,setBurst]=useState(false)
 const picks=["claw","bows","floral"].map(category=>relatedProducts.find(p=>p.category===category)).filter(Boolean) as Product[]
 const sparkle=()=>{setBurst(true); window.setTimeout(()=>setBurst(false),850)}
 return <div className="relative h-full min-h-0 flex flex-col overflow-hidden bg-[#EDE1CF] text-[#46414E]">
  <EtoileNavbar showBack onBack={onBack} title="关于 ÉTOILE" />
  <main className="relative flex-1 min-h-0 overflow-y-auto overscroll-contain no-scrollbar px-5 pt-5 pb-16 story-paper">
   <BgLayer variant="paper" />
   {star("s1","top-[42px] right-[25px]",{"--twinkle-duration":"3.6s","--twinkle-delay":".2s"} as React.CSSProperties)}
   {star("s2","top-[390px] left-[24px]",{"--twinkle-duration":"4.7s","--twinkle-delay":"1s"} as React.CSSProperties)}
   {star("s3","top-[760px] right-[22px]",{"--twinkle-duration":"5.2s","--twinkle-delay":".5s"} as React.CSSProperties)}
   {star("s4","top-[1120px] left-[20px]",{"--twinkle-duration":"4.1s","--twinkle-delay":"1.5s"} as React.CSSProperties)}
   {star("s5","top-[1450px] right-[24px]",{"--twinkle-duration":"3.8s","--twinkle-delay":".9s"} as React.CSSProperties)}
   {star("s6","top-[1740px] left-[28px]",{"--twinkle-duration":"5.4s","--twinkle-delay":".3s"} as React.CSSProperties)}
   <div className="relative z-10 space-y-10">
    <section><p className="story-kicker">ABOUT ÉTOILE</p><div className="flex gap-2 items-start"><h1 className="story-title">日常里，也有属于你的舞台。</h1><button onClick={sparkle} type="button" className="main-star" aria-label="点亮星光">✦{burst&&<i className="star-burst">✦ ✧ ✦ ✧</i>}</button></div><div className="story-copy"><p>ÉTOILE 在法语中意为「星星」。</p><p>我们想把芭蕾的轻盈，带进普通的一天。</p><p>不必等到登台，也不必等到特别的日子。</p><p>从一次随手的盘发开始，留下属于自己的小小光芒。</p></div><figure className="polaroid"><img src="/images/story-grass-ribbon.png" alt="草地上的缎带与芭蕾鞋"/><figcaption>naturel, ruban, a little dream</figcaption></figure></section>
    <section><h2 className="story-heading">像一段舍不得删掉的旧影像。</h2><div className="story-copy"><p>冬日的光、练习室里的脚步、朋友镜头中不经意的回头。</p><p>有些瞬间并不清晰，却一直留在记忆里。ÉTOILE 从这些青春片段中，寻找柔和、轻盈，也带一点安静的表达。</p></div><div className="memory-grid"><figure className="polaroid tilt-left"><img src="/images/story-bicycle-girls.png" alt="青春街景"/></figure><figure className="polaroid tilt-right"><img src="/images/story-journal-cover.png" alt="发饰手账"/></figure></div></section>
    <section><h2 className="story-heading">不只属于舞台。</h2><div className="story-copy"><p>缎面的微光，薄纱的层次，蝴蝶结松弛的弧度。</p><p>我们把喜欢的芭蕾元素，放进抓夹、发夹与发带。搭配校服、针织衫，或最普通的一件白色上衣，让今天的造型，多一点自己的意思。</p></div><figure className="polaroid"><img src="/images/bow-lace-blue-ribbon.png" alt="缎带与蕾丝细节"/></figure><div className="material-tags"><span>柔韧醋酸</span><span>柔光缎带</span><span>棉质蕾丝</span></div></section>
    <section className="statement"><h2 className="story-heading">表达自己，可以从一件小饰品开始。</h2><div className="story-copy"><p>我们相信，造型的乐趣不必昂贵。一点颜色、一种戴法、一个今天特别喜欢的细节，都可以成为表达心情的方式。精致可以轻松，优雅也可以亲近。</p></div><p className="keywords">轻盈　/　日常　/　自我表达</p></section>
    <section><p className="story-kicker">FROM A CLAW CLIP</p><h2 className="story-heading">从一只抓夹开始</h2><div className="grid grid-cols-3 gap-2.5">{picks.map(p=><button onClick={()=>onSelectProduct(p)} key={p.id} className="story-product"><img src={p.images[0]} alt={p.nameCn}/><span>{p.categoryLabel}</span><b>{p.nameCn}</b><em>¥{p.price}</em></button>)}</div><button type="button" onClick={onGoToShop} className="story-cta">找到今天的那一点光 <ArrowRight className="w-4 h-4"/></button></section>
   </div>
  </main>
 </div>
}
