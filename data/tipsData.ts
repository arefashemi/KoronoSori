export interface TipItem {
  id: number;
  category: 'dastgah' | 'theory' | 'shortcuts' | 'performance';
  titleFa: string;
  titleEn: string;
  descFa: string;
  descEn: string;
  tagFa: string;
  tagEn: string;
  icon: string;
}

export const TIPS_CATEGORIES = [
  { id: 'all', labelFa: 'همه نکات', labelEn: 'All Tips', icon: '✨' },
  { id: 'dastgah', labelFa: 'دستگاه‌ها و گوشه‌ها', labelEn: 'Dastgahs & Goushehs', icon: '🎼' },
  { id: 'theory', labelFa: 'تئوری و فواصل', labelEn: 'Theory & Intervals', icon: '📐' },
  { id: 'shortcuts', labelFa: 'ترفندهای کُرنوسُری', labelEn: 'App Pro Shortcuts', icon: '💡' },
  { id: 'performance', labelFa: 'تمرین و نوازندگی', labelEn: 'Practice & Performance', icon: '🎻' },
] as const;

export const TIPS_DATA: TipItem[] = [
  // --- 1. Dastgahs & Goushehs ---
  {
    id: 1,
    category: 'dastgah',
    titleFa: 'نت متغیر دستگاه شور',
    titleEn: 'The Variable Note in Shur',
    descFa: 'در دستگاه شور، درجه پنجم یک نت متغیر است. هنگام صعود ملودی معمولاً بکار نواخته می‌شود، اما هنگام فرود و بازگشت به سمت شاهد، به حالت کُرُن درمی‌آید.',
    descEn: 'In Dastgah Shur, the 5th degree acts as a variable note. During ascending motion it is typically natural, whereas in descent and resolution it takes a Koron.',
    tagFa: 'دستگاه شور',
    tagEn: 'Shur',
    icon: '🎵'
  },
  {
    id: 2,
    category: 'dastgah',
    titleFa: 'مادر دستگاه‌های ایرانی: شور',
    titleEn: 'Shur: The Mother of Dastgahs',
    descFa: 'چهار آواز اصیل ابوعطا، بیات ترک، افشاری و دشتی همگی از دستگاه شور منشعب می‌شوند و هرکدام بر نت خاصی از این گام متمرکز هستند.',
    descEn: 'Four classical Avazes (Abuata, Bayat-e Tork, Afshari, and Dashti) stem from Dastgah Shur, each centering around a specific degree of the Shur scale.',
    tagFa: 'دستگاه شور',
    tagEn: 'Shur & Avazes',
    icon: '👑'
  },
  {
    id: 3,
    category: 'dastgah',
    titleFa: 'رازآلودگی دستگاه سه‌گاه',
    titleEn: 'The Mystique of Segah',
    descFa: 'در سه‌گاه، درجه سوم گام نت شاهد و مرکز ثقل احساسی ملودی است. چرخش‌های مدام پیرامون این درجه حسی تغزلی، عمیق و پر از تمنا خلق می‌کند.',
    descEn: 'In Segah, the 3rd degree serves as the Shahed (tonal center). Constant melodies revolving around this note create an introspective and yearning mood.',
    tagFa: 'سه‌گاه',
    tagEn: 'Segah',
    icon: '🕊️'
  },
  {
    id: 4,
    category: 'dastgah',
    titleFa: 'طنین حماسی چهارگاه با دو دوم افزوده',
    titleEn: 'Chahargah: Two Augmented Seconds',
    descFa: 'چهارگاه تنها دستگاهی است که در هر دو دانگ خود فاصله دوم افزوده (۳ ربع‌پرده / ۱.۵ پرده) دارد. این تقارن هندسی باعث طنین باصلابت، مغرور و حماسی آن شده است.',
    descEn: 'Chahargah is the only Dastgah containing an augmented second interval in both tetrachords, giving it a majestic, proud, and epic resonance.',
    tagFa: 'چهارگاه',
    tagEn: 'Chahargah',
    icon: '⚔️'
  },
  {
    id: 5,
    category: 'dastgah',
    titleFa: 'ماهور؛ تقارن با ماژور و تمایز در روح ایرانی',
    titleEn: 'Mahur vs. Western Major',
    descFa: 'فواصل گام ماهور با گام ماژور غربی یکسان است؛ اما تحریرها، ضرب‌آهنگ‌ها و گوشه‌هایی چون «دلکش» و «شکسته» هویتی کاملاً شرقی و ایرانی به آن می‌بخشند.',
    descEn: 'Mahur shares its interval structure with the Western Major scale, but Persian ornaments, Tahrirs, and goushehs like Delkash give it distinct Eastern soul.',
    tagFa: 'ماهور',
    tagEn: 'Mahur',
    icon: '☀️'
  },
  {
    id: 6,
    category: 'dastgah',
    titleFa: 'گوشه دلکش در ماهور',
    titleEn: 'Delkash Gousheh in Mahur',
    descFa: 'در گوشه دلکش ماهور، درجه ششم کُرُن می‌شود و درجه پنجم نقش نت شاهد را بازی می‌کند؛ این تغییر لطیف، ماهور را به حال‌وهوای شور پیوند می‌زند.',
    descEn: 'In Delkash, the 6th degree turns into a Koron and the 5th acts as Shahed, seamlessly bridging the bright Mahur into a soulful Shur atmosphere.',
    tagFa: 'گوشه‌شناسی',
    tagEn: 'Gousheh',
    icon: '🌸'
  },
  {
    id: 7,
    category: 'dastgah',
    titleFa: 'همایون و پیوند با مینور هارمونیک',
    titleEn: 'Homayoun & Harmonic Minor',
    descFa: 'دانگ اول همایون پیوند عمیقی با مینور هارمونیک دارد. درجه دوم آن نت شاهد است و فضای ملودی بین غم اصیل و شکوه درباری در نوسان است.',
    descEn: 'The first tetrachord of Homayoun echoes the Harmonic Minor scale. Its 2nd degree acts as Shahed, creating noble melancholy and royal dignity.',
    tagFa: 'همایون',
    tagEn: 'Homayoun',
    icon: '🏛️'
  },
  {
    id: 8,
    category: 'dastgah',
    titleFa: 'گوشه بیداد در همایون',
    titleEn: 'Bidad: The Climax of Homayoun',
    descFa: 'بیداد از مشهورترین گوشه‌های همایون است که با تکیه بر درجه پنجم گام اجرا می‌شود و سوز و گداز عاطفی پرشوری به ساختار همایون می‌افزاید.',
    descEn: 'Bidad is one of the most celebrated goushehs in Homayoun, resting on the 5th degree to impart poignant emotional drama.',
    tagFa: 'گوشه‌شناسی',
    tagEn: 'Gousheh',
    icon: '🔥'
  },
  {
    id: 9,
    category: 'dastgah',
    titleFa: 'دستگاه نوا؛ آرامش خردورزانه',
    titleEn: 'Nava: Contemplative Serenity',
    descFa: 'دستگاه نوا از پیوند دو دانگ شور و نوا شکل می‌گیرد؛ نغمه مشترک میان دو دانگ، نت شاهد است. نت ایست روی درجه هفتم (پیش از شاهد) و خاتمه روی درجه ششم قرار دارد و حسی آرام و متفکرانه می‌آفریند.',
    descEn: 'Dastgah Nava is formed by conjoining Shur and Nava tetrachords; the common note serves as Shahed, with cadence (Ist) resting on the 7th and finalis on the 6th, evoking tranquility.',
    tagFa: 'نوا',
    tagEn: 'Nava',
    icon: '🌙'
  },
  {
    id: 10,
    category: 'dastgah',
    titleFa: 'راست‌پنجگاه؛ هنر مرکب‌خوانی جامع',
    titleEn: 'Rast-Panjgah: Master of Modulation',
    descFa: 'راست‌پنجگاه اقیانوس ردیف است؛ این دستگاه به گونه‌ای مهندسی شده که نوازنده می‌تواند از طریق گوشه‌های آن به تمامی ۶ دستگاه دیگر سفر کند و مجدداً بازگردد.',
    descEn: 'Rast-Panjgah is the pinnacle of Persian modulation, allowing skilled musicians to weave pathways into all other six Dastgahs before returning home.',
    tagFa: 'راست‌پنجگاه',
    tagEn: 'Rast-Panjgah',
    icon: '🧭'
  },
  {
    id: 11,
    category: 'dastgah',
    titleFa: 'تفاوت نت شاهد و نت ایست',
    titleEn: 'Shahed vs. Ist Notes',
    descFa: 'نت شاهد (Shahed) محوری‌ترین نت در چرخش ملودی و دارای بیشترین تأکید است، در حالی که نت ایست (Ist) نتی است که جملات روی آن مکث و توقف موقت یا نهایی می‌کنند.',
    descEn: 'The Shahed is the focal note around which melodies revolve, whereas the Ist is the resting cadence note where musical phrases pause or resolve.',
    tagFa: 'تئوری ردیف',
    tagEn: 'Theory',
    icon: '🎯'
  },
  {
    id: 12,
    category: 'dastgah',
    titleFa: 'گوشه‌های اوج و فرود',
    titleEn: 'Owj & Forood Goushehs',
    descFa: 'گوشه‌های اوج ملودی را به منطقه صوتی اکتاو بالاتر می‌برند (مانند عشاق یا مغلوب) و فرودها، ملودی را با استادی به مایه اصلی دستگاه هدایت می‌کنند.',
    descEn: 'Owj goushehs push the melodic register into higher octaves (like Oshagh or Maghloob), while Forood phrases resolve skillfully back to the tonic.',
    tagFa: 'گوشه‌شناسی',
    tagEn: 'Gousheh',
    icon: '🌊'
  },
  {
    id: 121,
    category: 'dastgah',
    titleFa: 'مفهوم دستگاه: چرخه‌های چندمُدی (رساله دکتر اسعدی)',
    titleEn: 'Dastgah as Multi-Modal Cycle (Dr. Asadi Thesis)',
    descFa: 'بر مبنای رساله دکتری هومان اسعدی (۱۳۸۵)، دستگاه یک نظام انتزاعی تک‌مقام نیست، بلکه یک سیکل یا چرخه چندمُدی است که از مُد مبنا (درآمد) آغاز شده و با عبور از مُدهای اولیه، ثانویه یا انتقالی در نهایت با فرود به مُد مبنا بازمی‌گردد.',
    descEn: 'According to Dr. Hooman Asadi’s doctoral dissertation (2006), a Dastgah is not a static single maqam, but an integrated multi-modal cycle that originates in the base mode (Daramad), navigates secondary, initial, and transitional modes, and ultimately resolves home via formal cadences.',
    tagFa: 'رساله اسعدی',
    tagEn: 'Asadi Thesis',
    icon: '📜'
  },
  {
    id: 122,
    category: 'dastgah',
    titleFa: 'سیکلهای همگن و ناهمگن در دستگاه‌ها',
    titleEn: 'Homogeneous & Heterogeneous Cycles',
    descFa: 'در طبقه‌بندی دکتر اسعدی، چرخه‌هایی مانند شور، چهارگاه، سه‌گاه و نوا که بر دانگ‌های متجانس بنا شده‌اند «سیکل همگن» هستند. در مقابل، ماهور، همایون و راست‌پنجگاه به دلیل تنوع دانگ‌ها و ترکیب‌های متناوب «سیکل ناهمگن» شناخته می‌شوند.',
    descEn: 'In Dr. Asadi’s structural framework, modal cycles built on uniform tetrachords (Shur, Chahargah, Segah, Nava) are homogeneous, whereas cycles combining diverse tetrachord species (Mahur, Homayoun, Rast-Panjgah) represent heterogeneous cycles.',
    tagFa: 'ساختارشناسی مُدال',
    tagEn: 'Modal Taxonomy',
    icon: '⚖️'
  },
  {
    id: 123,
    category: 'dastgah',
    titleFa: 'پنج دانگ اصلی موسیقی کلاسیک ایران',
    titleEn: 'The Five Primary Tetrachords',
    descFa: 'بر اساس رساله اسعدی، بستر نغمگی دستگاه‌ها از پنج دانگ پایه شکل می‌گیرد: دانگ ماهور (ط ط ب)، دانگ دشتی/نوا (ط ب ط)، دانگ چهارگاه (جـ هـ ب)، دانگ شور (جـ جـ ط) و دانگ مخالف (جـ ط جـ).',
    descEn: 'Dr. Asadi formulates Persian classical modality around five primary tetrachords: Mahur (T-T-S), Dashti/Nava (T-S-T), Chahargah (m-T+-S), Shur (m-m-T), and Mokhalef (m-T-m).',
    tagFa: 'دانگ‌شناسی',
    tagEn: 'Tetrachords',
    icon: '🎼'
  },
  {
    id: 124,
    category: 'dastgah',
    titleFa: 'گوشه‌های ثابت و فیگورهای سیار در ردیف',
    titleEn: 'Fixed Modal Goushehs vs. Mobile Figures',
    descFa: 'ردیف از دو لایه تشکیل شده است: زیرساخت مُدال (گوشه‌های ثابت مانند درآمد، زابل، حصار و مخالف) و روساخت الحانی (فیگورهای سیارِ عروضی و ریتمیک مانند کرشمه، چهارپاره، زنگوله، بسته‌نگار و حزین) که در دستگاه‌های گوناگون جامه‌های مُدال مختلف بر تن می‌کنند.',
    descEn: 'The Radif comprises two foundational tiers: the modal substructure (fixed goushehs like Daramad, Zabol, Hesar, Mokhalef) and the melodic superstructure (mobile metric/prosodic figures like Kereshmeh, Chahar-Pareh, Zangouleh, Basteh-Negar, and Hazin) which adopt the modal mantle of whichever zone they inhabit.',
    tagFa: 'فلسفه ردیف',
    tagEn: 'Radif Theory',
    icon: '✨'
  },

  // --- 2. Theory & Intervals ---
  {
    id: 13,
    category: 'theory',
    titleFa: 'تقسیم‌بندی ۲۴ قسمتی وزیری',
    titleEn: 'Vaziri 24-TET Division',
    descFa: 'کلنل علینقی وزیری اکتاو را به ۲۴ ربع‌پرده مساوی تقسیم کرد تا علامت‌های سری و کرن بتوانند مبنای آموزش آکادمیک و سیستماتیک موسیقی ایران شوند.',
    descEn: 'Colonel Alinaqi Vaziri divided the octave into 24 equal quarter-tones, giving mathematical grounding and modern notation to Sori and Koron microtones.',
    tagFa: 'تئوری وزیری',
    tagEn: 'Vaziri Theory',
    icon: '📐'
  },
  {
    id: 14,
    category: 'theory',
    titleFa: 'تفاوت کُرن و سُری',
    titleEn: 'Koron vs. Sori',
    descFa: 'کُرُن (Koron) یک نت را تقریباً ربع‌پرده (حدود ۵۰ سنت) بم‌تر می‌کند، در حالی که سُری (Sori) نت را تقریباً ربع‌پرده زیرتر می‌برد.',
    descEn: 'Koron lowers a pitch by approximately a quarter-tone (~50 cents), whereas Sori raises a pitch by approximately a quarter-tone.',
    tagFa: 'ریزپرده‌ها',
    tagEn: 'Microtones',
    icon: '🎼'
  },
  {
    id: 15,
    category: 'theory',
    titleFa: 'دانگ‌های پیوسته در برابر منفصل',
    titleEn: 'Conjoined vs. Disjunct Tetrachords',
    descFa: 'اگر دو دانگ دارای یک نت مشترک باشند (مانند شور)، «پیوسته» نامیده می‌شوند. اگر بین دو دانگ یک فاصله طنینی (۴ ربع‌پرده) فاصله باشد، «منفصل» هستند (مانند چهارگاه).',
    descEn: 'When two tetrachords share a common pivot note (as in Shur), they are Conjoined. When separated by a whole tone (as in Chahargah), they are Disjunct.',
    tagFa: 'دانگ‌ها',
    tagEn: 'Tetrachords',
    icon: '🔗'
  },
  {
    id: 16,
    category: 'theory',
    titleFa: 'فواصل طنینی، مجنب و بقیه',
    titleEn: 'Tanini, Mojannab & Baqiyyeh',
    descFa: 'در موسیقی کهن ایران، فواصل به نام‌های طنینی (پرده کامل = ۴ ربع‌پرده)، مجنب (پرده کوچک = ۳ ربع‌پرده) و بقیه (نیم‌پرده = ۲ ربع‌پرده) نام‌گذاری می‌شدند.',
    descEn: 'Classical Persian music classified intervals as Tanini (whole tone = 4 quarter-tones), Mojannab (neutral tone = 3 quarter-tones), and Baqiyyeh (semitone = 2).',
    tagFa: 'فواصل کهن',
    tagEn: 'Intervals',
    icon: '📜'
  },
  {
    id: 17,
    category: 'theory',
    titleFa: 'سرکلید و راحتی نت‌نویسی',
    titleEn: 'Key Signatures in Persian Music',
    descFa: 'سرکلید مشخص می‌کند چه نت‌هایی در طول گام دارای دیز، بمل، کرن یا سری هستند. با دانستن سرکلید، نیازی به قرار دادن علامت‌های مکرر در متن قطعه نیست.',
    descEn: 'Key signatures specify permanent microtonal accidentals for the entire piece, eliminating the need to write redundant accidentals before every note.',
    tagFa: 'نت‌نویسی',
    tagEn: 'Notation',
    icon: '🎼'
  },
  {
    id: 18,
    category: 'theory',
    titleFa: 'چرا فرکانس لا ۴۴۰ هرتز مرجع است؟',
    titleEn: 'Why A4 = 440 Hz Reference?',
    descFa: 'فرکانس نت لا (A4) برابر ۴۴۰ هرتز به عنوان استاندارد بین‌المللی پذیرفته شده است. کُرنوسُری تمامی ربع‌پرده‌ها را با فرکانس‌های دقیق فیزیکی بر این مبنا محاسبه می‌کند.',
    descEn: 'A4 = 440 Hz is the worldwide tuning benchmark. Koronosori derives all 24 quarter-tone frequencies mathematically using this scientific anchor.',
    tagFa: 'فیزیک صوت',
    tagEn: 'Acoustics',
    icon: '🔊'
  },
  {
    id: 19,
    category: 'theory',
    titleFa: 'انتقال (ترانسپوز) در دستگاه‌ها',
    titleEn: 'Transposing Persian Scales',
    descFa: 'هر دستگاه می‌تواند از هر نت پایه‌ای آغاز شود. برای مثال شور می‌تواند بر پایه «سل»، «لا»، «ر» یا حتی «می کُرن» اجرا شود؛ نسبت فواصل همیشه ثابت می‌ماند.',
    descEn: 'Persian scales can be rooted on any pitch. Shur can start on Sol, La, Re, or Mi-koron; the relative interval spacing remains mathematically identical.',
    tagFa: 'انتقال گام',
    tagEn: 'Transposition',
    icon: '🔄'
  },
  {
    id: 20,
    category: 'theory',
    titleFa: 'کشش زیبایی‌شناسانه ریزپرده‌ها',
    titleEn: 'Microtonal Flexibility in Performance',
    descFa: 'گرچه در تئوری وزیری ربع‌پرده‌ها ۲۴ قسمت مساوی هستند، اما در عمل و سینه به سینه، اساتید برخی ربع‌پرده‌ها را بر اساس حس زیبایی‌شناسی کمی زیرتر یا بم‌تر اجرا می‌کنند.',
    descEn: 'While Vaziri standardized quarter-tones to equal temperament, traditional masters intuitively shade microtones slightly sharper or flatter for expressive flavor.',
    tagFa: 'اجرای عملی',
    tagEn: 'Nuances',
    icon: '🎭'
  },

  // --- 3. App Shortcuts & Pro Features ---
  {
    id: 21,
    category: 'shortcuts',
    titleFa: 'پخش پیوسته با دکمه Loop',
    titleEn: 'Continuous Scale Loop Playback',
    descFa: 'با فشردن دکمه لوپ (تکرار) در کنار پخش، توالی نت‌های دستگاه بارها پشت سر هم نواخته می‌شود تا ذهن و گوش شما با فواصل آن کاملاً مانوس شود.',
    descEn: 'Press the Loop button next to Play to continuously repeat scale degrees, helping your ear internalize microtonal steps intuitively.',
    tagFa: 'شنیداری',
    tagEn: 'Audio',
    icon: '🔁'
  },
  {
    id: 22,
    category: 'shortcuts',
    titleFa: 'نواختن زنده با کیبورد کامپیوتر',
    titleEn: 'Live Keyboard Playability',
    descFa: 'در نسخه وب و لپ‌تاپ، کلیدهای کیبورد شما به کلاویه‌های پیانوی کُرنوسُری متصل هستند؛ می‌توانید بدون ماوس و مستقیماً نغمه‌ها را بنوازید.',
    descEn: 'On desktop browsers, your physical keyboard keys trigger the microtonal piano keys directly, allowing fast and fluid acoustic experimentation.',
    tagFa: 'کلاویه',
    tagEn: 'Keyboard',
    icon: '🎹'
  },
  {
    id: 23,
    category: 'shortcuts',
    titleFa: 'کپی سریع تمام اطلاعات دستگاه',
    titleEn: 'One-Click Scale Copying',
    descFa: 'با کلیک روی آیکون کپی در بالای کارت دستگاه، نام دستگاه، سرکلید و ترتیب کامل درجات فوراً در کلیپ‌بورد کپی می‌شود تا در یادداشت‌های خود ذخیره کنید.',
    descEn: 'Click the copy icon on any scale card to instantly copy the scale title, key signature, and all note degrees directly to your clipboard.',
    tagFa: 'کلیپ‌بورد',
    tagEn: 'Clipboard',
    icon: '📋'
  },
  {
    id: 24,
    category: 'shortcuts',
    titleFa: 'ستاره‌دار کردن و یادداشت شخصی',
    titleEn: 'Favorites & Personal Notes',
    descFa: 'با زدن ستاره روی هر گام، آن را به برگه «نشان‌شده‌ها» اضافه کنید. در آنجا می‌توانید یادداشت‌های اختصاصی خود (مثل کوک ساز یا نام قطعه) را ثبت کنید.',
    descEn: 'Star any scale to save it to your Favorites tab. You can attach personal practice notes, instrument tunings, or repertoire references.',
    tagFa: 'شخصی‌سازی',
    tagEn: 'Notes',
    icon: '⭐'
  },
  {
    id: 25,
    category: 'shortcuts',
    titleFa: 'تپ تمپو (Tap Tempo) در مترونوم',
    titleEn: 'Tap Tempo in Metronome',
    descFa: 'هنگام گوش دادن به یک آهنگ، با ریتم آن چند بار پشت‌سرهم روی دکمه TAP بزنید؛ مترونوم سرعت دقیق آهنگ را بر حسب BPM محاسبه و تنظیم می‌کند.',
    descEn: 'Tap the TAP button in sync with any music you hear; the metronome automatically computes the exact BPM tempo on the fly.',
    tagFa: 'مترونوم',
    tagEn: 'Metronome',
    icon: '⏱️'
  },
  {
    id: 26,
    category: 'shortcuts',
    titleFa: 'ضرب‌های لنگ ۵/۸ و ۷/۸ در مترونوم',
    titleEn: 'Odd Meters (5/8 & 7/8) in Metronome',
    descFa: 'برای تمرین قطعات ریتمیک اصیل ایرانی (مانند تصنیف‌های قدیمی و قطعات لنگ)، در مترونوم میزان‌نماهای ۵/۸، ۷/۸ و ۶/۸ سنگین تعبیه شده است.',
    descEn: 'For traditional Iranian complex rhythms and dance forms, use the dedicated 5/8, 7/8, and 6/8 meter presets with crisp first-beat accents.',
    tagFa: 'ریتم',
    tagEn: 'Rhythm',
    icon: '🥁'
  },
  {
    id: 27,
    category: 'shortcuts',
    titleFa: 'تغییر سیستم نت‌نویسی (دو ر می به C D E)',
    titleEn: 'Do-Re-Mi to C-D-E Notation Switch',
    descFa: 'با فشردن دکمه نت در هدر بالای صفحه، می‌توانید کل سیستم نام‌گذاری نت‌ها را بین سیستم سولفژ هجایی و الفبای لاتین جابه‌جا کنید.',
    descEn: 'Toggle the note notation button in the top header to seamlessly switch between Solfege (Do-Re-Mi) and English Alphabet (C-D-E).',
    tagFa: 'هدر',
    tagEn: 'Header',
    icon: '🔤'
  },
  {
    id: 28,
    category: 'shortcuts',
    titleFa: 'رنگ‌بندی هوشمند کارت دستگاه‌ها',
    titleEn: 'Color-Coded Scale Cards',
    descFa: 'هر دستگاه رنگ اختصاصی ملایمی دارد (شور سرخ‌فام، سه‌گاه کهربایی، چهارگاه زمردی، ماهور فیروزه‌ای و...) تا در یک نگاه دستگاه را تشخیص دهید.',
    descEn: 'Each Dastgah is highlighted with its own distinctive aesthetic hue (Shur in rose, Segah in amber, Chahargah in emerald, Mahur in sky blue).',
    tagFa: 'رابط کاربری',
    tagEn: 'UI',
    icon: '🎨'
  },
  {
    id: 29,
    category: 'shortcuts',
    titleFa: 'حالت روز و شب هماهنگ با نور محیط',
    titleEn: 'Dark & Light Mode for Eye Comfort',
    descFa: 'دکمه ماه و خورشید در هدر به شما اجازه می‌دهد در تاریکی شب با پس‌زمینه تیره بدون خستگی چشم به تمرین نت‌ها و مترونوم بپردازید.',
    descEn: 'Toggle Dark Mode via the header moon icon during evening practice sessions to eliminate eye strain and maximize battery efficiency.',
    tagFa: 'تم',
    tagEn: 'Theme',
    icon: '🌓'
  },
  {
    id: 30,
    category: 'shortcuts',
    titleFa: 'کلیک روی تک‌تک کلیدهای پیانو',
    titleEn: 'Interactive Microtonal Keys',
    descFa: 'کلاویه‌های پیانوی کُرنوسُری تنها جنبه نمایشی ندارند؛ با تپ یا کلیک روی هر کلاویه، صدای فرکانس واقعی آن نت را به‌صورت مستقل می‌شنوید.',
    descEn: 'The on-screen piano keys are fully interactive; tapping or clicking any key immediately synthesizes its standalone microtonal pitch.',
    tagFa: 'صدا',
    tagEn: 'Audio',
    icon: '🔊'
  },

  // --- 4. Practice & Performance ---
  {
    id: 31,
    category: 'performance',
    titleFa: 'کوک پایه تار و سه‌تار برای ماهور و راست‌‌پنجگاه',
    titleEn: 'Tar & Setar Tuning for Mahur',
    descFa: 'کوک کلاسیک «دو - سل - دو - دو» (C - G - C - C) مناسب‌ترین کوک تار و سه‌تار برای اجرای دستگاه ماهور و راست‌پنجگاه در پایه دو است.',
    descEn: 'The classic C - G - C - C tuning for Tar and Setar is the primary tuning to execute Mahur and Rast-Panjgah rooted on Do.',
    tagFa: 'کوک ساز',
    tagEn: 'Tuning',
    icon: '🪕'
  },
  {
    id: 32,
    category: 'performance',
    titleFa: 'کوک تار و سه‌تار برای شور و چهارگاه',
    titleEn: 'Tar & Setar Tuning for Shur & Chahargah',
    descFa: 'کوک «دو - سل - ر - ر» (C - G - D - D) یا «دو - فا - دو - دو» بیشترین رزونانس و طنین را در اجرای دستگاه شور، ابوعطا و چهارگاه به همراه دارد.',
    descEn: 'The C - G - D - D tuning provides optimal acoustic resonance and open-string harmonics for Shur, Abuata, and Chahargah.',
    tagFa: 'کوک ساز',
    tagEn: 'Tuning',
    icon: '🪕'
  },
  {
    id: 33,
    category: 'performance',
    titleFa: 'تمرین با مترونوم در تمپوی پایین',
    titleEn: 'Slow Tempo Metronome Practice',
    descFa: 'برای تسلط بر ریزپرده‌ها و دقت انگشت‌گذاری، ابتدا قطعات را با تمپوی ۵۰ تا ۶۰ تمرین کنید. سرعت بالا زمانی زیباست که فواصل ربع‌پرده تمیز و بی‌نقص باشند.',
    descEn: 'Master microtonal intonation by practicing at 50 to 60 BPM first. Velocity shines only when microtones are acoustically pure.',
    tagFa: 'تمرین',
    tagEn: 'Practice',
    icon: '🎯'
  },
  {
    id: 34,
    category: 'performance',
    titleFa: 'تثبیت ذهنی صدای کُرن قبل از مضراب‌زدن',
    titleEn: 'Audiation Before Playing Microtones',
    descFa: 'پیش از اینکه انگشت خود را روی پرده کُرُن بگذارید، صدای آن را در ذهن خود بشنوید یا زمزمه کنید. این مهارت «تصویرسازی شنیداری» کوک شما را دقیق‌تر می‌کند.',
    descEn: 'Hear the Koron pitch in your mind before pressing the fret or bowing the string. Inner audiation prevents flat or sharp microtonal drift.',
    tagFa: 'گوش موسیقی',
    tagEn: 'Ear Training',
    icon: '🧠'
  },
  {
    id: 35,
    category: 'performance',
    titleFa: 'سنتور سل‌کوک و دستگاه‌ها',
    titleEn: 'Sol-Kook Santur Characteristics',
    descFa: 'سنتور سل‌کوک استانداردترین سنتور برای اجرای ردیف است. با تغییر کوک خَرَک‌های ۳ و ۴ در سیم‌های سفید و زرد می‌توان دستگاه‌ها را عوض کرد.',
    descEn: 'The Sol-Kook Santur is the gold standard for Persian Radif. Moving or tuning bridges 3 and 4 switches between Shur, Segah, and Homayoun scales.',
    tagFa: 'سنتور',
    tagEn: 'Santur',
    icon: '🎼'
  },
  {
    id: 36,
    category: 'performance',
    titleFa: 'کمانچه و روانی فواصل فرت‌لس (بدون پرده)',
    titleEn: 'Kamancheh Fretless Intonation',
    descFa: 'کمانچه به دلیل نداشتن پرده، توانایی خارق‌العاده‌ای در اجرای لغزش‌های میکروتونال (گلیساندو) و کوک دقیق ربع‌پرده‌های متغیر در طول سیر قطعه دارد.',
    descEn: 'Lacking frets, the Kamancheh offers supreme control over microtonal glissandos and delicate pitch-bending on variable notes.',
    tagFa: 'کمانچه',
    tagEn: 'Kamancheh',
    icon: '🎻'
  },
  {
    id: 37,
    category: 'performance',
    titleFa: 'نی هفت‌بند و گردش زاویه لب',
    titleEn: 'Ney & Embouchure Nuances',
    descFa: 'نوازنده نی با چرخش ظریف سر ساز در دهان و تغییر زاویه دمیدن، می‌تواند فواصل کُرن و سُری را با خلوص کامل تنظیم کند.',
    descEn: 'A Ney flutist subtly alters embouchure angle and blowing velocity to calibrate exact Koron and Sori fractions seamlessly.',
    tagFa: 'ساز نی',
    tagEn: 'Ney',
    icon: '🎋'
  },
  {
    id: 38,
    category: 'performance',
    titleFa: 'تأکید بر ضرب اول در میزان‌های لنگ',
    titleEn: 'Downbeat Accents in Odd Meters',
    descFa: 'در قطعات ریتمیک ۵/۸ (۲+۳ یا ۳+۲)، تکیه صدای زنگ مترونوم روی ضرب اول، مانع از افتادن یا جلو افتادن دست شما در پاساژهای سرعتی می‌شود.',
    descEn: 'In asymmetric meters like 5/8 (2+3 or 3+2), the metronome bell accent on beat 1 anchors your inner pulse during fast passages.',
    tagFa: 'ریتم',
    tagEn: 'Rhythm',
    icon: '🔔'
  },
  {
    id: 39,
    category: 'performance',
    titleFa: 'اهمیت گوشه‌های فرود',
    titleEn: 'The Art of Forood Resolution',
    descFa: 'در بداهه‌نوازی، فرود تمیز و بازگشت شکیل به نت پایه، معیار تسلط هنرجو است. قبل از شروع اوج، همیشه مسیر فرود را در ذهن خود مرور کنید.',
    descEn: 'A tasteful Forood cadence confirming the tonic proves a musician’s mastery. Always conceptualize your descent before soaring into climaxes.',
    tagFa: 'ردیف',
    tagEn: 'Radif',
    icon: '🏁'
  },
  {
    id: 40,
    category: 'performance',
    titleFa: 'نظم در جلسات روزانه تمرین',
    titleEn: 'Consistency Over Long Sessions',
    descFa: '۳۰ دقیقه تمرین متمرکز و روزانه همراه با مترونوم و دقت در فواصل، بسیار موثرتر از چندین ساعت تمرین پراکنده در پایان هفته است.',
    descEn: '30 minutes of disciplined daily practice with a metronome produces far superior neurological muscle memory than marathon weekend sessions.',
    tagFa: 'روش تمرین',
    tagEn: 'Discipline',
    icon: '⏰'
  }
];
