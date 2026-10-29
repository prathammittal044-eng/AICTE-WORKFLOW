# PARIKALP / परिकल्प
### Integrated AICTE Approval Workflow Automation, Compliance Monitoring and Alert Management System
**Smart India Hackathon 2026 | Problem Statement ID: 26262**
**Theme:** Smart Governance & Administrative Reforms | **Category:** Software
**Team Name:** PARIKALP | **Team ID:** 199059

---

## 📌 Executive Summary

**PARIKALP** is an authoritative, unified digital governance portal engineered to automate the end-to-end administrative approval lifecycle for technical institutions under the **AICTE Approval Process Handbook (APH 2024–27)**. It solves critical administrative bottlenecks including fragmented records, manual scrutiny overhead, lack of pendency tracking, and post-approval compliance lapses (such as expiring land lease deeds and fire safety clearances).

The system integrates an automated 6-stage workflow engine, an AI-assisted document review workbench (simulating LayoutLMv3 and Donut Document Transformers), a multi-tier SLA escalation matrix, and continuous institutional compliance monitoring.

---

## 🏛️ Regulatory & Policy Standards Compliance

* **GIGW 3.0 Compliance:** Designed strictly according to the **Guidelines for Indian Government Websites (GIGW 3.0)**, featuring top accessibility controls (font scaling `A-`/`A`/`A+`, high-contrast WCAG AA/AAA mode, screen reader support, and full English / हिन्दी bilingual localization).
* **DigiLocker Requester API Specification v1.12:** Seamless simulated integration for pulling cryptographically authenticated land registration records, e-stamped affidavits, and state fire safety NOCs.
* **OWASP ASVS v5.0 Security & Auditability:** Role-Based Access Control (RBAC) scope validation, session security indicators, and an immutable digital audit ledger recording all administrative transitions with timestamps, actor IDs, and client IP addresses.
* **Explainable AI Safeguard:** Incorporating recommendations from public governance research (*Bullock et al., JPART 2022* & *Chen et al., Signal Processing 2022*), AI screening serves purely as an advisory signal with tamper heatmaps, ensuring authorized AICTE officers retain final decision authority.

---

## 🚀 Key Modules & Role Workspaces

### 1. 🔍 Regional Officer Scrutiny Console
* **Split-Screen Verification Workspace:** Simultaneous view of institutional dossier parameters and uploaded legal documents.
* **AI Layout & Field Extraction:** Automated extraction of land acreage, deed dates, and cadre ratios with confidence scores.
* **Tamper Screening Heatmap:** Visual anomaly detection highlighting manipulated text or recapturing artifacts on land deeds.
* **Structured Deficiency Memo Generator:** Formally returns applications for deficiency rectification with statutory grounds under APH clauses.

### 2. 🎓 Technical Institution Self-Service Portal
* **APH 2026-27 Application Wizard:** Pre-submission rule check validating land area, built-up carpet area, and mandatory checklists before filing.
* **Deficiency Inbox & Resubmission:** Instant response to Regional Officer memos with revised proofs.
* **Statutory Validity & Lease Radar:** Real-time countdown tracking expiry dates of land lease agreements, fire safety NOCs, and accreditation SAR deadlines.

### 3. 👥 Committee (EVC / SAC / SHC) Management
* **Peer Visit Committee Roster:** Automated expert allocator assigning non-conflicted domain inspectors from premier institutions (IITs, NITs, IISc).
* **Site Report & Evidence Review:** Digital verification of physical infrastructure assessments.
* **Standing Appellate Committee (SAC) Hearings:** Deliberations and formal recommendations for provisional or full approvals.

### 4. 🏛️ AICTE Bureau Executive Command Center
* **Interactive Recharts Telemetry:** Real-time National Approval Funnel throughput, Region-wise pendency distribution (Western, Northern, Southern, Eastern, Central), and SLA aging charts.
* **Gazette Approval Order Generator:** Digital signing and issuance of formal Extension of Approval (EoA) orders with automated Gazette numbering.
* **Multi-Tier Escalation Matrix:** Configurable trigger rules (Level 1 $\rightarrow$ Level 2 Bureau $\rightarrow$ Level 3 Member Secretary).

### 5. 🎬 Floating SIH Jury Demo Bar
* **Instant Role Switcher:** Switch between all 4 roles in 1 click without re-logging in.
* **Simulate SLA Breach:** Demonstrates live overdue escalation across all connected dashboards.
* **Reset Demo Data:** Reverts state to pristine pre-seeded test scenarios between evaluation rounds.
* **Audit Trail Ledger:** Instant modal inspection of the tamper-proof transaction log.

---

## 🛠️ Technology Stack

| Layer | Technologies Selected |
| :--- | :--- |
| **Framework** | React 18 (Vite 6) |
| **Styling** | Tailwind CSS 3 with Sovereign Government Design Tokens |
| **Icons & Visuals** | Lucide React |
| **Analytics & Charts** | Recharts 2 |
| **Reactive State Engine** | Zustand 5 with `localStorage` persistence (Zero-Backend Full-Stack Illusion) |
| **Design System** | Google Stitch (`Sovereign Compliance & Civic Trust`) |

---

## 💻 Local Setup & Development

### Prerequisites
* Node.js (v18 or higher)
* npm (v9 or higher)

### Installation
```bash
# Clone the repository
git clone https://github.com/prathammittal044-eng/AICTE-WORKFLOW.git

# Navigate into project directory
cd AICTE-WORKFLOW

# Install dependencies
npm install

# Start the interactive development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Preview
```bash
# Build for production
npm run build

# Preview production build locally
npm run preview -- --port 3000
```

---

## 👥 Team PARIKALP — Smart India Hackathon 2026
* **Team ID:** 199059
* **Problem Statement:** 26262 — Integrated AICTE Approval Workflow Automation, Compliance Monitoring and Alert Management System
