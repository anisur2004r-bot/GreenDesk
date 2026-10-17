import React from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/products';
import { CategoryKey } from '../types';
import { ArrowUpRight } from 'lucide-react';

export const FeaturedCategories: React.FC = () => {
  const { language, products, setActiveCategory, setPage } = useShop();
  const isBn = language === 'bn';

  const handleCategorySelect = (catId: CategoryKey) => {
    setActiveCategory(catId);
    setPage('shop');
  };

  return (
    <section className="py-12 sm:py-16 bg-[#faf9f5]">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#40916c] block mb-1">
              {isBn ? 'ক্যাটাগরি সমূহ' : 'Browse By Category'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1b4332]">
              {isBn ? 'আপনার পছন্দমতো ডেস্ক প্ল্যান্ট' : 'Curated Plant Families'}
            </h2>
          </div>
          <button
            onClick={() => {
              setActiveCategory('All');
              setPage('shop');
            }}
            className="text-xs sm:text-sm font-semibold text-[#2d6a4f] hover:text-[#1b4332] flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>{isBn ? 'সব ক্যাটাগরি এক্সপ্লোর করুন' : 'View All Plants'}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* 5-Column Clean Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className="group text-left p-4 sm:p-5 rounded-2xl bg-white border border-[#2d6a4f]/10 hover:border-[#2d6a4f]/30 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-semibold text-[#40916c] block mb-1">
                  {products.filter((p) => p.category === cat.id).length} {isBn ? 'টি ভ্যারাইটি' : 'Varieties'}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#1b4332] group-hover:text-[#2d6a4f] transition-colors">
                  {isBn ? cat.nameBn : cat.name}
                </h3>
                <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                  {isBn ? cat.descBn : cat.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-medium text-[#2d6a4f]">
                <span>{isBn ? 'গাছ দেখুন' : 'Explore'}</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
