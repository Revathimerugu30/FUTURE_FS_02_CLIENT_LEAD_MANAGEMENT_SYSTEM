import { useState } from 'react';
import { User, Lock, Shield, Clock, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { updateProfile, updatePassword } from '../utils/api';
import Spinner from '../components/common/Spinner';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [profileForm, setProfileForm] = useState({ name: user?.name || '', email: user?.email || '' });
  const [pwdForm, setPwdForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [profileLoading, setProfileLoading] = useState(false);
  const [pwdLoading, setPwdLoading] = useState(false);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    try {
      const res = await updateProfile(profileForm);
      updateUser(res.data.user);
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePwdUpdate = async (e) => {
    e.preventDefault();
    if (pwdForm.newPassword !== pwdForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (pwdForm.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setPwdLoading(true);
    try {
      await updatePassword({ currentPassword: pwdForm.currentPassword, newPassword: pwdForm.newPassword });
      toast.success('Password updated successfully');
      setPwdForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Password update failed');
    } finally {
      setPwdLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* Profile info card */}
      <div className="card p-6">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{user?.name}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="inline-flex items-center gap-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
                <Shield size={10} /> {user?.role}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2 text-sm">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Mail size={14} /> <span>{user?.email}</span>
          </div>
          {user?.lastLogin && (
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Clock size={14} /> Last login: {new Date(user.lastLogin).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          )}
        </div>
      </div>

      {/* Update profile */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg"><User size={18} className="text-blue-600" /></div>
          <h3 className="font-semibold text-gray-900 dark:text-white">Update Profile</h3>
        </div>
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div>
            <label className="label">Full Name</label>
            <input value={profileForm.name} onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })} className="input-field" required />
          </div>
          <div>
            <label className="label">Email Address</label>
            <input type="email" value={profileForm.email} onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })} className="input-field" required />
          </div>
          <button type="submit" disabled={profileLoading} className="btn-primary">
            {profileLoading ? <><Spinner size="sm" /> Saving...</> : 'Update Profile'}
          </button>
        </form>
      </div>

      {/* Change password */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg"><Lock size={18} className="text-yellow-600" /></div>
          <h3 className="font-semibold text-gray-900 dark:text-white">Change Password</h3>
        </div>
        <form onSubmit={handlePwdUpdate} className="space-y-4">
          {[
            { key: 'currentPassword', label: 'Current Password' },
            { key: 'newPassword', label: 'New Password' },
            { key: 'confirmPassword', label: 'Confirm New Password' },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="label">{label}</label>
              <input type="password" value={pwdForm[key]} onChange={(e) => setPwdForm({ ...pwdForm, [key]: e.target.value })} className="input-field" placeholder="••••••••" required minLength={key !== 'currentPassword' ? 6 : undefined} />
            </div>
          ))}
          <button type="submit" disabled={pwdLoading} className="btn-primary">
            {pwdLoading ? <><Spinner size="sm" /> Updating...</> : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
