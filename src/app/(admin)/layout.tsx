import AdminHeader from "@/src/components/admin/AdminHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative overflow-hidden bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_25%,#0f172a_50%,#1a1a2e_75%,#0f172a_100%)]">
      <AdminHeader />
      {children}
    </div>
  );
}