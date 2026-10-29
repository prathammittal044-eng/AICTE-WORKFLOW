import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import {
  ShieldAlert,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Upload,
  FileCheck,
  Check,
  Building2
} from 'lucide-react';

export default function ComplianceCenter() {
  const { complianceObligations } = useAppStore();
  const [uploadedObligations, setUploadedObligations] = useState({});

  const handleFakeUpload = (id) => {
    setUploadedObligations((prev) => ({ ...prev, [id]: true }));
  };

  const overdueCount = complianceObligations.filter((o) => o.daysRemaining < 0).length;
  const expiringCount = complianceObligations.filter(
    (o) => o.daysRemaining >= 0 && o.daysRemaining <= 30
  ).length;

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-xl font-serif font-bold text-slate-900">
          Statutory Undertakings &amp; Document Validity
        </h1>
        <p className="text-xs text-slate-600 mt-1">
          Continuous compliance monitoring for land deeds, safety certificates, building approvals, and time-bound undertakings mandated under the AICTE Approval Process Handbook
        </p>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded border border-slate-200">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Total Monitored Documents
          </div>
          <div className="text-2xl font-semibold text-slate-900 mt-1">
            {complianceObligations.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Under annual review</div>
        </div>

        <div className="bg-white p-4 rounded border border-slate-200">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Expiring Within 30 Days
          </div>
          <div className="text-2xl font-semibold text-amber-700 mt-1">
            {expiringCount}
          </div>
          <div className="text-[11px] text-amber-800 mt-0.5">Renewal action required</div>
        </div>

        <div className="bg-white p-4 rounded border border-slate-200">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Overdue Non-Compliance
          </div>
          <div className="text-2xl font-semibold text-red-600 mt-1">
            {overdueCount}
          </div>
          <div className="text-[11px] text-red-700 mt-0.5">Escalated to Regional Officer</div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded border border-slate-200 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#7A1526]" />
            <h2 className="text-sm font-semibold text-slate-900">
              Document Compliance Schedule
            </h2>
          </div>
          <span className="text-xs text-slate-500">
            Automated SLA Monitoring
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
                <th className="py-3 px-4">Document / Obligation</th>
                <th className="py-3 px-4">Institution</th>
                <th className="py-3 px-4">Expiry Date</th>
                <th className="py-3 px-4">Validity Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {complianceObligations.map((item) => {
                const isOverdue = item.daysRemaining < 0;
                const isExpiringSoon = item.daysRemaining >= 0 && item.daysRemaining <= 30;
                const isUploaded = uploadedObligations[item.id] || item.undertakingSubmitted;

                let statusBadge = (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Valid ({item.daysRemaining} days)
                  </span>
                );

                if (isOverdue) {
                  statusBadge = (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-red-50 text-red-800 border border-red-200">
                      Overdue ({Math.abs(item.daysRemaining)} days)
                    </span>
                  );
                } else if (isExpiringSoon) {
                  statusBadge = (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-900 border border-amber-200">
                      Expiring Soon ({item.daysRemaining} days)
                    </span>
                  );
                }

                return (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 max-w-sm">
                      <div className="font-medium text-slate-900">{item.documentType}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{item.obligationText}</div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">Ref: {item.id}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      {item.institutionName}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">
                      {item.expiryDate}
                    </td>
                    <td className="py-3.5 px-4">
                      {statusBadge}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {isUploaded ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-medium text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Submitted</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => handleFakeUpload(item.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#7A1526] hover:bg-[#62111E] text-white font-medium text-xs transition-colors"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Renewal</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
