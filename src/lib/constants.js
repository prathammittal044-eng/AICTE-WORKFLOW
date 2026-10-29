export const APH_STAGES = {
  SUBMITTED: {
    id: 'SUBMITTED',
    stepNumber: 1,
    label: 'Application Submitted',
    labelHi: 'आवेदन प्रस्तुत किया गया',
    color: 'bg-blue-100 text-blue-800 border-blue-300',
    description: 'Institution submitted application with supporting documents'
  },
  SCRUTINY: {
    id: 'SCRUTINY',
    stepNumber: 2,
    label: 'Scrutiny / Re-scrutiny',
    labelHi: 'जांच / पुनः जांच',
    color: 'bg-amber-100 text-amber-900 border-amber-300',
    description: 'Regional Officer verifying APH parameters & AI flags'
  },
  DEFICIENCY_RETURNED: {
    id: 'DEFICIENCY_RETURNED',
    stepNumber: 2,
    label: 'Returned for Deficiencies',
    labelHi: 'कमियों के कारण लौटाया गया',
    color: 'bg-rose-100 text-rose-800 border-rose-300',
    description: 'Application returned to institution with structured deficiency memo'
  },
  RESUBMITTED: {
    id: 'RESUBMITTED',
    stepNumber: 2,
    label: 'Resubmitted for Review',
    labelHi: 'समीक्षा हेतु पुनः प्रस्तुत',
    color: 'bg-purple-100 text-purple-800 border-purple-300',
    description: 'Institution rectified deficiencies and resubmitted'
  },
  EVC_SCHEDULED: {
    id: 'EVC_SCHEDULED',
    stepNumber: 3,
    label: 'EVC Scheduled',
    labelHi: 'ईवीसी निर्धारित',
    color: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    description: 'Expert Visit Committee appointed and inspection date locked'
  },
  EVC_REPORT_SUBMITTED: {
    id: 'EVC_REPORT_SUBMITTED',
    stepNumber: 4,
    label: 'EVC Report Under Review',
    labelHi: 'ईवीसी रिपोर्ट समीक्षाधीन',
    color: 'bg-teal-100 text-teal-800 border-teal-300',
    description: 'Site inspection report and geo-evidence submitted by experts'
  },
  SAC_PROCESSING: {
    id: 'SAC_PROCESSING',
    stepNumber: 5,
    label: 'SAC / SHC Hearing',
    labelHi: 'एसएसी / एसएचसी सुनवाई',
    color: 'bg-orange-100 text-orange-900 border-orange-300',
    description: 'Standing Appellate / Hearing Committee hearing in session'
  },
  APPROVED: {
    id: 'APPROVED',
    stepNumber: 6,
    label: 'Approval Granted (EoA)',
    labelHi: 'अनुमोदन प्रदान किया गया',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'AICTE Bureau issued final approval order with compliance tracking'
  },
  CONDITIONALLY_APPROVED: {
    id: 'CONDITIONALLY_APPROVED',
    stepNumber: 6,
    label: 'Approved with Conditions',
    labelHi: 'शर्तों के साथ अनुमोदित',
    color: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    description: 'Approval issued subject to time-bound compliance undertakings'
  },
  REJECTED: {
    id: 'REJECTED',
    stepNumber: 6,
    label: 'Approval Rejected',
    labelHi: 'अनुमोदन अस्वीकृत',
    color: 'bg-red-100 text-red-800 border-red-300',
    description: 'Application rejected due to unrectified statutory violations'
  }
};

export const ROLES = {
  INSTITUTION: {
    id: 'INSTITUTION',
    title: 'Technical Institution',
    titleHi: 'तकनीकी संस्थान',
    badge: 'INSTITUTION PORTAL',
    defaultUser: {
      name: 'Dr. Rajeev Sharma',
      designation: 'Principal / Authorized Representative',
      org: 'Shri Ramdeobaba College of Engg. & Mgmt., Nagpur'
    }
  },
  REGIONAL_OFFICER: {
    id: 'REGIONAL_OFFICER',
    title: 'Regional Officer',
    titleHi: 'क्षेत्रीय अधिकारी',
    badge: 'WESTERN REGION - RO (LEVEL 3)',
    defaultUser: {
      name: 'Shri Prakash Mehta',
      designation: 'Regional Officer (Western Region)',
      org: 'AICTE Western Regional Office, Mumbai'
    }
  },
  COMMITTEE: {
    id: 'COMMITTEE',
    title: 'Committee (EVC / SAC)',
    titleHi: 'समिति (ईवीसी / एसएसी)',
    badge: 'EVC & APPELLATE COMMITTEE',
    defaultUser: {
      name: 'Prof. K. Narayanan',
      designation: 'EVC Coordinator & SAC Member',
      org: 'AICTE Standing Hearing Committee'
    }
  },
  AICTE_BUREAU: {
    id: 'AICTE_BUREAU',
    title: 'AICTE Bureau (HQ)',
    titleHi: 'एआईसीटीई ब्यूरो (मुख्यालय)',
    badge: 'COMPETENT AUTHORITY - NEW DELHI',
    defaultUser: {
      name: 'Dr. Mamta R. Agarwal',
      designation: 'Advisor-I (Approval Bureau)',
      org: 'AICTE Headquarters, Nelson Mandela Marg, New Delhi'
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
  { id: 'LAND_TITLE_DEFICIT', label: 'Land Area / Title Deed Deficit (Clause 2.1 APH)' },
  { id: 'FACULTY_CADRE_MISMATCH', label: 'Faculty Cadre Ratio Deficiency (Min 1:15 Cadre)' },
  { id: 'FIRE_SAFETY_NOC', label: 'Fire Safety Certificate Expired / Unverified' },
  { id: 'BUILDING_PLAN_OLD', label: 'Building Plan Approval > 5 Years Old' },
  { id: 'AFFIDAVIT_DEFICIENT', label: 'Non-Judicial Stamp Paper Affidavit Deficient' },
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
