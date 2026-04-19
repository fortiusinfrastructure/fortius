// Mock data for the IEAM platform

export interface ContentPackage {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  date: string;
  type: 'policy-paper' | 'research' | 'report' | 'analysis';
  region: string[];
  theme: string[];
}

export interface DashboardWidget {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  description: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  type: 'webinar' | 'conference' | 'workshop' | 'seminar';
  location: string;
  description: string;
}

export interface Expert {
  id: string;
  name: string;
  role: string;
  expertise: string[];
  image: string;
  bio: string;
}

export const featuredContent: ContentPackage = {
  id: '1',
  title: 'Repensar la Movilidad entre Malí y Europa',
  subtitle: 'Un análisis profundo de los patrones migratorios y sus implicaciones políticas',
  description: 'Este informe examina las dinámicas actuales de movilidad, proponiendo un nuevo marco de cooperación que beneficie tanto a las comunidades de origen como a los países de destino.',
  image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200&q=80',
  tags: ['Política Migratoria', 'África Occidental', 'UE'],
  date: '2025-12-01',
  type: 'report',
  region: ['West Africa', 'Europe'],
  theme: ['Migration Governance', 'Policy Analysis']
};

export const dashboardWidgets: DashboardWidget[] = [
  {
    id: '1',
    title: 'Proyectos de Investigación Activos',
    value: '24',
    change: '+3 este mes',
    trend: 'up',
    description: 'Iniciativas de investigación en curso'
  },
  {
    id: '2',
    title: 'Recomendaciones de Política',
    value: '156',
    change: '+12 este trimestre',
    trend: 'up',
    description: 'Sugerencias basadas en evidencia'
  },
  {
    id: '3',
    title: 'Puntos de Datos Analizados',
    value: '2.4M',
    change: '+340K este año',
    trend: 'up',
    description: 'Entradas de datos procesadas'
  },
  {
    id: '4',
    title: 'Organizaciones Asociadas',
    value: '48',
    change: '+5 nuevos socios',
    trend: 'up',
    description: 'Redes de investigación colaborativa'
  }
];

export const researchListings: ContentPackage[] = [
  {
    id: '2',
    title: 'Tendencias Migratorias en el Mediterráneo 2024',
    subtitle: 'Informe Anual sobre Movilidad Transmediterránea',
    description: 'Análisis exhaustivo de los patrones migratorios a través del Mediterráneo, incluyendo análisis de rutas, datos demográficos y recomendaciones de política.',
    image: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=800&q=80',
    tags: ['Mediterráneo', 'Informe Anual', 'Análisis de Datos'],
    date: '2024-01-10',
    type: 'report',
    region: ['Mediterranean', 'North Africa'],
    theme: ['Migration Trends', 'Data Analysis']
  },
  {
    id: '3',
    title: 'Migración Inducida por el Clima en el Sahel',
    subtitle: 'Impulsores Ambientales de la Movilidad Humana',
    description: 'Examinando la relación entre el cambio climático, la degradación ambiental y los patrones migratorios en la región del Sahel.',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80',
    tags: ['Migración Climática', 'Sahel', 'Política Ambiental'],
    date: '2023-12-20',
    type: 'research',
    region: ['Sahel', 'West Africa'],
    theme: ['Climate Change', 'Environmental Migration']
  },
  {
    id: '4',
    title: 'Migración Laboral y Desarrollo Económico',
    subtitle: 'Evaluación del Impacto de las Remesas en Países de Origen',
    description: 'Análisis de cómo la migración laboral y las remesas contribuyen al desarrollo económico en los países de origen.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    tags: ['Migración Laboral', 'Impacto Económico', 'Remesas'],
    date: '2023-12-05',
    type: 'analysis',
    region: ['Global', 'Africa'],
    theme: ['Economic Development', 'Labor Mobility']
  },
  {
    id: '5',
    title: 'Aspiraciones Migratorias de los Jóvenes en África Occidental',
    subtitle: 'Entendiendo los Impulsores de la Movilidad Juvenil',
    description: 'Investigación basada en encuestas sobre las aspiraciones migratorias entre los jóvenes en países de África Occidental.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',
    tags: ['Migración Juvenil', 'Investigación por Encuesta', 'África Occidental'],
    date: '2023-11-28',
    type: 'research',
    region: ['West Africa'],
    theme: ['Youth Mobility', 'Social Research']
  },
  {
    id: '6',
    title: 'Gestión Fronteriza y Derechos Humanos',
    subtitle: 'Equilibrando Seguridad y Protección',
    description: 'Análisis de políticas sobre prácticas de gestión fronteriza y su impacto en los derechos y la protección de los migrantes.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    tags: ['Gestión Fronteriza', 'Derechos Humanos', 'Política'],
    date: '2023-11-15',
    type: 'policy-paper',
    region: ['Europe', 'Africa'],
    theme: ['Border Policy', 'Human Rights']
  }
];

export const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Foro de Política Migratoria 2024',
    date: '2024-03-15',
    type: 'conference',
    location: 'Bruselas, Bélgica',
    description: 'Reunión anual de responsables políticos, investigadores y profesionales para discutir la gobernanza migratoria.'
  },
  {
    id: '2',
    title: 'Taller de Investigación Migratoria Basada en Datos',
    date: '2024-02-28',
    type: 'workshop',
    location: 'En línea',
    description: 'Taller práctico sobre el uso de análisis de datos para la investigación migratoria.'
  },
  {
    id: '3',
    title: 'Serie de Seminarios Web sobre Migración Climática',
    date: '2024-02-20',
    type: 'webinar',
    location: 'En línea',
    description: 'Serie mensual de seminarios web explorando la intersección del cambio climático y la movilidad humana.'
  },
  {
    id: '4',
    title: 'Cumbre de Diálogo del Mediterráneo',
    date: '2024-04-10',
    type: 'conference',
    location: 'Barcelona, España',
    description: 'Diálogo de alto nivel sobre migración y cooperación en el Mediterráneo.'
  }
];

export const experts: Expert[] = [
  {
    id: '1',
    name: 'Dra. Amina Diallo',
    role: 'Investigadora Principal',
    expertise: ['Política Migratoria', 'África Occidental', 'Género y Migración'],
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amina',
    bio: 'Experta líder en patrones migratorios de África Occidental con más de 15 años de experiencia en investigación de campo.'
  },
  {
    id: '2',
    name: 'Prof. Marco Rossi',
    role: 'Director de Estudios Mediterráneos',
    expertise: ['Migración Mediterránea', 'Política UE', 'Gestión Fronteriza'],
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marco',
    bio: 'Especialista en política migratoria de la UE y gobernanza de la movilidad en el Mediterráneo.'
  },
  {
    id: '3',
    name: 'Dra. Fatima Hassan',
    role: 'Investigadora de Migración Climática',
    expertise: ['Cambio Climático', 'Migración Ambiental', 'Región del Sahel'],
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima',
    bio: 'Experta en migración inducida por el clima y desplazamiento ambiental en el Sahel.'
  },
  {
    id: '4',
    name: 'Dr. Jean-Pierre Dubois',
    role: 'Líder de Análisis de Datos',
    expertise: ['Ciencia de Datos', 'Estadísticas Migratorias', 'Modelado Predictivo'],
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jean',
    bio: 'Pionero en el uso de análisis avanzados en investigación y previsión migratoria.'
  }
];
