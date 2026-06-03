import { createServerClient, getCurrentOrg, getUserMembership } from "@fortius/database";
import { redirect } from "next/navigation";

export interface ClientUser {
    id: string;
    email: string | undefined;
    planId: string;
    status: string;
}

export async function requireClientUser(): Promise<ClientUser> {
    const supabase = await createServerClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const org = await getCurrentOrg();
    const membership = org ? await getUserMembership(user.id, org.id) : null;

    return {
        id: user.id,
        email: user.email,
        planId: membership?.tier ?? "sin-plan",
        status: membership?.status ?? "inactive",
    };
}

