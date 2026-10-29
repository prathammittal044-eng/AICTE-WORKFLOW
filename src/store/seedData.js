export const initialInstitutions = [
  {
    id: 'INST-MH-2024-0421',
    name: 'Shri Ramdeobaba College of Engineering & Management',
    code: 'MH-NAG-2421',
    pid: '1-4298101',
    type: 'Autonomous / Private',
    region: 'Western (Mumbai)',
    state: 'Maharashtra',
    city: 'Nagpur',
    address: 'Katol Road, Gittikhadan, Nagpur - 440013',
    principal: 'Dr. Rajeev Sharma',
    contactEmail: 'principal@rknec.edu',
    contactPhone: '+91-712-2580011',
    programmes: ['B.Tech Computer Science', 'B.Tech AI & Data Science', 'B.Tech Mechanical', 'MBA', 'MCA'],
    sanctionedIntake: 960,
    digilockerVerified: true,
    aisheCode: 'C-18742',
    landAreaAcres: 5.2,
    builtUpAreaSqM: 42500
  },
  {
    id: 'INST-RJ-2024-1189',
    name: 'Jain Institute of Technology & Polytechnic',
    code: 'RJ-JAI-1189',
    pid: '1-7890124',
    type: 'Private Self-Financed',
    region: 'North-Western (Chandigarh)',
    state: 'Rajasthan',
    city: 'Jaipur',
    address: 'Sitapura Industrial Area, Tonk Road, Jaipur - 302022',
    principal: 'Dr. Anita Choudhary',
    contactEmail: 'director@jitjaipur.edu.in',
    contactPhone: '+91-141-2771900',
    programmes: ['Diploma Mechanical', 'Diploma Civil', 'B.Tech Electrical'],
    sanctionedIntake: 360,
    digilockerVerified: true,
    aisheCode: 'C-22904',
    landAreaAcres: 2.8,
    builtUpAreaSqM: 14200
  },
  {
    id: 'INST-MH-2024-0552',
    name: 'Savitribai Phule Institute of Technology',
    code: 'MH-PUN-0552',
    pid: '1-3349182',
    type: 'Private Unaided',
    region: 'Western (Mumbai)',
    state: 'Maharashtra',
    city: 'Pune',
    address: 'Bhosari MIDC, Pimpri-Chinchwad, Pune - 411026',
    principal: 'Dr. Sanjay Wagh',
    contactEmail: 'principal@spitpune.ac.in',
    contactPhone: '+91-20-27124400',
    programmes: ['B.Tech Robotics & Automation', 'B.Tech Electronics & Comm', 'M.Tech VLSI'],
    sanctionedIntake: 540,
    digilockerVerified: true,
    aisheCode: 'C-19830',
    landAreaAcres: 4.1,
    builtUpAreaSqM: 28400
  },
  {
    id: 'INST-TN-2024-0812',
    name: 'Sri Venkateshwara College of Engineering & Technology',
    code: 'TN-CHE-0812',
    pid: '1-2940182',
    type: 'Autonomous',
    region: 'Southern (Chennai)',
    state: 'Tamil Nadu',
    city: 'Chennai',
    address: 'Pennalur, Sriperumbudur, Kanchipuram District, Chennai - 602117',
    principal: 'Dr. S. Ramesh Kumar',
    contactEmail: 'principal@svce.ac.in',
    contactPhone: '+91-44-27152000',
    programmes: ['B.Tech Information Technology', 'B.Tech Chemical Engg', 'B.Tech Aerospace'],
    sanctionedIntake: 840,
    digilockerVerified: true,
    aisheCode: 'C-16541',
    landAreaAcres: 12.5,
    builtUpAreaSqM: 58000
  },
  {
    id: 'INST-MP-2024-0231',
    name: 'Rajiv Gandhi Institute of Engineering & Technology',
    code: 'MP-BHO-0231',
    pid: '1-5120934',
    type: 'State University Department',
    region: 'Central (Bhopal)',
    state: 'Madhya Pradesh',
    city: 'Bhopal',
    address: 'Airport Bypass Road, Gandhi Nagar, Bhopal - 462033',
    principal: 'Dr. Vijay K. Verma',
    contactEmail: 'head.engg@rgpv.ac.in',
    contactPhone: '+91-755-2678810',
    programmes: ['B.Tech Cyber Security', 'B.Tech Mining Engg', 'M.Tech Energy'],
    sanctionedIntake: 480,
    digilockerVerified: true,
    aisheCode: 'U-03120',
    landAreaAcres: 15.0,
    builtUpAreaSqM: 62000
  },
  {
    id: 'INST-AS-2024-0094',
    name: 'North-East Frontier Institute of Technology',
    code: 'AS-GUW-0094',
    pid: '1-9018231',
    type: 'New Private Institution',
    region: 'Eastern (Kolkata)',
    state: 'Assam',
    city: 'Guwahati',
    address: 'Tech City Campus, Borjhar, Guwahati - 781015',
    principal: 'Dr. Bhupen Kalita',
    contactEmail: 'info@nefit.edu.in',
    contactPhone: '+91-361-2849100',
    programmes: ['B.Tech Computer Science', 'B.Tech Civil Engineering'],
    sanctionedIntake: 240,
    digilockerVerified: false,
    aisheCode: 'Pending',
    landAreaAcres: 6.0,
    builtUpAreaSqM: 18500
  }
];

export const initialApplications = [
  {
    id: 'AICTE-APP-2026-087341',
    institutionId: 'INST-MH-2024-0421',
    type: 'Extension of Approval (EoA)',
    academicYear: '2026-27',
    aphVersion: 'APH-2024-27 (Clause 2.1)',
    workflowStage: 'SCRUTINY',
    submissionDate: '2026-10-24T09:40:00Z',
    slaDueDate: '2026-10-31T18:00:00Z',
    assignedRegion: 'Western (Mumbai)',
    assignedOfficer: 'Shri Prakash Mehta',
    slaBreached: false,
    escalationLevel: 1,
    aiRiskLevel: 'HIGH_RISK',
    aiScreening: {
      modelUsed: 'LayoutLMv3 + Donut Document Transformer (Huang et al., 2022)',
      overallConfidence: 0.942,
      tamperScore: 0.88,
      tamperRisk: 'POTENTIAL_RECAPTURING_ATTACK',
      tamperCitation: 'Tampering localization under recapturing attack (Chen et al., Signal Processing 2022)',
      extractedFields: [
        { field: 'Institution Name', declared: 'SRCEM Nagpur', extracted: 'SRCEM Nagpur', match: true, conf: 0.98 },
        { field: 'Land Area (Acres)', declared: '5.20 Acres', extracted: '4.80 Acres', match: false, conf: 0.912, flag: 'MISMATCH_DEFICIENCY' },
        { field: 'Registered Deed Date', declared: '14-Mar-2018', extracted: '14-Mar-2018', match: true, conf: 0.99 },
        { field: 'Lease Validity Period', declared: '30 Years', extracted: '30 Years', match: true, conf: 0.97 }
      ],
      tamperCoordinates: { x: 42, y: 38, width: 24, height: 12 },
      officerNotes: 'Land lease deed extracted 4.80 Acres vs declared 5.20 Acres. Discrepancy requires physical survey deed or EVC inspection.'
    },
    deficiencies: [],
    history: [
      { stage: 'SUBMITTED', at: '2026-10-24T09:40:00Z', by: 'Dr. Rajeev Sharma', role: 'INSTITUTION', remark: 'Initial application submitted with fee clearance' },
      { stage: 'SCRUTINY', at: '2026-10-25T11:20:00Z', by: 'Shri Prakash Mehta', role: 'REGIONAL_OFFICER', remark: 'Assigned to Western Regional Office. AI Screening Triggered.' }
    ]
  },
  {
    id: 'AICTE-APP-2026-064218',
    institutionId: 'INST-RJ-2024-1189',
    type: 'Extension of Approval (EoA) & Course Addition',
    academicYear: '2026-27',
    aphVersion: 'APH-2024-27',
    workflowStage: 'DEFICIENCY_RETURNED',
    submissionDate: '2026-10-18T14:15:00Z',
    slaDueDate: '2026-11-04T18:00:00Z',
    assignedRegion: 'North-Western (Chandigarh)',
    assignedOfficer: 'Smt. Vandana Gill',
    slaBreached: false,
    escalationLevel: 0,
    aiRiskLevel: 'MEDIUM_RISK',
    aiScreening: {
      modelUsed: 'LayoutLMv3 (Huang et al., 2022)',
      overallConfidence: 0.965,
      tamperScore: 0.12,
      tamperRisk: 'AUTHENTIC',
      extractedFields: [
        { field: 'Fire NOC Status', declared: 'Valid', extracted: 'Expired on 15-Aug-2026', match: false, conf: 0.95, flag: 'EXPIRED_CERTIFICATE' },
        { field: 'Faculty Cadre Ratio', declared: '1:15 Ratio (24 Faculty)', extracted: '18 Faculty listed on muster', match: false, conf: 0.92, flag: 'UNDERSTAFFED' }
      ]
    },
    deficiencies: [
      { id: 'DEF-1', category: 'FIRE_SAFETY_NOC', description: 'State Fire Services Certificate expired on 15-Aug-2026. Current valid NOC mandatory under APH Norms.', dateIssued: '2026-10-22' },
      { id: 'DEF-2', category: 'FACULTY_CADRE_MISMATCH', description: 'Muster roll lists 18 faculty against sanctioned intake requirement of 24. Submit appointment orders.', dateIssued: '2026-10-22' }
    ],
    history: [
      { stage: 'SUBMITTED', at: '2026-10-18T14:15:00Z', by: 'Dr. Anita Choudhary', role: 'INSTITUTION', remark: 'Submitted with provisional Fire NOC token' },
      { stage: 'SCRUTINY', at: '2026-10-20T10:00:00Z', by: 'Smt. Vandana Gill', role: 'REGIONAL_OFFICER', remark: 'Scrutiny initiated' },
      { stage: 'DEFICIENCY_RETURNED', at: '2026-10-22T16:30:00Z', by: 'Smt. Vandana Gill', role: 'REGIONAL_OFFICER', remark: 'Deficiency memo dispatched. Resubmission window: 15 days.' }
    ]
  },
  {
    id: 'AICTE-APP-2026-051930',
    institutionId: 'INST-MH-2024-0552',
    type: 'Establishment of New Course (Robotics & Automation)',
    academicYear: '2026-27',
    aphVersion: 'APH-2024-27',
    workflowStage: 'EVC_SCHEDULED',
    submissionDate: '2026-10-10T11:00:00Z',
    slaDueDate: '2026-11-08T18:00:00Z',
    assignedRegion: 'Western (Mumbai)',
    assignedOfficer: 'Shri Prakash Mehta',
    slaBreached: false,
    escalationLevel: 0,
    aiRiskLevel: 'LOW_RISK',
    evcDetails: {
      visitDate: '2026-11-05',
      mode: 'Physical On-Site Inspection',
      experts: [
        { name: 'Dr. Arvind Joshi', domain: 'Computer Science & AI', org: 'IIT Bombay' },
        { name: 'Dr. R. K. Bhattacharya', domain: 'Electrical & Electronics', org: 'COEP Pune' },
        { name: 'Prof. Sunita Deshmukh', domain: 'Civil & Structural Engg', org: 'VNIT Nagpur' }
      ],
      reportSubmitted: false,
      inspectionChecklistPending: ['Lab Hardware Benchmark', 'Emergency Fire Exits', 'Barrier-free Ramp Access']
    },
    history: [
      { stage: 'SUBMITTED', at: '2026-10-10T11:00:00Z', by: 'Dr. Sanjay Wagh', role: 'INSTITUTION', remark: 'New course application filed' },
      { stage: 'SCRUTINY', at: '2026-10-14T09:30:00Z', by: 'Shri Prakash Mehta', role: 'REGIONAL_OFFICER', remark: 'Scrutiny passed. Physical infrastructure inspection required.' },
      { stage: 'EVC_SCHEDULED', at: '2026-10-21T15:00:00Z', by: 'Prof. K. Narayanan', role: 'COMMITTEE', remark: '3-member peer team allocated with zero conflict of interest.' }
    ]
  },
  {
    id: 'AICTE-APP-2026-033790',
    institutionId: 'INST-TN-2024-0812',
    type: 'Autonomous Status Renewal & EoA',
    academicYear: '2026-27',
    aphVersion: 'APH-2024-27',
    workflowStage: 'SAC_PROCESSING',
    submissionDate: '2026-09-28T16:20:00Z',
    slaDueDate: '2026-11-02T18:00:00Z',
    assignedRegion: 'Southern (Chennai)',
    assignedOfficer: 'Dr. K. Swaminathan',
    slaBreached: false,
    escalationLevel: 0,
    aiRiskLevel: 'LOW_RISK',
    evcReport: {
      visitConductedOn: '2026-10-14',
      outcome: 'SATISFACTORY_WITH_CONDITIONS',
      leadInspector: 'Dr. Manjunath Swamy (IISc)',
      carpetAreaVerified: '58,400 sq.m verified via GIS tags',
      committeeRemarks: 'Recommended for Autonomous extension subject to NBA tier-1 submission by Dec 2026.'
    },
    sacDetails: {
      hearingScheduled: '2026-10-30',
      caseOfficer: 'Prof. K. Narayanan (SAC Secretariat)',
      recommendationPending: true
    },
    history: [
      { stage: 'SUBMITTED', at: '2026-09-28T16:20:00Z', by: 'Dr. S. Ramesh Kumar', role: 'INSTITUTION', remark: 'Submitted renewal application' },
      { stage: 'SCRUTINY', at: '2026-10-02T11:00:00Z', by: 'Dr. K. Swaminathan', role: 'REGIONAL_OFFICER', remark: 'Approved for EVC' },
      { stage: 'EVC_SCHEDULED', at: '2026-10-08T10:00:00Z', by: 'EVC Desk', role: 'COMMITTEE', remark: 'EVC roster finalized' },
      { stage: 'EVC_REPORT_SUBMITTED', at: '2026-10-16T18:00:00Z', by: 'Dr. Manjunath Swamy', role: 'COMMITTEE', remark: 'Report cleared with B+ rating' },
      { stage: 'SAC_PROCESSING', at: '2026-10-23T14:00:00Z', by: 'SAC Secretariat', role: 'COMMITTEE', remark: 'Placed before Standing Appellate Committee for final recommendations' }
    ]
  },
  {
    id: 'AICTE-APP-2024-099012',
    institutionId: 'INST-MP-2024-0231',
    type: 'Extension of Approval (EoA)',
    academicYear: '2025-26',
    aphVersion: 'APH-2024-27',
    workflowStage: 'APPROVED',
    submissionDate: '2025-04-12T10:00:00Z',
    slaDueDate: '2025-05-15T18:00:00Z',
    assignedRegion: 'Central (Bhopal)',
    assignedOfficer: 'Shri R. P. Tiwari',
    slaBreached: false,
    escalationLevel: 2,
    aiRiskLevel: 'LOW_RISK',
    approvalOrderNo: 'F.No. Central/1-5120934/2025/EOA',
    approvedDate: '2025-05-10',
    validTill: '2027-04-30',
    criticalAlert: 'Land Lease Deed expiring in 17 days (15-Nov-2026). Mandatory renewal required under Clause 2.1.',
    history: [
      { stage: 'SUBMITTED', at: '2025-04-12T10:00:00Z', by: 'Dr. Vijay K. Verma', role: 'INSTITUTION', remark: 'Filed EoA' },
      { stage: 'APPROVED', at: '2025-05-10T16:00:00Z', by: 'Dr. Mamta R. Agarwal', role: 'AICTE_BUREAU', remark: 'Full EoA order dispatched with compliance monitoring' }
    ]
  },
  {
    id: 'AICTE-APP-2026-071445',
    institutionId: 'INST-AS-2024-0094',
    type: 'Establishment of New Technical Institute',
    academicYear: '2026-27',
    aphVersion: 'APH-2024-27',
    workflowStage: 'SUBMITTED',
    submissionDate: '2026-10-28T18:20:00Z',
    slaDueDate: '2026-11-04T18:00:00Z',
    assignedRegion: 'Eastern (Kolkata)',
    assignedOfficer: 'Unassigned (In Regional Queue)',
    slaBreached: false,
    escalationLevel: 0,
    aiRiskLevel: 'LOW_RISK',
    history: [
      { stage: 'SUBMITTED', at: '2026-10-28T18:20:00Z', by: 'Dr. Bhupen Kalita', role: 'INSTITUTION', remark: 'Fresh institute application submitted with token fee' }
    ]
  }
];

export const initialComplianceObligations = [
  {
    id: 'OBL-2026-01',
    institutionId: 'INST-MP-2024-0231',
    institutionName: 'Rajiv Gandhi Institute of Engg. & Tech, Bhopal',
    documentType: 'Registered Land Lease Deed',
    expiryDate: '2026-11-15',
    daysRemaining: 17,
    status: 'EXPIRING_SOON',
    slaLevel: 'LEVEL_2_BUREAU_ALERT',
    obligationText: 'Submit registered 30-year renewed lease deed certified by District Sub-Registrar.',
    undertakingSubmitted: false,
    uploadedFile: null
  },
  {
    id: 'OBL-2026-02',
    institutionId: 'INST-TN-2024-0812',
    institutionName: 'Sri Venkateshwara College of Engg, Chennai',
    documentType: 'NBA Tier-1 Accreditation Undertaking',
    expiryDate: '2026-12-31',
    daysRemaining: 63,
    status: 'ACTIVE_COMPLIANT',
    slaLevel: 'ON_TRACK',
    obligationText: 'Submission of SAR compliance for B.Tech IT programme accreditation.',
    undertakingSubmitted: true,
    uploadedFile: 'NBA_Tier1_Undertaking_SVCE.pdf'
  },
  {
    id: 'OBL-2026-03',
    institutionId: 'INST-RJ-2024-1189',
    institutionName: 'Jain Institute of Tech & Polytechnic, Jaipur',
    documentType: 'Fire Safety Certificate & NOC',
    expiryDate: '2026-08-15',
    daysRemaining: -75,
    status: 'OVERDUE_BREACHED',
    slaLevel: 'LEVEL_3_ESCALATED',
    obligationText: 'State Fire Department NOC renewal overdue by 75 days. Building clearance pending.',
    undertakingSubmitted: false,
    uploadedFile: null
  },
  {
    id: 'OBL-2026-04',
    institutionId: 'INST-MH-2024-0421',
    institutionName: 'Shri Ramdeobaba College of Engg & Mgmt, Nagpur',
    documentType: 'Affidavit on Rs. 100 Non-Judicial Stamp Paper',
    expiryDate: '2027-03-31',
    daysRemaining: 153,
    status: 'ACTIVE_COMPLIANT',
    slaLevel: 'ON_TRACK',
    obligationText: 'Statutory compliance regarding Anti-Ragging and Grievance Redressal Committee.',
    undertakingSubmitted: true,
    uploadedFile: 'Affidavit_Form_2026_SRCEM.pdf'
  }
];

export const initialNotifications = [
  {
    id: 'NOTIF-01',
    timestamp: '2026-10-29T11:45:00Z',
    type: 'SLA_ALERT',
    recipientRole: 'REGIONAL_OFFICER',
    title: 'High Priority: AI Land Area Discrepancy Flagged',
    body: 'Application AICTE-APP-2026-087341 (SRCEM Nagpur) flagged by LayoutLMv3 with 4.8 vs 5.2 Acres mismatch. Action required before SLA breach.',
    read: false
  },
  {
    id: 'NOTIF-02',
    timestamp: '2026-10-29T09:15:00Z',
    type: 'ESCALATION',
    recipientRole: 'AICTE_BUREAU',
    title: 'Level-2 Escalation: Land Lease Deed Expiry in 17 Days',
    body: 'Rajiv Gandhi Institute, Bhopal (APP-2024-099012) lease deed expires on 15-Nov-2026. Automated reminder 3 dispatched.',
    read: false
  },
  {
    id: 'NOTIF-03',
    timestamp: '2026-10-28T16:30:00Z',
    type: 'WORKFLOW',
    recipientRole: 'INSTITUTION',
    title: 'Scrutiny Deficiency Memo Dispatched',
    body: 'Jain Polytechnic Jaipur: 2 deficiencies returned for rectification. 15-day resubmission window initiated.',
    read: true
  },
  {
    id: 'NOTIF-04',
    timestamp: '2026-10-28T14:10:00Z',
    type: 'EVC_EVENT',
    recipientRole: 'COMMITTEE',
    title: 'EVC Committee Inspection Confirmed',
    body: 'Visit to Savitribai Phule Institute, Pune confirmed for 05-Nov-2026. 3 peer experts alerted via SMS/Email.',
    read: true
  }
];

export const initialAuditLogs = [
  {
    id: 'AUD-9012',
    timestamp: '2026-10-29T11:45:12Z',
    actor: 'AI Screening Subsystem',
    role: 'SYSTEM_AUTOMATION',
    entityId: 'AICTE-APP-2026-087341',
    action: 'AI_DOCUMENT_TAMPER_FLAGGED',
    remark: 'Donut & LayoutLMv3 flagged Land Area mismatch (4.8 vs 5.2 Acres). Tamper confidence: 88%. Human scrutiny required.',
    ip: '10.24.8.1 (AICTE Central Cluster)'
  },
  {
    id: 'AUD-9011',
    timestamp: '2026-10-28T16:32:05Z',
    actor: 'Smt. Vandana Gill',
    role: 'REGIONAL_OFFICER',
    entityId: 'AICTE-APP-2026-064218',
    action: 'DEFICIENCY_MEMO_DISPATCHED',
    remark: 'Returned with 2 deficiencies (Expired Fire NOC & Faculty ratio understaffed).',
    ip: '14.139.112.44 (RO NW Chandigarh)'
  },
  {
    id: 'AUD-9010',
    timestamp: '2026-10-28T14:12:33Z',
    actor: 'Prof. K. Narayanan',
    role: 'COMMITTEE',
    entityId: 'AICTE-APP-2026-051930',
    action: 'EVC_PEER_ROSTER_CONFIRMED',
    remark: 'Appointed 3 non-conflicted domain experts for site inspection on 05-Nov-2026.',
    ip: '115.112.89.12 (AICTE Hearing Portal)'
  },
  {
    id: 'AUD-9009',
    timestamp: '2026-10-24T09:40:18Z',
    actor: 'Dr. Rajeev Sharma',
    role: 'INSTITUTION',
    entityId: 'AICTE-APP-2026-087341',
    action: 'APPLICATION_SUBMITTED',
    remark: 'EoA 2026-27 application submitted along with DigiLocker verified land records.',
    ip: '103.21.58.19 (SRCEM Campus Gateway)'
  }
];
