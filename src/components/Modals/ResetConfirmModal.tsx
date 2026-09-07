import React from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#051C2C]/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in">
        <div className="p-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-red-50 text-[#D32F2F] flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="garamond text-2xl font-bold text-[#051C2C]">
            Reset All Data to Blueprint Defaults?
          </h3>
          <p className="text-xs text-[#888888] max-w-sm mx-auto leading-relaxed">
            This will restore the 11-painter setup parameters and the 13 seed demonstration project work orders. Any unsaved custom records will be replaced.
          </p>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-[#888888] hover:text-[#051C2C] cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-xs font-semibold rounded bg-[#D32F2F] hover:opacity-90 text-white transition-opacity shadow-sm cursor-pointer"
          >
            Yes, Reset Data
          </button>
        </div>
      </div>
    </div>
  );
};
