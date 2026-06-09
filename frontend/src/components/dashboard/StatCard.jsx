import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ title, value, icon: Icon, color, trend, subtitle }) {
  const colorMap = {
    blue: { bg: 'bg-blue-50 dark:bg-blue-900/20', icon: 'bg-blue-500', text: 'text-blue-600 dark:text-blue-400' },
    yellow: { bg: 'bg-yellow-50 dark:bg-yellow-900/20', icon: 'bg-yellow-500', text: 'text-yellow-600 dark:text-yellow-400' },
    green: { bg: 'bg-green-50 dark:bg-green-900/20', icon: 'bg-green-500', text: 'text-green-600 dark:text-green-400' },
    red: { bg: 'bg-red-50 dark:bg-red-900/20', icon: 'bg-red-500', text: 'text-red-600 dark:text-red-400' },
    purple: { bg: 'bg-purple-50 dark:bg-purple-900/20', icon: 'bg-purple-500', text: 'text-purple-600 dark:text-purple-400' },
  };
  const c = colorMap[color] || colorMap.blue;

  return (
    <div className="card p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-xl ${c.bg}`}>
          <Icon size={22} className={c.text} />
        </div>
      </div>
      {trend !== undefined && (
        <div className={`flex items-center gap-1 mt-3 text-sm ${trend >= 0 ? 'text-green-600' : 'text-red-500'}`}>
          {trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span className="font-medium">{Math.abs(trend)}%</span>
          <span className="text-gray-500 dark:text-gray-400">vs last month</span>
        </div>
      )}
    </div>
  );
}
