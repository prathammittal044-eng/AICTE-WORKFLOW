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
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Award, ShieldAlert, CheckCircle2, FileText, Send, Building, AlertTriangle } from 'lucide-react';

export default function BureauDashboard() {
  const { applications, institutions, issueApprovalOrder } = useAppStore();
  const [selectedAppForOrder, setSelectedAppForOrder] = useState(null);
  const [approvalConditions, setApprovalConditions] = useState(
    'Subject to continuous maintenance of Faculty cadre ratio (1:15) and submission of renewed land lease deed before 15-Nov-2026.'
  );

  // Recharts Data Sets
  const regionalData = [
    { name: 'Northern', Total: 1640, Scrutiny: 280, Overdue: 3 },
    { name: 'Western', Total: 1840, Scrutiny: 312, Overdue: 4 },
    { name: 'Southern', Total: 2120, Scrutiny: 240, Overdue: 2 },
    { name: 'Eastern', Total: 1420, Scrutiny: 168, Overdue: 2 },
    { name: 'Central', Total: 1400, Scrutiny: 140, Overdue: 3 }
  ];

  const funnelData = [
    { name: 'Stage 1: Submitted', count: 8420, fill: '#003087' },
    { name: 'Stage 2: Scrutiny', count: 6280, fill: '#0B4DB5' },
    { name: 'Stage 3: EVC Visited', count: 1960, fill: '#4F46E5' },
    { name: 'Stage 4: SAC Hearing', count: 420, fill: '#D97706' },
    { name: 'Stage 5: EoA Issued', count: 4120, fill: '#10B981' }
  ];

  // Cases awaiting Bureau Final Approval
  const pendingFinalApprovals = applications.filter(
    (a) => a.workflowStage === 'SAC_PROCESSING' || a.workflowStage === 'EVC_REPORT_SUBMITTED'
  );

  const handleIssueOrder = () => {
    if (selectedAppForOrder) {
      issueApprovalOrder(selectedAppForOrder, approvalConditions, 'CONDITIONAL');
      setSelectedAppForOrder(null);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Bureau Banner */}
      <div className="bg-white p-5 rounded-xl border border-gov-border shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-gov-navy" />
            <h2 className="text-xl font-serif font-bold text-gov-navy">
              AICTE National Approval Bureau &amp; Executive Command Center
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Competent authority oversight for statutory Gazette Approval Orders, national pendency analytics, and multi-tier SLA escalation triggers.
          </p>
        </div>
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Region-wise Pendency Bar Chart */}
        <div className="bg-white p-5 rounded-xl border border-gov-border shadow-xs">
          <h3 className="font-serif font-bold text-sm text-slate-800 mb-1">
            Region-Wise Pendency &amp; Overdue SLA Distribution
          </h3>
          <p className="text-[11px] text-slate-500 mb-4">
            Western, Southern, Northern, Central and Eastern Bureaus
          </p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionalData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="Scrutiny" fill="#003087" name="Pending Scrutiny" />
                <Bar dataKey="Overdue" fill="#DC2626" name="Overdue SLA" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lifecycle Clearance Funnel */}
        <div className="bg-white p-5 rounded-xl border border-gov-border shadow-xs">
          <h3 className="font-serif font-bold text-sm text-slate-800 mb-1">
            National APH Approval Funnel Metrics (AY 2026-27)
          </h3>
          <p className="text-[11px] text-slate-500 mb-4">
            Pipeline throughput across all 6 administrative stages
          </p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={funnelData}
                margin={{ top: 10, right: 30, left: 40, bottom: 0 }}
              >
                <XAxis type="number" tick={{ fontSize: 10 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={110} />
                <Tooltip />
                <Bar dataKey="count" fill="#003087">
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Final Approval Issuance Panel */}
      <div className="bg-white p-5 rounded-xl border border-gov-border shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-serif font-bold text-base text-gov-navy">
              Cases Awaiting Final Bureau Approval Order (EoA)
            </h3>
            <p className="text-xs text-slate-500">
              Standing Appellate Committee cleared dossiers ready for digital gazette signing
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {pendingFinalApprovals.map((app) => {
            const inst = institutions.find((i) => i.id === app.institutionId);
            return (
              <div
                key={app.id}
                className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-gov-navy text-sm">{app.id}</span>
                    <StatusBadge stage={app.workflowStage} />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm mt-0.5">{inst?.name}</h4>
                  <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                    PID: {inst?.pid} • {inst?.city}, {inst?.state} • {app.type}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedAppForOrder(app.id)}
                    className="px-4 py-2 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Award className="w-4 h-4" />
                    <span>Generate &amp; Issue Approval Order</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Approval Order Generation Modal */}
      {selectedAppForOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl border border-gov-border overflow-hidden">
            <div className="p-4 bg-emerald-800 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-300" />
                <h3 className="font-serif font-bold text-sm">
                  Official Gazette Approval Order Dispatched
                </h3>
              </div>
              <button
                onClick={() => setSelectedAppForOrder(null)}
                className="text-emerald-200 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="bg-slate-50 p-3 rounded border border-slate-200 text-xs font-mono">
                <div className="text-slate-500">Order Reference:</div>
                <div className="font-bold text-gov-navy">
                  F.No. Western/1-4298101/2026/EOA-FINAL
                </div>
                <div className="text-slate-500 mt-1">Authorized Signatory:</div>
                <div className="font-bold text-slate-800">
                  Dr. Mamta R. Agarwal, Advisor-I (Approval Bureau)
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Regulatory Conditions (Linked to Compliance Engine)
                </label>
                <textarea
                  rows={3}
                  value={approvalConditions}
                  onChange={(e) => setApprovalConditions(e.target.value)}
                  className="w-full text-xs p-2 rounded border border-slate-300 focus:outline-none focus:border-gov-navy"
                />
              </div>

              <div className="bg-emerald-50 p-3 rounded border border-emerald-200 text-emerald-950 text-[11px] leading-relaxed">
                Issuing this order will automatically record the decision into the permanent digital audit ledger, dispatch institutional SMS/Email notifications, and schedule post-approval compliance tracking.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  onClick={() => setSelectedAppForOrder(null)}
                  className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleIssueOrder}
                  className="px-4 py-2 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
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
