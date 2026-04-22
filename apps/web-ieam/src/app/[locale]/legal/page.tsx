import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const sections = [
  {
    title: '1. Titularidad',
    body: `FUNDACIÓN FORTIUS ESPAÑA (en adelante “FUNDACIÓN FORTIUS”), titular de www.ieam.es.
Domicilio Social: Calle Zurbano 71, oficina 9, 28010, Madrid.
NIF: G56299100
Dirección Postal: Calle Zurbano 71, oficina 9, 28010, Madrid
Email: info@fundacionfortius.org
Teléfono: 910053959`
  },
  {
    title: '2. Condiciones de uso',
    body: 'Los Usuarios se obligan a usar el sitio conforme a la Ley y este Aviso Legal. Se prohíbe cualquier uso que dañe o inutilice redes, servidores o aplicaciones de FUNDACIÓN FORTIUS o terceros.'
  },
  {
    title: '3. Propiedad Industrial e Intelectual',
    body: 'La Web y sus contenidos son propiedad de FUNDACIÓN FORTIUS o licenciantes. No se ceden derechos de explotación; queda prohibida la reproducción o modificación salvo para la navegación o casos autorizados.'
  },
  {
    title: '4. Exclusión de responsabilidad',
    body: 'Se suministra “tal cual”, sin garantía sobre disponibilidad o ausencia de errores. FUNDACIÓN FORTIUS no responde de fallos de terceros, seguridad de redes abiertas ni de los contenidos de sitios enlazados (art. 17 LSSICE).'
  },
  {
    title: '5. Comunicación de actividades ilícitas o inadecuadas',
    body: 'Si detectas contenidos ilícitos en sitios enlazados, contacta indicando datos personales, descripción de hechos y documentación que acredite derechos afectados. La comunicación no implica conocimiento efectivo según LSSICE.'
  },
  {
    title: '6. Protección de datos y cookies',
    body: 'Consulta la Política de Privacidad y la Política de Cookies para conocer los tratamientos y tecnologías usadas en la Web.'
  },
  {
    title: '7. Vigencia y terminación',
    body: 'El Aviso Legal rige mientras esté publicado; las modificaciones se comunicarán por el mismo medio. FUNDACIÓN FORTIUS puede suspender el acceso sin preaviso.'
  },
  {
    title: '8. Legislación aplicable',
    body: 'Se rige exclusivamente por la legislación española.'
  }
];

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="relative bg-[#0A2540] text-[var(--color-cream)] py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540] via-[#0A2540]/85 to-transparent"></div>
        </div>
        <div className="relative z-10 page-shell">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#D4212A] mb-4">
              <span className="w-2 h-2 bg-[#D4212A] rounded-full"></span>
              <span>Aviso legal</span>
            </div>
            <div className="border-l-4 border-[#D4212A] pl-6">
              <h1 className="text-5xl lg:text-6xl font-serif font-bold mb-4 leading-tight text-[var(--color-cream)]">
                Aviso Legal
              </h1>
              <p className="text-xl leading-relaxed text-[var(--color-cream)]/85 max-w-2xl">
                Información general y condiciones de uso del sitio www.ieam.es.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="page-shell max-w-4xl">
          <div className="space-y-10">
            {sections.map((item) => (
              <div key={item.title} className="space-y-3">
                <h2 className="text-2xl font-serif font-bold text-[#0A2540]">{item.title}</h2>
                <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
