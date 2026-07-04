export enum ScaleType {
  SHUR = 'Shur',
  MAHUR = 'Mahur',
  SEGAH = 'Segah',
  CHAHARGAH = 'Chahargah',
  HOMAYOUN = 'Homayoun',
  NAVA = 'Nava',
  RAST_PANJGAH = 'RastPanjgah',
  ABOUATA = 'Abouata',
  BAYAT_TORK = 'BayatTork',
  AFSHARI = 'Afshari',
  DASHTI = 'Dashti',
  BAYAT_ESFAHAN = 'BayatEsfahan'
}

export type NoteName = string;

export interface ScaleResult {
  root: string;
  type: ScaleType;
  notes: string[];
}

export interface FavoriteScale {
  id: string;
  root: string;
  accidental: string;
  scaleType: string;
}