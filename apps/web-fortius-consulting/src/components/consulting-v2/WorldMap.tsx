"use client";

import React, { useState } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    ZoomableGroup,
} from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Users, Building2, FolderKanban } from "lucide-react";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

type Category = "Equipo" | "Oficinas" | "Proyectos";

interface Pin {
    id: string;
    name: string;
    coordinates: [number, number];
    category: Category;
    description: string;
}

const PINES: Pin[] = [
    {
        id: "madrid",
        name: "Madrid",
        coordinates: [-3.7038, 40.4168],
        category: "Oficinas",
        description: "Oficina Central",
    },
    {
        id: "washington",
        name: "Washington D.C.",
        coordinates: [-77.0369, 38.9072],
        category: "Proyectos",
        description: "Proyecto Estratégico",
    },
    {
        id: "londres",
        name: "Londres",
        coordinates: [-0.1276, 51.5074],
        category: "Equipo",
        description: "Operaciones UK",
    },
    {
        id: "nairobi",
        name: "Kenia",
        coordinates: [36.8219, -1.2921],
        category: "Proyectos",
        description: "Desarrollo Económico",
    },
];

const categoryConfig = {
    Oficinas: {
        icon: Building2,
        color: "var(--color-accent-400)",
    },
    Equipo: {
        icon: Users,
        color: "#10b981", // Green matching Foundation
    },
    Proyectos: {
        icon: FolderKanban,
        color: "#60a5fa", // Blueish
    },
};

const ease = [0.22, 0.61, 0.36, 1] as const;

export function WorldMap() {
    const [hoveredPin, setHoveredPin] = useState<Pin | null>(null);

    return (
        <div className="relative w-full aspect-[4/3] md:aspect-[2/1] lg:aspect-[2.5/1] bg-transparent rounded-lg border border-[var(--border-subtle)] overflow-hidden flex flex-col group">
            {/* Leyenda */}
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 p-3 md:p-4 bg-[var(--color-neutral-1000,#0a111e)]/80 backdrop-blur-sm border border-[var(--border-subtle)] rounded-md">
                <span className="text-[0.65rem] uppercase tracking-[0.15em] text-[var(--text-tertiary)] mb-1">
                    Leyenda
                </span>
                {(Object.keys(categoryConfig) as Category[]).map((cat) => {
                    const Icon = categoryConfig[cat].icon;
                    return (
                        <div key={cat} className="flex items-center gap-2">
                            <Icon size={14} color={categoryConfig[cat].color} />
                            <span className="text-[0.8rem] text-[var(--text-secondary)]">
                                {cat}
                            </span>
                        </div>
                    );
                })}
            </div>

            <ComposableMap
                projectionConfig={{
                    scale: 140,
                    center: [0, 20], // Adjusted to center better
                }}
                className="w-full h-full"
            >
                <ZoomableGroup center={[0, 20]} minZoom={1} maxZoom={3}>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill="var(--color-neutral-900,#111827)"
                                    stroke="var(--border-subtle)"
                                    strokeWidth={0.5}
                                    className="outline-none"
                                    style={{
                                        default: { outline: "none" },
                                        hover: { outline: "none", fill: "var(--color-neutral-800,#1f2937)" },
                                        pressed: { outline: "none" },
                                    }}
                                />
                            ))
                        }
                    </Geographies>

                    {PINES.map((pin) => {
                        const Icon = categoryConfig[pin.category].icon;
                        const color = categoryConfig[pin.category].color;
                        return (
                            <Marker
                                key={pin.id}
                                coordinates={pin.coordinates}
                                onMouseEnter={() => setHoveredPin(pin)}
                                onMouseLeave={() => setHoveredPin(null)}
                                className="cursor-pointer outline-none"
                            >
                                <motion.g
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    whileHover={{ scale: 1.3 }}
                                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                >
                                    {/* Un sutil halo trasero */}
                                    <circle cx={0} cy={0} r={6} fill={color} opacity={0.2} />
                                    {/* El punto o icono en sí. SVG puro para evitar problemas con react-simple-maps Marker. */}
                                    <circle cx={0} cy={0} r={3} fill={color} />
                                </motion.g>
                            </Marker>
                        );
                    })}
                </ZoomableGroup>
            </ComposableMap>

            {/* Tooltip superpuesto utilizando framer-motion fuera del SVG */}
            <AnimatePresence>
                {hoveredPin && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3, ease }}
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 md:bottom-8 z-30 pointer-events-none"
                    >
                        <div className="flex flex-col items-center bg-[var(--color-neutral-1000,#0a111e)]/90 backdrop-blur-md border border-[var(--border-subtle)] px-4 py-3 rounded-lg shadow-2xl">
                            <span className="text-[0.7rem] uppercase tracking-[0.15em] text-[var(--color-accent-400)] mb-1" style={{ color: categoryConfig[hoveredPin.category].color }}>
                                {hoveredPin.category}
                            </span>
                            <span className="font-display text-[1.1rem] font-light text-[var(--text-primary)] leading-tight mb-1">
                                {hoveredPin.name}
                            </span>
                            <span className="text-[0.85rem] text-[var(--text-secondary)]">
                                {hoveredPin.description}
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
