import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TRANSLATIONS } from '../constants';

interface InfoHubProps {
  lang: 'fa' | 'en';
  appVersion: string;
  defaultSubTab?: 'about' | 'vaziri' | 'changelog';
}

export const InfoHub: React.FC<InfoHubProps> = ({ 
  lang, 
  appVersion, 
  defaultSubTab = 'about'
}) => {
  const [activeTab, setActiveTab] = useState<'about' | 'vaziri' | 'changelog'>(defaultSubTab);

  useEffect(() => {
    setActiveTab(defaultSubTab);
  }, [defaultSubTab]);

  const t = TRANSLATIONS[lang];

  const changelogData = [
    {
      version: '2.3.0',
      date: lang === 'fa' ? 'شهریور ۱۴۰۵' : 'August 2026',
      notes: lang === 'fa' ? [
        'افزودن نوار ناوبری پایینی اختصاصی (Bottom Navigation Bar) با دسترسی ارگونومیک به تمام بخش‌ها',
        'قرارگیری هوشمندانه تب نشان‌شده در کنار تب محاسبه‌گر برای دسترسی سریع‌تر',
        'تجمیع خلاصه، روان و شکیل بخش‌های «درباره ما»، «درباره وزیری» و «نسخه‌ها» در تب چهارم',
        'طراحی آیکون‌های وکتور مدرن و خطی برای ناوبری زیربخش‌های درباره',
        'افزودن مترونوم اختصاصی و فوق‌العاده دقیق با سنتز صوتی بدون تأخیر (Web Audio API)'
      ] : [
        'Dedicated mobile Bottom Navigation Bar for an ergonomic native experience.',
        'Grouped Favorites tab directly beside Calculator for rapid switching.',
        'Unified concise, streamlined About Us, About Vaziri, and Changelog in Tab 4.',
        'Modern line-art vector SVG icons across all info subtabs.',
        'High-precision Persian Metronome powered by zero-latency Web Audio API scheduling.'
      ]
    },
    {
      version: '2.2.0',
      date: lang === 'fa' ? 'مرداد ۱۴۰۵' : 'August 2026',
      notes: lang === 'fa' ? [
        'تمرکز کامل بر ۷ دستگاه اصلی موسیقی اصیل ایرانی',
        'بهینه‌سازی عمیق سرعت و پاسخ‌دهی صوتی با سیستم نگاشت فواصل O(1)',
        'بازطراحی مدرن و جذاب صفحه اسپلش (Splash Screen)'
      ] : [
        'Dedicated focus exclusively on the 7 primary Persian Dastgahs.',
        'Optimized audio synthesis engine with O(1) interval mapping.',
        'Modern Splash Screen redesign inspired by Persian musical aesthetics.'
      ]
    },
    {
      version: '2.1.0',
      date: lang === 'fa' ? 'تیر ۱۴۰۵' : 'July 2026',
      notes: lang === 'fa' ? [
        'طراحی باکس کپسولی مات برای دکمه‌های هدر با تفکیک خطوط عمودی',
        'بهبود پایداری، بازخورد لمسی و هماهنگی بصری المان‌ها',
        'پشتیبانی کامل از تم تاریک و روشن شیشه‌ای'
      ] : [
        'Capsule header action bar design with elegant vertical dividers.',
        'Enhanced UI stability and haptic touch feedback.',
        'Full support for glassmorphic dark and light themes.'
      ]
    },
    {
      version: '2.0.0',
      date: lang === 'fa' ? 'خرداد ۱۴۰۵' : 'June 2026',
      notes: lang === 'fa' ? [
        'بازطراحی کامل رابط کاربری با تم لایم و دارک‌مود شیشه‌ای مدرن',
        'بازنویسی موتور صوتی با فرکانس‌های دقیق ربع‌پرده‌ای موسیقی ایرانی (Web Audio API)',
        'دوزبانه شدن کامل و هوشمند برنامه (پشتیبانی کامل از فارسی و انگلیسی)'
      ] : [
        'Complete UI redesign with Lime glassmorphism theme and advanced dark mode.',
        'Rewrote audio engine for precise microtonal frequencies of Persian classical music.',
        'Full bilingual support with instant translation switch (Persian & English).'
      ]
    },
    {
      version: '1.0.0',
      date: lang === 'fa' ? 'آبان ۱۴۰۴' : 'November 2025',
      notes: lang === 'fa' ? [
        'انتشار نسخه اولیه اپلیکیشن با پشتیبانی از دستگاه‌های اصلی موسیقی ایران',
        'تبدیل هوشمند درجات گام به نت‌های متناظر همراه با ربع‌پرده‌ها'
      ] : [
        'Initial release supporting main Dastgahs of Persian classical music.',
        'Smart conversion of scale degrees to equivalent notes including quarter-tones.'
      ]
    }
  ];

  return (
    <motion.div
      key="info-hub"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="flex-grow flex flex-col gap-3 select-none"
    >
      {/* Top Segmented Sub-Navigation Tabs with Modern SVG Icons */}
      <div className="w-full grid grid-cols-3 bg-white/80 dark:bg-gray-900/80 p-1.5 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm gap-1 shrink-0 backdrop-blur-md">
        
        {/* Tab 1: درباره ما (About Us) */}
        <button
          onClick={() => setActiveTab('about')}
          className={`py-2 px-1 rounded-xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'about'
              ? 'bg-brand-lime text-brand-dark dark:bg-lime-400 dark:text-brand-dark shadow-sm scale-[1.02]'
              : 'text-brand-dark/50 dark:text-gray-400 hover:text-brand-dark dark:hover:text-white'
          }`}
        >
          {/* Modern Users / Identity Icon */}
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>{lang === 'fa' ? 'درباره ما' : 'About Us'}</span>
        </button>

        {/* Tab 2: درباره وزیری (About Vaziri) */}
        <button
          onClick={() => setActiveTab('vaziri')}
          className={`py-2 px-1 rounded-xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'vaziri'
              ? 'bg-brand-lime text-brand-dark dark:bg-lime-400 dark:text-brand-dark shadow-sm scale-[1.02]'
              : 'text-brand-dark/50 dark:text-gray-400 hover:text-brand-dark dark:hover:text-white'
          }`}
        >
          {/* Modern Music & Theory Scroll Icon */}
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
          <span>{lang === 'fa' ? 'درباره وزیری' : 'About Vaziri'}</span>
        </button>

        {/* Tab 3: نسخه‌ها (Changelog) */}
        <button
          onClick={() => setActiveTab('changelog')}
          className={`py-2 px-1 rounded-xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer relative ${
            activeTab === 'changelog'
              ? 'bg-brand-lime text-brand-dark dark:bg-lime-400 dark:text-brand-dark shadow-sm scale-[1.02]'
              : 'text-brand-dark/50 dark:text-gray-400 hover:text-brand-dark dark:hover:text-white'
          }`}
        >
          {/* Modern Version / Changelog Tag Icon */}
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <span>{lang === 'fa' ? 'نسخه‌ها' : 'Changelog'}</span>
        </button>
      </div>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        
        {/* ============================================================== */}
        {/* SUB-TAB 1: درباره ما (ABOUT US - CONCISE & REFINED)           */}
        {/* ============================================================== */}
        {activeTab === 'about' && (
          <motion.section
            key="about-subtab"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-4 sm:p-5 rounded-3xl shadow-sm border border-white dark:border-gray-800 space-y-3.5"
          >
            {/* Header */}
            <div className="text-center space-y-1 border-b border-brand-dark/5 dark:border-white/5 pb-2.5">
              <h3 className="text-lg sm:text-xl font-black text-brand-dark dark:text-white tracking-tight">
                {t.aboutTitle}
              </h3>
              <div className="inline-flex items-center justify-center gap-2 px-2.5 py-0.5 rounded-full bg-brand-gray/60 dark:bg-gray-800/60 border border-brand-dark/5 dark:border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-lime"></span>
                <span className="text-[10.5px] font-bold text-brand-dark/60 dark:text-gray-300">
                  {lang === 'fa' ? 'روایت عدد و نغمه در موسیقی دستگاهی ایران' : 'Mathematics & Melody in Persian Dastgahs'}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-lime"></span>
              </div>
            </div>

            {/* Concise Content Cards */}
            <div className="space-y-2.5">
              
              {/* 1. Core Identity & Mission */}
              <div className="p-3.5 bg-gradient-to-br from-white via-brand-gray/20 to-brand-lime/10 dark:from-gray-800 dark:via-gray-800/90 dark:to-lime-950/20 rounded-2xl border border-brand-dark/10 dark:border-white/10 shadow-xs space-y-1">
                <div className="flex items-center gap-1.5 text-brand-dark dark:text-white font-black text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-lime"></span>
                  <span>{lang === 'fa' ? 'هویت و رسالت برنامه' : 'Identity & Mission'}</span>
                </div>
                <p className="text-xs leading-relaxed text-brand-dark/85 dark:text-gray-200 text-justify">
                  {lang === 'fa'
                    ? 'کُرنوسُری ابزاری دقیق، تخصصی و کاملاً رایگان است که برای محاسبه درجات، فواصل و ساختار مدال هفت دستگاه اصلی موسیقی ایرانی طراحی شده تا پلی میان تکنولوژی روز و اصالت موسیقی دستگاهی باشد.'
                    : 'Koronosori is a precise, dedicated, and free tool crafted to calculate scale degrees, intervals, and modal structures of the seven Persian Dastgahs, bridging modern technology with classical heritage.'}
                </p>
              </div>

              {/* 2. Supervisor & Direct Connect Links */}
              <div className="p-3.5 bg-gradient-to-br from-brand-lime/20 via-brand-lime/10 to-transparent dark:from-lime-950/40 dark:via-lime-900/20 dark:to-transparent rounded-2xl border border-brand-lime/40 dark:border-lime-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-brand-dark dark:text-gray-100">
                  <span className="w-6 h-6 rounded-lg bg-brand-dark text-white dark:bg-white dark:text-brand-dark flex items-center justify-center text-xs font-black shrink-0">
                    ✓
                  </span>
                  <div className="leading-tight flex flex-wrap items-center gap-1">
                    <span>{lang === 'fa' ? 'ناظر فنی و کیفی: عارف هاشمی راد' : 'Technical Supervisor: Aref Hashemi Rad'}</span>
                    <a
                      href="https://t.me/arefashemi"
                      target="_blank"
                      rel="noopener noreferrer"
                      dir="ltr"
                      className="text-blue-600 dark:text-blue-400 hover:underline font-black px-1.5 py-0.5 rounded-md bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/40 text-[10.5px]"
                    >
                      @arefashemi
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
                  <motion.a
                    href="https://t.me/arefashemi"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="h-7 px-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-200/50 dark:border-blue-700/30 flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors shadow-xs text-[10.5px] font-bold"
                  >
                    <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.686c.223-.195-.054-.285-.346-.09l-6.4 4.024-2.76-.86c-.6-.185-.61-.6.125-.89l10.736-4.136c.498-.185.938.11.725.993z"/>
                    </svg>
                    <span>تلگرام</span>
                  </motion.a>

                  <motion.a
                    href="https://instagram.com/arefashemi"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="h-7 px-2.5 rounded-xl bg-pink-50 dark:bg-pink-900/30 border border-pink-200/50 dark:border-pink-700/30 flex items-center gap-1 text-pink-600 dark:text-pink-400 hover:bg-pink-100 dark:hover:bg-pink-900/50 transition-colors shadow-xs text-[10.5px] font-bold"
                  >
                    <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                    <span>اینستاگرام</span>
                  </motion.a>
                </div>
              </div>

              {/* 3. Acknowledgments & AI Tech */}
              <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30 space-y-1 text-justify text-xs leading-relaxed text-amber-950 dark:text-amber-200/90 shadow-xs">
                <div className="flex items-center gap-1.5 font-bold text-xs text-amber-800 dark:text-amber-300">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>
                  <span>{lang === 'fa' ? 'پیشینه و سپاسگزاری' : 'Origins & Acknowledgments'}</span>
                </div>
                <p>
                  {lang === 'fa'
                    ? 'ایده اولیه این ابزار پیش‌تر به همت آقای فاضل مستخدمین حسینی طراحی شده بود که انگیزه‌بخش آغاز این مسیر گردید. این نسخه با به‌کارگیری هوش مصنوعی توسعه یافته است.'
                    : 'The initial concept was previously created by Mr. Fazel Mostakhdemin Hosseini, inspiring our journey. This edition is powered by Artificial Intelligence.'}
                </p>
              </div>

            </div>
          </motion.section>
        )}

        {/* ============================================================== */}
        {/* SUB-TAB 2: درباره وزیری (ABOUT VAZIRI - CONCISE & REFINED)     */}
        {/* ============================================================== */}
        {activeTab === 'vaziri' && (
          <motion.section
            key="vaziri-subtab"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-4 sm:p-5 rounded-3xl shadow-sm border border-white dark:border-gray-800 space-y-3.5"
          >
            {/* Header Title */}
            <div className="text-center space-y-1 border-b border-brand-dark/5 dark:border-white/5 pb-2.5">
              <h3 className="text-lg sm:text-xl font-black text-brand-dark dark:text-white">
                {t.vaziriTitle}
              </h3>
              <p className="text-[10px] font-bold text-brand-dark/50 dark:text-gray-400 font-mono">
                {lang === 'fa' ? '۱۲۶۵ – ۱۳۵۸ خورشیدی | بنیان‌گذار تئوری نوین موسیقی ایران' : '1887 – 1979 | Pioneer of Modern Persian Music Theory'}
              </p>
            </div>

            {/* Concise Overview Statement */}
            <div className="p-3 bg-brand-lime/15 dark:bg-lime-950/35 rounded-2xl border border-brand-lime/30 text-brand-dark dark:text-lime-200 shadow-xs text-xs sm:text-[13px] leading-relaxed text-justify">
              <p>
                <strong className="font-black text-brand-dark dark:text-white">کلنل علینقی وزیری</strong> نخستین موسیقی‌دانی بود که با تحصیلات رسمی در اروپا، ساختار موسیقی سنتی ایران را از حالت سینه به سینه به دانشی مدون، آکادمیک و علمی تبدیل کرد.
              </p>
            </div>

            {/* 4 Concise Pillars Grid */}
            <div className="space-y-2">
              
              {/* Pillar 1 */}
              <div className="bg-white/80 dark:bg-gray-800/80 p-3 rounded-2xl border border-brand-dark/10 dark:border-white/10 shadow-xs space-y-1 text-xs">
                <div className="flex items-center gap-2 text-brand-dark dark:text-white font-black">
                  <span className="w-5 h-5 rounded-lg bg-brand-dark text-white dark:bg-white dark:text-brand-dark flex items-center justify-center text-[10px] font-mono shrink-0">۱</span>
                  <h4>تئوری ۲۴ ربع‌پرده‌ای و ابداع سُری و کُرُن</h4>
                </div>
                <p className="text-brand-dark/75 dark:text-gray-300 leading-relaxed text-justify pr-7">
                  تقسیم علمی گام به ۲۴ ربع‌پرده مساوی و ابداع دو نشانه بنیادین «سُری» و «کُرُن» که امروزه استاندارد رسمی نت‌نویسی موسیقی ایرانی است.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="bg-white/80 dark:bg-gray-800/80 p-3 rounded-2xl border border-brand-dark/10 dark:border-white/10 shadow-xs space-y-1 text-xs">
                <div className="flex items-center gap-2 text-brand-dark dark:text-white font-black">
                  <span className="w-5 h-5 rounded-lg bg-brand-dark text-white dark:bg-white dark:text-brand-dark flex items-center justify-center text-[10px] font-mono shrink-0">۲</span>
                  <h4>نت‌نویسی ردیف و متدهای آموزشی</h4>
                </div>
                <p className="text-brand-dark/75 dark:text-gray-300 leading-relaxed text-justify pr-7">
                  مکتوب‌سازی ردیف بر حامل و تألیف نخستین کتاب‌های متدولوژی تخصصی از جمله <em>دستور تار</em>، <em>دستور ویولن</em> و <em>موسیقی نظری</em>.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="bg-white/80 dark:bg-gray-800/80 p-3 rounded-2xl border border-brand-dark/10 dark:border-white/10 shadow-xs space-y-1 text-xs">
                <div className="flex items-center gap-2 text-brand-dark dark:text-white font-black">
                  <span className="w-5 h-5 rounded-lg bg-brand-dark text-white dark:bg-white dark:text-brand-dark flex items-center justify-center text-[10px] font-mono shrink-0">۳</span>
                  <h4>ورود هارمونی و ارکستراسیون ایرانی</h4>
                </div>
                <p className="text-brand-dark/75 dark:text-gray-300 leading-relaxed text-justify pr-7">
                  فرموله‌کردن اصول آکوردشناسی و چندصدایی برای نغمه‌های ایرانی و تدوین کتاب «آرمنی (هارمونی) موسیقی ایران».
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="bg-white/80 dark:bg-gray-800/80 p-3 rounded-2xl border border-brand-dark/10 dark:border-white/10 shadow-xs space-y-1 text-xs">
                <div className="flex items-center gap-2 text-brand-dark dark:text-white font-black">
                  <span className="w-5 h-5 rounded-lg bg-brand-dark text-white dark:bg-white dark:text-brand-dark flex items-center justify-center text-[10px] font-mono shrink-0">۴</span>
                  <h4>نهادسازی و مدرسه عالی موسیقی (۱۳۰۲)</h4>
                </div>
                <p className="text-brand-dark/75 dark:text-gray-300 leading-relaxed text-justify pr-7">
                  بنیان‌گذاری اولین مدرسه آکادمیک موسیقی در ایران و پرورش برجسته‌ترین اساتید نسل بعد نظیر <strong>روح‌الله خالقی</strong> و <strong>ابوالحسن صبا</strong>.
                </p>
              </div>

            </div>

            {/* Dedication Callout Box */}
            <div className="p-3 bg-brand-lime/25 dark:bg-lime-950/40 rounded-2xl border border-brand-lime/50 dark:border-lime-500/30 text-brand-dark dark:text-lime-100 shadow-xs">
              <p className="text-xs leading-relaxed font-semibold text-justify">
                این برنامه با آمیختن فناوری روز و موسیقی اصیل ایرانی، ادای احترامی است به روح بلند این استاد فرزانه.
              </p>
            </div>
          </motion.section>
        )}

        {/* ============================================================== */}
        {/* SUB-TAB 3: نسخه‌ها (CHANGELOG & VERSION)                       */}
        {/* ============================================================== */}
        {activeTab === 'changelog' && (
          <motion.section
            key="changelog-subtab"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-4 sm:p-5 rounded-3xl shadow-sm border border-white dark:border-gray-800 space-y-3.5"
          >
            {/* Version Header Card */}
            <div className="p-3.5 rounded-2xl bg-brand-lime/15 dark:bg-lime-950/30 border border-brand-lime/30 flex items-center justify-between shadow-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-brand-dark/60 dark:text-lime-200 block">
                  {lang === 'fa' ? 'نسخه فعال و پایدار نرم‌افزار' : 'Active Stable Version'}
                </span>
                <span className="text-xl sm:text-2xl font-black font-mono text-brand-dark dark:text-white">
                  v{appVersion}
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-dark text-white dark:bg-white dark:text-brand-dark text-[10.5px] font-black shadow-xs">
                <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse"></span>
                <span>{lang === 'fa' ? 'به‌روز و پایدار' : 'Up to Date'}</span>
              </div>
            </div>

            {/* Changelog History List */}
            <div className="space-y-2.5 pt-0.5">
              <h4 className="text-xs font-black text-brand-dark/70 dark:text-gray-300 flex items-center gap-1.5 px-0.5">
                <span className="w-2 h-2 rounded-full bg-brand-lime"></span>
                <span>{lang === 'fa' ? 'تاریخچه انتشار و بهینه‌سازی‌ها:' : 'Release History:'}</span>
              </h4>

              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {changelogData.map((item) => (
                  <div
                    key={item.version}
                    className={`p-3 rounded-2xl border transition-all ${
                      item.version === appVersion
                        ? 'bg-brand-lime/10 dark:bg-lime-950/20 border-brand-lime/40 dark:border-lime-500/30 shadow-xs'
                        : 'bg-white/60 dark:bg-gray-800/60 border-brand-dark/5 dark:border-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-black text-xs sm:text-sm text-brand-dark dark:text-white">
                          v{item.version}
                        </span>
                        {item.version === appVersion && (
                          <span className="text-[8px] font-black bg-brand-lime text-brand-dark px-1.5 py-0.5 rounded-full uppercase">
                            {lang === 'fa' ? 'نسخه فعال' : 'Active'}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-bold text-brand-dark/40 dark:text-gray-500">
                        {item.date}
                      </span>
                    </div>

                    <ul className="space-y-1 text-right text-[11px] leading-relaxed text-brand-dark/75 dark:text-gray-300 font-medium" dir={lang === 'fa' ? 'rtl' : 'ltr'}>
                      {item.notes.map((note, noteIdx) => (
                        <li key={noteIdx} className="flex items-start gap-1.5">
                          <span className="text-brand-lime dark:text-lime-500 font-bold mt-0.5 shrink-0">•</span>
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

      </AnimatePresence>
    </motion.div>
  );
};
