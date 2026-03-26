import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  className?: string;
}

export function SectionHeader({ title, className }: SectionHeaderProps) {
  return (
    <div className={cn("inline-flex items-center justify-center", className)}>
      <span className="bracket-header">{title}</span>
    </div>
  );
}
