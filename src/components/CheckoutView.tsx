import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  ShieldCheck,
  Truck,
  Copy,
  Check,
  ArrowRight,
  ShoppingBag,
  CreditCard,
  Building,
  CheckCircle2,
} from 'lucide-react';
import { Order } from '../types';

const BD_DISTRICTS = [
  'Dhaka',
  'Chattogram',
  'Sylhet',
  'Rajshahi',
  'Khulna',
  'Barishal',
  'Rangpur',
  'Mymensingh',
  'Cumilla',
  'Gazipur',
  'Narayanganj',
  'Bogura',
  'Cox’s Bazar',
  'Jashore',
  'Feni',
  'Noakhali',
  'Tangail',
  'Pabna',
  'Kushtia',
  'Faridpur',
];

export const CheckoutView: React.FC = () => {
  const {
    language,
    cart,
    cartSubtotal,
    couponDiscount,
    appliedCoupon,
    placeOrder,
    setPage,
  } = useShop();

  const isBn = language === 'bn';

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Dhaka');
  const [area, setArea] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [deliveryZone, setDeliveryZone] = useState<'inside_dhaka' | 'outside_dhaka'>('inside_dhaka');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad'>('cod');
  const [trxId, setTrxId] = useState('');

  // UI State
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Sync delivery zone if district is changed
  const handleDistrictChange = (d: string) => {
    setDistrict(d);
    if (d === 'Dhaka') {
      setDeliveryZone('inside_dhaka');
    } else {
      setDeliveryZone('outside_dhaka');
    }
  };

  const deliveryCharge = deliveryZone === 'inside_dhaka' ? 60 : 120;
  const orderTotal = Math.max(0, cartSubtotal + deliveryCharge - couponDiscount);

  // Bangladeshi Phone Validation
  const validateBangladeshiPhone = (input: string) => {
    const cleaned = input.replace(/[\s-]/g, '');
    return /^01[3-9]\d{8}$/.test(cleaned);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = isBn ? 'আপনার পূর্ণ নাম আবশ্যক।' : 'Full name is required.';
    }

    if (!phone.trim()) {
      newErrors.phone = isBn ? 'ফোন নম্বর আবশ্যক।' : 'Phone number is required.';
    } else if (!validateBangladeshiPhone(phone)) {
      newErrors.phone = isBn
        ? 'সঠিক বাংলাদেশী ফোন নম্বর দিন (যেমন: 01712345678)।'
        : 'Enter a valid 11-digit Bangladeshi phone (e.g. 01712345678).';
    }

    if (!area.trim()) {
      newErrors.area = isBn ? 'থানা বা এলাকা উল্লেখ করুন।' : 'Area or Thana is required.';
    }

    if (!address.trim()) {
      newErrors.address = isBn ? 'বিস্তারিত ঠিকানা আবশ্যক।' : 'Detailed address is required.';
    }

    if ((paymentMethod === 'bkash' || paymentMethod === 'nagad') && !trxId.trim()) {
      newErrors.trxId = isBn
        ? 'লেনদেনের ট্রানজেকশন আইডি (TrxID) লিখুন।'
        : 'Please enter the transaction ID (TrxID).';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate swift processing
    setTimeout(() => {
      const order = placeOrder(
        {
          name: name.trim(),
          phone: phone.trim(),
          district,
          area: area.trim(),
          address: address.trim(),
          notes: notes.trim() || undefined,
        },
        deliveryZone,
        paymentMethod,
        trxId.trim()
      );
      setIsSubmitting(false);
      setConfirmedOrder(order);
    }, 900);
  };

  // If order is confirmed, show celebratory receipt view
  if (confirmedOrder) {
    return (
      <div className="py-12 sm:py-16 bg-[#faf9f5]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#2d6a4f]/15 shadow-sm text-center">
            <div className="w-16 h-16 rounded-full bg-[#d8f3dc] text-[#1b4332] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-[#2d6a4f]" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-[#40916c] block">
              {isBn ? 'অর্ডার সফলভাবে গৃহীত হয়েছে!' : 'Order Placed Successfully!'}
            </span>

            <h1 className="text-2xl sm:text-3xl font-bold text-[#1b4332] mt-1 mb-2">
              {isBn ? 'ধন্যবাদ, আপনার ডেস্কে আসছে সবুজ শান্তি' : 'Thank You For Greening Your Desk!'}
            </h1>

            <div className="inline-block bg-[#faf9f5] border border-stone-200 px-4 py-2 rounded-xl my-4">
              <span className="text-xs text-stone-500 block">
                {isBn ? 'আপনার অর্ডার নম্বর:' : 'Your Order Number:'}
              </span>
              <span className="text-lg font-bold text-[#1b4332] font-mono tracking-wider tabular-nums">
                {confirmedOrder.orderNumber}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto mb-6">
              {isBn
                ? `আমাদের টিম শীঘ্রই আপনার নম্বরে (${confirmedOrder.customer.phone}) যোগাযোগ করে ডেলিভারি নিশ্চিত করবে।`
                : `Our nursery dispatch team will verify and prepare your plants. You can track live progress anytime using this order number.`}
            </p>

            {/* Receipt Summary Box */}
            <div className="bg-[#faf9f5] rounded-2xl p-4 text-left border border-stone-200 text-xs text-stone-700 space-y-2 mb-6">
              <div className="flex justify-between border-b border-stone-200 pb-2 font-semibold text-stone-800">
                <span>{isBn ? 'গ্রাহকের নাম' : 'Customer'}</span>
                <span>{confirmedOrder.customer.name}</span>
              </div>
              <div className="flex justify-between">
                <span>{isBn ? 'ডেলিভারি ঠিকানা' : 'Address'}</span>
                <span className="text-right">
                  {confirmedOrder.customer.address}, {confirmedOrder.customer.area},{' '}
                  {confirmedOrder.customer.district}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{isBn ? 'পেমেন্ট মেথড' : 'Payment Method'}</span>
                <span className="font-semibold uppercase text-[#2d6a4f]">
                  {confirmedOrder.paymentMethod === 'cod'
                    ? 'Cash on Delivery'
                    : confirmedOrder.paymentMethod}
                  {confirmedOrder.trxId ? ` (TrxID: ${confirmedOrder.trxId})` : ''}
                </span>
              </div>
              <div className="flex justify-between border-t border-stone-200 pt-2 font-bold text-sm text-[#1b4332]">
                <span>{isBn ? 'সর্বমোট প্রদেয়' : 'Total Amount'}</span>
                <span className="tabular-nums">৳{confirmedOrder.total}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setPage('tracking')}
                className="bg-[#1b4332] hover:bg-[#2d6a4f] text-white px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>{isBn ? 'অর্ডার ট্র্যাক করুন' : 'Track Order Status'}</span>
                <ArrowRight className="w-4 h-4 text-[#74c69d]" />
              </button>

              <button
                onClick={() => setPage('shop')}
                className="bg-stone-100 hover:bg-stone-200 text-stone-800 px-6 py-3 rounded-xl font-medium text-xs sm:text-sm transition-colors"
              >
                {isBn ? 'আরও শপিং করুন' : 'Continue Shopping'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty, ask user to select plants
  if (cart.length === 0) {
    return (
      <div className="py-16 bg-[#faf9f5] text-center max-w-xl mx-auto px-4">
        <div className="w-16 h-16 rounded-full bg-[#d8f3dc] flex items-center justify-center text-[#2d6a4f] mx-auto mb-4">
          <ShoppingBag className="w-8 h-8 opacity-60" />
        </div>
        <h2 className="text-xl font-bold text-[#1b4332]">
          {isBn ? 'চেকআউট করার জন্য আপনার কার্ট খালি' : 'Your cart is empty for checkout'}
        </h2>
        <p className="text-xs text-stone-500 mt-2 mb-6">
          {isBn
            ? 'ডেস্কে সুন্দর গাছ সাজাতে শপ থেকে যেকোনো পছন্দের প্ল্যান্ট কার্টে নিন।'
            : 'Explore our desk plants, succulents, and ceramic gift sets to place an order.'}
        </p>
        <button
          onClick={() => setPage('shop')}
          className="bg-[#2d6a4f] hover:bg-[#1b4332] text-white text-xs font-semibold px-6 py-3 rounded-xl transition-all shadow-sm"
        >
          {isBn ? 'শপে যান' : 'Go to Shop'}
        </button>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 bg-[#faf9f5]">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#40916c]">
            {isBn ? 'নিরাপদ চেকআউট' : 'Secure Checkout'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1b4332] mt-1">
            {isBn ? 'অর্ডার ও ডেলিভারি বিবরণ' : 'Shipping & Payment Information'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Customer Form & Payment Method */}
          <div className="lg:col-span-7 space-y-6">
            {/* Contact Details Card */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-[#1b4332] flex items-center gap-2">
                <Building className="w-4 h-4 text-[#2d6a4f]" />
                <span>{isBn ? '১. আপনার ঠিকানা ও যোগাযোগ' : '1. Delivery & Contact Details'}</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700 block">
                    {isBn ? 'আপনার পূর্ণ নাম *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isBn ? 'যেমন: তানভীর আহমেদ' : 'e.g. Tanvir Ahmed'}
                    className={`w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border bg-[#faf9f5] focus:outline-none focus:border-[#2d6a4f] ${
                      errors.name ? 'border-rose-500' : 'border-stone-200'
                    }`}
                  />
                  {errors.name && <p className="text-[11px] text-rose-600">{errors.name}</p>}
                </div>

                {/* Phone Number */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700 block">
                    {isBn ? 'মোবাইল নম্বর (১১ ডিজিট) *' : 'Mobile Number (11 digits) *'}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    maxLength={14}
                    className={`w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border bg-[#faf9f5] focus:outline-none focus:border-[#2d6a4f] tabular-nums ${
                      errors.phone ? 'border-rose-500' : 'border-stone-200'
                    }`}
                  />
                  {errors.phone ? (
                    <p className="text-[11px] text-rose-600">{errors.phone}</p>
                  ) : (
                    <p className="text-[10px] text-stone-400">
                      {isBn ? 'ডেলিভারি রাইডার এই নম্বরে কল করবেন' : 'Rider will call this number'}
                    </p>
                  )}
                </div>
              </div>

              {/* District & Area */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700 block">
                    {isBn ? 'জেলা *' : 'District *'}
                  </label>
                  <select
                    value={district}
                    onChange={(e) => handleDistrictChange(e.target.value)}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#faf9f5] focus:outline-none focus:border-[#2d6a4f] cursor-pointer"
                  >
                    {BD_DISTRICTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700 block">
                    {isBn ? 'এলাকা / থানা *' : 'Area / Thana *'}
                  </label>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder={isBn ? 'যেমন: ধানমন্ডি, গুলশান, বা চান্দগাঁও' : 'e.g. Dhanmondi, Banani'}
                    className={`w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border bg-[#faf9f5] focus:outline-none focus:border-[#2d6a4f] ${
                      errors.area ? 'border-rose-500' : 'border-stone-200'
                    }`}
                  />
                  {errors.area && <p className="text-[11px] text-rose-600">{errors.area}</p>}
                </div>
              </div>

              {/* Detailed Street Address */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700 block">
                  {isBn ? 'পূর্ণ ঠিকানা (বাসা/ফ্ল্যাট নং, রোড নং) *' : 'Full Street Address *'}
                </label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={
                    isBn
                      ? 'বাড়ি নং ১২, রোড নং ৫, ফ্ল্যাট ৪বি...'
                      : 'House 12, Road 5, Apt 4B...'
                  }
                  className={`w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border bg-[#faf9f5] focus:outline-none focus:border-[#2d6a4f] ${
                    errors.address ? 'border-rose-500' : 'border-stone-200'
                  }`}
                />
                {errors.address && <p className="text-[11px] text-rose-600">{errors.address}</p>}
              </div>

              {/* Special Delivery Note */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700 block">
                  {isBn ? 'বিশেষ কোনো নির্দেশনা (ঐচ্ছিক)' : 'Delivery Instructions (Optional)'}
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={
                    isBn
                      ? 'যেমন: ডেলিভারির আগে কল দিবেন / অফিসে রেখে যাবেন'
                      : 'e.g. Leave at reception / Call 10 mins prior'
                  }
                  className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-stone-200 bg-[#faf9f5] focus:outline-none focus:border-[#2d6a4f]"
                />
              </div>
            </div>

            {/* Delivery Charge Selection */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200/80 shadow-xs space-y-3">
              <h2 className="text-base font-bold text-[#1b4332] flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#2d6a4f]" />
                <span>{isBn ? '২. ডেলিভারি জোন নির্বাচন' : '2. Delivery Shipping Method'}</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <label
                  onClick={() => setDeliveryZone('inside_dhaka')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                    deliveryZone === 'inside_dhaka'
                      ? 'border-[#2d6a4f] bg-[#d8f3dc]/30'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="zone"
                    checked={deliveryZone === 'inside_dhaka'}
                    onChange={() => setDeliveryZone('inside_dhaka')}
                    className="accent-[#2d6a4f] mt-0.5"
                  />
                  <div>
                    <span className="font-bold text-stone-900 block">
                      {isBn ? 'ঢাকার ভেতরে (৳৬০)' : 'Inside Dhaka (৳60)'}
                    </span>
                    <span className="text-stone-500 text-[11px] block mt-0.5">
                      {isBn ? '২৪–৪৮ ঘণ্টার মধ্যে এক্সপ্রেস ডেলিভারি' : 'Express 24-48 hours delivery'}
                    </span>
                  </div>
                </label>

                <label
                  onClick={() => setDeliveryZone('outside_dhaka')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                    deliveryZone === 'outside_dhaka'
                      ? 'border-[#2d6a4f] bg-[#d8f3dc]/30'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="zone"
                    checked={deliveryZone === 'outside_dhaka'}
                    onChange={() => setDeliveryZone('outside_dhaka')}
                    className="accent-[#2d6a4f] mt-0.5"
                  />
                  <div>
                    <span className="font-bold text-stone-900 block">
                      {isBn ? 'ঢাকার বাইরে সারা বাংলাদেশ (৳১২০)' : 'Outside Dhaka (৳120)'}
                    </span>
                    <span className="text-stone-500 text-[11px] block mt-0.5">
                      {isBn ? '২–৪ কার্যদিবস (স্টিডফাস্ট কুরিয়ার)' : '2-4 days via Steadfast courier'}
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-[#1b4332] flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#2d6a4f]" />
                <span>{isBn ? '৩. পেমেন্ট মেথড নির্বাচন' : '3. Payment Method'}</span>
              </h2>

              {/* Segmented Payment Tabs */}
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`py-3 px-3 rounded-xl border text-center transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-[#2d6a4f] bg-[#1b4332] text-white font-bold'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100 font-medium'
                  }`}
                >
                  <span className="text-xs sm:text-sm block">
                    {isBn ? 'ক্যাশ অন ডেলিভারি' : 'Cash on Delivery'}
                  </span>
                  <span className="text-[10px] opacity-80 block">(COD)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bkash')}
                  className={`py-3 px-3 rounded-xl border text-center transition-all ${
                    paymentMethod === 'bkash'
                      ? 'border-[#e2136e] bg-[#e2136e] text-white font-bold'
                      : 'border-stone-200 bg-stone-50 text-[#e2136e] hover:bg-pink-50 font-medium'
                  }`}
                >
                  <span className="text-xs sm:text-sm block font-bold">bKash (বিকাশ)</span>
                  <span className="text-[10px] opacity-80 block">
                    {isBn ? 'সেন্ড মানি / মার্চেন্ট' : 'Direct bKash'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('nagad')}
                  className={`py-3 px-3 rounded-xl border text-center transition-all ${
                    paymentMethod === 'nagad'
                      ? 'border-[#f7941d] bg-[#f7941d] text-white font-bold'
                      : 'border-stone-200 bg-stone-50 text-[#f7941d] hover:bg-amber-50 font-medium'
                  }`}
                >
                  <span className="text-xs sm:text-sm block font-bold">Nagad (নগদ)</span>
                  <span className="text-[10px] opacity-80 block">
                    {isBn ? 'সেন্ড মানি' : 'Direct Nagad'}
                  </span>
                </button>
              </div>

              {/* Payment Details Container */}
              {paymentMethod === 'cod' && (
                <div className="bg-[#faf9f5] p-4 rounded-2xl border border-stone-200 text-xs text-stone-600 space-y-1">
                  <p className="font-semibold text-[#1b4332]">
                    {isBn ? '✓ পণ্য হাতে পেয়ে টাকা পরিশোধ করুন' : '✓ Pay after inspecting the plant'}
                  </p>
                  <p>
                    {isBn
                      ? 'ডেলিভারি রাইডার আপনার ঠিকানায় পৌঁছালে গাছ দেখে ক্যাশে পরিশোধ করবেন।'
                      : 'Please keep the exact amount handy for our courier partner.'}
                  </p>
                </div>
              )}

              {paymentMethod === 'bkash' && (
                <div className="bg-pink-50/60 p-4.5 rounded-2xl border border-pink-200 text-xs text-stone-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-pink-700 font-semibold block">
                        {isBn ? 'বিকাশ মার্চেন্ট / পার্সোনাল নম্বর:' : 'bKash Account Number:'}
                      </span>
                      <span className="text-base font-bold font-mono text-pink-900 tracking-wider">
                        01712-345678
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard('01712345678')}
                      className="flex items-center gap-1 bg-white border border-pink-300 text-pink-800 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-pink-100 transition-colors"
                    >
                      {copiedNumber ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedNumber ? (isBn ? 'কপি হয়েছে' : 'Copied') : isBn ? 'কপি' : 'Copy'}</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-pink-900/80 leading-relaxed">
                    {isBn
                      ? `১. বিকাশ অ্যাপে যান এবং 01712-345678 নম্বরে ৳${orderTotal} টাকা Send Money করুন।`
                      : `1. Open bKash App and Send Money ৳${orderTotal} to 01712-345678.`}
                    <br />
                    {isBn
                      ? '২. পেমেন্ট সম্পন্ন হলে প্রাপ্ত ট্রানজেকশন আইডি (TrxID) নিচের বক্সে লিখুন।'
                      : '2. Enter the received Transaction ID (TrxID) below to verify.'}
                  </p>

                  <div className="space-y-1 pt-1">
                    <label className="text-xs font-bold text-pink-900 block">
                      {isBn ? 'bKash TrxID (ট্রানজেকশন আইডি) *' : 'bKash Transaction ID (TrxID) *'}
                    </label>
                    <input
                      type="text"
                      value={trxId}
                      onChange={(e) => setTrxId(e.target.value.toUpperCase())}
                      placeholder="e.g. 9K8J7H6G5F"
                      className={`w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border bg-white focus:outline-none focus:border-pink-600 font-mono tracking-wider ${
                        errors.trxId ? 'border-rose-500' : 'border-pink-200'
                      }`}
                    />
                    {errors.trxId && <p className="text-[11px] text-rose-600">{errors.trxId}</p>}
                  </div>
                </div>
              )}

              {paymentMethod === 'nagad' && (
                <div className="bg-amber-50/60 p-4.5 rounded-2xl border border-amber-200 text-xs text-stone-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-amber-800 font-semibold block">
                        {isBn ? 'নগদ পার্সোনাল নম্বর:' : 'Nagad Account Number:'}
                      </span>
                      <span className="text-base font-bold font-mono text-amber-950 tracking-wider">
                        01812-345678
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard('01812345678')}
                      className="flex items-center gap-1 bg-white border border-amber-300 text-amber-900 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-amber-100 transition-colors"
                    >
                      {copiedNumber ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedNumber ? (isBn ? 'কপি হয়েছে' : 'Copied') : isBn ? 'কপি' : 'Copy'}</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-amber-900/80 leading-relaxed">
                    {isBn
                      ? `১. নগদ অ্যাপ বা *167# ডায়াল করে ৳${orderTotal} টাকা Send Money করুন।`
                      : `1. Open Nagad App or dial *167# and Send Money ৳${orderTotal}.`}
                    <br />
                    {isBn
                      ? '২. পেমেন্ট এসএমএস থেকে ট্রানজেকশন আইডি (TrxID) নিচে প্রদান করুন।'
                      : '2. Enter the received Nagad Transaction ID below.'}
                  </p>

                  <div className="space-y-1 pt-1">
                    <label className="text-xs font-bold text-amber-950 block">
                      {isBn ? 'Nagad TrxID (ট্রানজেকশন আইডি) *' : 'Nagad Transaction ID (TrxID) *'}
                    </label>
                    <input
                      type="text"
                      value={trxId}
                      onChange={(e) => setTrxId(e.target.value.toUpperCase())}
                      placeholder="e.g. 7M4N2P1Q9X"
                      className={`w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border bg-white focus:outline-none focus:border-amber-600 font-mono tracking-wider ${
                        errors.trxId ? 'border-rose-500' : 'border-amber-200'
                      }`}
                    />
                    {errors.trxId && <p className="text-[11px] text-rose-600">{errors.trxId}</p>}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary & Place Button */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-[#2d6a4f]/15 shadow-sm space-y-5 sticky top-24">
            <h2 className="text-base font-bold text-[#1b4332] border-b border-stone-100 pb-3">
              {isBn ? 'অর্ডার রিভিউ ও মূল্য বিবরণী' : 'Order Summary'}
            </h2>

            {/* Cart Items List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-10 h-10 rounded-lg object-cover bg-stone-100 shrink-0"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/hero_white_desk_aloe.jpg';
                      }}
                    />
                    <div className="truncate">
                      <span className="font-semibold text-stone-800 block truncate">
                        {isBn ? item.product.nameBn : item.product.name}
                      </span>
                      <span className="text-[10px] text-stone-500 block">
                        {item.quantity} × ৳{item.product.price + item.selectedPot.extraPrice} (
                        {isBn ? item.selectedPot.nameBn : item.selectedPot.name})
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-[#1b4332] tabular-nums shrink-0">
                    ৳{(item.product.price + item.selectedPot.extraPrice) * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculation Lines */}
            <div className="space-y-2 pt-4 border-t border-stone-100 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>{isBn ? 'সাবটোটাল' : 'Subtotal'}</span>
                <span className="font-semibold text-stone-800 tabular-nums">৳{cartSubtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>
                  {isBn ? 'ডেলিভারি চার্জ' : 'Delivery Charge'} (
                  {deliveryZone === 'inside_dhaka'
                    ? isBn
                      ? 'ঢাকা'
                      : 'Dhaka'
                    : isBn
                    ? 'দেশব্যাপী'
                    : 'Nationwide'}
                  )
                </span>
                <span className="font-semibold text-stone-800 tabular-nums">৳{deliveryCharge}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-[#2d6a4f]">
                  <span>
                    {isBn ? 'কুপন ছাড়' : 'Coupon Discount'} ({appliedCoupon?.code})
                  </span>
                  <span className="font-bold tabular-nums">-৳{couponDiscount}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-[#1b4332] pt-3 border-t border-stone-200">
                <span>{isBn ? 'সর্বমোট প্রদেয়' : 'Final Total'}</span>
                <span className="tabular-nums">৳{orderTotal}</span>
              </div>
            </div>

            {/* Trust and Guarantee Notice */}
            <div className="bg-[#faf9f5] p-3 rounded-xl border border-stone-200 text-[11px] text-stone-600 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#2d6a4f] shrink-0 mt-0.5" />
              <span>
                {isBn
                  ? '১০০% সুস্থ উদ্ভিদের ট্রানজিট গ্যারান্টি। কোনো ক্ষতি হলে ছবি দিলে ২৪ ঘণ্টায় নতুন গাছ পাঠানো হবে।'
                  : '100% plant transit guarantee with fast free replacement if damaged during transport.'}
              </span>
            </div>

            {/* Place Order CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#1b4332] hover:bg-[#2d6a4f] text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>{isBn ? 'অর্ডার প্রস্তুত হচ্ছে...' : 'Processing Order...'}</span>
              ) : (
                <>
                  <span>
                    {isBn
                      ? `অর্ডার কনফার্ম করুন (৳${orderTotal})`
                      : `Confirm Order (৳${orderTotal})`}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#74c69d]" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
