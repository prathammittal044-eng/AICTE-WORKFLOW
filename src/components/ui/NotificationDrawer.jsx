import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { X, Bell, AlertTriangle, ShieldCheck, Clock } from 'lucide-react';

export default function NotificationDrawer() {
  const { notificationDrawerOpen, toggleNotificationDrawer, notifications } = useAppStore();

  if (!notificationDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-gov-border">
        {/* Header */}
        <div className="p-4 bg-gov-navy text-white flex items-center justify-between border-b-2 border-amber-500">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-serif font-bold text-sm">Alerts & Escalation Matrix</h3>
              <p className="text-[11px] text-slate-300">Live multi-tier regulatory notification log</p>
            </div>
          </div>
          <button
            onClick={toggleNotificationDrawer}
            className="p-1 rounded text-slate-300 hover:text-white hover:bg-gov-navyLight"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.map((item) => {
            const isAlert = item.type.includes('SLA') || item.type.includes('ESCALATION');
            return (
              <div
                key={item.id}
                className={`p-3 rounded-lg border transition-all ${
                  isAlert
                    ? 'bg-rose-50/80 border-rose-300 text-rose-950'
                    : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-1.5">
                    {isAlert ? (
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    ) : (
                      <ShieldCheck className="w-4 h-4 text-gov-navy shrink-0" />
                    )}
                    <h4 className="font-bold text-xs">{item.title}</h4>
                  </div>
                  <span className="text-[10px] text-slate-500 flex items-center gap-1 whitespace-nowrap">
                    <Clock className="w-3 h-3" />
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{item.body}</p>
                <div className="mt-2 flex items-center justify-between text-[10px] font-semibold text-slate-500 pt-1.5 border-t border-slate-200/60">
                  <span>Scope: {item.recipientRole}</span>
                  <span className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono">
                    SMS & Email Gateway OK
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500">
          Automated SLA Dispatch Engine • AICTE National Portal
        </div>
      </div>
    </div>
  );
}
