import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import StatusBadge from '../../components/ui/StatusBadge';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import {
  Award,
  ShieldAlert,
  CheckCircle2,
  FileText,
  Send,
  Building2,
  Clock,
  AlertTriangle
} from 'lucide-react';

export default function BureauDashboard() {
  const { applications, institutions, issueApprovalOrder } = useAppStore();
  const [selectedAppForOrder, setSelectedAppForOrder] = useState(null);
  const [approvalConditions, setApprovalConditions] = useState(
    'Subject to continuous maintenance of Faculty cadre ratio (1:15) and submission of renewed land lease deed before 15-Nov-2026.'
  );

  // Regional workload distribution
  const regionalData = [
    { name: 'Northern', Scrutiny: 280, Overdue: 3 },
    { name: 'Western', Scrutiny: 312, Overdue: 4 },
    { name: 'Southern', Scrutiny: 240, Overdue: 2 },
    { name: 'Eastern', Scrutiny: 168, Overdue: 2 },
    { name: 'Central', Scrutiny: 140, Overdue: 3 }
  ];

  // Pipeline funnel stages
  const funnelData = [
    { name: 'Submitted', count: 8420, fill: '#7A1526' },
    { name: 'Scrutiny', count: 6280, fill: '#9E1B31' },
    { name: 'EVC Inspection', count: 1960, fill: '#B45309' },
    { name: 'SAC Appellate', count: 420, fill: '#D97706' },
    { name: 'Approved (EoA)', count: 4120, fill: '#059669' }
  ];

  // Cases awaiting Bureau Final Approval
  const pendingFinalApprovals = applications.filter(
    (a) => a.workflowStage === 'SAC_PROCESSING' || a.workflowStage === 'EVC_REPORT_SUBMITTED'
  );

  // Any applications with breached SLAs
  const overdueCases = applications.filter(
    (a) => a.slaBreached || (a.slaHoursRemaining !== undefined && a.slaHoursRemaining <= 0)
  );

  const handleIssueOrder = () => {
    if (selectedAppForOrder) {
      issueApprovalOrder(selectedAppForOrder, approvalConditions, 'CONDITIONAL');
      setSelectedAppForOrder(null);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-xl font-serif font-bold text-slate-900">
          Approval Bureau &amp; Executive Monitoring
        </h1>
        <p className="text-xs text-slate-600 mt-1">
          Statutory approval orders, national pendency analytics, and SLA compliance monitoring
        </p>
      </div>

      {/* 4 Compact Administrative KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded border border-slate-200">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Applications</div>
          <div className="text-2xl font-semibold text-slate-900 mt-1">8,420</div>
          <div className="text-[11px] text-slate-500 mt-1">Academic Year 2026-27</div>
        </div>

        <div className="bg-white p-4 rounded border border-slate-200">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">In Scrutiny / Review</div>
          <div className="text-2xl font-semibold text-slate-900 mt-1">6,280</div>
          <div className="text-[11px] text-slate-500 mt-1">Across 5 Regional Offices</div>
        </div>

        <div className="bg-white p-4 rounded border border-slate-200">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Awaiting Final Order</div>
          <div className="text-2xl font-semibold text-[#7A1526] mt-1">{pendingFinalApprovals.length}</div>
          <div className="text-[11px] text-slate-500 mt-1">Ready for Gazette issuance</div>
        </div>

        <div className="bg-white p-4 rounded border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">SLA Overdue Alerts</span>
            {overdueCases.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
            )}
          </div>
          <div className="text-2xl font-semibold text-red-600 mt-1">{14 + overdueCases.length}</div>
          <div className="text-[11px] text-red-700 mt-1">Escalated to Bureau Advisor</div>
        </div>
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* National Approval Funnel */}
        <div className="bg-white p-5 rounded border border-slate-200">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-slate-900">
              National Approval Pipeline Throughput
            </h2>
            <p className="text-[11px] text-slate-500">
              Volume by workflow phase for AY 2026-27
            </p>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={funnelData}
                margin={{ top: 5, right: 30, left: 35, bottom: 0 }}
              >
                <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#475569' }} width={95} />
                <Tooltip />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Region-wise Pendency Bar Chart */}
        <div className="bg-white p-5 rounded border border-slate-200">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-slate-900">
              Regional Workload &amp; Overdue SLA Distribution
            </h2>
            <p className="text-[11px] text-slate-500">
              Pending scrutiny counts vs. SLA breaches by Regional Office
            </p>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionalData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#475569' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip />
                <Bar dataKey="Scrutiny" fill="#7A1526" name="Pending Scrutiny" radius={[3, 3, 0, 0]} />
                <Bar dataKey="Overdue" fill="#dc2626" name="Overdue SLA" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Cases Awaiting Final Approval Order */}
      <div className="bg-white rounded border border-slate-200 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Applications Awaiting Final Approval Order (EoA)
            </h2>
            <p className="text-[11px] text-slate-500">
              Committee-recommended applications ready for statutory digital signing
            </p>
          </div>
          <span className="text-xs font-medium text-[#7A1526] bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded">
            {pendingFinalApprovals.length} Applications Pending Order
          </span>
        </div>

        {pendingFinalApprovals.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">
            No applications currently awaiting final approval order issuance.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
                  <th className="py-3 px-4">Application ID</th>
                  <th className="py-3 px-4">Institution Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Stage</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {pendingFinalApprovals.map((app) => {
                  const inst = institutions.find((i) => i.id === app.institutionId);
                  return (
                    <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-medium text-slate-900">
                        {app.id}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-slate-900">{inst?.name}</div>
                        <div className="text-[11px] text-slate-500">
                          PID: {inst?.pid} • {inst?.city}, {inst?.state}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">
                        {app.type}
                      </td>
                      <td className="py-3.5 px-4">
                        <StatusBadge stage={app.workflowStage} />
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedAppForOrder(app.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs transition-colors"
                        >
                          <Award className="w-3.5 h-3.5" />
                          <span>Generate &amp; Issue Order</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Escalated SLA Cases (if any exist) */}
      {overdueCases.length > 0 && (
        <div className="bg-white rounded border border-red-200 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-red-200 bg-red-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-700" />
              <h2 className="text-sm font-semibold text-red-900">
                Escalated Overdue Cases (SLA Breaches)
              </h2>
            </div>
            <span className="text-xs text-red-700 font-medium">
              Immediate Executive Intervention Required
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
                  <th className="py-3 px-4">Application ID</th>
                  <th className="py-3 px-4">Institution</th>
                  <th className="py-3 px-4">Stage</th>
                  <th className="py-3 px-4">SLA Overdue</th>
                  <th className="py-3 px-4 text-right">Escalation Authority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {overdueCases.map((app) => {
                  const inst = institutions.find((i) => i.id === app.institutionId);
                  return (
                    <tr key={app.id} className="hover:bg-red-50/30 transition-colors">
                      <td className="py-3 px-4 font-mono font-medium text-red-900">{app.id}</td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-900">{inst?.name}</div>
                        <div className="text-[11px] text-slate-500">{inst?.city}, {inst?.state}</div>
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge stage={app.workflowStage} />
                      </td>
                      <td className="py-3 px-4 font-medium text-red-700">
                        {app.slaHoursRemaining ? `${Math.abs(app.slaHoursRemaining)}h past SLA` : 'Overdue SLA deadline'}
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-slate-700">
                        AICTE Member Secretary / Regional Officer
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Approval Order Generation Modal */}
      {selectedAppForOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <h3 className="font-semibold text-sm">
                  Official Gazette Approval Order Issuance
                </h3>
              </div>
              <button
                onClick={() => setSelectedAppForOrder(null)}
                className="text-slate-400 hover:text-white text-base"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="bg-slate-50 p-3 rounded border border-slate-200 text-xs">
                <div className="text-slate-500 font-mono text-[11px]">Dispatch Reference:</div>
                <div className="font-mono font-semibold text-[#7A1526] mt-0.5">
                  F.No. Western/1-4298101/2026/EOA-FINAL
                </div>
                <div className="text-slate-500 font-mono text-[11px] mt-2">Authorized Signatory:</div>
                <div className="font-medium text-slate-800 mt-0.5">
                  Advisor-I (Approval Bureau), AICTE New Delhi
                </div>
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">
                  Regulatory Conditions (Linked to Continuous Monitoring)
                </label>
                <textarea
                  rows={3}
                  value={approvalConditions}
                  onChange={(e) => setApprovalConditions(e.target.value)}
                  className="w-full text-xs p-2.5 rounded border border-slate-300 focus:outline-none focus:border-[#7A1526]"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded border border-slate-200 text-slate-600 text-[11px] leading-relaxed">
                Issuing this statutory order will record the decision in the permanent audit trail, generate an official digitally stamped approval certificate, and schedule renewal monitoring.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  onClick={() => setSelectedAppForOrder(null)}
                  className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 text-xs font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleIssueOrder}
                  className="px-4 py-2 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Digitally Sign &amp; Dispatch Order</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
