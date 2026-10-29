import React from 'react';
import { Check, Clock, AlertCircle } from 'lucide-react';

export default function ProgressStepper({ currentStage }) {
  const steps = [
    { id: 'SUBMITTED', stepNum: 1, title: 'Submission', subtitle: 'Digital Dossier' },
    { id: 'SCRUTINY', stepNum: 2, title: 'Scrutiny', subtitle: 'RO Verification' },
    { id: 'EVC_SCHEDULED', stepNum: 3, title: 'EVC Visit', subtitle: 'Peer Scheduling' },
    { id: 'EVC_REPORT_SUBMITTED', stepNum: 4, title: 'EVC Report', subtitle: 'Site Assessment' },
    { id: 'SAC_PROCESSING', stepNum: 5, title: 'SAC / SHC', subtitle: 'Appellate Review' },
    { id: 'APPROVED', stepNum: 6, title: 'Approval Order', subtitle: 'Bureau Clearance' }
  ];

  const getStepIndex = (stage) => {
    switch (stage) {
      case 'SUBMITTED': return 1;
      case 'SCRUTINY':
      case 'DEFICIENCY_RETURNED':
      case 'RESUBMITTED': return 2;
      case 'EVC_SCHEDULED': return 3;
      case 'EVC_REPORT_SUBMITTED': return 4;
      case 'SAC_PROCESSING': return 5;
      case 'APPROVED':
      case 'CONDITIONALLY_APPROVED':
      case 'REJECTED': return 6;
      default: return 1;
    }
  };

  const activeIndex = getStepIndex(currentStage);

  return (
    <div className="w-full bg-white p-4 rounded-lg border border-gov-border shadow-xs my-4">
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gov-navy">
            AICTE Approval Process Handbook (APH 2024-27) Workflow Engine
          </span>
        </div>
        <span className="text-[11px] font-semibold text-slate-500">
          Stage {activeIndex} of 6
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {steps.map((s) => {
          const isPassed = s.stepNum < activeIndex;
          const isCurrent = s.stepNum === activeIndex;
          const isDeficiency = isCurrent && currentStage === 'DEFICIENCY_RETURNED';

          let stateStyle = 'bg-slate-50 border-slate-200 text-slate-400';
          let badgeStyle = 'bg-slate-200 text-slate-600';

          if (isPassed) {
            stateStyle = 'bg-emerald-50 border-emerald-300 text-emerald-900';
            badgeStyle = 'bg-emerald-600 text-white';
          } else if (isCurrent) {
            if (isDeficiency) {
              stateStyle = 'bg-rose-50 border-rose-400 text-rose-900 shadow-xs';
              badgeStyle = 'bg-rose-600 text-white animate-pulse';
            } else {
              stateStyle = 'bg-gov-navy text-white border-amber-400 shadow-sm';
              badgeStyle = 'bg-amber-400 text-gov-navyDark font-bold';
            }
          }

          return (
            <div
              key={s.id}
              className={`p-2.5 rounded border transition-all ${stateStyle} flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${badgeStyle}`}>
                  {isPassed ? <Check className="w-3 h-3" /> : s.stepNum}
                </span>
                {isCurrent && (
                  <span className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded ${isDeficiency ? 'bg-rose-200 text-rose-900' : 'bg-amber-400 text-gov-navyDark'}`}>
                    {isDeficiency ? 'Deficiency' : 'In Progress'}
                  </span>
                )}
              </div>
              <div>
                <h4 className="text-xs font-bold leading-tight truncate">
                  {s.title}
                </h4>
                <p className="text-[10px] opacity-80 leading-none mt-0.5 truncate">
                  {s.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
