import React, { useEffect, useRef, useState } from 'react';
import { 
  Smartphone, 
  MapPin, 
  Flame, 
  Layers, 
  Car, 
  Compass, 
  ExternalLink, 
  Info, 
  ShieldCheck, 
  CheckCircle2,
  Navigation
} from 'lucide-react';
import L from 'leaflet';
import { MonitoringSession, CNGStation, VEHICLE_TYPES } from '../types';
import { CargasNgvLogo } from './CargasNgvLogo';

interface MobileOnlyMapProps {
  sessions: MonitoringSession[];
  stations: CNGStation[];
  isMobilePreview: boolean;
  setIsMobilePreview: (val: boolean | ((prev: boolean) => boolean)) => void;
  onSelectSession?: (session: MonitoringSession) => void;
}

export const MobileOnlyMap: React.FC<MobileOnlyMapProps> = ({
  sessions,
  stations,
  isMobilePreview,
  setIsMobilePreview,
  onSelectSession,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Detect real mobile screen width or touch device
  const [isRealMobile, setIsRealMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const isSmallScreen = window.innerWidth <= 768;
    const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    return isSmallScreen || isMobileUA;
  });

  const [filterType, setFilterType] = useState<'all' | 'sessions' | 'stations'>('all');
  const [selectedItem, setSelectedItem] = useState<{
    type: 'session' | 'station';
    data: MonitoringSession | CNGStation;
  } | null>(null);

  // Resize listener
  useEffect(() => {
    const checkMobile = () => {
      const isSmall = window.innerWidth <= 768;
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsRealMobile(isSmall || isMobileUA);
    };

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Is map allowed to display? (Mobile device OR user toggled mobile simulator)
  const isMapVisible = isRealMobile || isMobilePreview;

  // Initialize and update Leaflet Map
  useEffect(() => {
    if (!isMapVisible || !mapContainerRef.current) return;

    // Destroy existing map instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Default center: Greater Cairo (30.0444, 31.2357)
    const map = L.map(mapContainerRef.current, {
      zoomControl: true,
      attributionControl: false,
    }).setView([30.0444, 31.2357], 11);

    mapInstanceRef.current = map;

    // Base CartoDB Dark Matter / Voyager Map Tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map);

    // Custom Icon helper
    const createMarkerIcon = (color: string, label: string, isStation = false) => {
      return L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="
            background: ${color};
            color: #ffffff;
            width: 34px;
            height: 34px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 11px;
            border: 2.5px solid #ffffff;
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            cursor: pointer;
            transform: translate(-50%, -50%);
          ">
            ${isStation ? '⛽' : label}
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });
    };

    // Plot Sessions
    if (filterType === 'all' || filterType === 'sessions') {
      sessions.forEach((s) => {
        const total = Object.values(s.counts).reduce((a, b) => a + b, 0);
        const marker = L.marker([s.coordinates.lat, s.coordinates.lng], {
          icon: createMarkerIcon('#3b82f6', `${total}`),
        }).addTo(map);

        marker.on('click', () => {
          setSelectedItem({ type: 'session', data: s });
        });
      });
    }

    // Plot CNG Stations
    if (filterType === 'all' || filterType === 'stations') {
      stations.forEach((st) => {
        const marker = L.marker([st.lat, st.lng], {
          icon: createMarkerIcon('#10b981', '⛽', true),
        }).addTo(map);

        marker.on('click', () => {
          setSelectedItem({ type: 'station', data: st });
        });
      });
    }

    // Handle map resize on container update
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isMapVisible, filterType, sessions, stations]);

  // If Not on Mobile and Mobile Preview is Disabled -> Show Mobile Restriction Notice
  if (!isMapVisible) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden backdrop-blur-md">
          
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-700 inline-block shadow-lg">
              <CargasNgvLogo size="lg" layout="vertical" subtitle="الخريطة الميدانية لمنظومة كارجاس NGV" />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-4 border border-amber-500/40">
            <ShieldCheck className="w-4 h-4" />
            <span>خاصية النشر المشروط: خريطة مقصورة على الموبايل</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
            الخريطة الميدانية التفاعلية مخصصة للعرض على شاشات الموبايل فقط
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            تم تطبيق التعديل المطلوب: <strong className="text-emerald-400">الخرائط لا تظهر بعد نشر التطبيق إلا على أجهزة الموبايل الميدانية</strong> الخاصة بفرق المسح المروري لتوفير استهلاك البيانات وتسهيل التوجيه بالـ GPS أثناء الرصد الميداني.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="btn-simulate-mobile-map"
              onClick={() => setIsMobilePreview(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
            >
              <Smartphone className="w-5 h-5" />
              <span>معاينة الخريطة في وضع محاكي شاشة الموبايل</span>
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-700/60 flex items-center justify-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              تم التحقق من نوع الجهاز والـ Viewport تلقائياً
            </span>
          </div>

        </div>
      </div>
    );
  }

  // Mobile View Render (or Simulated Mobile Container)
  return (
    <div className={`max-w-md sm:max-w-xl mx-auto px-2 sm:px-4 py-3 space-y-3 ${
      !isRealMobile && isMobilePreview ? 'p-4 rounded-3xl bg-slate-950 border-4 border-slate-700 shadow-2xl my-4' : ''
    }`}>
      
      {/* Mobile Simulator Notice Banner (if enabled on desktop) */}
      {!isRealMobile && isMobilePreview && (
        <div className="bg-amber-500/20 border border-amber-500/40 rounded-xl p-2.5 flex items-center justify-between text-xs text-amber-200">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-amber-400" />
            <span>عرض محاكي شاشة الموبايل نشط (الخريطة الميدانية)</span>
          </div>
          <button
            onClick={() => setIsMobilePreview(false)}
            className="text-amber-300 hover:text-white underline font-semibold"
          >
            إغلاق
          </button>
        </div>
      )}

      {/* Filter and Stats Header */}
      <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-3 shadow-lg flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <CargasNgvLogo size="sm" showText={false} />
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>خريطة رصد ومحطات كارجاس</span>
              <span className="text-[10px] text-amber-400 font-mono">NGV</span>
            </h3>
            <p className="text-[11px] text-slate-400">
              {sessions.length} جلسة رصد • {stations.length} محطة غاز
            </p>
          </div>
        </div>

        {/* Layer Filters */}
        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-700 text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`px-2 py-1 rounded-lg font-medium transition-all ${
              filterType === 'all' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            الكل
          </button>
          <button
            onClick={() => setFilterType('sessions')}
            className={`px-2 py-1 rounded-lg font-medium transition-all ${
              filterType === 'sessions' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            الجلسات
          </button>
          <button
            onClick={() => setFilterType('stations')}
            className={`px-2 py-1 rounded-lg font-medium transition-all ${
              filterType === 'stations' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            المحطات
          </button>
        </div>
      </div>

      {/* Interactive Map Canvas */}
      <div className="relative h-[440px] sm:h-[500px] w-full rounded-2xl overflow-hidden border border-slate-700 shadow-xl">
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Floating Legend */}
        <div className="absolute top-3 right-3 z-[400] bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-2.5 text-[11px] text-slate-300 space-y-1.5 shadow-lg">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500 border border-white"></span>
            <span>نقاط جلسات الرصد (عدد السيارات)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 border border-white"></span>
            <span>محطات الغاز الطبيعي (CNG)</span>
          </div>
        </div>

        {/* Selected Item Drawer Card */}
        {selectedItem && (
          <div className="absolute bottom-3 inset-x-3 z-[400] bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-2xl p-4 shadow-2xl animate-fade-in text-slate-100">
            {selectedItem.type === 'session' ? (
              // Session Detail
              <div>
                {(() => {
                  const s = selectedItem.data as MonitoringSession;
                  const total = Object.values(s.counts).reduce((a, b) => a + b, 0);
                  return (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          {s.code}
                        </span>
                        <button
                          onClick={() => setSelectedItem(null)}
                          className="text-xs text-slate-400 hover:text-white"
                        >
                          ✕ إغلاق
                        </button>
                      </div>
                      <h4 className="font-bold text-white text-sm mb-1">{s.title}</h4>
                      <p className="text-xs text-slate-300 flex items-center gap-1 mb-3">
                        <MapPin className="w-3 h-3 text-rose-400" />
                        {s.locationName} ({s.governorate})
                      </p>

                      {/* Vehicle Counts Breakdown */}
                      <div className="grid grid-cols-5 gap-1.5 text-center mb-3">
                        <div className="bg-slate-800/80 p-1.5 rounded-lg border border-slate-700">
                          <span className="text-[10px] text-slate-400 block">ملاكي</span>
                          <span className="text-xs font-bold text-blue-400 font-mono">{s.counts.private}</span>
                        </div>
                        <div className="bg-slate-800/80 p-1.5 rounded-lg border border-slate-700">
                          <span className="text-[10px] text-slate-400 block">ميكروباص</span>
                          <span className="text-xs font-bold text-emerald-400 font-mono">{s.counts.microbus}</span>
                        </div>
                        <div className="bg-slate-800/80 p-1.5 rounded-lg border border-slate-700">
                          <span className="text-[10px] text-slate-400 block">تاكسي</span>
                          <span className="text-xs font-bold text-amber-400 font-mono">{s.counts.taxi}</span>
                        </div>
                        <div className="bg-slate-800/80 p-1.5 rounded-lg border border-slate-700">
                          <span className="text-[10px] text-slate-400 block">سوزوكي</span>
                          <span className="text-xs font-bold text-purple-400 font-mono">{s.counts.suzuki_van}</span>
                        </div>
                        <div className="bg-slate-800/80 p-1.5 rounded-lg border border-slate-700">
                          <span className="text-[10px] text-slate-400 block">بيجو ستيشن</span>
                          <span className="text-xs font-bold text-rose-400 font-mono">{s.counts.peugeot_station}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                        <span>إجمالي المرصود: <strong className="text-white">{total} مركبة</strong></span>
                        {onSelectSession && (
                          <button
                            onClick={() => onSelectSession(s)}
                            className="text-emerald-400 hover:text-emerald-300 font-semibold"
                          >
                            عرض تفاصيل الجلسة ←
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>
            ) : (
              // CNG Station Detail
              <div>
                {(() => {
                  const st = selectedItem.data as CNGStation;
                  return (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {st.company}
                        </span>
                        <button
                          onClick={() => setSelectedItem(null)}
                          className="text-xs text-slate-400 hover:text-white"
                        >
                          ✕ إغلاق
                        </button>
                      </div>
                      <h4 className="font-bold text-white text-sm mb-1">{st.name}</h4>
                      <p className="text-xs text-slate-300 flex items-center gap-1 mb-2">
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        {st.address} ({st.city} - {st.governorate})
                      </p>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                        <span>موزعات الغاز: <strong className="text-white">{st.dispenserCount} نقاط شحن</strong></span>
                        <span>مركز تحويل سيارات: <strong className={st.hasConversionCenter ? "text-emerald-400" : "text-slate-500"}>{st.hasConversionCenter ? "متوفر بالمحطة" : "غير متوفر"}</strong></span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
