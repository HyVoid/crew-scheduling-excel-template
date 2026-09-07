import React from 'react';
import { SetupParams } from '../types';
import { Sliders, HelpCircle, ShieldAlert, Cpu, Sparkles } from 'lucide-react';
import { formatDisplayDate } from '../utils/dateUtils';

interface SetupViewProps {
  params: SetupParams;
  onChangeParams: (newParams: SetupParams) => void;
  horizonEndDate: string;
  totalWeeksCount: number;
  weeklyCapacityManDays: number;
}

export const SetupView: React.FC<SetupViewProps> = ({
  params,
  onChangeParams,
  horizonEndDate,
  totalWeeksCount,
  weeklyCapacityManDays,
}) => {
  const update = <K extends keyof SetupParams>(field: K, val: SetupParams[K]) => {
    onChangeParams({
      ...params,
      [field]: val,
    });
  };

  return (
    <div id="view-setup-container" className="view-fade-up space-y-8">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2251FF] mb-1">
            <Sliders className="w-3.5 h-3.5" />
            <span>Sheet 00_SETUP • Single Source of Truth</span>
          </div>
          <h1 className="garamond text-3xl font-bold text-[#051C2C]">
            System Parameters & Business Assumptions
          </h1>
          <p className="text-[#888888] mt-1 max-w-3xl text-sm">
            Centralized control console. Any update immediately recalculates all 52-week capacity thresholds,
            Gantt matrices, and executive decision streams across the entire system.
          </p>
        </div>

        {/* Derived Mini Summary Card */}
        <div className="card p-4 flex items-center gap-6 shrink-0">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#888888] font-semibold block">
              Calculated Horizon End
            </span>
            <span className="garamond text-xl font-bold text-[#051C2C]">
              {formatDisplayDate(horizonEndDate)}
            </span>
          </div>
          <div className="w-[1px] h-8 bg-gray-200" />
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#888888] font-semibold block">
              Total Weeks
            </span>
            <span className="garamond text-xl font-bold text-[#051C2C]">
              {totalWeeksCount} Weeks
            </span>
          </div>
          <div className="w-[1px] h-8 bg-gray-200" />
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#888888] font-semibold block">
              Weekly Man-Days
            </span>
            <span className="garamond text-xl font-bold text-[#2251FF]">
              {weeklyCapacityManDays} Days
            </span>
          </div>
        </div>
      </div>

      {/* Insight Banner */}
      <div className="insight-block flex items-start gap-3.5">
        <Sparkles className="w-5 h-5 text-[#2251FF] shrink-0 mt-0.5" />
        <div className="text-xs text-[#555555] leading-relaxed">
          <strong className="text-[#051C2C] font-semibold">
            Zero-Maintenance Declarative Pipeline:
          </strong>{' '}
          All downstream calculations (Gantt schedule, utilization % and gap flags) strictly subscribe to these constants. If your permanent crew increases from 11 to 13 painters, simply change the crew size below and all 52 weeks instantly re-anchor.
        </div>
      </div>

      {/* Form Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Section 1: Core Team Capacity */}
        <div className="card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100 mb-4">
              <Cpu className="w-4 h-4 text-[#2251FF]" />
              <h3 className="garamond text-lg font-bold text-[#051C2C]">Core Crew Capacity</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#051C2C] mb-1">
                  Core Painter Crew Size (Param_CrewSize)
                </label>
                <div className="relative">
                  <input
                    id="param-crew-size"
                    type="number"
                    min={1}
                    max={100}
                    value={params.crewSize}
                    onChange={(e) => update('crewSize', Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3 py-2 text-sm font-semibold text-[#051C2C] font-mono bg-white border border-gray-300 rounded focus:border-[#2251FF] focus:outline-none"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-[#888888]">Painters</span>
                </div>
                <p className="text-[11px] text-[#888888] mt-1">
                  Baseline capacity denominator for all utilization and shortage formulas.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#051C2C] mb-1">
                  Regular Working Days / Week (Param_WorkDays)
                </label>
                <div className="relative">
                  <input
                    id="param-work-days"
                    type="number"
                    min={1}
                    max={7}
                    value={params.workDaysPerWeek}
                    onChange={(e) => update('workDaysPerWeek', Math.min(7, Math.max(1, parseInt(e.target.value) || 5)))}
                    className="w-full px-3 py-2 text-sm font-semibold text-[#051C2C] font-mono bg-white border border-gray-300 rounded focus:border-[#2251FF] focus:outline-none"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-[#888888]">Days/Wk</span>
                </div>
                <p className="text-[11px] text-[#888888] mt-1">Standard Monday–Friday schedule (5 days).</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#051C2C] mb-1">
                  Planning Start Date (Monday) (Param_StartDate)
                </label>
                <input
                  id="param-start-date"
                  type="date"
                  value={params.planningStartDate}
                  onChange={(e) => update('planningStartDate', e.target.value || '2026-09-07')}
                  className="w-full px-3 py-2 text-sm font-semibold text-[#051C2C] font-mono bg-white border border-gray-300 rounded focus:border-[#2251FF] focus:outline-none"
                />
                <p className="text-[11px] text-[#888888] mt-1">Anchors Week 01 (W01) of the 52-week horizon.</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#051C2C] mb-1">
                  Planning Horizon (Param_HorizonM)
                </label>
                <div className="relative">
                  <input
                    id="param-horizon-months"
                    type="number"
                    min={1}
                    max={24}
                    value={params.horizonMonths}
                    onChange={(e) => update('horizonMonths', Math.max(1, parseInt(e.target.value) || 12))}
                    className="w-full px-3 py-2 text-sm font-semibold text-[#051C2C] font-mono bg-white border border-gray-300 rounded focus:border-[#2251FF] focus:outline-none"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-[#888888]">Months</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Thresholds & Alerts */}
        <div className="card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100 mb-4">
              <ShieldAlert className="w-4 h-4 text-[#2251FF]" />
              <h3 className="garamond text-lg font-bold text-[#051C2C]">Thresholds & Decision Triggers</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#051C2C] mb-1">
                  Near-Capacity Warning Threshold (Param_NearCapRate)
                </label>
                <div className="relative">
                  <input
                    id="param-near-cap-rate"
                    type="number"
                    step={0.05}
                    min={0.5}
                    max={1.0}
                    value={params.nearCapRate}
                    onChange={(e) => update('nearCapRate', parseFloat(e.target.value) || 0.9)}
                    className="w-full px-3 py-2 text-sm font-semibold text-[#051C2C] font-mono bg-white border border-gray-300 rounded focus:border-[#2251FF] focus:outline-none"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-[#888888]">
                    {(params.nearCapRate * 100).toFixed(0)}%
                  </span>
                </div>
                <p className="text-[11px] text-[#888888] mt-1">
                  Triggers yellow 'FULL' state when utilization reaches this ratio.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#051C2C] mb-1">
                  Staffing / Subcontractor Lead Time (Param_LeadTimeWeeks)
                </label>
                <div className="relative">
                  <input
                    id="param-lead-time"
                    type="number"
                    min={1}
                    max={12}
                    value={params.leadTimeWeeks}
                    onChange={(e) => update('leadTimeWeeks', Math.max(1, parseInt(e.target.value) || 4))}
                    className="w-full px-3 py-2 text-sm font-semibold text-[#051C2C] font-mono bg-white border border-gray-300 rounded focus:border-[#2251FF] focus:outline-none"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-[#888888]">Weeks</span>
                </div>
                <p className="text-[11px] text-[#888888] mt-1">
                  Lead time needed to hire or contract temp painters before overload strikes.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#051C2C] mb-1">
                  Minimum Fill Slot Duration (Param_MinFillSlot)
                </label>
                <div className="relative">
                  <input
                    id="param-min-fill-slot"
                    type="number"
                    min={1}
                    max={4}
                    value={params.minFillSlot}
                    onChange={(e) => update('minFillSlot', Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3 py-2 text-sm font-semibold text-[#051C2C] font-mono bg-white border border-gray-300 rounded focus:border-[#2251FF] focus:outline-none"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-[#888888]">Weeks</span>
                </div>
                <p className="text-[11px] text-[#888888] mt-1">
                  Minimum consecutive open weeks needed to qualify as a commercial fill slot.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Localization & Data Dictionary */}
        <div className="card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100 mb-4">
              <HelpCircle className="w-4 h-4 text-[#2251FF]" />
              <h3 className="garamond text-lg font-bold text-[#051C2C]">Formatting & Data Dictionary</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#051C2C] mb-1">
                  Currency Symbol (Param_Currency)
                </label>
                <input
                  id="param-currency"
                  type="text"
                  maxLength={4}
                  value={params.currencySymbol}
                  onChange={(e) => update('currencySymbol', e.target.value || '$')}
                  className="w-full px-3 py-2 text-sm font-semibold text-[#051C2C] font-mono bg-white border border-gray-300 rounded focus:border-[#2251FF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#051C2C] mb-1">
                  Unit Label Description (Param_UnitLabel)
                </label>
                <input
                  id="param-unit-label"
                  type="text"
                  value={params.unitLabel}
                  onChange={(e) => update('unitLabel', e.target.value || 'Painters')}
                  className="w-full px-3 py-2 text-sm font-semibold text-[#051C2C] bg-white border border-gray-300 rounded focus:border-[#2251FF] focus:outline-none"
                />
                <p className="text-[11px] text-[#888888] mt-1">
                  Used across shortage badges, KPI cards, and tooltips.
                </p>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-xs font-semibold text-[#051C2C] block mb-2">
                  System Enum Dictionaries:
                </span>
                <div className="text-xs space-y-1.5 text-[#555555]">
                  <div className="flex items-center justify-between">
                    <span>Job Statuses:</span>
                    <span className="font-mono text-[#051C2C]">Planned, Active, On Hold, Completed</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Priority Weights:</span>
                    <span className="font-mono text-[#051C2C]">High, Medium, Low</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Capacity States:</span>
                    <span className="font-mono text-[#051C2C]">OPEN, FULL, OVERLOAD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
