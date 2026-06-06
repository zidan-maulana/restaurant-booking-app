
export default function Badge({
  status = 'pending',
  className = '',
  ...props
}) {
  const statusStyles = {
    pending: 'bg-amber-bg text-amber-text border-amber-text/10',
    approved: 'bg-sage-bg text-sage-text border-sage-text/10',
    rejected: 'bg-terracotta-bg text-terracotta-text border-terracotta-text/10',
    expired: 'bg-terracotta-bg text-terracotta-text border-terracotta-text/10',
    cancelled: 'bg-sepia-bg text-sepia-text border-sepia-text/10',
  };

  const labels = {
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    expired: 'Expired',
    cancelled: 'Cancelled',
  };

  return (
    <span
      className={`inline-flex items-center justify-center text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-sm border ${statusStyles[status]} ${className}`}
      {...props}
    >
      {labels[status] || status}
    </span>
  );
}
