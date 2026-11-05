import React, { useState } from 'react';
import { X, Star, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Review } from '../data/reviews';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: Review) => void;
  theme?: 'light' | 'dark';
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview,
  theme = 'light',
}) => {
  const isDark = theme === 'dark';

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [productName, setProductName] = useState<string>('100% Pure Cow Desi Ghee');
  const [text, setText] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  if (!isOpen) return null;

  const popularCities = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Gujranwala'];

  const getRatingLabel = (stars: number) => {
    switch (stars) {
      case 5:
        return '⭐⭐⭐⭐⭐ 5 Stars - Exceptional & 100% Pure';
      case 4:
        return '⭐⭐⭐⭐ 4 Stars - Very Good Quality';
      case 3:
        return '⭐⭐⭐ 3 Stars - Good & Fresh';
      case 2:
        return '⭐⭐ 2 Stars - Fair';
      case 1:
        return '⭐ 1 Star - Needs Improvement';
      default:
        return 'Select Star Rating';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!text.trim() || text.trim().length < 10) {
      setErrorMessage('Please write at least 10 characters for your review text.');
      return;
    }

    setErrorMessage('');
    const newReview: Review = {
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

    onSubmitReview(newReview);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setName('');
      setCity('');
      setText('');
      setRating(5);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden transition-all duration-300 max-h-[92vh] flex flex-col ${
          isDark
            ? 'bg-[#0E231C] border-[#D4A359]/30 text-white'
            : 'bg-white border-[#EBE6DC] text-[#0F2F24]'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-black/10 dark:border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#D4A359]/20 flex items-center justify-center text-[#D4A359]">
              <Star className="w-4 h-4 fill-[#D4A359]" />
            </div>
            <div>
              <h3 className="font-display text-base sm:text-lg font-bold">Write a Customer Review</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Share your experience with Zubair Organic Foods</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {isSubmitted ? (
            <div className="py-10 text-center flex flex-col items-center justify-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#1D8354]/15 border-2 border-[#1D8354] flex items-center justify-center text-[#1D8354] animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-display text-xl font-bold text-[#1D8354]">Review Published!</h4>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300 max-w-sm">
                Thank you, <strong>{name}</strong>! Your review has been published and is now visible to all customers in the Reviews section.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold">
                  {errorMessage}
                </div>
              )}

              {/* Star Rating Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[#D4A359]">
                  1. Your Rating (Select Stars)
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
                <p className="text-xs font-semibold mt-1.5 text-[#1D8354] dark:text-[#E8C882]">
                  {getRatingLabel(hoverRating || rating)}
                </p>
              </div>

              {/* Product Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-600 dark:text-slate-300">
                  2. Product Purchased
                </label>
                <select
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-[#D4A359] ${
                    isDark
                      ? 'bg-[#132620] border-white/20 text-white'
                      : 'bg-[#FBF9F4] border-[#EBE6DC] text-[#0F2F24]'
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

              {/* Review Text */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-600 dark:text-slate-300">
                  3. Your Review & Feedback
                </label>
                <textarea
                  rows={3}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Tell us about the aroma, bilona taste, danedar texture, packaging, or delivery experience..."
                  required
                  className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#D4A359] resize-none ${
                    isDark
                      ? 'bg-[#132620] border-white/20 text-white placeholder-slate-400'
                      : 'bg-[#FBF9F4] border-[#EBE6DC] text-[#0F2F24] placeholder-slate-400'
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
                    placeholder="e.g. Farooq Ahmad"
                    required
                    className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#D4A359] ${
                      isDark
                        ? 'bg-[#132620] border-white/20 text-white placeholder-slate-400'
                        : 'bg-[#FBF9F4] border-[#EBE6DC] text-[#0F2F24] placeholder-slate-400'
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
                    placeholder="e.g. Lahore, DHA"
                    className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#D4A359] ${
                      isDark
                        ? 'bg-[#132620] border-white/20 text-white placeholder-slate-400'
                        : 'bg-[#FBF9F4] border-[#EBE6DC] text-[#0F2F24] placeholder-slate-400'
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

              {/* Purity Guarantee Badge */}
              <div className="p-2.5 rounded-xl bg-[#1D8354]/10 border border-[#1D8354]/30 flex items-center gap-2 text-[11px] text-[#1D8354] dark:text-[#E8C882]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Verified Buyer reviews help home chefs across Pakistan choose genuine organic dairy.</span>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#C85A32] to-[#B54D27] hover:from-[#B54D27] hover:to-[#A3401D] text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all active:scale-[0.99]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Publish Review</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
