import React, { useState } from 'react';
import {
  ShoppingBag,
  MessageCircle,
  Phone,
  Menu,
  X,
  Mail,
  Sparkles,
  ShieldCheck,
  Heart,
  Star,
} from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  onOpenWriteReview?: () => void;
  totalReviewsCount?: number;
  averageRating?: number | string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  wishlistCount,
  onOpenWishlist,
  theme = 'light',
  onToggleTheme,
  onOpenWriteReview,
  totalReviewsCount = 2748,
  averageRating = '4.9',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDark = theme === 'dark';

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-300 ${
        isDark
          ? 'bg-[#0B1A15]/95 backdrop-blur-md border-b border-[#D4A359]/25 shadow-[0_4px_30px_rgba(0,0,0,0.6)]'
          : 'bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#EBE6DC] shadow-[0_4px_25px_rgba(15,47,36,0.04)]'
      }`}
    >
      {/* 1. Royal Announcement Bar - Continuous Left-to-Right Animated Marquee */}
      <div
        className={`overflow-hidden w-full text-[10.5px] sm:text-xs py-1.5 sm:py-2 transition-colors duration-300 relative select-none border-b ${
          isDark
            ? 'bg-[#060F0C] text-[#FBF9F4] border-[#D4A359]/20'
            : 'bg-[#0F2F24] text-[#FBF9F4] border-[#D4A359]/30'
        }`}
      >
        <div className="w-full flex overflow-hidden">
          <div className="animate-marquee-right flex items-center">
            {/* Repeated Sequence 1 */}
            <div className="flex items-center gap-5 sm:gap-8 shrink-0 pr-5 sm:pr-8">
              <div className="flex items-center gap-1.5 font-medium whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8C882] shadow-[0_0_8px_#E8C882] shrink-0 animate-pulse" />
                <span>Pure Organic Dairy · Farm Fresh Bilona Ghee</span>
              </div>

              <span className="text-[#D4A359]/70 select-none">✦</span>

              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <Sparkles className="w-3.5 h-3.5 text-[#E8C882] shrink-0" />
                <span><strong className="text-[#E8C882] font-semibold">Free Express Shipping</strong> on orders &gt; Rs. 6,400</span>
              </div>

              <span className="text-[#D4A359]/70 select-none">✦</span>

              <a
                href="mailto:Simplezubair896@gmail.com"
                className="flex items-center gap-1.5 text-[#FBF9F4] hover:text-[#E8C882] transition-colors whitespace-nowrap"
              >
                <Mail className="w-3.5 h-3.5 text-[#E8C882] shrink-0" />
                <span className="font-semibold underline decoration-[#E8C882]/40 hover:decoration-[#E8C882]">
                  Simplezubair896@gmail.com
                </span>
              </a>

              <span className="text-[#D4A359]/70 select-none">✦</span>

              <a
                href="https://wa.me/923044411896?text=Assalam%20o%20Alaikum%20Zubair%20Organic%20Foods%2C%20I%20want%20to%20order%20Pure%20Desi%20Ghee"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#FBF9F4] hover:text-[#E8C882] transition-colors font-bold whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 text-[#E8C882] shrink-0" />
                <span className="tracking-wide">0304-4411896 (WhatsApp &amp; Call)</span>
              </a>

              <span className="text-[#D4A359]/70 select-none">✦</span>

              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E8C882] shrink-0" />
                <span>100% Traditional Bilona Churned · Lab Tested Purity Guarantee</span>
              </div>

              <span className="text-[#D4A359]/70 select-none">✦</span>

              <div className="flex items-center gap-1.5 font-bold text-[#E8C882] whitespace-nowrap">
                <span>Zubair Organic Foods</span>
              </div>
            </div>

            {/* Repeated Sequence 2 (Identical for seamless infinite scroll) */}
            <div className="flex items-center gap-5 sm:gap-8 shrink-0 pr-5 sm:pr-8" aria-hidden="true">
              <div className="flex items-center gap-1.5 font-medium whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8C882] shadow-[0_0_8px_#E8C882] shrink-0 animate-pulse" />
                <span>Pure Organic Dairy · Farm Fresh Bilona Ghee</span>
              </div>

              <span className="text-[#D4A359]/70 select-none">✦</span>

              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <Sparkles className="w-3.5 h-3.5 text-[#E8C882] shrink-0" />
                <span><strong className="text-[#E8C882] font-semibold">Free Express Shipping</strong> on orders &gt; Rs. 6,400</span>
              </div>

              <span className="text-[#D4A359]/70 select-none">✦</span>

              <a
                href="mailto:Simplezubair896@gmail.com"
                className="flex items-center gap-1.5 text-[#FBF9F4] hover:text-[#E8C882] transition-colors whitespace-nowrap"
              >
                <Mail className="w-3.5 h-3.5 text-[#E8C882] shrink-0" />
                <span className="font-semibold underline decoration-[#E8C882]/40 hover:decoration-[#E8C882]">
                  Simplezubair896@gmail.com
                </span>
              </a>

              <span className="text-[#D4A359]/70 select-none">✦</span>

              <a
                href="https://wa.me/923044411896?text=Assalam%20o%20Alaikum%20Zubair%20Organic%20Foods%2C%20I%20want%20to%20order%20Pure%20Desi%20Ghee"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#FBF9F4] hover:text-[#E8C882] transition-colors font-bold whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 text-[#E8C882] shrink-0" />
                <span className="tracking-wide">0304-4411896 (WhatsApp &amp; Call)</span>
              </a>

              <span className="text-[#D4A359]/70 select-none">✦</span>

              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E8C882] shrink-0" />
                <span>100% Traditional Bilona Churned · Lab Tested Purity Guarantee</span>
              </div>

              <span className="text-[#D4A359]/70 select-none">✦</span>

              <div className="flex items-center gap-1.5 font-bold text-[#E8C882] whitespace-nowrap">
                <span>Zubair Organic Foods</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-20 flex items-center justify-between">
        {/* Brand Mark */}
        <a href="#" className="flex items-center gap-2 sm:gap-3 group focus:outline-hidden min-w-0">
          <div className="w-9 h-9 sm:w-14 sm:h-14 rounded-full bg-white p-0.5 shadow-[0_2px_8px_rgba(15,47,36,0.2)] sm:shadow-[0_4px_14px_rgba(15,47,36,0.25)] group-hover:scale-105 transition-all border-2 border-[#D4A359] relative overflow-hidden shrink-0">
            <img
              src="/src/assets/images/zubair_organic_logo_1791475320945.jpg"
              alt="Zubair Organic Foods Logo"
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span
              className={`font-display text-sm sm:text-2xl lg:text-3xl font-extrabold tracking-tight leading-tight sm:leading-none truncate transition-colors ${
                isDark ? 'text-white group-hover:text-[#E8C882]' : 'text-[#0F2F24] group-hover:text-[#D4A359]'
              }`}
            >
              Zubair Organic Foods
            </span>
            <span className="text-[7.5px] sm:text-[10px] tracking-[0.14em] sm:tracking-[0.25em] uppercase font-bold text-[#D4A359] mt-0.5 flex items-center gap-1">
              <span>Pure Organic Heritage</span>
              <Sparkles className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-[#D4A359]" />
            </span>
          </div>
        </a>

        {/* Center Desktop Links */}
        <nav
          className={`hidden lg:flex items-center gap-8 text-sm font-semibold tracking-wide ${
            isDark ? 'text-slate-300' : 'text-[#2C3E35]'
          }`}
        >
          <a
            href="#desi-ghee-flagship"
            className="hover:text-[#D4A359] transition-colors relative py-1 hover:border-b-2 hover:border-[#D4A359]"
          >
            Pure Desi Ghee
          </a>
          <a
            href="#all-products"
            className="hover:text-[#D4A359] transition-colors relative py-1 hover:border-b-2 hover:border-[#D4A359]"
          >
            Pantry Range
          </a>
          <a
            href="#bilona-process"
            className="hover:text-[#D4A359] transition-colors relative py-1 hover:border-b-2 hover:border-[#D4A359]"
          >
            Traditional Craft
          </a>
          <a
            href="#purity-guarantee"
            className="hover:text-[#D4A359] transition-colors relative py-1 hover:border-b-2 hover:border-[#D4A359]"
          >
            Lab Purity & PFA
          </a>
          <a
            href="#reviews"
            className="hover:text-[#D4A359] transition-colors relative py-1 hover:border-b-2 hover:border-[#D4A359] flex items-center gap-1.5"
          >
            <span>Reviews</span>
            <span className="text-[10px] font-bold bg-[#D4A359]/20 text-[#D4A359] dark:text-[#E8C882] px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
              <Star className="w-2.5 h-2.5 fill-[#D4A359]" />
              {averageRating}
            </span>
          </a>
          <a
            href="#contact"
            className="hover:text-[#D4A359] transition-colors relative py-1 hover:border-b-2 hover:border-[#D4A359]"
          >
            Outlets & Contact
          </a>
        </nav>

        {/* Right Actions: Favorite Button & Cart */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* COMPACT FAVORITES / WISHLIST BUTTON */}
          <button
            type="button"
            onClick={onOpenWishlist}
            aria-label="View Favorite Products"
            title="My Favorite Products"
            className={`btn-tactile p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg sm:rounded-xl flex items-center gap-1 sm:gap-1.5 border transition-all cursor-pointer relative ${
              isDark
                ? 'bg-[#12241E] hover:bg-[#1A332B] text-white border-[#D4A359]/30 shadow-[0_2px_0_#060F0C]'
                : 'bg-white hover:bg-[#FBF9F4] text-[#0F2F24] border-[#EBE6DC] shadow-[0_2px_0_#DDD6C7]'
            }`}
          >
            <Heart
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-transform ${
                wishlistCount > 0
                  ? 'text-rose-500 fill-rose-500 scale-105'
                  : 'text-slate-400 group-hover:text-rose-500'
              }`}
            />
            <span className="text-[11px] sm:text-xs font-bold hidden sm:inline">Favorites</span>
            {wishlistCount > 0 && (
              <span className="bg-rose-500 text-white font-extrabold text-[9px] sm:text-[10px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center leading-none shadow-xs">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            aria-label="View Shopping Cart"
            className={`btn-3d p-2 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer border ${
              isDark
                ? 'bg-[#132620] hover:bg-[#1A332B] text-white border-[#D4A359]/30 shadow-[0_4px_0_#060F0C]'
                : 'bg-white hover:bg-[#FBF9F4] text-[#0F2F24] border-[#EBE6DC] shadow-[0_4px_0_#DDD6C7]'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-[#D4A359] shrink-0" />
            <span className="text-xs font-bold hidden sm:inline">Cart</span>
            {cartCount > 0 ? (
              <span className="bg-[#C85A32] text-white font-extrabold text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.2 sm:py-0.5 rounded-full shadow-xs">
                {cartCount}
              </span>
            ) : (
              <span className="text-slate-400 text-[11px] sm:text-xs">0</span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-1.5 sm:p-2 rounded-xl cursor-pointer ${
              isDark ? 'text-white hover:bg-white/10' : 'text-[#0F2F24] hover:bg-slate-100'
            }`}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-t px-5 py-6 space-y-4 shadow-2xl ${
            isDark ? 'bg-[#0B1A15] border-[#D4A359]/20 text-white' : 'bg-white border-[#EBE6DC] text-[#0F2F24]'
          }`}
        >
          {/* Customer Reviews & Ratings System in 3-Lines Menu */}
          <div className="p-3.5 rounded-2xl bg-[#D4A359]/10 dark:bg-white/5 border border-[#D4A359]/30 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-[#D4A359] text-[#D4A359]" />
                <span className="text-xs font-bold">Reviews &amp; Ratings System</span>
              </div>
              <span className="text-[10px] font-extrabold bg-[#1D8354]/15 text-[#1D8354] dark:text-[#E8C882] px-2 py-0.5 rounded-full">
                ★ {averageRating} Verified
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
              Read customer reviews or rate with stars and publish your feedback.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2 px-2.5 rounded-xl bg-white dark:bg-[#132620] border border-[#D4A359]/30 text-xs font-bold hover:bg-[#D4A359]/10 transition-colors flex items-center justify-center gap-1"
              >
                <span>Read Reviews</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenWriteReview) {
                    onOpenWriteReview();
                  } else {
                    const el = document.getElementById('reviews');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="text-center py-2 px-2.5 rounded-xl bg-gradient-to-r from-[#C85A32] to-[#B54D27] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer active:scale-98"
              >
                <Star className="w-3.5 h-3.5 fill-white" />
                <span>Write Review</span>
              </button>
            </div>
          </div>

          <nav className="flex flex-col space-y-3 text-base font-semibold">
            <a
              href="#desi-ghee-flagship"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-[#D4A359]/10"
            >
              Pure Desi Ghee
            </a>
            <a
              href="#all-products"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-[#D4A359]/10"
            >
              All Pantry Products
            </a>
            <a
              href="#bilona-process"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-[#D4A359]/10"
            >
              Traditional Craft
            </a>
            <a
              href="#purity-guarantee"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-[#D4A359]/10"
            >
              Lab Purity & PFA
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-[#D4A359]/10 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-[#D4A359] text-[#D4A359]" />
                <span>Customer Reviews</span>
              </div>
              <span className="text-xs font-bold text-[#D4A359]">★ {averageRating}</span>
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-[#D4A359]/10"
            >
              Outlets & Contact
            </a>
          </nav>

          <div className="pt-4 border-t border-slate-700/30 flex flex-col gap-3">
            <button
              onClick={() => {
                onOpenWishlist();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-rose-500/10 text-rose-500 font-bold text-sm flex items-center justify-center gap-2 cursor-pointer border border-rose-500/20"
            >
              <Heart className="w-4 h-4 fill-rose-500" />
              <span>My Favorites ({wishlistCount})</span>
            </button>

            {onToggleTheme && (
              <button
                onClick={() => {
                  onToggleTheme();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-white/10 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer border border-white/20"
              >
                <span>Switch to {isDark ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            )}

            <a
              href="https://wa.me/923044411896"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-3 px-4 rounded-2xl bg-gradient-to-b from-[#1D8354] to-[#14633E] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md"
            >
              <MessageCircle className="w-4 h-4 text-white fill-white" />
              <span>WhatsApp Us: 0304-4411896</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
