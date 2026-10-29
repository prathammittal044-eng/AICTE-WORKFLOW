import React from 'react';
import { useAppStore } from '../../store/useAppStore';

export default function GIGWNavBar({ currentView, setCurrentView }) {
  const { activeRole } = useAppStore();

  const getNavItems = () => {
    switch (activeRole) {
      case 'INSTITUTION':
        return [
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'apply', label: 'New Application' },
          { id: 'compliance', label: 'Document Validity' }
        ];
      case 'REGIONAL_OFFICER':
        return [
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'workbench', label: 'Scrutiny Workbench' },
          { id: 'compliance', label: 'Regional Compliance' }
        ];
      case 'COMMITTEE':
        return [
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'evc', label: 'Committee Visits' },
          { id: 'sac', label: 'SAC / SHC Review' }
        ];
      case 'AICTE_BUREAU':
        return [
          { id: 'dashboard', label: 'National Dashboard' },
          { id: 'approvals', label: 'Approval Orders' },
          { id: 'alerts', label: 'Escalated Cases' }
        ];
      default:
        return [{ id: 'dashboard', label: 'Dashboard' }];
    }
  };

  const navItems = getNavItems();

  return (
    <nav className="w-full bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between overflow-x-auto">
        <div className="flex items-center space-x-6">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`py-3 text-xs tracking-normal whitespace-nowrap transition-colors border-b-2 ${
                  isActive
                    ? 'border-blue-900 text-blue-900 font-semibold'
                    : 'border-transparent text-slate-600 hover:text-slate-900 font-normal'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
