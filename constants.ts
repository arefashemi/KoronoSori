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
export const NAVA_INTERVALS = [0, 4, 7, 10, 14, 17, 20];
export const RAST_PANJGAH_INTERVALS = [0, 4, 8, 10, 14, 18, 22];
export const ABOUATA_INTERVALS = [0, 3, 6, 10, 14, 16, 20];
export const BAYAT_TORK_INTERVALS = [0, 4, 8, 11, 14, 18, 21];
export const AFSHARI_INTERVALS = [0, 3, 6, 10, 14, 17, 20];
export const DASHTI_INTERVALS = [0, 3, 6, 10, 14, 16, 20];
export const BAYAT_ESFAHAN_INTERVALS = [0, 4, 6, 10, 14, 16, 22];

export const ROOT_OPTIONS = ['دو', 'ر', 'می', 'فا', 'سل', 'لا', 'سی'];

export const ALPHABET_NOTES: Record<string, string> = {
  'دو': 'C',
  'ر': 'D',
  'می': 'E',
  'فا': 'F',
  'سل': 'G',
  'لا': 'A',
  'سی': 'B'
};

export const TRANSLATIONS = {
  fa: {
    appTitle: 'کُرنوسُری',
    instruction: 'برای شروع محاسبه\nگام مورد نظر و نت پایه را انتخاب کنید',
    scaleLabel: 'دستگاه / گام',
    rootLabel: 'نام نت پایه',
    accLabel: 'علامت',
    copied: 'کپی شد',
    copyTooltip: 'کپی کردن نت‌ها',
    playScale: 'شنیدن گام',
    stopScale: 'توقف صدا',
    footer: 'ساخته شده با عشق به موسیقی ایرانی ❤️',
    aboutLink: 'درباره ما',
    aboutTitle: 'درباره ما',
    aboutDesc: '• کُرنوسُری روایتی است از عدد و نغمه؛ ابزاری دقیق و کاربردی برای محاسبه فواصل و درجات گام‌های موسیقی اصیل ایرانی.\n• این برنامه با هدف کمک به هنرجویان، نوازندگان و پژوهشگران موسیقی طراحی شده تا بتوانند ساختار دستگاه‌ها و گام‌ها را با دقت بیشتری تحلیل و بررسی کنند.\n• سال‌ها پیش، کلنل علینقی خان وزیری با نگاهی نو، علم را با هنر ایرانی درآمیخت و بنیانی علمی برای بررسی و آموزش موسیقی ایران پایه‌گذاری کرد؛ ما نیز در کُرنوسُری، با الهام از همان نگاه، کوشیده‌ایم پلی میان فناوری امروز و میراث ارزشمند موسیقی ایرانی بسازیم. این برنامه را با احترام، به ایشان پیشکش می‌کنیم.\n• پیش از این، نسخه‌ای اولیه از چنین ابزاری برای اندروید به همت آقای فاضل مستخدمین حسینی طراحی و منتشر شده بود. ایده و تلاش ارزشمند ایشان، انگیزه‌بخش آغاز این مسیر برای ما بوده است؛ بدین‌وسیله مراتب قدردانی خود را اعلام می‌داریم.\n• این نسخه از کُرنوسُری با بهره‌گیری از هوش مصنوعی Gemini توسعه یافته است.\n• ناظر فنی و کیفی: عارف هاشمی راد   @arefashemi',
    vaziriLink: 'درباره وزیری',
    vaziriTitle: 'کلنل علینقی خان وزیری',
    vaziriDesc: 'کلنل علینقی وزیری (۱۲۶۵-۱۳۵۸) موسیقی‌دان برجسته و بنیان‌گذار تئوری نوین موسیقی ایران است که با ابداع علامت‌های «سُری» و «کُرُن»، راه را برای نگارش و آموزش آکادمیک موسیقی ایرانی هموار کرد.\n\nاو با تقسیم‌بندی دقیق فواصل، ساختاری علمی برای بررسی دستگاه‌ها و آوازها ارائه داد که امروزه مبنای آموزش در هنرستان‌های موسیقی است.',
    backBtn: 'بازگشت',
    supportBtn: 'حمایت از ما',
    supportTitle: 'حمایت از کُرنوسُری',
    supportDesc: 'کُرنوسُری همیشه رایگان و بدون تبلیغات باقی می‌ماند. حمایت‌های شما مستقیماً برای بهبود مستمر برنامه، تحقیق پیرامون تئوری موسیقی علمی و سرپا نگه‌داشتن سرورها هزینه می‌شود.',
    supportTier1: '☕️ یک فنجان قهوه',
    supportTier1Desc: 'حمایتی کوچک اما دلگرم‌کننده',
    supportTier2: '🚀 حمایت از توسعه',
    supportTier2Desc: 'کمک به بهبود و پایداری برنامه',
    supportTier3: '💎 حامی ویژه',
    supportTier3Desc: 'مبلغ دلخواه برای همراهی بیشتر',
    shahedLabel: 'نت شاهد',
    istLabel: 'نت ایست',
    motaghayyerLabel: 'نت متغیر',
    tetrachordLabel: 'دانگ‌ها (تتراکوردها)',
    firstTetrachord: 'دانگ اول',
    secondTetrachord: 'دانگ دوم',
    goushehsLabel: 'گوشه‌های مهم',
    continuousLabel: 'پیوسته (متصل)',
    disjunctLabel: 'منفصل',
    noMotaghayyer: 'ندارد',
    favoritesTab: 'نشان‌شده‌ها',
    calculatorTab: 'محاسبه‌گر',
    emptyFavorites: 'هیچ گامی نشان نشده است.',
    emptyFavoritesDesc: 'گام‌های مورد علاقه خود را با فشردن دکمه ستاره (⭐️) ذخیره کنید تا در این بخش نمایش داده شوند.',
    removeFavorite: 'حذف',
    favoriteAdded: 'به نشان‌شده‌ها اضافه شد',
    favoriteRemoved: 'از نشان‌شده‌ها حذف شد',
    scales: { 
      'شور': 'شور', 'سه گاه': 'سه گاه', 'چهارگاه': 'چهارگاه', 'ماهور': 'ماهور', 'همایون': 'همایون', 'نوا': 'نوا', 'راست پنجگاه': 'راست پنجگاه',
      'ابوعطا': 'ابوعطا', 'بیات ترک': 'بیات ترک', 'افشاری': 'افشاری', 'دشتی': 'دشتی', 'بیات اصفهان': 'بیات اصفهان'
    },
    accidentals: { 
      'بکار': 'بکار', 
      'دیز': 'دیز', 
      'بمل': 'بمل', 
      'سری': 'سری', 
      'کرن': 'کرن',
      'دوبل دیز': 'دوبل دیز',
      'دوبل بمل': 'دوبل بمل',
      'دیز سری': 'دیز سُری',
      'بمل کرن': 'بمل کُرُن'
    },
    notes: { 'دو': 'دو', 'ر': 'ر', 'می': 'می', 'فا': 'فا', 'سل': 'سل', 'لا': 'لا', 'سی': 'سی' },
    scaleDescriptions: {
      'شور': 'شور به عنوان «مادر موسیقی ایران» شناخته می‌شود. فواصل آن شامل ربع‌پرده (کرن) است و فضایی حزن‌انگیز اما باوقار دارد. آوازهای ابوعطا، بیات ترک، افشاری و دشتی از متعلقات آن هستند.',
      'سه گاه': 'سه گاه گامی است که بیشترین استفاده از ربع‌پرده‌ها را دارد. حسی از رهایی و آرامش را القا می‌کند و در موسیقی محلی ایران بسیار پرکاربرد است.',
      'چهارگاه': 'چهارگاه گامی حماسی، پرانرژی و در عین حال عاطفی است. وجود دو فاصله دوم بیش‌افزوده (سه ربع‌پرده) به آن شخصیتی بسیار متمایز و شرقی می‌بخشد.',
      'ماهور': 'ماهور شباهت زیادی به گام بزرگ (Major) در موسیقی کلاسیک غربی دارد. حسی شاد، باشکوه و امیدوارانه منتقل می‌کند و برای قطعات رزمی و جشن‌ها مناسب است.',
      'همایون': 'همایون گامی مجلل، اشرافی و در عین حال غمگین است. فاصله دوم بیش‌افزوده در آن حسی خاص ایجاد می‌کند. آواز بیات اصفهان از متعلقات این دستگاه است.',
      'نوا': 'نوا گامی آرام، عرفانی و متفکرانه است. فواصل آن شباهت زیادی به شور دارد اما ایست و شاهد آن متفاوت است که شخصیتی مستقل به آن می‌دهد.',
      'راست پنجگاه': 'راست پنجگاه از نظر فواصل شبیه به ماهور است اما امکانات بسیار گسترده‌ای برای مرکب‌خوانی و سفر به سایر دستگاه‌ها فراهم می‌کند.',
      'ابوعطا': 'آوازی از متعلقات شور که حسی حزین و در عین حال عارفانه دارد. فواصل آن با شور یکسان است اما شاهد و ایست متفاوتی دارد.',
      'بیات ترک': 'آوازی شاد و باوقار از متعلقات شور. به دلیل نزدیکی به ماهور، حسی از امید و گشایش را منتقل می‌کند.',
      'افشاری': 'آوازی متفکرانه و ناله‌گونه که از نظر فواصل شباهت زیادی به شور دارد اما در درجات بالا شخصیت مستقلی پیدا می‌کند.',
      'دشتی': 'یکی از زیباترین و غمگین‌ترین آوازهای موسیقی ایران که از متعلقات شور است و در موسیقی محلی بسیار پرکاربرد است.',
      'بیات اصفهان': 'آوازی مجلل و اشرافی که از متعلقات همایون است. فواصل آن شباهت زیادی به گام کوچک (Minor) غربی دارد.'
    },
    changelogLink: 'بروزرسانی‌ها',
    changelogTitle: 'تاریخچه تغییرات و بروزرسانی‌ها',
    currentVersionLabel: 'نسخه فعلی شما',
    latestVersionLabel: 'آخرین نسخه منتشرشده',
    checkUpdatesBtn: 'بررسی بروزرسانی',
    checkingUpdates: 'در حال بررسی...',
    upToDateMsg: 'برنامه شما کاملاً بروز است! 🎉',
    updateAvailableMsg: 'نسخه جدیدتری در دسترس است!',
    applyUpdateBtn: 'نصب خودکار نسخه جدید',
    updatingMsg: 'در حال نصب و بروزرسانی...',
    updateSuccessMsg: 'برنامه با موفقیت به آخرین نسخه بروزرسانی شد!',
  },
  en: {
    appTitle: 'Koronosori',
    instruction: 'To calculate the scale degrees,\nselect the scale type and root note.',
    scaleLabel: 'Scale / Dastgah',
    rootLabel: 'Root Note',
    accLabel: 'Accidental',
    copied: 'Copied',
    copyTooltip: 'Copy notes',
    playScale: 'Play Scale',
    stopScale: 'Stop Playback',
    footer: 'Made with love for Persian Music ❤️',
    aboutLink: 'About Us',
    aboutTitle: 'About Us',
    aboutDesc: '• Koronosori is a tale of numbers and melodies; A precise and practical tool for calculating intervals and degrees of authentic Persian musical scales.\n• This app is designed to help students, musicians, and music researchers analyze and study the structure of Dastgahs and scales with greater accuracy.\n• Years ago, Colonel Alinaghi Khan Vaziri, with a fresh perspective, blended science with Iranian art and laid a scientific foundation for the study and education of Persian music; In Koronosori, inspired by that same vision, we have tried to build a bridge between today\'s technology and the precious heritage of Persian music. We respectfully dedicate this app to him.\n• Previously, an initial version of such a tool for Android was designed and published by Mr. Fazel Mostakhdemin Hosseini. His valuable idea and effort have been the inspiring start of this journey for us; we hereby express our gratitude.\n• This version of Koronosori was developed using Gemini AI.\n• Technical and Quality Supervisor: Aref Hashemi Rad   @arefashemi',
    vaziriLink: 'About Vaziri',
    vaziriTitle: 'Col. Alinaghi Khan Vaziri',
    vaziriDesc: 'Colonel Alinaghi Vaziri (1887-1979) was a prominent musician and the founder of modern Persian music theory. By introducing the "Sori" and "Koron" symbols, he paved the way for the academic notation and education of Persian music.\n\nHis systematic approach to intervals provided a scientific framework for studying Dastgahs and Avazs, which remains the basis for education in music conservatories today.',
    backBtn: 'Back',
    supportBtn: 'Support Us',
    supportTitle: 'Support Koronosori',
    supportDesc: 'Koronosori will always remain free and ad-free. Your support directly fuels continuous improvements, academic music theory research, and keeping our servers running.',
    supportTier1: '☕️ Buy me a coffee',
    supportTier1Desc: 'A small but heart-warming support',
    supportTier2: '🚀 Support Development',
    supportTier2Desc: 'Help improve and sustain the app',
    supportTier3: '💎 Special Patron',
    supportTier3Desc: 'Custom amount for more support',
    shahedLabel: 'Shahed Note',
    istLabel: 'Ist Note',
    motaghayyerLabel: 'Variable Note',
    tetrachordLabel: 'Tetrachords (Dangs)',
    firstTetrachord: 'First Dang',
    secondTetrachord: 'Second Dang',
    goushehsLabel: 'Important Goushehs',
    continuousLabel: 'Conjoined (Continuous)',
    disjunctLabel: 'Disjunct',
    noMotaghayyer: 'None',
    favoritesTab: 'Favorites',
    calculatorTab: 'Calculator',
    emptyFavorites: 'No favorited scales yet.',
    emptyFavoritesDesc: 'Save your favorite scales by pressing the star button (⭐️) to see them here.',
    removeFavorite: 'Remove',
    favoriteAdded: 'Added to favorites',
    favoriteRemoved: 'Removed from favorites',
    scales: { 
      'شور': 'Shur', 'سه گاه': 'Segah', 'چهارگاه': 'Chahargah', 'ماهور': 'Mahur', 'همایون': 'Homayoun', 'نوا': 'Nava', 'راست پنجگاه': 'Rast-Panjgah',
      'ابوعطا': 'Abouata', 'بیات ترک': 'Bayat-e Tork', 'افشاری': 'Afshari', 'دشتی': 'Dashti', 'بیات اصفهان': 'Bayat-e Esfahan'
    },
    accidentals: { 
      'بکار': 'Natural', 
      'دیز': 'Sharp', 
      'بمل': 'Flat', 
      'سری': 'Sori', 
      'کرن': 'Koron',
      'دوبل دیز': 'Double Sharp',
      'دوبل بمل': 'Double Flat',
      'دیز سری': 'Sharp Sori',
      'بمل کرن': 'Flat Koron'
    },
    notes: { 'دو': 'Do', 'ر': 'Re', 'می': 'Mi', 'فا': 'Fa', 'سل': 'Sol', 'لا': 'La', 'سی': 'Si' },
    scaleDescriptions: {
      'شور': 'Shur is known as the "Mother of Persian Music." It features quarter-tones (Koron) and has a mournful yet dignified atmosphere. Many folk melodies are based on this Dastgah.',
      'سه گاه': 'Segah is the scale that makes the most extensive use of quarter-tones. It conveys a sense of liberation and peace, and is very common in Iranian folk music.',
      'چهارگاه': 'Chahargah is epic, energetic, and emotional. The presence of two augmented second intervals gives it a very distinct and oriental character.',
      'ماهور': 'Mahur is very similar to the Major scale in Western classical music. It conveys a happy, grand, and hopeful feeling, suitable for festive pieces.',
      'همایون': 'Homayoun is grand, aristocratic, and yet sad. The augmented second interval creates a unique atmosphere. Bayat-e Esfahan is a derivative of this Dastgah.',
      'نوا': 'Nava is calm, mystical, and thoughtful. Its intervals are similar to Shur, but its tonic and characteristic notes give it an independent personality.',
      'راست پنجگاه': 'Rast-Panjgah is similar to Mahur in terms of intervals but provides extensive possibilities for modulation to other Dastgahs.',
      'ابوعطا': 'An Avaz belonging to Shur with a mournful yet mystical feel. Its intervals are identical to Shur but with different characteristic notes.',
      'بیات ترک': 'A happy and dignified Avaz from Shur. Due to its proximity to Mahur, it conveys a sense of hope and openness.',
      'افشاری': 'A thoughtful and plaintive Avaz that resembles Shur in intervals but develops an independent character in higher degrees.',
      'دشتی': 'One of the most beautiful and saddest Avaz in Persian music, belonging to Shur and widely used in folk music.',
      'بیات اصفهان': 'A grand and aristocratic Avaz belonging to Homayoun. Its intervals are similar to the Western Minor scale.'
    },
    changelogLink: 'Updates',
    changelogTitle: 'Updates & Changelog',
    currentVersionLabel: 'Your Version',
    latestVersionLabel: 'Latest Version Available',
    checkUpdatesBtn: 'Check for Updates',
    checkingUpdates: 'Checking...',
    upToDateMsg: 'Your app is up to date! 🎉',
    updateAvailableMsg: 'A new version is available!',
    applyUpdateBtn: 'Install New Version',
    updatingMsg: 'Installing update...',
    updateSuccessMsg: 'App updated to the latest version successfully!',
  }
};

export interface AcademicInfo {
  shahedDegree: number;
  istDegree: number;
  motaghayyerDegree: number | null;
  tetrachords_type: 'continuous' | 'disjunct';
  goushehs_fa: string[];
  goushehs_en: string[];
}

export const SCALE_ACADEMIC_DATA: Record<string, AcademicInfo> = {
  'شور': {
    shahedDegree: 4,
    istDegree: 1,
    motaghayyerDegree: 5,
    tetrachords_type: 'continuous',
    goushehs_fa: ['درآمد', 'شهناز', 'قرچه', 'رضوی', 'حسینی', 'گریلی'],
    goushehs_en: ['Daramad', 'Shahnaz', 'Qaracheh', 'Razavi', 'Hoseyni', 'Gereyli']
  },
  'سه گاه': {
    shahedDegree: 1,
    istDegree: 1,
    motaghayyerDegree: null,
    tetrachords_type: 'continuous',
    goushehs_fa: ['زابل', 'مخالف', 'مویه', 'حصار', 'جامی', 'مغلوب'],
    goushehs_en: ['Zabol', 'Mokhalef', 'Muye', 'Hesar', 'Jami', 'Maghloob']
  },
  'چهارگاه': {
    shahedDegree: 1,
    istDegree: 1,
    motaghayyerDegree: null,
    tetrachords_type: 'disjunct',
    goushehs_fa: ['زابل', 'حصار', 'مخالف', 'مغلوب', 'منصوری', 'حدی و پهلوی'],
    goushehs_en: ['Zabol', 'Hesar', 'Mokhalef', 'Maghloob', 'Mansoori', 'Hadi & Pahlavi']
  },
  'ماهور': {
    shahedDegree: 1,
    istDegree: 1,
    motaghayyerDegree: null,
    tetrachords_type: 'disjunct',
    goushehs_fa: ['داد', 'شکسته', 'دلکش', 'عراق', 'خاوران', 'راک'],
    goushehs_en: ['Dad', 'Shekasteh', 'Delkash', 'Iraq', 'Khavaran', 'Rak']
  },
  'همایون': {
    shahedDegree: 4,
    istDegree: 1,
    motaghayyerDegree: null,
    tetrachords_type: 'continuous',
    goushehs_fa: ['چکاوک', 'بیداد', 'نی‌داوود', 'شوشتری', 'بختیاری', 'لیلی و مجنون'],
    goushehs_en: ['Chakavak', 'Bidad', 'Ney-Davood', 'Shushtari', 'Bakhtiari', 'Leyli & Majnoon']
  },
  'نوا': {
    shahedDegree: 4,
    istDegree: 1,
    motaghayyerDegree: null,
    tetrachords_type: 'continuous',
    goushehs_fa: ['گردانیه', 'بیات راجه', 'عشاق', 'نهفت', 'خجسته', 'عراق'],
    goushehs_en: ['Gardaniyeh', 'Bayat-e Rajeh', 'Oshaq', 'Nahoft', 'Khojasteh', 'Iraq']
  },
  'راست پنجگاه': {
    shahedDegree: 1,
    istDegree: 1,
    motaghayyerDegree: null,
    tetrachords_type: 'disjunct',
    goushehs_fa: ['نغمه', 'عشاق', 'زنگوله', 'بیات عجم', 'بحر نور', 'قرچه'],
    goushehs_en: ['Naghmeh', 'Oshaq', 'Zangouleh', 'Bayat-e Ajam', 'Bahr-e Noor', 'Qaracheh']
  },
  'ابوعطا': {
    shahedDegree: 4,
    istDegree: 1,
    motaghayyerDegree: null,
    tetrachords_type: 'continuous',
    goushehs_fa: ['سیخی', 'حجاز', 'رامکلی', 'دستان', 'یتیمک'],
    goushehs_en: ['Sikhi', 'Hejaz', 'Ramkali', 'Dastan', 'Yatimeh']
  },
  'بیات ترک': {
    shahedDegree: 3,
    istDegree: 1,
    motaghayyerDegree: null,
    tetrachords_type: 'continuous',
    goushehs_fa: ['داد', 'فیلی', 'شکسته', 'جامه دران', 'مهربانی'],
    goushehs_en: ['Dad', 'Fili', 'Shekasteh', 'Jameh-Daran', 'Mehrabani']
  },
  'افشاری': {
    shahedDegree: 5,
    istDegree: 1,
    motaghayyerDegree: 5,
    tetrachords_type: 'continuous',
    goushehs_fa: ['عراق', 'جامه دران', 'مسیحی', 'قرائی', 'صدری'],
    goushehs_en: ['Iraq', 'Jameh-Daran', 'Masihi', 'Qaraei', 'Sadri']
  },
  'دشتی': {
    shahedDegree: 5,
    istDegree: 1,
    motaghayyerDegree: 5,
    tetrachords_type: 'continuous',
    goushehs_fa: ['دشتستانی', 'بیدگانی', 'چوپانی', 'غم‌انگیز', 'دیلمان'],
    goushehs_en: ['Dashtestani', 'Bidgani', 'Choupani', 'Gham-Angiz', 'Deylaman']
  },
  'بیات اصفهان': {
    shahedDegree: 4,
    istDegree: 1,
    motaghayyerDegree: null,
    tetrachords_type: 'continuous',
    goushehs_fa: ['بیات راجه', 'عشاق', 'شاه‌خطایی', 'سوز و گداز', 'جامه دران'],
    goushehs_en: ['Bayat-e Rajeh', 'Oshaq', 'Shah-Khataei', 'Sooz-o-Ghodaz', 'Jameh-Daran']
  }
};