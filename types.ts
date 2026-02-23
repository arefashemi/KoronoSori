export enum ScaleType {
  SHUR = 'Shur',
  MAHUR = 'Mahur',
  SEGAH = 'Segah',
  CHAHARGAH = 'Chahargah',
  HOMAYOUN = 'Homayoun',
  NAVA = 'Nava',
  RAST_PANJGAH = 'RastPanjgah'
}

export type NoteName = string;

export interface ScaleResult {
  root: string;
  type: ScaleType;
  notes: string[];
}