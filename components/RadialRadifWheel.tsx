import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { QUARTER_TONE_SCALE, NOTE_BASE_INDICES, ACCIDENTAL_OFFSETS, DASTGAH_INTERVALS_MAP, MAHUR_INTERVALS, ALPHABET_NOTES, TRANSLATIONS } from '../constants';

interface RadialRadifWheelProps {
  selectedRoot: string;
  selectedAccidental: string;
  selectedScaleType: string;
  resultNotes: string[];
  lang: 'fa' | 'en';
  notation: 'solfege' | 'alphabet';
  playingIndex: number | null;
  onPlayNote: (root: string, accidental: string, offsetValue: number) => void;
  onPlayDegreeByIndex: (index: number) => void;
}

export const RadialRadifWheel: React.FC<RadialRadifWheelProps> = ({
  selectedRoot,
  selectedAccidental,
  selectedScaleType,
  resultNotes,
  lang,
  notation,
  playingIndex,
  onPlayNote,
  onPlayDegreeByIndex
}) => {
  const t = TRANSLATIONS[lang];

  // Calculate root index
  const rootIndex = useMemo(() => {
    let idx = NOTE_BASE_INDICES[selectedRoot] ?? 0;
    if (ACCIDENTAL_OFFSETS[selectedAccidental] !== undefined) {
      idx += ACCIDENTAL_OFFSETS[selectedAccidental];
    }
    return (idx % 24 + 24) % 24;
  }, [selectedRoot, selectedAccidental]);

  const rawIntervals = useMemo(() => {
    return DASTGAH_INTERVALS_MAP[selectedScaleType] || MAHUR_INTERVALS;
  }, [selectedScaleType]);

  // Active steps in the 24-quarter-tone circle
  const activeDegreeSteps = useMemo(() => {
    return rawIntervals.map(interval => (rootIndex + interval) % 24);
  }, [rootIndex, rawIntervals]);

  // Center radius calculations
  const size = 300;
  const center = size / 2;
  const radius = 108;
  const innerRadius = 78;

  const translateNoteItem = (noteStr: string) => {
    if (!noteStr) return '';
    const firstSpaceIndex = noteStr.indexOf(' ');
    const base = firstSpaceIndex === -1 ? noteStr : noteStr.substring(0, firstSpaceIndex);
    const acc = firstSpaceIndex === -1 ? '' : noteStr.substring(firstSpaceIndex + 1);
    const trBase = notation === 'alphabet' ? (ALPHABET_NOTES[base] || base) : (t.notes[base as keyof typeof t.notes] || base);
    const trAcc = acc ? (t.accidentals[acc as keyof typeof t.accidentals] || acc) : '';
    return trAcc ? `${trBase} ${trAcc}` : trBase;
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      <div className="relative w-[300px] h-[300px] flex items-center justify-center">
        {/* Ambient Ring Glow */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-amber-400/10 via-brand-lime/15 to-rose-500/10 dark:from-amber-400/5 dark:via-brand-lime/10 dark:to-rose-500/5 blur-xl pointer-events-none" />

        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
          {/* Outer Track Ring */}
          <circle
            cx={center}
            cy={center}
            r={radius + 18}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-black/10 dark:text-white/10"
          />

          {/* Inner Accent Ring */}
          <circle
            cx={center}
            cy={center}
            r={innerRadius}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            className="text-black/15 dark:text-white/15"
          />

          {/* 24 Radial Tick Marks & Tappable Note Nodes */}
          {QUARTER_TONE_SCALE.map((noteName, step) => {
            const angleDeg = (step * 360) / 24 - 90;
            const angleRad = (angleDeg * Math.PI) / 180;

            const xOuter = center + (radius + 14) * Math.cos(angleRad);
            const yOuter = center + (radius + 14) * Math.sin(angleRad);

            const xInner = center + (radius + 4) * Math.cos(angleRad);
            const yInner = center + (radius + 4) * Math.sin(angleRad);

            const xNode = center + radius * Math.cos(angleRad);
            const yNode = center + radius * Math.sin(angleRad);

            // Is this step one of the 7 scale degrees?
            const degreeIndex = activeDegreeSteps.indexOf(step);
            const isScaleDegree = degreeIndex !== -1;
            const isRootDegree = step === rootIndex;
            const isCurrentPlaying = degreeIndex !== -1 && playingIndex === degreeIndex;

            return (
              <g
                key={step}
                className="cursor-pointer group"
                onClick={() => {
                  if (isScaleDegree) {
                    onPlayDegreeByIndex(degreeIndex);
                  } else {
                    onPlayNote(selectedRoot, selectedAccidental, (step - rootIndex + 24) % 24);
                  }
                }}
              >
                {/* Tick Mark */}
                <line
                  x1={xInner}
                  y1={yInner}
                  x2={xOuter}
                  y2={yOuter}
                  stroke={isScaleDegree ? '#FF603E' : 'currentColor'}
                  strokeWidth={isScaleDegree ? 2.5 : 1}
                  className={isScaleDegree ? 'text-[#FF603E]' : 'text-black/20 dark:text-white/20'}
                />

                {/* Degree Connecting Arc / Pin if active */}
                {isScaleDegree && (
                  <motion.circle
                    initial={false}
                    animate={{
                      scale: isCurrentPlaying ? [1, 1.35, 1] : 1,
                      fill: isCurrentPlaying 
                        ? '#d3f36a' 
                        : isRootDegree 
                          ? '#FF603E' 
                          : '#1B1B1F'
                    }}
                    transition={{ duration: 0.3 }}
                    cx={xNode}
                    cy={yNode}
                    r={isRootDegree ? 9 : 7.5}
                    stroke={isCurrentPlaying ? '#1B1B1F' : '#ffffff'}
                    strokeWidth="2"
                    className="shadow-sm"
                  />
                )}

                {/* Degree Number or Step Indicator */}
                {isScaleDegree && (
                  <text
                    x={xNode}
                    y={yNode + 3}
                    textAnchor="middle"
                    fill={isCurrentPlaying ? '#1B1B1F' : '#ffffff'}
                    fontSize={isRootDegree ? '9' : '8'}
                    fontWeight="900"
                    fontFamily="Vazirmatn, sans-serif"
                    className="pointer-events-none select-none"
                  >
                    {degreeIndex + 1}
                  </text>
                )}
              </g>
            );
          })}

          {/* Pointer Needle to the Current Playing Note or Root Note */}
          {(() => {
            const activeDegree = playingIndex !== null ? playingIndex : 0;
            const activeStep = activeDegreeSteps[activeDegree] ?? rootIndex;
            const needleAngle = (activeStep * 360) / 24 - 90;
            const needleRad = (needleAngle * Math.PI) / 180;
            const needleLen = radius - 16;
            const nx = center + needleLen * Math.cos(needleRad);
            const ny = center + needleLen * Math.sin(needleRad);

            return (
              <g className="transition-all duration-300 pointer-events-none">
                <line
                  x1={center}
                  y1={center}
                  x2={nx}
                  y2={ny}
                  stroke="#FF603E"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx={center} cy={center} r="6" fill="#FF603E" />
                <circle cx={center} cy={center} r="2.5" fill="#ffffff" />
              </g>
            );
          })()}
        </svg>

        {/* Center Digital Readout (Inspired by OPERATIONAL TIMING readout) */}
        <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none w-28">
          <span className="text-[9px] font-black uppercase tracking-wider text-black/40 dark:text-white/40">
            {lang === 'fa' ? 'ردیف ۲۴ ربع‌پرده' : '24-TET RADIF'}
          </span>
          <span className="text-base sm:text-lg font-black text-black dark:text-white tracking-tight leading-tight mt-0.5">
            {resultNotes.length > 0
              ? translateNoteItem(resultNotes[playingIndex !== null ? playingIndex : 0])
              : selectedRoot}
          </span>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded-full bg-brand-lime text-brand-dark shadow-xs">
              {playingIndex !== null 
                ? (lang === 'fa' ? `درجه ${playingIndex + 1}` : `DEG ${playingIndex + 1}`) 
                : (lang === 'fa' ? 'نت پایه' : 'ROOT')}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Info Strip */}
      <div className="w-full flex items-center justify-between px-3 py-2 mt-1 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-[11px] font-bold">
        <span className="text-black/60 dark:text-white/60 flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF603E]" />
          <span>{lang === 'fa' ? 'نت پایه (تونیک)' : 'Root Pitch'}</span>
        </span>
        <span className="text-black/60 dark:text-white/60 flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1B1B1F] dark:bg-white" />
          <span>{lang === 'fa' ? 'درجات گام' : 'Scale Degrees'}</span>
        </span>
        <span className="text-black/60 dark:text-white/60 flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-lime" />
          <span>{lang === 'fa' ? 'در حال پخش' : 'Playing'}</span>
        </span>
      </div>
    </div>
  );
};
