import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sprout, Phone, Mail, MapPin, Heart, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, setPage, toggleLanguage } = useShop();
  const isBn = language === 'bn';

  return (
    <footer className="bg-[#1b3323] text-stone-300 pt-14 pb-10 border-t border-[#2d6a4f]/20">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand & Story */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#2d6a4f] text-[#d8f3dc] flex items-center justify-center shadow-sm">
                <Sprout className="w-5 h-5 text-[#74c69d]" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                {isBn ? 'পাতা বাহার' : 'Patabahar'}
              </span>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed max-w-sm">
              {isBn
                ? 'বাংলাদেশের প্রথম প্রিমিয়াম অনলাইন ডেস্ক প্ল্যান্ট শপ। আপনার পড়ার টেবিল বা অফিস ওয়ার্কস্টেশনের জন্য কম যত্নে বেঁচে থাকা সাকুলেন্ট, স্নেক প্ল্যান্ট ও সিরামিক প্ল্যান্টার।'
                : "Bangladesh's premier online boutique for resilient indoor desk plants, succulents, snake plants, and handcrafted ceramic pottery."}
            </p>

            <div className="pt-2 text-xs text-[#74c69d] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{isBn ? '১০০% সুস্থ উদ্ভিদ ট্রানজিট গ্যারান্টি' : '100% Plant Transit Guarantee'}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {isBn ? 'ন্যাভিগেশন' : 'Explore'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setPage('home')}
                  className="hover:text-white transition-colors"
                >
                  {isBn ? 'হোম পেইজ' : 'Home'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPage('shop')}
                  className="hover:text-white transition-colors"
                >
                  {isBn ? 'সকল ডেস্ক প্ল্যান্ট' : 'Shop All Plants'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPage('care-tips')}
                  className="hover:text-white transition-colors"
                >
                  {isBn ? 'গাছের যত্ন ও ব্লগ' : 'Care Tips & Blog'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPage('tracking')}
                  className="hover:text-white transition-colors"
                >
                  {isBn ? 'অর্ডার ট্র্যাকিং' : 'Track Order'}
                </button>
              </li>
            </ul>
          </div>

          {/* Policy & Help */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {isBn ? 'সাহায্য ও পলিসি' : 'Customer Care'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setPage('about')}
                  className="hover:text-white transition-colors"
                >
                  {isBn ? 'আমাদের সম্পর্কে' : 'About Us'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPage('policy')}
                  className="hover:text-white transition-colors"
                >
                  {isBn ? 'ডেলিভারি ও রিটার্ন পলিসি' : 'Delivery & Returns'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPage('faq')}
                  className="hover:text-white transition-colors"
                >
                  {isBn ? 'সাধারণ প্রশ্নোত্তর (FAQ)' : 'Frequently Asked Questions'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPage('admin')}
                  className="text-[#74c69d] hover:underline transition-colors"
                >
                  {isBn ? 'মক অ্যাডমিন প্যানেল' : 'Mock Admin Panel'}
                </button>
              </li>
            </ul>
          </div>

          {/* Payment & Studio Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {isBn ? 'পেমেন্ট ও ডিসপ্লে' : 'Payment Methods'}
            </h4>
            <p className="text-xs text-stone-300">
              {isBn
                ? 'ক্যাশ অন ডেলিভারি, বিকাশ ও নগদ সাপোর্টেড।'
                : 'Cash on Delivery, bKash & Nagad available nationwide.'}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1 text-[10px] font-semibold">
              <span className="bg-[#e2136e] text-white px-2 py-1 rounded">bKash</span>
              <span className="bg-[#f7941d] text-white px-2 py-1 rounded">Nagad</span>
              <span className="bg-[#2d6a4f] text-white px-2 py-1 rounded">COD</span>
            </div>

            <div className="pt-2 text-[11px] text-stone-400">
              <span>Dhanmondi Display Studio, Dhaka-1209</span>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© 2026 Patabahar Desk Plants (পাতা বাহার). All rights reserved.</p>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="text-stone-300 hover:text-white font-medium"
            >
              {isBn ? 'English Version' : 'বাংলা সংস্করণ'}
            </button>
            <span>·</span>
            <span>Made with Care for Green Desks</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
