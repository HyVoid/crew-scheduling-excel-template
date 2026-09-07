import React, { useState, useRef } from 'react';
import { JobItem } from '../../types';
import { parseCsvJobs } from '../../utils/storage';
import { X, Upload, FileSpreadsheet, Download, AlertCircle, CheckCircle2, Copy, Check } from 'lucide-react';

interface CsvImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (jobs: JobItem[], mode: 'replace' | 'append') => void;
}

const SAMPLE_CSV = `Job ID,Project Name,Start Date,End Date,Crew Required,Status,Priority
J-26-020,Harbor Point Marina Deck Coating,2026-10-05,2026-10-23,4,Planned,High
J-26-021,Oakwood Medical Center Corridor Repaint,2026-11-02,2026-11-20,5,Planned,Medium
J-26-022,Central High Auditorium Wall Enamel,2026-11-16,2026-12-04,3,Planned,Low`;

export const CsvImportModal: React.FC<CsvImportModalProps> = ({ isOpen, onClose, onImport }) => {
  const [csvText, setCsvText] = useState('');
  const [importMode, setImportMode] = useState<'append' | 'replace'>('append');
  const [parsedJobs, setParsedJobs] = useState<JobItem[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleParse = (text: string) => {
    setCsvText(text);
    if (!text.trim()) {
      setParsedJobs([]);
      setErrors([]);
      return;
    }
    const result = parseCsvJobs(text);
    setParsedJobs(result.jobs);
    setErrors(result.errors);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        handleParse(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        handleParse(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(SAMPLE_CSV);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTemplate = () => {
    const blob = new Blob([SAMPLE_CSV], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'job-orders-template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExecuteImport = () => {
    if (parsedJobs.length === 0) return;
    onImport(parsedJobs, importMode);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#051C2C]/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden animate-in">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded bg-blue-50 text-[#2251FF]">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="garamond text-xl font-bold text-[#051C2C]">
                Bulk Import Project Jobs (CSV)
              </h3>
              <p className="text-xs text-[#888888]">
                Upload or paste comma-separated job work orders directly into the system.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-[#888888] hover:text-[#051C2C] hover:bg-gray-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Template Actions */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200 text-xs">
            <span className="text-[#051C2C] font-medium">Need the standard CSV structure?</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyTemplate}
                className="flex items-center gap-1 px-2.5 py-1 bg-white border border-gray-200 hover:bg-gray-50 rounded text-[#051C2C] font-medium cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#00C853]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Sample'}</span>
              </button>
              <button
                onClick={handleDownloadTemplate}
                className="flex items-center gap-1 px-2.5 py-1 bg-white border border-gray-200 hover:bg-gray-50 rounded text-[#051C2C] font-medium cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#888888]" />
                <span>Download Template (.csv)</span>
              </button>
            </div>
          </div>

          {/* Drag & Drop Zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleFileDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`p-6 border-2 border-dashed rounded flex flex-col items-center justify-center cursor-pointer transition-colors ${
              isDragging
                ? 'border-[#2251FF] bg-blue-50/50'
                : 'border-gray-300 hover:border-[#2251FF] bg-gray-50/40'
            }`}
          >
            <Upload className="w-8 h-8 text-[#888888] mb-2" />
            <span className="text-xs font-semibold text-[#051C2C]">
              Drag & Drop your .csv file here, or click to browse
            </span>
            <span className="text-[11px] text-[#888888] mt-1">Supports UTF-8 CSV exports from Excel</span>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,text/csv"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Or Paste CSV Textarea */}
          <div>
            <label className="block text-xs font-semibold text-[#051C2C] mb-1">
              Or Paste CSV Data Directly:
            </label>
            <textarea
              rows={5}
              placeholder="Paste raw CSV text with headers here..."
              value={csvText}
              onChange={(e) => handleParse(e.target.value)}
              className="w-full p-2.5 text-xs font-mono bg-gray-50 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-[#2251FF]"
            />
          </div>

          {/* Errors or Validation Preview */}
          {errors.length > 0 && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-[#D32F2F] space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <AlertCircle className="w-4 h-4" />
                <span>Import Validation Issues:</span>
              </div>
              {errors.map((err, i) => (
                <div key={i} className="text-[11px] ml-5">• {err}</div>
              ))}
            </div>
          )}

          {parsedJobs.length > 0 && (
            <div className="p-3 bg-green-50 border border-green-200 rounded text-xs text-[#00C853] flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-4 h-4 text-[#00C853]" />
                <span>Successfully parsed {parsedJobs.length} valid project work orders!</span>
              </div>
            </div>
          )}

          {/* Import Mode Radio */}
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs font-medium text-[#888888]">Import Strategy:</span>
            <div className="flex items-center gap-4 text-xs">
              <label className="flex items-center gap-1.5 cursor-pointer text-[#051C2C]">
                <input
                  type="radio"
                  name="importMode"
                  checked={importMode === 'append'}
                  onChange={() => setImportMode('append')}
                />
                <span>Append to existing jobs</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer text-[#051C2C]">
                <input
                  type="radio"
                  name="importMode"
                  checked={importMode === 'replace'}
                  onChange={() => setImportMode('replace')}
                />
                <span>Replace all current jobs</span>
              </label>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-[#888888] hover:text-[#051C2C] cursor-pointer"
          >
            Cancel
          </button>
          <button
            disabled={parsedJobs.length === 0}
            onClick={handleExecuteImport}
            className={`px-4 py-2 text-xs font-semibold rounded text-white transition-opacity shadow-sm cursor-pointer ${
              parsedJobs.length > 0
                ? 'bg-[#2251FF] hover:opacity-90'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Confirm Import ({parsedJobs.length} Jobs)
          </button>
        </div>
      </div>
    </div>
  );
};
