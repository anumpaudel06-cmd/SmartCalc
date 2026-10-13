export type AppTab = 'calculator' | 'units' | 'currency';

export interface HistoryItem {
  id: string;
  equation: string;
  result: string;
  timestamp: number;
}

export type UnitCategory = 
  | 'length'
  | 'area'
  | 'mass'
  | 'temperature'
  | 'volume'
  | 'data'
  | 'speed'
  | 'time';

export interface UnitDefinition {
  id: string;
  name: string;
  symbol: string;
  toBase: (val: number) => number;
  fromBase: (val: number) => number;
}

export interface UnitCategoryConfig {
  id: UnitCategory;
  name: string;
  iconName: string;
  baseUnit: string;
  units: UnitDefinition[];
}

export interface CurrencyItem {
  code: string;
  name: string;
  country: string;
  flag: string;
  symbol: string;
}

export interface CurrencyRatesData {
  base: string;
  rates: Record<string, number>;
  lastUpdated: number; // timestamp
  dateString?: string;
}
