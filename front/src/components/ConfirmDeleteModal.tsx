import React from 'react';

interface ConfirmDeleteModalProps {
  show: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ show, onCancel, onConfirm }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs text-center">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Delete task?</h3>
        <p className="text-gray-600 mb-6">This action cannot be undone.</p>
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
            onClick={onCancel}
          >Cancel</button>
          <button
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
            onClick={onConfirm}
          >Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal; 