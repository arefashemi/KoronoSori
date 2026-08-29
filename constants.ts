import { NoteName } from './types';

// The Quarter Tone scale (24 steps per octave based on Col. Alinaqi Vaziri's theory)
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

// 7 Primary Persian Dastgahs Intervals (24-TET quarter-tone steps)
export const SHUR_INTERVALS = [0, 3, 6, 10, 14, 16, 20];
export const SEGAH_INTERVALS = [0, 3, 7, 10, 14, 17, 21];
export const CHAHARGAH_INTERVALS = [0, 3, 8, 10, 14, 17, 22];
export const HOMAYOUN_INTERVALS = [0, 3, 8, 10, 14, 16, 20];
export const MAHUR_INTERVALS = [0, 4, 8, 10, 14, 18, 22];
export const NAVA_INTERVALS = [0, 4, 7, 10, 14, 17, 20];
export const RAST_PANJGAH_INTERVALS = [0, 4, 8, 10, 14, 18, 22];

// Fast O(1) interval lookup map for maximum performance
export const DASTGAH_INTERVALS_MAP: Record<string, number[]> = {
  'شور': SHUR_INTERVALS,
  'سه گاه': SEGAH_INTERVALS,
  'چهارگاه': CHAHARGAH_INTERVALS,
  'همایون': HOMAYOUN_INTERVALS,
  'ماهور': MAHUR_INTERVALS,
  'نوا': NAVA_INTERVALS,
  'راست پنجگاه': RAST_PANJGAH_INTERVALS,
};

// Archived 5 Avazes intervals for future theoretical verification
export const ARCHIVED_AVAZ_INTERVALS: Record<string, number[]> = {
  'ابوعطا': [0, 4, 6, 10, 14, 17, 20],
  'بیات ترک': [0, 4, 8, 11, 14, 18, 21],
  'افشاری': [0, 3, 6, 10, 14, 17, 20],
  'دشتی': [0, 4, 6, 10, 14, 16, 20],
  'بیات اصفهان': [0, 4, 6, 10, 14, 16, 22]
};

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
    instruction: 'برای محاسبه فواصل و درجات\nدستگاه مورد نظر و نت پایه را انتخاب کنید',
    scaleLabel: 'دستگاه موسیقی',
    rootLabel: 'نت پایه (تونیک)',
    accLabel: 'علامت عرضی',
    copied: 'کپی شد',
    copyTooltip: 'کپی کردن نت‌ها',
    playScale: 'شنیدن گام دستگاه',
    stopScale: 'توقف صدا',
    footer: 'هفت دستگاه اصیل موسیقی ایرانی ❤️ کُرنوسُری',
    aboutLink: 'درباره ما',
    aboutTitle: 'درباره کُرنوسُری',
    aboutDesc: '• کُرنوسُری روایتی است از عدد و نغمه؛ ابزاری دقیق و تخصصی برای محاسبه فواصل و درجات هفت دستگاه اصلی موسیقی ایرانی (شور، سه‌گاه، چهارگاه، ماهور، همایون، نوا، راست‌پنجگاه).\n• این برنامه با هدف کمک به هنرجویان، نوازندگان و پژوهشگران موسیقی اصیل ایرانی طراحی شده تا بتوانند ساختار دستگاه‌ها و درجات ردیف را با نهایت دقت بررسی کنند.\n• سال‌ها پیش، کلنل علینقی خان وزیری با نگاهی نو، علم را با هنر ایرانی درآمیخت و بنیانی علمی برای آموزش موسیقی ایران پایه‌گذاری کرد؛ ما نیز در کُرنوسُری، با الهام از همان نگاه، کوشیده‌ایم پلی میان فناوری امروز و میراث ارزشمند موسیقی ایرانی بسازیم.\n• پیش از این، نسخه‌ای اولیه از چنین ابزاری برای اندروید به همت آقای فاضل مستخدمین حسینی طراحی و منتشر شده بود. ایده و تلاش ارزشمند ایشان، انگیزه‌بخش آغاز این مسیر برای ما بوده است؛ بدین‌وسیله مراتب قدردانی خود را اعلام می‌داریم.\n• این نسخه از کُرنوسُری با بهره‌گیری از هوش مصنوعی توسعه یافته است.\n• ناظر فنی و کیفی: عارف هاشمی راد   @arefashemi',
    vaziriLink: 'درباره وزیری',
    vaziriTitle: 'کلنل علینقی خان وزیری',
    vaziriDesc: 'کلنل علینقی وزیری (۱۲۶۵-۱۳۵۸) موسیقی‌دان برجسته و بنیان‌گذار تئوری نوین موسیقی ایران است که با ابداع علامت‌های «سُری» و «کُرُن»، راه را برای نگارش و آموزش آکادمیک موسیقی ایرانی هموار کرد.\n\nاو با تقسیم‌بندی گام به ۲۴ ربع‌پرده مساوی، ساختاری علمی برای بررسی دقیق هفت دستگاه موسیقی ایران ارائه داد که امروزه مبنای آموزش در هنرستان‌های موسیقی است.',
    backBtn: 'بازگشت',
    supportBtn: 'حمایت از توسعه',
    supportTitle: 'حمایت از کُرنوسُری',
    supportDesc: 'کُرنوسُری همیشه رایگان، مستقل و بدون تبلیغات باقی می‌ماند. حمایت‌های شما مستقیماً برای بهبود مستمر برنامه، پژوهش‌های تئوری موسیقی و زیرساخت‌ها هزینه می‌شود.',
    supportTier1: '☕️ یک فنجان قهوه',
    supportTier1Desc: 'حمایتی کوچک اما دلگرم‌کننده',
    supportTier2: '🚀 توسعه و پایداری',
    supportTier2Desc: 'کمک به بهبود ویژگی‌ها و عملکرد',
    supportTier3: '💎 حامی ویژه',
    supportTier3Desc: 'مبلغ دلخواه برای همراهی بیشتر',
    shahedLabel: 'نت شاهد',
    istLabel: 'نت ایست',
    motaghayyerLabel: 'نت متغیر',
    tetrachordLabel: 'دانگ‌ها (تتراکوردها)',
    firstTetrachord: 'دانگ اول',
    secondTetrachord: 'دانگ دوم',
    goushehsLabel: 'گوشه‌های کلیدی ردیف',
    continuousLabel: 'پیوسته (متصل)',
    disjunctLabel: 'منفصل',
    noMotaghayyer: 'ندارد',
    favoritesTab: 'نشان‌شده‌ها',
    calculatorTab: 'محاسبه‌گر',
    emptyFavorites: 'هیچ دستگاهی نشان نشده است.',
    emptyFavoritesDesc: 'دستگاه‌های مورد علاقه خود را با فشردن دکمه ستاره (⭐️) ذخیره کنید تا در این بخش نمایش داده شوند.',
    removeFavorite: 'حذف',
    favoriteAdded: 'به نشان‌شده‌ها اضافه شد',
    favoriteRemoved: 'از نشان‌شده‌ها حذف شد',
    scales: { 
      'شور': 'شور',
      'سه گاه': 'سه‌گاه',
      'چهارگاه': 'چهارگاه',
      'ماهور': 'ماهور',
      'همایون': 'همایون',
      'نوا': 'نوا',
      'راست پنجگاه': 'راست‌پنجگاه'
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
      'شور': 'دستگاه شور؛ مادر موسیقی دستگاهی ایران. فواصل آن شامل ریزپرده‌های شاخص (کرن) بوده و فضایی عمیق، حزن‌انگیز و در عین حال پرصلابت دارد.',
      'سه گاه': 'دستگاه سه‌گاه؛ دارای بیشترین کاربرد ربع‌پرده‌ها در درجات پایه. حسی سرشار از رهایی، شوق معنوی و نجابت ایرانی را تداعی می‌کند.',
      'چهارگاه': 'دستگاه چهارگاه؛ باشکوه، حماسی و پرحرارت. با داشتن دو فاصله دوم بیش‌افزوده متوالی در دانگ‌های منفصل، هویتی فوق‌العاده قاطع و رزمی دارد.',
      'ماهور': 'دستگاه ماهور؛ بیانگر شادی، وقار، امید و عظمت. شباهت فواصلی با گام ماژور غربی با تحریرها و حس غنی موسیقی اصیل ایرانی.',
      'همایون': 'دستگاه همایون؛ مجلل، اشرافی و عاطفی. فواصل آن توازنی بی‌نظیر میان حزن عاشقانه و شکوه شهریاری خلق می‌کند.',
      'نوا': 'دستگاه نوا؛ عمیق، متفکرانه، عارفانه و آرامش‌بخش. دستگاهی خلوت‌گزین که فواصلی نزدیک به شور دارد اما با هویتی کاملاً مستقل و منحصربه‌فرد.',
      'راست پنجگاه': 'دستگاه راست‌پنجگاه؛ از کهن‌ترین و غنی‌ترین دستگاه‌های موسیقی ایران با امکانات وسیع مرکب‌خوانی و سفرهای مدال به تمام دستگاه‌های دیگر.'
    },
    changelogLink: 'بروزرسانی‌ها',
    changelogTitle: 'تاریخچه تغییرات و نسخه جدید',
    currentVersionLabel: 'نسخه فعال شما',
    latestVersionLabel: 'آخرین نسخه منتشرشده',
    checkUpdatesBtn: 'بررسی بروزرسانی',
    checkingUpdates: 'در حال بررسی...',
    upToDateMsg: 'برنامه شما به آخرین نسخه بروز است! 🎉',
    updateAvailableMsg: 'نسخه جدیدتری در دسترس است!',
    applyUpdateBtn: 'نصب خودکار نسخه جدید',
    updatingMsg: 'در حال نصب و بروزرسانی...',
    updateSuccessMsg: 'برنامه با موفقیت به آخرین نسخه بروزرسانی شد!',
  },
  en: {
    appTitle: 'Koronosori',
    instruction: 'To calculate scale degrees & intervals,\nselect a Dastgah and root note.',
    scaleLabel: '7 Main Dastgahs',
    rootLabel: 'Root Note (Tonic)',
    accLabel: 'Accidental',
    copied: 'Copied',
    copyTooltip: 'Copy notes',
    playScale: 'Play Dastgah Scale',
    stopScale: 'Stop Playback',
    footer: '7 Primary Persian Dastgahs ❤️ Koronosori',
    aboutLink: 'About Us',
    aboutTitle: 'About Koronosori',
    aboutDesc: '• Koronosori is a tale of numbers and melodies; A precise tool dedicated to calculating intervals and degrees of the 7 primary Dastgahs of Persian classical music (Shur, Segah, Chahargah, Mahur, Homayoun, Nava, Rast-Panjgah).\n• Designed to help music scholars, students, and performers explore academic Radif structures with microtonal accuracy.\n• In respectful dedication to Col. Alinaqi Vaziri who established the academic 24-quarter-tone theoretical foundation.\n• Technical and Quality Supervisor: Aref Hashemi Rad   @arefashemi',
    vaziriLink: 'About Vaziri',
    vaziriTitle: 'Col. Alinaqi Khan Vaziri',
    vaziriDesc: 'Colonel Alinaqi Vaziri (1887-1979) was a pioneer who laid the scientific foundation for modern Persian music theory by introducing the Sori and Koron microtonal notation symbols.\n\nHis 24-TET division remains the cornerstone of education in classical Persian music conservatories today.',
    backBtn: 'Back',
    supportBtn: 'Support Development',
    supportTitle: 'Support Koronosori',
    supportDesc: 'Koronosori is free and ad-free. Your support directly enables ongoing research, performance improvements, and server maintenance.',
    supportTier1: '☕️ Buy me a coffee',
    supportTier1Desc: 'Small but heartwarming support',
    supportTier2: '🚀 Development & Speed',
    supportTier2Desc: 'Help improve features and performance',
    supportTier3: '💎 Special Patron',
    supportTier3Desc: 'Custom patronage to sustain the project',
    shahedLabel: 'Shahed Note',
    istLabel: 'Ist Note',
    motaghayyerLabel: 'Variable Note',
    tetrachordLabel: 'Tetrachords (Dangs)',
    firstTetrachord: 'First Dang',
    secondTetrachord: 'Second Dang',
    goushehsLabel: 'Key Radif Goushehs',
    continuousLabel: 'Conjoined (Continuous)',
    disjunctLabel: 'Disjunct',
    noMotaghayyer: 'None',
    favoritesTab: 'Favorites',
    calculatorTab: 'Calculator',
    emptyFavorites: 'No favorited Dastgahs yet.',
    emptyFavoritesDesc: 'Save your favorite Dastgahs by clicking the star (⭐️) button to view them here.',
    removeFavorite: 'Remove',
    favoriteAdded: 'Added to favorites',
    favoriteRemoved: 'Removed from favorites',
    scales: { 
      'شور': 'Dastgah Shur',
      'سه گاه': 'Dastgah Segah',
      'چهارگاه': 'Dastgah Chahargah',
      'ماهور': 'Dastgah Mahur',
      'همایون': 'Dastgah Homayoun',
      'نوا': 'Dastgah Nava',
      'راست پنجگاه': 'Dastgah Rast-Panjgah'
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
      'شور': 'Dastgah Shur: The "Mother of Persian Music". Features signature microtonal Koron intervals with a deep, mournful, yet noble atmosphere.',
      'سه گاه': 'Dastgah Segah: Characterized by prominent quarter-tones on base degrees, evoking spiritual freedom and emotional longing.',
      'چهارگاه': 'Dastgah Chahargah: Epic, energetic, and triumphant. Built with two consecutive augmented second intervals across disjunct tetrachords.',
      'ماهور': 'Dastgah Mahur: Conveys grandeur, joy, and optimism. Shares structural interval similarities with Western Major but rich in Persian ornaments.',
      'همایون': 'Dastgah Homayoun: Aristocratic, solemn, and deeply moving. Creates a magnificent blend of emotional pathos and majesty.',
      'نوا': 'Dastgah Nava: Meditative, mystical, and serene. Contemplative atmosphere with distinct characteristic Shahed and Ist degrees.',
      'راست پنجگاه': 'Dastgah Rast-Panjgah: One of the oldest and most versatile Dastgahs, opening pathways for modal journeys across the entire Radif.'
    },
    changelogLink: 'Updates',
    changelogTitle: 'Updates & Changelog',
    currentVersionLabel: 'Your Active Version',
    latestVersionLabel: 'Latest Available Version',
    checkUpdatesBtn: 'Check for Updates',
    checkingUpdates: 'Checking...',
    upToDateMsg: 'Your app is completely up to date! 🎉',
    updateAvailableMsg: 'A new version is available!',
    applyUpdateBtn: 'Install New Version',
    updatingMsg: 'Installing update...',
    updateSuccessMsg: 'App updated successfully!',
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
    goushehs_fa: ['درآمد', 'شهناz', 'قرچه', 'رضوی', 'حسینی', 'گریلی'],
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
  }
};
