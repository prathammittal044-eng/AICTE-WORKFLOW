import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ShieldAlert, CheckCircle2, Clock, AlertTriangle, Upload, FileText, Check } from 'lucide-react';

export default function ComplianceCenter() {
  const { complianceObligations } = useAppStore();
  const [uploadedObligations, setUploadedObligations] = useState({});

  const handleFakeUpload = (id) => {
    setUploadedObligations({ ...uploadedObligations, [id]: true });
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-gov-border shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <ShieldAlert className="w-5 h-5 text-gov-navy" />
          <h2 className="text-xl font-serif font-bold text-gov-navy">
            Institutional Undertakings &amp; Document Validity Engine
          </h2>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
          Continuous compliance monitoring service tracking statutory lease deeds, fire safety certificates, building approvals, and time-bound regulatory undertakings mandated under the AICTE Approval Process Handbook.
        </p>
      </div>

      {/* Grid of Obligations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {complianceObligations.map((item) => {
          const isOverdue = item.daysRemaining < 0;
          const isExpiringSoon = item.daysRemaining > 0 && item.daysRemaining <= 30;
          const isUploaded = uploadedObligations[item.id] || item.undertakingSubmitted;

          let badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
          let badgeText = `Valid (${item.daysRemaining} days remaining)`;

          if (isOverdue) {
            badgeColor = 'bg-rose-100 text-rose-900 border-rose-300 animate-pulse';
            badgeText = `Overdue by ${Math.abs(item.daysRemaining)} days`;
          } else if (isExpiringSoon) {
            badgeColor = 'bg-amber-100 text-amber-900 border-amber-300 font-bold';
            badgeText = `Expires in ${item.daysRemaining} days (Action Required)`;
          }

          return (
            <div
              key={item.id}
              className={`bg-white rounded-xl border p-5 shadow-xs flex flex-col justify-between ${
                isOverdue
                  ? 'border-rose-300 ring-2 ring-rose-100'
                  : isExpiringSoon
                  ? 'border-amber-300'
                  : 'border-gov-border'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="font-mono text-[11px] text-slate-400 font-bold">
                    {item.id}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${badgeColor}`}>
                    {badgeText}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-800 leading-snug">
                  {item.documentType}
                </h3>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  {item.institutionName}
                </p>

                <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-2.5 rounded border border-slate-200">
                  {item.obligationText}
                </p>

                <div className="mt-3 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span>Expiry Date: <strong>{item.expiryDate}</strong></span>
                  <span className="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    SLA: {item.slaLevel}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                {isUploaded ? (
                  <span className="text-emerald-700 text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Proof Submitted (Under Bureau Review)</span>
                  </span>
                ) : (
                  <button
                    onClick={() => handleFakeUpload(item.id)}
                    className="w-full py-2 px-3 rounded bg-gov-navy hover:bg-gov-navyLight text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Renewed Document / Affidavit</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
