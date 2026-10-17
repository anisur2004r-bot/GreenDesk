import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Order } from '../types';
import {
  Truck,
  CheckCircle2,
  Clock,
  Package,
  Search,
  Check,
  MapPin,
  Phone,
  Calendar,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export const OrderTrackingView: React.FC = () => {
  const { language, orders, getOrder, setPage } = useShop();
  const isBn = language === 'bn';

  const [orderNumberInput, setOrderNumberInput] = useState('PB-2026-8942');
  const [phoneInput, setPhoneInput] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(() => {
    return orders.find((o) => o.orderNumber === 'PB-2026-8942') || orders[0] || null;
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!orderNumberInput.trim()) {
      setErrorMessage(
        isBn ? 'অনুগ্রহ করে অর্ডার নম্বর লিখুন।' : 'Please enter your order number.'
      );
      return;
    }

    const found = getOrder(orderNumberInput.trim(), phoneInput.trim() || undefined);
    if (!found) {
      setErrorMessage(
        isBn
          ? 'এই নম্বরে কোনো অর্ডার খুঁজে পাওয়া যায়নি। অর্ডার নম্বর সঠিক কি না যাচাই করুন।'
          : 'No order found with this number. Please verify your order ID.'
      );
      setSearchedOrder(null);
    } else {
      setSearchedOrder(found);
    }
  };

  const handleQuickDemo = (num: string) => {
    setOrderNumberInput(num);
    const found = getOrder(num);
    if (found) {
      setSearchedOrder(found);
      setErrorMessage('');
    }
  };

  return (
    <div className="py-8 sm:py-12 bg-[#faf9f5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#d8f3dc] text-[#1b4332] flex items-center justify-center mx-auto mb-3">
            <Truck className="w-6 h-6 text-[#2d6a4f]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1b4332]">
            {isBn ? 'লাইভ অর্ডার ট্র্যাকিং' : 'Track Your Desk Plants'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1.5">
            {isBn
              ? 'অর্ডারের বর্তমান অবস্থা ও ডেলিভারি অগ্রগতি সরাসরি পর্যবেক্ষণ করুন'
              : 'Enter your order ID to see real-time nursery packaging and delivery status.'}
          </p>
        </div>

        {/* Tracking Search Card */}
        <div className="bg-white p-5 sm:p-7 rounded-3xl border border-stone-200/80 shadow-xs mb-8">
          <form onSubmit={handleTrackSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
              <div className="sm:col-span-6 space-y-1">
                <label className="text-xs font-semibold text-stone-700 block">
                  {isBn ? 'অর্ডার নম্বর *' : 'Order ID *'}
                </label>
                <input
                  type="text"
                  value={orderNumberInput}
                  onChange={(e) => setOrderNumberInput(e.target.value.toUpperCase())}
                  placeholder="PB-2026-XXXX"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#faf9f5] focus:outline-none focus:border-[#2d6a4f] font-mono uppercase"
                />
              </div>

              <div className="sm:col-span-4 space-y-1">
                <label className="text-xs font-semibold text-stone-700 block">
                  {isBn ? 'ফোন নম্বর (ঐচ্ছিক)' : 'Phone Number (Optional)'}
                </label>
                <input
                  type="tel"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#faf9f5] focus:outline-none focus:border-[#2d6a4f]"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-[#1b4332] hover:bg-[#2d6a4f] text-white py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <Search className="w-4 h-4 text-[#74c69d]" />
                  <span>{isBn ? 'ট্র্যাক' : 'Track'}</span>
                </button>
              </div>
            </div>

            {/* Quick Demo Pre-fill Links */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-stone-500">
              <span className="font-medium text-stone-600">
                {isBn ? 'নমুনা অর্ডার পরীক্ষা করুন:' : 'Test with sample orders:'}
              </span>
              <button
                type="button"
                onClick={() => handleQuickDemo('PB-2026-8942')}
                className="bg-[#faf9f5] border border-stone-300 hover:border-[#2d6a4f] text-[#1b4332] px-2.5 py-1 rounded-lg font-mono text-[11px] font-semibold"
              >
                PB-2026-8942 (Shipped)
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('PB-2026-7731')}
                className="bg-[#faf9f5] border border-stone-300 hover:border-[#2d6a4f] text-[#1b4332] px-2.5 py-1 rounded-lg font-mono text-[11px] font-semibold"
              >
                PB-2026-7731 (Delivered)
              </button>
            </div>

            {errorMessage && (
              <div className="flex items-center gap-2 text-xs text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </form>
        </div>

        {/* Tracking Details Display */}
        {searchedOrder && (
          <div className="space-y-6">
            {/* Status Summary Banner */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#2d6a4f]/15 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-stone-500">
                      {isBn ? 'অর্ডার নং:' : 'Order ID:'}
                    </span>
                    <span className="font-mono font-bold text-base text-[#1b4332]">
                      {searchedOrder.orderNumber}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{searchedOrder.createdAt}</span>
                    <span>·</span>
                    <span className="capitalize font-medium text-[#2d6a4f]">
                      {searchedOrder.paymentMethod.toUpperCase()} (৳{searchedOrder.total})
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d8f3dc] text-[#1b4332] text-xs font-bold self-start sm:self-auto">
                  <span className="w-2 h-2 rounded-full bg-[#2d6a4f] animate-pulse" />
                  <span>
                    {isBn
                      ? searchedOrder.status === 'Pending'
                        ? 'অপেক্ষমান (Pending)'
                        : searchedOrder.status === 'Confirmed'
                        ? 'কনফার্মড (Confirmed)'
                        : searchedOrder.status === 'Packed'
                        ? 'প্যাক করা হয়েছে (Packed)'
                        : searchedOrder.status === 'Shipped'
                        ? 'পথে রয়েছে (In Transit / Shipped)'
                        : 'ডেলিভারি সম্পন্ন (Delivered)'
                      : `Status: ${searchedOrder.status}`}
                  </span>
                </div>
              </div>

              {/* 5-Step Visual Timeline */}
              <div className="mt-8">
                <div className="relative">
                  {/* Step Nodes */}
                  <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-5 before:w-0.5 before:bg-stone-200 before:z-0">
                    {searchedOrder.statusTimeline.map((step, idx) => (
                      <div key={idx} className="relative z-10 flex items-start gap-4">
                        {/* Node Marker */}
                        <div
                          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                            step.completed
                              ? 'bg-[#1b4332] border-[#2d6a4f] text-white shadow-2xs'
                              : step.current
                              ? 'bg-[#74c69d] border-[#1b4332] text-[#1b4332] shadow-sm'
                              : 'bg-white border-stone-300 text-stone-400'
                          }`}
                        >
                          {step.completed ? (
                            <Check className="w-4 h-4 stroke-[3]" />
                          ) : (
                            <span className="text-xs font-bold tabular-nums">{idx + 1}</span>
                          )}
                        </div>

                        {/* Text Description */}
                        <div className="flex-1 pt-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <h4
                              className={`text-sm font-bold ${
                                step.completed || step.current
                                  ? 'text-[#1b4332]'
                                  : 'text-stone-400'
                              }`}
                            >
                              {isBn ? step.titleBn : step.title}
                            </h4>
                            <span className="text-[11px] font-medium text-stone-500 tabular-nums">
                              {step.time}
                            </span>
                          </div>

                          <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                            {isBn ? step.descriptionBn : step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Delivery Address & Customer Snapshot */}
              <div className="mt-8 pt-6 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-600">
                <div className="bg-[#faf9f5] p-4 rounded-2xl border border-stone-200">
                  <span className="font-semibold text-stone-800 flex items-center gap-1.5 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#2d6a4f]" />
                    <span>{isBn ? 'ডেলিভারি গন্তব্য' : 'Destination Address'}</span>
                  </span>
                  <p className="text-stone-700">
                    {searchedOrder.customer.name}
                    <br />
                    {searchedOrder.customer.address}, {searchedOrder.customer.area},{' '}
                    {searchedOrder.customer.district}
                  </p>
                </div>

                <div className="bg-[#faf9f5] p-4 rounded-2xl border border-stone-200">
                  <span className="font-semibold text-stone-800 flex items-center gap-1.5 mb-1">
                    <Package className="w-3.5 h-3.5 text-[#2d6a4f]" />
                    <span>{isBn ? 'অর্ডারের গাছসমূহ' : 'Ordered Plant Items'}</span>
                  </span>
                  <ul className="space-y-1 text-stone-700">
                    {searchedOrder.items.map((it) => (
                      <li key={it.id} className="truncate">
                        • {it.quantity}× {isBn ? it.product.nameBn : it.product.name} (
                        {isBn ? it.selectedPot.nameBn : it.selectedPot.name})
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
