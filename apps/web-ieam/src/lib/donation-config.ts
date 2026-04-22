export type DonationMode = 'payment_links' | 'checkout_session';
export type DonationFrequency = 'one-time' | 'monthly';

export interface DonationTier {
  id: string;
  title: string;
  amount: number | 'custom';
  annualAmount?: number;
  description: string;
  impact: string;
  featured?: boolean;
  links: {
    oneTime: string;
    monthly: string;
    annual: string;
  };
}

export const DONATION_CONFIG = {
  mode: 'payment_links' as DonationMode,
  paymentLinks: {
    basic: {
      oneTime: 'https://buy.stripe.com/00wfZh8gc55UbjF8Lb18c02',
      monthly: 'https://buy.stripe.com/eVqaEX6849mabjF2mN18c01',
      annual: 'https://buy.stripe.com/5kQaEX2VSgOC9bx9Pf18c00',
    },
    solidarity: {
      oneTime: 'https://buy.stripe.com/14A28raok9ma4VhgdD18c05',
      monthly: 'https://buy.stripe.com/fZucN57c855UcnJ1iJ18c04',
      annual: 'https://buy.stripe.com/8x2dR9aok7e29bx9Pf18c03',
    },
    institutional: {
      oneTime: 'https://buy.stripe.com/dRm6oHbsodCq1J50eF18c08',
      monthly: 'https://buy.stripe.com/aFa14n8gccym5Zl3qR18c07',
      annual: 'https://buy.stripe.com/3cI7sL2VSaqecnJ1iJ18c06',
    },
  },
  redirects: {
    success: '/colabora/gracias',
    cancel: '/colabora/cancelado',
  },
  contactEmail: 'colabora@ieam.es',
};

export const donationTiers: DonationTier[] = [
  {
    id: 'basic',
    title: 'Apoyo Básico',
    amount: 20,
    annualAmount: 200,
    description: 'Colaboración puntual para apoyar nuestra labor',
    impact: 'Contribuye a la publicación de un artículo de análisis',
    links: DONATION_CONFIG.paymentLinks.basic,
  },
  {
    id: 'solidarity',
    title: 'Apoyo Solidario',
    amount: 50,
    annualAmount: 500,
    description: 'Impulsa la investigación independiente',
    impact: 'Financia la creación de una infografía de datos',
    featured: true,
    links: DONATION_CONFIG.paymentLinks.solidarity,
  },
  {
    id: 'institutional',
    title: 'Apoyo Institucional',
    amount: 200,
    annualAmount: 2000,
    description: 'Respaldo significativo a nuestra misión',
    impact: 'Patrocina un policy brief completo',
    links: DONATION_CONFIG.paymentLinks.institutional,
  },
];

export function getDonationUrl(tierId: string, frequency: DonationFrequency | 'annual' = 'one-time'): string {
  const tier = donationTiers.find((t) => t.id === tierId);

  if (DONATION_CONFIG.mode === 'payment_links') {
    if (!tier) return '#';
    if (frequency === 'annual') return tier.links.annual;
    return frequency === 'monthly' ? tier.links.monthly : tier.links.oneTime;
  }

  return '#';
}

export function formatAmount(amount: number | 'custom', frequency: DonationFrequency = 'one-time'): string {
  if (amount === 'custom') return 'Libre';
  const suffix = frequency === 'monthly' ? '/mes' : '';
  return `€${amount}${suffix}`;
}
