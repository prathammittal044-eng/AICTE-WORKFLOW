import React from 'react';
import { AlertCircle, ShieldAlert } from 'lucide-react';

export default function HumanInLoopBanner() {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-md text-amber-950 mb-4 shadow-xs">
      <div className="flex items-start gap-2.5">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed">
          <span className="font-bold uppercase tracking-wide text-amber-900 block mb-0.5">
            Mandatory Regulatory Safeguard (Human-in-the-Loop Architecture)
          </span>
          <p className="text-slate-700">
            AI Document Validation flags (powered by simulated <strong>LayoutLMv3</strong> &amp; <strong>Donut Transformer</strong>) and image tamper scores (<strong>Chen et al., Signal Processing 2022</strong>) are strictly advisory screening signals, not definitive legal proof.
          </p>
          <p className="text-slate-600 mt-1 font-medium">
            Per public governance guidelines (<strong>Bullock et al., JPART 2022</strong>), authorized AICTE Regional Officers retain full statutory decision authority and must manually cross-verify all flagged discrepancies.
          </p>
        </div>
      </div>
    </div>
  );
}
