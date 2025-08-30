/**
 * Format a number into the given currency for the current locale.  If no
 * currency is provided the function falls back to USD.  Uses the
 * built‑in `Intl.NumberFormat` API.  When run on the server this will
 * default to `en-US` formatting.
 */
export function toCurrency(value: number, currency: string = 'USD'): string {
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency
    }).format(value);
  } catch {
    // Fallback formatting when Intl fails
    return `${currency} ${value.toFixed(2)}`;
  }
}