import React from 'react';
import { motion } from 'motion/react';
import { TRANSLATIONS, ALPHABET_NOTES } from '../constants';

interface PianoKeyProps {
  note: string;
  index: number;
  lang: 'fa' | 'en';
  notation?: 'solfege' | 'alphabet';
  active?: boolean;
  onClick?: () => void;
}

export const PianoKey: React.FC<PianoKeyProps> = ({ 
  note, 
  index, 
  lang, 
  notation = 'solfege', 
  active = false,
  onClick 
}) => {
  if (!note) return null;

  // Detect accidental using space-based splitting
  const firstSpaceIndex = note.indexOf(' ');
  const baseNote = firstSpaceIndex === -1 ? note : note.substring(0, firstSpaceIndex);
  const accidentText = firstSpaceIndex === -1 ? '' : note.substring(firstSpaceIndex + 1);
  const isAccidental = firstSpaceIndex !== -1;
  const isMicrotonal = accidentText === 'کرن' || accidentText === 'سری';

  const t = TRANSLATIONS[lang];
  const displayBase = notation === 'alphabet'
    ? (ALPHABET_NOTES[baseNote as keyof typeof ALPHABET_NOTES] || baseNote)
    : (t.notes[baseNote as keyof typeof t.notes] || baseNote);
  const displayAcc = accidentText ? (t.accidentals[accidentText as keyof typeof t.accidentals] || accidentText) : '';
  
  const textClass = active 
    ? "text-brand-dark" 
    : "text-brand-dark dark:text-white";

  return (
    <motion.button 
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ 
        opacity: 1, 
        scale: active ? 1.04 : 1, 
        y: active ? -2 : 0,
        boxShadow: active 
          ? "0 16px 30px -4px rgba(211,243,106,0.6), 0 0 0 2px #d3f36a"
          : "0 2px 8px -2px rgba(0,0,0,0.06), 0 1px 2px 0 rgba(0,0,0,0.04)"
      }}
      transition={{ 
        type: "spring",
        stiffness: 400,
        damping: 25,
        delay: active ? 0 : index * 0.03 
      }}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.94 }}
      className={`relative flex flex-col justify-between w-full aspect-[4/4.3] p-2 sm:p-2.5 rounded-2xl select-none overflow-hidden transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-brand-lime cursor-pointer group ${
        active
          ? "bg-brand-lime dark:bg-lime-400 text-brand-dark ring-2 ring-brand-lime shadow-[0_0_24px_rgba(211,243,106,0.6)]"
          : isMicrotonal
            ? "bg-gradient-to-b from-brand-lime/[0.08] via-white to-white dark:from-brand-lime/[0.12] dark:via-zinc-900 dark:to-zinc-900 border border-brand-lime/40 dark:border-brand-lime/30 shadow-[0_2px_10px_rgba(211,243,106,0.06)]"
            : isAccidental 
              ? "bg-gradient-to-b from-amber-500/[0.04] via-white to-white dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900 border border-black/[0.06] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.03)]" 
              : "bg-white dark:bg-zinc-900 border border-black/[0.06] dark:border-white/[0.08] hover:border-black/15 dark:hover:border-white/20 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
      }`}
      title={lang === 'fa' ? `پخش نت ${displayBase} ${displayAcc} (درجه ${index + 1})` : `Play note ${displayBase} ${displayAcc} (Degree ${index + 1})`}
    >
      {/* Top Header: Degree index and microtone indicator */}
      <div className="flex items-center justify-between w-full text-[10px] font-mono font-bold leading-none">
        <span className={`${active ? 'text-brand-dark/40' : 'text-brand-dark/30 dark:text-white/30'}`}>
          {index + 1}
        </span>
        {isMicrotonal && (
          <span className={`w-2 h-2 rounded-full ${active ? 'bg-brand-dark' : 'bg-brand-lime shadow-[0_0_6px_#d3f36a] animate-pulse'}`}></span>
        )}
      </div>

      {/* Center Note Name */}
      <div className="flex items-center justify-center py-0.5">
        <span className={`text-xl sm:text-2xl font-black transition-transform duration-200 group-hover:scale-105 leading-none tracking-tight ${textClass}`}>
          {displayBase}
        </span>
      </div>

      {/* Bottom Accidental Badge or Natural Indicator */}
      <div className="w-full flex items-center justify-center h-4.5">
        {displayAcc ? (
          <span className={`text-[9.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md leading-none ${
            active 
              ? 'bg-black/15 text-brand-dark' 
              : isMicrotonal
                ? 'bg-brand-lime/25 dark:bg-brand-lime/20 text-brand-dark dark:text-lime-300 border border-brand-lime/40 dark:border-brand-lime/30 font-black'
                : 'bg-black/5 dark:bg-white/10 text-brand-dark/75 dark:text-gray-200 border border-black/5 dark:border-white/5'
          }`}>
            {displayAcc}
          </span>
        ) : (
          <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-brand-dark/40' : 'bg-black/15 dark:bg-white/20'}`}></span>
        )}
      </div>
    </motion.button>
  );
};