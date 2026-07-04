import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PianoKey } from './components/PianoKey';
import { getScaleNotes } from './utils/musicTheory';
import { ScaleType, FavoriteScale } from './types';
import { ROOT_OPTIONS, ACCIDENTAL_OPTIONS, TRANSLATIONS, SHUR_INTERVALS, MAHUR_INTERVALS, HOMAYOUN_INTERVALS, SEGAH_INTERVALS, CHAHARGAH_INTERVALS, NAVA_INTERVALS, RAST_PANJGAH_INTERVALS, ABOUATA_INTERVALS, BAYAT_TORK_INTERVALS, AFSHARI_INTERVALS, DASHTI_INTERVALS, BAYAT_ESFAHAN_INTERVALS, SCALE_ACADEMIC_DATA, ALPHABET_NOTES, NOTE_BASE_INDICES, ACCIDENTAL_OFFSETS } from './constants';

const getScaleCardStyle = (scaleType: string) => {
  const colors: Record<string, { bg: string; border: string; darkBg: string; darkBorder: string; badge: string; text: string }> = {
    'شور': { bg: 'bg-rose-50/75', border: 'border-rose-100/80', darkBg: 'dark:bg-rose-950/20', darkBorder: 'dark:border-rose-900/30', badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-400', text: 'text-rose-950 dark:text-rose-100' },
    'سه گاه': { bg: 'bg-amber-50/75', border: 'border-amber-100/80', darkBg: 'dark:bg-amber-950/20', darkBorder: 'dark:border-amber-900/30', badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400', text: 'text-amber-950 dark:text-amber-100' },
    'چهارگاه': { bg: 'bg-emerald-50/75', border: 'border-emerald-100/80', darkBg: 'dark:bg-emerald-950/20', darkBorder: 'dark:border-emerald-900/30', badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400', text: 'text-emerald-950 dark:text-emerald-100' },
    'همایون': { bg: 'bg-indigo-50/75', border: 'border-indigo-100/80', darkBg: 'dark:bg-indigo-950/20', darkBorder: 'dark:border-indigo-900/30', badge: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400', text: 'text-indigo-950 dark:text-indigo-100' },
    'ماهور': { bg: 'bg-sky-50/75', border: 'border-sky-100/80', darkBg: 'dark:bg-sky-950/20', darkBorder: 'dark:border-sky-900/30', badge: 'bg-sky-500/10 text-sky-600 dark:text-sky-400', text: 'text-sky-950 dark:text-sky-100' },
    'نوا': { bg: 'bg-violet-50/75', border: 'border-violet-100/80', darkBg: 'dark:bg-violet-950/20', darkBorder: 'dark:border-violet-900/30', badge: 'bg-violet-500/10 text-violet-600 dark:text-violet-400', text: 'text-violet-950 dark:text-violet-100' },
    'راست پنجگاه': { bg: 'bg-teal-50/75', border: 'border-teal-100/80', darkBg: 'dark:bg-teal-950/20', darkBorder: 'dark:border-teal-900/30', badge: 'bg-teal-500/10 text-teal-600 dark:text-teal-400', text: 'text-teal-950 dark:text-teal-100' },
    'ابوعطا': { bg: 'bg-fuchsia-50/75', border: 'border-fuchsia-100/80', darkBg: 'dark:bg-fuchsia-950/20', darkBorder: 'dark:border-fuchsia-900/30', badge: 'bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400', text: 'text-fuchsia-950 dark:text-fuchsia-100' },
    'بیات ترک': { bg: 'bg-orange-50/75', border: 'border-orange-100/80', darkBg: 'dark:bg-orange-950/20', darkBorder: 'dark:border-orange-900/30', badge: 'bg-orange-500/10 text-orange-600 dark:text-orange-400', text: 'text-orange-950 dark:text-orange-100' },
    'افشاری': { bg: 'bg-cyan-50/75', border: 'border-cyan-100/80', darkBg: 'dark:bg-cyan-950/20', darkBorder: 'dark:border-cyan-900/30', badge: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400', text: 'text-cyan-950 dark:text-cyan-100' },
    'دشتی': { bg: 'bg-lime-50/75', border: 'border-lime-100/80', darkBg: 'dark:bg-lime-950/20', darkBorder: 'dark:border-lime-900/30', badge: 'bg-lime-500/10 text-lime-600 dark:text-lime-400', text: 'text-lime-950 dark:text-lime-100' },
    'بیات اصفهان': { bg: 'bg-purple-50/75', border: 'border-purple-100/80', darkBg: 'dark:bg-purple-950/20', darkBorder: 'dark:border-purple-900/30', badge: 'bg-purple-500/10 text-purple-600 dark:text-purple-400', text: 'text-purple-950 dark:text-purple-100' },
    'default': { bg: 'bg-gray-50/70', border: 'border-gray-100/80', darkBg: 'dark:bg-gray-900/40', darkBorder: 'dark:border-gray-800/40', badge: 'bg-gray-500/10 text-gray-600 dark:text-gray-400', text: 'text-gray-955 dark:text-gray-100' },
  };
  return colors[scaleType] || colors['default'];
};

const App: React.FC = () => {
  const [selectedRoot, setSelectedRoot] = useState<string>('سل');
  const [selectedAccidental, setSelectedAccidental] = useState<string>('بکار');
  const [selectedScaleType, setSelectedScaleType] = useState<string>('شور');
  const [copied, setCopied] = useState(false);
  const [lang, setLang] = useState<'fa' | 'en'>('fa');
  const [darkMode, setDarkMode] = useState(false);
  const [notation, setNotation] = useState<'solfege' | 'alphabet'>('solfege');
  const [view, setView] = useState<'home' | 'about' | 'vaziri' | 'support' | 'favorites' | 'changelog'>('home');
  const [showScaleInfo, setShowScaleInfo] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [showAcademic, setShowAcademic] = useState(false);

  const [appVersion, setAppVersion] = useState<string>(() => {
    try {
      return localStorage.getItem('koronosori_app_version') || '1.2.0';
    } catch {
      return '1.2.0';
    }
  });

  const [updateStatus, setUpdateStatus] = useState<'idle' | 'checking' | 'update-available' | 'updating' | 'up-to-date' | 'success'>('idle');

  const handleCheckUpdates = useCallback(() => {
    setUpdateStatus('checking');
    setTimeout(() => {
      if (appVersion === '2.1.0') {
        setUpdateStatus('up-to-date');
      } else {
        setUpdateStatus('update-available');
      }
    }, 1500);
  }, [appVersion]);

  const handleApplyUpdate = useCallback(() => {
    setUpdateStatus('updating');
    setTimeout(() => {
      try {
        localStorage.setItem('koronosori_app_version', '2.1.0');
      } catch (e) {
        // Fallback
      }
      setAppVersion('2.1.0');
      setUpdateStatus('success');
    }, 2000);
  }, []);

  const [favorites, setFavorites] = useState<FavoriteScale[]>(() => {
    try {
      const saved = localStorage.getItem('koronosori_favorites');
      return saved ? JSON.parse(saved) : [];
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

  const playSingleNoteDirectly = useCallback((root: string, accidental: string, offsetValue: number) => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
    }
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    let rootIndex = NOTE_BASE_INDICES[root] || 0;
    if (ACCIDENTAL_OFFSETS.hasOwnProperty(accidental)) {
      rootIndex += ACCIDENTAL_OFFSETS[accidental];
    }
    rootIndex = (rootIndex + 24) % 24;

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
    filter.frequency.setValueAtTime(1000, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.4);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
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

  const scaleOptions = useMemo(() => [
    { label: 'شور', value: 'شور', type: ScaleType.SHUR },
    { label: 'سه گاه', value: 'سه گاه', type: ScaleType.SEGAH },
    { label: 'چهارگاه', value: 'چهارگاه', type: ScaleType.CHAHARGAH },
    { label: 'ماهور', value: 'ماهور', type: ScaleType.MAHUR },
    { label: 'همایون', value: 'همایون', type: ScaleType.HOMAYOUN },
    { label: 'نوا', value: 'نوا', type: ScaleType.NAVA },
    { label: 'راست پنجگاه', value: 'راست پنجگاه', type: ScaleType.RAST_PANJGAH },
    { label: 'ابوعطا', value: 'ابوعطا', type: ScaleType.ABOUATA },
    { label: 'بیات ترک', value: 'بیات ترک', type: ScaleType.BAYAT_TORK },
    { label: 'افشاری', value: 'افشاری', type: ScaleType.AFSHARI },
    { label: 'دشتی', value: 'دشتی', type: ScaleType.DASHTI },
    { label: 'بیات اصفهان', value: 'بیات اصفهان', type: ScaleType.BAYAT_ESFAHAN },
  ], []);

  const scaleTypeEnum = useMemo(() => 
    scaleOptions.find(o => o.value === selectedScaleType)?.type || ScaleType.SHUR
  , [scaleOptions, selectedScaleType]);

  const resultNotes = useMemo(() => 
    getScaleNotes(selectedRoot, selectedAccidental, scaleTypeEnum)
  , [selectedRoot, selectedAccidental, scaleTypeEnum]);

  const intervalsBetween = useMemo(() => {
    const type = scaleOptions.find(o => o.value === selectedScaleType)?.type;
    const rawIntervals = type === ScaleType.SHUR ? SHUR_INTERVALS :
                        type === ScaleType.MAHUR ? MAHUR_INTERVALS :
                        type === ScaleType.HOMAYOUN ? HOMAYOUN_INTERVALS :
                        type === ScaleType.SEGAH ? SEGAH_INTERVALS :
                        type === ScaleType.CHAHARGAH ? CHAHARGAH_INTERVALS :
                        type === ScaleType.NAVA ? NAVA_INTERVALS :
                        type === ScaleType.RAST_PANJGAH ? RAST_PANJGAH_INTERVALS :
                        type === ScaleType.ABOUATA ? ABOUATA_INTERVALS :
                        type === ScaleType.BAYAT_TORK ? BAYAT_TORK_INTERVALS :
                        type === ScaleType.AFSHARI ? AFSHARI_INTERVALS :
                        type === ScaleType.DASHTI ? DASHTI_INTERVALS :
                        type === ScaleType.BAYAT_ESFAHAN ? BAYAT_ESFAHAN_INTERVALS : MAHUR_INTERVALS;
    
    const fullIntervals = [...rawIntervals, 24];
    const diffs = [];
    for (let i = 0; i < fullIntervals.length - 1; i++) {
      diffs.push(fullIntervals[i+1] - fullIntervals[i]);
    }
    return diffs;
  }, [selectedScaleType, scaleOptions]);

  const displayLabels = useMemo(() => {
    const translatedRoot = notation === 'alphabet'
      ? (ALPHABET_NOTES[selectedRoot] || selectedRoot)
      : (t.notes[selectedRoot as keyof typeof t.notes] || selectedRoot);
    const translatedAccidental = selectedAccidental === 'بکار' 
      ? '' 
      : (t.accidentals[selectedAccidental as keyof typeof t.accidentals] || selectedAccidental);
    const displayRoot = translatedAccidental ? `${translatedRoot} ${translatedAccidental}` : translatedRoot;
    const rawScaleName = scaleOptions.find(o => o.value === selectedScaleType)?.label || '';
    const displayScaleName = t.scales[rawScaleName as keyof typeof t.scales] || rawScaleName;
    
    // Calculate Key Signature (سرکلید)
    const keySignatureNotes = resultNotes
      .filter(note => note.includes(' ') || note.includes('دیز') || note.includes('بمل') || note.includes('سری') || note.includes('کرن'))
      .map(translateNote);
    const displayKeySignature = keySignatureNotes.length > 0 ? keySignatureNotes.join('، ') : (lang === 'fa' ? 'بدون علامت' : 'No accidentals');

    return { displayRoot, displayScaleName, displayKeySignature };
  }, [lang, selectedRoot, selectedAccidental, selectedScaleType, scaleOptions, t, resultNotes, translateNote, notation]);

  const academicData = useMemo(() => {
    return SCALE_ACADEMIC_DATA[selectedScaleType as keyof typeof SCALE_ACADEMIC_DATA] || null;
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
    const textToCopy = `${displayLabels.displayScaleName} ${displayLabels.displayRoot}\n${lang === 'fa' ? 'سرکلید' : 'Key Signature'}: ${displayLabels.displayKeySignature}\n\n${fullNotesList.map(translateNote).join(' - ')}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [resultNotes, displayLabels, lang, translateNote]);

  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const playbackTimeoutsRef = useRef<number[]>([]);
  const playbackIdRef = useRef<number>(0);
  const activeOscillatorsRef = useRef<OscillatorNode[]>([]);

  const stopPlayback = useCallback(() => {
    playbackIdRef.current++;
    playbackTimeoutsRef.current.forEach(t => window.clearTimeout(t));
    playbackTimeoutsRef.current = [];
    
    activeOscillatorsRef.current.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {
        // Oscillator already stopped or not started
      }
    });
    activeOscillatorsRef.current = [];
    
    setPlayingIndex(null);
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
    
    const rawIntervals = fav.scaleType === 'شور' ? SHUR_INTERVALS :
                        fav.scaleType === 'سه گاه' ? SEGAH_INTERVALS :
                        fav.scaleType === 'چهارگاه' ? CHAHARGAH_INTERVALS :
                        fav.scaleType === 'ماهور' ? MAHUR_INTERVALS :
                        fav.scaleType === 'همایون' ? HOMAYOUN_INTERVALS :
                        fav.scaleType === 'نوا' ? NAVA_INTERVALS :
                        fav.scaleType === 'راست پنجگاه' ? RAST_PANJGAH_INTERVALS :
                        fav.scaleType === 'ابوعطا' ? ABOUATA_INTERVALS :
                        fav.scaleType === 'بیات ترک' ? BAYAT_TORK_INTERVALS :
                        fav.scaleType === 'افشاری' ? AFSHARI_INTERVALS :
                        fav.scaleType === 'دشتی' ? DASHTI_INTERVALS :
                        fav.scaleType === 'بیات اصفهان' ? BAYAT_ESFAHAN_INTERVALS : MAHUR_INTERVALS;

    const fullIntervals = [...rawIntervals, 24];
    let rootIndex = NOTE_BASE_INDICES[fav.root] || 0;
    if (ACCIDENTAL_OFFSETS.hasOwnProperty(fav.accidental)) {
      rootIndex += ACCIDENTAL_OFFSETS[fav.accidental];
    }
    rootIndex = (rootIndex + 24) % 24;

    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
    }
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    stopPlayback();
    const currentId = ++playbackIdRef.current;
    setPlayingIndex(0);

    const noteDuration = 0.5;
    const intervalBetweenNotes = 600;

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
          filter.frequency.setValueAtTime(1000, ctx.currentTime);
          filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + noteDuration);

          gainNode.gain.setValueAtTime(0, ctx.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.05);
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
  }, [stopPlayback]);

  const playScale = useCallback(() => {
    // If already playing, stop it
    if (playingIndex !== null) {
      stopPlayback();
      return;
    }

    // Initialize AudioContext
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
    }
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    stopPlayback();
    const currentId = ++playbackIdRef.current;
    setPlayingIndex(0);

    const rawIntervals = scaleTypeEnum === ScaleType.SHUR ? SHUR_INTERVALS :
                        scaleTypeEnum === ScaleType.MAHUR ? MAHUR_INTERVALS :
                        scaleTypeEnum === ScaleType.HOMAYOUN ? HOMAYOUN_INTERVALS :
                        scaleTypeEnum === ScaleType.SEGAH ? SEGAH_INTERVALS :
                        scaleTypeEnum === ScaleType.CHAHARGAH ? CHAHARGAH_INTERVALS :
                        scaleTypeEnum === ScaleType.NAVA ? NAVA_INTERVALS :
                        scaleTypeEnum === ScaleType.RAST_PANJGAH ? RAST_PANJGAH_INTERVALS :
                        scaleTypeEnum === ScaleType.ABOUATA ? ABOUATA_INTERVALS :
                        scaleTypeEnum === ScaleType.BAYAT_TORK ? BAYAT_TORK_INTERVALS :
                        scaleTypeEnum === ScaleType.AFSHARI ? AFSHARI_INTERVALS :
                        scaleTypeEnum === ScaleType.DASHTI ? DASHTI_INTERVALS :
                        scaleTypeEnum === ScaleType.BAYAT_ESFAHAN ? BAYAT_ESFAHAN_INTERVALS : MAHUR_INTERVALS;

    const fullIntervals = [...rawIntervals, 24]; // includes the octave note

    // Calculate root absolute index
    let rootIndex = NOTE_BASE_INDICES[selectedRoot] || 0;
    if (ACCIDENTAL_OFFSETS.hasOwnProperty(selectedAccidental)) {
      rootIndex += ACCIDENTAL_OFFSETS[selectedAccidental];
    }
    rootIndex = (rootIndex + 24) % 24;

    const noteDuration = 0.5; // duration of sound
    const intervalBetweenNotes = 600; // milliseconds between notes

    const runPlayback = () => {
      if (currentId !== playbackIdRef.current) return;

      fullIntervals.forEach((intervalValue, idx) => {
        const absoluteStep = rootIndex + intervalValue;
        // Calculate frequency: C4 is 261.63 Hz, which corresponds to index 0.
        const freq = 261.63 * Math.pow(2, absoluteStep / 24);

        const soundTimeout = window.setTimeout(() => {
          if (currentId !== playbackIdRef.current) return;

          const osc = ctx.createOscillator();
          const gainNode = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          osc.connect(filter);
          filter.connect(gainNode);
          gainNode.connect(ctx.destination);

          osc.type = 'triangle'; // Warm acoustic tone
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(1000, ctx.currentTime);
          filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + noteDuration);

          gainNode.gain.setValueAtTime(0, ctx.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.05);
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

      // Reset playingIndex after the last note completes
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
  }, [selectedRoot, selectedAccidental, scaleTypeEnum, playingIndex, stopPlayback]);

  useEffect(() => {
    const warmUpAudio = () => {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          audioCtxRef.current = new AudioContextClass();
        }
      }
      const ctx = audioCtxRef.current;
      if (ctx && ctx.state === 'suspended') {
        ctx.resume();
      }
      // Remove listeners after first interaction
      window.removeEventListener('click', warmUpAudio);
      window.removeEventListener('touchstart', warmUpAudio);
    };

    window.addEventListener('click', warmUpAudio);
    window.addEventListener('touchstart', warmUpAudio);

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

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-brand-lime flex flex-col items-center justify-center text-brand-dark overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-center space-y-4 flex flex-col items-center justify-center h-full"
            >
              <h2 className="text-5xl font-black tracking-tighter leading-tight">
                محاسبه‌گر
              </h2>
              <h2 className="text-3xl font-black tracking-tighter leading-tight opacity-80">
                درجات گام موسیقی
              </h2>
              <h2 className="text-6xl font-black tracking-tighter leading-tight mt-4">
                ایرانی
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-10 font-mono text-xs font-black tracking-widest"
            >
              VERSION {appVersion}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      <div className={`flex flex-col min-h-screen font-sans transition-colors duration-500 ${darkMode ? 'dark bg-gray-950 text-white' : 'bg-brand-gray text-brand-dark'} p-4 sm:p-6 md:p-8`} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      <main className="flex-grow max-w-md mx-auto w-full flex flex-col relative gap-4">
        <div className="w-full flex justify-between items-center mb-2.5" dir="ltr">
          <div className="flex gap-1.5">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setLang(l => l === 'fa' ? 'en' : 'fa')} 
              className="px-3 py-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-white dark:border-gray-700 shadow-sm hover:shadow-md text-[10px] font-black tracking-widest text-brand-dark dark:text-white"
            >
              {lang === 'fa' ? 'EN' : 'FA'}
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setNotation(n => n === 'solfege' ? 'alphabet' : 'solfege')} 
              className="px-3 py-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-white dark:border-gray-700 shadow-sm hover:shadow-md text-[10px] font-black tracking-wider text-brand-dark dark:text-white flex items-center gap-1.5 cursor-pointer"
              title={lang === 'fa' ? 'تغییر سیستم نام‌گذاری نت‌ها' : 'Change note naming system'}
            >
              <svg className="w-3.5 h-3.5 text-brand-dark dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              <span>
                {notation === 'solfege' 
                  ? (lang === 'fa' ? 'سلفژ (دو ر می)' : 'Solfege') 
                  : (lang === 'fa' ? 'حروف (A B C)' : 'Letters')}
              </span>
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setDarkMode(!darkMode)} 
              className="px-2.5 py-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-white dark:border-gray-700 shadow-sm hover:shadow-md text-xs text-brand-dark dark:text-white"
            >
              {darkMode ? '☀️' : '🌙'}
            </motion.button>
          </div>

          <motion.h1 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-black text-brand-dark dark:text-white tracking-tighter select-none drop-shadow-sm"
          >
            {t.appTitle}
          </motion.h1>
        </div>

        {(view === 'home' || view === 'favorites') && (
          <div className="w-full flex bg-white/70 dark:bg-gray-900/50 p-1 rounded-2xl border border-white dark:border-gray-800 shadow-sm mb-2.5 shrink-0 transition-colors duration-500">
            <button 
              onClick={() => setView('home')}
              className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${
                view === 'home' 
                  ? 'bg-brand-dark text-white dark:bg-white dark:text-brand-dark shadow-sm' 
                  : 'text-brand-dark/50 dark:text-gray-400 hover:text-brand-dark dark:hover:text-white'
              }`}
            >
              {t.calculatorTab}
            </button>
            <button 
              onClick={() => setView('favorites')}
              className={`flex-1 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                view === 'favorites' 
                  ? 'bg-brand-dark text-white dark:bg-white dark:text-brand-dark shadow-sm' 
                  : 'text-brand-dark/50 dark:text-gray-400 hover:text-brand-dark dark:hover:text-white'
              }`}
            >
              <svg className={`w-3.5 h-3.5 ${view === 'favorites' ? 'text-amber-400' : 'text-brand-dark/40 dark:text-gray-500'}`} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              <span>{t.favoritesTab}</span>
              {favorites.length > 0 && (
                <span className={`inline-flex items-center justify-center px-2 py-0.5 text-[9px] font-black rounded-full leading-none transition-colors ${
                  view === 'favorites' 
                    ? 'bg-brand-lime text-brand-dark dark:bg-lime-500 dark:text-white' 
                    : 'bg-brand-dark/10 text-brand-dark dark:bg-white/10 dark:text-white'
                }`}>
                  {favorites.length}
                </span>
              )}
            </button>
          </div>
        )}
        
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
              <div className="flex-grow flex flex-col gap-3.5 py-1">
                <section className="bg-brand-lime dark:bg-lime-600/90 p-3.5 rounded-[2rem] shadow-[0_15px_35px_-12px_rgba(211,243,106,0.35)] dark:shadow-none space-y-3 relative overflow-hidden transition-colors duration-500">
                   <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full border-[25px] border-white/20 opacity-40 pointer-events-none"></div>
                   <p className="text-center text-xs sm:text-sm font-black text-brand-dark/80 dark:text-lime-50 leading-tight whitespace-pre-line px-2">{t.instruction}</p>
   
                   <div className="space-y-3">
                      <div className="flex flex-col gap-1">
                         <div className="flex items-center justify-between">
                           <label className="text-brand-dark/60 dark:text-lime-100/70 text-[10px] font-black flex items-center gap-1.5 pr-1 uppercase tracking-widest">
                             <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
                             {t.scaleLabel}
                           </label>
                           <motion.button
                             whileTap={{ scale: 0.9 }}
                             onClick={() => setShowScaleInfo(true)}
                             className="w-5 h-5 rounded-full bg-white/20 dark:bg-black/20 flex items-center justify-center text-brand-dark dark:text-white"
                           >
                             <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                           </motion.button>
                         </div>
                         <select value={selectedScaleType} onChange={(e) => setSelectedScaleType(e.target.value)} className="appearance-none w-full bg-white/90 dark:bg-gray-900/50 backdrop-blur-sm text-brand-dark dark:text-white py-2.5 px-3.5 rounded-xl border-none shadow-inner focus:ring-2 focus:ring-brand-dark/5 outline-none transition-all duration-300 font-sans text-xs sm:text-sm font-black">
                           {scaleOptions.map(opt => <option key={opt.value} value={opt.value}>{t.scales[opt.value as keyof typeof t.scales] || opt.value}</option>)}
                         </select>
                      </div>
   
                      <div className="flex gap-3">
                        <div className="w-3/5">
                           <div className="flex flex-col gap-1">
                              <label className="text-brand-dark/60 dark:text-lime-100/70 text-[10px] font-black flex items-center gap-1.5 pr-1 uppercase tracking-widest">
                                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                                {t.rootLabel}
                              </label>
                              <select value={selectedRoot} onChange={(e) => setSelectedRoot(e.target.value)} className="appearance-none w-full bg-white/90 dark:bg-gray-900/50 backdrop-blur-sm text-brand-dark dark:text-white py-2.5 px-3.5 rounded-xl border-none shadow-inner focus:ring-2 focus:ring-brand-dark/5 outline-none transition-all duration-300 font-sans text-xs sm:text-sm font-black">
                                {ROOT_OPTIONS.map(opt => (
                                  <option key={opt} value={opt}>
                                    {notation === 'alphabet' ? (ALPHABET_NOTES[opt] || opt) : (t.notes[opt as keyof typeof t.notes] || opt)}
                                  </option>
                                ))}
                              </select>
                           </div>
                        </div>
                        <div className="w-2/5">
                           <div className="flex flex-col gap-1">
                              <label className="text-brand-dark/60 dark:text-lime-100/70 text-[10px] font-black flex items-center gap-1.5 pr-1 uppercase tracking-widest">
                                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>
                                {t.accLabel}
                              </label>
                              <select value={selectedAccidental} onChange={(e) => setSelectedAccidental(e.target.value)} className="appearance-none w-full bg-white/90 dark:bg-gray-900/50 backdrop-blur-sm text-brand-dark dark:text-white py-2.5 px-3.5 rounded-xl border-none shadow-inner focus:ring-2 focus:ring-brand-dark/5 outline-none transition-all duration-300 font-sans text-xs sm:text-sm font-black">
                                {ACCIDENTAL_OPTIONS.map(opt => <option key={opt} value={opt}>{t.accidentals[opt as keyof typeof t.accidentals] || opt}</option>)}
                              </select>
                           </div>
                        </div>
                      </div>
                   </div>
                </section>

                <section className="pt-1 pb-1.5">
                   <div className="flex items-center justify-between w-full gap-2">
                     {/* Right Actions: Play Button (In RTL) */}
                     <div className="shrink-0 flex items-center">
                       {/* Play Scale Button */}
                       <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={playScale} 
                        className={`w-10 h-10 rounded-xl border shadow-sm flex items-center justify-center group transition-colors ${
                          playingIndex !== null
                            ? "bg-brand-lime border-brand-lime text-brand-dark dark:bg-lime-500 dark:border-lime-500"
                            : "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-brand-dark/30 dark:text-gray-500 hover:text-brand-dark dark:hover:text-white"
                        }`}
                        title={playingIndex !== null ? t.stopScale : t.playScale}
                       >
                          <AnimatePresence mode="wait">
                            {playingIndex !== null ? (
                              <motion.svg 
                                key="stop" 
                                initial={{ scale: 0 }} 
                                animate={{ scale: 1 }} 
                                exit={{ scale: 0 }} 
                                className="w-4 h-4 text-brand-dark" 
                                fill="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <rect x="4" y="4" width="16" height="16" rx="2" />
                              </motion.svg>
                            ) : (
                              <motion.svg 
                                key="play" 
                                initial={{ scale: 0 }} 
                                animate={{ scale: 1 }} 
                                exit={{ scale: 0 }} 
                                className="w-4 h-4 group-hover:scale-110 transition-transform" 
                                fill="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path d="M8 5v14l11-7z" />
                              </motion.svg>
                            )}
                          </AnimatePresence>
                       </motion.button>
                     </div>

                     {/* Center: Scale Name & Key Signature */}
                     <div className="flex-grow text-center flex flex-col gap-0.5">
                       <div className="text-xl sm:text-2xl font-black text-brand-dark dark:text-white tracking-tighter leading-tight select-none">
                          {lang === 'fa' ? <>{displayLabels.displayScaleName} {displayLabels.displayRoot}</> : <>{displayLabels.displayRoot} {displayLabels.displayScaleName}</>}
                       </div>
                       <div className="text-[10px] font-bold text-brand-dark/40 dark:text-gray-500 flex items-center justify-center gap-1">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" /></svg>
                          <span>{lang === 'fa' ? 'سرکلید:' : 'Key Sig:'}</span>
                          <span className="text-brand-dark/60 dark:text-gray-400">{displayLabels.displayKeySignature}</span>
                       </div>
                     </div>

                     {/* Left Actions: Copy & Favorite Buttons (In RTL) */}
                     <div className="shrink-0 flex items-center gap-1.5">
                       {/* Favorite Button */}
                       <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleFavorite} 
                        className={`w-10 h-10 rounded-xl border shadow-sm flex items-center justify-center group transition-colors ${
                          isCurrentFavorite
                            ? "bg-amber-400 border-amber-400 text-brand-dark dark:bg-amber-500 dark:border-amber-500"
                            : "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-brand-dark/30 dark:text-gray-500 hover:text-amber-500 dark:hover:text-amber-400"
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

                       {/* Copy Button */}
                       <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={copyToClipboard} 
                        className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-center group transition-colors"
                        title={t.copyTooltip}
                       >
                          <AnimatePresence mode="wait">
                            {copied ? (
                              <motion.svg key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></motion.svg>
                            ) : (
                              <motion.svg key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="w-5 h-5 text-brand-dark/30 dark:text-gray-500 group-hover:text-brand-dark dark:group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></motion.svg>
                            )}
                          </AnimatePresence>
                       </motion.button>
                     </div>
                   </div>
  
                   <div className="grid grid-cols-4 gap-2.5 pt-1.5">
                    {resultNotes.map((note, index) => <PianoKey key={`${note}-${index}`} note={note} index={index} lang={lang} notation={notation} active={playingIndex === index} />)}
                    {resultNotes.length > 0 && <PianoKey key="octave-note" note={resultNotes[0]} index={7} lang={lang} notation={notation} active={playingIndex === 7} />}
                   </div>

                  {/* Academic Toggle Button */}
                  {academicData && (
                    <button 
                      onClick={() => setShowAcademic(!showAcademic)}
                      className="mt-3.5 w-full py-2.5 px-4 rounded-xl border border-brand-dark/5 dark:border-white/5 bg-white/50 dark:bg-gray-900/50 hover:bg-brand-lime/10 dark:hover:bg-lime-500/10 text-xs font-black text-brand-dark/70 dark:text-gray-300 flex items-center justify-between transition-all"
                    >
                      <span className="flex items-center gap-2">
                        <svg className={`w-3.5 h-3.5 text-brand-lime dark:text-lime-500 transition-transform duration-300 ${showAcademic ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                        </svg>
                        <span>{lang === 'fa' ? 'تحلیل آکادمیک ردیف دستگاهی' : 'Academic Row-Dastgah Analysis'}</span>
                      </span>
                      <span className="text-[10px] bg-brand-dark/5 dark:bg-white/5 px-2.5 py-0.5 rounded-full text-brand-dark/50 dark:text-gray-400">
                        {showAcademic ? (lang === 'fa' ? 'بستن' : 'Close') : (lang === 'fa' ? 'مشاهده' : 'View')}
                      </span>
                    </button>
                  )}

                  {/* Academic Analysis */}
                  {academicData && showAcademic && (
                    <div className="mt-4 pt-4 border-t border-brand-dark/5 dark:border-white/5 space-y-4">
                      <div className="flex items-center justify-between px-2">
                        <span className="text-[10px] font-black text-brand-dark/30 dark:text-gray-600 uppercase tracking-[0.2em] flex items-center gap-2">
                          <svg className="w-3.5 h-3.5 text-brand-lime dark:text-lime-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          {lang === 'fa' ? 'تحلیل آکادمیک (هنرستان موسیقی)' : 'ACADEMIC ANALYSIS'}
                        </span>
                      </div>

                      {/* Key Notes Cards */}
                      <div className="grid grid-cols-3 gap-2 px-1">
                        {/* Shahed */}
                        <div className="bg-brand-dark/[0.02] dark:bg-white/[0.02] border border-brand-dark/5 dark:border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center text-center">
                          <span className="text-[9px] font-black text-brand-dark/40 dark:text-gray-500 uppercase tracking-wider mb-1">
                            {t.shahedLabel}
                          </span>
                          <span className="text-xs font-black text-brand-dark dark:text-white">
                            {resultNotes[academicData.shahedDegree - 1] ? translateNote(resultNotes[academicData.shahedDegree - 1]) : '—'}
                          </span>
                        </div>

                        {/* Ist */}
                        <div className="bg-brand-dark/[0.02] dark:bg-white/[0.02] border border-brand-dark/5 dark:border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center text-center">
                          <span className="text-[9px] font-black text-brand-dark/40 dark:text-gray-500 uppercase tracking-wider mb-1">
                            {t.istLabel}
                          </span>
                          <span className="text-xs font-black text-brand-dark dark:text-white">
                            {resultNotes[academicData.istDegree - 1] ? translateNote(resultNotes[academicData.istDegree - 1]) : '—'}
                          </span>
                        </div>

                        {/* Variable */}
                        <div className="bg-brand-dark/[0.02] dark:bg-white/[0.02] border border-brand-dark/5 dark:border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center text-center">
                          <span className="text-[9px] font-black text-brand-dark/40 dark:text-gray-500 uppercase tracking-wider mb-1">
                            {t.motaghayyerLabel}
                          </span>
                          <span className="text-xs font-black text-brand-dark dark:text-white">
                            {academicData.motaghayyerDegree && resultNotes[academicData.motaghayyerDegree - 1]
                              ? translateNote(resultNotes[academicData.motaghayyerDegree - 1])
                              : t.noMotaghayyer}
                          </span>
                        </div>
                      </div>

                      {/* Tetrachords */}
                      {dangsData && (
                        <div className="bg-brand-dark/[0.02] dark:bg-white/[0.02] border border-brand-dark/5 dark:border-white/5 rounded-3xl p-4 space-y-3.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-brand-dark/40 dark:text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                              <svg className="w-3.5 h-3.5 text-brand-lime dark:text-lime-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16m-7 6h7" />
                              </svg>
                              {t.tetrachordLabel}
                            </span>
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-brand-lime/20 text-brand-dark dark:bg-lime-500/10 dark:text-lime-300">
                              {dangsData.type}
                            </span>
                          </div>

                          <div className="space-y-2.5">
                            <div className="flex flex-col gap-0.5 bg-white/40 dark:bg-black/10 rounded-xl p-2.5 px-3">
                              <span className="text-[9px] font-black text-brand-dark/30 dark:text-gray-500 uppercase">
                                {t.firstTetrachord}
                              </span>
                              <span className="text-xs font-bold text-brand-dark dark:text-white font-mono tracking-wide" dir="ltr">
                                {dangsData.first}
                              </span>
                            </div>

                            <div className="flex flex-col gap-0.5 bg-white/40 dark:bg-black/10 rounded-xl p-2.5 px-3">
                              <span className="text-[9px] font-black text-brand-dark/30 dark:text-gray-500 uppercase">
                                {t.secondTetrachord}
                              </span>
                              <span className="text-xs font-bold text-brand-dark dark:text-white font-mono tracking-wide" dir="ltr">
                                {dangsData.second}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Important Goushehs */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-black text-brand-dark/40 dark:text-gray-500 uppercase tracking-wider flex items-center gap-1.5 px-1">
                          <svg className="w-3.5 h-3.5 text-brand-lime dark:text-lime-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
                          </svg>
                          {t.goushehsLabel}
                        </span>
                        <div className="flex flex-wrap gap-1.5 px-1">
                          {(lang === 'fa' ? academicData.goushehs_fa : academicData.goushehs_en).map((gousheh, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-bold px-2.5 py-1 rounded-xl bg-brand-dark/[0.03] dark:bg-white/[0.03] border border-brand-dark/5 dark:border-white/5 text-brand-dark/70 dark:text-gray-300 hover:bg-brand-lime/[0.08] hover:border-brand-lime/20 dark:hover:bg-lime-500/10 dark:hover:border-lime-500/20 transition-all cursor-default"
                            >
                              {gousheh}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </section>
              </div>

              {/* Support Button */}
              <div className="pt-3 pb-3">
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
          
          {view === 'favorites' && (
            <motion.div
              key="favorites"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex-grow flex flex-col gap-4"
            >
              {favorites.length === 0 ? (
                <div className="flex-grow flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[3rem] min-h-[350px]">
                  <div className="w-20 h-20 bg-amber-500/10 dark:bg-amber-500/5 rounded-full flex items-center justify-center text-amber-500 animate-pulse mb-4">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499c.172-.34.693-.34.865 0l2.457 4.981 5.495.8a.498.498 0 01.277.85l-3.978 3.876 1.002 5.474a.498.498 0 01-.723.526l-4.912-2.583-4.912 2.583a.498.498 0 01-.723-.526l1.002-5.474L2.08 10.13a.498.498 0 01.277-.85l5.495-.8 2.457-4.981z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-black text-brand-dark dark:text-white mb-2">
                    {t.emptyFavorites}
                  </h3>
                  <p className="text-xs font-bold text-brand-dark/40 dark:text-gray-500 max-w-[260px] leading-relaxed">
                    {t.emptyFavoritesDesc}
                  </p>
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setView('home')}
                    className="mt-6 px-6 py-2.5 bg-brand-dark dark:bg-white text-white dark:text-brand-dark rounded-full font-black text-xs shadow-md hover:shadow-lg transition-all"
                  >
                    {lang === 'fa' ? 'شروع محاسبه گام‌ها' : 'Start Calculating Scales'}
                  </motion.button>
                </div>
              ) : (
                <div className="flex-grow flex flex-col gap-4">
                  {/* Modern Header Toolbar */}
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
                                className="text-[10px] font-black text-white bg-red-500 hover:bg-red-600 px-2 py-0.5 rounded-lg transition-colors"
                              >
                                {lang === 'fa' ? 'بله' : 'Yes'}
                              </button>
                              <button
                                onClick={() => setShowConfirmClear(false)}
                                className="text-[10px] font-bold text-brand-dark/50 dark:text-gray-400 hover:text-brand-dark dark:hover:text-white px-1.5"
                              >
                                {lang === 'fa' ? 'خیر' : 'No'}
                              </button>
                            </div>
                          ) : (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setShowConfirmClear(true)}
                              className="text-[10px] font-black text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1.5 py-1 px-2.5 rounded-full bg-red-500/5 hover:bg-red-500/10 transition-colors"
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
                          className={`absolute top-2.5 ${lang === 'fa' ? 'left-3' : 'right-3'} text-brand-dark/40 dark:text-gray-400 hover:text-brand-dark dark:hover:text-white`}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>

                    {/* Horizontal Sliding Filter Pills */}
                    {Array.from(new Set(favorites.map(f => f.scaleType))).length > 1 && (
                      <div className="flex gap-1 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1 px-1" dir={lang === 'fa' ? 'rtl' : 'ltr'}>
                        <button
                          onClick={() => setFavFilter(null)}
                          className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wider transition-all whitespace-nowrap shrink-0 border ${
                            favFilter === null
                              ? 'bg-brand-dark text-white border-brand-dark dark:bg-white dark:text-brand-dark dark:border-white shadow-sm'
                              : 'bg-white/60 dark:bg-gray-900/60 text-brand-dark/60 dark:text-gray-400 border-brand-dark/5 dark:border-white/5 hover:bg-white dark:hover:bg-gray-900'
                          }`}
                        >
                          {lang === 'fa' ? 'همه گام‌ها' : 'All Scales'}
                        </button>
                        {(Array.from(new Set(favorites.map(f => f.scaleType))) as string[]).map((type) => {
                          const style = getScaleCardStyle(type);
                          const isSelected = favFilter === type;
                          return (
                            <button
                              key={type}
                              onClick={() => setFavFilter(type)}
                              className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wider transition-all whitespace-nowrap shrink-0 border ${
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

                  {/* Masonry Grid */}
                  {favorites.filter(fav => {
                    if (favFilter && fav.scaleType !== favFilter) return false;
                    if (favSearch.trim()) {
                      const term = favSearch.toLowerCase().trim();
                      const label = getFavoriteLabel(fav).toLowerCase();
                      const scaleName = (t.scales[fav.scaleType as keyof typeof t.scales] || fav.scaleType).toLowerCase();
                      const rootName = (t.notes[fav.root as keyof typeof t.notes] || fav.root).toLowerCase();
                      return label.includes(term) || scaleName.includes(term) || rootName.includes(term);
                    }
                    return true;
                  }).length === 0 ? (
                    <div className="flex-grow flex flex-col items-center justify-center text-center p-8 bg-white/50 dark:bg-gray-900/30 border border-brand-dark/5 dark:border-white/5 rounded-[2rem] min-h-[180px]">
                      <span className="text-xl mb-1">🔍</span>
                      <p className="text-xs font-bold text-brand-dark/40 dark:text-gray-500">
                        {lang === 'fa' ? 'هیچ گامی با این مشخصات یافت نشد.' : 'No matching scales found.'}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3.5 items-start" dir="rtl">
                      {/* Right column (even indices of filtered list) */}
                      <div className="flex flex-col gap-3.5">
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
                          .filter((_, idx) => idx % 2 === 0)
                          .map((fav, itemIdx) => {
                            const favTypeEnum = scaleOptions.find(o => o.value === fav.scaleType)?.type || ScaleType.SHUR;
                            const favNotes = getScaleNotes(fav.root, fav.accidental, favTypeEnum);
                            const keySigNotes = favNotes
                              .filter(note => note.includes(' ') || note.includes('دیز') || note.includes('بمل') || note.includes('سری') || note.includes('کرن'))
                              .map(translateNote);
                            const keySigStr = keySigNotes.length > 0 ? keySigNotes.join('، ') : (lang === 'fa' ? 'بدون علامت' : 'No accidentals');
                            const label = getFavoriteLabel(fav);
                            const style = getScaleCardStyle(fav.scaleType);

                            const rawIntervals = favTypeEnum === ScaleType.SHUR ? SHUR_INTERVALS :
                                                favTypeEnum === ScaleType.MAHUR ? MAHUR_INTERVALS :
                                                favTypeEnum === ScaleType.HOMAYOUN ? HOMAYOUN_INTERVALS :
                                                favTypeEnum === ScaleType.SEGAH ? SEGAH_INTERVALS :
                                                favTypeEnum === ScaleType.CHAHARGAH ? CHAHARGAH_INTERVALS :
                                                favTypeEnum === ScaleType.NAVA ? NAVA_INTERVALS :
                                                favTypeEnum === ScaleType.RAST_PANJGAH ? RAST_PANJGAH_INTERVALS :
                                                favTypeEnum === ScaleType.ABOUATA ? ABOUATA_INTERVALS :
                                                favTypeEnum === ScaleType.BAYAT_TORK ? BAYAT_TORK_INTERVALS :
                                                favTypeEnum === ScaleType.AFSHARI ? AFSHARI_INTERVALS :
                                                favTypeEnum === ScaleType.DASHTI ? DASHTI_INTERVALS :
                                                favTypeEnum === ScaleType.BAYAT_ESFAHAN ? BAYAT_ESFAHAN_INTERVALS : MAHUR_INTERVALS;

                            return (
                              <motion.div
                                key={fav.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: itemIdx * 0.05 }}
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
                                        className="text-[9px] px-1.5 py-0.5 rounded-md bg-white/60 dark:bg-black/20 border border-brand-dark/5 dark:border-white/5 font-mono font-bold text-brand-dark/60 dark:text-gray-400 hover:bg-brand-lime/20 dark:hover:bg-brand-lime/10 hover:text-brand-dark dark:hover:text-brand-lime hover:border-brand-lime/30 transition-all"
                                        title={lang === 'fa' ? 'پخش نت' : 'Play note'}
                                      >
                                        {translateNote(note)}
                                      </motion.button>
                                    );
                                  })}
                                </div>

                                <div className="flex items-center justify-between gap-1.5 mt-2.5 pt-2 border-t border-brand-dark/5 dark:border-white/5" onClick={(e) => e.stopPropagation()}>
                                  {/* Trash Icon */}
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => {
                                      setFavorites(prev => prev.filter(f => f.id !== fav.id));
                                    }}
                                    className="w-7 h-7 rounded-lg bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 flex items-center justify-center transition-all"
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
                                        const text = `${label}\n${lang === 'fa' ? 'نت‌ها: ' : 'Notes: '}${noteStr}\n${lang === 'fa' ? 'سرکلید: ' : 'Key Sig: '}${keySigStr}`;
                                        navigator.clipboard.writeText(text).then(() => {
                                          setCopiedFavId(fav.id);
                                          setTimeout(() => setCopiedFavId(null), 2000);
                                        });
                                      }}
                                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
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
                                      className="w-7 h-7 rounded-lg bg-brand-lime hover:bg-brand-dark hover:text-white text-brand-dark flex items-center justify-center transition-all shadow-sm"
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

                      {/* Left column (odd indices of filtered list) */}
                      <div className="flex flex-col gap-3.5">
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
                          .filter((_, idx) => idx % 2 !== 0)
                          .map((fav, itemIdx) => {
                            const favTypeEnum = scaleOptions.find(o => o.value === fav.scaleType)?.type || ScaleType.SHUR;
                            const favNotes = getScaleNotes(fav.root, fav.accidental, favTypeEnum);
                            const keySigNotes = favNotes
                              .filter(note => note.includes(' ') || note.includes('دیز') || note.includes('بمل') || note.includes('سری') || note.includes('کرن'))
                              .map(translateNote);
                            const keySigStr = keySigNotes.length > 0 ? keySigNotes.join('، ') : (lang === 'fa' ? 'بدون علامت' : 'No accidentals');
                            const label = getFavoriteLabel(fav);
                            const style = getScaleCardStyle(fav.scaleType);

                            const rawIntervals = favTypeEnum === ScaleType.SHUR ? SHUR_INTERVALS :
                                                favTypeEnum === ScaleType.MAHUR ? MAHUR_INTERVALS :
                                                favTypeEnum === ScaleType.HOMAYOUN ? HOMAYOUN_INTERVALS :
                                                favTypeEnum === ScaleType.SEGAH ? SEGAH_INTERVALS :
                                                favTypeEnum === ScaleType.CHAHARGAH ? CHAHARGAH_INTERVALS :
                                                favTypeEnum === ScaleType.NAVA ? NAVA_INTERVALS :
                                                favTypeEnum === ScaleType.RAST_PANJGAH ? RAST_PANJGAH_INTERVALS :
                                                favTypeEnum === ScaleType.ABOUATA ? ABOUATA_INTERVALS :
                                                favTypeEnum === ScaleType.BAYAT_TORK ? BAYAT_TORK_INTERVALS :
                                                favTypeEnum === ScaleType.AFSHARI ? AFSHARI_INTERVALS :
                                                favTypeEnum === ScaleType.DASHTI ? DASHTI_INTERVALS :
                                                favTypeEnum === ScaleType.BAYAT_ESFAHAN ? BAYAT_ESFAHAN_INTERVALS : MAHUR_INTERVALS;

                            return (
                              <motion.div
                                key={fav.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: itemIdx * 0.05 + 0.02 }}
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
                                        className="text-[9px] px-1.5 py-0.5 rounded-md bg-white/60 dark:bg-black/20 border border-brand-dark/5 dark:border-white/5 font-mono font-bold text-brand-dark/60 dark:text-gray-400 hover:bg-brand-lime/20 dark:hover:bg-brand-lime/10 hover:text-brand-dark dark:hover:text-brand-lime hover:border-brand-lime/30 transition-all"
                                        title={lang === 'fa' ? 'پخش نت' : 'Play note'}
                                      >
                                        {translateNote(note)}
                                      </motion.button>
                                    );
                                  })}
                                </div>

                                <div className="flex items-center justify-between gap-1.5 mt-2.5 pt-2 border-t border-brand-dark/5 dark:border-white/5" onClick={(e) => e.stopPropagation()}>
                                  {/* Trash Icon */}
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => {
                                      setFavorites(prev => prev.filter(f => f.id !== fav.id));
                                    }}
                                    className="w-7 h-7 rounded-lg bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 flex items-center justify-center transition-all"
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
                                        const text = `${label}\n${lang === 'fa' ? 'نت‌ها: ' : 'Notes: '}${noteStr}\n${lang === 'fa' ? 'سرکلید: ' : 'Key Sig: '}${keySigStr}`;
                                        navigator.clipboard.writeText(text).then(() => {
                                          setCopiedFavId(fav.id);
                                          setTimeout(() => setCopiedFavId(null), 2000);
                                        });
                                      }}
                                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
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
                                      className="w-7 h-7 rounded-lg bg-brand-lime hover:bg-brand-dark hover:text-white text-brand-dark flex items-center justify-center transition-all shadow-sm"
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
                </div>
              )}
            </motion.div>
          )}

          {view === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-[2.5rem] shadow-xl space-y-6 border border-gray-100 dark:border-gray-800 flex flex-col"
            >
               <h2 className="text-2xl font-black text-center text-brand-dark dark:text-white shrink-0">{t.aboutTitle}</h2>
               <div className="space-y-4 text-brand-dark/80 dark:text-gray-300 leading-relaxed font-medium text-sm text-justify">
                 {t.aboutDesc.split('\n').map((paragraph, idx) => {
                   if (paragraph.includes('@arefashemi')) {
                     const parts = paragraph.split('@arefashemi');
                     return (
                       <p key={idx} className="whitespace-pre-line">
                         {parts[0]}
                         <a
                           href="https://t.me/arefashemi"
                           target="_blank"
                           rel="noopener noreferrer"
                           className="text-blue-500 dark:text-blue-400 hover:underline font-black inline-flex items-center gap-0.5"
                         >
                           @arefashemi
                         </a>
                         {parts[1]}
                       </p>
                     );
                   }
                   return <p key={idx} className="whitespace-pre-line">{paragraph}</p>;
                 })}
               </div>
               
               <div className="flex justify-center gap-6 pt-2 pb-2 shrink-0">
                 <motion.a 
                   href="https://t.me/arefashemi" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   whileHover={{ scale: 1.15 }}
                   whileTap={{ scale: 0.95 }}
                   className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors cursor-pointer shadow-sm hover:shadow"
                   title="Telegram"
                 >
                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.686c.223-.195-.054-.285-.346-.09l-6.4 4.024-2.76-.86c-.6-.185-.61-.6.125-.89l10.736-4.136c.498-.185.938.11.725.993z"/></svg>
                 </motion.a>
                 <motion.a 
                   href="https://instagram.com/arefashemi" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   whileHover={{ scale: 1.15 }}
                   whileTap={{ scale: 0.95 }}
                   className="w-10 h-10 rounded-full bg-pink-50 dark:bg-pink-900/20 flex items-center justify-center text-pink-500 hover:bg-pink-100 dark:hover:bg-pink-900/40 transition-colors cursor-pointer shadow-sm hover:shadow"
                   title="Instagram"
                 >
                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                 </motion.a>
                 <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-500 opacity-60">
                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                 </div>
               </div>

               <motion.button whileTap={{ scale: 0.95 }} onClick={() => setView('home')} className="w-full py-4 bg-brand-dark dark:bg-white dark:text-brand-dark text-white rounded-[2rem] font-black text-lg transition-all shadow-lg shrink-0">{t.backBtn}</motion.button>
            </motion.div>
          )}

          {view === 'vaziri' && (
            <motion.div
              key="vaziri"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-[2.5rem] shadow-xl space-y-6 border border-gray-100 dark:border-gray-800 flex flex-col relative"
            >
               <h2 className="text-2xl font-black text-center text-brand-dark dark:text-white shrink-0">{t.vaziriTitle}</h2>
               <div>
                  <p className="text-center text-brand-dark/70 dark:text-gray-400 leading-relaxed font-medium whitespace-pre-line text-sm bg-brand-gray/50 dark:bg-gray-800/50 p-6 rounded-[2rem] border border-brand-dark/5 dark:border-white/5 shadow-inner">
                    {t.vaziriDesc}
                  </p>
               </div>
               
               <motion.button whileTap={{ scale: 0.95 }} onClick={() => setView('home')} className="w-full py-4 bg-brand-dark dark:bg-white dark:text-brand-dark text-white rounded-[2rem] font-black text-base transition-all shadow-lg shrink-0">
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
              className="bg-white dark:bg-gray-950 p-6 sm:p-8 rounded-[2.5rem] shadow-xl space-y-6 relative border border-gray-100 dark:border-gray-800 flex flex-col items-center"
            >
               <div className="absolute top-0 left-0 w-full h-2 bg-brand-lime"></div>
               
               <div className="text-center space-y-2">
                 <div className="w-16 h-16 bg-brand-lime/10 dark:bg-lime-500/10 rounded-2xl flex items-center justify-center mx-auto mb-2">
                   <span className="text-3xl">💝</span>
                 </div>
                 <h2 className="text-2xl font-black text-brand-dark dark:text-white">{t.supportTitle}</h2>
                 <p className="text-xs font-medium text-brand-dark/60 dark:text-gray-400 max-w-[240px] mx-auto">
                   {(t as any).supportDesc}
                 </p>
               </div>

               <div className="w-full space-y-3">
                  {[
                   { id: 1, title: (t as any).supportTier1, desc: (t as any).supportTier1Desc, color: 'bg-orange-50 dark:bg-orange-900/10', textColor: 'text-orange-600 dark:text-orange-400' },
                   { id: 2, title: (t as any).supportTier2, desc: (t as any).supportTier2Desc, color: 'bg-blue-50 dark:bg-blue-900/10', textColor: 'text-blue-600 dark:text-blue-400' },
                   { id: 3, title: (t as any).supportTier3, desc: (t as any).supportTier3Desc, color: 'bg-brand-lime/10 dark:bg-lime-500/10', textColor: 'text-brand-dark dark:text-lime-400' },
                 ].map((tier) => (
                   <motion.button
                     key={tier.id}
                     whileHover={{ y: -2 }}
                     whileTap={{ scale: 0.98 }}
                     className={`w-full p-3 rounded-[2rem] ${tier.color} flex items-center justify-between group transition-all border border-transparent hover:border-current/10`}
                   >
                     <div className="text-right">
                       <h4 className={`font-black text-xs sm:text-sm ${tier.textColor}`}>{tier.title}</h4>
                       <p className="text-[9px] font-bold opacity-50 dark:text-gray-400">{tier.desc}</p>
                     </div>
                     <div className={`w-7 h-7 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all`}>
                       <svg className={`w-3.5 h-3.5 ${tier.textColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d={lang === 'fa' ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
                       </svg>
                     </div>
                   </motion.button>
                 ))}
               </div>
               
               <button 
                 onClick={() => setView('home')} 
                 className="w-full py-4 bg-brand-dark dark:bg-white text-white dark:text-brand-dark rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl transition-all active:scale-95"
               >
                 {t.backBtn}
               </button>
            </motion.div>
          )}

          {view === 'changelog' && (
            <motion.div
              key="changelog"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-950 p-6 sm:p-8 rounded-[2.5rem] shadow-xl space-y-6 relative border border-gray-100 dark:border-gray-800 flex flex-col"
            >
               <div className="absolute top-0 left-0 w-full h-2 bg-brand-lime"></div>
               
               <div className="text-center space-y-2">
                 <div className="w-16 h-16 bg-brand-lime/10 dark:bg-lime-500/10 rounded-2xl flex items-center justify-center mx-auto mb-2 text-brand-dark dark:text-brand-lime">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3 3L22 4" />
                    </svg>
                 </div>
                 <h2 className="text-2xl font-black text-brand-dark dark:text-white">{(t as any).changelogTitle}</h2>
               </div>

               {/* Live version checker panel */}
               <div className="bg-brand-gray/50 dark:bg-gray-900/60 p-4 rounded-[2rem] border border-brand-dark/5 dark:border-white/5 space-y-3.5 text-brand-dark dark:text-white">
                  <div className="flex justify-between items-center text-xs">
                     <span className="font-bold text-brand-dark/50 dark:text-gray-400">{(t as any).currentVersionLabel}</span>
                     <span className="font-mono font-black text-brand-dark dark:text-white bg-white dark:bg-gray-800 px-2.5 py-1 rounded-full border border-brand-dark/5 dark:border-white/10">{appVersion}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                     <span className="font-bold text-brand-dark/50 dark:text-gray-400">{(t as any).latestVersionLabel}</span>
                     <span className="font-mono font-black text-brand-lime dark:text-lime-400 bg-brand-dark dark:bg-black px-2.5 py-1 rounded-full">2.1.0</span>
                  </div>

                  <div className="pt-2 border-t border-brand-dark/5 dark:border-white/5 flex flex-col gap-2">
                    {updateStatus === 'idle' && (
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCheckUpdates}
                        className="w-full py-2.5 rounded-xl bg-brand-dark dark:bg-white text-white dark:text-brand-dark text-xs font-black shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <svg className="w-3.5 h-3.5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3 3L22 4" />
                        </svg>
                        <span>{(t as any).checkUpdatesBtn}</span>
                      </motion.button>
                    )}

                    {updateStatus === 'checking' && (
                      <div className="w-full py-2.5 rounded-xl bg-brand-dark/5 dark:bg-white/5 text-brand-dark/60 dark:text-gray-400 text-xs font-black flex items-center justify-center gap-2">
                        <svg className="animate-spin h-3.5 w-3.5 text-brand-dark dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>{(t as any).checkingUpdates}</span>
                      </div>
                    )}

                    {updateStatus === 'up-to-date' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-2.5 rounded-xl bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-black text-center"
                      >
                        {(t as any).upToDateMsg}
                      </motion.div>
                    )}

                    {updateStatus === 'update-available' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2"
                      >
                        <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-black text-center">
                          {(t as any).updateAvailableMsg} (v2.1.0)
                        </div>
                        <motion.button
                          whileTap={{ scale: 0.98 }}
                          onClick={handleApplyUpdate}
                          className="w-full py-2.5 rounded-xl bg-brand-lime text-brand-dark text-xs font-black shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          <span>{(t as any).applyUpdateBtn}</span>
                        </motion.button>
                      </motion.div>
                    )}

                    {updateStatus === 'updating' && (
                      <div className="space-y-2">
                        <div className="text-center text-[10px] font-black text-brand-dark/50 dark:text-gray-400 animate-pulse">
                          {(t as any).updatingMsg}
                        </div>
                        <div className="w-full h-1.5 bg-brand-dark/10 dark:bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 2 }}
                            className="h-full bg-brand-lime"
                          />
                        </div>
                      </div>
                    )}

                    {updateStatus === 'success' && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-3 rounded-xl bg-emerald-500 text-white text-xs font-black text-center shadow-lg"
                      >
                        {(t as any).updateSuccessMsg}
                      </motion.div>
                    )}
                  </div>
               </div>

                {/* Scrollable Changelog List */}
                <div className="flex-grow overflow-y-auto max-h-[250px] space-y-4 pr-1" style={{ scrollbarWidth: 'thin' }}>
                   {[
                     {
                       version: '2.1.0',
                       date: lang === 'fa' ? 'تیر ۱۴۰۵' : 'July 2026',
                       notes: lang === 'fa' ? [
                         'رفع ابهام دکمه تغییر نام‌گذاری نت‌ها در هدر با افزودن نماد نت (♩)',
                         'اضافه شدن سیستم تعاملی و هوشمند بررسی و نصب بروزرسانی‌ها با انیمیشن پیشرفت',
                         'بهبود پایداری کلی رابط کاربری در تبلت‌ها و دستگاه‌های مختلف'
                       ] : [
                         'Resolved naming toggle ambiguity in the header by adding a note icon (♩).',
                         'Added interactive and smart update checking and installation system with progress bar.',
                         'Improved overall UI stability across tablets and different screen sizes.'
                       ]
                     },
                     {
                       version: '2.0.0',
                       date: lang === 'fa' ? 'خرداد ۱۴۰۵' : 'June 2026',
                       notes: lang === 'fa' ? [
                         'تغییر اساسی: بازطراحی کامل رابط کاربری با تم لایم و دارک‌مود شیشه‌ای مدرن',
                         'تغییر اساسی: بازنویسی موتور صوتی با فرکانس‌های دقیق ربع‌پرده‌ای موسیقی ایرانی (Web Audio API)',
                         'تغییر اساسی: دوزبانه شدن کامل و هوشمند برنامه (پشتیبانی کامل از فارسی و انگلیسی)'
                       ] : [
                         'Major: Complete UI redesign with Lime glassmorphism theme and advanced dark mode.',
                         'Major: Rewrote audio engine for precise microtonal frequencies of Persian classical music.',
                         'Major: Full bilingual support with instant translation switch (Persian & English).'
                       ]
                     },
                     {
                       version: '1.5.0',
                       date: lang === 'fa' ? 'اردیبهشت ۱۴۰۵' : 'May 2026',
                       notes: lang === 'fa' ? [
                         'افزودن کیبورد پیانو هوشمند ۲۴ کلیده با علامت‌های عرضی ایرانی (کرن و سری)',
                         'امکان نواختن مستقیم نت‌ها با استفاده از کیبورد فیزیکی سیستم شما',
                         'بهبود سرعت پاسخ‌دهی صوتی و به حداقل رساندن لیتنسی صدا'
                       ] : [
                         'Added smart 24-key piano keyboard with Persian microtonal symbols (Koron & Sori).',
                         'Ability to play notes directly using the physical keyboard keys of your device.',
                         'Improved audio latency and response speed in mobile browsers.'
                       ]
                     },
                     {
                       version: '1.4.2',
                       date: lang === 'fa' ? 'فروردین ۱۴۰۵' : 'April 2026',
                       notes: lang === 'fa' ? [
                         'بروزرسانی مکانیزم ذخیره‌سازی محلی علاقمندی‌ها در مرورگرهای موبایل',
                         'حل مشکل لرزش فرکانسی صوتی در استفاده طولانی‌مدت از پیانو'
                       ] : [
                         'Updated local storage persistence mechanisms for mobile safari browsers.',
                         'Fixed frequency vibration bugs during prolonged piano synthesizer sessions.'
                       ]
                     },
                     {
                       version: '1.4.0',
                       date: lang === 'fa' ? 'اسفند ۱۴۰۴' : 'March 2026',
                       notes: lang === 'fa' ? [
                         'اضافه شدن بخش اختصاصی کلنل علینقی وزیری و تئوری موسیقی ۲۴ قسمتی او',
                         'اضافه شدن بخش حمایت مالی (دکمه دونیت) به منظور پشتیبانی از توسعه مستمر پروژه',
                         'طراحی بخش راهنماهای متنی برای مفاهیم فواصل موسیقی اصیل ایرانی'
                       ] : [
                         'Added dedicated section for Col. Alinaqi Vaziri and his 24-quarter-tone music theory.',
                         'Added financial support (Donate button) to ensure long-term development of the project.',
                         'Designed informative textual guide sections for Persian classical music scale concepts.'
                       ]
                     },
                     {
                       version: '1.3.0',
                       date: lang === 'fa' ? 'بهمن ۱۴۰۴' : 'February 2026',
                       notes: lang === 'fa' ? [
                         'معرفی سیستم نمایش و آنالیز آکادمیک ردیف (نت شاهد، ایست، متغیر و فرود)',
                         'پشتیبانی از نمایش همزمان نت‌ها در دو سیستم سلفژ و حروف انگلیسی (A, B, C)'
                       ] : [
                         'Introduced academic analysis indicators (Shahed, Ist, Variable, and Foroud notes).',
                         'Support for dual note systems: Solfege and English letters (A, B, C).'
                       ]
                     },
                     {
                       version: '1.2.0',
                       date: lang === 'fa' ? 'دی ۱۴۰۴' : 'January 2026',
                       notes: lang === 'fa' ? [
                         'اضافه شدن قابلیت نشان کردن و ذخیره گام‌های مورد علاقه (نشان‌شده‌ها)',
                         'طراحی انیمیشن‌های نرم ورود و تغییر صفحات با استفاده از Framer Motion'
                       ] : [
                         'Added the ability to bookmark and save favorite scales (Favorites).',
                         'Designed smooth page-entrance transition animations using Framer Motion.'
                       ]
                     },
                     {
                       version: '1.1.0',
                       date: lang === 'fa' ? 'آذر ۱۴۰۴' : 'December 2025',
                       notes: lang === 'fa' ? [
                         'اضافه شدن قابلیت تغییر کوک مبنا (تیونر دستی) از ۴۳۲ هرتز تا ۴۴۴ هرتز',
                         'پیاده‌سازی الگوریتم محاسبه خودکار فواصل درجات آوازهای شور (ابوعطا، دشتی، افشاری و بیات ترک)'
                       ] : [
                         'Added baseline tuning calibration range (Manual Tuner) from 432Hz to 444Hz.',
                         'Implemented automatic interval calculations for Avazes of Shur (Abouata, Dashti, Afshari, Bayat-e Turk).'
                       ]
                     },
                     {
                       version: '1.0.0',
                       date: lang === 'fa' ? 'آبان ۱۴۰۴' : 'November 2025',
                       notes: lang === 'fa' ? [
                         'تغییر اساسی: انتشار نسخه اولیه اپلیکیشن با پشتیبانی از دستگاه‌های اصلی موسیقی ایران',
                         'تبدیل هوشمند درجات گام به نت‌های متناظر همراه با ربع‌پرده‌ها'
                       ] : [
                         'Major: Initial release of the application supporting main Dastgahs of Persian classical music.',
                         'Smart conversion of scale degrees to equivalent notes including quarter-tones.'
                       ]
                     }
                   ].map((v) => (
                     <div key={v.version} className={`border-b border-brand-dark/5 dark:border-white/5 pb-3.5 last:border-none last:pb-0 ${v.version === appVersion ? 'bg-brand-lime/5 dark:bg-lime-500/5 -mx-3 p-3 rounded-2xl' : ''}`}>
                       <div className="flex justify-between items-center mb-1.5">
                         <div className="flex items-center gap-1.5">
                           <span className="font-mono font-black text-sm text-brand-dark dark:text-white">v{v.version}</span>
                           {v.version === appVersion && (
                             <span className="text-[8px] font-black bg-brand-lime text-brand-dark px-1.5 py-0.5 rounded-full uppercase">{(t as any).currentVersionLabel || 'YOU'}</span>
                           )}
                         </div>
                         <span className="text-[10px] font-bold text-brand-dark/40 dark:text-gray-500">{v.date}</span>
                       </div>
                       <ul className="space-y-1 text-right text-[11px] leading-relaxed text-brand-dark/75 dark:text-gray-300 font-medium" dir={lang === 'fa' ? 'rtl' : 'ltr'}>
                         {v.notes.map((note, noteIdx) => (
                           <li key={noteIdx} className="flex items-start gap-1.5">
                             <span className="text-brand-lime dark:text-lime-500 font-bold mt-0.5">•</span>
                             <span>{note}</span>
                           </li>
                         ))}
                       </ul>
                     </div>
                   ))}
                </div>
               
               <button 
                 onClick={() => { setView('home'); setUpdateStatus('idle'); }} 
                 className="w-full py-4 bg-brand-dark dark:bg-white text-white dark:text-brand-dark rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl transition-all active:scale-95 shrink-0"
               >
                 {t.backBtn}
               </button>
            </motion.div>
          )}
        </AnimatePresence>

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
                  {(t as any).scaleDescriptions[selectedScaleType as keyof typeof t.scales] || ''}
                </p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowScaleInfo(false)}
                  className="w-full mt-8 py-4 rounded-2xl bg-brand-dark dark:bg-white text-white dark:text-brand-dark text-sm font-black tracking-widest uppercase shadow-xl"
                >
                  {t.backBtn}
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

       <footer className="text-center py-4 mt-auto">
          <AnimatePresence>
            {(view === 'home' || view === 'favorites') && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center gap-6 mb-2"
              >
                <button onClick={() => setView('about')} className="text-[10px] font-black text-brand-dark/40 dark:text-gray-600 hover:text-brand-dark dark:hover:text-white transition-colors uppercase tracking-widest">{t.aboutLink}</button>
                <span className="text-brand-dark/10 dark:text-gray-800">|</span>
                <button onClick={() => setView('vaziri')} className="text-[10px] font-black text-brand-dark/40 dark:text-gray-600 hover:text-brand-dark dark:hover:text-white transition-colors uppercase tracking-widest">{t.vaziriLink}</button>
                <span className="text-brand-dark/10 dark:text-gray-800">|</span>
                <button onClick={() => setView('changelog')} className="text-[10px] font-black text-brand-dark/40 dark:text-gray-600 hover:text-brand-dark dark:hover:text-white transition-colors uppercase tracking-widest flex items-center gap-1.5 cursor-pointer">
                  <span>{(t as any).changelogLink}</span>
                  {appVersion !== '2.1.0' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-lime dark:bg-lime-500 animate-pulse"></span>
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="w-16 h-1 bg-gray-200 dark:bg-gray-800 rounded-full mx-auto mb-2"></div>
          <p className="text-[9px] font-black text-brand-dark/20 dark:text-gray-700 uppercase tracking-[0.2em]">{t.footer}</p>
       </footer>
      </div>
    </>
  );
};

export default App;