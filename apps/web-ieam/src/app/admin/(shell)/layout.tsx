import { requireAdminUser } from '@/lib/admin/auth';
import AdminShellWrapper from '../AdminShellWrapper';

export default async function AdminShellLayout({ children }: { children: React.ReactNode }) {
    const user = await requireAdminUser();

    return (
        <AdminShellWrapper
            orgName="IEAM"
            orgSlug="ieam"
            currentPath=""
            userEmail={user.email}
        >
            {children}
        </AdminShellWrapper>
    );
}
