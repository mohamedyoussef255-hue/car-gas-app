import React from 'react';
import { Camera, MapPin, BarChart3, History, PlusCircle, Smartphone, Flame, Radio, Calculator, BookOpen, Sliders, Building2, HardHat } from 'lucide-react';
import { MonitoringSession } from '../types';
import { CargasNgvLogo } from './CargasNgvLogo';

export type ActiveTabType = 'camera' | 'sessions' | 'map' | 'feasibility' | 'departments' | 'execution' | 'calculator' | 'guide' | 'admin';

interface HeaderProps {
  activeTab: ActiveTabType;
  setActiveTab: (tab: ActiveTabType) => void;
  activeSession: MonitoringSession | null;
  onNewSession: () => void;
  isMobilePreview: boolean;
  setIsMobilePreview: (val: boolean | ((prev: boolean) => boolean)) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  activeSession,
  onNewSession,
  isMobilePreview,
  setIsMobilePreview,
}) => {
  return (
    <header className="bg-slate-900/95 border-b border-slate-800 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo and Brand with Official Cargas NGV emblem */}
          <div className="flex items-center gap-3">
            <CargasNgvLogo size="lg" showText={false} />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-white tracking-wide flex items-center gap-2">
                  <span>منظومة كارجاس الموحدة للغاز الطبيعي</span>
                  <span className="text-amber-400 font-mono font-bold text-sm sm:text-base">CARGAS NGV</span>
                </h1>
                <span className="hidden lg:inline-block px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
                  All-in-One CNG Platform
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                منصة متكاملة: رصد وتصنيف السيارات بالكاميرا • دراسة الجدوى الاقتصادية • حاسبة الوفر ومبادرة التحويل
              </p>
            </div>
          </div>

          {/* Active Session Live Badge (if any) */}
          {activeSession && (
            <div className="hidden xl:flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-300 font-medium truncate max-w-[180px]">
                جلسة نشطة: {activeSession.title}
              </span>
              <span className="text-slate-400 font-mono">
                ({Object.values(activeSession.counts).reduce((a, b) => a + b, 0)} مركبة)
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Mobile Map Simulator Toggle */}
            <button
              id="btn-toggle-mobile-mode"
              onClick={() => setIsMobilePreview(prev => !prev)}
              title="محاكي عرض شاشة الموبايل للخرائط"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                isMobilePreview
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm shadow-amber-500/10'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden md:inline">
                {isMobilePreview ? 'وضع الموبايل نشط' : 'محاكي الموبايل'}
              </span>
            </button>

            {/* Start New Session */}
            <button
              id="btn-header-new-session"
              onClick={onNewSession}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold transition-colors shadow-md shadow-emerald-600/20 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>جلسة رصد جديدة</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs - Comprehensive all 6 sections */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 border-t border-slate-800/80 no-scrollbar">
          <button
            id="tab-camera"
            onClick={() => setActiveTab('camera')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'camera'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Camera className="w-4 h-4 text-emerald-400" />
            <span>كاميرا الرصد المباشر</span>
            {activeSession && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            )}
          </button>

          <button
            id="tab-sessions"
            onClick={() => setActiveTab('sessions')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'sessions'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <History className="w-4 h-4 text-blue-400" />
            <span>سجل الجلسات الميدانية</span>
          </button>

          <button
            id="tab-feasibility"
            onClick={() => setActiveTab('feasibility')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'feasibility'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-purple-400" />
            <span>دراسة الجدوى ومحطات الغاز</span>
          </button>

          <button
            id="tab-departments"
            onClick={() => setActiveTab('departments')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'departments'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Building2 className="w-4 h-4 text-blue-400" />
            <span>مراجعة واعتماد الإدارات</span>
            <span className="px-1.5 py-0.2 text-[10px] bg-blue-500/20 text-blue-300 rounded border border-blue-500/30">
              5 إدارات
            </span>
          </button>

          <button
            id="tab-execution"
            onClick={() => setActiveTab('execution')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'execution'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <HardHat className="w-4 h-4 text-amber-400" />
            <span>تنفيذ المحطة والتقارير اليومية</span>
            <span className="px-1.5 py-0.2 text-[10px] bg-amber-500/20 text-amber-300 rounded border border-amber-500/30 font-bold">
              الميداني
            </span>
          </button>

          <button
            id="tab-calculator"
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'calculator'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Calculator className="w-4 h-4 text-amber-400" />
            <span>حاسبة الوفر والتقسيط للأساطيل</span>
          </button>

          <button
            id="tab-guide"
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'guide'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BookOpen className="w-4 h-4 text-teal-400" />
            <span>الدليل الفني ومراكز كارجاس</span>
          </button>

          <button
            id="tab-map"
            onClick={() => setActiveTab('map')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'map'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <MapPin className="w-4 h-4 text-rose-400" />
            <span>الخريطة الميدانية</span>
            <span className="px-1.5 py-0.2 text-[10px] bg-slate-800 text-amber-400 rounded border border-amber-500/30">
              موبايل
            </span>
          </button>

          <button
            id="tab-admin"
            onClick={() => setActiveTab('admin')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'admin'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                : 'text-slate-400 hover:text-amber-300 hover:bg-slate-800/50'
            }`}
          >
            <Sliders className="w-4 h-4 text-amber-400" />
            <span>لوحة التحكم والاستعلامات</span>
            <span className="px-1.5 py-0.5 text-[10px] bg-amber-500/20 text-amber-300 rounded border border-amber-500/40 font-bold">
              إدارة شاملة
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
};
