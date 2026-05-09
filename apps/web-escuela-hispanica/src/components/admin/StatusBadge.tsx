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

const labels: Record<string, string> = {
    active: 'Activo',
    approved: 'Aprobado',
    pending: 'Pendiente',
    expired: 'Expirado',
    inactive: 'Inactivo',
    rejected: 'Rechazado',
    past_due: 'Pago atrasado',
    paid: 'Pagado',
    cancelled: 'Cancelado',
    sent: 'Enviado',
    failed: 'Fallido',
    notification: 'Alerta interna',
    confirmation: 'Confirmación',
    reminder: 'Recordatorio',
    receipt: 'Recibo',
    failure: 'Fallo de pago',
    attended: 'Asistió',
    absent: 'Ausente',
    unconfirmed: 'Sin confirmar',
};

export function StatusBadge({ value }: { value: string | null | undefined }) {
    const key = value || 'inactive';
    const label = labels[key] ?? key.replace('_', ' ');
    return (
        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${styles[key] ?? styles.inactive}`}>
            {label}
        </span>
    );
}