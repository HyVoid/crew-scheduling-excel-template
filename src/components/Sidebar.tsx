import React, { useState } from 'react';
import {
  Sliders,
  Briefcase,
  Table,
  Calendar,
  BarChart3,
  Download,
  Upload,
  FileSpreadsheet,
  Menu,
  X,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export type TabKey = 'SETUP' | 'JOBS' | 'ENGINE' | 'TIMELINE' | 'DASHBOARD';

interface SidebarProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  lastSaved: string | null;
  onExportBackup: () => void;
  onOpenImportBackup: () => void;
  onOpenCsvImport: () => void;
  onResetData: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  lastSaved,
  onExportBackup,
  onOpenImportBackup,
  onOpenCsvImport,
  onResetData,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const formatSavedTime = (isoString: string | null) => {
    if (!isoString) return 'Not saved yet';
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch {
      return 'Just now';
    }
  };

  const navItems: { key: TabKey; label: string; sheetNo: string; icon: React.ReactNode; desc: string }[] = [
    {
      key: 'DASHBOARD',
      label: 'Executive Dashboard',
      sheetNo: '04',
      icon: <BarChart3 className="w-4 h-4" />,
      desc: 'KPIs, Trends & What-If Sandbox',
    },
    {
      key: 'TIMELINE',
      label: '12M Gantt & Heatmap',
      sheetNo: '03',
      icon: <Calendar className="w-4 h-4" />,
      desc: 'Dual-Track Visual Capacity',
    },
    {
      key: 'JOBS',
      label: 'Work Order Master',
      sheetNo: '01',
      icon: <Briefcase className="w-4 h-4" />,
      desc: 'Job Intake & Crew Demands',
    },
    {
      key: 'ENGINE',
      label: 'Resource Plan Matrix',
      sheetNo: '02',
      icon: <Table className="w-4 h-4" />,
      desc: '52-Week Allocation Engine',
    },
    {
      key: 'SETUP',
      label: 'System Parameters',
      sheetNo: '00',
      icon: <Sliders className="w-4 h-4" />,
      desc: 'Crew Size & Business Rules',
    },
  ];

  const handleSelectTab = (tab: TabKey) => {
    onTabChange(tab);
    setMobileOpen(false);
  };

  // Nav list rendering
  const renderNavContent = () => (
    <div className="flex flex-col h-full justify-between">
      {/* Top Brand & Navigation */}
      <div>
        {/* Brand Identity Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[#051C2C] flex items-center justify-center text-white font-bold text-base shadow-sm">
              11
            </div>
            <div>
              <h1 className="garamond text-lg font-bold text-[#051C2C] tracking-tight leading-none">
                Painter Crew
              </h1>
              <span className="text-[11px] text-[#888888] font-medium tracking-wide">
                52-Week Capacity Console
              </span>
            </div>
          </div>
          {/* Mobile Close Button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded text-[#888888] hover:text-[#051C2C] hover:bg-gray-100 lg:hidden cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section: Main Navigation */}
        <div className="p-3">
          <div className="px-3 py-2 text-[10px] font-semibold text-[#888888] uppercase tracking-wider">
            Workspace Views
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  id={`tab-btn-${item.key.toLowerCase()}`}
                  onClick={() => handleSelectTab(item.key)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-left transition-all cursor-pointer group ${
                    isActive
                      ? 'bg-[#051C2C] text-white shadow-sm'
                      : 'text-[#555555] hover:bg-gray-50 hover:text-[#051C2C]'
                  }`}
                >
                  <span
                    className={`${
                      isActive ? 'text-[#2251FF]' : 'text-[#888888] group-hover:text-[#051C2C]'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold truncate leading-snug">
                        {item.label}
                      </span>
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                          isActive
                            ? 'bg-white/10 text-gray-300'
                            : 'bg-gray-100 text-[#888888] group-hover:bg-gray-200'
                        }`}
                      >
                        {item.sheetNo}
                      </span>
                    </div>
                    <p
                      className={`text-[10px] truncate leading-none mt-0.5 ${
                        isActive ? 'text-gray-300' : 'text-[#888888]'
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Section: Data Operations */}
        <div className="p-3 pt-2">
          <div className="px-3 py-2 text-[10px] font-semibold text-[#888888] uppercase tracking-wider border-t border-gray-100">
            Data Actions
          </div>
          <div className="space-y-1.5">
            {/* Bulk CSV Import Button */}
            <button
              id="btn-bulk-csv-import"
              onClick={() => {
                onOpenCsvImport();
                setMobileOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded bg-[#051C2C] text-white hover:opacity-90 transition-opacity text-xs font-medium cursor-pointer shadow-sm"
              title="Bulk CSV Import"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#2251FF]" />
              <span>Bulk CSV Import</span>
            </button>

            {/* Export Backup Button */}
            <button
              id="btn-export-backup"
              onClick={() => {
                onExportBackup();
                setMobileOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded bg-white border border-gray-200 hover:bg-gray-50 text-[#051C2C] transition-colors text-xs font-medium cursor-pointer"
              title="Export JSON Backup"
            >
              <Download className="w-4 h-4 text-[#888888]" />
              <span>Export Backup (.json)</span>
            </button>

            {/* Import Backup Button */}
            <button
              id="btn-import-backup"
              onClick={() => {
                onOpenImportBackup();
                setMobileOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded bg-white border border-gray-200 hover:bg-gray-50 text-[#051C2C] transition-colors text-xs font-medium cursor-pointer"
              title="Import JSON Backup"
            >
              <Upload className="w-4 h-4 text-[#888888]" />
              <span>Restore Backup</span>
            </button>

            {/* Reset Defaults */}
            <div className="pt-1 px-1 flex items-center justify-between text-[11px]">
              <span className="text-[#888888]">Reset Workbook</span>
              <button
                id="btn-reset-data"
                onClick={() => {
                  onResetData();
                  setMobileOpen(false);
                }}
                className="text-[#D32F2F] font-semibold hover:underline cursor-pointer"
                title="Reset data to defaults"
              >
                Reset Defaults
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Card: LocalStorage & Sync state */}
      <div className="p-3 border-t border-gray-100 bg-gray-50/60">
        <div className="p-2.5 bg-white border border-gray-200/80 rounded space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-[#888888] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00C853] inline-block animate-pulse" />
              Local Sync
            </span>
            <ShieldCheck className="w-3.5 h-3.5 text-[#00C853]" />
          </div>
          <div id="last-saved-indicator" className="text-[11px] font-mono text-[#051C2C] truncate">
            Saved: {formatSavedTime(lastSaved)}
          </div>
          <p className="text-[10px] text-[#888888] leading-tight">
            Client-side persistence active. No external data telemetry.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Header Bar (< lg) */}
      <header className="lg:hidden sticky top-0 z-40 h-[52px] bg-white border-b border-gray-200 flex items-center justify-between px-4">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-1.5 rounded text-[#051C2C] hover:bg-gray-100 cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-[#051C2C] flex items-center justify-center text-white font-bold text-xs">
              11
            </div>
            <span className="garamond font-bold text-base text-[#051C2C]">
              Painter Crew
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCsvImport}
            className="px-2.5 py-1 rounded bg-[#051C2C] text-white text-xs font-medium cursor-pointer"
          >
            CSV
          </button>
        </div>
      </header>

      {/* Mobile Backdrop & Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-[#051C2C]/50 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 w-72 bg-white shadow-2xl z-50 overflow-y-auto">
            {renderNavContent()}
          </aside>
        </div>
      )}

      {/* Desktop Persistent Sidebar (>= lg) */}
      <aside
        id="app-sidebar"
        className="hidden lg:flex w-64 xl:w-72 shrink-0 h-screen sticky top-0 flex-col bg-white border-r border-gray-200 z-30 select-none overflow-y-auto"
      >
        {renderNavContent()}
      </aside>
    </>
  );
};
