"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring, animate } from "framer-motion";

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function Counter({ value, suffix = "", prefix = "", className = "" }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });
  const [hasStarted, setHasStarted] = useState(false);
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);
      const controls = animate(motionValue, value, {
        duration: 2.5,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isInView, value, motionValue, hasStarted]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.floor(latest)}${suffix}`;
      }
    });
  }, [springValue, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
