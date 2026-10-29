import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Download, ExternalLink, Loader2 } from 'lucide-react';

export default function DigiLockerModal({ isOpen, onClose, onImportSuccess }) {
  const [loading, setLoading] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState(['DOC-LAND-01']);

  if (!isOpen) return null;

  const mockDigiLockerDocs = [
    {
      id: 'DOC-LAND-01',
      title: 'Registered Land Lease Deed (30 Years)',
      issuer: 'Dept of Registration & Stamps, Govt. of Maharashtra',
      issuedOn: '14-Mar-2018',
      docType: 'LEGAL_DEED',
      status: 'VERIFIED'
    },
    {
      id: 'DOC-AFF-02',
      title: 'Statutory Non-Judicial Stamp Affidavit (Rs. 100)',
      issuer: 'National e-Governance Services Limited (NeSL)',
      issuedOn: '04-Jan-2026',
      docType: 'AFFIDAVIT',
      status: 'VERIFIED'
    },
    {
      id: 'DOC-FIRE-03',
      title: 'Provisional Fire Safety Compliance NOC',
      issuer: 'State Disaster Management & Fire Services',
      issuedOn: '12-May-2025',
      docType: 'SAFETY_NOC',
      status: 'VERIFIED'
    }
  ];

  const handleAuthorize = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAuthorized(true);
    }, 1200);
  };

  const handleImport = () => {
    if (onImportSuccess) {
      onImportSuccess(selectedDocs);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl border border-gov-border overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-emerald-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white text-emerald-800 flex items-center justify-center font-bold text-sm shadow-xs">
              DL
            </div>
            <div>
              <h3 className="font-serif font-bold text-base">DigiLocker Document Exchange</h3>
              <p className="text-xs text-emerald-200">
                Official API Requester Integration (DigiLocker v1.12)
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded text-emerald-200 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {!authorized ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3 border border-emerald-200">
                <ShieldCheck className="w-8 h-8 text-emerald-600" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm mb-1">
                Authorize AICTE Portal Access to DigiLocker Vault
              </h4>
              <p className="text-xs text-slate-600 mb-6 max-w-sm mx-auto leading-relaxed">
                Seamlessly fetch tamper-proof, cryptographically signed institutional deeds and state regulatory NOCs directly from official government repositories.
              </p>

              <button
                onClick={handleAuthorize}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 px-4 rounded-lg text-xs transition-colors shadow-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Connecting to National DigiLocker Gateway...</span>
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-4 h-4" />
                    <span>Authorize &amp; Fetch Verified Records</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-700">
                  Verified Records Found (3 Available)
                </span>
                <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  OAuth Verified
                </span>
              </div>

              <div className="space-y-2 mb-5">
                {mockDigiLockerDocs.map((doc) => (
                  <label
                    key={doc.id}
                    className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:border-emerald-500 bg-slate-50 cursor-pointer transition-colors"
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
                      className="mt-1 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <div className="flex-1 text-xs">
                      <div className="font-bold text-slate-900">{doc.title}</div>
                      <div className="text-[11px] text-slate-600">{doc.issuer}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Issued: {doc.issuedOn} • Digital Signature: Valid
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  onClick={onClose}
                  className="px-3 py-1.5 rounded border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleImport}
                  className="px-4 py-1.5 rounded bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Import Selected into Dossier
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
