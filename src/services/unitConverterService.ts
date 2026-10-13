import { UnitCategoryConfig } from '../types';

export const UNIT_CATEGORIES: UnitCategoryConfig[] = [
  {
    id: 'length',
    name: 'Length',
    iconName: 'Ruler',
    baseUnit: 'm',
    units: [
      { id: 'km', name: 'Kilometer', symbol: 'km', toBase: v => v * 1000, fromBase: v => v / 1000 },
      { id: 'm', name: 'Meter', symbol: 'm', toBase: v => v, fromBase: v => v },
      { id: 'cm', name: 'Centimeter', symbol: 'cm', toBase: v => v * 0.01, fromBase: v => v / 0.01 },
      { id: 'mm', name: 'Millimeter', symbol: 'mm', toBase: v => v * 0.001, fromBase: v => v / 0.001 },
      { id: 'um', name: 'Micrometer', symbol: 'µm', toBase: v => v * 1e-6, fromBase: v => v / 1e-6 },
      { id: 'nm', name: 'Nanometer', symbol: 'nm', toBase: v => v * 1e-9, fromBase: v => v / 1e-9 },
      { id: 'mi', name: 'Mile', symbol: 'mi', toBase: v => v * 1609.344, fromBase: v => v / 1609.344 },
      { id: 'yd', name: 'Yard', symbol: 'yd', toBase: v => v * 0.9144, fromBase: v => v / 0.9144 },
      { id: 'ft', name: 'Foot', symbol: 'ft', toBase: v => v * 0.3048, fromBase: v => v / 0.3048 },
      { id: 'in', name: 'Inch', symbol: 'in', toBase: v => v * 0.0254, fromBase: v => v / 0.0254 },
      { id: 'nmi', name: 'Nautical Mile', symbol: 'NM', toBase: v => v * 1852, fromBase: v => v / 1852 },
    ],
  },
  {
    id: 'area',
    name: 'Area',
    iconName: 'Square',
    baseUnit: 'm2',
    units: [
      { id: 'sq_km', name: 'Square Kilometer', symbol: 'km²', toBase: v => v * 1e6, fromBase: v => v / 1e6 },
      { id: 'sq_m', name: 'Square Meter', symbol: 'm²', toBase: v => v, fromBase: v => v },
      { id: 'sq_cm', name: 'Square Centimeter', symbol: 'cm²', toBase: v => v * 0.0001, fromBase: v => v / 0.0001 },
      { id: 'sq_mm', name: 'Square Millimeter', symbol: 'mm²', toBase: v => v * 1e-6, fromBase: v => v / 1e-6 },
      { id: 'ha', name: 'Hectare', symbol: 'ha', toBase: v => v * 10000, fromBase: v => v / 10000 },
      { id: 'ac', name: 'Acre', symbol: 'ac', toBase: v => v * 4046.8564224, fromBase: v => v / 4046.8564224 },
      { id: 'sq_mi', name: 'Square Mile', symbol: 'sq mi', toBase: v => v * 2589988.110336, fromBase: v => v / 2589988.110336 },
      { id: 'sq_yd', name: 'Square Yard', symbol: 'sq yd', toBase: v => v * 0.83612736, fromBase: v => v / 0.83612736 },
      { id: 'sq_ft', name: 'Square Foot', symbol: 'sq ft', toBase: v => v * 0.09290304, fromBase: v => v / 0.09290304 },
      { id: 'sq_in', name: 'Square Inch', symbol: 'sq in', toBase: v => v * 0.00064516, fromBase: v => v / 0.00064516 },
    ],
  },
  {
    id: 'mass',
    name: 'Mass',
    iconName: 'Scale',
    baseUnit: 'kg',
    units: [
      { id: 't', name: 'Metric Ton', symbol: 't', toBase: v => v * 1000, fromBase: v => v / 1000 },
      { id: 'kg', name: 'Kilogram', symbol: 'kg', toBase: v => v, fromBase: v => v },
      { id: 'g', name: 'Gram', symbol: 'g', toBase: v => v * 0.001, fromBase: v => v / 0.001 },
      { id: 'mg', name: 'Milligram', symbol: 'mg', toBase: v => v * 1e-6, fromBase: v => v / 1e-6 },
      { id: 'ug', name: 'Microgram', symbol: 'µg', toBase: v => v * 1e-9, fromBase: v => v / 1e-9 },
      { id: 'lb', name: 'Pound', symbol: 'lb', toBase: v => v * 0.45359237, fromBase: v => v / 0.45359237 },
      { id: 'oz', name: 'Ounce', symbol: 'oz', toBase: v => v * 0.028349523125, fromBase: v => v / 0.028349523125 },
      { id: 'st', name: 'Stone', symbol: 'st', toBase: v => v * 6.35029318, fromBase: v => v / 6.35029318 },
      { id: 'us_ton', name: 'US Ton (Short Ton)', symbol: 'US ton', toBase: v => v * 907.18474, fromBase: v => v / 907.18474 },
      { id: 'imp_ton', name: 'Imperial Ton (Long Ton)', symbol: 'UK ton', toBase: v => v * 1016.0469088, fromBase: v => v / 1016.0469088 },
    ],
  },
  {
    id: 'temperature',
    name: 'Temperature',
    iconName: 'Thermometer',
    baseUnit: 'C',
    units: [
      { id: 'c', name: 'Celsius', symbol: '°C', toBase: v => v, fromBase: v => v },
      { id: 'f', name: 'Fahrenheit', symbol: '°F', toBase: v => (v - 32) * (5 / 9), fromBase: v => (v * 9 / 5) + 32 },
      { id: 'k', name: 'Kelvin', symbol: 'K', toBase: v => v - 273.15, fromBase: v => v + 273.15 },
    ],
  },
  {
    id: 'volume',
    name: 'Volume',
    iconName: 'FlaskConical',
    baseUnit: 'L',
    units: [
      { id: 'm3', name: 'Cubic Meter', symbol: 'm³', toBase: v => v * 1000, fromBase: v => v / 1000 },
      { id: 'l', name: 'Liter', symbol: 'L', toBase: v => v, fromBase: v => v },
      { id: 'ml', name: 'Milliliter', symbol: 'mL', toBase: v => v * 0.001, fromBase: v => v / 0.001 },
      { id: 'gal_us', name: 'Gallon (US)', symbol: 'gal', toBase: v => v * 3.785411784, fromBase: v => v / 3.785411784 },
      { id: 'qt_us', name: 'Quart (US)', symbol: 'qt', toBase: v => v * 0.946352946, fromBase: v => v / 0.946352946 },
      { id: 'pt_us', name: 'Pint (US)', symbol: 'pt', toBase: v => v * 0.473176473, fromBase: v => v / 0.473176473 },
      { id: 'cup_us', name: 'Cup (US)', symbol: 'cup', toBase: v => v * 0.2365882365, fromBase: v => v / 0.2365882365 },
      { id: 'floz_us', name: 'Fluid Ounce (US)', symbol: 'fl oz', toBase: v => v * 0.0295735295625, fromBase: v => v / 0.0295735295625 },
      { id: 'cu_ft', name: 'Cubic Foot', symbol: 'ft³', toBase: v => v * 28.316846592, fromBase: v => v / 28.316846592 },
      { id: 'cu_in', name: 'Cubic Inch', symbol: 'in³', toBase: v => v * 0.016387064, fromBase: v => v / 0.016387064 },
    ],
  },
  {
    id: 'data',
    name: 'Data',
    iconName: 'Database',
    baseUnit: 'B',
    units: [
      { id: 'bit', name: 'Bit', symbol: 'b', toBase: v => v / 8, fromBase: v => v * 8 },
      { id: 'byte', name: 'Byte', symbol: 'B', toBase: v => v, fromBase: v => v },
      { id: 'kb', name: 'Kilobyte', symbol: 'KB', toBase: v => v * 1024, fromBase: v => v / 1024 },
      { id: 'mb', name: 'Megabyte', symbol: 'MB', toBase: v => v * 1024 * 1024, fromBase: v => v / (1024 * 1024) },
      { id: 'gb', name: 'Gigabyte', symbol: 'GB', toBase: v => v * Math.pow(1024, 3), fromBase: v => v / Math.pow(1024, 3) },
      { id: 'tb', name: 'Terabyte', symbol: 'TB', toBase: v => v * Math.pow(1024, 4), fromBase: v => v / Math.pow(1024, 4) },
      { id: 'pb', name: 'Petabyte', symbol: 'PB', toBase: v => v * Math.pow(1024, 5), fromBase: v => v / Math.pow(1024, 5) },
    ],
  },
  {
    id: 'speed',
    name: 'Speed',
    iconName: 'Gauge',
    baseUnit: 'm_s',
    units: [
      { id: 'm_s', name: 'Meter per second', symbol: 'm/s', toBase: v => v, fromBase: v => v },
      { id: 'km_h', name: 'Kilometer per hour', symbol: 'km/h', toBase: v => v / 3.6, fromBase: v => v * 3.6 },
      { id: 'mph', name: 'Mile per hour', symbol: 'mph', toBase: v => v * 0.44704, fromBase: v => v / 0.44704 },
      { id: 'knot', name: 'Knot', symbol: 'kn', toBase: v => v * 0.514444444, fromBase: v => v / 0.514444444 },
      { id: 'ft_s', name: 'Foot per second', symbol: 'ft/s', toBase: v => v * 0.3048, fromBase: v => v / 0.3048 },
    ],
  },
  {
    id: 'time',
    name: 'Time',
    iconName: 'Clock',
    baseUnit: 's',
    units: [
      { id: 'ns', name: 'Nanosecond', symbol: 'ns', toBase: v => v * 1e-9, fromBase: v => v / 1e-9 },
      { id: 'us', name: 'Microsecond', symbol: 'µs', toBase: v => v * 1e-6, fromBase: v => v / 1e-6 },
      { id: 'ms', name: 'Millisecond', symbol: 'ms', toBase: v => v * 0.001, fromBase: v => v / 0.001 },
      { id: 's', name: 'Second', symbol: 's', toBase: v => v, fromBase: v => v },
      { id: 'min', name: 'Minute', symbol: 'min', toBase: v => v * 60, fromBase: v => v / 60 },
      { id: 'h', name: 'Hour', symbol: 'h', toBase: v => v * 3600, fromBase: v => v / 3600 },
      { id: 'd', name: 'Day', symbol: 'd', toBase: v => v * 86400, fromBase: v => v / 86400 },
      { id: 'wk', name: 'Week', symbol: 'wk', toBase: v => v * 604800, fromBase: v => v / 604800 },
      { id: 'mo', name: 'Month (30 d)', symbol: 'mo', toBase: v => v * 2592000, fromBase: v => v / 2592000 },
      { id: 'yr', name: 'Year (365 d)', symbol: 'yr', toBase: v => v * 31536000, fromBase: v => v / 31536000 },
    ],
  },
];

export function convertUnit(
  val: number,
  fromUnitId: string,
  toUnitId: string,
  categoryConfig: UnitCategoryConfig
): number {
  if (fromUnitId === toUnitId) return val;
  const fromUnit = categoryConfig.units.find(u => u.id === fromUnitId);
  const toUnit = categoryConfig.units.find(u => u.id === toUnitId);
  if (!fromUnit || !toUnit) return 0;

  const inBase = fromUnit.toBase(val);
  return toUnit.fromBase(inBase);
}

export function formatUnitNumber(num: number): string {
  if (isNaN(num)) return '0';
  if (num === 0) return '0';

  // For very small or very large
  if (Math.abs(num) < 1e-6 || Math.abs(num) >= 1e12) {
    return num.toExponential(4);
  }

  // Round smartly to up to 8 decimal places
  const fixed = Number(num.toFixed(6));
  const parts = fixed.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}
