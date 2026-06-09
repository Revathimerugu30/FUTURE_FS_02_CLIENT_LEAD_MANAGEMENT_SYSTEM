import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Spinner from '../common/Spinner';

const SOURCES = ['Website', 'Referral', 'Social Media', 'Email Campaign', 'Cold Call', 'Trade Show', 'Other'];
const STATUSES = ['New', 'Contacted', 'Converted', 'Lost'];

const defaultForm = { name: '', email: '', phone: '', company: '', source: 'Website', status: 'New', value: '' };

export default function LeadModal({ isOpen, onClose, onSubmit, lead, loading }) {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (lead) {
      setForm({ name: lead.name || '', email: lead.email || '', phone: lead.phone || '', company: lead.company || '', source: lead.source || 'Website', status: lead.status || 'New', value: lead.value || '' });
    } else {
      setForm(defaultForm);
    }
    setErrors({});
  }, [lead, isOpen]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Invalid email format';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSubmit(form);
  };

  const set = (k) => (e) => { setForm((f) => ({ ...f, [k]: e.target.value })); setErrors((er) => ({ ...er, [k]: '' })); };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{lead ? 'Edit Lead' : 'Add New Lead'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <X size={18} className="text-gray-500" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="label">Full Name *</label>
              <input value={form.name} onChange={set('name')} placeholder="John Doe" className={`input-field ${errors.name ? 'border-red-500' : ''}`} />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="label">Email *</label>
              <input type="email" value={form.email} onChange={set('email')} placeholder="john@example.com" className={`input-field ${errors.email ? 'border-red-500' : ''}`} />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="label">Phone</label>
              <input value={form.phone} onChange={set('phone')} placeholder="+1 234 567 8900" className="input-field" />
            </div>
            <div>
              <label className="label">Company</label>
              <input value={form.company} onChange={set('company')} placeholder="Acme Corp" className="input-field" />
            </div>
            <div>
              <label className="label">Lead Source</label>
              <select value={form.source} onChange={set('source')} className="input-field">
                {SOURCES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Status</label>
              <select value={form.status} onChange={set('status')} className="input-field">
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className="label">Deal Value ($)</label>
              <input type="number" value={form.value} onChange={set('value')} placeholder="0" min="0" className="input-field" />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1 justify-center">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center">
              {loading ? <><Spinner size="sm" /><span>Saving...</span></> : (lead ? 'Update Lead' : 'Add Lead')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
