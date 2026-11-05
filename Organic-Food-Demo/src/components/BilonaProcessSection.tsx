import React from 'react';
import { Sparkles, Check } from 'lucide-react';

interface BilonaProcessSectionProps {
  theme?: 'light' | 'dark';
}

export const BilonaProcessSection: React.FC<BilonaProcessSectionProps> = ({ theme = 'light' }) => {
  const isDark = theme === 'dark';

  const steps = [
    {
      num: '01',
      title: '1. Fresh Pasture Milk',
      desc: 'Sourced directly from healthy pasture-grazed cows and buffaloes, completely free of hormone injections.',
      icon: '🌿',
    },
    {
      num: '02',
      title: '2. Natural Dahi Culturing',
      desc: 'Whole milk is slowly boiled and cultured overnight into rich natural curd with active gut-friendly probiotics.',
      icon: '🥛',
    },
    {
      num: '03',
      title: '3. Wooden Bilona Churning',
      desc: 'Bi-directional churning of curd using traditional wooden madhani rods to naturally separate golden butter (makhan).',
      icon: '🪵',
    },
    {
      num: '04',
      title: '4. Gentle Low Simmering',
      desc: 'The churned butter is slowly simmered on low flame until water evaporates and golden milk solids caramelize.',
      icon: '🔥',
    },
    {
      num: '05',
      title: '5. Danedar Granular Ghee',
      desc: 'Poured into sterilized glass jars where it naturally cools into golden granular crystal perfection.',
      icon: '✨',
    },
  ];

  return (
    <section
      id="bilona-process"
      className={`py-14 sm:py-20 overflow-hidden relative border-b transition-colors duration-300 ${
        isDark ? 'bg-[#081410] text-[#FBF9F4] border-[#D4A359]/25' : 'bg-[#FBF9F4] text-[#0F2F24] border-[#EBE6DC]'
      }`}
    >
      {/* Background ambient lighting */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] blur-3xl pointer-events-none rounded-full ${
          isDark ? 'bg-[#D4A359]/10' : 'bg-[#E8C882]/25'
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3 border ${
              isDark
                ? 'bg-[#12241E] text-[#E8C882] border-[#D4A359]/30'
                : 'bg-white text-[#0F2F24] border-[#EBE6DC]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#D4A359]" />
            <span>Centuries-Old Craftsmanship</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
            The 5-Step Traditional Churning Method
          </h2>
          <p className={`mt-2.5 text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-[#4A5D54]'}`}>
            Most industrial ghee is extracted directly from machine-skimmed cream using chemical centrifuges. Zubair Organic Foods strictly churns from cultured whole curd (Dahi) — preserving vital butyric acid and divine natural aroma.
          </p>
        </div>

        {/* 5-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`rounded-2xl p-5 border shadow-2xs hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group ${
                isDark
                  ? 'bg-[#12241E] border-white/10 hover:border-[#D4A359]/50'
                  : 'bg-white border-[#EBE6DC] hover:border-[#D4A359]/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F2F24] to-[#081813] text-[#E8C882] flex items-center justify-center font-bold font-display text-base border border-[#D4A359]/40 shadow-xs">
                    {step.num}
                  </div>
                  <span className="text-2xl">{step.icon}</span>
                </div>

                <h3
                  className={`font-display text-sm font-bold mb-1.5 leading-snug transition-colors ${
                    isDark ? 'text-white group-hover:text-[#E8C882]' : 'text-[#0F2F24] group-hover:text-[#D4A359]'
                  }`}
                >
                  {step.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-400">
                  {step.desc}
                </p>
              </div>

              <div className={`mt-4 pt-3 border-t flex items-center gap-1 text-[11px] text-[#1D8354] font-bold ${isDark ? 'border-white/10' : 'border-[#EBE6DC]'}`}>
                <Check className="w-3.5 h-3.5" />
                <span>100% Authentic Hand-Crafted</span>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison: Factory Ghee vs Zubair Organic Bilona Ghee */}
        <div
          className={`mt-12 rounded-3xl p-6 sm:p-8 border shadow-xs ${
            isDark ? 'bg-[#12241E] border-white/10' : 'bg-white border-[#EBE6DC]'
          }`}
        >
          <h3 className="font-display text-xl sm:text-2xl font-bold text-center mb-6">
            Factory Processed Ghee vs. Zubair Organic Desi Ghee
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
            {/* Commercial */}
            <div className={`p-5 rounded-2xl border ${isDark ? 'bg-red-950/20 border-red-900/40' : 'bg-red-50/50 border-red-200'}`}>
              <h4 className="font-bold text-[#C85A32] flex items-center gap-2 mb-2.5 text-sm">
                <span className="w-2 h-2 rounded-full bg-[#C85A32]" />
                Commercial Factory Ghee
              </h4>
              <ul className={`space-y-2 text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Made from raw cream separator machines without culturing curd</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Heated at extreme high temperatures destroying natural vitamins</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Often blended with cheap palm oil or hydrogenated fats</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Flat aroma boosted with synthetic chemical essences</span>
                </li>
              </ul>
            </div>

            {/* Zubair Organic Bilona */}
            <div className={`p-5 rounded-2xl border ${isDark ? 'bg-emerald-950/20 border-emerald-900/40' : 'bg-emerald-50/50 border-emerald-200'}`}>
              <h4 className="font-bold text-[#1D8354] flex items-center gap-2 mb-2.5 text-sm">
                <span className="w-2 h-2 rounded-full bg-[#1D8354]" />
                Zubair Organic Foods Pure Bilona Desi Ghee
              </h4>
              <ul className={`space-y-2 text-xs ${isDark ? 'text-slate-200' : 'text-[#0F2F24]'}`}>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Slow-churned from natural cultured Dahi using ancient wooden bilona</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Simmered on low flame to preserve CLA, butyric acid, and vitamins A, D, E</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Zero palm oil, zero banaspati, zero chemical additives</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Distinctive granular (<em className="font-serif">danedar</em>) texture and heavenly aroma</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
