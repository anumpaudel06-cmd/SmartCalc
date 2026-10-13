import React from 'react';

interface CopyToastProps {
  message: string;
  isVisible: boolean;
}

export const CopyToast: React.FC<CopyToastProps> = ({ message, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 animate-in fade-in slide-in-from-bottom-3">
      <div className="bg-slate-900/90 dark:bg-white/90 text-white dark:text-slate-900 backdrop-blur-md px-5 py-2.5 rounded-full text-xs font-medium shadow-xl flex items-center gap-2">
        <svg className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
        <span>{message}</span>
      </div>
    </div>
  );
};
