import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  Sprout,
  Heart,
} from 'lucide-react';

export const AboutContactView: React.FC = () => {
  const { language, setPage } = useShop();
  const isBn = language === 'bn';

  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setFormName('');
      setFormPhone('');
      setFormMessage('');
    }, 4000);
  };

  return (
    <div className="py-8 sm:py-12 bg-[#faf9f5]">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-16">
        {/* About Section */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#40916c]">
            {isBn ? 'আমাদের গল্প' : 'The Patabahar Story'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1b4332]">
            {isBn
              ? 'ডেস্কে এক টুকরো সবুজ, মনে এক টুকরো শান্তি'
              : 'Bringing Botanical Calm to Bangladeshi Desks'}
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed text-balance">
            {isBn
              ? 'ঢাকার ব্যস্ত কর্মজীবনে আমরা দিনের ৮ থেকে ১০ ঘণ্টা কাটাই কম্পিউটার স্ক্রিন ও ল্যাপটপের সামনে। পাটাবাহার প্রতিষ্ঠিত হয়েছে আপনার সেই একঘেয়ে ডেস্কে জীবন্ত সবুজের স্পর্শ এনে দিতে। সাভারের নিজস্ব নার্সারিতে বিশেষভাবে যত্ন নিয়ে প্রস্তুত করা প্রতিটি গাছ সহজেই টিকে থাকে এসি রুমে ও ইনডোর আলোতে।'
              : 'In the bustling corporate and academic landscape of Dhaka and across Bangladesh, we spend 8 to 10 hours staring at backlit screens. Patabahar was born with a simple mission: to make compact, resilient living greenery an accessible daily companion on every desk.'}
          </p>
        </div>

        {/* Nursery & Values Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#d8f3dc] text-[#1b4332] flex items-center justify-center mb-4">
              <Sprout className="w-5 h-5 text-[#2d6a4f]" />
            </div>
            <h3 className="text-base font-bold text-[#1b4332] mb-1">
              {isBn ? 'সাভারের নিজস্ব নার্সারি' : 'Botanical Nursery in Savar'}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {isBn
                ? 'আমাদের উদ্ভিদবিদরা প্রতিটি গাছকে ছোট থেকেই ডেস্কে বেঁচে থাকার উপযোগী করে পটিং মিক্স ও হালকা জৈব সারে প্রস্তুত করেন।'
                : 'Acclimatized from seedling stage specifically for indoor humidity and ambient desk conditions.'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#d8f3dc] text-[#1b4332] flex items-center justify-center mb-4">
              <Heart className="w-5 h-5 text-[#2d6a4f]" />
            </div>
            <h3 className="text-base font-bold text-[#1b4332] mb-1">
              {isBn ? 'হস্তশিল্প মাটির ও সিরামিক টব' : 'Artisanal Planters'}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {isBn
                ? 'বাংলাদেশী ঐতিহ্যবাহী টেরাকোটা ও প্রিমিয়াম ম্যাট সিরামিক পট যা পরিবেশবান্ধব এবং টেবিলকে করে তোলে রুচিশীল।'
                : 'Combining local Bangladeshi pottery craft with modern minimalist Nordic geometry.'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#d8f3dc] text-[#1b4332] flex items-center justify-center mb-4">
              <MessageCircle className="w-5 h-5 text-[#2d6a4f]" />
            </div>
            <h3 className="text-base font-bold text-[#1b4332] mb-1">
              {isBn ? 'কর্পোরেট ও গিফট অর্ডার' : 'Corporate & Bulk Gifts'}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {isBn
                ? 'অফিস ওয়েলকাম কিট, কনফারেন্স বা প্রিয়জনের জন্মদিনে কাস্টমাইজড ব্র্যান্ডিং ও গ্রিটিংস কার্ড সহ উপহার পাঠাই।'
                : 'Custom green desk setups for tech companies, startups, and sustainable eco-friendly corporate gifts.'}
            </p>
          </div>
        </div>

        {/* Contact Us Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-8 border-t border-stone-200">
          {/* Studio Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#40916c]">
                {isBn ? 'যোগাযোগ' : 'Get in Touch'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1b4332] mt-1">
                {isBn ? 'আমাদের সাথে কথা বলুন' : 'Visit or Contact Our Studio'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-2">
                {isBn
                  ? 'গাছ সম্পর্কিত যেকোনো প্রশ্ন, বাল্ক অর্ডার বা ডেলিভারির বিষয়ে আমাদের সাথে সরাসরি যোগাযোগ করুন।'
                  : 'Have questions about plant care, corporate gifting, or live orders? Reach out directly.'}
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-stone-700">
              <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-stone-200/80">
                <MapPin className="w-5 h-5 text-[#2d6a4f] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#1b4332] block">
                    {isBn ? 'স্টুডিও ও ডিসপ্লে সেন্টার:' : 'Studio & Display Center:'}
                  </span>
                  <span>
                    House 42, Road 11, Dhanmondi, Dhaka-1209, Bangladesh
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-stone-200/80">
                <Phone className="w-5 h-5 text-[#2d6a4f] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#1b4332] block">
                    {isBn ? 'ফোন ও হেল্পলাইন:' : 'Customer Helpline:'}
                  </span>
                  <span className="font-mono">+880 1712-345678 (10 AM - 8 PM)</span>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-stone-200/80">
                <Mail className="w-5 h-5 text-[#2d6a4f] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#1b4332] block">
                    {isBn ? 'ইমেইল:' : 'Official Email:'}
                  </span>
                  <span className="font-mono">hello@patabaharplants.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-stone-200/80">
                <Clock className="w-5 h-5 text-[#2d6a4f] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#1b4332] block">
                    {isBn ? 'ডেলিভারি সময়সূচি:' : 'Delivery Hours:'}
                  </span>
                  <span>
                    {isBn
                      ? 'শনি - বৃহস্পতি: সকাল ১০টা - রাত ৮টা (ঢাকা ও দেশব্যাপী)'
                      : 'Saturday - Thursday: 10:00 AM - 8:00 PM'}
                  </span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Action */}
            <a
              href="https://wa.me/8801712345678"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#25d366] hover:bg-[#20ba5a] text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>{isBn ? 'হোয়াটসঅ্যাপে সরাসরি চ্যাট করুন' : 'Instant WhatsApp Chat'}</span>
            </a>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-xs">
            <h3 className="text-base font-bold text-[#1b4332] mb-1">
              {isBn ? 'আমাদের বার্তা পাঠান' : 'Send Us a Quick Message'}
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              {isBn
                ? 'আমরা সাধারণত ১ ঘণ্টার মধ্যে আপনার হোয়াটসঅ্যাপ বা নম্বরে উত্তর দিই।'
                : 'We usually respond within 1 hour during business hours.'}
            </p>

            {submitted ? (
              <div className="bg-[#d8f3dc] text-[#1b4332] p-6 rounded-2xl border border-[#74c69d] text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 mx-auto text-[#2d6a4f]" />
                <h4 className="font-bold text-sm">
                  {isBn ? 'আপনার বার্তা সফলভাবে পৌঁছেছে!' : 'Message Received!'}
                </h4>
                <p className="text-xs text-stone-700">
                  {isBn
                    ? 'আমাদের একজন প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন।'
                    : 'Our desk greenery specialist will connect with you shortly.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700 block">
                      {isBn ? 'আপনার নাম *' : 'Your Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder={isBn ? 'আপনার নাম' : 'Your name'}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#faf9f5] focus:outline-none focus:border-[#2d6a4f]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700 block">
                      {isBn ? 'মোবাইল নম্বর *' : 'Phone Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#faf9f5] focus:outline-none focus:border-[#2d6a4f]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700 block">
                    {isBn ? 'কী জানতে চান? *' : 'Your Message *'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder={
                      isBn
                        ? 'আপনার প্রশ্ন বা করপোরেট বাল্ক অর্ডার সম্পর্কে বিস্তারিত লিখুন...'
                        : 'Tell us about your desk space, questions, or bulk corporate gifting needs...'
                    }
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#faf9f5] focus:outline-none focus:border-[#2d6a4f]"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#1b4332] hover:bg-[#2d6a4f] text-white px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Send className="w-4 h-4 text-[#74c69d]" />
                  <span>{isBn ? 'বার্তা পাঠান' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
