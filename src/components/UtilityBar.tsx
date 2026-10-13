import React, { useRef } from 'react';
import { History, Ruler, CircleDollarSign, Delete } from 'lucide-react';
import { AppTab } from '../types';
import { triggerHaptic } from '../utils/hapticsAndSound';

interface UtilityBarProps {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  onOpenHistory: () => void;
  onBackspace: () => void;
  onClearAll: () => void;
  hasInput: boolean;
}

export const UtilityBar: React.FC<UtilityBarProps> = ({
  currentTab,
  onSelectTab,
  onOpenHistory,
  onBackspace,
  onClearAll,
  hasInput,
}) => {
  const backspaceTimerRef = useRef<number | null>(null);

  const handleBackspaceDown = () => {
    triggerHaptic('light');
    onBackspace();

    // If held for more than 450ms, clear everything with haptic feedback
    backspaceTimerRef.current = window.setTimeout(() => {
      triggerHaptic('medium');
      onClearAll();
      backspaceTimerRef.current = null;
    }, 450);
  };

  const handleBackspaceUp = () => {
    if (backspaceTimerRef.current) {
      clearTimeout(backspaceTimerRef.current);
      backspaceTimerRef.current = null;
    }
  };

  return (
    <div className="w-full px-5 py-2.5 flex items-center justify-between border-t border-b border-slate-100 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/40 select-none">
      <div className="flex items-center gap-1 sm:gap-2">
        {/* History Icon */}
        <button
          onClick={() => {
            triggerHaptic('light');
            onOpenHistory();
          }}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-90 transition-all duration-150"
          title="History"
          aria-label="History"
        >
          <History className="w-5 h-5 stroke-[1.8]" />
        </button>

        {/* Ruler Icon - Unit Converter */}
        <button
          onClick={() => {
            triggerHaptic('light');
            onSelectTab(currentTab === 'units' ? 'calculator' : 'units');
          }}
          className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full active:scale-90 transition-all duration-150 ${
            currentTab === 'units'
              ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 ring-1 ring-emerald-200 dark:ring-emerald-800'
              : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          title="Unit Converter"
          aria-label="Unit Converter"
        >
          <Ruler className="w-5 h-5 stroke-[1.8]" />
        </button>

        {/* Currency Converter (Tools / Global Currency icon) */}
        <button
          onClick={() => {
            triggerHaptic('light');
            onSelectTab(currentTab === 'currency' ? 'calculator' : 'currency');
          }}
          className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full active:scale-90 transition-all duration-150 ${
            currentTab === 'currency'
              ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 ring-1 ring-emerald-200 dark:ring-emerald-800'
              : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          title="Live Currency Converter"
          aria-label="Currency Converter"
        >
          <CircleDollarSign className="w-5 h-5 stroke-[1.8]" />
        </button>
      </div>

      {/* Backspace Icon on the right side */}
      <button
        onPointerDown={handleBackspaceDown}
        onPointerUp={handleBackspaceUp}
        onPointerLeave={handleBackspaceUp}
        disabled={!hasInput}
        className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full active:scale-90 transition-all duration-150 ${
          hasInput
            ? 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
            : 'text-slate-300 dark:text-slate-700 opacity-60 cursor-not-allowed'
        }`}
        title="Backspace (Hold to clear)"
        aria-label="Backspace"
      >
        <Delete className="w-5 h-5 stroke-[1.8]" />
      </button>
    </div>
  );
};
