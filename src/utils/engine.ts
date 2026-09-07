import {
  SetupParams,
  JobItem,
  ComputedJobItem,
  WeekPlan,
  MonthSummary,
  DashboardMetrics,
  OverloadEvent,
  OpenSlot,
} from '../types';
import {
  calculateCalendarDays,
  calculateWorkDays,
  calculateHorizonEndDate,
  generateWeeks,
  isJobInWeek,
  formatDisplayDate,
} from './dateUtils';

export function computeJob(
  job: JobItem,
  planningStartDate: string,
  horizonEndDate: string
): ComputedJobItem {
  const calendarDays = calculateCalendarDays(job.startDate, job.endDate);
  const workDays = calculateWorkDays(job.startDate, job.endDate);
  const totalManDays = workDays * (job.crewRequired || 0);

  const isStatusValid = job.status === 'Planned' || job.status === 'Active';
  const isDateValid =
    Boolean(job.startDate && job.endDate) &&
    job.endDate >= planningStartDate &&
    job.startDate <= horizonEndDate &&
    job.endDate >= job.startDate;

  const includeInPlan = isStatusValid && isDateValid;

  return {
    ...job,
    calendarDays,
    workDays,
    totalManDays,
    includeInPlan,
  };
}

export function computeAll(
  jobs: JobItem[],
  params: SetupParams
): {
  computedJobs: ComputedJobItem[];
  horizonEndDate: string;
  totalWeeksCount: number;
  weeklyCapacityManDays: number;
  weekPlans: WeekPlan[];
  monthSummaries: MonthSummary[];
  metrics: DashboardMetrics;
  overloadEvents: OverloadEvent[];
  openSlots: OpenSlot[];
} {
  const horizonEndDate = calculateHorizonEndDate(params.planningStartDate, params.horizonMonths);
  const totalWeeksCount = 52; // Standard 12-month sequence
  const weeklyCapacityManDays = (params.crewSize || 0) * (params.workDaysPerWeek || 5);

  // 1. Compute jobs
  const computedJobs = jobs.map((job) => computeJob(job, params.planningStartDate, horizonEndDate));
  const validJobs = computedJobs.filter((j) => j.includeInPlan);

  // 2. Generate 52 Weeks
  const rawWeeks = generateWeeks(params.planningStartDate, totalWeeksCount);

  const weekPlans: WeekPlan[] = rawWeeks.map((w) => {
    const activeInWeek = validJobs.filter((job) =>
      isJobInWeek(job.startDate, job.endDate, w.start, w.end)
    );

    const activeJobsCount = activeInWeek.length;
    const activeJobIds = activeInWeek.map((j) => j.id);
    const totalAllocatedCrew = activeInWeek.reduce((sum, j) => sum + (j.crewRequired || 0), 0);
    const availableCapacity = params.crewSize || 11;
    const netCapacityGap = availableCapacity - totalAllocatedCrew;
    const utilization = availableCapacity > 0 ? totalAllocatedCrew / availableCapacity : 0;

    let status: 'OPEN' | 'FULL' | 'OVERLOAD' = 'OPEN';
    if (totalAllocatedCrew > availableCapacity) {
      status = 'OVERLOAD';
    } else if (utilization >= params.nearCapRate) {
      status = 'FULL';
    } else {
      status = 'OPEN';
    }

    const staffShortage = Math.max(0, totalAllocatedCrew - availableCapacity);

    return {
      weekIndex: w.index,
      weekLabel: w.label,
      weekStart: w.start,
      weekEnd: w.end,
      monthLabel: w.month,
      activeJobsCount,
      activeJobIds,
      totalAllocatedCrew,
      availableCapacity,
      netCapacityGap,
      utilization,
      status,
      staffShortage,
    };
  });

  // 3. Compute Monthly Summaries
  const monthMap = new Map<
    string,
    {
      weeks: WeekPlan[];
    }
  >();

  weekPlans.forEach((wp) => {
    if (!monthMap.has(wp.monthLabel)) {
      monthMap.set(wp.monthLabel, { weeks: [] });
    }
    monthMap.get(wp.monthLabel)!.weeks.push(wp);
  });

  const monthSummaries: MonthSummary[] = Array.from(monthMap.entries()).map(([month, data]) => {
    const totalWeeks = data.weeks.length;
    const availableManWeeks = totalWeeks * params.crewSize;
    const allocatedManWeeks = data.weeks.reduce((acc, w) => acc + w.totalAllocatedCrew, 0);
    const avgUtilization = availableManWeeks > 0 ? allocatedManWeeks / availableManWeeks : 0;

    let statusText = 'Optimal Balance';
    let isOverload = false;
    let isNearCap = false;

    if (avgUtilization > 1.0) {
      statusText = '🚨 Overload Risk';
      isOverload = true;
    } else if (avgUtilization >= params.nearCapRate) {
      statusText = '⚠️ High Saturation';
      isNearCap = true;
    } else if (avgUtilization < 0.45) {
      statusText = 'High Slack Capacity';
    } else {
      statusText = 'Healthy Operating';
    }

    return {
      month,
      totalWeeks,
      availableManWeeks,
      allocatedManWeeks,
      avgUtilization,
      statusText,
      isOverload,
      isNearCap,
    };
  });

  // 4. Compute Dashboard Metrics
  const next4Weeks = weekPlans.slice(0, 4);
  const next4WeeksAvgUtilization =
    next4Weeks.length > 0
      ? next4Weeks.reduce((sum, w) => sum + w.utilization, 0) / next4Weeks.length
      : 0;

  const firstOverloadWeek = weekPlans.find((w) => w.status === 'OVERLOAD');
  const nextCapacityGapWeek = firstOverloadWeek
    ? `${firstOverloadWeek.weekLabel} (${formatDisplayDate(firstOverloadWeek.weekStart)})`
    : null;
  const nextGapDate = firstOverloadWeek ? firstOverloadWeek.weekStart : null;
  const weeksUntilNextGap = firstOverloadWeek ? firstOverloadWeek.weekIndex - 1 : null;

  const overloadWeeks = weekPlans.filter((w) => w.status === 'OVERLOAD');
  const totalOverloadWeeks = overloadWeeks.length;
  const overloadPercentage = (totalOverloadWeeks / totalWeeksCount) * 100;

  let peakShortage = 0;
  let peakShortageWeek: string | null = null;
  let peakShortageDate: string | null = null;

  weekPlans.forEach((w) => {
    if (w.staffShortage > peakShortage) {
      peakShortage = w.staffShortage;
      peakShortageWeek = w.weekLabel;
      peakShortageDate = w.weekStart;
    }
  });

  const metrics: DashboardMetrics = {
    coreCrew: params.crewSize,
    next4WeeksAvgUtilization,
    nextCapacityGapWeek,
    nextGapDate,
    weeksUntilNextGap,
    totalOverloadWeeks,
    overloadPercentage,
    peakShortage,
    peakShortageWeek,
    peakShortageDate,
    totalActiveProjects: validJobs.length,
  };

  // 5. Overload Events (Action Queue)
  const overloadEvents: OverloadEvent[] = overloadWeeks.map((ow) => {
    let recommendation = `Deploy ${ow.staffShortage} external temp ${params.unitLabel.toLowerCase()}`;
    if (ow.staffShortage >= 3) {
      recommendation = `Activate subcontracting agreement or reschedule lower priority jobs (Shortage: ${ow.staffShortage})`;
    }
    return {
      weekLabel: ow.weekLabel,
      weekStart: ow.weekStart,
      allocatedCrew: ow.totalAllocatedCrew,
      capacity: ow.availableCapacity,
      shortage: ow.staffShortage,
      recommendation,
    };
  });

  // 6. Open Slots (Sales Opportunities)
  const openSlots: OpenSlot[] = [];
  let currentRun: WeekPlan[] = [];

  weekPlans.forEach((w) => {
    // A slot qualifies if status is OPEN and surplus capacity is noticeable
    if (w.status === 'OPEN' && w.netCapacityGap >= 3) {
      currentRun.push(w);
    } else {
      if (currentRun.length >= params.minFillSlot) {
        const first = currentRun[0];
        const minFree = Math.min(...currentRun.map((r) => r.netCapacityGap));
        const duration = currentRun.length;
        let recommendedType = 'Fast turnaround repaint or touch-up work';
        if (minFree >= 6 && duration >= 3) {
          recommendedType = 'Whole-building exterior repaint / Major commercial contract';
        } else if (minFree >= 4 && duration >= 2) {
          recommendedType = 'Multi-unit residential or office floor renovation';
        }
        openSlots.push({
          weekLabel: `${first.weekLabel}${duration > 1 ? ` - ${currentRun[currentRun.length - 1].weekLabel}` : ''}`,
          weekStart: first.weekStart,
          freeCrew: minFree,
          consecutiveWeeks: duration,
          recommendedType,
        });
      }
      currentRun = [];
    }
  });

  if (currentRun.length >= params.minFillSlot) {
    const first = currentRun[0];
    const minFree = Math.min(...currentRun.map((r) => r.netCapacityGap));
    const duration = currentRun.length;
    openSlots.push({
      weekLabel: `${first.weekLabel}${duration > 1 ? ` - ${currentRun[currentRun.length - 1].weekLabel}` : ''}`,
      weekStart: first.weekStart,
      freeCrew: minFree,
      consecutiveWeeks: duration,
      recommendedType: minFree >= 6 ? 'Major commercial contract' : 'Maintenance & minor touch-up jobs',
    });
  }

  return {
    computedJobs,
    horizonEndDate,
    totalWeeksCount,
    weeklyCapacityManDays,
    weekPlans,
    monthSummaries,
    metrics,
    overloadEvents,
    openSlots,
  };
}
