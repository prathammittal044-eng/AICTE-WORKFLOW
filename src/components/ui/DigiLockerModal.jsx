import React, { useState } from 'react';
import { X, CheckCircle2, Download, ExternalLink, Loader2 } from 'lucide-react';

export default function DigiLockerModal({ isOpen, onClose, onImportSuccess }) {
  const [loading, setLoading] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState(['DOC-LAND-01']);

  if (!isOpen) return null;

  const mockDigiLockerDocs = [
    {
      id: 'DOC-LAND-01',
      title: 'Registered Land Lease Deed',
      issuer: 'Department of Registration & Stamps, Maharashtra',
      issuedOn: '14-Mar-2018',
      docType: 'LEGAL_DEED'
    },
    {
      id: 'DOC-AFF-02',
      title: 'Statutory Non-Judicial Affidavit',
      issuer: 'National e-Governance Services Limited (NeSL)',
      issuedOn: '04-Jan-2026',
      docType: 'AFFIDAVIT'
    },
    {
      id: 'DOC-FIRE-03',
      title: 'Fire Safety Clearance Certificate',
      issuer: 'State Fire & Emergency Services',
      issuedOn: '12-May-2025',
      docType: 'SAFETY_NOC'
    }
  ];

  const handleAuthorize = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAuthorized(true);
    }, 900);
  };

  const handleImport = () => {
    if (onImportSuccess) {
      onImportSuccess(selectedDocs);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">DigiLocker Document Verification</h3>
            <p className="text-[11px] text-slate-500">
              Fetch verified certificates from National DigiLocker Repository
            </p>
          </div>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {!authorized ? (
            <div className="text-center py-3">
              <h4 className="font-semibold text-slate-800 text-xs mb-1">
                Link Institutional Account
              </h4>
              <p className="text-xs text-slate-500 mb-5 max-w-xs mx-auto leading-relaxed">
                Connect to retrieve verified land title records and statutory clearances directly into the application.
              </p>

              <button
                onClick={handleAuthorize}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#7A1526] hover:bg-[#62111E] text-white font-medium py-2 px-4 rounded text-xs transition-colors"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Connecting to DigiLocker...</span>
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Authorize &amp; Fetch Records</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-medium text-slate-700">
                  Available Verified Documents
                </span>
                <span className="text-emerald-700 font-medium flex items-center gap-1 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Authenticated
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {mockDigiLockerDocs.map((doc) => (
                  <label
                    key={doc.id}
                    className="flex items-start gap-3 p-2.5 rounded border border-slate-200 bg-slate-50/50 hover:bg-slate-50 cursor-pointer text-xs"
                  >
                    <input
                      type="checkbox"
                      checked={selectedDocs.includes(doc.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedDocs([...selectedDocs, doc.id]);
                        } else {
                          setSelectedDocs(selectedDocs.filter((id) => id !== doc.id));
                        }
                      }}
                      className="mt-0.5 rounded text-[#7A1526] focus:ring-[#7A1526]"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">{doc.title}</div>
                      <div className="text-[11px] text-slate-500">{doc.issuer}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Issued: {doc.issuedOn}
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  onClick={onClose}
                  className="px-3 py-1.5 rounded border border-slate-200 text-slate-700 text-xs hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleImport}
                  className="px-4 py-1.5 rounded bg-[#7A1526] hover:bg-[#62111E] text-white text-xs font-medium flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Attach to Application</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
