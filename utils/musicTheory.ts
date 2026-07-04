import { 
  QUARTER_TONE_SCALE, 
  MAHUR_INTERVALS, 
  SHUR_INTERVALS, 
  HOMAYOUN_INTERVALS,
  SEGAH_INTERVALS,
  CHAHARGAH_INTERVALS,
  NAVA_INTERVALS,
  RAST_PANJGAH_INTERVALS,
  ABOUATA_INTERVALS,
  BAYAT_TORK_INTERVALS,
  AFSHARI_INTERVALS,
  DASHTI_INTERVALS,
  BAYAT_ESFAHAN_INTERVALS,
  ROOT_OPTIONS, 
  NOTE_BASE_INDICES, 
  ACCIDENTAL_OFFSETS 
} from '../constants';
import { ScaleType } from '../types';

export const getScaleNotes = (rootName: string, rootAccidental: string, type: ScaleType): string[] => {
  // 1. Calculate the starting index in the quarter-tone scale
  let rootIndex = NOTE_BASE_INDICES[rootName] || 0;
  
  // Apply accidental offset
  if (ACCIDENTAL_OFFSETS.hasOwnProperty(rootAccidental)) {
    rootIndex += ACCIDENTAL_OFFSETS[rootAccidental];
  }

  // Normalize index to be within 0-23
  rootIndex = (rootIndex + 24) % 24;

  // 2. Select intervals based on scale type
  let intervals: number[] = [];
  switch (type) {
    case ScaleType.SHUR: intervals = SHUR_INTERVALS; break;
    case ScaleType.MAHUR: intervals = MAHUR_INTERVALS; break;
    case ScaleType.HOMAYOUN: intervals = HOMAYOUN_INTERVALS; break;
    case ScaleType.SEGAH: intervals = SEGAH_INTERVALS; break;
    case ScaleType.CHAHARGAH: intervals = CHAHARGAH_INTERVALS; break;
    case ScaleType.NAVA: intervals = NAVA_INTERVALS; break;
    case ScaleType.RAST_PANJGAH: intervals = RAST_PANJGAH_INTERVALS; break;
    case ScaleType.ABOUATA: intervals = ABOUATA_INTERVALS; break;
    case ScaleType.BAYAT_TORK: intervals = BAYAT_TORK_INTERVALS; break;
    case ScaleType.AFSHARI: intervals = AFSHARI_INTERVALS; break;
    case ScaleType.DASHTI: intervals = DASHTI_INTERVALS; break;
    case ScaleType.BAYAT_ESFAHAN: intervals = BAYAT_ESFAHAN_INTERVALS; break;
    default: intervals = MAHUR_INTERVALS;
  }

  // 3. Generate notes with smart enharmonic spelling
  const notes: string[] = [];
  const rootBaseIndex = ROOT_OPTIONS.indexOf(rootName);

  for (let i = 0; i < intervals.length; i++) {
    const noteIndex = (rootIndex + intervals[i]) % 24;
    
    // We expect the ith note to have the ith base name (Do, Re, Mi...)
    // This enforces diatonic spelling (one letter name per degree)
    const expectedBaseIndex = (rootBaseIndex + i) % 7;
    const expectedBaseName = ROOT_OPTIONS[expectedBaseIndex];
    
    // Find the standard index for this base name (e.g. Do=0, Re=4)
    const baseNoteStandardIndex = NOTE_BASE_INDICES[expectedBaseName];
    
    // Calculate the difference in quarter tones
    let diff = (noteIndex - baseNoteStandardIndex + 24) % 24;
    // Normalize diff to be within -12 to +12 (shortest path)
    if (diff > 12) diff -= 24;

    let noteString = '';
    
    switch (diff) {
      case 0: noteString = expectedBaseName; break;
      case 1: noteString = `${expectedBaseName} سری`; break;
      case 2: noteString = `${expectedBaseName} دیز`; break;
      case 3: noteString = `${expectedBaseName} دیز سری`; break;
      case 4: noteString = `${expectedBaseName} دوبل دیز`; break;
      case -1: noteString = `${expectedBaseName} کرن`; break;
      case -2: noteString = `${expectedBaseName} بمل`; break;
      case -3: noteString = `${expectedBaseName} بمل کرن`; break;
      case -4: noteString = `${expectedBaseName} دوبل بمل`; break;
      default:
        noteString = QUARTER_TONE_SCALE[noteIndex];
    }
    notes.push(noteString);
  }

  return notes;
};