// Formats a number as Indian Rupees, e.g. 24850 -> ₹24,850
export function rupees(amount) {
  const rounded = Math.round(Number(amount) || 0)
  return '₹' + rounded.toLocaleString('en-IN')
}

// Formats an ISO date string into "12 Mar 2026, 7:30 pm"
export function formatDate(isoString) {
  const date = new Date(isoString)
  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// True if the given date is today (used for today's revenue).
export function isToday(isoString) {
  const date = new Date(isoString)
  const now = new Date()
  return date.toDateString() === now.toDateString()
}
