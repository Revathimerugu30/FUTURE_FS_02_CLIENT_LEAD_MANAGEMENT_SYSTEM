import { useEffect, useState } from 'react';
import { Users, UserPlus, PhoneCall, TrendingUp, Percent, Clock } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import StatusBadge from '../components/common/StatusBadge';
import { getAnalytics } from '../utils/api';
import { LoadingPage } from '../components/common/Spinner';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444'];

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAnalytics()
      .then((res) => setData(res.data.data))
      .catch(() => toast.error('Failed to load dashboard data'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingPage />;
  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <StatCard title="Total Leads" value={data.totalLeads} icon={Users} color="blue" />
        <StatCard title="New Leads" value={data.newLeads} icon={UserPlus} color="purple" />
        <StatCard title="Contacted" value={data.contacted} icon={PhoneCall} color="yellow" />
        <StatCard title="Converted" value={data.converted} icon={TrendingUp} color="green" />
        <StatCard title="Conversion Rate" value={`${data.conversionRate}%`} icon={Percent} color="blue" subtitle="Of all leads" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent leads */}
        <div className="lg:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2"><Clock size={16} className="text-blue-500" />Recent Leads</h3>
            <button onClick={() => navigate('/leads')} className="text-sm text-blue-600 hover:text-blue-700 font-medium">View all →</button>
          </div>
          <div className="space-y-3">
            {data.recentLeads.length === 0 ? (
              <p className="text-center text-gray-400 py-8">No leads yet</p>
            ) : (
              data.recentLeads.map((lead) => (
                <div key={lead._id} onClick={() => navigate(`/leads/${lead._id}`)} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700/40 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-semibold">
                      {lead.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{lead.name}</p>
                      <p className="text-xs text-gray-500">{lead.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={lead.status} />
                    <span className="text-xs text-gray-400 hidden sm:block">{new Date(lead.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pie chart */}
        <div className="card p-5">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Leads by Status</h3>
          {data.statusCounts.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={data.statusCounts} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                  {data.statusCounts.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v, n) => [v, n]} />
                <Legend iconType="circle" iconSize={8} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-48 flex items-center justify-center text-gray-400 text-sm">No data available</div>
          )}
          <div className="mt-3 space-y-2">
            {data.statusCounts.map((s, i) => (
              <div key={s.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  <span className="text-gray-600 dark:text-gray-400">{s.name}</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
