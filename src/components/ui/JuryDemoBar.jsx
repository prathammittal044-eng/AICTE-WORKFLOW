import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ROLES } from '../../lib/constants';
import { ChevronUp, ChevronDown, RefreshCw, AlertTriangle, UserCheck, ShieldAlert, FileClock } from 'lucide-react';

export default function JuryDemoBar({ onRoleSelect }) {
  const [expanded, setExpanded] = useState(true);
  const {
    activeRole,
    setActiveRole,
    simulateSLABreach,
    resetToSeedData,
    toggleAuditModal,
    toggleNotificationDrawer
  } = useAppStore();

  const handleRoleChange = (roleKey) => {
    setActiveRole(roleKey);
    if (onRoleSelect) onRoleSelect(roleKey);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 select-none shadow-2xl rounded-lg font-sans">
      {!expanded ? (
        <button
          onClick={() => setExpanded(true)}
          className="flex items-center gap-2 bg-gov-navyDark text-amber-300 px-3.5 py-2 rounded-lg border-2 border-amber-400 font-bold text-xs shadow-lg hover:bg-slate-900 transition-all animate-pulse"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          <span>🎬 SIH 2026 Jury Demo Controls</span>
          <ChevronUp className="w-4 h-4" />
        </button>
      ) : (
        <div className="bg-slate-900 text-white rounded-lg border-2 border-amber-400 p-3 w-80 sm:w-96 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-700 mb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-bold text-xs text-amber-300 tracking-wide">
                SIH JURY DEMO CONTROLLER
              </span>
            </div>
            <button
              onClick={() => setExpanded(false)}
              className="text-slate-400 hover:text-white text-xs flex items-center gap-1 p-0.5"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Role Switcher Buttons */}
          <div className="mb-3">
            <div className="text-[10px] uppercase font-bold text-slate-400 mb-1.5 flex items-center gap-1">
              <UserCheck className="w-3 h-3 text-amber-400" />
              <span>Instant Role Switch (Zero Re-login)</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {Object.keys(ROLES).map((key) => {
                const r = ROLES[key];
                const isActive = activeRole === key;
                return (
                  <button
                    key={key}
                    onClick={() => handleRoleChange(key)}
                    className={`py-1.5 px-2 rounded text-left font-semibold text-[11px] truncate transition-all border ${
                      isActive
                        ? 'bg-amber-400 text-slate-950 font-bold border-amber-300 shadow-sm'
                        : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    {key === 'INSTITUTION' && '🎓 Institute'}
                    {key === 'REGIONAL_OFFICER' && '🔍 Reg. Officer'}
                    {key === 'COMMITTEE' && '👥 Committee'}
                    {key === 'AICTE_BUREAU' && '🏛️ Bureau (HQ)'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Demo Trigger Actions */}
          <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-slate-800">
            {/* Simulate SLA Breach Button */}
            <button
              onClick={simulateSLABreach}
              className="flex items-center justify-center gap-1.5 bg-rose-950 hover:bg-rose-900 text-rose-200 border border-rose-700 px-2.5 py-1.5 rounded text-[11px] font-bold transition-colors"
              title="Trigger real-time SLA breach & Level-3 Bureau escalation"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>Trigger SLA Alert</span>
            </button>

            {/* Reset Demo Data */}
            <button
              onClick={resetToSeedData}
              className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 px-2.5 py-1.5 rounded text-[11px] font-semibold transition-colors"
              title="Reset state to pristine 6-institution scenarios"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
              <span>Reset Data</span>
            </button>

            {/* Audit Trail Launcher */}
            <button
              onClick={toggleAuditModal}
              className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 px-2.5 py-1.5 rounded text-[11px] font-semibold transition-colors"
            >
              <FileClock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Audit Trail</span>
            </button>

            {/* Notification Drawer Launcher */}
            <button
              onClick={toggleNotificationDrawer}
              className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 px-2.5 py-1.5 rounded text-[11px] font-semibold transition-colors"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Alert Logs</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
