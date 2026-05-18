export interface Project {
    id: string;
    title: string;
    description: string;
    status: "active" | "completed" | "on-hold";
    okr: string;
}

export interface Publication {
    id: string;
    title: string;
    date: string;
    type: "report" | "press" | "research";
    isPrivate: boolean;
    url?: string;
}

export interface Event {
    id: string;
    title: string;
    date: string;
    location: string;
    price: number;
    description: string;
}

export const MOCK_PROJECTS: Project[] = [
    {
        id: "proj-1",
        title: "Estrategia de Asuntos Públicos 2024",
        description: "Mapeo de stakeholders y plan de incidencia en la UE.",
        status: "active",
        okr: "Reuniones ejecutadas con 5 MEPs clave",
    },
    {
        id: "proj-2",
        title: "Monitorización de Riesgo Regulatorio",
        description: "Dashboard continuo sobre nueva legislación ambiental.",
        status: "active",
        okr: "Alerta temprana < 24h ante enmiendas",
    },
];

export const MOCK_PUBLICATIONS: Publication[] = [
    {
        id: "pub-1",
        title: "Informe Especial: Clima Político post-Elecciones",
        date: "2024-03-15",
        type: "report",
        isPrivate: true,
    },
    {
        id: "pub-2",
        title: "Análisis de Entorno y Coyuntura Q1",
        date: "2024-01-20",
        type: "research",
        isPrivate: true,
    },
    {
        id: "pub-3",
        title: "Tribuna: El futuro de las alianzas atlánticas",
        date: "2023-11-10",
        type: "press",
        isPrivate: false,
    },
];

export const MOCK_EVENTS: Event[] = [
    {
        id: "evt-1",
        title: "Cumbre de Inteligencia Estratégica 2024",
        date: "2024-05-20",
        location: "Madrid (Exclusivo clientes)",
        price: 250,
        description: "Encuentro a puerta cerrada con analistas internacionales.",
    },
    {
        id: "evt-2",
        title: "Workshop: Defensa de Ideas en Medios",
        date: "2024-06-15",
        location: "Online",
        price: 100,
        description: "Formación en portavocía y narrativa institucional.",
    },
];
