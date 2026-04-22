import { NavF } from "@/components/foundation/NavF";
import { FooterF } from "@/components/foundation/FooterF";

export default function FoundationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <NavF />
            {children}
            <FooterF />
        </>
    );
}
