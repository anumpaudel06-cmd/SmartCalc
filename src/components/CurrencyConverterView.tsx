import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  ArrowLeft,
  ArrowUpDown,
  RefreshCw,
  Copy,
  Wifi,
  WifiOff,
  ChevronDown,
} from 'lucide-react';
import { CurrencyItem, CurrencyRatesData } from '../types';
import {
  CURRENCY_LIST,
  getStoredRates,
  fetchLiveExchangeRates,
  convertCurrency,
  getMsUntilNextMidnight,
  formatCurrencyValue,
} from '../services/currencyService';
import { CurrencyPickerModal } from './CurrencyPickerModal';
import { triggerHaptic, playSamsungClickSound } from '../utils/hapticsAndSound';

interface CurrencyConverterViewProps {
  onBackToCalculator: () => void;
  onCopy: (text: string) => void;
  soundEnabled: boolean;
}

export const CurrencyConverterView: React.FC<CurrencyConverterViewProps> = ({
  onBackToCalculator,
  onCopy,
  soundEnabled,
}) => {
  const [ratesData, setRatesData] = useState<CurrencyRatesData>(() => getStoredRates());
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(() =>
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Currency selection: Default USD -> NPR (as mentioned in prompt) or user's preference
  const [fromCurrency, setFromCurrency] = useState<CurrencyItem>(
    () => CURRENCY_LIST.find((c) => c.code === 'USD') || CURRENCY_LIST[0]
  );
  const [toCurrency, setToCurrency] = useState<CurrencyItem>(
    () => CURRENCY_LIST.find((c) => c.code === 'NPR') || CURRENCY_LIST[4]
  );

  const [inputAmount, setInputAmount] = useState<string>('1');

  // Picker modal state
  const [pickerModalType, setPickerModalType] = useState<'from' | 'to' | null>(null);

  // Smart Update Logic: Fetch live rates function
  const refreshRates = useCallback(async (isSilent = false) => {
    if (!navigator.onLine) {
      setIsOnline(false);
      return;
    }
    if (!isSilent) {
      setIsFetching(true);
    }
    setFetchError(null);

    try {
      const freshData = await fetchLiveExchangeRates();
      setRatesData(freshData);
      setIsOnline(true);
    } catch {
      setFetchError('Could not refresh live rates. Using saved rates.');
    } finally {
      if (!isSilent) {
        setIsFetching(false);
      }
    }
  }, []);

  // 1) Fetch automatically when the user opens the currency tab
  useEffect(() => {
    refreshRates(false);
  }, [refreshRates]);

  // 2) Fetch live exchange rates automatically when the internet connects & listen for offline
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      refreshRates(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [refreshRates]);

  // 3) Smart timer: Fetch at exactly 12:00 AM (00:00) local time every day
  useEffect(() => {
    let timeoutId: number;
    let intervalId: number;

    const scheduleMidnightUpdate = () => {
      const msUntilMidnight = getMsUntilNextMidnight();
      timeoutId = window.setTimeout(() => {
        refreshRates(true);
        // Then repeat every 24 hours (86400000 ms)
        intervalId = window.setInterval(() => {
          refreshRates(true);
        }, 86400000);
      }, msUntilMidnight);
    };

    scheduleMidnightUpdate();

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [refreshRates]);

  // Quick swap button
  const handleSwap = () => {
    triggerHaptic('medium');
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Calculate live conversion
  const numericInput = parseFloat(inputAmount) || 0;
  const convertedAmount = useMemo(() => {
    const res = convertCurrency(numericInput, fromCurrency.code, toCurrency.code, ratesData.rates);
    return formatCurrencyValue(res);
  }, [numericInput, fromCurrency.code, toCurrency.code, ratesData.rates]);

  // Single unit exchange rate
  const singleUnitRate = useMemo(() => {
    const oneVal = convertCurrency(1, fromCurrency.code, toCurrency.code, ratesData.rates);
    return `1 ${fromCurrency.code} = ${formatCurrencyValue(oneVal)} ${toCurrency.code}`;
  }, [fromCurrency.code, toCurrency.code, ratesData.rates]);

  // Keypad actions
  const handleKeypadPress = (key: string) => {
    triggerHaptic('light');
    playSamsungClickSound(soundEnabled);

    if (key === 'C') {
      setInputAmount('0');
      return;
    }

    if (key === 'DEL') {
      if (inputAmount.length <= 1) {
        setInputAmount('0');
      } else {
        setInputAmount(inputAmount.slice(0, -1));
      }
      return;
    }

    if (key === '.') {
      if (!inputAmount.includes('.')) {
        setInputAmount(inputAmount + '.');
      }
      return;
    }

    if (key === '00') {
      if (inputAmount !== '0' && inputAmount.length < 12) {
        setInputAmount(inputAmount + '00');
      }
      return;
    }

    // Digits 0-9
    if (inputAmount === '0' && key !== '.') {
      setInputAmount(key);
    } else {
      if (inputAmount.length < 12) {
        setInputAmount(inputAmount + key);
      }
    }
  };

  const formattedDate = useMemo(() => {
    return new Date(ratesData.lastUpdated).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }, [ratesData.lastUpdated]);

  return (
    <div className="flex-1 flex flex-col justify-between overflow-hidden bg-white dark:bg-slate-900 select-none">
      {/* Header Bar */}
      <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => {
              triggerHaptic('light');
              onBackToCalculator();
            }}
            className="p-1 -ml-1 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Calculator</span>
          </button>

          <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">
            Smart Currency
          </span>

          <button
            onClick={() => {
              triggerHaptic('light');
              refreshRates(false);
            }}
            disabled={isFetching}
            className="p-1 -mr-1 text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Refresh live exchange rates"
            aria-label="Refresh exchange rates"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin text-emerald-600' : ''}`} />
          </button>
        </div>

        {/* Smart Status Pill (Online / Offline with date & time stamp) */}
        <div className="flex items-center justify-between text-[11px] px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5 truncate">
            {isOnline ? (
              <Wifi className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            ) : (
              <WifiOff className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            )}
            <span className="text-slate-600 dark:text-slate-300 truncate">
              {isOnline ? 'Live Rates' : 'Offline Mode'} · Last saved: {formattedDate}
            </span>
          </div>

          <span className="text-[10px] text-slate-400 dark:text-slate-500 shrink-0 ml-1">
            Auto 12:00 AM
          </span>
        </div>

        {fetchError && (
          <div className="mt-1 text-[11px] text-amber-600 dark:text-amber-400 px-2">
            {fetchError}
          </div>
        )}
      </div>

      {/* Main Conversion Cards */}
      <div className="p-4 sm:p-5 space-y-3">
        {/* FROM Currency Card */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 focus-within:border-emerald-500 transition-all">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => {
                triggerHaptic('light');
                setPickerModalType('from');
              }}
              className="flex items-center gap-2 px-2 py-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs hover:border-emerald-400 transition-colors text-left"
            >
              <span className="text-lg leading-none" role="img" aria-label={fromCurrency.country}>
                {fromCurrency.flag}
              </span>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {fromCurrency.code}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-400 truncate max-w-[110px]">
                  {fromCurrency.country}
                </span>
              </div>
            </button>

            <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
              {fromCurrency.name}
            </span>
          </div>

          <div className="text-right text-2xl sm:text-3xl font-medium tracking-tight text-slate-900 dark:text-white tabular-nums overflow-x-auto no-scrollbar py-0.5">
            {fromCurrency.symbol} {inputAmount}
          </div>
        </div>

        {/* Quick Swap Button */}
        <div className="flex items-center justify-center -my-1">
          <button
            onClick={handleSwap}
            className="p-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-300 active:rotate-180 transition-transform duration-200"
            title="Swap currencies"
            aria-label="Swap currencies"
          >
            <ArrowUpDown className="w-4 h-4" />
          </button>
        </div>

        {/* TO Currency Card */}
        <div className="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100/80 dark:border-emerald-900/40 relative">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => {
                triggerHaptic('light');
                setPickerModalType('to');
              }}
              className="flex items-center gap-2 px-2 py-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs hover:border-emerald-400 transition-colors text-left"
            >
              <span className="text-lg leading-none" role="img" aria-label={toCurrency.country}>
                {toCurrency.flag}
              </span>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {toCurrency.code}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-400 truncate max-w-[110px]">
                  {toCurrency.country}
                </span>
              </div>
            </button>

            <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
              {toCurrency.name}
            </span>
          </div>

          <div className="flex items-center justify-end gap-2">
            <div className="text-right text-2xl sm:text-3xl font-semibold tracking-tight text-emerald-600 dark:text-emerald-400 tabular-nums overflow-x-auto no-scrollbar py-0.5">
              {toCurrency.symbol} {convertedAmount}
            </div>

            <button
              onClick={() => {
                triggerHaptic('success');
                onCopy(`${toCurrency.code} ${convertedAmount}`);
              }}
              className="opacity-60 hover:opacity-100 p-1 rounded-full text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-opacity"
              title="Copy converted value"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Single Unit Exchange Rate Ticker */}
        <div className="text-center text-[11px] text-slate-400 dark:text-slate-500 font-medium">
          {singleUnitRate}
        </div>
      </div>

      {/* Built-in Samsung Number Pad */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="grid grid-cols-4 gap-2 max-w-[340px] mx-auto">
          {['7', '8', '9', 'C'].map((k) => (
            <button
              key={k}
              onClick={() => handleKeypadPress(k)}
              className={`h-11 rounded-xl text-lg font-medium transition-all active:scale-95 ${
                k === 'C'
                  ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 font-semibold'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-xs'
              }`}
            >
              {k}
            </button>
          ))}
          {['4', '5', '6', 'DEL'].map((k) => (
            <button
              key={k}
              onClick={() => handleKeypadPress(k)}
              className={`h-11 rounded-xl text-lg font-medium transition-all active:scale-95 ${
                k === 'DEL'
                  ? 'bg-slate-200/70 dark:bg-slate-700/70 text-slate-700 dark:text-slate-200 text-sm font-semibold'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-xs'
              }`}
            >
              {k === 'DEL' ? '⌫' : k}
            </button>
          ))}
          {['1', '2', '3', '00'].map((k) => (
            <button
              key={k}
              onClick={() => handleKeypadPress(k)}
              className="h-11 rounded-xl text-lg font-medium transition-all active:scale-95 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-xs"
            >
              {k}
            </button>
          ))}
          {['.', '0', 'SWAP', 'OK'].map((k) => (
            <button
              key={k}
              onClick={() => {
                if (k === 'SWAP') {
                  handleSwap();
                } else if (k === 'OK') {
                  triggerHaptic('success');
                  onCopy(`${toCurrency.code} ${convertedAmount}`);
                } else {
                  handleKeypadPress(k);
                }
              }}
              className={`h-11 rounded-xl text-lg font-medium transition-all active:scale-95 ${
                k === 'OK'
                  ? 'bg-emerald-600 text-white font-semibold text-sm shadow-sm shadow-emerald-600/30'
                  : k === 'SWAP'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 text-xs font-semibold'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-xs'
              }`}
            >
              {k === 'OK' ? 'Copy' : k === 'SWAP' ? 'Swap ⇄' : k}
            </button>
          ))}
        </div>
      </div>

      {/* Currency Picker Modal */}
      <CurrencyPickerModal
        isOpen={pickerModalType !== null}
        onClose={() => setPickerModalType(null)}
        title={pickerModalType === 'from' ? 'Select Base Currency' : 'Select Target Currency'}
        selectedCurrencyCode={pickerModalType === 'from' ? fromCurrency.code : toCurrency.code}
        onSelect={(selected) => {
          if (pickerModalType === 'from') {
            setFromCurrency(selected);
          } else {
            setToCurrency(selected);
          }
        }}
      />
    </div>
  );
};
