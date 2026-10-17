export type Language = 'en' | 'bn';

export type CategoryKey = 'Succulents' | 'Cactus' | 'Money Plant' | 'Snake Plant' | 'Gift Sets';

export interface PotVariant {
  id: string;
  name: string;
  nameBn: string;
  color: string;
  extraPrice: number;
}

export interface Product {
  id: string;
  name: string;
  nameBn: string;
  scientificName: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  stock: number;
  category: CategoryKey;
  categoryBn: string;
  light: 'Low Light' | 'Bright Indirect' | 'Direct Sunlight';
  lightBn: string;
  water: string;
  waterBn: string;
  careLevel: 'Easy' | 'Moderate' | 'Beginner-friendly';
  careLevelBn: string;
  isAirPurifying: boolean;
  isPetFriendly: boolean;
  isFeatured: boolean;
  isBestSeller: boolean;
  image: string;
  gallery: string[];
  description: string;
  descriptionBn: string;
  careTips: {
    water: string;
    light: string;
    soil: string;
    fertilizer: string;
  };
  careTipsBn: {
    water: string;
    light: string;
    soil: string;
    fertilizer: string;
  };
  potVariants: PotVariant[];
  dimensions: string;
  dimensionsBn: string;
}

export interface CartItem {
  id: string; // unique key combining productId + potVariantId
  product: Product;
  quantity: number;
  selectedPot: PotVariant;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  district: string;
  area: string;
  address: string;
  notes?: string;
}

export type PaymentMethod = 'cod' | 'bkash' | 'nagad';

export type OrderStatus = 'Pending' | 'Confirmed' | 'Packed' | 'Shipped' | 'Delivered';

export interface TrackingStep {
  step: OrderStatus;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  time: string;
  completed: boolean;
  current: boolean;
}

export interface Order {
  orderNumber: string;
  createdAt: string;
  customer: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  deliveryZone: 'inside_dhaka' | 'outside_dhaka';
  deliveryCharge: number;
  discount: number;
  couponCode?: string;
  total: number;
  paymentMethod: PaymentMethod;
  trxId?: string;
  status: OrderStatus;
  statusTimeline: TrackingStep[];
}

export type PageView =
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'tracking'
  | 'about'
  | 'contact'
  | 'care-tips'
  | 'policy'
  | 'faq'
  | 'admin';

export interface Coupon {
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  minSpend: number;
  description: string;
  descriptionBn: string;
}
