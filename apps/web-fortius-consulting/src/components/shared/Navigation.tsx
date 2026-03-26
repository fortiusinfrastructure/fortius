"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Search } from "lucide-react"; // We can use lucide-react since it's common in Next.js apps

const LINKS = [
  { label: "MÉTODO", href: "#metodo" },
  { label: "SERVICIOS", href: "#servicios" },
  { label: "INTELLIGENCE", href: "#intelligence" },
  { label: "ACERCA DE", href: "#nosotros" },
];

export function Navigation() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm py-4" : "bg-transparent py-8"}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto px-12 md:px-24 flex items-center justify-between">
        {/* Logo - Inverted via CSS for light theme since source is white */}
        <a href="/" className="flex items-center">
          <img 
            src="/recursos/Fotius_Consulting_Blanco.svg" 
            alt="Fortius Consulting" 
            className="h-6 md:h-8 w-auto invert opacity-90 hover:opacity-100 transition-opacity"
          />
        </a>

        {/* Desktop Nav - mimicking the editorial screenshot exactly */}
        <nav className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-10">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-sans text-[11px] font-semibold tracking-[0.15em] text-neutral-800 hover:text-black transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          
          <button className="text-neutral-800 hover:text-black transition-colors" aria-label="Search">
            <Search size={18} strokeWidth={2} />
          </button>
        </nav>
      </div>
    </motion.header>
  );
}
