import React, { useState, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { CARE_BLOG_POSTS, CARE_VIDEO } from '../data/products';
import {
  Droplets,
  Sun,
  Wind,
  BookOpen,
  Calculator,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export const PlantCareTipsView: React.FC = () => {
  const { language, setPage } = useShop();
  const isBn = language === 'bn';

  // Video Tutorial Player State
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(12);
  const [activeChapter, setActiveChapter] = useState(0);

  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleVideoMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    setCurrentTime(curr);
    if (curr < 3) setActiveChapter(0);
    else if (curr < 7) setActiveChapter(1);
    else setActiveChapter(2);
  };

  const seekToChapter = (sec: number, idx: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = sec;
    videoRef.current.play();
    setIsPlaying(true);
    setActiveChapter(idx);
  };

  // Interactive Watering Calculator State
  const [calcPlant, setCalcPlant] = useState('succulent');
  const [calcAc, setCalcAc] = useState('yes');
  const [calcLight, setCalcLight] = useState('indirect');
  const [calculatedSchedule, setCalculatedSchedule] = useState<{
    days: string;
    adviceEn: string;
    adviceBn: string;
  }>({
    days: 'Every 8-10 days',
    adviceEn: 'In AC rooms, topsoil dries fast while roots stay moist. Water thoroughly once every 8-10 days only after testing with a toothpick.',
    adviceBn: 'এসি রুমে ওপরের মাটি দ্রুত শুকালেও শিকড়ে আর্দ্রতা থাকে। কাঠি দিয়ে মাটি চেক করে প্রতি ৮-১০ দিনে একবার ভালো করে পানি দিন।',
  });

  const handleCalculate = () => {
    let daysEn = 'Every 7-10 days';
    let daysBn = 'প্রতি ৭-১০ দিনে একবার';
    let adviceEn = '';
    let adviceBn = '';

    if (calcPlant === 'snake') {
      daysEn = calcAc === 'yes' ? 'Every 14-20 days' : 'Every 12-16 days';
      daysBn = calcAc === 'yes' ? 'প্রতি ১৪-২০ দিনে একবার' : 'প্রতি ১২-১৬ দিনে একবার';
      adviceEn = 'Snake plant loves dry soil. Overwatering is its only enemy. Water very sparingly.';
      adviceBn = 'স্নেক প্ল্যান্টের মাটি পুরোপুরি শুকিয়ে যাওয়ার পরেই সামান্য পানি দিন। অতিরিক্ত পানি এর জন্য ক্ষতিকর।';
    } else if (calcPlant === 'cactus') {
      daysEn = 'Every 18-25 days';
      daysBn = 'প্রতি ১৮-২৫ দিনে একবার';
      adviceEn = 'Give 2 tablespoons of water twice a month. Ensure bottom hole drains immediately.';
      adviceBn = 'মাসে মাত্র দুইবার ২ চা চামচ পানি দিলেই যথেষ্ট। টবের নিচে পানি জমতে দেবেন না।';
    } else if (calcPlant === 'money') {
      daysEn = calcAc === 'yes' ? 'Every 5-7 days' : 'Every 4-6 days';
      daysBn = calcAc === 'yes' ? 'প্রতি ৫-৭ দিনে একবার' : 'প্রতি ৪-৬ দিনে একবার';
      adviceEn = 'Likes slight moisture. Mist leaves once a week to keep the golden glossy shine in AC.';
      adviceBn = 'হালকা আর্দ্রতা পছন্দ করে। এসি রুমে সপ্তাহে একবার পাতায় পানি স্প্রে করলে পাতা চকচকে থাকে।';
    } else {
      daysEn = calcAc === 'yes' ? 'Every 8-10 days' : 'Every 7-9 days';
      daysBn = calcAc === 'yes' ? 'প্রতি ৮-১০ দিনে একবার' : 'প্রতি ৭-৯ দিনে একবার';
      adviceEn = 'Bottom water or gently soak around the root base. Avoid water sitting on succulent rosettes.';
      adviceBn = 'গাছের গোড়ায় পানি দিন। সাকুলেন্টের পাতার খাঁজে পানি জমতে দেবেন না।';
    }

    setCalculatedSchedule({
      days: isBn ? daysBn : daysEn,
      adviceEn,
      adviceBn,
    });
  };

  const chapters = [
    {
      sec: 0,
      titleEn: 'Step 1: Test Soil Moisture',
      titleBn: 'ধাপ ১: মাটির আর্দ্রতা পরীক্ষা',
      descEn: 'Insert a toothpick 2 inches deep. If it comes out dry, your plant is ready for water.',
      descBn: 'একটি কাঠের টুথপিক বা আঙুল ২ ইঞ্চি গভীরে দিন। মাটি সম্পূর্ণ শুকনা থাকলে তবেই পানি দিন।',
    },
    {
      sec: 4,
      titleEn: 'Step 2: Steady Root Hydration',
      titleBn: 'ধাপ ২: শিকড়ের গোড়ায় পরিমিত পানি',
      descEn: 'Pour water directly at the root base using a beaker or watering can, never on succulent leaves.',
      descBn: 'গাছের পাতার ওপর পানি না ফেলে সরাসরি মাটির গোড়ায় পরিমিত পানি দিন।',
    },
    {
      sec: 8,
      titleEn: 'Step 3: Drain Excess Water',
      titleBn: 'ধাপ ৩: অতিরিক্ত পানি নিষ্কাশন',
      descEn: 'Allow water to drain freely through the pot hole. Empty any water sitting in the saucer.',
      descBn: 'টবের নিচের ছিদ্র দিয়ে পানি নামতে দিন। ট্রেতে জমে থাকা বাড়তি পানি ফেলে দিন।',
    },
  ];

  return (
    <div className="py-8 sm:py-12 bg-[#faf9f5]">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#40916c] block mb-1">
            {isBn ? 'ইনডোর বোটানিক্যাল মাস্টারক্লাস' : 'Botanical Desk Masterclass'}
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-[#1b4332]">
            {isBn ? 'কীভাবে ডেস্ক প্ল্যান্টের সঠিক যত্ন নেবেন' : 'How to Care for Your Desk Plants'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            {isBn
              ? 'ভিডিও নির্দেশিকা, ওয়াটারিং ক্যালকুলেটর ও এসি অফিসের জন্য বৈজ্ঞানিক টিপস।'
              : 'Video tutorials, interactive watering schedules, and expert tips for air-conditioned workspaces in Bangladesh.'}
          </p>
        </div>

        {/* 1. Featured Video Masterclass Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#2d6a4f]/15 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-100">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#d8f3dc] text-[#1b4332] text-[11px] font-bold">
                  {isBn ? 'ভিডিও টিউটোরিয়াল' : 'Video Tutorial'}
                </span>
                <span className="text-[11px] font-mono text-[#2d6a4f] bg-stone-100 border border-stone-200 px-2 py-0.5 rounded">
                  public/videos/plant_care_watering.mp4
                </span>
                <span className="text-xs text-stone-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>3 Steps (12s Masterclass)</span>
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1b4332] mt-1">
                {isBn
                  ? 'ডেস্কে পানি দেওয়ার ৩টি সুবর্ণ নিয়ম (ভিডিও গাইড)'
                  : 'The 3 Golden Rules of Watering Desk Plants'}
              </h2>
            </div>

            <button
              onClick={() => seekToChapter(0, 0)}
              className="self-start sm:self-auto flex items-center gap-1.5 text-xs font-semibold text-[#2d6a4f] hover:text-[#1b4332] bg-stone-50 hover:bg-stone-100 px-3 py-1.5 rounded-xl border border-stone-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isBn ? 'শুরু থেকে দেখুন' : 'Watch from start'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Custom Video Player with High-Key White Aesthetic */}
            <div className="lg:col-span-7">
              <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-white border-2 border-stone-200/80 shadow-md group">
                <video
                  ref={videoRef}
                  src={CARE_VIDEO}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={() => {
                    if (videoRef.current) setDuration(videoRef.current.duration);
                  }}
                  onEnded={() => setIsPlaying(false)}
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover bg-white filter brightness-[1.22] contrast-[1.03] saturate-[1.08]"
                />

                {/* Big Center Play Overlay Button when paused */}
                {!isPlaying && (
                  <div
                    onClick={toggleVideoPlay}
                    className="absolute inset-0 bg-white/35 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer transition-opacity"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#2d6a4f] hover:bg-[#1b4332] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110">
                      <Play className="w-7 h-7 ml-1 fill-current" />
                    </div>
                    <span className="text-xs font-semibold text-[#1b4332] mt-3 bg-white/95 border border-stone-200/80 shadow-sm px-3.5 py-1.5 rounded-full">
                      {isBn ? 'ভিডিও টিউটোরিয়াল প্লে করুন' : 'Click to Play Video Tutorial'}
                    </span>
                  </div>
                )}

                {/* Player Bottom Control Strip - Clean Translucent White Bar */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-white/95 via-white/85 to-transparent p-4 flex flex-col gap-2 border-t border-stone-100">
                  {/* Progress Bar */}
                  <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden cursor-pointer">
                    <div
                      className="bg-[#2d6a4f] h-full transition-all"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#1b4332]">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={toggleVideoPlay}
                        className="p-1 hover:text-[#2d6a4f] transition-colors cursor-pointer"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={toggleVideoMute}
                        className="p-1 hover:text-[#2d6a4f] transition-colors cursor-pointer"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>

                      <span className="text-[11px] font-mono text-stone-600 tabular-nums">
                        00:{Math.floor(currentTime).toString().padStart(2, '0')} / 00:12
                      </span>
                    </div>

                    <span className="text-[11px] text-[#2d6a4f] font-bold">
                      {isBn
                        ? chapters[activeChapter].titleBn
                        : chapters[activeChapter].titleEn}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Step-by-Step Chapters */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                {isBn ? 'টিউটোরিয়াল ধাপসমূহ:' : 'Tutorial Chapters (Click to Jump):'}
              </span>

              {chapters.map((chap, idx) => {
                const isActive = activeChapter === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => seekToChapter(chap.sec, idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                      isActive
                        ? 'border-[#2d6a4f] bg-[#d8f3dc]/30 shadow-2xs'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                        isActive
                          ? 'bg-[#1b4332] text-white'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {idx + 1}
                    </div>

                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#1b4332]">
                        {isBn ? chap.titleBn : chap.titleEn}
                      </h4>
                      <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                        {isBn ? chap.descBn : chap.descEn}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2. Interactive Desk Plant Watering Calculator */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#2d6a4f]/15 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#d8f3dc] text-[#2d6a4f] flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#1b4332]">
                {isBn
                  ? 'পানি দেওয়ার ক্যালকুলেটর (Watering Calculator)'
                  : 'Interactive Desk Watering Calculator'}
              </h2>
              <span className="text-xs text-stone-500 block">
                {isBn
                  ? 'আপনার গাছ ও পরিবেশ নির্বাচন করে পানি দেওয়ার সঠিক সময় জানুন'
                  : 'Get a personalized watering recommendation based on your room setup'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {/* Plant Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 block">
                {isBn ? 'গাছের ধরন:' : 'Plant Family:'}
              </label>
              <select
                value={calcPlant}
                onChange={(e) => setCalcPlant(e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-stone-200 bg-[#faf9f5] focus:outline-none focus:border-[#2d6a4f]"
              >
                <option value="succulent">{isBn ? 'সাকুলেন্ট বা জেড প্ল্যান্ট' : 'Succulent / Jade'}</option>
                <option value="snake">{isBn ? 'স্নেক প্ল্যান্ট (Sansevieria)' : 'Snake Plant'}</option>
                <option value="cactus">{isBn ? 'মিনি ক্যাকটাস' : 'Mini Cactus'}</option>
                <option value="money">{isBn ? 'মানি প্ল্যান্ট (Golden Pothos)' : 'Money Plant'}</option>
              </select>
            </div>

            {/* AC Environment */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 block">
                {isBn ? 'রুমের পরিবেশ (AC আছে কি?):' : 'Air Conditioning (AC):'}
              </label>
              <select
                value={calcAc}
                onChange={(e) => setCalcAc(e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-stone-200 bg-[#faf9f5] focus:outline-none focus:border-[#2d6a4f]"
              >
                <option value="yes">{isBn ? 'হ্যাঁ, এসি চলে (শুষ্ক ঠান্ডা বাতাস)' : 'Yes, AC Running daily'}</option>
                <option value="no">{isBn ? 'না, সাধারণ ফ্যান বা জানালা' : 'No AC, normal ventilation'}</option>
              </select>
            </div>

            {/* Light Level */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 block">
                {isBn ? 'আলোর ধরন:' : 'Desk Lighting:'}
              </label>
              <select
                value={calcLight}
                onChange={(e) => setCalcLight(e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-stone-200 bg-[#faf9f5] focus:outline-none focus:border-[#2d6a4f]"
              >
                <option value="indirect">{isBn ? 'জানালার কাছে পরোক্ষ আলো' : 'Window Indirect Daylight'}</option>
                <option value="low">{isBn ? 'শুধুমাত্র কৃত্রিম ডেস্ক লাইট' : 'Artificial Desk Lamp / Dim'}</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-stone-100 bg-[#faf9f5] p-4 rounded-2xl">
            <div>
              <span className="text-xs text-stone-500 block mb-0.5">
                {isBn ? 'প্রস্তাবিত সময়সূচি:' : 'Recommended Watering:'}
              </span>
              <span className="text-base sm:text-lg font-bold text-[#1b4332]">
                {calculatedSchedule.days}
              </span>
              <p className="text-xs text-stone-600 mt-1 max-w-xl">
                {isBn ? calculatedSchedule.adviceBn : calculatedSchedule.adviceEn}
              </p>
            </div>

            <button
              onClick={handleCalculate}
              className="bg-[#1b4332] hover:bg-[#2d6a4f] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shrink-0 transition-colors shadow-2xs"
            >
              {isBn ? 'পুনরায় হিসেব করুন' : 'Recalculate'}
            </button>
          </div>
        </div>

        {/* 3. Care Blog Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CARE_BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#2d6a4f] mb-3">
                  <span className="font-semibold">{isBn ? post.categoryBn : post.category}</span>
                  <span className="text-stone-400">{isBn ? post.readTimeBn : post.readTime}</span>
                </div>

                <h3 className="text-base font-bold text-[#1b4332] leading-snug mb-2.5">
                  {isBn ? post.titleBn : post.title}
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  {isBn ? post.summaryBn : post.summary}
                </p>

                <div className="space-y-2 border-t border-stone-100 pt-3 text-xs text-stone-700">
                  {post.content.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#40916c] mt-1.5 shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-stone-100">
                <button
                  onClick={() => setPage('shop')}
                  className="text-xs font-semibold text-[#2d6a4f] hover:text-[#1b4332] flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{isBn ? 'এই ধরনের গাছ দেখুন' : 'Browse Matching Plants'}</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
