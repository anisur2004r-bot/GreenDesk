import React, { useRef, useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { HERO_VIDEO } from '../data/products';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  HeartHandshake,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Droplets,
  Maximize2,
  X,
} from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { language, setPage, setActiveCategory } = useShop();
  const isBn = language === 'bn';

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Fallback for browsers requiring muted initial autoplay
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        }
      });
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleExplore = () => {
    setActiveCategory('All');
    setPage('shop');
  };

  return (
    <section className="relative w-full min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-between overflow-hidden bg-stone-100 border-b border-[#2d6a4f]/15">
      {/* ========================================================================= */}
      {/* RAW ORIGINAL VIDEO BACKGROUND (কোনো ইফেক্ট বা ফিল্টার ছাড়া, যেমন আছে তেমনই)   */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover object-center"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      </div>

      {/* Top Floating Video Controls - Aligned with Header Grid */}
      <div className="relative z-20 w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-6 flex justify-end">
        <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-white/90 backdrop-blur-md border border-stone-200/90 shadow-md">
          <button
            onClick={togglePlay}
            className="p-2 rounded-full hover:bg-stone-100 text-[#1b4332] transition-colors cursor-pointer"
            title={isPlaying ? 'Pause Video' : 'Play Video'}
            aria-label="Toggle Playback"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-stone-100 text-[#1b4332] transition-colors cursor-pointer"
            title={isMuted ? 'Sound On' : 'Mute Sound'}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="p-2 rounded-full hover:bg-stone-100 text-[#1b4332] transition-colors cursor-pointer"
            title={isBn ? 'ফুলস্ক্রিন ভিডিও দেখুন' : 'Watch Fullscreen Video'}
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* HERO CONTENT - EXACT CONTAINER ALIGNMENT WITH NAVBAR (max-w-7xl px-4 sm:px-6 lg:px-8) */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* HERO CONTENT - CENTERED ACROSS FULL SCREEN WITHOUT ANY BACKGROUND BOX       */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 my-auto text-center flex flex-col items-center justify-center space-y-6">
        {/* Brand Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#2d6a4f]/20 text-[#1b4332] text-xs sm:text-sm font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#2d6a4f]" />
          <span>
            {isBn
              ? '🌿 প্রিমিয়াম ডেস্ক প্ল্যান্ট ও সিরামিক পট কালেকশন'
              : '🌿 Premium Desk Plants & Ceramic Planters Collection'}
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1b4332] leading-[1.15] drop-shadow-xs">
          {isBn ? (
            <>
              আপনার কাজের ডেস্কে আনুন <br />
              <span className="text-[#2d6a4f] underline decoration-[#74c69d]/80 decoration-wavy">
                সতেজ সাদা স্নিগ্ধতা
              </span>
            </>
          ) : (
            <>
              Bring Fresh Green Serenity <br />
              <span className="text-[#2d6a4f]">To Your Workspace Desk</span>
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-sm sm:text-base lg:text-lg text-stone-800 leading-relaxed font-medium drop-shadow-xs">
          {isBn
            ? 'উজ্জ্বল কাঠের ডেস্ক ও এসি রুমের জন্য বিশেষভাবে নির্বাচিত মিনি সাকুলেন্ট, অ্যালোভেরা ও স্নেক প্ল্যান্ট। পানি দেওয়ার সহজ নিয়মে দীর্ঘস্থায়ী সতেজতা ও ১০০% ট্রানজিট সেফটি গ্যারান্টি।'
            : 'Handpicked mini succulents, hardy desk aloes, and faceted ceramic planters designed for modern bright workspaces. Low maintenance, air-purifying, delivered safely across Bangladesh.'}
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={handleExplore}
            className="group relative bg-[#1b4332] hover:bg-[#2d6a4f] text-white px-8 py-4 rounded-2xl font-bold text-sm sm:text-base flex items-center gap-2.5 transition-all shadow-lg hover:shadow-xl active:scale-98 cursor-pointer"
          >
            <span>{isBn ? 'সকল গাছ দেখুন (১৬টি কালেকশন)' : 'Explore All 16 Desk Plants'}</span>
            <ArrowRight className="w-4 h-4 text-[#74c69d] transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => setPage('care-tips')}
            className="bg-white/95 hover:bg-white border border-[#2d6a4f]/30 text-[#1b4332] px-7 py-4 rounded-2xl font-bold text-sm sm:text-base transition-all flex items-center gap-2 shadow-xs hover:shadow-md cursor-pointer backdrop-blur-xs"
          >
            <Droplets className="w-4 h-4 text-[#2d6a4f]" />
            <span>{isBn ? 'যত্নের ভিডিও' : 'Watch Care Video'}</span>
          </button>
        </div>

        {/* Metrics Row */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-stone-800">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-2xl text-[#1b4332] tabular-nums">16+</span>
            <span className="leading-tight text-stone-700 font-semibold">
              {isBn ? 'ডেস্ক ভ্যারাইটি' : 'Desk Varieties'}
            </span>
          </div>
          <span className="text-stone-400">|</span>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-2xl text-[#1b4332] tabular-nums">৳60</span>
            <span className="leading-tight text-stone-700 font-semibold">
              {isBn ? 'ঢাকায় ডেলিভারি' : 'Dhaka Express'}
            </span>
          </div>
          <span className="text-stone-400">|</span>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-2xl text-[#2d6a4f] tabular-nums">100%</span>
            <span className="leading-tight text-stone-700 font-semibold">
              {isBn ? 'ট্রানজিট গ্যারান্টি' : 'Transit Guarantee'}
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4-ITEM VALUE PROPOSITIONS BAR - ALIGNED TO HEADER GRID                     */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full bg-white/85 backdrop-blur-md border-t border-[#2d6a4f]/15 py-4">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#d8f3dc] text-[#1b4332] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-[#2d6a4f]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#1b4332]">
                {isBn ? 'ঢাকায় মাত্র ৳৬০' : 'Dhaka Express ৳60'}
              </h4>
              <p className="text-[11px] text-stone-500">
                {isBn ? '২৪-৪৮ ঘণ্টার দ্রুত ডেলিভারি' : 'Delivered in 24-48 hours'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#d8f3dc] text-[#1b4332] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#2d6a4f]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#1b4332]">
                {isBn ? '১০০% ট্রানজিট সেফটি' : '100% Transit Safe'}
              </h4>
              <p className="text-[11px] text-stone-500">
                {isBn ? 'ভাঙলে ফ্রি রিপ্লেসমেন্ট' : 'Free replacement if damaged'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#d8f3dc] text-[#1b4332] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-[#2d6a4f]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#1b4332]">
                {isBn ? '১৬টি ডেস্ক ভ্যারাইটি' : '16 Desk Varieties'}
              </h4>
              <p className="text-[11px] text-stone-500">
                {isBn ? 'টব ও মাটি সহ রেডি' : 'Pre-potted with organic soil'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#d8f3dc] text-[#1b4332] flex items-center justify-center shrink-0">
              <HeartHandshake className="w-5 h-5 text-[#2d6a4f]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#1b4332]">
                {isBn ? 'বিকাশ, নগদ ও COD' : 'bKash, Nagad & COD'}
              </h4>
              <p className="text-[11px] text-stone-500">
                {isBn ? 'সহজ ও নিরাপদ পেমেন্ট' : 'Easy local payment options'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Video Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <div className="p-4 bg-white flex items-center justify-between border-b border-stone-200">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2d6a4f] animate-pulse" />
                <h3 className="font-bold text-[#1b4332] text-sm sm:text-base">
                  {isBn ? 'ফুলস্ক্রিন হিরো ব্যাকগ্রাউন্ড ভিডিও' : 'Fullscreen Hero Background Video'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-16/9 bg-white">
              <video
                autoPlay
                controls
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={HERO_VIDEO} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
