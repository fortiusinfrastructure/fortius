import { Bracketed } from "@/components/system/Bracketed";
import type { Article } from "@/lib/articles";
import { getEventArticleData } from "@/lib/article-display";

export function EventArticleBlocks({ article, membersOnly = false }: { article: Article; membersOnly?: boolean }) {
    const data = getEventArticleData(article);
    if (!data) return null;

    return (
        <section className="space-y-6">
            <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-6 md:p-7">
                <Bracketed variant="kicker">Ficha del evento</Bracketed>
                <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InfoCard label="Fechas" value={data.date ?? "Pendiente de definir"} />
                    <InfoCard label="Ubicación" value={data.location ?? "Pendiente de definir"} />
                    <InfoCard label="Organizador" value={data.organizer ?? "Pendiente de definir"} />
                </div>
            </div>

            {data.packages.length > 0 && !membersOnly && (
                <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-primary)] p-6 md:p-7">
                    <Bracketed variant="kicker">Opciones detectadas</Bracketed>
                    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.packages.map((pkg) => (
                            <article key={pkg.name} className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-secondary)] p-5">
                                <div className="flex items-start justify-between gap-4">
                                    <h3 className="font-display text-[1.2rem] font-light text-[var(--text-primary)]">
                                        {pkg.name}
                                    </h3>
                                    {pkg.price && (
                                        <span className="text-[0.8rem] uppercase tracking-[0.14em] text-[var(--color-accent-400)]">
                                            {pkg.price}
                                        </span>
                                    )}
                                </div>
                                <p className="mt-3 text-[0.92rem] leading-relaxed text-[var(--text-secondary)]">
                                    {pkg.summary ?? "Consulta el cuerpo del documento para ver el detalle completo del paquete y sus condiciones."}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            )}

            {data.packages.length > 0 && membersOnly && (
                <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-primary)] p-6 md:p-7">
                    <Bracketed variant="kicker">Acceso para miembros</Bracketed>
                    <p className="mt-4 text-[0.95rem] leading-relaxed text-[var(--text-secondary)]">
                        Esta oportunidad incluye paquetes de participación, agenda coordinada y soporte Fortius. El detalle completo se desbloquea desde el Área Privada en la sección Oportunidades & Eventos.
                    </p>
                </div>
            )}
        </section>
    );
}

function InfoCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-primary)] p-5">
            <p className="text-[0.68rem] uppercase tracking-[0.16em] text-[var(--text-tertiary)]">{label}</p>
            <p className="mt-2 text-[1rem] leading-snug text-[var(--text-primary)]">{value}</p>
        </div>
    );
}