export function parseDateInput(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day ? date : null
}

export function isDateRangeValid(start: string, end: string): boolean {
  if (!start || !end) return true
  const startDate = parseDateInput(start)
  const endDate = parseDateInput(end)
  return Boolean(startDate && endDate && endDate >= startDate)
}
