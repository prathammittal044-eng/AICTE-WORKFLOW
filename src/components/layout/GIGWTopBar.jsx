import React from 'react';
import { useAppStore } from '../../store/useAppStore';

export default function GIGWTopBar() {
  const { activeLang, toggleLang, fontSizeDelta, setFontSizeDelta } = useAppStore();

  return (
    <div className="w-full bg-slate-900 text-slate-300 text-xs h-7 flex items-center border-b border-slate-800 select-none">
      <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-between">
        {/* Left: Official Government of India Header */}
        <div className="text-[11px] text-slate-300 flex items-center gap-1.5 font-normal">
          <span className="font-medium text-slate-200">भारत सरकार | Government of India</span>
          <span className="text-slate-600">•</span>
          <span className="hidden sm:inline text-slate-400">Ministry of Education</span>
        </div>

        {/* Right: Plain Text Utility Links */}
        <div className="flex items-center gap-4 text-[11px] text-slate-300">
          <a
            href="#main-content"
            className="hover:text-white transition-colors hidden md:inline text-slate-300"
          >
            Skip to Main Content
          </a>

          <div className="flex items-center gap-1 text-slate-300 font-mono">
            <button
              onClick={() => setFontSizeDelta(-2)}
              className={`hover:text-white px-0.5 ${fontSizeDelta === -2 ? 'text-white font-bold underline' : 'text-slate-400'}`}
              title="Decrease Font Size"
            >
              A-
            </button>
            <button
              onClick={() => setFontSizeDelta(0)}
              className={`hover:text-white px-0.5 ${fontSizeDelta === 0 ? 'text-white font-bold underline' : 'text-slate-400'}`}
              title="Normal Font Size"
            >
              A
            </button>
            <button
              onClick={() => setFontSizeDelta(2)}
              className={`hover:text-white px-0.5 ${fontSizeDelta === 2 ? 'text-white font-bold underline' : 'text-slate-400'}`}
              title="Increase Font Size"
            >
              A+
            </button>
          </div>

          <button
            onClick={toggleLang}
            className="hover:text-white transition-colors text-slate-300"
            title="भाषा बदलें / Switch Language"
          >
            {activeLang === 'en' ? 'हिन्दी' : 'English'}
          </button>
        </div>
      </div>
    </div>
  );
}
