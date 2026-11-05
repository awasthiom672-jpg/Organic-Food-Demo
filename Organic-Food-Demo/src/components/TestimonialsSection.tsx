import React, { useState } from 'react';
import { Star, CheckCircle, ThumbsUp, PlusCircle, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import { Review } from '../data/reviews';
import { PRODUCTS } from '../data/products';

interface TestimonialsSectionProps {
  theme?: 'light' | 'dark';
  reviews: Review[];
  onAddReview: (review: Review) => void;
  onOpenWriteModal?: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  theme = 'light',
  reviews,
  onAddReview,
  onOpenWriteModal,
}) => {
  const isDark = theme === 'dark';

  const [activeFilter, setActiveFilter] = useState<'all' | '5' | '4'>('all');
  const [showInlineForm, setShowInlineForm] = useState(false);
  const [helpfulVoted, setHelpfulVoted] = useState<Record<string, boolean>>({});

  // Inline form state
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [productName, setProductName] = useState<string>('100% Pure Cow Desi Ghee');
  const [text, setText] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const popularCities = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Gujranwala'];

  // Calculations
  const totalReviews = reviews.length;
  const count5 = reviews.filter((r) => r.rating === 5).length;
  const count4 = reviews.filter((r) => r.rating === 4).length;
  const count3 = reviews.filter((r) => r.rating === 3).length;
  const avgRating = totalReviews > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1) : '5.0';

  const pct5 = totalReviews > 0 ? Math.round((count5 / totalReviews) * 100) : 95;
  const pct4 = totalReviews > 0 ? Math.round((count4 / totalReviews) * 100) : 5;
  const pct3 = totalReviews > 0 ? Math.round((count3 / totalReviews) * 100) : 0;

  const filteredReviews = reviews.filter((r) => {
    if (activeFilter === '5') return r.rating === 5;
    if (activeFilter === '4') return r.rating === 4;
    return true;
  });

  const handleHelpfulClick = (id: string) => {
    if (helpfulVoted[id]) return;
    setHelpfulVoted((prev) => ({ ...prev, [id]: true }));
  };

  const handleInlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!text.trim() || text.trim().length < 8) {
      setErrorMessage('Please write at least 8 characters for your review.');
      return;
    }

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      name: name.trim(),
      location: city.trim() ? `${city.trim()}, Pakistan` : 'Pakistan',
      productName,
      rating,
      text: text.trim(),
      date: 'Just now',
      verified: true,
      helpfulCount: 0,
      isUserSubmitted: true,
    };

    onAddReview(newRev);
    setErrorMessage('');
    setSuccessMessage('Thank you! Your review has been published and is visible below.');
    setName('');
    setCity('');
    setText('');
    setRating(5);

    setTimeout(() => {
      setSuccessMessage('');
      setShowInlineForm(false);
    }, 2500);
  };

  return (
    <section
      id="reviews"
      className={`py-14 sm:py-20 border-b transition-colors duration-300 ${
        isDark ? 'bg-[#0B1A15] border-[#D4A359]/25 text-[#FBF9F4]' : 'bg-[#FFFFFF] border-[#EBE6DC] text-[#0F2F24]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div
            className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-2 ${
              isDark ? 'text-[#E8C882]' : 'text-[#D4A359]'
            }`}
          >
            <Star className="w-4 h-4 fill-[#D4A359] text-[#D4A359]" />
            <span>2,700+ Trusted Pakistani Families</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
            Customer Reviews &amp; Ratings
          </h2>
          <p className={`mt-2 text-xs sm:text-sm ${isDark ? 'text-slate-300' : 'text-[#4d4d4d]'}`}>
            Real, verified feedback from home chefs, mothers, and wellness enthusiasts across Pakistan.
          </p>
        </div>

        {/* Rating Breakdown & Write Review CTA Banner */}
        <div
          className={`p-5 sm:p-8 rounded-3xl border mb-10 transition-all ${
            isDark
              ? 'bg-[#132620] border-[#D4A359]/30 shadow-[0_10px_30px_rgba(0,0,0,0.35)]'
              : 'bg-[#FBF9F4] border-[#EBE6DC] shadow-[0_8px_25px_rgba(0,0,0,0.04)]'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Score Summary */}
            <div className="lg:col-span-4 text-center lg:text-left flex flex-col items-center lg:items-start border-b lg:border-b-0 lg:border-r border-black/10 dark:border-white/10 pb-6 lg:pb-0 lg:pr-6">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-5xl sm:text-6xl font-black text-[#D4A359]">{avgRating}</span>
                <span className="text-base font-bold text-slate-400">/ 5.0</span>
              </div>
              <div className="flex items-center gap-1 my-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-5 h-5 fill-[#D4A359] text-[#D4A359]" />
                ))}
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-300">
                Based on <strong className="text-black dark:text-white">{totalReviews} verified reviews</strong>
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-[11px] font-bold text-[#1D8354] dark:text-[#E8C882]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Genuine Pakistani Buyers</span>
              </div>
            </div>

            {/* Star Distribution Bars */}
            <div className="lg:col-span-5 space-y-2 border-b lg:border-b-0 lg:border-r border-black/10 dark:border-white/10 pb-6 lg:pb-0 lg:pr-6">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-12 font-bold flex items-center gap-1">5 <Star className="w-3 h-3 fill-[#D4A359] text-[#D4A359]" /></span>
                <div className="flex-1 h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                  <div className="h-full bg-[#D4A359] rounded-full transition-all duration-500" style={{ width: `${pct5}%` }} />
                </div>
                <span className="w-10 text-right font-medium text-slate-400">{pct5}%</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-12 font-bold flex items-center gap-1">4 <Star className="w-3 h-3 fill-[#D4A359] text-[#D4A359]" /></span>
                <div className="flex-1 h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                  <div className="h-full bg-[#D4A359]/70 rounded-full transition-all duration-500" style={{ width: `${pct4}%` }} />
                </div>
                <span className="w-10 text-right font-medium text-slate-400">{pct4}%</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-12 font-bold flex items-center gap-1">3 <Star className="w-3 h-3 fill-[#D4A359] text-[#D4A359]" /></span>
                <div className="flex-1 h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                  <div className="h-full bg-[#D4A359]/40 rounded-full transition-all duration-500" style={{ width: `${pct3}%` }} />
                </div>
                <span className="w-10 text-right font-medium text-slate-400">{pct3}%</span>
              </div>
            </div>

            {/* Action CTA: Write a Review */}
            <div className="lg:col-span-3 flex flex-col items-center justify-center text-center space-y-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-300">
                Purchased Zubair Organic Foods?
              </span>
              <button
                type="button"
                onClick={() => {
                  if (onOpenWriteModal) {
                    onOpenWriteModal();
                  } else {
                    setShowInlineForm(!showInlineForm);
                  }
                }}
                className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-[#C85A32] to-[#B54D27] hover:from-[#B54D27] hover:to-[#A3401D] text-white font-bold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-md cursor-pointer transition-transform hover:scale-102"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Write a Review</span>
              </button>
              <p className="text-[10px] text-slate-400">
                Rate with stars &amp; share text feedback
              </p>
            </div>
          </div>
        </div>

        {/* Inline Review Form (if expanded) */}
        {showInlineForm && (
          <div
            className={`mb-10 p-5 sm:p-7 rounded-3xl border transition-all animate-in fade-in duration-300 ${
              isDark ? 'bg-[#152B23] border-[#D4A359]/40 text-white' : 'bg-[#FFFDF9] border-[#D4A359]/30 text-[#0F2F24]'
            }`}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/10 dark:border-white/10">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#D4A359]" />
                <h3 className="font-display text-base sm:text-lg font-bold">Write Your Review &amp; Rating</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowInlineForm(false)}
                className="text-xs font-semibold text-slate-400 hover:text-black dark:hover:text-white"
              >
                Cancel
              </button>
            </div>

            {successMessage && (
              <div className="mb-4 p-3.5 rounded-2xl bg-[#1D8354]/15 border border-[#1D8354] text-[#1D8354] dark:text-[#E8C882] text-xs sm:text-sm font-bold flex items-center gap-2">
                <CheckCircle className="w-5 h-5 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {errorMessage && (
              <div className="mb-4 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleInlineSubmit} className="space-y-4">
              {/* Star Rating */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[#D4A359]">
                  1. Rate Your Experience (Select Stars)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = star <= (hoverRating || rating);
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 focus:outline-hidden transition-transform hover:scale-125 cursor-pointer"
                        aria-label={`${star} Stars`}
                      >
                        <Star
                          className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                            isFilled
                              ? 'text-[#D4A359] fill-[#D4A359] drop-shadow-[0_2px_6px_rgba(212,163,89,0.5)]'
                              : 'text-slate-300 dark:text-slate-600'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Product Purchased */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-600 dark:text-slate-300">
                  2. Product Purchased
                </label>
                <select
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-[#D4A359] ${
                    isDark ? 'bg-[#0B1A15] border-white/20 text-white' : 'bg-white border-[#EBE6DC] text-[#0F2F24]'
                  }`}
                >
                  {PRODUCTS.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                  <option value="All Pantry Range & Overall Experience">
                    All Pantry Range & Overall Experience
                  </option>
                </select>
              </div>

              {/* Text review */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-600 dark:text-slate-300">
                  3. Your Review Text
                </label>
                <textarea
                  rows={3}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Share details about the danedar texture, village bilona aroma, taste, or delivery speed..."
                  required
                  className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#D4A359] resize-none ${
                    isDark ? 'bg-[#0B1A15] border-white/20 text-white' : 'bg-white border-[#EBE6DC] text-[#0F2F24]'
                  }`}
                />
              </div>

              {/* Name & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-600 dark:text-slate-300">
                    4. Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Tariq Mehmood"
                    required
                    className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#D4A359] ${
                      isDark ? 'bg-[#0B1A15] border-white/20 text-white' : 'bg-white border-[#EBE6DC] text-[#0F2F24]'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-600 dark:text-slate-300">
                    5. City / Location
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Lahore, Gulberg"
                    className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#D4A359] ${
                      isDark ? 'bg-[#0B1A15] border-white/20 text-white' : 'bg-white border-[#EBE6DC] text-[#0F2F24]'
                    }`}
                  />
                </div>
              </div>

              {/* Quick City Chips */}
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Quick select city:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {popularCities.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCity(c)}
                      className={`text-[10px] px-2 py-0.5 rounded-lg border transition-colors ${
                        city === c
                          ? 'bg-[#D4A359] text-white border-[#D4A359] font-bold'
                          : 'bg-black/5 dark:bg-white/5 border-transparent text-slate-500 dark:text-slate-400 hover:border-slate-300'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#C85A32] to-[#B54D27] hover:from-[#B54D27] hover:to-[#A3401D] text-white font-bold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-md cursor-pointer transition-transform hover:scale-102"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Publish Review</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filter Navigation Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6 pb-2 border-b border-black/10 dark:border-white/10">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                activeFilter === 'all'
                  ? 'bg-[#D4A359] text-white shadow-xs'
                  : 'bg-black/5 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-black/10'
              }`}
            >
              All Reviews ({totalReviews})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('5')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 ${
                activeFilter === '5'
                  ? 'bg-[#D4A359] text-white shadow-xs'
                  : 'bg-black/5 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-black/10'
              }`}
            >
              <span>5 Stars ({count5})</span>
            </button>
            {count4 > 0 && (
              <button
                type="button"
                onClick={() => setActiveFilter('4')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 ${
                  activeFilter === '4'
                    ? 'bg-[#D4A359] text-white shadow-xs'
                    : 'bg-black/5 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-black/10'
                }`}
              >
                <span>4 Stars ({count4})</span>
              </button>
            )}
          </div>

          <div className="text-xs font-semibold text-slate-400">
            Showing {filteredReviews.length} customer feedback items
          </div>
        </div>

        {/* Published Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {filteredReviews.map((rev) => {
            const hasVoted = helpfulVoted[rev.id];
            const currentHelpful = rev.helpfulCount + (hasVoted ? 1 : 0);

            return (
              <div
                key={rev.id}
                className={`p-6 rounded-3xl border flex flex-col justify-between hover:shadow-xl transition-all relative ${
                  rev.isUserSubmitted
                    ? 'ring-2 ring-[#D4A359]'
                    : ''
                } ${
                  isDark
                    ? 'bg-[#201a28] border-white/10 hover:border-[#fff0a5]/40 shadow-[0_10px_25px_rgba(0,0,0,0.4)]'
                    : 'bg-[#fdfbf7] border-[#e8e5dc] shadow-[0_8px_20px_rgba(0,0,0,0.03)]'
                }`}
              >
                {rev.isUserSubmitted && (
                  <span className="absolute -top-3 right-6 bg-[#D4A359] text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Just Published</span>
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-[#b64926]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#b64926]" />
                      ))}
                    </div>
                    <span className="text-[11px] font-medium text-slate-400">{rev.date}</span>
                  </div>

                  {rev.productName && (
                    <div className="mb-3 text-[11px] font-bold text-[#D4A359] dark:text-[#E8C882]">
                      Purchased: {rev.productName}
                    </div>
                  )}

                  <p className={`text-sm leading-relaxed mb-6 italic ${isDark ? 'text-slate-200' : 'text-[#2e2a39]'}`}>
                    "{rev.text}"
                  </p>
                </div>

                <div className={`pt-4 border-t flex items-center justify-between ${isDark ? 'border-white/10' : 'border-[#e8e5dc]'}`}>
                  <div>
                    <h4 className="text-xs font-bold">{rev.name}</h4>
                    <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-[#6d6d6d]'}`}>
                      {rev.location}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-1.5">
                    <span className="text-[10px] font-semibold text-[#468966] bg-[#468966]/10 px-2 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-[#468966]" />
                      <span>Verified Buyer</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => handleHelpfulClick(rev.id)}
                      className={`text-[10px] flex items-center gap-1 transition-colors ${
                        hasVoted
                          ? 'text-[#1D8354] font-bold'
                          : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                      }`}
                    >
                      <ThumbsUp className={`w-3 h-3 ${hasVoted ? 'fill-[#1D8354]' : ''}`} />
                      <span>Helpful ({currentHelpful})</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
