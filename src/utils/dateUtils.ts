/**
 * Date and calculation helper functions matching Excel logic
 */

export function parseDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function formatDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDisplayDate(dateStr: string): string {
  if (!dateStr) return '';
  return dateStr.replace(/-/g, '/');
}

export function formatShortDate(dateStr: string): string {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length < 3) return dateStr;
  return `${parts[1]}/${parts[2]}`;
}

/**
 * Add days to YYYY-MM-DD string
 */
export function addDays(dateStr: string, days: number): string {
  const d = parseDate(dateStr);
  d.setDate(d.getDate() + days);
  return formatDate(d);
}

/**
 * Calculate calendar days: End - Start + 1
 */
export function calculateCalendarDays(startDateStr: string, endDateStr: string): number {
  if (!startDateStr || !endDateStr) return 0;
  const start = parseDate(startDateStr);
  const end = parseDate(endDateStr);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= 0 ? diffDays + 1 : 0;
}

/**
 * Calculate standard workdays (Monday-Friday) matching Excel NETWORKDAYS.INTL(..., 1)
 */
export function calculateWorkDays(startDateStr: string, endDateStr: string): number {
  if (!startDateStr || !endDateStr) return 0;
  const start = parseDate(startDateStr);
  const end = parseDate(endDateStr);
  if (end < start) return 0;

  let count = 0;
  const cur = new Date(start.getTime());
  while (cur <= end) {
    const dayOfWeek = cur.getDay(); // 0 is Sunday, 6 is Saturday
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      count++;
    }
    cur.setDate(cur.getDate() + 1);
  }
  return count;
}

/**
 * Calculate end of horizon date: EDATE(StartDate, HorizonMonths) - 1
 */
export function calculateHorizonEndDate(startDateStr: string, months: number): string {
  const start = parseDate(startDateStr);
  const end = new Date(start.getFullYear(), start.getMonth() + months, start.getDate() - 1);
  return formatDate(end);
}

/**
 * Generate 52 weeks from start date (which should be Monday)
 */
export function generateWeeks(startDateStr: string, totalWeeks: number = 52) {
  const weeks = [];
  for (let i = 0; i < totalWeeks; i++) {
    const weekStart = addDays(startDateStr, i * 7);
    const weekEnd = addDays(weekStart, 6);
    const parts = weekStart.split('-');
    const monthLabel = `${parts[0]}-${parts[1]}`;
    weeks.push({
      index: i + 1,
      label: `W${String(i + 1).padStart(2, '0')}`,
      start: weekStart,
      end: weekEnd,
      month: monthLabel,
    });
  }
  return weeks;
}

/**
 * Check if a job overlaps with a week [weekStart, weekEnd]
 * Formula: JobStart <= WeekEnd && JobEnd >= WeekStart
 */
export function isJobInWeek(
  jobStartStr: string,
  jobEndStr: string,
  weekStartStr: string,
  weekEndStr: string
): boolean {
  if (!jobStartStr || !jobEndStr) return false;
  return jobStartStr <= weekEndStr && jobEndStr >= weekStartStr;
}
