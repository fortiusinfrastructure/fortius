import type { MemberPlan } from '@/types';

export const membershipPlans: MemberPlan[] = [
    {
        id: 'amigo',
        name: 'AMIGO',
        subtitle: 'SIMPATIZANTE CULTURAL',
        type: 'amigo',
        price: 0,
        currency: 'EUR',
        interval: 'monthly',
        features: [
            { es: 'Invitación a encuentros online abiertos para amigos', en: 'Invitation to open online meetings for friends', pt: 'Convite para encontros online abertos para amigos' },
            { es: 'Acceso a una biblioteca digital básica de recursos seleccionados', en: 'Access to a basic digital library of selected resources', pt: 'Acesso a uma biblioteca digital básica de recursos selecionados' },
            { es: 'Acceso anticipado a anuncios de actividades y publicaciones', en: 'Early access to announcements of activities and publications', pt: 'Acesso antecipado a anúncios de atividades e publicações' },
            { es: 'Prioridad en lista de espera para eventos presenciales', en: 'Priority on waiting list for in-person events', pt: 'Prioridade na lista de espera para eventos presenciais' },
            { es: 'Posibilidad de enviar preguntas a ponentes antes de eventos', en: 'Possibility to send questions to speakers before events', pt: 'Possibilidade de enviar perguntas aos palestrantes antes dos eventos' },
            { es: 'Acceso a recomendaciones bibliográficas comentadas', en: 'Access to commented bibliographic recommendations', pt: 'Acesso a recomendações bibliográficas comentadas' },
            { es: 'Recepción de boletines informativos', en: 'Receipt of newsletters', pt: 'Recebimento de boletins informativos' },
        ],
        highlighted: false
    },
    {
        id: 'academico',
        name: 'MIEMBRO ACADÉMICO',
        subtitle: 'ACCESO PLENO',
        type: 'academico',
        price: 100,
        currency: 'EUR',
        interval: 'annual',
        features: [
            { es: 'Posibilidad de publicar artículos, ensayos y documentos de trabajo en la web oficial', en: 'Possibility to publish articles, essays, and working papers on the official website', pt: 'Possibilidade de publicar artigos, ensaios e documentos de trabalho no site oficial' },
            { es: 'Inclusión destacada en el Listado Oficial de Miembros Académicos en la página",', en: 'Prominent inclusion in the Official List of Academic Members on the institutional page', pt: 'Inclusão em destaque na Lista Oficial de Membros Acadêmicos na página institucional' },
            { es: 'Emisión anual de un Certificado Oficial de Membresía Académica', en: 'Annual issuance of an Official Certificate of Academic Membership', pt: 'Emissão anual de um Certificado Oficial de Membro Acadêmico' },
            { es: 'Carta de respaldo institucional para proyectos, congresos o becas', en: 'Institutional support letter for projects, conferences, or scholarships', pt: 'Carta de apoio institucional para projetos, conferências ou bolsas' },
            { es: 'Participación en grupos de investigación temáticos', en: 'Participation in thematic research groups', pt: 'Participação em grupos de pesquisa temáticos' },
            { es: 'Participación en comités editoriales o de evaluación', en: 'Participation in editorial or evaluation committees', pt: 'Participação em comitês editoriais ou de avaliação' },
            { es: 'Posibilidad de coordinar paneles o mesas en jornadas anuales', en: 'Possibility to coordinate panels or roundtables at annual conferences', pt: 'Possibilidade de coordenar painéis ou mesas em conferências anuais' },
            { es: 'Invitación a coloquios académicos cerrados (formato taller)', en: 'Invitation to closed academic colloquia (workshop format)', pt: 'Convite para colóquios acadêmicos fechados (formato de oficina)' },
            { es: 'Participación en la reunión académica bimestral en línea', en: 'Participation in the bimonthly online academic meeting', pt: 'Participação na reunião acadêmica bimestral online' },
            { es: 'Participación en encuestas internas sobre futuras líneas de investigación', en: 'Participation in internal surveys on future research lines', pt: 'Participação em pesquisas internas sobre futuras linhas de pesquisa' },
        ],
        highlighted: true
    },
    {
        id: 'mecenas',
        name: 'MECENAS',
        subtitle: 'PATROCINADOR',
        type: 'mecenas',
        price: 1000,
        currency: 'EUR',
        interval: 'annual',
        features: [
            { es: 'Invitación a Cenas Privadas y Encuentros VIP en el marco de jornadas y eventos estratégicos', en: 'Invitation to Private Dinners and VIP Meetings within the framework of conferences and strategic events', pt: 'Convite para Jantares Privados e Encontros VIP no âmbito de conferências e eventos estratégicos' },
            { es: 'Encuentros exclusivos con autores, investigadores y ponentes invitados', en: 'Exclusive meetings with authors, researchers, and guest speakers', pt: 'Encontros exclusivos com autores, pesquisadores e palestrantes convidados' },
            { es: 'Acceso prioritario a eventos con aforo limitado', en: 'Priority access to events with limited capacity', pt: 'Acesso prioritário a eventos com capacidade limitada' },
            { es: 'Invitación anual a una sesión privada de presentación de líneas estratégicas y futuros proyectos', en: 'Annual invitation to a private session presenting strategic lines and future projects', pt: 'Convite anual para uma sessão privada de apresentação de linhas estratégicas e projetos futuros' },
            { es: 'Posibilidad de participar como invitado destacado en actos institucionales', en: 'Possibility to participate as a distinguished guest in institutional acts', pt: 'Possibilidade de participar como convidado de destaque em atos institucionais' },
            { es: 'Recepción anticipada de publicaciones, informes y proyectos editoriales', en: 'Early receipt of publications, reports, and editorial projects', pt: 'Recebimento antecipado de publicações, relatórios e projetos editoriais' },
            { es: 'Reconocimiento institucional como Mecenas de Escuela Hispánica', en: 'Institutional recognition as a Patron of Escuela Hispánica', pt: 'Reconhecimento institucional como Patrono da Escuela Hispánica' },
            { es: 'Mención honorífica en la memoria anual y, si así lo desea, en la web oficial', en: 'Honorary mention in the annual report and, if desired, on the official website', pt: 'Menção honorífica no relatório anual e, se desejar, no site oficial' },
            { es: 'Emisión de un Certificado Oficial de Mecenazgo Cultural', en: 'Issuance of an Official Certificate of Cultural Patronage', pt: 'Emissão de um Certificado Oficial de Patrocínio Cultural' },
        ],
        highlighted: false
    }
];

export function getMembershipById(id: string): MemberPlan | undefined {
    return membershipPlans.find(plan => plan.id === id);
}

export function getMembershipByType(type: MemberPlan['type']): MemberPlan | undefined {
    return membershipPlans.find(plan => plan.type === type);
}
