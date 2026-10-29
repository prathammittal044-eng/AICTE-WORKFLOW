import React from 'react';

export default function GIGWFooter() {
  return (
    <footer className="w-full bg-slate-900 text-slate-400 text-xs mt-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-6 border-b border-slate-800 text-[11px]">
          {/* Col 1: Portal Overview */}
          <div>
            <h4 className="text-slate-200 font-semibold text-xs mb-2">AICTE e-Governance Portal</h4>
            <p className="leading-relaxed text-slate-400">
              Centralized platform for processing institutional approvals, monitoring regulatory compliance, and managing scrutiny workflows under the Approval Process Handbook.
            </p>
          </div>

          {/* Col 2: Useful Links */}
          <div>
            <h4 className="text-slate-200 font-semibold text-xs mb-2">Important Links</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><a href="#" className="hover:text-slate-200">AICTE Official Website</a></li>
              <li><a href="#" className="hover:text-slate-200">Approval Process Handbook (APH)</a></li>
              <li><a href="#" className="hover:text-slate-200">DigiLocker National Portal</a></li>
              <li><a href="#" className="hover:text-slate-200">Ministry of Education</a></li>
            </ul>
          </div>

          {/* Col 3: Policies & Standards */}
          <div>
            <h4 className="text-slate-200 font-semibold text-xs mb-2">Policies &amp; Guidelines</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><a href="#" className="hover:text-slate-200">Website Policies</a></li>
              <li><a href="#" className="hover:text-slate-200">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-slate-200">Terms &amp; Conditions</a></li>
              <li><a href="#" className="hover:text-slate-200">Accessibility Statement</a></li>
            </ul>
          </div>

          {/* Col 4: Helpdesk */}
          <div>
            <h4 className="text-slate-200 font-semibold text-xs mb-2">Technical Helpdesk</h4>
            <p className="text-slate-400 leading-relaxed">
              Toll-Free: 1800-11-2026<br />
              Email: helpdesk@aicte-india.org<br />
              Hours: 09:30 AM – 05:30 PM (Mon–Fri)
            </p>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <div>
            © All India Council for Technical Education. Content owned, maintained, and updated by AICTE.
          </div>
          <div>
            Last Updated: 29 October 2026 | Compliant with GIGW 3.0
          </div>
        </div>
      </div>
    </footer>
  );
}
