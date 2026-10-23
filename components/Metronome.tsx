import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TRANSLATIONS } from '../constants';

interface MetronomeProps {
  lang: 'fa' | 'en';
}

// 4 Beat levels for rich rhythmic customization
export type BeatStrength = 'accent' | 'medium' | 'normal' | 'mute';

export interface RhythmPreset {
  id: string;
  nameFa: string;
  nameEn: string;
  numerator: number;
  denominator: number;
  pattern: BeatStrength[];
}

const PRESETS: RhythmPreset[] = [
  {
    id: '4/4',
    nameFa: '۴/۴ ساده',
    nameEn: '4/4 Common',
    numerator: 4,
    denominator: 4,
    pattern: ['accent', 'normal', 'medium', 'normal'],
  },
  {
    id: '3/4',
    nameFa: '۳/۴ سنگین / رنگ',
    nameEn: '3/4 Waltz / Reng',
    numerator: 3,
    denominator: 4,
    pattern: ['accent', 'normal', 'normal'],
  },
  {
    id: '2/4',
    nameFa: '۲/۴ مارش / ضربی',
    nameEn: '2/4 March',
    numerator: 2,
    denominator: 4,
    pattern: ['accent', 'normal'],
  },
  {
    id: '6/8',
    nameFa: '۶/۸ شش‌هشتم ایرانی',
    nameEn: '6/8 Persian',
    numerator: 6,
    denominator: 8,
    pattern: ['accent', 'normal', 'normal', 'medium', 'normal', 'normal'],
  },
  {
    id: '5/8',
    nameFa: '۵/۸ لنگ (۳+۲)',
    nameEn: '5/8 Odd (3+2)',
    numerator: 5,
    denominator: 8,
    pattern: ['accent', 'normal', 'normal', 'medium', 'normal'],
  },
  {
    id: '7/8',
    nameFa: '۷/۸ لنگ (۲+۲+۳)',
    nameEn: '7/8 Odd (2+2+3)',
    numerator: 7,
    denominator: 8,
    pattern: ['accent', 'normal', 'medium', 'normal', 'medium', 'normal', 'normal'],
  },
  {
    id: '10/8',
    nameFa: '۱۰/۸ ده ضربی سنتی',
    nameEn: '10/8 Traditional',
    numerator: 10,
    denominator: 8,
    pattern: ['accent', 'normal', 'normal', 'medium', 'normal', 'medium', 'normal', 'medium', 'normal', 'normal'],
  },
];

type SoundType = 'woodblock' | 'beep' | 'tick';

export const Metronome: React.FC<MetronomeProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  // Fraction Time Signature State
  const [numerator, setNumerator] = useState<number>(4); // Beats per measure (1 - 16)
  const [denominator, setDenominator] = useState<number>(4); // Note value (1, 2, 4, 8, 16)

  // Beat Tiles Pattern
  const [beatPattern, setBeatPattern] = useState<BeatStrength[]>(['accent', 'normal', 'medium', 'normal']);

  // Tempo & Playback State
  const [bpm, setBpm] = useState<number>(90);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentBeat, setCurrentBeat] = useState<number>(0);
  const [soundType, setSoundType] = useState<SoundType>('woodblock');
  const [volume, setVolume] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Audio Context & Lookahead Scheduler Refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef<boolean>(false);
  const bpmRef = useRef<number>(bpm);
  const numeratorRef = useRef<number>(numerator);
  const beatPatternRef = useRef<BeatStrength[]>(beatPattern);
  const soundTypeRef = useRef<SoundType>(soundType);
  const volumeRef = useRef<number>(volume);
  const isMutedRef = useRef<boolean>(isMuted);

  // Scheduler state variables
  const nextNoteTimeRef = useRef<number>(0);
  const currentBeatInBarRef = useRef<number>(0);
  const timerIDRef = useRef<number | null>(null);

  // Tap Tempo state
  const tapTimesRef = useRef<number[]>([]);
  const [tapFlash, setTapFlash] = useState<boolean>(false);

  // Sync Numerator with BeatPattern array length
  useEffect(() => {
    setBeatPattern((prev) => {
      if (prev.length === numerator) return prev;
      if (prev.length < numerator) {
        const added = Array.from({ length: numerator - prev.length }, (_, i) => 
          (prev.length + i === 0 ? 'accent' : 'normal') as BeatStrength
        );
        return [...prev, ...added];
      }
      return prev.slice(0, numerator);
    });
  }, [numerator]);

  // Keep refs synchronized with state
  useEffect(() => { bpmRef.current = bpm; }, [bpm]);
  useEffect(() => { numeratorRef.current = numerator; }, [numerator]);
  useEffect(() => { beatPatternRef.current = beatPattern; }, [beatPattern]);
  useEffect(() => { soundTypeRef.current = soundType; }, [soundType]);
  useEffect(() => { volumeRef.current = volume; }, [volume]);
  useEffect(() => { isMutedRef.current = isMuted; }, [isMuted]);

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        audioCtxRef.current = new AudioCtxClass();
      }
    }
    return audioCtxRef.current;
  }, []);

  // Web Audio Synthesizer according to beat strength
  const playClick = useCallback((time: number, strength: BeatStrength) => {
    if (strength === 'mute' || isMutedRef.current) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const gainNode = ctx.createGain();
    gainNode.connect(ctx.destination);

    // Dynamic amplitude & frequency based on beat role
    const volMultiplier = strength === 'accent' ? 1.0 : strength === 'medium' ? 0.75 : 0.55;
    const effectiveVol = volumeRef.current * volMultiplier;

    if (soundTypeRef.current === 'woodblock') {
      // Resonant woodblock click (Traditional Percussion)
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      
      const baseFreq = strength === 'accent' ? 1400 : strength === 'medium' ? 1050 : 780;
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(baseFreq * 1.2, time);
      filter.Q.setValueAtTime(6, time);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, time);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.3, time + 0.04);

      gainNode.gain.setValueAtTime(0, time);
      gainNode.gain.linearRampToValueAtTime(effectiveVol * 0.95, time + 0.002);
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.045);

      osc.connect(filter);
      filter.connect(gainNode);

      osc.start(time);
      osc.stop(time + 0.05);
    } else if (soundTypeRef.current === 'beep') {
      // Clean Electronic Beep
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      const pitch = strength === 'accent' ? 1760 : strength === 'medium' ? 1320 : 880;
      osc.frequency.setValueAtTime(pitch, time);

      gainNode.gain.setValueAtTime(0, time);
      gainNode.gain.linearRampToValueAtTime(effectiveVol * 0.45, time + 0.002);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, time + 0.04);

      osc.connect(gainNode);
      osc.start(time);
      osc.stop(time + 0.045);
    } else {
      // Crisp Mechanical Tick
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      const pitch = strength === 'accent' ? 2400 : strength === 'medium' ? 1600 : 1100;
      osc.frequency.setValueAtTime(pitch, time);
      osc.frequency.exponentialRampToValueAtTime(90, time + 0.025);

      gainNode.gain.setValueAtTime(0, time);
      gainNode.gain.linearRampToValueAtTime(effectiveVol * 0.75, time + 0.001);
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.025);

      osc.connect(gainNode);
      osc.start(time);
      osc.stop(time + 0.03);
    }
  }, [getAudioContext]);

  // High-precision lookahead scheduler
  const scheduleNote = useCallback((beatNumber: number, time: number) => {
    const pattern = beatPatternRef.current;
    const strength = pattern[beatNumber % pattern.length] || 'normal';
    playClick(time, strength);

    // Schedule UI highlight update
    const delay = Math.max(0, (time - (audioCtxRef.current?.currentTime || 0)) * 1000);
    window.setTimeout(() => {
      if (isPlayingRef.current) {
        setCurrentBeat(beatNumber);
      }
    }, delay);
  }, [playClick]);

  const scheduler = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;

    const lookahead = 0.025; // 25ms interval
    const scheduleAheadTime = 0.1; // 100ms lookahead

    while (nextNoteTimeRef.current < ctx.currentTime + scheduleAheadTime) {
      scheduleNote(currentBeatInBarRef.current, nextNoteTimeRef.current);

      // Advance to next beat in measure
      const secondsPerBeat = 60.0 / bpmRef.current;
      nextNoteTimeRef.current += secondsPerBeat;

      const numBeats = Math.max(1, numeratorRef.current);
      currentBeatInBarRef.current = (currentBeatInBarRef.current + 1) % numBeats;
    }

    if (isPlayingRef.current) {
      timerIDRef.current = window.setTimeout(scheduler, lookahead * 1000);
    }
  }, [getAudioContext, scheduleNote]);

  const startMetronome = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    isPlayingRef.current = true;
    setIsPlaying(true);
    currentBeatInBarRef.current = 0;
    setCurrentBeat(0);
    nextNoteTimeRef.current = ctx.currentTime + 0.05;

    scheduler();
  }, [getAudioContext, scheduler]);

  const stopMetronome = useCallback(() => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    if (timerIDRef.current !== null) {
      window.clearTimeout(timerIDRef.current);
      timerIDRef.current = null;
    }
    setCurrentBeat(0);
  }, []);

  const toggleMetronome = useCallback(() => {
    if (isPlaying) {
      stopMetronome();
    } else {
      startMetronome();
    }
  }, [isPlaying, startMetronome, stopMetronome]);

  // Tap Tempo handler
  const handleTapTempo = useCallback(() => {
    const now = Date.now();
    const times = tapTimesRef.current;

    if (times.length > 0 && now - times[times.length - 1] > 2000) {
      tapTimesRef.current = [now];
    } else {
      times.push(now);
      if (times.length > 5) {
        times.shift();
      }
    }

    setTapFlash(true);
    setTimeout(() => setTapFlash(false), 120);

    if (tapTimesRef.current.length >= 2) {
      const intervals = [];
      for (let i = 1; i < tapTimesRef.current.length; i++) {
        intervals.push(tapTimesRef.current[i] - tapTimesRef.current[i - 1]);
      }
      const avgInterval = intervals.reduce((sum, v) => sum + v, 0) / intervals.length;
      const calculatedBpm = Math.round(60000 / avgInterval);
      const clampedBpm = Math.max(30, Math.min(250, calculatedBpm));
      setBpm(clampedBpm);
    }
  }, []);

  // Toggle individual Beat Tile state: accent -> medium -> normal -> mute -> accent
  const cycleTileStrength = useCallback((index: number) => {
    setBeatPattern((prev) => {
      const next = [...prev];
      const current = next[index] || 'normal';
      let updated: BeatStrength = 'normal';
      if (current === 'accent') updated = 'medium';
      else if (current === 'medium') updated = 'normal';
      else if (current === 'normal') updated = 'mute';
      else if (current === 'mute') updated = 'accent';
      next[index] = updated;

      // Play instantaneous sample preview of the new state
      playClick(getAudioContext()?.currentTime || 0, updated);

      return next;
    });
  }, [playClick, getAudioContext]);

  // Load a preset
  const applyPreset = useCallback((preset: RhythmPreset) => {
    setNumerator(preset.numerator);
    setDenominator(preset.denominator);
    setBeatPattern(preset.pattern);
    currentBeatInBarRef.current = 0;
    setCurrentBeat(0);
  }, []);

  // Keyboard shortcut (Spacebar for play/pause)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        toggleMetronome();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleMetronome]);

  // Clean up
  useEffect(() => {
    return () => {
      isPlayingRef.current = false;
      if (timerIDRef.current !== null) {
        window.clearTimeout(timerIDRef.current);
      }
    };
  }, []);

  // Italian Tempo Term
  const tempoCategory = React.useMemo(() => {
    if (bpm < 55) return { fa: 'بسیار آرام (Largo)', en: 'Very Slow (Largo)' };
    if (bpm < 75) return { fa: 'سنگین و آهسته (Adagio)', en: 'Slow (Adagio)' };
    if (bpm < 98) return { fa: 'معتدل و روان (Andante)', en: 'Walking Pace (Andante)' };
    if (bpm < 120) return { fa: 'میانه (Moderato)', en: 'Moderate (Moderato)' };
    if (bpm < 155) return { fa: 'تند و چالاک (Allegro)', en: 'Fast & Lively (Allegro)' };
    if (bpm < 190) return { fa: 'بسیار تند (Presto)', en: 'Very Fast (Presto)' };
    return { fa: 'فوق‌العاده سریع (Prestissimo)', en: 'Extremely Fast (Prestissimo)' };
  }, [bpm]);

  // Denominator Note Name
  const denominatorName = React.useMemo(() => {
    switch (denominator) {
      case 1: return lang === 'fa' ? 'گرد (Whole)' : 'Whole note';
      case 2: return lang === 'fa' ? 'سفید (Half)' : 'Half note';
      case 4: return lang === 'fa' ? 'سیاه (Quarter)' : 'Quarter note';
      case 8: return lang === 'fa' ? 'چنگ (Eighth)' : 'Eighth note';
      case 16: return lang === 'fa' ? 'دولاچنگ (16th)' : '16th note';
      default: return '';
    }
  }, [denominator, lang]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="flex-grow flex flex-col gap-3.5 select-none"
    >
      {/* Top Main Section: Precision Tempo & Meter Engine Deck */}
      <section className="bg-white dark:bg-[#1E1F24] p-4 sm:p-4.5 rounded-3xl shadow-sm border border-black/5 dark:border-white/5 space-y-4 relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-lime to-transparent opacity-90"></div>

        {/* Top Control Grid */}
        <div className="grid grid-cols-12 gap-3 items-stretch">
          
          {/* Fraction Time Signature Deck (صورت و مخرج با طراحی مهندسی دقیق) */}
          <div className="col-span-5 sm:col-span-4 bg-brand-lime/[0.05] dark:bg-brand-lime/[0.04] p-3.5 rounded-2xl flex flex-col items-center justify-between relative border border-brand-lime/30 dark:border-brand-lime/20 shadow-inner">
            <div className="flex items-center justify-between w-full px-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-brand-dark/65 dark:text-gray-300 flex items-center gap-1">
                <svg className="w-3 h-3 text-brand-lime shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {lang === 'fa' ? 'کسر میزان' : 'Meter'}
              </span>
              <span className="text-[9px] font-black text-brand-dark/40 dark:text-gray-500 font-mono">
                {numerator}/{denominator}
              </span>
            </div>

            {/* Fraction Steppers */}
            <div className="flex flex-col items-center justify-center font-mono my-1 w-full">
              {/* Numerator Controls (صورت کسر - تعداد ضرب‌ها) */}
              <div className="flex items-center justify-between w-full max-w-[120px] px-1">
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => setNumerator((n) => Math.max(1, n - 1))}
                  className="w-7 h-7 rounded-xl bg-white dark:bg-zinc-800 hover:bg-brand-lime hover:text-brand-dark text-brand-dark dark:text-white border border-brand-dark/10 dark:border-white/10 flex items-center justify-center text-xs font-black cursor-pointer transition-colors shadow-sm"
                  title={lang === 'fa' ? 'کاهش ضرب‌ها' : 'Decrease beats'}
                >
                  −
                </motion.button>
                <span className="text-2xl sm:text-3xl font-black text-brand-dark dark:text-white min-w-[34px] text-center leading-none tracking-tight">
                  {numerator}
                </span>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => setNumerator((n) => Math.min(16, n + 1))}
                  className="w-7 h-7 rounded-xl bg-white dark:bg-zinc-800 hover:bg-brand-lime hover:text-brand-dark text-brand-dark dark:text-white border border-brand-dark/10 dark:border-white/10 flex items-center justify-center text-xs font-black cursor-pointer transition-colors shadow-sm"
                  title={lang === 'fa' ? 'افزایش ضرب‌ها' : 'Increase beats'}
                >
                  +
                </motion.button>
              </div>

              {/* Fractional Divider Bar with Lime Glow */}
              <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-brand-lime to-transparent my-1.5 rounded-full"></div>

              {/* Denominator Controls (مخرج کسر - کشش نت) */}
              <div className="flex items-center justify-between w-full max-w-[120px] px-1">
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => {
                    const valid = [1, 2, 4, 8, 16];
                    const idx = valid.indexOf(denominator);
                    if (idx > 0) setDenominator(valid[idx - 1]);
                  }}
                  className="w-7 h-7 rounded-xl bg-white dark:bg-zinc-800 hover:bg-brand-lime hover:text-brand-dark text-brand-dark dark:text-white border border-brand-dark/10 dark:border-white/10 flex items-center justify-center text-xs font-black cursor-pointer transition-colors shadow-sm"
                  title={lang === 'fa' ? 'کاهش ارزش ضرب' : 'Change note value'}
                >
                  −
                </motion.button>
                <span className="text-2xl sm:text-3xl font-black text-brand-dark dark:text-white min-w-[34px] text-center leading-none tracking-tight">
                  {denominator}
                </span>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => {
                    const valid = [1, 2, 4, 8, 16];
                    const idx = valid.indexOf(denominator);
                    if (idx < valid.length - 1) setDenominator(valid[idx + 1]);
                  }}
                  className="w-7 h-7 rounded-xl bg-white dark:bg-zinc-800 hover:bg-brand-lime hover:text-brand-dark text-brand-dark dark:text-white border border-brand-dark/10 dark:border-white/10 flex items-center justify-center text-xs font-black cursor-pointer transition-colors shadow-sm"
                  title={lang === 'fa' ? 'افزایش ارزش ضرب' : 'Change note value'}
                >
                  +
                </motion.button>
              </div>
            </div>

            <div className="px-2 py-0.5 rounded-lg bg-brand-lime/20 dark:bg-brand-lime/15 border border-brand-lime/30 text-[9px] font-black text-brand-dark dark:text-lime-200 truncate max-w-full text-center">
              {denominatorName}
            </div>
          </div>

          {/* Large BPM Numbers & Italian Classical Term */}
          <div className="col-span-7 sm:col-span-8 bg-brand-lime/[0.04] dark:bg-brand-lime/[0.03] p-3.5 sm:p-4 rounded-2xl flex flex-col items-center justify-between text-center border border-brand-lime/30 dark:border-brand-lime/20 shadow-inner">
            <div className="flex items-center justify-between w-full px-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-brand-dark/65 dark:text-gray-300 flex items-center gap-1">
                <svg className="w-3 h-3 text-brand-lime shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {lang === 'fa' ? 'سرعت اجرای ضرب' : 'Tempo'}
              </span>
              <span className="text-[9.5px] font-black px-2 py-0.5 rounded-full bg-brand-lime/20 dark:bg-brand-lime/15 text-brand-dark dark:text-lime-200 border border-brand-lime/30">
                {lang === 'fa' ? tempoCategory.fa.split(' ')[0] : tempoCategory.en.split(' ')[0]}
              </span>
            </div>

            <div className="flex items-baseline justify-center gap-2 my-1">
              <span className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-brand-dark dark:text-white font-mono leading-none">
                {bpm}
              </span>
              <span className="text-xs sm:text-sm font-black text-brand-dark/40 dark:text-gray-400 font-mono tracking-wider">
                BPM
              </span>
            </div>

            <p className="text-[11px] font-bold text-brand-dark/70 dark:text-gray-300 truncate max-w-full">
              {lang === 'fa' ? tempoCategory.fa : tempoCategory.en}
            </p>

            {/* Micro Stepper Quick Adjustment Buttons */}
            <div className="flex items-center gap-1.5 pt-2 w-full justify-center">
              {[-5, -1, +1, +5].map((val) => (
                <motion.button
                  key={val}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setBpm((prev) => Math.max(30, Math.min(250, prev + val)))}
                  className="flex-1 py-1.5 rounded-xl bg-white dark:bg-zinc-800 text-brand-dark dark:text-white font-mono font-black text-[11px] border border-brand-dark/10 dark:border-white/10 hover:bg-brand-lime hover:text-brand-dark hover:border-brand-lime transition-all cursor-pointer shadow-sm"
                >
                  {val > 0 ? `+${val}` : val}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* BPM High-Fidelity Tactile Slider */}
        <div className="px-1 pt-1 space-y-1.5">
          <div className="relative flex items-center">
            <input
              type="range"
              min="30"
              max="250"
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              className="w-full h-2.5 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-lime focus:outline-none focus:ring-2 focus:ring-brand-lime/50"
            />
          </div>
          <div className="flex justify-between text-[9px] font-black text-brand-dark/50 dark:text-gray-400 font-mono px-1">
            <span>30</span>
            <span>60</span>
            <span className="text-brand-dark dark:text-lime-300 font-bold">90</span>
            <span>120</span>
            <span>160</span>
            <span>200</span>
            <span>250</span>
          </div>
        </div>
      </section>

      {/* Interactive Beat Tiles Sequencer (کاشی‌های تعاملی ضرب‌ها با آکسان‌بندی استودیویی) */}
      <section className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl p-4 sm:p-5 rounded-[2.2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-brand-lime/25 dark:border-brand-lime/20 space-y-4 transition-colors duration-300 relative overflow-hidden">
        
        {/* Header of Tiles */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-lime shadow-[0_0_8px_#d3f36a]"></span>
            <h3 className="text-xs font-black text-brand-dark dark:text-white tracking-tight">
              {lang === 'fa' ? 'کاشی‌های ضرب و سرضرب‌ها (لمس برای تغییر):' : 'Interactive Beat Matrix (Tap to cycle):'}
            </h3>
          </div>
          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 text-brand-dark/60 dark:text-gray-400 font-mono">
            {numerator} {lang === 'fa' ? 'ضرب' : 'beats'}
          </span>
        </div>

        {/* The Beat Tiles Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {Array.from({ length: numerator }).map((_, idx) => {
            const strength = beatPattern[idx] || 'normal';
            const isActive = isPlaying && currentBeat === idx;

            let tileBg = 'bg-black/[0.03] dark:bg-white/[0.04] border-black/10 dark:border-white/10 text-brand-dark/75 dark:text-gray-300';
            let label = lang === 'fa' ? 'عادی' : 'Normal';
            let iconMark = '•';
            let badgeBg = 'bg-black/5 dark:bg-white/5';

            if (strength === 'accent') {
              tileBg = 'bg-brand-lime text-brand-dark border-brand-lime shadow-md shadow-brand-lime/25 font-black';
              label = lang === 'fa' ? 'سرضرب' : 'Accent';
              iconMark = '▲';
              badgeBg = 'bg-black/15 text-brand-dark';
            } else if (strength === 'medium') {
              tileBg = 'bg-amber-400/20 dark:bg-amber-400/15 border-amber-400/50 text-amber-900 dark:text-amber-200 font-bold';
              label = lang === 'fa' ? 'نیمه‌ضرب' : 'Medium';
              iconMark = '◆';
              badgeBg = 'bg-amber-400/30 text-amber-950 dark:text-amber-100';
            } else if (strength === 'mute') {
              tileBg = 'bg-transparent border-dashed border-2 border-black/15 dark:border-white/15 text-brand-dark/30 dark:text-gray-600 opacity-60';
              label = lang === 'fa' ? 'سکوت' : 'Mute';
              iconMark = '✕';
              badgeBg = 'bg-black/5 text-brand-dark/40';
            }

            return (
              <motion.button
                key={idx}
                whileTap={{ scale: 0.9 }}
                animate={{
                  scale: isActive ? 1.05 : 1,
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                onClick={() => cycleTileStrength(idx)}
                className={`relative p-2.5 sm:p-3 rounded-2xl border flex flex-col items-center justify-between gap-1 text-center cursor-pointer transition-all ${tileBg} ${
                  isActive ? 'ring-2 ring-brand-lime shadow-lg scale-105 z-10' : ''
                }`}
                title={lang === 'fa' ? `ضرب ${idx + 1}: ${label} (لمس برای تغییر)` : `Beat ${idx + 1}: ${label} (Tap to cycle)`}
              >
                {/* Beat Number */}
                <span className="text-xs font-black font-mono leading-none">
                  {idx + 1}
                </span>

                {/* Strength Symbol */}
                <span className="text-sm font-black leading-none my-0.5">
                  {iconMark}
                </span>

                {/* State Label */}
                <span className={`text-[9px] font-black leading-tight tracking-tight px-1.5 py-0.5 rounded-md ${badgeBg}`}>
                  {label}
                </span>

                {/* Pulsing Active Light */}
                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute -top-1 -right-1 w-3 h-3 bg-brand-dark dark:bg-white rounded-full border-2 border-brand-lime shadow-sm"
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Legend of Strengths */}
        <div className="flex items-center justify-around flex-wrap gap-2 text-[10px] font-bold text-brand-dark/65 dark:text-gray-400 pt-1 border-t border-black/5 dark:border-white/5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-md bg-brand-lime shadow-[0_0_6px_#d3f36a]"></span>
            <span>{lang === 'fa' ? 'سرضرب (آکسان قوی)' : 'Strong Accent'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-md bg-amber-400"></span>
            <span>{lang === 'fa' ? 'ضرب متوسط' : 'Medium Accent'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-md bg-black/10 dark:bg-white/10"></span>
            <span>{lang === 'fa' ? 'ضرب عادی' : 'Normal Beat'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-md border border-dashed border-black/30 dark:border-white/30"></span>
            <span>{lang === 'fa' ? 'سکوت' : 'Mute'}</span>
          </div>
        </div>

        {/* Quick Rhythm Presets Bar (ریتم‌های پیش‌فرض و ادوار سنتی با استایل قرصی مینیمال) */}
        <div className="pt-2 border-t border-black/5 dark:border-white/5 space-y-1.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-brand-dark/65 dark:text-gray-300">
              {lang === 'fa' ? 'الگوهای ریتمیک آماده موسیقی ایران و جهان:' : 'Quick Rhythmic Patterns:'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {PRESETS.map((p) => {
              const isSelected = numerator === p.numerator && denominator === p.denominator;
              return (
                <button
                  key={p.id}
                  onClick={() => applyPreset(p)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-black shrink-0 transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-brand-lime text-brand-dark border-brand-lime shadow-md shadow-brand-lime/25 scale-[1.02]'
                      : 'bg-black/5 dark:bg-white/5 text-brand-dark/70 dark:text-zinc-300 border-black/5 dark:border-white/5 hover:bg-brand-lime/15 hover:border-brand-lime/30'
                  }`}
                >
                  {lang === 'fa' ? p.nameFa : p.nameEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* Play/Stop & Tap Tempo Row */}
        <div className="flex items-center gap-3 pt-2">
          {/* Main Play / Stop Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={toggleMetronome}
            className={`flex-grow py-3.5 px-6 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
              isPlaying
                ? 'bg-rose-500 text-white shadow-rose-500/30 hover:bg-rose-600'
                : 'bg-brand-lime text-brand-dark shadow-[0_6px_20px_rgba(211,243,106,0.35)] hover:bg-brand-dark hover:text-white dark:hover:bg-white dark:hover:text-brand-dark ring-1 ring-brand-lime/50'
            }`}
          >
            <AnimatePresence mode="wait">
              {isPlaying ? (
                <motion.div
                  key="stop-icon"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="6" width="12" height="12" rx="2" />
                  </svg>
                  <span>{lang === 'fa' ? 'توقف مترونوم' : 'Stop Metronome'}</span>
                </motion.div>
              ) : (
                <motion.div
                  key="play-icon"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>{lang === 'fa' ? 'شروع مترونوم' : 'Start Metronome'}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Tap Tempo Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleTapTempo}
            className={`shrink-0 px-4 py-3 rounded-2xl border font-black text-xs flex flex-col items-center justify-center gap-0.5 transition-all shadow-sm cursor-pointer ${
              tapFlash
                ? 'bg-brand-lime text-brand-dark border-brand-lime scale-95 shadow-md shadow-brand-lime/40'
                : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-brand-dark dark:text-white hover:bg-brand-lime/20 hover:border-brand-lime/40'
            }`}
            title={lang === 'fa' ? 'چند بار با ریتم دلخواه لمس کنید' : 'Tap repeatedly to set tempo'}
          >
            <svg className="w-4 h-4 text-brand-dark dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            <span>{lang === 'fa' ? 'تپ تمپو' : 'Tap'}</span>
          </motion.button>
        </div>

        {/* Audio Sound Type & Mute Options */}
        <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 bg-black/[0.04] dark:bg-white/[0.04] p-1 rounded-xl border border-black/5 dark:border-white/5">
            {[
              { id: 'woodblock', label: lang === 'fa' ? 'چوبک (Wood)' : 'Wood' },
              { id: 'beep', label: lang === 'fa' ? 'بوق (Beep)' : 'Beep' },
              { id: 'tick', label: lang === 'fa' ? 'تیک (Tick)' : 'Tick' },
            ].map((snd) => (
              <button
                key={snd.id}
                onClick={() => setSoundType(snd.id as SoundType)}
                className={`px-3 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer ${
                  soundType === snd.id
                    ? 'bg-brand-lime text-brand-dark shadow-sm'
                    : 'text-brand-dark/65 dark:text-gray-400 hover:text-brand-dark dark:hover:text-white'
                }`}
              >
                {snd.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-colors cursor-pointer border ${
              isMuted
                ? 'bg-rose-500/15 border-rose-500/30 text-rose-600 dark:text-rose-400'
                : 'bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 text-brand-dark/70 dark:text-gray-300 hover:text-brand-dark dark:hover:text-white hover:bg-brand-lime/15'
            }`}
          >
            {isMuted ? (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
                <span>{lang === 'fa' ? 'بی‌صدا' : 'Muted'}</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5 text-brand-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
                <span>{lang === 'fa' ? 'صدا فعال' : 'Sound On'}</span>
              </>
            )}
          </button>
        </div>
      </section>
    </motion.div>
  );
};
