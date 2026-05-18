import type { Metadata } from "next";
import { Bracketed } from "@/components/system/Bracketed";
import { LegalSection } from "@/components/consulting-v2/LegalSection";

export const metadata: Metadata = {
    title: "Política de Cookies — Fortius Consulting",
    description:
        "Política de cookies del sitio web titularidad de Fortius Strategies SL y Fortius Americas LLC.",
};

const COOKIE_ITEMS = [
    {
        id: "titularidad",
        number: "01",
        title: "Titularidad del sitio",
        content: (
            <ul className="space-y-1 list-none">
                <li><strong>Titular en España:</strong> Fortius Strategies SL · NIF B72443567</li>
                <li><strong>Dirección postal:</strong> Calle Zurbano 71, Oficina 9, 28010, Madrid, Reino de España</li>
                <li className="pt-3"><strong>Titular en EE.UU.:</strong> Fortius Americas LLC · EIN 38-4393967</li>
                <li><strong>Dirección postal:</strong> 1417 Oak Tree Dr., 77055, Houston, Texas, Estados Unidos de América</li>
            </ul>
        ),
    },
    {
        id: "que-son",
        number: "02",
        title: "Qué son las cookies",
        content: (
            <p>
                Las cookies son pequeños archivos que se almacenan en el navegador y
                permiten recordar información básica sobre la visita, facilitar el
                funcionamiento técnico del sitio y mejorar la experiencia de navegación.
            </p>
        ),
    },
    {
        id: "uso",
        number: "03",
        title: "Uso de cookies en este sitio",
        content: (
            <p>
                Este sitio puede utilizar cookies técnicas o estrictamente necesarias para
                su funcionamiento. Si en el futuro se incorporan herramientas analíticas o
                servicios de terceros, esta política se actualizará para reflejar de forma
                clara el tipo de cookies empleadas y su finalidad.
            </p>
        ),
    },
    {
        id: "gestion",
        number: "04",
        title: "Gestión de cookies",
        content: (
            <p>
                Puede configurar su navegador para bloquear o eliminar cookies. Debe tener
                en cuenta que esa configuración puede afectar al funcionamiento normal de
                algunas partes del sitio.
            </p>
        ),
    },
];

export default function CookiesPage() {
    return (
        <main id="main-content" className="pt-[var(--nav-height)]">
            <section className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-24 md:py-36">
                <Bracketed variant="tag">Política de Cookies</Bracketed>
                <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.4rem,5.5vw,4.8rem)] font-light leading-[1.03] tracking-tight text-[var(--text-primary)]">
                    Fortius Strategies SL y Fortius Americas LLC{" "}
                    <span className="italic text-[var(--color-accent-400)]">
                        Uso de cookies y navegación.
                    </span>
                </h1>
                <p className="mt-8 max-w-2xl text-[var(--text-secondary)] leading-relaxed">
                    Toda esta web es propiedad de Fortius Strategies SL y Fortius Americas
                    LLC. A continuación se explica qué cookies puede utilizar este sitio y
                    cómo gestionarlas.
                </p>

                <div className="mt-20">
                    <LegalSection items={COOKIE_ITEMS} />
                </div>
            </section>
        </main>
    );
}