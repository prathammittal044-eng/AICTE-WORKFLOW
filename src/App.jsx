import React, { useState } from 'react';
import { useAppStore } from './store/useAppStore';

// Layout
import GIGWTopBar from './components/layout/GIGWTopBar';
import GIGWHeader from './components/layout/GIGWHeader';
import GIGWNavBar from './components/layout/GIGWNavBar';
import GIGWFooter from './components/layout/GIGWFooter';

// UI Modals
import NotificationDrawer from './components/ui/NotificationDrawer';
import AuditTrailModal from './components/ui/AuditTrailModal';

// Views
import LoginPage from './views/auth/LoginPage';
import RODashboard from './views/regional-officer/RODashboard';
import ScrutinyWorkbench from './views/regional-officer/ScrutinyWorkbench';
import InstitutionDashboard from './views/institution/InstitutionDashboard';
import ApplicationWizard from './views/institution/ApplicationWizard';
import ComplianceCenter from './views/institution/ComplianceCenter';
import CommitteeDashboard from './views/committee/CommitteeDashboard';
import BureauDashboard from './views/bureau/BureauDashboard';

export default function App() {
  const { activeRole } = useAppStore();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentNav, setCurrentNav] = useState('dashboard');
  const [activeWorkbenchAppId, setActiveWorkbenchAppId] = useState('AICTE-APP-2026-087341');

  // Handle Opening Workbench directly
  const handleOpenWorkbench = (appId) => {
    setActiveWorkbenchAppId(appId);
    setCurrentNav('workbench');
  };

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  const renderActiveView = () => {
    switch (activeRole) {
      case 'INSTITUTION':
        if (currentNav === 'apply') {
          return <ApplicationWizard onComplete={() => setCurrentNav('dashboard')} />;
        }
        if (currentNav === 'compliance') {
          return <ComplianceCenter />;
        }
        return <InstitutionDashboard onNavigateToApply={() => setCurrentNav('apply')} />;

      case 'REGIONAL_OFFICER':
        if (currentNav === 'workbench') {
          return (
            <ScrutinyWorkbench
              appId={activeWorkbenchAppId}
              onBack={() => setCurrentNav('dashboard')}
            />
          );
        }
        if (currentNav === 'compliance') {
          return <ComplianceCenter />;
        }
        return <RODashboard onOpenWorkbench={handleOpenWorkbench} />;

      case 'COMMITTEE':
        return <CommitteeDashboard />;

      case 'AICTE_BUREAU':
        if (currentNav === 'alerts') {
          return <ComplianceCenter />;
        }
        return <BureauDashboard />;

      default:
        return <RODashboard onOpenWorkbench={handleOpenWorkbench} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans antialiased">
      <div>
        <GIGWTopBar />
        <GIGWHeader onLogout={() => setIsAuthenticated(false)} />
        <GIGWNavBar currentView={currentNav} setCurrentView={setCurrentNav} />

        <main id="main-content" className="max-w-7xl mx-auto w-full px-4 py-6">
          {renderActiveView()}
        </main>
      </div>

      <GIGWFooter />

      {/* Global Drawers & Modals */}
      <NotificationDrawer />
      <AuditTrailModal />
    </div>
  );
}
