import { NavF } from "@/components/foundation/NavF";
import { FooterF } from "@/components/foundation/FooterF";

export default function FoundationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative isolate min-h-screen overflow-hidden bg-[var(--surface-primary)]">
            <div
                className="pointer-events-none fixed inset-0 z-0"
                style={{
                    background:
                        "radial-gradient(ellipse at 80% 20%, rgba(22,163,74,0.15) 0%, transparent 55%), linear-gradient(180deg, rgba(5,10,20,0) 0%, rgba(5,10,20,0.9) 100%)",
                }}
            />
            <div
                className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                }}
            />

            <div className="relative z-10">
                <NavF />
                {children}
                <FooterF />
            </div>
        </div>
    );
}
