import React from 'react';
import { triggerHaptic, playSamsungClickSound } from '../utils/hapticsAndSound';

interface CalculatorKeypadProps {
  onDigit: (digit: string) => void;
  onOperator: (op: string) => void;
  onClear: () => void;
  onToggleSign: () => void;
  onParentheses: () => void;
  onPercentage: () => void;
  onDecimal: () => void;
  onEquals: () => void;
  soundEnabled: boolean;
}

export const CalculatorKeypad: React.FC<CalculatorKeypadProps> = ({
  onDigit,
  onOperator,
  onClear,
  onToggleSign,
  onParentheses,
  onPercentage,
  onDecimal,
  onEquals,
  soundEnabled,
}) => {
  const handlePress = (callback: () => void, hapticType: 'light' | 'medium' | 'success' = 'light') => {
    triggerHaptic(hapticType);
    playSamsungClickSound(soundEnabled);
    callback();
  };

  // Base circular button styles for Samsung One UI
  const baseBtnStyle =
    'relative aspect-square w-full rounded-full flex items-center justify-center font-normal text-2xl sm:text-3xl transition-all duration-100 active:scale-95 select-none focus:outline-none';

  return (
    <div className="w-full p-4 sm:p-5 select-none">
      <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-[420px] mx-auto">
        {/* ROW 1 */}
        {/* C (Clear) - Red/Orange */}
        <button
          onClick={() => handlePress(onClear, 'medium')}
          className={`${baseBtnStyle} bg-rose-50 text-rose-600 hover:bg-rose-100 active:bg-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:hover:bg-rose-900/50 font-medium`}
          aria-label="Clear"
        >
          C
        </button>

        {/* ( ) (Parentheses) - Green */}
        <button
          onClick={() => handlePress(onParentheses)}
          className={`${baseBtnStyle} bg-slate-50 text-emerald-600 hover:bg-slate-100 active:bg-slate-200 dark:bg-slate-800/60 dark:text-emerald-400 dark:hover:bg-slate-800`}
          aria-label="Parentheses"
        >
          ( )
        </button>

        {/* % (Percent) - Green */}
        <button
          onClick={() => handlePress(onPercentage)}
          className={`${baseBtnStyle} bg-slate-50 text-emerald-600 hover:bg-slate-100 active:bg-slate-200 dark:bg-slate-800/60 dark:text-emerald-400 dark:hover:bg-slate-800`}
          aria-label="Percent"
        >
          %
        </button>

        {/* ÷ (Divide) - Green */}
        <button
          onClick={() => handlePress(() => onOperator('÷'))}
          className={`${baseBtnStyle} bg-slate-50 text-emerald-600 hover:bg-slate-100 active:bg-slate-200 dark:bg-slate-800/60 dark:text-emerald-400 dark:hover:bg-slate-800 text-3xl`}
          aria-label="Divide"
        >
          ÷
        </button>

        {/* ROW 2 */}
        {/* 7 */}
        <button
          onClick={() => handlePress(() => onDigit('7'))}
          className={`${baseBtnStyle} bg-slate-50 text-slate-800 hover:bg-slate-100 active:bg-slate-200 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:bg-slate-700/80`}
        >
          7
        </button>

        {/* 8 */}
        <button
          onClick={() => handlePress(() => onDigit('8'))}
          className={`${baseBtnStyle} bg-slate-50 text-slate-800 hover:bg-slate-100 active:bg-slate-200 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:bg-slate-700/80`}
        >
          8
        </button>

        {/* 9 */}
        <button
          onClick={() => handlePress(() => onDigit('9'))}
          className={`${baseBtnStyle} bg-slate-50 text-slate-800 hover:bg-slate-100 active:bg-slate-200 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:bg-slate-700/80`}
        >
          9
        </button>

        {/* × (Multiply) - Green */}
        <button
          onClick={() => handlePress(() => onOperator('×'))}
          className={`${baseBtnStyle} bg-slate-50 text-emerald-600 hover:bg-slate-100 active:bg-slate-200 dark:bg-slate-800/60 dark:text-emerald-400 dark:hover:bg-slate-800 text-3xl`}
          aria-label="Multiply"
        >
          ×
        </button>

        {/* ROW 3 */}
        {/* 4 */}
        <button
          onClick={() => handlePress(() => onDigit('4'))}
          className={`${baseBtnStyle} bg-slate-50 text-slate-800 hover:bg-slate-100 active:bg-slate-200 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:bg-slate-700/80`}
        >
          4
        </button>

        {/* 5 */}
        <button
          onClick={() => handlePress(() => onDigit('5'))}
          className={`${baseBtnStyle} bg-slate-50 text-slate-800 hover:bg-slate-100 active:bg-slate-200 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:bg-slate-700/80`}
        >
          5
        </button>

        {/* 6 */}
        <button
          onClick={() => handlePress(() => onDigit('6'))}
          className={`${baseBtnStyle} bg-slate-50 text-slate-800 hover:bg-slate-100 active:bg-slate-200 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:bg-slate-700/80`}
        >
          6
        </button>

        {/* - (Subtract) - Green */}
        <button
          onClick={() => handlePress(() => onOperator('-'))}
          className={`${baseBtnStyle} bg-slate-50 text-emerald-600 hover:bg-slate-100 active:bg-slate-200 dark:bg-slate-800/60 dark:text-emerald-400 dark:hover:bg-slate-800 text-3xl`}
          aria-label="Subtract"
        >
          -
        </button>

        {/* ROW 4 */}
        {/* 1 */}
        <button
          onClick={() => handlePress(() => onDigit('1'))}
          className={`${baseBtnStyle} bg-slate-50 text-slate-800 hover:bg-slate-100 active:bg-slate-200 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:bg-slate-700/80`}
        >
          1
        </button>

        {/* 2 */}
        <button
          onClick={() => handlePress(() => onDigit('2'))}
          className={`${baseBtnStyle} bg-slate-50 text-slate-800 hover:bg-slate-100 active:bg-slate-200 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:bg-slate-700/80`}
        >
          2
        </button>

        {/* 3 */}
        <button
          onClick={() => handlePress(() => onDigit('3'))}
          className={`${baseBtnStyle} bg-slate-50 text-slate-800 hover:bg-slate-100 active:bg-slate-200 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:bg-slate-700/80`}
        >
          3
        </button>

        {/* + (Add) - Green */}
        <button
          onClick={() => handlePress(() => onOperator('+'))}
          className={`${baseBtnStyle} bg-slate-50 text-emerald-600 hover:bg-slate-100 active:bg-slate-200 dark:bg-slate-800/60 dark:text-emerald-400 dark:hover:bg-slate-800 text-3xl`}
          aria-label="Add"
        >
          +
        </button>

        {/* ROW 5 */}
        {/* +/- (Toggle sign) */}
        <button
          onClick={() => handlePress(onToggleSign)}
          className={`${baseBtnStyle} bg-slate-50 text-slate-800 hover:bg-slate-100 active:bg-slate-200 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:bg-slate-700/80 text-xl sm:text-2xl font-light`}
          aria-label="Toggle Sign"
        >
          +/-
        </button>

        {/* 0 */}
        <button
          onClick={() => handlePress(() => onDigit('0'))}
          className={`${baseBtnStyle} bg-slate-50 text-slate-800 hover:bg-slate-100 active:bg-slate-200 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:bg-slate-700/80`}
        >
          0
        </button>

        {/* . (Decimal point) */}
        <button
          onClick={() => handlePress(onDecimal)}
          className={`${baseBtnStyle} bg-slate-50 text-slate-800 hover:bg-slate-100 active:bg-slate-200 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:bg-slate-700/80 font-bold`}
          aria-label="Decimal point"
        >
          .
        </button>

        {/* = (Equals) - Filled Samsung Emerald Green Circle with White = */}
        <button
          onClick={() => handlePress(onEquals, 'success')}
          className={`${baseBtnStyle} bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-medium shadow-md shadow-emerald-500/20 text-3xl`}
          aria-label="Equals"
        >
          =
        </button>
      </div>
    </div>
  );
};
