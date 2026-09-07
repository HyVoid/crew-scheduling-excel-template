export type JobStatus = 'Planned' | 'Active' | 'On Hold' | 'Completed';
export type JobPriority = 'High' | 'Medium' | 'Low';
export type CapacityStatus = 'OPEN' | 'FULL' | 'OVERLOAD';

export interface SetupParams {
  crewSize: number;           // Param_CrewSize (e.g. 11)
  workDaysPerWeek: number;    // Param_WorkDays (e.g. 5)
  planningStartDate: string;  // Param_StartDate (YYYY-MM-DD, e.g. "2026-09-07")
  horizonMonths: number;      // Param_HorizonM (e.g. 12)
  nearCapRate: number;        // Param_NearCapRate (e.g. 0.90)
  leadTimeWeeks: number;      // Param_LeadTimeWeeks (e.g. 4)
  minFillSlot: number;        // Param_MinFillSlot (e.g. 1)
  currencySymbol: string;     // Param_Currency (e.g. "$")
  unitLabel: string;          // Param_UnitLabel (e.g. "Painters")
}

export interface JobItem {
  id: string;                 // J-26-001
  name: string;               // Project name
  startDate: string;          // YYYY-MM-DD
  endDate: string;            // YYYY-MM-DD
  crewRequired: number;       // Required crew count
  status: JobStatus;
  priority: JobPriority;
}

export interface ComputedJobItem extends JobItem {
  calendarDays: number;
  workDays: number;
  totalManDays: number;
  includeInPlan: boolean;
}

export interface WeekPlan {
  weekIndex: number;          // 1 .. 52
  weekLabel: string;          // "W01" .. "W52"
  weekStart: string;          // YYYY-MM-DD
  weekEnd: string;            // YYYY-MM-DD
  monthLabel: string;         // YYYY-MM
  activeJobsCount: number;
  activeJobIds: string[];
  totalAllocatedCrew: number;
  availableCapacity: number;
  netCapacityGap: number;     // available - allocated (+ is surplus, - is shortage)
  utilization: number;        // allocated / available
  status: CapacityStatus;     // OPEN / FULL / OVERLOAD
  staffShortage: number;      // max(0, allocated - available)
}

export interface MonthSummary {
  month: string;              // YYYY-MM
  totalWeeks: number;
  availableManWeeks: number;
  allocatedManWeeks: number;
  avgUtilization: number;
  statusText: string;
  isOverload: boolean;
  isNearCap: boolean;
}

export interface DashboardMetrics {
  coreCrew: number;
  next4WeeksAvgUtilization: number;
  nextCapacityGapWeek: string | null;
  nextGapDate: string | null;
  weeksUntilNextGap: number | null;
  totalOverloadWeeks: number;
  overloadPercentage: number;
  peakShortage: number;
  peakShortageWeek: string | null;
  peakShortageDate: string | null;
  totalActiveProjects: number;
}

export interface OverloadEvent {
  weekLabel: string;
  weekStart: string;
  allocatedCrew: number;
  capacity: number;
  shortage: number;
  recommendation: string;
}

export interface OpenSlot {
  weekLabel: string;
  weekStart: string;
  freeCrew: number;
  consecutiveWeeks: number;
  recommendedType: string;
}

export interface AppState {
  params: SetupParams;
  jobs: JobItem[];
  lastSaved: string | null;
}
