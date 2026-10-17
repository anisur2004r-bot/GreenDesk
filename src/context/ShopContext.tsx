import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  PotVariant,
  Order,
  OrderStatus,
  PageView,
  Language,
  Coupon,
  CategoryKey,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_COUPONS,
  DEFAULT_POTS,
} from '../data/products';

interface ToastData {
  id: number;
  messageEn: string;
  messageBn: string;
  type: 'success' | 'info' | 'error';
}

interface ShopContextType {
  // Navigation & Language
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  page: PageView;
  setPage: (page: PageView) => void;
  navigateToProduct: (product: Product) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  // Catalog State
  products: Product[];
  categories: CategoryKey[];
  activeCategory: CategoryKey | 'All';
  setActiveCategory: (cat: CategoryKey | 'All') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedLight: string;
  setSelectedLight: (light: string) => void;
  selectedCare: string;
  setSelectedCare: (care: string) => void;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating';
  setSortBy: (sort: 'featured' | 'price-low' | 'price-high' | 'rating') => void;
  maxPriceFilter: number;
  setMaxPriceFilter: (price: number) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, pot?: PotVariant, qty?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartItemCount: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Coupon
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string; messageBn: string };
  removeCoupon: () => void;
  couponDiscount: number;

  // Orders & Tracking
  orders: Order[];
  placeOrder: (
    customer: Order['customer'],
    deliveryZone: 'inside_dhaka' | 'outside_dhaka',
    paymentMethod: Order['paymentMethod'],
    trxId?: string
  ) => Order;
  getOrder: (orderNumber: string, phone?: string) => Order | undefined;
  updateOrderStatus: (orderNumber: string, newStatus: OrderStatus) => void;

  // Admin Controls
  toggleProductStock: (productId: string) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (code: string) => void;

  // Feedback Toasts
  toasts: ToastData[];
  showToast: (messageEn: string, messageBn: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: number) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Language & Page (Default to English as requested: "website ta english koro banglao thakbe translate korte parbe")
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('patabahar_lang') as Language) || 'en';
  });
  const [page, setPage] = useState<PageView>('home');
  const cleanImageUrl = (url?: string): string => {
    if (!url) return '/images/hero_white_desk_aloe.jpg';
    return url.replace('/src/assets/images/', '/images/');
  };

  const sanitizeProduct = (p: Product): Product => ({
    ...p,
    image: cleanImageUrl(p.image),
    gallery: (p.gallery && p.gallery.length > 0 ? p.gallery : [p.image]).map(cleanImageUrl),
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(() => sanitizeProduct(INITIAL_PRODUCTS[0]));

  // Catalog - ensure full products exist and image paths are always robust for Netlify
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('patabahar_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= INITIAL_PRODUCTS.length) {
          return parsed.map(sanitizeProduct);
        }
      } catch {
        return INITIAL_PRODUCTS.map(sanitizeProduct);
      }
    }
    return INITIAL_PRODUCTS.map(sanitizeProduct);
  });

  const categories: CategoryKey[] = [
    'Succulents',
    'Cactus',
    'Money Plant',
    'Snake Plant',
    'Gift Sets',
  ];
  const [activeCategory, setActiveCategory] = useState<CategoryKey | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLight, setSelectedLight] = useState('All');
  const [selectedCare, setSelectedCare] = useState('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(1000);

  // Cart Drawer
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('patabahar_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('patabahar_wishlist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('patabahar_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_ORDERS;
      }
    }
    return INITIAL_ORDERS;
  });

  // Coupons
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastData[]>([]);

  // LocalStorage syncing
  useEffect(() => {
    localStorage.setItem('patabahar_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('patabahar_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('patabahar_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('patabahar_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('patabahar_products', JSON.stringify(products));
  }, [products]);

  // Window scroll to top on page switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'bn' : 'en'));
  };

  const showToast = (
    messageEn: string,
    messageBn: string,
    type: 'success' | 'info' | 'error' = 'success'
  ) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, messageEn, messageBn, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setPage('product-detail');
  };

  // Cart operations
  const addToCart = (product: Product, pot?: PotVariant, qty = 1) => {
    const selectedPot = pot || product.potVariants[0] || DEFAULT_POTS[0];
    const cartItemId = `${product.id}-${selectedPot.id}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          quantity: qty,
          selectedPot,
        },
      ];
    });

    showToast(
      `Added "${product.name}" to cart!`,
      `"${product.nameBn}" কার্টে যুক্ত করা হয়েছে!`,
      'success'
    );
  };

  const removeFromCart = (cartItemId: string) => {
    const item = cart.find((i) => i.id === cartItemId);
    setCart((prev) => prev.filter((i) => i.id !== cartItemId));
    if (item) {
      showToast(
        `Removed "${item.product.name}" from cart`,
        `কার্ট থেকে "${item.product.nameBn}" মুছে ফেলা হয়েছে`,
        'info'
      );
    }
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartSubtotal = cart.reduce((sum, item) => {
    const itemPrice = item.product.price + item.selectedPot.extraPrice;
    return sum + itemPrice * item.quantity;
  }, 0);

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Coupon logic
  const couponDiscount = appliedCoupon
    ? appliedCoupon.discountPercent
      ? Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100)
      : appliedCoupon.discountAmount || 0
    : 0;

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === cleanCode);
    if (!found) {
      return {
        success: false,
        message: 'Invalid coupon code. Try SOBUJ10 or DESK50',
        messageBn: 'কুপন কোডটি সঠিক নয়। SOBUJ10 অথবা DESK50 ব্যবহার করুন।',
      };
    }
    if (cartSubtotal < found.minSpend) {
      return {
        success: false,
        message: `Minimum spend of ৳${found.minSpend} required for this coupon.`,
        messageBn: `এই কুপনের জন্য সর্বনিম্ন ৳${found.minSpend} টাকার অর্ডার করতে হবে।`,
      };
    }
    setAppliedCoupon(found);
    return {
      success: true,
      message: `Coupon "${found.code}" applied successfully!`,
      messageBn: `কুপন "${found.code}" সফলভাবে প্রয়োগ করা হয়েছে!`,
    };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist', 'উইশলিস্ট থেকে সরানো হয়েছে', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to wishlist', 'উইশলিস্টে যুক্ত করা হয়েছে', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Place Order
  const placeOrder = (
    customer: Order['customer'],
    deliveryZone: 'inside_dhaka' | 'outside_dhaka',
    paymentMethod: Order['paymentMethod'],
    trxId?: string
  ): Order => {
    const deliveryCharge = deliveryZone === 'inside_dhaka' ? 60 : 120;
    const discount = couponDiscount;
    const total = Math.max(0, cartSubtotal + deliveryCharge - discount);
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `PB-2026-${randomSuffix}`;

    const newOrder: Order = {
      orderNumber,
      createdAt: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      customer,
      items: [...cart],
      subtotal: cartSubtotal,
      deliveryZone,
      deliveryCharge,
      discount,
      couponCode: appliedCoupon?.code,
      total,
      paymentMethod,
      trxId: trxId?.trim() || undefined,
      status: 'Pending',
      statusTimeline: [
        {
          step: 'Pending',
          title: 'Order Placed',
          titleBn: 'অর্ডার গ্রহণ করা হয়েছে',
          description: 'Your order was received and is awaiting confirmation.',
          descriptionBn: 'আপনার অর্ডারটি গৃহীত হয়েছে এবং যাচাইয়ের অপেক্ষায় রয়েছে।',
          time: 'Just now',
          completed: true,
          current: true,
        },
        {
          step: 'Confirmed',
          title: 'Order Confirmed',
          titleBn: 'অর্ডার কনফার্ম করা হয়েছে',
          description: 'Our nursery team verified payment & plant inventory.',
          descriptionBn: 'নার্সারি টিম স্টক ও পেমেন্ট যাচাই করে কনফার্ম করেছে।',
          time: 'Within 2 hours',
          completed: false,
          current: false,
        },
        {
          step: 'Packed',
          title: 'Potted & Shock-Proof Packed',
          titleBn: 'টবে সাজিয়ে প্যাকিং সম্পন্ন',
          description: 'Planted with organic mix and protected with eco-wrap.',
          descriptionBn: 'সুরক্ষিত ইকো-র‍্যাপ দিয়ে যত্নের সাথে প্যাকিং করা হবে।',
          time: 'Pending',
          completed: false,
          current: false,
        },
        {
          step: 'Shipped',
          title: 'Handed to Delivery Rider',
          titleBn: 'ডেলিভারির জন্য পাঠানো হয়েছে',
          description: 'Dispatched via express courier with tracking ID.',
          descriptionBn: 'ট্র্যাকিং আইডি সহ এক্সপ্রেস কুরিয়ারে হস্তান্তর করা হবে।',
          time: 'Pending',
          completed: false,
          current: false,
        },
        {
          step: 'Delivered',
          title: 'Delivered to Your Desk',
          titleBn: 'ডেস্কে পৌঁছে দেওয়া সম্পন্ন',
          description: 'Enjoy your fresh new living green workspace!',
          descriptionBn: 'আপনার ডেস্কে স্নিগ্ধ সবুজ শুভকামনা!',
          time: 'Pending',
          completed: false,
          current: false,
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const getOrder = (orderNumber: string, phone?: string): Order | undefined => {
    const cleanNum = orderNumber.trim().toUpperCase();
    return orders.find((o) => {
      const matchNum = o.orderNumber.toUpperCase() === cleanNum;
      if (!matchNum) return false;
      if (phone) {
        return o.customer.phone.replace(/[\s-]/g, '').includes(phone.replace(/[\s-]/g, ''));
      }
      return true;
    });
  };

  const updateOrderStatus = (orderNumber: string, newStatus: OrderStatus) => {
    const statusOrder: OrderStatus[] = ['Pending', 'Confirmed', 'Packed', 'Shipped', 'Delivered'];
    const targetIdx = statusOrder.indexOf(newStatus);

    setOrders((prev) =>
      prev.map((order) => {
        if (order.orderNumber !== orderNumber) return order;

        const updatedTimeline = order.statusTimeline.map((step) => {
          const stepIdx = statusOrder.indexOf(step.step);
          return {
            ...step,
            completed: stepIdx <= targetIdx,
            current: step.step === newStatus,
            time: step.step === newStatus ? 'Updated just now' : step.time,
          };
        });

        return {
          ...order,
          status: newStatus,
          statusTimeline: updatedTimeline,
        };
      })
    );

    showToast(
      `Order ${orderNumber} status updated to ${newStatus}`,
      `অর্ডার ${orderNumber} এর স্ট্যাটাস "${newStatus}" এ পরিবর্তন করা হয়েছে`,
      'info'
    );
  };

  // Admin controls
  const toggleProductStock = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newStock = p.stock > 0 ? 0 : 15;
          return { ...p, stock: newStock };
        }
        return p;
      })
    );
  };

  const addProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
    showToast(`Added new product: ${product.name}`, `নতুন পণ্য যুক্ত হয়েছে: ${product.nameBn}`, 'success');
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`Updated product: ${updated.name}`, `পণ্য আপডেট সম্পন্ন: ${updated.nameBn}`, 'success');
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product removed', 'পণ্য মুছে ফেলা হয়েছে', 'info');
  };

  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [...prev, coupon]);
    showToast(`Coupon ${coupon.code} added`, `কুপন ${coupon.code} তৈরি হয়েছে`, 'success');
  };

  const deleteCoupon = (code: string) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
    showToast(`Coupon ${code} deleted`, `কুপন ${code} মুছে ফেলা হয়েছে`, 'info');
  };

  return (
    <ShopContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        page,
        setPage,
        navigateToProduct,
        selectedProduct,
        setSelectedProduct,
        products,
        categories,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        selectedLight,
        setSelectedLight,
        selectedCare,
        setSelectedCare,
        sortBy,
        setSortBy,
        maxPriceFilter,
        setMaxPriceFilter,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        cartItemCount,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        coupons,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        couponDiscount,
        orders,
        placeOrder,
        getOrder,
        updateOrderStatus,
        toggleProductStock,
        addProduct,
        updateProduct,
        deleteProduct,
        addCoupon,
        deleteCoupon,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
