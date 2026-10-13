import React, { useRef } from 'react';
import { triggerHaptic } from '../utils/hapticsAndSound';

interface CalculatorDisplayProps {
  expression: string;
  result: string;
  preview: string;
  isEvaluated: boolean;
  onCopy: (text: string) => void;
}

export const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({
  expression,
  result,
  preview,
  isEvaluated,
  onCopy,
}) => {
  const longPressTimerRef = useRef<number | null>(null);

  const handlePointerDown = (textToCopy: string) => {
    if (!textToCopy) return;
    longPressTimerRef.current = window.setTimeout(() => {
      triggerHaptic('success');
      onCopy(textToCopy);
      longPressTimerRef.current = null;
    }, 550);
  };

  const handlePointerUpOrLeave = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  // Determine dynamic font size based on expression length
  const getExpressionFontSize = (len: number) => {
    if (len > 24) return 'text-xl sm:text-2xl';
    if (len > 16) return 'text-2xl sm:text-3xl';
    if (len > 10) return 'text-3xl sm:text-4xl';
    return 'text-4xl sm:text-5xl';
  };

  // Syntax highlighting for Samsung One UI: operators in distinctive green, numbers in crisp text
  const renderFormattedExpression = (expr: string) => {
    if (!expr) return <span>0</span>;

    const tokens = expr.split(/([×÷\+\-\%\(\)])/g);
    return tokens.map((tok, idx) => {
      if (['×', '÷', '+', '-', '%'].includes(tok)) {
        return (
          <span key={idx} className="text-emerald-600 dark:text-emerald-400 font-normal mx-0.5">
            {tok}
          </span>
        );
      }
      if (['(', ')'].includes(tok)) {
        return (
          <span key={idx} className="text-slate-400 dark:text-slate-500 font-normal">
            {tok}
          </span>
        );
      }
      return (
        <span key={idx} className="text-slate-900 dark:text-white font-normal">
          {tok}
        </span>
      );
    });
  };

  const textToCopy = isEvaluated ? result : (preview || expression || '0');

  return (
    <div
      className="flex-1 min-h-[160px] px-6 py-4 flex flex-col justify-end items-end select-none cursor-pointer active:opacity-90 transition-opacity"
      onPointerDown={() => handlePointerDown(textToCopy)}
      onPointerUp={handlePointerUpOrLeave}
      onPointerLeave={handlePointerUpOrLeave}
      onContextMenu={(e) => {
        e.preventDefault();
        onCopy(textToCopy);
      }}
      title="Long press or right-click to copy"
    >
      {/* Top Main Formula / Equation */}
      <div className="w-full text-right overflow-x-auto overflow-y-hidden no-scrollbar whitespace-nowrap scroll-smooth">
        <div
          className={`font-normal tracking-tight transition-all duration-150 tabular-nums ${getExpressionFontSize(
            expression.length
          )}`}
        >
          {renderFormattedExpression(expression || '0')}
        </div>
      </div>

      {/* Result Row or Live Preview Row below */}
      <div className="h-10 mt-1 flex items-center justify-end w-full overflow-hidden">
        {isEvaluated && result ? (
          <div className="text-3xl sm:text-4xl font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums tracking-tight animate-in fade-in zoom-in-95 duration-150">
            {result}
          </div>
        ) : preview ? (
          <div className="text-2xl sm:text-3xl font-light text-slate-400 dark:text-slate-500 tabular-nums tracking-tight animate-in fade-in duration-150">
            {preview}
          </div>
        ) : (
          <div className="text-xs text-transparent">·</div>
        )}
      </div>

      {/* Tiny hint on long press */}
      <div className="text-[10px] text-slate-300 dark:text-slate-600 mt-0.5 font-medium tracking-wider uppercase">
        Hold to copy
      </div>
    </div>
  );
};
