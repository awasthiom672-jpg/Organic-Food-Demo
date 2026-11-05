import React from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

interface FooterProps {
  theme?: 'light' | 'dark';
}

export const Footer: React.FC<FooterProps> = ({ theme = 'light' }) => {
  const isDark = theme === 'dark';

  return (
    <footer
      id="contact"
      className={`border-t pt-10 pb-8 sm:pt-14 sm:pb-10 transition-colors duration-300 ${
        isDark ? 'bg-[#081410] text-[#FBF9F4] border-[#D4A359]/25' : 'bg-[#FBF9F4] text-[#0F2F24] border-[#EBE6DC]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pb-8 sm:pb-10 border-b ${isDark ? 'border-white/10' : 'border-[#EBE6DC]'}`}>
          {/* Col 1: Brand & Slogan */}
          <div className="space-y-3 sm:space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white p-0.5 border-2 border-[#D4A359] overflow-hidden shrink-0 shadow-xs">
                <img
                  src="/src/assets/images/zubair_organic_logo_1791475320945.jpg"
                  alt="Zubair Organic Foods Logo"
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-display text-xl sm:text-2xl font-bold tracking-tight">
                Zubair Organic Foods
              </span>
            </div>

            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-[#4A5D54]'}`}>
              Pure Desi Ghee hand-churned from natural cultured probiotic curd in Punjab. 100% lab certified with nationwide express delivery.
            </p>

            <div
              className={`pt-1 flex items-center gap-2 text-xs font-bold p-2.5 rounded-xl border w-fit ${
                isDark ? 'bg-white/5 border-white/10 text-[#E8C882]' : 'bg-[#1D8354]/10 border-[#1D8354]/20 text-[#1D8354]'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#1D8354]" />
              <span>100% Halal & PFA Compliant</span>
            </div>
          </div>

          {/* Col 2: Outlets & Physical Presence */}
          <div className="space-y-2.5">
            <h4 className={`font-display text-base font-bold tracking-wide ${isDark ? 'text-[#E8C882]' : 'text-[#0F2F24]'}`}>
              Locations & Outlets
            </h4>
            <div className={`space-y-2 text-xs ${isDark ? 'text-slate-300' : 'text-[#3E5248]'}`}>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4A359] shrink-0 mt-0.5" />
                <span>
                  <strong>Head Office:</strong> 246 A1, Gurumangat Road, Gulberg 3, Lahore
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4A359] shrink-0 mt-0.5" />
                <span>
                  <strong>Outlets:</strong> Askari Mall & Falcon Market, Lahore
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D4A359] shrink-0" />
                <span>Mon – Sat: 9:00 AM – 10:00 PM</span>
              </div>
            </div>
          </div>

          {/* Col 3: Direct Helpline & Support */}
          <div className="space-y-2.5">
            <h4 className={`font-display text-base font-bold tracking-wide ${isDark ? 'text-[#E8C882]' : 'text-[#0F2F24]'}`}>
              Customer Helpline
            </h4>
            <div className={`space-y-2 text-xs ${isDark ? 'text-slate-300' : 'text-[#3E5248]'}`}>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#1D8354] shrink-0" />
                <a
                  href="tel:03044411896"
                  className={`hover:underline transition-colors tabular-nums font-bold text-sm ${isDark ? 'text-white' : 'text-[#0F2F24]'}`}
                >
                  0304-4411896
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4A359] shrink-0" />
                <a
                  href="mailto:Simplezubair896@gmail.com"
                  className="hover:underline transition-colors font-medium"
                >
                  Simplezubair896@gmail.com
                </a>
              </div>
              <p className={`text-[11px] pt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500]'}`}>
                Same-day / next-day delivery in Lahore. 2-3 business days nationwide via trusted courier.
              </p>
            </div>
          </div>

          {/* Col 4: Safe Payment & Guarantee */}
          <div className="space-y-2.5">
            <h4 className={`font-display text-base font-bold tracking-wide ${isDark ? 'text-[#E8C882]' : 'text-[#0F2F24]'}`}>
              Payment Methods
            </h4>
            <div className="space-y-2 text-xs">
              <div
                className={`p-2.5 rounded-xl border font-bold flex items-center gap-2 ${
                  isDark ? 'bg-[#12241E] border-white/10 text-white' : 'bg-white border-[#EBE6DC] text-[#0F2F24]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#1D8354]" />
                <span>JazzCash / EasyPaisa (0304-4411896)</span>
              </div>
              <div
                className={`p-2.5 rounded-xl border font-bold flex items-center gap-2 ${
                  isDark ? 'bg-[#12241E] border-white/10 text-white' : 'bg-white border-[#EBE6DC] text-[#0F2F24]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#D4A359]" />
                <span>Bank Account Transfer</span>
              </div>
              <p className="text-[11px] text-slate-400 pt-0.5">
                Advance payment with receipt screenshot on WhatsApp.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-6 flex flex-col sm:flex-row items-center justify-between text-xs gap-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          <p>
            © {new Date().getFullYear()} Zubair Organic Foods. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#desi-ghee-flagship" className="hover:text-[#D4A359] transition-colors">
              Pure Desi Ghee
            </a>
            <span>·</span>
            <a href="#bilona-process" className="hover:text-[#D4A359] transition-colors">
              Traditional Craft
            </a>
            <span>·</span>
            <a href="#purity-guarantee" className="hover:text-[#D4A359] transition-colors">
              Lab Purity
            </a>
            <span>·</span>
            <a
              href="https://wa.me/923044411896"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline transition-colors font-bold text-[#1D8354]"
            >
              WhatsApp: 0304-4411896
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
