export enum ScaleType {
  SHUR = 'شور',
  SEGAH = 'سه گاه',
  CHAHARGAH = 'چهارگاه',
  MAHUR = 'ماهور',
  HOMAYOUN = 'همایون',
  NAVA = 'نوا',
  RAST_PANJGAH = 'راست پنجگاه'
}

// Archived Avazes (حفظ در آرشیو برای نسخه‌های آتی در صورت نیاز به بازبینی محاسبات فواصل)
// export enum ArchivedAvazType {
//   ABOUATA = 'ابوعطا',
//   BAYAT_TORK = 'بیات ترک',
//   AFSHARI = 'افشاری',
//   DASHTI = 'دشتی',
//   BAYAT_ESFAHAN = 'بیات اصفهان'
// }

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
  note?: string; // Personal user note for this saved favorite
}