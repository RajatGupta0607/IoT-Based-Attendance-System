import { SidebarDemo } from "@/components/Dashboard";
import { auth } from "@/server/auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    return;
  }

  return <SidebarDemo user={session.user}>{children}</SidebarDemo>;
}
