import React, { useState } from 'react';
import {
  DashboardMetrics,
  MonthSummary,
  OverloadEvent,
  OpenSlot,
  SetupParams,
  WeekPlan,
} from '../types';
import {
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Users,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Search,
  Check,
  TrendingUp,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { formatDisplayDate, formatShortDate } from '../utils/dateUtils';

interface DashboardViewProps {
  metrics: DashboardMetrics;
  monthSummaries: MonthSummary[];
  overloadEvents: OverloadEvent[];
  openSlots: OpenSlot[];
  params: SetupParams;
  weekPlans: WeekPlan[];
  onNavigateToJobs: () => void;
  onNavigateToTimeline: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  metrics,
  monthSummaries,
  overloadEvents,
  openSlots,
  params,
  weekPlans,
  onNavigateToJobs,
  onNavigateToTimeline,
}) => {
  // Interactive What-If Simulator state
  const [simCrew, setSimCrew] = useState<number>(3);
  const [simWeeks, setSimWeeks] = useState<number>(2);
  const [simStartWeek, setSimStartWeek] = useState<number>(1);

  // Evaluate What-If Simulation
  const evaluateSimulation = () => {
    const endWeek = Math.min(weekPlans.length, simStartWeek + simWeeks - 1);
    const affectedWeeks = weekPlans.slice(simStartWeek - 1, endWeek);
    const conflicts = affectedWeeks.filter((w) => w.totalAllocatedCrew + simCrew > w.availableCapacity);
    const hasConflict = conflicts.length > 0;
    const maxNewLoad = Math.max(...affectedWeeks.map((w) => w.totalAllocatedCrew + simCrew));
    const maxShortage = Math.max(0, maxNewLoad - params.crewSize);

    return {
      hasConflict,
      conflictCount: conflicts.length,
      conflicts,
      maxNewLoad,
      maxShortage,
      startLabel: weekPlans[simStartWeek - 1]?.weekLabel || 'W01',
      endLabel: weekPlans[endWeek - 1]?.weekLabel || 'W52',
    };
  };

  const simResult = evaluateSimulation();

  return (
    <div id="view-dashboard-container" className="view-fade-up space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)] mb-1">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Sheet 04_DASHBOARD • Executive Decision Compass</span>
          </div>
          <h1 className="font-garamond text-3xl font-bold text-[var(--color-primary)] tracking-display">
            Capacity Decision & Staffing Intelligence Compass
          </h1>
          <p className="text-slate-500 mt-1 max-w-2xl">
            Synthesized operational intelligence for executive leadership. Answers three fundamental questions: Where are we full? Where do we have capacity? When do we need more people?
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onNavigateToTimeline}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-[var(--color-primary)] rounded-lg text-xs font-semibold shadow-[var(--shadow-sm)] transition-all cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[var(--color-accent)]" />
            <span>Open Timeline Sandbox</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: Five Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {/* KPI 1: Core Crew Size */}
        <div className="card p-5 flex flex-col justify-between">
          <p className="text-[#888888] font-medium text-xs">
            Core Crew Baseline
          </p>
          <div className="my-1.5">
            <h2 className="garamond text-3xl font-bold text-[#051C2C] mt-1">
              {metrics.coreCrew}
            </h2>
            <p className="text-xs text-[#888888] mt-0.5">{params.unitLabel} permanently rostered</p>
          </div>
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-[#888888]">
            <span>Capacity base</span>
            <span className="font-mono text-[#051C2C] font-semibold">{params.crewSize * params.workDaysPerWeek} d/wk</span>
          </div>
        </div>

        {/* KPI 2: Next 4 Weeks Average Load */}
        <div className="card p-5 flex flex-col justify-between">
          <p className="text-[#888888] font-medium text-xs">
            Next 4 Weeks Avg Load
          </p>
          <div className="my-1.5">
            <h2 className={`garamond text-3xl font-bold mt-1 ${metrics.next4WeeksAvgUtilization > 1.0 ? 'text-[#D32F2F]' : 'text-[#2251FF]'}`}>
              {(metrics.next4WeeksAvgUtilization * 100).toFixed(1)}%
            </h2>
            <p className="text-xs mt-0.5">
              {metrics.next4WeeksAvgUtilization > 1.0 ? (
                <span className="text-[#D32F2F] font-bold">🚨 Overload Alert</span>
              ) : metrics.next4WeeksAvgUtilization >= params.nearCapRate ? (
                <span className="text-amber-700 font-semibold">Near Capacity</span>
              ) : (
                <span className="text-[#00C853] font-medium">Optimal Operation</span>
              )}
            </p>
          </div>
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-[#888888]">
            <span>Warning threshold</span>
            <span className="font-mono text-[#051C2C] font-semibold">{(params.nearCapRate * 100).toFixed(0)}%</span>
          </div>
        </div>

        {/* KPI 3: Next Capacity Gap Week */}
        <div className="card p-5 flex flex-col justify-between border-t-2 border-[#2251FF]">
          <p className="text-[#888888] font-medium text-xs">
            Next Capacity Gap Week
          </p>
          <div className="my-1.5">
            {metrics.nextCapacityGapWeek ? (
              <>
                <h2 className="garamond text-2xl font-bold text-[#D32F2F] mt-1 truncate">
                  {metrics.nextCapacityGapWeek}
                </h2>
                <p className="text-xs text-[#888888] mt-0.5">
                  {metrics.weeksUntilNextGap !== null && metrics.weeksUntilNextGap <= params.leadTimeWeeks ? (
                    <span className="text-[#D32F2F] font-semibold">
                      🚨 In {metrics.weeksUntilNextGap} wks (Inside Lead Time)
                    </span>
                  ) : (
                    <span>In {metrics.weeksUntilNextGap} weeks lead time</span>
                  )}
                </p>
              </>
            ) : (
              <>
                <h2 className="garamond text-2xl font-bold text-[#00C853] mt-1">
                  No Risk
                </h2>
                <p className="text-xs text-[#00C853] mt-0.5">Zero overload in 12 months</p>
              </>
            )}
          </div>
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-[#888888]">
            <span>Subcontract lead time</span>
            <span className="font-mono text-[#051C2C] font-semibold">{params.leadTimeWeeks} Weeks</span>
          </div>
        </div>

        {/* KPI 4: Overload Weeks Total */}
        <div className="card p-5 flex flex-col justify-between">
          <p className="text-[#888888] font-medium text-xs">
            Total Overload Weeks
          </p>
          <div className="my-1.5">
            <h2 className={`garamond text-3xl font-bold mt-1 ${
              metrics.totalOverloadWeeks > 0 ? 'text-[#D32F2F]' : 'text-[#051C2C]'
            }`}>
              {metrics.totalOverloadWeeks} <span className="text-sm font-sans font-normal text-[#888888]">Wks</span>
            </h2>
            <p className="text-xs text-[#888888] mt-0.5">
              {metrics.overloadPercentage.toFixed(1)}% of 52-week horizon
            </p>
          </div>
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-[#888888]">
            <span>Safe operating weeks</span>
            <span className="font-mono text-[#051C2C] font-semibold">{52 - metrics.totalOverloadWeeks} Wks</span>
          </div>
        </div>

        {/* KPI 5: Peak Staff Shortage */}
        <div className="card p-5 flex flex-col justify-between">
          <p className="text-[#888888] font-medium text-xs">
            Peak Staff Shortage
          </p>
          <div className="my-1.5">
            {metrics.peakShortage > 0 ? (
              <>
                <h2 className="garamond text-3xl font-bold text-[#D32F2F] mt-1">
                  🚨 {metrics.peakShortage} <span className="text-sm font-sans font-normal text-[#888888]">{params.unitLabel.toLowerCase()}</span>
                </h2>
                <p className="text-xs text-[#888888] mt-0.5">
                  Peak occurs in <strong className="text-[#051C2C]">{metrics.peakShortageWeek}</strong> ({formatDisplayDate(metrics.peakShortageDate || '')})
                </p>
              </>
            ) : (
              <>
                <h2 className="garamond text-3xl font-bold text-[#00C853] mt-1">
                  0 <span className="text-sm font-sans font-normal text-[#888888]">{params.unitLabel.toLowerCase()}</span>
                </h2>
                <p className="text-xs text-[#888888] mt-0.5">No staffing shortfall</p>
              </>
            )}
          </div>
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-[#888888]">
            <span>Subcontract ceiling</span>
            <span className="font-mono text-[#051C2C] font-semibold">Max {metrics.peakShortage} needed</span>
          </div>
        </div>
      </div>

      {/* SECTION 2: 12-Month Macro Capacity & Demand Balance Table */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-3 border-b border-gray-100">
          <div>
            <h3 className="garamond text-lg font-bold text-[#051C2C]">
              12-Month Macro Capacity vs Demand Balance Sheet
            </h3>
            <p className="text-xs text-[#888888] mt-0.5">
              Aggregated monthly workload showing total available man-weeks versus booked demand and utilization trajectory.
            </p>
          </div>
          <span className="text-[11px] font-mono text-[#888888]">
            Formula: SUMIFS on 52W Calculation Engine
          </span>
        </div>

        {/* Visual Monthly Balance Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="table-header py-3 px-3 text-left w-24">Month</th>
                <th className="table-header py-3 px-3 text-center w-20">Weeks</th>
                <th className="table-header py-3 px-3 text-right w-28">Available Man-Wks</th>
                <th className="table-header py-3 px-3 text-right w-28">Allocated Man-Wks</th>
                <th className="table-header py-3 px-3 text-left min-w-[200px]">Monthly Load Profile</th>
                <th className="table-header py-3 px-3 text-right w-24">Avg Load %</th>
                <th className="table-header py-3 px-3 text-center w-36">Macro Assessment</th>
              </tr>
            </thead>
            <tbody>
              {monthSummaries.map((ms) => {
                const percent = Math.min(100, Math.round(ms.avgUtilization * 100));

                return (
                  <tr
                    key={ms.month}
                    className={`border-b border-gray-50 hover:bg-gray-50/60 transition-colors ${
                      ms.isOverload ? 'bg-red-50/30' : ''
                    }`}
                  >
                    <td className="py-3 px-3 font-semibold text-[#051C2C]">{ms.month}</td>
                    <td className="py-3 px-3 text-center font-mono text-[#888888]">{ms.totalWeeks} w</td>
                    <td className="py-3 px-3 text-right font-mono text-[#888888]">{ms.availableManWeeks}</td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-[#051C2C]">
                      {ms.allocatedManWeeks}
                    </td>

                    {/* Inline Data Bar */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <div className="data-bar-track">
                          <div
                            className="data-bar-fill"
                            style={{
                              width: `${percent}%`,
                              backgroundColor: ms.isOverload
                                ? '#D32F2F'
                                : ms.isNearCap
                                ? '#F59E0B'
                                : '#2251FF',
                            }}
                          />
                        </div>
                        <span className="text-[11px] font-bold text-[#2251FF] w-9 text-right font-mono">
                          {percent}%
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-right font-mono font-bold">
                      <span className={ms.isOverload ? 'text-[#D32F2F]' : 'text-[#051C2C]'}>
                        {(ms.avgUtilization * 100).toFixed(1)}%
                      </span>
                    </td>

                    <td className="py-3 px-3 text-center">
                      {ms.isOverload ? (
                        <span className="pill bg-red-100 text-[#D32F2F]">
                          Overload
                        </span>
                      ) : ms.isNearCap ? (
                        <span className="pill bg-yellow-100 text-amber-800">
                          Near Cap
                        </span>
                      ) : ms.avgUtilization < 0.45 ? (
                        <span className="pill bg-blue-100 text-[#2251FF]">
                          Open Slack
                        </span>
                      ) : (
                        <span className="pill bg-green-100 text-[#00C853]">
                          Balanced
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 3: Two Event-Driven Decision Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overload Queue (Action Required) */}
        <div className="card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#D32F2F]" />
                <h3 className="garamond text-lg font-bold text-[#051C2C]">
                  Overload Queue (Action Required)
                </h3>
              </div>
              <span className="pill bg-red-100 text-[#D32F2F]">
                {overloadEvents.length} Events
              </span>
            </div>

            <p className="text-xs text-[#888888] mb-4">
              Immediate staffing bottleneck warnings. Identifies specific weeks where allocated crew exceeds baseline capacity (11), and prescribes recommended subcontracting measures.
            </p>

            {overloadEvents.length === 0 ? (
              <div className="p-8 text-center bg-green-50 border border-green-200 rounded-xl text-[#00C853]">
                <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-[#00C853]" />
                <div className="font-semibold text-sm">Clean Bill of Health!</div>
                <div className="text-xs text-green-700 mt-1">
                  Zero capacity bottlenecks detected across the entire 52-week timeline.
                </div>
              </div>
            ) : (
              <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                {overloadEvents.map((evt, idx) => (
                  <div
                    key={`over-${evt.weekLabel}-${idx}`}
                    className="insight-block border-l-4 border-l-[#D32F2F] bg-red-50/40 p-3.5 flex items-start justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#051C2C] text-sm">
                          {evt.weekLabel}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="font-mono text-[#888888]">{formatDisplayDate(evt.weekStart)}</span>
                      </div>
                      <div className="text-[#555555] mt-1 leading-relaxed">
                        Demand: <strong className="text-[#051C2C]">{evt.allocatedCrew}p</strong> vs Baseline:{' '}
                        <strong className="text-[#051C2C]">{evt.capacity}p</strong>
                      </div>
                      <div className="text-[#051C2C] font-semibold mt-1">
                        👉 Action: {evt.recommendation}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="pill bg-red-100 text-[#D32F2F] font-mono font-bold">
                        Short {evt.shortage}p
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Top Open Slots (Commercial Sales Opportunities) */}
        <div className="card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#2251FF]" />
                <h3 className="garamond text-lg font-bold text-[#051C2C]">
                  Available Capacity Slots (Sales Target)
                </h3>
              </div>
              <span className="pill bg-blue-100 text-[#2251FF]">
                {openSlots.length} Open Windows
              </span>
            </div>

            <p className="text-xs text-[#888888] mb-4">
              Identifies available painter-weeks. Guides the sales team to proactively pitch and close quick-turnaround or high-margin jobs during low-load intervals.
            </p>

            {openSlots.length === 0 ? (
              <div className="p-8 text-center bg-gray-50 border border-gray-200 rounded-xl text-[#888888]">
                No prolonged slack capacity windows found. Schedule is consistently occupied.
              </div>
            ) : (
              <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                {openSlots.map((slot, idx) => (
                  <div
                    key={`slot-${slot.weekLabel}-${idx}`}
                    className="insight-block p-3.5 flex items-start justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#051C2C] text-sm">
                          {slot.weekLabel}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="font-mono text-[#888888]">{formatDisplayDate(slot.weekStart)}</span>
                      </div>
                      <div className="text-[#555555] mt-1">
                        Surplus Capacity:{' '}
                        <strong className="text-[#00C853] font-bold">{slot.freeCrew} Painters available</strong> (
                        {slot.consecutiveWeeks} consecutive weeks)
                      </div>
                      <div className="text-[#051C2C] font-semibold mt-1">
                        💡 Suggested Order: {slot.recommendedType}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="pill bg-green-100 text-[#00C853] font-mono font-bold">
                        +{slot.freeCrew} Free
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 4: Interactive What-If Capacity Simulator */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#2251FF]" />
            <h3 className="garamond text-lg font-bold text-[#051C2C]">
              What-If Capacity Sandbox (Quick Order Evaluation)
            </h3>
          </div>
          <span className="text-xs text-[#888888]">
            Simulate inserting a prospective project order without modifying actual master data
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div>
            <label className="block text-xs font-semibold text-[#051C2C] mb-1">
              Required Crew Size
            </label>
            <div className="relative">
              <input
                type="number"
                min={1}
                max={15}
                value={simCrew}
                onChange={(e) => setSimCrew(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2 text-xs font-mono font-bold text-[#051C2C] bg-white border border-gray-300 rounded focus:border-[#2251FF] focus:outline-none"
              />
              <span className="absolute right-3 top-2 text-xs text-[#888888]">Painters</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#051C2C] mb-1">
              Project Duration (Weeks)
            </label>
            <div className="relative">
              <input
                type="number"
                min={1}
                max={12}
                value={simWeeks}
                onChange={(e) => setSimWeeks(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2 text-xs font-mono font-bold text-[#051C2C] bg-white border border-gray-300 rounded focus:border-[#2251FF] focus:outline-none"
              />
              <span className="absolute right-3 top-2 text-xs text-[#888888]">Weeks</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#051C2C] mb-1">
              Proposed Start Cycle
            </label>
            <select
              value={simStartWeek}
              onChange={(e) => setSimStartWeek(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 text-xs font-mono font-medium bg-white border border-gray-300 rounded focus:border-[#2251FF] focus:outline-none text-[#051C2C]"
            >
              {weekPlans.map((w) => (
                <option key={w.weekIndex} value={w.weekIndex}>
                  {w.weekLabel} ({formatShortDate(w.weekStart)})
                </option>
              ))}
            </select>
          </div>

          {/* Simulation Verdict */}
          <div className="pt-2 md:pt-0">
            {simResult.hasConflict ? (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs">
                <div className="flex items-center gap-1.5 font-bold text-[#D32F2F] mb-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>Conflict: Overload by {simResult.maxShortage}p</span>
                </div>
                <div className="text-[11px] text-red-700">
                  Collides across {simResult.conflictCount} weeks ({simResult.startLabel}–{simResult.endLabel}). Subcontractor required.
                </div>
              </div>
            ) : (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-xs">
                <div className="flex items-center gap-1.5 font-bold text-[#00C853] mb-1">
                  <Check className="w-4 h-4 text-[#00C853]" />
                  <span>Approved: 100% Fit</span>
                </div>
                <div className="text-[11px] text-green-800">
                  Peak utilization stays at {((simResult.maxNewLoad / params.crewSize) * 100).toFixed(0)}% (Peak load: {simResult.maxNewLoad}/{params.crewSize}p).
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
