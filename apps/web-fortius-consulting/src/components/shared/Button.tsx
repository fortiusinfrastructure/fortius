"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  withArrow?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", withArrow = false, children, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center font-sans font-medium rounded-full transition-colors duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-black disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-brand-consulting text-white hover:bg-[#7f1d1d]",
      secondary: "bg-transparent border border-brand-consulting text-brand-consulting hover:bg-brand-consulting/5",
      ghost: "bg-transparent text-neutral-600 hover:text-brand-consulting",
    };
    
    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-sm tracking-wide",
      lg: "h-14 px-8 text-base tracking-wide",
    };

    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
        {withArrow && (
          <span className="ml-2 group-hover:translate-x-1 transition-transform">
            →
          </span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };
