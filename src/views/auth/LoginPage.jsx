import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ROLES, ROLE_LABELS } from '../../lib/constants';
import { ArrowRight, Building2, SearchCheck, Users, Shield } from 'lucide-react';

export default function LoginPage({ onLoginSuccess }) {
  const { setActiveRole } = useAppStore();

  const handleRoleLogin = (roleKey) => {
    setActiveRole(roleKey);
    if (onLoginSuccess) {
      onLoginSuccess();
    }
  };

  const roleIcons = {
    INSTITUTION: Building2,
    REGIONAL_OFFICER: SearchCheck,
    COMMITTEE: Users,
    AICTE_BUREAU: Shield
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col justify-between font-sans">
      {/* Top Strip */}
      <div className="w-full bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800 text-center font-normal">
        भारत सरकार | Government of India • Ministry of Education
      </div>

      {/* Main Login Workspace Selection Card */}
      <div className="max-w-3xl mx-auto w-full px-4 py-12 flex-1 flex flex-col justify-center items-center">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 w-full p-6 sm:p-8">
          {/* Official Emblem & Portal Title */}
          <div className="text-center mb-8 pb-6 border-b border-slate-200">
            <div className="w-12 h-12 rounded-full bg-[#7A1526] text-amber-300 flex items-center justify-center mx-auto mb-3 shadow-xs">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="2.5" fill="currentColor" />
                <path
                  d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              AICTE e-Governance Portal
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              All India Council for Technical Education | Ministry of Education, Government of India
            </p>
          </div>

          {/* Workspace Select */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3 text-center">
              Select Authorized Workspace
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.keys(ROLES).map((key) => {
                const r = ROLES[key];
                const Icon = roleIcons[key] || Building2;
                return (
                  <button
                    key={key}
                    onClick={() => handleRoleLogin(key)}
                    className="p-4 rounded-lg border border-slate-200 hover:border-[#7A1526] hover:bg-rose-50/20 text-left transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Icon className="w-5 h-5 text-[#7A1526]" />
                        <span className="text-[10px] text-slate-500 font-mono">
                          {ROLE_LABELS[key]}
                        </span>
                      </div>
                      <div className="font-semibold text-sm text-slate-900 group-hover:text-[#7A1526]">
                        {r.title}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {r.defaultUser.name}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate mt-0.5">
                        {r.defaultUser.org}
                      </div>
                    </div>
                    <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-[#7A1526] font-medium">
                      <span>Enter Workspace</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full bg-slate-900 text-slate-400 text-xs py-3 px-4 text-center border-t border-slate-800">
        © All India Council for Technical Education. Secure Single Sign-On Gateway.
      </div>
    </div>
  );
}
