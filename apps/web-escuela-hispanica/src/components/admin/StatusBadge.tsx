const styles: Record<string, string> = {
    active: 'bg-emerald-100 text-emerald-700',
    approved: 'bg-blue-100 text-blue-700',
    pending: 'bg-amber-100 text-amber-700',
    expired: 'bg-rose-100 text-rose-700',
    inactive: 'bg-slate-100 text-slate-600',
    rejected: 'bg-rose-100 text-rose-700',
    past_due: 'bg-orange-100 text-orange-700',
    paid: 'bg-emerald-100 text-emerald-700',
    cancelled: 'bg-slate-100 text-slate-600',
    sent: 'bg-emerald-100 text-emerald-700',
    failed: 'bg-rose-100 text-rose-700',
    notification: 'bg-blue-100 text-blue-700',
    confirmation: 'bg-emerald-100 text-emerald-700',
    reminder: 'bg-amber-100 text-amber-700',
    receipt: 'bg-violet-100 text-violet-700',
    failure: 'bg-rose-100 text-rose-700',
    attended: 'bg-emerald-100 text-emerald-700',
    absent: 'bg-rose-100 text-rose-700',
    unconfirmed: 'bg-slate-100 text-slate-600',
};

export function StatusBadge({ value }: { value: string | null | undefined }) {
    const label = (value || 'unknown').replace('_', ' ');
    return (
        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${styles[value || 'inactive'] ?? styles.inactive}`}>
            {label}
        </span>
    );
}