"use client";

import { useState } from "react";
import { getPeopleMapPins } from "@/content/team";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    ZoomableGroup,
} from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Building2, FolderKanban } from "lucide-react";

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
    // Oficinas
    { id: "ofi-madrid", name: "Madrid", coordinates: [-3.7038, 40.4168], category: "Oficinas", description: "España" },
    { id: "ofi-pamplona", name: "Pamplona", coordinates: [-1.6432, 42.8125], category: "Oficinas", description: "España" },
    { id: "ofi-houston", name: "Houston", coordinates: [-95.3698, 29.7604], category: "Oficinas", description: "EE.UU." },
    { id: "ofi-wash", name: "Washington D.C.", coordinates: [-77.0369, 38.9072], category: "Oficinas", description: "EE.UU." },
    // Equipo (derivado de TEAM + EXPERTS)
    ...getPeopleMapPins().map((pin) => ({
        ...pin,
        category: "Equipo" as const,
    })),
    // Proyectos
    { id: "pr-esp", name: "España", coordinates: [-4.0, 39.5], category: "Proyectos", description: "Sociedad Civil y Política" },
    { id: "pr-fra", name: "Francia", coordinates: [2.2137, 46.2276], category: "Proyectos", description: "Sociedad Civil y Política" },
    { id: "pr-por", name: "Portugal", coordinates: [-8.2245, 39.3999], category: "Proyectos", description: "Sociedad Civil y Política" },
    { id: "pr-ita", name: "Italia", coordinates: [12.5674, 41.8719], category: "Proyectos", description: "Sociedad Civil y Política" },
    { id: "pr-rum", name: "Rumanía", coordinates: [24.9668, 45.9432], category: "Proyectos", description: "Sociedad Civil y Política" },
    { id: "pr-hun", name: "Hungría", coordinates: [19.5033, 47.1625], category: "Proyectos", description: "Sociedad Civil y Política" },
    { id: "pr-bel", name: "Bélgica", coordinates: [4.4699, 50.5039], category: "Proyectos", description: "Sociedad Civil y Política" },
    { id: "pr-pba", name: "Países Bajos", coordinates: [5.2913, 52.1326], category: "Proyectos", description: "Sociedad Civil y Política" },
    { id: "pr-gbr", name: "Reino Unido", coordinates: [-3.436, 55.3781], category: "Proyectos", description: "Sociedad Civil y Política" },
    { id: "pr-dnk", name: "Dinamarca", coordinates: [9.5018, 56.2639], category: "Proyectos", description: "Sociedad Civil y Política" },
    { id: "pr-swe", name: "Suecia", coordinates: [18.6435, 60.1282], category: "Proyectos", description: "Sociedad Civil y Política" },
    { id: "pr-mar", name: "Marruecos", coordinates: [-7.0926, 31.7917], category: "Proyectos", description: "Sociedad Civil y Política" },
    { id: "pr-dza", name: "Argelia", coordinates: [1.6596, 28.0339], category: "Proyectos", description: "Sociedad Civil y Política" },
    { id: "pr-tun", name: "Túnez", coordinates: [9.5375, 33.8869], category: "Proyectos", description: "Sociedad Civil y Política" },
    { id: "pr-mli", name: "Mali", coordinates: [-3.9962, 17.5707], category: "Proyectos", description: "Sociedad Civil y Política" },
    { id: "pr-sen", name: "Senegal", coordinates: [-14.4524, 14.4974], category: "Proyectos", description: "Sociedad Civil y Política" },
    { id: "pr-mrt", name: "Mauritania", coordinates: [-10.9408, 21.0079], category: "Proyectos", description: "Sociedad Civil y Política" },
    { id: "pr-egy", name: "Egipto", coordinates: [30.8025, 26.8206], category: "Proyectos", description: "Sociedad Civil y Política" },
    { id: "pr-isr", name: "Israel", coordinates: [34.8516, 31.0461], category: "Proyectos", description: "Sociedad Civil y Política" },
    { id: "pr-aze", name: "Azerbaiyán", coordinates: [47.5769, 40.1431], category: "Proyectos", description: "Sociedad Civil y Política" },
    { id: "pr-chn", name: "Shanghai (China)", coordinates: [121.4737, 31.2304], category: "Proyectos", description: "Sociedad Civil y Política" },
    { id: "pr-phl", name: "Filipinas", coordinates: [121.774, 12.8797], category: "Proyectos", description: "Sociedad Civil y Política" },
    { id: "pr-ken", name: "Kenia", coordinates: [37.9062, -0.0236], category: "Proyectos", description: "Sociedad Civil y Política" },
    { id: "pr-zaf", name: "Sudáfrica", coordinates: [22.9375, -30.5595], category: "Proyectos", description: "Sociedad Civil y Política" },
    { id: "pr-mex", name: "México", coordinates: [-102.5528, 23.6345], category: "Proyectos", description: "Sociedad Civil y Política" },
    { id: "pr-usa", name: "EE.UU.", coordinates: [-95.7129, 37.0902], category: "Proyectos", description: "Sociedad Civil y Política" },
    { id: "pr-gtm", name: "Guatemala", coordinates: [-90.2308, 15.7835], category: "Proyectos", description: "Sociedad Civil y Política" },
    { id: "pr-bol", name: "Bolivia", coordinates: [-63.5887, -16.2902], category: "Proyectos", description: "Sociedad Civil y Política" },
    { id: "pr-chl", name: "Chile", coordinates: [-71.543, -35.6751], category: "Proyectos", description: "Sociedad Civil y Política" },
    { id: "pr-arg", name: "Argentina", coordinates: [-63.6167, -38.4161], category: "Proyectos", description: "Sociedad Civil y Política" },
    { id: "pr-bra", name: "Brasil", coordinates: [-51.9253, -14.235], category: "Proyectos", description: "Sociedad Civil y Política" },
    { id: "pr-col", name: "Colombia", coordinates: [-74.2973, 4.5709], category: "Proyectos", description: "Sociedad Civil y Política" },
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
    const [activeCategory, setActiveCategory] = useState<Category | null>(null);

    const visiblePins = activeCategory
        ? PINES.filter((pin) => pin.category === activeCategory)
        : PINES;

    return (
        <div className="relative w-full aspect-[4/3] md:aspect-[2/1] lg:aspect-[2.5/1] bg-transparent rounded-lg border border-[var(--border-subtle)] overflow-hidden flex flex-col group">
            {/* Leyenda */}
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 p-3 md:p-4 bg-[var(--color-neutral-1000,#0a111e)]/80 backdrop-blur-sm border border-[var(--border-subtle)] rounded-md">
                <span className="text-[0.65rem] uppercase tracking-[0.15em] text-[var(--text-tertiary)] mb-1">
                    Leyenda
                </span>
                {(Object.keys(categoryConfig) as Category[]).map((cat) => {
                    const Icon = categoryConfig[cat].icon;
                    const isActive = activeCategory === cat;
                    return (
                        <button
                            key={cat}
                            type="button"
                            onClick={() => {
                                setHoveredPin(null);
                                setActiveCategory((current) =>
                                    current === cat ? null : cat,
                                );
                            }}
                            aria-pressed={isActive}
                            className={`flex items-center gap-2 rounded-sm px-2 py-1 text-left transition-colors ${
                                isActive
                                    ? "bg-[var(--surface-secondary)]"
                                    : "hover:bg-[var(--surface-secondary)]"
                            }`}
                        >
                            <Icon size={14} color={categoryConfig[cat].color} />
                            <span className="text-[0.8rem] text-[var(--text-secondary)]">
                                {cat}
                            </span>
                        </button>
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

                    {visiblePins.map((pin) => {
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
                                    {hoveredPin?.id === pin.id ? (
                                        <g transform="translate(-8, -8)">
                                            <Icon size={16} color={color} strokeWidth={2} />
                                        </g>
                                    ) : (
                                        <circle cx={0} cy={0} r={2} fill={color} />
                                    )}
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
