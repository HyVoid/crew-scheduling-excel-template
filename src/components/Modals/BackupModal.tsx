import React, { useState, useRef } from 'react';
import { SetupParams, JobItem, AppState } from '../../types';
import { X, Upload, FileJson, AlertCircle } from 'lucide-react';

interface BackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestoreBackup: (params: SetupParams, jobs: JobItem[]) => void;
}

export const BackupModal: React.FC<BackupModalProps> = ({ isOpen, onClose, onRestoreBackup }) => {
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleProcessJson = (text: string) => {
    try {
      const parsed = JSON.parse(text) as AppState;
      if (!parsed.params || !Array.isArray(parsed.jobs)) {
        throw new Error('Invalid backup file format: missing "params" or "jobs" property.');
      }
      onRestoreBackup(parsed.params, parsed.jobs);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to parse JSON file.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        handleProcessJson(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#051C2C]/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded bg-blue-50 text-[#2251FF]">
              <FileJson className="w-5 h-5" />
            </div>
            <div>
              <h3 className="garamond text-xl font-bold text-[#051C2C]">
                Import JSON Backup
              </h3>
              <p className="text-xs text-[#888888]">Restore your complete workbook state from a file.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-[#888888] hover:text-[#051C2C] hover:bg-gray-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="p-8 border-2 border-dashed border-gray-300 hover:border-[#2251FF] rounded flex flex-col items-center justify-center cursor-pointer transition-colors bg-gray-50/40"
          >
            <Upload className="w-8 h-8 text-[#888888] mb-2" />
            <span className="text-xs font-semibold text-[#051C2C]">Click to select backup JSON file</span>
            <span className="text-[11px] text-[#888888] mt-1">.json file exported from this application</span>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-[#D32F2F] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-[#888888] hover:text-[#051C2C] cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
