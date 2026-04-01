import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-[var(--color-accent-500)] text-[var(--surface-primary)] hover:bg-[var(--color-accent-400)] font-semibold",
  secondary:
    "bg-transparent text-[var(--text-primary)] border border-[var(--border-strong)] hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.25)]",
  ghost:
    "bg-transparent text-[var(--color-accent-400)] hover:bg-[rgba(233,71,72,0.1)]",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-5 py-2 text-xs",
  md: "px-7 py-3 text-sm",
  lg: "px-9 py-3.5 text-sm",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md uppercase tracking-wider",
          "transition-all duration-150 ease-out",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-500)]",
          "disabled:opacity-40 disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
