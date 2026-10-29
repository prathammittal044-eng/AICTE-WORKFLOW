import React from 'react';
import { Info } from 'lucide-react';

export default function HumanInLoopBanner() {
  return (
    <div className="bg-slate-100 border border-slate-200 p-3 rounded-md text-slate-800 text-xs flex items-start gap-2.5">
      <Info className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
      <div className="leading-relaxed">
        <span className="font-semibold text-slate-900 block mb-0.5">
          Regulatory Scrutiny Notice
        </span>
        <p className="text-slate-600">
          Automated document checks assist in identifying parameter discrepancies. The reviewing officer must independently verify all flagged fields against the original records and record a formal statutory finding.
        </p>
      </div>
    </div>
  );
}
