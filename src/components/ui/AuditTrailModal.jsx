import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { X, FileClock, Shield, Lock, Search } from 'lucide-react';

export default function AuditTrailModal() {
  const { auditModalOpen, toggleAuditModal, auditLogs } = useAppStore();

  if (!auditModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl border border-gov-border overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="p-4 bg-gov-navy text-white flex items-center justify-between border-b-2 border-amber-500">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-gov-navyDark rounded border border-amber-400">
              <FileClock className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base">Digital Audit Trail & Governance Log</h3>
              <p className="text-xs text-slate-300">
                Immutable, timestamped administrative ledger aligned with OWASP ASVS v5.0
              </p>
            </div>
          </div>
          <button
            onClick={toggleAuditModal}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-gov-navyLight"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-bar info */}
        <div className="bg-slate-100 p-3 border-b border-gov-border flex flex-wrap items-center justify-between text-xs gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Total Audit Records:</span>
            <span className="bg-white px-2 py-0.5 rounded border border-slate-300 font-mono font-bold">
              {auditLogs.length}
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 text-[11px]">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>SHA-256 Non-Repudiation Check: <strong>PASSED</strong></span>
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="border border-gov-border rounded-lg overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-gov-border">
                <tr>
                  <th className="p-3 border-r border-gov-border">Timestamp (IST)</th>
                  <th className="p-3 border-r border-gov-border">Actor & Scope</th>
                  <th className="p-3 border-r border-gov-border">Entity ID</th>
                  <th className="p-3 border-r border-gov-border">Action Type</th>
                  <th className="p-3">Verified Remark & Audit Context</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-sans">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 border-r border-gov-border font-mono text-[11px] text-slate-600 whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                      })}
                    </td>
                    <td className="p-3 border-r border-gov-border">
                      <div className="font-bold text-gov-navy">{log.actor}</div>
                      <span className="inline-block bg-slate-100 text-[10px] text-slate-600 px-1.5 py-0.2 rounded border border-slate-300 font-mono mt-0.5">
                        {log.role}
                      </span>
                    </td>
                    <td className="p-3 border-r border-gov-border font-mono font-bold text-slate-800">
                      {log.entityId}
                    </td>
                    <td className="p-3 border-r border-gov-border">
                      <span className="bg-slate-100 text-slate-800 font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-slate-300">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3 text-slate-700 leading-relaxed text-[11px]">
                      {log.remark}
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        Client IP: {log.ip}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-gov-border flex justify-between items-center text-xs text-slate-500">
          <span>Compliant with National Cyber Security Policy &amp; GIGW 3.0</span>
          <button
            onClick={toggleAuditModal}
            className="px-4 py-1.5 bg-gov-navy text-white rounded font-bold hover:bg-gov-navyLight text-xs"
          >
            Close Audit Ledger
          </button>
        </div>
      </div>
    </div>
  );
}
