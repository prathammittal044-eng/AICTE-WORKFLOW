import React, { useState, useRef, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ROLES, ROLE_LABELS } from '../../lib/constants';
import { Bell, ChevronDown, Check, RefreshCw, AlertCircle, LogOut } from 'lucide-react';

export default function GIGWHeader({ onLogout }) {
  const {
    activeRole,
    setActiveRole,
    notifications,
    toggleNotificationDrawer,
    simulateSLABreach,
    resetToSeedData
  } = useAppStore();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const roleConfig = ROLES[activeRole];
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSwitchRole = (roleKey) => {
    setActiveRole(roleKey);
    setDropdownOpen(false);
  };

  return (
    <header className="w-full bg-white border-b border-slate-200 py-3 px-4 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Lockup: Official AICTE Insignia + Typography */}
        <div className="flex items-center gap-3.5">
          {/* Dignified Official Emblem */}
          <div className="w-11 h-11 rounded-full bg-blue-900 text-amber-400 flex items-center justify-center shadow-xs shrink-0 border border-blue-950">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              {/* Official Ashoka / Sun Wheel Symbol */}
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

          <div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-tight">
              AICTE e-Governance Portal
            </h1>
            <p className="text-xs text-slate-500 font-normal leading-snug">
              All India Council for Technical Education | Ministry of Education, Government of India
            </p>
          </div>
        </div>

        {/* Right Utility: Notifications & User Profile Dropdown */}
        <div className="flex items-center gap-3">
          {/* Subtle Notification Bell */}
          <button
            onClick={toggleNotificationDrawer}
            className="relative p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full"></span>
            )}
          </button>

          {/* User Profile Trigger & Native Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-slate-100 text-left transition-colors border border-transparent hover:border-slate-200"
            >
              <div className="hidden sm:block text-right">
                <div className="text-xs font-semibold text-slate-900 leading-tight">
                  {roleConfig.defaultUser.name}
                </div>
                <div className="text-[11px] text-slate-500">
                  {roleConfig.defaultUser.designation}
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {/* Enterprise Account & Workspace Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-72 bg-white rounded-lg shadow-lg border border-slate-200 py-1.5 z-50 text-xs">
                {/* Active Account Summary */}
                <div className="px-3.5 py-2 border-b border-slate-100 bg-slate-50/50">
                  <div className="font-semibold text-slate-900">
                    {roleConfig.defaultUser.name}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    {roleConfig.defaultUser.org}
                  </div>
                  <div className="text-[10px] text-blue-900 font-medium mt-1 inline-block bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {ROLE_LABELS[activeRole]}
                  </div>
                </div>

                {/* Switch Workspace Section */}
                <div className="py-1">
                  <div className="px-3.5 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Switch Workspace
                  </div>
                  {Object.keys(ROLES).map((roleKey) => {
                    const r = ROLES[roleKey];
                    const isSelected = activeRole === roleKey;
                    return (
                      <button
                        key={roleKey}
                        onClick={() => handleSwitchRole(roleKey)}
                        className={`w-full text-left px-3.5 py-2 flex items-center justify-between hover:bg-slate-50 transition-colors ${
                          isSelected ? 'font-semibold text-blue-900 bg-blue-50/40' : 'text-slate-700'
                        }`}
                      >
                        <div>
                          <div className="leading-tight">{r.title}</div>
                          <div className="text-[10px] text-slate-400 font-normal">
                            {r.defaultUser.name}
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-blue-900" />}
                      </button>
                    );
                  })}
                </div>

                {/* System Utilities */}
                <div className="border-t border-slate-100 py-1">
                  <div className="px-3.5 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Administrative Tools
                  </div>
                  <button
                    onClick={() => {
                      simulateSLABreach();
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
                    <span>Run Scheduled SLA Check</span>
                  </button>
                  <button
                    onClick={() => {
                      resetToSeedData();
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                    <span>Reset Sample Records</span>
                  </button>
                </div>

                {/* Sign Out */}
                {onLogout && (
                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-3.5 py-1.5 text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
