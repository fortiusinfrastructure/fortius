'use client';

import { usePathname } from 'next/navigation';
import { AdminShell } from '@fortius/admin-ui';
import { signOutAdmin } from '@/lib/admin/auth';

interface Props {
    children: React.ReactNode;
    orgName: string;
    orgSlug: string;
    currentPath: string;
    userEmail?: string;
}

export default function AdminShellWrapper({ children, orgName, orgSlug, userEmail }: Props) {
    const pathname = usePathname();

    return (
        <AdminShell
            orgName={orgName}
            orgSlug={orgSlug}
            currentPath={pathname}
            userEmail={userEmail}
            onSignOut={async () => {
                await signOutAdmin();
            }}
        >
            {children}
        </AdminShell>
    );
}
