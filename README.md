<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>کُرنوسُری (Koronosori) — نمای پرزنتیشن گیت‌هاب</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Vazirmatn', 'system-ui', '-apple-system', 'sans-serif'],
          },
          colors: {
            limeBrand: '#B8F24C',
            limeDeep: '#99DC28',
            studioBg: '#F7F9F5',
            inkDark: '#141812',
          },
          boxShadow: {
            phone: '0 24px 60px -15px rgba(20, 24, 18, 0.16), 0 4px 16px -4px rgba(20, 24, 18, 0.08)',
            cardSoft: '0 10px 30px -10px rgba(20, 24, 18, 0.07)',
            heroGlow: '0 30px 80px -20px rgba(153, 220, 40, 0.25)',
          }
        }
      }
    };
  </script>
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      font-family: 'Vazirmatn', system-ui, -apple-system, sans-serif;
      background-color: #F7F9F5;
      color: #141812;
      margin: 0;
      padding: 0;
      overflow-x: hidden;
    }

    /* Studio grid texture for clean GitHub screenshot framing */
    .studio-grid {
      background-color: #F7F9F5;
      background-image:
        radial-gradient(circle at 12% 10%, rgba(184, 242, 76, 0.22) 0%, transparent 42%),
        radial-gradient(circle at 90% 85%, rgba(184, 242, 76, 0.16) 0%, transparent 45%),
        linear-gradient(to right, rgba(20, 24, 18, 0.035) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(20, 24, 18, 0.035) 1px, transparent 1px);
      background-size: 100% 100%, 100% 100%, 28px 28px, 28px 28px;
    }

    /* Sleek mobile frame styling */
    .phone-bezel {
      background: #141812;
      border-radius: 36px;
      padding: 10px;
      box-shadow: 0 24px 60px -15px rgba(20, 24, 18, 0.22), 0 0 0 1px rgba(255, 255, 255, 0.08) inset;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }

    .phone-bezel:hover {
      transform: translateY(-4px);
      box-shadow: 0 30px 70px -15px rgba(20, 24, 18, 0.28), 0 0 0 1px rgba(184, 242, 76, 0.35) inset;
    }

    .phone-screen {
      background: #F9FBF7;
      border-radius: 27px;
      overflow: hidden;
      position: relative;
    }

    /* Dark preview mode applied selectively to UI previews */
    .preview-dark .phone-screen,
    .preview-dark .feature-card-inner {
      background: #131712;
      color: #F2F5EE;
    }

    .preview-dark .ui-surface {
      background: #1B2019 !important;
      border-color: rgba(255, 255, 255, 0.08) !important;
      color: #F2F5EE !important;
    }

    .preview-dark .ui-muted {
      color: #9BA596 !important;
    }

    /* Custom subtle scrollbars */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #EEF2EA;
    }
    ::-webkit-scrollbar-thumb {
      background: #C5D1B8;
      border-radius: 9999px;
    }
  </style>
</head>
<body class="studio-grid antialiased selection:bg-[#B8F24C] selection:text-[#141812]">

  <!-- Top Utility Bar (For GitHub Screenshot & Preview Controls) -->
  <header class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-3">
    <div class="flex flex-wrap items-center justify-between gap-3 bg-white/90 backdrop-blur border border-[#141812]/10 rounded-2xl px-4 py-3 shadow-sm">
      <div class="flex items-center gap-2.5">
        <span class="inline-flex items-center justify-center w-2.5 h-2.5 rounded-full bg-[#99DC28] ring-4 ring-[#B8F24C]/30"></span>
        <span class="text-xs sm:text-sm font-bold text-[#141812]">نمای گیت‌هاب / آماده اسکرین‌شات</span>
        <span class="hidden sm:inline-block text-xs text-[#555E50] bg-[#F2F6EC] px-2.5 py-0.5 rounded-full border border-[#141812]/8">
          GitHub README Showcase • RTL
        </span>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <!-- Notation mode toggle (Sol / Do-Re-Mi) inside mockups -->
        <button
          id="btn-notation"
          type="button"
          onclick="toggleNotation()"
          class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#F3F6EE] hover:bg-[#E7EEDF] text-[#141812] border border-[#141812]/10 transition cursor-pointer"
          title="تغییر نمایش نت‌ها بین سل/لا و دو/رِ"
        >
          نت‌نویسی: <span id="notation-label" class="font-extrabold text-[#4E7A08]">سل / لا</span>
        </button>

        <!-- Preview light/dark toggle for UI mockups -->
        <button
          id="btn-theme"
          type="button"
          onclick="toggleMockupTheme()"
          class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#141812] hover:bg-[#232A20] text-white transition cursor-pointer flex items-center gap-1.5"
        >
          <span id="theme-icon">🌙</span>
          <span id="theme-label">پیش‌نمایش تیره</span>
        </button>

        <!-- Copy quick GitHub badge snippet -->
        <button
          id="btn-copy-md"
          type="button"
          onclick="copyMarkdownSnippet()"
          class="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#B8F24C] hover:bg-[#A6E635] text-[#141812] transition cursor-pointer flex items-center gap-1.5"
        >
          <span>📋</span>
          <span id="copy-label">کپی تگ README</span>
        </button>
      </div>
    </div>

    <!-- Non-blocking toast banner -->
    <div id="toast-box" class="hidden mt-2 bg-[#141812] text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-xl shadow-md flex items-center justify-between">
      <span id="toast-text">کد Markdown نمایش تصویر در کلیپ‌بورد کپی شد.</span>
      <button type="button" onclick="hideToast()" class="text-[#B8F24C] font-bold text-xs cursor-pointer mr-4">بستن</button>
    </div>
  </header>

  <!-- Main Showcase Container -->
  <main id="showcase-root" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 space-y-8">

    <!-- =====================================================================
         1. HERO / MAIN LANDSCAPE GITHUB SHOWCASE BANNER
         ===================================================================== -->
    <section aria-label="بنر اصلی کُرنوسُری" class="bg-white rounded-[28px] border border-[#141812]/10 shadow-heroGlow overflow-hidden">
      <div class="p-6 sm:p-8 lg:p-10">

        <!-- Top Hero Header Row -->
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-8 border-b border-[#141812]/8">
          <div class="space-y-2.5 max-w-2xl">
            <div class="inline-flex flex-wrap items-center gap-2">
              <span class="px-3 py-1 rounded-full text-xs font-bold bg-[#B8F24C] text-[#141812]">
                موسیقی دستگاهی ایرانی
              </span>
              <span class="px-3 py-1 rounded-full text-xs font-semibold bg-[#F3F6EE] text-[#374132] border border-[#141812]/10">
                بدون تبلیغ • مستقل و رایگان
              </span>
              <span class="px-3 py-1 rounded-full text-xs font-semibold bg-[#F3F6EE] text-[#374132] border border-[#141812]/10">
                FA / EN • سُل / دو-رِ-می
              </span>
            </div>

            <div class="flex flex-wrap items-baseline gap-3">
              <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#141812]">
                کُرنوسُری
              </h1>
              <span class="text-lg sm:text-xl font-bold text-[#5C8B0E] dir-ltr" dir="ltr">
                Koronosori
              </span>
            </div>

            <p class="text-base sm:text-lg font-semibold text-[#2A3126]">
              روایت عدد و نغمه — محاسبه‌گر فواصل، درجات دستگاه‌ها و مترونوم موسیقی ایرانی
            </p>
            <p class="text-xs sm:text-sm text-[#586253] leading-relaxed">
              ابزاری دقیق و آموزشی برای بررسی هفت دستگاه و آواز، سرکلیدها، فواصل ربع‌پرده‌ای (کرُن و سُری)، تمرین ریتمیک با مترونوم چندضربی، نشان‌کردن گام‌ها و آشنایی با میراث علمی کلنل علینقی وزیری.
            </p>
          </div>

          <!-- Right Highlight Pills (Key Metrics) -->
          <div class="grid grid-cols-3 gap-2.5 sm:gap-3 shrink-0">
            <div class="bg-[#F7F9F5] border border-[#141812]/10 rounded-2xl p-3.5 text-center">
              <div class="text-xl sm:text-2xl font-black text-[#141812]">۷+</div>
              <div class="text-[11px] sm:text-xs font-semibold text-[#555E50] mt-0.5">دستگاه و آواز</div>
            </div>
            <div class="bg-[#B8F24C]/35 border border-[#8CC920]/40 rounded-2xl p-3.5 text-center">
              <div class="text-xl sm:text-2xl font-black text-[#141812]">۲۴</div>
              <div class="text-[11px] sm:text-xs font-semibold text-[#2D3D12] mt-0.5">ربع‌پرده وزیری</div>
            </div>
            <div class="bg-[#F7F9F5] border border-[#141812]/10 rounded-2xl p-3.5 text-center">
              <div class="text-xl sm:text-2xl font-black text-[#141812]">۳۰–۲۵۰</div>
              <div class="text-[11px] sm:text-xs font-semibold text-[#555E50] mt-0.5">محدوده BPM</div>
            </div>
          </div>
        </div>

        <!-- Side-by-Side Mobile Mockups Grid (3 Core Screens) -->
        <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 items-start">

          <!-- ===============================================================
               SCREEN 1: CALCULATOR (شور سل / Sol Shur)
               =============================================================== -->
          <div class="flex flex-col items-center">
            <div class="phone-bezel w-full max-w-[340px]">
              <div class="phone-screen p-3.5 space-y-3">
                <!-- App Top Bar -->
                <div class="flex items-center justify-between pt-1">
                  <div class="flex items-center gap-1 bg-white ui-surface border border-[#141812]/10 rounded-full px-2 py-1 text-[10px] font-bold">
                    <span class="px-1.5 py-0.5 rounded-full bg-[#B8F24C] text-[#141812]">FA</span>
                    <span class="px-1.5 py-0.5 text-[#586253] ui-muted">EN</span>
                    <span class="text-[#141812]/20">|</span>
                    <span>🌙</span>
                  </div>
                  <div class="text-left">
                    <div class="text-sm font-black leading-none">کُرنوسُری</div>
                    <div class="text-[9px] text-[#667061] ui-muted mt-0.5">روایت عدد و نغمه</div>
                  </div>
                </div>

                <!-- Lime Selector Card -->
                <div class="bg-[#B8F24C] text-[#141812] rounded-2xl p-3 space-y-2 shadow-sm">
                  <div class="text-[10px] font-extrabold text-center leading-snug">
                    محاسبه فواصل و درجات دستگاه انتخابی
                  </div>

                  <div class="bg-white rounded-xl px-2.5 py-1.5 flex items-center justify-between text-xs font-bold shadow-2xs">
                    <span>شور</span>
                    <span class="text-[#586253] text-[10px]">▾</span>
                  </div>

                  <div class="grid grid-cols-2 gap-1.5">
                    <div>
                      <div class="text-[9px] font-bold mb-0.5 text-[#222C10]">نت پایه (تونیک)</div>
                      <div class="bg-white rounded-xl px-2 py-1 flex items-center justify-between text-[11px] font-extrabold">
                        <span data-note-idx="0">سل</span>
                        <span class="text-[9px] text-[#586253]">▾</span>
                      </div>
                    </div>
                    <div>
                      <div class="text-[9px] font-bold mb-0.5 text-[#222C10]">علامت عرضی</div>
                      <div class="bg-white rounded-xl px-2 py-1 flex items-center justify-between text-[11px] font-extrabold">
                        <span>بکار</span>
                        <span class="text-[9px] text-[#586253]">▾</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Active Scale Header & 8 Degree Cards -->
                <div class="bg-white ui-surface rounded-2xl p-3 border border-[#141812]/8 space-y-2.5">
                  <div class="flex items-center justify-between">
                    <button
                      type="button"
                      onclick="cycleActiveDegree()"
                      class="w-7 h-7 rounded-lg bg-[#B8F24C] text-[#141812] font-black text-xs flex items-center justify-center shadow-2xs cursor-pointer"
                      title="نواختن / جابه‌جایی درجه فعال"
                    >
                      ▶
                    </button>
                    <div class="text-center">
                      <div class="text-sm font-black">شور <span data-note-idx="0">سل</span></div>
                      <div class="text-[9px] text-[#586253] ui-muted font-medium">
                        سرکلید: <span data-note-idx="1">لا</span> کرُن، <span data-note-idx="2">سی</span> بمل، <span data-note-idx="5">می</span> بمل
                      </div>
                    </div>
                    <span class="w-7 h-7 rounded-lg bg-[#F4F7F0] ui-surface border border-[#141812]/8 text-xs flex items-center justify-center">☆</span>
                  </div>

                  <!-- 8 Scale Degree Tiles (2x4 Grid) -->
                  <div id="scale-degrees-grid" class="grid grid-cols-4 gap-1.5">
                    <!-- Degree 1 -->
                    <button type="button" onclick="selectDegree(0)" class="deg-tile rounded-xl p-1.5 border border-[#141812]/10 bg-[#FAFBF8] text-center transition cursor-pointer" data-deg="0">
                      <div class="text-[9px] text-[#7A8475] font-semibold">۱</div>
                      <div class="text-xs font-black mt-0.5" data-note-idx="0">سل</div>
                      <div class="text-[8px] text-transparent select-none mt-0.5">-</div>
                    </button>
                    <!-- Degree 2 (Koron) -->
                    <button type="button" onclick="selectDegree(1)" class="deg-tile rounded-xl p-1.5 border-2 border-[#99DC28] bg-[#EFFBCP] bg-[#F2FCD8] text-center transition cursor-pointer" data-deg="1">
                      <div class="text-[9px] text-[#4E7A08] font-bold">۲</div>
                      <div class="text-xs font-black mt-0.5 text-[#141812]" data-note-idx="1">لا</div>
                      <div class="text-[8px] font-extrabold bg-[#B8F24C] text-[#141812] rounded-md px-1 py-0.2 mt-0.5 inline-block">کرُن</div>
                    </button>
                    <!-- Degree 3 (Flat) -->
                    <button type="button" onclick="selectDegree(2)" class="deg-tile rounded-xl p-1.5 border border-[#141812]/10 bg-[#FAFBF8] text-center transition cursor-pointer" data-deg="2">
                      <div class="text-[9px] text-[#7A8475] font-semibold">۳</div>
                      <div class="text-xs font-black mt-0.5" data-note-idx="2">سی</div>
                      <div class="text-[8px] font-bold bg-[#ECEFE9] text-[#464F42] rounded-md px-1 mt-0.5 inline-block">بمل</div>
                    </button>
                    <!-- Degree 4 -->
                    <button type="button" onclick="selectDegree(3)" class="deg-tile rounded-xl p-1.5 border border-[#141812]/10 bg-[#FAFBF8] text-center transition cursor-pointer" data-deg="3">
                      <div class="text-[9px] text-[#7A8475] font-semibold">۴</div>
                      <div class="text-xs font-black mt-0.5" data-note-idx="3">دو</div>
                      <div class="text-[8px] text-transparent select-none mt-0.5">-</div>
                    </button>
                    <!-- Degree 5 -->
                    <button type="button" onclick="selectDegree(4)" class="deg-tile rounded-xl p-1.5 border border-[#141812]/10 bg-[#FAFBF8] text-center transition cursor-pointer" data-deg="4">
                      <div class="text-[9px] text-[#7A8475] font-semibold">۵</div>
                      <div class="text-xs font-black mt-0.5" data-note-idx="4">رِ</div>
                      <div class="text-[8px] text-transparent select-none mt-0.5">-</div>
                    </button>
                    <!-- Degree 6 (Flat) -->
                    <button type="button" onclick="selectDegree(5)" class="deg-tile rounded-xl p-1.5 border border-[#141812]/10 bg-[#FAFBF8] text-center transition cursor-pointer" data-deg="5">
                      <div class="text-[9px] text-[#7A8475] font-semibold">۶</div>
                      <div class="text-xs font-black mt-0.5" data-note-idx="5">می</div>
                      <div class="text-[8px] font-bold bg-[#ECEFE9] text-[#464F42] rounded-md px-1 mt-0.5 inline-block">بمل</div>
                    </button>
                    <!-- Degree 7 -->
                    <button type="button" onclick="selectDegree(6)" class="deg-tile rounded-xl p-1.5 border border-[#141812]/10 bg-[#FAFBF8] text-center transition cursor-pointer" data-deg="6">
                      <div class="text-[9px] text-[#7A8475] font-semibold">۷</div>
                      <div class="text-xs font-black mt-0.5" data-note-idx="6">فا</div>
                      <div class="text-[8px] text-transparent select-none mt-0.5">-</div>
                    </button>
                    <!-- Degree 8 (Octave) -->
                    <button type="button" onclick="selectDegree(7)" class="deg-tile rounded-xl p-1.5 border border-[#141812]/10 bg-[#FAFBF8] text-center transition cursor-pointer" data-deg="7">
                      <div class="text-[9px] text-[#7A8475] font-semibold">۸</div>
                      <div class="text-xs font-black mt-0.5" data-note-idx="0">سل</div>
                      <div class="text-[8px] text-transparent select-none mt-0.5">-</div>
                    </button>
                  </div>
                </div>

                <!-- Mini Bottom Nav -->
                <div class="bg-white ui-surface border border-[#141812]/8 rounded-xl py-1.5 px-2 grid grid-cols-4 text-center text-[9px] font-bold">
                  <span class="text-[#4E7A08]">محاسبه‌گر</span>
                  <span class="text-[#7A8475] ui-muted">نشان‌شده</span>
                  <span class="text-[#7A8475] ui-muted">مترونوم</span>
                  <span class="text-[#7A8475] ui-muted">درباره</span>
                </div>
              </div>
            </div>
            <div class="mt-3 text-center">
              <span class="text-xs font-extrabold text-[#141812]">۱. محاسبه‌گر فواصل و درجات</span>
              <p class="text-[11px] text-[#586253]">نمایش «شور سل» همراه با علامت‌های کرُن و بمل</p>
            </div>
          </div>

          <!-- ===============================================================
               SCREEN 2: DASTGAH PICKER DROPDOWN (انتخاب دستگاه و آواز)
               =============================================================== -->
          <div class="flex flex-col items-center">
            <div class="phone-bezel w-full max-w-[340px]">
              <div class="phone-screen p-3.5 space-y-3">
                <!-- App Top Bar -->
                <div class="flex items-center justify-between pt-1">
                  <div class="flex items-center gap-1 bg-white ui-surface border border-[#141812]/10 rounded-full px-2 py-1 text-[10px] font-bold">
                    <span class="px-1.5 py-0.5 text-[#586253] ui-muted">FA</span>
                    <span class="px-1.5 py-0.5 rounded-full bg-[#B8F24C] text-[#141812]">EN</span>
                  </div>
                  <div class="text-left">
                    <div class="text-sm font-black leading-none">Koronosori</div>
                    <div class="text-[9px] text-[#667061] ui-muted mt-0.5">A Tale of Number & Melody</div>
                  </div>
                </div>

                <!-- Lime Selector with Open Dropdown Menu -->
                <div class="bg-[#B8F24C] text-[#141812] rounded-2xl p-3 space-y-2 relative">
                  <div class="text-[10px] font-extrabold text-center">
                    انتخاب دستگاه یا آواز مورد نظر
                  </div>

                  <div class="bg-white rounded-xl px-2.5 py-1.5 flex items-center justify-between text-xs font-extrabold border-2 border-[#141812]">
                    <span id="selected-dastgah-label">شور (Shur)</span>
                    <span class="text-[10px]">▴</span>
                  </div>

                  <!-- Dropdown List matching Dastgahs -->
                  <div id="dastgah-list" class="bg-white rounded-xl border border-[#141812]/15 shadow-lg overflow-hidden text-xs font-bold divide-y divide-[#141812]/8">
                    <button type="button" onclick="pickDastgah('شور (Shur)', this)" class="dastgah-opt w-full px-3 py-1.5 text-right flex items-center justify-between bg-[#2563EB] text-white cursor-pointer">
                      <span>شور</span>
                      <span class="text-[10px] opacity-90">Shur</span>
                    </button>
                    <button type="button" onclick="pickDastgah('سه‌گاه (Segah)', this)" class="dastgah-opt w-full px-3 py-1.5 text-right flex items-center justify-between hover:bg-[#F3F7EC] text-[#141812] cursor-pointer">
                      <span>سه‌گاه</span>
                      <span class="text-[10px] text-[#586253]">Segah</span>
                    </button>
                    <button type="button" onclick="pickDastgah('چهارگاه (Chahargah)', this)" class="dastgah-opt w-full px-3 py-1.5 text-right flex items-center justify-between hover:bg-[#F3F7EC] text-[#141812] cursor-pointer">
                      <span>چهارگاه</span>
                      <span class="text-[10px] text-[#586253]">Chahargah</span>
                    </button>
                    <button type="button" onclick="pickDastgah('ماهور (Mahur)', this)" class="dastgah-opt w-full px-3 py-1.5 text-right flex items-center justify-between hover:bg-[#F3F7EC] text-[#141812] cursor-pointer">
                      <span>ماهور</span>
                      <span class="text-[10px] text-[#586253]">Mahur</span>
                    </button>
                    <button type="button" onclick="pickDastgah('همایون (Homayoun)', this)" class="dastgah-opt w-full px-3 py-1.5 text-right flex items-center justify-between hover:bg-[#F3F7EC] text-[#141812] cursor-pointer">
                      <span>همایون</span>
                      <span class="text-[10px] text-[#586253]">Homayoun</span>
                    </button>
                    <button type="button" onclick="pickDastgah('نوا (Nava)', this)" class="dastgah-opt w-full px-3 py-1.5 text-right flex items-center justify-between hover:bg-[#F3F7EC] text-[#141812] cursor-pointer">
                      <span>نوا</span>
                      <span class="text-[10px] text-[#586253]">Nava</span>
                    </button>
                    <button type="button" onclick="pickDastgah('راست‌پنجگاه (Rast-Panjgah)', this)" class="dastgah-opt w-full px-3 py-1.5 text-right flex items-center justify-between hover:bg-[#F3F7EC] text-[#141812] cursor-pointer">
                      <span>راست‌پنجگاه</span>
                      <span class="text-[10px] text-[#586253]">Rast-Panjgah</span>
                    </button>
                  </div>
                </div>

                <!-- Support Banner inside mockup -->
                <div class="bg-[#FDECEF] text-[#141812] rounded-xl px-3 py-2 flex items-center justify-between border border-[#E86A82]/25">
                  <div>
                    <div class="text-[10px] font-extrabold">حمایت از کُرنوسُری <span class="bg-white px-1.5 py-0.2 rounded text-[8px] text-[#C81E4B]">بدون تبلیغ</span></div>
                    <div class="text-[9px] text-[#5A464B]">پایداری سرور و توسعه امکانات</div>
                  </div>
                  <span class="w-6 h-6 rounded-full bg-[#E11D48] text-white text-xs flex items-center justify-center font-bold">←</span>
                </div>
              </div>
            </div>
            <div class="mt-3 text-center">
              <span class="text-xs font-extrabold text-[#141812]">۲. فهرست دستگاه‌ها و ردیف</span>
              <p class="text-[11px] text-[#586253]">دسترسی سریع به شور، سه‌گاه، چهارگاه، ماهور، همایون، نوا و راست‌پنجگاه</p>
            </div>
          </div>

          <!-- ===============================================================
               SCREEN 3: METRONOME (مترونوم ۹۰ BPM و الگوهای ریتمیک)
               =============================================================== -->
          <div class="flex flex-col items-center">
            <div class="phone-bezel w-full max-w-[340px]">
              <div class="phone-screen p-3.5 space-y-2.5">
                <!-- App Top Bar -->
                <div class="flex items-center justify-between pt-1">
                  <div class="text-xs font-black flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-[#99DC28]"></span>
                    <span>مترونوم کُرنوسُری</span>
                  </div>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#B8F24C]/40 text-[#141812]">۴/۴</span>
                </div>

                <!-- Tempo & Time Signature Row -->
                <div class="grid grid-cols-12 gap-2">
                  <div class="col-span-7 bg-white ui-surface rounded-2xl p-2.5 border border-[#141812]/8 text-center">
                    <div class="text-[9px] font-bold text-[#586253] ui-muted">سرعت اجرای ضرب</div>
                    <div id="bpm-display" class="text-2xl font-black text-[#141812] leading-tight mt-0.5">90</div>
                    <div class="text-[9px] font-semibold text-[#586253] ui-muted">BPM • معتدل</div>
                    <div class="flex items-center justify-center gap-1 mt-1.5">
                      <button type="button" onclick="adjustBpm(-5)" class="px-1.5 py-0.5 text-[9px] font-bold rounded bg-[#F3F6EE] text-[#141812] cursor-pointer">-5</button>
                      <button type="button" onclick="adjustBpm(-1)" class="px-1.5 py-0.5 text-[9px] font-bold rounded bg-[#F3F6EE] text-[#141812] cursor-pointer">-1</button>
                      <button type="button" onclick="adjustBpm(1)" class="px-1.5 py-0.5 text-[9px] font-bold rounded bg-[#F3F6EE] text-[#141812] cursor-pointer">+1</button>
                      <button type="button" onclick="adjustBpm(5)" class="px-1.5 py-0.5 text-[9px] font-bold rounded bg-[#F3F6EE] text-[#141812] cursor-pointer">+5</button>
                    </div>
                  </div>

                  <div class="col-span-5 bg-white ui-surface rounded-2xl p-2.5 border border-[#141812]/8 flex flex-col items-center justify-center text-center">
                    <div class="text-[9px] font-bold text-[#586253] ui-muted">کسر میزان</div>
                    <div class="text-base font-black mt-0.5">۴ / ۴</div>
                    <span class="mt-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#EFFBCP] bg-[#EEFAD4] text-[#3B5E06]">سیاه (Quarter)</span>
                  </div>
                </div>

                <!-- Beat Tiles (1 Accent, 2 Normal, 3 Semi-accent, 4 Normal) -->
                <div class="bg-white ui-surface rounded-2xl p-2.5 border border-[#141812]/8 space-y-2">
                  <div class="flex items-center justify-between text-[10px] font-bold">
                    <span>کاشی‌های ضرب و سرضرب</span>
                    <span class="text-[#586253] ui-muted text-[9px]">لمس برای تغییر</span>
                  </div>

                  <div class="grid grid-cols-4 gap-1.5">
                    <div class="rounded-xl p-1.5 bg-[#B8F24C] text-[#141812] text-center">
                      <div class="text-xs font-black">۱</div>
                      <div class="text-[9px] font-extrabold mt-0.5">سرضرب</div>
                    </div>
                    <div class="rounded-xl p-1.5 bg-[#F4F7F0] text-[#141812] border border-[#141812]/10 text-center">
                      <div class="text-xs font-black">۲</div>
                      <div class="text-[9px] font-semibold text-[#586253] mt-0.5">عادی</div>
                    </div>
                    <div class="rounded-xl p-1.5 bg-[#FEF3C7] text-[#92400E] border border-[#F59E0B]/30 text-center">
                      <div class="text-xs font-black">۳</div>
                      <div class="text-[9px] font-extrabold mt-0.5">نیمه‌ضرب</div>
                    </div>
                    <div class="rounded-xl p-1.5 bg-[#F4F7F0] text-[#141812] border border-[#141812]/10 text-center">
                      <div class="text-xs font-black">۴</div>
                      <div class="text-[9px] font-semibold text-[#586253] mt-0.5">عادی</div>
                    </div>
                  </div>

                  <!-- Rhythmic Patterns -->
                  <div class="pt-1">
                    <div class="text-[9px] font-bold text-[#586253] ui-muted mb-1">الگوهای ریتمیک آماده:</div>
                    <div class="flex flex-wrap gap-1">
                      <span class="px-2 py-0.5 rounded-lg text-[9px] font-extrabold bg-[#B8F24C] text-[#141812]">۴/۴ ساده</span>
                      <span class="px-2 py-0.5 rounded-lg text-[9px] font-bold bg-[#F3F6EE] text-[#141812]">۳/۴ سنگین / رنگ</span>
                      <span class="px-2 py-0.5 rounded-lg text-[9px] font-bold bg-[#F3F6EE] text-[#141812]">۶/۸ شش‌هشتم ایرانی</span>
                    </div>
                  </div>
                </div>

                <!-- Start / Tap Tempo & Sound Row -->
                <div class="flex items-center gap-1.5">
                  <button type="button" onclick="adjustBpm(0)" class="px-2.5 py-2 rounded-xl bg-white ui-surface border border-[#141812]/12 text-[10px] font-extrabold cursor-pointer">
                    تپ تمپو
                  </button>
                  <button type="button" onclick="toggleMetronomeState()" id="metro-toggle-btn" class="flex-1 py-2 rounded-xl bg-[#B8F24C] hover:bg-[#A6E635] text-[#141812] font-black text-xs shadow-sm transition cursor-pointer">
                    ▶ شروع مترونوم
                  </button>
                </div>

                <div class="flex items-center justify-between text-[9px] font-bold px-1 text-[#4A5346] ui-muted">
                  <span class="px-2 py-0.5 rounded bg-[#B8F24C]/40 text-[#141812]">چوبک (Wood)</span>
                  <span>بوق (Beep)</span>
                  <span>تیک (Tick)</span>
                  <span class="text-[#4E7A08]">● صدا فعال</span>
                </div>
              </div>
            </div>
            <div class="mt-3 text-center">
              <span class="text-xs font-extrabold text-[#141812]">۳. مترونوم تخصصی و الگوها</span>
              <p class="text-[11px] text-[#586253]">۹۰ BPM، کاشی سرضرب و نیمه‌ضرب، تپ تمپو و الگوی شش‌هشتم ایرانی</p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- =====================================================================
         2. SECONDARY FEATURE ROW (3 CLEAN CARDS)
         ===================================================================== -->
    <section aria-label="امکانات تکمیلی کُرنوسُری" class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <!-- Card A: نشان‌شده‌ها (Bookmarks & Notes) -->
      <article class="bg-white feature-card-inner rounded-[24px] border border-[#141812]/10 shadow-cardSoft p-6 flex flex-col justify-between space-y-5">
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="inline-flex items-center gap-2 text-xs font-extrabold px-3 py-1 rounded-full bg-[#B8F24C]/35 text-[#141812]">
              <span>★</span>
              <span>نشان‌شده‌ها و یادداشت</span>
            </span>
            <span class="text-xs font-bold text-[#667061] ui-muted">۳ مورد ذخیره</span>
          </div>

          <div>
            <h2 class="text-xl font-black text-[#141812]">نشان‌شده‌ها</h2>
            <p class="text-xs sm:text-sm text-[#586253] ui-muted mt-1 leading-relaxed">
              ذخیره گام‌ها و دستگاه‌های پرکاربرد با فیلتر دستگاه، یادداشت شخصی (کوک ساز یا نام قطعه)، کپی سریع و پخش فوری.
            </p>
          </div>

          <!-- Filter Chips Preview -->
          <div class="flex flex-wrap gap-1.5 text-[11px] font-bold">
            <span class="px-2.5 py-1 rounded-full bg-[#141812] text-white">همه دستگاه‌ها</span>
            <span class="px-2.5 py-1 rounded-full bg-[#F3F6EE] text-[#141812]">شور</span>
            <span class="px-2.5 py-1 rounded-full bg-[#F3F6EE] text-[#141812]">همایون</span>
            <span class="px-2.5 py-1 rounded-full bg-[#F3F6EE] text-[#141812]">نوا</span>
          </div>

          <!-- Saved Cards Stack -->
          <div class="space-y-2.5">
            <div class="rounded-2xl p-3 bg-[#FFF5F7] border border-[#F43F5E]/20 text-[#141812]">
              <div class="flex items-center justify-between">
                <span class="text-xs font-black">شور سل</span>
                <span class="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#FFE4E6] text-[#BE123C]">شور</span>
              </div>
              <div class="text-[10px] text-[#586253] mt-1">سرکلید: لا کرُن، سی بمل، می بمل</div>
              <div class="flex items-center justify-between mt-2 pt-2 border-t border-[#141812]/6">
                <span class="text-[10px] text-[#7A8475]">+ افزودن یادداشت کوک</span>
                <div class="flex items-center gap-1.5">
                  <span class="px-2 py-0.5 rounded-lg bg-white border border-[#141812]/10 text-[10px] font-bold">کپی</span>
                  <span class="w-6 h-6 rounded-lg bg-[#B8F24C] text-[#141812] text-[10px] font-black flex items-center justify-center">▶</span>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <div class="rounded-xl p-2.5 bg-[#EFF6FF] border border-[#3B82F6]/20 text-[#141812]">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-extrabold">همایون سل</span>
                  <span class="text-[9px] font-bold bg-[#DBEAFE] text-[#1D4ED8] px-1.5 py-0.2 rounded-full">همایون</span>
                </div>
                <div class="text-[9px] text-[#586253] mt-1 truncate">لا کرُن، می بمل</div>
              </div>

              <div class="rounded-xl p-2.5 bg-[#F5F3FF] border border-[#8B5CF6]/20 text-[#141812]">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-extrabold">نوا دو</span>
                  <span class="text-[9px] font-bold bg-[#EDE9FE] text-[#6D28D9] px-1.5 py-0.2 rounded-full">نوا</span>
                </div>
                <div class="text-[9px] text-[#586253] mt-1 truncate">می کرُن، لا کرُن، سی بمل</div>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-3 border-t border-[#141812]/8 flex items-center justify-between text-[11px] font-bold text-[#586253] ui-muted">
          <span>فیلتر لحظه‌ای + جستجو</span>
          <span class="text-[#4E7A08]">پخش و کپی یک‌کلیکه</span>
        </div>
      </article>

      <!-- Card B: نکات و ترفندها (Tips & Shortcuts) -->
      <article class="bg-white feature-card-inner rounded-[24px] border border-[#141812]/10 shadow-cardSoft p-6 flex flex-col justify-between space-y-5">
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="inline-flex items-center gap-2 text-xs font-extrabold px-3 py-1 rounded-full bg-[#FEF3C7] text-[#92400E]">
              <span>💡</span>
              <span>۴۰ نکته تخصصی</span>
            </span>
            <span class="text-xs font-bold text-[#667061] ui-muted">آموزش و میان‌بر</span>
          </div>

          <div>
            <h2 class="text-xl font-black text-[#141812]">نکات و ترفندها</h2>
            <p class="text-xs sm:text-sm text-[#586253] ui-muted mt-1 leading-relaxed">
              نکته تصادفی روزانه، جستجو در نکات، دسته‌بندی تئوری و فواصل، نواختن مستقیم با کیبورد کامپیوتر و کپی کامل اطلاعات دستگاه.
            </p>
          </div>

          <!-- Daily Random Tip Box -->
          <div class="rounded-2xl p-3 bg-[#FFFBEB] border border-[#F59E0B]/30 text-[#141812] space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#FDE68A] text-[#78350F]">نکته تصادفی</span>
              <span class="text-[10px] font-bold text-[#78350F]">نظم در تمرین روزانه</span>
            </div>
            <p class="text-[11px] text-[#451A03] leading-relaxed">
              ۳۰ دقیقه تمرین متمرکز روزانه همراه با مترونوم و دقت در فواصل، بسیار موثرتر از جلسات پراکنده آخر هفته است.
            </p>
          </div>

          <!-- Highlighted Shortcuts -->
          <div class="space-y-2">
            <div class="p-2.5 rounded-xl bg-[#F7F9F5] ui-surface border border-[#141812]/8 flex items-start gap-2.5">
              <span class="text-base leading-none mt-0.5">🎹</span>
              <div>
                <div class="text-xs font-extrabold">نواختن زنده با کیبورد کامپیوتر</div>
                <div class="text-[10px] text-[#586253] ui-muted">اتصال مستقیم کلیدهای کیبورد به کلاویه‌های پیانوی کُرنوسُری</div>
              </div>
            </div>

            <div class="p-2.5 rounded-xl bg-[#F7F9F5] ui-surface border border-[#141812]/8 flex items-start gap-2.5">
              <span class="text-base leading-none mt-0.5">📋</span>
              <div>
                <div class="text-xs font-extrabold">کپی سریع تمام اطلاعات دستگاه</div>
                <div class="text-[10px] text-[#586253] ui-muted">کپی نام دستگاه، سرکلید و درجات در کلیپ‌بورد با یک کلیک</div>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-3 border-t border-[#141812]/8 flex items-center justify-between text-[11px] font-bold text-[#586253] ui-muted">
          <span>تئوری و فواصل • تمرین و نوازندگی</span>
          <span class="text-[#4E7A08]">ترفندهای کُرنوسُری</span>
        </div>
      </article>

      <!-- Card C: درباره و مکتب وزیری (About & Vaziri Legacy) -->
      <article class="bg-white feature-card-inner rounded-[24px] border border-[#141812]/10 shadow-cardSoft p-6 flex flex-col justify-between space-y-5">
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="inline-flex items-center gap-2 text-xs font-extrabold px-3 py-1 rounded-full bg-[#EEF7D9] text-[#3B5E06]">
              <span>🎻</span>
              <span>مکتب کلنل وزیری</span>
            </span>
            <span class="text-xs font-bold text-[#667061] ui-muted">۱۲۶۵–۱۳۵۸</span>
          </div>

          <div>
            <h2 class="text-xl font-black text-[#141812]">درباره و مکتب وزیری</h2>
            <p class="text-xs sm:text-sm text-[#586253] ui-muted mt-1 leading-relaxed">
              ادای احترام به کلنل علینقی خان وزیری؛ بنیان‌گذار تئوری نوین موسیقی ایران که ساختار ردیف و فواصل را با نشانه‌های علمی «کرُن» و «سُری» تدوین کرد.
            </p>
          </div>

          <!-- 4 Pillars of Vaziri's Legacy -->
          <div class="space-y-1.5 text-xs">
            <div class="p-2 rounded-xl bg-[#F7F9F5] ui-surface border border-[#141812]/8 flex items-center gap-2">
              <span class="w-5 h-5 rounded-full bg-[#141812] text-[#B8F24C] text-[10px] font-black flex items-center justify-center shrink-0">۱</span>
              <span class="font-bold">تئوری ۲۴ ربع‌پرده و ابداع «سری» و «کرُن»</span>
            </div>
            <div class="p-2 rounded-xl bg-[#F7F9F5] ui-surface border border-[#141812]/8 flex items-center gap-2">
              <span class="w-5 h-5 rounded-full bg-[#141812] text-[#B8F24C] text-[10px] font-black flex items-center justify-center shrink-0">۲</span>
              <span class="font-bold">نت‌نویسی ردیف و متدهای آموزشی مدون</span>
            </div>
            <div class="p-2 rounded-xl bg-[#F7F9F5] ui-surface border border-[#141812]/8 flex items-center gap-2">
              <span class="w-5 h-5 rounded-full bg-[#141812] text-[#B8F24C] text-[10px] font-black flex items-center justify-center shrink-0">۳</span>
              <span class="font-bold">ورود هارمونی و ارکستراسیون ایرانی</span>
            </div>
            <div class="p-2 rounded-xl bg-[#F7F9F5] ui-surface border border-[#141812]/8 flex items-center gap-2">
              <span class="w-5 h-5 rounded-full bg-[#141812] text-[#B8F24C] text-[10px] font-black flex items-center justify-center shrink-0">۴</span>
              <span class="font-bold">بنیان‌گذاری مدرسه عالی موسیقی (۱۳۰۲)</span>
            </div>
          </div>
        </div>

        <div class="pt-3 border-t border-[#141812]/8 flex items-center justify-between text-[11px] font-bold text-[#586253] ui-muted">
          <span>توسعه‌یافته با بهره‌گیری از هوش مصنوعی</span>
          <span class="text-[#141812] font-extrabold">ساخته‌شده با عشق به موسیقی ایرانی ♥</span>
        </div>
      </article>

    </section>

    <!-- =====================================================================
         3. COMPACT GITHUB README ARCHITECTURE & QUICK SUMMARY STRIP
         ===================================================================== -->
    <footer class="bg-white rounded-[24px] border border-[#141812]/10 p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
      <div class="space-y-1">
        <div class="text-xs font-extrabold text-[#4E7A08]">پیشنهاد استفاده در ریپازیتوری گیت‌هاب (README.md)</div>
        <p class="text-xs text-[#586253] leading-relaxed">
          این صفحه به گونه‌ای طراحی شده که هم به صورت یک بنر تمام‌عرض در بالای <code class="px-1.5 py-0.5 rounded bg-[#F2F6EC] text-[#141812] font-mono text-[11px]">README.md</code> اسکرین‌شات گرفته شود و هم هر بخش آن به صورت مستقل قابل نمایش باشد.
        </p>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <span class="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#F3F6EE] text-[#141812] border border-[#141812]/10">
          کُرنوسُری • Koronosori
        </span>
        <span class="px-3 py-1.5 rounded-xl text-xs font-extrabold bg-[#B8F24C] text-[#141812]">
          آماده پرزنتیشن
        </span>
      </div>
    </footer>

  </main>

  <script>
    // Note names in Solfege / Persian letters vs Do-Re-Mi
    const SOL_NOTES = ['سل', 'لا', 'سی', 'دو', 'رِ', 'می', 'فا'];
    const DORE_NOTES = ['سُل', 'لا', 'سی', 'دو', 'رِ', 'می', 'فا'];

    let useDoReMi = false;
    let isDarkPreview = false;
    let activeDegree = 1; // Default highlighted degree 2 (La Koron)
    let bpmValue = 90;
    let metronomeRunning = false;

    function showToast(message) {
      const box = document.getElementById('toast-box');
      const text = document.getElementById('toast-text');
      if (!box || !text) return;
      text.textContent = message;
      box.classList.remove('hidden');
    }

    function hideToast() {
      const box = document.getElementById('toast-box');
      if (box) box.classList.add('hidden');
    }

    function toggleNotation() {
      try {
        useDoReMi = !useDoReMi;
        const labelEl = document.getElementById('notation-label');
        if (labelEl) {
          labelEl.textContent = useDoReMi ? 'دو / رِ / می' : 'سل / لا';
        }

        const targets = document.querySelectorAll('[data-note-idx]');
        targets.forEach((el) => {
          const idx = parseInt(el.getAttribute('data-note-idx'), 10);
          if (!Number.isNaN(idx)) {
            el.textContent = useDoReMi ? DORE_NOTES[idx] : SOL_NOTES[idx];
          }
        });
      } catch (err) {
        showToast('خطا در تغییر سیستم نت‌نویسی.');
      }
    }

    function toggleMockupTheme() {
      try {
        isDarkPreview = !isDarkPreview;
        const root = document.getElementById('showcase-root');
        const label = document.getElementById('theme-label');
        const icon = document.getElementById('theme-icon');

        if (root) {
          root.classList.toggle('preview-dark', isDarkPreview);
        }
        if (label && icon) {
          label.textContent = isDarkPreview ? 'پیش‌نمایش روشن' : 'پیش‌نمایش تیره';
          icon.textContent = isDarkPreview ? '☀️' : '🌙';
        }
      } catch (err) {
        showToast('خطا در تغییر حالت پیش‌نمایش.');
      }
    }

    function selectDegree(degIndex) {
      try {
        activeDegree = degIndex;
        const tiles = document.querySelectorAll('.deg-tile');
        tiles.forEach((tile) => {
          const idx = parseInt(tile.getAttribute('data-deg'), 10);
          const isSelected = idx === activeDegree;
          tile.classList.toggle('border-2', isSelected);
          tile.classList.toggle('border-[#99DC28]', isSelected);
          tile.classList.toggle('bg-[#F2FCD8]', isSelected);
          tile.classList.toggle('border-[#141812]/10', !isSelected);
          tile.classList.toggle('bg-[#FAFBF8]', !isSelected);
        });
      } catch (err) {
        showToast('خطا در انتخاب درجه.');
      }
    }

    function cycleActiveDegree() {
      selectDegree((activeDegree + 1) % 8);
    }

    function pickDastgah(name, btnEl) {
      try {
        const label = document.getElementById('selected-dastgah-label');
        if (label) label.textContent = name;

        const allOpts = document.querySelectorAll('.dastgah-opt');
        allOpts.forEach((opt) => {
          opt.classList.remove('bg-[#2563EB]', 'text-white');
          opt.classList.add('hover:bg-[#F3F7EC]', 'text-[#141812]');
        });

        if (btnEl) {
          btnEl.classList.remove('hover:bg-[#F3F7EC]', 'text-[#141812]');
          btnEl.classList.add('bg-[#2563EB]', 'text-white');
        }
      } catch (err) {
        showToast('خطا در انتخاب دستگاه.');
      }
    }

    function adjustBpm(delta) {
      try {
        bpmValue = Math.min(250, Math.max(30, bpmValue + delta));
        const display = document.getElementById('bpm-display');
        if (display) display.textContent = String(bpmValue);
      } catch (err) {
        showToast('خطا در تنظیم سرعت مترونوم.');
      }
    }

    function toggleMetronomeState() {
      try {
        metronomeRunning = !metronomeRunning;
        const btn = document.getElementById('metro-toggle-btn');
        if (!btn) return;
        btn.textContent = metronomeRunning ? '❚❚ توقف مترونوم' : '▶ شروع مترونوم';
      } catch (err) {
        showToast('خطا در تغییر وضعیت مترونوم.');
      }
    }

    function copyMarkdownSnippet() {
      const snippet = '![کُرنوسُری — روایت عدد و نغمه](./assets/koronosori-github-showcase.png)';
      try {
        const tempInput = document.createElement('textarea');
        tempInput.value = snippet;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast('کد Markdown تصویر گیت‌هاب کپی شد: ' + snippet);
      } catch (err) {
        showToast('امکان کپی خودکار وجود نداشت؛ متن: ' + snippet);
      }
    }
  </script>
</body>
</html>
