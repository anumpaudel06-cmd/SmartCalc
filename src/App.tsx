/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { AppTab, HistoryItem } from './types';
import { PhoneContainer } from './components/PhoneContainer';
import { OneUIStatusBar } from './components/OneUIStatusBar';
import { CalculatorDisplay } from './components/CalculatorDisplay';
import { UtilityBar } from './components/UtilityBar';
import { CalculatorKeypad } from './components/CalculatorKeypad';
import { HistoryDrawer } from './components/HistoryDrawer';
import { UnitConverterView } from './components/UnitConverterView';
import { CurrencyConverterView } from './components/CurrencyConverterView';
import { CopyToast } from './components/CopyToast';
import {
  evaluateExpression,
  getSmartParenthesis,
  toggleSign,
} from './services/calculatorEngine';
import { triggerHaptic } from './utils/hapticsAndSound';

const LOCAL_STORAGE_HISTORY_KEY = 'samsung_calc_history_v1';
const LOCAL_STORAGE_SETTINGS_KEY = 'samsung_calc_settings_v1';

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppTab>('calculator');
  const [expression, setExpression] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [isEvaluated, setIsEvaluated] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Settings
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const s = localStorage.getItem(LOCAL_STORAGE_SETTINGS_KEY);
      return s ? JSON.parse(s).sound !== false : true;
    } catch {
      return true;
    }
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const s = localStorage.getItem(LOCAL_STORAGE_SETTINGS_KEY);
      if (s) return JSON.parse(s).dark === true;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  const [frameMode, setFrameMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth > 640;
    }
    return true;
  });

  // Save history
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(history));
    } catch {
      // ignore
    }
  }, [history]);

  // Save settings
  useEffect(() => {
    try {
      localStorage.setItem(
        LOCAL_STORAGE_SETTINGS_KEY,
        JSON.stringify({ sound: soundEnabled, dark: darkMode })
      );
    } catch {
      // ignore
    }
  }, [soundEnabled, darkMode]);

  // Show Toast
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  }, []);

  // Copy to clipboard
  const handleCopy = useCallback((text: string) => {
    if (!text) return;
    try {
      navigator.clipboard.writeText(text);
      triggerHaptic('success');
      showToast(`Copied: ${text}`);
    } catch {
      // Fallback
      showToast('Copied to clipboard');
    }
  }, [showToast]);

  // Real-time answer preview while typing
  const livePreview = useMemo(() => {
    if (isEvaluated || !expression) return '';
    // Only preview if expression has operators and isn't just a number
    if (!/[\+\-×÷\%]/.test(expression)) return '';

    const res = evaluateExpression(expression, true);
    if (!res.isError && res.value && res.value !== expression) {
      return res.value;
    }
    return '';
  }, [expression, isEvaluated]);

  // Calculator Keypad Handlers
  const handleDigit = useCallback((digit: string) => {
    if (isEvaluated) {
      // Start fresh
      setExpression(digit);
      setResult('');
      setIsEvaluated(false);
      return;
    }

    if (expression === '0') {
      setExpression(digit);
    } else {
      setExpression(prev => prev + digit);
    }
  }, [expression, isEvaluated]);

  const handleOperator = useCallback((op: string) => {
    if (isEvaluated) {
      // Continue from previous result
      setExpression(result.replace(/,/g, '') + ` ${op} `);
      setResult('');
      setIsEvaluated(false);
      return;
    }

    if (!expression) {
      if (op === '-') {
        setExpression('-');
      }
      return;
    }

    // Replace trailing operator if exists
    if (/\s[\+\-×÷]\s$/.test(expression)) {
      setExpression(prev => prev.replace(/\s[\+\-×÷]\s$/, ` ${op} `));
      return;
    }

    setExpression(prev => `${prev} ${op} `);
  }, [expression, isEvaluated, result]);

  const handleClear = useCallback(() => {
    setExpression('');
    setResult('');
    setIsEvaluated(false);
  }, []);

  const handleToggleSign = useCallback(() => {
    if (isEvaluated) {
      const toggled = toggleSign(result);
      setExpression(toggled);
      setResult('');
      setIsEvaluated(false);
      return;
    }
    setExpression(prev => toggleSign(prev));
  }, [isEvaluated, result]);

  const handleParentheses = useCallback(() => {
    if (isEvaluated) {
      setExpression('(');
      setResult('');
      setIsEvaluated(false);
      return;
    }
    const nextParen = getSmartParenthesis(expression);
    setExpression(prev => prev + nextParen);
  }, [expression, isEvaluated]);

  const handlePercentage = useCallback(() => {
    if (isEvaluated) {
      setExpression(result.replace(/,/g, '') + '%');
      setResult('');
      setIsEvaluated(false);
      return;
    }
    if (!expression || /[\+\-×÷\(\s]$/.test(expression)) return;
    setExpression(prev => prev + '%');
  }, [expression, isEvaluated, result]);

  const handleDecimal = useCallback(() => {
    if (isEvaluated) {
      setExpression('0.');
      setResult('');
      setIsEvaluated(false);
      return;
    }

    // Check if the current trailing number already has a decimal
    const lastNumberMatch = expression.match(/(\d+(?:\.\d*)?)$/);
    if (lastNumberMatch && lastNumberMatch[1].includes('.')) {
      return;
    }

    if (!expression || /[\+\-×÷\(\s]$/.test(expression)) {
      setExpression(prev => prev + '0.');
    } else {
      setExpression(prev => prev + '.');
    }
  }, [expression, isEvaluated]);

  const handleEquals = useCallback(() => {
    if (!expression) return;
    if (isEvaluated) return;

    const res = evaluateExpression(expression, false);
    if (!res.isError && res.value) {
      setResult(res.value);
      setIsEvaluated(true);

      // Add to history log
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        equation: expression,
        result: res.value,
        timestamp: Date.now(),
      };
      setHistory(prev => [newHistoryItem, ...prev.slice(0, 49)]); // keep up to 50
    } else if (res.errorMessage) {
      setResult(res.errorMessage);
      setIsEvaluated(true);
    }
  }, [expression, isEvaluated]);

  const handleBackspace = useCallback(() => {
    if (isEvaluated) {
      setExpression('');
      setResult('');
      setIsEvaluated(false);
      return;
    }

    if (!expression) return;

    // If ends with spaces (operator like ' + ')
    if (/\s[\+\-×÷]\s$/.test(expression)) {
      setExpression(prev => prev.slice(0, -3));
    } else {
      setExpression(prev => prev.slice(0, -1));
    }
  }, [expression, isEvaluated]);

  // Physical keyboard listeners on desktop
  useEffect(() => {
    if (currentTab !== 'calculator') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is inside an input element
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        handleDigit(e.key);
      } else if (e.key === '+') {
        e.preventDefault();
        handleOperator('+');
      } else if (e.key === '-') {
        e.preventDefault();
        handleOperator('-');
      } else if (e.key === '*' || e.key === 'x') {
        e.preventDefault();
        handleOperator('×');
      } else if (e.key === '/') {
        e.preventDefault();
        handleOperator('÷');
      } else if (e.key === '%') {
        e.preventDefault();
        handlePercentage();
      } else if (e.key === '(' || e.key === ')') {
        e.preventDefault();
        handleParentheses();
      } else if (e.key === '.') {
        e.preventDefault();
        handleDecimal();
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleEquals();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    currentTab,
    handleDigit,
    handleOperator,
    handlePercentage,
    handleParentheses,
    handleDecimal,
    handleEquals,
    handleBackspace,
    handleClear,
  ]);

  return (
    <PhoneContainer darkMode={darkMode} frameMode={frameMode}>
      {/* Top Status & App Bar */}
      <OneUIStatusBar
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(prev => !prev)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(prev => !prev)}
        frameMode={frameMode}
        onToggleFrameMode={() => setFrameMode(prev => !prev)}
      />

      {/* Main Tab Content */}
      {currentTab === 'calculator' && (
        <div className="flex-1 flex flex-col justify-between overflow-hidden bg-white dark:bg-slate-900 select-none">
          {/* Top Formula & Real-time preview */}
          <CalculatorDisplay
            expression={expression}
            result={result}
            preview={livePreview}
            isEvaluated={isEvaluated}
            onCopy={handleCopy}
          />

          {/* Samsung 4 Utility Icons */}
          <UtilityBar
            currentTab={currentTab}
            onSelectTab={setCurrentTab}
            onOpenHistory={() => setIsHistoryOpen(true)}
            onBackspace={handleBackspace}
            onClearAll={handleClear}
            hasInput={Boolean(expression || result)}
          />

          {/* 4x5 Keypad with signature Samsung colors */}
          <CalculatorKeypad
            onDigit={handleDigit}
            onOperator={handleOperator}
            onClear={handleClear}
            onToggleSign={handleToggleSign}
            onParentheses={handleParentheses}
            onPercentage={handlePercentage}
            onDecimal={handleDecimal}
            onEquals={handleEquals}
            soundEnabled={soundEnabled}
          />
        </div>
      )}

      {currentTab === 'units' && (
        <UnitConverterView
          onBackToCalculator={() => setCurrentTab('calculator')}
          onCopy={handleCopy}
          soundEnabled={soundEnabled}
        />
      )}

      {currentTab === 'currency' && (
        <CurrencyConverterView
          onBackToCalculator={() => setCurrentTab('calculator')}
          onCopy={handleCopy}
          soundEnabled={soundEnabled}
        />
      )}

      {/* Slide-up Calculation History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onClearHistory={() => setHistory([])}
        onSelectEquation={(eq) => {
          setExpression(eq);
          setResult('');
          setIsEvaluated(false);
        }}
        onSelectResult={(res) => {
          setExpression(res.replace(/,/g, ''));
          setResult('');
          setIsEvaluated(false);
        }}
        onCopy={handleCopy}
      />

      {/* Toast Notification */}
      <CopyToast message={toastMessage || ''} isVisible={Boolean(toastMessage)} />
    </PhoneContainer>
  );
}
