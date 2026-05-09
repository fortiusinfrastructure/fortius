'use client';

import { usePathname } from 'next/navigation';
import { CalendarDays, LayoutDashboard, Mail, Users } from 'lucide-react';
import { AdminShell } from '../../../../../packages/admin-ui/src/components/AdminShell';
import { signOutAdmin } from '@/lib/admin/auth';

export default function AdminShellWrapper({
    children,
    userEmail,
}: {
    children: React.ReactNode;
    userEmail?: string;
}) {
    const pathname = usePathname();

    return (
        <AdminShell
            orgName="Escuela Hispánica"
            orgSlug="escuela-hispanica"
            currentPath={pathname}
            userEmail={userEmail}
            navItems={[
                { label: 'Panel', href: '/admin', icon: <LayoutDashboard size={16} /> },
                { label: 'Miembros', href: '/admin/members', icon: <Users size={16} /> },
                { label: 'Eventos', href: '/admin/events', icon: <CalendarDays size={16} /> },
                { label: 'Comunicaciones', href: '/admin/communications', icon: <Mail size={16} /> },
            ]}
            onSignOut={async () => {
                await signOutAdmin();
            }}
        >
            {children}
        </AdminShell>
    );
}