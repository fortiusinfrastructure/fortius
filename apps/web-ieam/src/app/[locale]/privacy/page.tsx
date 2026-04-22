import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const sections = [
  {
    title: '1. Quiénes somos',
    body: 'Instituto Español de Análisis Migratorio (IEAM), iniciativa de Fundación Fortius España, NIF G56299100, Calle Zurbano 71, oficina 9, 28010, Madrid. Web: www.fundacionfortius.org | www.fortiusfoundation.org. Email: info@fundacionfortius.org.'
  },
  {
    title: '2. Comentarios',
    body: 'Si dejas comentarios, recopilamos los datos del formulario, IP y agente de usuario para detección de spam. Gravatar puede recibir un hash de tu email (ver política en automattic.com/privacy). Tras aprobación, tu avatar es público con el comentario.'
  },
  {
    title: '3. Medios',
    body: 'Si subes imágenes, evita datos de ubicación (EXIF GPS). Otros usuarios pueden extraer esa información.'
  },
  {
    title: '4. Cookies',
    body: 'Si comentas puedes guardar nombre/email/web en cookies (1 año). Si accedes con cuenta, usamos cookies temporales para verificar navegador y para acceso/opciones de pantalla (2 días a 1 año). “Recuérdame” dura 2 semanas. Al cerrar sesión se eliminan. Editar/publicar guarda una cookie de ID de artículo (1 día).'
  },
  {
    title: '5. Contenido incrustado',
    body: 'El contenido embebido de terceros puede recopilar datos, usar cookies y seguimiento adicional, igual que si visitas la otra web.'
  },
  {
    title: '6. Con quién compartimos tus datos',
    body: 'Fundación Fortius no cede datos salvo obligación legal ni realiza transferencias. Si pides restablecer contraseña, tu IP se incluye en el email de restablecimiento.'
  },
  {
    title: '7. Cuánto tiempo conservamos tus datos',
    body: 'Comentarios y metadatos se conservan indefinidamente para aprobar sucesivos automáticamente. Usuarios registrados (si los hay) pueden ver/editar/borrar sus datos (no el usuario). Admins también. '
  },
  {
    title: '8. Qué derechos tienes sobre tus datos',
    body: 'Puedes pedir acceso, rectificación, supresión, limitación, oposición, portabilidad o retirar consentimiento. Si tienes cuenta o comentarios, puedes solicitar exportación o borrado de datos (salvo obligación legal). Solicita por escrito a Fundación Fortius España, C/ Cabo De La Estaca De Bares 30, 28290 Las Rozas de Madrid, o a info@fundacionfortius.org.'
  },
  {
    title: '9. Reclamaciones',
    body: 'Si no hay satisfacción en el ejercicio de derechos, reclama ante la AEPD (www.aepd.es).'
  },
  {
    title: '10. Baja de comunicaciones',
    body: 'Para dejar de recibir información sobre servicios, escribe a info@fundacionfortius.org con asunto “No enviar correos”.'
  },
  {
    title: '11. Dónde se envían tus datos',
    body: 'Los comentarios pueden ser revisados por un servicio automático de detección de spam.'
  }
];

export default function PrivacyPage() {
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
              <span>Política de Privacidad</span>
            </div>
            <div className="border-l-4 border-[#D4212A] pl-6">
              <h1 className="text-5xl lg:text-6xl font-serif font-bold mb-4 leading-tight text-[var(--color-cream)]">
                Privacidad
              </h1>
              <p className="text-xl leading-relaxed text-[var(--color-cream)]/85 max-w-2xl">
                Información sobre cómo tratamos tus datos personales.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="page-shell max-w-4xl space-y-10">
          {sections.map((item) => (
            <div key={item.title} className="space-y-3">
              <h2 className="text-2xl font-serif font-bold text-[#0A2540]">{item.title}</h2>
              <p className="text-slate-700 leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
