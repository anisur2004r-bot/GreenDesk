import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag, Check, Sparkles } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    language,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartItemCount,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    couponDiscount,
    setPage,
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [deliveryZone, setDeliveryZone] = useState<'inside_dhaka' | 'outside_dhaka'>('inside_dhaka');

  const isBn = language === 'bn';
  const deliveryFee = cart.length > 0 ? (deliveryZone === 'inside_dhaka' ? 60 : 120) : 0;
  const finalTotal = Math.max(0, cartSubtotal + deliveryFee - couponDiscount);

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(isBn ? res.messageBn : res.message);
    } else {
      setCouponInput('');
    }
  };

  const handleCheckoutClick = () => {
    setIsCartDrawerOpen(false);
    setPage('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartDrawerOpen(false)}
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#faf9f5] shadow-2xl flex flex-col h-full border-l border-[#2d6a4f]/15 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#2d6a4f]/10 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#2d6a4f]" />
              <h2 className="text-lg font-bold text-[#1b4332]">
                {isBn ? 'আপনার শপিং ব্যাগ' : 'Your Shopping Bag'}
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#d8f3dc] text-[#1b4332] tabular-nums">
                {cartItemCount}
              </span>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
                <div className="w-16 h-16 rounded-full bg-[#d8f3dc]/60 flex items-center justify-center text-[#2d6a4f] mb-3">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="text-base font-semibold text-[#1b4332]">
                  {isBn ? 'আপনার কার্ট এখন খালি' : 'Your cart is empty'}
                </h3>
                <p className="text-xs text-stone-500 mt-1 max-w-xs">
                  {isBn
                    ? 'আপনার ডেস্কের জন্য একটি সুন্দর সাকুলেন্ট বা স্নেক প্ল্যান্ট বেছে নিন!'
                    : 'Add a mini succulent or hardy desk plant to bring green serenity to your workspace.'}
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    setPage('shop');
                  }}
                  className="mt-5 bg-[#2d6a4f] hover:bg-[#1b4332] text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm"
                >
                  {isBn ? 'গাছ দেখুন (শপ)' : 'Start Shopping'}
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemTotal = (item.product.price + item.selectedPot.extraPrice) * item.quantity;
                return (
                  <div
                    key={item.id}
                    className="flex gap-3.5 bg-white p-3.5 rounded-xl border border-stone-200/80 shadow-2xs"
                  >
                    {/* Item Thumbnail */}
                    <div className="w-18 h-18 rounded-lg bg-[#f4f1ea] overflow-hidden shrink-0">
                      <img
                        src={item.product.image}
                        alt={isBn ? item.product.nameBn : item.product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/hero_white_desk_aloe.jpg';
                        }}
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-semibold text-[#1b4332] truncate">
                            {isBn ? item.product.nameBn : item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-stone-500 truncate mt-0.5">
                          {isBn ? item.selectedPot.nameBn : item.selectedPot.name}
                          {item.selectedPot.extraPrice > 0 && ` (+৳${item.selectedPot.extraPrice})`}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-stone-600 hover:bg-stone-200 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold tabular-nums text-stone-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-stone-600 hover:bg-stone-200 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="text-sm font-bold text-[#1b4332] tabular-nums">
                            ৳{itemTotal}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 bg-white border-t border-[#2d6a4f]/10 space-y-3.5">
              {/* Delivery Zone Selector */}
              <div className="bg-[#faf9f5] p-2.5 rounded-xl border border-stone-200/80">
                <span className="text-[11px] font-semibold text-[#1b4332] block mb-1.5">
                  {isBn ? 'ডেলিভারি এলাকা নির্বাচন করুন:' : 'Delivery Location:'}
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => setDeliveryZone('inside_dhaka')}
                    className={`py-1.5 px-2 rounded-lg font-medium border transition-all text-center ${
                      deliveryZone === 'inside_dhaka'
                        ? 'bg-[#1b4332] text-white border-[#1b4332]'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    {isBn ? 'ঢাকার ভেতরে (৳৬০)' : 'Inside Dhaka (৳60)'}
                  </button>
                  <button
                    onClick={() => setDeliveryZone('outside_dhaka')}
                    className={`py-1.5 px-2 rounded-lg font-medium border transition-all text-center ${
                      deliveryZone === 'outside_dhaka'
                        ? 'bg-[#1b4332] text-white border-[#1b4332]'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    {isBn ? 'ঢাকার বাইরে (৳১২০)' : 'Outside Dhaka (৳120)'}
                  </button>
                </div>
              </div>

              {/* Coupon Code Section */}
              <div className="space-y-1">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-[#d8f3dc] px-3 py-1.5 rounded-lg text-xs text-[#1b4332]">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Tag className="w-3.5 h-3.5 text-[#2d6a4f]" />
                      <span>
                        {appliedCoupon.code} (-৳{couponDiscount})
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-stone-500 hover:text-rose-700 font-bold ml-2"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder={isBn ? 'কুপন কোড (যেমন: SOBUJ10)' : 'Coupon code (e.g. SOBUJ10)'}
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 text-xs px-3 py-2 rounded-lg border border-stone-200 bg-[#faf9f5] focus:outline-none focus:border-[#2d6a4f] uppercase tracking-wider"
                    />
                    <button
                      type="submit"
                      className="bg-[#2d6a4f] hover:bg-[#1b4332] text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                    >
                      {isBn ? 'প্রয়োগ' : 'Apply'}
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[11px] text-rose-600 mt-1">{couponError}</p>}
              </div>

              {/* Price Calculations */}
              <div className="space-y-1.5 pt-2 border-t border-stone-100 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>{isBn ? 'সাবটোটাল' : 'Subtotal'}</span>
                  <span className="font-semibold text-stone-800 tabular-nums">৳{cartSubtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>{isBn ? 'ডেলিভারি চার্জ' : 'Delivery Fee'}</span>
                  <span className="font-semibold text-stone-800 tabular-nums">৳{deliveryFee}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-[#2d6a4f]">
                    <span>{isBn ? 'কুপন ছাড়' : 'Discount'}</span>
                    <span className="font-semibold tabular-nums">-৳{couponDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-[#1b4332] pt-2 border-t border-stone-200">
                  <span>{isBn ? 'সর্বমোট' : 'Total'}</span>
                  <span className="tabular-nums">৳{finalTotal}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckoutClick}
                className="w-full bg-[#1b4332] hover:bg-[#2d6a4f] text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98"
              >
                <span>{isBn ? 'অর্ডার করতে এগিয়ে যান' : 'Proceed to Checkout'}</span>
                <ArrowRight className="w-4 h-4 text-[#74c69d]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
