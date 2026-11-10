import React, { useState } from "react"
import {
  Product,
  CartItem,
  Address,
  Order,
  MainTabId,
  SecondaryPageId,
  FilterState,
  UserState,
  ProductColor,
  ProductSpec,
  FrameMode,
} from "./types"
import { PRODUCTS, INITIAL_ADDRESSES, INITIAL_ORDERS } from "./data/products"
import { IPhone17Frame } from "./components/IPhone17Frame"
import { BottomTabBar } from "./components/BottomTabBar"
import { SkuBottomSheet } from "./components/SkuBottomSheet"
import { PaymentModal } from "./components/PaymentModal"
import { WeChatActionSheet } from "./components/WeChatActionSheet"
import { HomeScreen } from "./screens/HomeScreen"
import { ShopScreen } from "./screens/ShopScreen"
import { ProductDetailScreen } from "./screens/ProductDetailScreen"
import { CartScreen } from "./screens/CartScreen"
import { CheckoutScreen } from "./screens/CheckoutScreen"
import { AddressListScreen, AddressEditScreen } from "./screens/AddressScreens"
import { OrdersScreen } from "./screens/OrdersScreen"
import { OrderDetailScreen } from "./screens/OrderDetailScreen"
import { StoryScreen } from "./screens/StoryScreen"
import { CollectionScreen } from "./screens/CollectionScreen"
import { MeScreen } from "./screens/MeScreen"
import { CareHelpScreen } from "./screens/CareHelpScreen"
import { WishlistScreen } from "./screens/WishlistScreen"
import { CheckCircle2 } from "lucide-react"
import { VirtualTryOnScreen } from "./screens/VirtualTryOnScreen"
import { MiniGameScreen } from "./screens/MiniGameScreen"
import { SplashScreen } from "./screens/SplashScreen"

export default function App() {
  const [showSplash, setShowSplash] = useState(true)

  // Navigation State
  const [currentTab, setCurrentTab] = useState<MainTabId>("home")
  const [secondaryPage, setSecondaryPage] = useState<SecondaryPageId | null>(
    null,
  )
  const [pageHistory, setPageHistory] = useState<{
    tab: MainTabId
    page: SecondaryPageId | null
  }[]>([])

  // Selected Entities
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    PRODUCTS[0].id,
  )
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null)
  const [checkoutSource, setCheckoutSource] = useState<"cart" | "buyNow">(
    "buyNow",
  )
  const [buyNowItem, setBuyNowItem] = useState<CartItem | null>(null)

  // Entities Data
  const [products] = useState<Product[]>(PRODUCTS)
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES)
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    INITIAL_ADDRESSES[0].id,
  )
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS)

  // Cart State (Initialized with 1 item for immediate exploration)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "cart-init-1",
      productId: "etoile-01",
      product: PRODUCTS[0],
      colorId: "c-pink",
      colorName: "灰粉 Rose Poudré",
      colorHex: "#E4C5C9",
      specId: "s-std",
      specName: "标准款 9.5cm",
      quantity: 1,
      selected: true,
      price: PRODUCTS[0].price,
    },
  ])

  // User State
  const [userState, setUserState] = useState<UserState>({
    isLoggedIn: true,
    name: "宛晴 Madeleine",
    phone: "138 1826 9081",
    memberTier: "黑金贵宾 VIP",
    wishlistIds: ["etoile-01", "etoile-02"],
  })

  // Shop Filter State
  const [filterState, setFilterState] = useState<FilterState>({
    category: "all",
    colorId: null,
    sortBy: "recommended",
    searchKeyword: "",
  })

  // Modals & Bottom Sheets
  const [skuSheet, setSkuSheet] = useState<{
    isOpen: boolean
    product: Product | null
    mode: "addToCart" | "buyNow"
  }>({
    isOpen: false,
    product: null,
    mode: "buyNow",
  })

  const [paymentModal, setPaymentModal] = useState<{
    isOpen: boolean
    order: Order | null
  }>({
    isOpen: false,
    order: null,
  })

  const [isWeChatMenuOpen, setIsWeChatMenuOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [frameMode, setFrameMode] = useState<FrameMode>("iphone")

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 2500)
  }

  // Navigation helpers
  const navigateToSecondary = (page: SecondaryPageId) => {
    setPageHistory((prev) => [
      ...prev,
      { tab: currentTab, page: secondaryPage },
    ])
    setSecondaryPage(page)
  }

  const navigateBack = () => {
    if (pageHistory.length > 0) {
      const prev = pageHistory[pageHistory.length - 1]
      setPageHistory((h) => h.slice(0, h.length - 1))
      setSecondaryPage(prev.page)
      if (prev.tab !== currentTab) setCurrentTab(prev.tab)
    } else {
      setSecondaryPage(null)
    }
  }

  const handleTabChange = (tab: MainTabId) => {
    setCurrentTab(tab)
    setSecondaryPage(null)
    setPageHistory([])
  }

  // Selected entities resolution
  const activeProduct =
    products.find((p) => p.id === selectedProductId) || products[0]
  const activeOrder = orders.find((o) => o.id === selectedOrderId) || orders[0]
  const activeAddress =
    addresses.find((a) => a.id === selectedAddressId) || addresses[0] || null
  const editingAddress =
    addresses.find((a) => a.id === editingAddressId) || null

  // Cart operations
  const handleToggleCartItem = (itemId: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, selected: !item.selected } : item,
      ),
    )
  }

  const handleToggleAllCart = () => {
    const allSelected =
      cartItems.length > 0 && cartItems.every((i) => i.selected)
    setCartItems((prev) =>
      prev.map((item) => ({ ...item, selected: !allSelected })),
    )
  }

  const handleUpdateCartQuantity = (itemId: string, delta: number) => {
    setCartItems(
      (prev) =>
        prev
          .map((item) => {
            if (item.id === itemId) {
              const nextQty = item.quantity + delta
              return nextQty > 0 ? { ...item, quantity: nextQty } : null
            }
            return item
          })
          .filter(Boolean) as CartItem[],
    )
  }

  const handleRemoveCartItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId))
    showToast("已从购物袋移出")
  }

  const handleQuickAddToCart = (product: Product) => {
    const defaultColor = product.colors[0]
    const defaultSpec = product.specs[0]
    const newItem: CartItem = {
      id: `cart-${Date.now()}`,
      productId: product.id,
      product,
      colorId: defaultColor.id,
      colorName: defaultColor.name,
      colorHex: defaultColor.hex,
      specId: defaultSpec.id,
      specName: defaultSpec.name,
      quantity: 1,
      selected: true,
      price: product.price,
    }
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) =>
          i.productId === newItem.productId &&
          i.colorId === newItem.colorId &&
          i.specId === newItem.specId,
      )
      if (existingIdx >= 0) {
        const updated = [...prev]
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + 1,
        }
        return updated
      }
      return [newItem, ...prev]
    })
    showToast(`已加入购物袋：${product.nameCn}`)
  }

  // SKU Sheet Confirm Handling
  const handleSkuConfirm = (
    color: ProductColor,
    spec: ProductSpec,
    quantity: number,
  ) => {
    if (!skuSheet.product) return

    if (skuSheet.mode === "addToCart") {
      const newItem: CartItem = {
        id: `cart-${Date.now()}`,
        productId: skuSheet.product.id,
        product: skuSheet.product,
        colorId: color.id,
        colorName: color.name,
        colorHex: color.hex,
        specId: spec.id,
        specName: spec.name,
        quantity,
        selected: true,
        price: skuSheet.product.price,
      }
      setCartItems((prev) => {
        // Combine if same product, color, and spec
        const existingIdx = prev.findIndex(
          (i) =>
            i.productId === newItem.productId &&
            i.colorId === newItem.colorId &&
            i.specId === newItem.specId,
        )
        if (existingIdx >= 0) {
          const updated = [...prev]
          updated[existingIdx].quantity += quantity
          return updated
        }
        return [newItem, ...prev]
      })
      setSkuSheet({ isOpen: false, product: null, mode: "addToCart" })
      showToast(
        `已选入选品夹：${skuSheet.product.nameCn} (${color.name}) × ${quantity}`,
      )
    } else {
      // mode === 'buyNow'
      const singleItem: CartItem = {
        id: `buynow-${Date.now()}`,
        productId: skuSheet.product.id,
        product: skuSheet.product,
        colorId: color.id,
        colorName: color.name,
        colorHex: color.hex,
        specId: spec.id,
        specName: spec.name,
        quantity,
        selected: true,
        price: skuSheet.product.price,
      }
      setBuyNowItem(singleItem)
      setCheckoutSource("buyNow")
      setSkuSheet({ isOpen: false, product: null, mode: "buyNow" })
      navigateToSecondary("checkout")
    }
  }

  // Checkout submission
  const handleSubmitCheckout = (note: string) => {
    if (!activeAddress) {
      showToast("请先选择或添加收货地址")
      return
    }

    const itemsToOrder =
      checkoutSource === "buyNow" && buyNowItem
        ? [buyNowItem]
        : cartItems.filter((i) => i.selected)

    if (itemsToOrder.length === 0) {
      showToast("没有待结算商品")
      return
    }

    const totalAmount = itemsToOrder.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0,
    )

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNo: `ET${new Date().getFullYear()}${String(Date.now()).slice(-8)}`,
      createdAt: "刚刚",
      status: "unpaid",
      items: itemsToOrder.map((i) => ({
        productId: i.productId,
        productNameCn: i.product.nameCn,
        productNameFr: i.product.nameFr,
        image: i.product.images[0],
        colorName: i.colorName,
        colorHex: i.colorHex,
        specName: i.specName,
        price: i.price,
        quantity: i.quantity,
      })),
      totalAmount,
      shippingAmount: 0,
      address: activeAddress,
      note,
    }

    // Save order
    setOrders((prev) => [newOrder, ...prev])
    setSelectedOrderId(newOrder.id)

    // Open simulated payment modal
    setPaymentModal({ isOpen: true, order: newOrder })
  }

  // Payment simulated outcomes
  const handlePaymentSuccess = () => {
    if (!paymentModal.order) return
    const paidOrderId = paymentModal.order.id

    // Update order status to 'unshipped'
    setOrders((prev) =>
      prev.map((o) =>
        o.id === paidOrderId
          ? { ...o, status: "unshipped", createdAt: "刚刚已付款" }
          : o,
      ),
    )

    // If source was cart, remove purchased items
    if (checkoutSource === "cart") {
      setCartItems((prev) => prev.filter((i) => !i.selected))
    } else {
      setBuyNowItem(null)
    }

    setPaymentModal({ isOpen: false, order: null })
    showToast("模拟支付成功 · 已生成待发货订单")
    setSelectedOrderId(paidOrderId)
    navigateToSecondary("orderDetail")
  }

  const handlePaymentCancel = () => {
    if (!paymentModal.order) return
    const pendingOrderId = paymentModal.order.id
    setPaymentModal({ isOpen: false, order: null })
    showToast("模拟取消支付 · 订单已保存于「待付款」")
    setSelectedOrderId(pendingOrderId)
    setCurrentTab("orders")
    setSecondaryPage(null)
  }

  const handlePaymentFail = () => {
    if (!paymentModal.order) return
    const pendingOrderId = paymentModal.order.id
    setPaymentModal({ isOpen: false, order: null })
    showToast("模拟支付失败 · 您可稍后重新发起支付")
    setSelectedOrderId(pendingOrderId)
    setCurrentTab("orders")
    setSecondaryPage(null)
  }

  // Order actions
  const handleContinuePayment = (order: Order) => {
    setPaymentModal({ isOpen: true, order })
  }

  const handleCancelOrder = (order: Order) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === order.id ? { ...o, status: "cancelled" } : o)),
    )
    showToast(`订单 ${order.orderNo} 已取消`)
  }

  const handleConfirmReceipt = (order: Order) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === order.id ? { ...o, status: "completed" } : o)),
    )
    showToast("已确认收货 · 感谢您的信任")
  }

  const handleRebuy = (order: Order) => {
    // Add all order items back to cart
    const newCartItems: CartItem[] = order.items.map((item, idx) => {
      const origProd =
        products.find((p) => p.id === item.productId) || products[0]
      return {
        id: `rebuy-${Date.now()}-${idx}`,
        productId: item.productId,
        product: origProd,
        colorId: "c-re",
        colorName: item.colorName,
        colorHex: item.colorHex,
        specId: "s-re",
        specName: item.specName,
        quantity: item.quantity,
        selected: true,
        price: item.price,
      }
    })

    setCartItems((prev) => [...newCartItems, ...prev])
    showToast("已将订单商品加入选品夹")
    navigateToSecondary("cart")
  }

  // Wishlist toggle
  const handleToggleWishlist = (productId: string) => {
    setUserState((prev) => {
      const exists = prev.wishlistIds.includes(productId)
      const updated = exists
        ? prev.wishlistIds.filter((id) => id !== productId)
        : [...prev.wishlistIds, productId]
      showToast(exists ? "已从心愿收藏中移除" : "已收藏至我的心愿单")
      return { ...prev, wishlistIds: updated }
    })
  }

  // Reset demo data
  const handleResetDemoData = () => {
    setOrders(INITIAL_ORDERS)
    setAddresses(INITIAL_ADDRESSES)
    setSelectedAddressId(INITIAL_ADDRESSES[0].id)
    setCartItems([
      {
        id: "cart-reset-1",
        productId: "etoile-01",
        product: PRODUCTS[0],
        colorId: "c-pink",
        colorName: "灰粉 Rose Poudré",
        colorHex: "#E4C5C9",
        specId: "s-std",
        specName: "标准款 9.5cm",
        quantity: 1,
        selected: true,
        price: PRODUCTS[0].price,
      },
    ])
    showToast("已恢复初始演示数据与 3 笔订单")
  }

  // Demo Journey Shortcuts (for reviewers)
  const runJourneyA = () => {
    // A: 首页 → 系列专题 → 商品详情 → 立即购买
    setCurrentTab("home")
    setSecondaryPage("collection")
    showToast("演示路径 A：进入「晨光微澜」系列专题")
  }

  const runJourneyB = () => {
    // B: 选购 → 筛选商品 → 购物车
    setCurrentTab("shop")
    setSecondaryPage(null)
    setFilterState({
      category: "clips",
      colorId: "c-pink",
      sortBy: "recommended",
      searchKeyword: "",
    })
    showToast("演示路径 B：选购页已筛选「粉色发夹」")
  }

  const runJourneyC = () => {
    // C: 订单 → 待付款订单
    setCurrentTab("orders")
    setSecondaryPage(null)
    showToast("演示路径 C：查看待付款订单并模拟支付")
  }

  // Active Screen Content Renderer
  const renderCurrentScreen = () => {
    // 1. Secondary Pages
    if (secondaryPage === "tryon") return <VirtualTryOnScreen products={products} onBack={navigateBack} onToast={showToast} />
    if (secondaryPage === "game") return <MiniGameScreen onBack={navigateBack} products={products} onSelectProduct={(prod) => { setSelectedProductId(prod.id); navigateToSecondary("productDetail") }} />
    if (secondaryPage === "productDetail") {
      return (
        <ProductDetailScreen
          product={activeProduct}
          allProducts={products}
          cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
          isWishlisted={userState.wishlistIds.includes(activeProduct.id)}
          onToggleWishlist={handleToggleWishlist}
          onBack={navigateBack}
          onCartClick={() => navigateToSecondary("cart")}
          onSelectProduct={(p) => {
            setSelectedProductId(p.id)
          }}
          onOpenSkuSheet={(mode) => {
            setSkuSheet({ isOpen: true, product: activeProduct, mode })
          }}
          selectedColor={activeProduct.colors[0]}
          selectedSpec={activeProduct.specs[0]}
        />
      )
    }

    if (secondaryPage === "cart") {
      return (
        <CartScreen
          items={cartItems}
          onBack={navigateBack}
          onToggleItem={handleToggleCartItem}
          onToggleAll={handleToggleAllCart}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveCartItem}
          onGoToShop={() => {
            setCurrentTab("shop")
            setSecondaryPage(null)
          }}
          onCheckout={() => {
            setCheckoutSource("cart")
            navigateToSecondary("checkout")
          }}
        />
      )
    }

    if (secondaryPage === "checkout") {
      const itemsToCheckout =
        checkoutSource === "buyNow" && buyNowItem
          ? [buyNowItem]
          : cartItems.filter((i) => i.selected)

      return (
        <CheckoutScreen
          items={itemsToCheckout}
          source={checkoutSource}
          selectedAddress={activeAddress}
          onBack={navigateBack}
          onSelectAddress={() => navigateToSecondary("addressList")}
          onSubmitOrder={handleSubmitCheckout}
        />
      )
    }

    if (secondaryPage === "addressList") {
      return (
        <AddressListScreen
          addresses={addresses}
          selectedAddressId={selectedAddressId}
          onBack={navigateBack}
          onSelectAddress={(addr) => {
            setSelectedAddressId(addr.id)
            navigateBack()
          }}
          onAddNew={() => {
            setEditingAddressId(null)
            navigateToSecondary("addressEdit")
          }}
          onEdit={(id) => {
            setEditingAddressId(id)
            navigateToSecondary("addressEdit")
          }}
          onDelete={(id) => {
            setAddresses((prev) => prev.filter((a) => a.id !== id))
            showToast("已删除地址")
          }}
        />
      )
    }

    if (secondaryPage === "addressEdit") {
      return (
        <AddressEditScreen
          initialAddress={editingAddress}
          onBack={navigateBack}
          onSave={(savedAddr) => {
            if (editingAddress) {
              setAddresses((prev) =>
                prev.map((a) => (a.id === savedAddr.id ? savedAddr : a)),
              )
            } else {
              setAddresses((prev) => [savedAddr, ...prev])
            }
            setSelectedAddressId(savedAddr.id)
            showToast("地址保存成功")
            navigateBack()
          }}
        />
      )
    }

    if (secondaryPage === "orderDetail") {
      return (
        <OrderDetailScreen
          order={activeOrder}
          onBack={navigateBack}
          onContinuePayment={() => handleContinuePayment(activeOrder)}
          onCancelOrder={() => handleCancelOrder(activeOrder)}
          onConfirmReceipt={() => handleConfirmReceipt(activeOrder)}
          onRebuy={() => handleRebuy(activeOrder)}
          onGoToHelp={() => navigateToSecondary("careHelp")}
          onShowToast={showToast}
        />
      )
    }

    if (secondaryPage === "story") {
      return (
        <StoryScreen
          onBack={navigateBack}
          onGoToShop={() => {
            setCurrentTab("shop")
            setSecondaryPage(null)
          }}
          onSelectProduct={(p) => {
            setSelectedProductId(p.id)
            navigateToSecondary("productDetail")
          }}
          relatedProducts={products}
        />
      )
    }

    if (secondaryPage === "collection") {
      return (
        <CollectionScreen
          onBack={navigateBack}
          onSelectProduct={(p) => {
            setSelectedProductId(p.id)
            navigateToSecondary("productDetail")
          }}
          collectionProducts={products.filter((p) =>
            p.collectionName?.includes("晨光"),
          )}
        />
      )
    }

    if (secondaryPage === "wishlist") {
      return (
        <WishlistScreen
          products={products}
          wishlistIds={userState.wishlistIds}
          onBack={navigateBack}
          onSelectProduct={(p) => {
            setSelectedProductId(p.id)
            navigateToSecondary("productDetail")
          }}
          onRemoveFromWishlist={handleToggleWishlist}
          onGoToShop={() => {
            setCurrentTab("shop")
            setSecondaryPage(null)
          }}
        />
      )
    }

    if (secondaryPage === "careHelp") {
      return <CareHelpScreen onBack={navigateBack} />
    }

    // 2. Primary Tabs Content
    switch (currentTab) {
      case "home":
        return (
          <HomeScreen
            products={products}
            onSelectProduct={(p) => {
              setSelectedProductId(p.id)
              navigateToSecondary("productDetail")
            }}
            onExploreCollection={() => navigateToSecondary("collection")}
            onExploreStory={() => navigateToSecondary("story")}
            onGoToShop={() => setCurrentTab("shop")}
            onOpenGame={() => navigateToSecondary("game")}
          />
        )

      case "shop":
        return (
          <ShopScreen
            products={products}
            filterState={filterState}
            onFilterChange={(newF) =>
              setFilterState((prev) => ({ ...prev, ...newF }))
            }
            cartItems={cartItems}
            onCartClick={() => navigateToSecondary("cart")}
            onSelectProduct={(p) => {
              setSelectedProductId(p.id)
              navigateToSecondary("productDetail")
            }}
            onQuickAddToCart={handleQuickAddToCart}
            onUpdateCartQuantity={handleUpdateCartQuantity}
            onRemoveCartItem={handleRemoveCartItem}
          />
        )

      case "orders":
        return (
          <OrdersScreen
            orders={orders}
            onSelectOrder={(ord) => {
              setSelectedOrderId(ord.id)
              navigateToSecondary("orderDetail")
            }}
            onContinuePayment={handleContinuePayment}
            onCancelOrder={handleCancelOrder}
            onConfirmReceipt={handleConfirmReceipt}
            onViewLogistics={(ord) => {
              setSelectedOrderId(ord.id)
              navigateToSecondary("orderDetail")
            }}
            onRebuy={handleRebuy}
            onGoToShop={() => setCurrentTab("shop")}
          />
        )

      case "me":
        return (
          <MeScreen
            userState={userState}
            orders={orders}
            onToggleLogin={() => {
              setUserState((prev) => {
                const nextLogged = !prev.isLoggedIn
                showToast(
                  nextLogged
                    ? "已模拟登录 ÉTOILE 沙龙会员"
                    : "已切换为访客体验模式",
                )
                return { ...prev, isLoggedIn: nextLogged }
              })
            }}
            onGoToOrdersWithFilter={(status) => {
              setCurrentTab("orders")
            }}
            onGoToAddressList={() => navigateToSecondary("addressList")}
            onGoToStory={() => navigateToSecondary("story")}
            onGoToCareHelp={() => navigateToSecondary("careHelp")}
            onGoToWishlist={() => navigateToSecondary("wishlist")}
            onResetDemoData={handleResetDemoData}
            onOpenGame={() => navigateToSecondary("game")}
          />
        )
    }
  }

  const unpaidCount = orders.filter((o) => o.status === "unpaid").length

  return (
    <div className="min-h-[100dvh] w-full bg-[#F8F6F2] text-[#403B42] flex items-center justify-center p-0 font-sans select-none">
      {/* Main Prototype Viewport */}
      <main className="relative w-full h-[100dvh] flex items-center justify-center">
        <IPhone17Frame
          frameMode={frameMode}
          onOpenWeChatMenu={() => setIsWeChatMenuOpen(true)}
        >
          {/* Viewport Screen Container (402 x 874) */}
          <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#FFFBF0]">
            {/* Screen Content Body */}
            <div className="flex-1 w-full min-h-0 overflow-hidden flex flex-col">
              {renderCurrentScreen()}
            </div>

            {/* Fixed Bottom Tab Bar: Visible only on primary tabs */}
            {!secondaryPage && (
              <BottomTabBar
                activeTab={currentTab}
                onTabChange={handleTabChange}
                unpaidOrdersCount={unpaidCount}
              />
            )}
            {showSplash && <SplashScreen onReveal={() => setShowSplash(false)} />}
          </div>
        </IPhone17Frame>
        {/* SKU Bottom Sheet Modal */}
        <SkuBottomSheet
          isOpen={skuSheet.isOpen}
          product={skuSheet.product}
          mode={skuSheet.mode}
          onClose={() => setSkuSheet((prev) => ({ ...prev, isOpen: false }))}
          onConfirm={handleSkuConfirm}
        />

        {/* Mock Payment Modal */}
        <PaymentModal
          isOpen={paymentModal.isOpen}
          orderNo={paymentModal.order?.orderNo || ""}
          amount={paymentModal.order?.totalAmount || 0}
          onSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
          onFail={handlePaymentFail}
          onClose={() => setPaymentModal({ isOpen: false, order: null })}
        />

        {/* WeChat Capsule Action Sheet */}
        <WeChatActionSheet
          isOpen={isWeChatMenuOpen}
          onClose={() => setIsWeChatMenuOpen(false)}
          onToast={showToast}
        />

        {/* Toast Notification */}
        {toastMessage && (
          <div className="absolute top-[96px] left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-[8px] bg-[#1c1c1f]/92 text-white text-[12px] font-sans shadow-xl flex items-center gap-2 border border-white/10 animate-fade-in pointer-events-none">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#E4C5C9] shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}
      </main>
    </div>
  )
}

