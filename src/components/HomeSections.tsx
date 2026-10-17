import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { REVIEWS } from '../data/products';
import {
  MessageCircle,
  ShieldCheck,
  Truck,
  Leaf,
  HeartHandshake,
  Star,
  Quote,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const HomeSections: React.FC = () => {
  const { language, products, setPage, setActiveCategory } = useShop();
  const isBn = language === 'bn';

  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <>
      {/* 1. Best Sellers Collection */}
      <section className="py-12 sm:py-16 bg-[#faf9f5]">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#40916c] block mb-1">
                {isBn ? 'জনপ্রিয় সেরা নির্বাচন' : 'Most Loved By Desk Workers'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1b4332]">
                {isBn ? 'বেস্ট সেলিং ডেস্ক প্ল্যান্টস' : 'Best Sellers'}
              </h2>
            </div>
            <button
              onClick={() => {
                setActiveCategory('All');
                setPage('shop');
              }}
              className="text-xs sm:text-sm font-semibold text-[#2d6a4f] hover:text-[#1b4332] flex items-center gap-1 group self-start sm:self-auto"
            >
              <span>{isBn ? 'সকল গাছ দেখুন' : 'Explore All Collection'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#40916c]" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 2. Why Choose Patabahar (Feature Story) */}
      <section className="py-12 sm:py-16 bg-white border-y border-[#2d6a4f]/10">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#40916c] block mb-1">
              {isBn ? 'কেন আমরা আলাদা' : 'Our Quality Promise'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1b4332]">
              {isBn ? 'পাটাবাহারের প্রতিটি গাছ কেন বিশেষ?' : 'Why Choose Patabahar Desk Plants?'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2">
              {isBn
                ? 'আমরা শুধু গাছ বিক্রি করি না, আপনার কাজের টেবিলে একটি জীবন্ত স্নিগ্ধ পরিবেশ নিশ্চিত করি।'
                : 'Every plant is nurtured in our Savar nursery, potted in balanced organic media, and safely delivered to your desk.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#faf9f5] p-6 rounded-2xl border border-stone-200/80 text-left">
              <div className="w-10 h-10 rounded-xl bg-[#d8f3dc] text-[#1b4332] flex items-center justify-center mb-4">
                <Leaf className="w-5 h-5 text-[#2d6a4f]" />
              </div>
              <h3 className="text-base font-bold text-[#1b4332] mb-1.5">
                {isBn ? 'প্রি-ফার্টিলাইজড ও রেডি' : 'Pre-Potted & Fertilized'}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {isBn
                  ? 'উন্নত পার্লাইট ও ভার্মিকম্পোস্ট সমৃদ্ধ মাটি দিয়ে রেডি করা। ১ বছর পর্যন্ত রি-পটিং বা বাড়তি সারের প্রয়োজন নেই।'
                  : 'Planted with porous perlite and rich vermicompost. No repotting needed for at least 12 months.'}
              </p>
            </div>

            <div className="bg-[#faf9f5] p-6 rounded-2xl border border-stone-200/80 text-left">
              <div className="w-10 h-10 rounded-xl bg-[#d8f3dc] text-[#1b4332] flex items-center justify-center mb-4">
                <Truck className="w-5 h-5 text-[#2d6a4f]" />
              </div>
              <h3 className="text-base font-bold text-[#1b4332] mb-1.5">
                {isBn ? 'ঢাকায় মাত্র ২৪-৪৮ ঘণ্টায়' : 'Fast Dhaka Delivery'}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {isBn
                  ? 'ঢাকা শহরের যেকোনো প্রান্তে মাত্র ৳৬০ টাকায় এক্সপ্রেস ডেলিভারি। স্টিডফাস্ট কুরিয়ারে দেশব্যাপী ডেলিভারি ৳১২০।'
                  : 'Express delivery in Dhaka for only ৳60. Reliable nationwide doorstep delivery for ৳120.'}
              </p>
            </div>

            <div className="bg-[#faf9f5] p-6 rounded-2xl border border-stone-200/80 text-left">
              <div className="w-10 h-10 rounded-xl bg-[#d8f3dc] text-[#1b4332] flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5 text-[#2d6a4f]" />
              </div>
              <h3 className="text-base font-bold text-[#1b4332] mb-1.5">
                {isBn ? '১০০% ট্রানজিট গ্যারান্টি' : '100% Transit Guarantee'}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {isBn
                  ? 'কুরিয়ারে গাছ কোনোভাবে নষ্ট বা ক্ষতিগ্রস্ত হলে ২৪ ঘণ্টার মধ্যে সম্পূর্ণ ফ্রিতে নতুন গাছ রিপ্লেস করে দেওয়া হয়।'
                  : 'If a plant arrives damaged or stressed during shipping, we dispatch an immediate free replacement.'}
              </p>
            </div>

            <div className="bg-[#faf9f5] p-6 rounded-2xl border border-stone-200/80 text-left">
              <div className="w-10 h-10 rounded-xl bg-[#d8f3dc] text-[#1b4332] flex items-center justify-center mb-4">
                <HeartHandshake className="w-5 h-5 text-[#2d6a4f]" />
              </div>
              <h3 className="text-base font-bold text-[#1b4332] mb-1.5">
                {isBn ? 'আজীবন কেয়ার সাপোর্ট' : 'Lifetime Care Support'}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {isBn
                  ? 'গাছের যেকোনো সমস্যায় আমাদের হোয়াটসঅ্যাপে ছবি পাঠালে উদ্ভিদবিদরা সরাসরি সমাধান দেবেন।'
                  : 'Message us anytime on WhatsApp with a plant photo for personalized care troubleshooting.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Customer Reviews Section */}
      <section className="py-12 sm:py-16 bg-[#faf9f5]">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#40916c] block mb-1">
              {isBn ? 'গ্রাহকদের অভিজ্ঞতা' : 'Real Customer Experiences'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1b4332]">
              {isBn ? 'কাজের ডেস্কে সবুজ ভালোবাসা' : 'Loved by 2,400+ Desks'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed mb-4 italic">
                    "{isBn ? rev.commentBn : rev.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100">
                  <span className="text-xs font-bold text-[#1b4332] block">
                    {isBn ? rev.nameBn : rev.name}
                  </span>
                  <span className="text-[11px] text-stone-500 block">
                    {isBn ? rev.roleBn : rev.role}
                  </span>
                  <span className="text-[10px] text-[#40916c] font-medium block mt-1">
                    ✓ {rev.plant}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WhatsApp & Facebook Consultation Section */}
      <section className="py-12 bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] text-white">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-[#74c69d]">
                {isBn ? 'সরাসরি পরামর্শ ও অর্ডার' : 'Direct Order & Advice'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold">
                {isBn
                  ? 'ডেস্কের জন্য গাছ বাছাই করতে সাহায্য দরকার?'
                  : 'Need Guidance Choosing the Right Desk Plant?'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-200 max-w-xl">
                {isBn
                  ? 'আপনার টেবিলের আলোর ধরন বা এসির ছবি আমাদের হোয়াটসঅ্যাপ বা ফেসবুকে মেসেজ দিন। আমাদের বোটানিস্ট আপনাকে পরামর্শ দেবেন।'
                  : 'Message us a photo of your desk or lighting setup on WhatsApp or Facebook for free plant recommendations.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://wa.me/8801712345678"
                target="_blank"
                rel="noreferrer"
                className="bg-[#25d366] hover:bg-[#20ba5a] text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{isBn ? 'হোয়াটসঅ্যাপে অর্ডার করুন' : 'Chat on WhatsApp'}</span>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-3 rounded-xl font-medium text-xs sm:text-sm transition-colors"
              >
                <span>{isBn ? 'ফেসবুক পেইজ' : 'Facebook Page'}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
