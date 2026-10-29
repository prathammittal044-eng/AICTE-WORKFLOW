import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ROLE_LABELS } from '../../lib/constants';
import { X, FileText } from 'lucide-react';

export default function AuditTrailModal() {
  const { auditModalOpen, toggleAuditModal, auditLogs } = useAppStore();

  if (!auditModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-slate-700" />
            <div>
              <h3 className="font-semibold text-slate-900 text-sm">Application Activity Log</h3>
              <p className="text-xs text-slate-500">Official log of workflow transitions and administrative actions</p>
            </div>
          </div>
          <button
            onClick={toggleAuditModal}
            className="p-1.5 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Audit Log Table */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="border border-slate-200 rounded-md overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 text-slate-700 font-semibold text-[11px] border-b border-slate-200">
                <tr>
                  <th className="p-2.5 border-r border-slate-200">Timestamp</th>
                  <th className="p-2.5 border-r border-slate-200">Recorded By</th>
                  <th className="p-2.5 border-r border-slate-200">Record ID</th>
                  <th className="p-2.5 border-r border-slate-200">Action</th>
                  <th className="p-2.5">Official Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-2.5 border-r border-slate-200 text-[11px] text-slate-600 whitespace-nowrap font-mono">
                      {new Date(log.timestamp).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="p-2.5 border-r border-slate-200">
                      <div className="font-medium text-slate-900">{log.actor}</div>
                      <div className="text-[10px] text-slate-400">
                        {ROLE_LABELS[log.role] || log.role}
                      </div>
                    </td>
                    <td className="p-2.5 border-r border-slate-200 font-mono text-slate-700">
                      {log.entityId}
                    </td>
                    <td className="p-2.5 border-r border-slate-200">
                      <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200 font-mono">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-2.5 text-slate-700 text-[11px] leading-relaxed">
                      {log.remark}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={toggleAuditModal}
            className="px-4 py-1.5 bg-slate-800 text-white rounded text-xs font-medium hover:bg-slate-900 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
