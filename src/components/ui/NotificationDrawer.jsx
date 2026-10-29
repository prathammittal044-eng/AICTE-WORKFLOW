import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ROLE_LABELS } from '../../lib/constants';
import { X, Bell, Clock } from 'lucide-react';

export default function NotificationDrawer() {
  const { notificationDrawerOpen, toggleNotificationDrawer, notifications } = useAppStore();

  if (!notificationDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/30 backdrop-blur-2xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-xl flex flex-col border-l border-slate-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-slate-700" />
            <div>
              <h3 className="font-semibold text-slate-900 text-sm">Notifications</h3>
              <p className="text-[11px] text-slate-500">Official alerts and stage updates</p>
            </div>
          </div>
          <button
            onClick={toggleNotificationDrawer}
            className="p-1.5 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {notifications.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-md border border-slate-200 bg-white hover:bg-slate-50/50 transition-colors text-xs"
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="font-semibold text-slate-900 leading-tight">{item.title}</h4>
                <span className="text-[10px] text-slate-400 whitespace-nowrap flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">{item.body}</p>
              <div className="mt-2 text-[10px] text-slate-400 pt-1.5 border-t border-slate-100">
                Audience: {ROLE_LABELS[item.recipientRole] || item.recipientRole}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-500">
          AICTE e-Governance Portal • Automated Messaging Service
        </div>
      </div>
    </div>
  );
}
