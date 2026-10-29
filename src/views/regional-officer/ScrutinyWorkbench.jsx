import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import HumanInLoopBanner from '../../components/ui/HumanInLoopBanner';
import StatusBadge from '../../components/ui/StatusBadge';
import { ArrowLeft, Check, X, FileText, Send, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ScrutinyWorkbench({ appId, onBack }) {
  const { applications, institutions, transitionWorkflow, returnWithDeficiencies } = useAppStore();

  const app = applications.find((a) => a.id === appId) || applications[0];
  const inst = institutions.find((i) => i.id === app.institutionId);

  const [activeDocTab, setActiveDocTab] = useState('LEASE_DEED');
  const [showDeficiencyModal, setShowDeficiencyModal] = useState(false);

  // Officer Verification Checklist
  const [checklist, setChecklist] = useState([
    { id: 'CHK-1', label: 'Land Area Compliance (Clause 2.1 - Min 2.5 Acres)', verified: false, note: 'Deed extracted 4.80 Acres vs declared 5.20 Acres' },
    { id: 'CHK-2', label: 'Faculty Cadre Ratio (1:15 & Cadre Structure)', verified: true, note: 'Approved faculty list verified against sanctioned intake' },
    { id: 'CHK-3', label: 'Building Plan Approval (< 5 Years)', verified: true, note: 'Municipal town planning approval valid' },
    { id: 'CHK-4', label: 'Fire Safety Clearance Certificate', verified: true, note: 'State Fire Service certificate valid' },
    { id: 'CHK-5', label: 'Anti-Ragging & Statutory Affidavits', verified: true, note: 'e-Stamp affidavits verified' }
  ]);

  const [deficiencyCategory, setDeficiencyCategory] = useState('LAND_TITLE_DEFICIT');
  const [deficiencyReason, setDeficiencyReason] = useState(
    'Land lease deed shows extracted area 4.80 Acres against declared 5.20 Acres. Discrepancy observed under APH Clause 2.1. Submit certified municipal revenue survey map.'
  );

  const handleToggleCheck = (id) => {
    setChecklist(
      checklist.map((c) => (c.id === id ? { ...c, verified: !c.verified } : c))
    );
  };

  const handleClearScrutiny = () => {
    transitionWorkflow(
      app.id,
      'EVC_SCHEDULED',
      'Shri Prakash Mehta',
      'REGIONAL_OFFICER',
      'Scrutiny verified. Infrastructure requirements cleared. Forwarded for EVC committee visit.'
    );
    if (onBack) onBack();
  };

  const handleReturnDeficiencies = () => {
    returnWithDeficiencies(
      app.id,
      [{ category: deficiencyCategory, description: deficiencyReason }],
      'Returned to institution for deficiency rectification under APH norms.'
    );
    setShowDeficiencyModal(false);
    if (onBack) onBack();
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 rounded border border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-medium flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold text-slate-900 font-mono">
                {app.id}
              </span>
              <StatusBadge stage={app.workflowStage} />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {inst?.name} • {inst?.city}, {inst?.state} • {app.type}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDeficiencyModal(true)}
            className="px-3.5 py-1.5 rounded border border-red-300 bg-red-50 hover:bg-red-100 text-red-800 text-xs font-medium transition-colors"
          >
            Return for Deficiencies
          </button>
          <button
            onClick={handleClearScrutiny}
            className="px-3.5 py-1.5 rounded bg-blue-900 hover:bg-blue-950 text-white text-xs font-medium transition-colors"
          >
            Clear Scrutiny &amp; Proceed to EVC
          </button>
        </div>
      </div>

      {/* Regulatory Scrutiny Notice */}
      <HumanInLoopBanner />

      {/* 2-Column Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Document Inspection Viewer (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden flex flex-col">
          {/* Document Tabs */}
          <div className="p-3 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-1 text-xs">
              <button
                onClick={() => setActiveDocTab('LEASE_DEED')}
                className={`px-3 py-1.5 rounded text-xs transition-colors ${
                  activeDocTab === 'LEASE_DEED'
                    ? 'bg-white font-medium text-blue-900 shadow-2xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Land Lease Deed
              </button>
              <button
                onClick={() => setActiveDocTab('FIRE_NOC')}
                className={`px-3 py-1.5 rounded text-xs transition-colors ${
                  activeDocTab === 'FIRE_NOC'
                    ? 'bg-white font-medium text-blue-900 shadow-2xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Fire Safety NOC
              </button>
              <button
                onClick={() => setActiveDocTab('AFFIDAVIT')}
                className={`px-3 py-1.5 rounded text-xs transition-colors ${
                  activeDocTab === 'AFFIDAVIT'
                    ? 'bg-white font-medium text-blue-900 shadow-2xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Affidavit
              </button>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              Page 1 of 8
            </span>
          </div>

          {/* Clean Document View Frame */}
          <div className="p-5 flex-1 bg-slate-100 flex flex-col justify-between min-h-[360px]">
            <div className="bg-white p-6 rounded border border-slate-200 shadow-xs text-xs space-y-3 leading-relaxed text-slate-800">
              <div className="text-center pb-3 border-b border-slate-200">
                <div className="font-semibold text-xs tracking-wider uppercase text-slate-900">
                  Government of Maharashtra • Registration &amp; Stamps Department
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Registered Deed No. 2018/14298 • Sub-Registrar Office, Nagpur
                </div>
              </div>

              <p>
                <strong>INDENTURE OF LEASE</strong> executed this 14th day of March 2018, between the Lessor and{' '}
                <span className="font-medium text-slate-900">
                  Shri Ramdeobaba College of Engineering &amp; Management, Nagpur
                </span>.
              </p>

              <div className="p-2.5 rounded bg-amber-50/70 border border-amber-200 text-slate-800">
                <span className="font-medium text-slate-900 block mb-0.5">Demised Property Clause:</span>
                All that piece and parcel of institutional land bearing Survey No. 42/1 admeasuring{' '}
                <span className="font-semibold text-slate-900 bg-amber-100 px-1 rounded">
                  4.80 ACRES
                </span>{' '}
                for an initial period of 30 Years...
              </div>

              <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-100">
                <span>Registration Status: Valid</span>
                <span>Stamp Duty: Paid (e-Receipt verified)</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 font-mono pt-3 flex items-center justify-between">
              <span>Attached File: Registered_Lease_Deed_SRCEM.pdf</span>
              <span>DigiLocker Verified Record</span>
            </div>
          </div>
        </div>

        {/* Right Column: Scrutiny Verification & Pre-Check (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Automated Document Pre-Check */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Automated Document Pre-Check
            </h3>
            <p className="text-[11px] text-slate-500 mb-3">
              Parameters extracted from uploaded certificates for officer cross-verification
            </p>

            <div className="border border-slate-200 rounded-md overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-700 text-[11px] font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5 border-r border-slate-200">Field</th>
                    <th className="p-2.5 border-r border-slate-200">Declared in Form</th>
                    <th className="p-2.5 border-r border-slate-200">Extracted from Document</th>
                    <th className="p-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {app.aiScreening?.extractedFields?.map((f, i) => (
                    <tr key={i} className={!f.match ? 'bg-amber-50/40' : ''}>
                      <td className="p-2.5 border-r border-slate-200 font-medium text-slate-700">
                        {f.field}
                      </td>
                      <td className="p-2.5 border-r border-slate-200 text-slate-900">
                        {f.declared}
                      </td>
                      <td className="p-2.5 border-r border-slate-200 text-slate-900 font-mono">
                        {f.extracted}
                      </td>
                      <td className="p-2.5">
                        {f.match ? (
                          <span className="text-emerald-700 flex items-center gap-1 text-[11px] font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Verified</span>
                          </span>
                        ) : (
                          <span className="text-amber-800 font-medium text-[11px] flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                            <span>Discrepancy</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Officer Verification Checklist */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
              Officer Scrutiny Checklist (APH Norms)
            </h3>

            <div className="space-y-2">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleToggleCheck(item.id)}
                  className={`p-3 rounded-md border transition-colors cursor-pointer flex items-start gap-3 ${
                    item.verified
                      ? 'bg-slate-50/50 border-slate-200 text-slate-800'
                      : 'bg-amber-50/50 border-amber-200 text-amber-950'
                  }`}
                >
                  <button
                    type="button"
                    className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                      item.verified
                        ? 'bg-blue-900 border-blue-900 text-white'
                        : 'bg-white border-slate-300 text-slate-400'
                    }`}
                  >
                    {item.verified && <Check className="w-3 h-3 stroke-[2.5]" />}
                  </button>
                  <div className="text-xs flex-1">
                    <div className="font-medium leading-tight">{item.label}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{item.note}</div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {item.verified ? 'Verified' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Deficiency Memo Modal */}
      {showDeficiencyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-xl border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900 text-sm">
                  Record Scrutiny Deficiency Notice
                </h3>
                <p className="text-[11px] text-slate-500">
                  Application ID: {app.id}
                </p>
              </div>
              <button
                onClick={() => setShowDeficiencyModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div>
                <label className="font-medium text-slate-700 block mb-1">
                  Deficiency Category
                </label>
                <select
                  value={deficiencyCategory}
                  onChange={(e) => setDeficiencyCategory(e.target.value)}
                  className="w-full text-xs p-2 rounded border border-slate-300 focus:outline-none focus:border-blue-900 bg-white"
                >
                  <option value="LAND_TITLE_DEFICIT">Land Area / Title Deed Discrepancy (Clause 2.1 APH)</option>
                  <option value="FACULTY_CADRE_MISMATCH">Faculty Cadre Ratio Shortfall (Cadre Norms 1:15)</option>
                  <option value="FIRE_SAFETY_NOC">Fire Safety Certificate Expired / Unverified</option>
                  <option value="BUILDING_PLAN_OLD">Building Plan Approval Expired (&gt; 5 Years)</option>
                </select>
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">
                  Officer Statutory Finding &amp; Rectification Requirement
                </label>
                <textarea
                  rows={4}
                  value={deficiencyReason}
                  onChange={(e) => setDeficiencyReason(e.target.value)}
                  className="w-full text-xs p-2.5 rounded border border-slate-300 focus:outline-none focus:border-blue-900"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded border border-slate-200 text-slate-600 text-[11px]">
                Communicating this deficiency notice will notify the institution and initiate the standard 15-day rectification window under APH regulations.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  onClick={() => setShowDeficiencyModal(false)}
                  className="px-3 py-1.5 rounded border border-slate-200 text-slate-700 text-xs hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReturnDeficiencies}
                  className="px-4 py-1.5 rounded bg-red-700 hover:bg-red-800 text-white font-medium text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Issue Deficiency Notice</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
