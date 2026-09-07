import { SetupParams, JobItem, AppState } from '../types';

export const STORAGE_KEY = 'PAINTER_CREW_SCHEDULER_V1';

export const DEFAULT_PARAMS: SetupParams = {
  crewSize: 11,
  workDaysPerWeek: 5,
  planningStartDate: '2026-09-07',
  horizonMonths: 12,
  nearCapRate: 0.9,
  leadTimeWeeks: 4,
  minFillSlot: 1,
  currencySymbol: '$',
  unitLabel: 'Painters',
};

export const DEFAULT_JOBS: JobItem[] = [
  {
    id: 'J-26-001',
    name: 'Riverside Luxury Interior Finishing',
    startDate: '2026-09-07',
    endDate: '2026-09-25',
    crewRequired: 4,
    status: 'Active',
    priority: 'High',
  },
  {
    id: 'J-26-002',
    name: 'Intl Business Center Exterior Facade',
    startDate: '2026-09-14',
    endDate: '2026-10-09',
    crewRequired: 5,
    status: 'Planned',
    priority: 'Medium',
  },
  {
    id: 'J-26-003',
    name: 'Tech Park Exhibition Wall Refurbishment',
    startDate: '2026-09-21',
    endDate: '2026-09-25',
    crewRequired: 3,
    status: 'Planned',
    priority: 'Low',
  },
  {
    id: 'J-26-004',
    name: 'Grand Bay Hotel Lobby Repaint',
    startDate: '2026-10-12',
    endDate: '2026-10-30',
    crewRequired: 6,
    status: 'Planned',
    priority: 'High',
  },
  {
    id: 'J-26-005',
    name: 'Highland Villas Cluster Phase 1',
    startDate: '2026-10-19',
    endDate: '2026-11-06',
    crewRequired: 8,
    status: 'Planned',
    priority: 'High',
  },
  {
    id: 'J-26-006',
    name: 'City Library Acoustic Ceiling Coating',
    startDate: '2026-11-09',
    endDate: '2026-11-20',
    crewRequired: 4,
    status: 'Planned',
    priority: 'Medium',
  },
  {
    id: 'J-26-007',
    name: 'St. Jude Medical Clinic Hygienic Coating',
    startDate: '2026-11-23',
    endDate: '2026-12-11',
    crewRequired: 5,
    status: 'Planned',
    priority: 'High',
  },
  {
    id: 'J-26-008',
    name: 'Westside Logistics Warehouse Epoxy Flooring',
    startDate: '2026-12-07',
    endDate: '2026-12-25',
    crewRequired: 6,
    status: 'Planned',
    priority: 'Medium',
  },
  {
    id: 'J-26-009',
    name: 'Summit Heights Penthouse Custom Textures',
    startDate: '2027-01-04',
    endDate: '2027-01-22',
    crewRequired: 4,
    status: 'Planned',
    priority: 'Low',
  },
  {
    id: 'J-26-010',
    name: 'Metro Transit Terminal Steel Primer Coating',
    startDate: '2027-01-18',
    endDate: '2027-02-12',
    crewRequired: 7,
    status: 'Planned',
    priority: 'High',
  },
  {
    id: 'J-26-011',
    name: 'Greenfield Elementary Classrooms Refresh',
    startDate: '2027-02-15',
    endDate: '2027-03-05',
    crewRequired: 5,
    status: 'Planned',
    priority: 'Medium',
  },
  {
    id: 'J-26-012',
    name: 'Lakeside Corporate Campus Exterior recoat',
    startDate: '2027-03-15',
    endDate: '2027-04-16',
    crewRequired: 8,
    status: 'Planned',
    priority: 'High',
  },
  {
    id: 'J-26-013',
    name: 'Old Town Heritage Museum Timber Restoration',
    startDate: '2027-04-12',
    endDate: '2027-04-30',
    crewRequired: 4,
    status: 'Planned',
    priority: 'Medium',
  },
];

export function loadSavedState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        params: DEFAULT_PARAMS,
        jobs: DEFAULT_JOBS,
        lastSaved: new Date().toISOString(),
      };
    }
    const parsed = JSON.parse(raw);
    return {
      params: { ...DEFAULT_PARAMS, ...parsed.params },
      jobs: Array.isArray(parsed.jobs) ? parsed.jobs : DEFAULT_JOBS,
      lastSaved: parsed.lastSaved || new Date().toISOString(),
    };
  } catch (err) {
    console.error('Failed to parse state from localStorage', err);
    return {
      params: DEFAULT_PARAMS,
      jobs: DEFAULT_JOBS,
      lastSaved: new Date().toISOString(),
    };
  }
}

export function saveState(params: SetupParams, jobs: JobItem[]): string {
  const lastSaved = new Date().toISOString();
  try {
    const payload: AppState = { params, jobs, lastSaved };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (e) {
    console.error('Error saving state to localStorage', e);
  }
  return lastSaved;
}

export function exportBackup(params: SetupParams, jobs: JobItem[]) {
  const data: AppState = {
    params,
    jobs,
    lastSaved: new Date().toISOString(),
  };
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const dateStr = new Date().toISOString().slice(0, 10);
  a.download = `painter-crew-schedule-backup-${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function parseCsvJobs(csvText: string): { jobs: JobItem[]; errors: string[] } {
  const lines = csvText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  const jobs: JobItem[] = [];
  const errors: string[] = [];

  if (lines.length < 2) {
    return { jobs: [], errors: ['CSV content must have a header row and at least one data row.'] };
  }

  // Parse header
  const header = lines[0].split(',').map((h) => h.trim().toLowerCase().replace(/['"]/g, ''));
  const idIdx = header.findIndex((h) => h.includes('id') || h.includes('code'));
  const nameIdx = header.findIndex((h) => h.includes('name') || h.includes('project') || h.includes('title'));
  const startIdx = header.findIndex((h) => h.includes('start'));
  const endIdx = header.findIndex((h) => h.includes('end') || h.includes('finish'));
  const crewIdx = header.findIndex((h) => h.includes('crew') || h.includes('painter') || h.includes('people') || h.includes('worker'));
  const statusIdx = header.findIndex((h) => h.includes('status'));
  const priorityIdx = header.findIndex((h) => h.includes('priority'));

  if (nameIdx === -1 || startIdx === -1 || endIdx === -1) {
    errors.push('Missing required column headers. Required at least: Project Name, Start Date, End Date.');
    return { jobs: [], errors };
  }

  for (let i = 1; i < lines.length; i++) {
    // Basic comma splitter handling quotes
    const row = lines[i];
    const cells: string[] = [];
    let inQuotes = false;
    let buffer = '';

    for (let c = 0; c < row.length; c++) {
      const char = row[c];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        cells.push(buffer.trim());
        buffer = '';
      } else {
        buffer += char;
      }
    }
    cells.push(buffer.trim());

    const clean = (val?: string) => (val ? val.replace(/^["']|["']$/g, '').trim() : '');

    const name = clean(cells[nameIdx]);
    const start = clean(cells[startIdx]);
    const end = clean(cells[endIdx]);

    if (!name || !start || !end) {
      errors.push(`Row ${i + 1}: Missing project name or start/end date.`);
      continue;
    }

    const id = idIdx !== -1 && clean(cells[idIdx]) ? clean(cells[idIdx]) : `J-${Date.now().toString().slice(-4)}-${i}`;
    const rawCrew = crewIdx !== -1 ? parseInt(clean(cells[crewIdx]), 10) : 3;
    const crewRequired = isNaN(rawCrew) || rawCrew < 1 ? 3 : rawCrew;

    let status: JobItem['status'] = 'Planned';
    if (statusIdx !== -1) {
      const rawStatus = clean(cells[statusIdx]).toLowerCase();
      if (rawStatus.includes('active') || rawStatus.includes('progress')) status = 'Active';
      else if (rawStatus.includes('hold') || rawStatus.includes('pause')) status = 'On Hold';
      else if (rawStatus.includes('comp') || rawStatus.includes('done')) status = 'Completed';
    }

    let priority: JobItem['priority'] = 'Medium';
    if (priorityIdx !== -1) {
      const rawPrio = clean(cells[priorityIdx]).toLowerCase();
      if (rawPrio.includes('hi')) priority = 'High';
      else if (rawPrio.includes('lo')) priority = 'Low';
    }

    jobs.push({
      id,
      name,
      startDate: start,
      endDate: end,
      crewRequired,
      status,
      priority,
    });
  }

  return { jobs, errors };
}
