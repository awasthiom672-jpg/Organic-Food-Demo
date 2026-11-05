import React, { useState } from 'react';
import { Product, CartItem } from '../data/products';
import { ProductCard } from './ProductCard';
import { Sparkles } from 'lucide-react';

interface AllProductsSectionProps {
  products: Product[];
  onAddToCart: (item: CartItem) => void;
  onInstantBuy: (item: CartItem) => void;
  onViewDetails: (product: Product) => void;
  wishlistIds?: string[];
  onToggleWishlist?: (productId: string) => void;
  theme?: 'light' | 'dark';
}

export const AllProductsSection: React.FC<AllProductsSectionProps> = ({
  products,
  onAddToCart,
  onInstantBuy,
  onViewDetails,
  wishlistIds = [],
  onToggleWishlist,
  theme = 'light',
}) => {
  const isDark = theme === 'dark';
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Pure Dairy' },
    { id: 'desi-ghee', label: 'Pure Desi Ghee' },
    { id: 'butter', label: 'Pure Butter (Makhan)' },
    { id: 'honey', label: 'Pure Sidr Honey' },
    { id: 'sweets', label: 'Panjeeri & Khatai' },
  ];

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section
      id="all-products"
      className={`py-10 sm:py-20 border-b transition-colors duration-300 w-full ${
        isDark ? 'bg-[#081410] border-[#D4A359]/25 text-[#FBF9F4]' : 'bg-[#FBF9F4] border-[#EBE6DC] text-[#0F2F24]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-10 gap-4 sm:gap-6">
          <div>
            <div
              className={`inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1.5 sm:mb-2 ${
                isDark ? 'text-[#E8C882]' : 'text-[#D4A359]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4A359]" />
              <span>Artisanal Pantry Range</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight">
              Explore Our 100% Pure Pantry
            </h2>
            <p className={`mt-1.5 text-xs sm:text-sm max-w-xl ${isDark ? 'text-slate-300' : 'text-[#4A5D54]'}`}>
              Free from artificial chemicals, preservatives, and industrial vegetable oils. Pure health for the whole family.
            </p>
          </div>

          {/* Interactive Filter Tabs - Mobile Horizontal Scroll with clean styling */}
          <div
            className={`flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 border rounded-xl sm:rounded-2xl overflow-x-auto shrink-0 shadow-2xs max-w-full pb-1 sm:pb-1.5 scrollbar-none ${
              isDark ? 'bg-[#12241E] border-white/10' : 'bg-white border-[#EBE6DC]'
            }`}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold rounded-lg sm:rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#0F2F24] text-[#E8C882] shadow-sm border border-[#D4A359]/40'
                    : isDark
                    ? 'text-slate-300 hover:text-white hover:bg-white/10'
                    : 'text-[#4A5D54] hover:text-[#0F2F24] hover:bg-black/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Mobile Grid / 3-4 Column Desktop Grid (3 per row: 3, then 3, then 3...) */}
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-1.5 sm:gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onInstantBuy={onInstantBuy}
              onViewDetails={onViewDetails}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              theme={theme}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
