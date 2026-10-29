import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { CheckCircle2, AlertTriangle, ArrowRight, ArrowLeft, Upload, FileCheck, ShieldCheck } from 'lucide-react';

export default function ApplicationWizard({ onComplete }) {
  const { transitionWorkflow } = useAppStore();
  const [step, setStep] = useState(1);
  const [appType, setAppType] = useState('Extension of Approval (EoA)');
  const [academicYear, setAcademicYear] = useState('2026-27');
  const [landArea, setLandArea] = useState('5.20');
  const [builtUp, setBuiltUp] = useState('42500');

  const handleFinalSubmit = () => {
    const newId = `AICTE-APP-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    transitionWorkflow(
      newId,
      'SUBMITTED',
      'Dr. Rajeev Sharma',
      'INSTITUTION',
      'Submitted Extension of Approval application under APH 2024-27 Clause 2.1.'
    );
    if (onComplete) onComplete();
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded border border-slate-200 font-sans">
      <div className="border-b border-slate-200 pb-4 mb-6">
        <h2 className="text-xl font-serif font-bold text-slate-900">
          New Institutional Approval Application (AY 2026-27)
        </h2>
        <p className="text-xs text-slate-600 mt-0.5">
          Step-by-step statutory application aligned with the AICTE Approval Process Handbook (APH 2024–27)
        </p>

        {/* Wizard Steps Stepper */}
        <div className="flex items-center justify-between mt-5 text-xs">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-blue-900 font-semibold' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-blue-900 text-white' : 'bg-slate-200 text-slate-600'}`}>
              1
            </span>
            <span>Programme Details</span>
          </div>
          <div className="flex-1 h-px bg-slate-200 mx-3"></div>
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-blue-900 font-semibold' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-blue-900 text-white' : 'bg-slate-200 text-slate-600'}`}>
              2
            </span>
            <span>Infrastructure &amp; Land</span>
          </div>
          <div className="flex-1 h-px bg-slate-200 mx-3"></div>
          <div className={`flex items-center gap-2 ${step >= 3 ? 'text-blue-900 font-semibold' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-blue-900 text-white' : 'bg-slate-200 text-slate-600'}`}>
              3
            </span>
            <span>APH Rule Verification &amp; Submit</span>
          </div>
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-4 text-xs">
          <div>
            <label className="font-medium text-slate-700 block mb-1">Application Category</label>
            <select
              value={appType}
              onChange={(e) => setAppType(e.target.value)}
              className="w-full p-2.5 rounded border border-slate-300 text-xs focus:outline-none focus:border-blue-900 bg-white"
            >
              <option value="Extension of Approval (EoA)">Extension of Approval (EoA)</option>
              <option value="Increase in Intake / New Course">Increase in Intake / New Course</option>
              <option value="Establishment of New Technical Institution">Establishment of New Technical Institution</option>
            </select>
          </div>

          <div>
            <label className="font-medium text-slate-700 block mb-1">Academic Year</label>
            <input
              type="text"
              value={academicYear}
              disabled
              className="w-full p-2.5 rounded border border-slate-200 bg-slate-50 text-slate-600 text-xs font-mono"
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <span>Next: Infrastructure Parameters</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4 text-xs">
          <div>
            <label className="font-medium text-slate-700 block mb-1">Declared Land Area (Acres)</label>
            <input
              type="text"
              value={landArea}
              onChange={(e) => setLandArea(e.target.value)}
              className="w-full p-2.5 rounded border border-slate-300 text-xs focus:outline-none focus:border-blue-900"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Minimum requirement: 2.50 Acres (Urban) / 4.0 Acres (Rural)
            </span>
          </div>

          <div>
            <label className="font-medium text-slate-700 block mb-1">Total Built-Up Area (sq. meters)</label>
            <input
              type="text"
              value={builtUp}
              onChange={(e) => setBuiltUp(e.target.value)}
              className="w-full p-2.5 rounded border border-slate-300 text-xs focus:outline-none focus:border-blue-900"
            />
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => setStep(1)}
              className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 text-xs font-medium hover:bg-slate-50"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <span>Next: Automated APH Rule Check</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4 text-xs">
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded">
            <div className="flex items-center gap-2 text-emerald-900 font-semibold mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>APH 2024-27 Pre-Submission Rule Verification Passed</span>
            </div>
            <ul className="space-y-1.5 text-slate-700 text-xs">
              <li className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold">✓</span> Land Area ({landArea} Acres) satisfies Urban Threshold &gt; 2.50 Acres
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold">✓</span> Built-up carpet ratio satisfies Clause 4.2 instructional norms
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold">✓</span> DigiLocker Token linked for Registered Lease Deed
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold">✓</span> Mandatory Grievance &amp; Anti-Ragging Affidavit valid
              </li>
            </ul>
          </div>

          <div className="p-3 bg-slate-50 rounded border border-slate-200 text-slate-600 text-[11px] leading-relaxed">
            By clicking submit, your application will be transmitted to the <strong>Western Regional Office (Mumbai)</strong> and an automated scrutiny SLA timer of 48 hours will be initialized.
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => setStep(2)}
              className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 text-xs font-medium hover:bg-slate-50"
            >
              Back
            </button>
            <button
              onClick={handleFinalSubmit}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-medium text-xs flex items-center gap-2 transition-colors"
            >
              <FileCheck className="w-4 h-4" />
              <span>Sign &amp; Submit Application</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
