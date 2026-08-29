import { 
  QUARTER_TONE_SCALE, 
  DASTGAH_INTERVALS_MAP,
  MAHUR_INTERVALS, 
  ROOT_OPTIONS, 
  NOTE_BASE_INDICES, 
  ACCIDENTAL_OFFSETS 
} from '../constants';
import { ScaleType } from '../types';

export const getScaleNotes = (rootName: string, rootAccidental: string, type: ScaleType | string): string[] => {
  // 1. Calculate the starting index in the quarter-tone scale (24 steps per octave)
  let rootIndex = NOTE_BASE_INDICES[rootName] ?? 0;
  
  // Apply accidental offset
  if (ACCIDENTAL_OFFSETS[rootAccidental] !== undefined) {
    rootIndex += ACCIDENTAL_OFFSETS[rootAccidental];
  }

  // Normalize index to be within 0-23
  rootIndex = (rootIndex % 24 + 24) % 24;

  // 2. Select intervals based on 7 primary Dastgahs using fast O(1) map
  const intervals: number[] = DASTGAH_INTERVALS_MAP[type] || MAHUR_INTERVALS;

  // 3. Generate notes with smart enharmonic diatonic spelling
  const notes: string[] = [];
  const rootBaseIndex = ROOT_OPTIONS.indexOf(rootName);
  const safeRootBaseIndex = rootBaseIndex >= 0 ? rootBaseIndex : 0;

  for (let i = 0; i < intervals.length; i++) {
    const noteIndex = (rootIndex + intervals[i]) % 24;
    
    // Diatonic spelling: ith note has the ith base name (Do, Re, Mi, Fa, Sol, La, Si)
    const expectedBaseIndex = (safeRootBaseIndex + i) % 7;
    const expectedBaseName = ROOT_OPTIONS[expectedBaseIndex];
    
    // Standard index for this base name (Do=0, Re=4, Mi=8, Fa=10, Sol=14, La=18, Si=22)
    const baseNoteStandardIndex = NOTE_BASE_INDICES[expectedBaseName] ?? 0;
    
    // Difference in quarter tones
    let diff = (noteIndex - baseNoteStandardIndex + 24) % 24;
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
