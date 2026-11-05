import React, { useState } from 'react';
import { Product, ProductVariant, CartItem } from '../data/products';
import {
  X,
  Star,
  ShieldCheck,
  ShoppingBag,
  Zap,
  Check,
  MessageCircle,
  Heart,
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
  onInstantBuy: (item: CartItem) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onInstantBuy,
  isWishlisted = false,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    onAddToCart({
      productId: product.id,
      productName: product.name,
      productNameUrdu: product.nameUrdu,
      variantId: selectedVariant.id,
      weight: selectedVariant.weight,
      weightUrdu: selectedVariant.weightUrdu,
      price: selectedVariant.price,
      image: product.image,
      quantity,
    });
    onClose();
  };

  const handleBuy = () => {
    onInstantBuy({
      productId: product.id,
      productName: product.name,
      productNameUrdu: product.nameUrdu,
      variantId: selectedVariant.id,
      weight: selectedVariant.weight,
      weightUrdu: selectedVariant.weightUrdu,
      price: selectedVariant.price,
      image: product.image,
      quantity,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="relative bg-white w-full max-w-3xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-[#EBE6DC]">
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 flex items-center gap-1.5 sm:gap-2">
          {onToggleWishlist && (
            <button
              onClick={() => onToggleWishlist(product.id)}
              className="p-2 rounded-full bg-white/90 hover:bg-white text-gray-700 shadow-xs cursor-pointer transition-colors"
              title={isWishlisted ? 'Remove from Favorites' : 'Add to Favorites'}
              aria-label="Favorites"
            >
              <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-gray-600'}`} />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/90 hover:bg-white text-[#0F2F24] shadow-xs cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative bg-[#FBF9F4] flex items-center justify-center p-3 sm:p-4 min-h-[200px] sm:min-h-[300px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full max-h-[300px] sm:max-h-[420px] object-cover rounded-xl sm:rounded-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[#0F2F24] text-[11px] sm:text-xs font-bold shadow-xs flex items-center gap-1.5 border border-[#EBE6DC]">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1D8354]" />
              <span>100% Pure Organic Dairy</span>
            </div>
          </div>

          {/* Details Content */}
          <div className="p-4 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Rating */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-[#D4A359]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#D4A359]" />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#0F2F24]">{product.rating}</span>
                <span className="text-xs text-slate-400">({product.reviewsCount} reviews)</span>
              </div>

              <h2 className="font-display text-2xl font-bold text-[#0F2F24] mb-1">
                {product.name}
              </h2>
              <p className="text-xs text-[#4A5D54] mb-4">
                {product.tagline}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-2.5 mb-5 p-3 rounded-xl bg-[#F5EFE3] border border-[#D4A359]/30">
                <span className="text-2xl font-bold text-[#0F2F24] tabular-nums font-display">
                  Rs. {(selectedVariant.price * quantity).toLocaleString()}
                </span>
                <span className="text-xs text-slate-400 line-through tabular-nums">
                  Rs. {(selectedVariant.originalPrice * quantity).toLocaleString()}
                </span>
                <span className="text-xs font-semibold text-white bg-[#0F2F24] px-2 py-0.5 rounded ml-auto">
                  {selectedVariant.weight}
                </span>
              </div>

              {/* Variants */}
              <div className="mb-4">
                <label className="block text-xs font-bold text-[#0F2F24] uppercase tracking-wider mb-2">
                  Select Size / Variant:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`p-2 rounded-lg text-xs border text-center transition-all cursor-pointer ${
                        selectedVariant.id === v.id
                          ? 'border-[#0F2F24] bg-[#0F2F24]/10 text-[#0F2F24] font-bold'
                          : 'border-[#EBE6DC] text-[#3E5248] hover:border-slate-300'
                      }`}
                    >
                      <span className="block truncate">{v.weight}</span>
                      <span className="text-[11px] text-slate-400 tabular-nums">
                        Rs. {v.price.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-[#4A5D54] leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Highlights */}
              <div className="space-y-1.5 mb-6 text-xs text-[#0F2F24]">
                {product.highlights.slice(0, 3).map((h, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#1D8354] shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2 pt-4 border-t border-[#EBE6DC]">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleAdd}
                  className="btn-tactile py-3 px-3 bg-white hover:bg-[#FBF9F4] text-[#0F2F24] border border-[#EBE6DC] font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4 text-[#D4A359]" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={handleBuy}
                  className="btn-tactile py-3 px-3 bg-[#C85A32] hover:bg-[#B54D27] text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Zap className="w-4 h-4 text-[#E8C882] fill-[#E8C882]" />
                  <span>Buy Now</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleBuy}
                className="btn-tactile w-full py-2.5 px-3 bg-[#1D8354]/10 hover:bg-[#1D8354]/20 text-[#1D8354] border border-[#1D8354]/40 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#1D8354]" />
                <span>Order on WhatsApp (0304-4411896)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
