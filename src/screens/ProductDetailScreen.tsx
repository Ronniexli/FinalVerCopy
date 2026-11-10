import React, { useEffect, useState } from "react"
import { Product, ProductColor, ProductSpec } from "../types"
import { EtoileNavbar } from "../components/EtoileNavbar"
import {
  ChevronRight,
  Heart,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  X,
  Maximize2,
  CheckCircle2,
} from "lucide-react"

interface ProductDetailScreenProps {
  product: Product
  allProducts: Product[]
  cartCount: number
  isWishlisted: boolean
  onToggleWishlist: (productId: string) => void
  onBack: () => void
  onCartClick: () => void
  onSelectProduct: (product: Product) => void
  onOpenSkuSheet: (mode: "addToCart" | "buyNow") => void
  selectedColor: ProductColor
  selectedSpec: ProductSpec
}

interface BuyerReview {
  name: string
  date: string
  isVerified?: boolean
  isRepeatBuyer?: boolean
  tag: string
  rating: number
  text: string
  reply?: string
  photos?: string[]
}

function getProductReviews(product: Product): {
  headline: string
  copy: string
  stylingScene: string
  wearingGallery?: { title: string; subtitle: string; image: string }[]
  reviews: BuyerReview[]
} {
  if (product.id === "etoile-01" || product.category === "claw") {
    return {
      headline: "随手挽发，留住日常里的芭蕾轻盈",
      copy: "温润珠光醋酸板材搭配圆润双排齿梳，贴合后脑弧度不顶头。无论是课间随手盘起长发，还是周末搭配针织开衫半扎发，都能自然呈现松弛而精致的后脑勺线条。",
      stylingScene: "适合日常低髻盘发 · 侧颜发量修饰 · 随行手袋点缀",
      wearingGallery: [
        {
          title: "优雅后脑勺低髻",
          subtitle: "抓力适中不易松散，修饰头型饱满",
          image: "/images/buyer-claw-ivory-1.png",
        },
        {
          title: "侧颜自然修饰",
          subtitle: "微光波点温润柔和，自带松弛感",
          image: "/images/buyer-claw-ivory-3.png",
        },
        {
          title: "柔雾樱花粉盘发",
          subtitle: "灰调粉显白不俗气，配浅色衣服很法式",
          image: "/images/buyer-claw-pink-1.png",
        },
        {
          title: "手袋随行夹取",
          subtitle: "不戴时夹在帆布包上亦是一道风景",
          image: "/images/buyer-claw-ivory-4.png",
        },
      ],
      reviews: [
        {
          name: "阿拉红火火",
          date: "11-02",
          isVerified: true,
          tag: "已购：象牙白波点香蕉夹",
          rating: 5,
          text: "我的天，到手真的惊艳我了，超级漂亮，超级有质感，一看就很贵气，这个牌子真的很精致，以后认定这一家。发量少的也能抓得特别紧，从后脑勺抓个低髻超有气质，同事都问链接！",
          photos: [
            "/images/buyer-claw-ivory-1.png",
            "/images/buyer-claw-ivory-2.png",
            "/images/buyer-claw-ivory-3.png",
            "/images/buyer-claw-ivory-4.png",
          ],
        },
        {
          name: "泡泡玛特退坑了",
          date: "11-04",
          isRepeatBuyer: true,
          tag: "已购：柔雾樱花粉抓夹",
          rating: 5,
          text: "这款发夹外观精致，设计新颖，材质质量不错，夹力适中不易掉落。佩戴上瞬间提升气质，很喜欢，会回购。这个灰调粉一点都不俗气，白衬衫配它真的很法式。",
          photos: [
            "/images/buyer-claw-pink-1.png",
            "/images/buyer-claw-pink-2.png",
          ],
        },
        {
          name: "小王不吃香菜",
          date: "10-28",
          isVerified: true,
          tag: "已购：象牙白波点香蕉夹",
          rating: 5,
          text: "夹持力度：现在头发长了但是发量少了，换一个小夹子精致点的特别满意，而且抓的挺紧的非常喜欢。随手拍了几张细节图，波点位置做工都很正，没有毛边。用了一个多月了，天天戴，没有松没有断，贵的有道理。",
        },
        {
          name: "桃桃乌龙三分糖",
          date: "10-25",
          tag: "已购：柔雾樱花粉抓夹",
          rating: 4,
          text: "颜色比图片还奶一点，温温柔柔配大衣很好看。夹子本身没得说，低马尾一拧一夹就出门，拯救早八。质量挺不错，值这个钱！",
          reply: "谢谢宝子！每只抓夹出库前均经人工质检与防划痕包裹，佩戴有问题随时找客服～",
        },
      ],
    }
  }

  if (product.id === "etoile-02" || product.category === "floral") {
    return {
      headline: "耳侧一点微光，点亮碎发与刘海",
      copy: "水波纹珠光醋酸夹面如贝母般温润，立体小珍珠蝴蝶结与粉星徽章相映成趣，尾部特别缀有罗纹丝带小环。别于耳侧或刘海处，轻巧服帖不压发。",
      stylingScene: "适合耳侧碎发固定 · 侧分刘海点缀 · 编发发尾装饰",
      reviews: [
        {
          name: "桃桃乌龙",
          date: "11-04",
          isVerified: true,
          tag: "已购：藕紫星结 Lilas Nacré",
          rating: 5,
          text: "藕紫色水波纹太美了！上面的蓝色小蝴蝶结和粉色小星星很有芭蕾少女感，夹在耳边特别显脸小，夹身很轻不会滑落。",
          photos: ["/images/product-sideclip-lilac.png"],
        },
        {
          name: "眠眠兔",
          date: "10-29",
          isRepeatBuyer: true,
          tag: "已购：雾蓝星结 Bleu Brume",
          rating: 5,
          text: "雾蓝色配白衬衫绝配，夹子很轻巧不会往下滑，尾部的小丝带环细节满分。一口气把另外两个颜色也加购了。",
          photos: ["/images/product-sideclip-blue.png"],
        },
        {
          name: "芋泥啵啵没有芋泥",
          date: "10-21",
          tag: "已购：月白星结 Ivoire Doux",
          rating: 5,
          text: "买了月白和藕紫两只叠戴，珠光质感比普通亚克力高级太多，日常出街拍照很出片，包装盒也很干净体面。",
          photos: ["/images/product-sideclip-ivory.png"],
        },
      ],
    }
  }

  if (product.id === "etoile-03" || product.category === "bands") {
    return {
      headline: "细格纹与棉蕾丝，自然修饰高颅顶",
      copy: "清爽维希格纹布面镶嵌双排米白棉线蕾丝，侧边手工固定双层丝光缎带结与珠光小星。加宽微蓬造型视觉垫高颅顶，绒布内衬久戴温和不夹耳后。",
      stylingScene: "适合披发高颅顶修饰 · 学院风穿搭 · 春日出游拍照",
      reviews: [
        {
          name: "薄荷微光",
          date: "11-05",
          isVerified: true,
          tag: "已购：雾蓝经典格纹 Bleu Vichy",
          rating: 5,
          text: "发箍弧度做得很好，戴上显得头包脸！雾蓝格纹加上蕾丝边特别清爽，戴一下午耳朵后面也不痛，内衬是软软的绒面。",
          photos: ["/images/product-headband-blue.png"],
        },
        {
          name: "甜梨子",
          date: "10-31",
          tag: "已购：藕粉细格纹 Rose Vichy",
          rating: 5,
          text: "粉色细格纹太乖了，侧面的缎带蝴蝶结很有立体感，中间的小星星珠珠超可爱，搭针织开衫很有秋冬氛围。",
          photos: ["/images/product-headband-pink.png"],
        },
        {
          name: "常驻嘉宾路人甲",
          date: "10-24",
          isRepeatBuyer: true,
          tag: "已购：月白细密格纹 Ciel Fin",
          rating: 5,
          text: "细密格纹很耐看，配浅色连衣裙或者学院风毛衣都好看，做工很工整，蕾丝边很平整没有毛刺。",
          photos: ["/images/product-headband-ivory.png"],
        },
      ],
    }
  }

  if (product.id === "etoile-04" || product.category === "scrunchies") {
    return {
      headline: "云感蓬松发圈，马尾与手腕上的温柔点缀",
      copy: "精选透气格纹棉布、轻透网纱蕾丝与柔光素缎，多重环形细褶让发圈自然蓬松饱满。高回弹内芯束发稳固且不易留压痕，取下戴在手腕间亦是一道风景。",
      stylingScene: "适合高马尾 · 慵懒丸子头 · 手腕叠戴装饰",
      reviews: [
        {
          name: "团子今天也想睡",
          date: "11-05",
          isVerified: true,
          tag: "已购：01 蓝白细格网纱边款",
          rating: 5,
          text: "我的天到手真的惊艳我了！网纱那层绑高马尾跑起来会飘，像自带特效，芭蕾风爱好者狂喜。而且比普通发圈宽，绑两圈也不勒头皮，这个牌子真的很精致。",
          photos: ["/images/product-scrunchie-blue-gingham.png"],
        },
        {
          name: "阿崽今天营业了吗",
          date: "11-03",
          isVerified: true,
          tag: "已购：02 米白蓝格蕾丝飘带款",
          rating: 5,
          text: "超级有质感！蕾丝边是软的不会扎脖子，小蝴蝶结做工很细没有歪，低马尾绑起来真的很像韩剧女主角，配毛衣绝了。",
          photos: ["/images/product-scrunchie-cream-lace.png"],
        },
        {
          name: "睡到自然醒失败",
          date: "11-01",
          isRepeatBuyer: true,
          tag: "已购：03 浅蓝格纹棉蕾丝边款",
          rating: 5,
          text: "第四次回购这家了！这个蓝格配校服裤意外地搭，上课绑丸子头很乖。皮筋弹性很好，发量多绑两圈正好，戴一天摘下来头也不疼。",
          photos: ["/images/product-scrunchie-blue-lace.png"],
        },
      ],
    }
  }

  return {
    headline: "柔光素缎与垂坠蝴蝶结，定格温柔背影",
    copy: "细腻素缎与柔和格纹自然垂坠，微光漫反射质感纯净雅致。轻巧夹持随步伐轻盈摇曳，为每一次随性挽发增添仪式感。",
    stylingScene: "适合半扎公主头 · 慵懒低马尾 · 芭蕾盘发点缀",
    reviews: [
      {
        name: "晚风与诗",
        date: "11-04",
        isVerified: true,
        tag: "已购：丹宁蓝 Bleu Denim",
        rating: 5,
        text: "双层缎带垂下来的弧度特别美，蕾丝边很有复古感，夹半扎发背影氛围感拉满，实物做工比大几百的专柜款更耐看。",
        photos: ["/images/bow-lace-blue-ribbon.png"],
      },
      {
        name: "小栀",
        date: "10-27",
        tag: "已购：花白 Blanc Soie",
        rating: 5,
        text: "实物和图片一模一样，弹簧夹很稳，做工细致没有多余线头，包装附带的粉色小吊牌很舍不得扔。",
      },
      {
        name: "Yuki",
        date: "10-18",
        isRepeatBuyer: true,
        tag: "已购：经典双层缎带款",
        rating: 5,
        text: "价格很友好，平时搭配白衬衫或者小裙子都很出彩，已经成为每天早起出门的标配发饰了。",
      },
    ],
  }
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  allProducts,
  cartCount,
  isWishlisted,
  onToggleWishlist,
  onBack,
  onCartClick,
  onSelectProduct,
  onOpenSkuSheet,
}) => {
  const [currentImageIdx, setCurrentImageIdx] = useState(0)
  const [activeColorIdx, setActiveColorIdx] = useState(0)
  const [activeTab, setActiveTab] =
    useState<"material" | "craft" | "dimension" | "care">("material")
  const [modalPhoto, setModalPhoto] = useState<string | null>(null)

  useEffect(() => {
    setCurrentImageIdx(0)
    setActiveColorIdx(0)
    setModalPhoto(null)
  }, [product.id])

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 3)

  const editorial = getProductReviews(product)
  const activeColor = product.colors[activeColorIdx] || product.colors[0]
  const activeSpec = product.specs[0]

  const handleSelectColorSwatch = (idx: number) => {
    setActiveColorIdx(idx)
    if (idx < product.images.length) {
      setCurrentImageIdx(idx)
    }
  }

  return (
    <div className="relative w-full h-full min-h-0 flex flex-col bg-[#FFFBF0] text-[#46414E] overflow-hidden">
      {/* 1. Header Bar with Back Button & Cart */}
      <EtoileNavbar
        showBack={true}
        onBack={onBack}
        title={product.nameCn}
        showCart={true}
        cartCount={cartCount}
        onCartClick={onCartClick}
      />

      {/* 2. Scrollable Content Area */}
      <div className="flex-1 w-full min-h-0 overflow-y-auto overscroll-contain no-scrollbar pb-[118px]">
        {/* Swiper / Multi-image Gallery */}
        <div className="relative w-full aspect-[4/5] bg-white border-b border-[#46414E]/8 overflow-hidden flex items-center justify-center">
          <img
            src={product.images[currentImageIdx] || product.images[0]}
            alt={product.nameCn}
            className="w-full h-full object-contain p-4 transition-all duration-300"
          />

          {/* New Tag */}
          {product.isNew && (
            <span className="absolute top-4 left-5 px-2.5 py-0.5 rounded-full bg-[#E8CCD7] text-[#46414E] text-[11px] font-semibold font-sans shadow-2xs">
              NEW · 芭蕾风新品
            </span>
          )}

          {/* Current Color Label Pill */}
          <span className="absolute bottom-3.5 left-5 px-2.5 py-1 rounded-[6px] bg-[#FFFBF0]/92 border border-[#46414E]/12 text-[11px] font-sans text-[#46414E] shadow-2xs">
            当前展示：{product.colors[currentImageIdx]?.name || activeColor?.name}
          </span>

          {/* Quick thumbnail strip */}
          <div className="absolute right-4 bottom-3.5 flex items-center gap-1.5 bg-[#FFFBF0]/90 p-1 rounded-[6px] border border-[#46414E]/10 shadow-2xs">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setCurrentImageIdx(idx)
                  if (idx < product.colors.length) setActiveColorIdx(idx)
                }}
                className={`w-[36px] h-[36px] rounded-[5px] overflow-hidden border bg-white transition-all cursor-pointer ${
                  currentImageIdx === idx
                    ? "border-[#46414E] ring-1 ring-[#46414E] scale-105"
                    : "border-[#46414E]/15 opacity-70 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-contain p-0.5" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Basic Info */}
        <div className="px-5 pt-5 pb-4 border-b border-[#46414E]/8">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-3">
              <span className="text-[11px] font-serif-en uppercase tracking-[0.2em] text-[#6C6C6A] block mb-1">
                {product.collectionName || "ÉTOILE BALLET SERIES"}
              </span>
              <h2 className="text-[20px] font-sans font-medium text-[#46414E] leading-snug">
                {product.nameCn}
              </h2>
              <p className="text-[12px] font-serif-en italic text-[#6C6C6A] mt-0.5">
                {product.nameFr}
              </p>
            </div>

            {/* Wishlist button */}
            <button
              type="button"
              onClick={() => onToggleWishlist(product.id)}
              className={`w-[42px] h-[42px] rounded-[8px] border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                isWishlisted
                  ? "bg-[#E8CCD7] border-[#E8CCD7] text-[#46414E]"
                  : "bg-white/80 border-[#46414E]/12 text-[#6C6C6A] hover:text-[#46414E]"
              }`}
              title={isWishlisted ? "已收藏" : "加入收藏"}
              aria-label="收藏作品"
            >
              <Heart
                className={`w-5 h-5 ${
                  isWishlisted ? "fill-current stroke-current" : "stroke-[1.8]"
                }`}
              />
            </button>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1.5 mt-3">
            <span className="text-[15px] font-sans text-[#46414E]">¥</span>
            <span className="text-[26px] font-serif-en font-bold text-[#46414E] tracking-tight">
              {product.price}
            </span>
            {product.originalPrice && (
              <span className="text-[13px] font-serif-en line-through text-[#6C6C6A]/50 ml-1.5">
                ¥{product.originalPrice}
              </span>
            )}
            <span className="ml-auto text-[11px] font-sans text-[#46414E] bg-[#E8CCD7]/45 px-2 py-0.5 rounded-[4px]">
              芭蕾风发饰 · 附星徽吊牌
            </span>
          </div>

          {/* Interactive Color Swatch Bar (点击切换色系实拍) */}
          <div className="mt-3.5 pt-3 border-t border-[#46414E]/6">
            <span className="text-[11px] font-sans text-[#6C6C6A] block mb-2">
              可选色系（轻点切换上方实拍图）：
            </span>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((col, idx) => {
                const isSelected = activeColorIdx === idx
                return (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() => handleSelectColorSwatch(idx)}
                    className={`px-2.5 py-1.5 rounded-[6px] border text-[12px] font-sans flex items-center gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#46414E] text-[#FFFBF0] border-[#46414E] shadow-2xs"
                        : "bg-white text-[#46414E] border-[#46414E]/15 hover:bg-[#DEE5ED]/40"
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-black/15 shrink-0"
                      style={{ backgroundColor: col.hex }}
                    />
                    <span>{col.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Description */}
          <p className="text-[13px] font-sans text-[#6C6C6A] leading-relaxed mt-3 pt-3 border-t border-[#46414E]/6">
            {product.description}
          </p>
        </div>

        {/* Selected SKU Summary Trigger */}
        <div
          onClick={() => onOpenSkuSheet("buyNow")}
          className="mx-5 my-3 p-3.5 rounded-[8px] bg-[#DEE5ED]/60 border border-[#46414E]/10 flex items-center justify-between cursor-pointer hover:bg-[#DEE5ED] transition-colors"
        >
          <div className="flex items-center gap-2 text-[13px] font-sans truncate">
            <span className="text-[#6C6C6A]">已选规格：</span>
            <span className="font-medium text-[#46414E] truncate">
              {activeColor?.name} · {activeSpec?.name}
            </span>
          </div>
          <div className="flex items-center text-[12px] text-[#6C6C6A] shrink-0">
            <span>选择规格</span>
            <ChevronRight className="w-4 h-4 ml-0.5" />
          </div>
        </div>

        {/* Service Perks Bar */}
        <div className="mx-5 mb-5 grid grid-cols-3 gap-2 py-2.5 px-3 rounded-[8px] bg-white/70 border border-[#46414E]/8 text-[11px] font-sans text-[#6C6C6A]">
          <div className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-[#6E89A8]" />
            <span>顺丰安心送达</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#6E89A8]" />
            <span>手工质检包装</span>
          </div>
          <div className="flex items-center gap-1.5">
            <RotateCcw className="w-3.5 h-3.5 text-[#6E89A8]" />
            <span>7 天无忧退换</span>
          </div>
        </div>

        {/* Accordion Tabs for Craftsmanship, Materials, Dimensions, Care */}
        <div className="mx-5 mb-6 rounded-[8px] border border-[#46414E]/12 overflow-hidden bg-white/60">
          <div className="flex border-b border-[#46414E]/10 bg-[#DEE5ED]/40 text-[12px] font-sans">
            {[
              { id: "material", label: "材质用料" },
              { id: "craft", label: "细节工艺" },
              { id: "dimension", label: "规格尺寸" },
              { id: "care", label: "养护指南" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-2.5 text-center font-medium transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-white text-[#46414E] border-b-2 border-[#46414E]"
                    : "text-[#6C6C6A] hover:text-[#46414E]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-4 text-[13px] font-sans text-[#46414E] leading-relaxed">
            {activeTab === "material" && (
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="font-medium text-[#6C6C6A] shrink-0">
                    材质构成：
                  </span>
                  <span>{product.materials}</span>
                </div>
                <p className="text-[12px] text-[#6C6C6A] mt-2">
                  光泽柔和细腻，触感温润顺滑，适合日常高频佩戴。
                </p>
              </div>
            )}
            {activeTab === "craft" && (
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="font-medium text-[#6C6C6A] shrink-0">
                    工艺细节：
                  </span>
                  <span>{product.craftsmanship}</span>
                </div>
                <p className="text-[12px] text-[#6C6C6A] mt-2">
                  每件发饰均经细致打磨与弹力测试，佩戴稳固且不易拉扯发丝。
                </p>
              </div>
            )}
            {activeTab === "dimension" && (
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="font-medium text-[#6C6C6A] shrink-0">
                    尺寸参考：
                  </span>
                  <span>{product.dimensions}</span>
                </div>
                <p className="text-[12px] text-[#6C6C6A] mt-2">
                  手工测量可能存在 ±2mm 微小公差，属正常范围。
                </p>
              </div>
            )}
            {activeTab === "care" && (
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="font-medium text-[#6C6C6A] shrink-0">
                    养护建议：
                  </span>
                  <span>{product.careGuide}</span>
                </div>
                <p className="text-[12px] text-[#6C6C6A] mt-2">
                  附赠 ÉTOILE 品牌收纳袋与星徽吊牌，避免与硬物挤压。
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ============================================================
            长图文详情页 (Long-form Product Story & Real Wearing Gallery)
           ============================================================ */}
        <section className="px-5 py-6 border-t border-[#46414E]/8 space-y-5 bg-gradient-to-b from-[#FFFBF0] via-[#F8F5EE] to-[#FFFBF0]">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-serif-en tracking-[0.25em] uppercase text-[#6E89A8] block font-semibold">
                EDITORIAL DETAILS
              </span>
              <h3 className="text-[17px] font-sans font-medium text-[#46414E]">
                商品长图文详情
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded-[4px] bg-[#EDE1CF]/70 text-[11px] font-sans text-[#46414E]">
              100% 实物实戴拍摄
            </span>
          </div>

          {/* 01. Design & Styling Highlight Card */}
          <div className="p-4 rounded-[8px] bg-white border border-[#46414E]/10 space-y-2.5 shadow-2xs">
            <div className="flex items-center gap-1.5 text-[11px] font-serif-en tracking-[0.2em] text-[#C88F98] uppercase font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>01 · DESIGN & STYLING</span>
            </div>
            <h4 className="text-[15px] font-sans font-medium text-[#46414E]">
              {editorial.headline}
            </h4>
            <p className="text-[12.5px] font-sans text-[#6C6C6A] leading-relaxed">
              {editorial.copy}
            </p>
            <div className="pt-2 border-t border-[#46414E]/6 text-[11px] font-sans text-[#6E89A8] font-medium">
              搭配建议：{editorial.stylingScene}
            </div>
          </div>

          {/* 02. Real Model & Wearing Gallery (买家真人佩戴画册) */}
          {editorial.wearingGallery && editorial.wearingGallery.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-sans font-medium text-[#46414E]">
                  02 · 真人佩戴效果与日常搭配画册
                </span>
                <span className="text-[11px] font-serif-en italic text-[#6C6C6A]">
                  LOOKBOOK
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {editorial.wearingGallery.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setModalPhoto(item.image)}
                    className="group rounded-[8px] bg-white border border-[#46414E]/10 overflow-hidden shadow-2xs cursor-pointer active:scale-[0.98] transition-transform"
                  >
                    <div className="w-full aspect-[4/5] bg-[#F2EAE1] overflow-hidden relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-black/45 backdrop-blur-xs flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-3 h-3" />
                      </div>
                    </div>
                    <div className="p-2.5">
                      <h5 className="text-[12px] font-medium text-[#46414E] truncate">
                        {item.title}
                      </h5>
                      <p className="text-[10.5px] text-[#6C6C6A] truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 03. Full-Width Studio Colorway Shots (长图文逐张大图展示) */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-sans font-medium text-[#46414E]">
                03 · 款式与色系实拍图鉴（共 {product.images.length} 款）
              </span>
              <span className="text-[11px] font-serif-en italic text-[#6C6C6A]">
                STUDIO ARCHIVE
              </span>
            </div>

            {product.images.map((imgUrl, idx) => {
              const colorObj = product.colors[idx] || product.colors[0]
              return (
                <div
                  key={imgUrl + idx}
                  className="rounded-[8px] bg-white border border-[#46414E]/10 overflow-hidden shadow-2xs"
                >
                  <div
                    onClick={() => setModalPhoto(imgUrl)}
                    className="w-full aspect-[4/3] bg-white flex items-center justify-center p-4 cursor-pointer"
                  >
                    <img
                      src={imgUrl}
                      alt={`${product.nameCn} - ${colorObj?.name || ""}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="px-4 py-2.5 bg-[#FFFBF0]/80 border-t border-[#46414E]/6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {colorObj && (
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/15 shrink-0"
                          style={{ backgroundColor: colorObj.hex }}
                        />
                      )}
                      <span className="text-[13px] font-sans font-medium text-[#46414E]">
                        {colorObj ? colorObj.name : `${product.nameCn} 实拍 0${idx + 1}`}
                      </span>
                    </div>
                    <span className="text-[11px] font-sans text-[#6C6C6A]">
                      ÉTOILE 芭蕾风发饰
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* 04. Specification Summary Table */}
          <div className="p-4 rounded-[8px] bg-white border border-[#46414E]/10 space-y-2.5 shadow-2xs text-[12px] font-sans">
            <span className="text-[12px] font-medium text-[#46414E] block pb-1.5 border-b border-[#46414E]/8">
              04 · 商品档案参数
            </span>
            <div className="grid grid-cols-3 gap-y-2 text-[12px]">
              <span className="text-[#6C6C6A]">品牌名称</span>
              <span className="col-span-2 text-[#46414E] font-medium">
                ÉTOILE 芭蕾风发饰
              </span>
              <span className="text-[#6C6C6A]">所属品类</span>
              <span className="col-span-2 text-[#46414E]">
                {product.categoryLabel}
              </span>
              <span className="text-[#6C6C6A]">主要材质</span>
              <span className="col-span-2 text-[#46414E]">
                {product.materials}
              </span>
              <span className="text-[#6C6C6A]">规格尺寸</span>
              <span className="col-span-2 text-[#46414E]">
                {product.dimensions}
              </span>
            </div>
          </div>
        </section>

        {/* ============================================================
            买家秀与评价 (Buyer Reviews / UGC with Real Multi-Photo Display)
           ============================================================ */}
        <section className="px-5 py-5 border-t border-[#46414E]/8 space-y-3.5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[16px] font-sans font-medium text-[#46414E]">
                买家秀与评价 ({editorial.reviews.length})
              </h3>
              <p className="text-[11px] font-serif-en italic text-[#6C6C6A]">
                WORN IN REAL DAYS · 真实佩戴分享
              </p>
            </div>
            <span className="text-[11px] text-[#6E89A8] font-medium">
              好评度 100%
            </span>
          </div>

          {editorial.reviews.map((review, rIdx) => (
            <article
              key={review.name + rIdx}
              className="p-3.5 rounded-[10px] bg-white/90 border border-[#46414E]/8 space-y-2 shadow-2xs"
            >
              <div className="flex items-center justify-between text-[12px]">
                <div className="flex items-center gap-1.5">
                  <b className="font-medium text-[#46414E]">{review.name}</b>
                  {review.isVerified && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-[4px] bg-[#DEE5ED]/70 text-[#6E89A8] text-[9.5px]">
                      <CheckCircle2 className="w-2.5 h-2.5" /> 已购验证
                    </span>
                  )}
                  {review.isRepeatBuyer && (
                    <span className="px-1.5 py-0.2 rounded-[4px] bg-[#F6ECEE] text-[#A9828C] text-[9.5px]">
                      回头客
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#C9A86E] text-[11px]">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </span>
                  <span className="text-[10px] text-[#6C6C6A] tabular-nums">
                    {review.date}
                  </span>
                </div>
              </div>

              <div className="text-[10.5px] text-[#6C6C6A]">
                {review.tag}
              </div>

              <p className="text-[12.5px] leading-relaxed text-[#46414E]/90">
                {review.text}
              </p>

              {/* Multi-Photo Grid for this review */}
              {review.photos && review.photos.length > 0 && (
                <div className="pt-1 flex flex-wrap gap-2">
                  {review.photos.map((photoUrl, pIdx) => (
                    <div
                      key={pIdx}
                      onClick={() => setModalPhoto(photoUrl)}
                      className="w-[84px] h-[84px] rounded-[6px] border border-[#46414E]/10 bg-[#F8F6F2] overflow-hidden cursor-pointer hover:opacity-90 active:scale-95 transition-all p-0.5"
                    >
                      <img
                        src={photoUrl}
                        alt="买家晒图"
                        className="w-full h-full object-cover rounded-[4px]"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Shop reply if present */}
              {review.reply && (
                <div className="p-2.5 rounded-[6px] bg-[#F8F6F2] text-[11px] text-[#6C6C6A] leading-relaxed border border-[#46414E]/6">
                  <span className="font-medium text-[#46414E]">ÉTOILE 客服回复：</span>
                  {review.reply}
                </div>
              )}
            </article>
          ))}
        </section>

        {/* Related Recommendations (搭配推荐) */}
        <div className="px-5 pt-4 pb-2 border-t border-[#46414E]/8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[16px] font-sans font-medium text-[#46414E]">
              同系列搭配推荐
            </h3>
            <span className="text-[11px] font-serif-en italic text-[#6C6C6A]">
              RECOMMENDED STYLING
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectProduct(rel)}
                className="group flex flex-col cursor-pointer active:scale-95 transition-transform"
              >
                <div className="aspect-[4/5] rounded-[8px] overflow-hidden bg-white border border-[#46414E]/10 mb-1.5 p-1.5">
                  <img
                    src={rel.images[0]}
                    alt={rel.nameCn}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <h4 className="text-[11px] font-sans font-medium text-[#46414E] truncate">
                  {rel.nameCn}
                </h4>
                <span className="text-[12px] font-serif-en font-bold text-[#46414E]">
                  ¥{rel.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Fixed Bottom Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-40 bg-[#FFFBF0]/95 backdrop-blur-xl border-t border-[#46414E]/10 px-5 pt-2.5 pb-[22px] flex items-center gap-3">
        {/* Cart Quick Trigger with Badge */}
        <button
          type="button"
          onClick={onCartClick}
          className="w-[44px] h-[48px] rounded-[8px] flex flex-col items-center justify-center text-[#46414E] hover:bg-[#DEE5ED]/50 transition-colors cursor-pointer shrink-0"
          title="查看购物车"
          aria-label="查看购物车"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 min-w-[16px] h-[16px] px-1 rounded-[8px] bg-[#E8CCD7] border border-[#FFFBF0] text-[#46414E] text-[10px] font-bold font-sans flex items-center justify-center">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-sans text-[#6C6C6A] mt-0.5">
            选品夹
          </span>
        </button>

        {/* Dual Equal CTA Buttons: 加入购物车 & 立即购买 */}
        <div className="flex-1 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onOpenSkuSheet("addToCart")}
            className="h-[48px] rounded-[8px] bg-[#DEE5ED] border border-[#46414E]/15 text-[#46414E] text-[14px] font-sans font-medium hover:bg-[#d2dce6] active:scale-[0.98] transition-all cursor-pointer"
          >
            加入购物车
          </button>

          <button
            type="button"
            onClick={() => onOpenSkuSheet("buyNow")}
            className="h-[48px] rounded-[8px] bg-[#46414E] border border-[#46414E] text-[#FFFBF0] text-[14px] font-sans font-medium hover:bg-[#38343f] active:scale-[0.98] transition-all cursor-pointer shadow-xs"
          >
            立即购买
          </button>
        </div>
      </div>

      {/* 4. High-Resolution Buyer Photo Modal Preview */}
      {modalPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-4 animate-fade-in cursor-pointer select-none"
          onClick={() => setModalPhoto(null)}
        >
          <button
            type="button"
            onClick={() => setModalPhoto(null)}
            className="absolute top-12 right-5 w-9 h-9 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
            aria-label="关闭预览"
          >
            <X className="w-5 h-5" />
          </button>
          <div
            className="max-w-[360px] max-h-[80vh] rounded-[12px] overflow-hidden bg-white/5 border border-white/20 shadow-2xl p-1"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={modalPhoto}
              alt="实拍大图"
              className="w-full h-full max-h-[75vh] object-contain rounded-[10px]"
            />
          </div>
          <span className="mt-3 text-[12px] text-white/70">
            轻点任意位置关闭
          </span>
        </div>
      )}
    </div>
  )
}
