import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Moon, Sun, Smartphone, Maximize2 } from 'lucide-react';

interface OneUIStatusBarProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  frameMode: boolean;
  onToggleFrameMode: () => void;
}

export const OneUIStatusBar: React.FC<OneUIStatusBarProps> = ({
  soundEnabled,
  onToggleSound,
  darkMode,
  onToggleDarkMode,
  frameMode,
  onToggleFrameMode,
}) => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full shrink-0 select-none">
      {/* Galaxy Top Status Bar */}
      <div className="px-6 pt-2 pb-1 flex items-center justify-between text-xs font-medium text-slate-800 dark:text-slate-200">
        <span className="tabular-nums tracking-tight font-semibold text-[13px]">{timeStr || '12:00'}</span>

        {/* Camera cutout aesthetic dot on phone frame */}
        <div className="w-3.5 h-3.5 rounded-full bg-black/80 dark:bg-black/90 mx-auto hidden sm:block shadow-inner ring-1 ring-slate-800/10" />

        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
          {/* Signal bars */}
          <div className="flex items-end gap-0.5 h-3">
            <div className="w-0.5 h-1 bg-current rounded-xs" />
            <div className="w-0.5 h-1.5 bg-current rounded-xs" />
            <div className="w-0.5 h-2 bg-current rounded-xs" />
            <div className="w-0.5 h-2.5 bg-current rounded-xs" />
          </div>
          {/* 5G label */}
          <span className="text-[10px] font-bold tracking-tighter">5G</span>
          {/* WiFi icon */}
          <svg className="w-3.5 h-3.5 ml-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13a10 10 0 0 1 14 0" />
            <path d="M8.5 16.5a5 5 0 0 1 7 0" />
            <path d="M12 20h.01" />
          </svg>
          {/* Battery */}
          <div className="flex items-center ml-1">
            <div className="w-5 h-2.5 border border-current rounded-xs p-0.5 flex items-center">
              <div className="h-full w-4/5 bg-current rounded-xs" />
            </div>
            <div className="w-0.5 h-1 bg-current rounded-r-xs" />
          </div>
        </div>
      </div>

      {/* Subtle Control Bar with Mute, Dark/Light, and View toggle */}
      <div className="px-5 py-1.5 flex items-center justify-between border-b border-slate-100/80 dark:border-slate-800/80">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold tracking-tight text-slate-400 dark:text-slate-500">
            One UI 6.1
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Mute key clicks' : 'Enable key clicks'}
            className="p-1.5 rounded-full text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={soundEnabled ? 'Key Sound On' : 'Key Sound Muted'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onToggleDarkMode}
            aria-label="Toggle dark mode"
            className="p-1.5 rounded-full text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Toggle theme"
          >
            {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onToggleFrameMode}
            aria-label="Toggle frame mode"
            className="p-1.5 rounded-full text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors hidden sm:block"
            title={frameMode ? 'Switch to Full Screen View' : 'Switch to Galaxy Phone Frame'}
          >
            {frameMode ? <Maximize2 className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};
