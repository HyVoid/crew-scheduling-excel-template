import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { SetupParams, JobItem } from './types';
import {
  loadSavedState,
  saveState,
  exportBackup,
  DEFAULT_PARAMS,
  DEFAULT_JOBS,
} from './utils/storage';
import { computeAll } from './utils/engine';
import { Sidebar, TabKey } from './components/Sidebar';
import { Footer } from './components/Footer';
import { SetupView } from './components/SetupView';
import { JobsView } from './components/JobsView';
import { ResourcePlanView } from './components/ResourcePlanView';
import { TimelineView } from './components/TimelineView';
import { DashboardView } from './components/DashboardView';
import { CsvImportModal } from './components/Modals/CsvImportModal';
import { BackupModal } from './components/Modals/BackupModal';
import { ResetConfirmModal } from './components/Modals/ResetConfirmModal';

export default function App() {
  // Initialize state from localStorage
  const [params, setParams] = useState<SetupParams>(() => {
    const saved = loadSavedState();
    return saved.params;
  });

  const [jobs, setJobs] = useState<JobItem[]>(() => {
    const saved = loadSavedState();
    return saved.jobs;
  });

  const [lastSaved, setLastSaved] = useState<string | null>(() => {
    const saved = loadSavedState();
    return saved.lastSaved;
  });

  const [activeTab, setActiveTab] = useState<TabKey>('DASHBOARD');

  // Modals state
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Auto save to localStorage when params or jobs change
  const handleAutoSave = useCallback((newParams: SetupParams, newJobs: JobItem[]) => {
    const savedTimestamp = saveState(newParams, newJobs);
    setLastSaved(savedTimestamp);
  }, []);

  // Update handlers
  const handleUpdateParams = (newParams: SetupParams) => {
    setParams(newParams);
    handleAutoSave(newParams, jobs);
  };

  const handleUpdateJob = (updatedJob: JobItem) => {
    const updated = jobs.map((j) => (j.id === updatedJob.id ? updatedJob : j));
    setJobs(updated);
    handleAutoSave(params, updated);
  };

  const handleAddJob = (newJob: JobItem) => {
    const updated = [newJob, ...jobs];
    setJobs(updated);
    handleAutoSave(params, updated);
  };

  const handleDeleteJob = (id: string) => {
    const updated = jobs.filter((j) => j.id !== id);
    setJobs(updated);
    handleAutoSave(params, updated);
  };

  // CSV Import
  const handleImportCsvJobs = (importedJobs: JobItem[], mode: 'replace' | 'append') => {
    let updated: JobItem[];
    if (mode === 'replace') {
      updated = importedJobs;
    } else {
      // Append, replace matching IDs or add new
      const existingMap = new Map<string, JobItem>(jobs.map((j) => [j.id, j]));
      importedJobs.forEach((j) => existingMap.set(j.id, j));
      updated = Array.from(existingMap.values());
    }
    setJobs(updated);
    handleAutoSave(params, updated);
  };

  // Backup & Restore
  const handleExportBackup = () => {
    exportBackup(params, jobs);
  };

  const handleRestoreBackup = (newParams: SetupParams, newJobs: JobItem[]) => {
    setParams(newParams);
    setJobs(newJobs);
    handleAutoSave(newParams, newJobs);
  };

  // Reset to default
  const handleResetDefaults = () => {
    setParams(DEFAULT_PARAMS);
    setJobs(DEFAULT_JOBS);
    handleAutoSave(DEFAULT_PARAMS, DEFAULT_JOBS);
  };

  // Compute full engine results reactively
  const engineResult = useMemo(() => {
    return computeAll(jobs, params);
  }, [jobs, params]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[var(--color-bg)]">
      {/* Persistent Sidebar on Desktop / Sliding Drawer on Mobile */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        lastSaved={lastSaved}
        onExportBackup={handleExportBackup}
        onOpenImportBackup={() => setIsBackupModalOpen(true)}
        onOpenCsvImport={() => setIsCsvModalOpen(true)}
        onResetData={() => setIsResetModalOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <main className="flex-1 w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          {activeTab === 'SETUP' && (
            <SetupView
              params={params}
              onChangeParams={handleUpdateParams}
              horizonEndDate={engineResult.horizonEndDate}
              totalWeeksCount={engineResult.totalWeeksCount}
              weeklyCapacityManDays={engineResult.weeklyCapacityManDays}
            />
          )}

          {activeTab === 'JOBS' && (
            <JobsView
              jobs={jobs}
              computedJobs={engineResult.computedJobs}
              params={params}
              onUpdateJob={handleUpdateJob}
              onAddJob={handleAddJob}
              onDeleteJob={handleDeleteJob}
            />
          )}

          {activeTab === 'ENGINE' && (
            <ResourcePlanView
              weekPlans={engineResult.weekPlans}
              params={params}
            />
          )}

          {activeTab === 'TIMELINE' && (
            <TimelineView
              computedJobs={engineResult.computedJobs}
              weekPlans={engineResult.weekPlans}
              params={params}
              onSelectJob={() => setActiveTab('JOBS')}
            />
          )}

          {activeTab === 'DASHBOARD' && (
            <DashboardView
              metrics={engineResult.metrics}
              monthSummaries={engineResult.monthSummaries}
              overloadEvents={engineResult.overloadEvents}
              openSlots={engineResult.openSlots}
              params={params}
              weekPlans={engineResult.weekPlans}
              onNavigateToJobs={() => setActiveTab('JOBS')}
              onNavigateToTimeline={() => setActiveTab('TIMELINE')}
            />
          )}
        </main>

        {/* Footer with mandatory privacy security notice */}
        <Footer />
      </div>

      {/* Modals */}
      <CsvImportModal
        isOpen={isCsvModalOpen}
        onClose={() => setIsCsvModalOpen(false)}
        onImport={handleImportCsvJobs}
      />

      <BackupModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
        onRestoreBackup={handleRestoreBackup}
      />

      <ResetConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleResetDefaults}
      />
    </div>
  );
}
