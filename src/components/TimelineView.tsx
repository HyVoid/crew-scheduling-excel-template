import React, { useRef, useState } from 'react';
import { ComputedJobItem, WeekPlan, SetupParams, JobItem } from '../types';
import { Calendar, AlertOctagon, CheckCircle2, ChevronRight, ChevronLeft, Eye, Sparkles } from 'lucide-react';
import { isJobInWeek, formatShortDate, formatDisplayDate } from '../utils/dateUtils';

interface TimelineViewProps {
  computedJobs: ComputedJobItem[];
  weekPlans: WeekPlan[];
  params: SetupParams;
  onSelectJob?: (job: JobItem) => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  computedJobs,
  weekPlans,
  params,
  onSelectJob,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hoveredWeek, setHoveredWeek] = useState<number | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  // Filter only active & planned jobs that are in plan
  const activeJobs = computedJobs.filter((j) => j.includeInPlan);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  const jumpToFirstOverload = () => {
    const idx = weekPlans.findIndex((w) => w.status === 'OVERLOAD');
    if (idx !== -1 && scrollRef.current) {
      // 50px per week column
      scrollRef.current.scrollTo({ left: Math.max(0, idx * 56 - 100), behavior: 'smooth' });
    }
  };

  return (
    <div id="view-timeline-container" className="view-fade-up space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2251FF] mb-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Sheet 03_12M_TIMELINE • Dual-Track Interactive Sandbox</span>
          </div>
          <h1 className="garamond text-3xl font-bold text-[#051C2C]">
            52-Week Visual Gantt & Capacity Heatmap
          </h1>
          <p className="text-[#888888] mt-1 max-w-2xl text-sm">
            Interactive dual-track schedule sandbox. Upper track displays work order spans with crew allocations.
            Lower track vertically aligns team load, utilization rates, and staff shortage alarm signals.
          </p>
        </div>

        {/* Scroll Nav and Quick Jump Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={jumpToFirstOverload}
            className="flex items-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 text-[#D32F2F] border border-red-200 rounded text-xs font-semibold transition-all cursor-pointer shadow-sm"
          >
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>Jump to Next Overload</span>
          </button>

          <button
            onClick={scrollLeft}
            className="p-2 bg-white hover:bg-gray-100 border border-gray-200 rounded text-[#051C2C] transition-all cursor-pointer shadow-sm"
            title="Scroll Left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={scrollRight}
            className="p-2 bg-white hover:bg-gray-100 border border-gray-200 rounded text-[#051C2C] transition-all cursor-pointer shadow-sm"
            title="Scroll Right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Dual-Track Container */}
      <div className="card overflow-hidden">
        <div ref={scrollRef} className="overflow-x-auto overflow-y-auto max-h-[720px] relative select-none">
          <table className="border-collapse table-fixed text-xs">
            {/* Table Header: Month & Week Labels */}
            <thead className="sticky top-0 z-30 bg-white shadow-sm">
              {/* Row 1: Month labels */}
              <tr className="bg-[#051C2C] text-white text-[11px] font-semibold border-b border-gray-800">
                <th
                  colSpan={4}
                  className="sticky left-0 z-40 bg-[#051C2C] py-2 px-3 text-left w-[360px] min-w-[360px] border-r border-gray-800"
                >
                  PROJECT / WORK ORDER
                </th>
                {weekPlans.map((w) => (
                  <th
                    key={`m-${w.weekIndex}`}
                    className="py-1 px-1 text-center w-[56px] min-w-[56px] font-mono text-[10px] text-gray-300 border-r border-gray-800"
                  >
                    {w.monthLabel.slice(2)}
                  </th>
                ))}
              </tr>

              {/* Row 2: Week dates & labels */}
              <tr className="bg-[#051C2C]/5 border-b border-gray-200 text-[11px]">
                <th className="sticky left-0 z-40 bg-white py-2 px-3 text-left w-24 text-[#051C2C] font-semibold border-r border-gray-200">
                  Job ID
                </th>
                <th className="sticky left-24 z-40 bg-white py-2 px-3 text-left w-48 text-[#051C2C] font-semibold border-r border-gray-200">
                  Project Title
                </th>
                <th className="sticky left-72 z-40 bg-white py-2 px-2 text-right w-16 text-[#051C2C] font-semibold border-r border-gray-200">
                  Crew
                </th>
                <th className="sticky left-[352px] z-40 bg-white py-2 px-2 text-center w-24 text-[#051C2C] font-semibold border-r-2 border-[#051C2C]">
                  Dates
                </th>
                {weekPlans.map((w) => {
                  const isHovered = hoveredWeek === w.weekIndex;
                  return (
                    <th
                      key={`w-${w.weekIndex}`}
                      onMouseEnter={() => setHoveredWeek(w.weekIndex)}
                      onMouseLeave={() => setHoveredWeek(null)}
                      className={`py-2 px-1 text-center w-[56px] min-w-[56px] border-r border-gray-200 font-mono transition-colors ${
                        w.status === 'OVERLOAD'
                          ? 'bg-red-50 text-[#D32F2F] font-bold'
                          : isHovered
                          ? 'bg-blue-50 text-[#2251FF]'
                          : 'text-[#051C2C]'
                      }`}
                    >
                      <div className="font-bold">{w.weekLabel}</div>
                      <div className="text-[10px] text-[#888888] font-normal">{formatShortDate(w.weekStart)}</div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            {/* UPPER TRACK: Project Gantt Sandbox */}
            <tbody className="divide-y divide-gray-100">
              {activeJobs.map((job) => {
                const isSelected = selectedJobId === job.id;

                return (
                  <tr
                    key={job.id}
                    className={`hover:bg-gray-50/80 transition-colors ${
                      isSelected ? 'bg-blue-50/40' : ''
                    }`}
                  >
                    {/* Fixed Left Columns */}
                    <td
                      onClick={() => setSelectedJobId(job.id)}
                      className="sticky left-0 z-20 bg-white py-2.5 px-3 font-mono font-bold text-[#051C2C] border-r border-gray-200 cursor-pointer"
                    >
                      {job.id}
                    </td>
                    <td
                      onClick={() => setSelectedJobId(job.id)}
                      className="sticky left-24 z-20 bg-white py-2.5 px-3 truncate max-w-[192px] text-[#051C2C] font-medium border-r border-gray-200 cursor-pointer"
                      title={job.name}
                    >
                      {job.name}
                    </td>
                    <td className="sticky left-72 z-20 bg-white py-2.5 px-2 text-right font-mono font-bold text-[#051C2C] border-r border-gray-200">
                      {job.crewRequired}p
                    </td>
                    <td className="sticky left-[352px] z-20 bg-white py-2.5 px-2 text-center text-[10px] font-mono text-[#888888] border-r-2 border-[#051C2C]">
                      {formatShortDate(job.startDate)}~{formatShortDate(job.endDate)}
                    </td>

                    {/* 52-Week Columns */}
                    {weekPlans.map((w) => {
                      const isActive = isJobInWeek(job.startDate, job.endDate, w.weekStart, w.weekEnd);
                      const isHovered = hoveredWeek === w.weekIndex;

                      return (
                        <td
                          key={`c-${job.id}-${w.weekIndex}`}
                          onMouseEnter={() => setHoveredWeek(w.weekIndex)}
                          onMouseLeave={() => setHoveredWeek(null)}
                          className={`p-1 text-center border-r border-gray-100 transition-colors ${
                            isHovered ? 'bg-gray-100/50' : ''
                          }`}
                        >
                          {isActive ? (
                            <div
                              onClick={() => onSelectJob?.(job)}
                              className="w-full py-1.5 rounded bg-[#051C2C] text-white font-mono font-bold text-xs shadow-sm flex items-center justify-center cursor-pointer hover:bg-[#2251FF] transition-colors"
                              title={`${job.id}: ${job.name}\nSpan: ${job.startDate} to ${job.endDate}\nCrew: ${job.crewRequired} painters`}
                            >
                              {job.crewRequired}
                            </div>
                          ) : null}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>

            {/* LOWER TRACK: Vertically Aligned Team Heatmap & Warning Section */}
            <tbody className="border-t-4 border-[#051C2C] text-xs font-mono font-medium">
              {/* Row 1: Total Allocated Demand */}
              <tr className="bg-gray-50 border-b border-gray-200">
                <td
                  colSpan={4}
                  className="sticky left-0 z-20 bg-gray-100 py-2 px-3 font-sans font-semibold text-[#051C2C] border-r-2 border-[#051C2C]"
                >
                  Total Allocated Crew (Demand)
                </td>
                {weekPlans.map((w) => {
                  const isOver = w.status === 'OVERLOAD';
                  return (
                    <td
                      key={`dem-${w.weekIndex}`}
                      className={`py-2 px-1 text-center border-r border-gray-200 font-bold ${
                        isOver ? 'bg-red-100 text-[#D32F2F]' : 'text-[#051C2C]'
                      }`}
                    >
                      {w.totalAllocatedCrew}
                    </td>
                  );
                })}
              </tr>

              {/* Row 2: Crew Capacity Baseline */}
              <tr className="bg-white border-b border-gray-200">
                <td
                  colSpan={4}
                  className="sticky left-0 z-20 bg-white py-2 px-3 font-sans font-semibold text-[#888888] border-r-2 border-[#051C2C]"
                >
                  Baseline Capacity (Crew Size)
                </td>
                {weekPlans.map((w) => (
                  <td key={`cap-${w.weekIndex}`} className="py-2 px-1 text-center border-r border-gray-200 text-[#888888]">
                    {w.availableCapacity}
                  </td>
                ))}
              </tr>

              {/* Row 3: Net Gap (+ Surplus / - Shortage) */}
              <tr className="bg-gray-50 border-b border-gray-200">
                <td
                  colSpan={4}
                  className="sticky left-0 z-20 bg-gray-100 py-2 px-3 font-sans font-semibold text-[#051C2C] border-r-2 border-[#051C2C]"
                >
                  Net Gap (+Slack / -Shortage)
                </td>
                {weekPlans.map((w) => {
                  const gap = w.netCapacityGap;
                  return (
                    <td
                      key={`gap-${w.weekIndex}`}
                      className={`py-2 px-1 text-center border-r border-gray-200 font-bold ${
                        gap > 0 ? 'text-[#00C853]' : gap < 0 ? 'text-[#D32F2F] bg-red-100' : 'text-[#888888]'
                      }`}
                    >
                      {gap > 0 ? `+${gap}` : gap}
                    </td>
                  );
                })}
              </tr>

              {/* Row 4: Capacity Utilization % */}
              <tr className="bg-white border-b border-gray-200">
                <td
                  colSpan={4}
                  className="sticky left-0 z-20 bg-white py-2 px-3 font-sans font-semibold text-[#051C2C] border-r-2 border-[#051C2C]"
                >
                  Capacity Utilization %
                </td>
                {weekPlans.map((w) => {
                  const isOver = w.status === 'OVERLOAD';
                  const isFull = w.status === 'FULL';
                  return (
                    <td
                      key={`util-${w.weekIndex}`}
                      className={`py-2 px-1 text-center border-r border-gray-200 font-bold text-[11px] ${
                        isOver ? 'text-[#D32F2F]' : isFull ? 'text-amber-700' : 'text-[#051C2C]'
                      }`}
                    >
                      {(w.utilization * 100).toFixed(0)}%
                    </td>
                  );
                })}
              </tr>

              {/* Row 5: Decision State Label */}
              <tr className="bg-gray-50 border-b border-gray-200">
                <td
                  colSpan={4}
                  className="sticky left-0 z-20 bg-gray-100 py-2 px-3 font-sans font-semibold text-[#051C2C] border-r-2 border-[#051C2C]"
                >
                  Decision State (Three-State)
                </td>
                {weekPlans.map((w) => {
                  const isOver = w.status === 'OVERLOAD';
                  const isFull = w.status === 'FULL';
                  return (
                    <td
                      key={`state-${w.weekIndex}`}
                      className={`py-1.5 px-0.5 text-center border-r border-gray-200 text-[10px] font-sans font-bold ${
                        isOver
                          ? 'bg-[#D32F2F] text-white'
                          : isFull
                          ? 'bg-amber-400 text-[#051C2C]'
                          : 'bg-green-100 text-[#00C853]'
                      }`}
                    >
                      {w.status === 'OVERLOAD' ? 'OVER' : w.status}
                    </td>
                  );
                })}
              </tr>

              {/* Row 6: OUT-11 Indicator Strip (Alarm Indicator) */}
              <tr className="bg-white">
                <td
                  colSpan={4}
                  className="sticky left-0 z-20 bg-white py-2.5 px-3 font-sans font-bold text-[#051C2C] border-r-2 border-[#051C2C]"
                >
                  Overload Flag (OUT-11 Alarm)
                </td>
                {weekPlans.map((w) => {
                  const hasShortage = w.staffShortage > 0;
                  return (
                    <td
                      key={`alert-${w.weekIndex}`}
                      className={`py-2 px-1 text-center border-r border-gray-200 ${
                        hasShortage ? 'bg-[#D32F2F] text-white font-bold animate-pulse' : 'text-[#00C853]'
                      }`}
                    >
                      {hasShortage ? (
                        <div className="text-[10px] leading-tight font-sans">
                          🚨 {w.staffShortage}p
                        </div>
                      ) : (
                        <span className="text-[11px] font-sans font-semibold text-[#888888]">OK</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
