/**
 * Format a number as Chinese Yuan currency.
 * Automatically uses 万 (10k) or 亿 (100M) units for large values.
 *
 * @param value - Amount in yuan
 * @param precision - Decimal places (default: 2)
 * @returns Formatted string like "¥1,234.56" / "¥12.50万" / "¥3.28亿"
 */
export function formatCurrency(value: number, precision = 2): string {
  const abs = Math.abs(value)
  const sign = value < 0 ? '-' : ''

  if (abs >= 1_0000_0000) {
    // 亿
    return `${sign}¥${(abs / 1_0000_0000).toFixed(precision)}亿`
  }

  if (abs >= 1_0000) {
    // 万
    return `${sign}¥${(abs / 1_0000).toFixed(precision)}万`
  }

  return `${sign}¥${abs.toLocaleString('zh-CN', {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  })}`
}

/**
 * Format a number as a percentage string.
 *
 * @param value - The ratio (e.g., 0.1234 for 12.34%)
 * @param precision - Decimal places (default: 2)
 * @param multiply - Whether to multiply by 100 (default: true, assumes value is a ratio)
 */
export function formatPercent(value: number, precision = 2, multiply = true): string {
  const pct = multiply ? value * 100 : value
  return `${pct >= 0 ? '' : ''}${pct.toFixed(precision)}%`
}

/**
 * Format a Date or timestamp to a Chinese-friendly date string.
 *
 * @param date - Date object, ISO string, or unix timestamp (ms)
 * @param format - 'date' | 'datetime' | 'short' (default: 'date')
 */
export function formatDate(
  date: Date | string | number,
  format: 'date' | 'datetime' | 'short' = 'date',
): string {
  const d = date instanceof Date ? date : new Date(date)

  if (isNaN(d.getTime())) return '-'

  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')

  switch (format) {
    case 'datetime':
      return `${year}-${month}-${day} ${hours}:${minutes}`
    case 'short':
      return `${month}-${day} ${hours}:${minutes}`
    case 'date':
    default:
      return `${year}-${month}-${day}`
  }
}

/**
 * Format a number with locale-aware thousand separators.
 *
 * @param value - Numeric value
 * @param precision - Decimal places (default: 0)
 */
export function formatNumber(value: number, precision = 0): string {
  return value.toLocaleString('zh-CN', {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  })
}
