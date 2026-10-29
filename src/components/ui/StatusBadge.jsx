import React from 'react';
import { APH_STAGES } from '../../lib/constants';

export default function StatusBadge({ stage, size = 'sm' }) {
  const meta = APH_STAGES[stage] || {
    label: stage,
    color: 'bg-slate-100 text-slate-800 border-slate-300'
  };

  const sizeClasses = size === 'xs' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2.5 py-0.5';

  return (
    <span
      className={`inline-flex items-center font-bold rounded border ${meta.color} ${sizeClasses} shadow-xs tracking-tight`}
    >
      {meta.label}
    </span>
  );
}
