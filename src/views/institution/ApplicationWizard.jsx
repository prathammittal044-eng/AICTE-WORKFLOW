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
      'Filed fresh Extension of Approval dossier under APH 2024-27 Clause 2.1.'
    );
    if (onComplete) onComplete();
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl border border-gov-border shadow-xs font-sans">
      <div className="border-b border-slate-200 pb-4 mb-6">
        <h2 className="text-xl font-serif font-bold text-gov-navy">
          Online Application Submission Portal (AY 2026-27)
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Step-by-step regulatory dossier submission aligned with APH 2024-27
        </p>

        {/* Wizard Steps */}
        <div className="flex items-center justify-between mt-4 text-xs font-semibold">
          <span className={step >= 1 ? 'text-gov-navy font-bold' : 'text-slate-400'}>
            1. Programme Details
          </span>
          <span className="text-slate-300">→</span>
          <span className={step >= 2 ? 'text-gov-navy font-bold' : 'text-slate-400'}>
            2. Infrastructure &amp; Land
          </span>
          <span className="text-slate-300">→</span>
          <span className={step >= 3 ? 'text-gov-navy font-bold' : 'text-slate-400'}>
            3. APH Pre-Check &amp; Submit
          </span>
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Application Category</label>
            <select
              value={appType}
              onChange={(e) => setAppType(e.target.value)}
              className="w-full p-2.5 rounded border border-slate-300 text-xs focus:outline-none focus:border-gov-navy bg-white"
            >
              <option value="Extension of Approval (EoA)">Extension of Approval (EoA)</option>
              <option value="Increase in Intake / New Course">Increase in Intake / New Course</option>
              <option value="Establishment of New Technical Institution">Establishment of New Technical Institution</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Academic Year</label>
            <input
              type="text"
              value={academicYear}
              disabled
              className="w-full p-2.5 rounded border border-slate-200 bg-slate-100 text-slate-600 text-xs font-mono"
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2 bg-gov-navy hover:bg-gov-navyLight text-white rounded text-xs font-bold flex items-center gap-1.5"
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
            <label className="font-bold text-slate-700 block mb-1">Declared Land Area (Acres)</label>
            <input
              type="text"
              value={landArea}
              onChange={(e) => setLandArea(e.target.value)}
              className="w-full p-2.5 rounded border border-slate-300 text-xs focus:outline-none focus:border-gov-navy"
            />
            <span className="text-[10px] text-slate-500 mt-0.5 block">
              Min 2.50 Acres for Urban Category / 4.0 Acres for Rural Category
            </span>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Total Built-Up Area (sq. meters)</label>
            <input
              type="text"
              value={builtUp}
              onChange={(e) => setBuiltUp(e.target.value)}
              className="w-full p-2.5 rounded border border-slate-300 text-xs focus:outline-none focus:border-gov-navy"
            />
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => setStep(1)}
              className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 text-xs font-semibold hover:bg-slate-50"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-4 py-2 bg-gov-navy hover:bg-gov-navyLight text-white rounded text-xs font-bold flex items-center gap-1.5"
            >
              <span>Next: Automated APH Rule Check</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4 text-xs">
          <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-emerald-900 font-bold mb-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Automated APH 2024-27 Pre-Submission Rule Engine Result</span>
            </div>
            <ul className="space-y-1.5 text-slate-700 text-xs">
              <li className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold">✓</span> Land Area ({landArea} Acres) satisfies Urban Threshold &gt; 2.50 Acres
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold">✓</span> Built-up carpet ratio satisfies Clause 4.2 instructional norms
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold">✓</span> DigiLocker Token linked for Registered Lease Deed
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold">✓</span> Mandatory Grievance &amp; Anti-Ragging Affidavit valid
              </li>
            </ul>
          </div>

          <div className="p-3 bg-slate-50 rounded border border-slate-200 text-slate-600 text-[11px]">
            By clicking submit, your application dossier will be transmitted to the <strong>Western Regional Office (Mumbai)</strong> and an automated SLA timer of 48 hours will be initialized.
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => setStep(2)}
              className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 text-xs font-semibold hover:bg-slate-50"
            >
              Back
            </button>
            <button
              onClick={handleFinalSubmit}
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-bold text-xs flex items-center gap-2 shadow-xs"
            >
              <FileCheck className="w-4 h-4" />
              <span>Sign with e-Stamp &amp; Submit Dossier</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
