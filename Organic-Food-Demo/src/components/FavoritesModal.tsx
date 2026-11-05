import React from 'react';
import { PRODUCTS, Product, CartItem } from '../data/products';
import {
  X,
  Heart,
  ShoppingBag,
  Zap,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Eye,
  MessageCircle,
} from 'lucide-react';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (item: CartItem) => void;
  onInstantBuy: (item: CartItem) => void;
  onViewDetails: (product: Product) => void;
  theme?: 'light' | 'dark';
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onInstantBuy,
  onViewDetails,
  theme = 'light',
}) => {
  if (!isOpen) return null;

  const isDark = theme === 'dark';
  const favoriteProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  const handleQuickAdd = (product: Product) => {
    const defaultVariant = product.variants[0];
    onAddToCart({
      productId: product.id,
      productName: product.name,
      productNameUrdu: product.nameUrdu,
      variantId: defaultVariant.id,
      weight: defaultVariant.weight,
      weightUrdu: defaultVariant.weightUrdu,
      price: defaultVariant.price,
      image: product.image,
      quantity: 1,
    });
  };

  const handleQuickBuy = (product: Product) => {
    const defaultVariant = product.variants[0];
    onInstantBuy({
      productId: product.id,
      productName: product.name,
      productNameUrdu: product.nameUrdu,
      variantId: defaultVariant.id,
      weight: defaultVariant.weight,
      weightUrdu: defaultVariant.weightUrdu,
      price: defaultVariant.price,
      image: product.image,
      quantity: 1,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border flex flex-col max-h-[90vh] ${
          isDark
            ? 'bg-[#0B1A15] border-[#D4A359]/30 text-white'
            : 'bg-white border-[#EBE6DC] text-[#0F2F24]'
        }`}
      >
        {/* Header */}
        <div
          className={`px-4 sm:px-6 py-3.5 sm:py-4 border-b flex items-center justify-between shrink-0 ${
            isDark
              ? 'bg-[#060F0C] border-[#D4A359]/20'
              : 'bg-[#FBF9F4] border-[#EBE6DC]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 border border-rose-500/20">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-rose-500 text-rose-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-base sm:text-lg font-bold">My Favorites</h2>
                <span className="bg-rose-500/15 text-rose-600 dark:text-rose-400 font-extrabold text-[10px] sm:text-xs px-2 py-0.5 rounded-full border border-rose-500/20">
                  {favoriteProducts.length} {favoriteProducts.length === 1 ? 'Item' : 'Items'}
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-400">
                Pure organic products you have saved for later
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-full cursor-pointer transition-colors ${
              isDark
                ? 'hover:bg-white/10 text-slate-300'
                : 'hover:bg-slate-100 text-slate-500'
            }`}
            aria-label="Close Favorites"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-3 sm:p-6 overflow-y-auto space-y-3 sm:space-y-4 flex-1">
          {favoriteProducts.length === 0 ? (
            <div className="text-center py-12 sm:py-16 px-4 flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mb-4 border border-rose-500/20">
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-rose-400 stroke-[1.5]" />
              </div>
              <h3 className="font-display text-base sm:text-xl font-bold mb-1.5">
                No Favorite Products Yet
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">
                Tap the heart icon on any of our pure Desi Ghee or organic pantry items to save your favorites here.
              </p>
              <button
                onClick={() => {
                  onClose();
                  const el = document.getElementById('all-products');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-tactile px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#0F2F24] dark:bg-[#E8C882] text-white dark:text-[#060F0C] text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-white/10">
              {favoriteProducts.map((product) => {
                const defaultVariant = product.variants[0];
                return (
                  <div
                    key={product.id}
                    className="py-3 sm:py-4 first:pt-0 last:pb-0 flex items-center gap-3 sm:gap-4 group"
                  >
                    {/* Thumbnail Image */}
                    <div
                      onClick={() => {
                        onClose();
                        onViewDetails(product);
                      }}
                      className="w-16 h-16 sm:w-24 sm:h-24 bg-white rounded-xl sm:rounded-2xl border border-gray-200 dark:border-white/10 p-1.5 shrink-0 flex items-center justify-center cursor-pointer relative overflow-hidden"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-1 left-1 bg-[#2D8A4E] text-white text-[8px] font-bold px-1 rounded-xs">
                        Pure
                      </span>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-[#D4A359] font-bold mb-0.5">
                        <ShieldCheck className="w-3 h-3 shrink-0" />
                        <span>100% Organic &amp; Lab Tested</span>
                      </div>
                      <h4
                        onClick={() => {
                          onClose();
                          onViewDetails(product);
                        }}
                        className="font-bold text-xs sm:text-base leading-snug truncate hover:text-[#D4A359] cursor-pointer transition-colors"
                      >
                        {product.name}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-slate-400 truncate mt-0.5">
                        {product.tagline}
                      </p>

                      <div className="flex items-baseline gap-2 mt-1 sm:mt-1.5">
                        <span className="text-xs sm:text-base font-extrabold text-[#2D8A4E] dark:text-[#E8C882]">
                          Rs. {defaultVariant.price.toLocaleString()}
                        </span>
                        {defaultVariant.originalPrice > defaultVariant.price && (
                          <span className="text-[10px] sm:text-xs text-slate-400 line-through">
                            Rs. {defaultVariant.originalPrice.toLocaleString()}
                          </span>
                        )}
                        <span className="text-[9.5px] sm:text-xs text-slate-400">
                          ({defaultVariant.weight})
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1.5 sm:gap-2 shrink-0">
                      <button
                        onClick={() => handleQuickAdd(product)}
                        className={`p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all border ${
                          isDark
                            ? 'bg-[#183129] hover:bg-[#204238] text-[#E8C882] border-[#D4A359]/30'
                            : 'bg-[#0F2F24] hover:bg-[#164233] text-white border-transparent'
                        }`}
                        title="Add to Cart"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Add to Cart</span>
                      </button>

                      <button
                        onClick={() => handleQuickBuy(product)}
                        className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-bold bg-[#E8C882] hover:bg-[#DFBD73] text-[#060F0C] flex items-center gap-1 cursor-pointer transition-all shadow-xs"
                        title="Instant Buy"
                      >
                        <Zap className="w-3.5 h-3.5 fill-[#060F0C]" />
                        <span className="hidden sm:inline">Buy</span>
                      </button>

                      <button
                        onClick={() => onToggleWishlist(product.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 cursor-pointer transition-colors"
                        title="Remove from favorites"
                        aria-label="Remove"
                      >
                        <Trash2 className="w-4 h-4 text-rose-500" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {favoriteProducts.length > 0 && (
          <div
            className={`px-4 sm:px-6 py-3 sm:py-4 border-t flex flex-wrap items-center justify-between gap-3 shrink-0 ${
              isDark
                ? 'bg-[#060F0C] border-[#D4A359]/20'
                : 'bg-[#FBF9F4] border-[#EBE6DC]'
            }`}
          >
            <a
              href="https://wa.me/923044411896?text=Assalam%20o%20Alaikum%20Zubair%20Organic%20Foods%2C%20I%20want%20to%20order%20my%20Favorite%20Products"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1D8354] hover:underline"
            >
              <MessageCircle className="w-4 h-4 fill-[#1D8354] text-white" />
              <span>Order via WhatsApp (0304-4411896)</span>
            </a>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                  isDark
                    ? 'border-white/10 hover:bg-white/10 text-slate-300'
                    : 'border-slate-300 hover:bg-slate-100 text-slate-700'
                }`}
              >
                Close
              </button>
              <button
                onClick={() => {
                  favoriteProducts.forEach((p) => handleQuickAdd(p));
                  onClose();
                }}
                className="btn-tactile px-4 py-1.5 rounded-xl text-xs font-bold bg-[#0F2F24] dark:bg-[#E8C882] text-white dark:text-[#060F0C] flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add All to Cart</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
