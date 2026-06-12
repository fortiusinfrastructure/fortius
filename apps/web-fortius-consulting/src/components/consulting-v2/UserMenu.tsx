"use client";

/**
 * UserMenu — auth-aware controls for NavV2.
 * Session is read client-side (Supabase browser client + cookies) so the
 * server layouts never call cookies() and public pages keep ISR/static.
 */

import { useState, useEffect, useRef, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, UserRound, Settings, CreditCard, LogOut, LayoutDashboard } from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";
import { signOut } from "@/lib/auth/actions";

export interface SessionUser {
    email: string | null;
    name: string | null;
}

/** undefined = cargando, null = sin sesión */
export function useSessionUser(): SessionUser | null | undefined {
    const [user, setUser] = useState<SessionUser | null | undefined>(undefined);

    useEffect(() => {
        const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        );
        const map = (u: { email?: string; user_metadata?: Record<string, unknown> } | null | undefined) =>
            u ? { email: u.email ?? null, name: (u.user_metadata?.full_name as string | undefined) ?? null } : null;

        supabase.auth.getSession().then(({ data }) => setUser(map(data.session?.user)));
        const { data: sub } = supabase.auth.onAuthStateChange((_event, session) =>
            setUser(map(session?.user)),
        );
        return () => sub.subscription.unsubscribe();
    }, []);

    return user;
}

export const USER_MENU_LINKS = [
    { label: "Área privada", href: "/area-privada", icon: LayoutDashboard },
    { label: "Ajustes de cuenta", href: "/area-privada/cuenta", icon: Settings },
    { label: "Suscripción", href: "/area-privada/cuenta#suscripcion", icon: CreditCard },
];

export function SignOutButton({ className, onDone }: { className?: string; onDone?: () => void }) {
    const [isPending, startTransition] = useTransition();
    return (
        <button
            onClick={() => startTransition(async () => { await signOut(); onDone?.(); })}
            disabled={isPending}
            className={className}
        >
            <LogOut size={14} strokeWidth={2} aria-hidden />
            {isPending ? "Cerrando sesión…" : "Cerrar sesión"}
        </button>
    );
}

export function UserMenu({ user }: { user: SessionUser }) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        const onClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
        document.addEventListener("mousedown", onClick);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onClick);
            document.removeEventListener("keydown", onKey);
        };
    }, [open]);

    const displayName = user.name?.split(" ")[0] ?? user.email ?? "Cliente";

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-haspopup="menu"
                className="inline-flex items-center gap-2 px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.15em] border border-[var(--color-accent-500)] text-[var(--text-primary)] hover:bg-[var(--color-accent-500)] transition-colors"
            >
                <UserRound size={13} strokeWidth={2} aria-hidden />
                {displayName}
                <ChevronDown size={12} strokeWidth={2} aria-hidden className={`transition-transform ${open ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.16 }}
                        role="menu"
                        className="absolute right-0 top-[calc(100%+8px)] w-64 border border-[var(--border-default)] bg-[var(--color-neutral-900)] shadow-xl"
                    >
                        <div className="px-4 py-3 border-b border-[var(--border-subtle)]">
                            {user.name && (
                                <p className="text-[0.85rem] text-[var(--text-primary)] truncate">{user.name}</p>
                            )}
                            <p className="text-[0.75rem] text-[var(--text-tertiary)] truncate">{user.email}</p>
                        </div>
                        <nav className="py-1">
                            {USER_MENU_LINKS.map(({ label, href, icon: Icon }) => (
                                <a
                                    key={href}
                                    href={href}
                                    role="menuitem"
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-3 px-4 py-2.5 text-[0.8rem] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.04)] transition-colors"
                                >
                                    <Icon size={14} strokeWidth={2} aria-hidden className="text-[var(--text-tertiary)]" />
                                    {label}
                                </a>
                            ))}
                        </nav>
                        <div className="border-t border-[var(--border-subtle)] py-1">
                            <SignOutButton
                                onDone={() => setOpen(false)}
                                className="flex w-full items-center gap-3 px-4 py-2.5 text-[0.8rem] text-[var(--color-accent-400)] hover:bg-[rgba(233,71,72,0.08)] transition-colors disabled:opacity-60"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
