import React from 'react';
import { APH_STAGES } from '../../lib/constants';

export default function StatusBadge({ stage, size = 'sm' }) {
  const meta = APH_STAGES[stage] || {
    label: stage,
    color: 'bg-slate-100 text-slate-700 border-slate-200'
  };

  const sizeClasses = size === 'xs' ? 'text-[10px] px-2 py-0.2' : 'text-[11px] px-2.5 py-0.5';

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${meta.color} ${sizeClasses} whitespace-nowrap`}
    >
      {meta.label}
    </span>
  );
}
