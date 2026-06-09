import { AlertTriangle } from 'lucide-react';
import Spinner from './Spinner';

export default function DeleteModal({ isOpen, onClose, onConfirm, title, message, loading }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertTriangle size={20} className="text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title || 'Confirm Delete'}</h3>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{message || 'Are you sure you want to delete this? This action cannot be undone.'}</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="btn-secondary flex-1 justify-center">Cancel</button>
          <button onClick={onConfirm} disabled={loading} className="btn-danger flex-1 justify-center">
            {loading ? <Spinner size="sm" /> : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
