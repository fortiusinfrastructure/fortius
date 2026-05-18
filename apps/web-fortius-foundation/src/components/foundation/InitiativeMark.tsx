type InitiativeMarkProps = {
  title: string;
  subtitle: string;
};

export function InitiativeMark({ title, subtitle }: InitiativeMarkProps) {
  return (
    <div className="relative overflow-hidden border border-[var(--border-subtle)] bg-[var(--surface-brand)] px-5 py-5">
      <div className="absolute -right-6 -top-8 text-[6rem] font-display italic leading-none text-[var(--color-accent-300)]/10">
        [ ]
      </div>
      <div className="relative">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-200)]">
          {title}
        </p>
        <p className="mt-3 font-display text-[1.35rem] font-light leading-[1.08] text-white">
          {subtitle}
        </p>
      </div>
    </div>
  );
}