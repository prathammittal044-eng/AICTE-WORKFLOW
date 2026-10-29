import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import ProgressStepper from '../../components/ui/ProgressStepper';
import StatusBadge from '../../components/ui/StatusBadge';
import {
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Building2,
  TrendingUp,
  Download
} from 'lucide-react';

export default function RODashboard({ onOpenWorkbench }) {
  const { applications, institutions } = useAppStore();
  const [filterType, setFilterType] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Scrutiny Queue list
  const queueApps = applications.filter((app) => {
    const inst = institutions.find((i) => i.id === app.institutionId);
    const matchesSearch =
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inst?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inst?.city.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterType === 'URGENT') return app.slaBreached || app.escalationLevel > 0;
    if (filterType === 'SCRUTINY') return app.workflowStage === 'SCRUTINY' || app.workflowStage === 'RESUBMITTED';
    if (filterType === 'DEFICIENCY') return app.workflowStage === 'DEFICIENCY_RETURNED';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Notice Banner */}
      <div className="bg-amber-100 border border-amber-300 rounded-lg p-3 text-xs text-amber-950 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="bg-amber-600 text-white font-bold text-[10px] px-1.5 py-0.5 rounded uppercase">
            Official Circular
          </span>
          <span className="font-semibold">
            APH 2026-27 Western Region Scrutiny Window: 6 days remaining. Automated SLA escalation matrix active.
          </span>
        </div>
        <span className="font-bold text-gov-navy hover:underline cursor-pointer hidden md:inline">
          View Regional Schedule →
        </span>
      </div>

      {/* KPI 6-Metric Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-3.5 rounded-lg border border-gov-border shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Total Applications
          </div>
          <div className="text-2xl font-serif font-bold text-gov-navy">8,420</div>
          <div className="text-[10px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>Western: 1,840</span>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-lg border-l-4 border-l-gov-navy border-y border-r border-gov-border shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Awaiting Scrutiny
          </div>
          <div className="text-2xl font-serif font-bold text-gov-navy">1,140</div>
          <div className="text-[10px] text-amber-700 font-semibold mt-1">
            Target TAT: 48h (312 in queue)
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-gov-border shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            EVC Scheduled
          </div>
          <div className="text-2xl font-serif font-bold text-slate-800">380</div>
          <div className="text-[10px] text-slate-500 mt-1">
            Peer visits in progress
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-gov-border shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            SAC / SHC Queue
          </div>
          <div className="text-2xl font-serif font-bold text-slate-800">92</div>
          <div className="text-[10px] text-slate-500 mt-1">
            Appellate hearings active
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-lg border-l-4 border-l-emerald-600 border-y border-r border-gov-border shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Approved (EoA)
          </div>
          <div className="text-2xl font-serif font-bold text-emerald-800">4,120</div>
          <div className="text-[10px] text-emerald-700 font-semibold mt-1">
            48.9% clearance rate
          </div>
        </div>

        <div className="bg-rose-50 p-3.5 rounded-lg border border-rose-300 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-rose-800 mb-1 flex items-center justify-between">
            <span>Overdue SLAs</span>
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
          </div>
          <div className="text-2xl font-serif font-bold text-rose-900">
            {applications.filter((a) => a.slaBreached).length > 0 ? '15' : '14'}
          </div>
          <div className="text-[10px] font-bold text-rose-700 mt-1">
            Level-2/3 Alerts Active
          </div>
        </div>
      </div>

      {/* APH 6-Stage Stepper Banner */}
      <ProgressStepper currentStage="SCRUTINY" />

      {/* Main Content: Scrutiny Queue Table + Right Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 9 Columns: Applications Table */}
        <div className="lg:col-span-9 bg-white rounded-xl border border-gov-border shadow-xs overflow-hidden flex flex-col">
          {/* Table Header & Controls */}
          <div className="p-4 border-b border-gov-border">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
              <div>
                <h3 className="text-base font-serif font-bold text-gov-navy">
                  Western Region Scrutiny Queue (AY 2026-27)
                </h3>
                <p className="text-xs text-slate-500">
                  Live verification console under Western Regional Office (Mumbai Bureau)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50">
                  <Download className="w-3.5 h-3.5" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <button
                onClick={() => setFilterType('ALL')}
                className={`px-3 py-1.5 rounded font-semibold transition-colors ${
                  filterType === 'ALL'
                    ? 'bg-gov-navy text-white font-bold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All Applications ({applications.length})
              </button>
              <button
                onClick={() => setFilterType('SCRUTINY')}
                className={`px-3 py-1.5 rounded font-semibold transition-colors ${
                  filterType === 'SCRUTINY'
                    ? 'bg-gov-navy text-white font-bold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                In Scrutiny / Re-scrutiny
              </button>
              <button
                onClick={() => setFilterType('URGENT')}
                className={`px-3 py-1.5 rounded font-semibold transition-colors ${
                  filterType === 'URGENT'
                    ? 'bg-rose-700 text-white font-bold'
                    : 'bg-slate-100 text-rose-700 hover:bg-rose-50'
                }`}
              >
                Urgent / SLA Alerts
              </button>
              <button
                onClick={() => setFilterType('DEFICIENCY')}
                className={`px-3 py-1.5 rounded font-semibold transition-colors ${
                  filterType === 'DEFICIENCY'
                    ? 'bg-gov-navy text-white font-bold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Deficiency Returned
              </button>
            </div>

            {/* Search Input */}
            <div className="mt-3 relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by Application ID, Institution Name, or City..."
                className="w-full text-xs pl-8 pr-3 py-2 rounded border border-gov-border focus:outline-none focus:border-gov-navy"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-gov-border">
                <tr>
                  <th className="p-3 border-r border-gov-border">Application ID &amp; Type</th>
                  <th className="p-3 border-r border-gov-border">Institution Name &amp; PID</th>
                  <th className="p-3 border-r border-gov-border">Current Stage</th>
                  <th className="p-3 border-r border-gov-border">SLA Countdown</th>
                  <th className="p-3 border-r border-gov-border">AI Screening Signal</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-sans">
                {queueApps.map((app) => {
                  const inst = institutions.find((i) => i.id === app.institutionId);
                  const isHighImpactCase = app.id === 'AICTE-APP-2026-087341';

                  return (
                    <tr
                      key={app.id}
                      className={`hover:bg-blue-50/40 transition-colors ${
                        isHighImpactCase ? 'bg-amber-50/50' : ''
                      }`}
                    >
                      <td className="p-3 border-r border-gov-border">
                        <div className="font-mono font-bold text-gov-navy">{app.id}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{app.type}</div>
                      </td>

                      <td className="p-3 border-r border-gov-border max-w-xs">
                        <div className="font-bold text-slate-800 leading-tight">
                          {inst?.name || 'Technical Institute'}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                          PID: {inst?.pid} • {inst?.city}, {inst?.state}
                        </div>
                      </td>

                      <td className="p-3 border-r border-gov-border">
                        <StatusBadge stage={app.workflowStage} />
                      </td>

                      <td className="p-3 border-r border-gov-border">
                        {app.slaBreached ? (
                          <span className="inline-flex items-center gap-1 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs animate-pulse">
                            <AlertTriangle className="w-3 h-3" />
                            SLA Breached (Level 3 Escalated)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded">
                            <Clock className="w-3 h-3 text-amber-700" />
                            2d remaining
                          </span>
                        )}
                      </td>

                      <td className="p-3 border-r border-gov-border">
                        {app.aiRiskLevel === 'HIGH_RISK' ? (
                          <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-900 border border-rose-300 text-[10px] font-bold px-2 py-0.5 rounded">
                            <AlertTriangle className="w-3 h-3 text-rose-600" />
                            Land Area Mismatch (4.8 vs 5.2)
                          </span>
                        ) : app.aiRiskLevel === 'MEDIUM_RISK' ? (
                          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded">
                            Fire NOC Deficit
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-semibold px-2 py-0.5 rounded">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            AI Screen Cleared
                          </span>
                        )}
                      </td>

                      <td className="p-3 text-right">
                        <button
                          onClick={() => onOpenWorkbench(app.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-gov-navy hover:bg-gov-navyLight text-white font-bold text-xs shadow-xs transition-colors"
                        >
                          <span>Open Workbench</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 3 Columns: Alerts & Escalation Matrix */}
        <div className="lg:col-span-3 space-y-4">
          {/* Statutory Expiry Card */}
          <div className="bg-white p-4 rounded-xl border border-gov-border shadow-xs">
            <div className="flex items-center gap-2 text-gov-navy font-serif font-bold text-sm mb-2.5 pb-2 border-b border-slate-100">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>Statutory Document Expiry Radar</span>
            </div>

            <div className="space-y-3">
              <div className="p-2.5 rounded bg-amber-50 border border-amber-300 text-xs">
                <div className="font-bold text-amber-950">Rajiv Gandhi Inst., Bhopal</div>
                <div className="text-[11px] text-amber-900 mt-0.5">
                  Land Lease expires in <strong>17 days</strong> (15-Nov-2026).
                </div>
                <div className="mt-2 text-[10px] bg-amber-200 text-amber-950 px-2 py-0.5 rounded font-bold inline-block">
                  Level-2 Bureau Alert Active
                </div>
              </div>

              <div className="p-2.5 rounded bg-rose-50 border border-rose-300 text-xs">
                <div className="font-bold text-rose-950">Jain Polytechnic, Jaipur</div>
                <div className="text-[11px] text-rose-900 mt-0.5">
                  Fire Safety NOC expired <strong>75 days ago</strong>.
                </div>
                <div className="mt-2 text-[10px] bg-rose-200 text-rose-950 px-2 py-0.5 rounded font-bold inline-block">
                  Level-3 Escalated
                </div>
              </div>
            </div>
          </div>

          {/* Officer Scrutiny Quota */}
          <div className="bg-white p-4 rounded-xl border border-gov-border shadow-xs">
            <h4 className="font-serif font-bold text-sm text-slate-800 mb-2">
              Today's Scrutiny Quota
            </h4>
            <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5">
              <span>Files Scrutinized:</span>
              <span className="font-bold text-gov-navy">42 / 65</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-3">
              <div className="bg-gov-navy h-full rounded-full" style={{ width: '64%' }}></div>
            </div>
            <div className="text-[11px] text-slate-500 leading-tight">
              8 Officers actively reviewing Western Region files.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
