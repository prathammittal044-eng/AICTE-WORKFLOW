import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { LayoutDashboard, FileCheck, Calendar, Gavel, ShieldAlert, Award, FileSearch } from 'lucide-react';

export default function GIGWNavBar({ currentView, setCurrentView }) {
  const { activeRole } = useAppStore();

  const getNavItems = () => {
    switch (activeRole) {
      case 'INSTITUTION':
        return [
          { id: 'dashboard', label: 'Institution Dashboard', icon: LayoutDashboard },
          { id: 'apply', label: 'Submit Application (EoA/New)', icon: FileCheck },
          { id: 'compliance', label: 'Compliance & Document Expiry', icon: ShieldAlert }
        ];
      case 'REGIONAL_OFFICER':
        return [
          { id: 'dashboard', label: 'Regional Scrutiny Overview', icon: LayoutDashboard },
          { id: 'workbench', label: 'AI Scrutiny Workbench (High Impact)', icon: FileSearch },
          { id: 'compliance', label: 'Regional Compliance Monitor', icon: ShieldAlert }
        ];
      case 'COMMITTEE':
        return [
          { id: 'dashboard', label: 'Committee Roster Dashboard', icon: LayoutDashboard },
          { id: 'evc', label: 'EVC Visit Scheduling & Reports', icon: Calendar },
          { id: 'sac', label: 'SAC / SHC Hearing Cases', icon: Gavel }
        ];
      case 'AICTE_BUREAU':
        return [
          { id: 'dashboard', label: 'National Executive Dashboard', icon: LayoutDashboard },
          { id: 'approvals', label: 'Final Approval Orders (EoA)', icon: Award },
          { id: 'alerts', label: 'Alert Matrix & SLA Escalation', icon: ShieldAlert }
        ];
      default:
        return [{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }];
    }
  };

  const navItems = getNavItems();

  return (
    <nav className="w-full bg-gov-navy text-white shadow-md border-b-2 border-amber-500">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between overflow-x-auto">
        <div className="flex items-center space-x-1 py-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-t transition-colors whitespace-nowrap border-b-2 ${
                  isActive
                    ? 'bg-gov-navyDark text-amber-300 border-amber-400 font-bold'
                    : 'text-slate-200 border-transparent hover:bg-gov-navyLight hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 text-amber-400" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Live APH Handbook Tag */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] text-slate-300 pr-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>APH 2024-27 Active</span>
        </div>
      </div>
    </nav>
  );
}
