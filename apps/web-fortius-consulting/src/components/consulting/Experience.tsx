"use client";

import { motion } from "framer-motion";

const CLIENTS = [
  "Chapel & York",
  "Axioma",
  "Cooperación Internacional",
  "Principios",
  "Acton Institute",
];

const REPEATED_CLIENTS = [...CLIENTS, ...CLIENTS, ...CLIENTS];

export function Experience() {
  return (
    <section className="py-32 bg-white overflow-hidden flex flex-col items-center border-y border-neutral-100">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 mb-16 text-center">
         <span className="font-mono text-[10px] tracking-[0.2em] font-bold text-neutral-500 uppercase">
            Confían en nuestro criterio
         </span>
      </div>

      <div className="w-full relative flex items-center">
        {/* Soft fade edges for light theme */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex w-full overflow-hidden">
          <motion.div
            className="flex shrink-0 items-center justify-center gap-12 pl-12"
            animate={{ x: ["0%", "-33.333%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 25 // Slower, more elegant
            }}
          >
            {REPEATED_CLIENTS.map((client, i) => (
              <div key={i} className="flex items-center gap-12">
                <span className="text-5xl md:text-7xl lg:text-8xl font-serif text-black whitespace-nowrap tracking-tight">
                  {client}
                </span>
                
                {/* Inline image separating items */}
                <div className="w-16 h-12 md:w-24 md:h-16 relative overflow-hidden rounded-sm grayscale opacity-80 shrink-0">
                   <img 
                     src={`https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop&sig=${i}`}
                     alt="Separator"
                     className="w-full h-full object-cover"
                   />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
