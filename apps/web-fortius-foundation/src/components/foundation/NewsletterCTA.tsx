"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Bracketed } from "@/components/system/Bracketed";
import { subscribeToNewsletter } from "@/lib/email/actions";

export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("email", email);
      const result = await subscribeToNewsletter(formData);
      setStatus(result.success ? "success" : "error");
      setMessage(result.message);
      if (result.success) setEmail("");
    } catch {
      setStatus("error");
      setMessage("No hemos podido completar la suscripción. Inténtalo de nuevo.");
    }
  }

  return (
    <section
      aria-labelledby="newsletter-title"
      className="relative overflow-hidden border-t border-[var(--border-subtle)] py-24 md:py-32"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-35"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(34,197,94,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        <div className="max-w-3xl">
          <Bracketed variant="kicker">Boletín</Bracketed>
          <h2
            id="newsletter-title"
            className="mt-6 font-display text-[clamp(2rem,4.5vw,3.8rem)] font-light leading-[1.05] tracking-tight text-[var(--text-primary)]"
          >
            Sigue nuestro trabajo. Conoce nuestras oportunidades.
          </h2>
          <p className="mt-6 max-w-xl leading-relaxed text-[var(--text-secondary)]">
            Lo que pensamos, lo que hacemos. Lo que no encontrarás en ningún otro
            sitio. Una vez al mes.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 flex flex-col sm:flex-row gap-3 max-w-lg">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              disabled={status === "loading"}
              className="flex-1 bg-transparent border border-[var(--border-strong)] px-5 py-3.5 text-[0.9rem] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--color-accent-500)] focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors"
              style={{ backgroundColor: "var(--color-accent-500)" }}
            >
              {status === "loading" ? <Loader2 size={14} className="animate-spin" /> : null}
              {status === "success" ? "¡Gracias!" : "Suscribirme"}
              {status !== "loading" && (
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              )}
            </button>
          </form>

          {message && (
            <p className={`mt-4 text-[0.85rem] leading-relaxed ${status === "error" ? "text-[#f59e0b]" : "text-[#10b981]"}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
