import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PotVariant } from '../types';
import {
  Star,
  Heart,
  Droplets,
  Sun,
  Sprout,
  ShieldCheck,
  Check,
  Plus,
  Minus,
  ArrowLeft,
  Truck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export const ProductDetailView: React.FC = () => {
  const {
    language,
    selectedProduct,
    setPage,
    addToCart,
    isInWishlist,
    toggleWishlist,
    setIsCartDrawerOpen,
  } = useShop();

  if (!selectedProduct) {
    return (
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-16 text-center">
        <p>Product not found.</p>
        <button
          onClick={() => setPage('shop')}
          className="mt-4 bg-[#2d6a4f] text-white px-4 py-2 rounded-xl text-sm"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const isBn = language === 'bn';
  const [activeImage, setActiveImage] = useState(selectedProduct.image);
  const [selectedPot, setSelectedPot] = useState<PotVariant>(
    selectedProduct.potVariants[0] || {
      id: 'terracotta',
      name: 'Terracotta',
      nameBn: 'মাটির টব',
      color: '#c86d51',
      extraPrice: 0,
    }
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'care' | 'specs' | 'reviews'>('care');
  const [isZoomed, setIsZoomed] = useState(false);

  const wishlisted = isInWishlist(selectedProduct.id);
  const currentPrice = selectedProduct.price + selectedPot.extraPrice;
  const originalPrice = selectedProduct.originalPrice + selectedPot.extraPrice;

  const handleAddToCart = () => {
    addToCart(selectedProduct, selectedPot, quantity);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, selectedPot, quantity);
    setPage('checkout');
  };

  return (
    <div className="py-8 sm:py-12 bg-[#faf9f5]">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Back Link */}
        <button
          onClick={() => setPage('shop')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#2d6a4f] hover:text-[#1b4332] mb-6 group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>{isBn ? 'শপে ফিরে যান' : 'Back to Shop'}</span>
        </button>

        {/* Product Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image with Zoom */}
            <div
              className="relative aspect-4/3 w-full bg-[#f4f1ea] rounded-3xl overflow-hidden border border-[#2d6a4f]/10 shadow-sm cursor-zoom-in"
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={activeImage}
                alt={isBn ? selectedProduct.nameBn : selectedProduct.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/hero_white_desk_aloe.jpg';
                }}
                className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
                  isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 hover:scale-105'
                }`}
              />

              {/* Wishlist Overlay */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(selectedProduct.id);
                }}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all backdrop-blur-md ${
                  wishlisted
                    ? 'bg-[#c86d51] text-white shadow-sm'
                    : 'bg-white/85 text-stone-700 hover:bg-white hover:text-[#c86d51]'
                }`}
                aria-label="Toggle Wishlist"
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
              </button>

              <span className="absolute bottom-3 left-4 text-[11px] font-medium text-stone-700 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                {isZoomed
                  ? isBn
                    ? 'জুম আউট করতে ক্লিক করুন'
                    : 'Click to zoom out'
                  : isBn
                  ? '🔍 জুম করতে ক্লিক করুন'
                  : '🔍 Click to zoom'}
              </span>
            </div>

            {/* Thumbnail Row */}
            {selectedProduct.gallery && selectedProduct.gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {selectedProduct.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveImage(img);
                      setIsZoomed(false);
                    }}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-[#f4f1ea] ${
                      activeImage === img
                        ? 'border-[#2d6a4f] shadow-sm'
                        : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/hero_white_desk_aloe.jpg';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Plant Highlights Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-stone-200">
              <div className="bg-white p-3.5 rounded-2xl border border-stone-200/80 text-center">
                <Sun className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                <span className="text-[11px] text-stone-500 block">
                  {isBn ? 'সূর্যালোক' : 'Sunlight'}
                </span>
                <span className="text-xs font-semibold text-[#1b4332] block">
                  {isBn ? selectedProduct.lightBn : selectedProduct.light}
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-stone-200/80 text-center">
                <Droplets className="w-5 h-5 text-sky-500 mx-auto mb-1" />
                <span className="text-[11px] text-stone-500 block">
                  {isBn ? 'পানি দেওয়ার নিয়ম' : 'Watering'}
                </span>
                <span className="text-xs font-semibold text-[#1b4332] block">
                  {isBn ? selectedProduct.waterBn : selectedProduct.water}
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-stone-200/80 text-center">
                <Sprout className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                <span className="text-[11px] text-stone-500 block">
                  {isBn ? 'যত্নের মাত্রা' : 'Care Level'}
                </span>
                <span className="text-xs font-semibold text-[#1b4332] block">
                  {isBn ? selectedProduct.careLevelBn : selectedProduct.careLevel}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#2d6a4f]/15 shadow-sm space-y-6">
            {/* Category & Title */}
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#2d6a4f] mb-1.5">
                <span>{isBn ? selectedProduct.categoryBn : selectedProduct.category}</span>
                <span aria-hidden="true">·</span>
                <span className="italic font-serif text-stone-500">
                  {selectedProduct.scientificName}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-[#1b4332] leading-snug">
                {isBn ? selectedProduct.nameBn : selectedProduct.name}
              </h1>

              {/* Rating & Stock */}
              <div className="flex items-center justify-between gap-4 mt-2.5 pt-2 border-t border-stone-100">
                <div className="flex items-center gap-1.5 text-xs text-stone-600">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <span className="font-bold text-stone-800 tabular-nums">
                    {selectedProduct.rating}
                  </span>
                  <span className="text-stone-400">({selectedProduct.reviewCount} reviews)</span>
                </div>

                <div className="text-xs">
                  {selectedProduct.stock > 0 ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      {isBn ? `স্টকে আছে (${selectedProduct.stock}টি)` : `In Stock (${selectedProduct.stock})`}
                    </span>
                  ) : (
                    <span className="text-rose-600 font-semibold">
                      {isBn ? 'স্টক শেষ' : 'Out of Stock'}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Price Display */}
            <div className="bg-[#faf9f5] p-4 rounded-2xl border border-stone-200/80 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-stone-500 block mb-0.5">
                  {isBn ? 'বর্তমান মূল্য (টব সহ):' : 'Total Price (Pot Included):'}
                </span>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-3xl font-bold text-[#1b4332] tabular-nums">
                    ৳{currentPrice}
                  </span>
                  {originalPrice > currentPrice && (
                    <span className="text-sm text-stone-400 line-through tabular-nums">
                      ৳{originalPrice}
                    </span>
                  )}
                </div>
              </div>
              <span className="text-xs font-semibold text-[#2d6a4f] bg-[#d8f3dc] px-2.5 py-1 rounded-lg">
                {isBn ? '৳৬০ ঢাকায় ডেলিভারি' : '৳60 in Dhaka'}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {isBn ? selectedProduct.descriptionBn : selectedProduct.description}
            </p>

            {/* Pot Style Selector */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#1b4332] uppercase tracking-wider block">
                {isBn ? 'টবের স্টাইল নির্বাচন করুন:' : 'Select Planter Pot:'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {selectedProduct.potVariants.map((pot) => (
                  <button
                    key={pot.id}
                    onClick={() => setSelectedPot(pot)}
                    className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                      selectedPot.id === pot.id
                        ? 'border-[#2d6a4f] bg-[#d8f3dc]/30 shadow-2xs'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full shrink-0 border border-black/15 shadow-2xs"
                      style={{ backgroundColor: pot.color }}
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-semibold text-stone-800 block truncate">
                        {isBn ? pot.nameBn : pot.name}
                      </span>
                      <span className="text-[10px] text-stone-500 block">
                        {pot.extraPrice > 0 ? `+৳${pot.extraPrice}` : isBn ? 'ফ্রি' : 'Included'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-[#1b4332] uppercase tracking-wider">
                {isBn ? 'পরিমাণ:' : 'Quantity:'}
              </span>
              <div className="flex items-center border border-stone-300 rounded-xl bg-white overflow-hidden shadow-2xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-stone-600 hover:bg-stone-100 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-sm font-bold tabular-nums text-stone-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
                  className="px-3 py-2 text-stone-600 hover:bg-stone-100 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={selectedProduct.stock <= 0}
                className="w-full bg-[#d8f3dc] hover:bg-[#2d6a4f] text-[#1b4332] hover:text-white py-3.5 rounded-xl font-semibold text-xs sm:text-sm transition-all shadow-2xs active:scale-98 disabled:opacity-50"
              >
                {isBn ? 'কার্টে যোগ করুন' : 'Add to Cart'}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={selectedProduct.stock <= 0}
                className="w-full bg-[#1b4332] hover:bg-[#2d6a4f] text-white py-3.5 rounded-xl font-semibold text-xs sm:text-sm transition-all shadow-sm active:scale-98 disabled:opacity-50"
              >
                {isBn ? 'এখনই কিনুন' : 'Buy Now'}
              </button>
            </div>

            {/* Security and Assurance Strip */}
            <div className="pt-4 border-t border-stone-100 space-y-2 text-xs text-stone-500">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#2d6a4f] shrink-0" />
                <span>
                  {isBn
                    ? 'ঢাকায় ২৪–৪৮ ঘণ্টা | সারা বাংলাদেশে ২–৪ দিন'
                    : '24-48h Dhaka delivery | 2-4 days Nationwide'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2d6a4f] shrink-0" />
                <span>
                  {isBn
                    ? '১০০% ট্রানজিট রিপ্লেসমেন্ট গ্যারান্টি (২৪ ঘণ্টার মধ্যে)'
                    : '100% Transit Safe Guarantee with free replacement'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#2d6a4f] shrink-0" />
                <span>
                  {isBn
                    ? 'ক্যাশ অন ডেলিভারি, বিকাশ ও নগদ সাপোর্টেড'
                    : 'Cash on Delivery, bKash & Nagad accepted'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Care Information, Specifications, Dimensions */}
        <div className="mt-12 bg-white rounded-3xl border border-[#2d6a4f]/10 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
            <button
              onClick={() => setActiveTab('care')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === 'care'
                  ? 'bg-[#1b4332] text-white'
                  : 'text-stone-600 hover:text-[#1b4332] hover:bg-stone-100'
              }`}
            >
              {isBn ? 'যত্ন ও নির্দেশিকা' : 'Care & Maintenance'}
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === 'specs'
                  ? 'bg-[#1b4332] text-white'
                  : 'text-stone-600 hover:text-[#1b4332] hover:bg-stone-100'
              }`}
            >
              {isBn ? 'সাইজ ও বৈশিষ্ট্য' : 'Specifications'}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === 'reviews'
                  ? 'bg-[#1b4332] text-white'
                  : 'text-stone-600 hover:text-[#1b4332] hover:bg-stone-100'
              }`}
            >
              {isBn ? 'গ্রাহকদের রিভিউ' : 'Verified Reviews'}
            </button>
          </div>

          <div className="pt-6">
            {activeTab === 'care' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-[#1b4332]">
                    {isBn ? '💧 পানি দেওয়ার নিয়ম:' : '💧 Watering Instructions:'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed bg-[#faf9f5] p-4 rounded-2xl border border-stone-200">
                    {isBn ? selectedProduct.careTipsBn.water : selectedProduct.careTips.water}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-[#1b4332]">
                    {isBn ? '☀️ আলোর সঠিক মাত্রা:' : '☀️ Optimal Sunlight:'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed bg-[#faf9f5] p-4 rounded-2xl border border-stone-200">
                    {isBn ? selectedProduct.careTipsBn.light : selectedProduct.careTips.light}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-[#1b4332]">
                    {isBn ? '🌱 পটিং মিক্স ও মাটি:' : '🌱 Potting Soil Mix:'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed bg-[#faf9f5] p-4 rounded-2xl border border-stone-200">
                    {isBn ? selectedProduct.careTipsBn.soil : selectedProduct.careTips.soil}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-[#1b4332]">
                    {isBn ? '🍃 সার ও পুষ্টি:' : '🍃 Fertilizer & Feeding:'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed bg-[#faf9f5] p-4 rounded-2xl border border-stone-200">
                    {isBn
                      ? selectedProduct.careTipsBn.fertilizer
                      : selectedProduct.careTips.fertilizer}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-[#faf9f5] border border-stone-200">
                  <span className="text-stone-400 block text-xs mb-1">
                    {isBn ? 'পরিমাপ ও সাইজ:' : 'Dimensions:'}
                  </span>
                  <span className="font-semibold text-stone-800">
                    {isBn ? selectedProduct.dimensionsBn : selectedProduct.dimensions}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-[#faf9f5] border border-stone-200">
                  <span className="text-stone-400 block text-xs mb-1">
                    {isBn ? 'বায়ু বিশুদ্ধকরণ:' : 'Air Purification:'}
                  </span>
                  <span className="font-semibold text-stone-800">
                    {selectedProduct.isAirPurifying
                      ? isBn
                        ? 'হ্যাঁ, নাসা সার্টিফাইড বায়ু ফিল্টার করে'
                        : 'Yes, NASA-certified natural air filter'
                      : isBn
                      ? 'আলংকারিক জাত'
                      : 'Decorative indoor variety'}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-[#faf9f5] border border-stone-200">
                  <span className="text-stone-400 block text-xs mb-1">
                    {isBn ? 'পোষা প্রাণীদের জন্য নিরাপদ:' : 'Pet Friendly:'}
                  </span>
                  <span className="font-semibold text-stone-800">
                    {selectedProduct.isPetFriendly
                      ? isBn
                        ? 'হ্যাঁ, কুকুর ও বিড়ালের জন্য ১০০% নিরাপদ'
                        : 'Yes, non-toxic to cats and dogs'
                      : isBn
                      ? 'ডেস্কে নাগালের বাইরে রাখুন'
                      : 'Keep on high desk out of reach'}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-[#faf9f5] border border-stone-200">
                  <span className="text-stone-400 block text-xs mb-1">
                    {isBn ? 'উৎপত্তি:' : 'Origin & Nursery:'}
                  </span>
                  <span className="font-semibold text-stone-800">
                    {isBn
                      ? 'সাভার বোটানিক্যাল নার্সারি, বাংলাদেশ'
                      : 'Patabahar Botanical Nursery, Savar, BD'}
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#faf9f5] border border-stone-200 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2d6a4f] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    R
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs sm:text-sm text-stone-900">
                        Rafiul Islam
                      </span>
                      <div className="flex text-amber-500 text-xs">★★★★★</div>
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">Verified Buyer · Dhaka</p>
                    <p className="text-xs sm:text-sm text-stone-700 mt-2">
                      {isBn
                        ? 'গাছটির পাতাগুলো একদম তরতাজা ছিল এবং মাটির টবের ফিনিশিং প্রিমিয়াম। ডেস্কে রাখার পর ঘরের লুকটাই বদলে গেছে।'
                        : 'The plant leaves were super crisp and healthy. Terracotta pot adds an authentic earthy look to my minimalist desk.'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
