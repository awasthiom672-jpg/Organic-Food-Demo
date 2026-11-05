import React, { useState } from 'react';
import { CartItem } from '../data/products';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Truck,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, variantId: string, newQty: number) => void;
  onRemoveItem: (productId: string, variantId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 6400;
  const rawSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = Math.round(rawSubtotal * appliedDiscount);
  const discountedSubtotal = rawSubtotal - discountAmount;
  const isFreeShipping = discountedSubtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = cartItems.length === 0 ? 0 : isFreeShipping ? 0 : 250;
  const grandTotal = discountedSubtotal + shippingFee;

  const progressPercent = Math.min(100, Math.round((discountedSubtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    if (code === 'ZUBAIR10' || code === 'ZOF10' || code === 'PURE10' || code === 'KHAAS10') {
      setAppliedDiscount(0.1);
      setCouponSuccess('10% Zubair Organic discount applied successfully!');
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try: ZUBAIR10');
      setCouponSuccess('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-[#EBE6DC] flex items-center justify-between bg-[#FBF9F4]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#D4A359]" />
              <h2 className="font-display text-lg font-bold text-[#0F2F24]">
                Your Shopping Cart
              </h2>
              <span className="text-xs text-slate-400 font-semibold">
                ({cartItems.reduce((a, b) => a + b.quantity, 0)})
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-[#0F2F24] rounded-lg hover:bg-black/5 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          {cartItems.length > 0 && (
            <div className="p-4 bg-[#F5EFE3] border-b border-[#D4A359]/30">
              <div className="flex items-center justify-between text-xs mb-1.5 font-semibold text-[#0F2F24]">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#D4A359]" />
                  {isFreeShipping
                    ? '🎉 You unlocked FREE Nationwide Delivery!'
                    : `Add Rs. ${(FREE_SHIPPING_THRESHOLD - discountedSubtotal).toLocaleString()} more for FREE Delivery`}
                </span>
                <span className="tabular-nums text-[#D4A359] font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full bg-white rounded-full h-2 overflow-hidden border border-[#EBE6DC]">
                <div
                  className="bg-[#0F2F24] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <div className="w-16 h-16 rounded-2xl bg-[#FBF9F4] flex items-center justify-center text-[#D4A359] mb-4 border border-[#EBE6DC]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="font-display text-lg font-bold text-[#0F2F24] mb-1">
                  Your cart is empty
                </p>
                <p className="text-xs text-slate-400 max-w-xs mb-6">
                  Add our pure grass-fed Desi Ghee or freshly churned butter to get started.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#0F2F24] text-[#E8C882] text-xs font-semibold rounded-xl hover:bg-[#164233] transition-colors cursor-pointer"
                >
                  Explore Pure Ghee
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={`${item.productId}-${item.variantId}`}
                  className="flex gap-3.5 p-3 rounded-2xl border border-[#EBE6DC] bg-white shadow-2xs"
                >
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-16 h-16 object-cover rounded-xl bg-slate-50 shrink-0 border border-[#EBE6DC]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="text-xs font-bold text-[#0F2F24] leading-snug line-clamp-1">
                          {item.productName}
                        </h4>
                        <span className="text-[11px] text-slate-400 block">
                          {item.weight}
                        </span>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.productId, item.variantId)}
                        className="text-slate-300 hover:text-[#C85A32] transition-colors p-1 cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#EBE6DC] rounded-lg">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.productId, item.variantId, item.quantity - 1)
                          }
                          className="px-2 py-1 text-slate-500 hover:text-[#0F2F24] hover:bg-slate-50 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#0F2F24] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.productId, item.variantId, item.quantity + 1)
                          }
                          className="px-2 py-1 text-slate-500 hover:text-[#0F2F24] hover:bg-slate-50 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-[#0F2F24] tabular-nums">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#EBE6DC] bg-[#FBF9F4] space-y-4">
              {/* Promo code form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon code (e.g. KHAAS10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs border border-[#EBE6DC] rounded-xl uppercase tracking-wider focus:outline-hidden focus:ring-1 focus:ring-[#D4A359] bg-white text-[#0F2F24]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-[#0F2F24] hover:bg-[#164233] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>
              {couponError && <p className="text-[11px] text-[#C85A32] font-medium">{couponError}</p>}
              {couponSuccess && <p className="text-[11px] text-[#1D8354] font-medium">{couponSuccess}</p>}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#3E5248] pt-2 border-t border-[#EBE6DC]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold tabular-nums text-[#0F2F24]">Rs. {rawSubtotal.toLocaleString()}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-[#1D8354] font-medium">
                    <span>Discount (10%)</span>
                    <span className="tabular-nums">- Rs. {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Charges</span>
                  <span className="font-semibold tabular-nums">
                    {shippingFee === 0 ? (
                      <span className="text-[#1D8354] font-bold">FREE</span>
                    ) : (
                      `Rs. ${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#0F2F24] pt-2 border-t border-[#EBE6DC]">
                  <span>Total Amount (PKR):</span>
                  <span className="text-[#0F2F24] text-base tabular-nums font-display">
                    Rs. {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout Actions */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={onProceedToCheckout}
                  className="btn-tactile w-full py-3.5 px-4 bg-[#0F2F24] hover:bg-[#164233] text-[#E8C882] font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-center text-slate-400 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1D8354]" />
                  <span>Advance payment via JazzCash, EasyPaisa, or Bank Transfer</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
