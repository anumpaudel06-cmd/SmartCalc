import React from 'react';
import { Trash2, X, Clock, ArrowDownLeft } from 'lucide-react';
import { HistoryItem } from '../types';
import { triggerHaptic } from '../utils/hapticsAndSound';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onClearHistory: () => void;
  onSelectEquation: (eq: string) => void;
  onSelectResult: (res: string) => void;
  onCopy: (text: string) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onClearHistory,
  onSelectEquation,
  onSelectResult,
  onCopy,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/40 backdrop-blur-xs select-none animate-in fade-in duration-200">
      {/* Backdrop tap dismiss */}
      <div className="flex-1" onClick={onClose} />

      {/* Slide-up Container */}
      <div className="w-full max-w-[480px] mx-auto bg-white dark:bg-slate-900 rounded-t-3xl shadow-2xl max-h-[82vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-250">
        {/* Grab Handle */}
        <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mt-3 mb-1 shrink-0" />

        {/* Header */}
        <div className="px-6 py-3 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">
              Calculation History
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                onClick={() => {
                  triggerHaptic('medium');
                  onClearHistory();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-full transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear history</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {history.length === 0 ? (
            <div className="py-16 text-center text-slate-400 dark:text-slate-500">
              <Clock className="w-10 h-10 mx-auto stroke-1 mb-2 opacity-50" />
              <p className="text-sm">There is no history</p>
              <p className="text-xs text-slate-400 mt-1">Calculations you perform will appear here</p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/80 hover:border-emerald-200 dark:hover:border-emerald-800/50 transition-all text-right group"
              >
                {/* Equation */}
                <button
                  onClick={() => {
                    triggerHaptic('light');
                    onSelectEquation(item.equation);
                    onClose();
                  }}
                  className="w-full text-right text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 font-normal tracking-tight break-all transition-colors flex items-center justify-end gap-1.5"
                  title="Insert equation"
                >
                  <span>{item.equation}</span>
                  <ArrowDownLeft className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-slate-400 transition-opacity" />
                </button>

                {/* Result */}
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>

                  <button
                    onClick={() => {
                      triggerHaptic('light');
                      onSelectResult(item.result);
                      onClose();
                    }}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      onCopy(item.result);
                    }}
                    className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                    title="Insert result (Right click to copy)"
                  >
                    = {item.result}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
