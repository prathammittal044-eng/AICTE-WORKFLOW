import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  initialInstitutions,
  initialApplications,
  initialComplianceObligations,
  initialNotifications,
  initialAuditLogs
} from './seedData';
import { ROLES } from '../lib/constants';

export const useAppStore = create(
  persist(
    (set, get) => ({
      // UI Settings
      activeRole: 'REGIONAL_OFFICER', // default view for impact
      activeLang: 'en',
      highContrast: false,
      fontSizeDelta: 0,
      notificationDrawerOpen: false,
      auditModalOpen: false,

      // State Datasets
      institutions: initialInstitutions,
      applications: initialApplications,
      complianceObligations: initialComplianceObligations,
      notifications: initialNotifications,
      auditLogs: initialAuditLogs,

      // UI Actions
      setActiveRole: (role) => set({ activeRole: role }),
      toggleLang: () => set((s) => ({ activeLang: s.activeLang === 'en' ? 'hi' : 'en' })),
      toggleHighContrast: () => {
        set((s) => {
          const next = !s.highContrast;
          if (next) {
            document.body.classList.add('high-contrast');
          } else {
            document.body.classList.remove('high-contrast');
          }
          return { highContrast: next };
        });
      },
      setFontSizeDelta: (delta) => {
        set(() => {
          const size = 14 + delta;
          document.documentElement.style.setProperty('--base-font-size', `${size}px`);
          return { fontSizeDelta: delta };
        });
      },
      toggleNotificationDrawer: () => set((s) => ({ notificationDrawerOpen: !s.notificationDrawerOpen })),
      toggleAuditModal: () => set((s) => ({ auditModalOpen: !s.auditModalOpen })),

      // Core Workflow State Transition Engine
      transitionWorkflow: (appId, nextStage, actorName, role, remark, extra = {}) => {
        const timestamp = new Date().toISOString();
        const state = get();
        const app = state.applications.find((a) => a.id === appId);

        if (!app) return;

        const newHistoryEntry = {
          stage: nextStage,
          at: timestamp,
          by: actorName || ROLES[role]?.defaultUser?.name || 'Authorized Officer',
          role: role,
          remark: remark || `Transitioned to ${nextStage}`
        };

        const updatedApplications = state.applications.map((a) => {
          if (a.id === appId) {
            return {
              ...a,
              workflowStage: nextStage,
              history: [...a.history, newHistoryEntry],
              ...extra
            };
          }
          return a;
        });

        // Generate Audit Log
        const newAuditLog = {
          id: `AUD-${Date.now().toString().slice(-4)}`,
          timestamp,
          actor: actorName || ROLES[role]?.defaultUser?.name || 'Authorized Officer',
          role: role,
          entityId: appId,
          action: `WORKFLOW_ADVANCE_${nextStage}`,
          remark: remark || `Advanced stage to ${nextStage}`,
          ip: '10.24.12.8 (AICTE Security Gateway)'
        };

        // Generate System Notification
        const newNotif = {
          id: `NOTIF-${Date.now().toString().slice(-4)}`,
          timestamp,
          type: 'WORKFLOW',
          recipientRole: role === 'REGIONAL_OFFICER' ? 'INSTITUTION' : 'REGIONAL_OFFICER',
          title: `Application ${appId} Updated`,
          body: `Stage updated to ${nextStage}. Remarks: ${remark || 'Action processed successfully.'}`,
          read: false
        };

        set({
          applications: updatedApplications,
          auditLogs: [newAuditLog, ...state.auditLogs],
          notifications: [newNotif, ...state.notifications]
        });
      },

      // Regional Officer Flags Deficiencies
      returnWithDeficiencies: (appId, deficiencyItems, officerRemarks) => {
        const state = get();
        const timestamp = new Date().toISOString();
        const app = state.applications.find((a) => a.id === appId);
        if (!app) return;

        const newDeficiencies = deficiencyItems.map((item, idx) => ({
          id: `DEF-${Date.now()}-${idx}`,
          category: item.category,
          description: item.description,
          dateIssued: new Date().toLocaleDateString('en-GB')
        }));

        const updatedApplications = state.applications.map((a) => {
          if (a.id === appId) {
            return {
              ...a,
              workflowStage: 'DEFICIENCY_RETURNED',
              deficiencies: newDeficiencies,
              history: [
                ...a.history,
                {
                  stage: 'DEFICIENCY_RETURNED',
                  at: timestamp,
                  by: 'Shri Prakash Mehta',
                  role: 'REGIONAL_OFFICER',
                  remark: officerRemarks || 'Deficiencies returned for institutional compliance.'
                }
              ]
            };
          }
          return a;
        });

        const newAudit = {
          id: `AUD-${Date.now().toString().slice(-4)}`,
          timestamp,
          actor: 'Shri Prakash Mehta',
          role: 'REGIONAL_OFFICER',
          entityId: appId,
          action: 'DEFICIENCY_MEMO_RETURNED',
          remark: `Flagged ${newDeficiencies.length} deficiencies. 15-day rectification clock started.`,
          ip: '14.139.112.44'
        };

        const newNotif = {
          id: `NOTIF-${Date.now().toString().slice(-4)}`,
          timestamp,
          type: 'DEFICIENCY',
          recipientRole: 'INSTITUTION',
          title: `Action Required: Deficiency Memo for ${appId}`,
          body: `Scrutiny identified ${newDeficiencies.length} compliance deficits. Please resubmit within 15 days.`,
          read: false
        };

        set({
          applications: updatedApplications,
          auditLogs: [newAudit, ...state.auditLogs],
          notifications: [newNotif, ...state.notifications]
        });
      },

      // Institution Resubmits Deficiencies
      resubmitDeficiencies: (appId, institutionalRemark) => {
        const state = get();
        const timestamp = new Date().toISOString();

        const updatedApplications = state.applications.map((a) => {
          if (a.id === appId) {
            return {
              ...a,
              workflowStage: 'RESUBMITTED',
              history: [
                ...a.history,
                {
                  stage: 'RESUBMITTED',
                  at: timestamp,
                  by: 'Dr. Anita Choudhary',
                  role: 'INSTITUTION',
                  remark: institutionalRemark || 'Rectified certificates and revised faculty appointment roster submitted.'
                }
              ]
            };
          }
          return a;
        });

        const newAudit = {
          id: `AUD-${Date.now().toString().slice(-4)}`,
          timestamp,
          actor: 'Dr. Anita Choudhary',
          role: 'INSTITUTION',
          entityId: appId,
          action: 'APPLICATION_RESUBMITTED',
          remark: 'Compliance proofs re-uploaded via DigiLocker verified vault.',
          ip: '103.45.22.1'
        };

        set({
          applications: updatedApplications,
          auditLogs: [newAudit, ...state.auditLogs]
        });
      },

      // Committee Schedules EVC Visit
      scheduleEVCVisit: (appId, visitDate, selectedExperts, mode) => {
        const state = get();
        const timestamp = new Date().toISOString();

        const updatedApplications = state.applications.map((a) => {
          if (a.id === appId) {
            return {
              ...a,
              workflowStage: 'EVC_SCHEDULED',
              evcDetails: {
                visitDate,
                mode: mode || 'Physical On-Site Inspection',
                experts: selectedExperts,
                reportSubmitted: false
              },
              history: [
                ...a.history,
                {
                  stage: 'EVC_SCHEDULED',
                  at: timestamp,
                  by: 'Prof. K. Narayanan',
                  role: 'COMMITTEE',
                  remark: `EVC inspection locked for ${visitDate} with 3 domain experts.`
                }
              ]
            };
          }
          return a;
        });

        const newAudit = {
          id: `AUD-${Date.now().toString().slice(-4)}`,
          timestamp,
          actor: 'Prof. K. Narayanan',
          role: 'COMMITTEE',
          entityId: appId,
          action: 'EVC_INSPECTION_SCHEDULED',
          remark: `Inspection confirmed for ${visitDate}. Zero conflict-of-interest verified.`,
          ip: '115.112.89.12'
        };

        set({
          applications: updatedApplications,
          auditLogs: [newAudit, ...state.auditLogs]
        });
      },

      // Final Approval Order Generation (Bureau)
      issueApprovalOrder: (appId, conditions, orderType) => {
        const state = get();
        const timestamp = new Date().toISOString();
        const orderNo = `F.No. Western/1-4298101/${new Date().getFullYear()}/EOA`;

        const updatedApplications = state.applications.map((a) => {
          if (a.id === appId) {
            return {
              ...a,
              workflowStage: orderType === 'CONDITIONAL' ? 'CONDITIONALLY_APPROVED' : 'APPROVED',
              approvalOrderNo: orderNo,
              approvedDate: new Date().toLocaleDateString('en-GB'),
              validTill: '2028-04-30',
              history: [
                ...a.history,
                {
                  stage: orderType === 'CONDITIONAL' ? 'CONDITIONALLY_APPROVED' : 'APPROVED',
                  at: timestamp,
                  by: 'Dr. Mamta R. Agarwal',
                  role: 'AICTE_BUREAU',
                  remark: `Issued formal approval order ${orderNo}. Conditions: ${conditions || 'None'}`
                }
              ]
            };
          }
          return a;
        });

        const newAudit = {
          id: `AUD-${Date.now().toString().slice(-4)}`,
          timestamp,
          actor: 'Dr. Mamta R. Agarwal',
          role: 'AICTE_BUREAU',
          entityId: appId,
          action: 'APPROVAL_ORDER_DISPATCHED',
          remark: `Digital Gazette signed: ${orderNo}`,
          ip: '10.24.8.1'
        };

        set({
          applications: updatedApplications,
          auditLogs: [newAudit, ...state.auditLogs]
        });
      },

      // Scheduled SLA Verification & Escalation Simulation
      simulateSLABreach: () => {
        const state = get();
        const timestamp = new Date().toISOString();

        const updatedApplications = state.applications.map((a) => {
          if (a.id === 'AICTE-APP-2026-087341') {
            return {
              ...a,
              slaBreached: true,
              escalationLevel: 3,
              slaDueDate: new Date(Date.now() - 86400000 * 2).toISOString() // 2 days ago
            };
          }
          return a;
        });

        const escalationNotif = {
          id: `NOTIF-SLA-${Date.now().toString().slice(-4)}`,
          timestamp,
          type: 'SLA_ESCALATION_LEVEL_3',
          recipientRole: 'AICTE_BUREAU',
          title: 'SLA Notification: Level-3 Escalation Notice',
          body: 'Application AICTE-APP-2026-087341 (SRCEM Nagpur) has exceeded the standard scrutiny timeframe. Notice transmitted to Regional Directorate.',
          read: false
        };

        const escalationAudit = {
          id: `AUD-SLA-${Date.now().toString().slice(-4)}`,
          timestamp,
          actor: 'SLA Scheduled Engine',
          role: 'SYSTEM_AUTOMATION',
          entityId: 'AICTE-APP-2026-087341',
          action: 'LEVEL_3_ESCALATION_RECORDED',
          remark: 'Time-bound processing interval elapsed. Escalation alert generated.',
          ip: 'AICTE-SYSTEM-SCHEDULER'
        };

        set({
          applications: updatedApplications,
          notifications: [escalationNotif, ...state.notifications],
          auditLogs: [escalationAudit, ...state.auditLogs],
          notificationDrawerOpen: true
        });
      },

      // Reset to default sample records
      resetToSeedData: () => {
        set({
          institutions: initialInstitutions,
          applications: initialApplications,
          complianceObligations: initialComplianceObligations,
          notifications: initialNotifications,
          auditLogs: initialAuditLogs,
          activeRole: 'REGIONAL_OFFICER'
        });
      }
    }),
    {
      name: 'aicte_portal_state',
      partialize: (state) => ({
        activeRole: state.activeRole,
        activeLang: state.activeLang,
        highContrast: state.highContrast,
        institutions: state.institutions,
        applications: state.applications,
        complianceObligations: state.complianceObligations,
        notifications: state.notifications,
        auditLogs: state.auditLogs
      })
    }
  )
);
