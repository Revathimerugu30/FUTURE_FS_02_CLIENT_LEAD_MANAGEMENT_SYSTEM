import { useEffect, useState } from 'react';
import { getAnalytics } from '../utils/api';
import { LoadingPage } from '../components/common/Spinner';
import StatCard from '../components/dashboard/StatCard';
import { Users, UserPlus, PhoneCall, TrendingUp, Percent } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line,
} from 'recharts';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#06b6d4'];

export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnalytics()
      .then((r) => setData(r.data.data))
      .catch(() => toast.error('Failed to load analytics'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingPage />;
  if (!data) return null;

  const monthlyData = data.monthlyLeads.map((m) => ({
    month: MONTHS[m._id.month - 1],
    leads: m.count,
  }));

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="Total Leads" value={data.totalLeads} icon={Users} color="blue" />
        <StatCard title="New Leads" value={data.newLeads} icon={UserPlus} color="purple" />
        <StatCard title="Contacted" value={data.contacted} icon={PhoneCall} color="yellow" />
        <StatCard title="Converted" value={data.converted} icon={TrendingUp} color="green" />
        <StatCard title="Conversion Rate" value={`${data.conversionRate}%`} icon={Percent} color="blue" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly chart */}
        <div className="card p-5">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Monthly Lead Acquisition</h3>
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={monthlyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-200 dark:text-gray-700" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'currentColor' }} className="text-gray-500 dark:text-gray-400" />
                <YAxis tick={{ fontSize: 12, fill: 'currentColor' }} className="text-gray-500 dark:text-gray-400" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--tooltip-bg, #fff)', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: 13 }} />
                <Bar dataKey="leads" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Leads" />
              </BarChart>
            </ResponsiveContainer>
          ) : <div className="h-48 flex items-center justify-center text-gray-400">No monthly data yet</div>}
        </div>

        {/* Status pie */}
        <div className="card p-5">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Leads by Status</h3>
          {data.statusCounts.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={data.statusCounts} cx="50%" cy="45%" innerRadius={60} outerRadius={95} paddingAngle={4} dataKey="value" nameKey="name">
                  {data.statusCounts.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip formatter={(v, n) => [v, n]} />
                <Legend iconType="circle" iconSize={8} />
              </PieChart>
            </ResponsiveContainer>
          ) : <div className="h-48 flex items-center justify-center text-gray-400">No data yet</div>}
        </div>

        {/* Source breakdown */}
        <div className="card p-5">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Leads by Source</h3>
          {data.sourceCounts.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={data.sourceCounts} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-200 dark:text-gray-700" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: 'currentColor' }} className="text-gray-500 dark:text-gray-400" width={90} />
                <Tooltip />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} name="Leads">
                  {data.sourceCounts.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : <div className="h-48 flex items-center justify-center text-gray-400">No data yet</div>}
        </div>

        {/* Funnel */}
        <div className="card p-5">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Conversion Funnel</h3>
          <div className="space-y-3 mt-6">
            {[
              { label: 'Total Leads', value: data.totalLeads, color: 'bg-blue-500', pct: 100 },
              { label: 'Contacted', value: data.contacted, color: 'bg-yellow-500', pct: data.totalLeads ? Math.round((data.contacted / data.totalLeads) * 100) : 0 },
              { label: 'Converted', value: data.converted, color: 'bg-green-500', pct: data.totalLeads ? Math.round((data.converted / data.totalLeads) * 100) : 0 },
              { label: 'Lost', value: data.lost || 0, color: 'bg-red-500', pct: data.totalLeads ? Math.round(((data.lost || 0) / data.totalLeads) * 100) : 0 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{item.value} <span className="text-gray-400 font-normal">({item.pct}%)</span></span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full transition-all duration-700`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
