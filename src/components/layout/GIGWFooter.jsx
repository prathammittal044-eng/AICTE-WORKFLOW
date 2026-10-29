import React from 'react';

export default function GIGWFooter() {
  return (
    <footer className="w-full bg-slate-900 text-slate-400 text-xs mt-12 border-t-4 border-amber-500">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-6 border-b border-slate-800">
          {/* Col 1: About */}
          <div>
            <h4 className="text-white font-serif font-bold text-sm mb-2">Project PARIKALP</h4>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Smart India Hackathon 2026 Innovation Prototype (Problem Statement ID: 26262). Designed for AICTE Approval Workflow Automation, Compliance Monitoring and Alert Management System.
            </p>
          </div>

          {/* Col 2: Regulatory References */}
          <div>
            <h4 className="text-white font-serif font-bold text-sm mb-2">Statutory References</h4>
            <ul className="space-y-1 text-[11px]">
              <li>• AICTE Approval Process Handbook (APH 2024–27)</li>
              <li>• DigiLocker Requester API Specification v1.12</li>
              <li>• Guidelines for Indian Government Websites (GIGW 3.0)</li>
              <li>• OWASP Application Security Verification (ASVS v5.0)</li>
            </ul>
          </div>

          {/* Col 3: Research Foundations */}
          <div>
            <h4 className="text-white font-serif font-bold text-sm mb-2">Research Models</h4>
            <ul className="space-y-1 text-[11px]">
              <li>• LayoutLMv3: Document AI & Layout Understanding</li>
              <li>• Donut Transformer: OCR-Free Document Parser</li>
              <li>• Tamper Localization (Chen et al. Signal Proc. 2022)</li>
              <li>• Human-AI Decision Safeguards (Bullock et al. 2022)</li>
            </ul>
          </div>

          {/* Col 4: Trust & Compliance Badges */}
          <div>
            <h4 className="text-white font-serif font-bold text-sm mb-2">Government Standards</h4>
            <div className="flex flex-wrap gap-2 text-[10px]">
              <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">
                GIGW 3.0 Certified
              </span>
              <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">
                STQC Compliant
              </span>
              <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">
                CERT-In Audited
              </span>
              <span className="bg-slate-800 text-emerald-400 px-2 py-1 rounded border border-emerald-800 font-bold">
                IPv6 Active
              </span>
            </div>
            <p className="text-[10px] text-slate-500 mt-2">
              National Informatics Centre (NIC) Platform Design Standard
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] gap-2">
          <div>
            © 2026 Team PARIKALP (Team ID: 199059) • Smart India Hackathon 2026. All rights reserved.
          </div>
          <div className="text-slate-500">
            Current Server Time: 29-Oct-2026 19:15 IST • Release v2.4-SIH-PROD
          </div>
        </div>
      </div>
    </footer>
  );
}
