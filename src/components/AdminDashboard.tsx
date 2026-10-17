import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { OrderStatus, Product, Coupon, CategoryKey } from '../types';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tag,
  Sliders,
  Settings,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Eye,
  TrendingUp,
  DollarSign,
  Truck,
  ArrowLeft,
  X,
  Check,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    language,
    setPage,
    products,
    orders,
    coupons,
    categories,
    toggleProductStock,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    addCoupon,
    deleteCoupon,
    showToast,
  } = useShop();

  const isBn = language === 'bn';

  // Admin active sub-tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'orders' | 'products' | 'customers' | 'categories' | 'coupons' | 'banners' | 'settings'
  >('overview');

  // Add Product Modal
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdNameBn, setNewProdNameBn] = useState('');
  const [newProdPrice, setNewProdPrice] = useState(450);
  const [newProdCat, setNewProdCat] = useState<CategoryKey>('Succulents');
  const [newProdStock, setNewProdStock] = useState(15);
  const [newProdLight, setNewProdLight] = useState<'Low Light' | 'Bright Indirect' | 'Direct Sunlight'>('Bright Indirect');

  // Add Coupon Form
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(10);
  const [newCouponMin, setNewCouponMin] = useState(500);

  // Banner State
  const [bannerText, setBannerText] = useState('🌿 ঢাকায় মাত্র ২৪-৪৮ ঘণ্টায় হোম ডেলিভারি (৳৬০) | ১০০% ট্রানজিট গ্যারান্টি');
  const [bannerSaved, setBannerSaved] = useState(false);

  // Settings State
  const [dhakaFee, setDhakaFee] = useState(60);
  const [outsideDhakaFee, setOutsideDhakaFee] = useState(120);
  const [supportPhone, setSupportPhone] = useState('+880 1712-345678');
  const [bkashMerchant, setBkashMerchant] = useState('01712-345678');
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Calculate Mock Analytics
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0) + 145000;
  const totalOrdersCount = orders.length + 120;
  const avgOrderValue = Math.round(totalSales / totalOrdersCount);
  const pendingOrders = orders.filter((o) => o.status === 'Pending' || o.status === 'Confirmed').length;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    const newPlant: Product = {
      id: `custom-${Date.now()}`,
      name: newProdName,
      nameBn: newProdNameBn || newProdName,
      scientificName: 'Botanica desk collection',
      price: Number(newProdPrice),
      originalPrice: Number(newProdPrice) + 80,
      rating: 5.0,
      reviewCount: 1,
      stock: Number(newProdStock),
      category: newProdCat,
      categoryBn: newProdCat,
      light: newProdLight,
      lightBn: 'উজ্জ্বল পরোক্ষ আলো',
      water: 'Every 7-10 days',
      waterBn: '৭-১০ দিনে একবার',
      careLevel: 'Easy',
      careLevelBn: 'সহজ যত্ন',
      isAirPurifying: true,
      isPetFriendly: true,
      isFeatured: true,
      isBestSeller: false,
      image: '/images/product_mini_jade_1792273187018.jpg',
      gallery: ['/images/product_mini_jade_1792273187018.jpg'],
      description: 'Hand-selected desk plant potted with organic mineral mix.',
      descriptionBn: 'হ্যান্ডপিকড ডেস্ক প্ল্যান্ট যা অফিসে বেঁচে থাকার উপযোগী।',
      careTips: {
        water: 'Water once a week when dry.',
        light: 'Indirect indoor lighting.',
        soil: 'Organic mix.',
        fertilizer: 'Monthly fertilizer.',
      },
      careTipsBn: {
        water: 'মাটি শুকালে পানি দিন।',
        light: 'পরোক্ষ আলোতে রাখুন।',
        soil: 'জৈব পটিং মাটি।',
        fertilizer: 'মাসে একবার তরল সার।',
      },
      potVariants: [
        { id: 'terracotta', name: 'Terracotta', nameBn: 'মাটির টব', color: '#c86d51', extraPrice: 0 },
        { id: 'ceramic_white', name: 'Matte White Ceramic', nameBn: 'ম্যাট হোয়াইট', color: '#ffffff', extraPrice: 80 },
      ],
      dimensions: 'Height: 12 cm',
      dimensionsBn: 'উচ্চতা: ১২ সেমি',
    };

    addProduct(newPlant);
    setIsAddProductOpen(false);
    setNewProdName('');
    setNewProdNameBn('');
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    const c: Coupon = {
      code: newCouponCode.trim().toUpperCase(),
      discountPercent: Number(newCouponDiscount),
      minSpend: Number(newCouponMin),
      description: `${newCouponDiscount}% off on orders above ৳${newCouponMin}`,
      descriptionBn: `৳${newCouponMin} টাকার অর্ডারে ${newCouponDiscount}% ছাড়`,
    };
    addCoupon(c);
    setNewCouponCode('');
  };

  return (
    <div className="py-8 bg-stone-100 min-h-screen">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Top Bar with Exit Button */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/80 shadow-2xs mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1b4332] text-white flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-[#74c69d]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-stone-900">
                  {isBn ? 'পাটাবাহার অ্যাডমিন ড্যাশবোর্ড' : 'Patabahar Admin Dashboard'}
                </h1>
                <span className="text-[10px] font-semibold bg-[#d8f3dc] text-[#1b4332] px-2 py-0.5 rounded-full">
                  Visual Mock
                </span>
              </div>
              <p className="text-xs text-stone-500">
                {isBn
                  ? 'রিয়েল-টাইম ফ্রন্টএন্ড ডেটা ও স্টোর কনফিগারেশন'
                  : 'Client-side simulated management for products, orders, and store settings'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setPage('home')}
            className="self-start sm:self-auto flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-3.5 py-2 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isBn ? 'স্টোরফ্রন্টে ফিরে যান' : 'Exit to Storefront'}</span>
          </button>
        </div>

        {/* Tab Navigation Menu */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {[
            { id: 'overview', label: isBn ? 'ওভারভিউ' : 'Overview', icon: LayoutDashboard },
            { id: 'orders', label: isBn ? 'অর্ডারসমূহ' : 'Orders', icon: ShoppingCart, count: orders.length },
            { id: 'products', label: isBn ? 'পণ্য তালিকা' : 'Products', icon: Package, count: products.length },
            { id: 'customers', label: isBn ? 'গ্রাহকবৃন্দ' : 'Customers', icon: Users },
            { id: 'categories', label: isBn ? 'ক্যাটাগরি' : 'Categories', icon: Sliders },
            { id: 'coupons', label: isBn ? 'কুপন ছাড়' : 'Coupons', icon: Tag, count: coupons.length },
            { id: 'banners', label: isBn ? 'ব্যানার' : 'Banners', icon: Tag },
            { id: 'settings', label: isBn ? 'স্টোর সেটিংস' : 'Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#1b4332] text-white shadow-sm'
                    : 'bg-white text-stone-600 hover:bg-stone-200/60 border border-stone-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums ${
                      isActive ? 'bg-[#2d6a4f] text-white' : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview KPIs */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* 4 Analytics Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs font-semibold">{isBn ? 'মোট বিক্রয়' : 'Total Sales'}</span>
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-bold text-stone-900 tabular-nums">
                  ৳{totalSales.toLocaleString()}
                </div>
                <span className="text-[11px] text-emerald-700 font-medium block mt-1">
                  ↑ 18.4% from last month
                </span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs font-semibold">{isBn ? 'মোট অর্ডার' : 'Total Orders'}</span>
                  <ShoppingCart className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-stone-900 tabular-nums">
                  {totalOrdersCount}
                </div>
                <span className="text-[11px] text-stone-500 block mt-1">
                  {orders.length} in current session
                </span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs font-semibold">{isBn ? 'গড় অর্ডার সাইজ' : 'Average Order'}</span>
                  <TrendingUp className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-2xl font-bold text-stone-900 tabular-nums">
                  ৳{avgOrderValue}
                </div>
                <span className="text-[11px] text-stone-500 block mt-1">
                  ~ 2.1 desk plants per order
                </span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs font-semibold">
                    {isBn ? 'ডেলিভারি বাকি' : 'Pending Shipments'}
                  </span>
                  <Truck className="w-4 h-4 text-rose-600" />
                </div>
                <div className="text-2xl font-bold text-stone-900 tabular-nums">
                  {pendingOrders}
                </div>
                <span className="text-[11px] text-amber-700 font-medium block mt-1">
                  Ready for courier dispatch
                </span>
              </div>
            </div>

            {/* Recent Orders Preview */}
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
              <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-stone-900">
                  {isBn ? 'সাম্প্রতিক অর্ডারসমূহ' : 'Recent Customer Orders'}
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-semibold text-[#2d6a4f] hover:underline"
                >
                  {isBn ? 'সবগুলো দেখুন' : 'View All'}
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-100">
                    <tr>
                      <th className="p-3.5">Order ID</th>
                      <th className="p-3.5">Customer</th>
                      <th className="p-3.5">Items</th>
                      <th className="p-3.5">Total</th>
                      <th className="p-3.5">Payment</th>
                      <th className="p-3.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-700">
                    {orders.slice(0, 4).map((ord) => (
                      <tr key={ord.orderNumber} className="hover:bg-stone-50/70">
                        <td className="p-3.5 font-mono font-bold text-[#1b4332]">
                          {ord.orderNumber}
                        </td>
                        <td className="p-3.5">
                          <span className="font-semibold block">{ord.customer.name}</span>
                          <span className="text-[10px] text-stone-400 font-mono">
                            {ord.customer.phone}
                          </span>
                        </td>
                        <td className="p-3.5">
                          {ord.items.length} items (
                          {ord.items.map((i) => i.product.name).join(', ')})
                        </td>
                        <td className="p-3.5 font-bold tabular-nums">৳{ord.total}</td>
                        <td className="p-3.5 uppercase font-medium text-stone-600">
                          {ord.paymentMethod}
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              ord.status === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : ord.status === 'Shipped'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {ord.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Orders Management */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs space-y-4">
            <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-stone-900">
                  {isBn ? 'অর্ডার তালিকা ও স্ট্যাটাস পরিবর্তন' : 'Manage Orders & Update Status'}
                </h3>
                <p className="text-xs text-stone-500">
                  {isBn
                    ? 'স্ট্যাটাস পরিবর্তন করলে গ্রাহকের ট্র্যাকিং পেজে স্বয়ংক্রিয়ভাবে আপডেট হবে।'
                    : 'Changing status here updates live customer tracking in real-time.'}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-100">
                  <tr>
                    <th className="p-3.5">Order ID</th>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5">Customer & City</th>
                    <th className="p-3.5">Items</th>
                    <th className="p-3.5">Total</th>
                    <th className="p-3.5">Payment</th>
                    <th className="p-3.5">Change Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {orders.map((ord) => (
                    <tr key={ord.orderNumber} className="hover:bg-stone-50/70">
                      <td className="p-3.5 font-mono font-bold text-[#1b4332]">
                        {ord.orderNumber}
                      </td>
                      <td className="p-3.5 text-stone-500">{ord.createdAt}</td>
                      <td className="p-3.5">
                        <span className="font-semibold block">{ord.customer.name}</span>
                        <span className="text-[10px] text-stone-500">
                          {ord.customer.area}, {ord.customer.district} ({ord.customer.phone})
                        </span>
                      </td>
                      <td className="p-3.5">
                        <ul className="space-y-0.5">
                          {ord.items.map((it) => (
                            <li key={it.id}>
                              {it.quantity}× {it.product.name} ({it.selectedPot.name})
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="p-3.5 font-bold tabular-nums">৳{ord.total}</td>
                      <td className="p-3.5 uppercase font-medium">
                        {ord.paymentMethod}
                        {ord.trxId && (
                          <span className="block text-[10px] text-stone-400 font-mono">
                            {ord.trxId}
                          </span>
                        )}
                      </td>
                      <td className="p-3.5">
                        <select
                          value={ord.status}
                          onChange={(e) =>
                            updateOrderStatus(ord.orderNumber, e.target.value as OrderStatus)
                          }
                          className="bg-stone-50 border border-stone-300 rounded-lg p-1.5 text-xs font-semibold focus:outline-none focus:border-[#2d6a4f] cursor-pointer"
                        >
                          <option value="Pending">Pending (অপেক্ষমান)</option>
                          <option value="Confirmed">Confirmed (নিশ্চিত)</option>
                          <option value="Packed">Packed (প্যাক সম্পন্ন)</option>
                          <option value="Shipped">Shipped (কুরিয়ারে পথে)</option>
                          <option value="Delivered">Delivered (হস্তান্তরিত)</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Products Management */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  {isBn ? 'ইনভেন্টরি ও প্রোডাক্ট ক্যাটালগ' : 'Plant Inventory Management'}
                </h3>
                <p className="text-xs text-stone-500">
                  {products.length} {isBn ? 'টি গাছ স্টোরে তালিকাভুক্ত' : 'items listed'}
                </p>
              </div>

              <button
                onClick={() => setIsAddProductOpen(true)}
                className="bg-[#1b4332] hover:bg-[#2d6a4f] text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Plus className="w-4 h-4 text-[#74c69d]" />
                <span>{isBn ? 'নতুন গাছ যোগ করুন' : 'Add New Plant'}</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-100">
                    <tr>
                      <th className="p-3.5">Plant</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Price</th>
                      <th className="p-3.5">Stock Status</th>
                      <th className="p-3.5">Light / Care</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-700">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-stone-50/70">
                        <td className="p-3.5 flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-10 h-10 rounded-lg object-cover bg-stone-100 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <span className="font-bold text-stone-900 block">{p.name}</span>
                            <span className="text-[11px] text-stone-400">{p.nameBn}</span>
                          </div>
                        </td>
                        <td className="p-3.5">{p.category}</td>
                        <td className="p-3.5 font-bold tabular-nums">৳{p.price}</td>
                        <td className="p-3.5">
                          <button
                            onClick={() => toggleProductStock(p.id)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${
                              p.stock > 0
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                            }`}
                            title="Click to toggle stock"
                          >
                            {p.stock > 0 ? `In Stock (${p.stock})` : 'Out of Stock'}
                          </button>
                        </td>
                        <td className="p-3.5 text-stone-500">
                          {p.light} · {p.careLevel}
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => {
                              const newPrice = prompt(`Enter new price for ${p.name}:`, String(p.price));
                              if (newPrice && !isNaN(Number(newPrice))) {
                                updateProduct({ ...p, price: Number(newPrice) });
                              }
                            }}
                            className="text-stone-500 hover:text-stone-900 p-1"
                            title="Quick Edit Price"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete ${p.name}?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="text-stone-400 hover:text-rose-600 p-1"
                            title="Delete plant"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Customers */}
        {activeTab === 'customers' && (
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-stone-900">
              {isBn ? 'নিবন্ধিত ও সক্রিয় ক্রেতাবৃন্দ' : 'Recent Plant Buyers'}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-100">
                  <tr>
                    <th className="p-3.5">Customer Name</th>
                    <th className="p-3.5">Phone Number</th>
                    <th className="p-3.5">City / Location</th>
                    <th className="p-3.5">Total Orders</th>
                    <th className="p-3.5">Customer Tier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {orders.map((o, idx) => (
                    <tr key={idx} className="hover:bg-stone-50/70">
                      <td className="p-3.5 font-bold text-stone-900">{o.customer.name}</td>
                      <td className="p-3.5 font-mono text-stone-600">{o.customer.phone}</td>
                      <td className="p-3.5">
                        {o.customer.area}, {o.customer.district}
                      </td>
                      <td className="p-3.5 font-semibold tabular-nums">{o.items.length} plants</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#d8f3dc] text-[#1b4332]">
                          Desk Lover
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 5: Categories */}
        {activeTab === 'categories' && (
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-stone-900">
              {isBn ? 'ক্যাটাগরি কনফিগারেশন' : 'Product Categories'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat) => (
                <div key={cat} className="p-4 rounded-xl border border-stone-200 bg-stone-50/50">
                  <span className="text-xs font-bold text-[#1b4332] block">{cat}</span>
                  <span className="text-[11px] text-stone-500 block mt-1">
                    {products.filter((p) => p.category === cat).length} plants active
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Coupons */}
        {activeTab === 'coupons' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs">
              <h3 className="text-sm font-bold text-stone-900 mb-3">
                {isBn ? 'নতুন কুপন কোড তৈরি করুন' : 'Create New Promo Coupon'}
              </h3>
              <form onSubmit={handleCreateCoupon} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-xs text-stone-600 block mb-1">Coupon Code</label>
                  <input
                    type="text"
                    required
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                    placeholder="e.g. GREEN20"
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 uppercase font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs text-stone-600 block mb-1">Discount %</label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="50"
                    value={newCouponDiscount}
                    onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200"
                  />
                </div>
                <div>
                  <label className="text-xs text-stone-600 block mb-1">Min Spend (৳)</label>
                  <input
                    type="number"
                    required
                    min="100"
                    value={newCouponMin}
                    onChange={(e) => setNewCouponMin(Number(e.target.value))}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-[#1b4332] hover:bg-[#2d6a4f] text-white py-2.5 rounded-xl text-xs font-semibold"
                  >
                    Add Coupon
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs">
              <h3 className="text-sm font-bold text-stone-900 mb-3">Active Coupons</h3>
              <div className="space-y-2">
                {coupons.map((c) => (
                  <div
                    key={c.code}
                    className="flex items-center justify-between p-3 rounded-xl border border-stone-200 bg-stone-50"
                  >
                    <div>
                      <span className="font-mono font-bold text-[#1b4332] text-sm block">
                        {c.code}
                      </span>
                      <span className="text-xs text-stone-600">{c.description}</span>
                    </div>
                    <button
                      onClick={() => deleteCoupon(c.code)}
                      className="text-stone-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 7: Banners */}
        {activeTab === 'banners' && (
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-stone-900">
              {isBn ? 'টপ অ্যানাউন্সমেন্ট ব্যানার ম্যানেজমেন্ট' : 'Top Notification Banner'}
            </h3>
            <div className="space-y-2">
              <label className="text-xs text-stone-600 block">Banner Text (HTML / Text)</label>
              <input
                type="text"
                value={bannerText}
                onChange={(e) => setBannerText(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-[#faf9f5]"
              />
            </div>
            <button
              onClick={() => {
                setBannerSaved(true);
                setTimeout(() => setBannerSaved(false), 2000);
                showToast('Banner text saved', 'ব্যানার টেক্সট সংরক্ষণ হয়েছে', 'success');
              }}
              className="bg-[#1b4332] hover:bg-[#2d6a4f] text-white px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5"
            >
              {bannerSaved ? <Check className="w-4 h-4" /> : null}
              <span>{bannerSaved ? 'Saved' : 'Save Banner'}</span>
            </button>
          </div>
        )}

        {/* Tab 8: Site Settings */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs space-y-6">
            <h3 className="text-sm font-bold text-stone-900">
              {isBn ? 'স্টোর সেটিংস ও ডেলিভারি রেট' : 'Store Shipping & Merchant Settings'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700 block">
                  Inside Dhaka Delivery Fee (৳)
                </label>
                <input
                  type="number"
                  value={dhakaFee}
                  onChange={(e) => setDhakaFee(Number(e.target.value))}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700 block">
                  Outside Dhaka Delivery Fee (৳)
                </label>
                <input
                  type="number"
                  value={outsideDhakaFee}
                  onChange={(e) => setOutsideDhakaFee(Number(e.target.value))}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700 block">
                  bKash Merchant / Personal Account
                </label>
                <input
                  type="text"
                  value={bkashMerchant}
                  onChange={(e) => setBkashMerchant(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700 block">
                  WhatsApp Support Phone
                </label>
                <input
                  type="text"
                  value={supportPhone}
                  onChange={(e) => setSupportPhone(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                />
              </div>
            </div>

            <button
              onClick={() => {
                setSettingsSaved(true);
                setTimeout(() => setSettingsSaved(false), 2000);
                showToast('Settings saved successfully', 'স্টোর সেটিংস আপডেট হয়েছে', 'success');
              }}
              className="bg-[#1b4332] hover:bg-[#2d6a4f] text-white px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5"
            >
              {settingsSaved ? <Check className="w-4 h-4" /> : null}
              <span>{settingsSaved ? 'Saved' : 'Save Settings'}</span>
            </button>
          </div>
        )}

        {/* Modal: Add New Plant Product */}
        {isAddProductOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-xl border border-stone-200 space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-bold text-stone-900 text-sm">Add New Plant to Storefront</h3>
                <button
                  onClick={() => setIsAddProductOpen(false)}
                  className="text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold block mb-1">Plant Name (English) *</label>
                  <input
                    type="text"
                    required
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    placeholder="e.g. Zebra Haworthia"
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Plant Name (Bangla) *</label>
                  <input
                    type="text"
                    required
                    value={newProdNameBn}
                    onChange={(e) => setNewProdNameBn(e.target.value)}
                    placeholder="যেমন: জেব্রা হাওরথিয়া"
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold block mb-1">Price (৳) *</label>
                    <input
                      type="number"
                      required
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(Number(e.target.value))}
                      className="w-full p-2.5 border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">Initial Stock *</label>
                    <input
                      type="number"
                      required
                      value={newProdStock}
                      onChange={(e) => setNewProdStock(Number(e.target.value))}
                      className="w-full p-2.5 border rounded-xl"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold block mb-1">Category *</label>
                    <select
                      value={newProdCat}
                      onChange={(e) => setNewProdCat(e.target.value as any)}
                      className="w-full p-2.5 border rounded-xl"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">Light Requirement</label>
                    <select
                      value={newProdLight}
                      onChange={(e) => setNewProdLight(e.target.value as any)}
                      className="w-full p-2.5 border rounded-xl"
                    >
                      <option value="Low Light">Low Light</option>
                      <option value="Bright Indirect">Bright Indirect</option>
                      <option value="Direct Sunlight">Direct Sunlight</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3 border-t flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddProductOpen(false)}
                    className="px-4 py-2 border rounded-xl text-stone-600 hover:bg-stone-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#1b4332] text-white rounded-xl font-semibold"
                  >
                    Create Plant
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
