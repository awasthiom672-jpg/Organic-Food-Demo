import React, { useState } from 'react';
import { Product, ProductVariant, CartItem } from '../data/products';
import { Eye, Heart, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (item: CartItem) => void;
  onInstantBuy: (item: CartItem) => void;
  onViewDetails: (product: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
  theme?: 'light' | 'dark';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onInstantBuy,
  onViewDetails,
  isWishlisted = false,
  onToggleWishlist,
  theme = 'light',
}) => {
  const isDark = theme === 'dark';
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [isAdded, setIsAdded] = useState(false);
  const [showSizePicker, setShowSizePicker] = useState(false);

  const handleAdd = (variant?: ProductVariant) => {
    const v = variant || selectedVariant;
    onAddToCart({
      productId: product.id,
      productName: product.name,
      productNameUrdu: product.nameUrdu,
      variantId: v.id,
      weight: v.weight,
      weightUrdu: v.weightUrdu,
      price: v.price,
      image: product.image,
      quantity: 1,
    });
    setIsAdded(true);
    setShowSizePicker(false);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div
      id={`product-${product.id}`}
      className={`group border transition-all duration-300 flex flex-col justify-between overflow-hidden relative ${
        isDark
          ? 'bg-[#12241E] border-white/10 hover:border-[#D4A359]/50 shadow-sm'
          : 'bg-white border-gray-200 hover:border-gray-400 shadow-xs'
      }`}
    >
      {/* 1. Image Area with Clean Background & Icons */}
      <div
        className="relative aspect-square w-full bg-white flex items-center justify-center p-1.5 sm:p-5 overflow-hidden cursor-pointer"
        onClick={() => onViewDetails(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Top-Left: Green 'Sale' Badge */}
        <div className="absolute top-1 sm:top-2 left-1 sm:left-2 bg-[#2D8A4E] text-white text-[8px] sm:text-[11px] font-bold px-1 sm:px-2 py-0.2 sm:py-0.5 tracking-wide shadow-xs">
          Sale
        </div>

        {/* Top-Right: Wishlist Heart & Quick View Eye Icons */}
        <div className="absolute top-1 sm:top-2 right-1 sm:right-2 flex flex-col gap-1 sm:gap-1.5 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist?.(product.id);
            }}
            className={`p-1 sm:p-1.5 rounded-full transition-colors cursor-pointer ${
              isWishlisted
                ? 'text-rose-500 bg-white/95 shadow-xs scale-105'
                : 'text-gray-700 hover:text-rose-500 bg-white/85 hover:bg-white shadow-2xs'
            }`}
            title={isWishlisted ? 'Remove from Favorites' : 'Add to Favorites'}
            aria-label="Favorites"
          >
            <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="p-1 sm:p-1.5 rounded-full text-gray-700 hover:text-[#0F2F24] bg-white/85 hover:bg-white shadow-2xs transition-colors cursor-pointer"
            title="Quick View"
            aria-label="Quick View"
          >
            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* 2. Full-Width QUICK ADD Button (Directly Below Image) */}
      <div className="relative">
        <button
          onClick={() => {
            if (product.variants.length > 1 && !showSizePicker) {
              setShowSizePicker(true);
            } else {
              handleAdd();
            }
          }}
          className={`w-full border-t border-b border-black dark:border-white/30 text-black dark:text-white py-1.5 sm:py-2.5 px-1 text-[10px] sm:text-xs md:text-sm font-bold tracking-tight sm:tracking-wider uppercase transition-colors flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer ${
            isAdded
              ? 'bg-[#2D8A4E] text-white border-[#2D8A4E]'
              : 'bg-white dark:bg-[#0B1A15] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Added</span>
            </>
          ) : (
            <span>Quick Add</span>
          )}
        </button>

        {/* Quick Size Dropdown Popover */}
        {showSizePicker && (
          <div className="absolute top-full left-0 right-0 z-20 bg-white dark:bg-[#0B1A15] border border-black dark:border-white/30 shadow-lg p-1.5 sm:p-2 flex flex-col gap-1 sm:gap-1.5 animate-in fade-in slide-in-from-top-1">
            <div className="text-[9px] sm:text-[10px] text-gray-500 font-bold uppercase tracking-wider text-center">
              Select Size:
            </div>
            <div className="grid grid-cols-2 gap-1 sm:gap-1.5">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => {
                    setSelectedVariant(v);
                    handleAdd(v);
                  }}
                  className="py-1 sm:py-1.5 px-1 sm:px-2 text-[9.5px] sm:text-[11px] font-bold border border-gray-300 dark:border-white/20 hover:border-black dark:hover:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors rounded-none text-center cursor-pointer"
                >
                  <div>{v.weight.includes('1 Kg') || v.weight.includes('1 Kilogram') ? '1 Kg' : '500g'}</div>
                  <div className="text-[8.5px] sm:text-[9.5px] text-[#2D8A4E] font-semibold">Rs.{v.price.toLocaleString()}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3. Product Details - Centered Alignment (Matching Reference Screenshot) */}
      <div className="p-1.5 sm:p-3.5 flex-1 flex flex-col justify-between text-center">
        <div>
          {/* Brand Name */}
          <div className="text-[9px] sm:text-xs text-gray-400 dark:text-gray-400 font-semibold uppercase tracking-wider mb-0.5 sm:mb-1">
            Zubair Organic
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onViewDetails(product)}
            className={`font-bold text-[10px] sm:text-xs md:text-sm text-center leading-snug line-clamp-2 min-h-[26px] sm:min-h-[38px] cursor-pointer hover:text-[#D4A359] transition-colors px-0.5 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            {product.name}
          </h3>

          {/* Size Pills to Toggle Price Live */}
          <div className="flex items-center justify-center gap-1 sm:gap-1.5 my-1 sm:my-1.5">
            {product.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVariant(v)}
                className={`text-[8px] sm:text-[10px] px-1 sm:px-2 py-0.5 border font-semibold transition-colors cursor-pointer ${
                  selectedVariant.id === v.id
                    ? isDark
                      ? 'border-[#E8C882] bg-[#E8C882]/20 text-[#E8C882]'
                      : 'border-black bg-black text-white'
                    : isDark
                    ? 'border-white/10 text-gray-400 hover:border-white/30'
                    : 'border-gray-200 text-gray-600 hover:border-gray-400'
                }`}
              >
                {v.weight.includes('1 Kg') || v.weight.includes('1 Kilogram') ? '1 Kg' : '500g'}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Price Block */}
        <div className="mt-0.5 sm:mt-1 pt-1 sm:pt-1.5 border-t border-gray-100 dark:border-white/10 flex flex-col items-center">
          {/* Strikethrough Price */}
          <div className="text-[9.5px] sm:text-xs md:text-sm text-gray-800 dark:text-gray-400 line-through font-bold tabular-nums">
            Rs.{selectedVariant.originalPrice.toLocaleString()}.00
          </div>

          {/* Active Selling Price in Green */}
          <div className="text-[10px] sm:text-xs md:text-sm font-semibold text-[#2D8A4E] dark:text-[#4ade80] tabular-nums flex items-center justify-center gap-0.5 sm:gap-1 mt-0.5">
            <span className="text-gray-400 text-[8.5px] sm:text-[11px] font-normal">From</span>
            <span className="font-bold">Rs.{selectedVariant.price.toLocaleString()}.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};
