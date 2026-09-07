import React, { useState } from 'react';
import { WeekPlan, SetupParams } from '../types';
import { Table, Filter, AlertTriangle, CheckCircle2, TrendingUp, Users } from 'lucide-react';
import { formatDisplayDate, formatShortDate } from '../utils/dateUtils';

interface ResourcePlanViewProps {
  weekPlans: WeekPlan[];
  params: SetupParams;
}

export const ResourcePlanView: React.FC<ResourcePlanViewProps> = ({ weekPlans, params }) => {
  const [filterState, setFilterState] = useState<'ALL' | 'OVERLOAD' | 'FULL' | 'OPEN'>('ALL');
  const [selectedMonth, setSelectedMonth] = useState<string>('ALL');

  // Distinct months
  const months = Array.from(new Set(weekPlans.map((w) => w.monthLabel)));

  const filteredWeeks = weekPlans.filter((w) => {
    const matchesStatus = filterState === 'ALL' || w.status === filterState;
    const matchesMonth = selectedMonth === 'ALL' || w.monthLabel === selectedMonth;
    return matchesStatus && matchesMonth;
  });

  // Summary tallies
  const overloadCount = weekPlans.filter((w) => w.status === 'OVERLOAD').length;
  const fullCount = weekPlans.filter((w) => w.status === 'FULL').length;
  const openCount = weekPlans.filter((w) => w.status === 'OPEN').length;
  const avgUtil =
    weekPlans.reduce((sum, w) => sum + w.utilization, 0) / (weekPlans.length || 1);

  return (
    <div id="view-resource-plan-container" className="view-fade-up space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2251FF] mb-1">
            <Table className="w-3.5 h-3.5" />
            <span>Sheet 02_RESOURCE_PLAN • 52-Week Dynamic Aggregation Engine</span>
          </div>
          <h1 className="garamond text-3xl font-bold text-[#051C2C]">
            Weekly Capacity & Dynamic Demand Matrix
          </h1>
          <p className="text-[#888888] mt-1 max-w-2xl text-sm">
            Mathematical engine generating 52 continuous weekly cycles. Projects work order spans into weekly demand,
            calculates net variance against baseline capacity, and derives staffing shortages.
          </p>
        </div>

        {/* 4 Summary Stat Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
          <div className="card px-3.5 py-2.5">
            <span className="text-[10px] uppercase tracking-wider text-[#888888] font-semibold block">
              52W Avg Load
            </span>
            <span className="garamond text-xl font-bold text-[#051C2C]">
              {(avgUtil * 100).toFixed(1)}%
            </span>
          </div>

          <div className="card px-3.5 py-2.5">
            <span className="text-[10px] uppercase tracking-wider text-[#888888] font-semibold block">
              Overload Weeks
            </span>
            <span className={`garamond text-xl font-bold ${overloadCount > 0 ? 'text-[#D32F2F]' : 'text-[#051C2C]'}`}>
              {overloadCount} Wks
            </span>
          </div>

          <div className="card px-3.5 py-2.5">
            <span className="text-[10px] uppercase tracking-wider text-[#888888] font-semibold block">
              Saturated (Full)
            </span>
            <span className="garamond text-xl font-bold text-amber-600">
              {fullCount} Wks
            </span>
          </div>

          <div className="card px-3.5 py-2.5">
            <span className="text-[10px] uppercase tracking-wider text-[#888888] font-semibold block">
              Open Slots
            </span>
            <span className="garamond text-xl font-bold text-[#00C853]">
              {openCount} Wks
            </span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="card p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#888888]" />
          <span className="text-xs font-semibold text-[#888888] uppercase tracking-wider">Status:</span>

          <button
            onClick={() => setFilterState('ALL')}
            className={`px-3 py-1 text-xs rounded transition-all cursor-pointer font-medium ${
              filterState === 'ALL'
                ? 'bg-[#051C2C] text-white'
                : 'bg-gray-100 text-[#051C2C] hover:bg-gray-200'
            }`}
          >
            All Weeks ({weekPlans.length})
          </button>

          <button
            onClick={() => setFilterState('OVERLOAD')}
            className={`px-3 py-1 text-xs rounded transition-all cursor-pointer font-medium flex items-center gap-1.5 ${
              filterState === 'OVERLOAD'
                ? 'bg-[#D32F2F] text-white'
                : 'bg-red-50 text-[#D32F2F] hover:bg-red-100'
            }`}
          >
            <AlertTriangle className="w-3 h-3" />
            <span>Overload Risk ({overloadCount})</span>
          </button>

          <button
            onClick={() => setFilterState('FULL')}
            className={`px-3 py-1 text-xs rounded transition-all cursor-pointer font-medium ${
              filterState === 'FULL'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
            }`}
          >
            Saturated ({fullCount})
          </button>

          <button
            onClick={() => setFilterState('OPEN')}
            className={`px-3 py-1 text-xs rounded transition-all cursor-pointer font-medium ${
              filterState === 'OPEN'
                ? 'bg-[#00C853] text-white'
                : 'bg-green-50 text-emerald-800 hover:bg-green-100'
            }`}
          >
            Open Slack ({openCount})
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-[#888888]">Filter Month:</span>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-white border border-gray-200 rounded text-[#051C2C] font-mono"
          >
            <option value="ALL">All Months</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto max-h-[640px]">
          <table id="tbl-resource-engine-table" className="w-full text-left border-collapse">
            <thead className="sticky top-0 z-10">
              <tr className="bg-[#051C2C] text-white text-[11px] font-semibold uppercase tracking-wider">
                <th className="py-3 px-3 text-left w-16">Week</th>
                <th className="py-3 px-3 text-left w-28">Start (Mon)</th>
                <th className="py-3 px-3 text-left w-28">End (Sun)</th>
                <th className="py-3 px-3 text-left w-24">Month</th>
                <th className="py-3 px-3 text-center w-24">Active Jobs</th>
                <th className="py-3 px-3 text-right min-w-[140px]">Total Demand</th>
                <th className="py-3 px-3 text-right w-24">Available</th>
                <th className="py-3 px-3 text-right w-24">Net Gap</th>
                <th className="py-3 px-3 text-right w-28">Utilization %</th>
                <th className="py-3 px-3 text-center w-28">Status</th>
                <th className="py-3 px-3 text-center w-36">Staff Shortage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredWeeks.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-12 text-center text-[#888888]">
                    No weekly cycles match the current filter selection.
                  </td>
                </tr>
              ) : (
                filteredWeeks.map((w, idx) => {
                  const isEven = idx % 2 === 0;
                  const isOverload = w.status === 'OVERLOAD';
                  const isFull = w.status === 'FULL';
                  const maxCap = Math.max(params.crewSize * 1.5, 15);
                  const barWidth = Math.min(100, Math.round((w.totalAllocatedCrew / maxCap) * 100));

                  return (
                    <tr
                      key={w.weekIndex}
                      className={`transition-colors ${
                        isOverload
                          ? 'bg-red-50/50 font-medium'
                          : isEven
                          ? 'bg-white hover:bg-gray-50'
                          : 'bg-gray-50/30 hover:bg-gray-100/70'
                      }`}
                    >
                      {/* Week Index */}
                      <td className="py-2.5 px-3 font-mono font-bold text-[#051C2C]">
                        {w.weekLabel}
                      </td>

                      {/* Start Date */}
                      <td className="py-2.5 px-3 font-mono text-[#555555]">
                        {formatDisplayDate(w.weekStart)}
                      </td>

                      {/* End Date */}
                      <td className="py-2.5 px-3 font-mono text-[#888888]">
                        {formatShortDate(w.weekEnd)}
                      </td>

                      {/* Month Label */}
                      <td className="py-2.5 px-3 font-mono text-[#888888] text-[11px]">
                        {w.monthLabel}
                      </td>

                      {/* Active Jobs */}
                      <td className="py-2.5 px-3 text-center">
                        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-gray-100 text-[#051C2C] font-mono font-semibold text-[11px]">
                          {w.activeJobsCount}
                        </span>
                      </td>

                      {/* Total Demand with Inline Bar */}
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex flex-col items-end gap-1">
                          <span
                            className={`font-mono font-bold ${
                              isOverload ? 'text-[#D32F2F]' : 'text-[#051C2C]'
                            }`}
                          >
                            {w.totalAllocatedCrew} {params.unitLabel.toLowerCase()}
                          </span>
                          <div className="data-bar-track w-full">
                            <div
                              className="data-bar-fill"
                              style={{
                                width: `${barWidth}%`,
                                backgroundColor: isOverload ? '#D32F2F' : '#2251FF',
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Available Capacity */}
                      <td className="py-2.5 px-3 text-right font-mono text-[#888888]">
                        {w.availableCapacity}
                      </td>

                      {/* Net Gap */}
                      <td className="py-2.5 px-3 text-right font-mono font-bold">
                        {w.netCapacityGap > 0 ? (
                          <span className="text-[#00C853]">+{w.netCapacityGap}</span>
                        ) : w.netCapacityGap < 0 ? (
                          <span className="text-[#D32F2F]">{w.netCapacityGap}</span>
                        ) : (
                          <span className="text-[#888888]">0</span>
                        )}
                      </td>

                      {/* Utilization % */}
                      <td className="py-2.5 px-3 text-right font-mono">
                        <span
                          className={`font-bold ${
                            isOverload
                              ? 'text-[#D32F2F]'
                              : isFull
                              ? 'text-amber-700'
                              : 'text-[#051C2C]'
                          }`}
                        >
                          {(w.utilization * 100).toFixed(1)}%
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="py-2.5 px-3 text-center">
                        {isOverload ? (
                          <span className="pill bg-red-100 text-[#D32F2F] font-bold">
                            OVERLOAD
                          </span>
                        ) : isFull ? (
                          <span className="pill bg-amber-50 text-amber-800">
                            FULL (90%+)
                          </span>
                        ) : (
                          <span className="pill bg-green-50 text-emerald-800">
                            OPEN
                          </span>
                        )}
                      </td>

                      {/* Staff Shortage */}
                      <td className="py-2.5 px-3 text-center">
                        {w.staffShortage > 0 ? (
                          <span className="pill bg-red-100 text-[#D32F2F] font-bold">
                            Short: {w.staffShortage} {params.unitLabel.toLowerCase()}
                          </span>
                        ) : (
                          <span className="text-[#888888] text-[11px]">0</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
