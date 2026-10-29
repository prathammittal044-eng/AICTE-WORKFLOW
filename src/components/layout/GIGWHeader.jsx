import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ROLES } from '../../lib/constants';
import { translations } from '../../lib/i18n';
import { Bell, Shield, Lock, FileText, CheckCircle2 } from 'lucide-react';

export default function GIGWHeader() {
  const {
    activeRole,
    activeLang,
    notifications,
    toggleNotificationDrawer,
    toggleAuditModal
  } = useAppStore();

  const t = translations[activeLang];
  const roleConfig = ROLES[activeRole];
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="w-full bg-white border-b border-gov-border py-3 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Emblem & Portal Identity */}
        <div className="flex items-center gap-3.5 w-full md:w-auto">
          {/* Dual Emblems (Lion Capital + AICTE) */}
          <div className="flex items-center gap-2 border-r border-gov-border pr-3.5">
            {/* National Emblem Badge */}
            <div className="w-12 h-14 flex flex-col items-center justify-center bg-slate-50 rounded border border-gov-border p-1 shadow-xs text-gov-navy">
              <svg className="w-7 h-7 text-gov-navy" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 2.18l6 2.25v4.66c0 4.12-2.73 7.97-6 9-3.27-1.03-6-4.88-6-9V6.43l6-2.25z" />
                <circle cx="12" cy="11" r="3" />
              </svg>
              <span className="text-[7px] font-bold tracking-tighter text-slate-700">सत्यमेव जयते</span>
            </div>

            {/* AICTE Crest */}
            <div className="w-12 h-14 flex flex-col items-center justify-center bg-gov-navy text-white rounded border border-gov-navyDark p-1 shadow-xs">
              <div className="w-6 h-6 rounded-full border border-amber-400 flex items-center justify-center text-[11px] font-bold text-amber-400">
                A
              </div>
              <span className="text-[8px] font-bold text-center leading-none text-amber-300 mt-1">AICTE</span>
            </div>
          </div>

          {/* Portal Title & Metadata */}
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-serif font-bold text-gov-navy tracking-tight">
                {t.portalTitle} <span className="text-slate-400 font-sans text-lg font-normal">/ परिकल्प</span>
              </h1>
              <span className="text-[11px] bg-amber-50 text-amber-900 border border-amber-300 font-bold px-2 py-0.5 rounded">
                SIH 2026 • PS 26262
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-700 leading-tight">
              {t.portalSubTitle}
            </p>
            <p className="text-[11px] text-slate-500 font-medium">
              All India Council for Technical Education • अखिल भारतीय तकनीकी शिक्षा परिषद (Govt. of India)
            </p>
          </div>
        </div>

        {/* User Identity & Security Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          {/* Active Persona Box */}
          <div className="text-right hidden sm:block">
            <div className="flex items-center justify-end gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-gov-navy">
                {roleConfig.defaultUser.name}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              {roleConfig.defaultUser.designation}
            </p>
            <div className="mt-0.5">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 bg-gov-navy/5 text-gov-navy rounded border border-gov-navy/20">
                <Shield className="w-2.5 h-2.5 text-gov-navy" />
                {roleConfig.badge}
              </span>
            </div>
          </div>

          {/* Quick Action Badges */}
          <div className="flex items-center gap-2 border-l border-gov-border pl-3">
            {/* Audit Trail Modal Launcher */}
            <button
              onClick={toggleAuditModal}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-slate-100 hover:bg-slate-200 border border-gov-border text-slate-700 text-xs font-semibold transition-colors"
              title="Open Digital Audit Trail (OWASP ASVS Compliance)"
            >
              <FileText className="w-3.5 h-3.5 text-gov-navy" />
              <span className="hidden lg:inline">{t.auditTrail}</span>
            </button>

            {/* Notification Bell */}
            <button
              onClick={toggleNotificationDrawer}
              className="relative p-2 rounded bg-slate-100 hover:bg-slate-200 border border-gov-border text-slate-700 transition-colors"
              title="View Alerts & Escalation Notifications"
            >
              <Bell className="w-4 h-4 text-gov-navy" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gov-danger text-white rounded-full text-[9px] font-bold flex items-center justify-center animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
