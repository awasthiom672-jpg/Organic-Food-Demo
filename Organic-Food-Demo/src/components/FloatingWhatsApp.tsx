import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
      {/* Popover Bubble */}
      {isOpen && (
        <div className="mb-2.5 sm:mb-3 w-[calc(100vw-2rem)] max-w-72 bg-white rounded-2xl shadow-2xl border border-[#EBE6DC] p-3.5 sm:p-4 transition-all animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white p-0.5 border border-[#D4A359] overflow-hidden shrink-0 shadow-xs">
                <img
                  src="/src/assets/images/zubair_organic_logo_1791475320945.jpg"
                  alt="Zubair Organic Foods"
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0F2F24]">Zubair Organic Foods Support</p>
                <p className="text-[10px] text-[#1D8354] flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1D8354] animate-pulse" />
                  Online • Instant Reply
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#4A5D54] py-2.5 sm:py-3 leading-relaxed">
            Assalam o Alaikum! Welcome to Zubair Organic Foods. How can we assist you with our 100% Pure Desi Ghee today?
          </p>

          <a
            href="https://wa.me/923044411896?text=Assalam%20o%20Alaikum%20Zubair%20Organic%20Foods%2C%20I%20want%20to%20order%20Pure%20Desi%20Ghee"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3 bg-[#1D8354] hover:bg-[#14633E] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-white fill-white" />
            <span>Chat on WhatsApp (0304-4411896)</span>
          </a>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1D8354] hover:bg-[#14633E] text-white shadow-xl hover:shadow-[#1D8354]/40 flex items-center justify-center transition-all duration-300 transform hover:scale-105 group relative cursor-pointer"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white" />
        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-[#E8C882] rounded-full border-2 border-white" />
      </button>
    </div>
  );
};
