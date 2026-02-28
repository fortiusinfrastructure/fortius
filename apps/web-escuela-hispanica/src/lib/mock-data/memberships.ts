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
            { es: 'Boletines exclusivos', en: 'Exclusive newsletters', pt: 'Boletins exclusivos' },
            { es: 'Descuento (10%) en eventos', en: 'Discount (10%) on events', pt: 'Desconto (10%) em eventos' },
            { es: 'Reconocimiento en web (opcional)', en: 'Web recognition (optional)', pt: 'Reconhecimento na web (opcional)' },
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
            { es: 'Acceso a biblioteca privada inédita', en: 'Access to private unpublished library', pt: 'Acesso à biblioteca privada inédita' },
            { es: 'Seminarios online exclusivos', en: 'Exclusive online seminars', pt: 'Seminários online exclusivos' },
            { es: 'Posibilidad de publicación', en: 'Publication opportunity', pt: 'Possibilidade de publicação' },
            { es: 'Certificado y derecho a voto', en: 'Certificate and voting rights', pt: 'Certificado e direito a voto' },
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
            { es: 'Todo lo incluido en Académico', en: 'Everything included in Academic', pt: 'Tudo incluído no Académico' },
            { es: 'Invitaciones a Cenas VIP', en: 'Invitations to VIP Dinners', pt: 'Convites para Jantares VIP' },
            { es: 'Encuentros privados con autores', en: 'Private meetings with authors', pt: 'Encontros privados com autores' },
            { es: 'Mención honorífica en memorias', en: 'Honorary mention in reports', pt: 'Menção honorífica nas memórias' },
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
