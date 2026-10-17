import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PageView } from '../types';
import {
  ShoppingBag,
  Heart,
  Menu,
  X,
  Search,
  LayoutDashboard,
  Sprout,
  Truck,
  BookOpen,
  Info,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    language,
    toggleLanguage,
    page,
    setPage,
    cartItemCount,
    setIsCartDrawerOpen,
    wishlist,
    setSearchQuery,
    setActiveCategory,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navSearchOpen, setNavSearchOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');

  const isBn = language === 'bn';

  const handleNavClick = (targetPage: PageView) => {
    setPage(targetPage);
    setMobileMenuOpen(false);
    setNavSearchOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch.trim());
      setActiveCategory('All');
      setPage('shop');
      setNavSearchOpen(false);
    }
  };

  return (
    <>
      {/* Slim Top Bar Announcement */}
      <div className="bg-[#1b4332] text-[#d8f3dc] text-xs py-1.5 px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="max-w-[1720px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-medium">
              {isBn
                ? '🌿 ঢাকায় মাত্র ২৪-৪৮ ঘণ্টায় হোম ডেলিভারি (৳৬০) | ১০০% প্ল্যান্ট ট্রানজিট গ্যারান্টি'
                : '🌿 Express 24-48h Delivery in Dhaka (৳60) | 100% Plant Transit Guarantee'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <button
              onClick={() => handleNavClick('admin')}
              className={`hover:text-white transition-colors flex items-center gap-1 ${
                page === 'admin' ? 'text-[#74c69d] font-semibold' : ''
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>{isBn ? 'মক অ্যাডমিন' : 'Mock Admin'}</span>
            </button>
            <span className="text-[#52b788]/60">|</span>
            <button
              onClick={toggleLanguage}
              className="hover:text-white transition-colors font-semibold px-2.5 py-0.5 rounded-lg text-xs bg-[#2d6a4f] hover:bg-[#40916c] flex items-center gap-1 cursor-pointer"
              title="Switch Language / ভাষা পরিবর্তন করুন"
            >
              <span className="text-[11px]">🌐</span>
              <span>{isBn ? 'English' : 'বাংলা'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - Strictly follows Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#faf9f5]/95 backdrop-blur-md border-b border-[#2d6a4f]/10 shadow-[0_2px_12px_rgba(27,67,50,0.04)]">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 h-18 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element Brand Wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left text-[#1b4332] group shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-[#2d6a4f] text-[#d8f3dc] flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm">
              <Sprout className="w-5 h-5 text-[#74c69d]" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#1b4332] block leading-none">
                {isBn ? 'GreenDesk' : 'GreenDesk'}
              </span>
              <span className="text-[11px] font-medium text-[#40916c] tracking-wider uppercase block mt-0.5">
                {isBn ? 'ডেস্ক প্ল্যান্টস বিডি' : 'Desk Plants & Greenery'}
              </span>
            </div>
          </button>

          {/* Zone 2: 4-5 single-line text links */}
          <nav className="hidden md:flex items-center gap-13 text-md font-medium text-[#2d6a4f]/90">
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-[#1b4332] transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                page === 'home' ? 'text-[#1b4332] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#2d6a4f]' : ''
              }`}
            >
              {isBn ? 'হোম' : 'Home'}
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className={`hover:text-[#1b4332] transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                page === 'shop' ? 'text-[#1b4332] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#2d6a4f]' : ''
              }`}
            >
              {isBn ? 'শপ' : 'Shop'}
            </button>
            <button
              onClick={() => handleNavClick('care-tips')}
              className={`hover:text-[#1b4332] transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                page === 'care-tips' ? 'text-[#1b4332] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#2d6a4f]' : ''
              }`}
            >
              {isBn ? 'যত্নের টিপস' : 'Care Tips'}
            </button>
            <button
              onClick={() => handleNavClick('tracking')}
              className={`hover:text-[#1b4332] transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                page === 'tracking' ? 'text-[#1b4332] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#2d6a4f]' : ''
              }`}
            >
              {isBn ? 'ট্র্যাক অর্ডার' : 'Track Order'}
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`hover:text-[#1b4332] transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                page === 'about' ? 'text-[#1b4332] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#2d6a4f]' : ''
              }`}
            >
              {isBn ? 'আমাদের কথা' : 'About Us'}
            </button>
          </nav>

          {/* Zone 3: Primary Action & Essential Utilities */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Nav Search Toggle */}
            <div className="relative">
              {navSearchOpen ? (
                <form
                  onSubmit={handleSearchSubmit}
                  className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center bg-white border border-[#2d6a4f]/30 rounded-lg shadow-md px-2.5 py-1 z-50 w-56 sm:w-64"
                >
                  <Search className="w-4 h-4 text-[#40916c] shrink-0 mr-2" />
                  <input
                    type="text"
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    placeholder={isBn ? 'গাছ বা ক্যাটাগরি খুঁজুন...' : 'Search desk plants...'}
                    className="w-full text-xs text-[#1b4332] bg-transparent outline-none"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setNavSearchOpen(false)}
                    className="text-gray-400 hover:text-gray-600 ml-1 p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setNavSearchOpen(true)}
                  aria-label="Search catalog"
                  className="p-2 text-[#2d6a4f] hover:text-[#1b4332] hover:bg-[#d8f3dc]/50 rounded-lg transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => handleNavClick('shop')}
              aria-label="View Wishlist"
              className="relative p-2 text-[#2d6a4f] hover:text-[#1b4332] hover:bg-[#d8f3dc]/50 rounded-lg transition-colors"
              title={isBn ? 'উইশলিস্ট' : 'Wishlist'}
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#c86d51] text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Primary Action: Shopping Cart Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="flex items-center gap-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white px-3.5 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all shadow-sm active:scale-95 whitespace-nowrap shrink-0"
              aria-label="Open Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#74c69d]" />
              <span className="hidden sm:inline">{isBn ? 'কার্ট' : 'Cart'}</span>
              <span className="bg-[#1b4332] text-[#d8f3dc] px-1.5 py-0.5 rounded-full text-xs font-bold tabular-nums">
                {cartItemCount}
              </span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#1b4332] hover:bg-[#d8f3dc]/40 rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#faf9f5] border-b border-[#2d6a4f]/15 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-3 ${
                page === 'home' ? 'bg-[#d8f3dc] text-[#1b4332] font-semibold' : 'text-[#2d6a4f]'
              }`}
            >
              <Sprout className="w-4 h-4" />
              {isBn ? 'হোম পেইজ' : 'Home'}
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-3 ${
                page === 'shop' ? 'bg-[#d8f3dc] text-[#1b4332] font-semibold' : 'text-[#2d6a4f]'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              {isBn ? 'সকল ডেস্ক প্ল্যান্ট (শপ)' : 'Shop Desk Plants'}
            </button>
            <button
              onClick={() => handleNavClick('care-tips')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-3 ${
                page === 'care-tips' ? 'bg-[#d8f3dc] text-[#1b4332] font-semibold' : 'text-[#2d6a4f]'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              {isBn ? 'গাছের যত্নের নিয়ম' : 'Plant Care Tips'}
            </button>
            <button
              onClick={() => handleNavClick('tracking')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-3 ${
                page === 'tracking' ? 'bg-[#d8f3dc] text-[#1b4332] font-semibold' : 'text-[#2d6a4f]'
              }`}
            >
              <Truck className="w-4 h-4" />
              {isBn ? 'অর্ডার ট্র্যাকিং' : 'Track My Order'}
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-3 ${
                page === 'about' ? 'bg-[#d8f3dc] text-[#1b4332] font-semibold' : 'text-[#2d6a4f]'
              }`}
            >
              <Info className="w-4 h-4" />
              {isBn ? 'আমাদের সম্পর্কে' : 'About Us'}
            </button>
            <div className="pt-2 border-t border-[#2d6a4f]/10 flex items-center justify-between">
              <button
                onClick={() => handleNavClick('admin')}
                className="text-xs font-semibold text-[#2d6a4f] flex items-center gap-1.5 py-2 px-3 rounded-lg hover:bg-[#d8f3dc]/40"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>{isBn ? 'অ্যাডমিন ড্যাশবোর্ড' : 'Admin Dashboard'}</span>
              </button>
              <button
                onClick={toggleLanguage}
                className="text-xs font-medium bg-[#2d6a4f] text-white px-3 py-1.5 rounded-lg"
              >
                {isBn ? 'English Mode' : 'বাংলা সংস্করণ'}
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
