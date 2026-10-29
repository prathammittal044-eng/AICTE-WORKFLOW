import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import ProgressStepper from '../../components/ui/ProgressStepper';
import StatusBadge from '../../components/ui/StatusBadge';
import { EVC_EXPERTS_POOL } from '../../lib/constants';
import {
  Calendar,
  Users,
  Gavel,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Building,
  Upload,
  Check
} from 'lucide-react';

export default function CommitteeDashboard() {
  const { applications, institutions, scheduleEVCVisit, transitionWorkflow } = useAppStore();

  const [selectedCaseForEVC, setSelectedCaseForEVC] = useState(null);
  const [visitDate, setVisitDate] = useState('2026-11-05');
  const [selectedExperts, setSelectedExperts] = useState([
    EVC_EXPERTS_POOL[0],
    EVC_EXPERTS_POOL[1],
    EVC_EXPERTS_POOL[2]
  ]);

  // EVC Scheduled or Requiring EVC Cases
  const evcCases = applications.filter(
    (a) => a.workflowStage === 'EVC_SCHEDULED' || a.workflowStage === 'EVC_REPORT_SUBMITTED'
  );

  // SAC Hearing Cases
  const sacCases = applications.filter((a) => a.workflowStage === 'SAC_PROCESSING');

  const handleConfirmEVC = (appId) => {
    scheduleEVCVisit(appId, visitDate, selectedExperts, 'Physical On-Site Inspection');
    setSelectedCaseForEVC(null);
  };

  const handleSACRecommend = (appId, recommendation) => {
    transitionWorkflow(
      appId,
      'APPROVED',
      'Prof. K. Narayanan',
      'COMMITTEE',
      `SAC Hearing concluded. Committee recommended: ${recommendation}`
    );
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Committee Overview Banner */}
      <div className="bg-white p-5 rounded-xl border border-gov-border shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-gov-navy" />
            <h2 className="text-xl font-serif font-bold text-gov-navy">
              Expert Visit Committee (EVC) &amp; SAC / SHC Appellate Portal
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Autonomous peer inspection scheduling, non-conflicted expert allocation, and Standing Appellate Committee recommendations.
          </p>
        </div>
      </div>

      {/* Grid: EVC Queue & SAC Hearings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: EVC Cases */}
        <div className="bg-white p-5 rounded-xl border border-gov-border shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gov-navy" />
              <h3 className="font-serif font-bold text-sm text-slate-800">
                EVC Inspection Roster (380 Active in Field)
              </h3>
            </div>
            <span className="text-[11px] bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded font-bold">
              Western Region
            </span>
          </div>

          <div className="space-y-3">
            {evcCases.map((app) => {
              const inst = institutions.find((i) => i.id === app.institutionId);
              return (
                <div key={app.id} className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono font-bold text-gov-navy">{app.id}</span>
                      <h4 className="font-bold text-slate-800 text-sm mt-0.5">{inst?.name}</h4>
                      <p className="text-[11px] text-slate-500">{inst?.city}, {inst?.state} • {app.type}</p>
                    </div>
                    <StatusBadge stage={app.workflowStage} />
                  </div>

                  <div className="bg-white p-2.5 rounded border border-slate-200">
                    <span className="font-bold text-slate-700 block mb-1">
                      Assigned 3-Member Peer Inspection Team:
                    </span>
                    <ul className="space-y-1 text-[11px] text-slate-600">
                      {app.evcDetails?.experts?.map((exp, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span><strong>{exp.name}</strong> ({exp.domain} — {exp.org})</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                    <span className="text-slate-500 text-[11px]">
                      Visit Date: <strong>{app.evcDetails?.visitDate || '05-Nov-2026'}</strong>
                    </span>

                    <button
                      onClick={() =>
                        transitionWorkflow(
                          app.id,
                          'SAC_PROCESSING',
                          'Prof. K. Narayanan',
                          'COMMITTEE',
                          'EVC Report submitted by lead inspector. Infrastructure confirmed. Forwarded to SAC.'
                        )
                      }
                      className="px-3 py-1.5 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1"
                    >
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>Submit Verified EVC Report</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: SAC Hearings */}
        <div className="bg-white p-5 rounded-xl border border-gov-border shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Gavel className="w-4 h-4 text-gov-navy" />
              <h3 className="font-serif font-bold text-sm text-slate-800">
                Standing Appellate Committee (SAC) Cases (92 Queued)
              </h3>
            </div>
            <span className="text-[11px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold">
              Hearings in Session
            </span>
          </div>

          <div className="space-y-3">
            {sacCases.map((app) => {
              const inst = institutions.find((i) => i.id === app.institutionId);
              return (
                <div key={app.id} className="p-4 rounded-lg bg-amber-50/50 border border-amber-300 text-xs space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono font-bold text-gov-navy">{app.id}</span>
                      <h4 className="font-bold text-slate-800 text-sm mt-0.5">{inst?.name}</h4>
                      <p className="text-[11px] text-slate-500">{inst?.city}, {inst?.state} • {app.type}</p>
                    </div>
                    <StatusBadge stage={app.workflowStage} />
                  </div>

                  <div className="bg-white p-3 rounded border border-amber-200">
                    <span className="font-bold text-slate-800 block mb-1">
                      EVC Inspection Finding Summary:
                    </span>
                    <p className="text-[11px] text-slate-700 leading-relaxed">
                      {app.evcReport?.committeeRemarks ||
                        'Satisfactory with conditions. Recommended for approval subject to NBA accreditation SAR submission.'}
                    </p>
                  </div>

                  {/* Hearing Recommendations Action Buttons */}
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-amber-200">
                    <button
                      onClick={() => handleSACRecommend(app.id, 'Approved with Conditions (NBA SAR)')}
                      className="px-3 py-1.5 rounded bg-gov-navy hover:bg-gov-navyLight text-white font-bold text-xs"
                    >
                      Recommend Conditional Approval
                    </button>
                    <button
                      onClick={() => handleSACRecommend(app.id, 'Full Unconditional Approval')}
                      className="px-3.5 py-1.5 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs"
                    >
                      Recommend Full Approval
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
