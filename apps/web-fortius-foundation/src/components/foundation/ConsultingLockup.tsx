interface ConsultingLockupProps {
  tone?: "default" | "compact";
  className?: string;
}

export function ConsultingLockup({
  tone = "default",
  className = "",
}: ConsultingLockupProps) {
  const size = tone === "compact" ? "text-[0.86rem]" : "text-[1rem]";
  const sub = tone === "compact" ? "text-[0.5rem]" : "text-[0.6rem]";

  return (
    <span className={`group inline-flex items-center gap-1 ${className}`}>
      <span className="text-lg font-light text-[#e94748] transition-colors duration-200 group-hover:text-[#f17172]">
        [
      </span>
      <span className="flex flex-col items-center leading-none -space-y-0.5 px-1">
        <span className={`font-display font-light tracking-[0.18em] uppercase text-[var(--text-primary)] ${size}`}>
          FORTIUS
        </span>
        <span className={`font-sans font-medium tracking-[0.22em] uppercase text-[#e94748] transition-colors duration-200 group-hover:text-[#f17172] ${sub}`}>
          CONSULTING
        </span>
      </span>
      <span className="text-lg font-light text-[#e94748] transition-colors duration-200 group-hover:text-[#f17172]">
        ]
      </span>
    </span>
  );
}