import React from 'react';
import { ShieldCheck, Award, FileCheck2, CheckCircle2 } from 'lucide-react';

interface PurityGuaranteeSectionProps {
  theme?: 'light' | 'dark';
}

export const PurityGuaranteeSection: React.FC<PurityGuaranteeSectionProps> = ({ theme = 'light' }) => {
  const isDark = theme === 'dark';

  const certificates = [
    {
      title: '0% Palm Oil & Vegetable Fat',
      desc: 'Strict negative results on Baudouin and Holde tests, confirming zero addition of cheap palm oil or hydrogenated fats.',
    },
    {
      title: 'Moisture Content < 0.2%',
      desc: 'Guarantees longer shelf life without rancidity. Pure anhydrous milk fat naturally preserved.',
    },
    {
      title: 'Punjab Food Authority (PFA) Compliant',
      desc: 'Processed and sealed under hygienic, certified food handling standards in Lahore, Pakistan.',
    },
    {
      title: '100% Halal & Lab Certified',
      desc: 'Zero synthetic essences, artificial colors, or chemical preservatives. Pure natural goodness.',
    },
  ];

  return (
    <section
      id="purity-guarantee"
      className={`py-14 sm:py-20 border-b transition-colors duration-300 w-full ${
        isDark ? 'bg-[#0B1A15] border-[#D4A359]/25 text-[#FBF9F4]' : 'bg-[#FBF9F4] border-[#EBE6DC] text-[#0F2F24]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div
          className={`rounded-3xl border shadow-sm p-6 sm:p-10 transition-colors w-full ${
            isDark ? 'bg-[#12241E] border-[#D4A359]/30' : 'bg-white border-[#EBE6DC]'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
            {/* Left Column: Certificates & Lab Badges */}
            <div className="space-y-5 w-full">
              <div
                className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${
                  isDark ? 'text-[#E8C882]' : 'text-[#D4A359]'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-[#1D8354]" />
                <span>Our Purity Guarantee</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-extrabold leading-tight">
                Pure Dairy You Can Truly Trust
              </h2>

              <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-[#4A5D54]'}`}>
                At Zubair Organic Foods, we test every batch of our Desi Ghee in independent food laboratories. We guarantee complete freedom from adulteration, synthetic aromas, and palm oil.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1 w-full">
                {certificates.map((cert, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-xl border transition-colors ${
                      isDark ? 'bg-[#0B1A15] border-white/10' : 'bg-[#FBF9F4] border-[#EBE6DC]'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4 text-[#1D8354] shrink-0" />
                      <span>{cert.title}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{cert.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Lab Report Visual Card */}
            <div className="flex justify-center w-full">
              <div
                className={`w-full max-w-md border rounded-2xl p-6 shadow-xs relative overflow-hidden ${
                  isDark
                    ? 'bg-[#0B1A15] border-[#D4A359]/30 text-white'
                    : 'bg-[#FBF9F4] border-[#EBE6DC] text-[#0F2F24]'
                }`}
              >
                <div className={`flex items-center justify-between border-b pb-3.5 mb-3.5 ${isDark ? 'border-white/10' : 'border-[#EBE6DC]'}`}>
                  <div>
                    <h3 className="font-display text-sm font-bold">
                      Certificate of Analysis (COA)
                    </h3>
                    <p className="text-[11px] text-slate-400">Official Batch Purity Report</p>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-[#1D8354]/15 text-[#1D8354] flex items-center justify-center">
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className={`flex justify-between py-1.5 border-b ${isDark ? 'border-white/10' : 'border-[#EBE6DC]'}`}>
                    <span className="text-slate-400">Milk Fat Content</span>
                    <span className="font-bold text-[#D4A359] tabular-nums">99.85% (Pure)</span>
                  </div>
                  <div className={`flex justify-between py-1.5 border-b ${isDark ? 'border-white/10' : 'border-[#EBE6DC]'}`}>
                    <span className="text-slate-400">Moisture Content</span>
                    <span className="font-bold text-[#1D8354] tabular-nums">0.12% (Pass)</span>
                  </div>
                  <div className={`flex justify-between py-1.5 border-b ${isDark ? 'border-white/10' : 'border-[#EBE6DC]'}`}>
                    <span className="text-slate-400">Free Fatty Acids (FFA)</span>
                    <span className="font-bold text-[#1D8354] tabular-nums">&lt; 0.40% (Fresh)</span>
                  </div>
                  <div className={`flex justify-between py-1.5 border-b ${isDark ? 'border-white/10' : 'border-[#EBE6DC]'}`}>
                    <span className="text-slate-400">Baudouin Test (Veg Oil)</span>
                    <span className="font-bold text-[#1D8354]">Negative (0% Veg Oil)</span>
                  </div>
                  <div className={`flex justify-between py-1.5 border-b ${isDark ? 'border-white/10' : 'border-[#EBE6DC]'}`}>
                    <span className="text-slate-400">Synthetic Color / Fragrance</span>
                    <span className="font-bold text-[#1D8354]">None Detected</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-400">Halal & PFA Status</span>
                    <span className="font-bold text-[#D4A359]">100% Certified</span>
                  </div>
                </div>

                <div
                  className={`mt-5 pt-3.5 border-t p-3 rounded-xl flex items-center gap-2.5 ${
                    isDark ? 'bg-white/5 border-white/10' : 'bg-white border-[#EBE6DC]'
                  }`}
                >
                  <Award className="w-5 h-5 text-[#C85A32] shrink-0" />
                  <p className="text-[11px] leading-relaxed font-medium">
                    100% Money-back guarantee if any batch is proven adulterated by an authorized laboratory.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
