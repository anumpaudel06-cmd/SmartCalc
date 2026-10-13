import React, { useState, useMemo } from 'react';
import { Search, X, Check } from 'lucide-react';
import { CurrencyItem } from '../types';
import { CURRENCY_LIST } from '../services/currencyService';
import { triggerHaptic } from '../utils/hapticsAndSound';

interface CurrencyPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCurrencyCode: string;
  onSelect: (currency: CurrencyItem) => void;
  title: string;
}

export const CurrencyPickerModal: React.FC<CurrencyPickerModalProps> = ({
  isOpen,
  onClose,
  selectedCurrencyCode,
  onSelect,
  title,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCurrencies = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return CURRENCY_LIST;
    return CURRENCY_LIST.filter(
      (c) =>
        c.code.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/50 backdrop-blur-xs select-none animate-in fade-in duration-200">
      <div className="flex-1" onClick={onClose} />

      <div className="w-full max-w-[480px] mx-auto bg-white dark:bg-slate-900 rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-250">
        {/* Grab Handle */}
        <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mt-3 mb-1 shrink-0" />

        {/* Modal Header */}
        <div className="px-5 py-3 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800/80">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search currency, code or country (e.g. NPR, Nepal)"
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-emerald-500"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Currencies List */}
        <div className="flex-1 overflow-y-auto px-4 py-2 divide-y divide-slate-100 dark:divide-slate-800/50">
          {filteredCurrencies.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              No currencies match &quot;{searchQuery}&quot;
            </div>
          ) : (
            filteredCurrencies.map((c) => {
              const isSelected = c.code === selectedCurrencyCode;
              return (
                <button
                  key={c.code}
                  onClick={() => {
                    triggerHaptic('light');
                    onSelect(c);
                    onClose();
                  }}
                  className={`w-full py-3 px-3 flex items-center justify-between rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors ${
                    isSelected ? 'bg-emerald-50/60 dark:bg-emerald-950/30' : ''
                  }`}
                >
                  <div className="flex items-center gap-3 text-left">
                    <span className="text-2xl" role="img" aria-label={c.country}>
                      {c.flag}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {c.code}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {c.symbol}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {c.name} · <span className="font-medium text-slate-700 dark:text-slate-300">{c.country}</span>
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
