import { useState } from 'react';
import { Plus, Trash2, Calendar, User } from 'lucide-react';
import Spinner from '../common/Spinner';

export default function NotesPanel({ notes = [], onAdd, onDelete, loading }) {
  const [content, setContent] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [adding, setAdding] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    await onAdd({ content, followUpDate });
    setContent('');
    setFollowUpDate('');
    setAdding(false);
  };

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">Notes & Follow-ups</h3>
        <button onClick={() => setAdding(!adding)} className="btn-primary text-sm py-1.5 px-3">
          <Plus size={16} /> Add Note
        </button>
      </div>

      {adding && (
        <form onSubmit={handleAdd} className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 space-y-3">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add a note or follow-up..."
            rows={3}
            className="input-field resize-none"
            required
          />
          <div className="flex gap-3 flex-wrap">
            <div className="flex-1 min-w-[150px]">
              <label className="label text-xs">Follow-up Date</label>
              <input type="datetime-local" value={followUpDate} onChange={(e) => setFollowUpDate(e.target.value)} className="input-field text-sm" />
            </div>
            <div className="flex items-end gap-2">
              <button type="button" onClick={() => setAdding(false)} className="btn-secondary text-sm py-2">Cancel</button>
              <button type="submit" disabled={loading} className="btn-primary text-sm py-2">
                {loading ? <Spinner size="sm" /> : 'Save'}
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {notes.length === 0 ? (
          <p className="text-center text-gray-400 dark:text-gray-500 text-sm py-8">No notes yet. Add your first note above.</p>
        ) : (
          [...notes].reverse().map((note) => (
            <div key={note._id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700 group">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm text-gray-800 dark:text-gray-200 flex-1">{note.content}</p>
                <button onClick={() => onDelete(note._id)} className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-gray-400 hover:text-red-500 transition-all">
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1"><User size={11} />{note.adminName}</span>
                <span className="flex items-center gap-1">
                  <Calendar size={11} />
                  {new Date(note.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </span>
                {note.followUpDate && (
                  <span className="flex items-center gap-1 text-blue-500 font-medium">
                    Follow-up: {new Date(note.followUpDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
