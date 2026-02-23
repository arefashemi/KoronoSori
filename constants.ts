import { NoteName } from './types';

// The Quarter Tone scale (24 steps per octave)
export const QUARTER_TONE_SCALE: string[] = [
  'دو', 'دو سری', 'دو دیز', 'ر کرن', 
  'ر', 'ر سری', 'ر دیز', 'می کرن', 
  'می', 'فا کرن', 'فا', 'فا سری', 
  'فا دیز', 'سل کرن', 'سل', 'سل سری', 
  'سل دیز', 'لا کرن', 'لا', 'لا سری', 
  'لا دیز', 'سی کرن', 'سی', 'دو کرن'
];

export const ACCIDENTAL_OPTIONS = ['بکار', 'دیز', 'بمل', 'سری', 'کرن'];

export const ACCIDENTAL_OFFSETS: Record<string, number> = {
  'بکار': 0,
  'دیز': 2,
  'بمل': -2,
  'سری': 1,
  'کرن': -1
};

export const NOTE_BASE_INDICES: Record<string, number> = {
  'دو': 0, 'ر': 4, 'می': 8, 'فا': 10, 'سل': 14, 'لا': 18, 'سی': 22
};

export const MAHUR_INTERVALS = [0, 4, 8, 10, 14, 18, 22];
export const SHUR_INTERVALS = [0, 3, 6, 10, 14, 16, 20];
export const HOMAYOUN_INTERVALS = [0, 3, 8, 10, 14, 16, 20];
export const SEGAH_INTERVALS = [0, 3, 7, 10, 14, 17, 21];
export const CHAHARGAH_INTERVALS = [0, 3, 8, 10, 14, 17, 22];
export const NAVA_INTERVALS = [0, 4, 6, 10, 14, 17, 20];
export const RAST_PANJGAH_INTERVALS = [0, 4, 8, 10, 14, 18, 22];

export const ROOT_OPTIONS = ['دو', 'ر', 'می', 'فا', 'سل', 'لا', 'سی'];

export const TRANSLATIONS = {
  fa: {
    appTitle: 'کُرنوسُری',
    instruction: 'برای شروع محاسبه\nگام مورد نظر و نت پایه را انتخاب کنید',
    scaleLabel: 'دستگاه / گام',
    rootLabel: 'نام نت پایه',
    accLabel: 'علامت',
    copied: 'کپی شد',
    copyTooltip: 'کپی کردن نت‌ها',
    footer: 'ساخته شده با عشق به موسیقی ایرانی ❤️',
    aboutLink: 'درباره ما',
    aboutTitle: 'درباره کُرنوسُری',
    aboutDesc: 'کُرنوسُری ابزاری دقیق برای محاسبه فواصل و درجات گام‌های موسیقی اصیل ایرانی است.\n\nطراحی و توسعه: @arefashemi',
    vaziriLink: 'درباره وزیری',
    vaziriTitle: 'کلنل علینقی خان وزیری',
    vaziriDesc: 'کلنل علینقی وزیری (۱۲۶۵-۱۳۵۸) موسیقی‌دان بزرگ و مبدع علامت‌های «سُری» و «کُرُن» در موسیقی ایران است.\n\nنکته جالب اینجاست که ایشان نام این دو علامت را بر اساس حروف ابجد نام‌های «علی» و «نقی» برگزیدند: کُرُن از نام «علی» و سُری از نام «نقی» مشتق شده است.\n\nاو با تقسیم گام به ۲۴ ربع‌پرده مساوی، تئوری نوین موسیقی ایرانی را بنیان نهاد و هنرستان عالی موسیقی را تاسیس کرد.',
    backBtn: 'بازگشت',
    supportBtn: 'حمایت از ما',
    supportTitle: 'چرا حمایت؟',
    supportDesc: 'این برنامه به صورت کاملاً رایگان و بدون هیچ‌گونه تبلیغات مزاحم ارائه می‌شود تا تمرکز شما فقط روی موسیقی باشد.\n\nاگر این ابزار برایتان مفید بوده، می‌توانید با حمایت مالی به اندازه توانتان، به ما کمک کنید تا هزینه‌های سرور و توسعه را پوشش دهیم و این مسیر را ادامه دهیم.',
    supportTier3: '💎 حمایت (مبلغ دلخواه)',
    scales: { 'شور': 'شور', 'سه گاه': 'سه گاه', 'چهارگاه': 'چهارگاه', 'ماهور': 'ماهور', 'همایون': 'همایون', 'نوا': 'نوا', 'راست پنجگاه': 'راست پنجگاه' },
    accidentals: { 'بکار': 'بکار', 'دیز': 'دیز', 'بمل': 'بمل', 'سری': 'سری', 'کرن': 'کرن' },
    notes: { 'دو': 'دو', 'ر': 'ر', 'می': 'می', 'فا': 'فا', 'سل': 'سل', 'لا': 'لا', 'سی': 'سی' }
  },
  en: {
    appTitle: 'Koronosori',
    instruction: 'To calculate the scale degrees,\nselect the scale type and root note.',
    scaleLabel: 'Scale / Dastgah',
    rootLabel: 'Root Note',
    accLabel: 'Accidental',
    copied: 'Copied',
    copyTooltip: 'Copy notes',
    footer: 'Made with love for Persian Music ❤️',
    aboutLink: 'About Us',
    aboutTitle: 'About Koronosori',
    aboutDesc: 'A precision tool for calculating intervals and degrees of authentic Persian musical scales.\n\nDeveloped by @arefashemi',
    vaziriLink: 'About Vaziri',
    vaziriTitle: 'Col. Alinaghi Khan Vaziri',
    vaziriDesc: 'Colonel Alinaghi Vaziri (1887-1979) was the mastermind who introduced "Sori" and "Koron" symbols to Persian music theory.\n\nNotably, he derived these names from the Abjad values of his own names: "Koron" from "Ali" and "Sori" from "Naghi".\n\nBy dividing the octave into 24 equal quarter-tones, he laid the foundation for modern Persian musicology.',
    backBtn: 'Back',
    supportBtn: 'Support Us',
    supportTitle: 'Why Support?',
    supportDesc: 'This app is provided completely free and without any annoying ads, so you can focus solely on the music.\n\nIf you find this tool useful, you can help cover server and development costs by donating whatever amount you can.',
    supportTier3: '💎 Support (Custom Amount)',
    scales: { 'شور': 'Shur', 'سه گاه': 'Segah', 'چهارگاه': 'Chahargah', 'ماهور': 'Mahur', 'همایون': 'Homayoun', 'نوا': 'Nava', 'راست پجگاه': 'Rast-Panjgah' },
    accidentals: { 'بکار': 'Natural', 'دیز': 'Sharp', 'بمل': 'Flat', 'سری': 'Sori', 'کرن': 'Koron' },
    notes: { 'دو': 'Do', 'ر': 'Re', 'می': 'Mi', 'فا': 'Fa', 'سل': 'Sol', 'لا': 'La', 'سی': 'Si' }
  }
};