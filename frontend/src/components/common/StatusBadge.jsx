const STATUS_STYLES = {
  New: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  Contacted: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  Converted: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  Lost: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
};

export default function StatusBadge({ status, size = 'sm' }) {
  return (
    <span className={`inline-flex items-center rounded-full font-medium ${size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'} ${STATUS_STYLES[status] || 'bg-gray-100 text-gray-700'}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${status === 'New' ? 'bg-blue-500' : status === 'Contacted' ? 'bg-yellow-500' : status === 'Converted' ? 'bg-green-500' : 'bg-red-500'}`} />
      {status}
    </span>
  );
}
