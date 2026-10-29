import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import HumanInLoopBanner from '../../components/ui/HumanInLoopBanner';
import ProgressStepper from '../../components/ui/ProgressStepper';
import StatusBadge from '../../components/ui/StatusBadge';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Flame,
  Check,
  X,
  FileSpreadsheet,
  Building,
  Eye,
  Send,
  Loader2
} from 'lucide-react';

export default function ScrutinyWorkbench({ appId, onBack }) {
  const { applications, institutions, transitionWorkflow, returnWithDeficiencies } = useAppStore();

  const app = applications.find((a) => a.id === appId) || applications[0];
  const inst = institutions.find((i) => i.id === app.institutionId);

  const [activeDocTab, setActiveDocTab] = useState('LEASE_DEED');
  const [showTamperHeatmap, setShowTamperHeatmap] = useState(false);
  const [showDeficiencyModal, setShowDeficiencyModal] = useState(false);

  // Verification Checklist State
  const [checklist, setChecklist] = useState([
    { id: 'CHK-1', label: 'Land Area Compliance (Clause 2.1 - Min 2.5 Acres)', passed: false, note: 'AI mismatch flagged: 4.80 vs 5.20 Acres' },
    { id: 'CHK-2', label: 'Faculty-to-Student Ratio (1:15 & Cadre Ratio)', passed: true, note: '64 faculty approved against sanctioned intake' },
    { id: 'CHK-3', label: 'Building Plan Approval (< 5 Years Old)', passed: true, note: 'Town Planning authority approval verified' },
    { id: 'CHK-4', label: 'Fire Safety Certificate & NOC', passed: true, note: 'Valid through Dec 2026' },
    { id: 'CHK-5', label: 'Anti-Ragging Undertaking & Grievance Redressal', passed: true, note: 'NeSL e-Stamp verified' }
  ]);

  // Deficiency Return Form State
  const [deficiencyReason, setDeficiencyReason] = useState(
    'Land lease deed shows extracted area 4.80 Acres vs declared 5.20 Acres. Discrepancy violates APH Clause 2.1. Submit certified municipal revenue survey deed.'
  );
  const [deficiencyCategory, setDeficiencyCategory] = useState('LAND_TITLE_DEFICIT');

  const handleToggleCheck = (id) => {
    setChecklist(
      checklist.map((c) => (c.id === id ? { ...c, passed: !c.passed } : c))
    );
  };

  const handleClearScrutiny = () => {
    transitionWorkflow(
      app.id,
      'EVC_SCHEDULED',
      'Shri Prakash Mehta',
      'REGIONAL_OFFICER',
      'Scrutiny verified. Infrastructure requirements cleared. Forwarded for EVC site visit.'
    );
    if (onBack) onBack();
  };

  const handleReturnDeficiencies = () => {
    returnWithDeficiencies(
      app.id,
      [{ category: deficiencyCategory, description: deficiencyReason }],
      'Returned to institution for urgent rectification under APH norms.'
    );
    setShowDeficiencyModal(false);
    if (onBack) onBack();
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Top Header Bar with Navigation */}
      <div className="bg-white p-4 rounded-xl border border-gov-border shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center gap-1 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Queue</span>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-serif font-bold text-gov-navy font-mono">
                {app.id}
              </h2>
              <StatusBadge stage={app.workflowStage} />
              {inst?.digilockerVerified && (
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  DigiLocker Verified
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 font-semibold mt-0.5">
              {inst?.name} ({inst?.city}, {inst?.state}) • {app.type}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDeficiencyModal(true)}
            className="px-3.5 py-2 rounded bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Return with Deficiencies</span>
          </button>

          <button
            onClick={handleClearScrutiny}
            className="px-4 py-2 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Clear Scrutiny &amp; Proceed to EVC</span>
          </button>
        </div>
      </div>

      {/* Progress Stepper */}
      <ProgressStepper currentStage={app.workflowStage} />

      {/* Mandatory Human In Loop Safeguard */}
      <HumanInLoopBanner />

      {/* Split-Screen Review Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* LEFT COLUMN: Checklist & Institutional Declarations (50% - 6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Institutional Declarations Box */}
          <div className="bg-white p-4 rounded-xl border border-gov-border shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 pb-2 border-b border-slate-100 flex items-center justify-between">
              <span>Institutional Dossier Parameters</span>
              <span className="font-mono text-gov-navy">PID: {inst?.pid}</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs mb-3">
              <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                <span className="text-slate-500 text-[11px] block">Declared Land Area</span>
                <span className="font-bold text-slate-800 text-sm">{inst?.landAreaAcres} Acres</span>
                <span className="text-[10px] text-slate-500 block">Min required: 2.50 Acres</span>
              </div>

              <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                <span className="text-slate-500 text-[11px] block">Built-Up Area</span>
                <span className="font-bold text-slate-800 text-sm">{inst?.builtUpAreaSqM?.toLocaleString()} sq.m</span>
                <span className="text-[10px] text-emerald-700 font-semibold block">Meets APH Carpet norms</span>
              </div>

              <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                <span className="text-slate-500 text-[11px] block">Sanctioned Intake</span>
                <span className="font-bold text-slate-800 text-sm">{inst?.sanctionedIntake} Seats</span>
                <span className="text-[10px] text-slate-500 block">5 Approved Programmes</span>
              </div>

              <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                <span className="text-slate-500 text-[11px] block">AISHE Reference</span>
                <span className="font-mono font-bold text-gov-navy text-sm">{inst?.aisheCode}</span>
                <span className="text-[10px] text-emerald-700 font-semibold block">Ministry Data Linked</span>
              </div>
            </div>

            <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-200">
              <span className="font-bold text-slate-700 block mb-0.5">Approved Programmes:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {inst?.programmes?.map((p, idx) => (
                  <span key={idx} className="bg-white px-2 py-0.5 rounded border border-slate-300 text-[11px]">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Verification Checklist */}
          <div className="bg-white p-4 rounded-xl border border-gov-border shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 pb-2 border-b border-slate-100 flex items-center justify-between">
              <span>APH 2024-27 Scrutiny Parameters Checklist</span>
              <span className="text-[11px] text-gov-navy font-bold">Manual Officer Sign-Off</span>
            </h3>

            <div className="space-y-2.5">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleToggleCheck(item.id)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${
                    item.passed
                      ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50/60 border-rose-300 text-rose-950'
                  }`}
                >
                  <button
                    className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0 border ${
                      item.passed
                        ? 'bg-emerald-600 border-emerald-700 text-white'
                        : 'bg-white border-rose-400 text-rose-600'
                    }`}
                  >
                    {item.passed ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  </button>
                  <div className="text-xs flex-1">
                    <div className="font-bold leading-tight">{item.label}</div>
                    <div className="text-[11px] opacity-80 mt-0.5">{item.note}</div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/80 border border-slate-200">
                    {item.passed ? 'PASSED' : 'DEFICIENT'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: AI Document Inspection & Tamper Heatmap (50% - 6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white p-4 rounded-xl border border-gov-border shadow-xs flex flex-col h-full">
            {/* Document Tabs */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
              <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
                <button
                  onClick={() => setActiveDocTab('LEASE_DEED')}
                  className={`px-3 py-1.5 rounded font-bold transition-colors ${
                    activeDocTab === 'LEASE_DEED'
                      ? 'bg-gov-navy text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Land Lease Deed
                </button>
                <button
                  onClick={() => setActiveDocTab('FIRE_NOC')}
                  className={`px-3 py-1.5 rounded font-bold transition-colors ${
                    activeDocTab === 'FIRE_NOC'
                      ? 'bg-gov-navy text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Fire Safety NOC
                </button>
                <button
                  onClick={() => setActiveDocTab('AFFIDAVIT')}
                  className={`px-3 py-1.5 rounded font-bold transition-colors ${
                    activeDocTab === 'AFFIDAVIT'
                      ? 'bg-gov-navy text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Affidavit Rs.100
                </button>
              </div>

              {/* Heatmap Toggle Button */}
              <button
                onClick={() => setShowTamperHeatmap(!showTamperHeatmap)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all shadow-xs ${
                  showTamperHeatmap
                    ? 'bg-rose-700 text-white animate-pulse'
                    : 'bg-amber-100 text-amber-900 border border-amber-400 hover:bg-amber-200'
                }`}
                title="Toggle simulated tamper localization overlay"
              >
                <Flame className="w-3.5 h-3.5" />
                <span>{showTamperHeatmap ? 'Tamper Heatmap ON' : 'View Tamper Heatmap'}</span>
              </button>
            </div>

            {/* Document Viewer Frame with Mock Deed and Tamper Hotspot */}
            <div className="relative border-2 border-slate-300 rounded-lg p-4 bg-slate-100 min-h-[220px] flex flex-col justify-between overflow-hidden shadow-inner">
              {/* Fake Document Canvas */}
              <div className="bg-amber-50/70 p-4 rounded border border-amber-200 shadow-sm relative font-serif text-slate-800 text-xs">
                {/* Simulated Deed Header */}
                <div className="text-center pb-2 border-b border-amber-300 mb-3">
                  <div className="font-bold text-sm tracking-wide text-amber-950 uppercase">
                    Government of Maharashtra • Registration &amp; Stamps Dept
                  </div>
                  <div className="text-[10px] text-slate-600">
                    Book No. 1 • Volume 491 • Serial No. 2018/14298 • Sub-Registrar Nagpur
                  </div>
                </div>

                <div className="space-y-1.5 leading-relaxed text-[11px]">
                  <p>
                    <strong>THIS INDENTURE OF LEASE</strong> executed this Fourteenth day of March 2018, between the Lessor and{' '}
                    <span className="font-bold bg-yellow-100 px-1">Shri Ramdeobaba College of Engineering &amp; Management</span>.
                  </p>
                  <p className="relative inline-block">
                    The Lessor hereby demises unto the Lessee all that piece and parcel of land admeasuring{' '}
                    <span className={`font-bold px-1.5 py-0.5 rounded transition-all ${
                      showTamperHeatmap ? 'bg-rose-600 text-white ring-4 ring-rose-400' : 'bg-amber-200'
                    }`}>
                      4.80 ACRES (Survey No. 42/1)
                    </span>{' '}
                    for a period of 30 Years...
                  </p>
                  <p className="text-[10px] text-slate-500 pt-2">
                    Digital Signature Verified: 14-Mar-2018 11:22:10 IST • Hash: sha256:e3b0c4...
                  </p>
                </div>

                {/* Heatmap Overlay Simulation */}
                {showTamperHeatmap && (
                  <div className="absolute inset-0 bg-rose-950/20 pointer-events-none rounded flex items-center justify-center">
                    <div className="bg-rose-900/90 text-white p-2.5 rounded-lg border border-rose-400 shadow-2xl max-w-xs text-center backdrop-blur-xs">
                      <div className="flex items-center justify-center gap-1 font-bold text-xs text-rose-200">
                        <AlertTriangle className="w-4 h-4 text-rose-400" />
                        <span>Tamper Risk Signal: 88% Confidence</span>
                      </div>
                      <p className="text-[10px] text-rose-100 mt-1">
                        Pixel anomaly &amp; recapturing artefact detected on land acreage text line (Chen et al. 2022).
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Document Metadata Bar */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200 mt-3 font-mono">
                <span>File: Registered_Lease_Deed_SRCEM.pdf</span>
                <span>Page 1 of 8 • Verified 24-Oct-2026</span>
              </div>
            </div>

            {/* AI Extracted Fields Table (LayoutLMv3 & Donut) */}
            <div className="mt-4 pt-3 border-t border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gov-navy flex items-center gap-1.5">
                  <span>🤖 LayoutLMv3 Field Extraction Matrix</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  Confidence: 94.2% • Model v3.2
                </span>
              </div>

              <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 text-slate-700 text-[10px] uppercase font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-2 border-r border-slate-200">Field Name</th>
                      <th className="p-2 border-r border-slate-200">Declared Value</th>
                      <th className="p-2 border-r border-slate-200">AI Extracted Value</th>
                      <th className="p-2">Match Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-sans">
                    {app.aiScreening?.extractedFields?.map((f, i) => (
                      <tr key={i} className={!f.match ? 'bg-amber-50 font-bold' : ''}>
                        <td className="p-2 border-r border-slate-200 text-slate-700">{f.field}</td>
                        <td className="p-2 border-r border-slate-200 text-slate-900">{f.declared}</td>
                        <td className="p-2 border-r border-slate-200 text-gov-navy">{f.extracted}</td>
                        <td className="p-2">
                          {f.match ? (
                            <span className="text-emerald-700 flex items-center gap-1 text-[11px]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              Match ({Math.round(f.conf * 100)}%)
                            </span>
                          ) : (
                            <span className="text-rose-700 flex items-center gap-1 text-[11px] font-bold">
                              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                              Discrepancy
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deficiency Return Modal */}
      {showDeficiencyModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl border border-gov-border overflow-hidden">
            <div className="p-4 bg-rose-800 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-300" />
                <h3 className="font-serif font-bold text-sm">Issue Formal Scrutiny Deficiency Memo</h3>
              </div>
              <button
                onClick={() => setShowDeficiencyModal(false)}
                className="p-1 rounded text-rose-200 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Deficiency Classification Category
                </label>
                <select
                  value={deficiencyCategory}
                  onChange={(e) => setDeficiencyCategory(e.target.value)}
                  className="w-full text-xs p-2 rounded border border-slate-300 focus:outline-none focus:border-gov-navy bg-white"
                >
                  <option value="LAND_TITLE_DEFICIT">Land Area / Title Deed Deficit (Clause 2.1 APH)</option>
                  <option value="FACULTY_CADRE_MISMATCH">Faculty Cadre Ratio Deficiency (Min 1:15 Cadre)</option>
                  <option value="FIRE_SAFETY_NOC">Fire Safety Certificate Expired / Unverified</option>
                  <option value="BUILDING_PLAN_OLD">Building Plan Approval &gt; 5 Years Old</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Officer Statutory Observations &amp; Rectification Mandate
                </label>
                <textarea
                  rows={4}
                  value={deficiencyReason}
                  onChange={(e) => setDeficiencyReason(e.target.value)}
                  className="w-full text-xs p-2.5 rounded border border-slate-300 focus:outline-none focus:border-gov-navy"
                  placeholder="Specify deficiency grounds citing applicable Approval Process Handbook clauses..."
                />
              </div>

              <div className="bg-slate-50 p-3 rounded border border-slate-200 text-[11px] text-slate-600">
                Notice: Dispatching this memo will transition the application to <strong>DEFICIENCY_RETURNED</strong> and start the institutional 15-day statutory rectification countdown.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  onClick={() => setShowDeficiencyModal(false)}
                  className="px-3 py-1.5 rounded border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReturnDeficiencies}
                  className="px-4 py-1.5 rounded bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch Deficiency Memo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
