import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Share2, 
  Camera, 
  Building2, 
  Flame, 
  Wrench, 
  Cpu, 
  FileCheck, 
  Scale, 
  BadgeDollarSign, 
  ArrowLeft, 
  Lock, 
  Send, 
  Smartphone, 
  CheckCircle2, 
  Sparkles,
  Info,
  Layers,
  ChevronLeft,
  PhoneCall
} from 'lucide-react';
import { DepartmentRole } from '../types';
import { DEPARTMENTS_METADATA } from '../data/departmentCustomFields';
import { CargasNgvLogo } from './CargasNgvLogo';

interface DepartmentPortalLandingProps {
  onSelectRole: (role: DepartmentRole) => void;
  onOpenMarketingDispatcher: () => void;
  onOpenFieldSurveyorDirect: () => void;
}

export const DepartmentPortalLanding: React.FC<DepartmentPortalLandingProps> = ({
  onSelectRole,
  onOpenMarketingDispatcher,
  onOpenFieldSurveyorDirect,
}) => {
  const [hoveredRole, setHoveredRole] = useState<DepartmentRole | null>(null);

  const getRoleIcon = (role: DepartmentRole) => {
    switch (role) {
      case 'admin':
        return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
      case 'marketing':
        return <Share2 className="w-6 h-6 text-indigo-400" />;
      case 'surveyor':
        return <Camera className="w-6 h-6 text-sky-400" />;
      case 'projects':
        return <Building2 className="w-6 h-6 text-blue-400" />;
      case 'hse':
        return <Flame className="w-6 h-6 text-emerald-400" />;
      case 'operations':
        return <Wrench className="w-6 h-6 text-amber-400" />;
      case 'technical':
        return <Cpu className="w-6 h-6 text-teal-400" />;
      case 'licensing':
        return <FileCheck className="w-6 h-6 text-orange-400" />;
      case 'legal':
        return <Scale className="w-6 h-6 text-purple-400" />;
      case 'financial':
        return <BadgeDollarSign className="w-6 h-6 text-cyan-400" />;
      default:
        return <Building2 className="w-6 h-6 text-slate-400" />;
    }
  };

  const rolesList: DepartmentRole[] = [
    'admin',
    'marketing',
    'operations',
    'projects',
    'hse',
    'technical',
    'licensing',
    'legal',
    'financial',
    'surveyor'
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-6 sm:p-10 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center md:text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>بوابة الدخول الموحدة لإدارات كارجاس • CARGAS NGV Unified Portal</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                منظومة إدارة مشروعات ومحطات الغاز الطبيعي
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
                لكل إدارة بيئة عمل مستقلة تظهر لها فقط المهام، الحقول، والمعدات التي تخصها دون غيرها، مع تجمع كافة البيانات والتقارير التنفيذية تحت مظلة <span className="text-emerald-400 font-bold">إدارة النظام</span>.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <button
                id="btn-portal-whatsapp-dispatch"
                onClick={onOpenMarketingDispatcher}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>إرسال رابط المعاينة بالواتساب</span>
              </button>

              <button
                id="btn-portal-surveyor-direct"
                onClick={onOpenFieldSurveyorDirect}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-700 transition-all cursor-pointer"
              >
                <Camera className="w-4 h-4 text-sky-400" />
                <span>شاشة المعاين الميداني</span>
              </button>
            </div>
          </div>

          {/* Department Isolation Banner */}
          <div className="mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><strong>عزل الصلاحيات:</strong> يرى كل مستخدم ما يخص إدارته فقط</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400 shrink-0" />
              <span><strong>ضبط النماذج:</strong> لا تعديل للفورم إلا عبر مخاطبة مدير النظام</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400 shrink-0" />
              <span><strong>تقارير موحدة:</strong> تصب مخرجات الإدارات في لوحة تحكم الإدارة العامة</span>
            </div>
          </div>
        </div>

        {/* Departments Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>أقسام وإدارات المنظومة</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                10 بوابات متخصصة
              </span>
            </h2>
            <span className="text-xs text-slate-400 hidden sm:inline">
              انقر على الإدارة للدخول المباشر إلى شاشتها الخاصة
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rolesList.map((role) => {
              const meta = DEPARTMENTS_METADATA[role];
              const isHovered = hoveredRole === role;
              const isAdmin = role === 'admin';
              const isOps = role === 'operations';
              const isMarketing = role === 'marketing';
              const isSurveyor = role === 'surveyor';

              return (
                <div
                  key={role}
                  id={`card-dept-${role}`}
                  onMouseEnter={() => setHoveredRole(role)}
                  onMouseLeave={() => setHoveredRole(null)}
                  onClick={() => onSelectRole(role)}
                  className={`relative group rounded-2xl border transition-all duration-300 p-5 cursor-pointer flex flex-col justify-between overflow-hidden ${
                    isAdmin
                      ? 'bg-gradient-to-b from-emerald-950/40 via-slate-900 to-slate-900 border-emerald-500/40 hover:border-emerald-400 shadow-lg shadow-emerald-950/30'
                      : isOps
                      ? 'bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-900 border-amber-500/40 hover:border-amber-400 shadow-lg shadow-amber-950/30'
                      : isMarketing
                      ? 'bg-gradient-to-b from-indigo-950/40 via-slate-900 to-slate-900 border-indigo-500/40 hover:border-indigo-400'
                      : isSurveyor
                      ? 'bg-gradient-to-b from-sky-950/40 via-slate-900 to-slate-900 border-sky-500/40 hover:border-sky-400'
                      : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Card Top: Icon & Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 transition-transform group-hover:scale-105 ${
                        isAdmin ? 'bg-emerald-500/20 border-emerald-500/40' :
                        isOps ? 'bg-amber-500/20 border-amber-500/40' :
                        isMarketing ? 'bg-indigo-500/20 border-indigo-500/40' :
                        isSurveyor ? 'bg-sky-500/20 border-sky-500/40' :
                        'bg-slate-800 border-slate-700'
                      }`}>
                        {getRoleIcon(role)}
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                          isAdmin ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
                          isOps ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                          isMarketing ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' :
                          isSurveyor ? 'bg-sky-500/20 text-sky-300 border-sky-500/40' :
                          'bg-slate-800 text-slate-300 border-slate-700'
                        }`}>
                          {meta.badge}
                        </span>

                        {isOps && (
                          <span className="text-[10px] text-amber-400 font-medium">
                            مسؤولة عن المعدات والآلات
                          </span>
                        )}
                        {isMarketing && (
                          <span className="text-[10px] text-indigo-300 font-medium">
                            إرسال الروابط بالواتساب
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Department Title & Subtitle */}
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                        <span>{meta.title}</span>
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                        {meta.subtitle}
                      </p>
                    </div>

                    {/* Scope Highlight */}
                    <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
                      <span className="text-slate-400 block text-[11px] mb-1 font-semibold">
                        نطاق العمل المستقل:
                      </span>
                      <p className="text-slate-300 leading-snug">
                        {meta.primaryScope}
                      </p>
                    </div>

                    {/* Key Responsibilities Bullet List */}
                    <ul className="space-y-1 text-xs text-slate-400 pt-1">
                      {meta.keyResponsibilities.slice(0, 2).map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 line-clamp-1">
                          <span className="text-slate-600 mt-1">•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium group-hover:text-white transition-colors">
                      دخول الإدارة
                    </span>
                    <div className="flex items-center gap-1 text-emerald-400 font-bold group-hover:translate-x-[-4px] transition-transform">
                      <span>فتح الشاشة</span>
                      <ChevronLeft className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
