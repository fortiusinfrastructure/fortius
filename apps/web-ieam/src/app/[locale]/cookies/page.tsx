import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function CookiesPage() {
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
              <span>Política de Cookies</span>
            </div>
            <div className="border-l-4 border-[#D4212A] pl-6">
              <h1 className="text-5xl lg:text-6xl font-serif font-bold mb-4 leading-tight text-[var(--color-cream)]">
                Cookies
              </h1>
              <p className="text-xl leading-relaxed text-[var(--color-cream)]/85 max-w-2xl">
                Información sobre el uso de cookies en www.ieam.es.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="page-shell max-w-4xl space-y-10">
          <div className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-[#0A2540]">1. Uso de cookies</h2>
            <p className="text-slate-700 leading-relaxed">
              La web www.ieam.es, titularidad de Fundación Fortius, utiliza cookies para almacenar y recuperar información sobre hábitos de navegación y mejorar la experiencia. Si no deseas recibir cookies, configura tu navegador para borrarlas, bloquearlas o avisar de su instalación.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-[#0A2540]">2. Consentimiento</h2>
            <p className="text-slate-700 leading-relaxed">
              Las cookies no almacenan datos personales salvo que te registres voluntariamente. Al navegar, aceptas su uso según esta política; si no estás de acuerdo, escribe a info@ieam.es.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-[#0A2540]">3. Cómo bloquear o eliminar cookies</h2>
            <p className="text-slate-700 leading-relaxed">
              Puedes permitir, bloquear o eliminar cookies en la configuración de tu navegador. Desactivar algunas cookies puede impedir o dificultar la navegación o el uso de servicios.
            </p>
            <ul className="list-disc ml-6 text-slate-700 leading-relaxed space-y-1">
              <li>Explorer: <a className="text-[var(--color-mediterranean)]" href="https://support.microsoft.com/es-es/kb/278835">https://support.microsoft.com/es-es/kb/278835</a></li>
              <li>Chrome: <a className="text-[var(--color-mediterranean)]" href="http://support.google.com/chrome/bin/answer.py?hl=es&answer=95647">http://support.google.com/chrome/bin/answer.py?hl=es&answer=95647</a></li>
              <li>Firefox: <a className="text-[var(--color-mediterranean)]" href="http://support.mozilla.org/es/kb/Borrar%20cookies">http://support.mozilla.org/es/kb/Borrar%20cookies</a></li>
              <li>Safari: <a className="text-[var(--color-mediterranean)]" href="http://support.apple.com/kb/ph5042">http://support.apple.com/kb/ph5042</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-[#0A2540]">4. Modificaciones</h2>
            <p className="text-slate-700 leading-relaxed">
              Fundación Fortius podrá modificar esta política para cumplir exigencias legales o instrucciones de la AEPD. Consulta periódicamente para conocer cambios; se comunicarán cuando sean significativos.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
