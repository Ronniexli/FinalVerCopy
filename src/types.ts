export type CategoryId = "all" | "claw" | "bows" | "floral" | "bands" | "scrunchies"

export interface ProductColor {
  id: string
  name: string
  hex: string
  inStock: boolean
}

export interface ProductSpec {
  id: string
  name: string
  inStock: boolean
}

export interface Product {
  id: string
  nameCn: string
  nameFr: string
  category: "claw" | "bows" | "floral" | "bands" | "scrunchies"
  categoryLabel: string
  price: number
  originalPrice?: number
  isNew?: boolean
  isFeatured?: boolean
  collectionName?: string
  images: string[]
  description: string
  materials: string
  craftsmanship: string
  dimensions: string
  careGuide: string
  colors: ProductColor[]
  specs: ProductSpec[]
  stock: number
}

export interface CartItem {
  id: string
  productId: string
  product: Product
  colorId: string
  colorName: string
  colorHex: string
  specId: string
  specName: string
  quantity: number
  selected: boolean
  price: number
}

export interface Address {
  id: string
  receiver: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
  isDefault: boolean
}

export type OrderStatus = "unpaid" | "unshipped" | "unreceived" | "completed" | "cancelled"

export interface OrderItem {
  productId: string
  productNameCn: string
  productNameFr: string
  image: string
  colorName: string
  colorHex: string
  specName: string
  price: number
  quantity: number
}

export interface TrackingStep {
  time: string
  title: string
  description: string
  done: boolean
}

export interface Order {
  id: string
  orderNo: string
  createdAt: string
  status: OrderStatus
  items: OrderItem[]
  totalAmount: number
  shippingAmount: number
  address: Address
  note?: string
  trackingNo?: string
  trackingTimeline?: TrackingStep[]
}

export type MainTabId = "home" | "shop" | "orders" | "me"

export type SecondaryPageId = "productDetail" | "cart" | "checkout" | "addressList" | "addressEdit" | "orderDetail" | "story" | "collection" | "wishlist" | "careHelp" | "tryon" | "game"

export interface NavigationState {
  currentTab: MainTabId
  secondaryPage: SecondaryPageId | null
  selectedProductId: string | null
  selectedOrderId: string | null
  editingAddressId: string | null
  checkoutSource: "cart" | "buyNow" | null
  buyNowItem: CartItem | null
  pageHistory: { tab: MainTabId page: SecondaryPageId | null }[]
}

export type SortOption = "recommended" | "priceAsc" | "priceDesc"

export interface FilterState {
  category: CategoryId
  colorId: string | null
  sortBy: SortOption
  searchKeyword: string
}

export interface UserState {
  isLoggedIn: boolean
  name: string
  phone: string
  memberTier: string
  wishlistIds: string[]
}
