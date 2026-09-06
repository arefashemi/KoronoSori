import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TRANSLATIONS } from '../constants';

interface SupportModalProps {
  lang: 'fa' | 'en';
  onBack: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ lang, onBack }) => {
  const t = TRANSLATIONS[lang];
  const [activeTab, setActiveTab] = useState<'gateway' | 'share'>('gateway');
  const [selectedTier, setSelectedTier] = useState<number>(2);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [showRedirectNotice, setShowRedirectNotice] = useState(false);

  const paymentGateway = {
    zarinpalLink: 'https://zarinp.al/arefashemi',
    idpayLink: 'https://idpay.ir/arefashemi',
    gatewayName: lang === 'fa' ? 'درگاه پرداخت مستقیم شاپرک / زرین‌پال' : 'Shaparak / Secure Banking Gateway',
    shaba: 'IR820170000000123456789012',
    telegramHandle: 'arefashemi',
    appUrl: 'https://koronosori.ir'
  };

  const tiers = [
    {
      id: 1,
      icon: '☕️',
      amountFa: '۵۰,۰۰۰ تومان',
      amountEn: '50,000 Tomans ($1)',
      titleFa: 'یک فنجان قهوه',
      titleEn: 'A Cup of Coffee',
      descFa: 'انرژی و دلگرمی برای توسعه، بهبود و نگهداری برنامه',
      descEn: 'Heartwarming energy for development and maintenance'
    },
    {
      id: 2,
      icon: '🎵',
      amountFa: '۱۵۰,۰۰۰ تومان',
      amountEn: '150,000 Tomans ($3)',
      titleFa: 'حامی نغمه‌ها و دستگاه‌ها',
      titleEn: 'Scales & Rhythms Patron',
      descFa: 'پشتیبانی از توسعه مستمر و گسترش امکانات کاربردی جدید',
      descEn: 'Supporting continuous development and practical new features'
    },
    {
      id: 3,
      icon: '🚀',
      amountFa: '۳۵۰,۰۰۰ تومان',
      amountEn: '350,000 Tomans ($7)',
      titleFa: 'پایداری و زیرساخت سرور',
      titleEn: 'Server & Features Supporter',
      descFa: 'کمک به پایداری سرورها، بروزرسانی‌های مداوم و توسعه هوش مصنوعی',
      descEn: 'Sustaining ultra-fast hosting, AI features, and offline PWA'
    },
    {
      id: 4,
      icon: '💎',
      amountFa: '۷۰۰,۰۰۰ تومان',
      amountEn: '700,000 Tomans ($14)',
      titleFa: 'حامی ویژه کُرنوسُری',
      titleEn: 'Golden Patron',
      descFa: 'همراهی ویژه جهت ثبت نام در تالار افتخار دوستداران هنر موسیقی ایرانی',
      descEn: 'Honorary mention in our Iranian Classical Music Supporter Wall'
    }
  ];

  const handleOpenGateway = (amountUrl?: string) => {
    setShowRedirectNotice(true);
    const targetUrl = amountUrl || paymentGateway.zarinpalLink;
    setTimeout(() => {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
      setShowRedirectNotice(false);
    }, 800);
  };

  return (
    <motion.div
      key="support"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="bg-white dark:bg-gray-900 p-5 sm:p-7 rounded-[2.5rem] shadow-xl space-y-4 border border-gray-100 dark:border-gray-800 flex flex-col relative overflow-hidden"
    >
      {/* Decorative Ambient Accent */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-brand-lime/10 dark:bg-brand-lime/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Toast popup */}
      <AnimatePresence>
        {showRedirectNotice && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="absolute top-4 left-4 right-4 z-50 p-3.5 bg-brand-dark dark:bg-white text-white dark:text-brand-dark rounded-2xl shadow-xl flex items-center justify-center gap-2 text-xs font-black text-center"
          >
            <span className="text-base">🔒</span>
            <span>{lang === 'fa' ? 'در حال انتقال امن به درگاه پرداخت بانکی شاپرک...' : 'Redirecting to secure banking payment gateway...'}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="text-center space-y-2 shrink-0 pt-1">
        <div className="relative inline-block">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500/15 via-brand-lime/25 to-amber-500/15 dark:from-rose-500/25 dark:via-lime-400/20 dark:to-amber-400/20 flex items-center justify-center mx-auto shadow-inner border border-rose-500/20 dark:border-white/10">
            <motion.span 
              animate={{ scale: [1, 1.12, 1] }} 
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="text-3xl select-none"
            >
              ❤️
            </motion.span>
          </div>
        </div>

        <h2 className="text-2xl font-black text-brand-dark dark:text-white tracking-tight">
          {lang === 'fa' ? 'حمایت از توسعه کُرنوسُری' : 'Support Koronosori'}
        </h2>
        
        <p className="text-xs font-medium text-brand-dark/70 dark:text-gray-300 max-w-sm mx-auto leading-relaxed">
          {lang === 'fa' 
            ? 'کُرنوسُری یک ابزار تخصصی، رایگان و بدون تبلیغات است. پشتیبانی و همراهی شما به استمرار توسعه و بهبود امکانات برنامه کمک می‌کند.'
            : 'Koronosori is 100% free, independent, and ad-free. Your support directly sustains ongoing development and new features.'}
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="grid grid-cols-2 gap-1.5 p-1 bg-brand-gray/60 dark:bg-gray-800/60 rounded-2xl border border-brand-dark/5 dark:border-white/5 shrink-0">
        <button
          onClick={() => setActiveTab('gateway')}
          className={`py-2.5 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'gateway'
              ? 'bg-brand-dark text-white dark:bg-white dark:text-brand-dark shadow-sm'
              : 'text-brand-dark/60 dark:text-gray-400 hover:text-brand-dark dark:hover:text-white'
          }`}
        >
          <span>💳</span>
          <span>{lang === 'fa' ? 'درگاه پرداخت آنلاین بانکی' : 'Online Payment Gateway'}</span>
        </button>

        <button
          onClick={() => setActiveTab('share')}
          className={`py-2.5 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'share'
              ? 'bg-brand-dark text-white dark:bg-white dark:text-brand-dark shadow-sm'
              : 'text-brand-dark/60 dark:text-gray-400 hover:text-brand-dark dark:hover:text-white'
          }`}
        >
          <span>✨</span>
          <span>{lang === 'fa' ? 'حمایت معنوی و اشتراک' : 'Share & Care'}</span>
        </button>
      </div>

      {/* Tab 1: Payment Gateway */}
      {activeTab === 'gateway' && (
        <div className="space-y-4 pt-1">
          {/* Preset Amounts */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-brand-dark/60 dark:text-gray-400 block pr-1">
              {lang === 'fa' ? 'انتخاب مبلغ همیاری:' : 'Select Contribution Amount:'}
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {tiers.map((tier) => {
                const isSelected = selectedTier === tier.id && !customAmount;
                return (
                  <motion.div
                    key={tier.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedTier(tier.id);
                      setCustomAmount('');
                    }}
                    className={`p-3.5 rounded-2xl cursor-pointer transition-all border text-right relative overflow-hidden flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gradient-to-br from-brand-lime/30 via-brand-lime/10 to-transparent dark:from-lime-950/50 dark:via-lime-900/20 dark:to-transparent border-brand-lime dark:border-lime-500 shadow-sm'
                        : 'bg-white/70 dark:bg-gray-800/50 border-brand-dark/5 dark:border-white/5 hover:border-brand-dark/20'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full bg-brand-dark dark:bg-lime-400 animate-pulse"></div>
                    )}
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-base">{tier.icon}</span>
                        <h4 className="font-black text-xs text-brand-dark dark:text-white">
                          {lang === 'fa' ? tier.titleFa : tier.titleEn}
                        </h4>
                      </div>
                      <span className="text-[11px] font-mono font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                        {lang === 'fa' ? tier.amountFa : tier.amountEn}
                      </span>
                    </div>
                    <p className="text-[10px] text-brand-dark/70 dark:text-gray-400 font-medium leading-relaxed">
                      {lang === 'fa' ? tier.descFa : tier.descEn}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Custom Amount Input Option */}
          <div className="p-2.5 sm:p-3 bg-brand-gray/40 dark:bg-gray-800/50 rounded-2xl border border-brand-dark/5 dark:border-white/5 flex items-center justify-between gap-2 text-right overflow-hidden">
            <div className="shrink-0 text-[11px] sm:text-xs font-black text-brand-dark dark:text-white flex items-center gap-1.5">
              <span>✏️</span>
              <span>{lang === 'fa' ? 'مبلغ دلخواه (تومان):' : 'Custom (Toman):'}</span>
            </div>
            <div className="flex items-center gap-1.5 min-w-0 max-w-[140px] sm:max-w-[180px]">
              <input
                type="text"
                inputMode="numeric"
                placeholder={lang === 'fa' ? 'مثال: ۵۰۰,۰۰۰' : 'e.g. 500,000'}
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedTier(0);
                }}
                className="w-full min-w-0 text-center text-xs font-mono font-black bg-white dark:bg-gray-900 border border-brand-dark/10 dark:border-white/10 rounded-xl py-1.5 px-2.5 focus:outline-none focus:border-brand-lime shadow-inner"
              />
            </div>
          </div>

          {/* Direct Online Payment Button */}
          <div className="p-4 rounded-3xl bg-gradient-to-br from-gray-900 via-brand-dark to-slate-900 text-white shadow-xl border border-white/10 space-y-3 text-center relative overflow-hidden">
            <div className="flex items-center justify-center gap-2 text-xs font-black text-brand-lime">
              <span>🔒</span>
              <span>{paymentGateway.gatewayName}</span>
            </div>
            
            <p className="text-[11px] text-gray-300 font-medium leading-relaxed max-w-xs mx-auto">
              {lang === 'fa'
                ? 'پرداخت کاملاً امن، آنی و مستقیم با کلیه کارت‌های عضو شبکه بانکی شتاب'
                : 'Instant, secure checkout via all official banking cards'}
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenGateway(paymentGateway.zarinpalLink)}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-red-500 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 cursor-pointer transition-all"
            >
              <span>💳</span>
              <span>{lang === 'fa' ? 'ورود به درگاه پرداخت آنلاین' : 'Proceed to Secure Payment'}</span>
              <span className="text-xs">↗</span>
            </motion.button>
          </div>

          {/* Telegram Support & Receipt */}
          <div className="p-3 bg-brand-gray/50 dark:bg-gray-800/40 rounded-2xl border border-brand-dark/5 dark:border-white/5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-brand-dark/80 dark:text-gray-300">
              <span>💬</span>
              <span className="text-[11px] font-medium leading-relaxed">
                {lang === 'fa' 
                  ? 'جهت ثبت نام در تالار حامیان یا هرگونه پرسش می‌توانید در تلگرام پیام دهید.'
                  : 'You can message us on Telegram for supporter mentions or inquiries.'}
              </span>
            </div>
            <a
              href={`https://t.me/${paymentGateway.telegramHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-black text-[11px] hover:underline shrink-0 flex items-center gap-1"
            >
              <span>{lang === 'fa' ? 'تلگرام' : 'Telegram'}</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      )}

      {/* Tab 2: Moral Support / Sharing */}
      {activeTab === 'share' && (
        <div className="space-y-3.5 pt-1 text-right">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-brand-lime/15 to-transparent dark:from-amber-950/30 dark:via-lime-900/20 dark:to-transparent border border-amber-500/20 space-y-2">
            <div className="flex items-center gap-2 font-black text-xs text-brand-dark dark:text-white">
              <span>🌟</span>
              <span>{lang === 'fa' ? 'حمایت بدون هزینه: معرفی به جامعه موسیقی' : 'Zero-Cost Support: Share with Musicians'}</span>
            </div>
            <p className="text-xs text-brand-dark/80 dark:text-gray-300 leading-relaxed font-normal">
              {lang === 'fa'
                ? 'بزرگترین لطف شما به کُرنوسُری، معرفی آن به نوازندگان، هنرجویان و اساتید موسیقی ایرانی است. با اشتراک‌گذاری این ابزار در گسترش دانش علمی موسیقی سهیم شوید.'
                : 'Sharing Koronosori with music scholars, conservatory teachers, and instrumentalists is one of the most impactful ways to support our mission.'}
            </p>
          </div>

          {/* Direct Share Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={`https://t.me/share/url?url=${encodeURIComponent('https://koronosori.ir')}&text=${encodeURIComponent(lang === 'fa' ? 'کُرنوسُری: ابزار تخصصی و دقیق محاسبه فواصل و درجات هفت دستگاه موسیقی ایرانی' : 'Koronosori: Specialized tool for calculating intervals and scale degrees of Persian Dastgahs')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-2xl flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-black hover:bg-blue-100 transition-all cursor-pointer"
            >
              <span>✈️</span>
              <span>{lang === 'fa' ? 'اشتراک در تلگرام' : 'Share on Telegram'}</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(lang === 'fa' ? 'کُرنوسُری: محاسبه‌گر درجات گام و فواصل موسیقی ایرانی https://koronosori.ir' : 'Koronosori: Persian Dastgah scale degrees and intervals calculator https://koronosori.ir')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-black hover:bg-emerald-100 transition-all cursor-pointer"
            >
              <span>💬</span>
              <span>{lang === 'fa' ? 'اشتراک در واتس‌اپ' : 'Share on WhatsApp'}</span>
            </motion.a>
          </div>

          {/* Feedback Contact Box */}
          <div className="p-3.5 bg-white dark:bg-gray-800 rounded-2xl border border-brand-dark/10 dark:border-white/10 flex items-center justify-between text-xs">
            <div>
              <h5 className="font-black text-brand-dark dark:text-white text-xs">
                {lang === 'fa' ? 'پیشنهاد و ایده دارید؟' : 'Have ideas or suggestions?'}
              </h5>
              <p className="text-[10px] text-brand-dark/60 dark:text-gray-400">
                {lang === 'fa' ? 'دیدگاه‌های تخصصی شما در اولویت بروزرسانی بعدی است.' : 'Your expert suggestions are prioritized for the next update.'}
              </p>
            </div>
            <a
              href="https://t.me/arefashemi"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-brand-dark dark:bg-white text-white dark:text-brand-dark font-black text-xs hover:opacity-90"
            >
              {lang === 'fa' ? 'ارتباط مستقیم' : 'Contact'}
            </a>
          </div>
        </div>
      )}

      {/* Back Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onBack}
        className="w-full py-4 bg-brand-dark dark:bg-white dark:text-brand-dark text-white rounded-[2rem] font-black text-sm transition-all shadow-lg shrink-0 cursor-pointer mt-1 hover:opacity-95"
      >
        {t.backBtn}
      </motion.button>
    </motion.div>
  );
};
