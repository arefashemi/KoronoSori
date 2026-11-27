import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PianoKey } from './components/PianoKey';
import { Metronome } from './components/Metronome';
import { SupportModal } from './components/SupportModal';
import { TipsModal } from './components/TipsModal';
import { InfoHub } from './components/InfoHub';
import { getScaleNotes } from './utils/musicTheory';
import { ScaleType, FavoriteScale } from './types';
import { 
  ROOT_OPTIONS, 
  ACCIDENTAL_OPTIONS, 
  TRANSLATIONS, 
  DASTGAH_INTERVALS_MAP,
  MAHUR_INTERVALS, 
  SCALE_ACADEMIC_DATA, 
  ALPHABET_NOTES, 
  NOTE_BASE_INDICES, 
  ACCIDENTAL_OFFSETS 
} from './constants';

const getScaleCardStyle = (scaleType: string) => {
  const colors: Record<string, { bg: string; border: string; darkBg: string; darkBorder: string; badge: string; text: string }> = {
    'شور': { bg: 'bg-rose-50/75', border: 'border-rose-100/80', darkBg: 'dark:bg-rose-950/20', darkBorder: 'dark:border-rose-900/30', badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-400', text: 'text-rose-950 dark:text-rose-100' },
    'سه گاه': { bg: 'bg-amber-50/75', border: 'border-amber-100/80', darkBg: 'dark:bg-amber-950/20', darkBorder: 'dark:border-amber-900/30', badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400', text: 'text-amber-950 dark:text-amber-100' },
    'چهارگاه': { bg: 'bg-emerald-50/75', border: 'border-emerald-100/80', darkBg: 'dark:bg-emerald-950/20', darkBorder: 'dark:border-emerald-900/30', badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400', text: 'text-emerald-950 dark:text-emerald-100' },
    'همایون': { bg: 'bg-indigo-50/75', border: 'border-indigo-100/80', darkBg: 'dark:bg-indigo-950/20', darkBorder: 'dark:border-indigo-900/30', badge: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400', text: 'text-indigo-950 dark:text-indigo-100' },
    'ماهور': { bg: 'bg-sky-50/75', border: 'border-sky-100/80', darkBg: 'dark:bg-sky-950/20', darkBorder: 'dark:border-sky-900/30', badge: 'bg-sky-500/10 text-sky-600 dark:text-sky-400', text: 'text-sky-950 dark:text-sky-100' },
    'نوا': { bg: 'bg-violet-50/75', border: 'border-violet-100/80', darkBg: 'dark:bg-violet-950/20', darkBorder: 'dark:border-violet-900/30', badge: 'bg-violet-500/10 text-violet-600 dark:text-violet-400', text: 'text-violet-950 dark:text-violet-100' },
    'راست پنجگاه': { bg: 'bg-teal-50/75', border: 'border-teal-100/80', darkBg: 'dark:bg-teal-950/20', darkBorder: 'dark:border-teal-900/30', badge: 'bg-teal-500/10 text-teal-600 dark:text-teal-400', text: 'text-teal-950 dark:text-teal-100' },
    'default': { bg: 'bg-gray-50/70', border: 'border-gray-100/80', darkBg: 'dark:bg-gray-900/40', darkBorder: 'dark:border-gray-800/40', badge: 'bg-gray-500/10 text-gray-600 dark:text-gray-400', text: 'text-gray-900 dark:text-gray-100' },
  };
  return colors[scaleType] || colors['default'];
};

const pageTransitionVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const pageTransitionConfig = {
  duration: 0.22,
  ease: [0.16, 1, 0.3, 1] as const,
};

const App: React.FC = () => {
  const [selectedRoot, setSelectedRoot] = useState<string>('سل');
  const [selectedAccidental, setSelectedAccidental] = useState<string>('بکار');
  const [selectedScaleType, setSelectedScaleType] = useState<string>('شور');
  const [copied, setCopied] = useState(false);
  const [lang, setLang] = useState<'fa' | 'en'>('fa');
  const [darkMode, setDarkMode] = useState(false);
  const [notation, setNotation] = useState<'solfege' | 'alphabet'>('solfege');
  const [view, setView] = useState<'home' | 'metronome' | 'about' | 'vaziri' | 'support' | 'favorites' | 'changelog' | 'tips'>('home');
  const [showScaleInfo, setShowScaleInfo] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [showAcademic, setShowAcademic] = useState(false);

  const [appVersion] = useState<string>(() => {
    try {
      localStorage.setItem('koronosori_app_version', '1.0.0');
    } catch {
      // Ignore storage errors
    }
    return '1.0.0';
  });

  const [favorites, setFavorites] = useState<FavoriteScale[]>(() => {
    try {
      const saved = localStorage.getItem('koronosori_favorites');
      if (saved) {
        const parsed: FavoriteScale[] = JSON.parse(saved);
        // Clean up any legacy favorites that might have been archived
        const validScales = ['شور', 'سه گاه', 'چهارگاه', 'ماهور', 'همایون', 'نوا', 'راست پنجگاه'];
        return parsed.filter(f => validScales.includes(f.scaleType));
      }
      return [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('koronosori_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const isCurrentFavorite = useMemo(() => {
    return favorites.some(
      fav => fav.root === selectedRoot && 
             fav.accidental === selectedAccidental && 
             fav.scaleType === selectedScaleType
    );
  }, [favorites, selectedRoot, selectedAccidental, selectedScaleType]);

  const toggleFavorite = useCallback(() => {
    if (isCurrentFavorite) {
      setFavorites(prev => prev.filter(
        fav => !(fav.root === selectedRoot && 
                 fav.accidental === selectedAccidental && 
                 fav.scaleType === selectedScaleType)
      ));
    } else {
      const newFav: FavoriteScale = {
        id: `${selectedRoot}-${selectedAccidental}-${selectedScaleType}-${Date.now()}`,
        root: selectedRoot,
        accidental: selectedAccidental,
        scaleType: selectedScaleType
      };
      setFavorites(prev => [...prev, newFav]);
    }
  }, [isCurrentFavorite, selectedRoot, selectedAccidental, selectedScaleType]);

  const [favSearch, setFavSearch] = useState('');
  const [favFilter, setFavFilter] = useState<string | null>(null);
  const [copiedFavId, setCopiedFavId] = useState<string | null>(null);
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingNoteText, setEditingNoteText] = useState<string>('');

  const handleSaveNote = useCallback((id: string, noteText: string) => {
    setFavorites(prev => prev.map(fav => fav.id === id ? { ...fav, note: noteText.trim() } : fav));
    setEditingNoteId(null);
    setEditingNoteText('');
  }, []);

  // Audio Context and Playback system
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const playbackTimeoutsRef = useRef<number[]>([]);
  const playbackIdRef = useRef<number>(0);
  const activeOscillatorsRef = useRef<OscillatorNode[]>([]);

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
    }
    return audioCtxRef.current;
  }, []);

  const playSingleNoteDirectly = useCallback((root: string, accidental: string, offsetValue: number) => {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    let rootIndex = NOTE_BASE_INDICES[root] ?? 0;
    if (ACCIDENTAL_OFFSETS[accidental] !== undefined) {
      rootIndex += ACCIDENTAL_OFFSETS[accidental];
    }
    rootIndex = (rootIndex % 24 + 24) % 24;

    const absoluteStep = rootIndex + offsetValue;
    const freq = 261.63 * Math.pow(2, absoluteStep / 24);

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.4);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

    osc.start();
    osc.stop(ctx.currentTime + 0.45);
  }, [getAudioContext]);

  // Smooth, stable auto-advance splash timer (2.8s) with graceful fade out
  useEffect(() => {
    const timer = window.setTimeout(() => setShowSplash(false), 2800);
    return () => window.clearTimeout(timer);
  }, []);

  const t = TRANSLATIONS[lang];

  const translateNote = useCallback((noteStr: string) => {
    if (!noteStr) return '';
    const firstSpaceIndex = noteStr.indexOf(' ');
    const base = firstSpaceIndex === -1 ? noteStr : noteStr.substring(0, firstSpaceIndex);
    const acc = firstSpaceIndex === -1 ? '' : noteStr.substring(firstSpaceIndex + 1);
    
    const trBase = notation === 'alphabet'
      ? (ALPHABET_NOTES[base] || base)
      : (t.notes[base as keyof typeof t.notes] || base);
    const trAcc = acc ? (t.accidentals[acc as keyof typeof t.accidentals] || acc) : '';
    return trAcc ? `${trBase} ${trAcc}` : trBase;
  }, [t, notation]);

  // Strictly the 7 primary Dastgahs
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
    getScaleNotes(selectedRoot, selectedAccidental, selectedScaleType)
  , [selectedRoot, selectedAccidental, selectedScaleType]);

  const intervalsBetween = useMemo(() => {
    const rawIntervals = DASTGAH_INTERVALS_MAP[selectedScaleType] || MAHUR_INTERVALS;
    const fullIntervals = [...rawIntervals, 24];
    const diffs: number[] = [];
    for (let i = 0; i < fullIntervals.length - 1; i++) {
      diffs.push(fullIntervals[i+1] - fullIntervals[i]);
    }
    return diffs;
  }, [selectedScaleType]);

  const displayLabels = useMemo(() => {
    const translatedRoot = notation === 'alphabet'
      ? (ALPHABET_NOTES[selectedRoot] || selectedRoot)
      : (t.notes[selectedRoot as keyof typeof t.notes] || selectedRoot);
    const translatedAccidental = selectedAccidental === 'بکار' 
      ? '' 
      : (t.accidentals[selectedAccidental as keyof typeof t.accidentals] || selectedAccidental);
    const displayRoot = translatedAccidental ? `${translatedRoot} ${translatedAccidental}` : translatedRoot;
    const rawScaleName = selectedScaleType;
    const displayScaleName = t.scales[rawScaleName as keyof typeof t.scales] || rawScaleName;
    
    // Calculate Key Signature (سرکلید)
    const keySignatureNotes = resultNotes
      .filter(note => note.includes(' ') || note.includes('دیز') || note.includes('بمل') || note.includes('سری') || note.includes('کرن'))
      .map(translateNote);
    const displayKeySignature = keySignatureNotes.length > 0 ? keySignatureNotes.join('، ') : (lang === 'fa' ? 'بدون علامت' : 'No accidentals');

    return { displayRoot, displayScaleName, displayKeySignature };
  }, [lang, selectedRoot, selectedAccidental, selectedScaleType, t, resultNotes, translateNote, notation]);

  const academicData = useMemo(() => {
    return SCALE_ACADEMIC_DATA[selectedScaleType] || null;
  }, [selectedScaleType]);

  const dangsData = useMemo(() => {
    if (!academicData || resultNotes.length === 0) return null;
    
    const firstDangNotes = [resultNotes[0], resultNotes[1], resultNotes[2], resultNotes[3]]
      .map(translateNote)
      .join(' - ');
      
    let secondDangNotes = [];
    if (academicData.tetrachords_type === 'continuous') {
      secondDangNotes = [resultNotes[3], resultNotes[4], resultNotes[5], resultNotes[6]];
    } else {
      const eighthNote = resultNotes[7] || resultNotes[0];
      secondDangNotes = [resultNotes[4], resultNotes[5], resultNotes[6], eighthNote];
    }
    const secondDangNotesStr = secondDangNotes
      .map(translateNote)
      .join(' - ');
      
    const typeLabel = academicData.tetrachords_type === 'continuous' 
      ? t.continuousLabel 
      : t.disjunctLabel;
      
    return {
      first: firstDangNotes,
      second: secondDangNotesStr,
      type: typeLabel
    };
  }, [academicData, resultNotes, translateNote, t]);

  const copyToClipboard = useCallback(() => {
    if (resultNotes.length === 0) return;
    const octaveNote = resultNotes[0];
    const fullNotesList = [...resultNotes, octaveNote];
    const titleText = lang === 'fa' 
      ? `${displayLabels.displayScaleName} ${displayLabels.displayRoot}`
      : `${displayLabels.displayRoot} ${displayLabels.displayScaleName}`;
    const textToCopy = `${titleText}\n${lang === 'fa' ? 'سرکلید' : 'Key Signature'}: ${displayLabels.displayKeySignature}\n\n${fullNotesList.map(translateNote).join(' - ')}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [resultNotes, displayLabels, lang, translateNote]);

  const stopPlayback = useCallback(() => {
    playbackIdRef.current++;
    playbackTimeoutsRef.current.forEach(t => window.clearTimeout(t));
    playbackTimeoutsRef.current = [];
    
    activeOscillatorsRef.current.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {
        // Oscillator already stopped
      }
    });
    activeOscillatorsRef.current = [];
    setPlayingIndex(null);
    setIsLooping(false);
  }, []);

  const getFavoriteLabel = useCallback((fav: FavoriteScale) => {
    const translatedRoot = notation === 'alphabet'
      ? (ALPHABET_NOTES[fav.root] || fav.root)
      : (t.notes[fav.root as keyof typeof t.notes] || fav.root);
    const translatedAccidental = fav.accidental === 'بکار' 
      ? '' 
      : (t.accidentals[fav.accidental as keyof typeof t.accidentals] || fav.accidental);
    const displayRoot = translatedAccidental ? `${translatedRoot} ${translatedAccidental}` : translatedRoot;
    const displayScaleName = t.scales[fav.scaleType as keyof typeof t.scales] || fav.scaleType;
    return lang === 'fa' 
      ? `${displayScaleName} ${displayRoot}` 
      : `${displayRoot} ${displayScaleName}`;
  }, [t, notation, lang]);

  const loadFavorite = useCallback((fav: FavoriteScale) => {
    setSelectedRoot(fav.root);
    setSelectedAccidental(fav.accidental);
    setSelectedScaleType(fav.scaleType);
    setView('home');
  }, []);

  const playFavoriteScaleDirectly = useCallback((fav: FavoriteScale) => {
    setSelectedRoot(fav.root);
    setSelectedAccidental(fav.accidental);
    setSelectedScaleType(fav.scaleType);
    
    const rawIntervals = DASTGAH_INTERVALS_MAP[fav.scaleType] || MAHUR_INTERVALS;
    const fullIntervals = [...rawIntervals, 24];
    let rootIndex = NOTE_BASE_INDICES[fav.root] ?? 0;
    if (ACCIDENTAL_OFFSETS[fav.accidental] !== undefined) {
      rootIndex += ACCIDENTAL_OFFSETS[fav.accidental];
    }
    rootIndex = (rootIndex % 24 + 24) % 24;

    const ctx = getAudioContext();
    if (!ctx) return;

    stopPlayback();
    const currentId = ++playbackIdRef.current;
    setPlayingIndex(0);

    const noteDuration = 0.5;
    const intervalBetweenNotes = 550;

    const runPlayback = () => {
      if (currentId !== playbackIdRef.current) return;

      fullIntervals.forEach((intervalValue, idx) => {
        const absoluteStep = rootIndex + intervalValue;
        const freq = 261.63 * Math.pow(2, absoluteStep / 24);

        const soundTimeout = window.setTimeout(() => {
          if (currentId !== playbackIdRef.current) return;

          const osc = ctx.createOscillator();
          const gainNode = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          osc.connect(filter);
          filter.connect(gainNode);
          gainNode.connect(ctx.destination);

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(1100, ctx.currentTime);
          filter.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + noteDuration);

          gainNode.gain.setValueAtTime(0, ctx.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 0.05);
          gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + noteDuration);

          osc.start();
          osc.stop(ctx.currentTime + noteDuration + 0.1);

          activeOscillatorsRef.current.push(osc);
        }, idx * intervalBetweenNotes);

        const uiTimeout = window.setTimeout(() => {
          if (currentId !== playbackIdRef.current) return;
          setPlayingIndex(idx);
        }, idx * intervalBetweenNotes);

        playbackTimeoutsRef.current.push(soundTimeout, uiTimeout);
      });

      const endTimeout = window.setTimeout(() => {
        if (currentId !== playbackIdRef.current) return;
        setPlayingIndex(null);
        activeOscillatorsRef.current = [];
      }, fullIntervals.length * intervalBetweenNotes);

      playbackTimeoutsRef.current.push(endTimeout);
    };

    if (ctx.state === 'suspended') {
      ctx.resume().then(runPlayback);
    } else {
      runPlayback();
    }
  }, [stopPlayback, getAudioContext]);

  const playScale = useCallback(() => {
    if (playingIndex !== null) {
      stopPlayback();
      return;
    }

    const ctx = getAudioContext();
    if (!ctx) return;

    stopPlayback();
    const currentId = ++playbackIdRef.current;
    setPlayingIndex(0);
    setIsLooping(false);

    const rawIntervals = DASTGAH_INTERVALS_MAP[selectedScaleType] || MAHUR_INTERVALS;
    const fullIntervals = [...rawIntervals, 24];

    let rootIndex = NOTE_BASE_INDICES[selectedRoot] ?? 0;
    if (ACCIDENTAL_OFFSETS[selectedAccidental] !== undefined) {
      rootIndex += ACCIDENTAL_OFFSETS[selectedAccidental];
    }
    rootIndex = (rootIndex % 24 + 24) % 24;

    const noteDuration = 0.5;
    const intervalBetweenNotes = 550;

    const runPlayback = () => {
      if (currentId !== playbackIdRef.current) return;

      fullIntervals.forEach((intervalValue, idx) => {
        const absoluteStep = rootIndex + intervalValue;
        const freq = 261.63 * Math.pow(2, absoluteStep / 24);

        const soundTimeout = window.setTimeout(() => {
          if (currentId !== playbackIdRef.current) return;

          const osc = ctx.createOscillator();
          const gainNode = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          osc.connect(filter);
          filter.connect(gainNode);
          gainNode.connect(ctx.destination);

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(1100, ctx.currentTime);
          filter.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + noteDuration);

          gainNode.gain.setValueAtTime(0, ctx.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 0.05);
          gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + noteDuration);

          osc.start();
          osc.stop(ctx.currentTime + noteDuration + 0.1);

          activeOscillatorsRef.current.push(osc);
        }, idx * intervalBetweenNotes);

        const uiTimeout = window.setTimeout(() => {
          if (currentId !== playbackIdRef.current) return;
          setPlayingIndex(idx);
        }, idx * intervalBetweenNotes);

        playbackTimeoutsRef.current.push(soundTimeout, uiTimeout);
      });

      const endTimeout = window.setTimeout(() => {
        if (currentId !== playbackIdRef.current) return;
        setPlayingIndex(null);
        activeOscillatorsRef.current = [];
      }, fullIntervals.length * intervalBetweenNotes);

      playbackTimeoutsRef.current.push(endTimeout);
    };

    if (ctx.state === 'suspended') {
      ctx.resume().then(runPlayback);
    } else {
      runPlayback();
    }
  }, [playingIndex, stopPlayback, selectedScaleType, selectedRoot, selectedAccidental, getAudioContext]);

  const playScaleLoop = useCallback(() => {
    if (isLooping) {
      stopPlayback();
      return;
    }

    const ctx = getAudioContext();
    if (!ctx) return;

    stopPlayback();
    const currentId = ++playbackIdRef.current;
    setPlayingIndex(0);
    setIsLooping(true);

    const rawIntervals = DASTGAH_INTERVALS_MAP[selectedScaleType] || MAHUR_INTERVALS;
    const fullIntervals = [...rawIntervals, 24];

    let rootIndex = NOTE_BASE_INDICES[selectedRoot] ?? 0;
    if (ACCIDENTAL_OFFSETS[selectedAccidental] !== undefined) {
      rootIndex += ACCIDENTAL_OFFSETS[selectedAccidental];
    }
    rootIndex = (rootIndex % 24 + 24) % 24;

    const noteDuration = 0.45;
    const intervalBetweenNotes = 500;
    const pauseBetweenCycles = 650;
    const cycleTotalTime = fullIntervals.length * intervalBetweenNotes + pauseBetweenCycles;

    const scheduleCycle = (cycleStartTimeOffset: number) => {
      if (currentId !== playbackIdRef.current) return;

      fullIntervals.forEach((intervalValue, idx) => {
        const absoluteStep = rootIndex + intervalValue;
        const freq = 261.63 * Math.pow(2, absoluteStep / 24);

        const soundTimeout = window.setTimeout(() => {
          if (currentId !== playbackIdRef.current) return;

          const osc = ctx.createOscillator();
          const gainNode = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          osc.connect(filter);
          filter.connect(gainNode);
          gainNode.connect(ctx.destination);

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(1100, ctx.currentTime);
          filter.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + noteDuration);

          gainNode.gain.setValueAtTime(0, ctx.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 0.05);
          gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + noteDuration);

          osc.start();
          osc.stop(ctx.currentTime + noteDuration + 0.1);

          activeOscillatorsRef.current.push(osc);
        }, cycleStartTimeOffset + idx * intervalBetweenNotes);

        const uiTimeout = window.setTimeout(() => {
          if (currentId !== playbackIdRef.current) return;
          setPlayingIndex(idx);
        }, cycleStartTimeOffset + idx * intervalBetweenNotes);

        playbackTimeoutsRef.current.push(soundTimeout, uiTimeout);
      });

      const cycleEndTimeout = window.setTimeout(() => {
        if (currentId !== playbackIdRef.current) return;
        setPlayingIndex(null);
        // Next cycle
        scheduleCycle(0);
      }, cycleStartTimeOffset + fullIntervals.length * intervalBetweenNotes + pauseBetweenCycles);

      playbackTimeoutsRef.current.push(cycleEndTimeout);
    };

    const runPlayback = () => {
      scheduleCycle(0);
    };

    if (ctx.state === 'suspended') {
      ctx.resume().then(runPlayback);
    } else {
      runPlayback();
    }
  }, [isLooping, stopPlayback, selectedScaleType, selectedRoot, selectedAccidental, getAudioContext]);

  useEffect(() => {
    const warmUpAudio = () => {
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
    };
    window.addEventListener('click', warmUpAudio, { once: true });
    window.addEventListener('touchstart', warmUpAudio, { once: true });

    return () => {
      window.removeEventListener('click', warmUpAudio);
      window.removeEventListener('touchstart', warmUpAudio);
    };
  }, []);

  useEffect(() => {
    return () => {
      playbackTimeoutsRef.current.forEach(t => window.clearTimeout(t));
      activeOscillatorsRef.current.forEach(osc => {
        try {
          osc.stop();
        } catch (e) {
          // Already stopped
        }
      });
    };
  }, []);

  const playSingleNoteByIndex = useCallback((idx: number) => {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    stopPlayback();

    const rawIntervals = DASTGAH_INTERVALS_MAP[selectedScaleType] || MAHUR_INTERVALS;
    const fullIntervals = [...rawIntervals, 24];
    const intervalValue = fullIntervals[idx] !== undefined ? fullIntervals[idx] : 0;

    let rootIndex = NOTE_BASE_INDICES[selectedRoot] ?? 0;
    if (ACCIDENTAL_OFFSETS[selectedAccidental] !== undefined) {
      rootIndex += ACCIDENTAL_OFFSETS[selectedAccidental];
    }
    rootIndex = (rootIndex % 24 + 24) % 24;

    const absoluteStep = rootIndex + intervalValue;
    const freq = 261.63 * Math.pow(2, absoluteStep / 24);

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.45);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

    osc.start();
    osc.stop(ctx.currentTime + 0.5);

    setPlayingIndex(idx);
    const resetTimer = window.setTimeout(() => {
      setPlayingIndex((prev) => (prev === idx ? null : prev));
    }, 450);
    playbackTimeoutsRef.current.push(resetTimer);
  }, [getAudioContext, stopPlayback, selectedScaleType, selectedRoot, selectedAccidental]);

  return (
    <>
      {/* Refined Minimalist Persian Splash Screen */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="app-splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className={`fixed inset-0 z-[100] ${darkMode ? 'dark bg-gray-950 text-white' : 'bg-brand-gray text-brand-dark'} flex flex-col items-center justify-between p-6 sm:p-8 select-none`}
            onClick={() => setShowSplash(false)}
          >
            {/* Soft Ambient Brand Glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-brand-lime/30 dark:bg-brand-lime/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="w-full"></div>

            {/* Clean Center Identity with stable layout to prevent jumping */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="text-center space-y-4 flex flex-col items-center justify-center my-auto z-10"
            >
              {/* Brand Emblem */}
              <div className="w-20 h-20 rounded-3xl bg-brand-lime text-brand-dark flex items-center justify-center shadow-xl shadow-brand-lime/25 dark:shadow-none">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>

              <div className="space-y-1.5">
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-brand-dark dark:text-white">
                  کُرنوسُری
                </h1>
                <p className="text-sm font-black text-brand-dark/70 dark:text-gray-300">
                  محاسبه درجات گام موسیقی ایرانی
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-dark/5 dark:bg-white/10 text-[11px] font-bold text-brand-dark/60 dark:text-lime-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-lime"></span>
                  <span>روایت عدد و نغمه</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-lime"></span>
                </div>
              </div>
            </motion.div>

            {/* Bottom Progress Loading Bar & Version synchronized with 2.8s */}
            <div className="w-full max-w-xs space-y-2.5 mb-4 z-10 flex flex-col items-center">
              <div className="w-full h-1.5 bg-brand-dark/10 dark:bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.5, ease: 'easeInOut' }}
                  className="h-full bg-brand-lime dark:bg-lime-500 rounded-full"
                />
              </div>
              <div className="flex items-center justify-center w-full text-[11px] font-bold text-brand-dark/40 dark:text-gray-500">
                <span className="font-mono">نسخه {appVersion}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`flex flex-col min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'dark bg-gray-950 text-white' : 'bg-brand-gray text-brand-dark'} p-4 sm:p-6 md:p-8`} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
        <main className="flex-grow max-w-md mx-auto w-full flex flex-col relative gap-3.5 pb-2">
          
          {/* Header Bar */}
          <div className="w-full flex justify-between items-center gap-2" dir="ltr">
            {/* Unified Header Buttons Capsule */}
            <div className="flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-white dark:border-gray-700 shadow-sm shrink-0">
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => setLang(l => l === 'fa' ? 'en' : 'fa')} 
                className="text-[11px] font-black tracking-wider text-brand-dark dark:text-white hover:text-lime-600 dark:hover:text-lime-400 transition-colors cursor-pointer select-none px-0.5"
                title={lang === 'fa' ? 'تغییر زبان' : 'Change language'}
              >
                {lang === 'fa' ? 'EN' : 'FA'}
              </motion.button>

              <div className="w-[1px] h-3.5 bg-brand-dark/15 dark:bg-white/15 select-none" />

              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => setNotation(n => n === 'solfege' ? 'alphabet' : 'solfege')} 
                className="text-[11px] font-black tracking-tight text-brand-dark dark:text-white hover:text-lime-600 dark:hover:text-lime-400 transition-colors cursor-pointer select-none whitespace-nowrap px-0.5"
                title={lang === 'fa' ? 'تغییر سیستم نام‌گذاری نت‌ها' : 'Change note naming system'}
              >
                {notation === 'solfege' 
                  ? (lang === 'fa' ? 'دو ر می' : 'Do Re Mi') 
                  : 'A B C'}
              </motion.button>

              <div className="w-[1px] h-3.5 bg-brand-dark/15 dark:bg-white/15 select-none" />

              <div className="flex items-center gap-2">
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setDarkMode(!darkMode)} 
                  className="text-brand-dark/80 dark:text-gray-200 hover:text-lime-600 dark:hover:text-lime-400 transition-colors cursor-pointer flex items-center justify-center p-0.5"
                  title={darkMode ? (lang === 'fa' ? 'حالت روز' : 'Light mode') : (lang === 'fa' ? 'حالت شب' : 'Dark mode')}
                  aria-label="Toggle theme"
                >
                  {darkMode ? (
                    /* Sun icon - clean, modern, monochrome */
                    <svg className="w-4 h-4 text-brand-dark dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    /* Moon icon - clean, modern, monochrome */
                    <svg className="w-4 h-4 text-brand-dark dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </motion.button>

                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setView(v => v === 'tips' ? 'home' : 'tips')} 
                  className={`transition-colors cursor-pointer flex items-center justify-center p-0.5 ${
                    view === 'tips'
                      ? 'text-amber-500'
                      : 'text-brand-dark/80 dark:text-gray-200 hover:text-amber-500 dark:hover:text-amber-400'
                  }`}
                  title={lang === 'fa' ? 'نکات و ترفندها' : 'Tips & Tricks'}
                  aria-label="Tips and Tricks"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </motion.button>
              </div>
            </div>

            <div className="flex flex-col items-end shrink-0">
              <motion.h1 
                onClick={() => setView('home')}
                className="text-2xl font-black tracking-tighter text-brand-dark dark:text-white cursor-pointer select-none leading-tight whitespace-nowrap"
              >
                {t.appTitle}
              </motion.h1>
              <span className="text-[9.5px] font-bold text-brand-dark/40 dark:text-gray-500 tracking-normal select-none whitespace-nowrap">
                {t.appSlogan}
              </span>
            </div>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {view === 'home' && (
              <motion.div
                key="home"
                variants={pageTransitionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransitionConfig}
                className="flex-grow flex flex-col"
              >
                <div className="flex-grow flex flex-col gap-3.5">
                  
                  {/* Selector Card (Green) */}
                  <section className="bg-brand-lime dark:bg-lime-600/90 p-4 sm:p-4.5 rounded-3xl shadow-[0_12px_28px_-10px_rgba(211,243,106,0.35)] dark:shadow-none space-y-3 relative overflow-hidden transition-colors duration-300">
                    <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full border-[25px] border-white/20 opacity-40 pointer-events-none"></div>
                    <p className="text-center text-xs sm:text-sm font-black text-brand-dark/85 dark:text-lime-50 leading-relaxed whitespace-pre-line px-2">{t.instruction}</p>
     
                    <div className="space-y-3">
                      {/* Dastgah Selector */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between h-4.5">
                          <label className="text-brand-dark/75 dark:text-lime-100/90 text-[11px] font-black flex items-center gap-1.5 pr-0.5 tracking-wide">
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.8} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
                            {t.scaleLabel}
                          </label>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setShowScaleInfo(true)}
                            className="w-5 h-5 rounded-full bg-black/10 hover:bg-black/20 dark:bg-white/20 dark:hover:bg-white/30 flex items-center justify-center text-brand-dark dark:text-white transition-colors cursor-pointer"
                            title={lang === 'fa' ? 'راهنمای این دستگاه' : 'Scale info'}
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          </motion.button>
                        </div>
                        <div className="relative">
                          <select 
                            value={selectedScaleType} 
                            onChange={(e) => setSelectedScaleType(e.target.value)} 
                            className="appearance-none w-full h-12 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md text-brand-dark dark:text-white px-4 pe-9 rounded-2xl border border-white/60 dark:border-white/10 shadow-sm focus:ring-2 focus:ring-brand-dark/20 dark:focus:ring-brand-lime/40 outline-none transition-all font-sans text-xs sm:text-sm font-black cursor-pointer hover:bg-white dark:hover:bg-gray-900"
                          >
                            {scaleOptions.map(opt => (
                              <option key={opt.value} value={opt.value}>
                                {t.scales[opt.value as keyof typeof t.scales] || opt.value}
                              </option>
                            ))}
                          </select>
                          <div className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${lang === 'fa' ? 'left-3' : 'right-3'} flex items-center text-brand-dark/50 dark:text-gray-400`}>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
     
                      {/* Root Note & Accidental */}
                      <div className="flex gap-3">
                        <div className="w-3/5">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-brand-dark/75 dark:text-lime-100/90 text-[11px] font-black flex items-center gap-1.5 pr-0.5 tracking-wide h-4.5">
                              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.8} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                              {t.rootLabel}
                            </label>
                            <div className="relative">
                              <select 
                                value={selectedRoot} 
                                onChange={(e) => setSelectedRoot(e.target.value)} 
                                className="appearance-none w-full h-12 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md text-brand-dark dark:text-white px-4 pe-9 rounded-2xl border border-white/60 dark:border-white/10 shadow-sm focus:ring-2 focus:ring-brand-dark/20 dark:focus:ring-brand-lime/40 outline-none transition-all font-sans text-xs sm:text-sm font-black cursor-pointer hover:bg-white dark:hover:bg-gray-900"
                              >
                                {ROOT_OPTIONS.map(opt => (
                                  <option key={opt} value={opt}>
                                    {notation === 'alphabet' ? (ALPHABET_NOTES[opt] || opt) : (t.notes[opt as keyof typeof t.notes] || opt)}
                                  </option>
                                ))}
                              </select>
                              <div className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${lang === 'fa' ? 'left-3' : 'right-3'} flex items-center text-brand-dark/50 dark:text-gray-400`}>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-2/5">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-brand-dark/75 dark:text-lime-100/90 text-[11px] font-black flex items-center gap-1.5 pr-0.5 tracking-wide h-4.5">
                              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.8} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>
                              {t.accLabel}
                            </label>
                            <div className="relative">
                              <select 
                                value={selectedAccidental} 
                                onChange={(e) => setSelectedAccidental(e.target.value)} 
                                className="appearance-none w-full h-12 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md text-brand-dark dark:text-white px-4 pe-9 rounded-2xl border border-white/60 dark:border-white/10 shadow-sm focus:ring-2 focus:ring-brand-dark/20 dark:focus:ring-brand-lime/40 outline-none transition-all font-sans text-xs sm:text-sm font-black cursor-pointer hover:bg-white dark:hover:bg-gray-900"
                              >
                                {ACCIDENTAL_OPTIONS.map(opt => (
                                  <option key={opt} value={opt}>
                                    {t.accidentals[opt as keyof typeof t.accidentals] || opt}
                                  </option>
                                ))}
                              </select>
                              <div className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${lang === 'fa' ? 'left-3' : 'right-3'} flex items-center text-brand-dark/50 dark:text-gray-400`}>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
     
                  {/* Results Section Card */}
                  <section className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-4 sm:p-4.5 rounded-3xl shadow-sm border border-white dark:border-gray-800 flex flex-col gap-3.5 transition-colors duration-300">
                    <div className="flex items-center justify-between gap-2.5 pb-3 border-b border-brand-dark/5 dark:border-white/5">
                      {/* Left: Play & Auto Loop Sequence Buttons (Stacked Vertically) */}
                      <div className="shrink-0 flex flex-col gap-1.5 items-center justify-center">
                        {/* Play Single Run Button */}
                        <motion.button 
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.92 }}
                          onClick={playScale}
                          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all group shadow-sm cursor-pointer ${
                            playingIndex !== null && !isLooping
                              ? 'bg-rose-500 text-white shadow-rose-500/30' 
                              : 'bg-brand-lime text-brand-dark hover:bg-brand-dark hover:text-white dark:hover:bg-white dark:hover:text-brand-dark shadow-brand-lime/20'
                          }`}
                          title={playingIndex !== null && !isLooping ? t.stopScale : t.playScale}
                        >
                          <AnimatePresence mode="wait">
                            {playingIndex !== null && !isLooping ? (
                              <motion.svg 
                                key="stop" 
                                initial={{ scale: 0 }} 
                                animate={{ scale: 1 }} 
                                exit={{ scale: 0 }} 
                                className="w-3.5 h-3.5" 
                                fill="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <rect x="6" y="6" width="12" height="12" rx="2" />
                              </motion.svg>
                            ) : (
                              <motion.svg 
                                key="play" 
                                initial={{ scale: 0 }} 
                                animate={{ scale: 1 }} 
                                exit={{ scale: 0 }} 
                                className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" 
                                fill="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path d="M8 5v14l11-7z" />
                              </motion.svg>
                            )}
                          </AnimatePresence>
                        </motion.button>

                        {/* Auto Loop Playback Button */}
                        <motion.button 
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.92 }}
                          onClick={playScaleLoop}
                          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all group shadow-sm cursor-pointer ${
                            isLooping 
                              ? 'bg-amber-500 text-white shadow-amber-500/30 ring-2 ring-amber-400/50' 
                              : 'bg-white dark:bg-gray-800 text-brand-dark/60 dark:text-gray-300 hover:text-brand-dark dark:hover:text-white border border-gray-100 dark:border-gray-700 hover:bg-brand-lime/20'
                          }`}
                          title={isLooping ? t.stopLoopScale : t.loopScale}
                        >
                          <svg 
                            className={`w-4 h-4 transition-transform ${isLooping ? 'animate-spin text-white' : 'group-hover:rotate-45'}`} 
                            style={{ animationDuration: '4s' }}
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </motion.button>
                      </div>
 
                      {/* Center: Scale Name & Key Signature with plenty of spacious room */}
                      <div className="flex-grow text-center flex flex-col justify-center px-1">
                        <div className="text-xl sm:text-2xl font-black text-brand-dark dark:text-white tracking-tighter leading-tight select-none">
                          {lang === 'fa' ? <>{displayLabels.displayScaleName} {displayLabels.displayRoot}</> : <>{displayLabels.displayRoot} {displayLabels.displayScaleName}</>}
                        </div>
                        <div className="text-[11px] sm:text-xs font-bold text-brand-dark/60 dark:text-gray-400 flex items-center justify-center gap-1 mt-1 leading-normal">
                          <svg className="w-3.5 h-3.5 text-brand-dark/40 dark:text-gray-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
                          <span>
                            {lang === 'fa' ? `سرکلید: ${displayLabels.displayKeySignature}` : `Key Sig: ${displayLabels.displayKeySignature}`}
                          </span>
                        </div>
                      </div>
 
                      {/* Right Actions: Favorite & Copy (Stacked Vertically) */}
                      <div className="shrink-0 flex flex-col gap-1.5 items-center justify-center">
                        <motion.button 
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.92 }}
                          onClick={toggleFavorite} 
                          className={`w-9 h-9 rounded-xl border shadow-sm flex items-center justify-center group transition-colors cursor-pointer ${
                            isCurrentFavorite
                              ? "bg-amber-400 border-amber-400 text-brand-dark dark:bg-amber-500 dark:border-amber-500"
                              : "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-brand-dark/40 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400"
                          }`}
                          title={isCurrentFavorite ? t.favoriteRemoved : t.favoriteAdded}
                        >
                          <svg 
                            className="w-4 h-4 transition-transform group-hover:scale-110" 
                            fill={isCurrentFavorite ? "currentColor" : "none"} 
                            stroke="currentColor" 
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.172-.34.693-.34.865 0l2.457 4.981 5.495.8a.498.498 0 01.277.85l-3.978 3.876 1.002 5.474a.498.498 0 01-.723.526l-4.912-2.583-4.912 2.583a.498.498 0 01-.723-.526l1.002-5.474L2.08 10.13a.498.498 0 01.277-.85l5.495-.8 2.457-4.981z" />
                          </svg>
                        </motion.button>

                        <motion.button 
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.92 }}
                          onClick={copyToClipboard} 
                          className="w-9 h-9 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-center group transition-colors cursor-pointer"
                          title={t.copyTooltip}
                        >
                          <AnimatePresence mode="wait">
                            {copied ? (
                              <motion.svg key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></motion.svg>
                            ) : (
                              <motion.svg key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="w-4 h-4 text-brand-dark/40 dark:text-gray-400 group-hover:text-brand-dark dark:group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></motion.svg>
                            )}
                          </AnimatePresence>
                        </motion.button>
                      </div>
                    </div>
     
                    {/* Piano Keys Display */}
                    <div>
                      <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
                        {resultNotes.map((note, index) => (
                          <PianoKey 
                            key={`${note}-${index}`} 
                            note={note} 
                            index={index} 
                            lang={lang} 
                            notation={notation} 
                            active={playingIndex === index}
                            onClick={() => playSingleNoteByIndex(index)} 
                          />
                        ))}
                        {resultNotes.length > 0 && (
                          <PianoKey 
                            key="octave-note" 
                            note={resultNotes[0]} 
                            index={7} 
                            lang={lang} 
                            notation={notation} 
                            active={playingIndex === 7}
                            onClick={() => playSingleNoteByIndex(7)} 
                          />
                        )}
                      </div>
                    </div>
                  </section>

                  {/* Compact & Sleek User-Friendly Support Banner */}
                  <motion.section
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setView('support')}
                    dir={lang === 'fa' ? 'rtl' : 'ltr'}
                    className="p-4 sm:p-4.5 rounded-3xl bg-gradient-to-r from-rose-500/15 via-red-500/10 to-rose-600/15 dark:from-rose-950/45 dark:via-red-950/35 dark:to-rose-900/40 border border-rose-500/30 dark:border-rose-400/25 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/40 text-rose-500 flex items-center justify-center text-sm shadow-sm shrink-0 group-hover:scale-110 transition-transform">
                        ❤️
                      </div>
                      <div className={`flex flex-col min-w-0 ${lang === 'fa' ? 'text-right' : 'text-left'}`}>
                        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                          <h4 className="text-xs sm:text-sm font-black text-rose-950 dark:text-rose-100 leading-tight">
                            {lang === 'fa' ? 'حمایت از توسعه کُرنوسُری' : 'Support Koronosori'}
                          </h4>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 font-black whitespace-nowrap border border-rose-500/20">
                            {lang === 'fa' ? 'مستقل و رایگان' : 'Ad-free'}
                          </span>
                        </div>
                        <p className="text-[10px] sm:text-[11px] text-rose-950/70 dark:text-rose-200/70 font-medium mt-0.5 leading-tight">
                          {lang === 'fa' ? 'کمک به پایداری سرورها، بهبود برنامه و امکانات جدید' : 'Support server stability, app improvements & new features'}
                        </p>
                      </div>
                    </div>

                    <div className={`w-7 h-7 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center text-xs font-black shadow-sm shrink-0 transition-transform ${lang === 'fa' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
                      {lang === 'fa' ? '←' : '→'}
                    </div>
                  </motion.section>
                </div>
              </motion.div>
            )}

 
            {/* Favorites View */}
            {view === 'favorites' && (
              <motion.div
                key="favorites"
                variants={pageTransitionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransitionConfig}
                className="flex-grow flex flex-col"
              >
                {favorites.length === 0 ? (
                  <div className="flex-grow flex flex-col items-center justify-center text-center p-8 bg-white/70 dark:bg-gray-900/50 backdrop-blur-md rounded-3xl border border-white dark:border-gray-800 shadow-xl space-y-4">
                    <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center text-3xl">
                      ⭐️
                    </div>
                    <div className="space-y-2 max-w-xs">
                      <h3 className="text-lg font-black text-brand-dark dark:text-white">
                        {t.emptyFavorites}
                      </h3>
                      <p className="text-xs font-medium text-brand-dark/60 dark:text-gray-400 leading-relaxed">
                        {t.emptyFavoritesDesc}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex-grow flex flex-col gap-3.5">
                    <div className="space-y-3 shrink-0">
                      <div className="flex items-center justify-between gap-2.5 px-1">
                        <span className="text-xs font-black text-brand-dark/60 dark:text-gray-400">
                          {lang === 'fa' ? `نشان‌شده‌ها (${favorites.length})` : `Favorites (${favorites.length})`}
                        </span>
                        
                        {favorites.length >= 2 && (
                          <div className="relative">
                            {showConfirmClear ? (
                              <div className="flex items-center gap-1 bg-red-50 dark:bg-red-950/20 px-2 py-1 rounded-xl border border-red-100 dark:border-red-900/30">
                                <span className="text-[10px] font-bold text-red-600 dark:text-red-400">
                                  {lang === 'fa' ? 'مطمئنید؟' : 'Sure?'}
                                </span>
                                <button
                                  onClick={() => {
                                    setFavorites([]);
                                    setShowConfirmClear(false);
                                  }}
                                  className="text-[10px] font-black text-white bg-red-500 hover:bg-red-600 px-2 py-0.5 rounded-lg transition-colors cursor-pointer"
                                >
                                  {lang === 'fa' ? 'بله' : 'Yes'}
                                </button>
                                <button
                                  onClick={() => setShowConfirmClear(false)}
                                  className="text-[10px] font-bold text-brand-dark/50 dark:text-gray-400 hover:text-brand-dark dark:hover:text-white px-1.5 cursor-pointer"
                                >
                                  {lang === 'fa' ? 'خیر' : 'No'}
                                </button>
                              </div>
                            ) : (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowConfirmClear(true)}
                                className="text-[10px] font-black text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1 py-1 px-2.5 rounded-full bg-red-500/5 hover:bg-red-500/10 transition-colors cursor-pointer"
                              >
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                <span>{lang === 'fa' ? 'حذف همه' : 'Clear All'}</span>
                              </motion.button>
                            )}
                          </div>
                        )}
                      </div>
 
                      {/* Search Field */}
                      <div className="relative">
                        <input
                          type="text"
                          value={favSearch}
                          onChange={(e) => setFavSearch(e.target.value)}
                          placeholder={lang === 'fa' ? 'جستجو در نشان‌شده‌ها...' : 'Search favorites...'}
                          className="w-full py-2 pl-3 pr-9 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-brand-dark/5 dark:border-white/5 shadow-sm text-xs font-bold text-brand-dark dark:text-white placeholder-brand-dark/30 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-lime/50 transition-all"
                          dir={lang === 'fa' ? 'rtl' : 'ltr'}
                        />
                        <span className={`absolute top-2.5 ${lang === 'fa' ? 'right-3' : 'left-3'} text-brand-dark/30 dark:text-gray-500`}>
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </span>
                        {favSearch && (
                          <button
                            onClick={() => setFavSearch('')}
                            className={`absolute top-2.5 ${lang === 'fa' ? 'left-3' : 'right-3'} text-brand-dark/40 dark:text-gray-400 hover:text-brand-dark dark:hover:text-white cursor-pointer`}
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
 
                      {/* Horizontal Scale Filter Pills */}
                      {Array.from(new Set(favorites.map(f => f.scaleType))).length > 1 && (
                        <div className="flex gap-1 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1 px-1" dir={lang === 'fa' ? 'rtl' : 'ltr'}>
                          <button
                            onClick={() => setFavFilter(null)}
                            className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wider transition-all whitespace-nowrap shrink-0 border cursor-pointer ${
                              favFilter === null
                                ? 'bg-brand-dark text-white border-brand-dark dark:bg-white dark:text-brand-dark dark:border-white shadow-sm'
                                : 'bg-white/60 dark:bg-gray-900/60 text-brand-dark/60 dark:text-gray-400 border-brand-dark/5 dark:border-white/5 hover:bg-white dark:hover:bg-gray-900'
                            }`}
                          >
                            {lang === 'fa' ? 'همه دستگاه‌ها' : 'All Dastgahs'}
                          </button>
                          {(Array.from(new Set(favorites.map(f => f.scaleType))) as string[]).map((type) => {
                            const style = getScaleCardStyle(type);
                            const isSelected = favFilter === type;
                            return (
                              <button
                                key={type}
                                onClick={() => setFavFilter(type)}
                                className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wider transition-all whitespace-nowrap shrink-0 border cursor-pointer ${
                                  isSelected
                                    ? `${style.badge} ${style.border} shadow-sm dark:border-white/20`
                                    : 'bg-white/60 dark:bg-gray-900/60 text-brand-dark/60 dark:text-gray-400 border-brand-dark/5 dark:border-white/5 hover:bg-white dark:hover:bg-gray-900'
                                }`}
                              >
                                {t.scales[type as keyof typeof t.scales] || type}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
 
                    {/* Favorites Grid */}
                    <div className="grid grid-cols-2 gap-3.5 items-start" dir="rtl">
                      {favorites
                        .filter(fav => {
                          if (favFilter && fav.scaleType !== favFilter) return false;
                          if (favSearch.trim()) {
                            const term = favSearch.toLowerCase().trim();
                            const label = getFavoriteLabel(fav).toLowerCase();
                            const scaleName = (t.scales[fav.scaleType as keyof typeof t.scales] || fav.scaleType).toLowerCase();
                            const rootName = (t.notes[fav.root as keyof typeof t.notes] || fav.root).toLowerCase();
                            return label.includes(term) || scaleName.includes(term) || rootName.includes(term);
                          }
                          return true;
                        })
                        .map((fav, itemIdx) => {
                          const favNotes = getScaleNotes(fav.root, fav.accidental, fav.scaleType);
                          const keySigNotes = favNotes
                            .filter(note => note.includes(' ') || note.includes('دیز') || note.includes('بمل') || note.includes('سری') || note.includes('کرن'))
                            .map(translateNote);
                          const keySigStr = keySigNotes.length > 0 ? keySigNotes.join('، ') : (lang === 'fa' ? 'بدون علامت' : 'No accidentals');
                          const label = getFavoriteLabel(fav);
                          const style = getScaleCardStyle(fav.scaleType);
                          const rawIntervals = DASTGAH_INTERVALS_MAP[fav.scaleType] || MAHUR_INTERVALS;
 
                          return (
                            <motion.div
                              key={fav.id}
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.25, delay: itemIdx * 0.04 }}
                              whileHover={{ y: -4, scale: 1.01 }}
                              onClick={() => loadFavorite(fav)}
                              className={`w-full ${style.bg} ${style.darkBg} border ${style.border} ${style.darkBorder} p-4 rounded-[1.8rem] flex flex-col shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden group`}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${style.badge}`}>
                                  {t.scales[fav.scaleType as keyof typeof t.scales] || fav.scaleType}
                                </span>
                                <span className="text-amber-500 text-xs">📌</span>
                              </div>
 
                              <div className="text-right">
                                <span className={`text-sm sm:text-base font-black ${style.text} group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors`}>
                                  {label}
                                </span>
                              </div>
 
                              <div className="text-right mt-1 flex items-start gap-1">
                                <svg className="w-3 h-3 text-brand-dark/30 dark:text-gray-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
                                </svg>
                                <span className="text-[9px] leading-tight font-bold text-brand-dark/45 dark:text-gray-500">
                                  {lang === 'fa' ? 'سرکلید: ' : 'Key Sig: '}
                                  <span className="text-brand-dark/60 dark:text-gray-400">{keySigStr}</span>
                                </span>
                              </div>
 
                              {/* Clickable note list */}
                              <div className="flex flex-wrap gap-1 mt-2.5 border-t border-brand-dark/5 dark:border-white/5 pt-2" dir="ltr" onClick={(e) => e.stopPropagation()}>
                                {favNotes.map((note, idx) => {
                                  const noteOffset = rawIntervals[idx] || 0;
                                  return (
                                    <motion.button
                                      key={idx}
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => playSingleNoteDirectly(fav.root, fav.accidental, noteOffset)}
                                      className="text-[9px] px-1.5 py-0.5 rounded-md bg-white/60 dark:bg-black/20 border border-brand-dark/5 dark:border-white/5 font-mono font-bold text-brand-dark/60 dark:text-gray-400 hover:bg-brand-lime/20 dark:hover:bg-brand-lime/10 hover:text-brand-dark dark:hover:text-brand-lime hover:border-brand-lime/30 transition-all cursor-pointer"
                                      title={lang === 'fa' ? 'پخش نت' : 'Play note'}
                                    >
                                      {translateNote(note)}
                                    </motion.button>
                                  );
                                })}
                              </div>

                              {/* Personal Note Section */}
                              <div className="mt-2.5 pt-2 border-t border-brand-dark/5 dark:border-white/5 text-right" onClick={(e) => e.stopPropagation()}>
                                {editingNoteId === fav.id ? (
                                  <div className="space-y-1.5">
                                    <textarea
                                      value={editingNoteText}
                                      onChange={(e) => setEditingNoteText(e.target.value)}
                                      placeholder={t.notePlaceholder}
                                      className="w-full text-[11px] p-2 rounded-xl bg-white dark:bg-gray-800 border border-brand-dark/15 dark:border-white/15 text-brand-dark dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-lime resize-none"
                                      rows={2}
                                      autoFocus
                                    />
                                    <div className="flex items-center justify-end gap-1.5">
                                      <button
                                        onClick={() => {
                                          setEditingNoteId(null);
                                          setEditingNoteText('');
                                        }}
                                        className="text-[10px] px-2 py-0.5 rounded-lg text-brand-dark/50 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer font-bold"
                                      >
                                        {lang === 'fa' ? 'انصراف' : 'Cancel'}
                                      </button>
                                      <button
                                        onClick={() => handleSaveNote(fav.id, editingNoteText)}
                                        className="text-[10px] px-2.5 py-0.5 rounded-lg bg-brand-dark dark:bg-white text-white dark:text-brand-dark font-black cursor-pointer shadow-sm"
                                      >
                                        {t.saveNote}
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex items-start justify-between group/note gap-1.5">
                                    {fav.note ? (
                                      <div className="flex items-start gap-1 flex-grow">
                                        <span className="text-[10px] text-amber-500 mt-0.5">📝</span>
                                        <p className="text-[10px] font-medium text-brand-dark/70 dark:text-gray-300 leading-relaxed break-words">
                                          {fav.note}
                                        </p>
                                      </div>
                                    ) : (
                                      <span className="text-[9px] text-brand-dark/30 dark:text-gray-600 font-medium">
                                        {lang === 'fa' ? 'بدون یادداشت' : 'No personal note'}
                                      </span>
                                    )}
                                    <button
                                      onClick={() => {
                                        setEditingNoteId(fav.id);
                                        setEditingNoteText(fav.note || '');
                                      }}
                                      className="text-[9px] font-bold text-brand-dark/40 dark:text-gray-500 hover:text-brand-dark dark:hover:text-white px-1 py-0.5 rounded hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer shrink-0 transition-colors"
                                    >
                                      {fav.note ? t.editNote : `+ ${t.addNote}`}
                                    </button>
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center justify-between gap-1.5 mt-2.5 pt-2 border-t border-brand-dark/5 dark:border-white/5" onClick={(e) => e.stopPropagation()}>
                                {/* Trash Icon */}
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) => {
                                    setFavorites(prev => prev.filter(f => f.id !== fav.id));
                                  }}
                                  className="w-7 h-7 rounded-lg bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 flex items-center justify-center transition-all cursor-pointer"
                                  title={t.removeFavorite}
                                >
                                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </motion.button>

                                <div className="flex items-center gap-1.5">
                                  {/* Copy notes button */}
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => {
                                      const noteStr = favNotes.map(translateNote).join(' - ');
                                      const text = `${label}\n${lang === 'fa' ? 'نت‌ها: ' : 'Notes: '}${noteStr}\n${lang === 'fa' ? 'سرکلید: ' : 'Key Sig: '}${keySigStr}${fav.note ? `\n${lang === 'fa' ? 'یادداشت: ' : 'Note: '}${fav.note}` : ''}`;
                                      navigator.clipboard.writeText(text).then(() => {
                                        setCopiedFavId(fav.id);
                                        setTimeout(() => setCopiedFavId(null), 2000);
                                      });
                                    }}
                                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                                      copiedFavId === fav.id 
                                        ? 'bg-emerald-500 text-white' 
                                        : 'bg-white dark:bg-gray-800 text-brand-dark/60 dark:text-gray-400 border border-brand-dark/5 dark:border-white/5 hover:bg-brand-lime/10'
                                    }`}
                                    title={lang === 'fa' ? 'کپی نت‌ها' : 'Copy notes'}
                                  >
                                    {copiedFavId === fav.id ? (
                                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                      </svg>
                                    ) : (
                                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                      </svg>
                                    )}
                                  </motion.button>

                                  {/* Play Button */}
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => {
                                      playFavoriteScaleDirectly(fav);
                                    }}
                                    className="w-7 h-7 rounded-lg bg-brand-lime hover:bg-brand-dark hover:text-white text-brand-dark flex items-center justify-center transition-all shadow-sm cursor-pointer"
                                    title={t.playScale}
                                  >
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M8 5v14l11-7z" />
                                    </svg>
                                  </motion.button>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Metronome View */}
            {view === 'metronome' && (
              <motion.div
                key="metronome"
                variants={pageTransitionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransitionConfig}
                className="flex-grow flex flex-col"
              >
                <Metronome lang={lang} />
              </motion.div>
            )}
 
            {/* Consolidated InfoHub (About Us, Vaziri, Changelog) */}
            {(view === 'vaziri' || view === 'about' || view === 'changelog') && (
              <motion.div
                key="infohub"
                variants={pageTransitionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransitionConfig}
                className="flex-grow flex flex-col"
              >
                <InfoHub 
                  lang={lang}
                  appVersion={appVersion}
                  defaultSubTab={view === 'vaziri' ? 'vaziri' : view === 'changelog' ? 'changelog' : 'about'}
                />
              </motion.div>
            )}

            {/* Support View */}
            {view === 'support' && (
              <motion.div
                key="support"
                variants={pageTransitionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransitionConfig}
                className="flex-grow flex flex-col"
              >
                <SupportModal lang={lang} onBack={() => setView('home')} />
              </motion.div>
            )}

            {/* Tips & Tricks View */}
            {view === 'tips' && (
              <motion.div
                key="tips"
                variants={pageTransitionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransitionConfig}
                className="flex-grow flex flex-col"
              >
                <TipsModal lang={lang} onBack={() => setView('home')} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dastgah Info Modal */}
          <AnimatePresence>
            {showScaleInfo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
                onClick={() => setShowScaleInfo(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  className="bg-white dark:bg-gray-900 w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-brand-lime/10 dark:bg-lime-500/5 pointer-events-none"></div>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-brand-lime dark:bg-lime-600 flex items-center justify-center text-brand-dark dark:text-white shrink-0 shadow-lg shadow-brand-lime/20">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-brand-dark dark:text-white tracking-tighter">
                        {t.scales[selectedScaleType as keyof typeof t.scales] || selectedScaleType}
                      </h3>
                      <p className="text-[10px] font-black text-brand-dark/40 dark:text-gray-500 uppercase tracking-widest">
                        {lang === 'fa' ? 'درباره این دستگاه' : 'ABOUT THIS DASTGAH'}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-brand-dark/70 dark:text-gray-300 font-medium whitespace-pre-line">
                    {(t.scaleDescriptions as Record<string, string>)[selectedScaleType] || ''}
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowScaleInfo(false)}
                    className="w-full mt-8 py-4 rounded-2xl bg-brand-dark dark:bg-white text-white dark:text-brand-dark text-sm font-black tracking-widest uppercase shadow-xl cursor-pointer"
                  >
                    {t.backBtn}
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Clean, Compact Footer right below content */}
        <footer className="text-center pt-2 pb-20">
          <div className="w-12 h-1 bg-gray-200 dark:bg-gray-800 rounded-full mx-auto mb-2 opacity-50"></div>
          <p className="text-[9px] font-black text-brand-dark/25 dark:text-gray-600 uppercase tracking-[0.2em]">{t.footer}</p>
        </footer>

        {/* Mobile Sticky Bottom Navigation Bar */}
        <nav 
          className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-t border-black/5 dark:border-white/10 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_24px_rgba(0,0,0,0.35)] transition-colors duration-300"
          dir={lang === 'fa' ? 'rtl' : 'ltr'}
          aria-label="Bottom Navigation"
        >
          <div className="max-w-md mx-auto px-3 py-1 flex items-center justify-around pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))]">
            
            {/* Tab 1: Calculator (Home) */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setView('home')}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl cursor-pointer relative ${
                view === 'home'
                  ? 'text-brand-dark dark:text-white font-black'
                  : 'text-brand-dark/45 dark:text-gray-400 hover:text-brand-dark dark:hover:text-white font-bold'
              }`}
            >
              <div className="relative p-1.5 rounded-xl flex items-center justify-center">
                {view === 'home' && (
                  <motion.div
                    layoutId="activeBottomTabPill"
                    className="absolute inset-0 bg-brand-lime dark:bg-lime-400 rounded-xl shadow-xs shadow-brand-lime/40"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <div className={`relative z-10 transition-all duration-200 ${view === 'home' ? 'text-brand-dark scale-105' : 'text-current'}`}>
                  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={view === 'home' ? 2.5 : 2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight whitespace-nowrap transition-colors duration-200">
                {t.calculatorTab}
              </span>
            </motion.button>

            {/* Tab 2: Favorites (Directly beside Calculator) */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setView('favorites')}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl cursor-pointer relative ${
                view === 'favorites'
                  ? 'text-brand-dark dark:text-white font-black'
                  : 'text-brand-dark/45 dark:text-gray-400 hover:text-brand-dark dark:hover:text-white font-bold'
              }`}
            >
              <div className="relative p-1.5 rounded-xl flex items-center justify-center">
                {view === 'favorites' && (
                  <motion.div
                    layoutId="activeBottomTabPill"
                    className="absolute inset-0 bg-brand-lime dark:bg-lime-400 rounded-xl shadow-xs shadow-brand-lime/40"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <div className={`relative z-10 transition-all duration-200 ${view === 'favorites' ? 'text-brand-dark scale-105' : 'text-current'}`}>
                  <svg className={`w-5 h-5 shrink-0 ${view === 'favorites' ? 'fill-current' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={view === 'favorites' ? 2.5 : 2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>

                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 z-20 min-w-[17px] h-[17px] px-1 text-[9.5px] font-black rounded-full font-mono tabular-nums flex items-center justify-center bg-rose-500 text-white shadow-xs">
                    {favorites.length}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight whitespace-nowrap transition-colors duration-200">
                {t.favoritesTab}
              </span>
            </motion.button>

            {/* Tab 3: Metronome */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setView('metronome')}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl cursor-pointer relative ${
                view === 'metronome'
                  ? 'text-brand-dark dark:text-white font-black'
                  : 'text-brand-dark/45 dark:text-gray-400 hover:text-brand-dark dark:hover:text-white font-bold'
              }`}
            >
              <div className="relative p-1.5 rounded-xl flex items-center justify-center">
                {view === 'metronome' && (
                  <motion.div
                    layoutId="activeBottomTabPill"
                    className="absolute inset-0 bg-brand-lime dark:bg-lime-400 rounded-xl shadow-xs shadow-brand-lime/40"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <div className={`relative z-10 transition-all duration-200 ${view === 'metronome' ? 'text-brand-dark scale-105' : 'text-current'}`}>
                  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={view === 'metronome' ? 2.5 : 2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight whitespace-nowrap transition-colors duration-200">
                {t.metronomeTab}
              </span>
            </motion.button>

            {/* Tab 4: Unified Info Hub (About Us, Vaziri, Changelog) */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setView('vaziri')}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl cursor-pointer relative ${
                (view === 'vaziri' || view === 'about' || view === 'changelog')
                  ? 'text-brand-dark dark:text-white font-black'
                  : 'text-brand-dark/45 dark:text-gray-400 hover:text-brand-dark dark:hover:text-white font-bold'
              }`}
            >
              <div className="relative p-1.5 rounded-xl flex items-center justify-center">
                {(view === 'vaziri' || view === 'about' || view === 'changelog') && (
                  <motion.div
                    layoutId="activeBottomTabPill"
                    className="absolute inset-0 bg-brand-lime dark:bg-lime-400 rounded-xl shadow-xs shadow-brand-lime/40"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <div className={`relative z-10 transition-all duration-200 ${(view === 'vaziri' || view === 'about' || view === 'changelog') ? 'text-brand-dark scale-105' : 'text-current'}`}>
                  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={(view === 'vaziri' || view === 'about' || view === 'changelog') ? 2.5 : 2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight whitespace-nowrap transition-colors duration-200">
                {t.vaziriTab}
              </span>
            </motion.button>

          </div>
        </nav>
      </div>
    </>
  );
};

export default App;
