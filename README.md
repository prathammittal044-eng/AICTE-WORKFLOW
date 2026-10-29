# AICTE e-Governance Portal
### Integrated Approval Workflow Automation, Compliance Monitoring and Alert Management System
**All India Council for Technical Education | Ministry of Education, Government of India**

---

## 📌 Overview

The **AICTE e-Governance Portal** is an authoritative, unified digital governance portal engineered to automate the end-to-end administrative approval lifecycle for technical institutions under the **AICTE Approval Process Handbook (APH 2024–27)**. It streamlines institutional applications, regional office scrutiny, committee inspections, and bureau order issuance with full transparency and SLA accountability.

The portal provides an automated workflow engine, document review workbench, continuous institutional compliance tracking, and administrative analytics dashboards.

---

## 🏛️ Standards & Architecture

* **GIGW 3.0 Compliance:** Designed strictly according to the **Guidelines for Indian Government Websites (GIGW 3.0)**, featuring accessibility controls (font scaling `A-`/`A`/`A+`, bilingual English / हिन्दी localization, screen reader support, and keyboard navigable layout).
* **DigiLocker Integration Model:** Seamless verification of digitally issued certificates including land registration deeds, e-stamped affidavits, and fire safety NOCs.
* **Role-Based Access Control (RBAC):** Distinct workspaces for Technical Institutions, Regional Officers, Committees (EVC / SAC), and the AICTE National Approval Bureau.
* **Statutory Activity Logging:** Digital audit trail logging administrative decisions with timestamps, actor roles, and stage histories.
* **Human-in-the-Loop Safeguard:** Automated pre-checks and verification cues serve purely as administrative aids, ensuring statutory regulatory decisions are formally recorded by authorized AICTE officials.

---

## 🏢 Workspaces & Capabilities

### 1. 🎓 Technical Institution Workspace
* **Approval Application Filing:** Structured application workflow validating land area, built-up carpet area, and mandatory norms aligned with APH 2024–27.
* **Deficiency Rectification:** Structured response to Regional Office scrutiny notices with revised proof submissions.
* **Statutory Validity & Lease Radar:** Real-time tracking of expiring land lease deeds, fire safety NOCs, and accreditation SAR deadlines.

### 2. 🔍 Regional Officer Scrutiny Console
* **Split-Screen Verification:** Synchronized side-by-side inspection of application parameters alongside submitted legal documents.
* **Automated Document Pre-Checks:** Automatic extraction and validation cues for land acreage, registration dates, and cadre ratios.
* **Deficiency Notice Issuance:** Formal issuance of statutory deficiency memos under Approval Process Handbook clauses.

### 3. 👥 Committee (EVC / SAC / SHC) Management
* **Peer Visit Committee Roster:** Coordinated scheduling of non-conflicted expert inspection panels.
* **Inspection Findings & Reports:** Digital recording and verification of physical campus infrastructure findings.
* **Standing Appellate Committee (SAC) Hearings:** Deliberations and formal recommendations for conditional or unconditional approvals.

### 4. 🏛️ AICTE National Approval Bureau
* **Executive Telemetry & Analytics:** Real-time National Approval Pipeline throughput, Regional workload distribution (Western, Northern, Southern, Eastern, Central), and overdue SLA tracking.
* **Statutory Approval Orders:** Generation and digital issuance of official Gazette Extension of Approval (EoA) orders with automated dispatch references.
* **SLA Escalation Monitoring:** Automated multi-tier escalation tracking for applications exceeding processing deadlines.

---

## 🛠️ Technology Stack

| Component | Technology |
| :--- | :--- |
| **Framework** | React 18 (Vite 6) |
| **Styling** | Tailwind CSS 3 (UX4G Government Design Tokens) |
| **Icons** | Lucide React |
| **Analytics & Visualizations** | Recharts 2 |
| **Client-Side State Engine** | Zustand 5 with `localStorage` persistence |

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
