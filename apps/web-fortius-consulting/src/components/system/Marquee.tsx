"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface MarqueeProps {
    children: ReactNode;
    speed?: number;
    className?: string;
    pauseOnHover?: boolean;
}

export function Marquee({ children, speed = 40, className = "", pauseOnHover = true }: MarqueeProps) {
    return (
        <div
            className={`relative overflow-hidden ${className}`}
            style={{ maskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)" }}
        >
            <motion.div
                className="flex gap-16 whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
                whileHover={pauseOnHover ? { animationPlayState: "paused" } : undefined}
            >
                <div className="flex gap-16 items-center shrink-0">{children}</div>
                <div className="flex gap-16 items-center shrink-0" aria-hidden>
                    {children}
                </div>
            </motion.div>
        </div>
    );
}
