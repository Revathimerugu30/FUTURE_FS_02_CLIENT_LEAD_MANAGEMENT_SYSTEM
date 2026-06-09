import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, Mail, Phone, Building2, Globe, DollarSign } from 'lucide-react';
import { getLead, updateLead, updateLeadStatus, addNote, deleteNote } from '../utils/api';
import StatusBadge from '../components/common/StatusBadge';
import LeadModal from '../components/leads/LeadModal';
import NotesPanel from '../components/leads/NotesPanel';
import { LoadingPage } from '../components/common/Spinner';
import toast from 'react-hot-toast';

const STATUSES = ['New', 'Contacted', 'Converted', 'Lost'];

export default function LeadDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [noteLoading, setNoteLoading] = useState(false);

  const fetchLead = async () => {
    try {
      const res = await getLead(id);
      setLead(res.data.data);
    } catch { toast.error('Lead not found'); navigate('/leads'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchLead(); }, [id]);

  const handleUpdate = async (form) => {
    setSaving(true);
    try {
      const res = await updateLead(id, form);
      setLead(res.data.data);
      setEditOpen(false);
      toast.success('Lead updated');
    } catch { toast.error('Failed to update'); }
    finally { setSaving(false); }
  };

  const handleStatusChange = async (status) => {
    try {
      const res = await updateLeadStatus(id, status);
      setLead(res.data.data);
      toast.success(`Status updated to ${status}`);
    } catch { toast.error('Failed to update status'); }
  };

  const handleAddNote = async (data) => {
    setNoteLoading(true);
    try {
      const res = await addNote(id, data);
      setLead(res.data.data);
      toast.success('Note added');
    } catch { toast.error('Failed to add note'); }
    finally { setNoteLoading(false); }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      const res = await deleteNote(id, noteId);
      setLead(res.data.data);
      toast.success('Note deleted');
    } catch { toast.error('Failed to delete note'); }
  };

  if (loading) return <LoadingPage />;
  if (!lead) return null;

  return (
    <div className="space-y-5 max-w-5xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/leads')} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
          <ArrowLeft size={18} className="text-gray-600 dark:text-gray-300" />
        </button>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{lead.name}</h2>
          <p className="text-sm text-gray-500">Lead Details</p>
        </div>
        <button onClick={() => setEditOpen(true)} className="btn-secondary">
          <Edit2 size={16} /> Edit Lead
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Info card */}
        <div className="lg:col-span-2 space-y-5">
          <div className="card p-6">
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center text-2xl font-bold">
                  {lead.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{lead.name}</h3>
                  {lead.company && <p className="text-gray-500 text-sm">{lead.company}</p>}
                </div>
              </div>
              <StatusBadge status={lead.status} size="md" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Mail, label: 'Email', value: lead.email },
                { icon: Phone, label: 'Phone', value: lead.phone || '—' },
                { icon: Building2, label: 'Company', value: lead.company || '—' },
                { icon: Globe, label: 'Source', value: lead.source },
                { icon: DollarSign, label: 'Deal Value', value: lead.value ? `$${lead.value.toLocaleString()}` : '—' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/40 rounded-xl">
                  <div className="w-8 h-8 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center shadow-sm">
                    <Icon size={15} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{value}</p>
                  </div>
                </div>
              ))}
              <div className="p-3 bg-gray-50 dark:bg-gray-700/40 rounded-xl">
                <p className="text-xs text-gray-500 mb-1">Created</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>
            </div>
          </div>

          <NotesPanel notes={lead.notes} onAdd={handleAddNote} onDelete={handleDeleteNote} loading={noteLoading} />
        </div>

        {/* Status sidebar */}
        <div className="space-y-5">
          <div className="card p-5">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Update Status</h3>
            <div className="space-y-2">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => handleStatusChange(s)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${lead.status === s ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Activity Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Total Notes</span>
                <span className="font-semibold text-gray-900 dark:text-white">{lead.notes.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Last Updated</span>
                <span className="font-semibold text-gray-900 dark:text-white">{new Date(lead.updatedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <StatusBadge status={lead.status} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <LeadModal isOpen={editOpen} onClose={() => setEditOpen(false)} onSubmit={handleUpdate} lead={lead} loading={saving} />
    </div>
  );
}
