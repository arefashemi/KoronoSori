import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TIPS_DATA, TIPS_CATEGORIES, TipItem } from '../data/tipsData';

interface TipsModalProps {
  lang: 'fa' | 'en';
  onBack: () => void;
}

export const TipsModal: React.FC<TipsModalProps> = ({ lang, onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Random tip generator state
  const [randomTipIndex, setRandomTipIndex] = useState<number>(() => {
    return Math.floor(Math.random() * TIPS_DATA.length);
  });

  const featuredTip = useMemo(() => {
    return TIPS_DATA[randomTipIndex] || TIPS_DATA[0];
  }, [randomTipIndex]);

  const handleNextRandomTip = useCallback(() => {
    setRandomTipIndex((prev) => {
      let next = Math.floor(Math.random() * TIPS_DATA.length);
      if (next === prev && TIPS_DATA.length > 1) {
        next = (prev + 1) % TIPS_DATA.length;
      }
      return next;
    });
  }, []);

  const handleCopyTip = useCallback((tip: TipItem) => {
    const title = lang === 'fa' ? tip.titleFa : tip.titleEn;
    const desc = lang === 'fa' ? tip.descFa : tip.descEn;
    const textToCopy = `💡 ${title}\n${desc}\n\n— کُرنوسُری (Koronosori)`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopiedId(tip.id);
        setTimeout(() => setCopiedId(null), 2000);
      });
    }
  }, [lang]);

  const filteredTips = useMemo(() => {
    return TIPS_DATA.filter((tip) => {
      const matchesCategory = selectedCategory === 'all' || tip.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const title = (lang === 'fa' ? tip.titleFa : tip.titleEn).toLowerCase();
      const desc = (lang === 'fa' ? tip.descFa : tip.descEn).toLowerCase();
      const tag = (lang === 'fa' ? tip.tagFa : tip.tagEn).toLowerCase();

      return title.includes(q) || desc.includes(q) || tag.includes(q);
    });
  }, [selectedCategory, searchQuery, lang]);

  return (
    <motion.div
      key="tips"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.25 }}
      className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-[2.5rem] shadow-xl space-y-4 border border-gray-100 dark:border-gray-800 flex flex-col relative overflow-hidden"
      dir={lang === 'fa' ? 'rtl' : 'ltr'}
    >
      {/* Decorative Brand Ambient Accent */}
      <div className="absolute top-0 right-0 w-44 h-44 bg-amber-400/10 dark:bg-amber-400/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="text-center space-y-1.5 shrink-0 pt-1">
        <div className="flex items-center justify-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-amber-400/20 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xl shadow-sm">
            💡
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-brand-dark dark:text-white tracking-tight">
            {lang === 'fa' ? 'نکات و ترفندها' : 'Tips & Tricks'}
          </h2>
        </div>

        <p className="text-xs font-medium text-brand-dark/60 dark:text-gray-400 max-w-sm mx-auto leading-relaxed">
          {lang === 'fa'
            ? 'مجموعه‌ای از نکات کاربردی تئوری ردیف، فواصل، کوک‌ها و ترفندهای کُرنوسُری'
            : 'A rich treasury of Persian music theory, intervals, tunings, and Koronosori pro shortcuts'}
        </p>
      </div>

      {/* Featured Random Tip Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/15 via-brand-lime/10 to-transparent dark:from-amber-950/40 dark:via-lime-950/20 dark:to-transparent border border-amber-500/30 dark:border-amber-400/20 relative shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-base">{featuredTip.icon}</span>
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300">
              {lang === 'fa' ? 'نکته تصادفی' : 'Featured Tip'}
            </span>
          </div>

          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={handleNextRandomTip}
            className="px-2.5 py-1 rounded-xl bg-white dark:bg-gray-800 text-brand-dark dark:text-white text-[11px] font-bold shadow-sm hover:bg-amber-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-1 cursor-pointer"
            title={lang === 'fa' ? 'نمایش نکته دیگر' : 'Next tip'}
          >
            <span>🎲</span>
            <span>{lang === 'fa' ? 'نکته بعدی' : 'Next Tip'}</span>
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={featuredTip.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="space-y-1"
          >
            <h4 className="text-xs sm:text-sm font-black text-brand-dark dark:text-white">
              {lang === 'fa' ? featuredTip.titleFa : featuredTip.titleEn}
            </h4>
            <p className="text-[11px] sm:text-xs text-brand-dark/80 dark:text-gray-300 font-medium leading-relaxed">
              {lang === 'fa' ? featuredTip.descFa : featuredTip.descEn}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={lang === 'fa' ? 'جستجو در نکات و ترفندها...' : 'Search tips and shortcuts...'}
          className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-brand-gray/50 dark:bg-gray-800/60 border border-brand-dark/10 dark:border-white/10 text-brand-dark dark:text-white placeholder:text-brand-dark/40 dark:placeholder:text-gray-500 focus:outline-none focus:border-brand-lime transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className={`absolute top-1/2 -translate-y-1/2 text-brand-dark/40 dark:text-gray-400 hover:text-brand-dark dark:hover:text-white text-xs ${
              lang === 'fa' ? 'left-3' : 'right-3'
            }`}
          >
            ✕
          </button>
        )}
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar shrink-0" style={{ scrollbarWidth: 'none' }}>
        {TIPS_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-brand-dark text-white dark:bg-white dark:text-brand-dark shadow-sm'
                  : 'bg-brand-gray/60 dark:bg-gray-800/60 text-brand-dark/60 dark:text-gray-400 hover:text-brand-dark dark:hover:text-white'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{lang === 'fa' ? cat.labelFa : cat.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* Tips Count Badge */}
      <div className="flex justify-between items-center text-[10px] font-bold text-brand-dark/50 dark:text-gray-400 px-1">
        <span>
          {lang === 'fa' 
            ? `${filteredTips.length} نکته در دسترس` 
            : `${filteredTips.length} tips available`}
        </span>
        <span className="text-[10px] text-amber-600 dark:text-amber-400 font-black">
          {lang === 'fa' ? 'مجموع ۴۰ نکته تخصصی' : 'Total 40 curated tips'}
        </span>
      </div>

      {/* Scrollable Tips List */}
      <div 
        className="flex-grow overflow-y-auto max-h-[380px] space-y-2.5 pr-0.5" 
        style={{ scrollbarWidth: 'thin' }}
      >
        {filteredTips.length === 0 ? (
          <div className="text-center py-8 space-y-2">
            <span className="text-2xl">🔍</span>
            <p className="text-xs text-brand-dark/50 dark:text-gray-400 font-medium">
              {lang === 'fa' ? 'نکته‌ای با این عبارت یافت نشد.' : 'No tips matched your search query.'}
            </p>
          </div>
        ) : (
          filteredTips.map((tip) => {
            const isCopied = copiedId === tip.id;
            return (
              <div
                key={tip.id}
                className="p-3.5 rounded-2xl bg-white dark:bg-gray-800/60 border border-brand-dark/5 dark:border-white/5 hover:border-brand-lime/50 dark:hover:border-lime-500/30 transition-all space-y-1.5 shadow-sm group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base shrink-0">{tip.icon}</span>
                    <h3 className="text-xs sm:text-sm font-black text-brand-dark dark:text-white">
                      {lang === 'fa' ? tip.titleFa : tip.titleEn}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-brand-gray/80 dark:bg-gray-700 text-brand-dark/60 dark:text-gray-300">
                      {lang === 'fa' ? tip.tagFa : tip.tagEn}
                    </span>
                    <motion.button
                      whileTap={{ scale: 0.88 }}
                      onClick={() => handleCopyTip(tip)}
                      className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                        isCopied 
                          ? 'bg-emerald-500 text-white' 
                          : 'text-brand-dark/40 dark:text-gray-400 hover:text-brand-dark dark:hover:text-white hover:bg-brand-gray dark:hover:bg-gray-700'
                      }`}
                      title={lang === 'fa' ? 'کپی نکته' : 'Copy tip'}
                    >
                      {isCopied ? (
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                      )}
                    </motion.button>
                  </div>
                </div>

                <p className="text-[11px] sm:text-xs text-brand-dark/75 dark:text-gray-300 font-medium leading-relaxed">
                  {lang === 'fa' ? tip.descFa : tip.descEn}
                </p>
              </div>
            );
          })
        )}
      </div>

      {/* Back Button */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={onBack}
        className="w-full py-3.5 bg-brand-dark dark:bg-white text-white dark:text-brand-dark rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg transition-all cursor-pointer shrink-0 mt-2"
      >
        {lang === 'fa' ? 'بازگشت به برنامه' : 'Back to App'}
      </motion.button>
    </motion.div>
  );
};
