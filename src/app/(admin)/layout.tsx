'use client'

import { useAuthContext } from "@/src/context/AuthContext";
import { useEffect } from "react";
import AdminHeader from "@/src/components/admin/AdminHeader";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const{user, isLoading} = useAuthContext();
  const router = useRouter();
  console.log("render rooot layouttttt");
  useEffect(() => {
    if (!isLoading) {
      console.log("roleeeee", user.role)
      if(user.role == "Support"){
        router.replace("/supporter");
      }
      if (!user || user.name !== "Admin") {
        router.replace("/");
      }
    }
  }, [user, isLoading, router]);
  return (
    <div className="relative overflow-hidden bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_25%,#0f172a_50%,#1a1a2e_75%,#0f172a_100%)]">
      <AdminHeader />
      {children}
    </div>
  );
}