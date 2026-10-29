import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ROLES } from '../../lib/constants';
import { ShieldCheck, Lock, ArrowRight, UserCheck, CheckCircle2 } from 'lucide-react';

export default function LoginPage({ onLoginSuccess }) {
  const { setActiveRole } = useAppStore();

  const handleRoleLogin = (roleKey) => {
    setActiveRole(roleKey);
    if (onLoginSuccess) {
      onLoginSuccess();
    }
  };

  return (
    <div className="min-h-screen bg-gov-navyDark text-slate-800 flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background Ashoka Watermark SVG */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <svg className="w-[600px] h-[600px] text-white" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" />
          <circle cx="50" cy="50" r="10" />
          {[...Array(24)].map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={50 + 40 * Math.cos((i * 15 * Math.PI) / 180)}
              y2={50 + 40 * Math.sin((i * 15 * Math.PI) / 180)}
              stroke="currentColor"
              strokeWidth="2"
            />
          ))}
        </svg>
      </div>

      {/* Top Banner */}
      <div className="w-full bg-slate-950/40 text-slate-300 text-xs py-2 px-4 border-b border-slate-800 text-center">
        Smart India Hackathon 2026 • Problem Statement ID: 26262 • Smart Governance &amp; Administrative Reforms
      </div>

      {/* Main Login Card */}
      <div className="max-w-4xl mx-auto w-full px-4 py-8 z-10 flex-1 flex flex-col justify-center items-center">
        <div className="bg-white rounded-2xl shadow-2xl border border-gov-border w-full p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-6 pb-6 border-b border-slate-200">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-12 h-14 bg-slate-50 border border-slate-300 rounded flex flex-col items-center justify-center shadow-xs text-gov-navy">
                <span className="text-[18px]">🏛️</span>
                <span className="text-[7px] font-bold">सत्यमेव जयते</span>
              </div>
              <div className="w-12 h-14 bg-gov-navy text-amber-300 border border-gov-navyDark rounded flex flex-col items-center justify-center font-bold text-xs shadow-xs">
                <span>AICTE</span>
              </div>
            </div>
            <h2 className="text-2xl font-serif font-bold text-gov-navy">
              PARIKALP / परिकल्प
            </h2>
            <p className="text-xs font-semibold text-slate-700 max-w-lg mx-auto mt-1">
              Integrated AICTE Approval Workflow Automation, Compliance Monitoring and Alert Management System
            </p>
            <div className="flex items-center justify-center gap-2 mt-2 text-[11px] text-emerald-700 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>GIGW 3.0 &amp; OWASP ASVS v5.0 Secure Single Sign-On Gateway</span>
            </div>
          </div>

          {/* Persona Selection */}
          <div className="mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 text-center">
              Select Institutional Persona for Live Demonstration
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* Institution Card */}
              <div
                onClick={() => handleRoleLogin('INSTITUTION')}
                className="p-4 rounded-xl border-2 border-slate-200 hover:border-gov-navy bg-slate-50 hover:bg-blue-50/40 cursor-pointer transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">🎓</span>
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-900 px-2 py-0.5 rounded border border-blue-200">
                      INSTITUTION WORKSPACE
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-gov-navy group-hover:text-blue-900">
                    Technical Institution
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Submit applications, upload verified deeds via DigiLocker, respond to scrutiny deficiencies, and track lease validity.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-gov-navy">
                  <span>Demo: Dr. Rajeev Sharma (SRCEM Nagpur)</span>
                  <ArrowRight className="w-4 h-4 text-gov-navy group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Regional Officer Card */}
              <div
                onClick={() => handleRoleLogin('REGIONAL_OFFICER')}
                className="p-4 rounded-xl border-2 border-amber-300 bg-amber-50/40 hover:bg-amber-100/40 cursor-pointer transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">🔍</span>
                    <span className="text-[10px] font-bold bg-amber-200 text-amber-950 px-2 py-0.5 rounded border border-amber-300">
                      HIGH-IMPACT REVIEW
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-amber-950 group-hover:text-gov-navy">
                    Regional Officer (Scrutiny)
                  </h4>
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                    Split-screen document verification, AI LayoutLMv3 text extraction, image tamper heatmap screening, and deficiency memos.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-amber-200 flex items-center justify-between text-xs font-bold text-amber-900">
                  <span>Demo: Shri Prakash Mehta (RO Western)</span>
                  <ArrowRight className="w-4 h-4 text-amber-900 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Committee Card */}
              <div
                onClick={() => handleRoleLogin('COMMITTEE')}
                className="p-4 rounded-xl border-2 border-slate-200 hover:border-gov-navy bg-slate-50 hover:bg-purple-50/40 cursor-pointer transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">👥</span>
                    <span className="text-[10px] font-bold bg-purple-100 text-purple-900 px-2 py-0.5 rounded border border-purple-200">
                      COMMITTEE WORKSPACE
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-gov-navy group-hover:text-purple-900">
                    Committee (EVC / SAC)
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Automated conflict-of-interest peer roster scheduling, field inspection evidence upload, and SAC hearing minutes.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-gov-navy">
                  <span>Demo: Prof. K. Narayanan (SAC Member)</span>
                  <ArrowRight className="w-4 h-4 text-gov-navy group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* AICTE Bureau Card */}
              <div
                onClick={() => handleRoleLogin('AICTE_BUREAU')}
                className="p-4 rounded-xl border-2 border-slate-200 hover:border-gov-navy bg-slate-50 hover:bg-emerald-50/40 cursor-pointer transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">🏛️</span>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded border border-emerald-200">
                      HQ DECISION PANEL
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-gov-navy group-hover:text-emerald-900">
                    AICTE Bureau (Executive)
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    National approval order generation, region pendency aging charts, multi-tier escalation rule matrix, and Gazette orders.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-gov-navy">
                  <span>Demo: Dr. Mamta R. Agarwal (Advisor-I)</span>
                  <ArrowRight className="w-4 h-4 text-gov-navy group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full bg-slate-950/80 text-slate-400 text-xs py-3 px-4 text-center border-t border-slate-800">
        Team PARIKALP (Team ID: 199059) • AICTE Approval Automation System • 100% Client-Side Reactive Architecture
      </div>
    </div>
  );
}
