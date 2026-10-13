import React from 'react';

interface PhoneContainerProps {
  children: React.ReactNode;
  darkMode: boolean;
  frameMode: boolean;
}

export const PhoneContainer: React.FC<PhoneContainerProps> = ({
  children,
  darkMode,
  frameMode,
}) => {
  if (!frameMode) {
    return (
      <div className={`min-h-screen w-full flex flex-col justify-between ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-white text-slate-900'}`}>
        <div className="w-full max-w-lg mx-auto flex-1 flex flex-col bg-white dark:bg-slate-900 shadow-xl relative min-h-screen">
          {children}
          {/* Bottom One UI navigation bar */}
          <div className="w-full py-2 shrink-0 flex items-center justify-center bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            <div className="w-32 h-1 bg-slate-300 dark:bg-slate-600 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-0 sm:p-6 md:p-8 bg-slate-100 dark:bg-slate-950 transition-colors duration-200 select-none ${darkMode ? 'dark' : ''}`}>
      {/* Galaxy Device Chassis */}
      <div className="w-full max-w-[430px] h-[100dvh] sm:h-[844px] flex flex-col justify-between bg-white dark:bg-slate-900 sm:rounded-[44px] sm:ring-[10px] sm:ring-slate-800/90 sm:shadow-2xl relative overflow-hidden transition-all duration-200">
        
        {/* Screen Content */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {children}
        </div>

        {/* Bottom One UI gesture bar */}
        <div className="w-full py-2.5 shrink-0 flex items-center justify-center bg-white dark:bg-slate-900">
          <div className="w-28 h-1 bg-slate-300 dark:bg-slate-600 rounded-full" />
        </div>
      </div>
    </div>
  );
};
