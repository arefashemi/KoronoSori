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
      initial={{ opacity: 0, scale: 0.85, y: 15 }}
      animate={{ 
        opacity: 1, 
        scale: active ? 1.05 : 1, 
        y: active ? -3 : 0,
        boxShadow: active 
          ? "0 14px 25px -4px rgba(211,243,106,0.5), 0 6px 10px -2px rgba(211,243,106,0.3)"
          : "0 4px 6px -1px rgba(0,0,0,0.06), 0 2px 4px -1px rgba(0,0,0,0.04)"
      }}
      transition={{ 
        type: "spring",
        stiffness: 350,
        damping: 24,
        delay: active ? 0 : index * 0.035 
      }}
      whileHover={{ scale: 1.04, y: -3 }}
      whileTap={{ scale: 0.93 }}
      className={`relative flex flex-col w-full aspect-[4/4.3] rounded-2xl select-none overflow-hidden transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-brand-lime cursor-pointer group ${
        active
          ? "bg-brand-lime dark:bg-lime-400 border-2 border-brand-lime dark:border-lime-400"
          : isAccidental 
            ? "bg-gradient-to-b from-lime-50 to-lime-100/90 dark:from-lime-950/40 dark:to-lime-900/60 border border-brand-lime/40 dark:border-lime-700/40 shadow-[0_3px_0_0_rgba(163,230,53,0.3)] dark:shadow-[0_3px_0_0_rgba(0,0,0,0.3)]" 
            : "bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-100 dark:border-gray-700 shadow-[0_3px_0_0_rgba(0,0,0,0.05)] dark:shadow-[0_3px_0_0_rgba(0,0,0,0.3)]"
      }`}
      title={lang === 'fa' ? `پخش نت ${displayBase} ${displayAcc} (درجه ${index + 1})` : `Play note ${displayBase} ${displayAcc} (Degree ${index + 1})`}
    >
      <div className="flex-grow flex items-center justify-center">
        <span className={`text-xl sm:text-2xl font-black transition-transform duration-200 group-hover:scale-105 ${textClass}`}>
          {displayBase}
        </span>
      </div>

      {displayAcc ? (
        <div className={`h-5 w-full flex items-center justify-center ${active ? 'bg-black/10' : 'bg-black/5 dark:bg-white/5'}`}>
          <span className={`text-[9px] font-black uppercase tracking-widest ${active ? 'text-brand-dark/90' : 'text-brand-dark/70 dark:text-gray-300'}`}>
            {displayAcc}
          </span>
        </div>
      ) : (
        <div className="h-5 w-full flex items-center justify-center">
           <div className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-brand-dark' : 'bg-brand-lime dark:bg-lime-500'} opacity-60`}></div>
        </div>
      )}

      {/* Index Number */}
      <span className={`absolute top-2 ${lang === 'fa' ? 'right-2.5' : 'left-2.5'} text-[9.5px] font-mono font-black ${active ? 'text-brand-dark/30' : 'text-black/20 dark:text-white/20'}`}>
        {index + 1}
      </span>
    </motion.button>
  );
};