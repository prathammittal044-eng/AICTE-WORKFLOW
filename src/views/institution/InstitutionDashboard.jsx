import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import ProgressStepper from '../../components/ui/ProgressStepper';
import StatusBadge from '../../components/ui/StatusBadge';
import DigiLockerModal from '../../components/ui/DigiLockerModal';
import {
  FileText,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Upload,
  Download,
  Calendar,
  ExternalLink,
  ChevronRight,
  Send
} from 'lucide-react';

export default function InstitutionDashboard({ onNavigateToApply }) {
  const { applications, institutions, resubmitDeficiencies } = useAppStore();
  const [showDigiLocker, setShowDigiLocker] = useState(false);
  const [selectedAppForDeficiency, setSelectedAppForDeficiency] = useState(null);
  const [rectificationText, setRectificationText] = useState(
    'Uploaded revised Certified Revenue Survey Map verified by District Inspector of Land Records (DILR), confirming contiguous 5.20 Acres.'
  );

  // Focus institution: SRCEM Nagpur or first institution
  const myInst = institutions[0];
  const myApps = applications.filter((a) => a.institutionId === myInst.id);

  // Applications with deficiency
  const deficiencyApps = applications.filter((a) => a.workflowStage === 'DEFICIENCY_RETURNED');

  const handleResubmit = (appId) => {
    resubmitDeficiencies(appId, rectificationText);
    setSelectedAppForDeficiency(null);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Institutional Profile Header */}
      <div className="bg-white p-5 rounded-xl border border-gov-border shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-serif font-bold text-gov-navy">
              {myInst.name}
            </h2>
            <span className="bg-blue-100 text-blue-900 border border-blue-200 text-xs font-bold px-2.5 py-0.5 rounded">
              PID: {myInst.pid}
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            {myInst.address} • AISHE: {myInst.aisheCode} • Affiliated to RTM Nagpur University
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowDigiLocker(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-colors"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Connect DigiLocker Vault</span>
          </button>

          <button
            onClick={onNavigateToApply}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gov-navy hover:bg-gov-navyLight text-white font-bold text-xs shadow-xs transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>File New EoA / Course (AY 2026-27)</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-gov-border shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Active Applications
          </span>
          <span className="text-2xl font-serif font-bold text-gov-navy">
            {myApps.length}
          </span>
          <span className="text-[11px] text-slate-500 block mt-1">AY 2026-27 Dossier</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gov-border shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Deficiency Notices
          </span>
          <span className="text-2xl font-serif font-bold text-rose-700">
            {deficiencyApps.length > 0 ? deficiencyApps.length : '0'}
          </span>
          <span className="text-[11px] text-rose-600 font-semibold block mt-1">
            {deficiencyApps.length > 0 ? 'Urgent Action Pending' : 'Zero Pending Actions'}
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gov-border shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Statutory Undertakings
          </span>
          <span className="text-2xl font-serif font-bold text-emerald-700">3 Valid</span>
          <span className="text-[11px] text-emerald-700 font-semibold block mt-1">
            Anti-ragging &amp; Fees OK
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gov-border shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Document Expiry Radar
          </span>
          <span className="text-2xl font-serif font-bold text-amber-700">1 Warning</span>
          <span className="text-[11px] text-amber-800 font-semibold block mt-1">
            Lease renewal required
          </span>
        </div>
      </div>

      {/* Active Application Stage Tracker */}
      {myApps.map((app) => (
        <div key={app.id} className="bg-white p-5 rounded-xl border border-gov-border shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-gov-navy text-sm">{app.id}</span>
                <StatusBadge stage={app.workflowStage} />
              </div>
              <p className="text-xs text-slate-600 mt-0.5 font-medium">
                {app.type} • Submitted on {new Date(app.submissionDate).toLocaleDateString('en-GB')}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500">Scrutiny Regional Desk:</span>
              <span className="font-bold text-slate-800">{app.assignedRegion}</span>
            </div>
          </div>

          <ProgressStepper currentStage={app.workflowStage} />

          {/* If Deficiency Returned -> Show Action Callout */}
          {app.workflowStage === 'DEFICIENCY_RETURNED' && (
            <div className="p-4 rounded-lg bg-rose-50 border border-rose-300 text-xs">
              <div className="flex items-center gap-2 font-bold text-rose-900 mb-1">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Action Required: Scrutiny Officer Flagged Deficiencies</span>
              </div>
              <p className="text-slate-700 leading-relaxed mb-3">
                Regional Scrutiny identified discrepancies against APH Clause 2.1. Please inspect the remarks and submit rectified proofs before the 15-day deadline expires.
              </p>
              <button
                onClick={() => setSelectedAppForDeficiency(app.id)}
                className="px-4 py-2 rounded bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Submit Rectified Documents &amp; Resubmit</span>
              </button>
            </div>
          )}

          {/* Workflow History Audit Log for Institution */}
          <div className="pt-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Application Milestones &amp; Audit Trail
            </h4>
            <div className="space-y-2">
              {app.history.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-600">
                  <div className="w-2 h-2 rounded-full bg-gov-navy mt-1.5 shrink-0"></div>
                  <div>
                    <span className="font-bold text-slate-800">{h.stage}:</span>{' '}
                    <span>{h.remark}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">
                      {new Date(h.at).toLocaleString('en-GB')} • By: {h.by} ({h.role})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Deficiency Rectification Modal */}
      {selectedAppForDeficiency && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl border border-gov-border overflow-hidden">
            <div className="p-4 bg-gov-navy text-white flex items-center justify-between">
              <h3 className="font-serif font-bold text-sm">
                Submit Deficiency Rectification Dossier
              </h3>
              <button
                onClick={() => setSelectedAppForDeficiency(null)}
                className="text-slate-300 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Institutional Explanation &amp; Compliance Statement
                </label>
                <textarea
                  rows={4}
                  value={rectificationText}
                  onChange={(e) => setRectificationText(e.target.value)}
                  className="w-full text-xs p-2.5 rounded border border-slate-300 focus:outline-none focus:border-gov-navy"
                />
              </div>

              <div className="border-2 border-dashed border-slate-300 p-4 rounded-lg text-center bg-slate-50">
                <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                <span className="font-bold text-slate-700 block">
                  Upload Certified Revenue Map / Updated Lease Deed (PDF, Max 10MB)
                </span>
                <span className="text-[11px] text-slate-500">
                  Must be signed by Competent Authority / DILR
                </span>
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => setShowDigiLocker(true)}
                    className="text-xs font-bold text-emerald-700 hover:underline inline-flex items-center gap-1"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Or pull directly from DigiLocker
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  onClick={() => setSelectedAppForDeficiency(null)}
                  className="px-3 py-1.5 rounded border border-slate-300 text-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleResubmit(selectedAppForDeficiency)}
                  className="px-4 py-1.5 rounded bg-gov-navy hover:bg-gov-navyLight text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit for Re-Scrutiny</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DigiLocker Modal */}
      <DigiLockerModal
        isOpen={showDigiLocker}
        onClose={() => setShowDigiLocker(false)}
        onImportSuccess={() => {}}
      />
    </div>
  );
}
