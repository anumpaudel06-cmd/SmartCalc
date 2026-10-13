import React, { useState, useMemo } from 'react';
import { ArrowUpDown, Copy, ArrowLeft } from 'lucide-react';
import { UnitCategory } from '../types';
import { UNIT_CATEGORIES, convertUnit, formatUnitNumber } from '../services/unitConverterService';
import { triggerHaptic, playSamsungClickSound } from '../utils/hapticsAndSound';

interface UnitConverterViewProps {
  onBackToCalculator: () => void;
  onCopy: (text: string) => void;
  soundEnabled: boolean;
}

export const UnitConverterView: React.FC<UnitConverterViewProps> = ({
  onBackToCalculator,
  onCopy,
  soundEnabled,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<UnitCategory>('length');
  const [inputValue, setInputValue] = useState<string>('1');

  const currentCategoryConfig = useMemo(() => {
    return UNIT_CATEGORIES.find(c => c.id === selectedCategory) || UNIT_CATEGORIES[0];
  }, [selectedCategory]);

  const [fromUnitId, setFromUnitId] = useState<string>(() => currentCategoryConfig.units[0].id);
  const [toUnitId, setToUnitId] = useState<string>(() => currentCategoryConfig.units[1]?.id || currentCategoryConfig.units[0].id);

  // When category changes, reset units if not in new category
  const handleSelectCategory = (catId: UnitCategory) => {
    triggerHaptic('light');
    setSelectedCategory(catId);
    const cat = UNIT_CATEGORIES.find(c => c.id === catId);
    if (cat) {
      setFromUnitId(cat.units[0].id);
      setToUnitId(cat.units[1]?.id || cat.units[0].id);
    }
  };

  // Compute conversion result
  const numericInput = parseFloat(inputValue) || 0;
  const convertedResult = useMemo(() => {
    const res = convertUnit(numericInput, fromUnitId, toUnitId, currentCategoryConfig);
    return formatUnitNumber(res);
  }, [numericInput, fromUnitId, toUnitId, currentCategoryConfig]);

  // Quick unit ratio explanation
  const ratioText = useMemo(() => {
    const oneVal = convertUnit(1, fromUnitId, toUnitId, currentCategoryConfig);
    const fromUnit = currentCategoryConfig.units.find(u => u.id === fromUnitId);
    const toUnit = currentCategoryConfig.units.find(u => u.id === toUnitId);
    return `1 ${fromUnit?.symbol || ''} = ${formatUnitNumber(oneVal)} ${toUnit?.symbol || ''}`;
  }, [fromUnitId, toUnitId, currentCategoryConfig]);

  // Handle number pad inputs
  const handleKeypadPress = (key: string) => {
    triggerHaptic('light');
    playSamsungClickSound(soundEnabled);

    if (key === 'C') {
      setInputValue('0');
      return;
    }

    if (key === 'DEL') {
      if (inputValue.length <= 1) {
        setInputValue('0');
      } else {
        setInputValue(inputValue.slice(0, -1));
      }
      return;
    }

    if (key === '.') {
      if (!inputValue.includes('.')) {
        setInputValue(inputValue + '.');
      }
      return;
    }

    if (key === '+/-') {
      if (inputValue.startsWith('-')) {
        setInputValue(inputValue.slice(1));
      } else if (inputValue !== '0') {
        setInputValue('-' + inputValue);
      }
      return;
    }

    // Digits 0-9
    if (inputValue === '0' && key !== '.') {
      setInputValue(key);
    } else {
      if (inputValue.length < 14) {
        setInputValue(inputValue + key);
      }
    }
  };

  const handleSwap = () => {
    triggerHaptic('medium');
    setFromUnitId(toUnitId);
    setToUnitId(fromUnitId);
  };

  return (
    <div className="flex-1 flex flex-col justify-between overflow-hidden bg-white dark:bg-slate-900 select-none">
      {/* Category Pills Header */}
      <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-2">
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
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 ml-auto">
            Unit Converter
          </span>
        </div>

        {/* Horizontal Category Carousel */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {UNIT_CATEGORIES.map((cat) => {
            const isActive = cat.id === selectedCategory;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-150 shrink-0 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Conversion Cards Zone */}
      <div className="p-4 sm:p-5 space-y-3">
        {/* From Unit Card */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 focus-within:border-emerald-500 transition-all">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-slate-400 dark:text-slate-400">From</span>
            <select
              value={fromUnitId}
              onChange={(e) => {
                triggerHaptic('light');
                setFromUnitId(e.target.value);
              }}
              className="text-xs font-medium bg-transparent text-emerald-700 dark:text-emerald-400 outline-none cursor-pointer max-w-[180px] text-right font-semibold"
            >
              {currentCategoryConfig.units.map((u) => (
                <option key={u.id} value={u.id} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">
                  {u.name} ({u.symbol})
                </option>
              ))}
            </select>
          </div>

          <div className="text-right text-2xl sm:text-3xl font-medium tracking-tight text-slate-900 dark:text-white tabular-nums overflow-x-auto no-scrollbar py-0.5">
            {inputValue}
          </div>
        </div>

        {/* Quick Swap Button */}
        <div className="flex items-center justify-center -my-1">
          <button
            onClick={handleSwap}
            className="p-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-300 active:rotate-180 transition-transform duration-200"
            title="Swap units"
            aria-label="Swap units"
          >
            <ArrowUpDown className="w-4 h-4" />
          </button>
        </div>

        {/* To Unit Card */}
        <div className="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100/80 dark:border-emerald-900/40 relative group">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">To</span>
            <select
              value={toUnitId}
              onChange={(e) => {
                triggerHaptic('light');
                setToUnitId(e.target.value);
              }}
              className="text-xs font-medium bg-transparent text-emerald-700 dark:text-emerald-400 outline-none cursor-pointer max-w-[180px] text-right font-semibold"
            >
              {currentCategoryConfig.units.map((u) => (
                <option key={u.id} value={u.id} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">
                  {u.name} ({u.symbol})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-end gap-2">
            <div className="text-right text-2xl sm:text-3xl font-semibold tracking-tight text-emerald-600 dark:text-emerald-400 tabular-nums overflow-x-auto no-scrollbar py-0.5">
              {convertedResult}
            </div>

            <button
              onClick={() => {
                triggerHaptic('success');
                onCopy(convertedResult);
              }}
              className="opacity-60 hover:opacity-100 p-1 rounded-full text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-opacity"
              title="Copy result"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Ratio explanation */}
        <div className="text-center text-[11px] text-slate-400 dark:text-slate-500 font-medium">
          {ratioText}
        </div>
      </div>

      {/* Built-in Compact Samsung Number Pad for rapid thumb input */}
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
          {['1', '2', '3', '+/-'].map((k) => (
            <button
              key={k}
              onClick={() => handleKeypadPress(k)}
              className={`h-11 rounded-xl text-lg font-medium transition-all active:scale-95 ${
                k === '+/-'
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-base'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-xs'
              }`}
            >
              {k}
            </button>
          ))}
          {['0', '00', '.', 'OK'].map((k) => (
            <button
              key={k}
              onClick={() => {
                if (k === 'OK') {
                  triggerHaptic('success');
                  onCopy(convertedResult);
                } else {
                  handleKeypadPress(k);
                }
              }}
              className={`h-11 rounded-xl text-lg font-medium transition-all active:scale-95 ${
                k === 'OK'
                  ? 'bg-emerald-600 text-white font-semibold text-sm shadow-sm shadow-emerald-600/30'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-xs'
              }`}
            >
              {k === 'OK' ? 'Copy' : k}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
