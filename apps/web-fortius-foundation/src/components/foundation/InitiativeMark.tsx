type InitiativeMarkProps = {
  title: string;
  subtitle: string;
};

export function InitiativeMark({ title, subtitle }: InitiativeMarkProps) {
  return (
    <div className="relative overflow-hidden border border-[var(--border-subtle)] bg-[var(--surface-brand)] px-6 py-6">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(134,239,172,0.12) 0%, transparent 48%), linear-gradient(135deg, rgba(11,31,22,0.18) 0%, rgba(11,31,22,0) 65%)",
        }}
      />
      <div className="absolute -right-5 top-1/2 -translate-y-1/2 text-[5rem] font-display italic leading-none text-[var(--color-accent-300)]/10">
        ]
      </div>

      <div className="relative flex items-start gap-4">
        <span className="pt-0.5 text-2xl font-light text-[var(--color-accent-300)]">[</span>
        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-200)]">
          {title}
          </p>
          <p className="mt-3 font-display text-[1.55rem] font-light leading-[1.05] text-white md:text-[1.8rem]">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}