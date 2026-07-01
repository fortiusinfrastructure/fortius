import { redirect } from "next/navigation";
import { requireFoundationPrivateUser } from "@/lib/private/auth";

export default async function HerramientasLayout({ children }: { children: React.ReactNode }) {
  const user = await requireFoundationPrivateUser();
  if (!["admin", "super_admin"].includes(user.role)) redirect("/area-privada");
  return <>{children}</>;
}
