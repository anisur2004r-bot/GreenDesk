import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { CategoryKey } from '../types';
import { Search, Filter, RotateCcw, ArrowUpDown } from 'lucide-react';

export const ShopView: React.FC = () => {
  const {
    language,
    products,
    categories,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    selectedLight,
    setSelectedLight,
    selectedCare,
    setSelectedCare,
    sortBy,
    setSortBy,
    maxPriceFilter,
    setMaxPriceFilter,
  } = useShop();

  const isBn = language === 'bn';
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(16);

  const resetFilters = () => {
    setActiveCategory('All');
    setSearchQuery('');
    setSelectedLight('All');
    setSelectedCare('All');
    setSortBy('featured');
    setMaxPriceFilter(1000);
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category
        if (activeCategory !== 'All' && product.category !== activeCategory) {
          return false;
        }
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = product.name.toLowerCase().includes(q);
          const matchNameBn = product.nameBn.toLowerCase().includes(q);
          const matchCat = product.category.toLowerCase().includes(q);
          const matchSci = product.scientificName.toLowerCase().includes(q);
          if (!matchName && !matchNameBn && !matchCat && !matchSci) return false;
        }
        // Price
        if (product.price > maxPriceFilter) {
          return false;
        }
        // Light
        if (selectedLight !== 'All' && product.light !== selectedLight) {
          return false;
        }
        // Care
        if (selectedCare !== 'All' && product.careLevel !== selectedCare) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, activeCategory, searchQuery, maxPriceFilter, selectedLight, selectedCare, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="py-8 sm:py-12 bg-[#faf9f5]">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Page Header */}
        <div className="mb-8 border-b border-[#2d6a4f]/10 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#40916c]">
                {isBn ? 'পাটাবাহার ক্যাটালগ' : 'Plant Collection'}
              </span>
              <h1 className="text-2xl sm:text-4xl font-bold text-[#1b4332] mt-1">
                {isBn ? 'ইনডোর ডেস্ক প্ল্যান্ট শপ' : 'Indoor Desk Plant Shop'}
              </h1>
            </div>
            <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
              <span className="tabular-nums font-bold text-[#1b4332]">
                {filteredProducts.length}
              </span>
              <span>{isBn ? 'টি গাছ পাওয়া গেছে' : 'plants available'}</span>
            </div>
          </div>

          {/* Search and Top Bar Control */}
          <div className="mt-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isBn ? 'গাছের নাম বা ধরন খুঁজুন...' : 'Search plants by name, category...'}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm text-[#1b4332] placeholder-stone-400 focus:outline-none focus:border-[#2d6a4f] shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs font-bold"
                >
                  ×
                </button>
              )}
            </div>

            {/* Sort & Filter Controls */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="md:hidden flex items-center gap-1.5 px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold text-[#1b4332] shrink-0"
              >
                <Filter className="w-3.5 h-3.5 text-[#2d6a4f]" />
                <span>{isBn ? 'ফিল্টার' : 'Filters'}</span>
              </button>

              <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-xl px-3 py-1.5 shadow-2xs flex-1 md:flex-none">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#2d6a4f] shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-xs font-medium text-stone-700 bg-transparent focus:outline-none cursor-pointer w-full"
                >
                  <option value="featured">{isBn ? 'জনপ্রিয় (ফিচার্ড)' : 'Featured'}</option>
                  <option value="price-low">{isBn ? 'দাম: কম থেকে বেশি' : 'Price: Low to High'}</option>
                  <option value="price-high">{isBn ? 'দাম: বেশি থেকে কম' : 'Price: High to Low'}</option>
                  <option value="rating">{isBn ? 'সর্বোচ্চ রেটিং' : 'Customer Rating'}</option>
                </select>
              </div>

              {(activeCategory !== 'All' ||
                searchQuery ||
                selectedLight !== 'All' ||
                selectedCare !== 'All' ||
                maxPriceFilter < 1000) && (
                <button
                  onClick={resetFilters}
                  className="p-2.5 bg-white border border-stone-200 hover:bg-stone-50 rounded-xl text-stone-500 hover:text-[#1b4332] transition-colors"
                  title={isBn ? 'ফিল্টার রিসেট করুন' : 'Reset filters'}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Interactive Category Tabs (Complies with Zero-Pill Filter Tabs rule) */}
          <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeCategory === 'All'
                  ? 'bg-[#1b4332] text-white shadow-2xs font-semibold'
                  : 'bg-white text-stone-600 border border-stone-200 hover:text-stone-900'
              }`}
            >
              {isBn ? 'সকল গাছ' : 'All Plants'} ({products.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activeCategory === cat
                    ? 'bg-[#1b4332] text-white shadow-2xs font-semibold'
                    : 'bg-white text-stone-600 border border-stone-200 hover:text-stone-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content Layout with Sidebar Filters */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Desktop & Mobile Filters Sidebar */}
          <aside
            className={`md:col-span-3 space-y-6 bg-white p-5 rounded-2xl border border-stone-200/80 shadow-2xs ${
              showMobileFilters ? 'block' : 'hidden md:block'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1b4332]">
                {isBn ? 'ফিল্টারসমূহ' : 'Refine Selection'}
              </span>
              <button
                onClick={resetFilters}
                className="text-[11px] font-semibold text-[#2d6a4f] hover:underline"
              >
                {isBn ? 'সব রিসেট' : 'Reset All'}
              </button>
            </div>

            {/* Price Filter Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-stone-700">
                  {isBn ? 'সর্বোচ্চ বাজেট:' : 'Max Budget:'}
                </span>
                <span className="font-bold text-[#1b4332] tabular-nums">৳{maxPriceFilter}</span>
              </div>
              <input
                type="range"
                min="300"
                max="1000"
                step="50"
                value={maxPriceFilter}
                onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                className="w-full accent-[#2d6a4f] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 tabular-nums">
                <span>৳৩০০</span>
                <span>৳১,০০০</span>
              </div>
            </div>

            {/* Light Requirement Filter */}
            <div className="space-y-2 pt-3 border-t border-stone-100">
              <span className="text-xs font-bold text-stone-800 block">
                {isBn ? 'আলোর প্রয়োজনীয়তা:' : 'Light Requirement:'}
              </span>
              <div className="space-y-1 text-xs">
                {['All', 'Low Light', 'Bright Indirect', 'Direct Sunlight'].map((light) => (
                  <label
                    key={light}
                    className="flex items-center gap-2 cursor-pointer text-stone-600 hover:text-stone-900"
                  >
                    <input
                      type="radio"
                      name="light-filter"
                      checked={selectedLight === light}
                      onChange={() => setSelectedLight(light)}
                      className="accent-[#2d6a4f]"
                    />
                    <span>
                      {light === 'All'
                        ? isBn
                          ? 'সব ধরনের আলো'
                          : 'Any Light'
                        : light === 'Low Light'
                        ? isBn
                          ? 'কম আলো (অফিস বা এসি রুম)'
                          : 'Low Light (AC Room)'
                        : light === 'Bright Indirect'
                        ? isBn
                          ? 'উজ্জ্বল পরোক্ষ আলো'
                          : 'Bright Indirect'
                        : isBn
                        ? 'সরাসরি রোদ'
                        : 'Direct Sunlight'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Care Difficulty Filter */}
            <div className="space-y-2 pt-3 border-t border-stone-100">
              <span className="text-xs font-bold text-stone-800 block">
                {isBn ? 'যত্নের মাত্রা:' : 'Ease of Care:'}
              </span>
              <div className="space-y-1 text-xs">
                {['All', 'Beginner-friendly', 'Easy', 'Moderate'].map((care) => (
                  <label
                    key={care}
                    className="flex items-center gap-2 cursor-pointer text-stone-600 hover:text-stone-900"
                  >
                    <input
                      type="radio"
                      name="care-filter"
                      checked={selectedCare === care}
                      onChange={() => setSelectedCare(care)}
                      className="accent-[#2d6a4f]"
                    />
                    <span>
                      {care === 'All'
                        ? isBn
                          ? 'সব লেভেল'
                          : 'All Levels'
                        : care === 'Beginner-friendly'
                        ? isBn
                          ? 'নতুনদের জন্য আদর্শ (ভুলে গেলেও বাঁচে)'
                          : 'Beginner-friendly'
                        : care === 'Easy'
                        ? isBn
                          ? 'সহজ যত্ন'
                          : 'Easy Care'
                        : isBn
                        ? 'মাঝারি যত্ন'
                        : 'Moderate'}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="md:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-stone-200">
                <div className="w-16 h-16 rounded-full bg-[#d8f3dc] flex items-center justify-center text-[#2d6a4f] mx-auto mb-3">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1b4332]">
                  {isBn ? 'কোনো গাছ খুঁজে পাওয়া যায়নি' : 'No plants match your criteria'}
                </h3>
                <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                  {isBn
                    ? 'অনুগ্রহ করে ফিল্টার পরিবর্তন করুন বা রিসেট করে সব গাছ দেখুন।'
                    : 'Try clearing the search term or adjusting your budget slider to see all plants.'}
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 bg-[#2d6a4f] hover:bg-[#1b4332] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
                >
                  {isBn ? 'ফিল্টার রিসেট করুন' : 'Reset Filters'}
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5.5">
                  {displayedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination / Load More Button */}
                {displayedProducts.length < filteredProducts.length && (
                  <div className="mt-10 text-center">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 6)}
                      className="bg-white hover:bg-[#d8f3dc]/40 border border-stone-300 text-[#1b4332] font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-all shadow-2xs"
                    >
                      {isBn ? 'আরও গাছ দেখুন (লোড মোর)' : 'Load More Plants'}
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
