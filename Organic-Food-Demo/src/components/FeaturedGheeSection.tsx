import React, { useState } from 'react';
import { Product, ProductVariant, CartItem } from '../data/products';
import {
  ShieldCheck,
  Star,
  Check,
  Plus,
  Minus,
  ShoppingBag,
  Zap,
  MessageCircle,
  Truck,
  Droplets,
  Award,
  Sparkles,
  Flame,
  Heart,
} from 'lucide-react';

interface FeaturedGheeSectionProps {
  products: Product[];
  onAddToCart: (item: CartItem) => void;
  onInstantBuy: (item: CartItem) => void;
  wishlistIds?: string[];
  onToggleWishlist?: (productId: string) => void;
  theme?: 'light' | 'dark';
}

export const FeaturedGheeSection: React.FC<FeaturedGheeSectionProps> = ({
  products,
  onAddToCart,
  onInstantBuy,
  wishlistIds = [],
  onToggleWishlist,
  theme = 'light',
}) => {
  const isDark = theme === 'dark';
  const gheeProducts = products.filter((p) => p.category === 'desi-ghee');
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const activeProduct = gheeProducts[selectedProductIndex] || gheeProducts[0];

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    activeProduct.variants.find((v) => v.id.includes('1kg')) || activeProduct.variants[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'nutrition' | 'purity'>('benefits');

  const handleSwitchProduct = (index: number) => {
    setSelectedProductIndex(index);
    const newProduct = gheeProducts[index];
    const defaultVariant = newProduct.variants.find((v) => v.id.includes('1kg')) || newProduct.variants[0];
    setSelectedVariant(defaultVariant);
    setQuantity(1);
  };

  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant);
  };

  const handleAdd = () => {
    onAddToCart({
      productId: activeProduct.id,
      productName: activeProduct.name,
      productNameUrdu: activeProduct.nameUrdu,
      variantId: selectedVariant.id,
      weight: selectedVariant.weight,
      weightUrdu: selectedVariant.weightUrdu,
      price: selectedVariant.price,
      image: activeProduct.image,
      quantity,
    });
  };

  const handleBuyNow = () => {
    onInstantBuy({
      productId: activeProduct.id,
      productName: activeProduct.name,
      productNameUrdu: activeProduct.nameUrdu,
      variantId: selectedVariant.id,
      weight: selectedVariant.weight,
      weightUrdu: selectedVariant.weightUrdu,
      price: selectedVariant.price,
      image: activeProduct.image,
      quantity,
    });
  };

  return (
    <section
      id="desi-ghee-flagship"
      className={`py-8 sm:py-20 border-b scroll-mt-20 relative transition-colors duration-300 w-full ${
        isDark ? 'bg-[#0B1A15] border-[#D4A359]/25 text-[#FBF9F4]' : 'bg-[#FFFFFF] border-[#EBE6DC] text-[#0F2F24]'
      }`}
    >
      <div id={`product-${activeProduct.id}`} className="scroll-mt-24" />
      <div id="product-khaas-cow-desi-ghee" className="scroll-mt-24" />
      <div id="product-khaas-buffalo-desi-ghee" className="scroll-mt-24" />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-12">
          <div
            className={`inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full text-[9.5px] sm:text-xs font-bold uppercase tracking-widest mb-2 sm:mb-3 border ${
              isDark
                ? 'bg-[#12241E] text-[#E8C882] border-[#D4A359]/30'
                : 'bg-[#0F2F24]/5 text-[#0F2F24] border-[#0F2F24]/15'
            }`}
          >
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4A359]" />
            <span>Pure Artisanal Dairy</span>
          </div>
          <h2 className="font-display text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Handcrafted Pure Desi Ghee
          </h2>
          <p className={`mt-1.5 sm:mt-2 text-[11.5px] sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-[#4A5D54]'}`}>
            Cultured from whole probiotic dahi and slowly churned in clay pots. Select your preferred variety:
          </p>

          {/* Clean Segmented Control */}
          <div
            className={`mt-3.5 sm:mt-6 w-full sm:w-auto grid grid-cols-2 sm:inline-flex p-1 rounded-xl border shadow-xs ${
              isDark ? 'bg-[#12241E] border-[#D4A359]/30' : 'bg-[#FBF9F4] border-[#EBE6DC]'
            }`}
          >
            {gheeProducts.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => handleSwitchProduct(idx)}
                className={`px-3 sm:px-7 py-1.5 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                  selectedProductIndex === idx
                    ? 'bg-[#0F2F24] text-[#E8C882] shadow-sm border border-[#D4A359]/40'
                    : isDark
                    ? 'text-slate-300 hover:text-white'
                    : 'text-[#4A5D54] hover:text-[#0F2F24]'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Robust 2-Column Responsive Layout (NO squishing ever) */}
        <div
          className={`p-3 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border shadow-sm transition-all w-full ${
            isDark ? 'bg-[#12241E] border-[#D4A359]/30' : 'bg-[#FBF9F4] border-[#EBE6DC]'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start w-full">
            {/* Left Column: Image Showcase & Tasting Notes */}
            <div className="w-full space-y-3.5 sm:space-y-5">
              <div
                className={`relative rounded-2xl overflow-hidden border shadow-sm aspect-[4/3] sm:aspect-square max-h-[220px] sm:max-h-none flex items-center justify-center p-2 w-full ${
                  isDark ? 'bg-[#0B1A15] border-white/10' : 'bg-white border-[#EBE6DC]'
                }`}
              >
                <img
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  className="w-full h-full object-cover rounded-xl transition-transform duration-500 hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Bestseller Badge */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#0F2F24] text-[#E8C882] text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg shadow-sm border border-[#D4A359]/40">
                  Masterpiece
                </div>

                {/* Purity Seal */}
                <div
                  className={`absolute bottom-3 right-3 sm:bottom-4 sm:right-4 backdrop-blur-md border px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl text-[10px] sm:text-xs font-bold flex items-center gap-1 sm:gap-1.5 shadow-sm ${
                    isDark
                      ? 'bg-[#0B1A15]/90 border-[#1D8354]/60 text-white'
                      : 'bg-white/95 border-[#1D8354]/40 text-[#0F2F24]'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1D8354]" />
                  <span>100% Pure Curd Churned</span>
                </div>
              </div>

              {/* Tasting Notes (clean & proportional) */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full">
                <div
                  className={`p-2.5 sm:p-3.5 rounded-xl border text-center shadow-2xs ${
                    isDark ? 'bg-[#0B1A15] border-white/10' : 'bg-white border-[#EBE6DC]'
                  }`}
                >
                  <Droplets className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4A359] mx-auto mb-1" />
                  <p className="text-[11px] sm:text-xs font-bold">Danedar</p>
                  <p className="text-[9.5px] sm:text-[11px] text-slate-400">100% Grainy</p>
                </div>
                <div
                  className={`p-2.5 sm:p-3.5 rounded-xl border text-center shadow-2xs ${
                    isDark ? 'bg-[#0B1A15] border-white/10' : 'bg-white border-[#EBE6DC]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1D8354] mx-auto mb-1" />
                  <p className="text-[11px] sm:text-xs font-bold">Nutty Aroma</p>
                  <p className="text-[9.5px] sm:text-[11px] text-slate-400">Natural Curd</p>
                </div>
                <div
                  className={`p-2.5 sm:p-3.5 rounded-xl border text-center shadow-2xs ${
                    isDark ? 'bg-[#0B1A15] border-white/10' : 'bg-white border-[#EBE6DC]'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C85A32] mx-auto mb-1" />
                  <p className="text-[11px] sm:text-xs font-bold">250°C Smoke</p>
                  <p className="text-[9.5px] sm:text-[11px] text-slate-400">High Heat</p>
                </div>
              </div>
            </div>

            {/* Right Column: Complete Purchase Module (Spacious & Clean) */}
            <div
              className={`p-4 sm:p-8 rounded-2xl border shadow-xs w-full flex flex-col justify-between ${
                isDark ? 'bg-[#0B1A15] border-white/10' : 'bg-white border-[#EBE6DC]'
              }`}
            >
              <div>
                {/* Rating */}
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                  <div className="flex text-[#D4A359]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#D4A359]" />
                    ))}
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold">{activeProduct.rating} / 5.0</span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-[11px] sm:text-xs text-slate-400 font-medium">
                    {activeProduct.reviewsCount} verified reviews
                  </span>
                </div>

                {/* Title */}
                <h1 className="font-display text-xl sm:text-3xl font-extrabold mb-1">
                  {activeProduct.name}
                </h1>
                <p className={`text-[11.5px] sm:text-sm mb-3.5 sm:mb-5 ${isDark ? 'text-slate-300' : 'text-[#4A5D54]'}`}>
                  {activeProduct.tagline}
                </p>

                {/* Live Pricing Ribbon */}
                <div
                  className={`flex items-baseline justify-between p-3 sm:p-4 rounded-xl border mb-4 sm:mb-6 ${
                    isDark
                      ? 'bg-[#183129] border-[#D4A359]/30'
                      : 'bg-[#F5EFE3] border-[#D4A359]/40'
                  }`}
                >
                  <div>
                    <span className="text-[9px] sm:text-[10px] text-[#D4A359] uppercase font-bold block">
                      Total Price:
                    </span>
                    <span
                      className={`text-xl sm:text-3xl font-extrabold tabular-nums font-display ${
                        isDark ? 'text-[#E8C882]' : 'text-[#0F2F24]'
                      }`}
                    >
                      Rs. {(selectedVariant.price * quantity).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] sm:text-xs text-slate-400 line-through tabular-nums block">
                      Rs. {(selectedVariant.originalPrice * quantity).toLocaleString()}
                    </span>
                    <span className="inline-block text-[10px] sm:text-[11px] font-bold text-white bg-[#C85A32] px-2 py-0.5 rounded-md mt-0.5 shadow-2xs">
                      Save Rs. {(selectedVariant.originalPrice - selectedVariant.price) * quantity}
                    </span>
                  </div>
                </div>

                {/* Jar Size Selection - FIXED RESPONSIVE GRID */}
                <div className="mb-4 sm:mb-6 w-full">
                  <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                    <label className="text-[10.5px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                      Select Jar Size / Weight:
                    </label>
                    <span className="text-xs font-bold text-[#D4A359]">
                      {selectedVariant.weight}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full">
                    {activeProduct.variants.map((v) => {
                      const isSelected = selectedVariant.id === v.id;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => handleVariantChange(v)}
                          className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#D4A359] bg-[#D4A359]/15 text-[#D4A359] font-bold ring-1 ring-[#D4A359]'
                              : isDark
                              ? 'border-white/10 bg-[#12241E] text-slate-300 hover:border-white/30'
                              : 'border-[#EBE6DC] hover:border-slate-300 bg-[#FBF9F4] text-[#2C3E35]'
                          }`}
                        >
                          <span className="block text-[11px] sm:text-xs font-bold truncate">
                            {v.weight.split(' ')[0]} {v.weight.split(' ')[1] || ''}
                          </span>
                          <span className="block text-[10.5px] sm:text-xs text-slate-400 tabular-nums mt-0.5 font-medium">
                            Rs. {v.price.toLocaleString()}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity Stepper & Add to Cart */}
                <div className="flex flex-row items-center gap-2 sm:gap-3 mb-3 sm:mb-4 w-full">
                  <div
                    className={`flex items-center border rounded-xl p-1 shrink-0 ${
                      isDark ? 'bg-[#12241E] border-white/10' : 'bg-[#FBF9F4] border-[#EBE6DC]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1.5 sm:p-2 rounded-lg cursor-pointer hover:bg-black/5 dark:hover:bg-white/10"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                    <span className="w-9 sm:w-12 text-center text-xs sm:text-sm font-extrabold tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1.5 sm:p-2 rounded-lg cursor-pointer hover:bg-black/5 dark:hover:bg-white/10"
                    >
                      <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleAdd}
                    className={`btn-tactile flex-1 py-2.5 sm:py-3 px-3 sm:px-4 font-bold rounded-xl flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer text-xs sm:text-sm shadow-xs ${
                      isDark
                        ? 'bg-[#0F2F24] text-[#E8C882] border border-[#D4A359]/40 hover:bg-[#164233]'
                        : 'bg-[#0F2F24] text-white hover:bg-[#164233]'
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4A359]" />
                    <span>Add to Cart</span>
                  </button>

                  {onToggleWishlist && (
                    <button
                      type="button"
                      onClick={() => onToggleWishlist(activeProduct.id)}
                      className={`p-2.5 sm:p-3 rounded-xl border flex items-center justify-center cursor-pointer transition-colors shrink-0 ${
                        wishlistIds.includes(activeProduct.id)
                          ? 'border-rose-500/40 bg-rose-500/10 text-rose-500 shadow-xs'
                          : isDark
                          ? 'border-white/10 hover:border-rose-500/40 text-slate-400 hover:text-rose-500 bg-[#12241E]'
                          : 'border-[#EBE6DC] hover:border-rose-500/40 text-slate-400 hover:text-rose-500 bg-[#FBF9F4]'
                      }`}
                      title={wishlistIds.includes(activeProduct.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                      aria-label="Favorites"
                    >
                      <Heart
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${
                          wishlistIds.includes(activeProduct.id) ? 'fill-rose-500 text-rose-500' : ''
                        }`}
                      />
                    </button>
                  )}
                </div>

                {/* Primary Action Buttons (Instant Buy & WhatsApp) - 2 Column on Mobile */}
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-5 w-full">
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="btn-tactile w-full py-2.5 sm:py-3.5 px-2 sm:px-4 rounded-xl font-bold text-white text-[11px] sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer bg-[#C85A32] hover:bg-[#B54D27] shadow-xs"
                  >
                    <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
                    <span>Buy Now</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="btn-tactile w-full py-2.5 sm:py-3.5 px-2 sm:px-4 rounded-xl font-bold text-white text-[11px] sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer bg-[#1D8354] hover:bg-[#166E45] shadow-xs whitespace-nowrap"
                  >
                    <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white fill-white" />
                    <span>WhatsApp</span>
                  </button>
                </div>

                {/* Free Shipping Alert if under 6400 */}
                <div
                  className={`p-2.5 sm:p-3 rounded-xl border text-[11px] sm:text-xs flex items-center gap-2 mb-4 sm:mb-5 ${
                    isDark
                      ? 'bg-[#1D8354]/15 border-[#1D8354]/40 text-[#E8C882]'
                      : 'bg-[#F5EFE3] border-[#D4A359]/30 text-[#0F2F24]'
                  }`}
                >
                  <Truck className="w-4 h-4 text-[#D4A359] shrink-0" />
                  <span className="font-medium">
                    {selectedVariant.price * quantity >= 6400
                      ? 'Congratulations! This order qualifies for FREE Nationwide Delivery across Pakistan.'
                      : `Add Rs. ${(6400 - selectedVariant.price * quantity).toLocaleString()} more to unlock FREE Delivery.`}
                  </span>
                </div>
              </div>

              {/* Product Tabs */}
              <div className="border-t border-white/10 pt-4">
                <div className="flex items-center gap-5 text-xs font-bold mb-3 border-b border-white/10 pb-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('benefits')}
                    className={`pb-1 transition-colors cursor-pointer ${
                      activeTab === 'benefits'
                        ? 'text-[#D4A359] border-b-2 border-[#D4A359]'
                        : 'text-slate-400'
                    }`}
                  >
                    Benefits & Purity
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('nutrition')}
                    className={`pb-1 transition-colors cursor-pointer ${
                      activeTab === 'nutrition'
                        ? 'text-[#D4A359] border-b-2 border-[#D4A359]'
                        : 'text-slate-400'
                    }`}
                  >
                    Nutrition Facts
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('purity')}
                    className={`pb-1 transition-colors cursor-pointer ${
                      activeTab === 'purity'
                        ? 'text-[#D4A359] border-b-2 border-[#D4A359]'
                        : 'text-slate-400'
                    }`}
                  >
                    Quality Assurance
                  </button>
                </div>

                {activeTab === 'benefits' && (
                  <ul className="space-y-1.5 text-xs">
                    {activeProduct.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#1D8354] shrink-0" />
                        <span className={isDark ? 'text-slate-300' : 'text-[#4A5D54]'}>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === 'nutrition' && (
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className={`p-2 rounded-lg border ${isDark ? 'bg-[#12241E] border-white/10' : 'bg-[#FBF9F4] border-[#EBE6DC]'}`}>
                      <span className="text-slate-400 block text-[10px]">Calories:</span>
                      <span className="font-bold">{activeProduct.nutrition.calories}</span>
                    </div>
                    <div className={`p-2 rounded-lg border ${isDark ? 'bg-[#12241E] border-white/10' : 'bg-[#FBF9F4] border-[#EBE6DC]'}`}>
                      <span className="text-slate-400 block text-[10px]">Total Fat:</span>
                      <span className="font-bold">{activeProduct.nutrition.fat}</span>
                    </div>
                    <div className={`p-2 rounded-lg border ${isDark ? 'bg-[#12241E] border-white/10' : 'bg-[#FBF9F4] border-[#EBE6DC]'}`}>
                      <span className="text-slate-400 block text-[10px]">Carbs:</span>
                      <span className="font-bold">0g (Lactose Free)</span>
                    </div>
                    <div className={`p-2 rounded-lg border ${isDark ? 'bg-[#12241E] border-white/10' : 'bg-[#FBF9F4] border-[#EBE6DC]'}`}>
                      <span className="text-slate-400 block text-[10px]">Shelf Life:</span>
                      <span className="font-bold">{activeProduct.nutrition.shelfLife}</span>
                    </div>
                  </div>
                )}

                {activeTab === 'purity' && (
                  <div className={`text-xs space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-[#4A5D54]'}`}>
                    <p>• Punjab Food Authority (PFA) hygiene compliant facility.</p>
                    <p>• Packed in heavy glass jars with airtight seal.</p>
                    <p>• Store in a cool dry place. No refrigeration required.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
