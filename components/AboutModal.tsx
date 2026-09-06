import React from 'react';
import { motion } from 'motion/react';
import { TRANSLATIONS } from '../constants';

interface AboutModalProps {
  lang: 'fa' | 'en';
  onBack: () => void;
  onOpenSupport?: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ lang, onBack, onOpenSupport }) => {
  const t = TRANSLATIONS[lang];

  // Parse paragraphs while preserving 100% original text
  const paragraphs = t.aboutDesc.split('\n').filter((p) => p.trim().length > 0);

  return (
    <motion.div
      key="about"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white dark:bg-gray-900 p-5 sm:p-7 rounded-[2.5rem] shadow-xl space-y-4 border border-gray-100 dark:border-gray-800 flex flex-col relative overflow-hidden"
    >
      {/* Header */}
      <div className="text-center space-y-1.5 shrink-0 pt-1">
        <h2 className="text-2xl font-black text-brand-dark dark:text-white tracking-tight">
          {t.aboutTitle}
        </h2>
        <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-brand-gray/60 dark:bg-gray-800/60 border border-brand-dark/5 dark:border-white/5">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-lime"></span>
          <span className="text-[11px] font-bold text-brand-dark/60 dark:text-gray-300">
            {lang === 'fa' ? 'روایتی از عدد و نغمه در موسیقی دستگاهی ایران' : 'Mathematics & Melody in Persian Dastgahs'}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-lime"></span>
        </div>
      </div>

      {/* Structured Content Grid */}
      <div className="space-y-3 pt-1">
        {paragraphs.map((paragraph, idx) => {
          // Keep original content clean of leading bullet symbol if needed for display
          const cleanText = paragraph.startsWith('• ') ? paragraph.substring(2) : paragraph;
          const isSupervisor = cleanText.includes('@arefashemi');
          const isAi = cleanText.includes('هوش مصنوعی') || cleanText.includes('Artificial Intelligence') || cleanText.includes('AI');
          const isAppreciation = cleanText.includes('فاضل مستخدمین') || cleanText.includes('Fazel');
          const isHistorical = cleanText.includes('علینقی') || cleanText.includes('Vaziri');
          const isPrimaryIntro = idx === 0;

          // 1. Technical & Quality Supervisor Card
          if (isSupervisor) {
            const parts = cleanText.split('@arefashemi');
            return (
              <div
                key={idx}
                className="p-4 sm:p-4.5 bg-gradient-to-br from-brand-lime/25 via-brand-lime/10 to-transparent dark:from-lime-950/40 dark:via-lime-900/20 dark:to-transparent rounded-2xl border border-brand-lime/40 dark:border-lime-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm transition-all"
              >
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-brand-dark dark:text-gray-100">
                  <span className="w-7 h-7 rounded-xl bg-brand-dark text-white dark:bg-white dark:text-brand-dark flex items-center justify-center text-xs font-black shrink-0 shadow-sm">
                    ✓
                  </span>
                  <div className="leading-relaxed flex flex-wrap items-center gap-1.5">
                    <span>{parts[0].trim()}</span>
                    <a
                      href="https://t.me/arefashemi"
                      target="_blank"
                      rel="noopener noreferrer"
                      dir="ltr"
                      className="text-blue-600 dark:text-blue-400 hover:underline font-black inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/40"
                    >
                      <span>@arefashemi</span>
                    </a>
                    {parts[1] && <span>{parts[1].trim()}</span>}
                  </div>
                </div>

                {/* Supervisor Social Connect Links */}
                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <motion.a
                    href="https://t.me/arefashemi"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="h-8 px-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-200/50 dark:border-blue-700/30 flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors shadow-sm text-xs font-bold"
                    title="Telegram"
                  >
                    <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.686c.223-.195-.054-.285-.346-.09l-6.4 4.024-2.76-.86c-.6-.185-.61-.6.125-.89l10.736-4.136c.498-.185.938.11.725.993z"/>
                    </svg>
                    <span className="text-[11px] font-sans">Telegram</span>
                  </motion.a>

                  <motion.a
                    href="https://instagram.com/arefashemi"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="h-8 px-2.5 rounded-xl bg-pink-50 dark:bg-pink-900/30 border border-pink-200/50 dark:border-pink-700/30 flex items-center gap-1.5 text-pink-600 dark:text-pink-400 hover:bg-pink-100 dark:hover:bg-pink-900/50 transition-colors shadow-sm text-xs font-bold"
                    title="Instagram"
                  >
                    <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                    <span className="text-[11px] font-sans">Instagram</span>
                  </motion.a>
                </div>
              </div>
            );
          }

          // 2. AI Technology Card
          if (isAi) {
            return (
              <div
                key={idx}
                className="p-3.5 sm:p-4 bg-brand-gray/50 dark:bg-gray-800/50 rounded-2xl border border-brand-dark/5 dark:border-white/5 flex items-center gap-3 text-xs sm:text-sm font-medium text-brand-dark/80 dark:text-gray-300 shadow-sm"
              >
                <span className="w-7 h-7 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 flex items-center justify-center text-xs shrink-0 font-bold">
                  ✨
                </span>
                <p className="leading-relaxed font-normal">{cleanText}</p>
              </div>
            );
          }

          // 3. Primary Introduction / Core Identity Card
          if (isPrimaryIntro) {
            return (
              <div
                key={idx}
                className="p-4 sm:p-5 bg-gradient-to-br from-white via-brand-gray/20 to-brand-lime/10 dark:from-gray-800 dark:via-gray-800/90 dark:to-lime-950/20 rounded-2xl border border-brand-dark/10 dark:border-white/10 shadow-sm space-y-1.5"
              >
                <div className="flex items-center gap-2 text-brand-dark dark:text-white font-black text-xs sm:text-sm">
                  <span className="w-2 h-2 rounded-full bg-brand-lime"></span>
                  <span>{lang === 'fa' ? 'هویت و رسالت' : 'Identity & Mission'}</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-brand-dark/85 dark:text-gray-200 text-justify font-normal">
                  {cleanText}
                </p>
              </div>
            );
          }

          // 4. Appreciation / Origins Card
          if (isAppreciation) {
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30 space-y-1.5 text-justify text-xs sm:text-sm leading-relaxed text-amber-950 dark:text-amber-200/90 shadow-sm"
              >
                <div className="flex items-center gap-1.5 font-bold text-xs text-amber-800 dark:text-amber-300">
                  <span>🌱</span>
                  <span>{lang === 'fa' ? 'قدردانی و پیشینه' : 'Acknowledgments & Origins'}</span>
                </div>
                <p className="font-normal">{cleanText}</p>
              </div>
            );
          }

          // 5. Historical Inspiration / Vaziri Card
          if (isHistorical) {
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 border border-brand-dark/10 dark:border-white/10 space-y-1.5 text-justify text-xs sm:text-sm leading-relaxed text-brand-dark/85 dark:text-gray-200 shadow-sm"
              >
                <div className="flex items-center gap-1.5 font-bold text-xs text-brand-dark dark:text-lime-300">
                  <span>🎻</span>
                  <span>{lang === 'fa' ? 'الهام از مکتب وزیری' : 'Inspired by Vaziri’s School'}</span>
                </div>
                <p className="font-normal">{cleanText}</p>
              </div>
            );
          }

          // Standard Content Card
          return (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white/70 dark:bg-gray-800/70 border border-brand-dark/5 dark:border-white/5 space-y-1 text-justify text-xs sm:text-sm leading-relaxed text-brand-dark/80 dark:text-gray-300 shadow-sm"
            >
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-dark/40 dark:bg-gray-400 mt-2 shrink-0"></span>
                <p className="font-normal">{cleanText}</p>
              </div>
            </div>
          );
        })}

        {/* Support Us Card */}
        {onOpenSupport && (
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={onOpenSupport}
            dir={lang === 'fa' ? 'rtl' : 'ltr'}
            className="p-4 bg-gradient-to-r from-rose-500/15 via-red-500/10 to-rose-600/15 dark:from-rose-950/45 dark:via-red-950/35 dark:to-rose-900/40 rounded-2xl border border-rose-500/30 dark:border-rose-400/25 shadow-sm flex items-center justify-between gap-3 cursor-pointer group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/40 text-rose-500 flex items-center justify-center text-lg shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                ❤️
              </span>
              <div className={`flex flex-col min-w-0 ${lang === 'fa' ? 'text-right' : 'text-left'}`}>
                <h4 className="text-xs sm:text-sm font-black text-rose-950 dark:text-rose-100 flex items-center gap-1.5 leading-tight">
                  <span>{lang === 'fa' ? 'حمایت از توسعه کُرنوسُری' : 'Support Koronosori Development'}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 font-bold border border-rose-500/20">♥</span>
                </h4>
                <p className="text-[10px] sm:text-[11px] text-rose-950/70 dark:text-rose-200/70 font-medium mt-0.5 leading-tight">
                  {lang === 'fa' ? 'کمک به پایداری سرورها، بهبود برنامه و امکانات جدید' : 'Support server stability, app improvements & new features'}
                </p>
              </div>
            </div>
            <div className={`w-7 h-7 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center text-xs font-black shadow-sm shrink-0 transition-transform ${lang === 'fa' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
              {lang === 'fa' ? '←' : '→'}
            </div>
          </motion.div>
        )}
      </div>

      {/* Back Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onBack}
        className="w-full py-4 bg-brand-dark dark:bg-white dark:text-brand-dark text-white rounded-[2rem] font-black text-base transition-all shadow-lg shrink-0 cursor-pointer mt-1 hover:opacity-95"
      >
        {t.backBtn}
      </motion.button>
    </motion.div>
  );
};
