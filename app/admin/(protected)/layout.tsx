// app/admin/layout.tsx
// This IS the security boundary now — not proxy.ts. Every page under
// app/admin/** renders inside this layout, so this check runs first.

import { redirect } from 'next/navigation'
import { createClient } from "@/lib/supabase-server-client";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return <>{children}</>;
}