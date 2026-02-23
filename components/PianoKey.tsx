import React from 'react';
import { motion } from 'motion/react';
import { TRANSLATIONS } from '../constants';

interface PianoKeyProps {
  note: string;
  index: number;
  lang: 'fa' | 'en';
}

export const PianoKey: React.FC<PianoKeyProps> = ({ note, index, lang }) => {
  if (!note) return null;

  // Detect accidental
  const isSori = note.includes('سری');
  const isKoron = note.includes('کرن');
  const isFlat = note.includes('بمل');
  const isSharp = note.includes('دیز');
  const isAccidental = isSori || isKoron || isFlat || isSharp;

  const accidentalsMap: Record<string, string> = {
    'سری': 'سری', 'کرن': 'کرن', 'بمل': 'بمل', 'دیز': 'دیز'
  };

  let baseNote = note;
  let accidentText = '';

  for (const acc in accidentalsMap) {
    if (note.includes(acc)) {
      baseNote = note.replace(` ${acc}`, '').replace(acc, '');
      accidentText = acc;
      break;
    }
  }

  const t = TRANSLATIONS[lang];
  const displayBase = t.notes[baseNote as keyof typeof t.notes] || baseNote;
  const displayAcc = accidentText ? (t.accidentals[accidentText as keyof typeof t.accidentals] || accidentText) : '';
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: index * 0.05 
      }}
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.95 }}
      className={`relative flex flex-col w-full aspect-[3/4] rounded-2xl cursor-default select-none overflow-hidden ${
        isAccidental 
          ? "bg-gradient-to-b from-lime-100 to-lime-200 dark:from-lime-900/40 dark:to-lime-900/60 shadow-[0_4px_0_0_rgba(163,230,53,0.3)] dark:shadow-[0_4px_0_0_rgba(0,0,0,0.3)]" 
          : "bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-100 dark:border-gray-700 shadow-[0_4px_0_0_rgba(0,0,0,0.05)] dark:shadow-[0_4px_0_0_rgba(0,0,0,0.3)]"
      }`}
    >
      <div className="flex-grow flex items-center justify-center">
        <span className="text-2xl sm:text-3xl font-black text-brand-dark dark:text-white">
          {displayBase}
        </span>
      </div>

      {displayAcc ? (
        <div className="h-8 flex items-center justify-center bg-black/5 dark:bg-white/5">
          <span className="text-[10px] font-black text-brand-dark/60 dark:text-gray-400 uppercase tracking-widest">
            {displayAcc}
          </span>
        </div>
      ) : (
        <div className="h-8 flex items-center justify-center">
           <div className="w-1.5 h-1.5 rounded-full bg-brand-lime dark:bg-lime-500 opacity-40"></div>
        </div>
      )}

      {/* Index Number */}
      <span className={`absolute top-2 ${lang === 'fa' ? 'right-2' : 'left-2'} text-[9px] font-black text-black/10 dark:text-white/10`}>
        {index + 1}
      </span>
    </motion.div>
  );
};