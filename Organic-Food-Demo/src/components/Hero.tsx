import React from 'react';
import { Star, Truck, ArrowRight, ShieldCheck, Sparkles, CheckCircle2, MessageCircle } from 'lucide-react';

interface HeroProps {
  onExplore?: () => void;
  onShopClick?: () => void;
  onQuickOrder: () => void;
  theme?: 'light' | 'dark';
}

export const Hero: React.FC<HeroProps> = ({ onQuickOrder, theme = 'light' }) => {
  const isDark = theme === 'dark';

  return (
    <section
      className={`relative overflow-hidden pt-4 pb-8 sm:pt-10 sm:pb-16 lg:py-20 border-b transition-colors duration-300 w-full ${
        isDark
          ? 'bg-gradient-to-b from-[#081410] via-[#0B1A15] to-[#07120E] text-[#FBF9F4] border-[#D4A359]/25'
          : 'bg-gradient-to-b from-[#FFFFFF] via-[#FBF9F4] to-[#F5EFE3] text-[#0F2F24] border-[#EBE6DC]'
      }`}
    >
      {/* Subtle Ambient Lighting */}
      <div
        className={`absolute top-0 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full blur-3xl pointer-events-none -z-0 transition-opacity ${
          isDark ? 'bg-[#D4A359]/15' : 'bg-[#E8C882]/25'
        }`}
      />

      <div className="relative max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-10 lg:gap-14 items-center w-full">
          {/* Left Column: Headline & Actions */}
          <div className="flex flex-col justify-center text-left z-10 w-full">
            {/* Trust Pill - slightly more compact on mobile */}
            <div
              className={`inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full w-fit mb-2.5 sm:mb-5 transition-all border text-[10px] sm:text-xs font-semibold ${
                isDark
                  ? 'bg-[#12241E] border-[#D4A359]/40 text-[#E8C882]'
                  : 'bg-white border-[#EBE6DC] text-[#0F2F24] shadow-xs'
              }`}
            >
              <div className="flex text-[#D4A359]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-[#D4A359]" />
                ))}
              </div>
              <span className="font-bold uppercase tracking-wider text-[9.5px] sm:text-[11px]">4.9/5 Rating</span>
              <span className="text-slate-300">·</span>
              <span className={isDark ? 'text-white/80' : 'text-[#4A5D54]'}>
                2,700+ Verified Buyers
              </span>
            </div>

            {/* Display Headline - perfectly scaled: slightly smaller on mobile, identical grandeur on desktop */}
            <h1 className="font-display text-[22px] sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.22] sm:leading-[1.15] mb-2.5 sm:mb-5">
              {isDark ? (
                <>
                  Crafted by Tradition. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8C882] via-[#FDF5DF] to-[#D4A359]">
                    100% Pure Desi Ghee.
                  </span>
                </>
              ) : (
                <>
                  Pure Village Heritage. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F2F24] via-[#1D8354] to-[#C85A32]">
                    100% Pure Desi Ghee.
                  </span>
                </>
              )}
            </h1>

            <p
              className={`text-[11.5px] sm:text-base leading-relaxed mb-3.5 sm:mb-6 max-w-xl font-normal ${
                isDark ? 'text-[#FBF9F4]/80' : 'text-[#3E5248]'
              }`}
            >
              Cultured from raw pasture-fed milk into authentic probiotic curd and slowly churned in clay pots. Natural golden granular (<em className="font-serif font-bold text-[#D4A359] not-italic">danedar</em>) texture and authentic sweet nutty aroma.
            </p>

            {/* Price Strip - sleek and compact on mobile */}
            <div
              className={`p-2.5 sm:p-4 rounded-xl max-w-lg mb-3.5 sm:mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 border transition-all ${
                isDark
                  ? 'bg-[#12241E]/90 border-[#D4A359]/30'
                  : 'bg-white shadow-xs border-[#EBE6DC]'
              }`}
            >
              <div>
                <span className="text-[8.5px] sm:text-[10px] uppercase font-bold tracking-wider text-[#D4A359] block">
                  Fresh Churned Weekly:
                </span>
                <div className="flex items-baseline gap-1.5 sm:gap-2">
                  <span
                    className={`text-lg sm:text-2xl font-extrabold tabular-nums font-display ${
                      isDark ? 'text-[#E8C882]' : 'text-[#0F2F24]'
                    }`}
                  >
                    Rs. 3,200
                  </span>
                  <span className="text-[10.5px] sm:text-xs text-slate-400 line-through tabular-nums">
                    Rs. 3,500
                  </span>
                  <span className="text-[9.5px] sm:text-xs font-bold text-[#C85A32] bg-[#E8C882]/20 px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded-md">
                    1 Kg Jar (Save Rs. 300)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 bg-[#1D8354]/10 border border-[#1D8354]/25 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[9.5px] sm:text-xs font-bold text-[#1D8354] w-fit">
                <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>Nationwide Express Delivery</span>
              </div>
            </div>

            {/* Action Buttons - 2-Column sleek grid on mobile, generous flex on desktop */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-3 w-full">
              <button
                type="button"
                onClick={onQuickOrder}
                className="btn-tactile w-full sm:w-auto px-3 sm:px-6 py-2.5 sm:py-3.5 rounded-xl font-bold text-white text-[11px] sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer bg-[#C85A32] hover:bg-[#B54D27] shadow-xs"
              >
                <span>Order Now</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <button
                type="button"
                onClick={onQuickOrder}
                className="btn-tactile w-full sm:w-auto px-3 sm:px-5 py-2.5 sm:py-3.5 rounded-xl font-bold text-white text-[11px] sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer bg-[#1D8354] hover:bg-[#166E45] shadow-xs whitespace-nowrap"
              >
                <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white fill-white" />
                <span>WhatsApp (0304-4411896)</span>
              </button>
            </div>

            {/* Quality Pillars - compact on mobile */}
            <div
              className={`grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-3 mt-3.5 sm:mt-8 pt-3 sm:pt-6 border-t text-[10px] sm:text-xs font-semibold ${
                isDark ? 'border-white/10 text-slate-300' : 'border-[#EBE6DC] text-[#3E5248]'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4A359] shrink-0" />
                <span>100% Cultured Curd</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#1D8354] shrink-0" />
                <span>Lab Certified Pure</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C85A32] shrink-0" />
                <span>Free Delivery 6400+</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4A359] shrink-0" />
                <span>Danedar Grain</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Product Showcase - properly scaled for mobile screen */}
          <div className="relative flex items-center justify-center w-full mt-2 sm:mt-0">
            <div className="relative w-full max-w-[270px] sm:max-w-md mx-auto">
              <div
                className={`relative rounded-2xl p-2 sm:p-2.5 border shadow-sm transition-all ${
                  isDark ? 'bg-[#12241E] border-[#D4A359]/30' : 'bg-white border-[#EBE6DC]'
                }`}
              >
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] sm:aspect-square max-h-[190px] sm:max-h-none">
                  <img
                    src="/src/assets/images/hero_desi_ghee_jar_1791077397231.jpg"
                    alt="Zubair Organic Foods Pure Desi Ghee in Glass Jar"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                  {/* Bottom Pill - compact & elegant */}
                  <div
                    className={`absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 p-2 sm:p-3 backdrop-blur-md rounded-xl border flex items-center justify-between shadow-xs ${
                      isDark
                        ? 'bg-[#0B1A15]/90 border-[#D4A359]/30 text-white'
                        : 'bg-white/95 border-white/60 text-[#0F2F24]'
                    }`}
                  >
                    <div>
                      <span className="text-[8.5px] sm:text-[10px] font-bold uppercase tracking-wider text-[#D4A359] block">
                        Fresh Churned
                      </span>
                      <span className="text-[11px] sm:text-sm font-bold truncate block">
                        Zubair Organic Cow Desi Ghee
                      </span>
                    </div>
                    <span className="text-[11px] sm:text-sm font-extrabold text-[#D4A359] tabular-nums font-display shrink-0 ml-1">
                      Rs. 3,200
                    </span>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div
                className={`absolute -top-2 -right-2 sm:-top-3 sm:-right-3 backdrop-blur-md border rounded-xl p-1 px-2 sm:p-2 sm:px-3 shadow-xs flex items-center gap-1.5 ${
                  isDark
                    ? 'bg-[#183129]/95 border-[#D4A359]/40 text-white'
                    : 'bg-white/95 border-[#EBE6DC] text-[#0F2F24]'
                }`}
              >
                <span className="text-[10px] sm:text-xs text-[#1D8354] font-bold">✓</span>
                <span className="text-[9px] sm:text-xs font-bold">0% Palm Oil</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
