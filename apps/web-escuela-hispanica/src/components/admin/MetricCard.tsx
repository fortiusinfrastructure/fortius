interface MetricCardProps {
    label: string;
    value: number;
    tone?: 'gold' | 'blue' | 'green' | 'slate';
}

const tones = {
    gold: 'border-amber-200 bg-amber-50 text-amber-800',
    blue: 'border-blue-200 bg-blue-50 text-blue-800',
    green: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    slate: 'border-slate-200 bg-white text-slate-800',
};

export function MetricCard({ label, value, tone = 'slate' }: MetricCardProps) {
    return (
        <div className={`rounded-2xl border p-5 ${tones[tone]}`}>
            <p className="text-2xl font-semibold">{value}</p>
            <p className="mt-1 text-sm opacity-80">{label}</p>
        </div>
    );
}