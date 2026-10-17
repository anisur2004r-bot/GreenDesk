import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { FAQS } from '../data/products';
import { ChevronDown, ShieldCheck, Truck, RotateCcw, HelpCircle } from 'lucide-react';

export const PolicyFaqView: React.FC = () => {
  const { language } = useShop();
  const isBn = language === 'bn';

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="py-8 sm:py-12 bg-[#faf9f5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section 1: Policies */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#40916c]">
              {isBn ? 'নির্ভরযোগ্য ডেলিভারি ও পলিসি' : 'Delivery & Transit Guarantees'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1b4332] mt-1">
              {isBn ? 'ডেলিভারি এবং রিটার্ন পলিসি' : 'Shipping & Replacement Policy'}
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Delivery Policy */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-2xs space-y-3">
              <div className="flex items-center gap-2.5 text-[#1b4332]">
                <div className="w-8 h-8 rounded-lg bg-[#d8f3dc] flex items-center justify-center">
                  <Truck className="w-4 h-4 text-[#2d6a4f]" />
                </div>
                <h2 className="text-base font-bold">
                  {isBn ? 'ডেলিভারি এলাকা ও চার্জ' : 'Delivery Zones & Rates'}
                </h2>
              </div>
              <ul className="text-xs text-stone-600 space-y-2 leading-relaxed pt-2">
                <li>
                  <strong className="text-stone-800">
                    {isBn ? 'ঢাকার ভেতরে (Inside Dhaka): ' : 'Inside Dhaka City: '}
                  </strong>
                  {isBn
                    ? 'ডেলিভারি চার্জ মাত্র ৳৬০। অর্ডার কনফার্মেশনের ২৪ থেকে ৪৮ ঘণ্টার মধ্যে নিজস্ব পাঠাও এক্সপ্রেস রাইডারে হ্যান্ড-টু-হ্যান্ড পৌঁছে দেওয়া হয়।'
                    : 'Flat delivery charge ৳60. Dispatched within 24–48 hours via dedicated couriers.'}
                </li>
                <li>
                  <strong className="text-stone-800">
                    {isBn ? 'ঢাকার বাইরে (Outside Dhaka): ' : 'Nationwide (All 64 districts): '}
                  </strong>
                  {isBn
                    ? 'ডেলিভারি চার্জ ৳১২০। ২ থেকে ৪ কার্যদিবসের মধ্যে স্টিডফাস্ট কুরিয়ারের মাধ্যমে সরাসরি আপনার ঠিকানায় ডেলিভারি।'
                    : 'Flat rate ৳120. Delivered within 2–4 business days via Steadfast Courier with live tracking.'}
                </li>
              </ul>
            </div>

            {/* Return & Replacement Guarantee */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-2xs space-y-3">
              <div className="flex items-center gap-2.5 text-[#1b4332]">
                <div className="w-8 h-8 rounded-lg bg-[#d8f3dc] flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-[#2d6a4f]" />
                </div>
                <h2 className="text-base font-bold">
                  {isBn ? '১০০% ট্রানজিট সেফটি গ্যারান্টি' : '100% Plant Transit Guarantee'}
                </h2>
              </div>
              <ul className="text-xs text-stone-600 space-y-2 leading-relaxed pt-2">
                <li>
                  <strong className="text-stone-800">
                    {isBn ? '২৪ ঘণ্টার ফ্রি রিপ্লেসমেন্ট: ' : 'Free Instant Replacement: '}
                  </strong>
                  {isBn
                    ? 'লাইভ প্ল্যান্ট ট্রানজিটে কোনোভাবে ক্ষতিগ্রস্ত হলে বা টব ভেঙে গেলে ডেলিভারির ২৪ ঘণ্টার মধ্যে আমাদের হোয়াটসঅ্যাপে ছবি পাঠালেই সম্পূর্ণ ফ্রিতে নতুন গাছ পাঠানো হবে।'
                    : 'If any plant arrives damaged or cracked, simply send a photo on WhatsApp within 24h for a 100% free replacement.'}
                </li>
                <li>
                  <strong className="text-stone-800">
                    {isBn ? 'লাইভ গাছ রিটার্ন: ' : 'Live Plant Care Advice: '}
                  </strong>
                  {isBn
                    ? 'জীবন্ত গাছ হওয়ায় অহেতুক রিটার্ন না করে সমস্যা হলে আমাদের উদ্ভিদবিদের পরামর্শ নিতে অনুরোধ করা হয়।'
                    : 'As living organisms, plants are not returned without cause; our botanists troubleshoot any acclimatization shock.'}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 2: FAQ Accordions */}
        <div className="space-y-6 pt-6 border-t border-stone-200">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#40916c]">
              {isBn ? 'সাধারণ জিজ্ঞাসা' : 'Common Questions'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1b4332] mt-1">
              {isBn ? 'প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী (FAQ)' : 'Frequently Asked Questions'}
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#1b4332] hover:bg-[#faf9f5]"
                  >
                    <span>{isBn ? faq.questionBn : faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#2d6a4f] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                      <p>{isBn ? faq.answerBn : faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
