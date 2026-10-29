import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import StatusBadge from '../../components/ui/StatusBadge';
import { EVC_EXPERTS_POOL } from '../../lib/constants';
import {
  Calendar,
  Users,
  Gavel,
  CheckCircle2,
  FileCheck,
  Building2,
  Clock,
  ArrowRight
} from 'lucide-react';

export default function CommitteeDashboard() {
  const { applications, institutions, scheduleEVCVisit, transitionWorkflow } = useAppStore();

  // EVC Scheduled or Requiring EVC Cases
  const evcCases = applications.filter(
    (a) => a.workflowStage === 'EVC_SCHEDULED' || a.workflowStage === 'EVC_REPORT_SUBMITTED'
  );

  // SAC Hearing Cases
  const sacCases = applications.filter((a) => a.workflowStage === 'SAC_PROCESSING');

  const handleSACRecommend = (appId, recommendation) => {
    transitionWorkflow(
      appId,
      'APPROVED',
      'Prof. K. Narayanan (Chairman, SAC)',
      'COMMITTEE',
      `SAC Hearing concluded. Committee recommendation: ${recommendation}`
    );
  };

  const handleEVCSubmit = (appId) => {
    transitionWorkflow(
      appId,
      'SAC_PROCESSING',
      'Prof. K. Narayanan (Lead Inspector)',
      'COMMITTEE',
      'EVC Physical inspection report submitted with physical verification logs. Transferred to SAC.'
    );
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-xl font-serif font-bold text-slate-900">
          Committee Scrutiny &amp; Appellate Proceedings
        </h1>
        <p className="text-xs text-slate-600 mt-1">
          Expert Visit Committee (EVC) field inspection rosters and Standing Appellate Committee (SAC / SHC) hearing schedules
        </p>
      </div>

      {/* Overview Stat Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded border border-slate-200 flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Active EVC Field Inspections</div>
            <div className="text-2xl font-semibold text-slate-900 mt-1">{evcCases.length}</div>
          </div>
          <div className="w-10 h-10 rounded bg-rose-50 text-[#7A1526] flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded border border-slate-200 flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">SAC / SHC Appellate Hearings</div>
            <div className="text-2xl font-semibold text-slate-900 mt-1">{sacCases.length}</div>
          </div>
          <div className="w-10 h-10 rounded bg-amber-50 text-amber-800 flex items-center justify-center">
            <Gavel className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Section 1: EVC Inspection Roster */}
      <div className="bg-white rounded border border-slate-200 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#7A1526]" />
            <h2 className="text-sm font-semibold text-slate-900">
              Expert Visit Committee (EVC) Field Inspection Roster
            </h2>
          </div>
          <span className="text-xs text-slate-600 bg-white border border-slate-200 px-2.5 py-0.5 rounded">
            Western Regional Jurisdiction
          </span>
        </div>

        {evcCases.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">
            No active EVC inspection visits currently scheduled.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
                  <th className="py-3 px-4">Application ID</th>
                  <th className="py-3 px-4">Institution Name</th>
                  <th className="py-3 px-4">Assigned Panel</th>
                  <th className="py-3 px-4">Visit Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {evcCases.map((app) => {
                  const inst = institutions.find((i) => i.id === app.institutionId);
                  return (
                    <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-medium text-slate-900">
                        {app.id}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-slate-900">{inst?.name || 'Institution'}</div>
                        <div className="text-[11px] text-slate-500">{inst?.city}, {inst?.state} • {app.type}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5 text-[11px] text-slate-700">
                          {app.evcDetails?.experts?.map((exp, idx) => (
                            <div key={idx} className="truncate max-w-xs">
                              • <span className="font-medium">{exp.name}</span> ({exp.domain})
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-800">
                        {app.evcDetails?.visitDate || '05-Nov-2026'}
                      </td>
                      <td className="py-3.5 px-4">
                        <StatusBadge stage={app.workflowStage} />
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleEVCSubmit(app.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#7A1526] hover:bg-[#62111E] text-white font-medium text-xs transition-colors"
                        >
                          <FileCheck className="w-3.5 h-3.5" />
                          <span>Submit Inspection Report</span>
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

      {/* Section 2: Standing Appellate Committee (SAC / SHC) */}
      <div className="bg-white rounded border border-slate-200 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gavel className="w-4 h-4 text-[#7A1526]" />
            <h2 className="text-sm font-semibold text-slate-900">
              Standing Appellate Committee (SAC / SHC) Hearing Cases
            </h2>
          </div>
          <span className="text-xs text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded font-medium">
            Hearings in Progress
          </span>
        </div>

        {sacCases.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">
            No appellate hearing cases currently pending review.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
                  <th className="py-3 px-4">Application ID</th>
                  <th className="py-3 px-4">Institution Name</th>
                  <th className="py-3 px-4">Inspection Summary &amp; Findings</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Committee Determination</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {sacCases.map((app) => {
                  const inst = institutions.find((i) => i.id === app.institutionId);
                  return (
                    <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-medium text-slate-900 align-top">
                        {app.id}
                      </td>
                      <td className="py-3.5 px-4 align-top">
                        <div className="font-medium text-slate-900">{inst?.name}</div>
                        <div className="text-[11px] text-slate-500">{inst?.city}, {inst?.state} • {app.type}</div>
                      </td>
                      <td className="py-3.5 px-4 align-top max-w-sm">
                        <div className="text-slate-700 bg-slate-50 p-2 rounded border border-slate-200 text-[11px] leading-relaxed">
                          {app.evcReport?.committeeRemarks ||
                            'Physical infrastructure and faculty cadre verified. Recommended subject to NBA compliance.'}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 align-top">
                        <StatusBadge stage={app.workflowStage} />
                      </td>
                      <td className="py-3.5 px-4 text-right align-top">
                        <div className="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-2">
                          <button
                            onClick={() => handleSACRecommend(app.id, 'Approved with Conditions (NBA SAR Submission)')}
                            className="px-2.5 py-1.5 rounded border border-slate-300 text-slate-700 hover:bg-slate-100 font-medium text-xs transition-colors"
                          >
                            Recommend with Conditions
                          </button>
                          <button
                            onClick={() => handleSACRecommend(app.id, 'Full Unconditional Approval')}
                            className="px-3 py-1.5 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs transition-colors"
                          >
                            Recommend Full Approval
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
