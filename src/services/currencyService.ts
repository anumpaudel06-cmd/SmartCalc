import { CurrencyItem, CurrencyRatesData } from '../types';

export const CURRENCY_LIST: CurrencyItem[] = [
  { code: 'USD', name: 'US Dollar', country: 'United States', flag: '🇺🇸', symbol: '$' },
  { code: 'EUR', name: 'Euro', country: 'Eurozone', flag: '🇪🇺', symbol: '€' },
  { code: 'GBP', name: 'British Pound', country: 'United Kingdom', flag: '🇬🇧', symbol: '£' },
  { code: 'INR', name: 'Indian Rupee', country: 'India', flag: '🇮🇳', symbol: '₹' },
  { code: 'NPR', name: 'Nepalese Rupee', country: 'Nepal', flag: '🇳🇵', symbol: 'Rs' },
  { code: 'JPY', name: 'Japanese Yen', country: 'Japan', flag: '🇯🇵', symbol: '¥' },
  { code: 'AUD', name: 'Australian Dollar', country: 'Australia', flag: '🇦🇺', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', country: 'Canada', flag: '🇨🇦', symbol: 'C$' },
  { code: 'CHF', name: 'Swiss Franc', country: 'Switzerland', flag: '🇨🇭', symbol: 'CHF' },
  { code: 'CNY', name: 'Chinese Yuan', country: 'China', flag: '🇨🇳', symbol: '¥' },
  { code: 'MYR', name: 'Malaysian Ringgit', country: 'Malaysia', flag: '🇲🇾', symbol: 'RM' },
  { code: 'SGD', name: 'Singapore Dollar', country: 'Singapore', flag: '🇸🇬', symbol: 'S$' },
  { code: 'NZD', name: 'New Zealand Dollar', country: 'New Zealand', flag: '🇳🇿', symbol: 'NZ$' },
  { code: 'KRW', name: 'South Korean Won', country: 'South Korea', flag: '🇰🇷', symbol: '₩' },
  { code: 'AED', name: 'UAE Dirham', country: 'United Arab Emirates', flag: '🇦🇪', symbol: 'د.إ' },
  { code: 'SAR', name: 'Saudi Riyal', country: 'Saudi Arabia', flag: '🇸🇦', symbol: '﷼' },
  { code: 'QAR', name: 'Qatari Riyal', country: 'Qatar', flag: '🇶🇦', symbol: 'QR' },
  { code: 'KWD', name: 'Kuwaiti Dinar', country: 'Kuwait', flag: '🇰🇼', symbol: 'KD' },
  { code: 'BRL', name: 'Brazilian Real', country: 'Brazil', flag: '🇧🇷', symbol: 'R$' },
  { code: 'ZAR', name: 'South African Rand', country: 'South Africa', flag: '🇿🇦', symbol: 'R' },
  { code: 'THB', name: 'Thai Baht', country: 'Thailand', flag: '🇹🇭', symbol: '฿' },
  { code: 'IDR', name: 'Indonesian Rupiah', country: 'Indonesia', flag: '🇮🇩', symbol: 'Rp' },
  { code: 'PHP', name: 'Philippine Peso', country: 'Philippines', flag: '🇵🇭', symbol: '₱' },
  { code: 'VND', name: 'Vietnamese Dong', country: 'Vietnam', flag: '🇻🇳', symbol: '₫' },
  { code: 'PKR', name: 'Pakistani Rupee', country: 'Pakistan', flag: '🇵🇰', symbol: '₨' },
  { code: 'BDT', name: 'Bangladeshi Taka', country: 'Bangladesh', flag: '🇧🇩', symbol: '৳' },
  { code: 'LKR', name: 'Sri Lankan Rupee', country: 'Sri Lanka', flag: '🇱🇰', symbol: 'Rs' },
  { code: 'MXN', name: 'Mexican Peso', country: 'Mexico', flag: '🇲🇽', symbol: 'Mex$' },
  { code: 'TRY', name: 'Turkish Lira', country: 'Turkey', flag: '🇹🇷', symbol: '₺' },
  { code: 'SEK', name: 'Swedish Krona', country: 'Sweden', flag: '🇸🇪', symbol: 'kr' },
  { code: 'NOK', name: 'Norwegian Krone', country: 'Norway', flag: '🇳🇴', symbol: 'kr' },
  { code: 'DKK', name: 'Danish Krone', country: 'Denmark', flag: '🇩🇰', symbol: 'kr' },
  { code: 'PLN', name: 'Polish Zloty', country: 'Poland', flag: '🇵🇱', symbol: 'zł' },
  { code: 'HKD', name: 'Hong Kong Dollar', country: 'Hong Kong', flag: '🇭🇰', symbol: 'HK$' },
  { code: 'TWD', name: 'New Taiwan Dollar', country: 'Taiwan', flag: '🇹🇼', symbol: 'NT$' },
  { code: 'EGP', name: 'Egyptian Pound', country: 'Egypt', flag: '🇪🇬', symbol: 'E£' },
  { code: 'NGN', name: 'Nigerian Naira', country: 'Nigeria', flag: '🇳🇬', symbol: '₦' },
  { code: 'KES', name: 'Kenyan Shilling', country: 'Kenya', flag: '🇰🇪', symbol: 'KSh' },
  { code: 'CLP', name: 'Chilean Peso', country: 'Chile', flag: '🇨🇱', symbol: 'CLP$' },
  { code: 'COP', name: 'Colombian Peso', country: 'Colombia', flag: '🇨🇴', symbol: 'COL$' },
  { code: 'ARS', name: 'Argentine Peso', country: 'Argentina', flag: '🇦🇷', symbol: '$' },
  { code: 'ILS', name: 'Israeli New Shekel', country: 'Israel', flag: '🇮🇱', symbol: '₪' },
  { code: 'RUB', name: 'Russian Ruble', country: 'Russia', flag: '🇷🇺', symbol: '₽' },
  { code: 'CZK', name: 'Czech Koruna', country: 'Czech Republic', flag: '🇨🇿', symbol: 'Kč' },
  { code: 'HUF', name: 'Hungarian Forint', country: 'Hungary', flag: '🇭🇺', symbol: 'Ft' },
  { code: 'RON', name: 'Romanian Leu', country: 'Romania', flag: '🇷🇴', symbol: 'lei' },
  { code: 'BGN', name: 'Bulgarian Lev', country: 'Bulgaria', flag: '🇧🇬', symbol: 'лв' },
  { code: 'HRK', name: 'Croatian Kuna', country: 'Croatia', flag: '🇭🇷', symbol: 'kn' },
  { code: 'OMR', name: 'Omani Rial', country: 'Oman', flag: '🇴🇲', symbol: 'RO' },
  { code: 'BHD', name: 'Bahraini Dinar', country: 'Bahrain', flag: '🇧🇭', symbol: 'BD' },
  { code: 'JOD', name: 'Jordanian Dinar', country: 'Jordan', flag: '🇯🇴', symbol: 'JD' },
];

const LOCAL_STORAGE_RATES_KEY = 'samsung_calc_currency_rates_v1';

// Default baseline rates relative to USD in case user begins completely offline
const BASELINE_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.45,
  NPR: 133.52,
  JPY: 154.6,
  AUD: 1.52,
  CAD: 1.37,
  CHF: 0.91,
  CNY: 7.24,
  MYR: 4.75,
  SGD: 1.35,
  NZD: 1.66,
  KRW: 1378.0,
  AED: 3.67,
  SAR: 3.75,
  QAR: 3.64,
  KWD: 0.31,
  BRL: 5.15,
  ZAR: 18.6,
  THB: 36.8,
  IDR: 16180.0,
  PHP: 57.5,
  VND: 25400.0,
  PKR: 278.2,
  BDT: 117.5,
  LKR: 302.0,
  MXN: 16.9,
  TRY: 32.3,
  SEK: 10.8,
  NOK: 10.9,
  DKK: 6.9,
  PLN: 4.0,
  HKD: 7.82,
  TWD: 32.4,
  EGP: 47.6,
  NGN: 1420.0,
  KES: 131.0,
  CLP: 940.0,
  COP: 3900.0,
  ARS: 885.0,
  ILS: 3.72,
  RUB: 91.5,
  CZK: 23.3,
  HUF: 362.0,
  RON: 4.58,
  BGN: 1.80,
  HRK: 6.95,
  OMR: 0.385,
  BHD: 0.377,
  JOD: 0.709,
};

/**
 * Retrieve cached rates from localStorage or return baseline
 */
export function getStoredRates(): CurrencyRatesData {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_RATES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.rates && parsed.lastUpdated) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }

  return {
    base: 'USD',
    rates: BASELINE_RATES,
    lastUpdated: Date.now() - 3600000 * 4, // 4 hours ago default
    dateString: new Date(Date.now() - 3600000 * 4).toLocaleString(),
  };
}

/**
 * Lightweight fetch from ultra-fast free Exchange Rates API
 */
export async function fetchLiveExchangeRates(): Promise<CurrencyRatesData> {
  const endpoints = [
    'https://open.er-api.com/v6/latest/USD',
    'https://api.exchangerate-api.com/v4/latest/USD',
  ];

  let lastError: Error | null = null;

  for (const url of endpoints) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const resp = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!resp.ok) continue;

      const data = await resp.json();
      if (data && data.rates && typeof data.rates === 'object') {
        const ratesData: CurrencyRatesData = {
          base: data.base_code || data.base || 'USD',
          rates: {
            ...BASELINE_RATES,
            ...data.rates,
          },
          lastUpdated: Date.now(),
          dateString: new Date().toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short',
          }),
        };

        try {
          localStorage.setItem(LOCAL_STORAGE_RATES_KEY, JSON.stringify(ratesData));
        } catch {
          // ignore localStorage quota
        }

        return ratesData;
      }
    } catch (err) {
      lastError = err as Error;
    }
  }

  throw lastError || new Error('Failed to fetch live rates from all endpoints');
}

/**
 * Convert value between any two currencies using base USD rates
 */
export function convertCurrency(
  amount: number,
  fromCode: string,
  toCode: string,
  rates: Record<string, number>
): number {
  if (fromCode === toCode) return amount;
  
  const fromRate = rates[fromCode] ?? BASELINE_RATES[fromCode] ?? 1;
  const toRate = rates[toCode] ?? BASELINE_RATES[toCode] ?? 1;

  if (fromRate <= 0) return 0;

  // Convert to USD first, then to target
  const inUsd = amount / fromRate;
  return inUsd * toRate;
}

/**
 * Calculate milliseconds until next midnight (12:00 AM 00:00:00 local time)
 */
export function getMsUntilNextMidnight(): number {
  const now = new Date();
  const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 500);
  return Math.max(1000, nextMidnight.getTime() - now.getTime());
}

/**
 * Formats currency number nicely with standard separators
 */
export function formatCurrencyValue(num: number): string {
  if (isNaN(num)) return '0';
  if (num === 0) return '0';

  if (Math.abs(num) >= 1000000000) {
    return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }

  // If fractional part is small, show up to 4 decimals, otherwise 2
  const fractionDigits = num < 1 && num > -1 ? 4 : 2;
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: fractionDigits,
  });
}
