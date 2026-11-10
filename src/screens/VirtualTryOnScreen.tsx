import React, { useMemo, useState } from "react"
import { Product } from "../types"
import { EtoileNavbar } from "../components/EtoileNavbar"
import { Download, Info } from "lucide-react"

type Wearable = { product: Product; x: number; y: number; scale: number; rotate: number; category: "hair" | "ear" | "neck" }
const positions: Record<string, Omit<Wearable, "product">> = {
  "etoile-01": { x: 48, y: 22, scale: 0.48, rotate: 0, category: "hair" },
  "etoile-02": { x: 62, y: 28, scale: 0.42, rotate: 5, category: "hair" },
  "etoile-03": { x: 37, y: 30, scale: 0.31, rotate: -10, category: "hair" },
  "etoile-04": { x: 50, y: 21, scale: 0.62, rotate: 0, category: "hair" },
  "etoile-05": { x: 56, y: 34, scale: 0.38, rotate: 8, category: "hair" },
  "etoile-06": { x: 44, y: 24, scale: 0.46, rotate: -4, category: "hair" },
}

export const VirtualTryOnScreen: React.FC<{ products: Product[]; onBack: () => void; onToast: (text: string) => void }> = ({ products, onBack, onToast }) => {
  const [worn, setWorn] = useState<string[]>([])
  const wears = useMemo(() => worn.map(id => { const product = products.find(p => p.id === id)!; return { product, ...positions[id] } }).filter(Boolean), [worn, products])
  const toggle = (id: string) => setWorn(current => current.includes(id) ? current.filter(item => item !== id) : current.length >= 5 ? current : [...current, id])
  return <div className="relative h-full min-h-0 flex flex-col overflow-hidden bg-[#FFFBF0]">
    <EtoileNavbar showBack onBack={onBack} title="模拟试戴" />
    <div className="relative flex-[3] min-h-0 overflow-hidden bg-gradient-to-b from-[#DEE5ED] to-[#FFFBF0]">
      <img src="/images/scrunchie-pink-model.png" alt="试戴模特" className="w-full h-full object-contain object-center opacity-90" />
      {wears.map(item => <div key={item.product.id} className="tryon-overlay" style={{ left:`${item.x}%`, top:`${item.y}%`, transform:`translate(-50%,-50%) rotate(${item.rotate}deg) scale(${item.scale})` }}>
        <img src={item.product.images[0]} alt="" />
      </div>)}
      <div className="absolute left-4 bottom-3 flex gap-1.5 items-center text-[10px] text-[#46414E]/70 bg-white/70 p-2 rounded-[6px]"><Info className="w-3 h-3" /> 暂以产品图示意佩戴位置</div>
      <button type="button" onClick={() => onToast("当前原型暂不支持导出相册，可长按保存预览") } className="absolute right-4 bottom-3 h-10 px-3 rounded-[8px] bg-[#46414E] text-[#FFFBF0] text-[12px] flex items-center gap-1.5"><Download className="w-3.5 h-3.5" />保存图片</button>
    </div>
    <div className="h-[190px] shrink-0 border-t border-[#46414E]/10 pt-3 bg-[#FFFBF0]">
      <p className="px-5 text-[12px] text-[#6C6C6A] mb-2">轻点单品，最多同时试戴 5 件</p>
      <div className="flex gap-3 overflow-x-auto no-scrollbar px-5 pb-4">
        {products.map(product => <button type="button" key={product.id} onClick={() => toggle(product.id)} className={`tryon-card ${worn.includes(product.id) ? "tryon-card-selected" : ""}`}><img src={product.images[0]} alt="" /><span>{product.nameCn}</span><b>¥{product.price}</b></button>)}
      </div>
    </div>
  </div>
}
