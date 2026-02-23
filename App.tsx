import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PianoKey } from './components/PianoKey';
import { getScaleNotes } from './utils/musicTheory';
import { ScaleType } from './types';
import { ROOT_OPTIONS, ACCIDENTAL_OPTIONS, TRANSLATIONS } from './constants';

const App: React.FC = () => {
  const [selectedRoot, setSelectedRoot] = useState<string>('سل');
  const [selectedAccidental, setSelectedAccidental] = useState<string>('بکار');
  const [selectedScaleType, setSelectedScaleType] = useState<string>('شور');
  const [copied, setCopied] = useState(false);
  const [lang, setLang] = useState<'fa' | 'en'>('fa');
  const [darkMode, setDarkMode] = useState(false);
  const [view, setView] = useState<'home' | 'about' | 'vaziri' | 'support'>('home');

  const t = TRANSLATIONS[lang];

  const scaleOptions = useMemo(() => [
    { label: 'شور', value: 'شور', type: ScaleType.SHUR },
    { label: 'سه گاه', value: 'سه گاه', type: ScaleType.SEGAH },
    { label: 'چهارگاه', value: 'چهارگاه', type: ScaleType.CHAHARGAH },
    { label: 'ماهور', value: 'ماهور', type: ScaleType.MAHUR },
    { label: 'همایون', value: 'همایون', type: ScaleType.HOMAYOUN },
    { label: 'نوا', value: 'نوا', type: ScaleType.NAVA },
    { label: 'راست پنجگاه', value: 'راست پنجگاه', type: ScaleType.RAST_PANJGAH },
  ], []);

  const scaleTypeEnum = useMemo(() => 
    scaleOptions.find(o => o.value === selectedScaleType)?.type || ScaleType.SHUR
  , [scaleOptions, selectedScaleType]);

  const resultNotes = useMemo(() => 
    getScaleNotes(selectedRoot, selectedAccidental, scaleTypeEnum)
  , [selectedRoot, selectedAccidental, scaleTypeEnum]);

  const displayLabels = useMemo(() => {
    const translatedRoot = t.notes[selectedRoot as keyof typeof t.notes] || selectedRoot;
    const translatedAccidental = selectedAccidental === 'بکار' 
      ? '' 
      : (t.accidentals[selectedAccidental as keyof typeof t.accidentals] || selectedAccidental);
    const displayRoot = translatedAccidental ? `${translatedRoot} ${translatedAccidental}` : translatedRoot;
    const rawScaleName = scaleOptions.find(o => o.value === selectedScaleType)?.label || '';
    const displayScaleName = t.scales[rawScaleName as keyof typeof t.scales] || rawScaleName;
    return { displayRoot, displayScaleName };
  }, [lang, selectedRoot, selectedAccidental, selectedScaleType, scaleOptions, t]);

  const copyToClipboard = useCallback(() => {
    if (resultNotes.length === 0) return;
    const octaveNote = resultNotes[0];
    const fullNotesList = [...resultNotes, octaveNote];
    const translateFullNote = (noteStr: string) => {
        let base = noteStr, acc = '';
        if(noteStr.includes('سری')) { base = noteStr.replace(' سری',''); acc='سری'; }
        else if(noteStr.includes('کرن')) { base = noteStr.replace(' کرن',''); acc='کرن'; }
        else if(noteStr.includes('دیز')) { base = noteStr.replace(' دیز','').replace('دیز',''); acc='دیز'; }
        else if(noteStr.includes('بمل')) { base = noteStr.replace(' بمل',''); acc='بمل'; }
        const trBase = t.notes[base as keyof typeof t.notes] || base;
        const trAcc = acc ? (t.accidentals[acc as keyof typeof t.accidentals] || acc) : '';
        return trAcc ? `${trBase} ${trAcc}` : trBase;
    };
    const textToCopy = `${displayLabels.displayScaleName} ${displayLabels.displayRoot}: \n${fullNotesList.map(translateFullNote).join(' - ')}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [resultNotes, t, displayLabels]);

  return (
    <div className={`flex flex-col min-h-screen font-sans transition-colors duration-500 ${darkMode ? 'dark bg-gray-950 text-white' : 'bg-brand-gray text-brand-dark'}`} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      <main className="flex-grow px-4 pt-4 pb-2 max-w-md mx-auto w-full flex flex-col relative">
        <div className="w-full flex justify-between items-center mb-4" dir="ltr">
          <div className="flex gap-2">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setLang(l => l === 'fa' ? 'en' : 'fa')} 
              className="px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-white dark:border-gray-700 shadow-sm hover:shadow-md text-[10px] font-black tracking-widest text-brand-dark dark:text-white"
            >
              {lang === 'fa' ? 'EN' : 'FA'}
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setDarkMode(!darkMode)} 
              className="px-3 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-white dark:border-gray-700 shadow-sm hover:shadow-md text-xs text-brand-dark dark:text-white"
            >
              {darkMode ? '☀️' : '🌙'}
            </motion.button>
          </div>

          <motion.h1 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-black text-brand-dark dark:text-white tracking-tighter select-none drop-shadow-sm"
          >
            {t.appTitle}
          </motion.h1>
        </div>
        
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex-grow flex flex-col"
            >
              <div className="flex-grow flex flex-col gap-2 py-2">
                <section className="bg-brand-lime dark:bg-lime-600/90 p-4 rounded-[2.5rem] shadow-[0_20px_50px_-15px_rgba(211,243,106,0.5)] dark:shadow-none space-y-4 relative overflow-hidden transition-colors duration-500">
                   <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full border-[25px] border-white/20 opacity-40 pointer-events-none"></div>
                   <p className="text-center text-base font-black text-brand-dark/80 dark:text-lime-50 leading-tight whitespace-pre-line px-2">{t.instruction}</p>
  
                   <div className="space-y-4">
                      <div className="flex flex-col gap-1.5">
                         <label className="text-brand-dark/60 dark:text-lime-100/70 text-[10px] font-black flex items-center gap-2 pr-1 uppercase tracking-widest">
                           <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
                           {t.scaleLabel}
                         </label>
                         <select value={selectedScaleType} onChange={(e) => setSelectedScaleType(e.target.value)} className="appearance-none w-full bg-white/90 dark:bg-gray-900/50 backdrop-blur-sm text-brand-dark dark:text-white p-4 rounded-2xl border-none shadow-inner focus:ring-2 focus:ring-brand-dark/5 outline-none transition-all duration-300 font-sans text-sm font-black">
                           {scaleOptions.map(opt => <option key={opt.value} value={opt.value}>{t.scales[opt.value as keyof typeof t.scales] || opt.value}</option>)}
                         </select>
                      </div>
  
                      <div className="flex gap-4">
                        <div className="w-3/5">
                           <div className="flex flex-col gap-1.5">
                              <label className="text-brand-dark/60 dark:text-lime-100/70 text-[10px] font-black flex items-center gap-2 pr-1 uppercase tracking-widest">
                                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                                {t.rootLabel}
                              </label>
                              <select value={selectedRoot} onChange={(e) => setSelectedRoot(e.target.value)} className="appearance-none w-full bg-white/90 dark:bg-gray-900/50 backdrop-blur-sm text-brand-dark dark:text-white p-4 rounded-2xl border-none shadow-inner focus:ring-2 focus:ring-brand-dark/5 outline-none transition-all duration-300 font-sans text-sm font-black">
                                {ROOT_OPTIONS.map(opt => <option key={opt} value={opt}>{t.notes[opt as keyof typeof t.notes] || opt}</option>)}
                              </select>
                           </div>
                        </div>
                        <div className="w-2/5">
                           <div className="flex flex-col gap-1.5">
                              <label className="text-brand-dark/60 dark:text-lime-100/70 text-[10px] font-black flex items-center gap-2 pr-1 uppercase tracking-widest">
                                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>
                                {t.accLabel}
                              </label>
                              <select value={selectedAccidental} onChange={(e) => setSelectedAccidental(e.target.value)} className="appearance-none w-full bg-white/90 dark:bg-gray-900/50 backdrop-blur-sm text-brand-dark dark:text-white p-4 rounded-2xl border-none shadow-inner focus:ring-2 focus:ring-brand-dark/5 outline-none transition-all duration-300 font-sans text-sm font-black">
                                {ACCIDENTAL_OPTIONS.map(opt => <option key={opt} value={opt}>{t.accidentals[opt as keyof typeof t.accidentals] || opt}</option>)}
                              </select>
                           </div>
                        </div>
                      </div>
                   </div>
                </section>
  
                <section className="pt-1 pb-2">
                   <div className="flex items-center justify-between w-full gap-2">
                     {/* Right: Label (In RTL) */}
                     <div className="shrink-0">
                       <span className="text-[10px] font-black text-brand-dark/40 dark:text-gray-500 uppercase tracking-widest">
                         {lang === 'fa' ? 'نتیجه محاسبه:' : 'RESULT:'}
                       </span>
                     </div>

                     {/* Center: Scale Name */}
                     <div className="flex-grow text-center">
                       <div className="text-3xl font-black text-brand-dark dark:text-white tracking-tighter leading-tight select-none">
                          {lang === 'fa' ? <>{displayLabels.displayScaleName} {displayLabels.displayRoot}</> : <>{displayLabels.displayRoot} {displayLabels.displayScaleName}</>}
                       </div>
                     </div>

                     {/* Left: Copy Button (In RTL) */}
                     <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={copyToClipboard} 
                      className="shrink-0 w-12 h-12 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-center group transition-colors"
                     >
                        <AnimatePresence mode="wait">
                          {copied ? (
                            <motion.svg key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></motion.svg>
                          ) : (
                            <motion.svg key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="w-6 h-6 text-brand-dark/30 dark:text-gray-500 group-hover:text-brand-dark dark:group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></motion.svg>
                          )}
                        </AnimatePresence>
                     </motion.button>
                   </div>
  
                  <div className="grid grid-cols-4 gap-3 pt-2">
                    {resultNotes.map((note, index) => <PianoKey key={`${note}-${index}`} note={note} index={index} lang={lang} />)}
                    {resultNotes.length > 0 && <PianoKey key="octave-note" note={resultNotes[0]} index={7} lang={lang} />}
                  </div>
                </section>
              </div>

              {/* Support Button - Pushed below the fold */}
              <div className="pt-12 pb-12">
                 <motion.button 
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setView('support')} 
                  className="w-full group relative overflow-hidden bg-gradient-to-br from-pink-50 to-orange-50 dark:from-pink-900/10 dark:to-orange-900/10 border border-pink-100 dark:border-pink-900/30 rounded-[2rem] p-4 shadow-sm hover:shadow-lg flex items-center justify-center gap-4"
                 >
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm text-pink-500">
                      <svg className="w-5 h-5 animate-pulse" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    </div>
                    <span className="font-black text-brand-dark/70 dark:text-white/70 text-sm tracking-widest uppercase">{t.supportBtn}</span>
                 </motion.button>
              </div>
            </motion.div>
          )}
          
          {view === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-[3rem] shadow-2xl space-y-6 border border-gray-100 dark:border-gray-800"
            >
               <div className="w-20 h-20 bg-brand-lime dark:bg-lime-700 rounded-[2rem] flex items-center justify-center mx-auto mb-4 rotate-6 shadow-xl"><span className="text-4xl">🎵</span></div>
               <h2 className="text-2xl font-black text-center text-brand-dark dark:text-white">{t.aboutTitle}</h2>
               <p className="text-center text-brand-dark/70 dark:text-gray-400 leading-relaxed font-medium whitespace-pre-line text-base">{t.aboutDesc}</p>
               <motion.button whileTap={{ scale: 0.95 }} onClick={() => setView('home')} className="w-full py-5 bg-brand-dark dark:bg-white dark:text-brand-dark text-white rounded-[2rem] font-black text-lg transition-all shadow-lg">{t.backBtn}</motion.button>
            </motion.div>
          )}

          {view === 'vaziri' && (
            <motion.div
              key="vaziri"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-[3rem] shadow-2xl space-y-6 border border-gray-100 dark:border-gray-800 overflow-hidden relative"
            >
               <h2 className="text-2xl font-black text-center text-brand-dark dark:text-white">{t.vaziriTitle}</h2>
               <div className="space-y-4">
                  <p className="text-center text-brand-dark/70 dark:text-gray-400 leading-relaxed font-medium whitespace-pre-line text-sm bg-brand-gray/50 dark:bg-gray-800/50 p-6 rounded-[2rem] border border-brand-dark/5 dark:border-white/5 shadow-inner">
                    {t.vaziriDesc}
                  </p>
               </div>
               
               <motion.button whileTap={{ scale: 0.95 }} onClick={() => setView('home')} className="w-full py-5 bg-brand-dark dark:bg-white dark:text-brand-dark text-white rounded-[2rem] font-black text-lg shadow-xl transition-all">
                 {t.backBtn}
               </motion.button>
            </motion.div>
          )}

          {view === 'support' && (
            <motion.div
              key="support"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-[3rem] shadow-2xl space-y-6 overflow-hidden relative border-4 border-pink-50 dark:border-pink-900/10 flex flex-col items-center"
            >
               <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-orange-400 to-pink-500"></div>
               <div className="w-24 h-24 bg-pink-50 dark:bg-pink-900/20 rounded-full flex items-center justify-center mb-2 shadow-inner shrink-0">
                 <span className="text-5xl animate-bounce pt-2">❤️</span>
               </div>
               <h2 className="text-2xl font-black text-center text-brand-dark dark:text-white w-full">{t.supportTitle}</h2>
               <p className="text-center text-brand-dark/70 dark:text-gray-400 leading-relaxed font-medium whitespace-pre-line text-sm bg-pink-50/50 dark:bg-pink-900/10 p-5 rounded-[2rem] w-full">
                 {t.supportDesc}
               </p>

               <div className="space-y-4 w-full">
                 <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 px-8 bg-brand-dark dark:bg-white dark:text-brand-dark text-white rounded-[2rem] font-black transition-all flex items-center justify-between shadow-xl"
                 >
                   <span>{t.supportTier3}</span>
                   <span className="text-[10px] opacity-60 font-black bg-white/20 dark:bg-black/10 px-3 py-1 rounded-full uppercase tracking-widest">PayPing / ZarinPal</span>
                 </motion.button>
               </div>
               
               <button onClick={() => setView('home')} className="w-full py-4 text-brand-dark/30 dark:text-gray-600 font-black hover:text-brand-dark dark:hover:text-white transition-colors text-xs uppercase tracking-widest">
                 {t.backBtn}
               </button>
            </motion.div>
          )}
        </AnimatePresence>

        </main>

       <footer className="text-center py-4 mt-auto">
          <AnimatePresence>
            {view === 'home' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center gap-6 mb-2"
              >
                <button onClick={() => setView('about')} className="text-[10px] font-black text-brand-dark/40 dark:text-gray-600 hover:text-brand-dark dark:hover:text-white transition-colors uppercase tracking-widest">{t.aboutLink}</button>
                <span className="text-brand-dark/10 dark:text-gray-800">|</span>
                <button onClick={() => setView('vaziri')} className="text-[10px] font-black text-brand-dark/40 dark:text-gray-600 hover:text-brand-dark dark:hover:text-white transition-colors uppercase tracking-widest">{t.vaziriLink}</button>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="w-16 h-1 bg-gray-200 dark:bg-gray-800 rounded-full mx-auto mb-2"></div>
          <p className="text-[9px] font-black text-brand-dark/20 dark:text-gray-700 uppercase tracking-[0.2em]">{t.footer}</p>
       </footer>
    </div>
  );
};

export default App;