import { useEffect, useState, useCallback } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import LeadTable from '../components/leads/LeadTable';
import LeadModal from '../components/leads/LeadModal';
import DeleteModal from '../components/common/DeleteModal';
import { getLeads, createLead, updateLead, deleteLead } from '../utils/api';
import toast from 'react-hot-toast';

const STATUSES = ['All', 'New', 'Contacted', 'Converted', 'Lost'];

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0, limit: 10 });
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ open: false, lead: null });
  const [editLead, setEditLead] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 10 };
      if (search) params.search = search;
      if (statusFilter !== 'All') params.status = statusFilter;
      const res = await getLeads(params);
      setLeads(res.data.data);
      setPagination(res.data.pagination);
    } catch {
      toast.error('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  // Debounce search
  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  const handleSubmit = async (form) => {
    setSaving(true);
    try {
      if (editLead) {
        await updateLead(editLead._id, form);
        toast.success('Lead updated');
      } else {
        await createLead(form);
        toast.success('Lead created');
      }
      setModalOpen(false);
      setEditLead(null);
      fetchLeads();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save lead');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteLead(deleteModal.lead._id);
      toast.success('Lead deleted');
      setDeleteModal({ open: false, lead: null });
      fetchLeads();
    } catch {
      toast.error('Failed to delete lead');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">All Leads</h2>
          <p className="text-sm text-gray-500">{pagination.total} total leads</p>
        </div>
        <button onClick={() => { setEditLead(null); setModalOpen(true); }} className="btn-primary">
          <Plus size={18} /> Add Lead
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, company..."
            className="input-field pl-9"
          />
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Filter size={16} className="text-gray-400" />
          <div className="flex gap-1 flex-wrap">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => { setStatusFilter(s); setPage(1); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${statusFilter === s ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <LeadTable
        leads={leads}
        pagination={{ ...pagination, page }}
        loading={loading}
        onEdit={(lead) => { setEditLead(lead); setModalOpen(true); }}
        onDelete={(lead) => setDeleteModal({ open: true, lead })}
        onPageChange={setPage}
      />

      <LeadModal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditLead(null); }} onSubmit={handleSubmit} lead={editLead} loading={saving} />
      <DeleteModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, lead: null })}
        onConfirm={handleDelete}
        title="Delete Lead"
        message={`Are you sure you want to delete "${deleteModal.lead?.name}"? This action cannot be undone.`}
        loading={deleting}
      />
    </div>
  );
}
