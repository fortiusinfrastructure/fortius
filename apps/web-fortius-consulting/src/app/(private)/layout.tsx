import React from "react";
import { NavV2 } from "@/components/consulting-v2/NavV2";
import { Footer } from "@/components/shared/Footer";

export default function PrivateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <NavV2 />
            {children}
            <Footer />
        </>
    );
}
