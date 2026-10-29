import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { translations } from '../../lib/i18n';
import { ShieldCheck, Contrast, Eye } from 'lucide-react';

export default function GIGWTopBar() {
  const {
    activeLang,
    toggleLang,
    highContrast,
    toggleHighContrast,
    fontSizeDelta,
    setFontSizeDelta
  } = useAppStore();

  const t = translations[activeLang];

  return (
    <div className="w-full bg-gov-navyDark text-white text-xs border-b border-gov-navy select-none">
      {/* Indian National Tricolor Band */}
      <div className="gov-tricolor-stripe w-full"></div>

      <div className="max-w-7xl mx-auto px-4 py-1.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Sovereign Micro-Branding */}
        <div className="flex items-center gap-2 text-slate-300 font-medium">
          <span className="font-semibold text-amber-400 tracking-wide">
            {t.govHeader}
          </span>
          <span className="text-slate-500">•</span>
          <span className="hidden sm:inline text-slate-200">
            {t.ministryHeader}
          </span>
        </div>

        {/* Right: Accessibility & Language Controls */}
        <div className="flex items-center gap-3">
          <a
            href="#main-content"
            className="hover:text-amber-400 underline underline-offset-2 text-[11px] hidden md:inline"
          >
            {t.skipToMain}
          </a>

          <span className="text-slate-600 hidden md:inline">|</span>

          {/* Font Resizing Controls (GIGW 3.0 Standard) */}
          <div className="flex items-center gap-1 bg-slate-900/60 px-1.5 py-0.5 rounded border border-slate-700">
            <span className="text-slate-400 text-[10px] hidden sm:inline mr-1">{t.fontSize}</span>
            <button
              onClick={() => setFontSizeDelta(-2)}
              className={`px-1 rounded hover:bg-gov-navy text-[11px] font-bold ${fontSizeDelta === -2 ? 'bg-amber-400 text-gov-navyDark' : 'text-slate-300'}`}
              title="Decrease Font Size"
            >
              A-
            </button>
            <button
              onClick={() => setFontSizeDelta(0)}
              className={`px-1 rounded hover:bg-gov-navy text-[11px] font-bold ${fontSizeDelta === 0 ? 'bg-amber-400 text-gov-navyDark' : 'text-slate-300'}`}
              title="Standard Font Size"
            >
              A
            </button>
            <button
              onClick={() => setFontSizeDelta(2)}
              className={`px-1 rounded hover:bg-gov-navy text-[11px] font-bold ${fontSizeDelta === 2 ? 'bg-amber-400 text-gov-navyDark' : 'text-slate-300'}`}
              title="Increase Font Size"
            >
              A+
            </button>
          </div>

          <span className="text-slate-600">|</span>

          {/* High Contrast Toggle */}
          <button
            onClick={toggleHighContrast}
            className={`flex items-center gap-1 px-1.5 py-0.5 rounded border text-[11px] transition-colors ${
              highContrast
                ? 'bg-yellow-400 text-black border-yellow-300 font-bold'
                : 'border-slate-700 text-slate-300 hover:bg-gov-navy'
            }`}
            title="Toggle High Contrast for Visual Accessibility"
          >
            <Contrast className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.highContrast}</span>
          </button>

          <span className="text-slate-600">|</span>

          {/* Bilingual Switcher */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 font-semibold text-[11px] px-2 py-0.5 rounded bg-gov-navy hover:bg-gov-navyLight text-amber-300 border border-slate-600"
            title="Switch Language / भाषा बदलें"
          >
            <span>{activeLang === 'en' ? 'English' : 'हिन्दी'}</span>
            <span className="text-slate-400 text-[10px]">({activeLang === 'en' ? 'हिन्दी' : 'EN'})</span>
          </button>

          {/* Security Indicator */}
          <div className="hidden lg:flex items-center gap-1 text-[11px] text-emerald-400 font-medium pl-2 border-l border-slate-700">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>TLS 1.3 Certified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
