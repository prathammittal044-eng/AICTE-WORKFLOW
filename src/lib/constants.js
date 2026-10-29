export const APH_STAGES = {
  SUBMITTED: {
    id: 'SUBMITTED',
    stepNumber: 1,
    label: 'Submitted',
    labelHi: 'प्रस्तुत किया गया',
    color: 'bg-slate-100 text-slate-800 border-slate-300',
    description: 'Application submitted with supporting documents'
  },
  SCRUTINY: {
    id: 'SCRUTINY',
    stepNumber: 2,
    label: 'Under Scrutiny',
    labelHi: 'जांच प्रक्रियाधीन',
    color: 'bg-amber-50 text-amber-800 border-amber-300',
    description: 'Regional Officer verifying APH parameters'
  },
  DEFICIENCY_RETURNED: {
    id: 'DEFICIENCY_RETURNED',
    stepNumber: 2,
    label: 'Deficiencies Communicated',
    labelHi: 'कमियां सूचित',
    color: 'bg-red-50 text-red-700 border-red-200',
    description: 'Returned to institution for deficiency rectification'
  },
  RESUBMITTED: {
    id: 'RESUBMITTED',
    stepNumber: 2,
    label: 'Resubmitted for Review',
    labelHi: 'पुनः प्रस्तुत',
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    description: 'Institution rectified deficiencies and resubmitted'
  },
  EVC_SCHEDULED: {
    id: 'EVC_SCHEDULED',
    stepNumber: 3,
    label: 'EVC Visit Scheduled',
    labelHi: 'ईवीसी निर्धारित',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    description: 'Expert Visit Committee appointed and inspection date confirmed'
  },
  EVC_REPORT_SUBMITTED: {
    id: 'EVC_REPORT_SUBMITTED',
    stepNumber: 4,
    label: 'EVC Report Submitted',
    labelHi: 'ईवीसी रिपोर्ट प्रस्तुत',
    color: 'bg-teal-50 text-teal-800 border-teal-200',
    description: 'Site inspection assessment report submitted by experts'
  },
  SAC_PROCESSING: {
    id: 'SAC_PROCESSING',
    stepNumber: 5,
    label: 'SAC / SHC Review',
    labelHi: 'एसएसी / एसएचसी समीक्षा',
    color: 'bg-purple-50 text-purple-700 border-purple-200',
    description: 'Standing Appellate / Hearing Committee hearing in session'
  },
  APPROVED: {
    id: 'APPROVED',
    stepNumber: 6,
    label: 'Approved (EoA)',
    labelHi: 'स्वीकृत',
    color: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    description: 'Approval order issued with compliance tracking'
  },
  CONDITIONALLY_APPROVED: {
    id: 'CONDITIONALLY_APPROVED',
    stepNumber: 6,
    label: 'Approved with Conditions',
    labelHi: 'शर्तों सहित स्वीकृत',
    color: 'bg-sky-50 text-sky-800 border-sky-300',
    description: 'Approval issued subject to time-bound compliance undertakings'
  },
  REJECTED: {
    id: 'REJECTED',
    stepNumber: 6,
    label: 'Rejected',
    labelHi: 'अस्वीकृत',
    color: 'bg-red-50 text-red-800 border-red-300',
    description: 'Application rejected due to unrectified statutory violations'
  }
};

export const ROLE_LABELS = {
  INSTITUTION: 'Institution Representative',
  REGIONAL_OFFICER: 'Regional Officer',
  COMMITTEE: 'Committee Member',
  AICTE_BUREAU: 'AICTE Bureau Official',
  SYSTEM_AUTOMATION: 'Automated System Service'
};

export const ROLES = {
  INSTITUTION: {
    id: 'INSTITUTION',
    title: 'Technical Institution',
    titleHi: 'तकनीकी संस्थान',
    badge: 'Institution Representative',
    defaultUser: {
      name: 'Dr. Rajeev Sharma',
      designation: 'Principal',
      org: 'Shri Ramdeobaba College of Engg. & Mgmt., Nagpur'
    }
  },
  REGIONAL_OFFICER: {
    id: 'REGIONAL_OFFICER',
    title: 'Regional Office',
    titleHi: 'क्षेत्रीय कार्यालय',
    badge: 'Regional Officer (Western Region)',
    defaultUser: {
      name: 'Shri Prakash Mehta',
      designation: 'Regional Officer',
      org: 'AICTE Western Regional Office, Mumbai'
    }
  },
  COMMITTEE: {
    id: 'COMMITTEE',
    title: 'Expert Committee',
    titleHi: 'विशेषज्ञ समिति',
    badge: 'EVC & Appellate Committee',
    defaultUser: {
      name: 'Prof. K. Narayanan',
      designation: 'Committee Member',
      org: 'AICTE Standing Appellate Committee'
    }
  },
  AICTE_BUREAU: {
    id: 'AICTE_BUREAU',
    title: 'AICTE Headquarters',
    titleHi: 'एआईसीटीई मुख्यालय',
    badge: 'Approval Bureau (New Delhi)',
    defaultUser: {
      name: 'Dr. Mamta R. Agarwal',
      designation: 'Advisor-I (Approval Bureau)',
      org: 'AICTE Headquarters, New Delhi'
    }
  }
};

export const REGIONS = [
  'Northern (Kanpur)',
  'North-Western (Chandigarh)',
  'Western (Mumbai)',
  'Central (Bhopal)',
  'Eastern (Kolkata)',
  'Southern (Chennai)',
  'South-Western (Bengaluru)',
  'South-Central (Hyderabad)'
];

export const DEFICIENCY_CATEGORIES = [
  { id: 'LAND_TITLE_DEFICIT', label: 'Land Area / Title Deed Discrepancy (Clause 2.1 APH)' },
  { id: 'FACULTY_CADRE_MISMATCH', label: 'Faculty Cadre Ratio Shortfall (Cadre Norms 1:15)' },
  { id: 'FIRE_SAFETY_NOC', label: 'Fire Safety Certificate Expired / Unverified' },
  { id: 'BUILDING_PLAN_OLD', label: 'Building Plan Approval Expired (> 5 Years)' },
  { id: 'AFFIDAVIT_DEFICIENT', label: 'Statutory Affidavit Deficient / Incomplete' },
  { id: 'LAB_EQUIPMENT_DEFICIT', label: 'Instructional Lab Carpet Area Non-Compliant' }
];

export const EVC_EXPERTS_POOL = [
  { id: 'EXP-01', name: 'Dr. Arvind Joshi', domain: 'Computer Science & AI', org: 'IIT Bombay', region: 'Western' },
  { id: 'EXP-02', name: 'Prof. Sunita Deshmukh', domain: 'Civil & Structural Engg', org: 'VNIT Nagpur', region: 'Western' },
  { id: 'EXP-03', name: 'Dr. R. K. Bhattacharya', domain: 'Electrical & Electronics', org: 'COEP Pune', region: 'Western' },
  { id: 'EXP-04', name: 'Dr. Manjunath Swamy', domain: 'Mechanical & Automation', org: 'IISc Bengaluru', region: 'Southern' },
  { id: 'EXP-05', name: 'Prof. Ananya Sen', domain: 'Pharmacy & Biotech', org: 'Jadavpur University', region: 'Eastern' },
  { id: 'EXP-06', name: 'Dr. Harish Chandra', domain: 'Architecture & Town Planning', org: 'SPA New Delhi', region: 'Northern' }
];
