"use client";

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";

const PRESETS = [25, 50, 100, 250, 500];

export function DonacionesCheckoutForm({ locale = "es" }: { locale?: string }) {
  const isEn = locale === "en";
  const [selected, setSelected] = useState<number | null>(100);
  const [custom, setCustom] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const amount = custom ? Number(custom) : selected;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!amount || amount < 1) {
      setError(isEn ? "Please enter a valid amount (minimum €1)." : "Por favor, introduce un importe válido (mínimo 1 €).");
      return;
    }
    setError(null);

    startTransition(async () => {
      try {
        const res = await fetch("/api/checkout/donacion", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        });
        const data = await res.json() as { url?: string; error?: string };
        if (!res.ok || !data.url) {
          setError(data.error ?? (isEn ? "Could not initiate payment." : "No se pudo iniciar el pago."));
          return;
        }
        window.location.href = data.url;
      } catch {
        setError(isEn ? "Connection error. Please try again." : "Error de conexión. Inténtalo de nuevo.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[var(--color-accent-200)]">
        {isEn ? "Choose an amount" : "Elige un importe"}
      </p>

      {/* Presets */}
      <div className="grid grid-cols-5 gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => { setSelected(preset); setCustom(""); }}
            className="py-2.5 text-[0.8rem] font-semibold uppercase tracking-[0.1em] border transition-colors"
            style={{
              borderColor: selected === preset && !custom ? "var(--color-accent-400)" : "rgba(255,255,255,0.15)",
              background: selected === preset && !custom ? "rgba(22,71,53,0.4)" : "transparent",
              color: selected === preset && !custom ? "var(--color-accent-200)" : "rgba(255,255,255,0.6)",
            }}
          >
            {preset} €
          </button>
        ))}
      </div>

      {/* Custom amount */}
      <div>
        <label className="text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-accent-200)]">
          {isEn ? "Other amount (€)" : "Otro importe (€)"}
        </label>
        <input
          type="number"
          min={1}
          max={100000}
          step={1}
          value={custom}
          onChange={(e) => { setCustom(e.target.value); setSelected(null); }}
          placeholder={isEn ? "e.g. 150" : "ej. 150"}
          className="mt-1 w-full border bg-transparent px-4 py-3 text-[0.92rem] text-white placeholder:text-[rgba(255,255,255,0.35)] focus:outline-none"
          style={{ borderColor: custom ? "var(--color-accent-400)" : "rgba(255,255,255,0.2)" }}
        />
      </div>

      {error && (
        <p className="text-[0.82rem] text-[#fca5a5]">{error}</p>
      )}

      <button
        type="submit"
        disabled={isPending || !amount || amount < 1}
        className="inline-flex w-full items-center justify-center gap-2 px-5 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-white transition-colors disabled:opacity-50"
        style={{ backgroundColor: "var(--color-accent-500)" }}
      >
        {isPending ? (
          <>
            <Loader2 size={15} className="animate-spin" />
            {isEn ? "Redirecting…" : "Redirigiendo…"}
          </>
        ) : (
          <>
            {isEn ? `[ Donate ${amount ? `${amount} €` : ""} ]` : `[ Donar ${amount ? `${amount} €` : ""} ]`}
          </>
        )}
      </button>

      <p className="text-[0.72rem] leading-relaxed text-[rgba(255,255,255,0.4)]">
        {isEn
          ? "You will be redirected to a secure Stripe checkout page."
          : "Serás redirigido a la página segura de pago de Stripe."}
      </p>
    </form>
  );
}
