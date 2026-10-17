import React, { useState } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, Plus, Star, Sparkles, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    language,
    addToCart,
    navigateToProduct,
    isInWishlist,
    toggleWishlist,
    setIsCartDrawerOpen,
  } = useShop();

  const [currentImg, setCurrentImg] = useState(product.image);
  const [imgError, setImgError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  React.useEffect(() => {
    setCurrentImg(product.image);
    setImgError(false);
  }, [product.image]);

  const handleImgError = () => {
    if (currentImg !== '/images/hero_white_desk_aloe.jpg') {
      setCurrentImg('/images/hero_white_desk_aloe.jpg');
    } else {
      setImgError(true);
    }
  };

  const isBn = language === 'bn';
  const wishlisted = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.potVariants[0], 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => navigateToProduct(product)}
      className="group relative bg-white rounded-2xl border border-[#2d6a4f]/10 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex flex-col h-full"
    >
      {/* Visual Image Container - Takes ~65% of height */}
      <div className="relative aspect-4/3 w-full bg-[#f4f1ea] overflow-hidden">
        {!imgError ? (
          <img
            src={currentImg}
            alt={isBn ? product.nameBn : product.name}
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={handleImgError}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#d8f3dc] to-[#c3d9c7] text-[#1b4332] p-4 text-center">
            <Sparkles className="w-8 h-8 mb-2 opacity-60" />
            <span className="font-semibold text-xs">{isBn ? product.nameBn : product.name}</span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-md ${
            wishlisted
              ? 'bg-[#c86d51] text-white shadow-sm'
              : 'bg-white/85 text-stone-700 hover:bg-white hover:text-[#c86d51]'
          }`}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Out of Stock Subtle Overlay */}
        {product.stock <= 0 && (
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="text-white text-xs font-semibold px-3 py-1 bg-black/60 rounded-lg">
              {isBn ? 'স্টক শেষ' : 'Out of Stock'}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Unboxed Metadata (Zero-pill discipline) */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#2d6a4f]/70 font-medium mb-1">
            <span>{isBn ? product.categoryBn : product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{isBn ? product.lightBn : product.light}</span>
            <span aria-hidden="true">·</span>
            <span>{isBn ? product.careLevelBn : product.careLevel}</span>
          </div>

          {/* Product Name */}
          <h3 className="text-base font-semibold text-[#1b4332] group-hover:text-[#2d6a4f] transition-colors line-clamp-1">
            {isBn ? product.nameBn : product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1 text-xs text-stone-500">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-medium text-stone-700 tabular-nums">{product.rating}</span>
            <span className="text-[11px]">({product.reviewCount})</span>
          </div>
        </div>

        {/* Bottom Price & Quick CTA Bar */}
        <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-[#1b4332] tabular-nums">
                ৳{product.price}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-stone-400 line-through tabular-nums">
                  ৳{product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-stone-400 block leading-tight">
              {isBn ? 'টব সহ রেডি' : 'With planter pot'}
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={product.stock <= 0}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              justAdded
                ? 'bg-[#1b4332] text-white'
                : product.stock > 0
                ? 'bg-[#d8f3dc] hover:bg-[#2d6a4f] text-[#1b4332] hover:text-white'
                : 'bg-stone-100 text-stone-400 cursor-not-allowed'
            }`}
            aria-label="Add to Cart"
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{isBn ? 'যুক্ত হয়েছে' : 'Added'}</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>{isBn ? 'কার্টে নিন' : 'Add'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
