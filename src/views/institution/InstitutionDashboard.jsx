import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import ProgressStepper from '../../components/ui/ProgressStepper';
import StatusBadge from '../../components/ui/StatusBadge';
import DigiLockerModal from '../../components/ui/DigiLockerModal';
import { Plus, AlertCircle, FileText, Send, Upload } from 'lucide-react';

export default function InstitutionDashboard({ onNavigateToApply }) {
  const { applications, institutions, resubmitDeficiencies, toggleAuditModal } = useAppStore();
  const [showDigiLocker, setShowDigiLocker] = useState(false);
  const [selectedAppForDeficiency, setSelectedAppForDeficiency] = useState(null);
  const [rectificationText, setRectificationText] = useState(
    'Submitted revised Revenue Survey Map certified by the District Inspector of Land Records (DILR), confirming contiguous 5.20 Acres.'
  );

  const myInst = institutions[0];
  const myApps = applications.filter((a) => a.institutionId === myInst.id);
  const deficiencyApps = applications.filter((a) => a.workflowStage === 'DEFICIENCY_RETURNED');

  const handleResubmit = (appId) => {
    resubmitDeficiencies(appId, rectificationText);
    setSelectedAppForDeficiency(null);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* 1. Flat, Clean Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            {myInst.name}
          </h2>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1 font-mono">
            <span>PID: {myInst.pid}</span>
            <span>•</span>
            <span>AISHE: {myInst.aisheCode}</span>
            <span>•</span>
            <span className="font-sans">{myInst.city}, {myInst.state}</span>
          </div>
        </div>

        <div>
          <button
            onClick={onNavigateToApply}
            className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-blue-900 hover:bg-blue-950 text-white font-medium text-xs transition-colors shadow-2xs"
          >
            <Plus className="w-4 h-4" />
            <span>New Application</span>
          </button>
        </div>
      </div>

      {/* 2. Calm, Compact KPI Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium mb-1">Active Applications</div>
          <div className="text-2xl font-semibold text-slate-900">{myApps.length}</div>
          <div className="text-[11px] text-slate-500 mt-1">Academic Year 2026-27</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-slate-500 font-medium">Pending Deficiencies</span>
            {deficiencyApps.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
            )}
          </div>
          <div className="text-2xl font-semibold text-slate-900">
            {deficiencyApps.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {deficiencyApps.length > 0 ? (
              <span className="text-red-700 font-medium">Rectification required</span>
            ) : (
              'All requirements clear'
            )}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium mb-1">Active Undertakings</div>
          <div className="text-2xl font-semibold text-slate-900">3</div>
          <div className="text-[11px] text-slate-500 mt-1">Regulatory filings up to date</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-slate-500 font-medium">Expiring Documents</span>
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          </div>
          <div className="text-2xl font-semibold text-slate-900">1</div>
          <div className="text-[11px] text-amber-700 font-medium mt-1">
            Lease deed renewal due soon
          </div>
        </div>
      </div>

      {/* 3. Simplified Application Card with Horizontal Stepper */}
      <div className="space-y-4">
        {myApps.map((app) => {
          const isReturned = app.workflowStage === 'DEFICIENCY_RETURNED';

          return (
            <div
              key={app.id}
              className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-4"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold text-slate-900 text-sm">
                      {app.id}
                    </span>
                    <StatusBadge stage={app.workflowStage} />
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {app.type} • Submitted on {new Date(app.submissionDate).toLocaleDateString('en-GB')}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleAuditModal}
                    className="text-xs text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span>View Activity Log</span>
                  </button>
                </div>
              </div>

              {/* Clean Horizontal Stepper */}
              <ProgressStepper currentStage={app.workflowStage} />

              {/* Status Banner */}
              <div
                className={`p-3 rounded-md text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isReturned
                    ? 'bg-red-50 border border-red-200 text-red-950'
                    : 'bg-slate-50 border border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  {isReturned ? (
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-blue-900 shrink-0" />
                  )}
                  <span>
                    {isReturned
                      ? 'Deficiency notice communicated by Regional Scrutiny Officer. Rectification required within statutory period.'
                      : `Currently under review at Western Regional Office (Mumbai). Regional Officer assigned.`}
                  </span>
                </div>

                {isReturned && (
                  <button
                    onClick={() => setSelectedAppForDeficiency(app.id)}
                    className="px-3 py-1.5 rounded bg-red-700 hover:bg-red-800 text-white font-medium text-xs whitespace-nowrap self-start sm:self-auto transition-colors"
                  >
                    Respond to Deficiency
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Deficiency Response Modal */}
      {selectedAppForDeficiency && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-xl border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900 text-sm">
                  Deficiency Rectification Submission
                </h3>
                <p className="text-[11px] text-slate-500">
                  Application ID: {selectedAppForDeficiency}
                </p>
              </div>
              <button
                onClick={() => setSelectedAppForDeficiency(null)}
                className="text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div>
                <label className="font-medium text-slate-700 block mb-1">
                  Institutional Response / Explanation
                </label>
                <textarea
                  rows={3}
                  value={rectificationText}
                  onChange={(e) => setRectificationText(e.target.value)}
                  className="w-full text-xs p-2.5 rounded border border-slate-300 focus:outline-none focus:border-blue-900"
                />
              </div>

              <div className="border border-dashed border-slate-300 p-4 rounded-md text-center bg-slate-50/50">
                <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                <span className="font-medium text-slate-800 block text-xs">
                  Attach Certified Revenue Record / Lease Map (PDF, Max 10MB)
                </span>
                <button
                  type="button"
                  onClick={() => setShowDigiLocker(true)}
                  className="mt-2 text-xs text-blue-900 font-medium hover:underline"
                >
                  Or fetch verified certificate via DigiLocker
                </button>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  onClick={() => setSelectedAppForDeficiency(null)}
                  className="px-3 py-1.5 rounded border border-slate-200 text-slate-700 text-xs hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleResubmit(selectedAppForDeficiency)}
                  className="px-4 py-1.5 rounded bg-blue-900 hover:bg-blue-950 text-white font-medium text-xs flex items-center gap-1.5 transition-colors"
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
