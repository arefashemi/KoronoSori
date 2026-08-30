import React from 'react';
import { motion } from 'motion/react';
import { TRANSLATIONS } from '../constants';

interface VaziriModalProps {
  lang: 'fa' | 'en';
  onBack: () => void;
}

export const VaziriModal: React.FC<VaziriModalProps> = ({ lang, onBack }) => {
  const t = TRANSLATIONS[lang];

  return (
    <motion.div
      key="vaziri"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white dark:bg-gray-900 p-5 sm:p-7 rounded-[2.5rem] shadow-xl space-y-5 border border-gray-100 dark:border-gray-800 flex flex-col relative overflow-hidden"
    >
      {/* Header Title */}
      <div className="text-center space-y-1 shrink-0 pt-1">
        <h2 className="text-2xl font-black text-brand-dark dark:text-white">
          {t.vaziriTitle}
        </h2>
        <p className="text-[11px] font-bold text-brand-dark/50 dark:text-gray-400 font-mono">
          {lang === 'fa' ? '۱۲۶۵ – ۱۳۵۸ خورشیدی' : '1887 – 1979'}
        </p>
      </div>

      {/* Main Rich Content Section */}
      <div className="space-y-4">
        {lang === 'fa' ? (
          <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-brand-dark/85 dark:text-gray-200 text-justify font-normal">
            
            {/* Intro statement */}
            <div className="p-4 bg-brand-lime/10 dark:bg-lime-950/30 rounded-2xl border border-brand-lime/30 text-brand-dark dark:text-lime-200">
              <p className="font-semibold">
                <strong className="font-black text-brand-dark dark:text-white">کلنل علینقی وزیری</strong> (۱۲۶۵–۱۳۵۸) را بنیانگذار تحول نوین و آکادمیک در موسیقی ایرانی می‌دانند. او نخستین موسیقی‌دان ایرانی بود که با تحصیلات رسمی در اروپا (فرانسه و آلمان)، تئوری موسیقی غربی را با ساختار موسیقی سنتی ایران پیوند زد و آن را از حالت شفاهی و «سینه به سینه» به یک ساختار مدون و علمی تبدیل کرد.
              </p>
              <p className="mt-2 text-xs opacity-90">
                تحولات و اقدامات او از منظر <strong className="font-black">تئوری و دانش تخصصی موسیقی</strong> در چند محور اصلی خلاصه می‌شود:
              </p>
            </div>

            {/* Pillar 1 */}
            <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-2xl border border-brand-dark/10 dark:border-white/10 space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-brand-dark dark:text-white font-black text-sm sm:text-base border-b border-brand-dark/10 dark:border-white/10 pb-1.5">
                <span className="w-6 h-6 rounded-lg bg-brand-dark text-white dark:bg-white dark:text-brand-dark flex items-center justify-center text-xs font-mono">۱</span>
                <h4>تئوری‌پردازی و ساختارشناسی فواصل (تئوری ربع‌پـرده)</h4>
              </div>
              <p className="text-xs text-brand-dark/70 dark:text-gray-400">
                پیش از وزیری، فواصل موسیقی ایرانی (مانند سری و کرن) اندازه‌گیری دقیق و مبنای ریاضی مدونی در شیوه‌های آموزش عمومی نداشتند.
              </p>
              <ul className="space-y-2 list-disc list-inside text-xs sm:text-[13px] pr-1">
                <li>
                  <strong>تقسیم گام به ۲۴ ربع‌پرده مساوی:</strong> وزیری با اقتباس از اعتدال مساوی (Equal Temperament) در موسیقی غربی، گام موسیقی ایرانی را به ۲۴ فاصلهٔ ربع‌پرده‌ای مساوی تقسیم کرد.
                </li>
                <li>
                  <strong>علامت‌های عرضی اختصاصی:</strong> او دو علامت <strong>سُری</strong> و <strong>کُرُن</strong> را ابداع نمود که تا امروز در نت‌نویسی دستگاهی ایران استاندارد است.
                </li>
              </ul>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-2xl border border-brand-dark/10 dark:border-white/10 space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-brand-dark dark:text-white font-black text-sm sm:text-base border-b border-brand-dark/10 dark:border-white/10 pb-1.5">
                <span className="w-6 h-6 rounded-lg bg-brand-dark text-white dark:bg-white dark:text-brand-dark flex items-center justify-center text-xs font-mono">۲</span>
                <h4>نت‌نویسی و خطِ خطابیِ مدون</h4>
              </div>
              <ul className="space-y-2 list-disc list-inside text-xs sm:text-[13px] pr-1">
                <li>
                  <strong>مکتوب‌سازی ردیف:</strong> او نخستین کسی بود که ردیف موسیقی ایرانی را به خط نت استاندارد (پنج خط حامل) درآورد و آن را از انحصار آموزش‌های مِتُد شفاهی خارج کرد.
                </li>
                <li>
                  <strong>نگارش متدهای آموزشی:</strong> کتاب‌های متدولوژی او از جمله <em>دستور تار</em>، <em>دستور ویولن</em> و کتاب جامع <em>موسیقی نظری</em>، بنیان‌های خط‌پذیری و آموزش تکنیکال سازهای ایرانی را شکل دادند.
                </li>
              </ul>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-2xl border border-brand-dark/10 dark:border-white/10 space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-brand-dark dark:text-white font-black text-sm sm:text-base border-b border-brand-dark/10 dark:border-white/10 pb-1.5">
                <span className="w-6 h-6 rounded-lg bg-brand-dark text-white dark:bg-white dark:text-brand-dark flex items-center justify-center text-xs font-mono">۳</span>
                <h4>ورود هارمونی و چندصدایی (Polyphony) به موسیقی ایران</h4>
              </div>
              <p className="text-xs text-brand-dark/70 dark:text-gray-400">
                موسیقی سنتی ایران تاریخی تماماً تک‌صدایی (Monophonic) داشت. وزیری با تکیه بر دانش خود در <strong>آکوردشناسی و کنترپوان</strong>، زمینه‌ساز ورود چندصدایی به اجرای ارکستری آثار ایرانی شد:
              </p>
              <ul className="space-y-2 list-disc list-inside text-xs sm:text-[13px] pr-1">
                <li>
                  <strong>ارکستراسیون و فرم:</strong> او فرم‌های غربی (مانند سمفونی، والس و مارش) را با تم‌ها و مایه‌های ایرانی ترکیب کرد و قطعاتی برای اجرای چندصدایی توسط سازهای ایرانی و غربی تنظیم نمود.
                </li>
                <li>
                  <strong>کتاب «آرمنی (هارمونی) موسیقی ایران»:</strong> او تلاش کرد قواعدی برای چندصدایی کردن نغمه‌های ایرانی بر پایه مدسازی و خصوصیات دستگاه‌ها تدوین کند.
                </li>
              </ul>
            </div>

            {/* Pillar 4 */}
            <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-2xl border border-brand-dark/10 dark:border-white/10 space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-brand-dark dark:text-white font-black text-sm sm:text-base border-b border-brand-dark/10 dark:border-white/10 pb-1.5">
                <span className="w-6 h-6 rounded-lg bg-brand-dark text-white dark:bg-white dark:text-brand-dark flex items-center justify-center text-xs font-mono">۴</span>
                <h4>نهادسازی آموزشی و ساختاری</h4>
              </div>
              <ul className="space-y-2 list-disc list-inside text-xs sm:text-[13px] pr-1">
                <li>
                  <strong>تأسیس مدرسه عالی موسیقی (۱۳۰۲):</strong> او پایه‌گذار نخستین نهاد آکادمیک آموزش موسیقی در ایران بود که در آن دروس تئوری، سلفژ، هارمونی، نت‌نویسی و نوازندگی به‌صورت ساختاریافته تدریس می‌شد. شاگردان برجسته‌ای چون <strong>روح‌الله خالقی</strong> و <strong>ابوالحسن صبا</strong> در این مکتب پرورش یافتند.
                </li>
                <li>
                  <strong>تأسیس ارکستر و کلوپ موزیکال:</strong> ایجاد فرم‌های ارکستری بزرگ و برگزاری کنسرت‌های قانونمند با پارتیتورهای مشخص از دیگر اقدامات اجرایی او بود.
                </li>
              </ul>
            </div>

            {/* Scientific Criticism */}
            <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-200 space-y-1.5">
              <h4 className="font-black text-xs sm:text-sm flex items-center gap-1.5">
                <span>💡</span>
                <span>نقدها و نگاه علمی به کارنامه او</span>
              </h4>
              <p className="text-xs leading-relaxed opacity-90 text-justify">
                اگرچه ابداعات وزیری (به‌ویژه نظریه ۲۴ ربع‌پرده مساوی) بعدها توسط برخی پژوهشگران و موسیقی‌دانان (نظیر دکتر داریوش صفوت و مهدی برکشلی) از نظر تطبیق دقیق با فواصل واقعی ردیف و «شور» یا «سه‌گاه» مورد نقد قرار گرفت، اما همه صاحب‌نظران متفق‌القولند که <strong>جهش ساختاری، آکادمیک‌شدن و ماندگاری خطی موسیقی ایرانی</strong> مدیون نگاه علمی و سنت‌شکنی کلنل علینقی وزیری است.
              </p>
            </div>

            {/* Dedication Callout Box (باکس سبز لیمویی تقدیم به روح بزرگ ایشان) */}
            <div className="p-4 sm:p-5 bg-brand-lime/25 dark:bg-lime-950/40 rounded-2xl border border-brand-lime/50 dark:border-lime-500/30 text-brand-dark dark:text-lime-100 space-y-1 shadow-sm">
              <p className="text-xs sm:text-sm leading-relaxed font-semibold text-justify">
                این برنامه که کوشیده است تا همانند این استاد بزرگ، با درآمیختن علم روز و موسیقی اصیل ایرانی، پیوندی میان این دو باشد، پیشکشی است به روح بلند ایشان.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-brand-dark/85 dark:text-gray-200 text-justify font-normal">
            
            {/* Intro statement */}
            <div className="p-4 bg-brand-lime/10 dark:bg-lime-950/30 rounded-2xl border border-brand-lime/30 text-brand-dark dark:text-lime-200">
              <p className="font-semibold">
                <strong className="font-black text-brand-dark dark:text-white">Colonel Alinaqi Vaziri</strong> (1887–1979) is recognized as the pioneer of modern academic transformation in Iranian music. He was the first Iranian musician with formal conservatory education in Europe (France and Germany) who bridged Western music theory with traditional Iranian music, transforming it from an oral tradition into a codified and scientific discipline.
              </p>
              <p className="mt-2 text-xs opacity-90">
                His foundational contributions from the perspective of <strong className="font-black">music theory and expertise</strong> are summarized across several key pillars:
              </p>
            </div>

            {/* Pillar 1 */}
            <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-2xl border border-brand-dark/10 dark:border-white/10 space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-brand-dark dark:text-white font-black text-sm sm:text-base border-b border-brand-dark/10 dark:border-white/10 pb-1.5">
                <span className="w-6 h-6 rounded-lg bg-brand-dark text-white dark:bg-white dark:text-brand-dark flex items-center justify-center text-xs font-mono">1</span>
                <h4>Interval Theory & Structuring (Quarter-Tone Theory)</h4>
              </div>
              <p className="text-xs text-brand-dark/70 dark:text-gray-400">
                Prior to Vaziri, Iranian music intervals (such as Sori and Koron) lacked codified mathematical measurements in widespread pedagogy.
              </p>
              <ul className="space-y-2 list-disc list-inside text-xs sm:text-[13px] pl-1">
                <li>
                  <strong>24 Equal Quarter-Tone Division:</strong> Adapting Equal Temperament principles from Western music, Vaziri divided the Iranian musical scale into 24 equal quarter-tone intervals.
                </li>
                <li>
                  <strong>Dedicated Microtonal Accidentals:</strong> He invented two dedicated symbols, <strong>Sori</strong> and <strong>Koron</strong>, which remain the standard in Iranian modal music notation to this day.
                </li>
              </ul>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-2xl border border-brand-dark/10 dark:border-white/10 space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-brand-dark dark:text-white font-black text-sm sm:text-base border-b border-brand-dark/10 dark:border-white/10 pb-1.5">
                <span className="w-6 h-6 rounded-lg bg-brand-dark text-white dark:bg-white dark:text-brand-dark flex items-center justify-center text-xs font-mono">2</span>
                <h4>Codified Music Notation & Pedagogical Methods</h4>
              </div>
              <ul className="space-y-2 list-disc list-inside text-xs sm:text-[13px] pl-1">
                <li>
                  <strong>Transcribing the Radif:</strong> He was the first to transcribe the Iranian Radif onto standard five-line staff notation, liberating it from exclusive oral transmission.
                </li>
                <li>
                  <strong>Pedagogical Method Books:</strong> His landmark books, including <em>Dastoor-e Tar</em>, <em>Dastoor-e Violin</em>, and <em>Theoretical Music</em>, established the foundation for formal instrument technique and notation.
                </li>
              </ul>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-2xl border border-brand-dark/10 dark:border-white/10 space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-brand-dark dark:text-white font-black text-sm sm:text-base border-b border-brand-dark/10 dark:border-white/10 pb-1.5">
                <span className="w-6 h-6 rounded-lg bg-brand-dark text-white dark:bg-white dark:text-brand-dark flex items-center justify-center text-xs font-mono">3</span>
                <h4>Introduction of Harmony and Polyphony into Iranian Music</h4>
              </div>
              <p className="text-xs text-brand-dark/70 dark:text-gray-400">
                Traditional Iranian music was historically entirely monophonic. Drawing on his knowledge of <strong>harmony and counterpoint</strong>, Vaziri paved the way for polyphonic orchestral performances of Iranian compositions:
              </p>
              <ul className="space-y-2 list-disc list-inside text-xs sm:text-[13px] pl-1">
                <li>
                  <strong>Orchestration and Form:</strong> He combined Western classical forms (such as symphonies, waltzes, and marches) with Iranian modal motifs, arranging multi-voiced pieces for traditional and Western instruments.
                </li>
                <li>
                  <strong>Treatise on "Iranian Music Harmony":</strong> He formulated systematic rules for harmonizing Iranian melodies based on modal characteristics of the Dastgahs.
                </li>
              </ul>
            </div>

            {/* Pillar 4 */}
            <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-2xl border border-brand-dark/10 dark:border-white/10 space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-brand-dark dark:text-white font-black text-sm sm:text-base border-b border-brand-dark/10 dark:border-white/10 pb-1.5">
                <span className="w-6 h-6 rounded-lg bg-brand-dark text-white dark:bg-white dark:text-brand-dark flex items-center justify-center text-xs font-mono">4</span>
                <h4>Educational and Institutional Legacy</h4>
              </div>
              <ul className="space-y-2 list-disc list-inside text-xs sm:text-[13px] pl-1">
                <li>
                  <strong>Founding the Tehran Music School (1923):</strong> He founded the first academic music institution in Iran, providing structured curricula in music theory, solfege, harmony, notation, and instrument performance. Eminent masters like <strong>Ruhollah Khaleqi</strong> and <strong>Abolhasan Saba</strong> were nurtured in this academy.
                </li>
                <li>
                  <strong>Founding Orchestras and Musical Clubs:</strong> Establishing large orchestral ensembles and organizing disciplined concerts with codified scores were among his notable initiatives.
                </li>
              </ul>
            </div>

            {/* Scientific Criticism */}
            <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-200 space-y-1.5">
              <h4 className="font-black text-xs sm:text-sm flex items-center gap-1.5">
                <span>💡</span>
                <span>Scholarly Critiques & Academic Perspective</span>
              </h4>
              <p className="text-xs leading-relaxed opacity-90 text-justify">
                Although some of Vaziri’s innovations (particularly the 24 equal quarter-tones model) were later critiqued by musicologists (such as Dr. Dariush Safvat and Mehdi Barkeshli) regarding exact acoustic alignment with traditional Radif intervals, scholars unanimously agree that the <strong>structural breakthrough, academic codification, and preservation of Iranian music</strong> are deeply indebted to Col. Alinaqi Vaziri’s visionary scholarship.
              </p>
            </div>

            {/* Dedication Callout Box */}
            <div className="p-4 sm:p-5 bg-brand-lime/25 dark:bg-lime-950/40 rounded-2xl border border-brand-lime/50 dark:border-lime-500/30 text-brand-dark dark:text-lime-100 space-y-1 shadow-sm">
              <p className="text-xs sm:text-sm leading-relaxed font-semibold text-justify">
                This application, striving like this great master to unite modern science with authentic Iranian music, is humbly dedicated to his noble spirit.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Back Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onBack}
        className="w-full py-4 bg-brand-dark dark:bg-white dark:text-brand-dark text-white rounded-[2rem] font-black text-base transition-all shadow-lg shrink-0 cursor-pointer"
      >
        {t.backBtn}
      </motion.button>
    </motion.div>
  );
};
