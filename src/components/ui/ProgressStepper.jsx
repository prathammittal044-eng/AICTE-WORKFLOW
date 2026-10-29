import React from 'react';
import { Check } from 'lucide-react';

export default function ProgressStepper({ currentStage }) {
  const steps = [
    { id: 'SUBMITTED', stepNum: 1, label: 'Submitted' },
    { id: 'SCRUTINY', stepNum: 2, label: 'Scrutiny' },
    { id: 'EVC_SCHEDULED', stepNum: 3, label: 'EVC Visit' },
    { id: 'EVC_REPORT_SUBMITTED', stepNum: 4, label: 'EVC Report' },
    { id: 'SAC_PROCESSING', stepNum: 5, label: 'SAC/SHC' },
    { id: 'APPROVED', stepNum: 6, label: 'Approval Order' }
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
  const isDeficiency = currentStage === 'DEFICIENCY_RETURNED';

  return (
    <div className="w-full py-3">
      <div className="flex items-center justify-between relative">
        {/* Connecting Horizontal Line */}
        <div className="absolute left-4 right-4 top-3.5 -translate-y-1/2 h-0.5 bg-slate-200 z-0" />

        {steps.map((step) => {
          const isPassed = step.stepNum < activeIndex;
          const isCurrent = step.stepNum === activeIndex;

          let circleStyle = 'bg-white border-2 border-slate-300 text-slate-400';
          let textStyle = 'text-slate-500 font-normal';

          if (isPassed) {
            circleStyle = 'bg-emerald-600 border-2 border-emerald-600 text-white';
            textStyle = 'text-slate-800 font-medium';
          } else if (isCurrent) {
            if (isDeficiency) {
              circleStyle = 'bg-red-600 border-2 border-red-600 text-white';
              textStyle = 'text-red-700 font-semibold';
            } else {
              circleStyle = 'bg-blue-900 border-2 border-blue-900 text-white';
              textStyle = 'text-blue-950 font-semibold';
            }
          }

          return (
            <div key={step.id} className="flex flex-col items-center relative z-10 text-center flex-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shadow-2xs transition-colors ${circleStyle}`}
              >
                {isPassed ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : step.stepNum}
              </div>
              <span className={`text-[11px] mt-1.5 leading-tight ${textStyle}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
