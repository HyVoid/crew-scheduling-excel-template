import React, { useState } from 'react';
import { JobItem, ComputedJobItem, SetupParams, JobStatus, JobPriority } from '../types';
import {
  Briefcase,
  Plus,
  Trash2,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  PauseCircle,
  CheckCheck,
  AlertCircle,
} from 'lucide-react';

interface JobsViewProps {
  jobs: JobItem[];
  computedJobs: ComputedJobItem[];
  params: SetupParams;
  onUpdateJob: (job: JobItem) => void;
  onAddJob: (job: JobItem) => void;
  onDeleteJob: (id: string) => void;
}

export const JobsView: React.FC<JobsViewProps> = ({
  computedJobs,
  params,
  onUpdateJob,
  onAddJob,
  onDeleteJob,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');

  // Max man-days for inline data-bar scaling
  const maxManDays = Math.max(...computedJobs.map((j) => j.totalManDays || 0), 100);

  const filteredJobs = computedJobs.filter((job) => {
    const matchesSearch =
      job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || job.status === statusFilter;
    const matchesPriority = priorityFilter === 'ALL' || job.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleCreateQuickJob = () => {
    const nextIdx = computedJobs.length + 1;
    const newId = `J-26-${String(nextIdx).padStart(3, '0')}`;
    const newJob: JobItem = {
      id: newId,
      name: 'New Commercial Paint Job',
      startDate: params.planningStartDate,
      endDate: params.planningStartDate,
      crewRequired: 4,
      status: 'Planned',
      priority: 'Medium',
    };
    onAddJob(newJob);
  };

  const getStatusBadge = (status: JobStatus) => {
    switch (status) {
      case 'Active':
        return (
          <span className="badge-pill bg-blue-50 text-[var(--color-accent)] border border-blue-200">
            <Clock className="w-3 h-3 animate-spin" /> Active
          </span>
        );
      case 'Planned':
        return (
          <span className="badge-pill bg-slate-100 text-slate-700 border border-slate-200">
            <CheckCircle2 className="w-3 h-3 text-slate-500" /> Planned
          </span>
        );
      case 'On Hold':
        return (
          <span className="badge-pill bg-amber-50 text-amber-700 border border-amber-200">
            <PauseCircle className="w-3 h-3" /> On Hold
          </span>
        );
      case 'Completed':
        return (
          <span className="badge-pill bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCheck className="w-3 h-3" /> Done
          </span>
        );
    }
  };

  const getPriorityBadge = (prio: JobPriority) => {
    switch (prio) {
      case 'High':
        return <span className="font-semibold text-rose-700 text-xs">High</span>;
      case 'Medium':
        return <span className="text-slate-600 text-xs">Medium</span>;
      case 'Low':
        return <span className="text-slate-400 text-xs">Low</span>;
    }
  };

  return (
    <div id="view-jobs-container" className="view-fade-up space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2251FF] mb-1">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Sheet 01_JOBS • Project Intake Master Data (tbl_Jobs)</span>
          </div>
          <h1 className="garamond text-3xl font-bold text-[#051C2C]">
            Project Work Orders & Crew Requirements
          </h1>
          <p className="text-[#888888] mt-1 max-w-2xl text-sm">
            Edit dates, required crew, and statuses directly in table cells. Yellow cells indicate editable fields.
            Formulas recalculate workdays, man-days, and inclusion validity in real-time.
          </p>
        </div>

        <button
          id="btn-add-new-job"
          onClick={handleCreateQuickJob}
          className="flex items-center gap-2 px-3.5 py-2 bg-[#051C2C] text-white hover:opacity-90 rounded text-xs font-medium transition-opacity cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project Order</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[#888888]" />
          <input
            id="job-search-input"
            type="text"
            placeholder="Search by job ID or project name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded text-xs focus:outline-none focus:border-[#2251FF] transition-all text-[#051C2C]"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-[#888888]">
            <Filter className="w-3.5 h-3.5" />
            <span>Status:</span>
          </div>
          <select
            id="filter-job-status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-white border border-gray-200 rounded focus:outline-none text-[#051C2C]"
          >
            <option value="ALL">All Statuses ({computedJobs.length})</option>
            <option value="Active">Active</option>
            <option value="Planned">Planned</option>
            <option value="On Hold">On Hold</option>
            <option value="Completed">Completed</option>
          </select>

          <div className="flex items-center gap-1.5 text-xs text-[#888888] ml-2">
            <span>Priority:</span>
          </div>
          <select
            id="filter-job-priority"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-white border border-gray-200 rounded focus:outline-none text-[#051C2C]"
          >
            <option value="ALL">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <span className="text-xs text-[#888888] ml-auto md:ml-4">
            Showing <strong className="text-[#051C2C]">{filteredJobs.length}</strong> jobs
          </span>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table id="tbl-jobs-table" className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="table-header py-3 px-3 text-left w-24">Job ID</th>
                <th className="table-header py-3 px-3 text-left min-w-[220px]">Project Name</th>
                <th className="table-header py-3 px-3 text-left w-36">Start Date</th>
                <th className="table-header py-3 px-3 text-left w-36">End Date</th>
                <th className="table-header py-3 px-3 text-right w-24">Crew Req</th>
                <th className="table-header py-3 px-3 text-center w-28">Status</th>
                <th className="table-header py-3 px-3 text-center w-24">Priority</th>
                <th className="table-header py-3 px-3 text-right w-24 text-[#888888] font-normal">Cal. Days</th>
                <th className="table-header py-3 px-3 text-right w-24 text-[#888888] font-normal">Work Days</th>
                <th className="table-header py-3 px-3 text-right min-w-[140px] text-[#888888] font-normal">Total Man-Days</th>
                <th className="table-header py-3 px-3 text-center w-20 text-[#888888] font-normal">In Plan</th>
                <th className="table-header py-3 px-3 text-center w-14"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-xs">
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={12} className="py-12 text-center text-[#888888]">
                    No project work orders found matching your search or filters.
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => {
                  const manDaysPercent = Math.min(100, Math.round((job.totalManDays / maxManDays) * 100));

                  return (
                    <tr
                      key={job.id}
                      className={`hover:bg-gray-50/60 transition-colors ${
                        !job.includeInPlan ? 'opacity-60 bg-gray-50/40' : ''
                      }`}
                    >
                      {/* Job ID */}
                      <td className="py-2.5 px-3 font-mono font-medium text-[#051C2C]">
                        <input
                          type="text"
                          value={job.id}
                          onChange={(e) => onUpdateJob({ ...job, id: e.target.value })}
                          className="editable-cell-input w-20 px-1.5 py-1 text-xs font-mono font-semibold"
                        />
                      </td>

                      {/* Name */}
                      <td className="py-2.5 px-3">
                        <input
                          type="text"
                          value={job.name}
                          onChange={(e) => onUpdateJob({ ...job, name: e.target.value })}
                          className="editable-cell-input w-full px-2 py-1 text-xs font-medium text-[#051C2C]"
                        />
                      </td>

                      {/* Start Date */}
                      <td className="py-2.5 px-3">
                        <input
                          type="date"
                          value={job.startDate}
                          onChange={(e) => onUpdateJob({ ...job, startDate: e.target.value })}
                          className="editable-cell-input w-full px-2 py-1 text-xs font-mono"
                        />
                      </td>

                      {/* End Date */}
                      <td className="py-2.5 px-3">
                        <input
                          type="date"
                          value={job.endDate}
                          onChange={(e) => onUpdateJob({ ...job, endDate: e.target.value })}
                          className="editable-cell-input w-full px-2 py-1 text-xs font-mono"
                        />
                      </td>

                      {/* Crew Required */}
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <input
                            type="number"
                            min={1}
                            max={50}
                            value={job.crewRequired}
                            onChange={(e) =>
                              onUpdateJob({
                                ...job,
                                crewRequired: Math.max(1, parseInt(e.target.value) || 1),
                              })
                            }
                            className="editable-cell-input w-14 px-1.5 py-1 text-xs font-mono font-bold text-right text-[#051C2C]"
                          />
                          <span className="text-[10px] text-[#888888]">p</span>
                        </div>
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-2.5 px-3 text-center">
                        <select
                          value={job.status}
                          onChange={(e) => onUpdateJob({ ...job, status: e.target.value as JobStatus })}
                          className="text-[11px] font-medium px-2 py-1 bg-white border border-gray-200 rounded focus:outline-none cursor-pointer text-[#051C2C]"
                        >
                          <option value="Planned">Planned</option>
                          <option value="Active">Active</option>
                          <option value="On Hold">On Hold</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>

                      {/* Priority */}
                      <td className="py-2.5 px-3 text-center">
                        <select
                          value={job.priority}
                          onChange={(e) => onUpdateJob({ ...job, priority: e.target.value as JobPriority })}
                          className="text-[11px] font-medium px-2 py-1 bg-white border border-gray-200 rounded focus:outline-none cursor-pointer text-[#051C2C]"
                        >
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </td>

                      {/* Auto Calc: Calendar Days */}
                      <td className="py-2.5 px-3 text-right font-mono text-[#888888] bg-gray-50/40">
                        {job.calendarDays} d
                      </td>

                      {/* Auto Calc: Work Days */}
                      <td className="py-2.5 px-3 text-right font-mono text-[#051C2C] bg-gray-50/40 font-medium">
                        {job.workDays} d
                      </td>

                      {/* Auto Calc: Total Man-Days with Data Bar */}
                      <td className="py-2.5 px-3 text-right bg-gray-50/40">
                        <div className="flex flex-col items-end gap-1">
                          <span className="font-mono font-bold text-[#051C2C]">
                            {job.totalManDays.toLocaleString()}
                          </span>
                          {/* Inline Data Bar */}
                          <div className="data-bar-track w-full">
                            <div
                              className="data-bar-fill"
                              style={{ width: `${manDaysPercent}%`, backgroundColor: '#2251FF' }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* In Plan Validity Flag */}
                      <td className="py-2.5 px-3 text-center">
                        {job.includeInPlan ? (
                          <span className="pill bg-green-100 text-[#00C853] font-bold">
                            Y
                          </span>
                        ) : (
                          <span
                            className="pill bg-gray-100 text-[#888888] font-bold"
                            title="Not included: status is On Hold/Done or dates fall outside current horizon"
                          >
                            N
                          </span>
                        )}
                      </td>

                      {/* Delete */}
                      <td className="py-2.5 px-3 text-center">
                        <button
                          onClick={() => onDeleteJob(job.id)}
                          className="p-1 text-[#888888] hover:text-[#D32F2F] rounded transition-colors cursor-pointer"
                          title="Delete this job order"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
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
