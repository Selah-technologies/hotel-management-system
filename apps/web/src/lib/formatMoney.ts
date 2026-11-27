import type { Money } from '../types'

/** Formats an amount exactly as the API returned it. No arithmetic happens here. */
export function formatMoney(money: Money): string {
  const n = Number(money.amount)
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: money.currency }).format(n)
  } catch {
    return `${money.amount} ${money.currency}`
  }
}
