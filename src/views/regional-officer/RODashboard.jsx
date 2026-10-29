import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import StatusBadge from '../../components/ui/StatusBadge';
import { Search, ArrowRight, Clock, AlertCircle } from 'lucide-react';

export default function RODashboard({ onOpenWorkbench }) {
  const { applications, institutions } = useAppStore();
  const [filterType, setFilterType] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const queueApps = applications.filter((app) => {
    const inst = institutions.find((i) => i.id === app.institutionId);
    const matchesSearch =
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inst?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inst?.city.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterType === 'PRIORITY') return app.slaBreached || app.escalationLevel > 0;
    if (filterType === 'SCRUTINY') return app.workflowStage === 'SCRUTINY' || app.workflowStage === 'RESUBMITTED';
    if (filterType === 'DEFICIENCY') return app.workflowStage === 'DEFICIENCY_RETURNED';
    return true;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Page Title & Subtitle */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Regional Scrutiny Queue
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Western Regional Office (Mumbai) • Academic Year 2026–27
        </p>
      </div>

      {/* 4 Compact Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium mb-1">Total Assigned</div>
          <div className="text-2xl font-semibold text-slate-900">1,840</div>
          <div className="text-[11px] text-slate-500 mt-1">Western Region Queue</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium mb-1">Awaiting Scrutiny</div>
          <div className="text-2xl font-semibold text-slate-900">312</div>
          <div className="text-[11px] text-amber-700 font-medium mt-1">Standard TAT: 48 hours</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium mb-1">Deficiencies Pending</div>
          <div className="text-2xl font-semibold text-slate-900">18</div>
          <div className="text-[11px] text-slate-500 mt-1">Under 15-day window</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-slate-500 font-medium">Priority Follow-up</span>
            {applications.some((a) => a.slaBreached) && (
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
            )}
          </div>
          <div className="text-2xl font-semibold text-slate-900">
            {applications.some((a) => a.slaBreached) ? '4' : '3'}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Approaching timeframe limit</div>
        </div>
      </div>

      {/* Main Applications Table Container */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        {/* Filters and Search Bar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1 text-xs">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                filterType === 'ALL'
                  ? 'bg-[#7A1526] text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              All Applications ({applications.length})
            </button>
            <button
              onClick={() => setFilterType('SCRUTINY')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                filterType === 'SCRUTINY'
                  ? 'bg-[#7A1526] text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Pending Scrutiny
            </button>
            <button
              onClick={() => setFilterType('DEFICIENCY')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                filterType === 'DEFICIENCY'
                  ? 'bg-[#7A1526] text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Deficiencies Communicated
            </button>
            <button
              onClick={() => setFilterType('PRIORITY')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                filterType === 'PRIORITY'
                  ? 'bg-red-700 text-white'
                  : 'text-red-700 hover:bg-red-50'
              }`}
            >
              Priority
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by ID or Institution..."
              className="w-full text-xs pl-8 pr-3 py-1.5 rounded-md border border-slate-300 focus:outline-none focus:border-[#7A1526] bg-white"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
          </div>
        </div>

        {/* Breathable HTML Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 text-slate-700 font-semibold text-[11px] border-b border-slate-200">
              <tr>
                <th className="p-3 border-r border-slate-200">Application ID &amp; Type</th>
                <th className="p-3 border-r border-slate-200">Institution &amp; Location</th>
                <th className="p-3 border-r border-slate-200">Current Stage</th>
                <th className="p-3 border-r border-slate-200">Processing Window</th>
                <th className="p-3 border-r border-slate-200">Pre-Check Finding</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {queueApps.map((app) => {
                const inst = institutions.find((i) => i.id === app.institutionId);

                return (
                  <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3 border-r border-slate-200">
                      <div className="font-mono font-semibold text-slate-900">{app.id}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{app.type}</div>
                    </td>

                    <td className="p-3 border-r border-slate-200 max-w-xs">
                      <div className="font-medium text-slate-900 leading-tight">
                        {inst?.name || 'Technical Institute'}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        PID: {inst?.pid} • {inst?.city}, {inst?.state}
                      </div>
                    </td>

                    <td className="p-3 border-r border-slate-200">
                      <StatusBadge stage={app.workflowStage} />
                    </td>

                    <td className="p-3 border-r border-slate-200">
                      {app.slaBreached ? (
                        <span className="inline-flex items-center gap-1 text-red-700 font-semibold text-[11px]">
                          <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                          <span>Timeframe Exceeded (Level 3 Notice)</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-slate-600 text-[11px]">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>48h standard window</span>
                        </span>
                      )}
                    </td>

                    <td className="p-3 border-r border-slate-200">
                      {app.aiRiskLevel === 'HIGH_RISK' ? (
                        <span className="inline-flex items-center gap-1 text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-[11px] font-medium">
                          Land area discrepancy noted
                        </span>
                      ) : app.aiRiskLevel === 'MEDIUM_RISK' ? (
                        <span className="inline-flex items-center gap-1 text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-[11px] font-medium">
                          Fire NOC renewal needed
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[11px]">
                          Checklist complete
                        </span>
                      )}
                    </td>

                    <td className="p-3 text-right">
                      <button
                        onClick={() => onOpenWorkbench(app.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded border border-slate-300 text-slate-700 hover:text-[#7A1526] hover:border-[#7A1526] text-xs font-medium transition-colors"
                      >
                        <span>Open Scrutiny</span>
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
    </div>
  );
}
