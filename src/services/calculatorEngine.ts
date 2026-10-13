/**
 * Samsung Calculator evaluation engine with One UI percentage behavior,
 * smart parentheses, real-time preview, and clean formatting.
 */

export interface EvaluationResult {
  value: string;
  isError: boolean;
  errorMessage?: string;
}

// Convert display symbols to executable JS math expression
export function formatForDisplay(expr: string): string {
  // Replace * with ×, / with ÷
  return expr
    .replace(/\*/g, '×')
    .replace(/\//g, '÷');
}

export function formatResultNumber(num: number): string {
  if (isNaN(num)) return 'Error';
  if (!isFinite(num)) return 'Cannot divide by zero';

  // Avoid scientific notation for reasonably sized numbers
  if (Math.abs(num) < 1e14 && Math.abs(num) > 1e-10) {
    // Round to max 10 decimal places to eliminate floating point glitches like 0.30000000000000004
    const rounded = parseFloat(num.toPrecision(12));
    const parts = rounded.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }

  // Handle zero
  if (num === 0) return '0';

  // Very large or very small numbers
  return num.toExponential(6).replace('e+', 'e');
}

/**
 * Smartly evaluates expressions supporting:
 * - standard +, -, ×, ÷
 * - Samsung percentage: e.g. "100 + 10%" -> 110, "50 × 20%" -> 10, "100 - 5%" -> 95
 * - Balanced or auto-closing parentheses
 */
export function evaluateExpression(rawExpression: string, isPreview = false): EvaluationResult {
  if (!rawExpression || rawExpression.trim() === '') {
    return { value: '', isError: false };
  }

  let expr = rawExpression
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/,/g, '');

  // If preview and ends with an operator, strip trailing operators to try evaluating
  if (isPreview) {
    expr = expr.replace(/[\+\-\*\/]+$/, '');
    if (!expr) return { value: '', isError: false };
  }

  // Count open and close parentheses
  let openCount = 0;
  for (const ch of expr) {
    if (ch === '(') openCount++;
    if (ch === ')') openCount--;
  }

  // Automatically close unclosed parentheses
  while (openCount > 0) {
    expr += ')';
    openCount--;
  }

  // Handle Samsung percentage pattern:
  // 1) Number + Number%  => Number + (Number * (Percent / 100))
  // 2) Number - Number%  => Number - (Number * (Percent / 100))
  // 3) Number * Number%  => Number * (Percent / 100)
  // 4) Number / Number%  => Number / (Percent / 100)
  // 5) Standalone Number% => (Number / 100)
  expr = expr.replace(/(\d+(?:\.\d+)?)\s*([\+\-])\s*(\d+(?:\.\d+)?)%/g, '($1 $2 ($1 * $3 / 100))');
  expr = expr.replace(/(\d+(?:\.\d+)?)%/g, '($1 / 100)');

  // Validate characters for safety
  if (!/^[0-9\+\-\*\/\.\(\)\s]+$/.test(expr)) {
    return { value: '', isError: true, errorMessage: 'Invalid characters' };
  }

  // Check for division by zero before evaluation
  if (/\/\s*0(?![0-9\.])/.test(expr)) {
    return { value: 'Cannot divide by zero', isError: true, errorMessage: 'Cannot divide by zero' };
  }

  try {
    // Safe mathematical function evaluation
    const fn = new Function(`"use strict"; return (${expr});`);
    const result = fn();

    if (typeof result !== 'number' || isNaN(result)) {
      return { value: '', isError: true, errorMessage: 'Error' };
    }

    if (!isFinite(result)) {
      return { value: 'Cannot divide by zero', isError: true, errorMessage: 'Cannot divide by zero' };
    }

    return { value: formatResultNumber(result), isError: false };
  } catch {
    return { value: '', isError: true, errorMessage: 'Syntax error' };
  }
}

/**
 * Helper to determine what to insert when the '()' parentheses key is pressed
 */
export function getSmartParenthesis(expr: string): string {
  if (!expr || expr === '0') return '(';

  const lastChar = expr[expr.length - 1];
  
  // Count balance
  let openCount = 0;
  for (const ch of expr) {
    if (ch === '(') openCount++;
    if (ch === ')') openCount--;
  }

  // If last char is digit or ')' and we have unclosed open parentheses, close it
  if (/[\d\)]/.test(lastChar) && openCount > 0) {
    return ')';
  }

  // If last char is an operator or '(', open new parenthesis
  if (/[\+\-×÷\(]/.test(lastChar)) {
    return '(';
  }

  // If last char is digit and all parens are closed, imply multiplication
  if (/[\d]/.test(lastChar) && openCount === 0) {
    return '×(';
  }

  return '(';
}

/**
 * Helper for +/- sign toggle on the current trailing number
 */
export function toggleSign(expr: string): string {
  if (!expr || expr === '0') return '-';

  // Find the last number token in the expression
  const match = expr.match(/(.*?)([\+\-×÷\(]?\s*)(\-?\d+(?:\.\d+)?)$/);
  if (!match) return expr;

  const prefix = match[1];
  const operator = match[2];
  const numberStr = match[3];

  if (numberStr.startsWith('-')) {
    // Remove negative
    const positiveStr = numberStr.substring(1);
    return `${prefix}${operator}${positiveStr}`;
  } else {
    // Negate: if preceded by open paren or start, just add -
    if (operator.trim() === '-' && prefix) {
      // Toggle minus to plus
      return `${prefix}+ ${numberStr}`;
    }
    if (operator.trim() === '+' && prefix) {
      return `${prefix}- ${numberStr}`;
    }
    return `${prefix}${operator}(-${numberStr})`;
  }
}
