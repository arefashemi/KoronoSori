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
      type: 'coffee' as const,
      amountFa: '۵۰,۰۰۰ تومان',
      amountEn: '50,000 Tomans ($1)',
      titleFa: 'یک فنجان قهوه',
      titleEn: 'A Cup of Coffee',
      descFa: 'انرژی و دلگرمی برای توسعه، بهبود و نگهداری برنامه',
      descEn: 'Heartwarming energy for development and maintenance'
    },
    {
      id: 2,
      type: 'music' as const,
      amountFa: '۱۵۰,۰۰۰ تومان',
      amountEn: '150,000 Tomans ($3)',
      titleFa: 'حامی نغمه‌ها و دستگاه‌ها',
      titleEn: 'Scales & Rhythms Patron',
      descFa: 'پشتیبانی از توسعه مستمر و گسترش امکانات کاربردی جدید',
      descEn: 'Supporting continuous development and practical new features'
    },
    {
      id: 3,
      type: 'server' as const,
      amountFa: '۳۵۰,۰۰۰ تومان',
      amountEn: '350,000 Tomans ($7)',
      titleFa: 'پایداری و زیرساخت سرور',
      titleEn: 'Server & Features Supporter',
      descFa: 'کمک به پایداری سرورها، بروزرسانی‌های مداوم و توسعه هوش مصنوعی',
      descEn: 'Sustaining ultra-fast hosting, AI features, and offline PWA'
    },
    {
      id: 4,
      type: 'patron' as const,
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

  // Render unified modern SVG icons matching InfoHub style
  const renderTierIcon = (type: 'coffee' | 'music' | 'server' | 'patron') => {
    switch (type) {
      case 'coffee':
        return (
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 dark:border-amber-400/20 flex items-center justify-center shrink-0 text-amber-600 dark:text-amber-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
            </svg>
          </div>
        );
      case 'music':
        return (
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 dark:bg-emerald-400/10 border border-emerald-500/20 dark:border-emerald-400/20 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
        );
      case 'server':
        return (
          <div className="w-8 h-8 rounded-xl bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/20 dark:border-blue-400/20 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
          </div>
        );
      case 'patron':
        return (
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 dark:bg-purple-400/10 border border-purple-500/20 dark:border-purple-400/20 flex items-center justify-center shrink-0 text-purple-600 dark:text-purple-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 15 10-15-10-5zM2 7h20M12 22V7M7.5 4.5l3.5 2.5 3.5-2.5" />
            </svg>
          </div>
        );
    }
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
            <svg className="w-4 h-4 shrink-0 text-brand-lime dark:text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>{lang === 'fa' ? 'در حال انتقال امن به درگاه پرداخت بانکی شاپرک...' : 'Redirecting to secure banking payment gateway...'}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header with Unified Modern Icon Badge */}
      <div className="text-center space-y-2 shrink-0 pt-1">
        <div className="relative inline-block">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500/15 via-brand-lime/25 to-amber-500/15 dark:from-rose-500/25 dark:via-lime-400/20 dark:to-amber-400/20 flex items-center justify-center mx-auto shadow-inner border border-rose-500/20 dark:border-white/10">
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }} 
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="text-rose-500 dark:text-rose-400 flex items-center justify-center"
            >
              <svg className="w-8 h-8 fill-rose-500/20 dark:fill-rose-400/25" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </motion.div>
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

      {/* Navigation Sub-Tabs with Modern SVG Icons */}
      <div className="grid grid-cols-2 gap-1.5 p-1 bg-brand-gray/60 dark:bg-gray-800/60 rounded-2xl border border-brand-dark/5 dark:border-white/5 shrink-0">
        <button
          onClick={() => setActiveTab('gateway')}
          className={`py-2.5 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'gateway'
              ? 'bg-brand-dark text-white dark:bg-white dark:text-brand-dark shadow-sm'
              : 'text-brand-dark/60 dark:text-gray-400 hover:text-brand-dark dark:hover:text-white'
          }`}
        >
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <span>{lang === 'fa' ? 'درگاه پرداخت آنلاین بانکی' : 'Online Payment Gateway'}</span>
        </button>

        <button
          onClick={() => setActiveTab('share')}
          className={`py-2.5 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'share'
              ? 'bg-brand-dark text-white dark:bg-white dark:text-brand-dark shadow-sm'
              : 'text-brand-dark/60 dark:text-gray-400 hover:text-brand-dark dark:hover:text-white'
          }`}
        >
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
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
                    className={`p-3 rounded-2xl cursor-pointer transition-all border text-right relative overflow-hidden flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gradient-to-br from-brand-lime/30 via-brand-lime/10 to-transparent dark:from-lime-950/50 dark:via-lime-900/20 dark:to-transparent border-brand-lime dark:border-lime-500 shadow-sm'
                        : 'bg-white/70 dark:bg-gray-800/50 border-brand-dark/5 dark:border-white/5 hover:border-brand-dark/20'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full bg-brand-dark dark:bg-lime-400 animate-pulse"></div>
                    )}
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        {renderTierIcon(tier.type)}
                        <h4 className="font-black text-xs text-brand-dark dark:text-white">
                          {lang === 'fa' ? tier.titleFa : tier.titleEn}
                        </h4>
                      </div>
                      <span className="text-[11px] font-mono font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                        {lang === 'fa' ? tier.amountFa : tier.amountEn}
                      </span>
                    </div>
                    <p className="text-[10px] text-brand-dark/70 dark:text-gray-400 font-medium leading-relaxed pr-10">
                      {lang === 'fa' ? tier.descFa : tier.descEn}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Custom Amount Input Option */}
          <div className="p-2.5 sm:p-3 bg-brand-gray/40 dark:bg-gray-800/50 rounded-2xl border border-brand-dark/5 dark:border-white/5 flex items-center justify-between gap-2 text-right overflow-hidden">
            <div className="shrink-0 text-[11px] sm:text-xs font-black text-brand-dark dark:text-white flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-black/5 dark:bg-white/10 flex items-center justify-center text-brand-dark/70 dark:text-gray-300">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
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

          {/* Direct Online Payment Box */}
          <div className="p-4 sm:p-5 rounded-3xl bg-brand-lime dark:bg-lime-600/95 text-brand-dark shadow-xl border border-brand-lime/50 dark:border-lime-400/40 space-y-3.5 text-center relative overflow-hidden transition-colors duration-300">
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full border-[20px] border-white/25 opacity-50 pointer-events-none"></div>

            <div className="flex items-center justify-center gap-2 text-xs font-black text-brand-dark/90 dark:text-lime-950">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>{paymentGateway.gatewayName}</span>
            </div>
            
            <p className="text-[11px] sm:text-xs text-brand-dark/80 dark:text-lime-950/90 font-bold leading-relaxed max-w-xs mx-auto">
              {lang === 'fa'
                ? 'پرداخت کاملاً امن، آنی و مستقیم با کلیه کارت‌های عضو شبکه بانکی شتاب'
                : 'Instant, secure checkout via all official banking cards'}
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenGateway(paymentGateway.zarinpalLink)}
              className="w-full py-3.5 px-4 bg-brand-dark hover:bg-black dark:bg-gray-950 dark:hover:bg-black text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-dark/25 cursor-pointer transition-all border border-brand-dark/20"
            >
              <svg className="w-4 h-4 shrink-0 text-brand-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span>{lang === 'fa' ? 'ورود به درگاه پرداخت آنلاین شاپرک' : 'Proceed to Secure Payment'}</span>
              <svg className="w-4 h-4 shrink-0 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </motion.button>
          </div>

          {/* Telegram Support & Receipt */}
          <div className="p-3 bg-brand-gray/50 dark:bg-gray-800/40 rounded-2xl border border-brand-dark/5 dark:border-white/5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5 text-brand-dark/80 dark:text-gray-300">
              <div className="w-7 h-7 rounded-lg bg-brand-dark/5 dark:bg-white/10 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
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
              className="px-2.5 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-black text-[11px] hover:underline shrink-0 flex items-center gap-1 border border-blue-200/50 dark:border-blue-800/40"
            >
              <span>{lang === 'fa' ? 'تلگرام' : 'Telegram'}</span>
              <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>
        </div>
      )}

      {/* Tab 2: Moral Support / Sharing */}
      {activeTab === 'share' && (
        <div className="space-y-3.5 pt-1 text-right">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-brand-lime/15 to-transparent dark:from-amber-950/30 dark:via-lime-900/20 dark:to-transparent border border-amber-500/20 space-y-2">
            <div className="flex items-center gap-2 font-black text-xs text-brand-dark dark:text-white">
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 dark:bg-amber-400/20 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
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
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
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
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>{lang === 'fa' ? 'اشتراک در واتس‌اپ' : 'Share on WhatsApp'}</span>
            </motion.a>
          </div>

          {/* Feedback Contact Box */}
          <div className="p-3.5 bg-white dark:bg-gray-800 rounded-2xl border border-brand-dark/10 dark:border-white/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-brand-lime/20 dark:bg-lime-400/20 text-brand-dark dark:text-lime-300 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h5 className="font-black text-brand-dark dark:text-white text-xs">
                  {lang === 'fa' ? 'پیشنهاد و ایده دارید؟' : 'Have ideas or suggestions?'}
                </h5>
                <p className="text-[10px] text-brand-dark/60 dark:text-gray-400">
                  {lang === 'fa' ? 'دیدگاه‌های تخصصی شما در اولویت بروزرسانی بعدی است.' : 'Your expert suggestions are prioritized for the next update.'}
                </p>
              </div>
            </div>
            <a
              href="https://t.me/arefashemi"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-brand-dark dark:bg-white text-white dark:text-brand-dark font-black text-xs hover:opacity-90 flex items-center gap-1 shrink-0"
            >
              <span>{lang === 'fa' ? 'ارتباط مستقیم' : 'Contact'}</span>
              <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
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
