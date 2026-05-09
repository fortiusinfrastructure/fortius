import { requireAdminUser } from '@/lib/admin/auth';
import AdminShellWrapper from '../AdminShellWrapper';

export default async function AdminShellLayout({ children }: { children: React.ReactNode }) {
    const user = await requireAdminUser();

    return <AdminShellWrapper userEmail={user.email}>{children}</AdminShellWrapper>;
}