import React from 'react';

interface CargasNgvLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  layout?: 'horizontal' | 'vertical';
  subtitle?: string;
  lightBackground?: boolean;
}

export const CargasNgvLogo: React.FC<CargasNgvLogoProps> = ({
  className = '',
  showText = true,
  size = 'md',
  layout = 'horizontal',
  subtitle = 'الغاز الطبيعي للسيارات • CARGAS',
  lightBackground = false
}) => {
  const sizeClasses = {
    xs: 'w-7 h-7',
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const textSizes = {
    xs: { title: 'text-xs', ngv: 'text-xs', sub: 'text-[9px]' },
    sm: { title: 'text-sm', ngv: 'text-xs', sub: 'text-[10px]' },
    md: { title: 'text-base sm:text-lg', ngv: 'text-sm sm:text-base', sub: 'text-[10px] sm:text-xs' },
    lg: { title: 'text-lg sm:text-xl', ngv: 'text-base sm:text-lg', sub: 'text-xs' },
    xl: { title: 'text-2xl sm:text-3xl', ngv: 'text-xl sm:text-2xl', sub: 'text-sm' }
  };

  const isVertical = layout === 'vertical';

  return (
    <div className={`flex ${isVertical ? 'flex-col items-center text-center' : 'items-center text-right'} gap-2.5 ${className}`}>
      <div className={`${sizeClasses[size]} shrink-0 relative flex items-center justify-center`}>
        <img
          src="/cargas_ngv_logo.svg"
          alt="كارجاس NGV - الغاز الطبيعي للمركبات"
          className="w-full h-full object-contain filter drop-shadow-md hover:scale-105 transition-transform duration-200"
        />
      </div>
      {showText && (
        <div className={`flex flex-col ${isVertical ? 'items-center' : 'items-start'}`}>
          <div className="flex items-center gap-1.5 leading-tight">
            <span className={`font-black tracking-wide ${lightBackground ? 'text-slate-900' : 'text-white'} ${textSizes[size].title}`}>
              كارجاس
            </span>
            <span className={`font-mono font-black text-amber-400 ${textSizes[size].ngv}`}>
              NGV
            </span>
          </div>
          {subtitle && (
            <span className={`font-semibold leading-tight ${lightBackground ? 'text-emerald-700' : 'text-emerald-400'} ${textSizes[size].sub}`}>
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
