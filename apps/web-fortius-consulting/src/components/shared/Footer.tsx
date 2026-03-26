import { Button } from "./Button";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <span className="font-serif text-2xl font-medium tracking-tight block mb-4">
              Fortius <span className="text-neutral-400">Consulting</span>
            </span>
            <p className="text-neutral-400 text-sm max-w-sm">
              Consultoría estratégica para transformar la sociedad. Asesoramos a organizaciones con principios para maximizar el impacto de sus valores.
            </p>
          </div>
          
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-6">Navegación</h4>
            <ul className="space-y-3">
              <li><a href="#metodo" className="text-sm text-neutral-400 hover:text-foreground transition-colors">Método</a></li>
              <li><a href="#servicios" className="text-sm text-neutral-400 hover:text-foreground transition-colors">Servicios</a></li>
              <li><a href="#intelligence" className="text-sm text-neutral-400 hover:text-foreground transition-colors">Intelligence</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-6">Ecosistema</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-brand-foundation hover:text-green-500 transition-colors">Fortius Foundation</a></li>
              <li><a href="#" className="text-sm text-neutral-400 hover:text-foreground transition-colors">LinkedIn</a></li>
              <li><a href="#" className="text-sm text-neutral-400 hover:text-foreground transition-colors">Twitter / X</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5">
          <p className="text-xs text-neutral-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} Fortius Consulting. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-neutral-500 hover:text-foreground transition-colors">Aviso Legal</a>
            <a href="#" className="text-xs text-neutral-500 hover:text-foreground transition-colors">Privacidad</a>
            <a href="#" className="text-xs text-neutral-500 hover:text-foreground transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
