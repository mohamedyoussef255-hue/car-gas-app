import React, { useState, useEffect } from 'react';
import { Header, ActiveTabType } from './components/Header';
import { CameraMonitoringSession } from './components/CameraMonitoringSession';
import { SessionsList } from './components/SessionsList';
import { MobileOnlyMap } from './components/MobileOnlyMap';
import { CngFeasibilityAnalytics } from './components/CngFeasibilityAnalytics';
import { ConversionFleetCalculator } from './components/ConversionFleetCalculator';
import { CngTechnicalGuide } from './components/CngTechnicalGuide';
import { AdminControlPanel } from './components/AdminControlPanel';
import { DepartmentReviewsWorkflow } from './components/DepartmentReviewsWorkflow';
import { StationExecutionTracker } from './components/StationExecutionTracker';
import { NewSessionModal } from './components/NewSessionModal';
import { CargasNgvLogo } from './components/CargasNgvLogo';
import { MonitoringSession, CNGStation, PlatformMasterSettings, FuelPricing } from './types';
import { INITIAL_SESSIONS, INITIAL_CNG_STATIONS } from './data/initialData';
import { loadPlatformSettings, savePlatformSettings } from './data/defaultSettings';

export default function App() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<ActiveTabType>('camera');

  // Master Platform Settings (Fuel pricing, Feasibility defaults, Technical Guide items)
  const [settings, setSettings] = useState<PlatformMasterSettings>(() => loadPlatformSettings());

  // Save settings when modified
  const handleUpdateSettings = (newSettings: PlatformMasterSettings) => {
    setSettings(newSettings);
    savePlatformSettings(newSettings);
  };

  const handleUpdatePricing = (newPricing: FuelPricing) => {
    setSettings(prev => {
      const updated = {
        ...prev,
        pricing: newPricing,
        lastUpdated: new Date().toISOString()
      };
      savePlatformSettings(updated);
      return updated;
    });
  };

  // Sessions state with LocalStorage persistence
  const [sessions, setSessions] = useState<MonitoringSession[]>(() => {
    try {
      const saved = localStorage.getItem('cng_platform_sessions_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return INITIAL_SESSIONS;
  });

  // Active Monitoring Session (currently being recorded in camera)
  const [activeSessionId, setActiveSessionId] = useState<string | null>(() => {
    const found = INITIAL_SESSIONS.find(s => s.status === 'active');
    return found ? found.id : INITIAL_SESSIONS[0]?.id || null;
  });

  // Stations List
  const [stations] = useState<CNGStation[]>(INITIAL_CNG_STATIONS);

  // Modal State
  const [isNewSessionModalOpen, setIsNewSessionModalOpen] = useState<boolean>(false);

  // Mobile View Simulator State (for Map requirement: "لا تظهر بعد نشر التطبيق إلا على الموبايل")
  const [isMobilePreview, setIsMobilePreview] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cng_platform_sessions_v1', JSON.stringify(sessions));
    } catch {
      // ignore
    }
  }, [sessions]);

  // Current active session object
  const activeSession = sessions.find(s => s.id === activeSessionId) || null;

  // Handlers
  const handleUpdateSession = (updatedSession: MonitoringSession) => {
    setSessions(prev => prev.map(s => s.id === updatedSession.id ? updatedSession : s));
  };

  const handleCompleteSession = (completedSession: MonitoringSession) => {
    setSessions(prev => prev.map(s => s.id === completedSession.id ? completedSession : s));
    setActiveTab('sessions');
  };

  const handleStartSession = (newSession: MonitoringSession) => {
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    setActiveTab('camera');
  };

  const handleResumeSession = (session: MonitoringSession) => {
    // Set status to active if completed/paused
    const resumed: MonitoringSession = {
      ...session,
      status: 'active',
    };
    handleUpdateSession(resumed);
    setActiveSessionId(session.id);
    setActiveTab('camera');
  };

  const handleDeleteSession = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (activeSessionId === sessionId) {
      const remaining = sessions.filter(s => s.id !== sessionId);
      setActiveSessionId(remaining[0]?.id || null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      
      {/* Platform Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeSession={activeSession}
        onNewSession={() => setIsNewSessionModalOpen(true)}
        isMobilePreview={isMobilePreview}
        setIsMobilePreview={setIsMobilePreview}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 pb-16">
        {activeTab === 'camera' && (
          <CameraMonitoringSession
            session={activeSession}
            onUpdateSession={handleUpdateSession}
            onCompleteSession={handleCompleteSession}
            onStartNewSession={() => setIsNewSessionModalOpen(true)}
          />
        )}

        {activeTab === 'sessions' && (
          <SessionsList
            sessions={sessions}
            onSelectSession={(session) => {
              setActiveSessionId(session.id);
            }}
            onResumeSession={handleResumeSession}
            onDeleteSession={handleDeleteSession}
            onStartNewSession={() => setIsNewSessionModalOpen(true)}
          />
        )}

        {activeTab === 'map' && (
          <MobileOnlyMap
            sessions={sessions}
            stations={stations}
            isMobilePreview={isMobilePreview}
            setIsMobilePreview={setIsMobilePreview}
            onSelectSession={(session) => {
              setActiveSessionId(session.id);
              setActiveTab('sessions');
            }}
          />
        )}

        {activeTab === 'feasibility' && (
          <CngFeasibilityAnalytics 
            sessions={sessions} 
            pricing={settings.pricing}
            feasibilityDefaults={settings.feasibility}
            onNavigateToAdmin={() => setActiveTab('admin')}
            onNavigateToDepartments={() => setActiveTab('departments')}
          />
        )}

        {activeTab === 'departments' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-4">
            {/* Site selector if multiple sessions exist */}
            {sessions.length > 1 && (
              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl flex items-center justify-between gap-4">
                <span className="text-xs font-semibold text-slate-300">اختر الموقع / الجلسة المطلوب مراجعتها من قِبل الإدارات:</span>
                <select
                  value={activeSession?.id || sessions[0].id}
                  onChange={(e) => setActiveSessionId(e.target.value)}
                  className="bg-slate-800 border border-slate-700 text-xs text-white px-3 py-1.5 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  {sessions.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.code} - {s.title} ({s.locationName}، {s.governorate})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {activeSession ? (
              <DepartmentReviewsWorkflow
                session={activeSession}
                onUpdateSession={handleUpdateSession}
                onNavigateToFeasibility={() => setActiveTab('feasibility')}
                onNavigateToAdmin={() => setActiveTab('admin')}
                onNavigateToExecution={() => setActiveTab('execution')}
              />
            ) : (
              <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl">
                <p className="text-slate-400 text-sm">يرجى بدء جلسة رصد أولاً أو اختيار موقع من السجل لمراجعته.</p>
              </div>
            )}
          </div>
        )}

        {/* Execution Stage & Daily Periodic Reporting */}
        {activeTab === 'execution' && (
          <div className="space-y-4">
            {sessions.length > 1 && (
              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl flex items-center justify-between gap-4">
                <span className="text-xs font-semibold text-slate-300">المحطة الجاري متابعة تنفيذها الميداني وتقاريرها:</span>
                <select
                  value={activeSession?.id || sessions[0].id}
                  onChange={(e) => setActiveSessionId(e.target.value)}
                  className="bg-slate-800 border border-slate-700 text-xs text-white px-3 py-1.5 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  {sessions.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.code} - {s.title} ({s.locationName}، {s.governorate})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {activeSession ? (
              <StationExecutionTracker
                session={activeSession}
                onUpdateSession={handleUpdateSession}
                onNavigateToFeasibility={() => setActiveTab('feasibility')}
                onNavigateToDepartments={() => setActiveTab('departments')}
                onNavigateToAdmin={() => setActiveTab('admin')}
              />
            ) : (
              <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl">
                <p className="text-slate-400 text-sm">يرجى اختيار موقع معتمد لمتابعة أعمال التنفيذ والإنشاء.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'calculator' && (
          <ConversionFleetCalculator 
            pricing={settings.pricing}
            onUpdatePricing={handleUpdatePricing}
            onNavigateToAdmin={() => setActiveTab('admin')}
          />
        )}

        {activeTab === 'guide' && (
          <CngTechnicalGuide 
            centers={settings.centers}
            cylinders={settings.cylinders}
            systems={settings.systems}
            onNavigateToAdmin={() => setActiveTab('admin')}
          />
        )}

        {activeTab === 'admin' && (
          <AdminControlPanel
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            sessions={sessions}
            onUpdateSession={handleUpdateSession}
            onDeleteSession={handleDeleteSession}
            onClearSessions={() => {
              setSessions([]);
              setActiveSessionId(null);
            }}
            onRestoreDefaultSessions={() => {
              setSessions(INITIAL_SESSIONS);
              setActiveSessionId(INITIAL_SESSIONS[0]?.id || null);
            }}
            onImportSessions={(newSessions) => {
              setSessions(prev => [...newSessions, ...prev]);
              if (newSessions.length > 0) {
                setActiveSessionId(newSessions[0].id);
              }
            }}
            onSelectSession={(session) => {
              setActiveSessionId(session.id);
              setActiveTab('sessions');
            }}
          />
        )}
      </main>

      {/* New Session Creation Modal */}
      <NewSessionModal
        isOpen={isNewSessionModalOpen}
        onClose={() => setIsNewSessionModalOpen(false)}
        onStartSession={handleStartSession}
      />

      {/* Footer / System status */}
      <footer className="border-t border-slate-800/80 bg-slate-950/90 py-5 px-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CargasNgvLogo size="sm" showText={true} subtitle="الشركة المصرية الدولية لتكنولوجيا الغاز • CARGAS" />
          </div>
          <div className="text-center md:text-left flex flex-col items-center md:items-end gap-1">
            <span className="text-slate-300 font-medium">المنظومة الموحدة لرصد المركبات ودراسة جدوى محطات الغاز الطبيعي</span>
            <span className="font-mono text-[11px] text-slate-500">
              فئات الرصد: ملاكي • أجرة ميكروباص • أجرة تاكسي • سوزوكي فان • بيجو ستيشن
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
