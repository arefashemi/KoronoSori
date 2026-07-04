import React from 'react';
import { motion } from 'motion/react';
import { TRANSLATIONS, ALPHABET_NOTES } from '../constants';

interface PianoKeyProps {
  note: string;
  index: number;
  lang: 'fa' | 'en';
  notation?: 'solfege' | 'alphabet';
  active?: boolean;
}

export const PianoKey: React.FC<PianoKeyProps> = ({ note, index, lang, notation = 'solfege', active = false }) => {
  if (!note) return null;

  // Detect accidental using space-based splitting
  const firstSpaceIndex = note.indexOf(' ');
  const baseNote = firstSpaceIndex === -1 ? note : note.substring(0, firstSpaceIndex);
  const accidentText = firstSpaceIndex === -1 ? '' : note.substring(firstSpaceIndex + 1);
  const isAccidental = firstSpaceIndex !== -1;

  const t = TRANSLATIONS[lang];
  const displayBase = notation === 'alphabet'
    ? (ALPHABET_NOTES[baseNote as keyof typeof ALPHABET_NOTES] || baseNote)
    : (t.notes[baseNote as keyof typeof t.notes] || baseNote);
  const displayAcc = accidentText ? (t.accidentals[accidentText as keyof typeof t.accidentals] || accidentText) : '';
  
  const textClass = active 
    ? "text-brand-dark" 
    : "text-brand-dark dark:text-white";

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ 
        opacity: 1, 
        scale: active ? 1.08 : 1, 
        y: active ? -4 : 0,
        boxShadow: active 
          ? "0 10px 15px -3px rgba(163,230,53,0.3), 0 4px 6px -2px rgba(163,230,53,0.15)"
          : "0 4px 6px -1px rgba(0,0,0,0.1)"
      }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: active ? 0 : index * 0.05 
      }}
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.95 }}
      className={`relative flex flex-col w-full aspect-[4/4.3] rounded-xl cursor-default select-none overflow-hidden transition-colors duration-200 ${
        active
          ? "bg-brand-lime dark:bg-lime-400 border-2 border-brand-lime dark:border-lime-400"
          : isAccidental 
            ? "bg-gradient-to-b from-lime-100 to-lime-200 dark:from-lime-900/40 dark:to-lime-900/60 shadow-[0_3px_0_0_rgba(163,230,53,0.3)] dark:shadow-[0_3px_0_0_rgba(0,0,0,0.3)]" 
            : "bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-100 dark:border-gray-700 shadow-[0_3px_0_0_rgba(0,0,0,0.05)] dark:shadow-[0_3px_0_0_rgba(0,0,0,0.3)]"
      }`}
    >
      <div className="flex-grow flex items-center justify-center">
        <span className={`text-xl sm:text-2xl font-black ${textClass}`}>
          {displayBase}
        </span>
      </div>

      {displayAcc ? (
        <div className={`h-5 flex items-center justify-center ${active ? 'bg-black/10' : 'bg-black/5 dark:bg-white/5'}`}>
          <span className={`text-[9px] font-black uppercase tracking-widest ${active ? 'text-brand-dark/80' : 'text-brand-dark/60 dark:text-gray-400'}`}>
            {displayAcc}
          </span>
        </div>
      ) : (
        <div className="h-5 flex items-center justify-center">
           <div className={`w-1 h-1 rounded-full ${active ? 'bg-brand-dark' : 'bg-brand-lime dark:bg-lime-500'} opacity-40`}></div>
        </div>
      )}

      {/* Index Number */}
      <span className={`absolute top-2 ${lang === 'fa' ? 'right-2' : 'left-2'} text-[9px] font-black ${active ? 'text-brand-dark/20' : 'text-black/10 dark:text-white/10'}`}>
        {index + 1}
      </span>
    </motion.div>
  );
};